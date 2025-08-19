import { Outlet, Link, useLocation } from 'react-router-dom'
import Header from './components/ui/Header'
import NavigationBar from './components/ui/NavigationBar'

export default function App() {
  const location = useLocation()
  const isHomePage = location.pathname === '/'
  
  return (
    <div className="min-h-screen flex flex-col">
      {!isHomePage && <Header />}
      <div className={`flex-1 ${!isHomePage ? 'container mx-auto p-4' : ''}`}>
        <Outlet />
      </div>
      {!isHomePage && <NavigationBar activePath={location.pathname} />}
    </div>
  )
}




