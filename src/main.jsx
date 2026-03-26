import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'

// Provider is the component that makes the Redux store
// available to EVERY component in your app.
// Without wrapping your app in Provider, no component can
// access the store — useSelector and useDispatch won't work.
import { Provider } from 'react-redux'
import { store } from './store/index.js'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    {/* Provider wraps everything. store={store} injects our Redux store. */}
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>
)