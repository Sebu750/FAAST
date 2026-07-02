import { Link } from 'react-router-dom'

const Footer = () => {
  return (
    <footer className="relative overflow-hidden bg-black">
      
      {/* Cinematic Background */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_bottom_left,rgba(187,148,87,0.04),transparent_50%)] pointer-events-none" />

      {/* Main Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 sm:py-28 md:py-32">
        <div className="text-center">
          <p className="font-serif text-3xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-white tracking-tight">
            Where Visionaries Rise<span className="text-[#bb9457]">.</span>
          </p>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="relative z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 sm:py-5 flex flex-col sm:flex-row items-center justify-between gap-3 text-[9px] sm:text-[10px] uppercase tracking-[0.15em] sm:tracking-[0.2em] text-neutral-600">
          <div className="text-center sm:text-left">
            © {new Date().getFullYear()} Adorzia. All rights reserved.
          </div>
          <div className="flex gap-x-4 sm:gap-x-6 items-center text-neutral-500">
            <Link to="/legal/privacy" className="hover:text-[#bb9457] transition-colors duration-300">
              Privacy Policy
            </Link>
            <Link to="/legal/terms" className="hover:text-[#bb9457] transition-colors duration-300">
              Terms & Conditions
            </Link>
            <Link to="/legal/spotlight-terms" className="hover:text-[#bb9457] transition-colors duration-300">
              Spotlight Terms
            </Link>
            <Link to="/admin/login" className="hover:text-[#bb9457] transition-colors duration-300">
              ___
            </Link>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer