import { NextRequest, NextResponse } from 'next/server'
import { searchAirports } from '../../data/airports'

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url)
  const keyword = searchParams.get('keyword') || ''
  return NextResponse.json({ airports: searchAirports(keyword) })
}
