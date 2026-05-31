import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { supabase } from '../lib/supabase'

const AdminLogin = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate()

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError('')

    try {
      const { error: loginError } = await supabase.auth.signInWithPassword({
        email,
        password,
      })

      if (loginError) throw loginError

      navigate('/admin/dashboard')
    } catch (err: any) {
      setError(err.message || 'Login failed')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-neutral-950 relative overflow-hidden">
      {/* Subtle Background Gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-neutral-950 via-neutral-900 to-neutral-950" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-[#bb9457]/5 via-transparent to-transparent" />
      
      <div className="relative z-10 max-w-md w-full mx-4">
        {/* Logo & Header */}
        <div className="text-center mb-8">
          <div className="inline-block mb-6">
            <div className="w-16 h-16 mx-auto border-2 border-[#bb9457] rounded-full flex items-center justify-center bg-[#bb9457]/10">
              <span className="text-[#bb9457] text-3xl font-serif font-bold">A</span>
            </div>
          </div>
          <h1 className="text-4xl md:text-5xl font-serif text-white font-normal tracking-tight mb-3">
            Admin <span className="text-[#bb9457] italic font-light">Console</span>
          </h1>
          <p className="text-neutral-500 text-sm uppercase tracking-[0.2em] font-light">
            Adorzia Management Portal
          </p>
        </div>

        {/* Login Form */}
        <div className="bg-neutral-900/80 backdrop-blur-sm border border-neutral-800 rounded-sm p-8 shadow-2xl">
          <form onSubmit={handleLogin} className="space-y-6">
            <div className="space-y-5">
              <div>
                <label htmlFor="email" className="block text-xs uppercase tracking-widest text-neutral-400 font-semibold mb-3">
                  Email Address
                </label>
                <input
                  id="email"
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full px-4 py-3.5 bg-neutral-950 border border-neutral-700 text-white rounded-sm focus:outline-none focus:border-[#bb9457] focus:ring-1 focus:ring-[#bb9457] transition-all duration-300 placeholder-neutral-600"
                  placeholder="admin@adorzia.com"
                />
              </div>

              <div>
                <label htmlFor="password" className="block text-xs uppercase tracking-widest text-neutral-400 font-semibold mb-3">
                  Password
                </label>
                <input
                  id="password"
                  type="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full px-4 py-3.5 bg-neutral-950 border border-neutral-700 text-white rounded-sm focus:outline-none focus:border-[#bb9457] focus:ring-1 focus:ring-[#bb9457] transition-all duration-300 placeholder-neutral-600"
                  placeholder="••••••••"
                />
              </div>
            </div>

            {error && (
              <div className="bg-red-950/30 border border-red-800/50 rounded-sm p-4">
                <p className="text-red-400 text-sm text-center">{error}</p>
              </div>
            )}

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-[#bb9457] text-black py-4 rounded-sm font-semibold uppercase tracking-[0.15em] text-sm hover:bg-[#c9a468] transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed hover:shadow-lg hover:shadow-[#bb9457]/20"
            >
              {loading ? (
                <span className="flex items-center justify-center gap-2">
                  <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                  </svg>
                  Signing In...
                </span>
              ) : (
                'Sign In'
              )}
            </button>
          </form>

          {/* Footer */}
          <div className="mt-6 pt-6 border-t border-neutral-800">
            <p className="text-neutral-600 text-xs text-center">
              Authorized personnel only
            </p>
          </div>
        </div>

        {/* Security Note */}
        <div className="mt-6 text-center">
          <p className="text-neutral-700 text-xs font-light">
            Secured by Supabase Authentication
          </p>
        </div>
      </div>
    </div>
  )
}

export default AdminLogin
