import { useState, useEffect, useRef } from 'react'
import { useAuth } from '../context/AuthContext'
import { useI18n } from '../context/I18nContext'
import { useNavigate } from 'react-router-dom'
import Header from '../components/ui/Header'
import NavigationBar from '../components/ui/NavigationBar'
import DashboardCard from '../components/ui/DashboardCard'
import { Card, Button, StatusPill, Toggle } from '../components/ui'
import WeeklyForecast from '../components/ui/WeeklyForecast'
import VisualizationGraph from '../components/ui/VisualizationGraph'

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
  const mapRef = useRef<HTMLDivElement>(null)
  const mapInstanceRef = useRef<any>(null)
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

  // Initialize map when component mounts
  useEffect(() => {
    if (mapRef.current && !mapInstanceRef.current) {
      // Load Leaflet dynamically
      const loadLeaflet = async () => {
        // Load Leaflet CSS
        const link = document.createElement('link')
        link.rel = 'stylesheet'
        link.href = 'https://unpkg.com/leaflet@1.9.4/dist/leaflet.css'
        document.head.appendChild(link)

        // Load Leaflet JS
        const script = document.createElement('script')
        script.src = 'https://unpkg.com/leaflet@1.9.4/dist/leaflet.js'
        script.onload = () => {
          // @ts-ignore
          const L = (window as any).L
          if (L && mapRef.current) {
            // Initialize map
            const map = L.map(mapRef.current).setView([25.96, 85.19], 7)
            mapInstanceRef.current = map

            // Base layers
            const Map1 = L.tileLayer('https://tiles.stadiamaps.com/tiles/alidade_satellite/{z}/{x}/{y}{r}.{ext}', {
              minZoom: 0,
              maxZoom: 20,
              ext: 'jpg',
              attribution: '&copy; CNES, Airbus DS, PlanetObserver | &copy; <a href="https://stadiamaps.com/">Stadia Maps</a>'
            })
            
            const Map2 = L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
              maxZoom: 19,
              attribution: '&copy; <a href="https://openstreetmap.org/copyright">OpenStreetMap</a>'
            })
            
            const Map3 = L.tileLayer('https://tiles.stadiamaps.com/tiles/osm_bright/{z}/{x}/{y}{r}.{ext}', {
              minZoom: 0,
              maxZoom: 20,
              ext: 'png',
              attribution: '&copy; Stadia Maps &copy; OpenMapTiles &copy; OpenStreetMap contributors'
            })
            
            const Esri_WorldImagery = L.tileLayer('https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}', { 
              attribution: 'Tiles &copy; Esri &mdash; Source: Esri, i-cubed, USDA, USGS, AEX, GeoEye, Getmapping, Aerogrid, IGN, IGP, UPR-EGP, and the GIS User Community' 
            })

            Map2.addTo(map) // default base layer

            // Marker Example
            const fm = L.marker([25.718957327625148, 86.19844661163431]).bindPopup(
              "<div style='text-align: center; padding: 5px;'><strong>📍 Bihar</strong><br><small>Central Location</small></div>"
            ).addTo(map)

            const baseMaps = {
              "🌊 Flood Risk": Map1,
              "☔ Rainfall": Map2,
              "🌊 River Level": Map3,
              "🌍 Incidents": Esri_WorldImagery
            }

            const overlayMaps = {
              "📡 Monitoring Stations": fm
            }

            // Add layer control
            L.control.layers(baseMaps, overlayMaps, {collapsed: false, position: 'topleft'}).addTo(map)

            // Load GeoJSON data
            fetch('/bihar.geojson')
              .then(res => res.json())
              .then(data => {
                const geojsonLayer = L.geoJSON(data, {
                  style: function (feature: any) {
                    const randomRisk = Math.floor(Math.random() * 3)
                    const riskColors = ["#27ae60", "#f39c12", "#e74c3c"] // green, yellow, red
                    return {
                      color: riskColors[randomRisk],
                      weight: 2,
                      fillColor: riskColors[randomRisk],
                      fillOpacity: 0.6
                    }
                  },
                  onEachFeature: function (feature: any, layer: any) {
                    if (feature.properties && feature.properties.DISTRICT) {
                      const riskLevels = ["Low", "Medium", "High"]
                      const riskIcons = ["🟢", "🟠", "🔴"]
                      const riskIndex = Math.floor(Math.random() * 3)
                      const riskLevel = riskLevels[riskIndex]
                      const riskIcon = riskIcons[riskIndex]
                      layer.bindPopup(`
                        <div style='text-align: center; padding: 8px; font-family: Inter, sans-serif;'>
                          <strong style='font-size: 16px; color: #1f2937;'>${feature.properties.DISTRICT}</strong><br>
                          <div style='margin: 8px 0; padding: 4px 8px; background: rgba(59, 130, 246, 0.1); border-radius: 6px; font-size: 14px;'>
                            ${riskIcon} <strong>${riskLevel} Risk</strong>
                          </div>
                          <small style='color: #6b7280;'>Bihar District</small>
                        </div>
                      `)
                    }
                  }
                }).addTo(map)

                map.fitBounds(geojsonLayer.getBounds())
              })
              .catch(err => console.error("Failed to load GeoJSON", err))
          }
        }
        document.head.appendChild(script)
      }

      loadLeaflet()
    }

    return () => {
      if (mapInstanceRef.current) {
        mapInstanceRef.current.remove()
        mapInstanceRef.current = null
      }
    }
  }, [])

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
      <style>
        {`
          .leaflet-control-layers {
            background: rgba(255, 255, 255, 0.95) !important;
            backdrop-filter: blur(10px) !important;
            border-radius: 12px !important;
            border: 2px solid #e1e8ed !important;
            box-shadow: 0 8px 32px rgba(0,0,0,0.1) !important;
            padding: 15px !important;
            min-width: 200px !important;
          }
          .leaflet-control-layers-toggle {
            background: linear-gradient(145deg, #2c5aa0, #1e3d6f) !important;
            border-radius: 8px !important;
            width: 40px !important;
            height: 40px !important;
          }
          .leaflet-control-zoom {
            border: none !important;
            box-shadow: none !important;
            border-radius: 0 !important;
            overflow: visible !important;
            background: transparent !important;
          }
          .leaflet-control-zoom a {
            background: #ffffff !important;
            color: #666 !important;
            border: none !important;
            font-size: 16px !important;
            font-weight: 400 !important;
            width: 48px !important;
            height: 48px !important;
            line-height: 48px !important;
            text-align: center !important;
            transition: all 0.2s ease !important;
            text-decoration: none !important;
            display: flex !important;
            align-items: center !important;
            justify-content: center !important;
            border-radius: 8px !important;
            box-shadow: 0 2px 8px rgba(0,0,0,0.1) !important;
            margin-bottom: 6px !important;
            position: relative !important;
          }
          .leaflet-control-zoom a:hover {
            background: #f8f9fa !important;
            color: #333 !important;
            transform: translateY(-1px) !important;
            box-shadow: 0 4px 12px rgba(0,0,0,0.15) !important;
          }
        `}
      </style>
      <Header />
      {/* Weather Widget Row (Static with Glow on Hover) */}
      <div className="flex justify-between items-center gap-2 mb-2">
        <div className="flex-1 flex flex-col items-center bg-white/80 rounded-xl p-2 shadow card-hover hover:shadow-glow transition-shadow duration-300">
          <span className="text-2xl">🌡️</span>
          <span className="font-bold text-lg">{weatherData.temperature.toFixed(1)}°C</span>
          <span className="text-xs text-slate-500">{t('dash.temperature')}</span>
        </div>
        <div className="flex-1 flex flex-col items-center bg-white/80 rounded-xl p-2 shadow card-hover hover:shadow-glow transition-shadow duration-300">
          <span className="text-2xl">🌧️</span>
          <span className="font-bold text-lg">{weatherData.rainfall.toFixed(1)} mm</span>
          <span className="text-xs text-slate-500">{t('dash.rainfall')}</span>
        </div>
        <div className="flex-1 flex flex-col items-center bg-white/80 rounded-xl p-2 shadow card-hover hover:shadow-glow transition-shadow duration-300">
          <span className="text-2xl">💧</span>
          <span className="font-bold text-lg">{weatherData.humidity.toFixed(0)}%</span>
          <span className="text-xs text-slate-500">{t('dash.humidity')}</span>
        </div>
        <div className="flex-1 flex flex-col items-center bg-white/80 rounded-xl p-2 shadow card-hover hover:shadow-glow transition-shadow duration-300">
          <span className="text-2xl">💨</span>
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
        {/* Main Content Grid (no risk monitor/calendar) */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-2 flex-1 min-h-0">
          {/* LHS: Map (full height) */}
          <div className="lg:col-span-2 flex flex-col gap-2">
            {/* Interactive Risk Map (expanded, full height) */}
            <div className="bg-white/80 backdrop-blur-sm rounded-xl shadow-lg overflow-hidden flex flex-col flex-1 min-h-[500px] h-full">
              <div className="p-2 border-b border-slate-200 flex-shrink-0">
                <div className="flex items-center justify-between">
                  <h3 className="text-base font-bold text-slate-800">{t('dash.interactiveRiskMap')}</h3>
                  <span className="text-xs text-slate-500">{t('dash.lastUpdatedTime')}: {new Date().toLocaleTimeString()}</span>
                </div>
              </div>
              <div className="flex flex-1 min-h-0 h-[500px] lg:h-[600px] xl:h-[700px]">
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
                            ? 'bg-blue-100 text-blue-700 border border-blue-300' 
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
                  <div 
                    ref={mapRef} 
                    className="w-full h-full rounded-lg border border-slate-200"
                    style={{ minHeight: '400px' }}
                  />
                  {/* Bottom Indicators */}
                  <div className="absolute bottom-2 left-2 text-xs text-slate-500 bg-white/80 px-2 py-1 rounded">{t('dash.timeFrame')}: {t('dash.current')}</div>
                  <div className="absolute bottom-2 right-2 text-xs text-slate-500 bg-white/80 px-2 py-1 rounded">{t('dash.showing')}: {t('dash.current')}</div>
                </div>
              </div>
            </div>
            {/* Prediction Timeline (directly below map, same width) */}
            <div className="bg-white/80 backdrop-blur-sm rounded-xl p-4 shadow-lg w-full mt-2">
              <div className="flex items-center justify-between mb-2">
                <h3 className="text-base font-bold text-slate-800 flex items-center space-x-2">
                  <span>⏰</span>
                  <span>{t('dash.predictionTimeline')}</span>
                </h3>
                <div className="flex items-center gap-2">
                  <span className="text-xs text-slate-600">{t('dash.predictionTime')}:</span>
                  <span className="text-xs font-semibold text-slate-800">{t('dash.now')}</span>
                </div>
              </div>
              <div className="h-12 bg-gradient-to-br from-blue-50 to-indigo-100 rounded-lg border-2 border-dashed border-blue-300 flex items-center relative overflow-hidden">
                <div className="absolute left-0 top-1/2 -translate-y-1/2 w-full h-2 flex items-center">
                  {Array.from({ length: 8 }).map((_, i) => (
                    <div key={i} className="flex-1 h-2 mx-0.5 rounded-full bg-blue-200"></div>
                  ))}
                </div>
                {/* Hoverable timeline dot */}
                <div className="absolute top-1/2 -translate-y-1/2 left-1/2 transform -translate-x-1/2 cursor-pointer hover:scale-125 transition-transform duration-200">
                  <div className="w-4 h-4 bg-gradient-to-br from-blue-400 to-indigo-500 rounded-full shadow-lg border-2 border-white"></div>
                </div>
              </div>
            </div>
          </div>
          {/* RHS: Weekly Forecast + Visualization Graph */}
          <div className="lg:col-span-1 flex flex-col gap-2">
            <WeeklyForecast />
            <VisualizationGraph />
          </div>
        </div>
      </div>
    </div>
  )
}





