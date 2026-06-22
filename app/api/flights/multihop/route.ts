import { NextRequest, NextResponse } from 'next/server'

const TOKEN = process.env.TRAVELPAYOUTS_API_KEY
const MARKER = process.env.TRAVELPAYOUTS_MARKER

function tpLink(origin: string, dest: string, date: string) {
  const [, m, d] = date.split('-')
  return `https://aviasales.com/search/${origin}${d}${m}${dest}1?marker=${MARKER}&with_request=true`
}

interface Leg {
  price: number
  date: string
  airline: string
  transfers: number
}

// Returns cheapest fare per destination from a given origin in a given month
async function cheapFromOrigin(origin: string, month: string): Promise<Record<string, Leg>> {
  try {
    const url = `https://api.travelpayouts.com/v1/prices/cheap?origin=${origin}&depart_date=${month}&currency=EUR&token=${TOKEN}`
    const res = await fetch(url)
    if (!res.ok) return {}
    const data = await res.json()
    if (!data.success || !data.data) return {}

    const result: Record<string, Leg> = {}
    for (const [dest, flights] of Object.entries(data.data as Record<string, Record<string, any>>)) {
      const cheapest = Object.values(flights).reduce((min, f) => f.price < min.price ? f : min)
      result[dest] = {
        price: cheapest.price,
        date: cheapest.departure_at?.split('T')[0] || '',
        airline: cheapest.airline || '',
        transfers: cheapest.transfers ?? 0,
      }
    }
    return result
  } catch { return {} }
}

// Returns cheapest fare from hub to destination
async function cheapLeg(origin: string, dest: string, month: string): Promise<Leg | null> {
  try {
    const url = `https://api.travelpayouts.com/v1/prices/cheap?origin=${origin}&destination=${dest}&depart_date=${month}&currency=EUR&token=${TOKEN}`
    const res = await fetch(url)
    if (!res.ok) return null
    const data = await res.json()
    if (!data.success || !data.data?.[dest]) return null

    const cheapest = Object.values(data.data[dest] as Record<string, any>).reduce((min: any, f: any) => f.price < min.price ? f : min)
    return {
      price: cheapest.price,
      date: cheapest.departure_at?.split('T')[0] || '',
      airline: cheapest.airline || '',
      transfers: cheapest.transfers ?? 0,
    }
  } catch { return null }
}

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url)
  const origin = searchParams.get('origin')
  const destination = searchParams.get('destination')
  const month = searchParams.get('month')

  if (!origin || !destination || !month) {
    return NextResponse.json({ error: 'origin, destination, month required' }, { status: 400 })
  }

  // Leg 1: cheapest from origin to all destinations
  const leg1Map = await cheapFromOrigin(origin, month)

  // Check for direct flight
  const directFare = leg1Map[destination] ?? null

  // Take top 20 cheapest hubs (excluding direct destination)
  const hubs = Object.entries(leg1Map)
    .filter(([dest]) => dest !== destination)
    .sort(([, a], [, b]) => a.price - b.price)
    .slice(0, 20)
    .map(([dest, fare]) => ({ dest, ...fare }))

  // Leg 2: for each hub, find cheapest to destination (parallel)
  const leg2Results = await Promise.all(
    hubs.map(async hub => {
      const leg2 = await cheapLeg(hub.dest, destination, month)
      if (!leg2) return null
      return {
        hub: hub.dest,
        leg1Price: hub.price,
        leg1Date: hub.date,
        leg1Airline: hub.airline,
        leg1Transfers: hub.transfers,
        leg1Link: tpLink(origin, hub.dest, hub.date),
        leg2Price: leg2.price,
        leg2Date: leg2.date,
        leg2Airline: leg2.airline,
        leg2Transfers: leg2.transfers,
        leg2Link: tpLink(hub.dest, destination, leg2.date),
        total: hub.price + leg2.price,
      }
    })
  )

  const combos = leg2Results
    .filter(Boolean)
    .sort((a: any, b: any) => a.total - b.total)
    .slice(0, 10)

  return NextResponse.json({
    direct: directFare
      ? {
          price: directFare.price,
          date: directFare.date,
          airline: directFare.airline,
          transfers: directFare.transfers,
          link: tpLink(origin, destination, directFare.date),
        }
      : null,
    combos,
    origin,
    destination,
  })
}
