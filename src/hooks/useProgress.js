import { useSelector, useDispatch } from 'react-redux'
import { markComplete, markIncomplete } from '../store/progressSlice'

// useProgress takes a courseId so it can scope everything
// to that specific course. Each component passes in the
// courseId it cares about.
export function useProgress(courseId, totalLessons) {
  const dispatch = useDispatch()

  // Read the completed lessons for this specific course.
  // If no lessons have been completed yet, default to empty array.
  const completedLessons =
    useSelector((state) => state.progress.completedLessons[courseId]) || []

  // Calculate percentage progress for this course.
  // Guard against division by zero if totalLessons is 0.
  const percentage =
    totalLessons > 0
      ? Math.round((completedLessons.length / totalLessons) * 100)
      : 0

  // Check if a specific lesson is completed.
  // Components call this to know whether to show ✓ or not.
  const isLessonComplete = (lessonId) => completedLessons.includes(lessonId)

  // Toggle a lesson between complete and incomplete.
  // If already complete → mark incomplete.
  // If not complete → mark complete.
  // payload must include both courseId and lessonId because
  // the reducer needs both to find the right entry.
  const toggleLesson = (lessonId) => {
    if (isLessonComplete(lessonId)) {
      dispatch(markIncomplete({ courseId, lessonId }))
    } else {
      dispatch(markComplete({ courseId, lessonId }))
    }
  }

  // Return everything a component might need
  return {
    completedLessons,  // array of completed lessonIds for this course
    percentage,        // 0-100 number
    isLessonComplete,  // function: (lessonId) => boolean
    toggleLesson,      // function: (lessonId) => void
  }
}