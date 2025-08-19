import { useEffect, useState } from 'react'
import Card from '../components/shared/Card'
import Button from '../components/shared/Button'
import StatusPill from '../components/shared/StatusPill'
import api from '../services/api'

type Alert = {
  id: number
  type: 'low' | 'medium' | 'high' | 'critical'
  message: string
  timestamp: string
  confirmed: boolean
}

type RiskData = {
  level: 'low' | 'medium' | 'high' | 'critical'
  score: number
  waterLevel: string
  rainfall: string
  lastUpdated: string
}

export default function Dashboard() {
  const [location, setLocation] = useState('Guwahati, Assam')
  const [riskData, setRiskData] = useState<RiskData>({
    level: 'medium',
    score: 65,
    waterLevel: 'Rising',
    rainfall: 'Moderate',
    lastUpdated: '30 minutes ago'
  })
  const [alerts, setAlerts] = useState<Alert[]>([
    {
      id: 1,
      type: 'medium',
      message: 'Moderate rainfall expected in your area. Stay alert.',
      timestamp: '2 hours ago',
      confirmed: false
    },
    {
      id: 2,
      type: 'high',
      message: 'Water levels rising in nearby rivers. Monitor conditions.',
      timestamp: '5 hours ago',
      confirmed: true
    }
  ])
  const [weeklyForecast, setWeeklyForecast] = useState([
    { day: 'Today', weather: 'Moderate Rain', risk: 'medium' },
    { day: 'Tomorrow', weather: 'Heavy Rain', risk: 'high' },
    { day: 'Wednesday', weather: 'Light Rain', risk: 'low' },
    { day: 'Thursday', weather: 'Clear', risk: 'low' },
    { day: 'Friday', weather: 'Moderate Rain', risk: 'medium' }
  ])

  const confirmAlert = async (alertId: number) => {
    try {
      await api.post(`/alerts/${alertId}/confirm`)
      setAlerts(prev => prev.map(alert => 
        alert.id === alertId ? { ...alert, confirmed: true } : alert
      ))
    } catch (error) {
      console.error('Error confirming alert:', error)
    }
  }

  const getRiskColor = (level: string) => {
    switch (level) {
      case 'low': return 'bg-green-500'
      case 'medium': return 'bg-yellow-500'
      case 'high': return 'bg-orange-500'
      case 'critical': return 'bg-red-500'
      default: return 'bg-gray-500'
    }
  }

  const getRiskMessage = (level: string) => {
    switch (level) {
      case 'low': return 'Low flood risk in your area. Continue normal activities.'
      case 'medium': return 'Moderate flood risk detected in your area. Stay informed and be prepared to take action if conditions worsen.'
      case 'high': return 'High flood risk detected. Prepare for possible evacuation and follow local authorities.'
      case 'critical': return 'Critical flood risk! Immediate evacuation may be required. Follow emergency protocols.'
      default: return 'Risk level information unavailable.'
    }
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200 px-4 py-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center mr-3">
              <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M2.166 4.999A11.954 11.954 0 0010 1.944 11.954 11.954 0 0017.834 5c.11.65.166 1.32.166 2.001 0 5.225-3.34 9.67-8 11.317C5.34 16.67 2 12.225 2 7c0-.682.057-1.35.166-2.001zm11.541 3.708a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
              </svg>
            </div>
            <h1 className="text-lg font-semibold">Dashboard</h1>
          </div>
          <div className="flex items-center space-x-4">
            <span className="text-sm text-green-600 font-medium">Online</span>
            <a href="/" className="text-blue-600 hover:text-blue-800 text-sm">Home</a>
          </div>
        </div>
        <div className="mt-2">
          <p className="text-sm text-gray-600">{location}</p>
        </div>
      </div>

      <div className="p-4 space-y-4">
        {/* Current Risk Level Card */}
        <Card className="relative overflow-hidden">
          <div className={`absolute left-0 top-0 bottom-0 w-1 ${getRiskColor(riskData.level)}`}></div>
          <div className="pl-4">
            <div className="flex items-center justify-between mb-3">
              <h2 className="text-lg font-semibold">Current Risk Level</h2>
              <span className="text-xs text-gray-500">Last updated: {riskData.lastUpdated}</span>
            </div>
            
            <div className="mb-4">
              <StatusPill 
                status={riskData.level} 
                className="text-sm font-medium mb-2"
              />
            </div>
            
            <p className="text-sm text-gray-700 mb-4">
              {getRiskMessage(riskData.level)}
            </p>
            
            <div className="grid grid-cols-2 gap-4 text-sm">
              <div>
                <span className="text-gray-600">Water Level:</span>
                <span className="ml-2 font-medium">{riskData.waterLevel}</span>
              </div>
              <div>
                <span className="text-gray-600">Rainfall:</span>
                <span className="ml-2 font-medium">{riskData.rainfall}</span>
              </div>
            </div>
          </div>
        </Card>

        {/* Risk Map Card */}
        <Card>
          <div className="flex items-center mb-4">
            <svg className="w-5 h-5 text-gray-600 mr-2" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
            </svg>
            <h2 className="text-lg font-semibold">Risk Map</h2>
          </div>
          <div className="bg-gray-100 rounded-lg h-48 flex items-center justify-center">
            <div className="text-center">
              <svg className="w-16 h-16 text-gray-400 mx-auto mb-2" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
              </svg>
              <p className="text-lg font-medium text-gray-600">Interactive flood risk map</p>
              <p className="text-sm text-gray-500">Showing risk zones in your area</p>
            </div>
          </div>
        </Card>

        {/* Active Alerts */}
        <Card>
          <div className="flex items-center mb-4">
            <svg className="w-5 h-5 text-gray-600 mr-2" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z" clipRule="evenodd" />
            </svg>
            <h2 className="text-lg font-semibold">Active Alerts</h2>
          </div>
          <div className="space-y-3">
            {alerts.map(alert => (
              <div 
                key={alert.id} 
                className={`p-3 rounded-lg border-l-4 ${
                  alert.type === 'low' ? 'bg-green-50 border-green-400' :
                  alert.type === 'medium' ? 'bg-yellow-50 border-yellow-400' :
                  alert.type === 'high' ? 'bg-orange-50 border-orange-400' :
                  'bg-red-50 border-red-400'
                }`}
              >
                <div className="flex items-start justify-between">
                  <div className="flex items-start">
                    <svg className="w-5 h-5 text-yellow-600 mr-2 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                    </svg>
                    <div>
                      <div className="flex items-center mb-1">
                        <StatusPill status={alert.type} className="mr-2" />
                        <span className="text-xs text-gray-500">{alert.timestamp}</span>
                      </div>
                      <p className="text-sm text-gray-700">{alert.message}</p>
                    </div>
                  </div>
                  {!alert.confirmed && (
                    <Button 
                      onClick={() => confirmAlert(alert.id)}
                      variant="primary"
                      size="sm"
                      className="ml-3"
                    >
                      <svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                      Confirm
                    </Button>
                  )}
                </div>
              </div>
            ))}
          </div>
        </Card>

        {/* Weekly Forecast */}
        <Card>
          <h2 className="text-lg font-semibold mb-4">Weekly Forecast</h2>
          <div className="space-y-2">
            {weeklyForecast.map((day, index) => (
              <div key={index} className="flex items-center justify-between py-2 border-b border-gray-100 last:border-b-0">
                <span className="text-sm font-medium">{day.day}</span>
                <span className="text-sm text-gray-600">{day.weather}</span>
                <StatusPill status={day.risk} size="sm" />
              </div>
            ))}
          </div>
        </Card>
      </div>
    </div>
  )
}




