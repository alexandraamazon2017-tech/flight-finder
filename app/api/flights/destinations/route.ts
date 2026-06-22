import { NextRequest, NextResponse } from 'next/server'
import { AIRPORTS } from '../../../data/airports'

const AIRPORT_MAP = Object.fromEntries(AIRPORTS.map(a => [a.iataCode, a]))

const TOKEN = process.env.TRAVELPAYOUTS_API_KEY

const RYANAIR_HEADERS = {
  'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124.0.0.0 Safari/537.36',
  'Accept': 'application/json',
  'Referer': 'https://www.ryanair.com/',
}

async function getRyanairRoutes(origin: string) {
  try {
    const res = await fetch(
      `https://www.ryanair.com/api/views/locate/searchWidget/routes/en/airport/${origin}`,
      { headers: RYANAIR_HEADERS }
    )
    if (!res.ok) return []
    const data = await res.json()
    return (Array.isArray(data) ? data : []).map((r: any) => ({
      code: r.arrivalAirport?.code,
      city: r.arrivalAirport?.city?.name,
      country: r.arrivalAirport?.country?.name,
    })).filter((r: any) => r.code && r.city)
  } catch { return [] }
}

async function getTravelpayoutsRoutes(origin: string) {
  try {
    const url = `https://api.travelpayouts.com/v1/prices/cheap?origin=${origin}&currency=EUR&token=${TOKEN}`
    const res = await fetch(url)
    if (!res.ok) return []
    const data = await res.json()
    if (!data.success) return []
    return Object.keys(data.data as Record<string, any>).map(dest => ({
      code: dest,
      city: dest,
      country: '',
      price: Math.min(...Object.values((data.data as any)[dest] as Record<string, any>).map((f: any) => f.price)),
    }))
  } catch { return [] }
}

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url)
  const origin = searchParams.get('origin')
  if (!origin) return NextResponse.json({ destinations: [] })

  const [ryanair, tp] = await Promise.allSettled([
    getRyanairRoutes(origin),
    getTravelpayoutsRoutes(origin),
  ])

  const ryRoutes = ryanair.status === 'fulfilled' ? ryanair.value : []
  const tpRoutes = tp.status === 'fulfilled' ? tp.value : []

  // merge: Ryanair gives city names, TP gives prices
  const byCode: Record<string, any> = {}

  for (const r of ryRoutes) {
    byCode[r.code] = { code: r.code, city: r.city, country: r.country }
  }

  for (const r of tpRoutes) {
    if (byCode[r.code]) {
      byCode[r.code].price = r.price
    } else {
      byCode[r.code] = r
    }
  }

  const destinations = Object.values(byCode)
    .map((d: any) => {
      const info = AIRPORT_MAP[d.code]
      return {
        ...d,
        city: info?.city || d.city || d.code,
        country: info?.country || d.country || '',
        airportName: info?.name || '',
      }
    })
    .sort((a, b) => (a.price ?? 999) - (b.price ?? 999))

  return NextResponse.json({ destinations })
}
