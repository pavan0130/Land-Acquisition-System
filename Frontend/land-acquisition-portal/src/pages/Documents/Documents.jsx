import React, { useEffect, useState } from 'react'
import { Download, FileText, History, Plus } from 'lucide-react'
import PageHeader from '../../components/common/PageHeader'
import DataTable from '../../components/tables/DataTable'
import Modal from '../../components/modals/Modal'
import FileUpload from '../../components/upload/FileUpload'
import { fetchDocuments, uploadDocument } from '../../services/documentApi'
import { formatDate } from '../../utils/format'

const CATEGORIES = ['Sale Deed', 'Survey Report', 'Compensation Letter', 'Government Order', 'Other']

export default function Documents() {
  const [rows, setRows] = useState([])
  const [loading, setLoading] = useState(true)
  const [category, setCategory] = useState('All')
  const [uploadOpen, setUploadOpen] = useState(false)
  const [pendingFiles, setPendingFiles] = useState([])
  const [uploadCategory, setUploadCategory] = useState(CATEGORIES[0])
  const [saving, setSaving] = useState(false)

  const load = () => {
    setLoading(true)
    fetchDocuments({ category }).then((data) => {
      setRows(data)
      setLoading(false)
    })
  }

  useEffect(load, [category])

  const handleUploadSubmit = async () => {
    if (!pendingFiles.length) return
    setSaving(true)
    for (const file of pendingFiles) {
      await uploadDocument(file, { category: uploadCategory, uploadedBy: 'You' })
    }
    setSaving(false)
    setUploadOpen(false)
    setPendingFiles([])
    load()
  }

  const columns = [
    { key: 'name', header: 'Document', render: (r) => (
      <span className="flex items-center gap-2">
        <FileText size={15} className="text-navy-400" /> {r.name}
      </span>
    ) },
    { key: 'category', header: 'Category' },
    { key: 'parcelId', header: 'Linked Parcel' },
    { key: 'uploadedBy', header: 'Uploaded By' },
    { key: 'date', header: 'Date', render: (r) => formatDate(r.date) },
    { key: 'version', header: 'Version', render: (r) => (
      <span className="flex items-center gap-1 text-xs text-navy-500"><History size={12} /> v{r.version}</span>
    ) },
    { key: 'size', header: 'Size' },
    { key: 'actions', header: 'Actions', render: () => (
      <button type="button" className="text-navy-500 hover:text-navy-800" aria-label="Download">
        <Download size={15} />
      </button>
    ) },
  ]

  return (
    <div>
      <PageHeader
        title="Documents"
        subtitle="Sale deeds, survey reports, compensation letters and government orders"
        actions={
          <button type="button" onClick={() => setUploadOpen(true)} className="gov-btn-accent">
            <Plus size={16} /> Upload Document
          </button>
        }
      />

      <div className="mb-4 flex flex-wrap gap-2">
        {['All', ...CATEGORIES].map((c) => (
          <button
            key={c}
            type="button"
            onClick={() => setCategory(c)}
            className={`rounded-full border px-3 py-1.5 text-xs font-semibold ${
              category === c ? 'border-saffron-500 bg-saffron-500 text-white' : 'border-navy-200 bg-white text-navy-600 hover:bg-navy-50'
            }`}
          >
            {c}
          </button>
        ))}
      </div>

      <DataTable columns={columns} rows={rows} loading={loading} />

      <Modal
        open={uploadOpen}
        onClose={() => setUploadOpen(false)}
        title="Upload Document"
        footer={
          <>
            <button type="button" className="gov-btn-secondary" onClick={() => setUploadOpen(false)}>Cancel</button>
            <button type="button" className="gov-btn-primary" onClick={handleUploadSubmit} disabled={saving || !pendingFiles.length}>
              {saving ? 'Uploading…' : 'Upload'}
            </button>
          </>
        }
      >
        <div className="space-y-4">
          <div>
            <label className="gov-label">Document Category</label>
            <select value={uploadCategory} onChange={(e) => setUploadCategory(e.target.value)} className="gov-input">
              {CATEGORIES.map((c) => (
                <option key={c} value={c}>{c}</option>
              ))}
            </select>
          </div>
          <FileUpload onFiles={setPendingFiles} multiple />
        </div>
      </Modal>
    </div>
  )
}
