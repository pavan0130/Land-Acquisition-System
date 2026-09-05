import React from 'react'

export default function StatCard({ label, value, icon: Icon, accent = 'navy', trend }) {
  const accentClasses = {
    navy: 'bg-navy-50 text-navy-600',
    saffron: 'bg-saffron-50 text-saffron-600',
    green: 'bg-indiagreen-500/10 text-indiagreen-600',
  }[accent]

  return (
    <div className="gov-card flex items-center gap-4 p-4">
      <div className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-md ${accentClasses}`}>
        {Icon ? <Icon size={22} strokeWidth={2} /> : null}
      </div>
      <div className="min-w-0">
        <p className="truncate text-xs font-semibold uppercase tracking-wide text-navy-500">{label}</p>
        <p className="text-xl font-bold text-navy-900">{value}</p>
        {trend ? <p className="text-xs text-indiagreen-600">{trend}</p> : null}
      </div>
    </div>
  )
}
