import { NextRequest, NextResponse } from 'next/server'

const TOKEN = process.env.TRAVELPAYOUTS_API_KEY
const MARKER = process.env.TRAVELPAYOUTS_MARKER

const RYANAIR_HEADERS = {
  'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124.0.0.0 Safari/537.36',
  'Accept': 'application/json',
  'Referer': 'https://www.ryanair.com/',
}

function tpLink(origin: string, dest: string, date: string) {
  if (!date) return `https://aviasales.com/search/${origin}0101${dest}1?marker=${MARKER}&with_request=true`
  const [, m, d] = date.split('-')
  return `https://aviasales.com/search/${origin}${d}${m}${dest}1?marker=${MARKER}&with_request=true`
}

function ryLink(origin: string, dest: string, date: string) {
  return `https://www.ryanair.com/en/cheap-flights/${origin.toLowerCase()}-to-${dest.toLowerCase()}/?dateOut=${date}`
}

interface Leg {
  price: number
  date: string
  airline: string
  transfers: number
  source: string
  link: string
}

// Ryanair: all fares from origin for the month
async function getRyanairFromOrigin(origin: string, month: string): Promise<Record<string, Leg>> {
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
    const res = await fetch(`https://www.ryanair.com/api/farfnd/v4/oneWayFares?${params}`, { headers: RYANAIR_HEADERS })
    if (!res.ok) return {}
    const data = await res.json()
    const result: Record<string, Leg> = {}
    for (const fare of data.fares || []) {
      const dest = fare.outbound?.arrivalAirport?.iataCode
      const price = fare.outbound?.price?.value
      const date = fare.outbound?.departureDate?.split('T')[0]
      if (!dest || !price) continue
      if (!result[dest] || price < result[dest].price) {
        result[dest] = { price, date, airline: 'FR', transfers: 0, source: 'Ryanair', link: ryLink(origin, dest, date) }
      }
    }
    return result
  } catch { return {} }
}

// Ryanair: cheapest per day for a specific route
async function getRyanairLeg(origin: string, dest: string, month: string): Promise<Leg | null> {
  try {
    const url = `https://www.ryanair.com/api/farfnd/v4/oneWayFares/${origin}/${dest}/cheapestPerDay?outboundMonthOfDate=${month}-01&currency=EUR`
    const res = await fetch(url, { headers: RYANAIR_HEADERS })
    if (!res.ok) return null
    const data = await res.json()
    const fares = (data.outbound?.fares || []).filter((f: any) => !f.soldOut && !f.unavailable && f.price?.value)
    if (!fares.length) return null
    const cheapest = fares.reduce((min: any, f: any) => f.price.value < min.price.value ? f : min)
    return { price: cheapest.price.value, date: cheapest.day, airline: 'FR', transfers: 0, source: 'Ryanair', link: ryLink(origin, dest, cheapest.day) }
  } catch { return null }
}

// TP: all fares from origin for the month
async function getTpFromOrigin(origin: string, month: string): Promise<Record<string, Leg>> {
  try {
    const url = `https://api.travelpayouts.com/v1/prices/cheap?origin=${origin}&depart_date=${month}&currency=EUR&token=${TOKEN}`
    const res = await fetch(url)
    if (!res.ok) return {}
    const data = await res.json()
    if (!data.success || !data.data) return {}
    const result: Record<string, Leg> = {}
    for (const [dest, flights] of Object.entries(data.data as Record<string, Record<string, any>>)) {
      const cheapest = Object.values(flights).reduce((min, f) => f.price < min.price ? f : min)
      const date = cheapest.departure_at?.split('T')[0] || ''
      result[dest] = { price: cheapest.price, date, airline: cheapest.airline || '', transfers: cheapest.transfers ?? 0, source: 'Travelpayouts', link: tpLink(origin, dest, date) }
    }
    return result
  } catch { return {} }
}

