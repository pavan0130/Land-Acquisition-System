import React from 'react'

export default function Loader({ label = 'Loading records…' }) {
  return (
    <div className="flex flex-col items-center justify-center gap-3 py-16 text-navy-400">
      <div className="relative h-10 w-10">
        <div className="absolute inset-0 animate-spin rounded-full border-2 border-navy-100 border-t-saffron-500" />
      </div>
      <p className="text-sm font-medium">{label}</p>
    </div>
  )
}
