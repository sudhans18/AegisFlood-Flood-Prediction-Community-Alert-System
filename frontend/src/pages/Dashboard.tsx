import { useState, useEffect } from 'react'
import { useAuth } from '../context/AuthContext'
import { useI18n } from '../context/I18nContext'
import { useNavigate } from 'react-router-dom'
import Header from '../components/ui/Header'
import NavigationBar from '../components/ui/NavigationBar'
import DashboardCard from '../components/ui/DashboardCard'
import { Card, Button, StatusPill, Toggle } from '../components/ui'

interface WeatherData {
  temperature: number
  humidity: number
  rainfall: number
  windSpeed: number
}

interface FloodRisk {
  level: 'low' | 'medium' | 'high' | 'critical'
  score: number
  factors: string[]
  lastUpdated: string
}

interface Alert {
  id: string
  type: 'warning' | 'danger' | 'info'
  message: string
  timestamp: string
  isRead: boolean
}

interface CityRisk {
  name: string
  state: string
  risk: 'safe' | 'low' | 'medium' | 'high' | 'critical'
  percentage: number
}

export default function Dashboard() {
  const { role } = useAuth()
  const { t } = useI18n()
  const navigate = useNavigate()
  const [activeTab, setActiveTab] = useState('overview')
  const [isLoading, setIsLoading] = useState(true)
  const [weatherData, setWeatherData] = useState<WeatherData>({
    temperature: 28.5,
    humidity: 75,
    rainfall: 12.3,
    windSpeed: 8.2
  })
  const [floodRisk, setFloodRisk] = useState<FloodRisk>({
    level: 'medium',
    score: 45,
    factors: ['Moderate rainfall in last 6 hours', 'Water levels approaching warning threshold'],
    lastUpdated: new Date().toISOString()
  })
  const [alerts, setAlerts] = useState<Alert[]>([
    {
      id: '1',
      type: 'warning',
      message: t('msg.heavyRainfallExpected'),
      timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString(),
      isRead: false
    },
    {
      id: '2',
      type: 'info',
      message: t('msg.waterLevelMonitoring'),
      timestamp: new Date(Date.now() - 4 * 60 * 60 * 1000).toISOString(),
      isRead: true
    }
  ])
  const [notificationsEnabled, setNotificationsEnabled] = useState(true)
  const [autoRefresh, setAutoRefresh] = useState(true)
  const [activeLayer, setActiveLayer] = useState('flood-risk')

  // City risk data matching the example
  const [cityRisks] = useState<CityRisk[]>([
    { name: 'Chennai', state: 'Tamil Nadu', risk: 'medium', percentage: 58 },
    { name: 'Kolkata', state: 'West Bengal', risk: 'low', percentage: 35 },
    { name: 'Guwahati', state: 'Assam', risk: 'high', percentage: 78 },
    { name: 'Kochi', state: 'Kerala', risk: 'medium', percentage: 58 },
    { name: 'Bhubaneswar', state: 'Odisha', risk: 'safe', percentage: 15 },
    { name: 'Patna', state: 'Bihar', risk: 'medium', percentage: 62 }
  ])

  useEffect(() => {
    // Simulate loading
    const timer = setTimeout(() => setIsLoading(false), 1500)
    return () => clearTimeout(timer)
  }, [])

  useEffect(() => {
    if (autoRefresh) {
      const interval = setInterval(() => {
        // Simulate real-time data updates
        setWeatherData(prev => ({
          ...prev,
          temperature: prev.temperature + (Math.random() - 0.5) * 2,
          humidity: Math.max(40, Math.min(90, prev.humidity + (Math.random() - 0.5) * 10)),
          rainfall: Math.max(0, prev.rainfall + (Math.random() - 0.5) * 5),
          windSpeed: Math.max(0, prev.windSpeed + (Math.random() - 0.5) * 3)
        }))
      }, 30000) // Update every 30 seconds

      return () => clearInterval(interval)
    }
  }, [autoRefresh])

  const getRiskColor = (level: string) => {
    switch (level) {
      case 'safe': return 'text-emerald-600 bg-emerald-100 border-emerald-300'
      case 'low': return 'text-yellow-600 bg-yellow-100 border-yellow-300'
      case 'medium': return 'text-orange-600 bg-orange-100 border-orange-300'
      case 'high': return 'text-red-600 bg-red-100 border-red-300'
      case 'critical': return 'text-rose-600 bg-rose-100 border-rose-300'
      default: return 'text-slate-600 bg-slate-100 border-slate-300'
    }
  }

  const getRiskIcon = (level: string) => {
    switch (level) {
      case 'safe': return '🟢'
      case 'low': return '🟡'
      case 'medium': return '🟠'
      case 'high': return '🔴'
      case 'critical': return '🔴'
      default: return '⚪'
    }
  }

  const getRiskGradient = (level: string) => {
    switch (level) {
      case 'safe': return 'from-emerald-400 to-emerald-600'
      case 'low': return 'from-yellow-400 to-yellow-600'
      case 'medium': return 'from-orange-400 to-orange-600'
      case 'high': return 'from-red-400 to-red-600'
      case 'critical': return 'from-rose-400 to-rose-600'
      default: return 'from-slate-400 to-slate-600'
    }
  }

  const getRiskBarColor = (level: string) => {
    switch (level) {
      case 'safe': return 'bg-emerald-500'
      case 'low': return 'bg-yellow-500'
      case 'medium': return 'bg-orange-500'
      case 'high': return 'bg-red-500'
      case 'critical': return 'bg-rose-500'
      default: return 'bg-slate-500'
    }
  }

  const markAlertAsRead = (alertId: string) => {
    setAlerts(prev => prev.map(alert => 
      alert.id === alertId ? { ...alert, isRead: true } : alert
    ))
  }

  const handleNavigation = (path: string) => {
    navigate(path)
  }

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-violet-50 via-cyan-50 to-emerald-50 flex items-center justify-center">
        <div className="text-center animate-fade-in">
          <div className="relative">
            <div className="w-20 h-20 border-4 border-violet-200 border-t-violet-600 rounded-full animate-spin mx-auto mb-6"></div>
            <div className="absolute inset-0 w-20 h-20 border-4 border-transparent border-t-cyan-500 rounded-full animate-spin mx-auto" style={{ animationDirection: 'reverse', animationDuration: '1.5s' }}></div>
          </div>
          <h2 className="text-2xl font-bold text-violet-700 mb-2">🌊 {t('dash.loadingFloodMonitor')}</h2>
          <p className="text-cyan-600 text-lg">{t('dash.preparingDashboard')}</p>
          <div className="mt-4 flex justify-center space-x-2">
            <div className="w-2 h-2 bg-violet-400 rounded-full hover:animate-bounce transition-all duration-300" style={{ animationDelay: '0s' }}></div>
            <div className="w-2 h-2 bg-cyan-400 rounded-full hover:animate-bounce transition-all duration-300" style={{ animationDelay: '0.1s' }}></div>
            <div className="w-2 h-2 bg-emerald-400 rounded-full hover:animate-bounce transition-all duration-300" style={{ animationDelay: '0.2s' }}></div>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="h-screen bg-gradient-to-br from-violet-50 via-cyan-50 to-emerald-50 overflow-hidden flex flex-col relative">
      {/* Animated Weather Widget Row */}
      <div className="flex justify-between items-center gap-2 mb-2 animate-fade-in">
        <div className="flex-1 flex flex-col items-center bg-white/80 rounded-xl p-2 shadow card-hover animate-float">
          <span className="text-2xl hover:animate-bounce transition-all duration-300">🌡️</span>
                      <span className="font-bold text-lg">{weatherData.temperature.toFixed(1)}°C</span>
            <span className="text-xs text-slate-500">{t('dash.temperature')}</span>
        </div>
        <div className="flex-1 flex flex-col items-center bg-white/80 rounded-xl p-2 shadow card-hover animate-float-delay-1">
          <span className="text-2xl animate-wave">🌧️</span>
                      <span className="font-bold text-lg">{weatherData.rainfall.toFixed(1)} mm</span>
            <span className="text-xs text-slate-500">{t('dash.rainfall')}</span>
        </div>
        <div className="flex-1 flex flex-col items-center bg-white/80 rounded-xl p-2 shadow card-hover animate-float-delay-2">
          <span className="text-2xl animate-pulse">💧</span>
                      <span className="font-bold text-lg">{weatherData.humidity.toFixed(0)}%</span>
            <span className="text-xs text-slate-500">{t('dash.humidity')}</span>
        </div>
        <div className="flex-1 flex flex-col items-center bg-white/80 rounded-xl p-2 shadow card-hover animate-float-delay-3">
          <span className="text-2xl hover:animate-bounce-rotate transition-all duration-300">💨</span>
                      <span className="font-bold text-lg">{weatherData.windSpeed.toFixed(1)} km/h</span>
            <span className="text-xs text-slate-500">{t('dash.wind')}</span>
        </div>
      </div>

      {/* Live Alert Ticker */}
      <div className="w-full flex items-center bg-gradient-to-r from-red-100 via-orange-100 to-yellow-100 rounded-xl px-4 py-1 mb-2 shadow animate-fade-in">
        <span className="mr-2 animate-ping text-red-500">🔴</span>
        <span className="font-semibold text-sm text-red-700 animate-slide-left">
          {alerts.find(a => !a.isRead)?.message || t('dash.noNewAlerts')}
        </span>
        <span className="ml-auto text-xs text-slate-500 animate-fade-in">{alerts.find(a => !a.isRead)?.timestamp ? t('dash.new') : t('dash.updated')}</span>
      </div>

      {/* Main Dashboard Content */}
      <div className="flex-1 p-2 space-y-2 overflow-hidden">
        {/* Live Risk Monitor Section */}
        <div className="bg-white/80 backdrop-blur-sm rounded-xl p-2 shadow-lg flex-shrink-0">
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center gap-2">
                          <h2 className="text-lg font-bold text-slate-800">{t('dash.liveRiskMonitor')}</h2>
            <span className="ml-2 px-2 py-0.5 rounded-full bg-green-100 text-green-700 text-xs font-semibold animate-pulse">{t('dash.live')}</span>
          </div>
          <p className="text-xs text-slate-600">{t('dash.updatesEvery3Hours')}</p>
          </div>
          {/* City Risk Cards */}
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-2">
            {cityRisks.map((city, index) => (
              <div key={city.name} className={`bg-white rounded-lg p-2 shadow-sm border border-slate-200 hover:animate-bounce transition-all duration-300 ${index % 2 === 0 ? 'hover:animate-float' : 'hover:animate-float-delay-1'}`} style={{ animationDelay: `${index * 0.1}s` }}>
                <div className="flex items-center space-x-1 mb-1">
                  <span className="text-red-500 text-xs animate-pulse">{getRiskIcon(city.risk)}</span>
                  <div>
                    <h3 className="font-semibold text-slate-800 text-xs">{city.name}</h3>
                    <p className="text-xs text-slate-500">{city.state}</p>
                  </div>
                </div>
                <div className="flex items-center justify-between mb-1">
                  <span className={`px-1 py-0.5 rounded-full text-xs font-semibold ${getRiskColor(city.risk)} animate-enhanced-pulse-color`}>
                    {t(`risk.${city.risk}`)}
                  </span>
                  <span className="text-xs text-slate-600">{city.percentage}%</span>
                </div>
                <div className="w-full bg-slate-200 rounded-full h-1">
                  <div
                    className={`h-1 rounded-full ${getRiskBarColor(city.risk)} transition-all duration-1000 animate-gradient-shift`}
                    style={{ width: `${city.percentage}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-2 flex-1 min-h-0">
          {/* Interactive Risk Map */}
          <div className="lg:col-span-2 bg-white/80 backdrop-blur-sm rounded-xl shadow-lg overflow-hidden flex flex-col">
            <div className="p-2 border-b border-slate-200 flex-shrink-0">
              <div className="flex items-center justify-between">
                <h3 className="text-base font-bold text-slate-800">{t('dash.interactiveRiskMap')}</h3>
                <span className="text-xs text-slate-500 animate-fade-in">{t('dash.lastUpdatedTime')}: {new Date().toLocaleTimeString()}</span>
              </div>
            </div>
            <div className="flex flex-1 min-h-0 h-48">
              {/* Layers Panel */}
              <div className="w-28 bg-slate-50 p-2 border-r border-slate-200 flex-shrink-0">
                <h4 className="font-semibold text-slate-800 mb-1 text-xs">Layers</h4>
                <div className="space-y-1">
                  {[
                    { id: 'flood-risk', name: 'Flood Risk', icon: '☁️' },
                    { id: 'rainfall', name: 'Rainfall', icon: '🌧️' },
                    { id: 'river-levels', name: 'River Levels', icon: '🌊' },
                    { id: 'incidents', name: 'Incidents', icon: '⚠️' }
                  ].map((layer) => (
                    <button
                      key={layer.id}
                      onClick={() => setActiveLayer(layer.id)}
                      className={`w-full flex items-center space-x-2 p-1 rounded-lg text-left transition-colors text-xs ${
                        activeLayer === layer.id 
                          ? 'bg-blue-100 text-blue-700 border border-blue-300 animate-pulse' 
                          : 'hover:bg-slate-100 text-slate-700'
                      }`}
                    >
                      <span>{layer.icon}</span>
                      <span>{layer.name}</span>
                    </button>
                  ))}
                </div>
              </div>
              {/* Map Content Area */}
              <div className="flex-1 p-2 relative">
                <div className="h-full bg-gradient-to-br from-blue-50 to-indigo-100 rounded-lg border-2 border-dashed border-blue-300 flex items-center justify-center animate-fade-in">
                  <div className="text-center">
                    <div className="text-3xl mb-2 animate-float">🗺️</div>
                    <h4 className="text-sm font-semibold text-slate-700 mb-1">{t('dash.mapReadyForML')}</h4>
                    <p className="text-xs text-slate-600 max-w-xs">
                      {t('dash.mapDescription')}
                    </p>
                  </div>
                </div>
                {/* Map Controls */}
                <div className="absolute top-2 right-2 flex flex-col space-y-1">
                  <button className="w-6 h-6 bg-blue-500 text-white rounded flex items-center justify-center hover:bg-blue-600 transition-colors text-xs hover:animate-bounce transition-all duration-300">+</button>
                  <button className="w-6 h-6 bg-blue-500 text-white rounded flex items-center justify-center hover:bg-blue-600 transition-colors text-xs hover:animate-bounce transition-all duration-300">-</button>
                  <button className="w-6 h-6 bg-blue-500 text-white rounded flex items-center justify-center hover:bg-blue-600 transition-colors text-xs animate-spin">🔄</button>
                </div>
                {/* Floating cloud background */}
                <div className="absolute left-4 top-4 w-8 h-8 animate-float-delay-2 opacity-30 pointer-events-none select-none">☁️</div>
                <div className="absolute right-8 bottom-8 w-8 h-8 animate-float-delay-3 opacity-20 pointer-events-none select-none">💧</div>
                {/* Bottom Indicators */}
                <div className="absolute bottom-2 left-2 text-xs text-slate-500 animate-fade-in">{t('dash.timeFrame')}: {t('dash.current')}</div>
                <div className="absolute bottom-2 right-2 text-xs text-slate-500 animate-fade-in">{t('dash.showing')}: {t('dash.current')}</div>
              </div>
            </div>
          </div>

          {/* Right Column */}
          <div className="space-y-2 flex flex-col h-full">
            {/* High Risk Calendar */}
            <div className="bg-white/80 backdrop-blur-sm rounded-xl p-2 shadow-lg flex-1 min-h-0 animate-fade-in">
                              <h3 className="text-base font-bold text-slate-800 mb-2 flex items-center space-x-2">
                  <span>📅</span>
                  <span>{t('dash.highRiskCalendar')}</span>
                </h3>
              {/* Calendar Grid */}
              <div className="grid grid-cols-7 gap-1">
                {/* Days of Week */}
                {['S','M','T','W','T','F','S'].map((d, i) => <div key={i} className="text-center text-xs font-medium text-slate-600">{d}</div>)}
                {/* Calendar Days */}
                {Array.from({ length: 35 }, (_, i) => {
                  const day = i + 1
                  const isHighRisk = [6, 7, 9, 18, 19, 20].includes(day)
                  const isMediumRisk = [4, 5, 10, 17, 22].includes(day)
                  const isLowRisk = [1, 2, 3, 11, 12, 13, 14, 15, 16, 21].includes(day)
                  let bgColor = 'bg-slate-100'
                  if (isHighRisk) bgColor = 'bg-red-100 animate-pulse'
                  else if (isMediumRisk) bgColor = 'bg-orange-100 animate-pulse'
                  else if (isLowRisk) bgColor = 'bg-emerald-100 animate-pulse'
                  return (
                    <div key={i} className={`h-4 ${bgColor} rounded text-center text-xs flex items-center justify-center`}>
                      {day <= 31 ? day : ''}
                    </div>
                  )
                })}
              </div>
            </div>
            {/* Prediction Timeline */}
            <div className="bg-white/80 backdrop-blur-sm rounded-xl p-2 shadow-lg flex-1 min-h-0 animate-fade-in">
                              <h3 className="text-base font-bold text-slate-800 mb-2 flex items-center space-x-2">
                  <span>⏰</span>
                  <span>{t('dash.predictionTimeline')}</span>
                </h3>
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-xs text-slate-600">{t('dash.predictionTime')}:</span>
                  <span className="text-xs font-semibold text-slate-800">{t('dash.now')}</span>
                </div>
                {/* Timeline visualization with moving indicator */}
                <div className="h-12 bg-gradient-to-br from-blue-50 to-indigo-100 rounded-lg border-2 border-dashed border-blue-300 flex items-center relative overflow-hidden">
                  <div className="absolute left-0 top-1/2 -translate-y-1/2 w-full h-2 flex items-center">
                    {Array.from({ length: 8 }).map((_, i) => (
                      <div key={i} className="flex-1 h-2 mx-0.5 rounded-full bg-blue-200"></div>
                    ))}
                  </div>
                  {/* Moving dot */}
                  <div className="absolute top-1/2 -translate-y-1/2 left-0 animate-gradient-shift" style={{ left: `${(Date.now() % 24000) / 24000 * 100}%` }}>
                    <div className="w-4 h-4 bg-gradient-to-br from-blue-400 to-indigo-500 rounded-full shadow-lg animate-pulse border-2 border-white"></div>
                  </div>
                  <div className="w-full text-center z-10">
                    <span className="text-xs text-slate-600">{t('dash.timelineVisualization')}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}





