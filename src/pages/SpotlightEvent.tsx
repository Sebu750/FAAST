import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import SEO from '../components/SEO'
import spotlightImg from '../assets/spotlight.jpg'
import heroRunway from '../assets/hero-runway.jpg'
import studio from '../assets/studio.jpg'
import craft from '../assets/craft.jpg'
import winner1 from '../assets/adorzia-spotlight-award.png'
import brand1 from '../assets/brand1.jpg'
import award2 from '../assets/adorzia-spotlight-awardw.png'

const SpotlightEvent = () => {
  const navigate = useNavigate()
  const [scrollY, setScrollY] = useState(0)
  const [daysLeft, setDaysLeft] = useState(0)
  const [expandedFaq, setExpandedFaq] = useState<number | null>(null)

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY)
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  useEffect(() => {
    const target = new Date("2026-07-31T23:59:59").getTime()
    const interval = setInterval(() => {
      const now = new Date().getTime()
      const difference = target - now
      setDaysLeft(Math.max(0, Math.floor(difference / (1000 * 60 * 60 * 24))))
    }, 1000)
    return () => clearInterval(interval)
  }, [])

  const scrollToSection = (id: string) => {
    const el = document.getElementById(id)
    if (el) el.scrollIntoView({ behavior: 'smooth' })
  }

  const handleApplyNow = () => {
    navigate('/spotlight/apply')
  }

  const toggleFaq = (index: number) => {
    setExpandedFaq(expandedFaq === index ? null : index)
  }

  return (
    <div className="min-h-screen bg-neutral-950 text-white">
      <SEO
        title="Adorzia Spotlight Fall 2026 - Pakistan's First National Fashion Talent Event | Apply Now"
        description="Adorzia Spotlight Fall 2026 is Pakistan's first national fashion talent discovery and investment event. Applications are now open until July 31, 2026. We are searching the entire country for extraordinary fashion designers, heritage craft innovators and fashion entrepreneurs - and investing in the ones who are ready to become brands."
        canonicalURL="https://adorzia.com/spotlight"
        ogTitle="Adorzia Spotlight Fall 2026 - Apply Now"
        ogDescription="Pakistan's first national fashion talent investment event. We find the visionaries. We invest in the brands. Applications open now until July 31, 2026."
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

      <style>{`
        @keyframes ambientSwell {
          0%, 100% { transform: scale(1.02) translate(0px, 0px); }
          50% { transform: scale(1.06) translate(4px, -3px); }
        }
        @keyframes fadeInUp {
          from { opacity: 0; transform: translateY(60px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes fadeInLeft {
          from { opacity: 0; transform: translateX(-60px); }
          to { opacity: 1; transform: translateX(0); }
        }
        @keyframes fadeInRight {
          from { opacity: 0; transform: translateX(60px); }
          to { opacity: 1; transform: translateX(0); }
        }
        @keyframes scaleIn {
          from { opacity: 0; transform: scale(0.9); }
          to { opacity: 1; transform: scale(1); }
        }
        @keyframes shimmer {
          0% { background-position: -200% center; }
          100% { background-position: 200% center; }
        }
        @keyframes float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-20px); }
        }
        @keyframes pulse-glow {
          0%, 100% { box-shadow: 0 0 20px rgba(187, 148, 87, 0.3); }
          50% { box-shadow: 0 0 40px rgba(187, 148, 87, 0.6); }
        }
        .animate-ambient-swell { animation: ambientSwell 20s infinite ease-in-out; }
        .animate-fade-in-up { animation: fadeInUp 1s cubic-bezier(0.16, 1, 0.3, 1) forwards; }
        .animate-fade-in-left { animation: fadeInLeft 1s ease-out forwards; }
        .animate-fade-in-right { animation: fadeInRight 1s ease-out forwards; }
        .animate-scale-in { animation: scaleIn 0.8s ease-out forwards; }
        .animate-shimmer {
          background: linear-gradient(90deg, transparent, rgba(187, 148, 87, 0.4), transparent);
          background-size: 200% 100%;
          animation: shimmer 3s infinite;
        }
        .animate-float { animation: float 6s ease-in-out infinite; }
        .animate-pulse-glow { animation: pulse-glow 2s ease-in-out infinite; }
        .glass {
          background: rgba(255, 255, 255, 0.03);
          backdrop-filter: blur(20px);
          -webkit-backdrop-filter: blur(20px);
          border: 1px solid rgba(255, 255, 255, 0.08);
        }
        .glass-dark {
          background: rgba(0, 0, 0, 0.4);
          backdrop-filter: blur(30px);
          -webkit-backdrop-filter: blur(30px);
          border: 1px solid rgba(255, 255, 255, 0.1);
        }
        .text-gradient {
          background: linear-gradient(135deg, #bb9457 0%, #d4af37 50%, #bb9457 100%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
        }
        .hover-lift {
          transition: transform 0.4s cubic-bezier(0.25, 1, 0.5, 1), box-shadow 0.4s ease;
        }
        .hover-lift:hover {
          transform: translateY(-8px);
          box-shadow: 0 20px 40px rgba(187, 148, 87, 0.15);
        }
      `}</style>

      {/* ============================================
          SECTION 1: HERO
          Main landing section with event title, tagline, and primary CTAs
          ============================================ */}
      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img src={heroRunway} alt="" className="w-full h-full object-cover scale-110 grayscale opacity-50 md:opacity-60" style={{ transform: `translateY(${scrollY * 0.3}px)` }} />
        </div>
        
        {/* Cinematic overlays */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-neutral-950/75 to-neutral-950" />
        <div className="absolute inset-0 bg-black/20" />

        <div className="relative z-10 max-w-6xl mx-auto px-6 lg:px-8 py-24 md:py-32">
          <div className="inline-flex items-center gap-3 glass px-4 md:px-6 py-2 md:py-3 rounded-full mb-6 md:mb-8 animate-fade-in-up">
            <span className="w-2 h-2 rounded-full bg-[#bb9457] animate-pulse-glow" />
            <span className="text-[9px] md:text-[10px] uppercase tracking-[0.3em] text-[#bb9457] font-mono font-semibold">
              Adorzia Spotlight - Fall 2026
            </span>
          </div>

          <h1 className="mt-6 md:mt-8 font-serif text-4xl md:text-6xl lg:text-8xl text-white font-normal leading-[1.1] md:leading-[1.05] tracking-tight max-w-5xl animate-fade-in-up" style={{ animationDelay: '0.2s' }}>
            Pakistan has never had a stage like this. <span className="text-gradient italic font-light">Now it does.</span>
          </h1>

          <div className="mt-6 md:mt-8 max-w-3xl space-y-4 md:space-y-5 text-neutral-300 font-light text-sm md:text-base lg:text-lg leading-relaxed animate-fade-in-up" style={{ animationDelay: '0.4s' }}>
            <p>
              Pakistan's most extraordinary fashion talent isn't always in the front row. Some are in Quetta. Some in Gilgit. Some in workshops nobody outside their street has visited.
            </p>
            <p>
              We're going to find them. Platform them. Invest in the ones ready to become something the world remembers.
            </p>
          </div>
          
          <div className="mt-4 md:mt-6 inline-flex items-center gap-3 px-4 md:px-6 py-2 md:py-3 rounded-full border border-[#bb9457]/30 bg-[#bb9457]/10 backdrop-blur-sm animate-fade-in-up" style={{ animationDelay: '0.5s' }}>
            <p className="text-white font-normal text-xs md:text-sm">
              <span className="text-[#bb9457] font-semibold">Applications are now open</span>
            </p>
          </div>

          <div className="mt-8 md:mt-12 flex flex-wrap gap-4 md:gap-6 animate-fade-in-up" style={{ animationDelay: '0.6s' }}>
            <button onClick={handleApplyNow} className="inline-flex items-center gap-2 md:gap-3 px-6 md:px-10 py-4 md:py-5 bg-[#bb9457] text-black font-semibold uppercase tracking-[0.2em] md:tracking-[0.25em] text-[10px] md:text-[11px] rounded-sm hover:bg-white transition-all duration-300 animate-pulse-glow transform hover:-translate-y-1 hover:shadow-2xl hover:shadow-[#bb9457]/30">
              Apply now
              <span className="text-base md:text-lg">→</span>
            </button>
            <button onClick={() => scrollToSection('mission')} className="inline-flex items-center gap-2 md:gap-3 px-6 md:px-10 py-4 md:py-5 glass text-white font-semibold uppercase tracking-[0.2em] md:tracking-[0.25em] text-[10px] md:text-[11px] rounded-sm hover:border-[#bb9457] hover:text-[#bb9457] transition-all duration-300 transform hover:-translate-y-1">
              Learn how it works
            </button>
          </div>
        </div>
        
        {/* Scroll indicator */}
        <div className="absolute bottom-6 md:bottom-10 left-1/2 transform -translate-x-1/2 animate-bounce">
          <div className="w-5 h-8 md:w-6 md:h-10 border-2 border-[#bb9457]/50 rounded-full flex items-start justify-center p-1.5 md:p-2">
            <div className="w-0.5 md:w-1 h-1.5 md:h-2 bg-[#bb9457] rounded-full animate-pulse" />
          </div>
        </div>
      </section>

      {/* ============================================
          SECTION 2: MISSION
          Explains why Adorzia created Spotlight and the problem it solves
          ============================================ */}
      {/* What Is Spotlight - The Mission */}
      <section id="mission" className="py-24 md:py-32 relative overflow-hidden border-t border-neutral-900">
        <div className="max-w-7xl mx-auto px-6 lg:px-8 relative z-10">
          <div className="grid lg:grid-cols-12 gap-12 md:gap-16 items-start">
            <div className="lg:col-span-5">
              <div className="sticky top-32">
                {/* Main image - Studio/Workshop */}
                <div className="aspect-[4/5] overflow-hidden rounded-sm mb-4 md:mb-6 hover-lift shadow-2xl shadow-black/50">
                  <img src={craft} alt="" className="w-full h-full object-cover scale-110 grayscale contrast-125 hover:scale-115 transition-transform duration-700" />
                </div>
                <div className="grid grid-cols-2 gap-3 md:gap-4">
                  {/* Craft detail shot */}
                  <div className="aspect-square overflow-hidden rounded-sm hover-lift shadow-xl shadow-black/50">
                    <img src={craft} alt="" className="w-full h-full object-cover scale-110 grayscale contrast-125 hover:scale-115 transition-transform duration-700" />
                  </div>
                  {/* Spotlight event image */}
                  <div className="aspect-square overflow-hidden rounded-sm hover-lift shadow-xl shadow-black/50">
                    <img src={craft} alt="" className="w-full h-full object-cover scale-110 grayscale contrast-125 hover:scale-115 transition-transform duration-700" />
                  </div>
                </div>
              </div>
            </div>
            
            <div className="lg:col-span-7">
              <div className="max-w-3xl mb-8 md:mb-10">
                {/* Solid line accent instead of badge */}
                <div className="w-16 h-1 bg-[#bb9457] mb-4" />
                <span className="text-[9px] md:text-[10px] uppercase tracking-[0.3em] text-[#bb9457] font-mono font-semibold">
                  Why we created this
                </span>
                <h2 className="mt-4 md:mt-6 font-serif text-3xl md:text-5xl lg:text-6xl text-white font-normal tracking-tight">
                  Talent is not rare in Pakistan. The right opportunity is.
                </h2>
              </div>

              <div className="max-w-3xl space-y-6">
                {/* Short paragraph */}
                <p className="text-neutral-400 font-light text-sm md:text-base leading-relaxed">
                  Every year, hundreds of extraordinary Pakistani fashion creatives go unrecognized - not because they lack talent, but because there's no system to find them.
                </p>
                
                {/* Quote card */}
                <div className="p-6 bg-neutral-900 border-l-4 border-[#bb9457]">
                  <p className="text-white font-serif text-lg md:text-xl italic leading-relaxed">
                    Fashion talent discovery has been informal, geography-dependent, and connected to who you know.
                  </p>
                </div>
                
                {/* Highlight statement */}
                <div className="p-5 bg-[#bb9457]/10 border border-[#bb9457]/30 text-center">
                  <p className="text-[#bb9457] font-semibold text-base md:text-lg">
                    Adorzia Spotlight was built to change that permanently.
                  </p>
                </div>
                <p>
                  The next generation of globally recognized Pakistani brands will emerge from wherever the right person is working - geography and connections should never decide who gets seen.
                </p>
                
                {/* Visual cards - Why Different */}
                <div className="grid gap-3">
                  {[
                    { label: "Nationwide search", detail: "Not limited to fashion capitals" },
                    { label: "Investment-focused", detail: "We build brands, not just give awards" },
                    { label: "Transparent evaluation", detail: "Clear criteria, no gatekeeping" },
                    { label: "Permanent support", detail: "Not a one-time event" }
                  ].map((item, idx) => (
                    <div key={idx} className="p-4 bg-neutral-900/50 border border-neutral-800 flex items-center gap-3">
                      <span className="text-[#bb9457] text-lg flex-shrink-0">→</span>
                      <div>
                        <span className="text-white font-medium text-sm">{item.label}</span>
                        <span className="text-neutral-400 font-light text-sm ml-2">- {item.detail}</span>
                      </div>
                    </div>
                  ))}
                </div>
                
                {/* Short closing statement */}
                <p className="text-neutral-400 font-light text-sm md:text-base leading-relaxed">
                  This is a rigorous, nationwide discovery process. We're looking for vision, craft, commercial instinct, and creative identities that can anchor global brands.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ============================================
          SECTION 3: SUBMISSIONS
          Timeline, countdown, and submission dates
          ============================================ */}
      {/* Submissions Open Section */}
      <section id="submissions" className="py-24 md:py-32 relative overflow-hidden border-t border-neutral-900">
        <div className="absolute inset-0 z-0">
          <img src={spotlightImg} alt="" className="w-full h-full object-cover scale-110 grayscale opacity-20 animate-ambient-swell" />
        </div>
        <div className="absolute inset-0 bg-gradient-to-b from-neutral-950 via-neutral-950/95 to-neutral-950" />
        
        <div className="max-w-7xl mx-auto px-6 lg:px-8 relative z-10">
          <div className="grid lg:grid-cols-2 gap-12 md:gap-16 items-center">
            {/* Left Content */}
            <div>
              {/* Simple text label instead of glass badge */}
              <div className="flex items-center gap-3 mb-4">
                <div className="w-2 h-2 rounded-full bg-[#bb9457]" />
                <span className="text-[10px] uppercase tracking-[0.3em] text-[#bb9457] font-mono font-semibold">The moment is coming</span>
              </div>
              <h2 className="mt-4 md:mt-6 font-serif text-3xl md:text-4xl text-white font-normal tracking-tight leading-tight">
                Applications are open. <span className="text-gradient italic font-light">Submit before July 31.</span>
              </h2>
              <p className="mt-4 text-neutral-400 font-light text-sm md:text-base leading-relaxed">
                Pakistan's first national fashion talent event. Applications close July 31.
              </p>
              
              {/* Timeline - Visual cards */}
              <div className="mt-8 space-y-3">
                {[
                  { label: "June 1 - July 31, 2026", detail: "Submission window — ACTIVE NOW", number: "01", active: true },
                  { label: "August 2026", detail: "Shortlist announced", number: "02" },
                  { label: "September 2026", detail: "Finalist presentations", number: "03" },
                  { label: "Fall 2026", detail: "Spotlight event", number: "04" }
                ].map((item, i) => (
                  <div key={i} className={`group flex items-center gap-4 p-4 ${item.active ? 'bg-[#bb9457]/10 border-[#bb9457]/40' : 'bg-neutral-950 border-neutral-800'} border hover:border-[#bb9457]/50 transition-all duration-300`}>
                    <div className={`flex-shrink-0 w-8 h-8 rounded-full ${item.active ? 'bg-[#bb9457] border-[#bb9457]' : 'bg-neutral-900 border-[#bb9457]/40'} flex items-center justify-center group-hover:border-[#bb9457] transition-colors duration-300`}>
                      <span className={`font-mono text-xs ${item.active ? 'text-black' : 'text-[#bb9457]'} font-bold`}>{item.number}</span>
                    </div>
                    <div className="flex-1">
                      <div className="text-white font-normal text-sm">{item.label}</div>
                      <div className="font-mono text-[9px] text-neutral-500 uppercase tracking-wider">{item.detail}</div>
                    </div>
                  </div>
                ))}
              </div>

              <div className="mt-8 flex flex-wrap gap-4">
                <button onClick={handleApplyNow} className="inline-flex items-center gap-3 px-8 py-4 bg-[#bb9457] text-black font-semibold uppercase tracking-[0.2em] text-[11px] rounded-sm hover:bg-white transition-all duration-300 animate-pulse-glow transform hover:-translate-y-1 hover:shadow-2xl hover:shadow-[#bb9457]/30">
                  Apply now
                  <span className="text-lg">→</span>
                </button>
                <button className="inline-flex items-center gap-3 px-8 py-4 glass text-white font-medium text-sm rounded-sm hover:border-[#bb9457] hover:text-[#bb9457] transition-all duration-300">
                  Share with a creative
                </button>
              </div>
            </div>
            
            {/* Right Image & Countdown - Use winner3 for submissions */}
            <div className="relative space-y-6">
              <div className="aspect-[4/5] overflow-hidden rounded-sm shadow-2xl shadow-black/50">
                <img src={award2} alt="Spotlight Submissions" className="w-full h-full object-cover scale-110 hover:scale-120 transition-all duration-700" />
              </div>
              {/* Countdown Overlay */}
              <div className="absolute -bottom-6 -left-6 w-40 p-6 bg-[#bb9457]/10 backdrop-blur-md border border-[#bb9457]/30 rounded-sm">
                <div className="text-[10px] uppercase tracking-[0.3em] text-neutral-400 font-mono mb-2">Days until deadline</div>
                <div className="font-serif text-5xl text-[#bb9457] font-normal">{daysLeft}</div>
              </div>
              {/* Corner accent */}
              <div className="absolute -top-4 -right-4 w-24 h-24 border-t-2 border-r-2 border-[#bb9457]/50 rounded-tr-3xl" />
            </div>
          </div>
        </div>
      </section>

      {/* ============================================
          SECTION 4: ELIGIBILITY
          Who should apply, profile types, and eligibility criteria
          ============================================ */}
      {/* Who Should Apply */}
      <section id="who-should-apply" className="py-24 md:py-32 border-t border-neutral-900 relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-6 lg:px-8 relative z-10">
          <div className="max-w-4xl mb-12 md:mb-16">
            {/* Numbered header instead of badge */}
            <div className="flex items-center gap-4 mb-4">
              <span className="font-mono text-4xl text-[#bb9457]/30 font-bold">04</span>
              <span className="text-[10px] uppercase tracking-[0.3em] text-[#bb9457] font-mono font-semibold">Is this for you</span>
            </div>
            <h2 className="mt-4 md:mt-6 font-serif text-3xl md:text-4xl text-white font-normal tracking-tight">
              If any of this sounds like you - <span className="text-gradient italic font-light">apply.</span>
            </h2>
            <p className="mt-4 text-neutral-400 font-light text-sm md:text-base leading-relaxed">
              Spotlight is for those with the foundation of something extraordinary - who need the platform, investment, and support to build it properly.
            </p>
          </div>

          {/* Profile Types - Minimal cards with left border */}
          <div className="grid md:grid-cols-2 gap-6 md:gap-8 mb-12 md:mb-16">
            {[
              {
                icon: "✦",
                title: "The independent fashion designer",
                body: "You have a distinct creative point of view. You've made things that demonstrate your aesthetic and craft. You're building toward a brand."
              },
              {
                icon: "✦",
                title: "The fashion entrepreneur",
                body: "You have a business idea at the intersection of fashion, craft, and commerce that Pakistan and the world needs."
              },
              {
                icon: "✦",
                title: "The heritage craft innovator",
                body: "You work within a traditional Pakistani craft and have a vision for making it a contemporary brand without losing what makes it extraordinary."
              },
              {
                icon: "✦",
                title: "The emerging fashion creative",
                body: "You're early in your career but your work shows something that can't be taught - talent that speaks for itself."
              }
            ].map((profile, i) => (
              <div key={i} className="group p-8 bg-neutral-950 border-l-2 border-neutral-800 hover:border-[#bb9457] transition-all duration-300">
                <h3 className="font-serif text-xl text-white font-normal mb-3 group-hover:text-[#bb9457] transition-colors duration-300">{profile.title}</h3>
                <p className="text-neutral-400 font-light leading-relaxed text-sm">{profile.body}</p>
              </div>
            ))}
          </div>

          {/* Eligibility Criteria - Split layout with contrast */}
          <div className="grid md:grid-cols-2 gap-0 bg-neutral-950 border border-neutral-800">
            <div className="p-8 md:p-10 border-b md:border-b-0 md:border-r border-neutral-800">
              <h3 className="text-[10px] uppercase tracking-[0.3em] text-[#bb9457] font-mono font-semibold mb-6">Eligibility criteria</h3>
              <ul className="space-y-3">
                {[
                  "Based in Pakistan at the time of application",
                  "Working in fashion design, heritage craft, fashion entrepreneurship, or related discipline",
                  "Able to present original work - physical, photographic, or both",
                  "Eighteen years of age or older",
                  "Committed to attending finalist presentations if selected"
                ].map((item, idx) => (
                  <li key={idx} className="flex gap-3 items-start group">
                    <span className="text-[#bb9457] mt-1 flex-shrink-0 group-hover:scale-125 transition-transform duration-300">→</span>
                    <span className="text-neutral-300 font-light text-sm group-hover:text-white transition-colors duration-300">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div className="p-8 md:p-10 bg-neutral-900/50">
              <h3 className="text-[10px] uppercase tracking-[0.3em] text-[#bb9457] font-mono font-semibold mb-6">What we do not require</h3>
              <ul className="space-y-3">
                {[
                  "A formal design education",
                  "An existing brand or business registration",
                  "A minimum number of years in the industry",
                  "A specific city or region of origin",
                  "A certain aesthetic, style, or category of fashion"
                ].map((item, idx) => (
                  <li key={idx} className="flex gap-3 items-start group">
                    <span className="text-[#bb9457] mt-1 flex-shrink-0 group-hover:scale-125 transition-transform duration-300">→</span>
                    <span className="text-neutral-400 font-light text-sm group-hover:text-white transition-colors duration-300">{item}</span>
                  </li>
                ))}
              </ul>
              <div className="mt-6 p-4 bg-[#bb9457]/5 border-l-2 border-[#bb9457] rounded-r-sm">
                <p className="text-white font-normal text-sm">We require vision, craft, and the ambition to build something lasting. Everything else is secondary.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ============================================
          SECTION 5: BENEFITS
          What winners receive - featured and secondary benefits
          ============================================ */}
      {/* What Winners Receive */}
      <section id="winners" className="py-24 md:py-32 relative overflow-hidden border-t border-neutral-900">
        <div className="absolute inset-0 z-0">
          <img src={winner1} alt="" className="w-full h-full object-cover scale-110 opacity-15 grayscale" />
        </div>
        <div className="absolute inset-0 bg-gradient-to-b from-neutral-950 via-neutral-950/97 to-neutral-950" />
        
        <div className="max-w-7xl mx-auto px-6 lg:px-8 relative z-10">
          <div className="max-w-4xl mb-12 md:mb-16">
            {/* Large number background */}
            <div className="relative">
              <div className="absolute -top-8 -left-4 font-mono text-8xl text-[#bb9457]/5 font-bold">05</div>
              <div className="relative">
                <span className="text-[10px] uppercase tracking-[0.3em] text-[#bb9457] font-mono font-semibold">What Spotlight changes</span>
                <h2 className="mt-4 md:mt-6 font-serif text-3xl md:text-4xl text-white font-normal tracking-tight">
                  We do not hand out trophies. <span className="text-gradient italic font-light">We build brands.</span>
                </h2>
              </div>
            </div>
            <p className="mt-4 text-neutral-400 font-light text-sm md:text-base leading-relaxed">
              Every benefit turns an extraordinary creative into a commercially viable, internationally visible fashion brand.
            </p>
          </div>

          {/* Featured Benefits - Large Cards - Use winner2 for investment visual */}
          <div className="space-y-8 md:space-y-10 mb-12 md:mb-16">
            {[
              {
                title: "Direct financial investment",
                body: "Capital for production, branding, market entry, and early operational costs.",
                highlight: "Strategic investment, not prize money.",
                number: "01",
                image: award2
              },
              {
                title: "Marketplace launch",
                body: "Premium launch presence on Adorzia Marketplace with full onboarding and buyer network visibility.",
                highlight: "Premium visibility from day one.",
                number: "02",
                image: brand1
              },
              {
                title: "Industry mentorship",
                body: "Paired with mentors who have built fashion brands and navigated international markets.",
                highlight: "Ongoing mentorship, not one-time advice.",
                number: "03",
                image: studio
              }
            ].map((prize, i) => (
              <div key={i} className="group relative">
                <div className="relative p-10 md:p-12 glass rounded-sm hover:border-[#bb9457]/40 transition-all duration-500 hover-lift hover:shadow-2xl hover:shadow-[#bb9457]/10 overflow-hidden">
                  {/* Side accent */}
                  <div className="absolute top-0 left-0 w-1 h-full bg-gradient-to-b from-[#bb9457]/50 via-[#bb9457]/30 to-transparent" />
                  
                  {/* Background image overlay */}
                  <div className="absolute inset-0 z-0 opacity-5 group-hover:opacity-10 transition-opacity duration-500">
                    <img src={prize.image} alt="" className="w-full h-full object-cover grayscale" />
                  </div>
                  
                  {/* Number */}
                  <div className="absolute top-6 right-8 font-mono text-7xl text-[#bb9457]/10 font-bold">
                    {prize.number}
                  </div>
                  
                  <div className="relative z-10 max-w-3xl">
                    <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-neutral-900 border border-neutral-800 rounded-sm mb-6">
                      <span className="font-mono text-[9px] text-[#bb9457] uppercase tracking-[0.2em]">FEATURED</span>
                    </div>
                    
                    <h3 className="font-serif text-2xl md:text-3xl text-white font-normal mb-4 group-hover:text-[#bb9457] transition-colors duration-300">{prize.title}</h3>
                    <p className="text-neutral-300 font-light leading-relaxed text-sm md:text-base mb-6">{prize.body}</p>
                    
                    <div className="inline-flex items-center gap-2 px-4 py-2 rounded-sm bg-[#bb9457]/5 border border-[#bb9457]/20">
                      <span className="text-[#bb9457] text-xs">✦</span>
                      <span className="text-[#bb9457] font-medium text-xs">{prize.highlight}</span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Secondary Benefits - Smaller Grid */}
          <div className="grid md:grid-cols-3 gap-6 md:gap-8">
            {[
              {
                title: "Media and press exposure",
                body: "Active pitching to fashion press and digital platforms in Pakistan and internationally.",
                highlight: "Your story, told globally.",
                number: "04"
              },
              {
                title: "The Adorzia network",
                body: "Permanent membership in the Adorzia creative ecosystem - studios, community, investor relationships.",
                highlight: "Permanent membership, lasting impact.",
                number: "05"
              },
              {
                title: "Brand identity and strategy",
                body: "Complete brand development - name, visual language, positioning, and market story.",
                highlight: "A brand foundation built to last.",
                number: "06"
              }
            ].map((prize, i) => (
              <div key={i} className="group relative">
                <div className="relative p-8 glass rounded-sm hover:border-[#bb9457]/40 transition-all duration-500 hover-lift hover:shadow-2xl hover:shadow-[#bb9457]/10 overflow-hidden h-full">
                  {/* Number */}
                  <div className="absolute top-4 right-6 font-mono text-5xl text-[#bb9457]/10 font-bold">
                    {prize.number}
                  </div>
                  
                  <div className="relative z-10">
                    <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#bb9457]/10 border border-[#bb9457]/20 mb-4">
                      <span className="font-mono text-[9px] text-[#bb9457] uppercase tracking-[0.2em]">Benefit {prize.number}</span>
                    </div>
                    
                    <h3 className="font-serif text-xl text-white font-normal mb-3 group-hover:text-[#bb9457] transition-colors duration-300">{prize.title}</h3>
                    <p className="text-neutral-300 font-light leading-relaxed text-sm mb-4">{prize.body}</p>
                    
                    <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-sm bg-[#bb9457]/5 border border-[#bb9457]/20">
                      <span className="text-[#bb9457] text-xs">✦</span>
                      <span className="text-[#bb9457] font-medium text-xs">{prize.highlight}</span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ============================================
          SECTION 6: AWARD
          Spotlight Award showcase and prestige positioning
          ============================================ */}
      {/* Adorzia Spotlight Award */}
      <section id="award" className="py-32 md:py-40 relative overflow-hidden border-t border-neutral-900">
        {/* Full cinematic background */}
        <div className="absolute inset-0 z-0">
          <img src={award2} alt="" className="w-full h-full object-cover scale-105 opacity-30 grayscale" />
        </div>
        <div className="absolute inset-0 bg-gradient-to-b from-neutral-950 via-neutral-950/92 to-neutral-950" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(187,148,87,0.18),transparent_65%)]" />
        
        <div className="max-w-7xl mx-auto px-6 lg:px-8 relative z-10">
          {/* Large cinematic trophy visual - Full width hero */}
          <div className="relative mb-16 md:mb-24">
            <div className="grid md:grid-cols-2 gap-12 md:gap-16 items-center">
              {/* Left: Trophy Image */}
              <div className="relative group">
                <div className="aspect-[4/5] overflow-hidden rounded-sm shadow-2xl shadow-[#bb9457]/30">
                  <img src={award2} alt="Adorzia Spotlight Award Trophy" className="w-full h-full object-cover scale-110 grayscale contrast-125 group-hover:scale-115 transition-transform duration-700" />
                </div>
                {/* Dramatic corner accents */}
                <div className="absolute -top-6 -left-6 w-24 h-24 border-t-2 border-l-2 border-[#bb9457]/60" />
                <div className="absolute -bottom-6 -right-6 w-24 h-24 border-b-2 border-r-2 border-[#bb9457]/60" />
                {/* Glow behind image */}
                <div className="absolute inset-0 bg-[#bb9457]/10 blur-3xl rounded-full scale-125 -z-10 group-hover:bg-[#bb9457]/20 transition-all duration-500" />
              </div>
              
              {/* Right: Award Headline & Description */}
              <div className="text-left">
                {/* Award badge - Bold and prominent */}
                <div className="inline-flex items-center gap-3 px-4 py-2 bg-[#bb9457]/10 border border-[#bb9457]/40 rounded-sm mb-8">
                  <span className="w-2 h-2 rounded-full bg-[#bb9457] animate-pulse-glow" />
                  <span className="text-[10px] uppercase tracking-[0.3em] text-[#bb9457] font-mono font-semibold">THE AWARD</span>
                </div>
                
                {/* Main headline */}
                <h2 className="font-serif text-4xl md:text-5xl lg:text-6xl text-white font-normal tracking-tight leading-tight mb-6">
                  The Adorzia<br />
                  Spotlight Award
                </h2>
                
                {/* Subheadline */}
                <p className="font-serif text-xl md:text-2xl lg:text-3xl text-[#bb9457] font-light italic leading-relaxed mb-8">
                  A symbol of fashion vision, heritage craftsmanship, and entrepreneurial ambition.
                </p>
                
                {/* Supporting copy - Short paragraphs */}
                <p className="text-neutral-300 font-light text-base md:text-lg leading-relaxed mb-4">
                  This is not just recognition. It's a declaration that Pakistani fashion talent deserves the same stage as the CFDA Awards, Fashion Trust Arabia, the LVMH Prize.
                </p>
                <p className="text-neutral-400 font-light text-sm md:text-base leading-relaxed">
                  The Spotlight Award signals to the world that Pakistan's next great fashion brands have arrived.
                </p>
              </div>
            </div>
          </div>

          {/* Award Pillars - Clean horizontal layout */}
          <div className="max-w-5xl mx-auto mb-20">
            <div className="grid md:grid-cols-3 gap-12 md:gap-16">
              {[
                {
                  title: "Fashion Vision",
                  description: "Original creative identity that redefines what Pakistani fashion can be",
                  icon: "◈"
                },
                {
                  title: "Heritage Craft",
                  description: "Deep respect for Pakistani craft traditions with contemporary relevance",
                  icon: "◈"
                },
                {
                  title: "Entrepreneurial Ambition",
                  description: "The drive to build brands that compete on the global stage",
                  icon: "◈"
                }
              ].map((pillar, i) => (
                <div key={i} className="text-center group">
                  {/* Icon with gold circle */}
                  <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-[#bb9457]/10 border-2 border-[#bb9457]/40 mb-6 group-hover:scale-110 group-hover:border-[#bb9457] transition-all duration-300">
                    <span className="text-[#bb9457] text-3xl">{pillar.icon}</span>
                  </div>
                  <h3 className="font-serif text-2xl text-white font-normal mb-3 group-hover:text-[#bb9457] transition-colors duration-300">{pillar.title}</h3>
                  <p className="text-neutral-400 font-light text-sm leading-relaxed">{pillar.description}</p>
                </div>
              ))}
            </div>
          </div>
          
          {/* Prestige Statement */}
          <div className="max-w-4xl mx-auto mb-12">
            <div className="relative p-10 md:p-12 bg-neutral-950/80 border border-[#bb9457]/30">
              {/* Decorative quotes */}
              <div className="absolute top-4 left-6 font-serif text-6xl text-[#bb9457]/20">"</div>
              <div className="absolute bottom-4 right-6 font-serif text-6xl text-[#bb9457]/20">"</div>
              
              <p className="text-white font-serif text-xl md:text-2xl lg:text-3xl font-normal tracking-tight leading-relaxed text-center relative z-10">
                Pakistan has waited for this moment. The Adorzia Spotlight Award is where extraordinary creative talent meets the investment, platform, and recognition it deserves.
              </p>
              <div className="mt-6 flex items-center justify-center gap-4">
                <div className="w-16 h-px bg-gradient-to-r from-transparent to-[#bb9457]" />
                <span className="text-[#bb9457] font-mono text-xs uppercase tracking-[0.3em]">Adorzia Spotlight Fall 2026</span>
                <div className="w-16 h-px bg-gradient-to-l from-transparent to-[#bb9457]" />
              </div>
            </div>
          </div>
          
          {/* CTA */}
          <div className="mb-12 text-center">
            <button onClick={handleApplyNow} className="inline-flex items-center gap-3 px-12 py-6 bg-[#bb9457] text-black font-semibold uppercase tracking-[0.3em] text-[12px] rounded-sm hover:bg-white transition-all duration-300 animate-pulse-glow transform hover:-translate-y-1 hover:shadow-2xl hover:shadow-[#bb9457]/40">
              Apply for the Award
              <span className="text-xl">→</span>
            </button>
          </div>
          
          {/* Founding Class 2026 - Solid card */}
          <div className="max-w-3xl mx-auto p-8 bg-neutral-900/90 border border-[#bb9457]/30">
            <div className="flex items-center justify-center gap-3 mb-4">
              <div className="w-2 h-2 rounded-full bg-[#bb9457] animate-pulse-glow" />
              <span className="text-[#bb9457] font-mono text-[11px] uppercase tracking-[0.3em] font-semibold">Founding Class 2026</span>
              <div className="w-2 h-2 rounded-full bg-[#bb9457] animate-pulse-glow" />
            </div>
            <p className="text-white font-light text-sm md:text-base leading-relaxed text-center">
              The first cohort of Spotlight winners will always hold a special place in Adorzia's history. You won't just be winners - you'll be the founding class that proved Pakistani fashion talent deserves the world stage. Applications from this inaugural cycle will be remembered.
            </p>
          </div>
        </div>
      </section>

      {/* ============================================
          SECTION 7: SELECTION CRITERIA
          Transparent evaluation scorecard with weighted criteria
          ============================================ */}
      {/* Selection Criteria */}
      <section id="criteria" className="py-24 md:py-32 relative overflow-hidden border-t border-neutral-900">
        <div className="absolute inset-0 z-0">
          {/* Use craft imagery for evaluation section */}
          <img src={craft} alt="" className="w-full h-full object-cover scale-110 opacity-10 grayscale" />
        </div>
        <div className="absolute inset-0 bg-gradient-to-b from-neutral-950 via-neutral-950/97 to-neutral-950" />
        
        <div className="max-w-6xl mx-auto px-6 lg:px-8 relative z-10">
          <div className="text-center max-w-3xl mx-auto mb-16">
            {/* Bold header with gold accent */}
            <div className="mb-6">
              <div className="inline-block px-4 py-1 bg-[#bb9457] text-black text-[10px] uppercase tracking-[0.3em] font-mono font-semibold mb-4">EVALUATION</div>
              <h2 className="font-serif text-3xl md:text-5xl text-white font-normal tracking-tight">
                Selection criteria. <span className="text-gradient italic font-light">Transparent and rigorous.</span>
              </h2>
            </div>
            <p className="mt-4 text-neutral-400 font-light text-sm md:text-base leading-relaxed">
              Every application is evaluated against the same five criteria by our selection panel. Here's exactly what we're looking for.
            </p>
          </div>

          {/* Scorecard */}
          <div className="max-w-4xl mx-auto">
            <div className="glass rounded-sm border border-[#bb9457]/20 overflow-hidden">
              {/* Header */}
              <div className="p-6 md:p-8 border-b border-[#bb9457]/20 bg-[#bb9457]/5">
                <div className="flex items-center justify-between">
                  <h3 className="font-serif text-xl md:text-2xl text-white font-normal">Adorzia Spotlight Evaluation Scorecard</h3>
                  <div className="text-right">
                    <div className="font-mono text-[10px] uppercase tracking-[0.2em] text-[#bb9457]">Total Weight</div>
                    <div className="font-serif text-3xl text-[#bb9457] font-normal">100%</div>
                  </div>
                </div>
              </div>

              {/* Criteria Items */}
              <div className="divide-y divide-neutral-800">
                {[
                  {
                    category: "Creative Vision",
                    weight: 30,
                    description: "Distinct aesthetic point of view, clarity of creative identity, and unique fashion perspective.",
                    icon: "◈"
                  },
                  {
                    category: "Craft Quality",
                    weight: 25,
                    description: "Technical skill, attention to detail, quality of execution, and mastery of materials.",
                    icon: "◈"
                  },
                  {
                    category: "Commercial Potential",
                    weight: 20,
                    description: "Market viability, understanding of target audience, pricing strategy, and path to sustainable business.",
                    icon: "◈"
                  },
                  {
                    category: "Originality",
                    weight: 15,
                    description: "Innovation in design, fresh approach to Pakistani fashion, and genuinely new work.",
                    icon: "◈"
                  },
                  {
                    category: "Brand Story",
                    weight: 10,
                    description: "Compelling narrative, authentic connection to heritage, and emotional resonance.",
                    icon: "◈"
                  }
                ].map((criterion, i) => (
                  <div key={i} className="group p-6 md:p-8 hover:bg-white/5 transition-all duration-300">
                    <div className="flex items-start gap-4 md:gap-6">
                      {/* Icon & Rank */}
                      <div className="flex-shrink-0">
                        <div className="w-12 h-12 rounded-full bg-[#bb9457]/10 border border-[#bb9457]/30 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                          <span className="text-[#bb9457] text-lg">{criterion.icon}</span>
                        </div>
                      </div>
                      
                      {/* Content */}
                      <div className="flex-1">
                        <div className="flex items-start justify-between gap-4 mb-3">
                          <div>
                            <h4 className="font-serif text-lg text-white font-normal mb-1 group-hover:text-[#bb9457] transition-colors duration-300">{criterion.category}</h4>
                            <p className="text-neutral-400 font-light text-sm leading-relaxed">{criterion.description}</p>
                          </div>
                          
                          {/* Weight Badge */}
                          <div className="flex-shrink-0">
                            <div className="px-4 py-2 rounded-sm bg-[#bb9457]/10 border border-[#bb9457]/30">
                              <span className="font-mono text-2xl text-[#bb9457] font-bold">{criterion.weight}%</span>
                            </div>
                          </div>
                        </div>
                        
                        {/* Progress Bar */}
                        <div className="mt-4 h-1 bg-neutral-800 rounded-full overflow-hidden">
                          <div 
                            className="h-full bg-gradient-to-r from-[#bb9457] to-[#d4af37] rounded-full transition-all duration-1000 ease-out"
                            style={{ width: `${criterion.weight}%` }}
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Footer Note */}
              <div className="p-6 md:p-8 border-t border-[#bb9457]/20 bg-[#bb9457]/5">
                <div className="flex items-start gap-3">
                  <span className="text-[#bb9457] text-lg flex-shrink-0">→</span>
                  <p className="text-neutral-300 font-light text-sm leading-relaxed">
                    Applications are scored independently by multiple panel members. Shortlist decisions are based on cumulative scores across all five criteria, not any single factor. We're looking for well-rounded creative entrepreneurs, not perfection in one area.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* CTA */}
          <div className="mt-12 text-center">
            <button onClick={handleApplyNow} className="inline-flex items-center gap-3 px-10 py-5 bg-[#bb9457] text-black font-semibold uppercase tracking-[0.25em] text-[11px] rounded-sm hover:bg-white transition-all duration-300 animate-pulse-glow transform hover:-translate-y-1 hover:shadow-2xl hover:shadow-[#bb9457]/30">
              Apply with confidence
              <span className="text-lg">→</span>
            </button>
          </div>
        </div>
      </section>

      {/* ============================================
          SECTION 8: PROCESS
          Six-stage timeline from application to investment
          ============================================ */}
      {/* How It Works - Process Timeline */}
      <section id="how-it-works" className="py-24 md:py-32 border-t border-neutral-900 relative overflow-hidden bg-white">
        <div className="absolute inset-0 z-0 bg-white" />
        
        <div className="max-w-7xl mx-auto px-6 lg:px-8 relative z-10">
          {/* Header */}
          <div className="text-center max-w-3xl mx-auto mb-16 md:mb-20">
            <div className="inline-flex items-center gap-3 px-6 py-3 rounded-full border border-[#bb9457]/30 bg-[#bb9457]/5 mb-6">
              <span className="w-2 h-2 rounded-full bg-[#bb9457] animate-pulse-glow" />
              <span className="text-[10px] uppercase tracking-[0.3em] text-[#bb9457] font-mono font-semibold">The journey</span>
            </div>
            <h2 className="mt-4 md:mt-6 font-serif text-3xl md:text-4xl text-neutral-900 font-normal tracking-tight">
              Six stages from application <span className="text-gradient italic font-light">to investment.</span>
            </h2>
          </div>

          {/* Horizontal Timeline */}
          <div className="relative">
            {/* Progress Line */}
            <div className="hidden lg:block absolute top-24 left-0 right-0 h-0.5 bg-gradient-to-r from-[#bb9457]/20 via-[#bb9457]/50 to-[#bb9457]/20" />
            
            {/* Timeline Items */}
            <div className="grid lg:grid-cols-6 gap-8 lg:gap-6">
              {[
                {
                  stage: "01",
                  title: "Submit Application",
                  timeline: "Jun 1 - Jul 31, 2026",
                  body: "Complete the application with your creative background, vision, work documentation, and what you would build with support."
                },
                {
                  stage: "02",
                  title: "First Review",
                  timeline: "August 2026",
                  body: "Every application receives a full review. We evaluate creative vision, craft quality, and commercial potential."
                },
                {
                  stage: "03",
                  title: "Shortlist Presentations",
                  timeline: "Late August 2026",
                  body: "Present your work and vision to the selection panel - in person or virtually."
                },
                {
                  stage: "04",
                  title: "Finalists Announced",
                  timeline: "September 2026",
                  body: "Finalists selected and announced. Receive preparation support including mentorship and coaching."
                },
                {
                  stage: "05",
                  title: "The Spotlight Event",
                  timeline: "Fall 2026",
                  body: "Present on a live stage before investors, buyers, press, and the Pakistani fashion community."
                },
                {
                  stage: "06",
                  title: "Investment & Partnership",
                  timeline: "Following the event",
                  body: "Winners announced and partnerships formalized. The work begins immediately with Adorzia."
                }
              ].map((item, i) => (
                <div key={i} className="group relative">
                  {/* Timeline Node */}
                  <div className="relative mb-8 lg:mb-12">
                    <div className={`relative z-10 w-20 h-20 mx-auto rounded-full bg-white border-2 border-[#bb9457]/30 flex items-center justify-center shadow-lg group-hover:scale-110 group-hover:border-[#bb9457] group-hover:shadow-xl group-hover:shadow-[#bb9457]/20 transition-all duration-500`}>
                      <span className="font-mono text-xl text-[#bb9457] font-bold">{item.stage}</span>
                    </div>
                    {/* Pulse animation */}
                    <div className="absolute inset-0 w-20 h-20 mx-auto rounded-full bg-[#bb9457]/20 animate-ping" style={{ animationDelay: `${i * 0.3}s`, animationDuration: '2s' }} />
                  </div>
                  
                  {/* Content */}
                  <div className="text-center">
                    <div className="font-mono text-[10px] text-[#bb9457] uppercase tracking-wider mb-2">{item.timeline}</div>
                    <h3 className="font-serif text-lg text-neutral-900 font-normal mb-3 group-hover:text-[#bb9457] transition-colors duration-300">{item.title}</h3>
                    <p className="text-neutral-600 font-light text-xs leading-relaxed">{item.body}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* CTA */}
          <div className="mt-20 text-center">
            <button onClick={handleApplyNow} className="inline-flex items-center gap-3 px-10 py-5 bg-[#bb9457] text-black font-semibold uppercase tracking-[0.2em] text-[11px] rounded-sm hover:bg-neutral-900 hover:text-white transition-all duration-300 animate-pulse-glow transform hover:-translate-y-1 hover:shadow-2xl hover:shadow-[#bb9457]/30">
              Start your application
              <span className="text-lg">→</span>
            </button>
          </div>
        </div>
      </section>
      {/* ============================================
          SECTION 9: JUDGES
          Judging panel information and placeholder judge cards
          ============================================ */}
      <section id="judging-panel" className="py-24 md:py-32 relative overflow-hidden border-t border-neutral-900">
        <div className="absolute inset-0 z-0">
          {/* Use spotlight event imagery for judges section */}
          <img src={spotlightImg} alt="" className="w-full h-full object-cover scale-110 opacity-15 grayscale" />
        </div>
        <div className="absolute inset-0 bg-gradient-to-b from-neutral-950 via-neutral-950/97 to-neutral-950" />
        
        <div className="max-w-5xl mx-auto px-6 lg:px-8 relative z-10">
          <div className="text-center max-w-3xl mx-auto mb-12 md:mb-16">
            {/* Icon header instead of badge */}
            <div className="mb-6">
              <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-neutral-900 border-2 border-[#bb9457]/40 flex items-center justify-center">
                <span className="text-[#bb9457] text-2xl">⚖</span>
              </div>
              <span className="text-[10px] uppercase tracking-[0.3em] text-[#bb9457] font-mono font-semibold">Who will be in the room</span>
            </div>
            <h2 className="mt-4 md:mt-6 font-serif text-3xl md:text-5xl text-white font-normal tracking-tight">
              The people who decide <span className="text-gradient italic font-light">deserve to be here as much as you do.</span>
            </h2>
          </div>

          {/* Panel info - Visual cards instead of paragraph */}
          <div className="max-w-3xl mx-auto mb-12 md:mb-16">
            <div className="grid md:grid-cols-2 gap-4">
              <div className="p-6 bg-neutral-900/50 border border-neutral-800">
                <p className="text-neutral-300 font-light text-sm leading-relaxed">
                  Spotlight will be judged by a panel from Pakistan's fashion, creative, and business communities.
                </p>
              </div>
              <div className="p-6 bg-neutral-900/50 border border-neutral-800">
                <p className="text-neutral-300 font-light text-sm leading-relaxed">
                  Designers with internationally recognized work, investors who back creative businesses, and industry figures who understand craft.
                </p>
              </div>
            </div>
            <div className="mt-4 p-5 bg-[#bb9457]/10 border border-[#bb9457]/30 text-center">
              <p className="text-[#bb9457] font-medium text-sm">
                We're finalizing our Fall 2026 panel. Announcements coming soon.
              </p>
            </div>
          </div>

          <div className="max-w-3xl mx-auto mb-16">
            {/* Simple text label */}
            <div className="mb-8">
              <span className="text-[10px] uppercase tracking-[0.3em] text-[#bb9457] font-mono font-semibold">What we can tell you about our panel criteria</span>
              <div className="w-16 h-px bg-[#bb9457]/50 mt-2" />
            </div>
            <ul className="space-y-4">
              {[
                "Deep knowledge of Pakistani fashion and craft - not just international fashion credentials",
                "Commercial experience - people who understand what it takes to build a brand, not just appreciate one",
                "Diversity of perspective - across geography, discipline, generation, and background",
                "A genuine investment in the future of Pakistani fashion entrepreneurship, not just a high-profile name on a poster"
              ].map((criteria, i) => (
                <li key={i} className="flex gap-4 items-start p-6 glass rounded-sm hover:bg-white/5 transition-all duration-300 hover:border-[#bb9457]/30 group">
                  <span className="text-[#bb9457] mt-1 flex-shrink-0 w-10 h-10 rounded-full border border-[#bb9457]/30 flex items-center justify-center text-xs group-hover:scale-110 transition-transform duration-300">{String(i + 1).padStart(2, '0')}</span>
                  <span className="text-neutral-300 font-light group-hover:text-white transition-colors duration-300">{criteria}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Placeholder Judge Cards */}
          <div className="max-w-5xl mx-auto mb-12 md:mb-16">
            {/* Numbered section header */}
            <div className="flex items-center gap-4 mb-6">
              <span className="font-mono text-4xl text-[#bb9457]/30 font-bold">09</span>
              <span className="text-[10px] uppercase tracking-[0.3em] text-[#bb9457] font-mono font-semibold">Who will be evaluating you</span>
            </div>
            
            <div className="grid md:grid-cols-3 gap-6">
              {[
                {
                  category: "Fashion Industry Leaders",
                  description: "Designers and industry veterans with internationally recognized work"
                },
                {
                  category: "Creative Directors",
                  description: "Visionaries who shape creative strategy and brand identity"
                },
                {
                  category: "Investors & Advisors",
                  description: "Business leaders who understand creative enterprise and growth"
                },
                {
                  category: "Fashion & Heritage Experts",
                  description: "Guardians of Pakistani craft traditions and innovation"
                },
                {
                  category: "Brand Strategists",
                  description: "Experts in positioning fashion brands for global markets"
                },
                {
                  category: "Media & Press Partners",
                  description: "Editors and tastemakers who amplify emerging talent"
                }
              ].map((panel, i) => (
                <div key={i} className="group relative glass rounded-sm overflow-hidden hover:border-[#bb9457]/40 transition-all duration-500 hover-lift hover:shadow-2xl hover:shadow-[#bb9457]/10">
                  {/* Silhouette placeholder */}
                  <div className="aspect-[4/3] bg-gradient-to-br from-neutral-900 to-neutral-800 relative overflow-hidden">
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="text-center">
                        {/* Silhouette icon */}
                        <div className="w-20 h-20 mx-auto mb-3 rounded-full bg-neutral-800 border-2 border-[#bb9457]/30 flex items-center justify-center group-hover:border-[#bb9457]/60 transition-all duration-300">
                          <svg className="w-10 h-10 text-neutral-700" fill="currentColor" viewBox="0 0 24 24">
                            <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"/>
                          </svg>
                        </div>
                        <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#bb9457]/10 border border-[#bb9457]/30">
                          <span className="w-1.5 h-1.5 rounded-full bg-[#bb9457] animate-pulse" />
                          <span className="text-[#bb9457] font-mono text-[9px] uppercase tracking-wider font-semibold">Announcement Soon</span>
                        </div>
                      </div>
                    </div>
                    {/* Corner accent */}
                    <div className="absolute top-3 right-3 w-8 h-8 border-t border-r border-[#bb9457]/30 rounded-tr-sm" />
                  </div>
                  
                  {/* Card content */}
                  <div className="p-6">
                    <h3 className="font-serif text-lg text-white font-normal mb-2 group-hover:text-[#bb9457] transition-colors duration-300">{panel.category}</h3>
                    <p className="text-neutral-400 font-light text-sm leading-relaxed">{panel.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
          
          {/* Partners/Supporters Coming Soon - Outlined card */}
          <div className="max-w-3xl mx-auto mb-12">
            <div className="p-8 bg-neutral-950 border border-neutral-800 text-center">
              <div className="flex items-center justify-center gap-3 mb-4">
                <div className="w-2 h-2 rounded-full bg-[#bb9457]" />
                <span className="text-[#bb9457] font-mono text-[10px] uppercase tracking-[0.25em] font-semibold">Partners & Supporters</span>
              </div>
              <p className="text-neutral-400 font-light text-sm md:text-base leading-relaxed mb-4">
                We're finalizing partnerships with fashion institutions, media houses, and industry organizations who share our vision for Pakistani fashion talent. Announcements coming soon.
              </p>
              <p className="text-white font-light text-sm italic">
                Interested in partnering with Spotlight? Write to us at spotlight@adorzia.com
              </p>
            </div>
          </div>

          <div className="text-center">
            <div className="p-10 glass rounded-sm mb-8 border border-[#bb9457]/20">
              <p className="text-neutral-400 font-light text-lg">Judge and mentor announcements coming soon. Follow Adorzia on Instagram and LinkedIn for updates.</p>
            </div>
            <button className="inline-flex items-center gap-3 px-10 py-5 glass text-white font-semibold uppercase tracking-[0.25em] text-[11px] rounded-sm hover:border-[#bb9457] hover:text-[#bb9457] transition-all duration-300 transform hover:-translate-y-1">
              Follow us for panel announcements
              <span>→</span>
            </button>
          </div>
        </div>
      </section>

      {/* ============================================
          SECTION 10: APPLICATION CTA
          Final call-to-action with contact information
          ============================================ */}
      {/* Application CTA Section */}
      <section id="apply" className="py-24 md:py-32 relative overflow-hidden border-t border-neutral-900">
        <div className="absolute inset-0 z-0">
          <img src={studio} alt="" className="w-full h-full object-cover scale-110 opacity-20 grayscale" />
        </div>
        <div className="absolute inset-0 bg-gradient-to-b from-neutral-950 via-neutral-950/95 to-black" />
        
        <div className="max-w-7xl mx-auto px-6 lg:px-8 relative z-10">
          <div className="grid lg:grid-cols-2 gap-12 md:gap-16 items-center">
            {/* Left Content */}
            <div>
              {/* Large number accent */}
              <div className="flex items-center gap-4 mb-4">
                <span className="font-mono text-5xl text-[#bb9457]/20 font-bold">10</span>
                <span className="text-[10px] uppercase tracking-[0.3em] text-[#bb9457] font-mono font-semibold">Your moment is here</span>
              </div>
              <h2 className="mt-4 md:mt-6 font-serif text-3xl md:text-4xl lg:text-5xl text-white font-normal tracking-tight leading-tight">
                This is where it begins. <span className="text-gradient italic font-light">Your application awaits.</span>
              </h2>
              
              {/* Founding Class positioning */}
              <div className="mt-6 p-6 bg-[#bb9457]/10 border-2 border-[#bb9457]/40">
                <div className="flex items-center gap-3 mb-3">
                  <span className="w-2 h-2 rounded-full bg-[#bb9457] animate-pulse-glow" />
                  <span className="text-[#bb9457] font-mono text-[10px] uppercase tracking-[0.3em] font-semibold">Founding Class 2026</span>
                </div>
                <p className="text-white font-light text-sm md:text-base leading-relaxed">
                  The first cohort of Spotlight winners will hold a permanent place in Adorzia's history. Only a limited number of designers will be selected for investment. This is your chance to be part of the founding class that proved Pakistani fashion talent deserves the world stage.
                </p>
              </div>
              
              {/* Urgency highlights - Grid cards */}
              <div className="mt-6 grid md:grid-cols-3 gap-4">
                <div className="p-4 bg-neutral-900 border border-neutral-800 text-center">
                  <div className="font-mono text-2xl text-[#bb9457] font-bold mb-1">July 31</div>
                  <div className="text-neutral-400 font-light text-xs uppercase tracking-wider">Application Deadline</div>
                  <div className="text-white font-medium text-xs mt-1">Midnight PKT</div>
                </div>
                <div className="p-4 bg-neutral-900 border border-neutral-800 text-center">
                  <div className="font-mono text-2xl text-[#bb9457] font-bold mb-1">Limited</div>
                  <div className="text-neutral-400 font-light text-xs uppercase tracking-wider">Winner Selection</div>
                  <div className="text-white font-medium text-xs mt-1">Few spots available</div>
                </div>
                <div className="p-4 bg-neutral-900 border border-neutral-800 text-center">
                  <div className="font-mono text-2xl text-[#bb9457] font-bold mb-1">Fall 26</div>
                  <div className="text-neutral-400 font-light text-xs uppercase tracking-wider">Investment Begins</div>
                  <div className="text-white font-medium text-xs mt-1">Immediate support</div>
                </div>
              </div>
              
              {/* CTA buttons */}
              <div className="mt-8 flex flex-wrap gap-4">
                <button onClick={handleApplyNow} className="inline-flex items-center gap-3 px-10 py-5 bg-[#bb9457] text-black font-semibold uppercase tracking-[0.25em] text-[12px] rounded-sm hover:bg-white transition-all duration-300 animate-pulse-glow transform hover:-translate-y-1 hover:shadow-2xl hover:shadow-[#bb9457]/30">
                  Apply now
                  <span className="text-xl">→</span>
                </button>
                <a href="mailto:spotlight@adorzia.com" className="inline-flex items-center gap-3 px-8 py-5 glass text-white font-medium text-sm rounded-sm hover:border-[#bb9457] hover:text-[#bb9457] transition-all duration-300">
                  Contact us
                </a>
              </div>
              
              {/* Application Checklist - Solid background */}
              <div className="mt-6 p-6 bg-neutral-900 border-l-4 border-[#bb9457]">
                <h3 className="font-serif text-lg text-white font-normal mb-4">Application Checklist</h3>
                <div className="grid md:grid-cols-2 gap-3">
                  {[
                    "Creative background and vision statement",
                    "Portfolio of original work (photos or physical)",
                    "Description of what you would build with support",
                    "Contact information and location details",
                    "Social media or website (optional)",
                    "References or recommendations (optional)"
                  ].map((item, idx) => (
                    <div key={idx} className="flex gap-3 items-start">
                      <div className="w-5 h-5 rounded-sm border border-[#bb9457]/40 flex items-center justify-center flex-shrink-0 mt-0.5">
                        <span className="text-[#bb9457] text-xs">✓</span>
                      </div>
                      <span className="text-neutral-300 font-light text-sm">{item}</span>
                    </div>
                  ))}
                </div>
                <p className="mt-4 text-neutral-400 font-light text-xs italic">
                  Applications take approximately 15-20 minutes to complete. Save your progress and return anytime before the deadline.
                </p>
              </div>
            </div>
            
            {/* Right Image - Use studio/workshop imagery */}
            <div className="relative">
              <div className="aspect-[4/5] overflow-hidden rounded-sm shadow-2xl shadow-black/50">
                <img src={studio} alt="Apply to Spotlight" className="w-full h-full object-cover scale-110 hover:scale-120 transition-all duration-700" />
              </div>
              {/* Decorative overlay */}
              <div className="absolute -bottom-6 -left-6 w-32 h-32 bg-[#bb9457]/10 backdrop-blur-sm border border-[#bb9457]/30 rounded-sm p-4 flex items-center justify-center">
                <div className="text-center">
                  <div className="font-mono text-3xl text-[#bb9457] font-bold">2026</div>
                  <div className="text-xs text-white uppercase tracking-wider mt-1">Season</div>
                </div>
              </div>
              {/* Corner accent */}
              <div className="absolute -top-4 -right-4 w-24 h-24 border-t-2 border-r-2 border-[#bb9457]/50 rounded-tr-3xl" />
            </div>
          </div>
        </div>
      </section>

      {/* ============================================
          SECTION 11: FAQ
          Frequently asked questions with expandable answers
          ============================================ */}
      {/* FAQ */}
      <section id="faq" className="py-24 md:py-32 relative overflow-hidden border-t border-neutral-900">
        <div className="absolute inset-0 z-0 bg-white" />
        
        <div className="max-w-4xl mx-auto px-6 lg:px-8 relative z-10">
          <div className="text-center mb-12 md:mb-16">
            {/* Minimal centered header */}
            <div className="mb-6">
              <span className="text-[10px] uppercase tracking-[0.3em] text-[#bb9457] font-mono font-semibold">Questions we hear most</span>
              <div className="w-12 h-px bg-[#bb9457] mx-auto mt-2" />
            </div>
            <h2 className="mt-4 md:mt-6 font-serif text-3xl md:text-5xl text-neutral-900 font-normal tracking-tight">
              Everything you want to know <span className="text-gradient italic font-light">before you apply.</span>
            </h2>
          </div>

          <div className="space-y-4">
            {[
              { q: "Do I need a formal fashion education to apply?", a: "No. We're open to self-taught creatives, graduates, makers, and entrepreneurs. We evaluate your work and vision - not your qualifications." },
              { q: "I'm not from Lahore or Karachi. Can I still apply?", a: "Yes - and we specifically want to hear from you. Spotlight exists to discover talent the conventional fashion circuit has never reached." },
              { q: "What kind of work qualifies?", a: "Fashion design in any category - ready-to-wear, couture, streetwear, accessories, heritage craft, fashion innovation. If it's original, Pakistani, and demonstrates creative vision worth investing in, it qualifies." },
              { q: "Do I need an existing brand or business?", a: "No. You don't need a registered business or established following. You need original work and a compelling vision." },
              { q: "What does the investment look like?", a: "Full details for Fall 2026 will be published shortly. It's structured investment in your brand - not prize money - with full Adorzia ecosystem support." },
              { q: "Can I apply if I work in traditional craft?", a: "Absolutely. Heritage craft makers are who Spotlight was most specifically built for." },
              { q: "What if I can't travel for presentations?", a: "Virtual presentations are available for applicants outside our studio locations. Geography won't exclude anyone from the shortlist." },
              { q: "Will my application be kept confidential?", a: "Yes. All materials are reviewed only by the selection panel and won't be shared publicly without your consent." },
              { q: "When will I hear back?", a: "Receipt confirmed within five working days. Shortlist decisions in August 2026. Every applicant receives a response." },
              { q: "Can I apply for Spotlight and the Marketplace simultaneously?", a: "Yes. These are separate applications - we encourage serious applicants to explore the entire Adorzia ecosystem." },
              { q: "What if my question isn't answered here?", a: "Write to us at spotlight@adorzia.com. We answer every question personally." }
            ].map((faq, i) => (
              <div key={i} className="group bg-white border border-neutral-200 rounded-sm hover:border-[#bb9457]/60 transition-all duration-500 overflow-hidden shadow-sm hover:shadow-xl hover:shadow-[#bb9457]/10">
                <button
                  onClick={() => toggleFaq(i)}
                  className="w-full p-8 text-left flex items-start gap-4 hover:bg-neutral-50 transition-colors duration-300"
                >
                  <span className="text-[#bb9457] font-mono text-xs flex-shrink-0 mt-1 w-8 h-8 rounded-full bg-[#bb9457]/10 border border-[#bb9457]/30 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">{String(i + 1).padStart(2, '0')}</span>
                  <div className="flex-1">
                    <h3 className="font-serif text-xl text-neutral-900 font-normal group-hover:text-[#bb9457] transition-colors duration-300">{faq.q}</h3>
                  </div>
                  <span className={`flex-shrink-0 w-8 h-8 rounded-full border border-[#bb9457]/30 flex items-center justify-center transition-all duration-300 ${expandedFaq === i ? 'bg-[#bb9457]/20 rotate-45' : 'group-hover:bg-[#bb9457]/10'}`}>
                    <span className="text-[#bb9457] text-lg font-light">+</span>
                  </span>
                </button>
                <div className={`transition-all duration-500 ease-in-out ${expandedFaq === i ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'} overflow-hidden`}>
                  <div className="px-8 pb-8 pt-0 ml-12">
                    <div className="border-t border-neutral-200 pt-6">
                      <p className="text-neutral-700 font-light leading-relaxed">{faq.a}</p>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ============================================
          SECTION 12: SHARE
          Social sharing and community outreach section
          ============================================ */}
      {/* Share and Spread the Word */}
      <section id="share" className="py-24 md:py-32 relative overflow-hidden border-t border-neutral-900">
        <div className="absolute inset-0 z-0">
          <img 
            src={spotlightImg}
            alt="" 
            className="w-full h-full object-cover scale-110 opacity-20 grayscale"
            style={{ transform: `translateY(${scrollY * 0.1}px)` }}
          />
          <div className="absolute inset-0 bg-gradient-to-b from-neutral-950 via-neutral-950/95 to-neutral-950" />
        </div>
        
        <div className="max-w-4xl mx-auto px-6 lg:px-8 text-center relative z-10">
          {/* Bold tag header */}
          <div className="mb-6">
            <div className="inline-block px-4 py-1 bg-[#bb9457]/10 border border-[#bb9457]/30 text-[#bb9457] text-[10px] uppercase tracking-[0.3em] font-mono font-semibold mb-2">SHARE</div>
            <span className="text-[10px] uppercase tracking-[0.3em] text-neutral-500 font-mono">This belongs to all of Pakistan</span>
          </div>
          <h2 className="mt-4 md:mt-6 font-serif text-3xl md:text-5xl text-white font-normal tracking-tight">
            You might not be the visionary we are looking for. <span className="text-gradient italic font-light">But you probably know who is.</span>
          </h2>

          <div className="mt-8 max-w-3xl mx-auto space-y-5 text-neutral-400 font-light text-base md:text-lg leading-relaxed">
            <p>
              Spotlight is only as powerful as the talent it reaches. And the talent we're looking for isn't always on the right platforms or in the circles where this news travels.
            </p>
            <p>
              Think about the extraordinary makers in your life who don't yet have the stage they deserve. The designer everyone in your city talks about. The craftsperson whose work stops every person who sees it.
            </p>
            <p className="text-white font-normal">
              Tell them about Spotlight. Send them this page. Show them what's possible.
            </p>
            <p className="text-[#bb9457] font-semibold">
              Help us find them.
            </p>
          </div>

          <div className="mt-12 space-y-4">
            <p className="text-neutral-500 font-light text-sm italic">"I just found something every Pakistani creative needs to know about."</p>
            <p className="text-neutral-500 font-light text-sm italic">"Applications are open until July 31. If you make things in Pakistan, this is your moment."</p>
            <p className="text-neutral-500 font-light text-sm italic">"Adorzia Spotlight is looking for Pakistan's next fashion visionary. It might be you."</p>
          </div>

          <div className="mt-12 flex flex-wrap gap-6 justify-center">
            <a 
              href="https://www.instagram.com/adorzia" 
              target="_blank" 
              rel="noopener noreferrer"
              className="px-8 py-4 glass text-white font-semibold uppercase tracking-[0.2em] text-[11px] rounded-sm hover:border-[#bb9457] hover:text-[#bb9457] transition-all duration-300 hover:-translate-y-0.5 transform"
            >
              Share on Instagram
            </a>
            <a 
              href={`https://wa.me/?text=${encodeURIComponent('Adorzia Spotlight is looking for Pakistan\'s next fashion visionary. Applications are open until July 31, 2026. https://adorzia.com/spotlight')}`}
              target="_blank" 
              rel="noopener noreferrer"
              className="px-8 py-4 glass text-white font-semibold uppercase tracking-[0.2em] text-[11px] rounded-sm hover:border-[#bb9457] hover:text-[#bb9457] transition-all duration-300 hover:-translate-y-0.5 transform"
            >
              Share on WhatsApp
            </a>
            <button 
              onClick={() => navigator.clipboard.writeText('https://adorzia.com/spotlight')}
              className="px-8 py-4 glass text-white font-semibold uppercase tracking-[0.2em] text-[11px] rounded-sm hover:border-[#bb9457] hover:text-[#bb9457] transition-all duration-300 hover:-translate-y-0.5 transform"
            >
              Copy the link
            </button>
          </div>

          <div className="mt-20 p-10 glass border border-[#bb9457]/30 rounded-sm">
            <p className="text-white font-serif text-xl md:text-2xl font-normal tracking-tight">
              Spotlight Fall 2026. Applications open now until July 31. The stage is real. The investment is real. The moment is now.
            </p>
          </div>
        </div>
      </section>
    </div>
  )
}

export default SpotlightEvent
