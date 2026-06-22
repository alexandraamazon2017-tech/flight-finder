'use client'

import { useState, useCallback } from 'react'
import AirportSearch from './components/AirportSearch'
import PriceCalendar, { Fare } from './components/PriceCalendar'
import InspireResults from './components/InspireResults'
import FlightChain, { SavedFlight } from './components/FlightChain'

type Mode = 'calendar' | 'inspire'
type TripType = 'oneway' | 'roundtrip'

interface Destination {
  destination: string
  destinationName: string
  destinationCity: string
  price: number
  currency: string
  date: string
  source: string
}

export default function Home() {
  const [mode, setMode] = useState<Mode>('calendar')
  const [tripType, setTripType] = useState<TripType>('oneway')
  const [origin, setOrigin] = useState({ code: '', label: '' })
  const [destination, setDestination] = useState({ code: '', label: '' })
  const [month, setMonth] = useState(() => {
    const d = new Date()
    d.setMonth(d.getMonth() + 1)
    return d.toISOString().slice(0, 7)
  })
  const [maxPrice, setMaxPrice] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [outboundFares, setOutboundFares] = useState<Fare[]>([])
  const [returnFares, setReturnFares] = useState<Fare[]>([])
  const [inspireData, setInspireData] = useState<Destination[]>([])
  const [searched, setSearched] = useState(false)
  const [availableRoutes, setAvailableRoutes] = useState<{ code: string; city: string; country: string }[]>([])

  // Flight chain state
  const [chain, setChain] = useState<SavedFlight[]>([])
  const [selectedChainId, setSelectedChainId] = useState<string | null>(null)
  const [selectedDate, setSelectedDate] = useState<string | undefined>(undefined)

  const search = async () => {
    if (!origin.code) { setError('Selectează orașul de plecare.'); return }
    if (mode === 'calendar' && !destination.code) { setError('Selectează destinația.'); return }

    setError('')
    setLoading(true)
    setSearched(false)
    setSelectedDate(undefined)

    try {
      if (mode === 'calendar') {
        const params = new URLSearchParams({ origin: origin.code, destination: destination.code, month, tripType })
        const res = await fetch(`/api/flights/calendar?${params}`)
        const data = await res.json()
        if (data.error) { setError(data.error); return }
        setOutboundFares(data.outbound || [])
        setReturnFares(data.return || [])
        if ((data.outbound || []).length === 0) {
          const rRes = await fetch(`/api/flights/routes?origin=${origin.code}`)
          const rData = await rRes.json()
          setAvailableRoutes(rData.routes || [])
        } else {
          setAvailableRoutes([])
        }
      } else {
        const params = new URLSearchParams({ origin: origin.code, month })
        if (maxPrice) params.set('maxPrice', maxPrice)
        const res = await fetch(`/api/flights/inspire?${params}`)
        const data = await res.json()
        if (data.error) { setError(data.error); return }
        setInspireData(data.destinations || [])
      }
      setSearched(true)
    } finally {
      setLoading(false)
    }
  }

  const handleSelectFare = useCallback((fare: Fare) => {
    setSelectedDate(fare.date)
    const flight: SavedFlight = {
      id: `${origin.code}-${destination.code}-${fare.date}-${Date.now()}`,
      origin: origin.code,
      originLabel: origin.label,
      destination: destination.code,
      destinationLabel: destination.label,
      date: fare.date,
      price: fare.price,
      source: fare.source,
      stops: fare.stops,
      link: fare.link,
    }
    setChain(prev => [...prev, flight])
    setSelectedChainId(flight.id)
  }, [origin, destination])

  const handleRemoveFlight = useCallback((id: string) => {
    setChain(prev => prev.filter(f => f.id !== id))
    setSelectedChainId(prev => prev === id ? null : prev)
  }, [])

  const handleContinueFrom = useCallback((flight: SavedFlight) => {
    setSelectedChainId(flight.id)
    // Set origin to this flight's destination
    setOrigin({ code: flight.destination, label: flight.destinationLabel })
    setDestination({ code: '', label: '' })
    // Set month to the flight's date month
    setMonth(flight.date.slice(0, 7))
    setSearched(false)
    setOutboundFares([])
    setReturnFares([])
    setSelectedDate(undefined)
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }, [])

  const months = Array.from({ length: 12 }, (_, i) => {
    const d = new Date()
    d.setMonth(d.getMonth() + i)
    return { value: d.toISOString().slice(0, 7), label: d.toLocaleString('ro-RO', { month: 'long', year: 'numeric' }) }
  })

  const noResults = mode === 'calendar' && searched && outboundFares.length === 0

  return (
    <main className="min-h-screen bg-[#0b0d1a] text-white">
      <header className="border-b border-slate-800 px-6 py-4 flex items-center gap-3">
        <span className="text-2xl">✈️</span>
        <h1 className="text-xl font-bold text-white">FlightFinder</h1>
        <span className="text-slate-500 text-sm ml-1">— zboruri ieftine</span>
      </header>

      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="flex gap-6 items-start">

          {/* LEFT — search + results */}
          <div className="flex-1 min-w-0">

            {/* Mode tabs */}
            <div className="flex gap-2 mb-6 bg-slate-800/60 p-1 rounded-xl w-fit">
              <button
                onClick={() => { setMode('calendar'); setSearched(false) }}
                className={`px-5 py-2 rounded-lg text-sm font-semibold transition ${mode === 'calendar' ? 'bg-blue-600 text-white' : 'text-slate-400 hover:text-white'}`}
              >
                📅 Calendar prețuri
              </button>
              <button
                onClick={() => { setMode('inspire'); setSearched(false) }}
                className={`px-5 py-2 rounded-lg text-sm font-semibold transition ${mode === 'inspire' ? 'bg-blue-600 text-white' : 'text-slate-400 hover:text-white'}`}
              >
                🌍 Unde zbor ieftin?
              </button>
            </div>

            {/* Search form */}
            <div className="bg-slate-900 border border-slate-700 rounded-2xl p-5 mb-6 shadow-xl">
              {mode === 'calendar' && (
                <div className="flex gap-2 mb-4">
                  <button
                    onClick={() => setTripType('oneway')}
                    className={`px-4 py-1.5 rounded-lg text-sm font-medium transition border ${tripType === 'oneway' ? 'bg-blue-600 border-blue-600 text-white' : 'border-slate-600 text-slate-400 hover:text-white'}`}
                  >
                    ➡️ Dus simplu
                  </button>
                  <button
                    onClick={() => setTripType('roundtrip')}
                    className={`px-4 py-1.5 rounded-lg text-sm font-medium transition border ${tripType === 'roundtrip' ? 'bg-blue-600 border-blue-600 text-white' : 'border-slate-600 text-slate-400 hover:text-white'}`}
                  >
                    🔄 Dus-întors
                  </button>
                </div>
              )}

              <div className={`grid gap-4 ${mode === 'calendar' ? 'md:grid-cols-4' : 'md:grid-cols-3'}`}>
                <AirportSearch
                  label="De la"
                  value={origin.label}
                  onChange={(code, label) => setOrigin({ code, label })}
                  placeholder="București, Iași..."
                />
                {mode === 'calendar' && (
                  <AirportSearch
                    label="Până la"
                    value={destination.label}
                    onChange={(code, label) => setDestination({ code, label })}
                    placeholder="Londra, Roma..."
                  />
                )}
                <div>
                  <label className="block text-xs font-semibold text-slate-400 uppercase tracking-wider mb-1">Luna</label>
                  <select
                    value={month}
                    onChange={e => setMonth(e.target.value)}
                    className="w-full bg-slate-800 border border-slate-700 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-blue-500 transition"
                  >
                    {months.map(m => (
                      <option key={m.value} value={m.value}>{m.label}</option>
                    ))}
                  </select>
                </div>
                {mode === 'inspire' && (
                  <div>
                    <label className="block text-xs font-semibold text-slate-400 uppercase tracking-wider mb-1">Preț max (€)</label>
                    <input
                      type="number"
                      value={maxPrice}
                      onChange={e => setMaxPrice(e.target.value)}
                      placeholder="ex: 150"
                      className="w-full bg-slate-800 border border-slate-700 rounded-xl px-4 py-3 text-white placeholder-slate-500 focus:outline-none focus:border-blue-500 transition"
                    />
                  </div>
                )}
              </div>

              {error && <p className="text-red-400 text-sm mt-4">{error}</p>}

              <button
                onClick={search}
                disabled={loading}
                className="mt-4 w-full bg-blue-600 hover:bg-blue-500 disabled:opacity-50 disabled:cursor-not-allowed text-white font-bold py-3 rounded-xl transition"
              >
                {loading ? 'Se caută...' : mode === 'calendar' ? '🔍 Caută zile ieftine' : '🌍 Găsește destinații ieftine'}
              </button>
            </div>

            {/* Results */}
            {searched && (
              <div className="space-y-6">
                {mode === 'calendar' ? (
                  noResults ? (
                    <div className="bg-slate-900 border border-slate-700 rounded-2xl p-6">
                      <p className="text-slate-300 font-semibold mb-1">
                        Ruta {origin.label} → {destination.label} nu e operată de Ryanair sau Wizz Air.
                      </p>
                      {availableRoutes.length > 0 && (
                        <>
                          <p className="text-slate-500 text-sm mb-4">Destinații disponibile din {origin.label} via Ryanair:</p>
                          <div className="flex flex-wrap gap-2">
                            {availableRoutes.map(r => (
                              <button
                                key={r.code}
                                onClick={() => setDestination({ code: r.code, label: `${r.city} (${r.code})` })}
                                className="px-3 py-1.5 bg-slate-800 hover:bg-blue-700 border border-slate-700 hover:border-blue-500 rounded-lg text-sm text-slate-300 hover:text-white transition"
                              >
                                {r.city} <span className="text-slate-500 text-xs">{r.code}</span>
                              </button>
                            ))}
                          </div>
                        </>
                      )}
                    </div>
                  ) : (
                    <>
                      {/* Outbound */}
                      <div className="bg-slate-900 border border-slate-700 rounded-2xl p-6 shadow-xl">
                        <div className="flex items-center justify-between mb-5">
                          <h2 className="text-white font-bold">
                            {tripType === 'roundtrip' ? '✈️ Dus — ' : ''}{origin.label} → {destination.label}
                          </h2>
                          <span className="text-slate-400 text-sm">
                            Cel mai ieftin: <span className="text-green-400 font-bold">{Math.round(Math.min(...outboundFares.map(d => d.price)))}€</span>
                          </span>
                        </div>
                        <PriceCalendar
                          data={outboundFares}
                          month={month}
                          currency="EUR"
                          onSelectFare={handleSelectFare}
                          selectedDate={selectedDate}
                        />
                        <TopFares fares={outboundFares} onSelect={handleSelectFare} selectedDate={selectedDate} />
                      </div>

                      {/* Return */}
                      {tripType === 'roundtrip' && returnFares.length > 0 && (
                        <div className="bg-slate-900 border border-slate-700 rounded-2xl p-6 shadow-xl">
                          <div className="flex items-center justify-between mb-5">
                            <h2 className="text-white font-bold">
                              🔄 Întors — {destination.label} → {origin.label}
                            </h2>
                            <span className="text-slate-400 text-sm">
                              Cel mai ieftin: <span className="text-green-400 font-bold">{Math.round(Math.min(...returnFares.map(d => d.price)))}€</span>
                            </span>
                          </div>
                          <PriceCalendar data={returnFares} month={month} currency="EUR" />
                          <TopFares fares={returnFares} onSelect={() => {}} selectedDate={undefined} />
                        </div>
                      )}
                    </>
                  )
                ) : (
                  <div className="bg-slate-900 border border-slate-700 rounded-2xl p-6 shadow-xl">
                    {inspireData.length === 0 ? (
                      <p className="text-center text-slate-400 py-8">Nu s-au găsit destinații pentru criteriile selectate.</p>
                    ) : (
                      <>
                        <h2 className="text-white font-bold text-lg mb-6">Destinații ieftine din {origin.label}</h2>
                        <InspireResults data={inspireData} />
                      </>
                    )}
                  </div>
                )}
              </div>
            )}

            {!searched && !loading && (
              <div className="text-center py-12">
                <div className="text-5xl mb-3">🌍</div>
                <p className="text-slate-500">Introdu un aeroport de plecare și caută zboruri ieftine</p>
              </div>
            )}
          </div>

          {/* RIGHT — flight chain */}
          <div className="w-72 shrink-0">
            <FlightChain
              flights={chain}
              onRemove={handleRemoveFlight}
              onContinueFrom={handleContinueFrom}
              selectedId={selectedChainId}
            />
          </div>
        </div>
      </div>
    </main>
  )
}

