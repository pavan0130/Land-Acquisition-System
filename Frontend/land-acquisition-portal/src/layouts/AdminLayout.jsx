import React from 'react'
import { Outlet } from 'react-router-dom'
import Navbar from '../components/common/Navbar'
import Sidebar from '../components/common/Sidebar'
import Footer from '../components/common/Footer'

export default function AdminLayout() {
  return (
    <div className="flex min-h-screen flex-col bg-paper watermark-seal">
      <Navbar />
      <div className="flex flex-1">
        <Sidebar />
        <main className="min-w-0 flex-1 px-4 py-6 sm:px-6 lg:px-8">
          <Outlet />
        </main>
      </div>
      <Footer />
    </div>
  )
}
