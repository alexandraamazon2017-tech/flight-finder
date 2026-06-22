import { NextRequest, NextResponse } from 'next/server'

const HEADERS = {
  'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36',
  'Accept': 'application/json',
}

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url)
  const origin = searchParams.get('origin')
  const month = searchParams.get('month')
  const maxPrice = searchParams.get('maxPrice')

  if (!origin || !month) {
    return NextResponse.json({ error: 'origin si month sunt necesare' }, { status: 400 })
  }

  const [year, mon] = month.split('-').map(Number)
  const dateFrom = `${month}-01`
  const lastDay = new Date(year, mon, 0).getDate()
  const dateTo = `${month}-${String(lastDay).padStart(2, '0')}`

  try {
    // Ryanair cheapest fares from origin to all destinations
    const params = new URLSearchParams({
      departureAirportIataCode: origin,
      outboundDepartureDateFrom: dateFrom,
      outboundDepartureDateTo: dateTo,
      currency: 'EUR',
    })
    if (maxPrice) params.set('priceValueTo', maxPrice)

    const res = await fetch(`https://www.ryanair.com/api/farfnd/v4/oneWayFares?${params}`, {
      headers: HEADERS,
    })

    if (!res.ok) {
      return NextResponse.json({ error: 'Ryanair API indisponibil' }, { status: 502 })
    }

    const data = await res.json()

    // Group by destination, keep cheapest
    const byDest: Record<string, any> = {}
    for (const fare of data.fares || []) {
      const dest = fare.outbound?.arrivalAirport?.iataCode
      const price = fare.outbound?.price?.value
      const date = fare.outbound?.departureDate?.split('T')[0]
      if (!dest || !price) continue
      if (!byDest[dest] || price < byDest[dest].price) {
        byDest[dest] = {
          destination: dest,
          destinationName: fare.outbound?.arrivalAirport?.name || dest,
          destinationCity: fare.outbound?.arrivalAirport?.seoName || dest,
          price,
          currency: 'EUR',
          date,
          source: 'Ryanair',
        }
      }
    }

    const results = Object.values(byDest).sort((a, b) => a.price - b.price)

    return NextResponse.json({ destinations: results, count: results.length })
  } catch {
    return NextResponse.json({ error: 'Eroare internă' }, { status: 500 })
  }
}
