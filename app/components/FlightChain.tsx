'use client'

export interface SavedFlight {
  id: string
  origin: string
  originLabel: string
  destination: string
  destinationLabel: string
  date: string
  price: number
  source: string
  stops?: number
  link?: string
}

interface Props {
  flights: SavedFlight[]
  onRemove: (id: string) => void
  onContinueFrom: (flight: SavedFlight) => void
  selectedId: string | null
}

export default function FlightChain({ flights, onRemove, onContinueFrom, selectedId }: Props) {
  const total = flights.reduce((sum, f) => sum + f.price, 0)

  if (flights.length === 0) {
    return (
      <div className="bg-slate-900 border border-slate-700 rounded-2xl p-5 h-fit">
        <h2 className="text-white font-bold text-sm uppercase tracking-wider mb-3">✈️ Itinerar</h2>
        <p className="text-slate-600 text-sm text-center py-6">
          Dă click pe o zi din calendar pentru a adăuga un zbor
        </p>
      </div>
    )
  }

  return (
    <div className="bg-slate-900 border border-slate-700 rounded-2xl p-5 h-fit sticky top-4">
      <h2 className="text-white font-bold text-sm uppercase tracking-wider mb-4">✈️ Itinerar</h2>

      <div className="space-y-2">
        {flights.map((f, i) => (
          <div
            key={f.id}
            onClick={() => onContinueFrom(f)}
            className={`group relative rounded-xl p-3 cursor-pointer transition-all border ${
              selectedId === f.id
                ? 'bg-blue-700/30 border-blue-500'
                : 'bg-slate-800 border-slate-700 hover:border-slate-500'
            }`}
          >
            {/* Step number */}
            <div className="flex items-start gap-2">
              <span className="text-slate-600 text-xs font-mono mt-0.5 w-4 shrink-0">{i + 1}.</span>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-1 text-sm font-semibold text-white">
                  <span className="truncate">{f.originLabel.split(' (')[0]}</span>
                  <span className="text-slate-500 shrink-0">→</span>
                  <span className="truncate">{f.destinationLabel.split(' (')[0]}</span>
                </div>
                <div className="flex items-center gap-2 mt-0.5">
                  <span className="text-slate-400 text-xs">{f.date}</span>
                  {f.stops === 0 && <span className="text-green-500 text-xs">direct</span>}
                  {f.stops != null && f.stops > 0 && <span className="text-yellow-500 text-xs">{f.stops} escală</span>}
                  <span className="text-slate-600 text-xs">{f.source}</span>
                </div>
              </div>
              <div className="flex items-center gap-1.5 shrink-0">
                <span className="text-green-400 font-bold text-sm">{Math.round(f.price)}€</span>
                <button
                  onClick={e => { e.stopPropagation(); onRemove(f.id) }}
                  className="text-slate-600 hover:text-red-400 transition text-lg leading-none"
                  title="Șterge"
                >
                  ×
                </button>
              </div>
            </div>
            <div className="flex items-center justify-between mt-1.5 ml-6">
              <div className={`text-xs transition ${selectedId === f.id ? 'text-blue-400' : 'text-slate-600 group-hover:text-slate-500'}`}>
                {selectedId === f.id ? '← caută de la această destinație' : 'Click → continuă de aici'}
              </div>
              {f.link && (
                <a
                  href={f.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={e => e.stopPropagation()}
                  className="text-xs bg-blue-600 hover:bg-blue-500 text-white px-2 py-0.5 rounded-md transition shrink-0"
                  title={`Cumpără pe ${f.source}`}
                >
                  {f.source === 'Ryanair' ? 'ryanair.com →' : 'Cumpără →'}
                </a>
              )}
            </div>
          </div>
        ))}
      </div>

      {/* Connector dots between flights */}
      <div className="mt-4 pt-4 border-t border-slate-700">
        <div className="flex items-center justify-between">
          <span className="text-slate-400 text-sm">Total {flights.length} {flights.length === 1 ? 'zbor' : 'zboruri'}</span>
          <span className="text-white font-black text-xl">{Math.round(total)}€</span>
        </div>
        {flights.length > 1 && (
          <div className="mt-2 text-slate-500 text-xs">
            {flights[0].originLabel.split(' (')[0]} → {flights[flights.length - 1].destinationLabel.split(' (')[0]}
            {' · '}
            {flights[0].date} – {flights[flights.length - 1].date}
          </div>
        )}
      </div>

      <button
        onClick={() => flights.forEach(f => onRemove(f.id))}
        className="mt-3 w-full text-xs text-slate-600 hover:text-red-400 transition py-1"
      >
        Șterge tot itinerarul
      </button>
    </div>
  )
}
