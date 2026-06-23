import { NextRequest, NextResponse } from 'next/server'
import { searchAirports } from '../../data/airports'
import { AIRPORT_GROUPS } from '../../data/airportGroups'

function normalize(s: string) {
  return s.toLowerCase().normalize('NFD').replace(/[̀-ͯ]/g, '')
}

function searchGroups(query: string) {
  const q = normalize(query.trim())
  return AIRPORT_GROUPS.filter(g =>
    normalize(g.label).includes(q) ||
    normalize(g.country).includes(q) ||
    g.codes.some(c => c.toLowerCase().startsWith(q))
  )
}

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url)
  const keyword = searchParams.get('keyword') || ''
  const airports = searchAirports(keyword)
  const groups = keyword.length >= 2 ? searchGroups(keyword) : []
  return NextResponse.json({ airports, groups })
}
