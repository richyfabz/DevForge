// Redux Toolkit gives us createSlice — a function that generates
// a slice of the Redux store in one place (state + reducers together)
import { createSlice } from '@reduxjs/toolkit'

// This is the INITIAL STATE — what the auth drawer looks like
// before anyone logs in. Think of it as the default value.
const initialState = {
  user: null,              // Will hold { name, email } once logged in
  isAuthenticated: false,  // Boolean flag — is someone logged in?
}

// createSlice takes an object with 3 things:
// 1. name      → the namespace for this slice ("auth/login", "auth/logout")
// 2. initialState → the default data
// 3. reducers  → the functions that CAN change this state
const authSlice = createSlice({
  name: 'auth',
  initialState,

  reducers: {
    // LOGIN reducer
    // When dispatched, it receives the current state + an action.
    // action.payload is whatever data you pass when calling dispatch(login(...))
    // Here we expect payload = { name, email }
    login: (state, action) => {
      state.user = action.payload       // Store the user object
      state.isAuthenticated = true      // Flip the flag to true
    },

    // LOGOUT reducer
    // No payload needed — just reset everything back to initial state
    logout: (state) => {
      state.user = null
      state.isAuthenticated = false
    },
  },
})

// We export the ACTION CREATORS — these are functions you call in components
// e.g. dispatch(login({ name: 'Richard', email: 'richard@devforge.com' }))
export const { login, logout } = authSlice.actions

// We export the REDUCER — this goes into the store (the safe)
export default authSlice.reducer