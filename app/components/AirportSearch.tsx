'use client'

import { useState, useEffect, useRef } from 'react'

interface Airport {
  iataCode: string
  name: string
  city: string
  country: string
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
  const [open, setOpen] = useState(false)
  const [loading, setLoading] = useState(false)
  const debounce = useRef<ReturnType<typeof setTimeout> | null>(null)
  const ref = useRef<HTMLDivElement>(null)

  // Sync internal query when parent sets value externally (e.g. clicking a suggestion chip)
  useEffect(() => {
    setQuery(value)
  }, [value])

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
    if (q.length < 2) { setResults([]); setOpen(false); return }
    debounce.current = setTimeout(async () => {
      setLoading(true)
      try {
        const res = await fetch(`/api/airports?keyword=${encodeURIComponent(q)}`)
        const data = await res.json()
        setResults(data.airports || [])
        setOpen(true)
      } finally {
        setLoading(false)
      }
    }, 300)
  }

  const select = (a: Airport) => {
    const display = `${a.city} (${a.iataCode})`
    setQuery(display)
    setOpen(false)
    onChange(a.iataCode, display)
  }

  return (
    <div className="relative" ref={ref}>
      <label className="block text-xs font-semibold text-slate-400 uppercase tracking-wider mb-1">{label}</label>
      <input
        type="text"
        value={query}
        onChange={e => search(e.target.value)}
        onFocus={() => results.length > 0 && setOpen(true)}
        placeholder={placeholder || 'Oraș sau aeroport...'}
        className="w-full bg-slate-800 border border-slate-700 rounded-xl px-4 py-3 text-white placeholder-slate-500 focus:outline-none focus:border-blue-500 transition"
      />
      {loading && <div className="absolute right-3 top-9 text-slate-500 text-xs">...</div>}
      {open && results.length > 0 && (
        <ul className="absolute z-50 w-full mt-1 bg-slate-800 border border-slate-700 rounded-xl overflow-hidden shadow-2xl">
          {results.map(a => (
            <li
              key={a.iataCode}
              onClick={() => select(a)}
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
