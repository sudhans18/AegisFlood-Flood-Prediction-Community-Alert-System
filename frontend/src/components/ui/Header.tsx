import { Link } from 'react-router-dom'
import logo from '../../assets/aegisflood_logo.png'

/**
 * Sticky header for the AegisFlood dashboard, displaying the logo and app name.
 */
export default function Header() {
  return (
    <header className="bg-white/90 border-b border-slate-200 shadow sticky top-0 z-50 backdrop-blur-md">
      <div className="max-w-7xl mx-auto px-4 py-2 flex items-center gap-3">
        <img
          src={logo}
          alt="AegisFlood Logo"
          className="h-10 w-10 object-contain mr-2 drop-shadow-md"
        />
        <span className="text-2xl font-bold bg-gradient-to-r from-blue-600 via-cyan-500 to-indigo-600 bg-clip-text text-transparent tracking-wide select-none">
          AegisFlood
        </span>
      </div>
    </header>
  )
}




