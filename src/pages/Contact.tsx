import { useState } from 'react'
import { supabase } from '../lib/supabase'

const Contact = () => {
  const [contactForm, setContactForm] = useState({
    name: '',
    email: '',
    message: ''
  })
  const [newsletterEmail, setNewsletterEmail] = useState('')
  const [contactSubmitting, setContactSubmitting] = useState(false)
  const [newsletterSubmitting, setNewsletterSubmitting] = useState(false)
  const [contactSubmitted, setContactSubmitted] = useState(false)
  const [newsletterSubmitted, setNewsletterSubmitted] = useState(false)
  const [error, setError] = useState('')

  const handleContactSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setContactSubmitting(true)
    setError('')

    try {
      const { error: supabaseError } = await supabase
        .from('contact_inquiries')
        .insert([contactForm])

      if (supabaseError) throw supabaseError

      setContactSubmitted(true)
      setContactForm({ name: '', email: '', message: '' })
    } catch (err) {
      setError('Failed to send message. Please try again.')
      console.error(err)
    } finally {
      setContactSubmitting(false)
    }
  }

  const handleNewsletterSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setNewsletterSubmitting(true)
    setError('')

    try {
      const { error: supabaseError } = await supabase
        .from('newsletter_subscriptions')
        .insert([{ email: newsletterEmail }])

      if (supabaseError) throw supabaseError

      setNewsletterSubmitted(true)
      setNewsletterEmail('')
    } catch (err) {
      setError('Failed to subscribe. Please try again.')
      console.error(err)
    } finally {
      setNewsletterSubmitting(false)
    }
  }

  return (
    <div className="min-h-screen py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-5xl md:text-6xl font-bold text-center text-gray-900 mb-12">
          Get in <span className="text-purple-600">Touch</span>
        </h1>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          {/* Contact Form */}
          <div className="bg-white shadow-xl rounded-lg p-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Send Us a Message</h2>
            
            {contactSubmitted ? (
              <div className="text-center py-8">
                <div className="text-5xl mb-4">✓</div>
                <p className="text-xl text-gray-700">Message sent successfully!</p>
                <button
                  onClick={() => setContactSubmitted(false)}
                  className="mt-4 text-purple-600 hover:text-purple-700 font-semibold"
                >
                  Send another message
                </button>
              </div>
            ) : (
              <form onSubmit={handleContactSubmit} className="space-y-4">
                <div>
                  <label htmlFor="contact-name" className="block text-sm font-medium text-gray-700 mb-2">
                    Name *
                  </label>
                  <input
                    type="text"
                    id="contact-name"
                    required
                    value={contactForm.name}
                    onChange={(e) => setContactForm({ ...contactForm, name: e.target.value })}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                    placeholder="Your name"
                  />
                </div>

                <div>
                  <label htmlFor="contact-email" className="block text-sm font-medium text-gray-700 mb-2">
                    Email *
                  </label>
                  <input
                    type="email"
                    id="contact-email"
                    required
                    value={contactForm.email}
                    onChange={(e) => setContactForm({ ...contactForm, email: e.target.value })}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                    placeholder="your@email.com"
                  />
                </div>

                <div>
                  <label htmlFor="contact-message" className="block text-sm font-medium text-gray-700 mb-2">
                    Message *
                  </label>
                  <textarea
                    id="contact-message"
                    required
                    rows={5}
                    value={contactForm.message}
                    onChange={(e) => setContactForm({ ...contactForm, message: e.target.value })}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                    placeholder="How can we help you?"
                  />
                </div>

                {error && <div className="text-red-600 text-sm">{error}</div>}

                <button
                  type="submit"
                  disabled={contactSubmitting}
                  className="w-full bg-purple-600 text-white py-3 rounded-lg hover:bg-purple-700 transition-colors font-semibold disabled:opacity-50"
                >
                  {contactSubmitting ? 'Sending...' : 'Send Message'}
                </button>
              </form>
            )}
          </div>

          {/* Newsletter Subscription */}
          <div className="space-y-8">
            <div className="bg-gradient-to-br from-purple-600 to-pink-600 text-white shadow-xl rounded-lg p-8">
              <h2 className="text-2xl font-bold mb-4">Subscribe to Our Newsletter</h2>
              <p className="text-gray-100 mb-6">
                Stay updated with the latest fashion events, opportunities, and industry insights
              </p>
              
              {newsletterSubmitted ? (
                <div className="text-center py-4">
                  <div className="text-4xl mb-2">✓</div>
                  <p className="text-lg">Successfully subscribed!</p>
                  <button
                    onClick={() => setNewsletterSubmitted(false)}
                    className="mt-2 text-white underline"
                  >
                    Subscribe another email
                  </button>
                </div>
              ) : (
                <form onSubmit={handleNewsletterSubmit} className="space-y-4">
                  <input
                    type="email"
                    required
                    value={newsletterEmail}
                    onChange={(e) => setNewsletterEmail(e.target.value)}
                    className="w-full px-4 py-3 rounded-lg text-gray-900 focus:ring-2 focus:ring-white focus:border-transparent"
                    placeholder="your@email.com"
                  />
                  <button
                    type="submit"
                    disabled={newsletterSubmitting}
                    className="w-full bg-white text-purple-600 py-3 rounded-lg hover:bg-gray-100 transition-colors font-semibold disabled:opacity-50"
                  >
                    {newsletterSubmitting ? 'Subscribing...' : 'Subscribe'}
                  </button>
                </form>
              )}
            </div>

            <div className="bg-gray-50 rounded-lg p-8">
              <h3 className="text-xl font-bold text-gray-900 mb-4">Partnership Inquiries</h3>
              <p className="text-gray-700 mb-4">
                Interested in partnering with FAAST? We'd love to hear from you.
              </p>
              <a
                href="/contact"
                className="inline-block bg-purple-600 text-white px-6 py-2 rounded-lg hover:bg-purple-700 transition-colors font-semibold"
              >
                Submit Partnership Inquiry
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Contact
