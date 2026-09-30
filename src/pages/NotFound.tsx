import { Link } from 'react-router-dom'
import SEO from '../components/SEO'

const NotFound = () => {
  return (
    <div className="min-h-screen bg-black text-neutral-100 flex items-center justify-center">
      <SEO
        title="Page Not Found - Adorzia"
        description="The page you're looking for doesn't exist."
        canonicalURL="https://adorzia.com/404"
        noindex
      />
      <div className="text-center px-6 max-w-lg">
        {/* Large 404 */}
        <div className="font-serif text-[120px] sm:text-[160px] leading-none text-transparent bg-clip-text bg-gradient-to-b from-[#bb9457]/30 to-[#bb9457]/5 select-none">
          404
        </div>

        {/* Message */}
        <h1 className="font-serif text-2xl sm:text-3xl text-white mt-4 mb-4 tracking-tight">
          Page Not Found
        </h1>
        <p className="text-neutral-500 text-sm leading-relaxed mb-10 max-w-sm mx-auto">
          The page you're looking for may have been moved, or doesn't exist. Here are some helpful links instead.
        </p>

        {/* Navigation links */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-3 mb-12">
          <Link
            to="/"
            className="px-6 py-3 bg-[#bb9457] text-black font-semibold uppercase tracking-[0.2em] text-[10px] rounded-sm hover:bg-white transition-all duration-300"
          >
            Home
          </Link>
          <Link
            to="/designers"
            className="px-6 py-3 border border-neutral-800 text-neutral-300 font-semibold uppercase tracking-[0.2em] text-[10px] rounded-sm hover:border-[#bb9457] hover:text-[#bb9457] transition-all duration-300"
          >
            Designers
          </Link>
          <Link
            to="/blog"
            className="px-6 py-3 border border-neutral-800 text-neutral-300 font-semibold uppercase tracking-[0.2em] text-[10px] rounded-sm hover:border-[#bb9457] hover:text-[#bb9457] transition-all duration-300"
          >
            Journal
          </Link>
          <Link
            to="/contact"
            className="px-6 py-3 border border-neutral-800 text-neutral-300 font-semibold uppercase tracking-[0.2em] text-[10px] rounded-sm hover:border-[#bb9457] hover:text-[#bb9457] transition-all duration-300"
          >
            Contact
          </Link>
        </div>

        {/* Search suggestion */}
        <div className="border-t border-neutral-900 pt-8">
          <p className="text-[10px] uppercase tracking-[0.2em] text-neutral-600 font-mono mb-3">Looking for something?</p>
          <div className="flex flex-wrap items-center justify-center gap-x-4 gap-y-2 text-sm text-neutral-500">
            <Link to="/fashionpreneurship" className="hover:text-[#bb9457] transition-colors">Fashionpreneurship</Link>
            <span className="text-neutral-800">|</span>
            <Link to="/marketplace" className="hover:text-[#bb9457] transition-colors">Marketplace</Link>
            <span className="text-neutral-800">|</span>
            <Link to="/for-partners" className="hover:text-[#bb9457] transition-colors">Partners</Link>
            <span className="text-neutral-800">|</span>
            <Link to="/about" className="hover:text-[#bb9457] transition-colors">About</Link>
          </div>
        </div>
      </div>
    </div>
  )
}

export default NotFound
