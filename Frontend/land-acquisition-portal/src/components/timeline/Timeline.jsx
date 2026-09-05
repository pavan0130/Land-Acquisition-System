import React from 'react'
import { Check, Clock, Circle } from 'lucide-react'

const STATUS_STYLE = {
  completed: { icon: Check, dot: 'bg-indiagreen-500 text-white', line: 'bg-indiagreen-500' },
  in_progress: { icon: Clock, dot: 'bg-saffron-500 text-white', line: 'bg-navy-100' },
  pending: { icon: Circle, dot: 'bg-navy-100 text-navy-400', line: 'bg-navy-100' },
}

export default function Timeline({ items }) {
  return (
    <ol className="relative ml-3 border-l-2 border-navy-100">
      {items.map((item, idx) => {
        const style = STATUS_STYLE[item.status] ?? STATUS_STYLE.pending
        const Icon = style.icon
        return (
          <li key={item.id} className="relative mb-8 ml-6 last:mb-0">
            <span className={`absolute -left-[35px] flex h-7 w-7 items-center justify-center rounded-full ring-4 ring-white ${style.dot}`}>
              <Icon size={14} />
            </span>
            <div className="gov-card p-3.5">
              <div className="flex flex-wrap items-center justify-between gap-2">
                <h4 className="text-sm font-bold text-navy-900">{item.title}</h4>
                <span className="text-xs font-medium text-navy-400">{item.date}</span>
              </div>
              <p className="mt-1 text-sm text-navy-600">{item.note}</p>
            </div>
          </li>
        )
      })}
    </ol>
  )
}
