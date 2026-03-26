import { useParams, useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux'

export default function LessonPlayerPage() {
  // Both dynamic segments are available from useParams.
  // id → from the parent route /courses/:id
  // lessonId → from the child route lessons/:lessonId
  const { id, lessonId } = useParams()
  const navigate = useNavigate()

  const allCourses = useSelector((state) => state.courses.courses)

  // Find the course using the parent route's id
  const course = allCourses.find((c) => c.id === id)

  // Find the current lesson using lessonId
  const lessonIndex = course?.lessons.findIndex((l) => l.id === lessonId)
  const lesson      = course?.lessons[lessonIndex]

  // Derive previous and next lessons for navigation buttons
  const prevLesson = course?.lessons[lessonIndex - 1]
  const nextLesson = course?.lessons[lessonIndex + 1]

  if (!lesson) {
    return (
      <div style={styles.notFound}>
        <p style={{ color: '#ff6b6b' }}>Lesson not found.</p>
      </div>
    )
  }

  const goToLesson = (targetLessonId) => {
    // Programmatically navigate to the same course but different lesson.
    // This updates the URL which causes LessonPlayerPage to re-render
    // with the new lessonId from useParams — clean and simple.
    navigate(`/courses/${id}/lessons/${targetLessonId}`)
  }

  return (
    <div style={styles.wrapper}>

      {/* PLAYER AREA */}
      <div style={styles.player}>

        {/* VIDEO PLACEHOLDER
            In a real app this would be a <video> tag or an iframe
            pointing to YouTube/Vimeo. For the demo it's a styled box. */}
        <div style={styles.videoBox}>
          <div style={styles.videoInner}>
            <span style={styles.playIcon}>▶</span>
            <p style={styles.videoTitle}>{lesson.title}</p>
            <p style={styles.videoDuration}>{lesson.duration}</p>
          </div>
          {/* Scanline overlay — purely decorative, adds to the techy feel */}
          <div style={styles.scanlines} />
        </div>

        {/* LESSON INFO */}
        <div style={styles.lessonInfo}>
          <div style={styles.lessonHeader}>
            <div>
              <p style={styles.courseTitle}>{course.title}</p>
              <h2 style={styles.lessonTitle}>{lesson.title}</h2>
            </div>
            {/* Lesson position indicator e.g. "Lesson 2 of 5" */}
            <span style={styles.lessonPosition}>
              Lesson {lessonIndex + 1} of {course.lessons.length}
            </span>
          </div>

          {/* NAVIGATION BUTTONS */}
          <div style={styles.navRow}>
            {/* Only render Prev button if a previous lesson exists */}
            {prevLesson ? (
              <button
                style={styles.navBtn}
                onClick={() => goToLesson(prevLesson.id)}
              >
                ← {prevLesson.title}
              </button>
            ) : (
              // Empty div maintains the layout when there's no prev button
              <div />
            )}

            {/* Only render Next button if a next lesson exists */}
            {nextLesson ? (
              <button
                style={{ ...styles.navBtn, ...styles.navBtnNext }}
                onClick={() => goToLesson(nextLesson.id)}
              >
                {nextLesson.title} →
              </button>
            ) : (
              <div />
            )}
          </div>

        </div>
      </div>

      {/* LESSON SIDEBAR — shows all lessons in this course.
          The active lesson is highlighted in cyan.
          Clicking any lesson navigates directly to it. */}
      <div style={styles.sidebar}>
        <p style={styles.sidebarTitle}>Course Lessons</p>
        {course.lessons.map((l, index) => {
          const isActive = l.id === lessonId

          return (
            <div
              key={l.id}
              onClick={() => goToLesson(l.id)}
              style={{
                ...styles.sidebarItem,
                // Spread active styles on top when this is the current lesson
                ...(isActive ? styles.sidebarItemActive : {}),
              }}
            >
              <span style={{
                ...styles.sidebarNumber,
                ...(isActive ? styles.sidebarNumberActive : {}),
              }}>
                {index + 1}
              </span>
              <div>
                <p style={{
                  ...styles.sidebarLessonTitle,
                  ...(isActive ? styles.sidebarLessonTitleActive : {}),
                }}>
                  {l.title}
                </p>
                <p style={styles.sidebarDuration}>{l.duration}</p>
              </div>
            </div>
          )
        })}
      </div>

    </div>
  )
}

const styles = {
  wrapper: {
    display: 'flex',
    gap: '1.5rem',
    marginTop: '2rem',
    fontFamily: "'Space Grotesk', 'Segoe UI', sans-serif",
  },

  // PLAYER
  player: { flex: 1, minWidth: 0 },
  videoBox: {
    position: 'relative',
    background: 'rgba(0,255,255,0.02)',
    border: '1px solid rgba(0,255,255,0.1)',
    borderRadius: '12px',
    overflow: 'hidden',
    aspectRatio: '16/9',
    marginBottom: '1.25rem',
  },
  videoInner: {
    position: 'absolute',
    inset: 0,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    gap: '0.75rem',
  },
  playIcon: {
    fontSize: '3rem',
    color: '#00ffff',
    textShadow: '0 0 30px rgba(0,255,255,0.6)',
  },
  videoTitle: {
    color: '#e2e8f0',
    fontSize: '1rem',
    fontWeight: '600',
    textAlign: 'center',
    padding: '0 2rem',
    margin: 0,
  },
  videoDuration: {
    color: '#4a6080',
    fontSize: '0.85rem',
    margin: 0,
  },
  // CSS repeating gradient creates the scanline effect
  scanlines: {
    position: 'absolute',
    inset: 0,
    background: 'repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(0,0,0,0.03) 2px, rgba(0,0,0,0.03) 4px)',
    pointerEvents: 'none',
  },

  // LESSON INFO
  lessonInfo: {
    background: 'rgba(255,255,255,0.02)',
    border: '1px solid rgba(0,255,255,0.08)',
    borderRadius: '12px',
    padding: '1.25rem',
  },
  lessonHeader: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: '1.25rem',
  },
  courseTitle: {
    color: '#4a6080',
    fontSize: '0.8rem',
    margin: '0 0 0.3rem',
  },
  lessonTitle: {
    color: '#e2e8f0',
    fontSize: '1.1rem',
    fontWeight: '700',
    margin: 0,
  },
  lessonPosition: {
    color: '#00ffff',
    fontSize: '0.8rem',
    background: 'rgba(0,255,255,0.06)',
    border: '1px solid rgba(0,255,255,0.15)',
    padding: '0.3rem 0.7rem',
    borderRadius: '20px',
    whiteSpace: 'nowrap',
  },
  navRow: {
    display: 'flex',
    justifyContent: 'space-between',
    gap: '1rem',
  },
  navBtn: {
    background: 'rgba(255,255,255,0.02)',
    border: '1px solid rgba(0,255,255,0.1)',
    borderRadius: '8px',
    color: '#4a6080',
    padding: '0.6rem 1rem',
    fontSize: '0.8rem',
    cursor: 'pointer',
    maxWidth: '45%',
    textAlign: 'left',
    whiteSpace: 'nowrap',
    overflow: 'hidden',
    textOverflow: 'ellipsis',
  },
  navBtnNext: {
    textAlign: 'right',
    color: '#00ffff',
    borderColor: 'rgba(0,255,255,0.2)',
  },

  // SIDEBAR
  sidebar: {
    width: '280px',
    flexShrink: 0,
    background: 'rgba(255,255,255,0.02)',
    border: '1px solid rgba(0,255,255,0.08)',
    borderRadius: '12px',
    padding: '1.25rem',
    height: 'fit-content',
  },
  sidebarTitle: {
    color: '#4a6080',
    fontSize: '0.75rem',
    letterSpacing: '0.08em',
    textTransform: 'uppercase',
    marginBottom: '1rem',
    paddingBottom: '0.75rem',
    borderBottom: '1px solid rgba(0,255,255,0.06)',
  },
  sidebarItem: {
    display: 'flex',
    alignItems: 'flex-start',
    gap: '0.75rem',
    padding: '0.6rem 0.5rem',
    borderRadius: '6px',
    cursor: 'pointer',
    marginBottom: '0.25rem',
    transition: 'background 0.15s',
  },
  sidebarItemActive: {
    background: 'rgba(0,255,255,0.06)',
  },
  sidebarNumber: {
    width: '22px',
    height: '22px',
    borderRadius: '50%',
    background: 'rgba(255,255,255,0.04)',
    border: '1px solid rgba(0,255,255,0.1)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: '0.7rem',
    color: '#4a6080',
    flexShrink: 0,
    marginTop: '2px',
  },
  sidebarNumberActive: {
    background: 'rgba(0,255,255,0.1)',
    borderColor: '#00ffff',
    color: '#00ffff',
  },
  sidebarLessonTitle: {
    color: '#4a6080',
    fontSize: '0.82rem',
    margin: '0 0 0.15rem',
    lineHeight: '1.4',
  },
  sidebarLessonTitleActive: {
    color: '#e2e8f0',
    fontWeight: '600',
  },
  sidebarDuration: {
    color: '#2a3a50',
    fontSize: '0.72rem',
    margin: 0,
  },
}