import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  // An object where each key is a courseId and
  // each value is an array of completed lessonIds.
  // Starts empty — no lessons completed yet.
  completedLessons: {},
}

const progressSlice = createSlice({
  name: 'progress',
  initialState,

  reducers: {
    // MARK LESSON COMPLETE
    // payload = { courseId, lessonId }
    // We need both because lessons are nested inside courses.
    markComplete: (state, action) => {
      const { courseId, lessonId } = action.payload

      // If this course has no completed lessons yet,
      // initialize it with an empty array first.
      if (!state.completedLessons[courseId]) {
        state.completedLessons[courseId] = []
      }

      // Only add the lessonId if it isn't already in the array.
      // This prevents marking the same lesson complete twice.
      if (!state.completedLessons[courseId].includes(lessonId)) {
        state.completedLessons[courseId].push(lessonId)
      }
    },

    // MARK LESSON INCOMPLETE — lets the user toggle it back off
    // filter() removes the lessonId from the array
    markIncomplete: (state, action) => {
      const { courseId, lessonId } = action.payload

      if (state.completedLessons[courseId]) {
        state.completedLessons[courseId] = state.completedLessons[courseId].filter(
          (id) => id !== lessonId
        )
      }
    },
  },
})

export const { markComplete, markIncomplete } = progressSlice.actions
export default progressSlice.reducer