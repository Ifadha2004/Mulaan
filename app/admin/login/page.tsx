'use client'

import { useState } from 'react'
import { Button } from '@/components/shared/ui'
import { useRouter } from 'next/navigation'
import { loginAdmin } from '@/lib/actions/auth.actions'
import toast from 'react-hot-toast'

export default function AdminLoginPage() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const router = useRouter()

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)

    const result = await loginAdmin({ email, password })

    if (result.success) {
      toast.success('Login successful')
      router.push('/admin/dashboard')
      router.refresh()
    } else {
      toast.error(result.error || 'Invalid credentials')
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-brand-green flex items-center justify-center p-6">
      <div className="max-w-md w-full space-y-12 bg-white p-12 shadow-2xl">
        <div className="text-center space-y-4">
          <h1 className="font-serif text-3xl tracking-[0.3em] text-brand-green uppercase">Mulaan</h1>
          <p className="text-[10px] tracking-widest text-brand-gold uppercase font-bold">Command Center</p>
        </div>

        <form onSubmit={handleLogin} className="space-y-8">
          <div className="space-y-2">
            <label className="text-[10px] tracking-widest uppercase text-gray-400">Email Address</label>
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full border-b border-brand-green/20 py-3 focus:outline-none focus:border-brand-gold transition-colors font-light"
              disabled={loading}
            />
          </div>

          <div className="space-y-2">
            <label className="text-[10px] tracking-widest uppercase text-gray-400">Security Key</label>
            <input
              type="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full border-b border-brand-green/20 py-3 focus:outline-none focus:border-brand-gold transition-colors"
              disabled={loading}
            />
          </div>

          <Button
            type="submit"
            variant="primary"
            className="w-full py-6 tracking-[0.4em] uppercase text-[11px]"
            disabled={loading}
          >
            {loading ? 'Verifying...' : 'Authenticate'}
          </Button>
        </form>
      </div>
    </div>
  )
}