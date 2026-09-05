import { ROLES } from '../utils/roles'

// This module simulates a real backend (JWT/OAuth2) call.
// Replace the body of each function with real `fetch`/axios calls to your
// Spring Boot / .NET / Node backend when wiring this up for production.

const DEMO_USERS = [
  { id: 'u-001', username: 'ministry.admin', password: 'password', name: 'A. Sharma', role: ROLES.CENTRAL_MINISTRY, department: 'Ministry of Rural Development' },
  { id: 'u-002', username: 'state.officer', password: 'password', name: 'R. Verma', role: ROLES.STATE_OFFICER, department: 'Govt. of Tamil Nadu' },
  { id: 'u-003', username: 'district.collector', password: 'password', name: 'K. Iyer', role: ROLES.DISTRICT_COLLECTOR, department: 'Coimbatore District' },
  { id: 'u-004', username: 'citizen', password: 'password', name: 'S. Kumar', role: ROLES.CITIZEN, department: 'Public' },
]

function delay(ms = 500) {
  return new Promise((resolve) => setTimeout(resolve, ms))
}

export async function loginRequest({ username, password }) {
  await delay(600)
  const match = DEMO_USERS.find((u) => u.username === username && u.password === password)
  if (!match) {
    const err = new Error('Invalid username or password.')
    err.code = 'AUTH_INVALID_CREDENTIALS'
    throw err
  }
  const { password: _pw, ...safeUser } = match
  return {
    ...safeUser,
    token: `demo.jwt.${match.id}.${Date.now()}`,
    issuedAt: new Date().toISOString(),
  }
}

export async function logoutRequest() {
  await delay(200)
  return true
}

export function demoAccounts() {
  return DEMO_USERS.map(({ password: _pw, ...rest }) => rest)
}
