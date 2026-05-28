const ForPartners = () => {
  return (
    <div className="min-h-screen py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-5xl md:text-6xl font-bold text-center text-gray-900 mb-6">
          For <span className="text-purple-600">Partners</span>
        </h1>
        <p className="text-xl text-center text-gray-700 mb-16 max-w-3xl mx-auto">
          Partner with Pakistan's most promising fashion talent and tap into emerging South Asian markets
        </p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
          <div className="bg-white shadow-lg rounded-lg p-8 border border-gray-200">
            <div className="text-5xl mb-4">🤝</div>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Brand Collaborations</h2>
            <p className="text-gray-700 mb-4">
              Connect with vetted fashionpreneurs for collaborative collections, 
              licensing opportunities, and co-branding initiatives.
            </p>
            <ul className="space-y-2 text-gray-600 text-sm">
              <li>• Access to curated talent pool</li>
              <li>• Heritage craftsmanship expertise</li>
              <li>• Investment-grade partnerships</li>
            </ul>
          </div>

          <div className="bg-white shadow-lg rounded-lg p-8 border border-gray-200">
            <div className="text-5xl mb-4">🎯</div>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Event Sponsorship</h2>
            <p className="text-gray-700 mb-4">
              Sponsor our Spotlight Events and gain visibility among top-tier 
              fashion professionals and industry decision-makers.
            </p>
            <ul className="space-y-2 text-gray-600 text-sm">
              <li>• Premium brand positioning</li>
              <li>• Direct audience engagement</li>
              <li>• Media coverage & PR</li>
            </ul>
          </div>

          <div className="bg-white shadow-lg rounded-lg p-8 border border-gray-200">
            <div className="text-5xl mb-4">🌍</div>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Market Access</h2>
            <p className="text-gray-700 mb-4">
              Leverage our platform to enter or expand in the South Asian 
              fashion market with local expertise and networks.
            </p>
            <ul className="space-y-2 text-gray-600 text-sm">
              <li>• Local market intelligence</li>
              <li>• Artisan network access</li>
              <li>• Regulatory guidance</li>
            </ul>
          </div>
        </div>

        <div className="bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-lg p-8 md:p-12">
          <div className="text-center">
            <h2 className="text-3xl font-bold mb-6">Become a Partner</h2>
            <p className="text-gray-100 mb-8 max-w-2xl mx-auto">
              Join our ecosystem and unlock unprecedented access to Pakistan's vibrant fashion industry
            </p>
            <a href="/contact" className="inline-block bg-white text-purple-600 px-8 py-3 rounded-lg hover:bg-gray-100 transition-colors font-semibold">
              Submit Partnership Inquiry
            </a>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ForPartners
