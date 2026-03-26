// BrowserRouter watches the URL bar.
// Routes is the container for all route definitions.
// Route maps a URL path to a component.
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'

import LoginPage      from './pages/LoginPage'
import ProtectedRoute from './components/protectedRoute'

// These pages will be built in later phases.
// We're creating placeholder components inline for now
// so the routing works end-to-end from day one.
const Dashboard   = () => <div style={{color:'#00ffff',padding:'2rem'}}>Dashboard — Phase 3</div>
const CourseCatalog = () => <div style={{color:'#00ffff',padding:'2rem'}}> Course Catalog — Phase 3</div>

export default function App() {
  return (
    // BrowserRouter must be the outermost wrapper for all routing to work
    <BrowserRouter>
      <Routes>

        {/* PUBLIC ROUTE — anyone can visit /login */}
        <Route path="/login" element={<LoginPage />} />

        {/* PROTECTED ROUTES — ProtectedRoute checks isAuthenticated first.
            If not logged in, the user is redirected to /login.
            If logged in, the children (Dashboard, etc.) are rendered. */}
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          }
        />

        <Route
          path="/courses"
          element={
            <ProtectedRoute>
              <CourseCatalog />
            </ProtectedRoute>
          }
        />

        {/* Catch-all: redirect any unknown URL to /login */}
        <Route path="*" element={<Navigate to="/login" replace />} />

      </Routes>
    </BrowserRouter>
  )
}