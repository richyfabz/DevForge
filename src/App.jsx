import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'

// Auth
import LoginPage       from './pages/LoginPage'
import ProtectedRoute  from './components/protectedRoute'
import LessonPlayerPage from './pages/LessonPlayerPage'

// Pages — replacing the inline placeholders from before
import DashboardPage     from './pages/DashboardPage'
import CourseCatalogPage from './pages/CourseCatalogPage'
import CourseDetailPage  from './pages/CourseDetailPage'

export default function App() {
  return (
    <BrowserRouter>
      <Routes>

        {/* PUBLIC */}
        <Route path="/login" element={<LoginPage />} />

        {/* PROTECTED — every route below requires authentication.
            ProtectedRoute checks isAuthenticated from Redux.
            If false → redirects to /login.
            If true → renders the child page. */}
        <Route path="/dashboard" element={
          <ProtectedRoute><DashboardPage /></ProtectedRoute>
        } />

        <Route path="/courses" element={
          <ProtectedRoute><CourseCatalogPage /></ProtectedRoute>
        } />

        {/* Dynamic route — :id matches any course ID.
            /courses/1 → CourseDetailPage with id = '1'
            /courses/3 → CourseDetailPage with id = '3' */}
        <Route path="/courses/:id" element={
          <ProtectedRoute><CourseDetailPage /></ProtectedRoute>
        }>
          {/* Wrap the child route in ProtectedRoute too */}
          <Route path="lessons/:lessonId" element={
            <ProtectedRoute><LessonPlayerPage /></ProtectedRoute>
          } />
        </Route>

        {/* Catch-all */}
        <Route path="*" element={<Navigate to="/login" replace />} />

      </Routes>
    </BrowserRouter>
  )
}