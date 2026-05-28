const About = () => {
  return (
    <div className="min-h-screen py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-5xl md:text-6xl font-bold text-center text-gray-900 mb-12">
          About <span className="text-purple-600">FAAST</span>
        </h1>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center mb-16">
          <div>
            <p className="text-lg text-gray-700 mb-6">
              FAAST is a cinematic, editorial-grade platform dedicated to elevating Pakistan's emerging fashion ecosystem. 
              We bridge the gap between heritage craftsmanship and contemporary global fashion markets.
            </p>
            <p className="text-lg text-gray-700 mb-6">
              Our mission is to empower fashionpreneurs, artisans, and creative professionals by providing them with 
              the tools, connections, and visibility they need to thrive in the international fashion landscape.
            </p>
            <p className="text-lg text-gray-700">
              Through curated events, strategic partnerships, and a robust digital platform, we're building a community 
              that celebrates South Asian creative culture while maintaining investment-grade professional standards.
            </p>
          </div>
          <div className="bg-gradient-to-br from-purple-100 to-pink-100 rounded-lg p-8">
            <div className="text-center">
              <div className="text-6xl mb-4">🏛️</div>
              <h3 className="text-2xl font-semibold mb-3">Our Vision</h3>
              <p className="text-gray-700">
                To become the leading platform for fashion innovation in South Asia
              </p>
            </div>
          </div>
        </div>

        <div className="bg-gray-50 rounded-lg p-8 md:p-12">
          <h2 className="text-3xl font-bold text-center text-gray-900 mb-8">What We Offer</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="text-center">
              <div className="text-4xl mb-3">🎯</div>
              <h4 className="font-semibold mb-2">Curated Events</h4>
              <p className="text-gray-600 text-sm">Spotlight showcases and networking opportunities</p>
            </div>
            <div className="text-center">
              <div className="text-4xl mb-3">🤝</div>
              <h4 className="font-semibold mb-2">Strategic Partnerships</h4>
              <p className="text-gray-600 text-sm">Connect with brands and industry leaders</p>
            </div>
            <div className="text-center">
              <div className="text-4xl mb-3">📈</div>
              <h4 className="font-semibold mb-2">Business Growth</h4>
              <p className="text-gray-600 text-sm">Resources and support for fashionpreneurs</p>
            </div>
            <div className="text-center">
              <div className="text-4xl mb-3">🌟</div>
              <h4 className="font-semibold mb-2">Global Exposure</h4>
              <p className="text-gray-600 text-sm">International market access and visibility</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default About
