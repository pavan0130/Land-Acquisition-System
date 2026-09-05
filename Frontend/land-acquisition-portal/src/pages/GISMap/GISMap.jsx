import React, { useEffect, useState } from 'react'
import PageHeader from '../../components/common/PageHeader'
import ParcelMap from '../../components/maps/ParcelMap'
import Loader from '../../components/common/Loader'
import { fetchMapParcels } from '../../services/mapApi'

export default function GISMap() {
  const [parcels, setParcels] = useState([])
  const [loading, setLoading] = useState(true)
  const [selected, setSelected] = useState(null)

  useEffect(() => {
    fetchMapParcels().then((data) => {
      setParcels(data)
      setLoading(false)
    })
  }, [])

  if (loading) return <Loader label="Loading GIS layers…" />

  return (
    <div>
      <PageHeader title="GIS Map" subtitle="Land parcels, project boundaries, roads and river layers" />
      <ParcelMap parcels={parcels} selectedId={selected?.id} onSelect={setSelected} />
    </div>
  )
}
