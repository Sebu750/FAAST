import { useState, useEffect } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { supabase } from '../lib/supabase'

const DesignerAuth = () => {
  const [mode, setMode] = useState<'login' | 'register' | 'forgot' | 'reset'>('login')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [fullName, setFullName] = useState('')
  const [brandName, setBrandName] = useState('')
  const [error, setError] = useState('')
  const [success, setSuccess] = useState('')
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate()

  useEffect(() => {
    const checkSession = async () => {
      const { data: { session } } = await supabase.auth.getSession()
      if (session) navigate('/designer/dashboard')
    }
    checkSession()
  }, [navigate])

  const handleForgotPassword = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true); setError(''); setSuccess('')
    try {
      const { error: resetError } = await supabase.auth.resetPasswordForEmail(email, {
        redirectTo: `${window.location.origin}/designer/auth?reset=true`,
      })
      if (resetError) throw resetError
      setSuccess('Password reset link sent! Check your email.')
    } catch (err: any) { setError(err.message || 'Failed to send reset link') }
    finally { setLoading(false) }
  }

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError('')
    try {
      const { error: loginError } = await supabase.auth.signInWithPassword({ email, password })
      if (loginError) throw loginError
      navigate('/designer/dashboard')
    } catch (err: any) {
      setError(err.message || 'Login failed')
    } finally {
      setLoading(false)
    }
  }

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError('')
    if (password !== confirmPassword) { setError('Passwords do not match'); setLoading(false); return }
    if (password.length < 8) { setError('Password must be at least 8 characters'); setLoading(false); return }
    try {
      const { data: authData, error: signUpError } = await supabase.auth.signUp({
        email, password,
        options: { data: { full_name: fullName, brand_name: brandName } },
      })
      if (signUpError) throw signUpError
      if (!authData.user) throw new Error('Failed to create account')
      if (!authData.session) {
        setError('Account created! Please check your email to confirm, then sign in.')
        setMode('login'); setLoading(false); return
      }
      const slug = brandName.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '')
      const { error: insertError } = await supabase.from('designers').insert({
        id: crypto.randomUUID(), auth_user_id: authData.user.id,
        name: fullName, brand: brandName, slug, status: 'approved', is_active: true,
      })
      if (insertError) throw insertError
      navigate('/designer/dashboard')
    } catch (err: any) {
      setError(err.message || 'Registration failed')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen relative overflow-hidden bg-neutral-900">
      {/* Full-screen fashion background */}
      <div className="absolute inset-0">
        <img
          src="https://images.unsplash.com/photo-1558618666-fcd25c85f82e?w=1920&q=80"
          alt=""
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black/30" />
      </div>

      {/* Top bar — minimal */}
      <div className="relative z-10 flex items-center justify-between px-6 sm:px-10 py-5">
        <Link to="/" className="text-white/80 hover:text-white transition-colors">
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 19l-7-7 7-7" />
          </svg>
        </Link>
        <Link to="/" className="text-base font-serif text-white tracking-[0.3em] hover:text-[#bb9457] transition-colors">
          ADORZIA
        </Link>
        <div className="w-5" />
      </div>

      {/* Auth Card */}
      <div className="relative z-10 flex items-center justify-center px-4 pb-12" style={{ minHeight: 'calc(100vh - 80px)' }}>
        <div className="w-full max-w-md bg-white rounded-sm shadow-2xl">
          <div className="px-8 sm:px-12 pt-10 pb-8">
            <h1 className="text-5xl sm:text-6xl font-serif text-neutral-900 tracking-tight mb-10">
              {mode === 'login' ? 'LOG IN' : mode === 'register' ? 'SIGN UP' : mode === 'forgot' ? 'RESET PASSWORD' : 'NEW PASSWORD'}
            </h1>

            {error && <p className="text-red-600 text-sm mb-6">{error}</p>}
            {success && <p className="text-green-600 text-sm mb-6">{success}</p>}

            {mode === 'forgot' ? (
              <form onSubmit={handleForgotPassword} className="space-y-8">
                <p className="text-neutral-500 text-sm leading-relaxed">Enter your email address and we'll send you a link to reset your password.</p>
                <div>
                  <label className="block text-[10px] uppercase tracking-[0.15em] text-neutral-500 font-medium mb-2">E-mail</label>
                  <input type="email" required value={email} onChange={(e) => setEmail(e.target.value)}
                    className="w-full border-b border-neutral-300 pb-2 text-neutral-900 text-base focus:outline-none focus:border-neutral-900 transition-colors bg-transparent" />
                </div>
                <button type="submit" disabled={loading}
                  className="w-full bg-black text-white py-4 text-xs uppercase tracking-[0.2em] font-semibold hover:bg-neutral-800 transition-colors disabled:opacity-50">
                  {loading ? 'Sending...' : 'Send Reset Link'}
                </button>
                <div className="text-center">
                  <button type="button" onClick={() => { setMode('login'); setError(''); setSuccess('') }}
                    className="text-neutral-500 text-sm underline underline-offset-4 hover:text-neutral-900 transition-colors">
                    Back to Log In
                  </button>
                </div>
              </form>
            ) : mode === 'login' ? (
              <form onSubmit={handleLogin} className="space-y-8">
                <div>
                  <label className="block text-[10px] uppercase tracking-[0.15em] text-neutral-500 font-medium mb-2">
                    E-mail
                  </label>
                  <input
                    type="email" required value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full border-b border-neutral-300 pb-2 text-neutral-900 text-base focus:outline-none focus:border-neutral-900 transition-colors bg-transparent placeholder:text-neutral-400"
                    placeholder=""
                  />
                </div>
                <div>
                  <label className="block text-[10px] uppercase tracking-[0.15em] text-neutral-500 font-medium mb-2">
                    Password
                  </label>
                  <input
                    type="password" required value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full border-b border-neutral-300 pb-2 text-neutral-900 text-base focus:outline-none focus:border-neutral-900 transition-colors bg-transparent placeholder:text-neutral-400"
                    placeholder=""
                  />
                </div>

                {error && (
                  <p className="text-red-600 text-sm">{error}</p>
                )}

                <button
                  type="submit" disabled={loading}
                  className="w-full bg-black text-white py-4 text-xs uppercase tracking-[0.2em] font-semibold hover:bg-neutral-800 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {loading ? 'Logging in...' : 'Login'}
                </button>

                <div className="text-center">
                  <button type="button" onClick={() => { setMode('forgot'); setError(''); setSuccess('') }}
                    className="text-neutral-500 text-sm underline underline-offset-4 hover:text-neutral-900 transition-colors">
                    Forgot your password?
                  </button>
                </div>
              </form>
            ) : (
              <form onSubmit={handleRegister} className="space-y-6">
                <div>
                  <label className="block text-[10px] uppercase tracking-[0.15em] text-neutral-500 font-medium mb-2">Full Name</label>
                  <input type="text" required value={fullName} onChange={(e) => setFullName(e.target.value)}
                    className="w-full border-b border-neutral-300 pb-2 text-neutral-900 text-base focus:outline-none focus:border-neutral-900 transition-colors bg-transparent" />
                </div>
                <div>
                  <label className="block text-[10px] uppercase tracking-[0.15em] text-neutral-500 font-medium mb-2">Brand Name</label>
                  <input type="text" required value={brandName} onChange={(e) => setBrandName(e.target.value)}
                    className="w-full border-b border-neutral-300 pb-2 text-neutral-900 text-base focus:outline-none focus:border-neutral-900 transition-colors bg-transparent" />
                </div>
                <div>
                  <label className="block text-[10px] uppercase tracking-[0.15em] text-neutral-500 font-medium mb-2">E-mail</label>
                  <input type="email" required value={email} onChange={(e) => setEmail(e.target.value)}
                    className="w-full border-b border-neutral-300 pb-2 text-neutral-900 text-base focus:outline-none focus:border-neutral-900 transition-colors bg-transparent" />
                </div>
                <div>
                  <label className="block text-[10px] uppercase tracking-[0.15em] text-neutral-500 font-medium mb-2">Password</label>
                  <input type="password" required value={password} onChange={(e) => setPassword(e.target.value)}
                    className="w-full border-b border-neutral-300 pb-2 text-neutral-900 text-base focus:outline-none focus:border-neutral-900 transition-colors bg-transparent" />
                </div>
                <div>
                  <label className="block text-[10px] uppercase tracking-[0.15em] text-neutral-500 font-medium mb-2">Confirm Password</label>
                  <input type="password" required value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)}
                    className="w-full border-b border-neutral-300 pb-2 text-neutral-900 text-base focus:outline-none focus:border-neutral-900 transition-colors bg-transparent" />
                </div>

                {error && <p className="text-red-600 text-sm">{error}</p>}

                <button type="submit" disabled={loading}
                  className="w-full bg-black text-white py-4 text-xs uppercase tracking-[0.2em] font-semibold hover:bg-neutral-800 transition-colors disabled:opacity-50 disabled:cursor-not-allowed">
                  {loading ? 'Creating Account...' : 'Sign Up'}
                </button>
              </form>
            )}
          </div>

          {/* Bottom bar */}
          {mode !== 'forgot' && (
          <div className="border-t border-neutral-200 px-8 sm:px-12 py-5 flex items-center justify-between">
            <span className="text-neutral-600 text-sm">
              {mode === 'login' ? "Don't have an account?" : 'Already have an account?'}
            </span>
            <button
              onClick={() => { setMode(mode === 'login' ? 'register' : 'login'); setError(''); setSuccess('') }}
              className="text-xs uppercase tracking-[0.15em] font-semibold text-neutral-900 border-b border-neutral-900 pb-0.5 hover:text-[#bb9457] hover:border-[#bb9457] transition-colors"
            >
              {mode === 'login' ? 'Sign Up' : 'Log In'}
            </button>
          </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default DesignerAuth
