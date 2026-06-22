'use client'

interface Combo {
  hub: string
  leg1Price: number
  leg1Date: string
  leg1Airline: string
  leg1Transfers: number
  leg1Link: string
  leg2Price: number
  leg2Date: string
  leg2Airline: string
  leg2Transfers: number
  leg2Link: string
  total: number
}

interface DirectFare {
  price: number
  date: string
  airline: string
  transfers: number
  link: string
}

interface Props {
  origin: string
  originLabel: string
  destination: string
  destinationLabel: string
  direct: DirectFare | null
  combos: Combo[]
  hubNames: Record<string, string>
}

function AirlineBadge({ code, transfers }: { code: string; transfers: number }) {
  if (!code) return null
  return (
    <span className="inline-flex items-center gap-1 bg-slate-700 text-slate-300 text-xs px-2 py-0.5 rounded-full">
      ✈ {code}
      {transfers > 0 && <span className="text-yellow-400">· {transfers} escală</span>}
      {transfers === 0 && <span className="text-green-400">· direct</span>}
    </span>
  )
}

export default function MultihopResults({ origin, originLabel, destination, destinationLabel, direct, combos, hubNames }: Props) {
  const cheapestCombo = combos[0]?.total ?? Infinity
  const cheapestTotal = direct ? Math.min(direct.price, cheapestCombo) : cheapestCombo

  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-white font-bold text-lg">
          {originLabel} → {destinationLabel}
        </h2>
        {cheapestTotal < Infinity && (
          <span className="text-slate-400 text-sm">
            Cel mai ieftin: <span className="text-green-400 font-bold text-lg">{Math.round(cheapestTotal)}€</span>
          </span>
        )}
      </div>

      {/* Direct flight */}
      {direct && (
        <a
          href={direct.link}
          target="_blank"
          rel="noopener noreferrer"
          className={`block rounded-2xl p-4 border transition hover:brightness-110 ${cheapestTotal === direct.price ? 'bg-gradient-to-r from-green-900/40 to-slate-800 border-green-600' : 'bg-slate-800 border-slate-700 hover:border-slate-500'}`}
        >
          <div className="flex items-center justify-between gap-4">
            <div className="flex-1 min-w-0">
              {cheapestTotal === direct.price && (
                <span className="text-xs bg-green-500 text-white px-2 py-0.5 rounded-full font-semibold inline-block mb-2">Cel mai ieftin</span>
              )}
              <div className="flex items-center gap-2 text-white font-semibold mb-2 flex-wrap">
                <span>{origin}</span>
                <span className="text-green-400">──────▶</span>
                <span>{destination}</span>
              </div>
              <div className="flex items-center gap-2 flex-wrap">
                <AirlineBadge code={direct.airline} transfers={direct.transfers} />
                <span className="text-slate-500 text-xs">{direct.date}</span>
              </div>
            </div>
            <div className="text-right shrink-0">
              <div className="text-green-400 font-black text-2xl">{Math.round(direct.price)}€</div>
              <div className="text-blue-400 text-xs mt-1">Rezervă →</div>
            </div>
          </div>
        </a>
      )}

      {/* Connecting combos */}
      {combos.map((c, i) => {
        const isCheapest = !direct && i === 0
        const hubLabel = hubNames[c.hub] ? `${hubNames[c.hub]} (${c.hub})` : c.hub
        return (
          <div
            key={c.hub}
            className={`rounded-2xl p-4 border transition ${isCheapest ? 'bg-gradient-to-r from-green-900/40 to-slate-800 border-green-600' : 'bg-slate-800 border-slate-700 hover:border-slate-600'}`}
          >
            <div className="flex items-start justify-between gap-4">
              <div className="flex-1 min-w-0">
                {isCheapest && (
                  <span className="text-xs bg-green-500 text-white px-2 py-0.5 rounded-full font-semibold inline-block mb-2">Cel mai ieftin</span>
                )}
                {/* Route visual */}
                <div className="flex items-center gap-1.5 text-sm font-semibold text-white mb-3 flex-wrap">
                  <span className="shrink-0">{origin}</span>
                  <span className="text-slate-500">─▶</span>
                  <span className="bg-slate-700 px-2 py-0.5 rounded text-blue-300 shrink-0">{hubLabel}</span>
                  <span className="text-slate-500">─▶</span>
                  <span className="shrink-0">{destination}</span>
                </div>

                {/* Leg 1 */}
                <div className="bg-slate-900/60 rounded-xl p-3 mb-2">
                  <div className="flex items-center justify-between gap-2 mb-1.5">
                    <span className="text-slate-400 text-xs font-semibold uppercase tracking-wide">Zbor 1</span>
                    <span className="text-green-400 text-sm font-bold">{Math.round(c.leg1Price)}€</span>
                  </div>
                  <div className="text-slate-300 text-sm mb-1.5">{origin} → {c.hub}</div>
                  <div className="flex items-center justify-between gap-2 flex-wrap">
                    <div className="flex items-center gap-2 flex-wrap">
                      <AirlineBadge code={c.leg1Airline} transfers={c.leg1Transfers} />
                      <span className="text-slate-500 text-xs">{c.leg1Date}</span>
                    </div>
                    <a
                      href={c.leg1Link}
                      target="_blank"
                      rel="noopener noreferrer"
                      onClick={e => e.stopPropagation()}
                      className="text-xs bg-blue-600 hover:bg-blue-500 text-white px-3 py-1 rounded-lg transition shrink-0"
                    >
                      Rezervă →
                    </a>
                  </div>
                </div>

                {/* Leg 2 */}
                <div className="bg-slate-900/60 rounded-xl p-3">
                  <div className="flex items-center justify-between gap-2 mb-1.5">
                    <span className="text-slate-400 text-xs font-semibold uppercase tracking-wide">Zbor 2</span>
                    <span className="text-green-400 text-sm font-bold">{Math.round(c.leg2Price)}€</span>
                  </div>
                  <div className="text-slate-300 text-sm mb-1.5">{c.hub} → {destination}</div>
                  <div className="flex items-center justify-between gap-2 flex-wrap">
                    <div className="flex items-center gap-2 flex-wrap">
                      <AirlineBadge code={c.leg2Airline} transfers={c.leg2Transfers} />
                      <span className="text-slate-500 text-xs">{c.leg2Date}</span>
                    </div>
                    <a
                      href={c.leg2Link}
                      target="_blank"
                      rel="noopener noreferrer"
                      onClick={e => e.stopPropagation()}
                      className="text-xs bg-blue-600 hover:bg-blue-500 text-white px-3 py-1 rounded-lg transition shrink-0"
                    >
                      Rezervă →
                    </a>
                  </div>
                </div>
              </div>

              {/* Total */}
              <div className="text-right shrink-0 pt-6">
                <div className="text-white font-black text-2xl">{Math.round(c.total)}€</div>
                <div className="text-slate-500 text-xs">total</div>
                {direct && (
                  <div className={`text-xs mt-1 font-semibold ${c.total < direct.price ? 'text-green-400' : 'text-slate-600'}`}>
                    {c.total < direct.price ? `−${Math.round(direct.price - c.total)}€` : `+${Math.round(c.total - direct.price)}€`}
                  </div>
                )}
              </div>
            </div>
          </div>
        )
      })}

      {combos.length === 0 && !direct && (
        <p className="text-slate-400 text-center py-8">Nu s-au găsit combinații de zboruri pentru această rută și perioadă.</p>
      )}

      <p className="text-slate-600 text-xs pt-2">
        ⚠️ Prețurile sunt orientative. Verifică disponibilitatea și sincronizarea datelor înainte de rezervare.
      </p>
    </div>
  )
}
