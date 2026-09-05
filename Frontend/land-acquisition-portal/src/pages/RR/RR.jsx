import React, { useEffect, useState } from 'react'
import PageHeader from '../../components/common/PageHeader'
import DataTable from '../../components/tables/DataTable'
import StatusPill from '../../components/common/StatusPill'
import Loader from '../../components/common/Loader'
import { RR_RECORDS } from '../../services/mockData'
import { formatINR } from '../../utils/format'

export default function RR() {
  const [rows, setRows] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const t = setTimeout(() => {
      setRows(RR_RECORDS)
      setLoading(false)
    }, 350)
    return () => clearTimeout(t)
  }, [])

  const columns = [
    { key: 'id', header: 'Record ID' },
    { key: 'family', header: 'Family' },
    { key: 'members', header: 'Members' },
    { key: 'village', header: 'Village' },
    { key: 'houseAllocated', header: 'House Allocated' },
    { key: 'unit', header: 'Housing Unit' },
    { key: 'assistance', header: 'Financial Assistance', align: 'right', render: (r) => formatINR(r.assistance) },
    { key: 'status', header: 'Status', render: (r) => <StatusPill status={r.status} /> },
  ]

  if (loading) return <Loader />

  return (
    <div>
      <PageHeader title="Rehabilitation & Resettlement" subtitle="Family relocation, housing allotment and financial assistance" />
      <DataTable columns={columns} rows={rows} loading={loading} />
    </div>
  )
}
