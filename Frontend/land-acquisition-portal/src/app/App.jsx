import React from 'react'
import { Navigate, Route, Routes } from 'react-router-dom'

import PublicLayout from '../layouts/PublicLayout'
import AdminLayout from '../layouts/AdminLayout'
import ProtectedRoute from './routes/ProtectedRoute'

import Login from '../pages/Login/Login'
import Dashboard from '../pages/Dashboard/Dashboard'
import Projects from '../pages/Projects/Projects'
import ProjectDetails from '../pages/Projects/ProjectDetails'
import LandParcels from '../pages/LandParcels/LandParcels'
import Compensation from '../pages/Compensation/Compensation'
import RR from '../pages/RR/RR'
import Documents from '../pages/Documents/Documents'
import GISMap from '../pages/GISMap/GISMap'
import Reports from '../pages/Reports/Reports'
import Notifications from '../pages/Notifications/Notifications'
import Profile from '../pages/Profile/Profile'
import Settings from '../pages/Settings/Settings'

export default function App() {
  return (
    <Routes>
      <Route element={<PublicLayout />}>
        <Route path="/login" element={<Login />} />
      </Route>

      <Route
        element={
          <ProtectedRoute>
            <AdminLayout />
          </ProtectedRoute>
        }
      >
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/projects" element={<Projects />} />
        <Route path="/projects/:id" element={<ProjectDetails />} />
        <Route path="/land-parcels" element={<LandParcels />} />
        <Route path="/gis-map" element={<GISMap />} />
        <Route path="/compensation" element={<Compensation />} />
        <Route path="/rr" element={<RR />} />
        <Route path="/documents" element={<Documents />} />
        <Route path="/reports" element={<Reports />} />
        <Route path="/notifications" element={<Notifications />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/settings" element={<Settings />} />
      </Route>

      <Route path="/" element={<Navigate to="/dashboard" replace />} />
      <Route path="*" element={<Navigate to="/dashboard" replace />} />
    </Routes>
  )
}