// TP: cheapest for a specific route
async function getTpLeg(origin: string, dest: string, month: string): Promise<Leg | null> {
  try {
    const url = `https://api.travelpayouts.com/v1/prices/cheap?origin=${origin}&destination=${dest}&depart_date=${month}&currency=EUR&token=${TOKEN}`
    const res = await fetch(url)
    if (!res.ok) return null
    const data = await res.json()
    if (!data.success || !data.data?.[dest]) return null
    const cheapest = Object.values(data.data[dest] as Record<string, any>).reduce((min: any, f: any) => f.price < min.price ? f : min)
    const date = cheapest.departure_at?.split('T')[0] || ''
    return { price: cheapest.price, date, airline: cheapest.airline || '', transfers: cheapest.transfers ?? 0, source: 'Travelpayouts', link: tpLink(origin, dest, date) }
  } catch { return null }
}

// Merge two leg maps, keeping cheapest per destination
function mergeLegMaps(a: Record<string, Leg>, b: Record<string, Leg>): Record<string, Leg> {
  const result = { ...a }
  for (const [dest, leg] of Object.entries(b)) {
    if (!result[dest] || leg.price < result[dest].price) result[dest] = leg
  }
  return result
}

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url)
  const origin = searchParams.get('origin')
  const destination = searchParams.get('destination')
  const month = searchParams.get('month')

  if (!origin || !destination || !month) {
    return NextResponse.json({ error: 'origin, destination, month required' }, { status: 400 })
  }

  // Leg 1: both Ryanair + TP from origin, merged
  const [ryLeg1, tpLeg1] = await Promise.all([
    getRyanairFromOrigin(origin, month),
    getTpFromOrigin(origin, month),
  ])
  const leg1Map = mergeLegMaps(tpLeg1, ryLeg1) // Ryanair wins ties (cheaper direct)

  // Direct flight
  const directFare = leg1Map[destination] ?? null

  // Major global hubs to always check even if not reachable from origin
  const MAJOR_HUBS = [
    'LHR','LGW','STN','CDG','ORY','AMS','FRA','MUC','BER','ZRH','VIE',
    'IST','SAW','DXB','DOH','AUH','RUH','CAI',
    'JFK','EWR','ORD','ATL','MIA','LAX','SFO','BOS','IAD',
    'YYZ','YUL','YVR',
    'GRU','EZE','BOG','LIM','SCL',
    'NBO','JNB','ADD','LOS',
    'DEL','BOM','BKK','SIN','KUL','CGK','HKG','PEK','PVG','ICN','NRT','HND',
    'SYD','MEL',
  ]

  const leg1Hubs = Object.entries(leg1Map)
    .filter(([dest]) => dest !== destination)
    .map(([dest, fare]) => ({ dest, ...fare }))

  const leg1Codes = new Set(leg1Hubs.map(h => h.dest))
  const extraHubs = MAJOR_HUBS
    .filter(h => h !== origin && h !== destination && !leg1Codes.has(h))
    .map(h => ({ dest: h, price: Infinity, date: '', airline: '', transfers: 0, source: '', link: '' }))

  const hubs = [...leg1Hubs, ...extraHubs]

  // Leg 2: Ryanair + TP for each hub → destination (parallel)
  const leg2Results = await Promise.all(
    hubs.map(async hub => {
      const [ryLeg2, tpLeg2] = await Promise.all([
        getRyanairLeg(hub.dest, destination, month),
        getTpLeg(hub.dest, destination, month),
      ])
      // Pick cheapest leg2
      let leg2: Leg | null = null
      if (ryLeg2 && tpLeg2) leg2 = ryLeg2.price <= tpLeg2.price ? ryLeg2 : tpLeg2
      else leg2 = ryLeg2 ?? tpLeg2

      if (!leg2 || hub.price === Infinity) return null
      return {
        hub: hub.dest,
        leg1Price: hub.price,
        leg1Date: hub.date,
        leg1Airline: hub.airline || hub.source,
        leg1Transfers: hub.transfers,
        leg1Link: hub.link || tpLink(origin, hub.dest, hub.date),
        leg1Source: hub.source,
        leg2Price: leg2.price,
        leg2Date: leg2.date,
        leg2Airline: leg2.airline || leg2.source,
        leg2Transfers: leg2.transfers,
        leg2Link: leg2.link,
        leg2Source: leg2.source,
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
          airline: directFare.airline || directFare.source,
          transfers: directFare.transfers,
          link: directFare.link,
        }
      : null,
    combos,
    origin,
    destination,
  })
}