function TopFares({ fares, onSelect, selectedDate }: { fares: Fare[]; onSelect: (f: Fare) => void; selectedDate?: string }) {
  return (
    <div className="mt-6">
      <h3 className="text-slate-400 font-semibold text-xs uppercase tracking-wider mb-3">Top 5 cele mai ieftine zile</h3>
      <div className="space-y-2">
        {[...fares].sort((a, b) => a.price - b.price).slice(0, 5).map((d, i) => (
          <div
            key={d.date}
            onClick={() => onSelect(d)}
            className={`flex items-center justify-between rounded-xl px-4 py-3 cursor-pointer transition ${
              selectedDate === d.date
                ? 'bg-blue-700/40 border border-blue-500'
                : 'bg-slate-800 hover:bg-slate-700 border border-transparent'
            }`}
          >
            <div className="flex items-center gap-3">
              <span className="text-slate-600 text-sm font-mono w-4">{i + 1}</span>
              <span className="text-white">{d.date}</span>
              <span className="text-slate-500 text-xs">{d.source}</span>
            </div>
            <div className="flex items-center gap-2">
              <span className={`font-bold ${i === 0 ? 'text-green-400 text-lg' : 'text-slate-300'}`}>
                {Math.round(d.price)}€
              </span>
              {d.stops === 0 && <span className="text-green-600 text-xs">direct</span>}
              {d.link && (
                <a
                  href={d.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={e => e.stopPropagation()}
                  className="text-xs bg-blue-600 hover:bg-blue-500 text-white px-2 py-0.5 rounded-md transition"
                >
                  →
                </a>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
