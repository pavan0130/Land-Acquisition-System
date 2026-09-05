import { DOCUMENTS } from './mockData'

function delay(ms = 400) {
  return new Promise((resolve) => setTimeout(resolve, ms))
}

// GET /api/documents
export async function fetchDocuments(filters = {}) {
  await delay()
  let rows = [...DOCUMENTS]
  if (filters.category && filters.category !== 'All') {
    rows = rows.filter((d) => d.category === filters.category)
  }
  if (filters.search) {
    const q = filters.search.toLowerCase()
    rows = rows.filter((d) => d.name.toLowerCase().includes(q))
  }
  return rows
}

// POST /api/documents (multipart upload)
export async function uploadDocument(file, meta) {
  await delay(700)
  return {
    id: `DOC-${Math.floor(9000 + Math.random() * 900)}`,
    name: file.name,
    category: meta.category ?? 'Other',
    parcelId: meta.parcelId ?? '-',
    uploadedBy: meta.uploadedBy ?? 'You',
    date: new Date().toISOString().slice(0, 10),
    version: 1,
    size: `${(file.size / (1024 * 1024)).toFixed(2)} MB`,
  }
}
