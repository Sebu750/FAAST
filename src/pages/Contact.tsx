import { useState } from 'react'
import { supabase } from '../lib/supabase'
import { sendEmailNotification } from '../lib/email'
import SEO from '../components/SEO'
import studio from '../assets/studio.webp'
import craft from '../assets/craft.webp'
import designer1 from '../assets/designer-1.webp'
import designer2 from '../assets/designer-2.webp'

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    role: '',
    message: '',
    heard_from: '',
    newsletter: false
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
        .insert([
          {
            name: formData.name,
            email: formData.email,
            message: `${formData.subject ? 'Subject: ' + formData.subject + '\n' : ''}Role: ${formData.role}\nHeard from: ${formData.heard_from}\nNewsletter: ${formData.newsletter ? 'Yes' : 'No'}\n\n${formData.message}`
          }
        ])

      if (supabaseError) throw supabaseError

      // Send email notification
      await sendEmailNotification('contact', {
        name: formData.name,
        email: formData.email,
        subject: formData.subject,
        message: formData.message
      })

      setContactSubmitted(true)
      setFormData({ name: '', email: '', subject: '', role: '', message: '', heard_from: '', newsletter: false })
    } catch (err) {
      setError('Failed to send message. Please try again.')
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

      // Send email notification
      await sendEmailNotification('newsletter', {
        email: newsletterEmail
      })

      setNewsletterSubmitted(true)
      setNewsletterEmail('')
    } catch (err: any) {
      // Check if it's a duplicate email error
      if (err?.code === '23505') {
        setError('This email is already subscribed to our newsletter.')
      } else {
        setError('Failed to subscribe. Please try again.')
      }
    } finally {
      setNewsletterSubmitting(false)
    }
  }

  return (
    <div className="min-h-screen bg-neutral-950 text-white">
      <SEO
        title="Contact Adorzia - Studios, Marketplace, Spotlight and Investment Enquiries"
        description="Get in touch with Adorzia for creative membership, marketplace applications, Spotlight 2026 submissions, investment enquiries and press requests. Studios in Lahore, Islamabad and Karachi. We respond to every message personally within three working days."
        canonicalURL="https://adorzia.com/contact"
        ogTitle="Contact Adorzia - We Answer Every Message Personally"
        ogDescription="Creatives, investors, press and partners - find the right door and write to us. Three working day response guaranteed."
        ogImageAlt="Contact Adorzia - Pakistani fashion ecosystem team"
        schemaType="ContactPage"
        schema={{
          "@context": "https://schema.org",
          "@type": "ContactPage",
          "name": "Contact Adorzia",
          "description": "Get in touch with Adorzia for creative membership, marketplace applications, Spotlight 2026 submissions, investment enquiries and press requests.",
          "url": "https://adorzia.com/contact"
        }}
        localBusinessSchema={[
          {
            "@context": "https://schema.org",
            "@type": "LocalBusiness",
            "name": "Adorzia Studio Lahore",
            "description": "Adorzia fashion coworking studio in Lahore - Pakistan's cultural capital and creative hub.",
            "email": "lahore@adorzia.com",
            "address": {
              "@type": "PostalAddress",
              "addressLocality": "Lahore",
              "addressRegion": "Punjab",
              "addressCountry": "PK"
            },
            "openingHours": "Coming 2026"
          },
          {
            "@context": "https://schema.org",
            "@type": "LocalBusiness",
            "name": "Adorzia Studio Islamabad",
            "description": "Adorzia fashion coworking studio in Islamabad - Capital city creative professional hub.",
            "email": "islamabad@adorzia.com",
            "address": {
              "@type": "PostalAddress",
              "addressLocality": "Islamabad",
              "addressRegion": "Islamabad Capital Territory",
              "addressCountry": "PK"
            },
            "openingHours": "Coming 2026"
          },
          {
            "@context": "https://schema.org",
            "@type": "LocalBusiness",
            "name": "Adorzia Studio Karachi",
            "description": "Adorzia fashion coworking studio in Karachi - Pakistan's largest city and commercial engine.",
            "email": "karachi@adorzia.com",
            "address": {
              "@type": "PostalAddress",
              "addressLocality": "Karachi",
              "addressRegion": "Sindh",
              "addressCountry": "PK"
            },
            "openingHours": "Coming 2026"
          }
        ]}
        keywords="contact Adorzia Pakistan, Adorzia Lahore, Adorzia Karachi, Adorzia Islamabad, Adorzia email, Spotlight application contact, creatives@adorzia.com, investors@adorzia.com, press@adorzia.com, hello@adorzia.com, spotlight@adorzia.com, fashion studio Lahore, fashion studio Islamabad, fashion studio Karachi"
      />

      <style>{`
        @keyframes ambientSwell {
          0%, 100% { transform: scale(1.02) translate(0px, 0px); }
          50% { transform: scale(1.06) translate(4px, -3px); }
        }
        .animate-ambient-swell { animation: ambientSwell 20s infinite ease-in-out; }
        
        @keyframes fadeUp {
          from { opacity: 0; transform: translateY(40px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-fade-up { animation: fadeUp 0.8s ease-out forwards; }
        .animate-fade-up-delay-1 { animation: fadeUp 0.8s ease-out 0.2s forwards; opacity: 0; }
        .animate-fade-up-delay-2 { animation: fadeUp 0.8s ease-out 0.4s forwards; opacity: 0; }
        .animate-fade-up-delay-3 { animation: fadeUp 0.8s ease-out 0.6s forwards; opacity: 0; }
      `}</style>

      {/* Hero Section with Full Banner */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img src={designer1} alt="" className="w-full h-full object-cover scale-110 animate-ambient-swell"  loading="lazy" decoding="async" />
          <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/60 to-neutral-950" />
          <div className="absolute inset-0 bg-black/30" />
        </div>
        
        {/* Cinematic overlays */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_left,rgba(187,148,87,0.25),transparent_60%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_right,rgba(187,148,87,0.15),transparent_50%)]" />
        
        {/* Floating elements */}
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-[#bb9457]/5 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 right-1/4 w-64 h-64 bg-[#bb9457]/5 rounded-full blur-3xl" style={{ animationDelay: '2s' }} />

        <div className="relative z-10 max-w-6xl mx-auto px-6 lg:px-8 py-32">
          <div className="animate-fade-up">
            <span className="inline-flex items-center gap-3 px-6 py-3 rounded-full border border-[#bb9457]/30 bg-black/30 backdrop-blur-sm text-[10px] uppercase tracking-[0.3em] text-[#bb9457] font-mono font-semibold">
              <span className="w-2 h-2 rounded-full bg-[#bb9457]" />
              Get in touch
            </span>
          </div>

          <h1 className="mt-8 font-serif text-5xl md:text-7xl lg:text-8xl text-white font-normal leading-[1.05] tracking-tight max-w-5xl animate-fade-up-delay-1">
            Every conversation at Adorzia starts with a real person.
          </h1>

          <div className="mt-8 max-w-3xl space-y-6 text-neutral-300 font-light text-base md:text-lg leading-relaxed animate-fade-up-delay-2">
            <p>
              We are a small team building something large. That means when you write to us, someone who actually works here reads it, thinks about it, and writes back. No automated responses. No ticket numbers. No holding pattern.
            </p>
            <p>
              Whether you are a creative looking for your next step, an investor who wants to understand what we are building, a journalist covering Pakistani fashion, or someone who just wants to know more - there is a door here with your name on it.
            </p>
          </div>
          
          <div className="mt-8 flex items-center gap-4 animate-fade-up-delay-3">
            <div className="px-6 py-3 rounded-full border border-[#bb9457]/40 bg-[#bb9457]/10 backdrop-blur-sm">
              <p className="text-white font-normal text-sm">
                <span className="text-[#bb9457] font-semibold">3-day response guaranteed</span>
              </p>
            </div>
          </div>
        </div>
        
        {/* Scroll indicator */}
        <div className="absolute bottom-10 left-1/2 transform -translate-x-1/2 animate-bounce">
          <div className="w-6 h-10 border-2 border-[#bb9457]/50 rounded-full flex items-start justify-center p-2">
            <div className="w-1 h-2 bg-[#bb9457] rounded-full animate-pulse" />
          </div>
        </div>
      </section>

      {/* Four Contact Paths */}
      <section className="py-40 relative overflow-hidden border-t border-neutral-900">
        <div className="absolute inset-0 opacity-10">
          <img src={designer2} alt="" className="w-full h-full object-cover grayscale animate-ambient-swell"  loading="lazy" decoding="async" />
        </div>
        <div className="absolute inset-0 bg-gradient-to-b from-neutral-950 via-neutral-950/98 to-neutral-950" />
        
        <div className="max-w-7xl mx-auto px-6 lg:px-8 relative z-10">
          <div className="text-center max-w-4xl mx-auto mb-20">
            <span className="inline-flex items-center gap-3 px-6 py-3 rounded-full border border-[#bb9457]/20 bg-neutral-950/50 text-[10px] uppercase tracking-[0.3em] text-[#bb9457] font-mono font-semibold">
              How can we help you
            </span>
            <h2 className="mt-8 font-serif text-4xl md:text-6xl text-white font-normal tracking-tight">
              Tell us who you are and we will make sure the right person at Adorzia hears from you.
            </h2>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            {[
              {
                title: "For creatives",
                label: "Designers, makers, craft entrepreneurs",
                body: "Whether you want to join a studio, apply to list on the marketplace, submit for Spotlight 2026, or just find out where you fit in the Adorzia ecosystem - this is where that conversation starts.",
                email: "creatives@adorzia.com",
                cta: "Write to our creatives team",
                image: designer2
              },
              {
                title: "For investors",
                label: "Investors, institutional partners, corporate sponsors",
                body: "If you are interested in investing in Adorzia, co-investing in Spotlight-backed brands, sponsoring the Spotlight event, or exploring a strategic partnership - we want to hear from you before our first event.",
                email: "investors@adorzia.com",
                cta: "Write to our investment team",
                image: studio
              },
              {
                title: "For press",
                label: "Journalists, editors, content creators, documentary makers",
                body: "Adorzia is a story worth telling - and we are committed to working openly with press and media who want to cover the Pakistani fashion entrepreneurship movement we are building. Interview requests, press access, and media partnerships all start here.",
                email: "press@adorzia.com",
                cta: "Write to our press team",
                image: craft
              },
              {
                title: "General enquiries",
                label: "Everything else",
                body: "Not sure which category you fall into? Write to us anyway. We will figure it out together. No enquiry is too small and no question is too early in the process.",
                email: "hello@adorzia.com",
                cta: "Send a general message",
                image: designer1
              }
            ].map((path, i) => (
              <div key={i} className="group relative border border-neutral-900 rounded-sm bg-neutral-950/50 backdrop-blur-sm overflow-hidden hover:border-[#bb9457]/40 transition-all duration-500 hover:shadow-2xl hover:shadow-[#bb9457]/5">
                {/* Top accent line */}
                <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-[#bb9457]/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                
                {/* Image section */}
                <div className="aspect-[16/9] overflow-hidden relative">
                  <img src={path.image} alt="" className="w-full h-full object-cover grayscale contrast-125 group-hover:scale-110 transition-transform duration-700"  loading="lazy" decoding="async" />
                  <div className="absolute inset-0 bg-gradient-to-t from-neutral-950 via-transparent to-transparent" />
                </div>
                
                {/* Content section */}
                <div className="p-10">
                  <div className="text-[10px] uppercase tracking-[0.2em] text-[#bb9457] font-mono font-semibold mb-3">{path.label}</div>
                  <h3 className="font-serif text-3xl text-white font-normal mb-4">{path.title}</h3>
                  <p className="text-neutral-400 font-light leading-relaxed mb-8 text-base">{path.body}</p>
                  
                  {/* Email */}
                  <a href={`mailto:${path.email}`} className="inline-flex items-center gap-2 text-[#bb9457] font-light text-sm mb-6 hover:text-white transition-colors duration-300 group-hover:translate-x-1">
                    <span className="w-1 h-1 rounded-full bg-[#bb9457]" />
                    {path.email}
                  </a>
                  
                  {/* CTA Button */}
                  <a href={`mailto:${path.email}`} className="inline-flex items-center gap-3 px-8 py-4 border border-[#bb9457]/40 text-[#bb9457] text-[10px] uppercase tracking-[0.2em] rounded-sm hover:bg-[#bb9457] hover:text-black transition-all duration-300 transform hover:-translate-y-0.5 hover:shadow-lg hover:shadow-[#bb9457]/20">
                    {path.cta}
                    <span className="transform group-hover:translate-x-1 transition-transform duration-300">→</span>
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Form */}
      <section className="py-40 relative overflow-hidden border-t border-neutral-900">
        <div className="absolute inset-0 z-0">
          <img src={designer2} alt="" className="w-full h-full object-cover scale-105"  loading="lazy" decoding="async" />
          <div className="absolute inset-0 bg-gradient-to-r from-neutral-950/97 via-neutral-950/92 to-neutral-950/97" />
        </div>
        
        {/* Cinematic overlays */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(187,148,87,0.12),transparent_70%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(187,148,87,0.08),transparent_50%)]" />
        
        <div className="max-w-5xl mx-auto px-6 lg:px-8 relative z-10">
          <div className="text-center mb-20">
            <span className="inline-flex items-center gap-3 px-6 py-3 rounded-full border border-[#bb9457]/20 bg-neutral-950/50 text-[10px] uppercase tracking-[0.3em] text-[#bb9457] font-mono font-semibold">
              Send us a message
            </span>
            <h2 className="mt-8 font-serif text-4xl md:text-6xl text-white font-normal tracking-tight">
              We are listening.
            </h2>
            <p className="mt-6 text-neutral-400 font-light text-base md:text-lg leading-relaxed max-w-3xl mx-auto">
              Use this form for any enquiry. We will route your message to the right person and respond within three working days. For Spotlight applications please use the dedicated application form on the Spotlight page.
            </p>
          </div>

          {contactSubmitted ? (
            <div className="p-12 border border-[#bb9457]/40 rounded-sm bg-neutral-950/80 backdrop-blur-sm text-center shadow-2xl shadow-[#bb9457]/5">
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-[#bb9457]/10 border border-[#bb9457]/30 mb-6">
                <span className="text-3xl">✓</span>
              </div>
              <p className="text-white font-light text-lg mb-4">
                Thank you for reaching out. Your message has arrived with us and a real person will read it and respond within three working days.
              </p>
              <p className="text-neutral-400 font-light text-sm">
                If your enquiry is urgent please write directly to hello@adorzia.com with the word urgent in your subject line.
              </p>
              <button onClick={() => setContactSubmitted(false)} className="mt-8 px-8 py-4 border border-[#bb9457]/40 text-[#bb9457] text-[10px] uppercase tracking-[0.2em] rounded-sm hover:bg-[#bb9457] hover:text-black transition-all duration-300">
                Send another message
              </button>
            </div>
          ) : (
            <form onSubmit={handleContactSubmit} className="space-y-12 p-12 border border-neutral-900 rounded-sm bg-neutral-950/60 backdrop-blur-sm">
              <div className="grid md:grid-cols-2 gap-10">
                <div>
                  <label className="text-[10px] uppercase tracking-[0.25em] text-neutral-400 font-semibold block mb-3">Full name *</label>
                  <input type="text" required value={formData.name} onChange={(e) => setFormData({ ...formData, name: e.target.value })} className="w-full border-b-2 border-neutral-800 bg-transparent py-4 text-white outline-none focus:border-[#bb9457] transition-all duration-300" placeholder="Your full name" />
                </div>
                <div>
                  <label className="text-[10px] uppercase tracking-[0.25em] text-neutral-400 font-semibold block mb-3">Email address *</label>
                  <input type="email" required value={formData.email} onChange={(e) => setFormData({ ...formData, email: e.target.value })} className="w-full border-b-2 border-neutral-800 bg-transparent py-4 text-white outline-none focus:border-[#bb9457] transition-all duration-300" placeholder="your@email.com" />
                </div>
              </div>

              <div>
                <label className="text-[10px] uppercase tracking-[0.25em] text-neutral-400 font-semibold block mb-3">Subject *</label>
                <input type="text" required value={formData.subject} onChange={(e) => setFormData({ ...formData, subject: e.target.value })} className="w-full border-b-2 border-neutral-800 bg-transparent py-4 text-white outline-none focus:border-[#bb9457] transition-all duration-300" placeholder="What is this about?" />
              </div>

              <div>
                <label className="text-[10px] uppercase tracking-[0.25em] text-neutral-400 font-semibold block mb-3">I am reaching out as *</label>
                <select required value={formData.role} onChange={(e) => setFormData({ ...formData, role: e.target.value })} className="w-full border-b-2 border-neutral-800 bg-transparent py-4 text-white outline-none focus:border-[#bb9457] transition-all duration-300 cursor-pointer">
                  <option value="" className="bg-neutral-950">Select an option</option>
                  <option value="creative" className="bg-neutral-950">A creative or maker</option>
                  <option value="investor" className="bg-neutral-950">An investor or partner</option>
                  <option value="press" className="bg-neutral-950">A journalist or press contact</option>
                  <option value="buyer" className="bg-neutral-950">A buyer or marketplace visitor</option>
                  <option value="studio" className="bg-neutral-950">Someone interested in studios</option>
                  <option value="other" className="bg-neutral-950">Other</option>
                </select>
              </div>

              <div>
                <label className="text-[10px] uppercase tracking-[0.25em] text-neutral-400 font-semibold block mb-3">Your message *</label>
                <textarea required rows={10} value={formData.message} onChange={(e) => setFormData({ ...formData, message: e.target.value })} className="w-full border-b-2 border-neutral-800 bg-transparent py-4 text-white outline-none focus:border-[#bb9457] transition-all duration-300 resize-none" placeholder="Tell us what's on your mind..." />
              </div>

              <div>
                <label className="text-[10px] uppercase tracking-[0.25em] text-neutral-400 font-semibold block mb-3">How did you hear about Adorzia? *</label>
                <select required value={formData.heard_from} onChange={(e) => setFormData({ ...formData, heard_from: e.target.value })} className="w-full border-b-2 border-neutral-800 bg-transparent py-4 text-white outline-none focus:border-[#bb9457] transition-all duration-300 cursor-pointer">
                  <option value="" className="bg-neutral-950">Select an option</option>
                  <option value="instagram" className="bg-neutral-950">Instagram</option>
                  <option value="linkedin" className="bg-neutral-950">LinkedIn</option>
                  <option value="word-of-mouth" className="bg-neutral-950">Word of mouth</option>
                  <option value="press" className="bg-neutral-950">Press coverage</option>
                  <option value="google" className="bg-neutral-950">Google search</option>
                  <option value="friend" className="bg-neutral-950">A friend or colleague</option>
                  <option value="spotlight" className="bg-neutral-950">Spotlight promotion</option>
                  <option value="other" className="bg-neutral-950">Other</option>
                </select>
              </div>

              <label className="flex gap-3 items-start cursor-pointer p-4 rounded-sm hover:bg-white/5 transition-colors duration-300">
                <input type="checkbox" checked={formData.newsletter} onChange={(e) => setFormData({ ...formData, newsletter: e.target.checked })} className="mt-1 accent-[#bb9457] w-4 h-4" />
                <span className="text-neutral-400 font-light text-sm">I am happy to be added to the Adorzia mailing list for updates on studios, marketplace, and Spotlight</span>
              </label>

              {error && <div className="p-4 bg-red-500/10 border border-red-500/30 rounded-sm text-red-400 text-sm">{error}</div>}

              <div className="pt-6">
                <button type="submit" disabled={contactSubmitting} className="inline-flex items-center gap-3 bg-[#bb9457] text-black px-10 py-5 text-[11px] uppercase tracking-[0.25em] font-semibold hover:bg-white transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed transform hover:-translate-y-0.5 hover:shadow-xl hover:shadow-[#bb9457]/20 rounded-sm">
                  {contactSubmitting ? (
                    <>
                      <span className="animate-spin">⏳</span>
                      Sending…
                    </>
                  ) : (
                    <>
                      Send message
                      <span>→</span>
                    </>
                  )}
                </button>
              </div>
            </form>
          )}
        </div>
      </section>

      {/* Studio Locations */}
      <section className="py-40 relative overflow-hidden border-t border-neutral-900">
        <div className="absolute inset-0 opacity-15">
          <img src={studio} alt="" className="w-full h-full object-cover grayscale animate-ambient-swell"  loading="lazy" decoding="async" />
        </div>
        <div className="absolute inset-0 bg-gradient-to-b from-neutral-950 via-neutral-950/97 to-neutral-950" />
        
        <div className="max-w-7xl mx-auto px-6 lg:px-8 relative z-10">
          <div className="max-w-4xl mb-20">
            <span className="inline-flex items-center gap-3 px-6 py-3 rounded-full border border-[#bb9457]/20 bg-neutral-950/50 text-[10px] uppercase tracking-[0.3em] text-[#bb9457] font-mono font-semibold">
              Find us
            </span>
            <h2 className="mt-8 font-serif text-4xl md:text-6xl text-white font-normal tracking-tight">
              Adorzia is building in three cities. Come and see what we are creating.
            </h2>
            <p className="mt-6 text-neutral-400 font-light text-base md:text-lg leading-relaxed">
              Our studios are the physical heart of the Adorzia ecosystem - the places where the community gathers, where the work gets made, and where the conversations that shape Pakistani fashion's future actually happen. All three locations are opening in 2026.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 mb-20">
            {[
              {
                city: "Lahore",
                status: "Opening 2026",
                body: "Pakistan's cultural capital and our first studio home. Lahore carries more creative history per square kilometer than almost anywhere in the country - and our studio here will be at the center of the city's fashion community from day one.",
                email: "lahore@adorzia.com",
                cta: "Join the Lahore studio waitlist",
                image: designer2
              },
              {
                city: "Islamabad",
                status: "Opening 2026",
                body: "The capital city and a growing hub for creative professionals, entrepreneurs, and the institutional relationships that the Adorzia ecosystem depends on. Our Islamabad studio will serve the community of designers and makers building here.",
                email: "islamabad@adorzia.com",
                cta: "Join the Islamabad studio waitlist",
                image: studio
              },
              {
                city: "Karachi",
                status: "Opening 2026",
                body: "Pakistan's largest city and its commercial engine. Karachi has always had an extraordinary underground creative scene - designers, textile innovators, craft entrepreneurs, and fashion people who have been building without infrastructure for too long. Our Karachi studio is for them.",
                email: "karachi@adorzia.com",
                cta: "Join the Karachi studio waitlist",
                image: craft
              }
            ].map((location, i) => (
              <div key={i} className="group relative border border-neutral-900 rounded-sm bg-neutral-950/50 backdrop-blur-sm overflow-hidden hover:border-[#bb9457]/40 transition-all duration-500 hover:shadow-2xl hover:shadow-[#bb9457]/5">
                {/* Image section */}
                <div className="aspect-[4/3] overflow-hidden relative">
                  <img src={location.image} alt="" className="w-full h-full object-cover grayscale contrast-125 group-hover:scale-110 transition-transform duration-700"  loading="lazy" decoding="async" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                  
                  {/* City name overlay */}
                  <div className="absolute bottom-6 left-6 right-6">
                    <div className="flex justify-between items-end">
                      <h3 className="font-serif text-3xl text-white font-normal">{location.city}</h3>
                      <span className="px-3 py-1 rounded-full bg-[#bb9457]/20 border border-[#bb9457]/30 text-[10px] uppercase tracking-[0.2em] text-[#bb9457] font-mono">{location.status}</span>
                    </div>
                  </div>
                </div>
                
                {/* Content section */}
                <div className="p-8">
                  <p className="text-neutral-400 font-light leading-relaxed mb-6 text-sm">{location.body}</p>
                  
                  {/* Email */}
                  <a href={`mailto:${location.email}`} className="inline-flex items-center gap-2 text-[#bb9457] font-light text-sm mb-6 hover:text-white transition-colors duration-300 group-hover:translate-x-1">
                    <span className="w-1 h-1 rounded-full bg-[#bb9457]" />
                    {location.email}
                  </a>
                  
                  {/* CTA Button */}
                  <a href={`mailto:${location.email}`} className="inline-flex items-center gap-3 px-6 py-3 border border-[#bb9457]/40 text-[#bb9457] text-[10px] uppercase tracking-[0.2em] rounded-sm hover:bg-[#bb9457] hover:text-black transition-all duration-300 transform hover:-translate-y-0.5 hover:shadow-lg hover:shadow-[#bb9457]/20">
                    {location.cta}
                    <span className="transform group-hover:translate-x-1 transition-transform duration-300">→</span>
                  </a>
                </div>
              </div>
            ))}
          </div>

          <div className="text-center p-12 border border-[#bb9457]/30 rounded-sm bg-neutral-950/60 backdrop-blur-sm">
            <p className="text-white font-light text-lg mb-8 max-w-3xl mx-auto">
              Not in one of these cities? Write to us. We are planning our next locations and the cities that show us the strongest community interest will shape where we go next.
            </p>
            <a href="mailto:hello@adorzia.com" className="inline-flex items-center gap-3 px-10 py-5 bg-[#bb9457] text-black font-semibold uppercase tracking-[0.2em] text-[11px] rounded-sm hover:bg-white transition-all duration-300 transform hover:-translate-y-0.5 hover:shadow-xl hover:shadow-[#bb9457]/20">
              Tell us where Adorzia should come next
              <span>→</span>
            </a>
          </div>
        </div>
      </section>

      {/* Social Media Links */}
      <section className="py-40 relative overflow-hidden border-t border-neutral-900">
        <div className="absolute inset-0 opacity-20">
          <img src={designer1} alt="" className="w-full h-full object-cover grayscale animate-ambient-swell"  loading="lazy" decoding="async" />
        </div>
        <div className="absolute inset-0 bg-gradient-to-br from-neutral-900 via-neutral-900/95 to-black" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(187,148,87,0.1),transparent_60%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_left,rgba(187,148,87,0.08),transparent_50%)]" />
        
        <div className="max-w-7xl mx-auto px-6 lg:px-8 relative z-10">
          <div className="text-center max-w-4xl mx-auto mb-20">
            <span className="inline-flex items-center gap-3 px-6 py-3 rounded-full border border-[#bb9457]/20 bg-neutral-950/50 text-[10px] uppercase tracking-[0.3em] text-[#bb9457] font-mono font-semibold">
              Follow the journey
            </span>
            <h2 className="mt-8 font-serif text-4xl md:text-6xl text-white font-normal tracking-tight">
              We build in public. Follow along.
            </h2>
            <p className="mt-6 text-neutral-400 font-light text-base md:text-lg leading-relaxed">
              Adorzia is being built right now - in real time, with full transparency about what we are doing, why we are doing it, and how it is going. Our social channels are where that story lives between launches, announcements, and events.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              {
                channel: "Instagram",
                handle: "@adorzia",
                description: "The visual heart of Adorzia - designer features, studio life, marketplace previews, Spotlight updates, and the fashion culture of Pakistan as we experience it.",
                cta: "Follow on Instagram"
              },
              {
                channel: "LinkedIn",
                handle: "Adorzia",
                description: "The professional story - ecosystem updates, investor announcements, industry commentary, and the business of building Pakistani fashion entrepreneurship infrastructure.",
                cta: "Follow on LinkedIn"
              },
              {
                channel: "TikTok",
                handle: "@adorzia",
                description: "The unfiltered version - studio visits, maker stories, behind the scenes of Spotlight, and the raw creative energy of the Pakistani fashion community we are building inside.",
                cta: "Follow on TikTok"
              },
              {
                channel: "Facebook",
                handle: "Adorzia",
                description: "Community updates, event information, and the broader Adorzia story for the audience that matters most - the Pakistani creative community wherever they are.",
                cta: "Follow on Facebook"
              }
            ].map((platform, i) => (
              <div key={i} className="group relative p-8 border border-neutral-900 rounded-sm bg-neutral-950/60 backdrop-blur-sm hover:border-[#bb9457]/40 transition-all duration-500 hover:shadow-2xl hover:shadow-[#bb9457]/5">
                {/* Glow effect */}
                <div className="absolute inset-0 bg-gradient-to-br from-[#bb9457]/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-sm" />
                
                <div className="relative z-10">
                  <div className="text-[10px] uppercase tracking-[0.2em] text-[#bb9457] font-mono font-semibold mb-3">{platform.channel}</div>
                  <div className="text-white font-serif text-2xl mb-4">{platform.handle}</div>
                  <p className="text-neutral-400 font-light leading-relaxed text-sm mb-6">{platform.description}</p>
                  <a href="#" className="inline-flex items-center gap-3 px-6 py-3 border border-[#bb9457]/40 text-[#bb9457] text-[10px] uppercase tracking-[0.2em] rounded-sm hover:bg-[#bb9457] hover:text-black transition-all duration-300 transform hover:-translate-y-0.5 hover:shadow-lg hover:shadow-[#bb9457]/20">
                    {platform.cta}
                    <span className="transform group-hover:translate-x-1 transition-transform duration-300">→</span>
                  </a>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-16 text-center p-12 border border-[#bb9457]/30 rounded-sm bg-neutral-950/60 backdrop-blur-sm max-w-3xl mx-auto">
            <p className="text-white font-light mb-8 text-lg">
              Prefer to hear from us directly? Join our mailing list for updates that go deeper than social.
            </p>
            {newsletterSubmitted ? (
              <div className="inline-flex items-center gap-3 px-6 py-3 rounded-full bg-[#bb9457]/10 border border-[#bb9457]/30 text-[#bb9457] font-light">
                <span>✓</span>
                Subscribed successfully
              </div>
            ) : (
              <form onSubmit={handleNewsletterSubmit} className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
                <input type="email" required value={newsletterEmail} onChange={(e) => setNewsletterEmail(e.target.value)} className="flex-1 bg-transparent border-2 border-neutral-800 px-6 py-4 text-white outline-none focus:border-[#bb9457] transition-all duration-300" placeholder="Email address" />
                <button type="submit" disabled={newsletterSubmitting} className="px-10 py-4 bg-[#bb9457] text-black font-semibold uppercase tracking-[0.2em] text-[10px] rounded-sm hover:bg-white transition-all duration-300 disabled:opacity-50 transform hover:-translate-y-0.5 hover:shadow-lg hover:shadow-[#bb9457]/20">
                  {newsletterSubmitting ? 'Subscribing…' : 'Subscribe'}
                </button>
              </form>
            )}
          </div>
        </div>
      </section>

      {/* Spotlight Submissions Redirect */}
      <section className="py-40 relative overflow-hidden border-t border-neutral-900">
        <div className="absolute inset-0 z-0">
          <img src={studio} alt="" className="w-full h-full object-cover scale-110 animate-ambient-swell"  loading="lazy" decoding="async" />
          <div className="absolute inset-0 bg-gradient-to-b from-neutral-950/97 via-neutral-950/92 to-black" />
        </div>
        
        {/* Cinematic overlays */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_center,rgba(187,148,87,0.18),transparent_60%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom,rgba(187,148,87,0.12),transparent_50%)]" />
        
        {/* Floating elements */}
        <div className="absolute top-20 right-20 w-72 h-72 bg-[#bb9457]/5 rounded-full blur-3xl" />
        <div className="absolute bottom-20 left-20 w-56 h-56 bg-[#bb9457]/5 rounded-full blur-3xl" style={{ animationDelay: '3s' }} />
        
        <div className="max-w-5xl mx-auto px-6 lg:px-8 text-center relative z-10">
          <span className="inline-flex items-center gap-3 px-6 py-3 rounded-full border border-[#bb9457]/30 bg-black/30 backdrop-blur-sm text-[10px] uppercase tracking-[0.3em] text-[#bb9457] font-mono font-semibold">
            <span className="w-2 h-2 rounded-full bg-[#bb9457]" />
            Here for Spotlight
          </span>
          
          <h2 className="mt-8 font-serif text-4xl md:text-6xl text-white font-normal tracking-tight">
            Looking to apply for Spotlight Fall 2026? You are one click away.
          </h2>

          <div className="mt-8 max-w-3xl mx-auto space-y-6 text-neutral-400 font-light text-base md:text-lg leading-relaxed">
            <p>
              Adorzia Spotlight Fall 2026 is our first-ever national fashion talent event - and submissions open June 1, 2026. If you came to this page looking for the application, everything you need is on the Spotlight page.
            </p>
          </div>
          
          <p className="mt-8 text-white font-normal text-lg">What you will find there:</p>

          <ul className="mt-10 space-y-4 text-neutral-400 font-light max-w-2xl mx-auto text-left">
            {[
              "The full Spotlight mission and what winners receive",
              "Eligibility criteria and who should apply",
              "The complete submission application form",
              "The event timeline from submission to investment",
              "Frequently asked questions"
            ].map((item, idx) => (
              <li key={idx} className="flex gap-4 items-start group">
                <span className="text-[#bb9457] mt-1 transform group-hover:scale-125 transition-transform duration-300">→</span>
                <span className="group-hover:text-white transition-colors duration-300">{item}</span>
              </li>
            ))}
          </ul>

          <div className="mt-10 flex flex-wrap gap-6 justify-center items-center">
            <span className="px-4 py-2 rounded-full bg-[#bb9457]/10 border border-[#bb9457]/30 text-neutral-500 font-mono text-[10px] uppercase tracking-[0.2em]">
              Submissions open: June 1, 2026
            </span>
            <span className="text-neutral-700">|</span>
            <span className="px-4 py-2 rounded-full bg-[#bb9457]/10 border border-[#bb9457]/30 text-neutral-500 font-mono text-[10px] uppercase tracking-[0.2em]">
              Submissions close: July 31, 2026
            </span>
          </div>

          <div className="mt-12 flex flex-wrap gap-6 justify-center">
            <a href="/spotlight-event" className="inline-flex items-center gap-3 px-10 py-5 bg-[#bb9457] text-black font-semibold uppercase tracking-[0.2em] text-[11px] rounded-sm hover:bg-white transition-all duration-300 transform hover:-translate-y-0.5 hover:shadow-xl hover:shadow-[#bb9457]/20">
              Go to the Spotlight page
              <span>→</span>
            </a>
            <button className="inline-flex items-center gap-3 px-10 py-5 border-2 border-white/30 text-white font-semibold uppercase tracking-[0.2em] text-[11px] rounded-sm hover:border-[#bb9457] hover:text-[#bb9457] transition-all duration-300 transform hover:-translate-y-0.5">
              Get notified when submissions open
            </button>
          </div>

          <p className="mt-16 text-neutral-400 font-light text-sm">
            Not sure if Spotlight is right for you? Write to us at <a href="mailto:spotlight@adorzia.com" className="text-[#bb9457] hover:text-white transition-colors font-medium">spotlight@adorzia.com</a> and we will give you an honest answer.
          </p>
        </div>
      </section>
    </div>
  )
}

export default Contact
