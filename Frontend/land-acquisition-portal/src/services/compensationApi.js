import { COMPENSATION_RECORDS } from './mockData'

function delay(ms = 400) {
  return new Promise((resolve) => setTimeout(resolve, ms))
}

// GET /api/compensation
export async function fetchCompensation(filters = {}) {
  await delay()
  let rows = [...COMPENSATION_RECORDS]
  if (filters.status && filters.status !== 'All') {
    rows = rows.filter((c) => c.status === filters.status)
  }
  if (filters.search) {
    const q = filters.search.toLowerCase()
    rows = rows.filter((c) => c.owner.toLowerCase().includes(q) || c.id.toLowerCase().includes(q) || c.parcelId.toLowerCase().includes(q))
  }
  return rows
}

// POST /api/compensation/:id/approve
export async function approveCompensation(id) {
  await delay(500)
  return { id, status: 'Paid', date: new Date().toISOString().slice(0, 10) }
}
