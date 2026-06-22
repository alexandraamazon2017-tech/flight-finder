'use client'

interface Destination {
  destination: string
  destinationName: string
  destinationCity: string
  price: number
  currency: string
  date: string
  source: string
  link?: string
}

interface Props {
  data: Destination[]
  onSelect?: (dest: Destination) => void
}

const FLAG_MAP: Record<string, string> = {
  ES: '🇪🇸', GB: '🇬🇧', FR: '🇫🇷', IT: '🇮🇹', DE: '🇩🇪', GR: '🇬🇷',
  TR: '🇹🇷', PT: '🇵🇹', NL: '🇳🇱', BE: '🇧🇪', AT: '🇦🇹', PL: '🇵🇱',
  CZ: '🇨🇿', HU: '🇭🇺', HR: '🇭🇷', BG: '🇧🇬', RO: '🇷🇴', IE: '🇮🇪',
  MT: '🇲🇹', CY: '🇨🇾', SK: '🇸🇰', LT: '🇱🇹', LV: '🇱🇻', EE: '🇪🇪',
  SE: '🇸🇪', NO: '🇳🇴', DK: '🇩🇰', FI: '🇫🇮', CH: '🇨🇭', MA: '🇲🇦',
}

function getFlag(iata: string) {
  const prefix = iata.slice(0, 2)
  return FLAG_MAP[prefix] || '✈️'
}

export default function InspireResults({ data, onSelect }: Props) {
  if (!data.length) return null

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
      {data.map((dest, i) => (
        <div
          key={dest.destination + dest.date}
          onClick={() => onSelect?.(dest)}
          className={`rounded-2xl p-5 border transition-all hover:scale-[1.02] cursor-pointer ${
            i === 0
              ? 'bg-gradient-to-br from-blue-600 to-indigo-700 border-blue-500 shadow-lg shadow-blue-900/40'
              : 'bg-slate-800 border-slate-700 hover:border-slate-600'
          }`}
        >
          {i === 0 && (
            <span className="text-xs bg-white/20 text-white px-2 py-0.5 rounded-full font-semibold mb-2 inline-block">
              Cel mai ieftin
            </span>
          )}
          <div className="flex items-center justify-between">
            <div>
              <div className="text-2xl">{getFlag(dest.destination)}</div>
              <div className="text-white font-bold text-xl mt-1">{dest.destinationCity || dest.destination}</div>
              <div className="text-slate-400 text-xs mt-0.5">{dest.destination} · {dest.date}</div>
              <div className="text-slate-500 text-xs mt-0.5">{dest.source}</div>
            </div>
            <div className="text-right flex flex-col items-end gap-2">
              <div className={`text-3xl font-black ${i === 0 ? 'text-white' : 'text-green-400'}`}>
                {Math.round(dest.price)}€
              </div>
              <div className="text-slate-400 text-xs">dus simplu</div>
              {dest.link && (
                <a
                  href={dest.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={e => e.stopPropagation()}
                  className="text-xs bg-blue-600 hover:bg-blue-500 text-white px-3 py-1 rounded-lg transition"
                >
                  Rezervă →
                </a>
              )}
            </div>
          </div>
        </div>
      ))}
    </div>
  )
}
