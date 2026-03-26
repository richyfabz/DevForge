import { createSlice } from '@reduxjs/toolkit'
import { courses } from '../data/courses'

// courses comes pre-loaded from our mock data file.
// enrolledCourseIds is an array that stores the IDs of courses
// the user has enrolled in e.g. ['1', '3']
const initialState = {
  courses: courses,
  enrolledCourseIds: [],
}

const courseSlice = createSlice({
  name: 'courses',
  initialState,

  reducers: {
    // ENROLL reducer
    // action.payload will be the course ID (a string e.g. '2')
    // We only add it if the user isn't already enrolled —
    // the includes() check prevents duplicate entries
    enrollCourse: (state, action) => {
      if (!state.enrolledCourseIds.includes(action.payload)) {
        state.enrolledCourseIds.push(action.payload)
      }
    },

    // UNENROLL reducer
    // filter() returns a new array with the target ID removed.
    // Every ID that is NOT the one we're removing stays in the array.
    unenrollCourse: (state, action) => {
      state.enrolledCourseIds = state.enrolledCourseIds.filter(
        (id) => id !== action.payload
      )
    },
  },
})

export const { enrollCourse, unenrollCourse } = courseSlice.actions
export default courseSlice.reducer