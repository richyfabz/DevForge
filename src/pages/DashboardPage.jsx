import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { useAuth } from '../hooks/useAuth'
import { useProgress } from '../hooks/useProgress'
import Navbar from '../components/Navbar'
// A separate component for each enrolled course card.
// We pull it out because it needs to call useProgress —
// and hooks must be called at the component level, not inside a map().
// Calling useProgress inside a .map() would violate the Rules of Hooks.
function CourseProgressCard({ course }) {
  const { percentage, completedLessons } = useProgress(
    course.id,
    course.lessons.length
  )

  return (
    <Link to={`/courses/${course.id}`} style={styles.card}>
      <span style={styles.cardIcon}>{course.thumbnail}</span>

      <div style={{ flex: 1 }}>
        <p style={styles.cardTitle}>{course.title}</p>
        <p style={styles.cardMeta}>
          {course.lessons.length} lessons · {course.duration}
        </p>

        {/* PROGRESS BAR */}
        <div style={styles.progressTrack}>
          <div
            style={{
              ...styles.progressFill,
              width: `${percentage}%`,
            }}
          />
        </div>

        {/* Progress label */}
        <p style={styles.progressLabel}>
          {completedLessons.length}/{course.lessons.length} completed · {percentage}%
        </p>
      </div>

      <span style={styles.badge}>{course.category}</span>
    </Link>
  )
}
export default function DashboardPage() {
  const { user } = useAuth()

  // Reading directly from the courses slice in Redux.
  // state.courses maps to the "courses" key we registered in store/index.js
  const allCourses        = useSelector((state) => state.courses.courses)
  const enrolledCourseIds = useSelector((state) => state.courses.enrolledCourseIds)

  // Derive the full enrolled course objects from just the IDs
  const enrolledCourses = allCourses.filter((course) =>
    enrolledCourseIds.includes(course.id)
  )

  return (
    <div style={styles.wrapper}>
      <Navbar />

      <div style={styles.container}>
        {/* HERO SECTION */}
        <div style={styles.hero}>
          <div style={styles.heroGlow} />
          <p style={styles.greeting}>Welcome back,</p>
          {/* user.name was derived from the email during login in useAuth */}
          <h1 style={styles.name}>{user?.name} 👋</h1>
          <p style={styles.sub}>
            {enrolledCourses.length === 0
              ? "You haven't enrolled in any courses yet."
              : `You're enrolled in ${enrolledCourses.length} course${enrolledCourses.length > 1 ? 's' : ''}.`}
          </p>
          <Link to="/courses" style={styles.browseBtn}>
            Browse Courses →
          </Link>
        </div>

        {/* ENROLLED COURSES SECTION */}
        {enrolledCourses.length > 0 && (
          <div style={styles.section}>
            <h2 style={styles.sectionTitle}>Your Courses</h2>
            <div style={styles.grid}>
                {enrolledCourses.map((course) => (
    <CourseProgressCard key={course.id} course={course} />
    ))}
            </div>
          </div>
        )}

        {/* STATS ROW — shown always */}
        <div style={styles.statsRow}>
          <div style={styles.statCard}>
            <p style={styles.statNumber}>{enrolledCourses.length}</p>
            <p style={styles.statLabel}>Enrolled</p>
          </div>
          <div style={styles.statCard}>
            <p style={styles.statNumber}>
              {enrolledCourses.reduce((acc, c) => acc + c.lessons.length, 0)}
            </p>
            <p style={styles.statLabel}>Total Lessons</p>
          </div>
          <div style={styles.statCard}>
            <p style={styles.statNumber}>{allCourses.length}</p>
            <p style={styles.statLabel}>Courses Available</p>
          </div>
        </div>

      </div>
    </div>
  )
}

