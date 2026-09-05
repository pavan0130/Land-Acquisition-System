import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { ArrowLeft, Calendar, IndianRupee, LandPlot, Target } from 'lucide-react'
import PageHeader from '../../components/common/PageHeader'
import StatusPill from '../../components/common/StatusPill'
import Timeline from '../../components/timeline/Timeline'
import Loader from '../../components/common/Loader'
import { fetchProjectById } from '../../services/projectApi'
import { formatCrore, formatDate, formatNumber } from '../../utils/format'

export default function ProjectDetails() {
  const { id } = useParams()
  const navigate = useNavigate()
  const [project, setProject] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    setLoading(true)
    fetchProjectById(id)
      .then(setProject)
      .catch(() => setProject(null))
      .finally(() => setLoading(false))
  }, [id])

  if (loading) return <Loader label="Loading project details…" />
  if (!project) return <p className="text-navy-500">Project not found.</p>

  return (
    <div>
      <button type="button" onClick={() => navigate('/projects')} className="mb-4 flex items-center gap-1.5 text-sm font-semibold text-navy-500 hover:text-navy-800">
        <ArrowLeft size={15} /> Back to Projects
      </button>

      <PageHeader
        title={project.name}
        subtitle={`${project.id} · ${project.type} · ${project.district}, ${project.state}`}
        actions={<StatusPill status={project.status} />}
      />

      <div className="mb-6 grid grid-cols-2 gap-4 lg:grid-cols-4">
        <div className="gov-card p-4">
          <p className="flex items-center gap-1.5 text-xs font-semibold uppercase text-navy-500"><LandPlot size={14} /> Land Acquired</p>
          <p className="mt-1 text-lg font-bold text-navy-900">{formatNumber(project.landAcquired)} / {formatNumber(project.landRequired)} ac</p>
        </div>
        <div className="gov-card p-4">
          <p className="flex items-center gap-1.5 text-xs font-semibold uppercase text-navy-500"><IndianRupee size={14} /> Budget</p>
          <p className="mt-1 text-lg font-bold text-navy-900">{formatCrore(project.budget)}</p>
        </div>
        <div className="gov-card p-4">
          <p className="flex items-center gap-1.5 text-xs font-semibold uppercase text-navy-500"><Calendar size={14} /> Start Date</p>
          <p className="mt-1 text-lg font-bold text-navy-900">{formatDate(project.startDate)}</p>
        </div>
        <div className="gov-card p-4">
          <p className="flex items-center gap-1.5 text-xs font-semibold uppercase text-navy-500"><Target size={14} /> Target Date</p>
          <p className="mt-1 text-lg font-bold text-navy-900">{formatDate(project.targetDate)}</p>
        </div>
      </div>

      <h2 className="section-heading mb-4">Project Timeline</h2>
      {project.timeline?.length ? (
        <Timeline items={project.timeline} />
      ) : (
        <p className="text-sm text-navy-400">No timeline entries recorded yet for this project.</p>
      )}
    </div>
  )
}
