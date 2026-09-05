import {
  LayoutDashboard,
  FolderKanban,
  Map,
  LandPlot,
  IndianRupee,
  Users,
  FileStack,
  BarChart3,
  Bell,
} from 'lucide-react'

export const ROLES = {
  CENTRAL_MINISTRY: 'central_ministry',
  STATE_OFFICER: 'state_officer',
  DISTRICT_COLLECTOR: 'district_collector',
  CITIZEN: 'citizen',
}

export const ROLE_LABELS = {
  [ROLES.CENTRAL_MINISTRY]: 'Central Ministry',
  [ROLES.STATE_OFFICER]: 'State Officer',
  [ROLES.DISTRICT_COLLECTOR]: 'District Collector',
  [ROLES.CITIZEN]: 'Citizen',
}

// Full navigation catalogue. Each item declares which roles may see it.
export const NAV_ITEMS = [
  { key: 'dashboard', label: 'Dashboard', to: '/dashboard', icon: LayoutDashboard, roles: Object.values(ROLES) },
  { key: 'projects', label: 'Projects', to: '/projects', icon: FolderKanban, roles: [ROLES.CENTRAL_MINISTRY, ROLES.STATE_OFFICER, ROLES.DISTRICT_COLLECTOR] },
  { key: 'gis', label: 'GIS Map', to: '/gis-map', icon: Map, roles: [ROLES.CENTRAL_MINISTRY, ROLES.STATE_OFFICER, ROLES.DISTRICT_COLLECTOR] },
  { key: 'land', label: 'Land Parcels', to: '/land-parcels', icon: LandPlot, roles: [ROLES.CENTRAL_MINISTRY, ROLES.STATE_OFFICER, ROLES.DISTRICT_COLLECTOR] },
  { key: 'compensation', label: 'Compensation', to: '/compensation', icon: IndianRupee, roles: Object.values(ROLES) },
  { key: 'rr', label: 'R&R', to: '/rr', icon: Users, roles: [ROLES.CENTRAL_MINISTRY, ROLES.STATE_OFFICER, ROLES.DISTRICT_COLLECTOR] },
  { key: 'documents', label: 'Documents', to: '/documents', icon: FileStack, roles: Object.values(ROLES) },
  { key: 'reports', label: 'Reports', to: '/reports', icon: BarChart3, roles: [ROLES.CENTRAL_MINISTRY, ROLES.STATE_OFFICER, ROLES.DISTRICT_COLLECTOR] },
  { key: 'notifications', label: 'Notifications', to: '/notifications', icon: Bell, roles: Object.values(ROLES) },
]

export function navForRole(role) {
  return NAV_ITEMS.filter((item) => item.roles.includes(role))
}

export function canAccessRoute(role, path) {
  const item = NAV_ITEMS.find((n) => path.startsWith(n.to))
  if (!item) return true // routes like /profile, /settings are open to any authenticated role
  return item.roles.includes(role)
}
