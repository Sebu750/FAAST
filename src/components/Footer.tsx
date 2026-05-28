import { Link } from 'react-router-dom'

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <h3 className="text-xl font-bold mb-4">FAAST</h3>
            <p className="text-gray-400">
              A curated platform for fashionpreneurs and heritage craftsmanship
            </p>
          </div>
          <div>
            <h4 className="font-semibold mb-4">Quick Links</h4>
            <ul className="space-y-2">
              <li><Link to="/" className="text-gray-400 hover:text-white transition-colors">Home</Link></li>
              <li><Link to="/about" className="text-gray-400 hover:text-white transition-colors">About</Link></li>
              <li><Link to="/for-creatives" className="text-gray-400 hover:text-white transition-colors">For Creatives</Link></li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold mb-4">Engage</h4>
            <ul className="space-y-2">
              <li><Link to="/for-partners" className="text-gray-400 hover:text-white transition-colors">For Partners</Link></li>
              <li><Link to="/spotlight-event" className="text-gray-400 hover:text-white transition-colors">Spotlight Event</Link></li>
              <li><Link to="/contact" className="text-gray-400 hover:text-white transition-colors">Contact</Link></li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold mb-4">Stay Updated</h4>
            <p className="text-gray-400 text-sm mb-4">Subscribe to our newsletter</p>
            <Link to="/contact" className="text-purple-400 hover:text-purple-300 transition-colors">
              Subscribe Now →
            </Link>
          </div>
        </div>
        <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
          <p>&copy; {new Date().getFullYear()} FAAST. All rights reserved.</p>
        </div>
      </div>
    </footer>
  )
}

export default Footer