const styles = {
  wrapper: {
    minHeight: '100vh',
    background: '#050b14',
    fontFamily: "'Space Grotesk', 'Segoe UI', sans-serif",
  },
  container: {
    maxWidth: '1100px',
    margin: '0 auto',
    padding: '3rem 1.5rem',
  },
  hero: {
    position: 'relative',
    marginBottom: '3rem',
    overflow: 'hidden',
  },
  // The cyan glow blob behind the hero text
  heroGlow: {
    position: 'absolute',
    top: '-60px',
    left: '-60px',
    width: '300px',
    height: '300px',
    background: 'radial-gradient(circle, rgba(0,255,255,0.06) 0%, transparent 70%)',
    pointerEvents: 'none',
  },
  greeting: {
    color: '#4a6080',
    fontSize: '1rem',
    margin: '0 0 0.25rem',
  },
  name: {
    fontSize: '2.5rem',
    fontWeight: '800',
    color: '#e2e8f0',
    margin: '0 0 0.75rem',
    // The text glow effect on the name
    textShadow: '0 0 40px rgba(0,255,255,0.15)',
  },
  sub: {
    color: '#4a6080',
    fontSize: '1rem',
    marginBottom: '1.5rem',
  },
  browseBtn: {
    display: 'inline-block',
    background: 'linear-gradient(135deg, #00ffff, #0080ff)',
    color: '#050b14',
    padding: '0.7rem 1.5rem',
    borderRadius: '8px',
    textDecoration: 'none',
    fontWeight: '700',
    fontSize: '0.9rem',
    boxShadow: '0 0 20px rgba(0,255,255,0.2)',
  },
  section: { marginBottom: '3rem' },
  sectionTitle: {
    color: '#e2e8f0',
    fontSize: '1.2rem',
    fontWeight: '600',
    marginBottom: '1rem',
    paddingBottom: '0.5rem',
    borderBottom: '1px solid rgba(0,255,255,0.08)',
  },
  grid: {
    display: 'flex',
    flexDirection: 'column',
    gap: '0.75rem',
  },
  card: {
    display: 'flex',
    alignItems: 'center',
    gap: '1rem',
    background: 'rgba(255,255,255,0.02)',
    border: '1px solid rgba(0,255,255,0.08)',
    borderRadius: '10px',
    padding: '1rem 1.25rem',
    textDecoration: 'none',
    transition: 'border-color 0.2s',
  },
  cardIcon: { fontSize: '1.5rem' },
  cardTitle: {
    color: '#e2e8f0',
    fontSize: '0.95rem',
    fontWeight: '600',
    margin: '0 0 0.2rem',
  },
  cardMeta: { color: '#4a6080', fontSize: '0.8rem', margin: 0 },
  badge: {
    marginLeft: 'auto',
    background: 'rgba(0,255,255,0.06)',
    border: '1px solid rgba(0,255,255,0.15)',
    color: '#00ffff',
    padding: '0.2rem 0.6rem',
    borderRadius: '20px',
    fontSize: '0.75rem',
  },
  statsRow: {
    display: 'grid',
    gridTemplateColumns: 'repeat(3, 1fr)',
    gap: '1rem',
  },
  statCard: {
    background: 'rgba(255,255,255,0.02)',
    border: '1px solid rgba(0,255,255,0.08)',
    borderRadius: '10px',
    padding: '1.25rem',
    textAlign: 'center',
  },
  statNumber: {
    fontSize: '2rem',
    fontWeight: '800',
    color: '#00ffff',
    margin: '0 0 0.25rem',
    textShadow: '0 0 20px rgba(0,255,255,0.3)',
  },
  statLabel: { color: '#4a6080', fontSize: '0.8rem', margin: 0 },
  progressTrack: {
    height: '4px',
    background: 'rgba(255,255,255,0.05)',
    borderRadius: '999px',
    overflow: 'hidden',
    marginTop: '0.5rem',
    border: '1px solid rgba(0,255,255,0.06)',
  },
  progressFill: {
    height: '100%',
    background: 'linear-gradient(90deg, #00ffff, #0080ff)',
    borderRadius: '999px',
    transition: 'width 0.4s ease',
    boxShadow: '0 0 6px rgba(0,255,255,0.4)',
  },
  progressLabel: {
    color: '#2a3a50',
    fontSize: '0.72rem',
    margin: '0.3rem 0 0',
  },
}