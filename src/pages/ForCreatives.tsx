const ForCreatives = () => {
  return (
    <div className="min-h-screen py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-5xl md:text-6xl font-bold text-center text-gray-900 mb-6">
          For <span className="text-purple-600">Creatives</span>
        </h1>
        <p className="text-xl text-center text-gray-700 mb-16 max-w-3xl mx-auto">
          Elevate your fashion brand with our curated platform designed for ambitious fashionpreneurs
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mb-16">
          <div className="bg-gradient-to-br from-purple-50 to-pink-50 rounded-lg p-8">
            <div className="text-5xl mb-4">🎨</div>
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Showcase Your Talent</h2>
            <p className="text-gray-700 mb-4">
              Present your collections to a global audience of buyers, investors, and fashion enthusiasts. 
              Our platform amplifies your heritage craftsmanship with editorial-grade presentation.
            </p>
            <ul className="space-y-2 text-gray-700">
              <li className="flex items-start">
                <span className="text-purple-600 mr-2">✓</span>
                Professional portfolio showcasing
              </li>
              <li className="flex items-start">
                <span className="text-purple-600 mr-2">✓</span>
                Direct access to industry partners
              </li>
              <li className="flex items-start">
                <span className="text-purple-600 mr-2">✓</span>
                Spotlight event participation
              </li>
            </ul>
          </div>

          <div className="bg-gradient-to-br from-blue-50 to-purple-50 rounded-lg p-8">
            <div className="text-5xl mb-4">📈</div>
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Grow Your Brand</h2>
            <p className="text-gray-700 mb-4">
              Access resources, mentorship, and business development tools tailored for South Asian 
              fashion entrepreneurs ready to scale internationally.
            </p>
            <ul className="space-y-2 text-gray-700">
              <li className="flex items-start">
                <span className="text-purple-600 mr-2">✓</span>
                Business strategy workshops
              </li>
              <li className="flex items-start">
                <span className="text-purple-600 mr-2">✓</span>
                Networking with industry leaders
              </li>
              <li className="flex items-start">
                <span className="text-purple-600 mr-2">✓</span>
                Market expansion support
              </li>
            </ul>
          </div>
        </div>

        <div className="bg-gray-900 text-white rounded-lg p-8 md:p-12 text-center">
          <h2 className="text-3xl font-bold mb-6">Ready to Elevate Your Brand?</h2>
          <p className="text-gray-300 mb-8 max-w-2xl mx-auto">
            Join our community of innovative fashionpreneurs and take your creativity to the global stage
          </p>
          <a href="/spotlight-event" className="inline-block bg-purple-600 text-white px-8 py-3 rounded-lg hover:bg-purple-700 transition-colors font-semibold">
            Apply for Spotlight Event
          </a>
        </div>
      </div>
    </div>
  )
}

export default ForCreatives
