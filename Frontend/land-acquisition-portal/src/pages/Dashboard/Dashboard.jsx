import React from 'react'
import { FolderKanban, LandPlot, MapPinned, IndianRupee, AlertTriangle, Users } from 'lucide-react'
import PageHeader from '../../components/common/PageHeader'
import StatCard from '../../components/common/StatCard'
import BarChartCard from '../../components/charts/BarChartCard'
import LineChartCard from '../../components/charts/LineChartCard'
import PieChartCard from '../../components/charts/PieChartCard'
import { useAuth } from '../../hooks/useAuth'
import { ROLE_LABELS } from '../../utils/roles'
import {
  DASHBOARD_STATS,
  STATEWISE_PROGRESS,
  COMPENSATION_TREND,
  CASE_STATUS_BREAKDOWN,
  RECENT_ACTIVITY,
} from '../../services/mockData'
import { formatCrore, formatNumber } from '../../utils/format'

export default function Dashboard() {
  const { user, role } = useAuth()
  const s = DASHBOARD_STATS

  return (
    <div>
      <PageHeader
        title={`Welcome, ${user?.name ?? 'Officer'}`}
        subtitle={`${ROLE_LABELS[role]} · ${user?.department ?? ''} · Consolidated national overview`}
      />

      <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 xl:grid-cols-6">
        <StatCard label="Projects" value={formatNumber(s.projects)} icon={FolderKanban} accent="navy" />
        <StatCard label="Land Required" value={`${formatNumber(s.landRequired)} ac`} icon={LandPlot} accent="navy" />
        <StatCard label="Land Acquired" value={`${formatNumber(s.landAcquired)} ac`} icon={MapPinned} accent="green" />
        <StatCard label="Compensation Paid" value={formatCrore(s.compensationPaidCr)} icon={IndianRupee} accent="saffron" />
        <StatCard label="Pending Cases" value={formatNumber(s.pendingCases)} icon={AlertTriangle} accent="saffron" />
        <StatCard label="Affected Families" value={formatNumber(s.affectedFamilies)} icon={Users} accent="navy" />
      </div>

      <div className="mt-6 grid grid-cols-1 gap-4 xl:grid-cols-3">
        <div className="xl:col-span-2">
          <BarChartCard
            title="State-wise Land Acquisition Progress"
            data={STATEWISE_PROGRESS}
            xKey="state"
            bars={[
              { dataKey: 'acquired', name: 'Acquired (acres)', color: '#0a7a3c' },
              { dataKey: 'required', name: 'Required (acres)', color: '#a9bfd7' },
            ]}
          />
        </div>
        <PieChartCard title="Case Status Breakdown" data={CASE_STATUS_BREAKDOWN} />
      </div>

      <div className="mt-6 grid grid-cols-1 gap-4 xl:grid-cols-3">
        <div className="xl:col-span-2">
          <LineChartCard
            title="Monthly Compensation Disbursement"
            data={COMPENSATION_TREND}
            xKey="month"
            lines={[{ dataKey: 'amountCr', name: '₹ Crore Disbursed', color: '#e97a1f' }]}
          />
        </div>

        <div className="gov-card p-4">
          <h3 className="section-heading mb-4">Recent Activity</h3>
          <ul className="space-y-3">
            {RECENT_ACTIVITY.map((a) => (
              <li key={a.id} className="flex items-start gap-3 border-b border-navy-50 pb-3 last:border-0 last:pb-0">
                <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-saffron-500" />
                <div>
                  <p className="text-sm text-navy-800">{a.text}</p>
                  <p className="text-xs text-navy-400">{a.time}</p>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  )
}
