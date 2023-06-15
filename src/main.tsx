import React from 'react'
import ReactDOM from 'react-dom/client'
import { configureStore } from '@reduxjs/toolkit'
import { Provider } from 'react-redux'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'

import authReducer from './store/auth/auth.slice.ts'
import userInfoReducer from './store/userInfo/userInfo.slice.ts'

import App from './App.tsx'
import './index.scss'
import Twitter from './components/twitter/twitter.tsx'


const store = configureStore({
    reducer: {
      auth: authReducer,
      userInfo: userInfoReducer
    }
})

const router = createBrowserRouter([
  {path: '/', element: <App />},
  {path: '/home/*', element: <Twitter />},
])

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <Provider store={store}>
      <RouterProvider router={router}/>
    </Provider>
  </React.StrictMode>,
)

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;