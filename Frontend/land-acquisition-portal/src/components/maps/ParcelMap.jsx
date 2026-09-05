import React, { useMemo, useState } from 'react'
import { Layers, Minus, Plus, Search } from 'lucide-react'
import StatusPill from '../common/StatusPill'

// Production note: this is a lightweight, dependency-free stand-in for a real
// tile-based map. Swap the <svg> canvas below for Leaflet / Mapbox GL / ArcGIS
// JS API, keeping the same `parcels` GeoJSON-like data shape and layer toggles.
const LAYERS = [
  { key: 'boundary', label: 'Project Boundary', color: '#1f4e79' },
  { key: 'parcels', label: 'Land Parcels', color: '#e97a1f' },
  { key: 'roads', label: 'Roads', color: '#8a8f98' },
  { key: 'rivers', label: 'Rivers', color: '#4a90c9' },
]

function project(lat, lng, bounds, size) {
  const x = ((lng - bounds.minLng) / (bounds.maxLng - bounds.minLng)) * size.w
  const y = size.h - ((lat - bounds.minLat) / (bounds.maxLat - bounds.minLat)) * size.h
  return { x, y }
}

export default function ParcelMap({ parcels, selectedId, onSelect }) {
  const [activeLayers, setActiveLayers] = useState(() => new Set(LAYERS.map((l) => l.key)))
  const [zoom, setZoom] = useState(1)
  const [query, setQuery] = useState('')

  const size = { w: 640, h: 400 }
  const bounds = useMemo(() => {
    const lats = parcels.map((p) => p.lat)
    const lngs = parcels.map((p) => p.lng)
    const pad = 0.08
    return {
      minLat: Math.min(...lats) - pad,
      maxLat: Math.max(...lats) + pad,
      minLng: Math.min(...lngs) - pad,
      maxLng: Math.max(...lngs) + pad,
    }
  }, [parcels])

  const toggleLayer = (key) => {
    setActiveLayers((prev) => {
      const next = new Set(prev)
      next.has(key) ? next.delete(key) : next.add(key)
      return next
    })
  }

  const filtered = query
    ? parcels.filter((p) => p.surveyNo.toLowerCase().includes(query.toLowerCase()) || p.owner.toLowerCase().includes(query.toLowerCase()))
    : parcels

  const selected = parcels.find((p) => p.id === selectedId)

  return (
    <div className="grid grid-cols-1 gap-4 lg:grid-cols-[1fr_280px]">
      <div className="gov-card overflow-hidden">
        <div className="flex items-center gap-2 border-b border-navy-100 bg-navy-50/60 px-3 py-2">
          <Search size={15} className="text-navy-400" />
          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search parcel by survey no. or owner…"
            className="w-full bg-transparent text-sm outline-none placeholder:text-navy-300"
          />
          <div className="flex items-center gap-1 border-l border-navy-200 pl-2">
            <button type="button" onClick={() => setZoom((z) => Math.max(0.7, z - 0.15))} className="rounded-sm border border-navy-200 p-1 hover:bg-white">
              <Minus size={13} />
            </button>
            <button type="button" onClick={() => setZoom((z) => Math.min(1.8, z + 0.15))} className="rounded-sm border border-navy-200 p-1 hover:bg-white">
              <Plus size={13} />
            </button>
          </div>
        </div>

        <div className="relative overflow-hidden bg-[#eef4ea]" style={{ height: 420 }}>
          <svg
            viewBox={`0 0 ${size.w} ${size.h}`}
            className="h-full w-full transition-transform duration-200"
            style={{ transform: `scale(${zoom})` }}
          >
            <rect x="0" y="0" width={size.w} height={size.h} fill="#eef4ea" />
            {/* faux terrain grid */}
            {Array.from({ length: 16 }).map((_, i) => (
              <line key={`v${i}`} x1={(i * size.w) / 16} y1="0" x2={(i * size.w) / 16} y2={size.h} stroke="#dde6d8" strokeWidth="1" />
            ))}
            {Array.from({ length: 10 }).map((_, i) => (
              <line key={`h${i}`} x1="0" y1={(i * size.h) / 10} x2={size.w} y2={(i * size.h) / 10} stroke="#dde6d8" strokeWidth="1" />
            ))}

            {activeLayers.has('rivers') && (
              <path d={`M0,${size.h * 0.75} C ${size.w * 0.3},${size.h * 0.6} ${size.w * 0.6},${size.h * 0.85} ${size.w},${size.h * 0.65}`} fill="none" stroke="#4a90c9" strokeWidth="5" opacity="0.6" />
            )}
            {activeLayers.has('roads') && (
              <path d={`M0,${size.h * 0.35} L ${size.w},${size.h * 0.42}`} fill="none" stroke="#8a8f98" strokeWidth="4" strokeDasharray="10 6" />
            )}
            {activeLayers.has('boundary') && (
              <rect x={size.w * 0.08} y={size.h * 0.1} width={size.w * 0.84} height={size.h * 0.8} fill="none" stroke="#1f4e79" strokeWidth="2" strokeDasharray="6 4" rx="6" />
            )}

            {activeLayers.has('parcels') &&
              filtered.map((p) => {
                const { x, y } = project(p.lat, p.lng, bounds, size)
                const isSelected = p.id === selectedId
                const color = p.status === 'Acquired' ? '#0a7a3c' : p.status === 'Pending' ? '#e97a1f' : '#1f4e79'
                return (
                  <g key={p.id} onClick={() => onSelect?.(p)} className="cursor-pointer">
                    <circle cx={x} cy={y} r={isSelected ? 9 : 6.5} fill={color} stroke="#ffffff" strokeWidth="2" />
                    {isSelected && <circle cx={x} cy={y} r="13" fill="none" stroke={color} strokeWidth="1.5" opacity="0.5" />}
                  </g>
                )
              })}
          </svg>

          <div className="absolute bottom-2 left-2 rounded-sm bg-white/90 px-2 py-1 text-[10px] text-navy-500 shadow-card">
            Schematic view — plug in Leaflet/Mapbox for real tile imagery
          </div>
        </div>
      </div>

      <div className="flex flex-col gap-3">
        <div className="gov-card p-3">
          <div className="mb-2 flex items-center gap-2 text-xs font-bold uppercase tracking-wide text-navy-600">
            <Layers size={14} /> Layers
          </div>
          <div className="flex flex-col gap-2">
            {LAYERS.map((l) => (
              <label key={l.key} className="flex items-center gap-2 text-sm text-navy-700">
                <input type="checkbox" checked={activeLayers.has(l.key)} onChange={() => toggleLayer(l.key)} className="accent-navy-600" />
                <span className="h-2.5 w-2.5 rounded-full" style={{ backgroundColor: l.color }} />
                {l.label}
              </label>
            ))}
          </div>
        </div>

        <div className="gov-card p-3">
          <p className="mb-2 text-xs font-bold uppercase tracking-wide text-navy-600">Parcel Details</p>
          {selected ? (
            <div className="space-y-1.5 text-sm">
              <p className="font-semibold text-navy-900">{selected.surveyNo}</p>
              <p className="text-navy-500">{selected.owner}</p>
              <p className="text-navy-500">
                {selected.village}, {selected.district}
              </p>
              <p className="text-navy-500">
                {selected.area} {selected.unit}
              </p>
              <StatusPill status={selected.status} />
            </div>
          ) : (
            <p className="text-xs text-navy-400">Click a parcel marker on the map to view details.</p>
          )}
        </div>
      </div>
    </div>
  )
}
