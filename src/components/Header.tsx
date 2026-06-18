import { useState, useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import { Link } from 'react-router-dom'

const Header = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [isVisible, setIsVisible] = useState(true)
  const [lastScrollY, setLastScrollY] = useState(0)
  const location = useLocation()

  // Close mobile menu on route change
  useEffect(() => {
    setMobileMenuOpen(false)
  }, [location])

  // Prevent body scroll when menu is open
  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = 'unset'
    }
    return () => {
      document.body.style.overflow = 'unset'
    }
  }, [mobileMenuOpen])

  // Smart scroll behavior - hide on scroll down, show on scroll up
  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY
      
      if (currentScrollY < 50) {
        // Always show at top
        setIsVisible(true)
      } else if (currentScrollY > lastScrollY) {
        // Scrolling down - hide
        setIsVisible(false)
        setMobileMenuOpen(false)
      } else {
        // Scrolling up - show
        setIsVisible(true)
      }
      
      setLastScrollY(currentScrollY)
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [lastScrollY])

  return (
    <>
      {/* Skip to main content - keyboard accessibility */}
      <a href="#main-content" className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-[9999] focus:px-4 focus:py-2 focus:bg-[#bb9457] focus:text-black focus:text-sm focus:font-semibold">
        Skip to main content
      </a>
      <header 
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ease-in-out ${
          isVisible ? 'translate-y-0' : '-translate-y-full'
        } ${
          lastScrollY > 50 
            ? 'bg-neutral-950/90 backdrop-blur-xl border-b border-white/5 shadow-2xl shadow-black/50' 
            : 'bg-neutral-950 border-b border-neutral-900'
        }`}
      >
        <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3 sm:py-4">
          <div className="flex justify-between items-center">
            <Link to="/" className="text-lg sm:text-xl lg:text-2xl font-serif text-white tracking-[0.15em] hover:text-[#bb9457] transition-all duration-300">
              ADORZIA
            </Link>
            
            {/* Desktop Navigation */}
            <div className="hidden lg:flex items-center space-x-8 xl:space-x-10">
              {[{
                label: 'Home',
                path: '/'
              }, {
                label: 'About',
                path: '/about'
              }, {
                label: 'For Creatives',
                path: '/for-creatives'
              }, {
                label: 'For Partners',
                path: '/for-partners'
              }, {
                label: 'Spotlight',
                path: '/spotlight-event'
              }, {
                label: 'Marketplace',
                path: '/marketplace'
              }, {
                label: 'Contact',
                path: '/contact'
              }].map(({ label, path }) => (
                <Link 
                  key={path}
                  to={path} 
                  className={`relative text-sm tracking-wide transition-all duration-300 group ${
                    location.pathname === path 
                      ? 'text-white' 
                      : 'text-neutral-400 hover:text-white'
                  }`}
                >
                  {label}
                  <span className={`absolute -bottom-1 left-0 h-px bg-[#bb9457] transition-all duration-300 ${
                    location.pathname === path ? 'w-full' : 'w-0 group-hover:w-full'
                  }`} />
                </Link>
              ))}
              <Link to="/spotlight/apply" className="ml-6 px-6 py-2.5 bg-[#bb9457] text-black text-[10px] uppercase tracking-[0.2em] font-semibold hover:bg-white hover:text-black transition-all duration-300 rounded-sm">
                Apply Now
              </Link>
            </div>

            {/* Mobile Menu Button */}
            <button 
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden relative w-10 h-10 flex items-center justify-center text-white hover:text-[#bb9457] transition-all duration-300 rounded-sm hover:bg-white/5"
              aria-label={mobileMenuOpen ? 'Close menu' : 'Open menu'}
            >
              <div className="relative w-6 h-6">
                <span className={`absolute left-0 w-6 h-0.5 bg-current transition-all duration-300 ${mobileMenuOpen ? 'top-3 rotate-45' : 'top-1'}`} />
                <span className={`absolute left-0 top-3 w-6 h-0.5 bg-current transition-all duration-300 ${mobileMenuOpen ? 'opacity-0 translate-x-3' : 'opacity-100'}`} />
                <span className={`absolute left-0 w-6 h-0.5 bg-current transition-all duration-300 ${mobileMenuOpen ? 'top-3 -rotate-45' : 'top-5'}`} />
              </div>
            </button>
          </div>
        </nav>
      </header>

      {/* Mobile Navigation Overlay - Outside header for proper z-index */}
      <div 
        className={`lg:hidden fixed inset-0 z-[100] transition-all duration-500 ${
          mobileMenuOpen ? 'visible' : 'invisible'
        }`}
      >
        {/* Backdrop */}
        <div 
          className={`absolute inset-0 bg-neutral-950/98 backdrop-blur-xl transition-opacity duration-500 ${
            mobileMenuOpen ? 'opacity-100' : 'opacity-0'
          }`}
          onClick={() => setMobileMenuOpen(false)}
        />
        
        {/* Menu Panel */}
        <div 
          className={`relative h-full overflow-y-auto transition-transform duration-500 ease-out ${
            mobileMenuOpen ? 'translate-x-0' : 'translate-x-full'
          }`}
        >
          <div className="min-h-full px-6 py-8">
            {/* Navigation Links */}
            <div className="flex flex-col space-y-2 mb-8">
              {[
                { label: 'Home', path: '/', icon: 'M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6' },
                { label: 'About', path: '/about', icon: 'M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z' },
                { label: 'For Creatives', path: '/for-creatives', icon: 'M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z' },
                { label: 'For Partners', path: '/for-partners', icon: 'M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z' },
                { label: 'Spotlight', path: '/spotlight-event', icon: 'M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z' },
                { label: 'Marketplace', path: '/marketplace', icon: 'M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z' },
                { label: 'Contact', path: '/contact', icon: 'M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z' }
              ].map(({ label, path, icon }, idx) => (
                <Link 
                  key={path}
                  to={path} 
                  className={`group flex items-center gap-4 px-5 py-4 rounded-sm transition-all duration-300 ${
                    location.pathname === path 
                      ? 'bg-white/10 text-white border-l-2 border-[#bb9457]' 
                      : 'text-neutral-400 hover:text-white hover:bg-white/5 border-l-2 border-transparent'
                  }`}
                  onClick={() => setMobileMenuOpen(false)}
                  style={{ 
                    animationDelay: `${idx * 50}ms`,
                    transform: mobileMenuOpen ? 'translateX(0)' : 'translateX(20px)',
                    opacity: mobileMenuOpen ? 1 : 0,
                    transition: `all 0.4s ease-out ${idx * 50}ms`
                  }}
                >
                  <svg className={`w-5 h-5 transition-all duration-300 ${
                    location.pathname === path 
                      ? 'text-[#bb9457] scale-110' 
                      : 'text-neutral-600 group-hover:text-[#bb9457] group-hover:scale-105'
                  }`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d={icon} />
                  </svg>
                  <span className="text-lg font-light tracking-wide">{label}</span>
                  {location.pathname === path && (
                    <div className="ml-auto">
                      <svg className="w-4 h-4 text-[#bb9457]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                      </svg>
                    </div>
                  )}
                </Link>
              ))}
            </div>

            {/* CTA Button */}
            <div className="pt-6 border-t border-neutral-900">
              <Link 
                to="/spotlight/apply" 
                className="flex items-center justify-center gap-3 w-full px-6 py-4 bg-[#bb9457] text-black text-xs uppercase tracking-[0.2em] font-semibold hover:bg-white transition-all duration-300 rounded-sm group"
                onClick={() => setMobileMenuOpen(false)}
              >
                Apply Now
                <svg className="w-4 h-4 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </Link>
            </div>

            {/* Footer Info */}
            <div className="mt-8 pt-8 border-t border-neutral-900 text-center">
              <p className="text-neutral-600 text-xs font-light">Pakistan's Premier Fashion Platform</p>
              <div className="flex justify-center gap-6 mt-4">
                <a href="https://instagram.com/adorzia" target="_blank" rel="noopener noreferrer" className="text-neutral-600 hover:text-[#bb9457] transition-colors">
                  <span className="sr-only">Instagram</span>
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
                  </svg>
                </a>
                <a href="mailto:hello@adorzia.com" className="text-neutral-600 hover:text-[#bb9457] transition-colors">
                  <span className="sr-only">Email</span>
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default Header
