import React from 'react'

export default function Footer() {
  return (
    <footer className="border-t border-navy-100 bg-white px-4 py-4 sm:px-6">
      <div className="tricolor-strip mb-4 -mt-4" />
      <div className="flex flex-col gap-2 text-xs text-navy-400 sm:flex-row sm:items-center sm:justify-between">
        <p>&copy; {new Date().getFullYear()} National Land Acquisition &amp; Management System. All rights reserved.</p>
        <div className="flex flex-wrap gap-4">
          <a href="#" className="hover:text-navy-600">Terms of Use</a>
          <a href="#" className="hover:text-navy-600">Privacy Policy</a>
          <a href="#" className="hover:text-navy-600">Accessibility</a>
          <a href="#" className="hover:text-navy-600">Help Desk</a>
        </div>
      </div>
    </footer>
  )
}
