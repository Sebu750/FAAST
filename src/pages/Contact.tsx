import { useState } from 'react'
import { supabase } from '../lib/supabase'
import { sendEmailNotification } from '../lib/email'
import SEO from '../components/SEO'
import Breadcrumb from '../components/Breadcrumb'

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    role: '',
    subject: '',
    message: ''
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
        .from('contact_inquiries')
        .insert([
          {
            name: formData.name,
            email: formData.email,
            message: `Phone: ${formData.phone || 'Not provided'}\nRole: ${formData.role}\nSubject: ${formData.subject}\n\n${formData.message}`
          }
        ])

      if (supabaseError) throw supabaseError

      await sendEmailNotification('contact', {
        name: formData.name,
        email: formData.email,
        subject: formData.subject,
        message: formData.message
      })

      setSubmitted(true)
      setFormData({ name: '', email: '', phone: '', role: '', subject: '', message: '' })
    } catch {
      setError('Failed to send message. Please try again.')
    } finally {
      setSubmitting(false)
    }
  }

  const inputClasses = "w-full border border-neutral-800 bg-neutral-900/50 rounded-sm px-4 py-3.5 text-white text-sm outline-none focus:border-[#bb9457] focus:ring-1 focus:ring-[#bb9457]/20 hover:border-neutral-700 transition-all duration-300 placeholder:text-neutral-600"

  return (
    <div className="min-h-screen bg-neutral-950 text-white">
      <SEO
        title="Contact Adorzia"
        description="Get in touch with Adorzia. Whether you're a designer, emerging brand, institution, investor, or potential partner, we'd love to hear from you."
        canonicalURL="https://adorzia.com/contact"
        ogTitle="Contact Adorzia"
        ogDescription="Let's build what's next in fashion."
        ogImageAlt="Contact Adorzia"
        schemaType="ContactPage"
        schema={{
          "@context": "https://schema.org",
          "@type": "ContactPage",
          "name": "Contact Adorzia",
          "description": "Get in touch with Adorzia for designer, brand, institution, investor and partnership enquiries.",
          "url": "https://adorzia.com/contact",
          "email": "hello@adorzia.com"
        }}
      />
      <Breadcrumb currentPage="Contact" />

      <style>{`
        @keyframes contactFadeUp {
          from { opacity: 0; transform: translateY(30px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .contact-animate { animation: contactFadeUp 0.7s ease-out forwards; }
        .contact-animate-d1 { animation: contactFadeUp 0.7s ease-out 0.15s forwards; opacity: 0; }
        .contact-animate-d2 { animation: contactFadeUp 0.7s ease-out 0.3s forwards; opacity: 0; }
        .contact-animate-d3 { animation: contactFadeUp 0.7s ease-out 0.45s forwards; opacity: 0; }
        .text-gradient {
          background: linear-gradient(135deg, #bb9457 0%, #d4af37 50%, #bb9457 100%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
        }
      `}</style>

      {/* Hero */}
      <section className="relative pt-32 pb-16 md:pt-40 md:pb-24 overflow-hidden">
        {/* Subtle radial glow */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none" aria-hidden="true" style={{ contain: 'layout paint' }}>
          <div className="absolute top-20 left-1/2 -translate-x-1/2 w-[600px] h-[600px] bg-[#bb9457]/[0.03] rounded-full blur-3xl" />
        </div>

        <div className="relative z-10 max-w-3xl mx-auto px-6 text-center">
          <div className="contact-animate">
            <span className="inline-flex items-center gap-2.5 px-4 py-2 rounded-full border border-[#bb9457]/20 bg-[#bb9457]/[0.04] text-[10px] uppercase tracking-[0.3em] text-[#bb9457] font-mono font-semibold mb-8">
              <span className="w-1.5 h-1.5 rounded-full bg-[#bb9457] animate-pulse" />
              Get in touch
            </span>
          </div>

          <h1 className="contact-animate-d1 font-serif text-4xl md:text-5xl lg:text-6xl text-white font-normal tracking-tight leading-[1.1]">
            Let's Build What's Next in <span className="text-gradient italic">Fashion.</span>
          </h1>

          <p className="contact-animate-d2 mt-7 text-neutral-400 font-light text-base md:text-lg leading-relaxed max-w-2xl mx-auto">
            Whether you're a designer, emerging brand, institution, manufacturer, investor, or potential partner — we'd love to hear from you.
          </p>
        </div>
      </section>

      {/* Contact Form */}
      <section className="pb-24 md:pb-32">
        <div className="max-w-2xl mx-auto px-6">
          <div className="contact-animate-d3">
            {/* Form card */}
            <div className="relative p-8 md:p-10 border border-neutral-800/80 rounded-sm bg-neutral-900/30 backdrop-blur-sm">
              {/* Top accent line */}
              <div className="absolute top-0 left-8 right-8 h-px bg-gradient-to-r from-transparent via-[#bb9457]/30 to-transparent" />

              <h2 className="font-serif text-2xl md:text-3xl text-white font-normal tracking-tight text-center mb-2">
                Get in Touch
              </h2>
              <p className="text-neutral-400 font-light text-sm text-center mb-10">
                We respond to every message personally.
              </p>

              {submitted ? (
                <div className="py-12 text-center">
                  <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-[#bb9457]/10 border border-[#bb9457]/30 mb-6">
                    <svg className="w-7 h-7 text-[#bb9457]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <p className="text-white font-light text-lg mb-2">
                    Thank you for reaching out.
                  </p>
                  <p className="text-neutral-400 font-light text-sm mb-8">
                    We'll get back to you as soon as possible.
                  </p>
                  <button onClick={() => setSubmitted(false)} className="px-6 py-3 border border-[#bb9457]/40 text-[#bb9457] text-[10px] uppercase tracking-[0.2em] rounded-sm hover:bg-[#bb9457] hover:text-black transition-all duration-300">
                    Send another message
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-5">
                  <div className="grid sm:grid-cols-2 gap-5">
                    <div>
                      <label className="text-[10px] uppercase tracking-[0.25em] text-neutral-400 font-semibold block mb-2">Name *</label>
                      <input type="text" required value={formData.name} onChange={(e) => setFormData({ ...formData, name: e.target.value })} className={inputClasses} placeholder="Your name" />
                    </div>
                    <div>
                      <label className="text-[10px] uppercase tracking-[0.25em] text-neutral-400 font-semibold block mb-2">Email *</label>
                      <input type="email" required value={formData.email} onChange={(e) => setFormData({ ...formData, email: e.target.value })} className={inputClasses} placeholder="your@email.com" />
                    </div>
                  </div>

                  <div className="grid sm:grid-cols-2 gap-5">
                    <div>
                      <label className="text-[10px] uppercase tracking-[0.25em] text-neutral-400 font-semibold block mb-2">Phone</label>
                      <input type="tel" value={formData.phone} onChange={(e) => setFormData({ ...formData, phone: e.target.value })} className={inputClasses} placeholder="+92 XXX XXXXXXX" />
                    </div>
                    <div>
                      <label htmlFor="role" className="text-[10px] uppercase tracking-[0.25em] text-neutral-400 font-semibold block mb-2">I am a *</label>
                      <select id="role" aria-label="I am a" required value={formData.role} onChange={(e) => setFormData({ ...formData, role: e.target.value })} className={`${inputClasses} cursor-pointer`}>
                        <option value="" className="bg-neutral-900">Select an option</option>
                        <option value="Designer" className="bg-neutral-900">Designer</option>
                        <option value="Brand" className="bg-neutral-900">Brand</option>
                        <option value="Institution" className="bg-neutral-900">Institution</option>
                        <option value="Partner" className="bg-neutral-900">Partner</option>
                        <option value="Investor" className="bg-neutral-900">Investor</option>
                        <option value="Other" className="bg-neutral-900">Other</option>
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="text-[10px] uppercase tracking-[0.25em] text-neutral-400 font-semibold block mb-2">Subject *</label>
                    <input type="text" required value={formData.subject} onChange={(e) => setFormData({ ...formData, subject: e.target.value })} className={inputClasses} placeholder="What is this about?" />
                  </div>

                  <div>
                    <label className="text-[10px] uppercase tracking-[0.25em] text-neutral-400 font-semibold block mb-2">Message *</label>
                    <textarea required rows={5} value={formData.message} onChange={(e) => setFormData({ ...formData, message: e.target.value })} className={`${inputClasses} resize-none`} placeholder="Tell us what's on your mind..." />
                  </div>

                  {error && (
                    <div className="flex items-center gap-3 p-4 bg-red-500/10 border border-red-500/20 rounded-sm text-red-400 text-sm">
                      <svg className="w-4 h-4 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v2m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                      {error}
                    </div>
                  )}

                  <button
                    type="submit"
                    disabled={submitting}
                    className="group w-full bg-[#bb9457] text-black py-4 text-[11px] uppercase tracking-[0.25em] font-semibold hover:bg-white transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed rounded-sm inline-flex items-center justify-center gap-2"
                  >
                    {submitting ? (
                      <>
                        <svg className="animate-spin w-4 h-4" fill="none" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                        </svg>
                        Sending...
                      </>
                    ) : (
                      <>
                        Send Inquiry
                        <svg className="w-4 h-4 transform group-hover:translate-x-0.5 transition-transform duration-300" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                          <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                        </svg>
                      </>
                    )}
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Direct Contact */}
      <section className="py-20 md:py-28 border-t border-neutral-900">
        <div className="max-w-3xl mx-auto px-6">
          <div className="text-center mb-14">
            <h2 className="font-serif text-2xl md:text-3xl text-white font-normal tracking-tight">
              Direct Contact
            </h2>
            <div className="mt-3 w-10 h-px bg-[#bb9457]/40 mx-auto" />
          </div>

          <div className="grid sm:grid-cols-3 gap-8">
            {/* Email */}
            <div className="group text-center p-6 border border-neutral-800/60 rounded-sm bg-neutral-900/20 hover:border-[#bb9457]/30 transition-all duration-500">
              <div className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-[#bb9457]/10 border border-[#bb9457]/20 mb-4 group-hover:bg-[#bb9457]/15 transition-colors duration-500">
                <svg className="w-4 h-4 text-[#bb9457]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.934l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.917a2.25 2.25 0 01-1.07-1.934V6.75" />
                </svg>
              </div>
              <p className="text-neutral-400 text-[10px] uppercase tracking-[0.25em] font-semibold mb-2">Email</p>
              <a href="mailto:hello@adorzia.com" className="text-[#bb9457] hover:text-white transition-colors duration-300 text-sm font-light">hello@adorzia.com</a>
            </div>

            {/* Social */}
            <div className="group text-center p-6 border border-neutral-800/60 rounded-sm bg-neutral-900/20 hover:border-[#bb9457]/30 transition-all duration-500">
              <div className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-[#bb9457]/10 border border-[#bb9457]/20 mb-4 group-hover:bg-[#bb9457]/15 transition-colors duration-500">
                <svg className="w-4 h-4 text-[#bb9457]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M18 18.72a9.094 9.094 0 003.741-.479 3 3 0 00-4.682-2.72m.94 3.198l.001.031c0 .225-.012.447-.037.666A11.944 11.944 0 0112 21c-2.17 0-4.207-.576-5.963-1.584A6.062 6.062 0 016 18.719m12 0a5.971 5.971 0 00-.941-3.197m0 0A5.995 5.995 0 0012 12.75a5.995 5.995 0 00-5.058 2.772m0 0a3 3 0 00-4.681 2.72 8.986 8.986 0 003.74.477m.94-3.197a5.971 5.971 0 00-.94 3.197M15 6.75a3 3 0 11-6 0 3 3 0 016 0zm6 3a2.25 2.25 0 11-4.5 0 2.25 2.25 0 014.5 0zm-13.5 0a2.25 2.25 0 11-4.5 0 2.25 2.25 0 014.5 0z" />
                </svg>
              </div>
              <p className="text-neutral-400 text-[10px] uppercase tracking-[0.25em] font-semibold mb-2">Social</p>
              <div className="flex items-center justify-center gap-3">
                <a href="https://instagram.com/adorzia" target="_blank" rel="noopener noreferrer" className="text-[#bb9457] hover:text-white transition-colors duration-300 text-sm font-light">Instagram</a>
                <span className="text-neutral-700 text-xs">·</span>
                <a href="https://linkedin.com/company/adorzia" target="_blank" rel="noopener noreferrer" className="text-[#bb9457] hover:text-white transition-colors duration-300 text-sm font-light">LinkedIn</a>
              </div>
            </div>

            {/* Location */}
            <div className="group text-center p-6 border border-neutral-800/60 rounded-sm bg-neutral-900/20 hover:border-[#bb9457]/30 transition-all duration-500">
              <div className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-[#bb9457]/10 border border-[#bb9457]/20 mb-4 group-hover:bg-[#bb9457]/15 transition-colors duration-500">
                <svg className="w-4 h-4 text-[#bb9457]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z" />
                </svg>
              </div>
              <p className="text-neutral-400 text-[10px] uppercase tracking-[0.25em] font-semibold mb-2">Location</p>
              <p className="text-white text-sm font-light">Pakistan — <span className="text-neutral-400">Working globally</span></p>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}

export default Contact
