const Home = () => {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-purple-50 to-white py-20 md:py-32">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-5xl md:text-7xl font-bold text-gray-900 mb-6">
            Welcome to <span className="text-purple-600">FAAST</span>
          </h1>
          <p className="text-xl md:text-2xl text-gray-700 mb-8 max-w-3xl mx-auto">
            Pakistan's premier curated platform connecting fashionpreneurs with global opportunities
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a href="/for-creatives" className="bg-purple-600 text-white px-8 py-3 rounded-lg hover:bg-purple-700 transition-colors font-semibold">
              For Creatives
            </a>
            <a href="/for-partners" className="bg-white text-purple-600 px-8 py-3 rounded-lg border-2 border-purple-600 hover:bg-purple-50 transition-colors font-semibold">
              For Partners
            </a>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-4xl font-bold text-center text-gray-900 mb-16">Why Choose FAAST?</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="p-6 bg-gray-50 rounded-lg">
              <div className="text-4xl mb-4">🎨</div>
              <h3 className="text-2xl font-semibold mb-3">Heritage Craftsmanship</h3>
              <p className="text-gray-600">Celebrating Pakistan's rich textile heritage and artisan networks</p>
            </div>
            <div className="p-6 bg-gray-50 rounded-lg">
              <div className="text-4xl mb-4">🌍</div>
              <h3 className="text-2xl font-semibold mb-3">Global Reach</h3>
              <p className="text-gray-600">Connect with international fashion markets and opportunities</p>
            </div>
            <div className="p-6 bg-gray-50 rounded-lg">
              <div className="text-4xl mb-4">✨</div>
              <h3 className="text-2xl font-semibold mb-3">Curated Platform</h3>
              <p className="text-gray-600">Investment-grade platform for serious fashion professionals</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}

export default Home
