import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import './styles/main.css'
import App from './App'
import Home from './pages/Home'
import Dashboard from './pages/Dashboard'
import Login from './pages/Login'
import Registration from './pages/Registration'
import Settings from './pages/Settings'
import Profile from './pages/Profile'
import ProtectedRoute from './components/routing/ProtectedRoute'
import { AuthProvider } from './context/AuthContext'
import { I18nProvider } from './context/I18nContext'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <AuthProvider>
      <I18nProvider>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<App />}> 
              <Route index element={<Home />} />
              <Route path="login" element={<Login />} />
              <Route path="register" element={<Registration />} />

              <Route element={<ProtectedRoute />}> 
                <Route path="dashboard" element={<Dashboard />} />
                <Route path="settings" element={<Settings />} />
                <Route path="profile" element={<Profile />} />
              </Route>
              
              <Route path="*" element={<Navigate to="/" replace />} />
            </Route>
          </Routes>
        </BrowserRouter>
      </I18nProvider>
    </AuthProvider>
  </React.StrictMode>
)




