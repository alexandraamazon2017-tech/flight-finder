import { NextRequest, NextResponse } from 'next/server'

const TOKEN = process.env.TRAVELPAYOUTS_API_KEY
const MARKER = process.env.TRAVELPAYOUTS_MARKER

const RYANAIR_HEADERS = {
  'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124.0.0.0 Safari/537.36',
  'Accept': 'application/json',
  'Referer': 'https://www.ryanair.com/',
}

function bookingLink(origin: string, destination: string, date: string) {
  const [, m, d] = date.split('-')
  return `https://aviasales.com/search/${origin}${d}${m}${destination}1?marker=${MARKER}&with_request=true`
}

function ryanairLink(origin: string, destination: string, date: string) {
  return `https://www.ryanair.com/en/cheap-flights/${origin.toLowerCase()}-to-${destination.toLowerCase()}/?dateOut=${date}`
}

async function getTravelpayoutsPerDay(origin: string, destination: string, month: string) {
  try {
    const url = `https://api.travelpayouts.com/v2/prices/month-matrix?origin=${origin}&destination=${destination}&month=${month}-01&currency=EUR&token=${TOKEN}`
    const res = await fetch(url)
    if (!res.ok) return []
    const data = await res.json()
    if (!data.success) return []

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
          link: bookingLink(origin, destination, f.depart_date),
        }
      }
    }
    return Object.values(byDate)
  } catch { return [] }
}

async function getRyanairPerDay(origin: string, destination: string, month: string) {
  try {
    const url = `https://www.ryanair.com/api/farfnd/v4/oneWayFares/${origin}/${destination}/cheapestPerDay?outboundMonthOfDate=${month}-01&currency=EUR`
    const res = await fetch(url, { headers: RYANAIR_HEADERS })
    if (!res.ok) return []
    const data = await res.json()
    return (data.outbound?.fares || [])
      .filter((f: any) => !f.soldOut && !f.unavailable && f.price?.value)
      .map((f: any) => ({
        date: f.day,
        price: f.price.value,
        currency: 'EUR',
        source: 'Ryanair',
        stops: 0,
        link: ryanairLink(origin, destination, f.day),
      }))
  } catch { return [] }
}

async function getFaresForRoute(origin: string, destination: string, month: string) {
  const [tp, ry] = await Promise.allSettled([
    getTravelpayoutsPerDay(origin, destination, month),
    getRyanairPerDay(origin, destination, month),
  ])

  const all = [
    ...(tp.status === 'fulfilled' ? tp.value : []),
    ...(ry.status === 'fulfilled' ? ry.value : []),
  ]

  // merge by date, keep cheapest
  const byDate: Record<string, any> = {}
  for (const f of all) {
    if (!byDate[f.date] || f.price < byDate[f.date].price) {
      byDate[f.date] = f
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
      getFaresForRoute(origin, destination, month),
      tripType === 'roundtrip' ? getFaresForRoute(destination, origin, month) : Promise.resolve([]),
    ])

    return NextResponse.json({ outbound, return: ret, count: outbound.length })
  } catch {
    return NextResponse.json({ error: 'Eroare la obținerea zborurilor' }, { status: 500 })
  }
}
