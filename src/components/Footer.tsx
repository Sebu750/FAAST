import { useState } from 'react'
import { Link } from 'react-router-dom'
import { supabase } from '../lib/supabase'

const Footer = () => {
  const [email, setEmail] = useState('')
  const [subscribing, setSubscribing] = useState(false)
  const [subscribed, setSubscribed] = useState(false)
  const [error, setError] = useState('')

  const handleSubscribe = async (e: React.FormEvent) => {
    e.preventDefault()
    setSubscribing(true)
    setError('')

    try {
      const { error: supabaseError } = await supabase
        .from('newsletter_subscriptions')
        .insert([{ email }])

      if (supabaseError) {
        if (supabaseError.code === '23505') {
          setError('Email already subscribed')
        } else {
          throw supabaseError
        }
        return
      }

      setSubscribed(true)
      setEmail('')
      setTimeout(() => setSubscribed(false), 5000)
    } catch (err) {
      setError('Failed to subscribe. Please try again.')
      console.error(err)
    } finally {
      setSubscribing(false)
    }
  }
  return (
    <footer className="relative overflow-hidden border-t border-neutral-900 bg-black text-neutral-400 mt-24">
      
      {/* ========================= CINEMATIC BACKGROUND CANVAS START ========================= */}
      {/* Dynamic Animated Ambient Glow Layer */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_bottom_left,rgba(187,148,87,0.06),transparent_50%)] pointer-events-none z-0 animate-[ambientBreathe_15s_ease-in-out_infinite_alternate]" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(0,0,0,0.8),transparent_70%)] pointer-events-none z-0" />
      
      {/* Structural Fine Alignment Vector Overlay */}
      <div className="absolute inset-0 opacity-[0.03] pointer-events-none z-0 mix-blend-screen">
        <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern id="footer-architecture" width="80" height="80" patternUnits="userSpaceOnUse">
              <path 
                d="M 40 0 L 80 40 L 40 80 L 0 40 Z" 
                fill="none" 
                stroke="#bb9457" 
                strokeWidth="0.5" 
              />
              <line x1="40" y1="0" x2="40" y2="80" stroke="#bb9457" strokeWidth="0.25" />
              <line x1="0" y1="40" x2="80" y2="40" stroke="#bb9457" strokeWidth="0.25" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#footer-architecture)" />
        </svg>
      </div>

      {/* Top Border Accent Laser Line */}
      <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-[#bb9457]/20 to-transparent z-10" />
      {/* ========================= CINEMATIC BACKGROUND CANVAS END ========================= */}

      {/* Main Grid Interface */}
      <div className="relative z-10 mx-auto max-w-7xl px-6 md:px-10 py-16 grid gap-12 sm:grid-cols-2 md:grid-cols-12">
        
        {/* Brand Core Manifesto Pillar */}
        <div className="md:col-span-12 lg:col-span-4 flex flex-col justify-between gap-4">
          <div>
            <div className="font-serif text-2xl tracking-[0.25em] uppercase text-white font-normal cursor-default">
              FAAST<span className="text-[#bb9457] italic font-light">.</span>
            </div>
            <p className="mt-4 text-xs text-neutral-500 max-w-sm leading-relaxed font-light">
              Engineered physical production atelier clusters, sovereign validation programs, and digital multi-channel commerce pathways for independent fashion houses.
            </p>
          </div>
        </div>

        {/* Navigation Deck: Column 1 */}
        <div className="sm:col-span-1 md:col-span-3 lg:col-span-2 lg:col-start-6">
          <div className="text-[10px] uppercase tracking-[0.3em] text-[#bb9457] font-semibold font-mono mb-4">
            Architecture
          </div>
          <ul className="space-y-3 text-xs font-light text-neutral-400">
            {["Home", "About", "For Creatives", "For Partners", "Spotlight Event"].map((item) => (
              <li key={item}>
                <Link 
                  to={item === "Home" ? "/" : `/${item.toLowerCase().replace(/\s+/g, "-")}`} 
                  className="transition-all duration-300 hover:text-white tracking-wide block hover:translate-x-0.5 transform"
                >
                  {item}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Navigation Deck: Column 2 */}
        <div className="sm:col-span-1 md:col-span-3 lg:col-span-2">
          <div className="text-[10px] uppercase tracking-[0.3em] text-[#bb9457] font-semibold font-mono mb-4">
            Governance
          </div>
          <ul className="space-y-3 text-xs font-light text-neutral-400">
            <li>
              <Link to="/contact" className="transition-all duration-300 hover:text-white tracking-wide block hover:translate-x-0.5 transform">
                Contact Inquiry
              </Link>
            </li>
            <li>
              <a href="https://instagram.com" target="_blank" rel="noreferrer" className="transition-all duration-300 hover:text-white tracking-wide block hover:translate-x-0.5 transform">
                Instagram Intel
              </a>
            </li>
            <li>
              <a href="https://linkedin.com" target="_blank" rel="noreferrer" className="transition-all duration-300 hover:text-white tracking-wide block hover:translate-x-0.5 transform">
                LinkedIn Portal
              </a>
            </li>
            <li>
              <Link to="/admin/login" className="text-neutral-700 text-[10px] font-mono transition-colors duration-300 hover:text-[#bb9457] block pt-2">
                System Console // Admin
              </Link>
            </li>
          </ul>
        </div>

        {/* Ecosystem Footprint Block */}
        <div className="sm:col-span-2 md:col-span-6 lg:col-span-4">
          <div className="text-[10px] uppercase tracking-[0.3em] text-[#bb9457] font-semibold font-mono mb-4">
            Operational Footprint
          </div>
          <p className="text-xs text-neutral-500 leading-relaxed font-light mb-4">
            Karachi Atelier Complex · Lahore Node · Islamabad Hub
          </p>
          <div className="h-[1px] w-full bg-gradient-to-r from-neutral-900 via-[#bb9457]/20 to-transparent" />
        </div>

        {/* Newsletter Subscription Block */}
        <div className="sm:col-span-2 md:col-span-12 lg:col-span-4 lg:col-start-9">
          <div className="text-[10px] uppercase tracking-[0.3em] text-[#bb9457] font-semibold font-mono mb-4">
            Intelligence Feed // Newsletter
          </div>
          <p className="text-xs text-neutral-500 leading-relaxed font-light mb-4">
            Receive sovereign updates on Spotlight cohorts, marketplace launches, and atelier innovations.
          </p>
          
          {subscribed ? (
            <div className="p-4 border border-[#bb9457]/30 bg-[#bb9457]/5 rounded-sm">
              <p className="text-xs text-[#bb9457] font-light">
                ✓ Intelligence feed activated. Expect sovereign updates.
              </p>
            </div>
          ) : (
            <form onSubmit={handleSubscribe} className="space-y-3">
              <div className="flex gap-2">
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="your@email.com"
                  className="flex-1 bg-neutral-900 border border-neutral-800 px-4 py-3 text-xs text-white placeholder-neutral-600 focus:border-[#bb9457] focus:outline-none transition-colors rounded-sm"
                />
                <button
                  type="submit"
                  disabled={subscribing}
                  className="px-6 py-3 bg-[#bb9457] text-black text-[10px] uppercase tracking-[0.2em] font-semibold hover:bg-white transition-colors disabled:opacity-50 rounded-sm whitespace-nowrap"
                >
                  {subscribing ? 'Activating...' : 'Subscribe'}
                </button>
              </div>
              {error && (
                <p className="text-xs text-red-400 font-light">{error}</p>
              )}
            </form>
          )}
        </div>

      </div>

      {/* Sub-Footer Base Interface */}
      <div className="border-t border-neutral-900 bg-neutral-950/50 relative z-10">
        <div className="mx-auto max-w-7xl px-6 md:px-10 py-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-[9px] uppercase tracking-[0.3em] text-neutral-600 font-mono">
          <div>
            © {new Date().getFullYear()} FAAST Architectural Systems. Sovereign rights retained.
          </div>
          <div className="flex gap-x-4 items-center text-neutral-500">
            <span className="hover:text-[#bb9457] transition-colors duration-300 cursor-default">Atelier Facility</span>
            <span className="text-neutral-800 font-sans">·</span>
            <span className="hover:text-[#bb9457] transition-colors duration-300 cursor-default">Marketplace Engine</span>
            <span className="text-neutral-800 font-sans">·</span>
            <span className="hover:text-[#bb9457] transition-colors duration-300 cursor-default">Sovereign Spotlight</span>
          </div>
        </div>
      </div>

      {/* Inline Injection for Fluid Breathing Track */}
      <style>{`
        @keyframes ambientBreathe {
          0% { transform: scale(1) translate(0px, 0px); opacity: 0.6; }
          100% { transform: scale(1.03) translate(6px, -3px); opacity: 0.9; }
        }
      `}</style>
    </footer>
  )
}

export default Footer