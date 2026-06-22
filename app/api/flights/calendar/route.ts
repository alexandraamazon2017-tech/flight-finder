import { NextRequest, NextResponse } from 'next/server'

const TOKEN = process.env.TRAVELPAYOUTS_API_KEY
const MARKER = process.env.TRAVELPAYOUTS_MARKER

function bookingLink(origin: string, destination: string, date: string) {
  const [y, m, d] = date.split('-')
  return `https://aviasales.com/search/${origin}${d}${m}${destination}1?marker=${MARKER}&with_request=true`
}

async function getTravelpayoutsPerDay(origin: string, destination: string, month: string) {
  const url = `https://api.travelpayouts.com/v2/prices/month-matrix?origin=${origin}&destination=${destination}&month=${month}-01&currency=EUR&token=${TOKEN}`
  const res = await fetch(url)
  if (!res.ok) return []
  const data = await res.json()
  if (!data.success) return []

  // dedupe by date, keep cheapest
  const byDate: Record<string, any> = {}
  for (const f of data.data || []) {
    const price = f.value
    if (!byDate[f.depart_date] || price < byDate[f.depart_date].price) {
      byDate[f.depart_date] = {
        date: f.depart_date,
        price,
        currency: 'EUR',
        source: f.gate || 'Travelpayouts',
        stops: f.number_of_changes,
        duration: f.duration,
        link: bookingLink(origin, destination, f.depart_date),
      }
    }
  }
  return Object.values(byDate).sort((a: any, b: any) => a.date.localeCompare(b.date))
}

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url)
  const origin = searchParams.get('origin')
  const destination = searchParams.get('destination')
  const month = searchParams.get('month')
  const tripType = searchParams.get('tripType') || 'oneway'

  if (!origin || !destination || !month) {
    return NextResponse.json({ error: 'origin, destination, month required' }, { status: 400 })
  }

  try {
    const [outbound, ret] = await Promise.all([
      getTravelpayoutsPerDay(origin, destination, month),
      tripType === 'roundtrip' ? getTravelpayoutsPerDay(destination, origin, month) : Promise.resolve([]),
    ])

    return NextResponse.json({ outbound, return: ret, count: outbound.length })
  } catch {
    return NextResponse.json({ error: 'Eroare la obținerea zborurilor' }, { status: 500 })
  }
}
