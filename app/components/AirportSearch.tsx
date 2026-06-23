'use client'

import { useState, useEffect, useRef } from 'react'

interface Airport {
  iataCode: string
  name: string
  city: string
  country: string
}

interface AirportGroup {
  id: string
  label: string
  country: string
  codes: string[]
}

interface Props {
  label: string
  value: string
  onChange: (code: string, label: string) => void
  placeholder?: string
}

export default function AirportSearch({ label, value, onChange, placeholder }: Props) {
  const [query, setQuery] = useState(value)
  const [results, setResults] = useState<Airport[]>([])
  const [groups, setGroups] = useState<AirportGroup[]>([])
  const [open, setOpen] = useState(false)
  const [loading, setLoading] = useState(false)
  const debounce = useRef<ReturnType<typeof setTimeout> | null>(null)
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => { setQuery(value) }, [value])

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false)
    }
    document.addEventListener('mousedown', handler)
    return () => document.removeEventListener('mousedown', handler)
  }, [])

  const search = (q: string) => {
    setQuery(q)
    if (debounce.current) clearTimeout(debounce.current)
    if (q.length < 2) {
      setResults([])
      setGroups([])
      setOpen(false)
      if (q.length === 0) onChange('', '')
      return
    }
    debounce.current = setTimeout(async () => {
      setLoading(true)
      try {
        const res = await fetch(`/api/airports?keyword=${encodeURIComponent(q)}`)
        const data = await res.json()
        setResults(data.airports || [])
        setGroups(data.groups || [])
        setOpen(true)
      } finally {
        setLoading(false)
      }
    }, 300)
  }

  const selectAirport = (a: Airport) => {
    const display = `${a.city} (${a.iataCode})`
    setQuery(display)
    setOpen(false)
    onChange(a.iataCode, display)
  }

  const selectGroup = (g: AirportGroup) => {
    const display = `${g.label} (toate aeroporturile)`
    setQuery(display)
    setOpen(false)
    onChange(g.codes.join(','), display)
  }

  const hasResults = results.length > 0 || groups.length > 0

  return (
    <div className="relative" ref={ref}>
      <label className="block text-xs font-semibold text-slate-400 uppercase tracking-wider mb-1">{label}</label>
      <input
        type="text"
        value={query}
        onChange={e => search(e.target.value)}
        onFocus={() => hasResults && setOpen(true)}
        placeholder={placeholder || 'Oraș sau aeroport...'}
        className="w-full bg-slate-800 border border-slate-700 rounded-xl px-4 py-3 text-white placeholder-slate-500 focus:outline-none focus:border-blue-500 transition"
      />
      {loading && <div className="absolute right-3 top-9 text-slate-500 text-xs">...</div>}
      {open && hasResults && (
        <ul className="absolute z-50 w-full mt-1 bg-slate-800 border border-slate-700 rounded-xl overflow-hidden shadow-2xl">
          {/* Groups first */}
          {groups.map(g => (
            <li
              key={g.id}
              onClick={() => selectGroup(g)}
              className="px-4 py-3 hover:bg-slate-700 cursor-pointer flex items-center gap-3 border-b border-slate-700/50"
            >
              <span className="text-yellow-400 font-bold text-sm w-10">✈✈</span>
              <div>
                <div className="text-white text-sm flex items-center gap-2">
                  {g.label}
                  <span className="text-xs bg-yellow-500/20 text-yellow-400 px-1.5 py-0.5 rounded">toate aeroporturile</span>
                </div>
                <div className="text-slate-400 text-xs">{g.codes.join(' · ')} · {g.country}</div>
              </div>
            </li>
          ))}
          {/* Individual airports */}
          {results.map(a => (
            <li
              key={a.iataCode}
              onClick={() => selectAirport(a)}
              className="px-4 py-3 hover:bg-slate-700 cursor-pointer flex items-center gap-3"
            >
              <span className="text-blue-400 font-bold text-sm w-10">{a.iataCode}</span>
              <div>
                <div className="text-white text-sm">{a.city}</div>
                <div className="text-slate-400 text-xs">{a.name} · {a.country}</div>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}
