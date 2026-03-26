// configureStore is RTK's function for creating the Redux store.
// The "store" is the central safe that holds ALL your app's global state.
import { configureStore } from '@reduxjs/toolkit'
import authReducer from './authslice'
import courseReducer from './courseSlice'
import progressReducer from './progressSlice'


// We'll add courseReducer and progressReducer in later phases.
// For now, only auth is registered.
export const store = configureStore({
  reducer: {
    // Each key here becomes a "namespace" in the store.
    // To read auth state in a component: state.auth.user
    auth: authReducer,

    // Registering courseReducer under the "courses" namespace.
    // This means anywhere in the app you read course state with:
    // state.courses.courses        → the full courses array
    // state.courses.enrolledCourseIds → the enrolled IDs array
    courses: courseReducer,

    // Registering progressReducer under the "progress" namespace.
    // Any component can now read progress state with:
    // state.progress.completedLessons
    progress: progressReducer,
  },
})