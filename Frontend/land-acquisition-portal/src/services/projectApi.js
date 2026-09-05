import { PROJECTS, PROJECT_TIMELINE } from './mockData'

function delay(ms = 400) {
  return new Promise((resolve) => setTimeout(resolve, ms))
}

// GET /api/projects
export async function fetchProjects(filters = {}) {
  await delay()
  let rows = [...PROJECTS]
  if (filters.status && filters.status !== 'All') {
    rows = rows.filter((p) => p.status === filters.status)
  }
  if (filters.search) {
    const q = filters.search.toLowerCase()
    rows = rows.filter((p) => p.name.toLowerCase().includes(q) || p.id.toLowerCase().includes(q) || p.district.toLowerCase().includes(q))
  }
  return rows
}

// GET /api/projects/:id
export async function fetchProjectById(id) {
  await delay(300)
  const project = PROJECTS.find((p) => p.id === id)
  if (!project) throw new Error('Project not found')
  return { ...project, timeline: PROJECT_TIMELINE[id] ?? [] }
}

// POST /api/projects
export async function createProject(payload) {
  await delay(500)
  return { id: `PRJ-${Math.floor(100 + Math.random() * 900)}`, progress: 0, landAcquired: 0, ...payload }
}
