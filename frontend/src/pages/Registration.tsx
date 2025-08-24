import { useState } from 'react'
import Card from '../components/shared/Card'
import Input from '../components/shared/Input'
import Button from '../components/shared/Button'
import api from '../services/api'
import { useAuth } from '../context/AuthContext'
import { Link, useNavigate } from 'react-router-dom'
import { useI18n } from '../context/I18nContext'
import { useRef } from 'react'

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
  const [otpDigits, setOtpDigits] = useState(['', '', '', ''])
  const otpInputs = [useRef(null), useRef(null), useRef(null), useRef(null)]

  const steps = [
    { id: 1, title: 'Location', icon: '📍' },
    { id: 2, title: 'Phone', icon: '📱' },
    { id: 3, title: 'Language', icon: '🌐' },
    { id: 4, title: 'Alerts', icon: '🔔' }
  ]

  const updateData = (field: keyof RegistrationData, value: any) => {
    setRegistrationData(prev => ({ ...prev, [field]: value }))
  }

  const sendOTP = async () => {
    // BYPASS: Immediately allow OTP entry for demo
    setOtpSent(true)
    setMessage('OTP sent. Use 0000 for demo.')
    setLoading(false)
    // Do not make any API call
    return
    // The code below is now unreachable
    /*
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
    */
  }

  const verifyOTP = async () => {
    setLoading(true)
    setMessage('')
    // TEMPORARY: Allow '0000' as a valid OTP without API call
    if (otp === '0000') {
      setMessage('Phone verified successfully (demo)')
      setOtp('')
      setCurrentStep(3) // Go to Language Preference
      setLoading(false)
      return
    }
    // Optionally, you can keep the API call for real OTPs
    setMessage('Invalid OTP. Please try again.')
    setLoading(false)
  }

  const nextStep = () => {
    if (currentStep < 4) setCurrentStep(currentStep + 1)
  }
  const prevStep = () => {
    if (currentStep > 1) setCurrentStep(currentStep - 1)
  }

  const canComplete = registrationData.alerts.sms || registrationData.alerts.whatsapp

  const handleOtpInput = (index: number, value: string) => {
    if (!/^[0-9]?$/.test(value)) return
    const newDigits = [...otpDigits]
    newDigits[index] = value
    setOtpDigits(newDigits)
    if (value && index < 3) {
      (otpInputs[index + 1].current as any)?.focus()
    }
    if (newDigits.join('') === '0000') {
      setTimeout(() => {
        setOtp('0000')
        setOtpDigits(['', '', '', ''])
        setOtpSent(false)
        setMessage('Phone verified successfully (demo)')
        setCurrentStep(3)
      }, 300)
    }
  }

  const renderStepContent = () => {
    switch (currentStep) {
      case 1:
        return (
          <div className="space-y-6 animate-slide-up">
            <div className="text-center">
              <div className="w-20 h-20 bg-gradient-to-br from-blue-400 to-indigo-500 rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg animate-bounce">
                <span className="text-3xl">📍</span>
              </div>
              <h2 className="text-2xl font-bold text-gray-800 mb-2">Choose Location</h2>
              <p className="text-gray-600">Select your area to get accurate flood risk information and alerts.</p>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Location (City, District, State)</label>
              <Input 
                placeholder="e.g., Guwahati, Kamrup, Assam" 
                value={registrationData.location} 
                onChange={e => updateData('location', e.target.value)}
                className="w-full p-3 border-2 border-gray-200 rounded-lg focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all"
              />
              <p className="text-xs text-gray-500 mt-2">Enter your complete address including city, district, and state.</p>
            </div>
            <Button 
              onClick={nextStep} 
              disabled={!registrationData.location.trim()} 
              className="w-full bg-gradient-to-r from-blue-500 to-indigo-600 hover:from-blue-600 hover:to-indigo-700 transform hover:scale-105 transition-all duration-200"
            >
              Next → <span className="ml-2">🚀</span>
            </Button>
          </div>
        )

      case 2:
        return (
          <div className="space-y-6 animate-slide-up">
            <div className="text-center">
              <div className="w-20 h-20 bg-gradient-to-br from-emerald-400 to-teal-500 rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg animate-bounce">
                <span className="text-3xl">📱</span>
              </div>
              <h2 className="text-2xl font-bold text-gray-800 mb-2">Phone Verification</h2>
              <p className="text-gray-600">We'll send a verification code to confirm your phone number.</p>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Phone Number</label>
              <Input
                placeholder="+91 98765 43210"
                value={registrationData.phone}
                onChange={e => updateData('phone', e.target.value)}
                className={`w-full p-3 border-2 border-gray-200 rounded-lg focus:border-emerald-500 focus:ring-2 focus:ring-emerald-200 transition-all ${otpSent ? "opacity-60 pointer-events-none" : ""}`}
              />
            </div>
            {!otpSent ? (
              <div className="space-y-3">
                <Button 
                  onClick={sendOTP} 
                  disabled={!registrationData.phone.trim() || loading} 
                  className="w-full bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-600 hover:to-teal-700 transform hover:scale-105 transition-all duration-200"
                >
                  {loading ? 'Sending...' : 'Send OTP'} <span className="ml-2">📤</span>
                </Button>
                <Button 
                  onClick={prevStep} 
                  variant="secondary" 
                  className="w-full bg-gradient-to-r from-gray-400 to-gray-500 hover:from-gray-500 hover:to-gray-600 transform hover:scale-105 transition-all duration-200"
                >
                  ← Back <span className="ml-2">↩️</span>
                </Button>
              </div>
            ) : (
              <div className="space-y-3">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Enter OTP</label>
                  <Input 
                    placeholder="0000" 
                    value={otp} 
                    onChange={e => setOtp(e.target.value)}
                    className="w-full p-3 border-2 border-gray-200 rounded-lg focus:border-emerald-500 focus:ring-2 focus:ring-emerald-200 transition-all text-center text-lg font-mono"
                  />
                </div>
                <Button 
                  onClick={verifyOTP} 
                  disabled={!otp.trim() || loading} 
                  className="w-full bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-600 hover:to-teal-700 transform hover:scale-105 transition-all duration-200"
                >
                  {loading ? 'Verifying...' : 'Verify OTP'} <span className="ml-2">✅</span>
                </Button>
                <Button 
                  onClick={() => setOtpSent(false)} 
                  variant="secondary" 
                  className="w-full bg-gradient-to-r from-amber-400 to-orange-500 hover:from-amber-500 hover:to-orange-600 transform hover:scale-105 transition-all duration-200"
                >
                  Resend OTP <span className="ml-2">🔄</span>
                </Button>
              </div>
            )}
          </div>
        )

      case 3:
        return (
          <div className="space-y-6 animate-slide-up">
            <div className="text-center">
              <div className="w-20 h-20 bg-gradient-to-br from-purple-400 to-pink-500 rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg animate-bounce">
                <span className="text-3xl">🌐</span>
              </div>
              <h2 className="text-2xl font-bold text-gray-800 mb-2">Choose Language</h2>
              <p className="text-gray-600">Select your preferred language for alerts and interface.</p>
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
                className="w-full p-3 border-2 border-gray-200 rounded-lg focus:border-purple-500 focus:ring-2 focus:ring-purple-200 transition-all bg-white"
              >
                <option value="en">🇺🇸 English</option>
                <option value="hi">🇮🇳 Hindi</option>
                <option value="as">🇮🇳 Assamese</option>
                <option value="ta">🇮🇳 Tamil</option>
              </select>
            </div>
            <div className="flex space-x-3">
              <Button 
                onClick={prevStep} 
                variant="secondary" 
                className="flex-1 bg-gradient-to-r from-gray-400 to-gray-500 hover:from-gray-500 hover:to-gray-600 transform hover:scale-105 transition-all duration-200"
              >
                ← Back <span className="ml-2">↩️</span>
              </Button>
              <Button 
                onClick={nextStep} 
                className="flex-1 bg-gradient-to-r from-purple-500 to-pink-600 hover:from-purple-600 hover:to-pink-700 transform hover:scale-105 transition-all duration-200"
              >
                Next → <span className="ml-2">🚀</span>
              </Button>
            </div>
          </div>
        )

      case 4:
        return (
          <div className="flex flex-col flex-1 min-h-0 animate-slide-up">
            <div className="flex-1 min-h-0 space-y-6 overflow-y-auto pr-1">
              <div className="text-center">
                <div className="w-20 h-20 bg-gradient-to-br from-amber-400 to-orange-500 rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg animate-bounce">
                  <span className="text-3xl">🔔</span>
                </div>
                <h2 className="text-2xl font-bold text-gray-800 mb-2">{t('reg.alertPrefs')}</h2>
                <p className="text-gray-600">{t('reg.alertPrefsDesc')}</p>
              </div>
              <div className="space-y-4">
                <label className="flex items-center space-x-4 p-4 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-lg hover:from-blue-100 hover:to-indigo-100 transition-all cursor-pointer">
                  <input 
                    type="checkbox" 
                    checked={registrationData.alerts.sms} 
                    onChange={e => updateData('alerts', { ...registrationData.alerts, sms: e.target.checked })} 
                    className="w-5 h-5 text-blue-600 rounded focus:ring-blue-500 transform hover:scale-110 transition-transform"
                  />
                  <span className="text-2xl">📱</span>
                  <span className="text-sm font-medium text-gray-800">{t('reg.smsAlerts')}</span>
                </label>
                <label className="flex items-center space-x-4 p-4 bg-gradient-to-r from-emerald-50 to-teal-50 rounded-lg hover:from-emerald-100 hover:to-teal-100 transition-all cursor-pointer">
                  <input 
                    type="checkbox" 
                    checked={registrationData.alerts.whatsapp} 
                    onChange={e => updateData('alerts', { ...registrationData.alerts, whatsapp: e.target.checked })} 
                    className="w-5 h-5 text-emerald-600 rounded focus:ring-emerald-500 transform hover:scale-110 transition-transform"
                  />
                  <span className="text-2xl">💬</span>
                  <span className="text-sm font-medium text-gray-800">{t('reg.whatsappAlerts')}</span>
                </label>
                <p className="text-xs text-gray-500 text-center">💡 {t('reg.selectOne')}</p>
              </div>
            </div>
            <div className="flex space-x-3 mt-auto pt-2 pb-2 bg-white/80 rounded-b-xl">
              <Button 
                onClick={prevStep} 
                variant="secondary" 
                className="flex-1 bg-gradient-to-r from-gray-400 to-gray-500 hover:from-gray-500 hover:to-gray-600 transform hover:scale-105 transition-all duration-200"
              >
                ← Back <span className="ml-2">↩️</span>
              </Button>
              <Button 
                onClick={() => { 
                  login('demo-token', 'citizen');
                  navigate('/dashboard', { replace: true }); 
                }} 
                disabled={!canComplete}
                className="flex-1 bg-gradient-to-r from-amber-500 to-orange-600 hover:from-amber-600 hover:to-orange-700 transform hover:scale-105 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Complete Setup <span className="ml-2">🎉</span>
              </Button>
            </div>
          </div>
        )

      default:
        return null
    }
  }

  const renderOtpModal = () => (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      {/* Strong blur and dim overlay */}
      <div className="absolute inset-0 bg-black/60 backdrop-blur-md"></div>
      <div className="relative bg-gradient-to-br from-blue-100 via-white to-indigo-100 rounded-3xl shadow-2xl p-6 w-72 flex flex-col items-center animate-fade-in">
        <div className="w-16 h-24 bg-gradient-to-br from-blue-400 to-indigo-500 rounded-2xl flex items-center justify-center mb-4 shadow-lg">
          <span className="text-3xl">📱</span>
        </div>
        <h2 className="text-lg font-bold text-gray-800 mb-1">Enter OTP</h2>
        <p className="text-xs text-gray-600 mb-4">Enter the 4-digit code sent to your phone</p>
        <div className="flex space-x-2 mb-4">
          {otpDigits.map((digit, i) => (
            <input
              key={i}
              ref={otpInputs[i]}
              type="text"
              maxLength={1}
              value={digit}
              onChange={e => handleOtpInput(i, e.target.value)}
              className="w-10 h-12 text-2xl text-center border-2 border-blue-300 rounded-lg focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all font-mono bg-white"
              autoFocus={i === 0}
            />
          ))}
        </div>
        <div className="grid grid-cols-3 gap-2 mb-2">
          {[1,2,3,4,5,6,7,8,9,0].map((num, i) => (
            <button
              key={i}
              className="w-12 h-10 bg-blue-100 rounded-lg text-xl font-bold text-blue-700 hover:bg-blue-200 transition-all"
              onClick={() => {
                const idx = otpDigits.findIndex(d => d === '')
                if (idx !== -1) handleOtpInput(idx, num.toString())
              }}
            >{num}</button>
          ))}
        </div>
        <button
          className="mt-2 text-xs text-blue-600 hover:underline"
          onClick={() => setOtpDigits(['', '', '', ''])}
        >Clear</button>
      </div>
    </div>
  )

  return (
    <div className="h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 flex flex-col overflow-hidden animate-fade-in">
      <div className="max-w-2xl mx-auto px-2 flex-1 flex flex-col min-h-0">
        {/* Header */}
        <div className="text-center mb-4 animate-slide-down">
          <div className="w-16 h-16 bg-gradient-to-br from-blue-500 via-indigo-500 to-purple-600 rounded-full flex items-center justify-center mx-auto mb-4 shadow-xl animate-enhanced-pulse">
            <span className="text-2xl">🚀</span>
          </div>
          <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 bg-clip-text text-transparent mb-1">
            Get Started
          </h1>
          <p className="text-base text-gray-600">Join our flood monitoring community</p>
        </div>
        {/* Navigation */}
        <div className="flex items-center justify-between mb-4">
          <Link to="/" className="text-blue-600 hover:text-blue-800 font-medium transition-colors text-xs">
            ← Back to Home
          </Link>
          <Link to="/" className="text-blue-600 hover:text-blue-800 font-medium transition-colors text-xs">
            🏠 Home
          </Link>
        </div>
        {/* Progress Steps */}
        <div className="mb-4 animate-slide-up">
          <div className="text-center mb-2">
            <p className="text-xs text-gray-600 mb-1">Step {currentStep} of 4</p>
            <div className="w-full bg-gray-200 rounded-full h-1">
              <div 
                className="bg-gradient-to-r from-blue-500 via-indigo-500 to-purple-600 h-1 rounded-full transition-all duration-500 ease-out"
                style={{ width: `${(currentStep / 4) * 100}%` }}
              ></div>
            </div>
          </div>
          <div className="flex items-center justify-between">
            {steps.map((step, index) => (
              <div key={step.id} className="flex flex-col items-center">
                <div className={`w-8 h-8 rounded-full flex items-center justify-center text-base font-semibold transition-all duration-300 transform hover:scale-110 ${
                  step.id < currentStep 
                    ? 'bg-gradient-to-br from-green-400 to-emerald-500 text-white shadow-lg' 
                    : step.id === currentStep 
                    ? 'bg-gradient-to-br from-blue-500 to-indigo-600 text-white shadow-xl scale-110' 
                    : 'bg-gray-200 text-gray-500'
                }`}>
                  {step.id < currentStep ? '✓' : step.icon}
                </div>
                <span className={`text-[10px] mt-1 font-medium ${
                  step.id <= currentStep ? 'text-gray-800' : 'text-gray-500'
                }`}>
                  {step.title}
                </span>
                {index < steps.length - 1 && (
                  <div className={`flex-1 h-0.5 mx-1 mt-2 transition-all duration-300 ${
                    step.id < currentStep ? 'bg-gradient-to-r from-green-400 to-emerald-500' : 'bg-gray-200'
                  }`} style={{ width: '12px' }} />
                )}
              </div>
            ))}
          </div>
        </div>
        {/* Step Content */}
        <Card className="p-4 bg-white/80 backdrop-blur-sm border-0 shadow-xl hover:shadow-2xl transition-all duration-500 flex flex-col flex-1 min-h-0 max-h-[calc(100vh-180px)] justify-between">
          <div className="flex-1 min-h-0 flex flex-col justify-between">
            {renderStepContent()}
            {message && (
              <div className={`mt-2 p-2 rounded-lg text-xs font-medium animate-slide-right ${
                message.includes('Error') || message.includes('Invalid') 
                  ? 'bg-gradient-to-r from-red-50 to-pink-50 text-red-700 border border-red-200' 
                  : 'bg-gradient-to-r from-green-50 to-emerald-50 text-green-700 border border-green-200'
              }`}>
                <span className="mr-1">
                  {message.includes('Error') || message.includes('Invalid') ? '❌' : '✅'}
                </span>
                {message}
              </div>
            )}
          </div>
        </Card>
        {/* Bottom Feature Highlight */}
        <div className="mt-4 text-center animate-slide-up" style={{animationDelay: '0.6s'}}>
          <div className="bg-white/60 backdrop-blur-sm rounded-2xl p-4 shadow-lg">
            <h3 className="text-base font-semibold text-gray-800 mb-1">🌟 Why Join AegisFlood?</h3>
            <p className="text-gray-600 text-xs">
              Get real-time flood alerts, weather updates, and community safety information. 
              Stay informed, stay safe! 🛡️
            </p>
          </div>
        </div>
      </div>
      {otpSent && currentStep === 2 && renderOtpModal()}
    </div>
  )
}