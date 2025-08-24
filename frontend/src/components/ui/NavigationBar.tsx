import { Link } from 'react-router-dom'
import { useI18n } from '../../context/I18nContext'

type Props = {
  activePath: string
}

const Icon = ({ name, active }: { name: 'home' | 'dashboard' | 'chat' | 'alerts' | 'predictions' | 'profile' | 'settings'; active: boolean }) => {
  const common = `w-6 h-6 ${active ? 'text-blue-600' : 'text-gray-600'} transition-all duration-200 ${active ? 'animate-bounce' : 'hover:scale-110'}`
  
  if (name === 'home') return <span className={common}>🏠</span>
  if (name === 'dashboard') return <span className={common}>📊</span>
  if (name === 'chat') return <span className={common}>💬</span>
  if (name === 'alerts') return <span className={common}>🚨</span>
  if (name === 'predictions') return <span className={common}>🔮</span>
  if (name === 'profile') return <span className={common}>👤</span>
  if (name === 'settings') return <span className={common}>⚙️</span>
  
  return <span className={common}>❓</span>
}

export default function NavigationBar({ activePath }: Props) {
  const { t } = useI18n()
  
  const items = [
    { to: '/', key: 'home' as const, label: 'Home' },
    { to: '/dashboard', key: 'dashboard' as const, label: 'Dashboard' },
    { to: '/community-chat', key: 'chat' as const, label: 'Chat' },
    { to: '/recent-alerts', key: 'alerts' as const, label: 'Alerts' },
    { to: '/risk-predicted', key: 'predictions' as const, label: 'Predictions' },
    { to: '/profile', key: 'profile' as const, label: 'Profile' },
    { to: '/settings', key: 'settings' as const, label: 'Settings' }
  ]
  return (
    <footer className="fixed bottom-0 left-0 w-full z-50 bg-white/90 backdrop-blur-sm border-t border-gray-200 shadow-2xl rounded-t-2xl">
      <div className="max-w-6xl mx-auto px-4 py-2 flex items-center justify-around">
        {items.map(item => {
          const active = activePath === item.to
          return (
            <Link 
              key={item.key} 
              to={item.to} 
              className={`flex flex-col items-center justify-center gap-1 py-2 px-3 rounded-lg transition-all duration-200 ${
                active 
                  ? 'bg-gradient-to-r from-blue-500 to-indigo-600 text-white shadow-lg transform scale-105' 
                  : 'hover:bg-gray-100 text-gray-600'
              }`}
            >
              <Icon name={item.key} active={active} />
              <span className={`text-xs font-medium ${active ? 'text-white' : 'text-gray-600'}`}>
                {item.label}
              </span>
            </Link>
          )
        })}
      </div>
    </footer>
  )
}




