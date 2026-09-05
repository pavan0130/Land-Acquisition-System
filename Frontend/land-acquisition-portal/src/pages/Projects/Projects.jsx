import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Plus, Search } from 'lucide-react'
import PageHeader from '../../components/common/PageHeader'
import DataTable from '../../components/tables/DataTable'
import StatusPill from '../../components/common/StatusPill'
import { fetchProjects } from '../../services/projectApi'
import { useDebounce } from '../../hooks/useDebounce'
import { formatNumber } from '../../utils/format'

const STATUS_OPTIONS = ['All', 'Survey', 'Approved', 'In Progress', 'Completed']

export default function Projects() {
  const navigate = useNavigate()
  const [rows, setRows] = useState([])
  const [loading, setLoading] = useState(true)
  const [search, setSearch] = useState('')
  const [status, setStatus] = useState('All')
  const debouncedSearch = useDebounce(search)

  useEffect(() => {
    setLoading(true)
    fetchProjects({ search: debouncedSearch, status }).then((data) => {
      setRows(data)
      setLoading(false)
    })
  }, [debouncedSearch, status])

  const columns = [
    { key: 'id', header: 'Project ID' },
    { key: 'name', header: 'Project Name' },
    { key: 'type', header: 'Type' },
    { key: 'district', header: 'District' },
    {
      key: 'landAcquired',
      header: 'Land Acquired',
      render: (r) => `${formatNumber(r.landAcquired)} / ${formatNumber(r.landRequired)} ac`,
    },
    {
      key: 'progress',
      header: 'Progress',
      render: (r) => (
        <div className="flex items-center gap-2">
          <div className="h-1.5 w-24 overflow-hidden rounded-full bg-navy-100">
            <div className="h-full rounded-full bg-navy-500" style={{ width: `${r.progress}%` }} />
          </div>
          <span className="text-xs font-semibold text-navy-600">{r.progress}%</span>
        </div>
      ),
    },
    { key: 'status', header: 'Status', render: (r) => <StatusPill status={r.status} /> },
  ]

  return (
    <div>
      <PageHeader
        title="Projects"
        subtitle="National Highway, Metro, Railway, Solar and Industrial land acquisition projects"
        actions={
          <button type="button" className="gov-btn-accent">
            <Plus size={16} /> Add Project
          </button>
        }
      />

      <div className="mb-4 flex flex-wrap items-center gap-3">
        <div className="flex items-center gap-2 rounded-sm border border-navy-200 bg-white px-3 py-2">
          <Search size={15} className="text-navy-400" />
          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search by name, ID or district…"
            className="w-64 text-sm outline-none placeholder:text-navy-300"
          />
        </div>
        <select value={status} onChange={(e) => setStatus(e.target.value)} className="gov-input w-auto">
          {STATUS_OPTIONS.map((s) => (
            <option key={s} value={s}>{s}</option>
          ))}
        </select>
      </div>

      <DataTable columns={columns} rows={rows} loading={loading} onRowClick={(row) => navigate(`/projects/${row.id}`)} />
    </div>
  )
}
