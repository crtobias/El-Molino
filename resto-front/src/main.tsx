// import React from 'react'
import ReactDOM from 'react-dom/client'
import { RouterProvider } from 'react-router-dom'
import { Provider } from 'react-redux'
import "@/firebase.config"

import store from '@/redux'
import { router } from '@/router'
import "@/styles/index.css"


ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <Provider store={store}>
    <RouterProvider router={router} />
  </Provider>
)
  // <React.StrictMode>
  // </React.StrictMode>,
