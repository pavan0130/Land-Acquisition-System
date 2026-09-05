import React, { useState } from 'react'
import PageHeader from '../../components/common/PageHeader'

export default function Settings() {
  const [emailAlerts, setEmailAlerts] = useState(true)
  const [smsAlerts, setSmsAlerts] = useState(false)
  const [language, setLanguage] = useState('en')

  return (
    <div>
      <PageHeader title="Settings" subtitle="Notification preferences and application settings" />

      <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
        <div className="gov-card p-5">
          <h3 className="section-heading mb-4">Notification Preferences</h3>
          <div className="space-y-3">
            <Toggle label="Email alerts for compensation updates" checked={emailAlerts} onChange={setEmailAlerts} />
            <Toggle label="SMS alerts for survey and possession updates" checked={smsAlerts} onChange={setSmsAlerts} />
          </div>
        </div>

        <div className="gov-card p-5">
          <h3 className="section-heading mb-4">Language & Region</h3>
          <label className="gov-label">Preferred Language</label>
          <select value={language} onChange={(e) => setLanguage(e.target.value)} className="gov-input">
            <option value="en">English</option>
            <option value="hi">हिन्दी (Hindi)</option>
            <option value="ta">தமிழ் (Tamil)</option>
          </select>
          <p className="mt-2 text-xs text-navy-400">Bilingual (English/Hindi) support is planned for citizen-facing pages.</p>
        </div>
      </div>

      <div className="mt-6 flex justify-end">
        <button type="button" className="gov-btn-primary">Save Changes</button>
      </div>
    </div>
  )
}

function Toggle({ label, checked, onChange }) {
  return (
    <label className="flex cursor-pointer items-center justify-between gap-3 rounded-sm border border-navy-100 px-3 py-2.5">
      <span className="text-sm text-navy-700">{label}</span>
      <span
        onClick={() => onChange(!checked)}
        className={`relative h-5 w-9 rounded-full transition-colors ${checked ? 'bg-navy-500' : 'bg-navy-200'}`}
      >
        <span className={`absolute top-0.5 h-4 w-4 rounded-full bg-white transition-transform ${checked ? 'translate-x-4' : 'translate-x-0.5'}`} />
      </span>
    </label>
  )
}
