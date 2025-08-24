import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import Card from '../components/shared/Card'
import Button from '../components/shared/Button'

export default function Home() {
  const [isLoading, setIsLoading] = useState(true)
  const [showContent, setShowContent] = useState(false)
  const [activeDescription, setActiveDescription] = useState<'citizens' | 'authorities' | null>(null)

  useEffect(() => {
    // Loading animation for 3 seconds
    const timer = setTimeout(() => {
      setIsLoading(false)
      setTimeout(() => setShowContent(true), 500)
    }, 3000)

    return () => clearTimeout(timer)
  }, [])

  if (isLoading) {
    return (
      <div className="h-screen bg-gradient-to-br from-blue-900 via-indigo-900 to-purple-900 flex items-center justify-center animate-fade-in relative overflow-hidden">
        {/* Animated Water Background */}
        <div className="absolute inset-0">
          {/* Flowing Water Waves */}
          <div className="absolute bottom-0 left-0 w-full h-64 bg-gradient-to-t from-blue-600 via-blue-500 to-transparent opacity-30 animate-float"></div>
          <div className="absolute bottom-0 left-0 w-full h-56 bg-gradient-to-t from-cyan-500 via-blue-400 to-transparent opacity-40 animate-float" style={{animationDelay: '0.5s'}}></div>
          <div className="absolute bottom-0 left-0 w-full h-40 bg-gradient-to-t from-blue-400 via-cyan-300 to-transparent opacity-50 animate-float" style={{animationDelay: '1s'}}></div>
        </div>
        {/* Logo Animation Container */}
        <div className="text-center relative z-10">
          {/* Main Water Drop with Flowing Effect */}
          <div className="relative mb-6">
            {/* Central Water Drop */}
            <div className="w-32 h-32 bg-gradient-to-br from-blue-400 via-cyan-400 to-blue-600 rounded-full flex items-center justify-center mx-auto mb-4 shadow-2xl hover:animate-bounce transition-all duration-300 relative overflow-hidden">
              <span className="text-6xl relative z-10">🌊</span>
              {/* Internal Water Flow Animation */}
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white to-transparent opacity-20 w-full h-full transform -skew-x-12 animate-slide-right"></div>
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-cyan-200 to-transparent opacity-30 w-full h-full transform -skew-x-12 animate-slide-right" style={{animationDelay: '0.5s'}}></div>
            </div>
            {/* Multiple Ripple Effects */}
            <div className="absolute inset-0 w-32 h-32 border-4 border-blue-300 rounded-full animate-ping opacity-20"></div>
            <div className="absolute inset-0 w-32 h-32 border-4 border-cyan-300 rounded-full animate-ping opacity-20" style={{animationDelay: '0.5s'}}></div>
            <div className="absolute inset-0 w-32 h-32 border-4 border-indigo-300 rounded-full animate-ping opacity-20" style={{animationDelay: '1s'}}></div>
            <div className="absolute inset-0 w-32 h-32 border-4 border-blue-400 rounded-full animate-ping opacity-15" style={{animationDelay: '1.5s'}}></div>
          </div>
          {/* Brand Name with Water Flow Effect */}
          <h1 className="text-5xl font-bold text-white mb-2 animate-slide-up relative">
            <span className="bg-gradient-to-r from-blue-400 via-cyan-300 to-blue-500 bg-clip-text text-transparent relative">
              AegisFlood
              {/* Text Flow Effect */}
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white to-transparent opacity-30 w-full h-full transform -skew-x-12 animate-slide-right" style={{animationDelay: '1s'}}></div>
            </span>
          </h1>
          {/* Tagline */}
          <p className="text-xl text-blue-200 mb-4 animate-slide-up" style={{animationDelay: '0.3s'}}>
            Protecting Communities Through Smart Flood Monitoring
          </p>
          {/* Animated Loading Bar with Water Flow */}
          <div className="w-64 bg-blue-800 rounded-full h-2 mx-auto animate-slide-up relative overflow-hidden" style={{animationDelay: '0.6s'}}>
            <div className="bg-gradient-to-r from-blue-400 via-cyan-300 to-blue-500 h-2 rounded-full animate-pulse relative">
              {/* Loading Bar Flow Effect */}
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white to-transparent opacity-40 w-full h-full transform -skew-x-12 animate-slide-right"></div>
            </div>
          </div>
          {/* Loading Text */}
          <p className="text-blue-300 mt-4 animate-pulse text-base" style={{animationDelay: '0.9s'}}>
            Initializing flood monitoring systems...
          </p>
        </div>
      </div>
    )
  }
  return (
    <div className="h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 animate-fade-in overflow-hidden flex flex-col">
      {/* Header Section - Compact */}
      <header className="text-center py-4 animate-slide-down">
        <div className="w-12 h-12 bg-gradient-to-br from-blue-500 via-indigo-500 to-purple-600 rounded-full flex items-center justify-center mx-auto mb-2 shadow-xl animate-enhanced-pulse">
          <span className="text-xl">🌊</span>
        </div>
        <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 bg-clip-text text-transparent mb-1">
          Welcome to AegisFlood
        </h1>
        <p className="text-base text-gray-600 max-w-xl mx-auto">
          Choose your role to get started with personalized flood safety features
        </p>
      </header>
      {/* Main Icons Section - Fits Entirely on Screen */}
      <div className="flex-1 flex items-center justify-center px-2 min-h-0">
        <div className="grid md:grid-cols-2 gap-8 max-w-3xl w-full">
          {/* Citizens Icon */}
          <div className="text-center group animate-slide-up">
            <div 
              className={`w-28 h-28 bg-gradient-to-br from-emerald-400 to-teal-500 rounded-full flex items-center justify-center mx-auto mb-4 shadow-2xl cursor-pointer transform hover:scale-110 transition-all duration-500 hover:animate-bounce ${
                activeDescription === 'authorities' ? 'blur-sm opacity-50' : ''
              }`}
              onClick={() => setActiveDescription(activeDescription === 'citizens' ? null : 'citizens')}
            >
              <span className="text-4xl">👥</span>
            </div>
            <h2 className="text-lg font-bold text-gray-800 mb-1">For Citizens</h2>
            <p className="text-sm text-gray-600 mb-2">
              Get personalized flood alerts and stay informed
            </p>
            {/* Interactive Description Box */}
            {activeDescription === 'citizens' && (
              <div className="bg-white/95 backdrop-blur-sm rounded-2xl p-4 shadow-2xl border border-emerald-200 animate-slide-up max-w-xs mx-auto">
                <h3 className="text-base font-bold text-emerald-800 mb-2">Citizen Features</h3>
                <div className="space-y-2 mb-4">
                  <div className="flex items-center space-x-2">
                    <div className="w-4 h-4 bg-emerald-100 rounded-full flex items-center justify-center">
                      <span className="text-emerald-600 text-xs">✓</span>
                    </div>
                    <span className="text-gray-700 text-xs">Real-time flood risk monitoring</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <div className="w-4 h-4 bg-emerald-100 rounded-full flex items-center justify-center">
                      <span className="text-emerald-600 text-xs">✓</span>
                    </div>
                    <span className="text-gray-700 text-xs">Personalized alerts via SMS/WhatsApp</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <div className="w-4 h-4 bg-emerald-100 rounded-full flex items-center justify-center">
                      <span className="text-emerald-600 text-xs">✓</span>
                    </div>
                    <span className="text-gray-700 text-xs">Weekly weather forecasts</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <div className="w-4 h-4 bg-emerald-100 rounded-full flex items-center justify-center">
                      <span className="text-emerald-600 text-xs">✓</span>
                    </div>
                    <span className="text-gray-700 text-xs">Offline-first mobile experience</span>
                  </div>
                </div>
                <Link to="/register">
                  <Button className="w-full bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-600 hover:to-teal-700 transform hover:scale-105 transition-all duration-200 py-1 text-sm">
                    Get Started <span className="ml-1">🚀</span>
                  </Button>
                </Link>
              </div>
            )}
          </div>
          {/* Authorities Icon */}
          <div className="text-center group animate-slide-up" style={{animationDelay: '0.2s'}}>
            <div 
              className={`w-28 h-28 bg-gradient-to-br from-amber-400 to-orange-500 rounded-full flex items-center justify-center mx-auto mb-4 shadow-2xl cursor-pointer transform hover:scale-110 transition-all duration-500 hover:animate-bounce ${
                activeDescription === 'citizens' ? 'blur-sm opacity-50' : ''
              }`}
              style={{animationDelay: '0.5s'}}
              onClick={() => setActiveDescription(activeDescription === 'authorities' ? null : 'authorities')}
            >
              <span className="text-4xl">🏛️</span>
            </div>
            <h2 className="text-lg font-bold text-gray-800 mb-1">For Authorities</h2>
            <p className="text-sm text-gray-600 mb-2">
              Manage regional flood monitoring and coordinate responses
            </p>
            {/* Interactive Description Box */}
            {activeDescription === 'authorities' && (
              <div className="bg-white/95 backdrop-blur-sm rounded-2xl p-4 shadow-2xl border border-amber-200 animate-slide-up max-w-xs mx-auto">
                <h3 className="text-base font-bold text-amber-800 mb-2">Authority Features</h3>
                <div className="space-y-2 mb-4">
                  <div className="flex items-center space-x-2">
                    <div className="w-4 h-4 bg-amber-100 rounded-full flex items-center justify-center">
                      <span className="text-amber-600 text-xs">✓</span>
                    </div>
                    <span className="text-gray-700 text-xs">Regional risk overview dashboard</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <div className="w-4 h-4 bg-amber-100 rounded-full flex items-center justify-center">
                      <span className="text-amber-600 text-xs">✓</span>
                    </div>
                    <span className="text-gray-700 text-xs">Alert management and distribution</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <div className="w-4 h-4 bg-amber-100 rounded-full flex items-center justify-center">
                      <span className="text-amber-600 text-xs">✓</span>
                    </div>
                    <span className="text-gray-700 text-xs">Historical data analysis</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <div className="w-4 h-4 bg-amber-100 rounded-full flex items-center justify-center">
                      <span className="text-amber-600 text-xs">✓</span>
                    </div>
                    <span className="text-gray-700 text-xs">Contact management system</span>
                  </div>
                </div>
                <Link to="/login">
                  <Button className="w-full bg-gradient-to-r from-amber-500 to-orange-600 hover:from-amber-600 hover:to-orange-700 transform hover:scale-105 transition-all duration-200 py-1 text-sm">
                    Authority Login <span className="ml-1">🔐</span>
                  </Button>
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>
      {/* Bottom Feature Highlight - Compact */}
      <div className="text-center pb-4 animate-slide-up" style={{animationDelay: '0.4s'}}>
        <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-2 shadow-lg border border-blue-200 max-w-md mx-auto">
          <h3 className="text-base font-bold text-gray-800 mb-1">🌟 Why Choose AegisFlood?</h3>
          <div className="flex justify-center space-x-4 text-xs text-gray-600">
            <div className="flex flex-col items-center">
              <span className="text-xl mb-0.5">🛡️</span>
              <span>Community Safety</span>
            </div>
            <div className="flex flex-col items-center">
              <span className="text-xl mb-0.5">📱</span>
              <span>Real-time Alerts</span>
            </div>
            <div className="flex flex-col items-center">
              <span className="text-xl mb-0.5">🌍</span>
              <span>Smart Monitoring</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}




