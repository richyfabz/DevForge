import { NavLink, useNavigate } from 'react-router-dom'
import { useAuth } from '../hooks/useAuth'

export default function Navbar() {
  const { user, logoutUser } = useAuth()
  const navigate = useNavigate()

  const handleLogout = () => {
    // First update Redux state — isAuthenticated becomes false
    logoutUser()
    // Then redirect to login — ProtectedRoute will also enforce this
    // but we navigate manually for an instant, clean transition
    navigate('/login')
  }

  return (
    <nav style={styles.nav}>
      {/* LEFT — Brand */}
      <NavLink to="/dashboard" style={{ textDecoration: 'none' }}>
        <div style={styles.logo}>
          <span style={styles.logoIcon}>⬡</span>
          <span style={styles.logoText}>DevForge</span>
        </div>
      </NavLink>

      {/* CENTER — Navigation links */}
      <div style={styles.links}>
        {/* NavLink receives a function for its style prop.
            isActive is automatically true when the URL matches this link.
            We use it to highlight the current page's link in cyan. */}
        <NavLink to="/dashboard" style={({ isActive }) => navLinkStyle(isActive)}>
          Dashboard
        </NavLink>
        <NavLink to="/courses" style={({ isActive }) => navLinkStyle(isActive)}>
          Courses
        </NavLink>
      </div>

      {/* RIGHT — User info + logout */}
      <div style={styles.right}>
        {/* user.name comes from Redux store — set during login in useAuth */}
        <span style={styles.username}>👤 {user?.name}</span>
        <button onClick={handleLogout} style={styles.logoutBtn}>
          Logout
        </button>
      </div>
    </nav>
  )
}

// This is a regular function, not a component.
// It returns a style object based on whether the link is active.
// isActive = true → cyan color, isActive = false → muted grey
const navLinkStyle = (isActive) => ({
  color: isActive ? '#00ffff' : '#4a6080',
  textDecoration: 'none',
  fontSize: '0.9rem',
  fontWeight: isActive ? '600' : '500',
  paddingBottom: '2px',
  // The glowing underline only shows on the active link
  borderBottom: isActive ? '1px solid #00ffff' : '1px solid transparent',
  transition: 'color 0.2s',
})

const styles = {
  nav: {
    position: 'sticky',
    top: 0,
    zIndex: 100,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: '0 2rem',
    height: '60px',
    background: 'rgba(5, 11, 20, 0.85)',
    borderBottom: '1px solid rgba(0,255,255,0.08)',
    // backdropFilter creates the frosted glass effect —
    // content scrolling behind the navbar gets blurred
    backdropFilter: 'blur(12px)',
    fontFamily: "'Space Grotesk', 'Segoe UI', sans-serif",
  },
  logo: {
    display: 'flex',
    alignItems: 'center',
    gap: '0.4rem',
  },
  logoIcon: { fontSize: '1.2rem', color: '#00ffff' },
  logoText: {
    fontSize: '1rem',
    fontWeight: '700',
    color: '#00ffff',
    letterSpacing: '0.05em',
  },
  links: {
    display: 'flex',
    gap: '2rem',
  },
  right: {
    display: 'flex',
    alignItems: 'center',
    gap: '1rem',
  },
  username: {
    color: '#4a6080',
    fontSize: '0.85rem',
  },
  logoutBtn: {
    background: 'transparent',
    border: '1px solid rgba(0,255,255,0.15)',
    borderRadius: '6px',
    color: '#00ffff',
    padding: '0.4rem 0.9rem',
    fontSize: '0.8rem',
    cursor: 'pointer',
    transition: 'background 0.2s',
  },
}