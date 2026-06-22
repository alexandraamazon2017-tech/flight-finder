import { NextRequest, NextResponse } from 'next/server'

const TOKEN = process.env.TRAVELPAYOUTS_API_KEY
const MARKER = process.env.TRAVELPAYOUTS_MARKER

const RYANAIR_HEADERS = {
  'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124.0.0.0 Safari/537.36',
  'Accept': 'application/json',
  'Referer': 'https://www.ryanair.com/',
}

async function getTravelpayoutsDestinations(origin: string, month: string) {
  try {
    const url = `https://api.travelpayouts.com/v1/prices/cheap?origin=${origin}&depart_date=${month}&currency=EUR&token=${TOKEN}`
    const res = await fetch(url)
    if (!res.ok) return []
    const data = await res.json()
    if (!data.success) return []

    return Object.entries(data.data as Record<string, any>)
      .flatMap(([dest, flights]) =>
        Object.values(flights as Record<string, any>).map((f: any) => ({
          destination: dest,
          price: f.price,
          date: f.departure_at?.split('T')[0] || '',
          stops: f.transfers ?? 0,
          source: 'Travelpayouts',
          link: `https://aviasales.com/search/${origin}${f.departure_at?.slice(8, 10)}${f.departure_at?.slice(5, 7)}${dest}1?marker=${MARKER}&with_request=true`,
        }))
      )
  } catch { return [] }
}

async function getRyanairDestinations(origin: string, month: string) {
  try {
    const [year, mon] = month.split('-')
    const dateFrom = `${month}-01`
    const lastDay = new Date(parseInt(year), parseInt(mon), 0).getDate()
    const dateTo = `${month}-${String(lastDay).padStart(2, '0')}`

    const params = new URLSearchParams({
      departureAirportIataCode: origin,
      outboundDepartureDateFrom: dateFrom,
      outboundDepartureDateTo: dateTo,
      currency: 'EUR',
    })

    const res = await fetch(`https://www.ryanair.com/api/farfnd/v4/oneWayFares?${params}`, {
      headers: RYANAIR_HEADERS,
    })
    if (!res.ok) return []
    const data = await res.json()

    // group by destination, keep cheapest
    const byDest: Record<string, any> = {}
    for (const fare of data.fares || []) {
      const dest = fare.outbound?.arrivalAirport?.iataCode
      const price = fare.outbound?.price?.value
      const date = fare.outbound?.departureDate?.split('T')[0]
      if (!dest || !price) continue
      if (!byDest[dest] || price < byDest[dest].price) {
        byDest[dest] = {
          destination: dest,
          price,
          date,
          stops: 0,
          source: 'Ryanair',
          link: `https://www.ryanair.com/en/cheap-flights/${origin.toLowerCase()}-to-${dest.toLowerCase()}/?dateOut=${date}`,
        }
      }
    }
    return Object.values(byDest)
  } catch { return [] }
}

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url)
  const origin = searchParams.get('origin')
  const month = searchParams.get('month')
  const maxPrice = searchParams.get('maxPrice')

  if (!origin || !month) {
    return NextResponse.json({ error: 'origin si month sunt necesare' }, { status: 400 })
  }

  const [tpResults, ryResults] = await Promise.allSettled([
    getTravelpayoutsDestinations(origin, month),
    getRyanairDestinations(origin, month),
  ])

  const all = [
    ...(tpResults.status === 'fulfilled' ? tpResults.value : []),
    ...(ryResults.status === 'fulfilled' ? ryResults.value : []),
  ]

  // per destinatie, pastreaza cel mai ieftin
  const byDest: Record<string, any> = {}
  for (const d of all) {
    if (!byDest[d.destination] || d.price < byDest[d.destination].price) {
      byDest[d.destination] = d
    }
  }

  const destinations = Object.values(byDest)
    .filter(d => !maxPrice || d.price <= parseInt(maxPrice))
    .sort((a, b) => a.price - b.price)
    .slice(0, 24)

  return NextResponse.json({ destinations })
}
