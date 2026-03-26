// useState manages local component state — the email/password inputs
// and any error message we want to show.
import { useState } from 'react'

// useNavigate lets us redirect programmatically after login succeeds.
// useLocation tells us where the user was trying to go before being
// redirected to login — so we can send them there after login.
import { useNavigate, useLocation } from 'react-router-dom'

import { useAuth } from '../hooks/useAuth'

export default function LoginPage() {
  // Local state for the form inputs
  const [email, setEmail]       = useState('')
  const [password, setPassword] = useState('')
  const [error, setError]       = useState('')

  const { loginUser } = useAuth()
  const navigate      = useNavigate()
  const location      = useLocation()

  // If the user was redirected here from a protected route (e.g. /dashboard),
  // location.state?.from holds that original path.
  // If they came directly to /login, we default to '/dashboard'.
  const redirectTo = location.state?.from?.pathname || '/dashboard'

  const handleLogin = (e) => {
    // e.preventDefault() stops the browser from refreshing the page on submit.
    // This is standard for any form in React.
    e.preventDefault()

    // Basic validation — both fields must be filled
    if (!email || !password) {
      setError('Please enter both email and password.')
      return
    }

    // Call our custom hook's loginUser — this updates Redux state
    loginUser(email, password)

    // Redirect to wherever they were going (or dashboard)
    navigate(redirectTo, { replace: true })
  }

  return (
    <div style={styles.wrapper}>
      {/* Background grid — purely decorative, gives the futuristic feel */}
      <div style={styles.grid} />

      <div style={styles.card}>
        {/* Logo / Brand */}
        <div style={styles.logo}>
          <span style={styles.logoIcon}>⬡</span>
          <span style={styles.logoText}>DevForge</span>
        </div>

        <h1 style={styles.title}>Welcome back</h1>
        <p style={styles.sub}>Sign in to continue your learning journey</p>

        {/* Error message — only shown when error state is non-empty */}
        {error && <p style={styles.error}>{error}</p>}

        <form onSubmit={handleLogin} style={styles.form}>
          <div style={styles.field}>
            <label style={styles.label}>Email</label>
            {/* Controlled input — value is always tied to React state */}
            <input
              type="email"
              placeholder="you@devforge.com"
              value={email}
              // onChange fires on every keystroke, updating our email state
              onChange={(e) => setEmail(e.target.value)}
              style={styles.input}
            />
          </div>

          <div style={styles.field}>
            <label style={styles.label}>Password</label>
            <input
              type="password"
              placeholder="Any password works"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              style={styles.input}
            />
          </div>

          <button type="submit" style={styles.btn}>
            Access DevForge →
          </button>
        </form>

        <p style={styles.hint}>
          No account needed — any credentials will work.
        </p>
      </div>
    </div>
  )
}

// STYLES 
const styles = {
  wrapper: {
    minHeight: '100vh',
    background: '#050b14',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative',
    overflow: 'hidden',
    fontFamily: "'Space Grotesk', 'Segoe UI', sans-serif",
  },
  // CSS grid lines in the background for the techy feel
  grid: {
    position: 'absolute',
    inset: 0,
    backgroundImage: `
      linear-gradient(rgba(0,255,255,0.03) 1px, transparent 1px),
      linear-gradient(90deg, rgba(0,255,255,0.03) 1px, transparent 1px)
    `,
    backgroundSize: '40px 40px',
    pointerEvents: 'none',
  },
  card: {
    position: 'relative',
    zIndex: 1,
    background: 'rgba(255,255,255,0.03)',
    border: '1px solid rgba(0,255,255,0.15)',
    borderRadius: '16px',
    padding: '2.5rem',
    width: '100%',
    maxWidth: '420px',
    // The cyan glow effect — box-shadow with the accent color
    boxShadow: '0 0 40px rgba(0,255,255,0.06), 0 20px 60px rgba(0,0,0,0.4)',
    backdropFilter: 'blur(20px)',
  },
  logo: {
    display: 'flex',
    alignItems: 'center',
    gap: '0.5rem',
    marginBottom: '1.5rem',
  },
  logoIcon: { fontSize: '1.5rem', color: '#00ffff' },
  logoText: {
    fontSize: '1.2rem',
    fontWeight: '700',
    color: '#00ffff',
    letterSpacing: '0.05em',
  },
  title: {
    fontSize: '1.75rem',
    fontWeight: '700',
    color: '#e2e8f0',
    margin: '0 0 0.4rem',
  },
  sub: { color: '#4a6080', fontSize: '0.9rem', margin: '0 0 1.5rem' },
  error: {
    background: 'rgba(255,50,50,0.1)',
    border: '1px solid rgba(255,50,50,0.3)',
    color: '#ff6b6b',
    padding: '0.6rem 1rem',
    borderRadius: '8px',
    fontSize: '0.85rem',
    marginBottom: '1rem',
  },
  form: { display: 'flex', flexDirection: 'column', gap: '1.25rem' },
  field: { display: 'flex', flexDirection: 'column', gap: '0.4rem' },
  label: { color: '#64748b', fontSize: '0.8rem', letterSpacing: '0.08em', textTransform: 'uppercase' },
  input: {
    background: 'rgba(0,255,255,0.04)',
    border: '1px solid rgba(0,255,255,0.12)',
    borderRadius: '8px',
    padding: '0.75rem 1rem',
    color: '#e2e8f0',
    fontSize: '0.95rem',
    outline: 'none',
    transition: 'border-color 0.2s',
  },
  btn: {
    marginTop: '0.5rem',
    background: 'linear-gradient(135deg, #00ffff, #0080ff)',
    border: 'none',
    borderRadius: '8px',
    padding: '0.85rem',
    color: '#050b14',
    fontWeight: '700',
    fontSize: '1rem',
    cursor: 'pointer',
    letterSpacing: '0.02em',
    boxShadow: '0 0 20px rgba(0,255,255,0.25)',
    transition: 'opacity 0.2s',
  },
  hint: {
    textAlign: 'center',
    color: '#2a3a50',
    fontSize: '0.78rem',
    marginTop: '1.25rem',
  },
}