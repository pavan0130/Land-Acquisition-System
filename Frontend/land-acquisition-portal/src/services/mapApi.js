import { LAND_PARCELS } from './mockData'

function delay(ms = 400) {
  return new Promise((resolve) => setTimeout(resolve, ms))
}

// GET /api/map/parcels
// In production, wire this to Leaflet/Mapbox/ArcGIS with a real tile source
// and a GeoJSON feature layer served from PostGIS, e.g.:
//   const res = await fetch('/api/gis/parcels.geojson')
//   return res.json()
export async function fetchMapParcels() {
  await delay(350)
  return LAND_PARCELS
}
