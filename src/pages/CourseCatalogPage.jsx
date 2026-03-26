import { useState } from 'react'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import Navbar from '../components/Navbar'

export default function CourseCatalogPage() {
  // Local state for the active filter — only this page needs it
  // 'All' means no filter applied
  const [activeFilter, setActiveFilter] = useState('All')

  const allCourses        = useSelector((state) => state.courses.courses)
  const enrolledCourseIds = useSelector((state) => state.courses.enrolledCourseIds)

  // Derive the unique list of categories from the courses data.
  // Set removes duplicates, spread converts it back to an array.
  // We prepend 'All' so the user can reset the filter.
  const categories = ['All', ...new Set(allCourses.map((c) => c.category))]

  // If activeFilter is 'All' show everything.
  // Otherwise only show courses whose category matches the filter.
  const visibleCourses =
    activeFilter === 'All'
      ? allCourses
      : allCourses.filter((c) => c.category === activeFilter)

  return (
    <div style={styles.wrapper}>
      <Navbar />

      <div style={styles.container}>

        {/* PAGE HEADER */}
        <div style={styles.header}>
          <h1 style={styles.title}>Course Catalog</h1>
          <p style={styles.sub}>
            {allCourses.length} courses · expand your stack
          </p>
        </div>

        {/* FILTER BAR */}
        <div style={styles.filterBar}>
          {categories.map((cat) => (
            <button
              key={cat}
              // Update local state when a filter is clicked
              onClick={() => setActiveFilter(cat)}
              style={{
                ...styles.filterBtn,
                // Spread the active style on top if this button is selected
                ...(activeFilter === cat ? styles.filterBtnActive : {}),
              }}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* COURSE GRID */}
        <div style={styles.grid}>
          {visibleCourses.map((course) => {
            // Check if this specific course is in the enrolled list
            const isEnrolled = enrolledCourseIds.includes(course.id)

            return (
              // Clicking a card navigates to /courses/:id
              // The course.id fills the :id dynamic segment
              <Link
                key={course.id}
                to={`/courses/${course.id}`}
                style={styles.card}
              >
                {/* CARD HEADER */}
                <div style={styles.cardHeader}>
                  <span style={styles.thumbnail}>{course.thumbnail}</span>
                  {/* Only render the enrolled badge if isEnrolled is true */}
                  {isEnrolled && (
                    <span style={styles.enrolledBadge}>✓ Enrolled</span>
                  )}
                </div>

                {/* CARD BODY */}
                <div style={styles.cardBody}>
                  <span style={styles.categoryTag}>{course.category}</span>
                  <h3 style={styles.cardTitle}>{course.title}</h3>
                  <p style={styles.cardDesc}>{course.description}</p>
                </div>

                {/* CARD FOOTER */}
                <div style={styles.cardFooter}>
                  <span style={styles.instructor}>👤 {course.instructor}</span>
                  <div style={styles.meta}>
                    <span style={styles.metaItem}>⭐ {course.rating}</span>
                    <span style={styles.metaItem}>🕐 {course.duration}</span>
                    <span style={styles.metaItem}>
                      {course.lessons.length} lessons
                    </span>
                  </div>
                  <div style={styles.footer}>
                    <span style={styles.level}>{course.level}</span>
                    <span style={styles.students}>
                      {course.students.toLocaleString()} students
                    </span>
                  </div>
                </div>
              </Link>
            )
          })}
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
  header: { marginBottom: '2rem' },
  title: {
    fontSize: '2rem',
    fontWeight: '800',
    color: '#e2e8f0',
    margin: '0 0 0.4rem',
  },
  sub: { color: '#4a6080', fontSize: '0.95rem', margin: 0 },

  // FILTER BAR
  filterBar: {
    display: 'flex',
    gap: '0.5rem',
    marginBottom: '2rem',
    flexWrap: 'wrap',
  },
  filterBtn: {
    background: 'transparent',
    border: '1px solid rgba(0,255,255,0.1)',
    borderRadius: '20px',
    color: '#4a6080',
    padding: '0.4rem 1rem',
    fontSize: '0.85rem',
    cursor: 'pointer',
    transition: 'all 0.2s',
  },
  filterBtnActive: {
    background: 'rgba(0,255,255,0.08)',
    borderColor: '#00ffff',
    color: '#00ffff',
  },

  // GRID
  grid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
    gap: '1.25rem',
  },

  // CARD
  card: {
    display: 'flex',
    flexDirection: 'column',
    background: 'rgba(255,255,255,0.02)',
    border: '1px solid rgba(0,255,255,0.08)',
    borderRadius: '12px',
    padding: '1.25rem',
    textDecoration: 'none',
    transition: 'border-color 0.2s, transform 0.2s',
    cursor: 'pointer',
  },
  cardHeader: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: '1rem',
  },
  thumbnail: { fontSize: '2rem' },
  enrolledBadge: {
    background: 'rgba(0,255,100,0.08)',
    border: '1px solid rgba(0,255,100,0.2)',
    color: '#00ff88',
    padding: '0.2rem 0.6rem',
    borderRadius: '20px',
    fontSize: '0.75rem',
    fontWeight: '600',
  },
  cardBody: { flex: 1, marginBottom: '1rem' },
  categoryTag: {
    background: 'rgba(0,255,255,0.06)',
    border: '1px solid rgba(0,255,255,0.12)',
    color: '#00ffff',
    padding: '0.15rem 0.5rem',
    borderRadius: '4px',
    fontSize: '0.7rem',
    letterSpacing: '0.05em',
    textTransform: 'uppercase',
  },
  cardTitle: {
    color: '#e2e8f0',
    fontSize: '1rem',
    fontWeight: '700',
    margin: '0.6rem 0 0.5rem',
    lineHeight: '1.4',
  },
  cardDesc: {
    color: '#4a6080',
    fontSize: '0.82rem',
    lineHeight: '1.6',
    margin: 0,
  },
  cardFooter: {
    borderTop: '1px solid rgba(0,255,255,0.06)',
    paddingTop: '0.75rem',
    display: 'flex',
    flexDirection: 'column',
    gap: '0.5rem',
  },
  instructor: { color: '#4a6080', fontSize: '0.8rem' },
  meta: { display: 'flex', gap: '0.75rem' },
  metaItem: { color: '#4a6080', fontSize: '0.78rem' },
  footer: { display: 'flex', justifyContent: 'space-between' },
  level: {
    color: '#00ffff',
    fontSize: '0.75rem',
    background: 'rgba(0,255,255,0.06)',
    padding: '0.15rem 0.5rem',
    borderRadius: '4px',
  },
  students: { color: '#4a6080', fontSize: '0.75rem' },
}