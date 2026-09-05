import React, { useEffect, useState } from 'react'
import { Download, Search } from 'lucide-react'
import PageHeader from '../../components/common/PageHeader'
import DataTable from '../../components/tables/DataTable'
import StatusPill from '../../components/common/StatusPill'
import { fetchCompensation, approveCompensation } from '../../services/compensationApi'
import { useDebounce } from '../../hooks/useDebounce'
import { useAuth } from '../../hooks/useAuth'
import { formatDate, formatINR } from '../../utils/format'

const STATUS_OPTIONS = ['All', 'Paid', 'Pending', 'Under Review', 'Rejected']
const APPROVER_ROLES = ['central_ministry', 'state_officer', 'district_collector']

export default function Compensation() {
  const { role } = useAuth()
  const [rows, setRows] = useState([])
  const [loading, setLoading] = useState(true)
  const [search, setSearch] = useState('')
  const [status, setStatus] = useState('All')
  const [busyId, setBusyId] = useState(null)
  const debouncedSearch = useDebounce(search)

  const load = () => {
    setLoading(true)
    fetchCompensation({ search: debouncedSearch, status }).then((data) => {
      setRows(data)
      setLoading(false)
    })
  }

  useEffect(load, [debouncedSearch, status])

  const handleApprove = async (record) => {
    setBusyId(record.id)
    const result = await approveCompensation(record.id)
    setRows((prev) => prev.map((r) => (r.id === record.id ? { ...r, ...result } : r)))
    setBusyId(null)
  }

  const canApprove = APPROVER_ROLES.includes(role)

  const columns = [
    { key: 'id', header: 'Reference' },
    { key: 'owner', header: 'Owner' },
    { key: 'parcelId', header: 'Parcel' },
    { key: 'amount', header: 'Amount', align: 'right', render: (r) => formatINR(r.amount) },
    { key: 'mode', header: 'Mode' },
    { key: 'date', header: 'Date', render: (r) => formatDate(r.date) },
    { key: 'status', header: 'Status', render: (r) => <StatusPill status={r.status} /> },
    ...(canApprove
      ? [
          {
            key: 'actions',
            header: 'Actions',
            render: (r) =>
              r.status === 'Pending' || r.status === 'Under Review' ? (
                <button
                  type="button"
                  onClick={() => handleApprove(r)}
                  disabled={busyId === r.id}
                  className="gov-btn-secondary !px-2.5 !py-1 text-xs"
                >
                  {busyId === r.id ? 'Processing…' : 'Approve & Pay'}
                </button>
              ) : (
                <span className="text-xs text-navy-300">—</span>
              ),
          },
        ]
      : []),
  ]

  return (
    <div>
      <PageHeader
        title="Compensation"
        subtitle="Assessment, approval and payment tracking"
        actions={
          <button type="button" className="gov-btn-secondary">
            <Download size={15} /> Export Receipts
          </button>
        }
      />

      <div className="mb-4 flex flex-wrap items-center gap-3">
        <div className="flex items-center gap-2 rounded-sm border border-navy-200 bg-white px-3 py-2">
          <Search size={15} className="text-navy-400" />
          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search by owner, reference or parcel…"
            className="w-64 text-sm outline-none placeholder:text-navy-300"
          />
        </div>
        <select value={status} onChange={(e) => setStatus(e.target.value)} className="gov-input w-auto">
          {STATUS_OPTIONS.map((s) => (
            <option key={s} value={s}>{s}</option>
          ))}
        </select>
      </div>

      <DataTable columns={columns} rows={rows} loading={loading} />
    </div>
  )
}
