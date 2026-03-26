import { enrollCourse, unenrollCourse } from '../store/courseSlice'
import { useSelector, useDispatch } from 'react-redux'
import { useParams, Link, useNavigate, Outlet, useMatch } from 'react-router-dom'
import { useProgress } from '../hooks/useProgress'
import Navbar from '../components/Navbar'

export default function CourseDetailPage() {
  // useParams reads the dynamic segment from the URL.
  // If URL is /courses/3, then id = '3'
  const { id } = useParams()

  // useDispatch gives us the dispatch function —
  // the trigger that sends actions to Redux reducers
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const allCourses        = useSelector((state) => state.courses.courses)
  const enrolledCourseIds = useSelector((state) => state.courses.enrolledCourseIds)

  // Find the course whose id matches the URL parameter
  const course = allCourses.find((c) => c.id === id)

  // Check if this specific course is enrolled
  const isEnrolled = enrolledCourseIds.includes(id)

  // useProgress gives us the completion percentage for this course.
    // We pass course?.lessons.length safely — if course is undefined
    // (handled by the guard below) it defaults to 0.
    const { percentage, completedLessons } = useProgress(
    id,
    course?.lessons.length || 0
    )

  // Guard: if no course matches the URL (e.g. /courses/999), show a fallback
  if (!course) {
    return (
      <div style={styles.wrapper}>
        <Navbar />
        <div style={styles.notFound}>
          <h2 style={{ color: '#e2e8f0' }}>Course not found</h2>
          <button style={styles.backBtn} onClick={() => navigate('/courses')}>
            ← Back to Catalog
          </button>
        </div>
      </div>
    )
  }

  const handleEnroll = () => {
    // dispatch() sends the action to Redux.
    // enrollCourse(id) creates the action object:
    // { type: 'courses/enrollCourse', payload: id }
    // The courseSlice reducer then adds this id to enrolledCourseIds
    dispatch(enrollCourse(id))
  }

  const handleUnenroll = () => {
    dispatch(unenrollCourse(id))
  }

  return (
    <div style={styles.wrapper}>
      <Navbar />

      <div style={styles.container}>

        {/* BACK LINK */}
        <Link to="/courses" style={styles.backLink}>← Back to Catalog</Link>

        {/* COURSE HERO */}
        <div style={styles.hero}>
          <div style={styles.heroLeft}>
            <span style={styles.categoryTag}>{course.category}</span>
            <h1 style={styles.title}>{course.title}</h1>
            <p style={styles.description}>{course.description}</p>

            {/* INSTRUCTOR + META ROW */}
            <div style={styles.metaRow}>
              <span style={styles.metaItem}>👤 {course.instructor}</span>
              <span style={styles.metaItem}>⭐ {course.rating}</span>
              <span style={styles.metaItem}>🕐 {course.duration}</span>
              <span style={styles.metaItem}>📊 {course.level}</span>
              <span style={styles.metaItem}>
                👥 {course.students.toLocaleString()} students
              </span>
            </div>

            {/* ENROLL / UNENROLL BUTTON */}
            {isEnrolled ? (
            <div>
                <div style={styles.enrolledRow}>
                <span style={styles.enrolledBadge}>✓ Enrolled</span>
                <button onClick={handleUnenroll} style={styles.unenrollBtn}>
                    Unenroll
                </button>
                </div>

                {/* PROGRESS BAR — only visible when enrolled */}
                <div style={styles.progressWrapper}>
                <div style={styles.progressHeader}>
                    <span style={styles.progressLabel}>Your progress</span>
                    {/* Show completed count and percentage */}
                    <span style={styles.progressPercent}>
                    {completedLessons.length}/{course.lessons.length} lessons · {percentage}%
                    </span>
                </div>

                {/* The track is the full-width dark background bar.
                    The fill sits inside it and its width is set dynamically
                    using the percentage value from useProgress. */}
                <div style={styles.progressTrack}>
                    <div
                    style={{
                        ...styles.progressFill,
                        // This is what makes the bar actually reflect progress.
                        // percentage is a 0-100 number so we append '%' to make
                        // it a valid CSS width value e.g. '67%'
                        width: `${percentage}%`,
                    }}
                    />
                </div>
                </div>
            </div>
            ) : (
            <button onClick={handleEnroll} style={styles.enrollBtn}>
                Enroll in this Course
            </button>
            )}
          </div>

          {/* THUMBNAIL */}
          <div style={styles.heroRight}>
            <div style={styles.thumbnailBox}>
              <span style={styles.thumbnail}>{course.thumbnail}</span>
            </div>
          </div>
        </div>

        {/* LESSON LIST */}
        <div style={styles.section}>
          <h2 style={styles.sectionTitle}>
            Course Curriculum
            <span style={styles.lessonCount}>
              {course.lessons.length} lessons
            </span>
          </h2>

          <div style={styles.lessonList}>
            {course.lessons.map((lesson, index) => (
              <div key={lesson.id} style={styles.lessonItem}>
                <div style={styles.lessonLeft}>
                  {/* Lesson number indicator */}
                  <span style={styles.lessonNumber}>{index + 1}</span>
                  <div>
                    <p style={styles.lessonTitle}>{lesson.title}</p>
                    <p style={styles.lessonDuration}>{lesson.duration}</p>
                  </div>
                </div>

                {/* Only enrolled users can access lessons.
                    If enrolled → link to the lesson player (Phase 4).
                    If not → show a lock icon. */}
                {isEnrolled ? (
                  <Link
                    to={`/courses/${id}/lessons/${lesson.id}`}
                    style={styles.startBtn}
                  >
                    Start →
                  </Link>
                ) : (
                  <span style={styles.lockIcon}>🔒</span>
                )}
              </div>
            ))}
          </div>
        </div>
         {/* OUTLET — this is where LessonPlayerPage renders
            when the URL is /courses/:id/lessons/:lessonId.
            When no lesson is selected, Outlet renders nothing
            and the page looks exactly as it did before. */}
        <Outlet />

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
    maxWidth: '900px',
    margin: '0 auto',
    padding: '2rem 1.5rem',
  },
  notFound: {
    maxWidth: '400px',
    margin: '4rem auto',
    textAlign: 'center',
  },
  backLink: {
    color: '#4a6080',
    textDecoration: 'none',
    fontSize: '0.85rem',
    display: 'inline-block',
    marginBottom: '1.5rem',
  },

  // HERO
  hero: {
    display: 'flex',
    gap: '2rem',
    marginBottom: '3rem',
    alignItems: 'flex-start',
  },
  heroLeft: { flex: 1 },
  heroRight: { flexShrink: 0 },
  thumbnailBox: {
    width: '120px',
    height: '120px',
    background: 'rgba(0,255,255,0.04)',
    border: '1px solid rgba(0,255,255,0.12)',
    borderRadius: '16px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    boxShadow: '0 0 30px rgba(0,255,255,0.06)',
  },
  thumbnail: { fontSize: '3rem' },
  categoryTag: {
    background: 'rgba(0,255,255,0.06)',
    border: '1px solid rgba(0,255,255,0.12)',
    color: '#00ffff',
    padding: '0.2rem 0.6rem',
    borderRadius: '4px',
    fontSize: '0.7rem',
    letterSpacing: '0.06em',
    textTransform: 'uppercase',
    display: 'inline-block',
    marginBottom: '0.75rem',
  },
  title: {
    fontSize: '1.8rem',
    fontWeight: '800',
    color: '#e2e8f0',
    margin: '0 0 0.75rem',
    lineHeight: '1.3',
  },
  description: {
    color: '#4a6080',
    fontSize: '0.95rem',
    lineHeight: '1.7',
    marginBottom: '1.25rem',
  },
  metaRow: {
    display: 'flex',
    flexWrap: 'wrap',
    gap: '1rem',
    marginBottom: '1.5rem',
  },
  metaItem: { color: '#4a6080', fontSize: '0.82rem' },
  enrollBtn: {
    background: 'linear-gradient(135deg, #00ffff, #0080ff)',
    border: 'none',
    borderRadius: '8px',
    padding: '0.75rem 1.75rem',
    color: '#050b14',
    fontWeight: '700',
    fontSize: '0.95rem',
    cursor: 'pointer',
    boxShadow: '0 0 20px rgba(0,255,255,0.2)',
  },
  enrolledRow: {
    display: 'flex',
    alignItems: 'center',
    gap: '1rem',
  },
  enrolledBadge: {
    background: 'rgba(0,255,100,0.08)',
    border: '1px solid rgba(0,255,100,0.2)',
    color: '#00ff88',
    padding: '0.4rem 1rem',
    borderRadius: '8px',
    fontSize: '0.9rem',
    fontWeight: '600',
  },
  unenrollBtn: {
    background: 'transparent',
    border: '1px solid rgba(255,50,50,0.3)',
    borderRadius: '8px',
    color: '#ff6b6b',
    padding: '0.4rem 1rem',
    fontSize: '0.85rem',
    cursor: 'pointer',
  },
  backBtn: {
    background: 'transparent',
    border: '1px solid rgba(0,255,255,0.15)',
    borderRadius: '8px',
    color: '#00ffff',
    padding: '0.5rem 1.25rem',
    cursor: 'pointer',
    marginTop: '1rem',
  },

  // LESSON LIST
  section: { marginTop: '1rem' },
  sectionTitle: {
    color: '#e2e8f0',
    fontSize: '1.2rem',
    fontWeight: '600',
    marginBottom: '1rem',
    paddingBottom: '0.5rem',
    borderBottom: '1px solid rgba(0,255,255,0.08)',
    display: 'flex',
    alignItems: 'center',
    gap: '0.75rem',
  },
  lessonCount: {
    color: '#4a6080',
    fontSize: '0.8rem',
    fontWeight: '400',
  },
  lessonList: {
    display: 'flex',
    flexDirection: 'column',
    gap: '0.5rem',
  },
  lessonItem: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    background: 'rgba(255,255,255,0.02)',
    border: '1px solid rgba(0,255,255,0.06)',
    borderRadius: '8px',
    padding: '0.9rem 1.1rem',
  },
  lessonLeft: {
    display: 'flex',
    alignItems: 'center',
    gap: '0.9rem',
  },
  lessonNumber: {
    width: '28px',
    height: '28px',
    background: 'rgba(0,255,255,0.06)',
    border: '1px solid rgba(0,255,255,0.12)',
    borderRadius: '50%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    color: '#00ffff',
    fontSize: '0.75rem',
    fontWeight: '600',
    flexShrink: 0,
  },
  lessonTitle: {
    color: '#e2e8f0',
    fontSize: '0.9rem',
    margin: '0 0 0.2rem',
  },
  lessonDuration: {
    color: '#4a6080',
    fontSize: '0.75rem',
    margin: 0,
  },
  startBtn: {
    color: '#00ffff',
    textDecoration: 'none',
    fontSize: '0.85rem',
    fontWeight: '600',
    background: 'rgba(0,255,255,0.06)',
    border: '1px solid rgba(0,255,255,0.15)',
    borderRadius: '6px',
    padding: '0.3rem 0.8rem',
  },
  lockIcon: { fontSize: '0.9rem' },
  progressWrapper: {
    marginTop: '1.25rem',
  },
  progressHeader: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: '0.5rem',
  },
  progressLabel: {
    color: '#4a6080',
    fontSize: '0.8rem',
  },
  progressPercent: {
    color: '#00ffff',
    fontSize: '0.8rem',
    fontWeight: '600',
  },
  progressTrack: {
    height: '6px',
    background: 'rgba(255,255,255,0.05)',
    borderRadius: '999px',
    overflow: 'hidden',
    border: '1px solid rgba(0,255,255,0.08)',
  },
  progressFill: {
    height: '100%',
    background: 'linear-gradient(90deg, #00ffff, #0080ff)',
    borderRadius: '999px',
    // The transition makes the bar animate smoothly
    // as lessons are marked complete — it grows in 0.4s
    transition: 'width 0.4s ease',
    boxShadow: '0 0 8px rgba(0,255,255,0.4)',
  },
}