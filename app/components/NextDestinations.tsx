'use client'

interface Destination {
  code: string
  city: string
  country: string
  airportName?: string
  price?: number
}

interface Props {
  from: string
  fromLabel: string
  destinations: Destination[]
  onSelect: (code: string, label: string) => void
  loading: boolean
}

export default function NextDestinations({ from, fromLabel, destinations, onSelect, loading }: Props) {
  if (loading) {
    return (
      <div className="mt-6 pt-6 border-t border-slate-700">
        <p className="text-slate-500 text-sm">Se încarcă destinații din {fromLabel}...</p>
      </div>
    )
  }

  if (!destinations.length) return null

  return (
    <div className="mt-6 pt-6 border-t border-slate-700">
      <p className="text-slate-400 text-sm font-semibold mb-3">
        ✈️ Din <span className="text-white">{fromLabel}</span> poți zbura spre:
      </p>
      <div className="flex flex-wrap gap-2">
        {destinations.map(d => (
          <button
            key={d.code}
            onClick={() => onSelect(d.code, `${d.city} (${d.code})`)}
            className="flex items-center gap-1.5 px-3 py-1.5 bg-slate-800 hover:bg-blue-700 border border-slate-700 hover:border-blue-500 rounded-lg text-sm text-slate-300 hover:text-white transition group"
          >
            <span className="font-medium">{d.city || d.code}</span>
            <span className="text-slate-500 text-xs">{d.code}</span>
            {d.country && <span className="text-slate-600 text-xs">· {d.country}</span>}
            {d.price != null && (
              <span className="text-green-400 text-xs font-bold ml-1">{Math.round(d.price)}€</span>
            )}
          </button>
        ))}
      </div>
    </div>
  )
}
