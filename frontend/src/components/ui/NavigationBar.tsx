import { Link } from 'react-router-dom'
import { useI18n } from '../../context/I18nContext'

type Props = {
  activePath: string
}

const Icon = ({ name, active }: { name: 'home' | 'profile' | 'settings'; active: boolean }) => {
  const common = `w-5 h-5 ${active ? 'text-brand-blue' : 'text-dark-gray'}`
  if (name === 'home') return (<svg className={common} viewBox="0 0 20 20" fill="currentColor"><path d="M10 2l8 7h-2v7a2 2 0 01-2 2h-3v-5H9v5H6a2 2 0 01-2-2v-7H2l8-7z"/></svg>)
  if (name === 'profile') return (<svg className={common} viewBox="0 0 20 20" fill="currentColor"><path d="M10 10a4 4 0 100-8 4 4 0 000 8z"/><path fillRule="evenodd" d="M2 16a6 6 0 0112 0v2H2v-2z" clipRule="evenodd"/></svg>)
  return (<svg className={common} viewBox="0 0 20 20" fill="currentColor"><path d="M11.983 1.907a1 1 0 00-1.966 0l-.2 1.2a7.003 7.003 0 00-2.086.865l-1.04-.6a1 1 0 00-1.366.366l-1 1.732a1 1 0 00.366 1.366l1.04.6a7 7 0 000 2l-1.04.6a1 1 0 00-.366 1.366l1 1.732a1 1 0 001.366.366l1.04-.6c.64.39 1.34.68 2.086.865l.2 1.2a1 1 0 001.966 0l.2-1.2a7.003 7.003 0 002.086-.865l1.04.6a1 1 0 001.366-.366l1-1.732a1 1 0 00-.366-1.366l-1.04-.6a7 7 0 000-2l1.04-.6a1 1 0 00.366-1.366l-1-1.732a1 1 0 00-1.366-.366l-1.04.6a7.003 7.003 0 00-2.086-.865l-.2-1.2z"/></svg>)
}

export default function NavigationBar({ activePath }: Props) {
  const { t } = useI18n()
  
  const items = [
    { to: '/', key: 'home' as const, label: t('app.home') },
    { to: '/profile', key: 'profile' as const, label: t('app.profile') },
    { to: '/settings', key: 'settings' as const, label: t('app.settings') }
  ]
  return (
    <footer className="bg-white border-t border-border-gray">
      <div className="max-w-md mx-auto px-6 py-2 flex items-center justify-around">
        {items.map(item => {
          const active = activePath === item.to
          return (
            <Link key={item.key} to={item.to} className="flex flex-col items-center justify-center gap-1 py-1">
              <Icon name={item.key} active={active} />
              <span className={`text-xs ${active ? 'text-brand-blue font-medium' : 'text-dark-gray'}`}>{item.label}</span>
            </Link>
          )
        })}
      </div>
    </footer>
  )
}




