import { useState } from 'react'
import Card from '../components/shared/Card'
import Input from '../components/shared/Input'
import Button from '../components/shared/Button'
import api from '../services/api'
import { useAuth } from '../context/AuthContext'
import { Link, useNavigate } from 'react-router-dom'
import { useI18n } from '../context/I18nContext'

type RegistrationData = {
  location: string
  phone: string
  language: 'en' | 'hi' | 'as' | 'ta'
  alerts: {
    sms: boolean
    whatsapp: boolean
  }
}

export default function Registration() {
  const { login } = useAuth()
  const navigate = useNavigate()
  const { setLanguage, t } = useI18n()
  const [currentStep, setCurrentStep] = useState(1)
  const [registrationData, setRegistrationData] = useState<RegistrationData>({
    location: '',
    phone: '',
    language: 'en',
    alerts: {
      sms: true,
      whatsapp: false
    }
  })
  const [otp, setOtp] = useState('')
  const [otpSent, setOtpSent] = useState(false)
  const [message, setMessage] = useState('')
  const [loading, setLoading] = useState(false)

  const steps = [
    { id: 1, title: 'Location', icon: '\ud83d\udccd' },
    { id: 2, title: 'Phone', icon: '\ud83d\udcf1' },
    { id: 3, title: 'Language', icon: '\ud83c\udf10' },
    { id: 4, title: 'Alerts', icon: '🔔' }
  ]

  const updateData = (field: keyof RegistrationData, value: any) => {
    setRegistrationData(prev => ({ ...prev, [field]: value }))
  }

  const sendOTP = async () => {
    setLoading(true)
    setMessage('')
    try {
      await api.post('/auth/register', { 
        phone_number: registrationData.phone,
        location: registrationData.location, // Send as location field
        language: registrationData.language
      })
      setOtpSent(true)
      setMessage('OTP sent. Use 0000 for demo.')
    } catch (error) {
      setMessage('Error sending OTP. Please try again.')
    }
    setLoading(false)
  }

  const verifyOTP = async () => {
    setLoading(true)
    setMessage('')
    try {
      const res = await api.post('/auth/verify', { 
        phone_number: registrationData.phone, 
        otp 
      })
      // Save auth, but continue to Step 3 and Step 4 before redirecting
      login(res.data.access_token, res.data.role)
      setMessage('Phone verified successfully')
      setCurrentStep(3)
    } catch (error) {
      setMessage('Invalid OTP. Please try again.')
    }
    setLoading(false)
  }

  const nextStep = () => {
    if (currentStep < 4) setCurrentStep(currentStep + 1)
  }
  const prevStep = () => {
    if (currentStep > 1) setCurrentStep(currentStep - 1)
  }

  const canComplete = registrationData.alerts.sms || registrationData.alerts.whatsapp

  const renderStepContent = () => {
    switch (currentStep) {
      case 1:
        return (
          <div className="space-y-4">
            <div className="text-center">
              <div className="text-2xl mb-2">📍</div>
              <h2 className="text-lg font-semibold">Choose Location</h2>
              <p className="text-sm text-gray-600 mt-2">Select your area to get accurate flood risk information and alerts.</p>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Location (City, District, State)</label>
              <Input placeholder="e.g., Guwahati, Kamrup, Assam" value={registrationData.location} onChange={e => updateData('location', e.target.value)} />
              <p className="text-xs text-gray-500 mt-2">Enter your complete address including city, district, and state.</p>
            </div>
            <Button onClick={nextStep} disabled={!registrationData.location.trim()} className="w-full">Next →</Button>
          </div>
        )

      case 2:
        return (
          <div className="space-y-4">
            <div className="text-center">
              <div className="text-2xl mb-2">📱</div>
              <h2 className="text-lg font-semibold">Phone Verification</h2>
              <p className="text-sm text-gray-600 mt-2">We'll send a verification code to confirm your phone number.</p>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Phone Number</label>
              <Input
                placeholder="+91 98765 43210"
                value={registrationData.phone}
                onChange={e => updateData('phone', e.target.value)}
                className={otpSent ? "opacity-60 pointer-events-none" : ""}
              />
            </div>
            {!otpSent ? (
              <div className="space-y-3">
                <Button onClick={sendOTP} disabled={!registrationData.phone.trim() || loading} className="w-full">{loading ? 'Sending...' : 'Send OTP'}</Button>
                <Button onClick={prevStep} variant="secondary" className="w-full">← Back</Button>
              </div>
            ) : (
              <div className="space-y-3">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Enter OTP</label>
                  <Input placeholder="0000" value={otp} onChange={e => setOtp(e.target.value)} />
                </div>
                <Button onClick={verifyOTP} disabled={!otp.trim() || loading} className="w-full">{loading ? 'Verifying...' : 'Verify OTP'}</Button>
                <Button onClick={() => setOtpSent(false)} variant="secondary" className="w-full">Resend OTP</Button>
              </div>
            )}
          </div>
        )

      case 3:
        return (
          <div className="space-y-4">
            <div className="text-center">
              <div className="text-2xl mb-2">🌐</div>
              <h2 className="text-lg font-semibold">Choose Language</h2>
              <p className="text-sm text-gray-600 mt-2">Select your preferred language for alerts and interface.</p>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Preferred Language</label>
              <select 
                value={registrationData.language}
                onChange={e => {
                  const lang = e.target.value as RegistrationData['language']
                  updateData('language', lang)
                  setLanguage(lang)
                }}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="en">English</option>
                <option value="hi">Hindi</option>
                <option value="as">Assamese</option>
                <option value="ta">Tamil</option>
              </select>
            </div>
            <div className="flex space-x-3">
              <Button onClick={prevStep} variant="secondary" className="flex-1">← Back</Button>
              <Button onClick={nextStep} className="flex-1">Next →</Button>
            </div>
          </div>
        )

      case 4:
        return (
          <div className="space-y-4">
            <div className="text-center">
              <div className="text-2xl mb-2">🔔</div>
              <h2 className="text-lg font-semibold">{t('reg.alertPrefs')}</h2>
              <p className="text-sm text-gray-600 mt-2">{t('reg.alertPrefsDesc')}</p>
            </div>
            <div className="space-y-3">
              <label className="flex items-center space-x-3">
                <input type="checkbox" checked={registrationData.alerts.sms} onChange={e => updateData('alerts', { ...registrationData.alerts, sms: e.target.checked })} className="w-4 h-4 text-blue-600 rounded focus:ring-blue-500" />
                <span className="text-sm">{t('reg.smsAlerts')}</span>
              </label>
              <label className="flex items-center space-x-3">
                <input type="checkbox" checked={registrationData.alerts.whatsapp} onChange={e => updateData('alerts', { ...registrationData.alerts, whatsapp: e.target.checked })} className="w-4 h-4 text-blue-600 rounded focus:ring-blue-500" />
                <span className="text-sm">{t('reg.whatsappAlerts')}</span>
              </label>
              <p className="text-xs text-gray-500">{t('reg.selectOne')}</p>
            </div>
            <div className="flex space-x-3">
              <Button onClick={prevStep} variant="secondary" className="flex-1">← Back</Button>
              <Button onClick={() => navigate('/dashboard', { replace: true })} disabled={!canComplete} className="flex-1">Complete Setup</Button>
            </div>
          </div>
        )

      default:
        return null
    }
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-md mx-auto px-4 mb-6">
        <div className="flex items-center justify-between">
          <Link to="/" className="text-blue-600 hover:text-blue-800">← Back</Link>
          <h1 className="text-lg font-semibold">Registration</h1>
          <Link to="/" className="text-blue-600 hover:text-blue-800">Home</Link>
        </div>
      </div>

      <div className="max-w-md mx-auto px-4 mb-6">
        <div className="text-center mb-4">
          <p className="text-sm text-gray-600">Step {currentStep} of 4</p>
        </div>
        <div className="flex items-center justify-between">
          {steps.map((step, index) => (
            <div key={step.id} className="flex items-center">
              <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm ${step.id <= currentStep ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-500'}`}>
                {step.id < currentStep ? '✓' : step.icon}
              </div>
              {index < steps.length - 1 && (
                <div className={`flex-1 h-0.5 mx-2 ${step.id < currentStep ? 'bg-blue-600' : 'bg-gray-200'}`} />
              )}
            </div>
          ))}
        </div>
      </div>

      <div className="max-w-md mx-auto px-4">
        <Card className="p-6">
          {renderStepContent()}
          {message && (
            <div className={`mt-4 p-3 rounded-md text-sm ${message.includes('Error') || message.includes('Invalid') ? 'bg-red-100 text-red-700' : 'bg-green-100 text-green-700'}`}>
              {message}
            </div>
          )}
        </Card>
      </div>
    </div>
  )
}




