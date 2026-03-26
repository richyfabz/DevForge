// Navigate is React Router's programmatic redirect component.
// When rendered, it immediately sends the user to whatever "to" prop you give it.
import { Navigate } from 'react-router-dom'
import { useAuth } from '../hooks/useAuth'

// ProtectedRoute wraps a page component.
// In App.jsx you'll use it like this:
//   <Route path="/dashboard" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
//
// children is a special React prop — it refers to whatever you nest inside
// a component. Here, children will be the page component (e.g. <Dashboard />).

export default function ProtectedRoute({ children }) {
  const { isAuthenticated } = useAuth()

  // The entire logic is one line:
  // If authenticated → render the page (children)
  // If NOT authenticated → redirect to /login
  // The "replace" prop replaces the current history entry so the user
  // can't click "back" to get to the protected page without logging in.
  if (!isAuthenticated) {
    return <Navigate to="/login" replace />
  }

  return children
}