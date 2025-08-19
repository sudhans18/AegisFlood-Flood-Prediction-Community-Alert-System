import { Link } from 'react-router-dom'

type Props = {
  activePath: string
}

export default function NavigationBar({ activePath }: Props) {
  const linkCls = (path: string) => `px-3 py-2 rounded-md text-sm ${activePath === path ? 'text-brand-blue font-semibold' : 'text-dark-gray hover:text-dark-black'}`
  return (
    <footer className="bg-white border-t border-border-gray">
      <div className="container mx-auto px-4 py-3 flex items-center gap-4">
        <Link className={linkCls('/')} to="/">Home</Link>
        <Link className={linkCls('/dashboard')} to="/dashboard">Risk Map</Link>
        <Link className={linkCls('/settings')} to="/settings">Settings</Link>
      </div>
    </footer>
  )
}




