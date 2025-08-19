import { Outlet, useLocation } from 'react-router-dom'
import Header from './components/ui/Header'
import NavigationBar from './components/ui/NavigationBar'

export default function App() {
  const location = useLocation()
  const pathname = location.pathname
  const isHome = pathname === '/'
  const isRegister = pathname.startsWith('/register')
  const isLogin = pathname.startsWith('/login')
  const isDashboard = pathname.startsWith('/dashboard')

  const showHeader = !(isHome || isRegister || isLogin || isDashboard)
  const showFooter = !(isHome || isRegister)
  
  return (
    <div className="min-h-screen flex flex-col">
      {showHeader && <Header />}
      <div className={`flex-1 ${showHeader ? 'container mx-auto p-4' : ''}`}>
        <Outlet />
      </div>
      {showFooter && <NavigationBar activePath={pathname} />}
    </div>
  )
}




