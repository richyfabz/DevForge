// useSelector lets you READ data from the Redux store
// useDispatch lets you SEND actions to the Redux store
import { useSelector, useDispatch } from 'react-redux'

// We import the action creators from authSlice
import { login, logout } from '../store/authSlice'

// This is our custom hook. It starts with "use" — that's the React convention.
// It's not magic, it's just a function that packages Redux logic cleanly.
export function useAuth() {
  const dispatch = useDispatch()

  // useSelector reads a slice of the store.
  // state.auth gives us the whole auth drawer.
  // We destructure to get exactly what we need.
  const { user, isAuthenticated } = useSelector((state) => state.auth)

  // loginUser is the function components will call.
  // It takes email + password. Since we have no backend,
  // we derive the name from the email (everything before @).
  // Then it dispatches the login action to Redux.
  const loginUser = (email, password) => {
    const name = email.split('@')[0]           // "richard@devforge.com" → "richard"
    dispatch(login({ name, email }))           // Sends data to authSlice's login reducer
  }

  // logoutUser just dispatches the logout action — no data needed
  const logoutUser = () => {
    dispatch(logout())
  }

  // We return everything a component might need from auth:
  // - user: the user object ({ name, email }) or null
  // - isAuthenticated: boolean
  // - loginUser: function to log in
  // - logoutUser: function to log out
  return { user, isAuthenticated, loginUser, logoutUser }
}