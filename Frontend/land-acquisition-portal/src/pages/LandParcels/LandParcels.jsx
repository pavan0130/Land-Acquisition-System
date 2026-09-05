import React, { useEffect, useState } from 'react'
import { Search } from 'lucide-react'
import PageHeader from '../../components/common/PageHeader'
import DataTable from '../../components/tables/DataTable'
import StatusPill from '../../components/common/StatusPill'
import Modal from '../../components/modals/Modal'
import { fetchParcels } from '../../services/landApi'
import { useDebounce } from '../../hooks/useDebounce'

const STATUS_OPTIONS = ['All', 'Acquired', 'Pending', 'Under Verification']

export default function LandParcels() {
  const [rows, setRows] = useState([])
  const [loading, setLoading] = useState(true)
  const [search, setSearch] = useState('')
  const [status, setStatus] = useState('All')
  const [selected, setSelected] = useState(null)
  const debouncedSearch = useDebounce(search)

  useEffect(() => {
    setLoading(true)
    fetchParcels({ search: debouncedSearch, status }).then((data) => {
      setRows(data)
      setLoading(false)
    })
  }, [debouncedSearch, status])

  const columns = [
    { key: 'id', header: 'Parcel ID' },
    { key: 'surveyNo', header: 'Survey No.' },
    { key: 'owner', header: 'Owner' },
    { key: 'village', header: 'Village' },
    { key: 'district', header: 'District' },
    { key: 'area', header: 'Area', render: (r) => `${r.area} ${r.unit}` },
    { key: 'status', header: 'Status', render: (r) => <StatusPill status={r.status} /> },
  ]

  return (
    <div>
      <PageHeader title="Land Parcels" subtitle="Survey records, ownership and acquisition status" />

      <div className="mb-4 flex flex-wrap items-center gap-3">
        <div className="flex items-center gap-2 rounded-sm border border-navy-200 bg-white px-3 py-2">
          <Search size={15} className="text-navy-400" />
          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search by owner, survey no. or village…"
            className="w-64 text-sm outline-none placeholder:text-navy-300"
          />
        </div>
        <select value={status} onChange={(e) => setStatus(e.target.value)} className="gov-input w-auto">
          {STATUS_OPTIONS.map((s) => (
            <option key={s} value={s}>{s}</option>
          ))}
        </select>
      </div>

      <DataTable columns={columns} rows={rows} loading={loading} onRowClick={setSelected} />

      <Modal open={Boolean(selected)} onClose={() => setSelected(null)} title="Parcel Details" size="sm">
        {selected && (
          <div className="space-y-2 text-sm">
            <Row label="Parcel ID" value={selected.id} />
            <Row label="Survey No." value={selected.surveyNo} />
            <Row label="Owner" value={selected.owner} />
            <Row label="Village / Taluk" value={`${selected.village}, ${selected.taluk}`} />
            <Row label="District" value={selected.district} />
            <Row label="Area" value={`${selected.area} ${selected.unit}`} />
            <Row label="Linked Project" value={selected.projectId} />
            <Row label="Status" value={<StatusPill status={selected.status} />} />
            <Row label="GIS Coordinates" value={`${selected.lat.toFixed(4)}, ${selected.lng.toFixed(4)}`} />
          </div>
        )}
      </Modal>
    </div>
  )
}

function Row({ label, value }) {
  return (
    <div className="flex items-center justify-between border-b border-navy-50 py-1.5 last:border-0">
      <span className="text-navy-400">{label}</span>
      <span className="font-semibold text-navy-800">{value}</span>
    </div>
  )
}
