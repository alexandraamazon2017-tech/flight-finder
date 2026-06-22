import { NextRequest, NextResponse } from 'next/server'

const HEADERS = {
  'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
  'Accept': 'application/json, text/plain, */*',
  'Referer': 'https://www.ryanair.com/',
}

async function getRyanairPerDay(origin: string, destination: string, month: string) {
  const url = `https://www.ryanair.com/api/farfnd/v4/oneWayFares/${origin}/${destination}/cheapestPerDay?outboundMonthOfDate=${month}-01&currency=EUR`
  const res = await fetch(url, { headers: HEADERS })
  if (!res.ok) return []
  const data = await res.json()
  return (data.outbound?.fares || [])
    .filter((f: any) => !f.soldOut && !f.unavailable && f.price?.value)
    .map((f: any) => ({
      date: f.day,
      price: f.price.value,
      currency: 'EUR',
      source: 'Ryanair',
    }))
}

async function getWizzairPerDay(origin: string, destination: string, month: string) {
  const [year, mon] = month.split('-')
  const dateFrom = `${month}-01`
  const lastDay = new Date(parseInt(year), parseInt(mon), 0).getDate()
  const dateTo = `${month}-${String(lastDay).padStart(2, '0')}`

  const url = `https://be.wizzair.com/napi/asset/map/timetable?departureStation=${origin}&arrivalStation=${destination}&from=${dateFrom}&to=${dateTo}`
  try {
    const res = await fetch(url, {
      headers: { ...HEADERS, 'x-requestedwith': 'XMLHttpRequest' },
    })
    if (!res.ok) return []
    const data = await res.json()
    return (data.flights || [])
      .filter((f: any) => !f.isSoldOut && f.price?.amount)
      .map((f: any) => ({
        date: f.departureDate?.split('T')[0],
        price: f.price.amount,
        currency: f.price.currencyCode || 'EUR',
        source: 'Wizz Air',
      }))
      .filter((f: any) => f.date)
  } catch {
    return []
  }
}

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url)
  const origin = searchParams.get('origin')
  const destination = searchParams.get('destination')
  const month = searchParams.get('month')
  const tripType = searchParams.get('tripType') || 'oneway' // oneway | roundtrip

  if (!origin || !destination || !month) {
    return NextResponse.json({ error: 'origin, destination, month required' }, { status: 400 })
  }

  try {
    const [outboundRyanair, outboundWizz] = await Promise.allSettled([
      getRyanairPerDay(origin, destination, month),
      getWizzairPerDay(origin, destination, month),
    ])

    const outboundFares = [
      ...(outboundRyanair.status === 'fulfilled' ? outboundRyanair.value : []),
      ...(outboundWizz.status === 'fulfilled' ? outboundWizz.value : []),
    ]

    // dedupe by date, keep cheapest
    const outboundMap: Record<string, any> = {}
    for (const f of outboundFares) {
      if (!outboundMap[f.date] || f.price < outboundMap[f.date].price) {
        outboundMap[f.date] = f
      }
    }

    let returnMap: Record<string, any> = {}

    if (tripType === 'roundtrip') {
      const [returnRyanair, returnWizz] = await Promise.allSettled([
        getRyanairPerDay(destination, origin, month),
        getWizzairPerDay(destination, origin, month),
      ])

      const returnFares = [
        ...(returnRyanair.status === 'fulfilled' ? returnRyanair.value : []),
        ...(returnWizz.status === 'fulfilled' ? returnWizz.value : []),
      ]

      for (const f of returnFares) {
        if (!returnMap[f.date] || f.price < returnMap[f.date].price) {
          returnMap[f.date] = f
        }
      }
    }

    const outbound = Object.values(outboundMap).sort((a, b) => a.date.localeCompare(b.date))
    const returnFaresArr = Object.values(returnMap).sort((a, b) => a.date.localeCompare(b.date))

    return NextResponse.json({
      outbound,
      return: returnFaresArr,
      count: outbound.length,
    })
  } catch {
    return NextResponse.json({ error: 'Eroare la obținerea zborurilor' }, { status: 500 })
  }
}
