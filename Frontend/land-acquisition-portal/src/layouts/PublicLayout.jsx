import React from 'react'
import { Outlet } from 'react-router-dom'

export default function PublicLayout() {
  return (
    <div className="flex min-h-screen flex-col bg-paper">
      <div className="tricolor-strip" />
      <header className="flex items-center gap-3 border-b border-navy-100 bg-white px-6 py-4">
        <img src="/emblem.svg" alt="" className="h-10 w-10" />
        <div className="leading-tight">
          <p className="text-[11px] font-semibold uppercase tracking-wide text-saffron-600">Government of India</p>
          <p className="font-display text-base font-bold text-navy-900">National Land Acquisition &amp; Management System</p>
        </div>
      </header>
      <main className="flex flex-1 items-center justify-center px-4 py-10">
        <Outlet />
      </main>
      <footer className="border-t border-navy-100 bg-white px-6 py-3 text-center text-xs text-navy-400">
        &copy; {new Date().getFullYear()} Ministry of Rural Development, Government of India
      </footer>
    </div>
  )
}
