import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Bell, ChevronDown, LogOut, Menu, Search, Settings, User } from 'lucide-react'
import { useAuth } from '../../hooks/useAuth'
import { useUiStore } from '../../app/store/uiStore'
import { useNotifications } from '../../hooks/useNotifications'
import { ROLE_LABELS } from '../../utils/roles'

export default function Navbar() {
  const { user, logout } = useAuth()
  const { toggleMobileSidebar } = useUiStore()
  const { unreadCount } = useNotifications()
  const navigate = useNavigate()
  const [menuOpen, setMenuOpen] = useState(false)

  return (
    <header className="sticky top-0 z-30 border-b border-navy-100 bg-white">
      <div className="tricolor-strip" />
      <div className="flex h-16 items-center gap-3 px-4 sm:px-6">
        <button
          type="button"
          onClick={toggleMobileSidebar}
          className="rounded-sm p-2 text-navy-600 hover:bg-navy-50 lg:hidden"
          aria-label="Toggle navigation"
        >
          <Menu size={20} />
        </button>

        <div className="hidden items-center gap-2 sm:flex">
          <img src="/emblem.svg" alt="" className="h-9 w-9" />
          <div className="leading-tight">
            <p className="text-[11px] font-semibold uppercase tracking-wide text-saffron-600">Government of India</p>
            <p className="font-display text-sm font-bold text-navy-900">National Land Acquisition &amp; Management System</p>
          </div>
        </div>

        <div className="ml-auto flex items-center gap-2">
          <div className="hidden items-center gap-2 rounded-sm border border-navy-100 bg-navy-50/50 px-3 py-1.5 md:flex">
            <Search size={15} className="text-navy-400" />
            <input
              type="search"
              placeholder="Search project, parcel, owner…"
              className="w-56 bg-transparent text-sm outline-none placeholder:text-navy-300"
            />
          </div>

          <button
            type="button"
            onClick={() => navigate('/notifications')}
            className="relative rounded-sm p-2 text-navy-600 hover:bg-navy-50"
            aria-label="Notifications"
          >
            <Bell size={19} />
            {unreadCount > 0 && (
              <span className="absolute right-1 top-1 flex h-4 w-4 items-center justify-center rounded-full bg-saffron-500 text-[10px] font-bold text-white">
                {unreadCount}
              </span>
            )}
          </button>

          <div className="relative">
            <button
              type="button"
              onClick={() => setMenuOpen((v) => !v)}
              className="flex items-center gap-2 rounded-sm border border-transparent px-2 py-1.5 hover:border-navy-100 hover:bg-navy-50"
            >
              <span className="flex h-8 w-8 items-center justify-center rounded-full bg-navy-500 text-sm font-bold text-white">
                {user?.name?.[0] ?? 'U'}
              </span>
              <span className="hidden text-left sm:block">
                <p className="text-sm font-semibold leading-tight text-navy-900">{user?.name}</p>
                <p className="text-[11px] leading-tight text-navy-400">{ROLE_LABELS[user?.role]}</p>
              </span>
              <ChevronDown size={14} className="hidden text-navy-400 sm:block" />
            </button>

            {menuOpen && (
              <div className="absolute right-0 top-full mt-1 w-48 rounded-md border border-navy-100 bg-white py-1 shadow-card">
                <button
                  type="button"
                  onClick={() => {
                    setMenuOpen(false)
                    navigate('/profile')
                  }}
                  className="flex w-full items-center gap-2 px-3 py-2 text-sm text-navy-700 hover:bg-navy-50"
                >
                  <User size={15} /> My Profile
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setMenuOpen(false)
                    navigate('/settings')
                  }}
                  className="flex w-full items-center gap-2 px-3 py-2 text-sm text-navy-700 hover:bg-navy-50"
                >
                  <Settings size={15} /> Settings
                </button>
                <div className="my-1 border-t border-navy-100" />
                <button
                  type="button"
                  onClick={async () => {
                    await logout()
                    navigate('/login')
                  }}
                  className="flex w-full items-center gap-2 px-3 py-2 text-sm text-red-600 hover:bg-red-50"
                >
                  <LogOut size={15} /> Sign Out
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  )
}
