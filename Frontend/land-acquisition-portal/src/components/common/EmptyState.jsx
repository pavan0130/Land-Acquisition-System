import React from 'react'
import { Inbox } from 'lucide-react'

export default function EmptyState({ title = 'No records found', subtitle = 'Try adjusting your search or filters.', icon: Icon = Inbox }) {
  return (
    <div className="flex flex-col items-center justify-center gap-2 py-16 text-center text-navy-400">
      <Icon size={32} strokeWidth={1.5} />
      <p className="text-sm font-semibold text-navy-600">{title}</p>
      <p className="text-xs text-navy-400">{subtitle}</p>
    </div>
  )
}
