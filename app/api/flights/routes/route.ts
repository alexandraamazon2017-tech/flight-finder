import { NextRequest, NextResponse } from 'next/server'
import { getRoutes } from '../../../data/routes'

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url)
  const origin = searchParams.get('origin') || ''
  return NextResponse.json({ routes: getRoutes(origin) })
}
