import { LAND_PARCELS } from './mockData'

function delay(ms = 400) {
  return new Promise((resolve) => setTimeout(resolve, ms))
}

// GET /api/land-parcels
export async function fetchParcels(filters = {}) {
  await delay()
  let rows = [...LAND_PARCELS]
  if (filters.status && filters.status !== 'All') {
    rows = rows.filter((p) => p.status === filters.status)
  }
  if (filters.district && filters.district !== 'All') {
    rows = rows.filter((p) => p.district === filters.district)
  }
  if (filters.search) {
    const q = filters.search.toLowerCase()
    rows = rows.filter(
      (p) =>
        p.owner.toLowerCase().includes(q) ||
        p.surveyNo.toLowerCase().includes(q) ||
        p.village.toLowerCase().includes(q) ||
        p.id.toLowerCase().includes(q),
    )
  }
  return rows
}

export async function fetchParcelById(id) {
  await delay(250)
  const parcel = LAND_PARCELS.find((p) => p.id === id)
  if (!parcel) throw new Error('Parcel not found')
  return parcel
}
