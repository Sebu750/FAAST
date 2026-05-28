import { useState } from 'react'
import { supabase } from '../lib/supabase'

const SpotlightEvent = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    brand_name: '',
    portfolio_url: '',
    description: ''
  })
  const [submitting, setSubmitting] = useState(false)
  const [submitted, setSubmitted] = useState(false)
  const [error, setError] = useState('')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setSubmitting(true)
    setError('')

    try {
      const { error: supabaseError } = await supabase
        .from('spotlight_applications')
        .insert([formData])

      if (supabaseError) throw supabaseError

      setSubmitted(true)
      setFormData({ name: '', email: '', brand_name: '', portfolio_url: '', description: '' })
    } catch (err) {
      setError('Failed to submit application. Please try again.')
      console.error(err)
    } finally {
      setSubmitting(false)
    }
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  if (submitted) {
    return (
      <div className="min-h-screen py-20 flex items-center justify-center">
        <div className="max-w-2xl mx-auto px-4 text-center">
          <div className="text-6xl mb-6">✨</div>
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Application Submitted!</h1>
          <p className="text-xl text-gray-700 mb-8">
            Thank you for applying to our Spotlight Event. We'll review your application and get back to you soon.
          </p>
          <button
            onClick={() => setSubmitted(false)}
            className="bg-purple-600 text-white px-8 py-3 rounded-lg hover:bg-purple-700 transition-colors font-semibold"
          >
            Submit Another Application
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen py-20">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-5xl md:text-6xl font-bold text-center text-gray-900 mb-6">
          Spotlight <span className="text-purple-600">Event</span>
        </h1>
        <p className="text-xl text-center text-gray-700 mb-12">
          Showcase your brand at our exclusive fashion showcase event
        </p>

        <div className="bg-white shadow-xl rounded-lg p-8 md:p-12">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
                Full Name *
              </label>
              <input
                type="text"
                id="name"
                name="name"
                required
                value={formData.name}
                onChange={handleChange}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                placeholder="Your full name"
              />
            </div>

            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                Email Address *
              </label>
              <input
                type="email"
                id="email"
                name="email"
                required
                value={formData.email}
                onChange={handleChange}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                placeholder="your@email.com"
              />
            </div>

            <div>
              <label htmlFor="brand_name" className="block text-sm font-medium text-gray-700 mb-2">
                Brand Name *
              </label>
              <input
                type="text"
                id="brand_name"
                name="brand_name"
                required
                value={formData.brand_name}
                onChange={handleChange}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                placeholder="Your fashion brand"
              />
            </div>

            <div>
              <label htmlFor="portfolio_url" className="block text-sm font-medium text-gray-700 mb-2">
                Portfolio URL
              </label>
              <input
                type="url"
                id="portfolio_url"
                name="portfolio_url"
                value={formData.portfolio_url}
                onChange={handleChange}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                placeholder="https://your-portfolio.com"
              />
            </div>

            <div>
              <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-2">
                Tell Us About Your Brand *
              </label>
              <textarea
                id="description"
                name="description"
                required
                rows={5}
                value={formData.description}
                onChange={handleChange}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                placeholder="Describe your brand, collections, and what makes you unique..."
              />
            </div>

            {error && (
              <div className="text-red-600 text-sm">{error}</div>
            )}

            <button
              type="submit"
              disabled={submitting}
              className="w-full bg-purple-600 text-white py-3 rounded-lg hover:bg-purple-700 transition-colors font-semibold disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {submitting ? 'Submitting...' : 'Submit Application'}
            </button>
          </form>
        </div>
      </div>
    </div>
  )
}

export default SpotlightEvent
