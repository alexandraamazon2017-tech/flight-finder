'use client'

import 'leaflet/dist/leaflet.css'
import { useEffect, useRef } from 'react'
import { AIRPORT_COORDS } from '../data/coords'
import type { SavedFlight } from './FlightChain'

interface Props {
  flights: SavedFlight[]
}

export default function ItineraryMap({ flights }: Props) {
  const containerRef = useRef<HTMLDivElement>(null)
  const mapRef = useRef<any>(null)

  useEffect(() => {
    if (!containerRef.current || flights.length === 0) return

    import('leaflet').then(L => {
      // Fix default marker icon path in Next.js
      delete (L.Icon.Default.prototype as any)._getIconUrl
      L.Icon.Default.mergeOptions({
        iconRetinaUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png',
        iconUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png',
        shadowUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png',
      })

      // Destroy existing map instance if any
      if (mapRef.current) {
        mapRef.current.remove()
        mapRef.current = null
      }

      const map = L.map(containerRef.current!, {
        zoomControl: true,
        attributionControl: false,
      })
      mapRef.current = map

      // Dark tile layer
      L.tileLayer('https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png', {
        maxZoom: 19,
      }).addTo(map)

      // Collect all airports in order (unique stops)
      const stops: string[] = []
      for (const f of flights) {
        if (!stops.includes(f.origin)) stops.push(f.origin)
        if (!stops.includes(f.destination)) stops.push(f.destination)
      }

      const points: [number, number][] = []
      const markers: any[] = []

      stops.forEach((code, i) => {
        const coords = AIRPORT_COORDS[code]
        if (!coords) return
        points.push(coords)

        // Custom circle marker
        const circle = L.circleMarker(coords, {
          radius: 7,
          fillColor: i === 0 ? '#22c55e' : i === stops.length - 1 ? '#f97316' : '#3b82f6',
          color: '#fff',
          weight: 2,
          opacity: 1,
          fillOpacity: 1,
        }).addTo(map)

        // Label
        const label = L.divIcon({
          className: '',
          html: `<div style="
            background:#1e293b;
            color:#fff;
            font-size:11px;
            font-weight:700;
            padding:2px 6px;
            border-radius:4px;
            border:1px solid #334155;
            white-space:nowrap;
            margin-top:10px;
            margin-left:4px;
          ">${code}</div>`,
          iconAnchor: [0, 0],
        })
        L.marker(coords, { icon: label, interactive: false }).addTo(map)
        markers.push(circle)
      })

      // Draw route lines (great-circle approximation via geodesic points)
      for (let i = 0; i < points.length - 1; i++) {
        L.polyline([points[i], points[i + 1]], {
          color: '#3b82f6',
          weight: 2.5,
          opacity: 0.8,
          dashArray: '6 4',
        }).addTo(map)
      }

      // Fit map to all points
      if (points.length > 0) {
        const bounds = L.latLngBounds(points)
        map.fitBounds(bounds, { padding: [30, 30], maxZoom: 8 })
      }
    })

    return () => {
      if (mapRef.current) {
        mapRef.current.remove()
        mapRef.current = null
      }
    }
  }, [flights])

  if (flights.length === 0) return null

  return (
    <div className="mt-4 rounded-2xl overflow-hidden border border-slate-700">
      <div ref={containerRef} style={{ height: '260px', width: '100%' }} />
    </div>
  )
}
