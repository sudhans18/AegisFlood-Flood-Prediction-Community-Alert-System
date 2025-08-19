import { Link } from 'react-router-dom'

export default function Header() {
  return (
    <header className="bg-white border-b border-border-gray">
      <div className="container mx-auto px-4 py-3 flex items-center justify-between">
        <Link to="/" className="text-xl font-semibold">AegisFlood</Link>
        <nav className="space-x-4 text-sm">
          <Link to="/dashboard" className="text-dark-gray hover:text-dark-black">Dashboard</Link>
          <Link to="/login" className="text-dark-gray hover:text-dark-black">Login</Link>
          <Link to="/register" className="text-dark-gray hover:text-dark-black">Register</Link>
        </nav>
      </div>
    </header>
  )
}




