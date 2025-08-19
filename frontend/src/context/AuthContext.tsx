import { createContext, useContext, useEffect, useState, ReactNode } from 'react'
import { setAuthToken } from '../services/api'

type AuthState = {
  token: string | null
  role: 'citizen' | 'authority' | null
}

type AuthContextType = AuthState & {
  login: (token: string, role: 'citizen' | 'authority') => void
  logout: () => void
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ children }: { children: ReactNode }) {
  const [token, setToken] = useState<string | null>(null)
  const [role, setRole] = useState<'citizen' | 'authority' | null>(null)

  useEffect(() => {
    const saved = localStorage.getItem('auth')
    if (saved) {
      const parsed = JSON.parse(saved) as AuthState
      setToken(parsed.token)
      setRole(parsed.role)
      setAuthToken(parsed.token)
    }
  }, [])

  const login = (t: string, r: 'citizen' | 'authority') => {
    setToken(t)
    setRole(r)
    localStorage.setItem('auth', JSON.stringify({ token: t, role: r }))
    setAuthToken(t)
  }

  const logout = () => {
    setToken(null)
    setRole(null)
    localStorage.removeItem('auth')
    setAuthToken(null)
  }

  return (
    <AuthContext.Provider value={{ token, role, login, logout }}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const ctx = useContext(AuthContext)
  if (!ctx) throw new Error('useAuth must be used within AuthProvider')
  return ctx
}


