import { useState } from 'react'
import { supabase } from '../lib/supabase'
import SEO from '../components/SEO'
import Breadcrumb from '../components/Breadcrumb'
import studio from '../assets/studio.jpg'
import craft from '../assets/craft.jpg'
import designer1 from '../assets/designer-1.jpg'
import designer2 from '../assets/designer-2.jpg'

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

      setNewsletterSubmitted(true)
      setNewsletterEmail('')
    } catch (err) {
      setError('Failed to subscribe. Please try again.')
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
      <Breadcrumb currentPage="Contact Us" />
      <style>{`
        @keyframes ambientSwell {
          0%, 100% { transform: scale(1.02) translate(0px, 0px); }
          50% { transform: scale(1.06) translate(4px, -3px); }
        }
        .animate-ambient-swell { animation: ambientSwell 20s infinite ease-in-out; }
      `}</style>

      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img src={designer1} alt="" className="w-full h-full object-cover grayscale opacity-30" />
        </div>
        <div className="absolute inset-0 bg-gradient-to-br from-black via-neutral-950/95 to-neutral-900/90" />
        <div className="absolute inset-0 bg-black/30" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(187,148,87,0.2),transparent_60%)]" />

        <div className="relative z-10 max-w-6xl mx-auto px-6 lg:px-8 py-32">
          <span className="text-[10px] uppercase tracking-[0.3em] text-[#bb9457] font-mono font-semibold">
            Get in touch
          </span>

          <h1 className="mt-8 font-serif text-5xl md:text-7xl lg:text-8xl text-white font-normal leading-[1.05] tracking-tight max-w-5xl">
            Every conversation at Adorzia starts with a real person.
          </h1>

          <div className="mt-8 max-w-3xl space-y-6 text-neutral-300 font-light text-base md:text-lg leading-relaxed">
            <p>
              We are a small team building something large. That means when you write to us, someone who actually works here reads it, thinks about it, and writes back. No automated responses. No ticket numbers. No holding pattern.
            </p>
            <p>
              Whether you are a creative looking for your next step, an investor who wants to understand what we are building, a journalist covering Pakistani fashion, or someone who just wants to know more - there is a door here with your name on it.
            </p>
            <p className="text-white font-normal">
              We respond to every message within three working days.
            </p>
          </div>
        </div>
      </section>

      {/* Four Contact Paths */}
      <section className="py-40 border-t border-neutral-900">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="text-center max-w-4xl mx-auto mb-20">
            <span className="text-[10px] uppercase tracking-[0.3em] text-[#bb9457] font-mono font-semibold">How can we help you</span>
            <h2 className="mt-6 font-serif text-4xl md:text-6xl text-white font-normal tracking-tight">
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
              <div key={i} className="group p-10 border border-neutral-900 rounded-sm bg-neutral-950 hover:border-[#bb9457]/30 transition-colors duration-300">
                <div className="aspect-[16/9] overflow-hidden rounded-sm mb-6">
                  <img src={path.image} alt="" className="w-full h-full object-cover grayscale contrast-125 group-hover:scale-105 transition-transform duration-700" />
                </div>
                <div className="text-[10px] uppercase tracking-[0.2em] text-[#bb9457] font-mono font-semibold mb-2">{path.label}</div>
                <h3 className="font-serif text-2xl text-white font-normal mb-4">{path.title}</h3>
                <p className="text-neutral-400 font-light leading-relaxed mb-6">{path.body}</p>
                <a href={`mailto:${path.email}`} className="text-[#bb9457] font-light text-sm mb-4 block hover:text-white transition-colors">
                  {path.email}
                </a>
                <a href={`mailto:${path.email}`} className="inline-block px-6 py-3 border border-[#bb9457]/40 text-[#bb9457] text-[10px] uppercase tracking-[0.2em] rounded-sm hover:bg-[#bb9457] hover:text-black transition-all duration-300">
                  {path.cta}
                </a>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Form */}
      <section className="py-40 relative overflow-hidden border-t border-neutral-900 bg-neutral-900">
        <div className="absolute inset-0 opacity-10">
          <img src={craft} alt="" className="w-full h-full object-cover grayscale animate-ambient-swell" />
        </div>
        <div className="absolute inset-0 bg-gradient-to-b from-neutral-900 via-neutral-900/95 to-neutral-900" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(187,148,87,0.08),transparent_70%)]" />
        
        <div className="max-w-4xl mx-auto px-6 lg:px-8 relative z-10">
          <div className="text-center mb-20">
            <span className="text-[10px] uppercase tracking-[0.3em] text-[#bb9457] font-mono font-semibold">Send us a message</span>
            <h2 className="mt-6 font-serif text-4xl md:text-5xl text-white font-normal tracking-tight">
              We are listening.
            </h2>
            <p className="mt-6 text-neutral-400 font-light text-base md:text-lg leading-relaxed max-w-3xl mx-auto">
              Use this form for any enquiry. We will route your message to the right person and respond within three working days. For Spotlight applications please use the dedicated application form on the Spotlight page.
            </p>
          </div>

          {contactSubmitted ? (
            <div className="p-10 border border-[#bb9457]/30 rounded-sm bg-neutral-950 text-center">
              <p className="text-white font-light text-lg mb-4">
                Thank you for reaching out. Your message has arrived with us and a real person will read it and respond within three working days.
              </p>
              <p className="text-neutral-400 font-light text-sm">
                If your enquiry is urgent please write directly to hello@adorzia.com with the word urgent in your subject line.
              </p>
              <button onClick={() => setContactSubmitted(false)} className="mt-8 px-6 py-3 border border-[#bb9457]/40 text-[#bb9457] text-[10px] uppercase tracking-[0.2em] rounded-sm hover:bg-[#bb9457] hover:text-black transition-all duration-300">
                Send another message
              </button>
            </div>
          ) : (
            <form onSubmit={handleContactSubmit} className="space-y-10">
              <div className="grid md:grid-cols-2 gap-8">
                <div>
                  <label className="text-[10px] uppercase tracking-[0.25em] text-neutral-400 font-semibold block mb-3">Full name *</label>
                  <input type="text" required value={formData.name} onChange={(e) => setFormData({ ...formData, name: e.target.value })} className="w-full border-b border-neutral-800 bg-transparent py-3 text-white outline-none focus:border-[#bb9457] transition-colors" placeholder="Your full name" />
                </div>
                <div>
                  <label className="text-[10px] uppercase tracking-[0.25em] text-neutral-400 font-semibold block mb-3">Email address *</label>
                  <input type="email" required value={formData.email} onChange={(e) => setFormData({ ...formData, email: e.target.value })} className="w-full border-b border-neutral-800 bg-transparent py-3 text-white outline-none focus:border-[#bb9457] transition-colors" placeholder="your@email.com" />
                </div>
              </div>

              <div>
                <label className="text-[10px] uppercase tracking-[0.25em] text-neutral-400 font-semibold block mb-3">Subject *</label>
                <input type="text" required value={formData.subject} onChange={(e) => setFormData({ ...formData, subject: e.target.value })} className="w-full border-b border-neutral-800 bg-transparent py-3 text-white outline-none focus:border-[#bb9457] transition-colors" placeholder="What is this about?" />
              </div>

              <div>
                <label className="text-[10px] uppercase tracking-[0.25em] text-neutral-400 font-semibold block mb-3">I am reaching out as *</label>
                <select required value={formData.role} onChange={(e) => setFormData({ ...formData, role: e.target.value })} className="w-full border-b border-neutral-800 bg-transparent py-3 text-white outline-none focus:border-[#bb9457] transition-colors">
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
                <textarea required rows={8} value={formData.message} onChange={(e) => setFormData({ ...formData, message: e.target.value })} className="w-full border-b border-neutral-800 bg-transparent py-3 text-white outline-none focus:border-[#bb9457] transition-colors resize-none" placeholder="Tell us what's on your mind..." />
              </div>

              <div>
                <label className="text-[10px] uppercase tracking-[0.25em] text-neutral-400 font-semibold block mb-3">How did you hear about Adorzia? *</label>
                <select required value={formData.heard_from} onChange={(e) => setFormData({ ...formData, heard_from: e.target.value })} className="w-full border-b border-neutral-800 bg-transparent py-3 text-white outline-none focus:border-[#bb9457] transition-colors">
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

              <label className="flex gap-3 items-start cursor-pointer">
                <input type="checkbox" checked={formData.newsletter} onChange={(e) => setFormData({ ...formData, newsletter: e.target.checked })} className="mt-1 accent-[#bb9457]" />
                <span className="text-neutral-400 font-light text-sm">I am happy to be added to the Adorzia mailing list for updates on studios, marketplace, and Spotlight</span>
              </label>

              {error && <div className="text-red-500 text-sm">{error}</div>}

              <button type="submit" disabled={contactSubmitting} className="inline-flex items-center bg-[#bb9457] text-black px-8 py-4 text-[11px] uppercase tracking-[0.25em] font-semibold hover:bg-white transition-colors disabled:opacity-50">
                {contactSubmitting ? 'Sending…' : 'Send message'}
              </button>
            </form>
          )}
        </div>
      </section>

      {/* Studio Locations */}
      <section className="py-40 border-t border-neutral-900">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="max-w-4xl mb-20">
            <span className="text-[10px] uppercase tracking-[0.3em] text-[#bb9457] font-mono font-semibold">Find us</span>
            <h2 className="mt-6 font-serif text-4xl md:text-6xl text-white font-normal tracking-tight">
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
              <div key={i} className="group border border-neutral-900 rounded-sm bg-neutral-950 overflow-hidden hover:border-[#bb9457]/30 transition-colors duration-300">
                <div className="aspect-[4/3] overflow-hidden">
                  <img src={location.image} alt="" className="w-full h-full object-cover grayscale contrast-125 group-hover:scale-105 transition-transform duration-700" />
                </div>
                <div className="p-8">
                  <div className="flex justify-between items-start mb-4">
                    <h3 className="font-serif text-2xl text-white font-normal">{location.city}</h3>
                    <span className="text-[10px] uppercase tracking-[0.2em] text-[#bb9457] font-mono">{location.status}</span>
                  </div>
                  <p className="text-neutral-400 font-light leading-relaxed mb-6 text-sm">{location.body}</p>
                  <a href={`mailto:${location.email}`} className="text-[#bb9457] font-light text-sm mb-4 block hover:text-white transition-colors">
                    {location.email}
                  </a>
                  <a href={`mailto:${location.email}`} className="inline-block px-6 py-3 border border-[#bb9457]/40 text-[#bb9457] text-[10px] uppercase tracking-[0.2em] rounded-sm hover:bg-[#bb9457] hover:text-black transition-all duration-300">
                    {location.cta}
                  </a>
                </div>
              </div>
            ))}
          </div>

          <div className="text-center p-10 border border-[#bb9457]/30 rounded-sm bg-neutral-950">
            <p className="text-white font-light text-lg mb-6">
              Not in one of these cities? Write to us. We are planning our next locations and the cities that show us the strongest community interest will shape where we go next.
            </p>
            <a href="mailto:hello@adorzia.com" className="inline-block px-8 py-4 bg-[#bb9457] text-black font-semibold uppercase tracking-[0.2em] text-[11px] rounded-sm hover:bg-white transition-all duration-300">
              Tell us where Adorzia should come next
            </a>
          </div>
        </div>
      </section>

      {/* Social Media Links */}
      <section className="py-40 relative overflow-hidden border-t border-neutral-900 bg-neutral-900">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(187,148,87,0.08),transparent_70%)]" />
        
        <div className="max-w-7xl mx-auto px-6 lg:px-8 relative z-10">
          <div className="text-center max-w-4xl mx-auto mb-20">
            <span className="text-[10px] uppercase tracking-[0.3em] text-[#bb9457] font-mono font-semibold">Follow the journey</span>
            <h2 className="mt-6 font-serif text-4xl md:text-6xl text-white font-normal tracking-tight">
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
              <div key={i} className="p-8 border border-neutral-900 rounded-sm bg-neutral-950 hover:border-[#bb9457]/30 transition-colors duration-300">
                <div className="text-[10px] uppercase tracking-[0.2em] text-[#bb9457] font-mono font-semibold mb-2">{platform.channel}</div>
                <div className="text-white font-serif text-xl mb-4">{platform.handle}</div>
                <p className="text-neutral-400 font-light leading-relaxed text-sm mb-6">{platform.description}</p>
                <a href="#" className="inline-block px-6 py-3 border border-[#bb9457]/40 text-[#bb9457] text-[10px] uppercase tracking-[0.2em] rounded-sm hover:bg-[#bb9457] hover:text-black transition-all duration-300">
                  {platform.cta}
                </a>
              </div>
            ))}
          </div>

          <div className="mt-16 text-center p-10 border border-[#bb9457]/30 rounded-sm bg-neutral-950 max-w-3xl mx-auto">
            <p className="text-white font-light mb-6">
              Prefer to hear from us directly? Join our mailing list for updates that go deeper than social.
            </p>
            {newsletterSubmitted ? (
              <div className="text-[#bb9457] font-light">Subscribed successfully</div>
            ) : (
              <form onSubmit={handleNewsletterSubmit} className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
                <input type="email" required value={newsletterEmail} onChange={(e) => setNewsletterEmail(e.target.value)} className="flex-1 bg-transparent border border-neutral-800 px-4 py-3 text-white outline-none focus:border-[#bb9457] transition-colors" placeholder="Email address" />
                <button type="submit" disabled={newsletterSubmitting} className="px-8 py-3 bg-[#bb9457] text-black font-semibold uppercase tracking-[0.2em] text-[10px] rounded-sm hover:bg-white transition-all duration-300 disabled:opacity-50">
                  {newsletterSubmitting ? 'Subscribing…' : 'Subscribe'}
                </button>
              </form>
            )}
          </div>
        </div>
      </section>

      {/* Spotlight Submissions Redirect */}
      <section className="py-40 border-t border-neutral-900">
        <div className="max-w-5xl mx-auto px-6 lg:px-8 text-center">
          <span className="text-[10px] uppercase tracking-[0.3em] text-[#bb9457] font-mono font-semibold">Here for Spotlight</span>
          <h2 className="mt-6 font-serif text-4xl md:text-6xl text-white font-normal tracking-tight">
            Looking to apply for Spotlight Fall 2026? You are one click away.
          </h2>

          <div className="mt-8 max-w-3xl mx-auto space-y-6 text-neutral-400 font-light text-base md:text-lg leading-relaxed">
            <p>
              Adorzia Spotlight Fall 2026 is our first-ever national fashion talent event - and submissions open June 1, 2026. If you came to this page looking for the application, everything you need is on the Spotlight page.
            </p>
            <p className="text-white font-normal">What you will find there:</p>
          </div>

          <ul className="mt-8 space-y-4 text-neutral-400 font-light max-w-2xl mx-auto text-left">
            <li className="flex gap-3"><span className="text-[#bb9457] mt-1">-</span><span>The full Spotlight mission and what winners receive</span></li>
            <li className="flex gap-3"><span className="text-[#bb9457] mt-1">-</span><span>Eligibility criteria and who should apply</span></li>
            <li className="flex gap-3"><span className="text-[#bb9457] mt-1">-</span><span>The complete submission application form</span></li>
            <li className="flex gap-3"><span className="text-[#bb9457] mt-1">-</span><span>The event timeline from submission to investment</span></li>
            <li className="flex gap-3"><span className="text-[#bb9457] mt-1">-</span><span>Frequently asked questions</span></li>
          </ul>

          <div className="mt-8 flex flex-wrap gap-4 justify-center items-center">
            <span className="text-neutral-500 font-mono text-[10px] uppercase tracking-[0.2em]">Submissions open: June 1, 2026</span>
            <span className="text-neutral-700">|</span>
            <span className="text-neutral-500 font-mono text-[10px] uppercase tracking-[0.2em]">Submissions close: July 31, 2026</span>
          </div>

          <div className="mt-12 flex flex-wrap gap-6 justify-center">
            <a href="/spotlight-event" className="px-8 py-4 bg-[#bb9457] text-black font-semibold uppercase tracking-[0.2em] text-[11px] rounded-sm hover:bg-white transition-all duration-300">
              Go to the Spotlight page
            </a>
            <button className="px-8 py-4 border border-white/30 text-white font-semibold uppercase tracking-[0.2em] text-[11px] rounded-sm hover:border-[#bb9457] hover:text-[#bb9457] transition-all duration-300">
              Get notified when submissions open
            </button>
          </div>

          <p className="mt-12 text-neutral-400 font-light text-sm">
            Not sure if Spotlight is right for you? Write to us at <a href="mailto:spotlight@adorzia.com" className="text-[#bb9457] hover:text-white transition-colors">spotlight@adorzia.com</a> and we will give you an honest answer.
          </p>
        </div>
      </section>
    </div>
  )
}

export default Contact
