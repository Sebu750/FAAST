import { useState, useEffect } from 'react'
import { Link, useLocation } from 'react-router-dom'

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
    <header 
      className={`fixed top-[44px] left-0 right-0 z-50 transition-all duration-500 ease-in-out ${
        isVisible ? 'translate-y-0' : '-translate-y-full'
      } ${
        lastScrollY > 50 
          ? 'bg-neutral-950/80 backdrop-blur-xl border-b border-white/5 shadow-2xl shadow-black/50' 
          : 'bg-neutral-950 border-b border-neutral-900'
      }`}
    >
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 sm:py-5">
        <div className="flex justify-between items-center">
          <Link to="/" className="text-xl sm:text-2xl font-serif text-white tracking-[0.15em] hover:text-[#bb9457] transition-all duration-300">
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
            <Link to="/contact" className="ml-6 px-6 py-2.5 border border-[#bb9457]/60 text-[#bb9457] text-[10px] uppercase tracking-[0.2em] hover:bg-[#bb9457] hover:text-black hover:border-[#bb9457] transition-all duration-300">
              Get in Touch
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button 
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden text-white hover:text-[#bb9457] transition-colors p-2 -mr-2"
            aria-label={mobileMenuOpen ? 'Close menu' : 'Open menu'}
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              {mobileMenuOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>
      </nav>

      {/* Mobile Navigation Overlay */}
      {mobileMenuOpen && (
        <div 
          className="lg:hidden fixed inset-0 top-[116px] bg-neutral-950/98 backdrop-blur-xl z-40 overflow-y-auto animate-fadeIn"
          onClick={() => setMobileMenuOpen(false)}
        >
          <div className="px-6 py-8" onClick={(e) => e.stopPropagation()}>
            <div className="flex flex-col space-y-0">
              {[{ label: 'Home', path: '/' }, { label: 'About', path: '/about' }, { label: 'For Creatives', path: '/for-creatives' }, { label: 'For Partners', path: '/for-partners' }, { label: 'Spotlight', path: '/spotlight-event' }, { label: 'Marketplace', path: '/marketplace' }, { label: 'Contact', path: '/contact' }].map(({ label, path }) => (
                <Link 
                  key={path}
                  to={path} 
                  className={`text-lg py-4 border-b border-neutral-900/50 transition-all duration-300 ${
                    location.pathname === path ? 'text-white' : 'text-neutral-400 hover:text-white'
                  }`}
                  onClick={() => setMobileMenuOpen(false)}
                >
                  {label}
                </Link>
              ))}
              <Link 
                to="/contact" 
                className="mt-8 px-6 py-4 bg-[#bb9457] text-black text-xs uppercase tracking-[0.2em] text-center hover:bg-white transition-all duration-300"
                onClick={() => setMobileMenuOpen(false)}
              >
                Get in Touch
              </Link>
            </div>
          </div>
        </div>
      )}
    </header>
  )
}

export default Header
