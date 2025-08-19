import Card from '../components/shared/Card'
import Toggle from '../components/shared/Toggle'
import { useState } from 'react'

export default function Settings() {
  const [sms, setSms] = useState(true)
  const [whatsapp, setWhatsapp] = useState(false)
  return (
    <Card className="max-w-md mx-auto space-y-3">
      <h2 className="text-lg font-semibold">Alert Preferences (MVP)</h2>
      <div className="flex items-center justify-between">
        <span>SMS Alerts</span>
        <Toggle checked={sms} onChange={setSms} />
      </div>
      <div className="flex items-center justify-between">
        <span>WhatsApp Alerts</span>
        <Toggle checked={whatsapp} onChange={setWhatsapp} />
      </div>
      <p className="text-sm text-dark-gray">Preferences are local-only in MVP.</p>
    </Card>
  )
}




