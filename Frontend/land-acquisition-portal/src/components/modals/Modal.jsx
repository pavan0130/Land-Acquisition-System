import React, { useEffect } from 'react'
import { X } from 'lucide-react'

export default function Modal({ open, onClose, title, children, footer, size = 'md' }) {
  useEffect(() => {
    if (!open) return
    const onKey = (e) => e.key === 'Escape' && onClose?.()
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [open, onClose])

  if (!open) return null

  const widths = { sm: 'max-w-sm', md: 'max-w-lg', lg: 'max-w-2xl' }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-navy-900/50 p-4" role="dialog" aria-modal="true">
      <div className={`w-full ${widths[size]} rounded-md bg-white shadow-xl`}>
        <div className="flex items-center justify-between border-b border-navy-100 px-5 py-3.5">
          <h2 className="text-base font-bold text-navy-900">{title}</h2>
          <button type="button" onClick={onClose} className="rounded-sm p-1 text-navy-400 hover:bg-navy-50 hover:text-navy-700" aria-label="Close">
            <X size={18} />
          </button>
        </div>
        <div className="max-h-[70vh] overflow-y-auto px-5 py-4">{children}</div>
        {footer ? <div className="flex justify-end gap-2 border-t border-navy-100 px-5 py-3">{footer}</div> : null}
      </div>
    </div>
  )
}
