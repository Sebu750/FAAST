import { Link } from 'react-router-dom'

const Footer = () => {
  return (
    <footer className="relative overflow-hidden border-t border-neutral-900 bg-black text-neutral-400">
      
      {/* Cinematic Background */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_bottom_left,rgba(187,148,87,0.04),transparent_50%)] pointer-events-none" />
      <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-[#bb9457]/20 to-transparent" />

      {/* Main Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-12">
          
          {/* Brand */}
          <div className="md:col-span-4 lg:col-span-4">
            <div className="font-serif text-2xl tracking-[0.2em] text-white mb-3">
              ADORZIA<span className="text-[#bb9457]">.</span>
            </div>
            <p className="text-xs text-neutral-500 leading-relaxed font-light max-w-xs">
              Pakistan's first fashion entrepreneurship ecosystem. Studios, marketplace, and spotlight for the next generation of fashion visionaries.
            </p>
          </div>

          {/* Navigation */}
          <div className="md:col-span-2 lg:col-span-2">
            <div className="text-[10px] uppercase tracking-[0.25em] text-[#bb9457] font-semibold mb-4">
              Navigate
            </div>
            <ul className="space-y-2.5 text-xs font-light">
              {[
                { label: 'Home', path: '/' },
                { label: 'About', path: '/about' },
                { label: 'For Creatives', path: '/for-creatives' },
                { label: 'For Partners', path: '/for-partners' },
              ].map(({ label, path }) => (
                <li key={path}>
                  <Link 
                    to={path} 
                    className="transition-all duration-300 hover:text-white hover:translate-x-0.5 inline-block"
                  >
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Programs */}
          <div className="md:col-span-2 lg:col-span-2">
            <div className="text-[10px] uppercase tracking-[0.25em] text-[#bb9457] font-semibold mb-4">
              Programs
            </div>
            <ul className="space-y-2.5 text-xs font-light">
              {[
                { label: 'Spotlight', path: '/spotlight-event' },
                { label: 'Marketplace', path: '/marketplace' },
                { label: 'Contact', path: '/contact' },
              ].map(({ label, path }) => (
                <li key={path}>
                  <Link 
                    to={path} 
                    className="transition-all duration-300 hover:text-white hover:translate-x-0.5 inline-block"
                  >
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Studios */}
          <div className="md:col-span-4 lg:col-span-4">
            <div className="text-[10px] uppercase tracking-[0.25em] text-[#bb9457] font-semibold mb-4">
              Studios
            </div>
            <div className="space-y-2 text-xs font-light text-neutral-500">
              <p>Lahore · Islamabad · Karachi</p>
              <p className="text-[10px] text-neutral-600">Opening 2026</p>
            </div>
            
            {/* Social Links */}
            <div className="mt-6 pt-6 border-t border-neutral-900">
              <div className="text-[10px] uppercase tracking-[0.25em] text-[#bb9457] font-semibold mb-4">
                Follow
              </div>
              <div className="flex gap-4">
                {[
                  { name: 'Instagram', url: 'https://instagram.com' },
                  { name: 'LinkedIn', url: 'https://linkedin.com' },
                  { name: 'TikTok', url: 'https://tiktok.com' },
                  { name: 'Facebook', url: 'https://facebook.com' },
                ].map(({ name, url }) => (
                  <a 
                    key={name}
                    href={url} 
                    target="_blank" 
                    rel="noreferrer"
                    className="text-neutral-500 hover:text-[#bb9457] transition-colors duration-300 text-xs"
                    aria-label={name}
                  >
                    {name}
                  </a>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-neutral-900 relative z-10">
        <div className="max-w-7xl mx-auto px-6 lg:px-8 py-5 flex flex-col sm:flex-row items-center justify-between gap-3 text-[10px] uppercase tracking-[0.2em] text-neutral-600">
          <div>
            © {new Date().getFullYear()} Adorzia. All rights reserved.
          </div>
          <div className="flex gap-x-4 items-center text-neutral-500">
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