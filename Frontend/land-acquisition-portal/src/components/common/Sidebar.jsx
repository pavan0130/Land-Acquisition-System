import React from 'react'
import { NavLink } from 'react-router-dom'
import { X } from 'lucide-react'
import { useAuth } from '../../hooks/useAuth'
import { useUiStore } from '../../app/store/uiStore'
import { navForRole } from '../../utils/roles'

export default function Sidebar() {
  const { role } = useAuth()
  const { mobileSidebarOpen, closeMobileSidebar } = useUiStore()
  const items = navForRole(role)

  const content = (
    <nav className="flex h-full flex-col gap-0.5 overflow-y-auto px-3 py-4">
      {items.map(({ key, label, to, icon: Icon }) => (
        <NavLink
          key={key}
          to={to}
          onClick={closeMobileSidebar}
          className={({ isActive }) =>
            `flex items-center gap-3 rounded-sm px-3 py-2.5 text-sm font-medium transition-colors ${
              isActive ? 'bg-saffron-500 text-white' : 'text-navy-100/90 hover:bg-navy-700'
            }`
          }
        >
          <Icon size={17} />
          {label}
        </NavLink>
      ))}
    </nav>
  )

  return (
    <>
      {/* Desktop sidebar */}
      <aside className="sticky top-16 hidden h-[calc(100vh-4rem)] w-64 shrink-0 bg-navy-800 lg:block">{content}</aside>

      {/* Mobile drawer */}
      {mobileSidebarOpen && (
        <div className="fixed inset-0 z-40 lg:hidden">
          <div className="absolute inset-0 bg-navy-900/50" onClick={closeMobileSidebar} />
          <aside className="absolute left-0 top-0 h-full w-64 bg-navy-800 shadow-xl">
            <div className="flex items-center justify-between px-4 py-4">
              <div className="flex items-center gap-2">
                <img src="/emblem.svg" alt="" className="h-7 w-7" />
                <span className="text-sm font-bold text-white">NLAMS</span>
              </div>
              <button onClick={closeMobileSidebar} className="text-navy-200" aria-label="Close menu">
                <X size={18} />
              </button>
            </div>
            {content}
          </aside>
        </div>
      )}
    </>
  )
}
