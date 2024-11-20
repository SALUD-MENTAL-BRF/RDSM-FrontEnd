import React from 'react'
import ReactDOM from 'react-dom/client'
import { AppRouters } from './routers/AppRouters'
import { AuthProvider } from './context/AuthContext'
import './app.css'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <AuthProvider>
      <AppRouters />
    </AuthProvider>
  </React.StrictMode>,
)
