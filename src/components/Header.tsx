import { Link } from 'react-router-dom'

const Header = () => {
  return (
    <header className="bg-white shadow-sm sticky top-0 z-50">
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
        <div className="flex justify-between items-center">
          <Link to="/" className="text-2xl font-bold text-gray-900">
            FAAST
          </Link>
          <div className="hidden md:flex space-x-8">
            <Link to="/" className="text-gray-700 hover:text-purple-600 transition-colors">
              Home
            </Link>
            <Link to="/about" className="text-gray-700 hover:text-purple-600 transition-colors">
              About
            </Link>
            <Link to="/for-creatives" className="text-gray-700 hover:text-purple-600 transition-colors">
              For Creatives
            </Link>
            <Link to="/for-partners" className="text-gray-700 hover:text-purple-600 transition-colors">
              For Partners
            </Link>
            <Link to="/spotlight-event" className="text-gray-700 hover:text-purple-600 transition-colors">
              Spotlight Event
            </Link>
            <Link to="/contact" className="text-gray-700 hover:text-purple-600 transition-colors">
              Contact
            </Link>
          </div>
          <button className="md:hidden text-gray-700">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
        </div>
      </nav>
    </header>
  )
}

export default Header
