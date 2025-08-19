import { useState } from 'react'
import Card from '../components/shared/Card'
import Input from '../components/shared/Input'
import Button from '../components/shared/Button'
import api from '../services/api'
import { useAuth } from '../context/AuthContext'

export default function Login() {
  const { login } = useAuth()
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    try {
      const res = await api.post('/auth/admin/login', { username, password })
      login(res.data.access_token, res.data.role)
    } catch (e) {
      setError('Invalid credentials')
    }
  }

  return (
    <Card className="max-w-md mx-auto">
      <h2 className="text-lg font-semibold mb-3">Authority Login</h2>
      <form onSubmit={onSubmit} className="space-y-3">
        <Input placeholder="Username" value={username} onChange={e => setUsername(e.target.value)} />
        <Input type="password" placeholder="Password" value={password} onChange={e => setPassword(e.target.value)} />
        {error && <p className="text-status-alert text-sm">{error}</p>}
        <Button type="submit">Login</Button>
      </form>
    </Card>
  )
}


