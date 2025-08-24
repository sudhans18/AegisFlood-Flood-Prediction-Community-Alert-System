import Card from '../components/shared/Card'
import Toggle from '../components/shared/Toggle'
import { useState } from 'react'

export default function Settings() {
  const [sms, setSms] = useState(true)
  const [whatsapp, setWhatsapp] = useState(false)
  const [email, setEmail] = useState(true)
  const [pushNotifications, setPushNotifications] = useState(false)
  
  return (
    <div className="h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 overflow-hidden flex flex-col">
      <div className="max-w-3xl mx-auto flex-1 flex flex-col min-h-0 p-2">
        {/* Header Section */}
        <div className="text-center mb-4 animate-slide-down">
          <div className="w-16 h-16 bg-gradient-to-br from-blue-500 via-indigo-500 to-purple-600 rounded-full flex items-center justify-center mx-auto mb-4 shadow-xl animate-enhanced-pulse">
            <span className="text-2xl">⚙️</span>
          </div>
          <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 bg-clip-text text-transparent mb-1">
            Settings
          </h1>
          <p className="text-base text-gray-600">Manage your preferences</p>
        </div>
        {/* Settings Categories */}
        <div className="grid md:grid-cols-2 gap-2 flex-1 min-h-0">
          <Card className="p-4 bg-gradient-to-br from-blue-50 to-indigo-50 border-0 shadow-xl animate-slide-up flex-1 min-h-0">
            <div className="flex items-center mb-2">
              <div className="w-8 h-8 bg-gradient-to-br from-blue-400 to-indigo-500 rounded-full flex items-center justify-center mr-2 shadow-lg animate-bounce">
                <span className="text-lg">🔔</span>
              </div>
              <h2 className="text-lg font-bold text-gray-800">Alert Preferences</h2>
            </div>
            <div className="space-y-2">
              <div className="flex items-center justify-between p-2 bg-white/60 rounded-lg">
                <span className="text-gray-700 font-medium text-sm">Email Alerts</span>
                <Toggle checked={true} onChange={() => {}} />
              </div>
              <div className="flex items-center justify-between p-2 bg-white/60 rounded-lg">
                <span className="text-gray-700 font-medium text-sm">Push Notifications</span>
                <Toggle checked={false} onChange={() => {}} />
              </div>
            </div>
          </Card>
          <Card className="p-4 bg-gradient-to-br from-emerald-50 to-teal-50 border-0 shadow-xl animate-slide-up flex-1 min-h-0">
            <div className="flex items-center mb-2">
              <div className="w-8 h-8 bg-gradient-to-br from-emerald-400 to-teal-500 rounded-full flex items-center justify-center mr-2 shadow-lg animate-bounce">
                <span className="text-lg">🖥️</span>
              </div>
              <h2 className="text-lg font-bold text-gray-800">Display Settings</h2>
            </div>
            <div className="space-y-2">
              <div className="flex items-center justify-between p-2 bg-white/60 rounded-lg">
                <span className="text-gray-700 font-medium text-sm">Dark Mode</span>
                <Toggle checked={false} onChange={() => {}} />
              </div>
              <div className="flex items-center justify-between p-2 bg-white/60 rounded-lg">
                <span className="text-gray-700 font-medium text-sm">Font Size</span>
                <Toggle checked={false} onChange={() => {}} />
              </div>
            </div>
          </Card>
          <Card className="p-4 bg-gradient-to-br from-pink-50 to-purple-50 border-0 shadow-xl animate-slide-up flex-1 min-h-0">
            <div className="flex items-center mb-2">
              <div className="w-8 h-8 bg-gradient-to-br from-pink-400 to-purple-500 rounded-full flex items-center justify-center mr-2 shadow-lg animate-bounce">
                <span className="text-lg">🔒</span>
              </div>
              <h2 className="text-lg font-bold text-gray-800">Privacy & Security</h2>
            </div>
            <div className="space-y-2">
              <div className="flex items-center justify-between p-2 bg-white/60 rounded-lg">
                <span className="text-gray-700 font-medium text-sm">2FA</span>
                <Toggle checked={false} onChange={() => {}} />
              </div>
              <div className="flex items-center justify-between p-2 bg-white/60 rounded-lg">
                <span className="text-gray-700 font-medium text-sm">Data Encryption</span>
                <Toggle checked={true} onChange={() => {}} />
              </div>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}




