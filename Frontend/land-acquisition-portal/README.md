# National Land Acquisition & Management System — Frontend

A React + Vite + Tailwind CSS frontend for a government land acquisition and
management portal, styled to read as an official public-sector application
(tricolor header strip, navy/saffron palette, formal typography, role-based
access).

## Getting started

```bash
npm install
npm run dev
```

Open the printed local URL (typically `http://localhost:5173`).

Demo sign-in (any of these, password is always `password`):

| Role               | Username             |
|---------------------|----------------------|
| Central Ministry     | `ministry.admin`     |
| State Officer        | `state.officer`      |
| District Collector   | `district.collector` |
| Citizen              | `citizen`            |

The sidebar menu and page access automatically adapt to the signed-in role
(see `src/utils/roles.js`).

## Tech stack

- **React 18 + Vite** — app shell and build tooling
- **Tailwind CSS** — utility-first styling, with a custom government color
  palette defined in `tailwind.config.js` (navy / saffron / India green)
- **React Router v6** — routing, nested layouts, protected routes
- **Zustand** — small UI store (sidebar open/collapsed state)
- **Recharts** — dashboard and report charts
- **lucide-react** — icon set

## Project structure

```
src/
├── app/
│   ├── App.jsx            # route definitions
│   ├── providers/         # AuthProvider (JWT/session mock)
│   ├── routes/            # ProtectedRoute (auth + role guard)
│   └── store/             # zustand UI store
├── components/
│   ├── common/            # Navbar, Sidebar, Footer, StatCard, etc.
│   ├── tables/             # reusable DataTable (search/sort/paginate)
│   ├── charts/             # Bar/Line/Pie chart cards (Recharts)
│   ├── maps/                # ParcelMap (schematic GIS visualization)
│   ├── modals/              # Modal
│   ├── timeline/            # project status Timeline
│   └── upload/               # FileUpload dropzone
├── pages/                  # one folder per module (Dashboard, Projects, …)
├── layouts/                # AdminLayout (authenticated shell), PublicLayout
├── services/                # mock API layer — see below
├── hooks/                    # useAuth, useDebounce, useNotifications
└── utils/                    # roles.js, format.js
```

## Mock backend / where to wire in real APIs

Every file under `src/services/` simulates a real REST call with a delay and
returns realistic sample data from `src/services/mockData.js`. Each function
has a comment showing the intended real endpoint, e.g.:

```js
// GET /api/projects
export async function fetchProjects(filters) { ... }
```

To connect a real backend (Spring Boot / .NET / Node), replace the body of
these functions with `fetch`/`axios` calls — the rest of the app (pages,
tables, charts) does not need to change since it only depends on the
function signatures.

`src/services/mapApi.js` also documents how to swap the built-in schematic
SVG map (`components/maps/ParcelMap.jsx`) for a real Leaflet / Mapbox GL /
ArcGIS JS layer backed by PostGIS.

`src/hooks/useNotifications.js` documents how to swap the polling stub for a
real WebSocket or Server-Sent Events (SSE) subscription for live
notifications.

## Authentication

`src/app/providers/AuthProvider.jsx` and `src/services/authApi.js` simulate
JWT-based authentication with a session persisted to `localStorage`. Swap
`loginRequest` / `logoutRequest` for real calls to your identity provider
(JWT or OAuth2) — the rest of the app already reads `user`, `role`, and
`isAuthenticated` from the `useAuth()` hook.

## Role-based access

`src/utils/roles.js` defines the navigation catalogue and which roles can see
each module. `ProtectedRoute` redirects any authenticated user who lands on a
route their role doesn't have access to, back to the dashboard.

## Notes on styling

- The color system, type scale and component classes (`.gov-card`,
  `.gov-btn-primary`, `.status-pill`, etc.) live in `tailwind.config.js` and
  `src/index.css`.
- `public/emblem.svg` is a generic abstract emblem (not an official state
  emblem) — replace with your department's authorized logo/emblem asset
  before using this in a real deployment.
