'use client'

import { useMemo } from 'react'
import { format, startOfMonth, endOfMonth, eachDayOfInterval, getDay, parseISO } from 'date-fns'
import { ro } from 'date-fns/locale'

export interface Fare {
  date: string
  price: number
  currency: string
  source: string
}

interface Props {
  data: Fare[]
  month: string
  currency: string
  onSelectFare?: (fare: Fare) => void
  selectedDate?: string
}

function getPriceColor(price: number, min: number, max: number, selected: boolean) {
  if (selected) return 'ring-2 ring-white ring-offset-1 ring-offset-slate-900 scale-105'
  if (max === min) return 'bg-green-500 text-white'
  const ratio = (price - min) / (max - min)
  if (ratio < 0.25) return 'bg-green-500 text-white'
  if (ratio < 0.5) return 'bg-yellow-400 text-slate-900'
  if (ratio < 0.75) return 'bg-orange-400 text-white'
  return 'bg-red-500 text-white'
}

function getBaseBg(price: number, min: number, max: number) {
  if (max === min) return 'bg-green-500'
  const ratio = (price - min) / (max - min)
  if (ratio < 0.25) return 'bg-green-500'
  if (ratio < 0.5) return 'bg-yellow-400'
  if (ratio < 0.75) return 'bg-orange-400'
  return 'bg-red-500'
}

export default function PriceCalendar({ data, month, currency, onSelectFare, selectedDate }: Props) {
  const fareMap = useMemo(() => {
    const map: Record<string, Fare> = {}
    for (const d of data) map[d.date] = d
    return map
  }, [data])

  const prices = data.map(d => d.price)
  const min = Math.min(...prices)
  const max = Math.max(...prices)

  const monthStart = startOfMonth(parseISO(month + '-01'))
  const monthEnd = endOfMonth(monthStart)
  const days = eachDayOfInterval({ start: monthStart, end: monthEnd })
  const startPad = getDay(monthStart) === 0 ? 6 : getDay(monthStart) - 1

  const weekDays = ['Lu', 'Ma', 'Mi', 'Jo', 'Vi', 'Sâ', 'Du']

  return (
    <div>
      <h3 className="text-center text-white font-semibold text-lg mb-4 capitalize">
        {format(monthStart, 'MMMM yyyy', { locale: ro })}
      </h3>
      <div className="grid grid-cols-7 gap-1">
        {weekDays.map(d => (
          <div key={d} className="text-center text-slate-500 text-xs font-medium py-1">{d}</div>
        ))}
        {Array.from({ length: startPad }).map((_, i) => (
          <div key={`pad-${i}`} />
        ))}
        {days.map(day => {
          const key = format(day, 'yyyy-MM-dd')
          const fare = fareMap[key]
          const isPast = day < new Date()
          const isSelected = selectedDate === key

          return (
            <div
              key={key}
              onClick={() => fare && !isPast && onSelectFare?.(fare)}
              className={`rounded-lg p-1 text-center transition-all ${
                fare && !isPast
                  ? `${getBaseBg(fare.price, min, max)} cursor-pointer hover:scale-105 hover:shadow-lg hover:brightness-110 ${getPriceColor(fare.price, min, max, isSelected)}`
                  : 'bg-slate-800'
              } ${isPast ? 'opacity-40' : ''}`}
            >
              <div className={`text-xs ${fare ? 'opacity-70' : 'text-slate-600'}`}>{format(day, 'd')}</div>
              {fare ? (
                <div className="text-xs font-bold leading-tight">{Math.round(fare.price)}€</div>
              ) : (
                <div className="text-xs text-slate-700">—</div>
              )}
            </div>
          )
        })}
      </div>
      {onSelectFare && (
        <p className="text-center text-slate-600 text-xs mt-3">Click pe o zi pentru a adăuga zborul în itinerar</p>
      )}
      <div className="flex items-center justify-center gap-3 mt-3 text-xs text-slate-400">
        <span className="flex items-center gap-1"><span className="w-3 h-3 rounded bg-green-500 inline-block" /> ieftin</span>
        <span className="flex items-center gap-1"><span className="w-3 h-3 rounded bg-yellow-400 inline-block" /> mediu</span>
        <span className="flex items-center gap-1"><span className="w-3 h-3 rounded bg-orange-400 inline-block" /> ridicat</span>
        <span className="flex items-center gap-1"><span className="w-3 h-3 rounded bg-red-500 inline-block" /> scump</span>
      </div>
    </div>
  )
}
