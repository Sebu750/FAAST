import { useState, useEffect } from 'react'
import { supabase } from '../lib/supabase'
import { sendSpotlightApplicationNotification } from '../lib/email'
import SEO from '../components/SEO'
import Breadcrumb from '../components/Breadcrumb'
import spotlightImg from '../assets/spotlight.jpg'
import heroRunway from '../assets/hero-runway.jpg'
import studio from '../assets/studio.jpg'
import craft from '../assets/craft.jpg'
import winner1 from '../assets/winner-1.jpg'
import winner2 from '../assets/winner-2.jpg'
import winner3 from '../assets/winner-3.jpg'
import designer1 from '../assets/designer-1.jpg'
import designer2 from '../assets/designer-2.jpg'

const SpotlightEvent = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    brand_name: '',
    location: '',
    instagram: '',
    portfolio_url: '',
    description: ''
  })
  const [submitting, setSubmitting] = useState(false)
  const [submitted, setSubmitted] = useState(false)
  const [error, setError] = useState('')
  const [daysLeft, setDaysLeft] = useState(0)

  useEffect(() => {
    const target = new Date("2026-06-01T00:00:00").getTime()
    const interval = setInterval(() => {
      const now = new Date().getTime()
      const difference = target - now
      setDaysLeft(Math.max(0, Math.floor(difference / (1000 * 60 * 60 * 24))))
    }, 1000)
    return () => clearInterval(interval)
  }, [])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setSubmitting(true)
    setError('')

    try {
      const { error: supabaseError } = await supabase
        .from('spotlight_applications')
        .insert([{
          name: formData.name,
          email: formData.email,
          brand_name: formData.brand_name,
          portfolio_url: formData.portfolio_url,
          description: `${formData.phone ? 'Phone: ' + formData.phone + '\n' : ''}${formData.location ? 'Location: ' + formData.location + '\n' : ''}${formData.instagram ? 'Instagram: ' + formData.instagram + '\n\n' : ''}${formData.description}`
        }])

      if (supabaseError) throw supabaseError

      await sendSpotlightApplicationNotification({
        name: formData.name,
        email: formData.email,
        brand_name: formData.brand_name,
        portfolio_url: formData.portfolio_url || undefined,
        description: formData.description
      })

      setSubmitted(true)
      setFormData({ name: '', email: '', phone: '', brand_name: '', location: '', instagram: '', portfolio_url: '', description: '' })
    } catch (err) {
      setError('Failed to submit application. Please try again.')
      console.error(err)
    } finally {
      setSubmitting(false)
    }
  }

  const scrollToSection = (id: string) => {
    const el = document.getElementById(id)
    if (el) el.scrollIntoView({ behavior: 'smooth' })
  }

  if (submitted) {
    return (
      <div className="min-h-screen py-20 flex items-center justify-center bg-neutral-950">
        <div className="max-w-2xl mx-auto px-6 text-center">
          <div className="text-6xl mb-6">✨</div>
          <h1 className="font-serif text-4xl md:text-5xl text-white font-normal mb-4 tracking-tight">Application Received</h1>
          <p className="text-neutral-400 text-lg mb-8 font-light">Your portfolio has been entered into the archive. Expect evaluation updates via secure mail.</p>
          <button onClick={() => setSubmitted(false)} className="bg-[#bb9457] text-black px-8 py-3 font-semibold uppercase tracking-[0.2em] text-[10px] rounded-sm hover:bg-white transition-colors">
            Submit Another Application
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-neutral-950 text-white">
      <SEO
        title="Adorzia Spotlight Fall 2026 - Pakistan's First National Fashion Talent Event | Apply from June 1"
        description="Adorzia Spotlight Fall 2026 is Pakistan's first national fashion talent discovery and investment event. Applications open June 1 2026. We are searching the entire country for extraordinary fashion designers, heritage craft innovators and fashion entrepreneurs - and investing in the ones who are ready to become brands."
        canonicalURL="https://adorzia.com/spotlight"
        ogTitle="Adorzia Spotlight Fall 2026 - Apply from June 1"
        ogDescription="Pakistan's first national fashion talent investment event. We find the visionaries. We invest in the brands. Submissions open June 1 2026."
        ogImageAlt="Adorzia Spotlight Fall 2026 - Pakistani fashion talent event"
        schemaType="Event"
        schema={{
          "@context": "https://schema.org",
          "@type": "Event",
          "name": "Adorzia Spotlight Fall 2026",
          "description": "Pakistan's first national fashion entrepreneurship talent discovery and investment event by Adorzia",
          "startDate": "2026-06-01",
          "endDate": "2026-11-30",
          "eventAttendanceMode": "https://schema.org/MixedEventAttendanceMode",
          "eventStatus": "https://schema.org/EventScheduled",
          "location": {
            "@type": "Place",
            "name": "Pakistan - National Event",
            "address": {
              "@type": "PostalAddress",
              "addressCountry": "PK"
            }
          },
          "organizer": {
            "@type": "Organization",
            "name": "Adorzia",
            "url": "https://adorzia.com"
          }
        }}
        keywords="Pakistan fashion talent competition 2026, Adorzia Spotlight 2026, fashion event Pakistan 2026, apply fashion competition Pakistan, fashion investment event Pakistan, Pakistani fashion designer application, Fashion event Pakistan, Emerging designer Pakistan, Fashion talent competition Pakistan, Pakistani fashion event 2026, How to apply for fashion talent competition in Pakistan, Pakistani fashion event 2026 applications open, Fashion talent discovery Pakistan, Fashion ecosystem South Asia, Spotlight fashion event 2026, Adorzia Spotlight, Adorzia Spotlight 2026, Pakistani fashion visionary, Where visionaries rise"
      />
      <Breadcrumb currentPage="Spotlight Event" />
      <style>{`
        @keyframes ambientSwell {
          0%, 100% { transform: scale(1.02) translate(0px, 0px); }
          50% { transform: scale(1.06) translate(4px, -3px); }
        }
        .animate-ambient-swell { animation: ambientSwell 20s infinite ease-in-out; }
      `}</style>

      {/* Urgency Bar */}
      <div className="w-full bg-[#bb9457] text-black font-mono text-[10px] tracking-[0.3em] uppercase py-2.5 px-4 sticky top-0 z-50 flex justify-between items-center border-b border-black/10">
        <div className="flex items-center gap-4">
          <span className="inline-block w-2 h-2 rounded-full bg-black animate-pulse" />
          <span>Adorzia Spotlight - Fall 2026</span>
        </div>
        <div className="font-bold flex gap-4">
          <span>{daysLeft} Days until submissions open</span>
          <button onClick={() => scrollToSection('apply')} className="underline hover:opacity-80 transition-opacity">
            Skip to entry
          </button>
        </div>
      </div>

      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img src={heroRunway} alt="" className="w-full h-full object-cover grayscale opacity-40" />
        </div>
        <div className="absolute inset-0 bg-gradient-to-br from-black via-neutral-950/95 to-neutral-900/90" />
        <div className="absolute inset-0 bg-black/30" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(187,148,87,0.2),transparent_60%)]" />

        <div className="relative z-10 max-w-6xl mx-auto px-6 lg:px-8 py-32">
          <span className="text-[10px] uppercase tracking-[0.3em] text-[#bb9457] font-mono font-semibold">
            Adorzia Spotlight - Fall 2026
          </span>

          <h1 className="mt-8 font-serif text-5xl md:text-7xl lg:text-8xl text-white font-normal leading-[1.05] tracking-tight max-w-5xl">
            Pakistan has never had a stage like this. Now it does.
          </h1>

          <div className="mt-8 max-w-3xl space-y-6 text-neutral-300 font-light text-base md:text-lg leading-relaxed">
            <p>
              Adorzia Spotlight is our first-ever national fashion talent event - and it is built on a single belief: that the most extraordinary fashion visionaries in Pakistan are not all in the front row of Lahore Fashion Week. Some of them are in Quetta. Some are in Gilgit. Some are in a workshop in Faisalabad that nobody outside their street has ever visited.
            </p>
            <p>
              We are going to find them. We are going to platform them. And we are going to invest in the ones who are ready to become something the world remembers.
            </p>
            <p className="text-white font-normal">
              Spotlight Fall 2026 is the beginning of that mission. Submissions open June 1, 2026.
            </p>
          </div>

          <div className="mt-12 flex flex-wrap gap-6">
            <button onClick={() => scrollToSection('apply')} className="px-8 py-4 bg-[#bb9457] text-black font-semibold uppercase tracking-[0.2em] text-[11px] rounded-sm hover:bg-white transition-all duration-300">
              Submit your application
            </button>
            <button onClick={() => scrollToSection('mission')} className="px-8 py-4 border border-white/30 text-white font-semibold uppercase tracking-[0.2em] text-[11px] rounded-sm hover:border-[#bb9457] hover:text-[#bb9457] transition-all duration-300">
              Learn how it works
            </button>
          </div>
        </div>
      </section>

      {/* What Is Spotlight - The Mission */}
      <section id="mission" className="py-40 relative overflow-hidden border-t border-neutral-900">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_bottom,rgba(187,148,87,0.08),transparent_70%)]" />
        
        <div className="max-w-7xl mx-auto px-6 lg:px-8 relative z-10">
          <div className="grid lg:grid-cols-12 gap-16 items-start">
            <div className="lg:col-span-5">
              <div className="sticky top-32">
                <div className="aspect-[4/5] overflow-hidden rounded-sm mb-8">
                  <img src={designer1} alt="" className="w-full h-full object-cover grayscale contrast-125 hover:scale-105 transition-transform duration-700" />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="aspect-square overflow-hidden rounded-sm">
                    <img src={studio} alt="" className="w-full h-full object-cover grayscale contrast-125 hover:scale-105 transition-transform duration-700" />
                  </div>
                  <div className="aspect-square overflow-hidden rounded-sm">
                    <img src={craft} alt="" className="w-full h-full object-cover grayscale contrast-125 hover:scale-105 transition-transform duration-700" />
                  </div>
                </div>
              </div>
            </div>
            
            <div className="lg:col-span-7">
              <div className="max-w-3xl mb-20">
                <span className="text-[10px] uppercase tracking-[0.3em] text-[#bb9457] font-mono font-semibold">Why we created this</span>
                <h2 className="mt-6 font-serif text-4xl md:text-6xl text-white font-normal tracking-tight">
                  Talent is not rare in Pakistan. The right opportunity is.
                </h2>
              </div>

              <div className="max-w-3xl space-y-6 text-neutral-400 font-light text-base md:text-lg leading-relaxed">
                <p>
                  Every year in Pakistan, hundreds of genuinely extraordinary fashion creatives - designers, makers, craft entrepreneurs, textile innovators - go unrecognized. Not because they are not good enough. Because there is no system designed to find them, evaluate them fairly, and give them a platform proportionate to their potential.
                </p>
                <p>
                  Fashion talent discovery in Pakistan has historically been informal, geography-dependent, and deeply connected to who you already know. If you are not from the right city, the right family, or the right institution - the industry has no reliable way to find you.
                </p>
                <p className="border-l-2 border-[#bb9457] pl-6 text-white font-normal">
                  Adorzia Spotlight was built to change that permanently.
                </p>
                <p>
                  We believe that the next generation of globally recognized Pakistani fashion brands will not all emerge from the established centers. They will emerge from wherever in this country the right person is working right now - and our job is to make sure geography, background, and connections are no longer the deciding factor in whether that person gets seen.
                </p>
                <p>
                  Spotlight is not a competition in the traditional sense. It is a discovery process - rigorous, nationwide, and designed to surface the most promising fashion entrepreneurs in Pakistan regardless of where they come from or where they have been so far.
                </p>
                <p>
                  What we are looking for is not perfection. We are looking for vision, craft, commercial instinct, and the kind of creative identity that can anchor a brand the world will want to know.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Submissions Open Section */}
      <section className="py-40 relative overflow-hidden bg-neutral-900 border-t border-neutral-900">
        <div className="absolute inset-0 opacity-15">
          <img src={spotlightImg} alt="" className="w-full h-full object-cover grayscale animate-ambient-swell" />
        </div>
        
        <div className="max-w-5xl mx-auto px-6 lg:px-8 relative z-10 text-center">
          <span className="text-[10px] uppercase tracking-[0.3em] text-[#bb9457] font-mono font-semibold">The moment is coming</span>
          <h2 className="mt-6 font-serif text-4xl md:text-6xl text-white font-normal tracking-tight">
            Submissions open June 1, 2026. Be ready.
          </h2>

          <div className="mt-8 max-w-3xl mx-auto text-neutral-400 font-light text-base md:text-lg leading-relaxed">
            <p className="mb-8">
              Adorzia Spotlight Fall 2026 is our first-ever national fashion talent event. This is not a rehearsal. This is the real thing - and the people who apply in this first cycle will always be the ones who were here at the beginning.
            </p>
          </div>

          {/* Timeline */}
          <div className="mt-16 grid md:grid-cols-4 gap-8 max-w-4xl mx-auto">
            {[
              { label: "June 1 - July 31, 2026", detail: "Submission window" },
              { label: "August 2026", detail: "Shortlist announced" },
              { label: "September 2026", detail: "Finalist presentations" },
              { label: "Fall 2026", detail: "Spotlight event" }
            ].map((item, i) => (
              <div key={i} className="text-center">
                <div className="font-mono text-[10px] text-[#bb9457] uppercase tracking-[0.2em] mb-2">{item.detail}</div>
                <div className="text-white font-serif text-lg">{item.label}</div>
              </div>
            ))}
          </div>

          {/* Countdown */}
          <div className="mt-20">
            <div className="text-[10px] uppercase tracking-[0.3em] text-neutral-500 font-mono mb-4">Days until submissions open</div>
            <div className="font-serif text-7xl md:text-8xl text-[#bb9457] font-normal">{daysLeft}</div>
            <p className="mt-6 text-neutral-400 font-light text-sm">
              Set a reminder. Tell someone who needs to know. This is the stage Pakistan's fashion visionaries have been waiting for.
            </p>
          </div>

          <div className="mt-12 flex flex-wrap gap-6 justify-center">
            <button className="px-8 py-4 bg-[#bb9457] text-black font-semibold uppercase tracking-[0.2em] text-[11px] rounded-sm hover:bg-white transition-all duration-300">
              Notify me when submissions open
            </button>
            <button className="px-8 py-4 border border-white/30 text-white font-semibold uppercase tracking-[0.2em] text-[11px] rounded-sm hover:border-[#bb9457] hover:text-[#bb9457] transition-all duration-300">
              Share with a creative you believe in
            </button>
          </div>
        </div>
      </section>

      {/* Who Should Apply */}
      <section className="py-40 border-t border-neutral-900">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="max-w-4xl mb-20">
            <span className="text-[10px] uppercase tracking-[0.3em] text-[#bb9457] font-mono font-semibold">Is this for you</span>
            <h2 className="mt-6 font-serif text-4xl md:text-6xl text-white font-normal tracking-tight">
              If any of this sounds like you - apply.
            </h2>
            <p className="mt-6 text-neutral-400 font-light text-base md:text-lg leading-relaxed">
              Spotlight is not reserved for people who already have everything figured out. It is designed for people who have the foundation of something extraordinary and need the platform, the investment, and the support to build it properly. Here is who we are looking for.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8 mb-20">
            {[
              {
                title: "The independent fashion designer",
                body: "You have a creative point of view that is distinctly yours. You have made things - collections, pieces, prototypes - that demonstrate your aesthetic and your craft. You are not just a designer. You are building toward a brand, even if you do not have all the pieces in place yet. You are based anywhere in Pakistan. You are serious.",
                image: designer1
              },
              {
                title: "The fashion entrepreneur",
                body: "You have a business idea at the intersection of fashion, craft, and commerce that you believe Pakistan - and the world - needs. Maybe it is a brand. Maybe it is a product category. Maybe it is a new way of connecting Pakistani textile heritage with contemporary consumers. You have thought about it deeply, and you are ready to build it with the right backing.",
                image: studio
              },
              {
                title: "The heritage craft innovator",
                body: "You work within a traditional Pakistani craft tradition - embroidery, weaving, block printing, mirror work, quilting, textile art - and you have a vision for how that tradition becomes a contemporary brand without losing what makes it extraordinary. You are not just preserving. You are evolving.",
                image: craft
              },
              {
                title: "The emerging fashion creative",
                body: "You are early in your career but your work already shows something that cannot be taught. You may be a recent graduate, a self-taught maker, or someone who has been quietly building in a city that the industry has never visited. You are not waiting to be ready. You are ready now.",
                image: designer2
              }
            ].map((profile, i) => (
              <div key={i} className="group p-10 border border-neutral-900 rounded-sm hover:border-[#bb9457]/30 transition-colors duration-300 bg-neutral-950">
                <div className="aspect-[4/3] overflow-hidden rounded-sm mb-6">
                  <img src={profile.image} alt="" className="w-full h-full object-cover grayscale contrast-125 group-hover:scale-105 transition-transform duration-700" />
                </div>
                <h3 className="font-serif text-2xl text-white font-normal mb-4">{profile.title}</h3>
                <p className="text-neutral-400 font-light leading-relaxed">{profile.body}</p>
              </div>
            ))}
          </div>

          {/* Eligibility Criteria */}
          <div className="grid md:grid-cols-2 gap-12">
            <div>
              <h3 className="text-[10px] uppercase tracking-[0.3em] text-[#bb9457] font-mono font-semibold mb-6">Eligibility criteria</h3>
              <ul className="space-y-4 text-neutral-400 font-light">
                <li className="flex gap-3"><span className="text-[#bb9457] mt-1">-</span><span>Based in Pakistan at the time of application</span></li>
                <li className="flex gap-3"><span className="text-[#bb9457] mt-1">-</span><span>Working in fashion design, textile craft, fashion entrepreneurship, or a discipline at the intersection of these</span></li>
                <li className="flex gap-3"><span className="text-[#bb9457] mt-1">-</span><span>Able to present original work - physical, photographic, or both</span></li>
                <li className="flex gap-3"><span className="text-[#bb9457] mt-1">-</span><span>Eighteen years of age or older</span></li>
                <li className="flex gap-3"><span className="text-[#bb9457] mt-1">-</span><span>Committed to attending finalist presentations if selected - in person or virtually</span></li>
              </ul>
            </div>
            <div>
              <h3 className="text-[10px] uppercase tracking-[0.3em] text-[#bb9457] font-mono font-semibold mb-6">What we do not require</h3>
              <ul className="space-y-4 text-neutral-400 font-light">
                <li className="flex gap-3"><span className="text-[#bb9457] mt-1">-</span><span>A formal design education</span></li>
                <li className="flex gap-3"><span className="text-[#bb9457] mt-1">-</span><span>An existing brand or business registration</span></li>
                <li className="flex gap-3"><span className="text-[#bb9457] mt-1">-</span><span>A minimum number of years in the industry</span></li>
                <li className="flex gap-3"><span className="text-[#bb9457] mt-1">-</span><span>A specific city or region of origin</span></li>
                <li className="flex gap-3"><span className="text-[#bb9457] mt-1">-</span><span>A certain aesthetic, style, or category of fashion</span></li>
              </ul>
              <p className="mt-6 text-white font-normal">We require vision, craft, and the ambition to build something lasting. Everything else is secondary.</p>
            </div>
          </div>
        </div>
      </section>

      {/* What Winners Receive */}
      <section className="py-40 relative overflow-hidden border-t border-neutral-900 bg-neutral-900">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(187,148,87,0.1),transparent_70%)]" />
        
        <div className="max-w-7xl mx-auto px-6 lg:px-8 relative z-10">
          <div className="max-w-4xl mb-20">
            <span className="text-[10px] uppercase tracking-[0.3em] text-[#bb9457] font-mono font-semibold">What Spotlight changes</span>
            <h2 className="mt-6 font-serif text-4xl md:text-6xl text-white font-normal tracking-tight">
              We do not hand out trophies. We build brands.
            </h2>
            <p className="mt-6 text-neutral-400 font-light text-base md:text-lg leading-relaxed">
              Every element of what Spotlight winners receive is designed around one goal - turning an extraordinary creative into a commercially viable, internationally visible fashion brand. This is what that looks like in practice.
            </p>
          </div>

          {/* Featured Winners Showcase */}
          <div className="grid md:grid-cols-3 gap-6 mb-20">
            {[
              { img: winner1, caption: "Spotlight winners receive direct investment" },
              { img: winner2, caption: "Marketplace launch with full support" },
              { img: winner3, caption: "Industry mentorship and media exposure" }
            ].map((item, i) => (
              <div key={i} className="group relative aspect-[3/4] overflow-hidden rounded-sm">
                <img src={item.img} alt="" className="w-full h-full object-cover grayscale contrast-125 group-hover:scale-105 transition-transform duration-700" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
                <div className="absolute bottom-6 left-6 right-6">
                  <p className="text-white font-light text-sm">{item.caption}</p>
                </div>
              </div>
            ))}
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                title: "Direct financial investment",
                body: "Spotlight winners receive direct investment from Adorzia and our partner investor network. This is not prize money to spend however you choose. This is structured investment in your brand - capital for production, branding, market entry, and the early operational costs that stop most talented people from ever launching properly. We invest in you because we believe in your long-term commercial potential. Our success is tied to yours."
              },
              {
                title: "Brand identity and strategy",
                body: "We work with Spotlight winners to develop or refine their brand identity - name, visual language, positioning, and the story that connects their creative vision to the market that needs it. Not a logo package. A complete brand foundation built to last."
              },
              {
                title: "Marketplace launch",
                body: "Every Spotlight winner receives a premium launch presence on the Adorzia Marketplace - with full onboarding support, professional photography guidance, listing strategy, and the visibility that comes with being introduced to our buyer network as a Spotlight-backed brand."
              },
              {
                title: "Industry mentorship",
                body: "Winners are paired with mentors from across the fashion, business, and creative industries - people who have built fashion brands, managed production at scale, navigated international markets, and grown creative businesses from exactly the stage you are at. This is not a one-time conversation. This is an ongoing relationship built around your specific needs and goals."
              },
              {
                title: "Media and press exposure",
                body: "Adorzia will actively pitch Spotlight winners to fashion press, cultural media, and digital platforms in Pakistan and internationally. Your story will be told - in the publications, on the platforms, and in the conversations that shape what the fashion world pays attention to next."
              },
              {
                title: "The Adorzia network",
                body: "Being a Spotlight winner means permanent membership in the Adorzia creative ecosystem - access to our studios, our community, our investor relationships, our buyer network, and every opportunity that the Adorzia platform generates going forward. You do not win Spotlight and go back to where you were. You enter a new chapter entirely."
              }
            ].map((prize, i) => (
              <div key={i} className="p-10 border border-neutral-900 rounded-sm bg-neutral-950 hover:border-[#bb9457]/30 transition-colors duration-300">
                <div className="font-mono text-[10px] text-[#bb9457] uppercase tracking-[0.2em] mb-4">PRIZE {String(i + 1).padStart(2, '0')}</div>
                <h3 className="font-serif text-2xl text-white font-normal mb-4">{prize.title}</h3>
                <p className="text-neutral-400 font-light leading-relaxed text-sm">{prize.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works - Process Timeline */}
      <section className="py-40 border-t border-neutral-900">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="grid lg:grid-cols-12 gap-16">
            <div className="lg:col-span-4">
              <div className="sticky top-32">
                <div className="aspect-[4/5] overflow-hidden rounded-sm mb-8">
                  <img src={spotlightImg} alt="" className="w-full h-full object-cover grayscale contrast-125 hover:scale-105 transition-transform duration-700" />
                </div>
                <span className="text-[10px] uppercase tracking-[0.3em] text-[#bb9457] font-mono font-semibold">The journey</span>
                <h2 className="mt-6 font-serif text-4xl md:text-5xl text-white font-normal tracking-tight">
                  Six stages from application to investment.
                </h2>
              </div>
            </div>
            
            <div className="lg:col-span-8 space-y-12">
            {[
              {
                stage: "01",
                title: "Submit your application",
                timeline: "June 1 - July 31, 2026",
                body: "Complete the Spotlight application form - your creative background, your vision, images or documentation of your work, and a short statement on what you would build with the right support behind you. Applications are reviewed by a panel that includes designers, investors, and creative industry professionals."
              },
              {
                stage: "02",
                title: "First review",
                timeline: "August 2026",
                body: "Every complete application receives a full review. We do not filter by geography, institution, or aesthetic category. We are looking for creative vision, craft quality, and commercial potential - in that order. Shortlisted applicants are contacted directly and invited to the next stage."
              },
              {
                stage: "03",
                title: "Shortlist presentations",
                timeline: "Late August 2026",
                body: "Shortlisted applicants present their work and their vision to the Spotlight selection panel - in person where possible, or virtually for applicants from cities without an Adorzia studio presence. This is a conversation, not an interrogation. We want to understand how you think, what you are building, and why you are the person to build it."
              },
              {
                stage: "04",
                title: "Finalists announced",
                timeline: "September 2026",
                body: "A final group of Spotlight finalists is selected and announced publicly. Finalists receive preparation support from Adorzia ahead of the main event - including mentorship sessions, presentation coaching, and help communicating their creative vision to a live audience."
              },
              {
                stage: "05",
                title: "The Spotlight event",
                timeline: "Fall 2026",
                body: "The main event. Finalists present their work and their brand vision on a live stage in front of an audience of investors, buyers, press, and the Pakistani fashion community. This is the moment. The room will contain the people who can change what happens next for every finalist on that stage."
              },
              {
                stage: "06",
                title: "Investment and partnership",
                timeline: "Following the event",
                body: "Winners are announced and investment partnerships are formalized. The work of building begins immediately - with Adorzia alongside every winner for as long as it takes to turn the vision into a brand that lasts."
              }
            ].map((item, i) => (
              <div key={i} className="grid md:grid-cols-12 gap-8 p-10 border border-neutral-900 rounded-sm bg-neutral-950 hover:border-[#bb9457]/30 transition-colors duration-300">
                <div className="md:col-span-2">
                  <div className="font-mono text-[10px] text-[#bb9457] uppercase tracking-[0.3em] mb-2">Stage {item.stage}</div>
                  <div className="font-mono text-[11px] text-neutral-500">{item.timeline}</div>
                </div>
                <div className="md:col-span-10">
                  <h3 className="font-serif text-2xl text-white font-normal mb-4">{item.title}</h3>
                  <p className="text-neutral-400 font-light leading-relaxed">{item.body}</p>
                </div>
              </div>
            ))}
            </div>
          </div>
        </div>
      </section>
      <section className="py-40 relative overflow-hidden border-t border-neutral-900 bg-neutral-900">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(187,148,87,0.08),transparent_70%)]" />
        
        <div className="max-w-5xl mx-auto px-6 lg:px-8 relative z-10">
          <div className="text-center max-w-3xl mx-auto mb-20">
            <span className="text-[10px] uppercase tracking-[0.3em] text-[#bb9457] font-mono font-semibold">Who will be in the room</span>
            <h2 className="mt-6 font-serif text-4xl md:text-6xl text-white font-normal tracking-tight">
              The people who decide deserve to be here as much as you do.
            </h2>
          </div>

          <div className="max-w-3xl mx-auto space-y-6 text-neutral-400 font-light text-base md:text-lg leading-relaxed text-center mb-16">
            <p>
              Adorzia Spotlight will be judged and mentored by a panel drawn from across Pakistan's fashion, creative, and business communities - designers who have built internationally recognized work, investors who have backed creative businesses, industry figures who understand both the craft and the commerce of fashion entrepreneurship.
            </p>
            <p>
              We are finalizing our panel for Fall 2026 and will announce judges and mentors as confirmations are made.
            </p>
          </div>

          <div className="max-w-3xl mx-auto mb-16">
            <h3 className="text-[10px] uppercase tracking-[0.3em] text-[#bb9457] font-mono font-semibold mb-6 text-center">What we can tell you about our panel criteria</h3>
            <ul className="space-y-4 text-neutral-400 font-light">
              <li className="flex gap-3"><span className="text-[#bb9457] mt-1">-</span><span>Deep knowledge of Pakistani fashion and craft - not just international fashion credentials</span></li>
              <li className="flex gap-3"><span className="text-[#bb9457] mt-1">-</span><span>Commercial experience - people who understand what it takes to build a brand, not just appreciate one</span></li>
              <li className="flex gap-3"><span className="text-[#bb9457] mt-1">-</span><span>Diversity of perspective - across geography, discipline, generation, and background</span></li>
              <li className="flex gap-3"><span className="text-[#bb9457] mt-1">-</span><span>A genuine investment in the future of Pakistani fashion entrepreneurship, not just a high-profile name on a poster</span></li>
            </ul>
          </div>

          <div className="text-center">
            <div className="p-8 border border-neutral-900 rounded-sm bg-neutral-950 mb-8">
              <p className="text-neutral-400 font-light">Judge and mentor announcements coming soon. Follow Adorzia on Instagram and LinkedIn for updates.</p>
            </div>
            <button className="px-8 py-4 border border-white/30 text-white font-semibold uppercase tracking-[0.2em] text-[11px] rounded-sm hover:border-[#bb9457] hover:text-[#bb9457] transition-all duration-300">
              Follow us for panel announcements
            </button>
          </div>
        </div>
      </section>

      {/* Submission Application Form */}
      <section id="apply" className="py-40 border-t border-neutral-900">
        <div className="max-w-4xl mx-auto px-6 lg:px-8">
          <div className="text-center mb-20">
            <span className="text-[10px] uppercase tracking-[0.3em] text-[#bb9457] font-mono font-semibold">Adorzia Spotlight Fall 2026 - application</span>
            <h2 className="mt-6 font-serif text-4xl md:text-5xl text-white font-normal tracking-tight">
              This is your application. Take your time with it.
            </h2>
            <p className="mt-6 text-neutral-400 font-light text-base md:text-lg leading-relaxed max-w-3xl mx-auto">
              We read every submission carefully. There is no word count that guarantees selection and no format that automatically impresses us. Be honest, be specific, and show us what makes your creative vision worth investing in.
            </p>
            <p className="mt-4 text-white font-normal">Submissions open June 1, 2026.</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-12">
            {/* Personal Information */}
            <div>
              <h3 className="text-[10px] uppercase tracking-[0.3em] text-[#bb9457] font-mono font-semibold mb-8">Personal information</h3>
              <div className="space-y-8">
                <div className="grid md:grid-cols-2 gap-8">
                  <div>
                    <label className="text-[10px] uppercase tracking-[0.25em] text-neutral-400 font-semibold block mb-3">Full name *</label>
                    <input type="text" required value={formData.name} onChange={(e) => setFormData({ ...formData, name: e.target.value })} className="w-full border-b border-neutral-800 bg-transparent py-3 text-white outline-none focus:border-[#bb9457] transition-colors" placeholder="Your full name" />
                  </div>
                  <div>
                    <label className="text-[10px] uppercase tracking-[0.25em] text-neutral-400 font-semibold block mb-3">City and province *</label>
                    <input type="text" required value={formData.location} onChange={(e) => setFormData({ ...formData, location: e.target.value })} className="w-full border-b border-neutral-800 bg-transparent py-3 text-white outline-none focus:border-[#bb9457] transition-colors" placeholder="Lahore, Punjab" />
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-8">
                  <div>
                    <label className="text-[10px] uppercase tracking-[0.25em] text-neutral-400 font-semibold block mb-3">Email address *</label>
                    <input type="email" required value={formData.email} onChange={(e) => setFormData({ ...formData, email: e.target.value })} className="w-full border-b border-neutral-800 bg-transparent py-3 text-white outline-none focus:border-[#bb9457] transition-colors" placeholder="your@email.com" />
                  </div>
                  <div>
                    <label className="text-[10px] uppercase tracking-[0.25em] text-neutral-400 font-semibold block mb-3">Phone number *</label>
                    <input type="tel" required value={formData.phone} onChange={(e) => setFormData({ ...formData, phone: e.target.value })} className="w-full border-b border-neutral-800 bg-transparent py-3 text-white outline-none focus:border-[#bb9457] transition-colors" placeholder="+92 xxx xxxxxxx" />
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-8">
                  <div>
                    <label className="text-[10px] uppercase tracking-[0.25em] text-neutral-400 font-semibold block mb-3">Age - must be eighteen or older *</label>
                    <input type="number" required min="18" className="w-full border-b border-neutral-800 bg-transparent py-3 text-white outline-none focus:border-[#bb9457] transition-colors" placeholder="25" />
                  </div>
                  <div>
                    <label className="text-[10px] uppercase tracking-[0.25em] text-neutral-400 font-semibold block mb-3">How did you hear about Spotlight? *</label>
                    <select required className="w-full border-b border-neutral-800 bg-transparent py-3 text-white outline-none focus:border-[#bb9457] transition-colors">
                      <option value="" className="bg-neutral-950">Select an option</option>
                      <option value="instagram" className="bg-neutral-950">Instagram</option>
                      <option value="word-of-mouth" className="bg-neutral-950">Word of mouth</option>
                      <option value="website" className="bg-neutral-950">Adorzia website</option>
                      <option value="press" className="bg-neutral-950">Press coverage</option>
                      <option value="friend" className="bg-neutral-950">A friend or mentor</option>
                      <option value="other" className="bg-neutral-950">Other</option>
                    </select>
                  </div>
                </div>
              </div>
            </div>

            {/* Creative Background */}
            <div>
              <h3 className="text-[10px] uppercase tracking-[0.3em] text-[#bb9457] font-mono font-semibold mb-8">Creative background</h3>
              <div className="space-y-8">
                <div className="grid md:grid-cols-2 gap-8">
                  <div>
                    <label className="text-[10px] uppercase tracking-[0.25em] text-neutral-400 font-semibold block mb-3">Discipline *</label>
                    <select required className="w-full border-b border-neutral-800 bg-transparent py-3 text-white outline-none focus:border-[#bb9457] transition-colors">
                      <option value="" className="bg-neutral-950">Select your discipline</option>
                      <option value="fashion-design" className="bg-neutral-950">Fashion design</option>
                      <option value="textile-craft" className="bg-neutral-950">Textile and heritage craft</option>
                      <option value="entrepreneurship" className="bg-neutral-950">Fashion entrepreneurship</option>
                      <option value="accessories" className="bg-neutral-950">Accessories design</option>
                      <option value="mixed" className="bg-neutral-950">Mixed or interdisciplinary</option>
                      <option value="other" className="bg-neutral-950">Other</option>
                    </select>
                  </div>
                  <div>
                    <label className="text-[10px] uppercase tracking-[0.25em] text-neutral-400 font-semibold block mb-3">Years working in your discipline *</label>
                    <select required className="w-full border-b border-neutral-800 bg-transparent py-3 text-white outline-none focus:border-[#bb9457] transition-colors">
                      <option value="" className="bg-neutral-950">Select duration</option>
                      <option value="<1" className="bg-neutral-950">Less than 1 year</option>
                      <option value="1-3" className="bg-neutral-950">1 to 3 years</option>
                      <option value="3-5" className="bg-neutral-950">3 to 5 years</option>
                      <option value="5+" className="bg-neutral-950">5 or more years</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="text-[10px] uppercase tracking-[0.25em] text-neutral-400 font-semibold block mb-3">Formal education in fashion or design *</label>
                  <select required className="w-full border-b border-neutral-800 bg-transparent py-3 text-white outline-none focus:border-[#bb9457] transition-colors">
                    <option value="" className="bg-neutral-950">Select an option</option>
                    <option value="yes" className="bg-neutral-950">Yes</option>
                    <option value="no" className="bg-neutral-950">No</option>
                    <option value="studying" className="bg-neutral-950">Currently studying</option>
                  </select>
                </div>

                <div>
                  <label className="text-[10px] uppercase tracking-[0.25em] text-neutral-400 font-semibold block mb-3">If yes - institution name (optional)</label>
                  <input type="text" className="w-full border-b border-neutral-800 bg-transparent py-3 text-white outline-none focus:border-[#bb9457] transition-colors" placeholder="Institution name" />
                </div>
              </div>
            </div>

            {/* Your Work */}
            <div>
              <h3 className="text-[10px] uppercase tracking-[0.3em] text-[#bb9457] font-mono font-semibold mb-8">Your work</h3>
              <div className="space-y-8">
                <div>
                  <label className="text-[10px] uppercase tracking-[0.25em] text-neutral-400 font-semibold block mb-3">
                    Describe your creative practice in your own words. What do you make, how do you make it, and what makes it distinctly yours. *<br />
                    <span className="text-neutral-600">(Minimum 100 words)</span>
                  </label>
                  <textarea required rows={8} value={formData.description} onChange={(e) => setFormData({ ...formData, description: e.target.value })} className="w-full border-b border-neutral-800 bg-transparent py-3 text-white outline-none focus:border-[#bb9457] transition-colors resize-none" placeholder="Describe your creative practice..." />
                </div>

                <div>
                  <label className="text-[10px] uppercase tracking-[0.25em] text-neutral-400 font-semibold block mb-3">
                    Upload images of your work<br />
                    <span className="text-neutral-600">Up to 8 images, JPG or PNG, maximum 5 MB each</span>
                  </label>
                  <input type="file" multiple accept="image/jpeg,image/png" className="w-full text-neutral-400 file:bg-neutral-900 file:text-white file:border-0 file:px-4 file:py-2 file:rounded-sm file:cursor-pointer hover:file:bg-neutral-800 transition-colors" />
                </div>

                <div>
                  <label className="text-[10px] uppercase tracking-[0.25em] text-neutral-400 font-semibold block mb-3">
                    If you have a website, portfolio, or social media presence that shows your work, share the link here<br />
                    <span className="text-neutral-600">(Optional)</span>
                  </label>
                  <input type="url" value={formData.portfolio_url} onChange={(e) => setFormData({ ...formData, portfolio_url: e.target.value })} className="w-full border-b border-neutral-800 bg-transparent py-3 text-white outline-none focus:border-[#bb9457] transition-colors" placeholder="https://your-portfolio.com" />
                </div>
              </div>
            </div>

            {/* Your Vision */}
            <div>
              <h3 className="text-[10px] uppercase tracking-[0.3em] text-[#bb9457] font-mono font-semibold mb-8">Your vision</h3>
              <div className="space-y-8">
                <div>
                  <label className="text-[10px] uppercase tracking-[0.25em] text-neutral-400 font-semibold block mb-3">
                    If Adorzia invested in you and gave you everything Spotlight offers - what would you build? Describe the brand, the product, the customer, and the future you are working toward. *<br />
                    <span className="text-neutral-600">(Minimum 150 words)</span>
                  </label>
                  <textarea required rows={10} className="w-full border-b border-neutral-800 bg-transparent py-3 text-white outline-none focus:border-[#bb9457] transition-colors resize-none" placeholder="Describe what you would build..." />
                </div>

                <div>
                  <label className="text-[10px] uppercase tracking-[0.25em] text-neutral-400 font-semibold block mb-3">
                    What is the single biggest obstacle between where you are now and where you want to be? *
                  </label>
                  <textarea required rows={5} className="w-full border-b border-neutral-800 bg-transparent py-3 text-white outline-none focus:border-[#bb9457] transition-colors resize-none" placeholder="Describe your biggest obstacle..." />
                </div>

                <div>
                  <label className="text-[10px] uppercase tracking-[0.25em] text-neutral-400 font-semibold block mb-3">
                    Why is now the right moment for what you are building? *
                  </label>
                  <textarea required rows={5} className="w-full border-b border-neutral-800 bg-transparent py-3 text-white outline-none focus:border-[#bb9457] transition-colors resize-none" placeholder="Explain why now is the right moment..." />
                </div>
              </div>
            </div>

            {/* Heritage and Identity */}
            <div>
              <h3 className="text-[10px] uppercase tracking-[0.3em] text-[#bb9457] font-mono font-semibold mb-8">Heritage and identity - optional section</h3>
              <div className="space-y-8">
                <div>
                  <label className="text-[10px] uppercase tracking-[0.25em] text-neutral-400 font-semibold block mb-3">Does your work draw from a specific Pakistani craft tradition or cultural heritage? *</label>
                  <select className="w-full border-b border-neutral-800 bg-transparent py-3 text-white outline-none focus:border-[#bb9457] transition-colors">
                    <option value="" className="bg-neutral-950">Select an option</option>
                    <option value="yes" className="bg-neutral-950">Yes</option>
                    <option value="no" className="bg-neutral-950">No</option>
                  </select>
                </div>

                <div>
                  <label className="text-[10px] uppercase tracking-[0.25em] text-neutral-400 font-semibold block mb-3">
                    If yes - describe the tradition, how it informs your work, and how you are evolving or preserving it
                  </label>
                  <textarea rows={7} className="w-full border-b border-neutral-800 bg-transparent py-3 text-white outline-none focus:border-[#bb9457] transition-colors resize-none" placeholder="Describe the craft tradition..." />
                </div>
              </div>
            </div>

            {/* Final Question */}
            <div>
              <h3 className="text-[10px] uppercase tracking-[0.3em] text-[#bb9457] font-mono font-semibold mb-8">Final question</h3>
              <div>
                <label className="text-[10px] uppercase tracking-[0.25em] text-neutral-400 font-semibold block mb-3">
                  Is there anything about your background, your circumstances, or your creative journey that you want us to know that the questions above did not give you space to share?<br />
                  <span className="text-neutral-600">(Optional)</span>
                </label>
                <textarea rows={7} className="w-full border-b border-neutral-800 bg-transparent py-3 text-white outline-none focus:border-[#bb9457] transition-colors resize-none" placeholder="Share anything else you want us to know..." />
              </div>
            </div>

            {/* Declaration */}
            <div>
              <h3 className="text-[10px] uppercase tracking-[0.3em] text-[#bb9457] font-mono font-semibold mb-8">Declaration</h3>
              <div className="space-y-4">
                <label className="flex gap-3 items-start cursor-pointer">
                  <input type="checkbox" required className="mt-1 accent-[#bb9457]" />
                  <span className="text-neutral-400 font-light text-sm">I confirm that all work submitted is my own original creative work</span>
                </label>
                <label className="flex gap-3 items-start cursor-pointer">
                  <input type="checkbox" required className="mt-1 accent-[#bb9457]" />
                  <span className="text-neutral-400 font-light text-sm">I confirm that I am based in Pakistan and am eighteen years of age or older</span>
                </label>
                <label className="flex gap-3 items-start cursor-pointer">
                  <input type="checkbox" required className="mt-1 accent-[#bb9457]" />
                  <span className="text-neutral-400 font-light text-sm">I understand that if shortlisted I will be expected to participate in presentation sessions in person or virtually</span>
                </label>
                <label className="flex gap-3 items-start cursor-pointer">
                  <input type="checkbox" required className="mt-1 accent-[#bb9457]" />
                  <span className="text-neutral-400 font-light text-sm">I have read and agree to the Spotlight application terms and conditions</span>
                </label>
              </div>
            </div>

            {error && <div className="text-red-500 text-sm">{error}</div>}

            <div>
              <button type="submit" disabled={submitting} className="inline-flex items-center bg-[#bb9457] text-black px-8 py-4 text-[11px] uppercase tracking-[0.25em] font-semibold hover:bg-white transition-colors disabled:opacity-50">
                {submitting ? 'Submitting…' : 'Submit my application'}
              </button>
              <p className="mt-6 text-neutral-500 font-light text-sm leading-relaxed">
                Submissions close July 31, 2026 at midnight PKT. We will confirm receipt of every complete application within five working days. Incomplete applications will not be reviewed. For any questions about the application process write to spotlight@adorzia.com
              </p>
            </div>
          </form>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-40 relative overflow-hidden border-t border-neutral-900 bg-neutral-900">
        <div className="max-w-4xl mx-auto px-6 lg:px-8">
          <div className="text-center mb-20">
            <span className="text-[10px] uppercase tracking-[0.3em] text-[#bb9457] font-mono font-semibold">Questions we hear most</span>
            <h2 className="mt-6 font-serif text-4xl md:text-6xl text-white font-normal tracking-tight">
              Everything you want to know before you apply.
            </h2>
          </div>

          <div className="space-y-8">
            {[
              { q: "Do I need a formal fashion education to apply?", a: "No. Adorzia Spotlight is open to self-taught creatives, graduates, makers, artisans, and entrepreneurs. We evaluate your work and your vision - not your qualifications. Some of the most extraordinary fashion talent in Pakistan has never set foot in a design institution." },
              { q: "I am not from Lahore or Karachi. Can I still apply?", a: "Yes - and we specifically want to hear from you. One of the central purposes of Spotlight is to discover talent that the conventional fashion industry circuit has never reached. Applications from every province and every city in Pakistan are welcomed equally." },
              { q: "What kind of work qualifies?", a: "Fashion design in any category - ready-to-wear, couture, streetwear, accessories, textile design, heritage craft, or any creative discipline at the intersection of fashion and making. If it is original, Pakistani, and demonstrates a creative vision worth investing in, it qualifies." },
              { q: "Do I need an existing brand or business to apply?", a: "No. You do not need a registered business, an active e-commerce store, or an established following. You need original work and a compelling vision. We are investing in what you are building, not what you have already built." },
              { q: "What does the investment from Adorzia actually look like?", a: "We are finalizing the investment structure for Spotlight Fall 2026 and will publish full details before submissions open on June 1. What we can tell you now is that it is structured investment in your brand - not prize money - and that it comes with the full support of the Adorzia ecosystem alongside the capital." },
              { q: "Can I apply if I work in a traditional craft rather than contemporary fashion design?", a: "Absolutely. Heritage craft makers are among the people Spotlight was most specifically built for. If you work within a Pakistani craft tradition and have a vision for how that tradition becomes a brand - we want your application." },
              { q: "What happens if I am shortlisted but cannot travel to a presentation in person?", a: "We will accommodate virtual presentations for applicants from cities without an Adorzia studio presence. We will not exclude anyone from the shortlist because of geography." },
              { q: "Will my application and work be kept confidential?", a: "Yes. All application materials are reviewed only by the Spotlight selection panel. Your work, your ideas, and your personal information will not be shared publicly without your explicit consent." },
              { q: "When will I hear back after applying?", a: "We will confirm receipt of your application within five working days of submission. Shortlist decisions will be communicated in August 2026. Every applicant receives a response - we do not leave anyone without an answer." },
              { q: "Can I apply for Spotlight and also apply to list on the Adorzia Marketplace?", a: "Yes. These are separate applications and one does not affect the other. We encourage serious applicants to explore every part of the Adorzia ecosystem." },
              { q: "What if I have a question that is not answered here?", a: "Write to us at spotlight@adorzia.com. We answer every question personally." }
            ].map((faq, i) => (
              <div key={i} className="p-8 border border-neutral-900 rounded-sm bg-neutral-950">
                <h3 className="font-serif text-xl text-white font-normal mb-4">{faq.q}</h3>
                <p className="text-neutral-400 font-light leading-relaxed">{faq.a}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Share and Spread the Word */}
      <section className="py-40 border-t border-neutral-900">
        <div className="max-w-4xl mx-auto px-6 lg:px-8 text-center">
          <span className="text-[10px] uppercase tracking-[0.3em] text-[#bb9457] font-mono font-semibold">This belongs to all of Pakistan</span>
          <h2 className="mt-6 font-serif text-4xl md:text-6xl text-white font-normal tracking-tight">
            You might not be the visionary we are looking for. But you probably know who is.
          </h2>

          <div className="mt-8 max-w-3xl mx-auto space-y-6 text-neutral-400 font-light text-base md:text-lg leading-relaxed">
            <p>
              Adorzia Spotlight is only as powerful as the talent it reaches. And the talent we are looking for is not always looking at the right platforms, following the right accounts, or moving in the circles where this kind of news travels.
            </p>
            <p>
              Think about the people in your life who make extraordinary things and do not yet have the stage they deserve. The designer in your city who everyone talks about but nobody outside has ever heard of. The craftsperson whose work stops every person who sees it. The creative entrepreneur with an idea that has been waiting for exactly this moment.
            </p>
            <p className="text-white font-normal">
              Tell them about Spotlight. Send them this page. Show them what is possible.
            </p>
            <p>
              Pakistan's next great fashion brands are out there right now - working quietly, building patiently, waiting for something like this.
            </p>
            <p className="text-[#bb9457] font-semibold">
              Help us find them.
            </p>
          </div>

          <div className="mt-12 space-y-4">
            <p className="text-neutral-500 font-light text-sm italic">"I just found something every Pakistani creative needs to know about."</p>
            <p className="text-neutral-500 font-light text-sm italic">"Submissions open June 1. If you make things in Pakistan, this is your moment."</p>
            <p className="text-neutral-500 font-light text-sm italic">"Adorzia Spotlight is looking for Pakistan's next fashion visionary. It might be you."</p>
          </div>

          <div className="mt-12 flex flex-wrap gap-6 justify-center">
            <button className="px-8 py-4 border border-white/30 text-white font-semibold uppercase tracking-[0.2em] text-[11px] rounded-sm hover:border-[#bb9457] hover:text-[#bb9457] transition-all duration-300">
              Share on Instagram
            </button>
            <button className="px-8 py-4 border border-white/30 text-white font-semibold uppercase tracking-[0.2em] text-[11px] rounded-sm hover:border-[#bb9457] hover:text-[#bb9457] transition-all duration-300">
              Share on WhatsApp
            </button>
            <button className="px-8 py-4 border border-white/30 text-white font-semibold uppercase tracking-[0.2em] text-[11px] rounded-sm hover:border-[#bb9457] hover:text-[#bb9457] transition-all duration-300">
              Copy the link
            </button>
          </div>

          <div className="mt-20 p-10 border border-[#bb9457]/30 rounded-sm bg-neutral-950">
            <p className="text-white font-serif text-xl md:text-2xl font-normal tracking-tight">
              Spotlight Fall 2026. Submissions open June 1. The stage is real. The investment is real. The moment is now.
            </p>
          </div>
        </div>
      </section>
    </div>
  )
}

export default SpotlightEvent
