import { NextRequest, NextResponse } from 'next/server'

const TOKEN = process.env.TRAVELPAYOUTS_API_KEY
const MARKER = process.env.TRAVELPAYOUTS_MARKER

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url)
  const origin = searchParams.get('origin')
  const month = searchParams.get('month')
  const maxPrice = searchParams.get('maxPrice')

  if (!origin || !month) {
    return NextResponse.json({ error: 'origin si month sunt necesare' }, { status: 400 })
  }

  const url = `https://api.travelpayouts.com/v1/prices/cheap?origin=${origin}&depart_date=${month}&currency=EUR&token=${TOKEN}`
  const res = await fetch(url)
  if (!res.ok) return NextResponse.json({ error: 'API error' }, { status: 502 })

  const data = await res.json()
  if (!data.success) return NextResponse.json({ destinations: [] })

  const destinations = Object.entries(data.data as Record<string, any>)
    .flatMap(([dest, flights]) =>
      Object.values(flights as Record<string, any>).map((f: any) => ({
        destination: dest,
        destinationCity: dest,
        price: f.price,
        currency: 'EUR',
        date: f.departure_at?.split('T')[0] || '',
        stops: f.transfers ?? 0,
        source: 'Travelpayouts',
        link: `https://aviasales.com/search/${origin}${f.departure_at?.slice(8,10)}${f.departure_at?.slice(5,7)}${dest}1?marker=${MARKER}&with_request=true`,
      }))
    )
    .filter(d => !maxPrice || d.price <= parseInt(maxPrice))
    .sort((a, b) => a.price - b.price)
    .slice(0, 24)

  return NextResponse.json({ destinations })
}
