import React from 'react'
import { Mail, Phone, Shield } from 'lucide-react'
import PageHeader from '../../components/common/PageHeader'
import { useAuth } from '../../hooks/useAuth'
import { ROLE_LABELS } from '../../utils/roles'

export default function Profile() {
  const { user, role } = useAuth()

  return (
    <div>
      <PageHeader title="My Profile" subtitle="Account information and access details" />

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-[280px_1fr]">
        <div className="gov-card flex flex-col items-center p-6 text-center">
          <span className="flex h-20 w-20 items-center justify-center rounded-full bg-navy-500 text-2xl font-bold text-white">
            {user?.name?.[0] ?? 'U'}
          </span>
          <p className="mt-3 text-base font-bold text-navy-900">{user?.name}</p>
          <p className="text-sm text-navy-500">{ROLE_LABELS[role]}</p>
          <span className="status-pill mt-3 bg-indiagreen-500/10 text-indiagreen-600">
            <Shield size={12} /> Verified Government Account
          </span>
        </div>

        <div className="gov-card p-5">
          <h3 className="section-heading mb-4">Account Details</h3>
          <dl className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <Field label="Full Name" value={user?.name} />
            <Field label="Username" value={user?.username} />
            <Field label="Role" value={ROLE_LABELS[role]} />
            <Field label="Department" value={user?.department} />
            <Field label="Employee ID" value={user?.id} />
            <Field label="Session Issued" value={user?.issuedAt ? new Date(user.issuedAt).toLocaleString('en-IN') : '-'} />
          </dl>

          <div className="mt-6 border-t border-navy-100 pt-4">
            <h4 className="mb-2 text-sm font-bold text-navy-800">Contact</h4>
            <p className="flex items-center gap-2 text-sm text-navy-600"><Mail size={14} /> {user?.username}@gov.in</p>
            <p className="mt-1 flex items-center gap-2 text-sm text-navy-600"><Phone size={14} /> +91 XXXXX-XXXXX</p>
          </div>
        </div>
      </div>
    </div>
  )
}

function Field({ label, value }) {
  return (
    <div>
      <dt className="gov-label">{label}</dt>
      <dd className="text-sm font-medium text-navy-900">{value ?? '-'}</dd>
    </div>
  )
}
