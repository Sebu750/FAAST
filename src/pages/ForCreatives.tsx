import { useState } from 'react'
import SEO from '../components/SEO'
import heroHome from '../assets/hero-banner-coworking-studio 1 .png'
import studio from '../assets/hero-banner-coworking-studio-2.png'
import spotlight from '../assets/fashion-icon.png'
import craft from '../assets/craft.jpg'
import coworking from '../assets/coworking-studio-image .png'

const ForCreatives = () => {
  const [waitlistSubmitted, setWaitlistSubmitted] = useState(false)
  const [waitlistSubmitting, setWaitlistSubmitting] = useState(false)
  const [waitlistForm, setWaitlistForm] = useState({
    name: '',
    email: '',
    phone: '',
    current_city: '',
    preferred_city: '',
    discipline: '',
    years_experience: '',
    membership_type: '',
    intended_start_date: '',
    why_studio: '',
    current_workspace: '',
    portfolio_url: '',
    instagram_handle: ''
  })

  const handleWaitlistSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setWaitlistSubmitting(true)

    try {
      const { supabase } = await import('../lib/supabase')
      
      const { error } = await supabase
        .from('studio_waitlist')
        .insert([{
          name: waitlistForm.name,
          email: waitlistForm.email,
          phone: waitlistForm.phone,
          current_city: waitlistForm.current_city,
          preferred_city: waitlistForm.preferred_city,
          discipline: waitlistForm.discipline,
          years_experience: waitlistForm.years_experience,
          membership_type: waitlistForm.membership_type,
          intended_start_date: waitlistForm.intended_start_date || null,
          why_studio: waitlistForm.why_studio,
          current_workspace: waitlistForm.current_workspace,
          portfolio_url: waitlistForm.portfolio_url || null,
          instagram_handle: waitlistForm.instagram_handle || null
        }])

      if (error) throw error

      setWaitlistSubmitted(true)
      setWaitlistForm({
        name: '',
        email: '',
        phone: '',
        current_city: '',
        preferred_city: '',
        discipline: '',
        years_experience: '',
        membership_type: '',
        intended_start_date: '',
        why_studio: '',
        current_workspace: '',
        portfolio_url: '',
        instagram_handle: ''
      })
    } catch (err) {
      console.error('Error submitting waitlist:', err)
      alert('Failed to join waitlist. Please try again.')
    } finally {
      setWaitlistSubmitting(false)
    }
  }
  return (
    <div className="min-h-screen bg-black text-white">
      <SEO
        title="For Fashion Creatives in Pakistan - Studios, Marketplace and Spotlight | Adorzia"
        description="Adorzia is built for Pakistani fashion designers, heritage craftspeople and fashion entrepreneurs. Join our coworking studios in Lahore, Islamabad and Karachi, list your work on our curated marketplace, and apply for Spotlight Fall 2026 - Pakistan's first national fashion talent investment event."
        canonicalURL="https://adorzia.com/for-creatives"
        ogTitle="For Pakistani Fashion Creatives - Everything You Need in One Ecosystem"
        ogDescription="Studios. Marketplace. Spotlight. Adorzia is the complete ecosystem for fashion entrepreneurs in Pakistan."
        ogImageAlt="Pakistani fashion creative at work - Adorzia for creatives"
        schemaType="Service"
        schema={{
          "@context": "https://schema.org",
          "@type": "Service",
          "serviceType": "Adorzia Creative Ecosystem",
          "description": "Coworking studios, curated marketplace and national talent event for Pakistani fashion designers and craftspeople",
          "provider": {
            "@type": "Organization",
            "name": "Adorzia"
          },
          "areaServed": "Pakistan"
        }}
        keywords="fashion designer Pakistan opportunities, coworking studio fashion Lahore, sell Pakistani fashion online, heritage craft marketplace Pakistan, Spotlight application 2026, Fashion studio Pakistan, Fashion coworking space Karachi, Fashion coworking space Islamabad, Pakistani fashion marketplace online, Emerging fashion designers Pakistan, Fashion incubator Pakistan, Creative entrepreneurship Pakistan, Fashion community Pakistan, Adorzia, Adorzia studios, Adorzia marketplace, Adorzia Spotlight"
      />

      
      {/* Luxury Custom Animation Matrix Injections */}
      <style>{`
        @keyframes ambientSwell {
          0%, 100% { transform: scale(1.02) translate(0px, 0px); }
          50% { transform: scale(1.06) translate(4px, -3px); }
        }
        @keyframes fadeInUp {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-ambient-swell { animation: ambientSwell 20s infinite ease-in-out; }
        .animate-fade-in-up { animation: fadeInUp 1s cubic-bezier(0.16, 1, 0.3, 1) forwards; }
      `}</style>

      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img src={heroHome} alt="Creative Workspace" className="w-full h-full object-cover scale-105" />
          <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/60 to-transparent" />
          <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-transparent to-neutral-950" />
        </div>
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_left,rgba(187,148,87,0.25),transparent_60%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_right,rgba(187,148,87,0.15),transparent_50%)]" />

        <div className="absolute inset-0 opacity-[0.03] pointer-events-none z-10 mix-blend-screen">
          <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <pattern id="hero-grid" width="100" height="100" patternUnits="userSpaceOnUse">
                <path d="M 50 0 L 100 50 L 50 100 L 0 50 Z" fill="none" stroke="#bb9457" strokeWidth="0.5" />
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#hero-grid)" />
          </svg>
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-6 md:px-12 lg:px-20 py-32 animate-fade-in-up">
          <div className="max-w-3xl">
            <span className="inline-flex items-center gap-2 text-[#bb9457] uppercase tracking-[0.3em] text-[10px] font-mono font-semibold">
              <span className="w-1.5 h-1.5 bg-[#bb9457] rounded-full animate-pulse" />
              This page is for you
            </span>

            <h1 className="mt-6 font-serif text-4xl md:text-6xl lg:text-7xl leading-[1.05] text-white tracking-tight font-normal">
              You have the talent.<br />
              We built <span className="text-[#bb9457] italic font-light">everything else.</span>
            </h1>

            <div className="mt-8 space-y-6 text-neutral-300 font-light text-base md:text-lg leading-relaxed">
              <p>
                The workspace. The marketplace. The investor network. The national stage. Adorzia was designed from the ground up for one kind of person - the Pakistani creative who is serious about turning their craft into a career, and their career into a brand.
              </p>
              <p>
                Whether you are a fashion graduate with your first collection forming, an independent designer ready to scale, a heritage craftsperson whose work deserves a global audience, or a fashion entrepreneur with a vision bigger than your current resources - you are exactly who Adorzia was built for.
              </p>
            </div>

            <div className="mt-12 flex flex-wrap gap-5">
              <a
                href="/spotlight-event"
                className="px-8 py-4 bg-[#bb9457] text-black font-semibold uppercase tracking-[0.2em] text-[11px] rounded-sm hover:bg-white hover:text-black transition-all duration-300"
              >
                Apply for Spotlight 2026
              </a>
              <a
                href="#what-we-offer"
                className="px-8 py-4 border border-white/20 text-white font-semibold uppercase tracking-[0.2em] text-[11px] rounded-sm hover:border-[#bb9457] hover:text-[#bb9457] transition-all duration-300"
              >
                Explore what we offer
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* What Adorzia Offers */}
      <section id="what-we-offer" className="relative py-40 border-b border-neutral-900">
        <div className="absolute inset-0">
          <img src={craft} alt="" className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-r from-neutral-950/95 via-neutral-950/90 to-neutral-950/95" />
        </div>
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,rgba(187,148,87,0.12),transparent_50%)] pointer-events-none" />
        
        <div className="max-w-7xl mx-auto px-6 lg:px-8 relative z-10">
          <div className="max-w-3xl mb-20">
            <span className="text-[10px] uppercase tracking-[0.3em] text-[#bb9457] font-mono font-semibold">Your complete ecosystem</span>
            <h2 className="mt-4 font-serif text-3xl md:text-5xl text-white font-normal tracking-tight">
              Everything a fashion entrepreneur needs. Finally, in one place.
            </h2>
            <p className="mt-4 text-neutral-400 font-light text-base md:text-lg leading-relaxed max-w-3xl space-y-4">
              For too long, building a fashion business in Pakistan meant solving the same problems alone that every creative before you had already solved alone. Finding a workspace. Finding buyers. Finding investors. Finding visibility. Adorzia ends that cycle.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            {[
              { title: "A place to create", body: "Professional studio spaces in three cities, built specifically for fashion work. Equipment, community, and an environment that treats your craft with the seriousness it deserves.", image: coworking },
              { title: "A platform to sell", body: "Your work, on a curated marketplace with a story behind it - reaching buyers in Pakistan and across the world who are actively looking for what you make.", image: studio },
              { title: "A stage to be discovered", body: "Adorzia Spotlight gives extraordinary Pakistani fashion talent a national platform, direct investment, and the mentorship to become a brand the world knows.", image: spotlight },
              { title: "A community to grow with", body: "You are not joining a platform. You are joining a movement of Pakistani fashion creatives who are building something together - and supporting each other in the process.", image: heroHome }
            ].map((offer, idx) => (
              <div key={idx} className="group relative bg-neutral-950/60 backdrop-blur-md border border-neutral-800 rounded-sm overflow-hidden hover:border-[#bb9457]/40 transition-all duration-500">
                <div className="aspect-[4/3] overflow-hidden relative">
                  <img 
                    src={offer.image} 
                    alt={offer.title} 
                    className="w-full h-full object-cover grayscale contrast-125 group-hover:grayscale-0 group-hover:scale-110 transition-all duration-700" 
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                </div>
                <div className="p-8 relative">
                  <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#bb9457]/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                  <h3 className="font-serif text-2xl text-white font-normal mb-3">{offer.title}</h3>
                  <p className="text-sm text-neutral-400 font-light leading-relaxed">{offer.body}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Coworking Studios */}
      <section className="py-40 bg-white relative overflow-hidden">
        <div className="absolute inset-0 opacity-[0.03] pointer-events-none">
          <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <pattern id="studio-grid" width="60" height="60" patternUnits="userSpaceOnUse">
                <path d="M 30 0 L 60 30 L 30 60 L 0 30 Z" fill="none" stroke="#bb9457" strokeWidth="0.5" />
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#studio-grid)" />
          </svg>
        </div>
        
        <div className="max-w-7xl mx-auto px-6 lg:px-8 relative z-10">
          <div className="grid lg:grid-cols-2 gap-16 items-start">
            <div className="space-y-6">
              <span className="text-[10px] uppercase tracking-[0.3em] text-[#bb9457] font-mono font-semibold">Adorzia Studios</span>
              <h2 className="font-serif text-3xl md:text-5xl text-neutral-900 font-normal tracking-tight">
                Your city has a studio waiting for you.
              </h2>
              <div className="space-y-4 text-neutral-600 font-light text-base leading-relaxed">
                <p>
                  Great fashion is not made in isolation. It is made in spaces where ideas collide, where fabric and form and ambition share the same room, where the person at the next table understands exactly what you are building and why it matters.
                </p>
                <p className="text-neutral-900 font-normal">
                  That is what Adorzia Studios are.
                </p>
                <p>
                  We are launching dedicated coworking spaces for fashion professionals in Lahore, Islamabad, and Karachi - with more cities on the horizon as our community grows. These are not generic co-working offices with a mood board on the wall. They are purpose-built creative environments designed around how fashion professionals actually work.
                </p>
              </div>
            </div>
            <div className="aspect-[4/5] overflow-hidden rounded-sm border border-neutral-200 relative group">
              <img 
                src={coworking} 
                alt="Studio Workspace" 
                className="w-full h-full object-cover grayscale contrast-110 group-hover:grayscale-0 group-hover:scale-105 transition-all duration-700" 
              />
            </div>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mt-20">
            {[
              { title: "Professional workspace", body: "Cutting tables, sewing stations, pressing equipment, fitting areas, and the tools serious fashion work demands - available daily, weekly, or monthly." },
              { title: "A creative community", body: "Work alongside other designers, makers, and fashion entrepreneurs. Collaborate, critique, refer, and grow together inside a community that is genuinely invested in each other's success." },
              { title: "Business infrastructure", body: "High-speed internet, meeting rooms for client sessions, photography corners for product shoots, and the professional environment your brand needs to operate from." },
              { title: "Mentorship access", body: "Studio members get first access to Adorzia's growing network of industry mentors, business advisors, and creative professionals who visit, host sessions, and invest time in our community." }
            ].map((item, idx) => (
              <div key={idx} className="p-8 bg-neutral-50 border border-neutral-200 rounded-sm hover:border-[#bb9457]/40 hover:shadow-lg hover:shadow-[#bb9457]/10 transition-all duration-500">
                <h3 className="font-serif text-xl text-neutral-900 font-normal mb-3">{item.title}</h3>
                <p className="text-sm text-neutral-600 font-light leading-relaxed">{item.body}</p>
              </div>
            ))}
          </div>

          <div className="mt-20 grid md:grid-cols-3 gap-8">
            <div className="border border-neutral-200 bg-white p-8 rounded-sm text-center hover:border-[#bb9457]/40 hover:shadow-lg transition-all duration-300">
              <h4 className="font-serif text-2xl text-[#bb9457] mb-2">Lahore</h4>
              <p className="text-neutral-600 text-sm">Opening 2026</p>
            </div>
            <div className="border border-neutral-200 bg-white p-8 rounded-sm text-center hover:border-[#bb9457]/40 hover:shadow-lg transition-all duration-300">
              <h4 className="font-serif text-2xl text-[#bb9457] mb-2">Islamabad</h4>
              <p className="text-neutral-600 text-sm">Opening 2026</p>
            </div>
            <div className="border border-neutral-200 bg-white p-8 rounded-sm text-center hover:border-[#bb9457]/40 hover:shadow-lg transition-all duration-300">
              <h4 className="font-serif text-2xl text-[#bb9457] mb-2">Karachi</h4>
              <p className="text-neutral-600 text-sm">Opening 2026</p>
            </div>
          </div>

          <div className="mt-20 p-12 bg-neutral-950/70 backdrop-blur-lg border border-neutral-800 rounded-sm">
            <h3 className="font-serif text-2xl text-white font-normal mb-6">How to join:</h3>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {[
                'Submit a short creative profile - tell us who you are and what you make.',
                'We review and reach out within five working days.',
                'Choose your membership - daily drop-ins, monthly memberships, or dedicated desk arrangements.',
                'Walk in, set up, and start creating.'
              ].map((step, i) => (
                <div key={i} className="relative">
                  <div className="font-mono text-3xl text-[#bb9457] mb-2">{String(i + 1).padStart(2, '0')}</div>
                  <p className="text-sm text-neutral-400 font-light leading-relaxed">{step}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="mt-12 text-center">
            <a href="#studio-waitlist" className="inline-block px-8 py-4 bg-[#bb9457] text-black font-semibold uppercase tracking-[0.2em] text-[11px] rounded-sm hover:bg-white hover:text-black transition-all duration-300">
              Join the studio waitlist
            </a>
          </div>
        </div>
      </section>

      {/* Studio Waitlist Form */}
      <section id="studio-waitlist" className="py-40 relative overflow-hidden border-t border-neutral-900 bg-neutral-950">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(187,148,87,0.08),transparent_70%)]" />
        
        <div className="max-w-3xl mx-auto px-6 lg:px-8 relative z-10">
          <div className="text-center mb-16">
            <span className="text-[10px] uppercase tracking-[0.3em] text-[#bb9457] font-mono font-semibold">Join the waitlist</span>
            <h2 className="mt-6 font-serif text-4xl md:text-5xl text-white font-normal tracking-tight">
              Secure your place in the first Adorzia Studio.
            </h2>
            <p className="mt-4 text-neutral-400 font-light text-lg">
              Studios open in 2026. Join the waitlist now and get priority access.
            </p>
          </div>

          {waitlistSubmitted ? (
            <div className="p-12 border border-[#bb9457]/30 rounded-sm bg-neutral-900/50 text-center">
              <div className="w-16 h-16 mx-auto mb-6 rounded-full bg-[#bb9457]/20 flex items-center justify-center">
                <svg className="w-8 h-8 text-[#bb9457]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <p className="text-white font-light text-lg mb-4">
                You are on the list. We will reach out before our studios open with priority membership offers.
              </p>
              <button 
                onClick={() => setWaitlistSubmitted(false)} 
                className="mt-6 px-6 py-3 border border-[#bb9457]/40 text-[#bb9457] text-[10px] uppercase tracking-[0.2em] rounded-sm hover:bg-[#bb9457] hover:text-black transition-all duration-300"
              >
                Submit another response
              </button>
            </div>
          ) : (
            <form onSubmit={handleWaitlistSubmit} className="space-y-6 p-10 border border-neutral-800 rounded-sm bg-neutral-900/30 backdrop-blur-sm">
              {/* Name */}
              <div>
                <label className="text-[10px] uppercase tracking-[0.2em] text-neutral-400 font-semibold block mb-2">Full name *</label>
                <input 
                  type="text" 
                  required 
                  value={waitlistForm.name}
                  onChange={(e) => setWaitlistForm({ ...waitlistForm, name: e.target.value })}
                  className="w-full border-b border-neutral-800 bg-transparent py-3 text-white outline-none focus:border-[#bb9457] transition-colors placeholder:text-neutral-600" 
                  placeholder="Your full name" 
                />
              </div>

              {/* Email & Phone */}
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label className="text-[10px] uppercase tracking-[0.2em] text-neutral-400 font-semibold block mb-2">Email address *</label>
                  <input 
                    type="email" 
                    required 
                    value={waitlistForm.email}
                    onChange={(e) => setWaitlistForm({ ...waitlistForm, email: e.target.value })}
                    className="w-full border-b border-neutral-800 bg-transparent py-3 text-white outline-none focus:border-[#bb9457] transition-colors placeholder:text-neutral-600" 
                    placeholder="your@email.com" 
                  />
                </div>
                <div>
                  <label className="text-[10px] uppercase tracking-[0.2em] text-neutral-400 font-semibold block mb-2">Phone number *</label>
                  <input 
                    type="tel" 
                    required 
                    value={waitlistForm.phone}
                    onChange={(e) => setWaitlistForm({ ...waitlistForm, phone: e.target.value })}
                    className="w-full border-b border-neutral-800 bg-transparent py-3 text-white outline-none focus:border-[#bb9457] transition-colors placeholder:text-neutral-600" 
                    placeholder="+92 XXX XXXXXXX" 
                  />
                </div>
              </div>

              {/* Location */}
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label className="text-[10px] uppercase tracking-[0.2em] text-neutral-400 font-semibold block mb-2">Current city *</label>
                  <input 
                    type="text" 
                    required 
                    value={waitlistForm.current_city}
                    onChange={(e) => setWaitlistForm({ ...waitlistForm, current_city: e.target.value })}
                    className="w-full border-b border-neutral-800 bg-transparent py-3 text-white outline-none focus:border-[#bb9457] transition-colors placeholder:text-neutral-600" 
                    placeholder="Lahore" 
                  />
                </div>
                <div>
                  <label className="text-[10px] uppercase tracking-[0.2em] text-neutral-400 font-semibold block mb-2">Preferred studio *</label>
                  <select 
                    required 
                    value={waitlistForm.preferred_city}
                    onChange={(e) => setWaitlistForm({ ...waitlistForm, preferred_city: e.target.value })}
                    className="w-full border-b border-neutral-800 bg-transparent py-3 text-white outline-none focus:border-[#bb9457] transition-colors"
                  >
                    <option value="" className="bg-neutral-950">Select a city</option>
                    <option value="lahore" className="bg-neutral-950">Lahore</option>
                    <option value="islamabad" className="bg-neutral-950">Islamabad</option>
                    <option value="karachi" className="bg-neutral-950">Karachi</option>
                  </select>
                </div>
              </div>

              {/* Discipline & Experience */}
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label className="text-[10px] uppercase tracking-[0.2em] text-neutral-400 font-semibold block mb-2">Primary discipline *</label>
                  <select 
                    required 
                    value={waitlistForm.discipline}
                    onChange={(e) => setWaitlistForm({ ...waitlistForm, discipline: e.target.value })}
                    className="w-full border-b border-neutral-800 bg-transparent py-3 text-white outline-none focus:border-[#bb9457] transition-colors"
                  >
                    <option value="" className="bg-neutral-950">Select discipline</option>
                    <option value="fashion design" className="bg-neutral-950">Fashion design</option>
                    <option value="textile design" className="bg-neutral-950">Textile design</option>
                    <option value="accessories" className="bg-neutral-950">Accessories</option>
                    <option value="photography" className="bg-neutral-950">Photography</option>
                    <option value="styling" className="bg-neutral-950">Styling</option>
                    <option value="other" className="bg-neutral-950">Other</option>
                  </select>
                </div>
                <div>
                  <label className="text-[10px] uppercase tracking-[0.2em] text-neutral-400 font-semibold block mb-2">Years of experience *</label>
                  <select 
                    required 
                    value={waitlistForm.years_experience}
                    onChange={(e) => setWaitlistForm({ ...waitlistForm, years_experience: e.target.value })}
                    className="w-full border-b border-neutral-800 bg-transparent py-3 text-white outline-none focus:border-[#bb9457] transition-colors"
                  >
                    <option value="" className="bg-neutral-950">Select experience</option>
                    <option value="less than 1 year" className="bg-neutral-950">Less than 1 year</option>
                    <option value="1-3 years" className="bg-neutral-950">1-3 years</option>
                    <option value="3-5 years" className="bg-neutral-950">3-5 years</option>
                    <option value="5+ years" className="bg-neutral-950">5+ years</option>
                  </select>
                </div>
              </div>

              {/* Workspace & Membership */}
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label className="text-[10px] uppercase tracking-[0.2em] text-neutral-400 font-semibold block mb-2">Current workspace *</label>
                  <select 
                    required 
                    value={waitlistForm.current_workspace}
                    onChange={(e) => setWaitlistForm({ ...waitlistForm, current_workspace: e.target.value })}
                    className="w-full border-b border-neutral-800 bg-transparent py-3 text-white outline-none focus:border-[#bb9457] transition-colors"
                  >
                    <option value="" className="bg-neutral-950">Select workspace</option>
                    <option value="home studio" className="bg-neutral-950">Home studio</option>
                    <option value="shared space" className="bg-neutral-950">Shared space</option>
                    <option value="no workspace" className="bg-neutral-950">No dedicated workspace</option>
                    <option value="other" className="bg-neutral-950">Other</option>
                  </select>
                </div>
                <div>
                  <label className="text-[10px] uppercase tracking-[0.2em] text-neutral-400 font-semibold block mb-2">Membership type *</label>
                  <select 
                    required 
                    value={waitlistForm.membership_type}
                    onChange={(e) => setWaitlistForm({ ...waitlistForm, membership_type: e.target.value })}
                    className="w-full border-b border-neutral-800 bg-transparent py-3 text-white outline-none focus:border-[#bb9457] transition-colors"
                  >
                    <option value="" className="bg-neutral-950">Select type</option>
                    <option value="part_time" className="bg-neutral-950">Part-time (2-3 days/week)</option>
                    <option value="full_time" className="bg-neutral-950">Full-time (5 days/week)</option>
                    <option value="project_based" className="bg-neutral-950">Project-based</option>
                  </select>
                </div>
              </div>

              {/* Start Date */}
              <div>
                <label className="text-[10px] uppercase tracking-[0.2em] text-neutral-400 font-semibold block mb-2">When do you plan to start?</label>
                <select 
                  value={waitlistForm.intended_start_date}
                  onChange={(e) => setWaitlistForm({ ...waitlistForm, intended_start_date: e.target.value })}
                  className="w-full border-b border-neutral-800 bg-transparent py-3 text-white outline-none focus:border-[#bb9457] transition-colors"
                >
                  <option value="" className="bg-neutral-950">Select timeline (optional)</option>
                  <option value="immediately" className="bg-neutral-950">Immediately when available</option>
                  <option value="within 3 months" className="bg-neutral-950">Within 3 months</option>
                  <option value="3-6 months" className="bg-neutral-950">3-6 months</option>
                  <option value="6+ months" className="bg-neutral-950">6+ months</option>
                </select>
              </div>

              {/* Why Studio */}
              <div>
                <label className="text-[10px] uppercase tracking-[0.2em] text-neutral-400 font-semibold block mb-2">Why do you want to join? *</label>
                <textarea 
                  required 
                  rows={4}
                  value={waitlistForm.why_studio}
                  onChange={(e) => setWaitlistForm({ ...waitlistForm, why_studio: e.target.value })}
                  className="w-full border-b border-neutral-800 bg-transparent py-3 text-white outline-none focus:border-[#bb9457] transition-colors resize-none placeholder:text-neutral-600" 
                  placeholder="Tell us what you are working on and how a studio space would help..." 
                />
              </div>

              {/* Portfolio & Instagram */}
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label className="text-[10px] uppercase tracking-[0.2em] text-neutral-400 font-semibold block mb-2">Portfolio or website</label>
                  <input 
                    type="url" 
                    value={waitlistForm.portfolio_url}
                    onChange={(e) => setWaitlistForm({ ...waitlistForm, portfolio_url: e.target.value })}
                    className="w-full border-b border-neutral-800 bg-transparent py-3 text-white outline-none focus:border-[#bb9457] transition-colors placeholder:text-neutral-600" 
                    placeholder="https://" 
                  />
                </div>
                <div>
                  <label className="text-[10px] uppercase tracking-[0.2em] text-neutral-400 font-semibold block mb-2">Instagram handle</label>
                  <input 
                    type="text" 
                    value={waitlistForm.instagram_handle}
                    onChange={(e) => setWaitlistForm({ ...waitlistForm, instagram_handle: e.target.value })}
                    className="w-full border-b border-neutral-800 bg-transparent py-3 text-white outline-none focus:border-[#bb9457] transition-colors placeholder:text-neutral-600" 
                    placeholder="@yourhandle" 
                  />
                </div>
              </div>

              <button 
                type="submit" 
                disabled={waitlistSubmitting}
                className="w-full px-8 py-4 bg-[#bb9457] text-black font-semibold uppercase tracking-[0.2em] text-[11px] rounded-sm hover:bg-white hover:text-black transition-all duration-300 disabled:opacity-50 flex items-center justify-center gap-3 group"
              >
                {waitlistSubmitting ? (
                  <>
                    <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                    </svg>
                    Submitting...
                  </>
                ) : (
                  <>
                    Join the studio waitlist
                    <svg className="w-4 h-4 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                    </svg>
                  </>
                )}
              </button>
            </form>
          )}
        </div>
      </section>

      {/* Marketplace */}
      <section className="py-40 relative overflow-hidden border-b border-neutral-900">
        <div className="absolute inset-0">
          <img src={studio} alt="" className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-l from-neutral-950/95 via-neutral-950/90 to-neutral-950/95" />
        </div>
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_left,rgba(187,148,87,0.1),transparent_50%)] pointer-events-none" />
        
        <div className="max-w-7xl mx-auto px-6 lg:px-8 relative z-10">
          <div className="grid lg:grid-cols-2 gap-16 items-start">
            <div className="order-last lg:order-first relative group">
              <div className="aspect-[4/5] overflow-hidden rounded-sm border border-neutral-900">
                <img src={studio} alt="Marketplace" className="w-full h-full object-cover grayscale contrast-125 group-hover:scale-105 transition-transform duration-700" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
              </div>
            </div>
            <div className="space-y-6">
              <span className="text-[10px] uppercase tracking-[0.3em] text-[#bb9457] font-mono font-semibold">The Adorzia Marketplace</span>
              <h2 className="font-serif text-3xl md:text-5xl text-white font-normal tracking-tight">
                The world is looking for what you make. We are building where it finds you.
              </h2>
              <div className="space-y-4 text-neutral-400 font-light text-base leading-relaxed">
                <p>
                  The Adorzia Marketplace is not another e-commerce platform where your work gets lost between a thousand identical listings. It is a curated destination - built for buyers who want to discover genuine Pakistani creative talent, and built for sellers whose work has a story worth telling.
                </p>
                <p>
                  We are currently in our preview phase, accepting early applications from designers and craftspeople who want to be among the first listings when we launch.
                </p>
              </div>
            </div>
          </div>

          <div className="mt-20 grid md:grid-cols-3 gap-8">
            {[
              { title: "Early-stage fashion designers", body: "You do not need an established brand or a years-long track record. You need original work, a creative point of view, and the commitment to fulfill orders with care. If you are making something genuine, we want it on the marketplace." },
              { title: "Heritage craft makers", body: "If your work carries the traditions of Pakistani craft - whether that is block printing, hand embroidery, weaving, mirror work, or any of the extraordinary making traditions this country holds - there is a dedicated place for you on Adorzia." },
              { title: "Fashion entrepreneurs", body: "If you are building a fashion brand at any early stage and need a platform that treats your work as premium rather than commodity, apply to list with us." }
            ].map((item, idx) => (
              <div key={idx} className="p-8 bg-black/60 backdrop-blur-md border border-neutral-800 rounded-sm hover:border-[#bb9457]/40 transition-all duration-500">
                <h3 className="font-serif text-xl text-white font-normal mb-3">{item.title}</h3>
                <p className="text-sm text-neutral-400 font-light leading-relaxed">{item.body}</p>
              </div>
            ))}
          </div>

          <div className="mt-20 p-12 bg-black/70 backdrop-blur-lg border border-neutral-800 rounded-sm">
            <h3 className="font-serif text-2xl text-white font-normal mb-6">What sells:</h3>
            <p className="text-neutral-400 font-light leading-relaxed">
              Ready-to-wear collections, made-to-order pieces, accessories, fabric and textile work, handcrafted fashion objects, culturally rooted contemporary design, and heritage craft in any medium - as long as it is original, Pakistani, and made with intention.
            </p>
          </div>

          <div className="mt-20 p-12 bg-neutral-950/70 backdrop-blur-lg border border-neutral-800 rounded-sm">
            <h3 className="font-serif text-2xl text-white font-normal mb-6">How listing works:</h3>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {[
                'Submit your seller application with images of your work and a short description of what you make.',
                'Our curation team reviews every application - we respond within seven working days.',
                'Approved sellers receive onboarding support - photography guidance, listing copywriting tips, and pricing advice.',
                'Your work goes live with your story attached to every single piece.'
              ].map((step, i) => (
                <div key={i} className="relative">
                  <div className="font-mono text-3xl text-[#bb9457] mb-2">{String(i + 1).padStart(2, '0')}</div>
                  <p className="text-sm text-neutral-400 font-light leading-relaxed">{step}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="mt-12 flex flex-wrap justify-center gap-5">
            <a href="/contact" className="inline-block px-8 py-4 bg-[#bb9457] text-black font-semibold uppercase tracking-[0.2em] text-[11px] rounded-sm hover:bg-white hover:text-black transition-all duration-300">
              Apply to list your work
            </a>
            <a href="/contact" className="inline-block px-8 py-4 border border-white/20 text-white font-semibold uppercase tracking-[0.2em] text-[11px] rounded-sm hover:border-[#bb9457] hover:text-[#bb9457] transition-all duration-300">
              Join the seller waitlist
            </a>
          </div>
        </div>
      </section>

      {/* Spotlight Event */}
      <section className="py-40 relative overflow-hidden">
        <div className="absolute inset-0">
          <img src={spotlight} alt="" className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-t from-[#6f1d1b] via-[#6f1d1b]/90 to-[#6f1d1b]/70" />
        </div>
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(187,148,87,0.15),transparent_60%)] pointer-events-none" />
        
        <div className="max-w-7xl mx-auto px-6 lg:px-8 relative z-10">
          <div className="grid lg:grid-cols-2 gap-16 items-start mb-20">
            <div className="space-y-6">
              <span className="text-[10px] uppercase tracking-[0.3em] text-[#bb9457] font-mono font-semibold">Adorzia Spotlight</span>
              <h2 className="font-serif text-4xl md:text-5xl text-white font-normal tracking-tight leading-tight">
                One event. One investment. One career that changes forever.
              </h2>
              <p className="text-white/80 font-light text-base md:text-lg leading-relaxed">
                Our annual talent competition gives extraordinary Pakistani fashion designers a national stage, direct investment, and the mentorship to become brands the world knows.
              </p>
            </div>
            
            <div className="grid sm:grid-cols-2 gap-6">
              {[
                { num: "01", title: "National visibility", body: "Present your work to industry leaders, investors, buyers, and press at a live event." },
                { num: "02", title: "Direct investment", body: "Winners receive capital to produce, scale, and launch - not a prize, a partnership." },
                { num: "03", title: "Expert mentorship", body: "Paired with mentors from fashion, business, and creative industries." },
                { num: "04", title: "Long-term support", body: "We build with you - branding, strategy, positioning, and production support." }
              ].map((item, idx) => (
                <div key={idx} className="p-6 bg-white/5 backdrop-blur-md border border-white/20 rounded-sm hover:border-[#bb9457]/60 transition-all duration-500 group">
                  <div className="font-mono text-[#bb9457] text-xs uppercase tracking-widest mb-3">{item.num}</div>
                  <h3 className="font-serif text-lg text-white font-normal mb-2 group-hover:text-[#bb9457] transition-colors">{item.title}</h3>
                  <p className="text-sm text-white/70 font-light leading-relaxed">{item.body}</p>
                </div>
              ))}
            </div>
          </div>

          
        </div>
      </section>

      {/* Heritage Craft Program */}
      <section className="py-40 relative overflow-hidden border-b border-neutral-900">
        <div className="absolute inset-0">
          <img src={craft} alt="" className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-r from-black via-black/95 to-neutral-950" />
        </div>
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_left,rgba(187,148,87,0.12),transparent_50%)] pointer-events-none" />
        
        <div className="max-w-7xl mx-auto px-6 lg:px-8 relative z-10">
          <div className="grid lg:grid-cols-2 gap-16 items-start">
            <div className="space-y-6">
              <span className="text-[10px] uppercase tracking-[0.3em] text-[#bb9457] font-mono font-semibold">For our master makers</span>
              <h2 className="font-serif text-3xl md:text-5xl text-white font-normal tracking-tight">
                Your hands hold centuries of knowledge. Adorzia is here to give them a global stage.
              </h2>
              <div className="space-y-4 text-neutral-400 font-light text-base leading-relaxed">
                <p>
                  Pakistan is one of the most craft-rich nations on earth. Ajrak from Sindh. Phulkari from Punjab. Rilli quilting from Balochistan. Pashmina from Kashmir. Truck art-inspired textile work from Karachi. Khaddar weaving from across the country. Hand embroidery traditions so sophisticated they have no equivalent anywhere in the world.
                </p>
                <p>
                  And yet most of the people who carry these traditions have never had access to a platform that presents their work with the dignity, the pricing, and the audience it deserves.
                </p>
                <p>
                  The Adorzia Heritage Craft Program is built specifically for traditional craftspeople and makers - to bridge the gap between generational skill and the global market that is hungry for exactly what they make.
                </p>
              </div>
            </div>
            <div className="aspect-[4/5] overflow-hidden rounded-sm border border-neutral-900 relative group">
              <img src={craft} alt="Heritage Craft" className="w-full h-full object-cover grayscale contrast-125 group-hover:scale-105 transition-transform duration-700" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
            </div>
          </div>

          <div className="mt-20 space-y-6">
            {/* First Row - 4 Boxes */}
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {[
                { title: "A dedicated marketplace presence", body: "Heritage craft listings on Adorzia are presented as their own category - with the context, the cultural story, and the premium positioning that this work commands." },
                { title: "Storytelling support", body: "We work with every heritage maker to document and communicate the tradition behind their craft - in a language that connects with buyers internationally without diluting the authenticity of what they make." },
                { title: "Pricing guidance", body: "Heritage craft in Pakistan is chronically underpriced. We help makers understand the true market value of their work and price it accordingly - because what you make is not cheap, and we will never present it as though it is." },
                { title: "Spotlight eligibility", body: "Heritage craftspeople are fully eligible for Adorzia Spotlight. A master weaver with a vision for how their tradition becomes a contemporary brand is exactly the kind of visionary we are looking for." }
              ].map((item, idx) => (
                <div key={idx} className="p-8 bg-neutral-950/60 backdrop-blur-md border border-neutral-800 rounded-sm hover:border-[#bb9457]/40 transition-all duration-500">
                  <div className="font-mono text-[#bb9457] text-xs uppercase tracking-widest mb-4">0{idx + 1}</div>
                  <h3 className="font-serif text-xl text-white font-normal mb-3">{item.title}</h3>
                  <p className="text-sm text-neutral-400 font-light leading-relaxed">{item.body}</p>
                </div>
              ))}
            </div>

            {/* Second Row - 1 Full Width Box */}
            <div className="p-8 bg-neutral-950/60 backdrop-blur-md border border-neutral-800 rounded-sm hover:border-[#bb9457]/40 transition-all duration-500">
              <div className="font-mono text-[#bb9457] text-xs uppercase tracking-widest mb-4">05</div>
              <h3 className="font-serif text-xl text-white font-normal mb-3">Community and connection</h3>
              <p className="text-sm text-neutral-400 font-light leading-relaxed">The Heritage Craft Program connects makers with designers who want to collaborate, buyers who want to commission, and a community of people who believe that Pakistan's craft traditions belong at the center of its fashion future - not at the margins.</p>
            </div>
          </div>

          <div className="mt-12 flex flex-wrap justify-center gap-5">
            <a href="/contact" className="inline-block px-8 py-4 bg-[#bb9457] text-black font-semibold uppercase tracking-[0.2em] text-[11px] rounded-sm hover:bg-white hover:text-black transition-all duration-300">
              Apply to the heritage craft program
            </a>
            <a href="/about" className="inline-block px-8 py-4 border border-white/20 text-white font-semibold uppercase tracking-[0.2em] text-[11px] rounded-sm hover:border-[#bb9457] hover:text-[#bb9457] transition-all duration-300">
              Learn more about what we preserve
            </a>
          </div>
        </div>
      </section>

      {/* Designer Success Stories */}
      <section className="py-40 bg-white relative overflow-hidden border-b border-neutral-200">
        <div className="absolute inset-0 opacity-[0.03] pointer-events-none">
          <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <pattern id="stories-grid" width="80" height="80" patternUnits="userSpaceOnUse">
                <path d="M 40 0 L 80 40 L 40 80 L 0 40 Z" fill="none" stroke="#bb9457" strokeWidth="0.5" />
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#stories-grid)" />
          </svg>
        </div>
        
        <div className="max-w-7xl mx-auto px-6 lg:px-8 relative z-10">
          <div className="grid lg:grid-cols-2 gap-16 items-start">
            <div className="space-y-6">
              <span className="text-[10px] uppercase tracking-[0.3em] text-[#bb9457] font-mono font-semibold">The community speaks</span>
              <h2 className="font-serif text-3xl md:text-5xl text-neutral-900 font-normal tracking-tight">
                These stories are just beginning. Yours could be next.
              </h2>
              <div className="space-y-4 text-neutral-600 font-light text-base md:text-lg leading-relaxed">
                <p>
                  Adorzia launched in 2025. We are early, we are building, and we are honest about the fact that our greatest success stories are still being written - by the designers, makers, and fashion entrepreneurs who are joining us right now at the ground floor.
                </p>
                <p>
                  We will fill this section with real voices, real journeys, and real transformations as our community grows. If you join Adorzia today, your story could be the one that inspires the next generation of Pakistani fashion entrepreneurs.
                </p>
              </div>
              <p className="text-[#bb9457] font-mono text-xs uppercase tracking-widest">
                First stories publishing after Spotlight Fall 2026.
              </p>
              <div className="pt-4">
                <a href="/spotlight-event" className="inline-block px-8 py-4 bg-[#bb9457] text-black font-semibold uppercase tracking-[0.2em] text-[11px] rounded-sm hover:bg-neutral-900 hover:text-white transition-all duration-300">
                  Be one of the first
                </a>
              </div>
            </div>
            <div className="aspect-[4/5] overflow-hidden rounded-sm border border-neutral-200 relative group">
              <img 
                src={heroHome} 
                alt="Designer Success Stories" 
                className="w-full h-full object-cover grayscale contrast-110 group-hover:grayscale-0 group-hover:scale-105 transition-all duration-700" 
              />
            </div>
          </div>
        </div>
      </section>

      {/* Apply / Get Started */}
      <section className="py-48 relative overflow-hidden">
        <div className="absolute inset-0">
          <img src={heroHome} alt="" className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-b from-black via-black/90 to-neutral-950" />
        </div>
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(187,148,87,0.15),transparent_60%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(187,148,87,0.1),transparent_50%)]" />
        
        <div className="absolute inset-0 opacity-[0.02] pointer-events-none">
          <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <pattern id="cta-grid" width="80" height="80" patternUnits="userSpaceOnUse">
                <path d="M 40 0 L 80 40 L 40 80 L 0 40 Z" fill="none" stroke="#bb9457" strokeWidth="0.5" />
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#cta-grid)" />
          </svg>
        </div>
        
        <div className="max-w-5xl mx-auto px-6 lg:px-8 text-center relative z-10">
          <span className="text-[10px] uppercase tracking-[0.3em] text-[#bb9457] font-mono font-semibold">Your next step starts here</span>
          <h2 className="mt-4 font-serif text-4xl md:text-6xl text-white font-normal tracking-tight">
            Whatever you make, there is a door at Adorzia with your name on it.
          </h2>
          <div className="mt-6 space-y-4 text-neutral-400 font-light text-base md:text-lg max-w-3xl mx-auto leading-relaxed">
            <p>
              You do not need to have it all figured out. You do not need a finished collection or an established following or a business plan in a binder. You need craft, commitment, and the belief that what you make deserves to be seen.
            </p>
            <p className="text-white font-normal">
              We will help with the rest.
            </p>
          </div>

          <div className="mt-20 space-y-6">
            {/* Top Row - Asymmetric Grid */}
            <div className="grid md:grid-cols-12 gap-6">
              {/* Studio Membership - Large Card */}
              <div className="md:col-span-5 p-10 bg-neutral-950/70 backdrop-blur-md border border-neutral-800 rounded-sm hover:border-[#bb9457]/40 transition-all duration-500 group">
                <div className="text-left">
                  <div className="font-mono text-[#bb9457] text-xs uppercase tracking-widest mb-4">01</div>
                  <h3 className="font-serif text-3xl text-white font-normal mb-4 leading-tight">Apply for a studio membership</h3>
                  <p className="text-sm text-neutral-400 font-light leading-relaxed mb-8">Join our creative coworking community in Lahore, Islamabad, or Karachi. Professional workspace, equipment, and a community of makers.</p>
                  <a href="/contact" className="inline-flex items-center gap-3 text-[#bb9457] text-xs uppercase tracking-[0.2em] font-semibold group-hover:gap-4 transition-all duration-300">
                    Apply for a studio
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                    </svg>
                  </a>
                </div>
              </div>

              {/* Marketplace - Large Card */}
              <div className="md:col-span-7 p-10 bg-neutral-950/60 backdrop-blur-md border border-neutral-800 rounded-sm hover:border-[#bb9457]/40 transition-all duration-500 group">
                <div className="text-left">
                  <div className="font-mono text-[#bb9457] text-xs uppercase tracking-widest mb-4">02</div>
                  <h3 className="font-serif text-3xl text-white font-normal mb-4 leading-tight">List on the marketplace</h3>
                  <p className="text-sm text-neutral-400 font-light leading-relaxed mb-8">Get your work in front of buyers locally and internationally. A curated platform for authentic Pakistani fashion and craft.</p>
                  <a href="/contact" className="inline-flex items-center gap-3 text-[#bb9457] text-xs uppercase tracking-[0.2em] font-semibold group-hover:gap-4 transition-all duration-300">
                    Apply to list
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                    </svg>
                  </a>
                </div>
              </div>
            </div>

            {/* Bottom Row - Spotlight & Heritage */}
            <div className="grid md:grid-cols-12 gap-6">
              {/* Spotlight - Featured Card */}
              <div className="md:col-span-8 p-12 bg-gradient-to-br from-[#bb9457]/10 to-neutral-950/80 backdrop-blur-md border border-[#bb9457]/30 rounded-sm hover:border-[#bb9457]/60 transition-all duration-500 group">
                <div className="flex flex-col md:flex-row md:items-center gap-8">
                  <div className="flex-1 text-left">
                    <div className="font-mono text-[#bb9457] text-xs uppercase tracking-widest mb-4">03</div>
                    <h3 className="font-serif text-3xl text-white font-normal mb-4 leading-tight">Submit for Spotlight 2026</h3>
                    <p className="text-sm text-neutral-400 font-light leading-relaxed mb-6">Submissions open June 1, 2026. This is your national stage. Direct investment, mentorship, and brand building for extraordinary talent.</p>
                    <div className="flex items-center gap-2 text-white/60 text-xs">
                      <span className="w-2 h-2 bg-[#bb9457] rounded-full animate-pulse" />
                      Opens in June 2026
                    </div>
                  </div>
                  <div className="md:text-right">
                    <a href="/spotlight-event" className="inline-block px-8 py-4 bg-[#bb9457] text-black font-semibold uppercase tracking-[0.2em] text-xs rounded-sm hover:bg-white transition-all duration-300">
                      Submit for Spotlight
                    </a>
                  </div>
                </div>
              </div>

              {/* Heritage Craft - Compact Card */}
              <div className="md:col-span-4 p-10 bg-neutral-950/70 backdrop-blur-md border border-neutral-800 rounded-sm hover:border-[#bb9457]/40 transition-all duration-500 group">
                <div className="text-left h-full flex flex-col justify-between">
                  <div>
                    <div className="font-mono text-[#bb9457] text-xs uppercase tracking-widest mb-4">04</div>
                    <h3 className="font-serif text-2xl text-white font-normal mb-4 leading-tight">Join the heritage craft program</h3>
                    <p className="text-sm text-neutral-400 font-light leading-relaxed">For traditional makers ready for a global audience. Your craft, our platform.</p>
                  </div>
                  <a href="/contact" className="inline-flex items-center gap-3 text-[#bb9457] text-xs uppercase tracking-[0.2em] font-semibold mt-6 group-hover:gap-4 transition-all duration-300">
                    Apply to the program
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                    </svg>
                  </a>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-20 text-center">
            <p className="text-neutral-400 font-light text-base md:text-lg max-w-2xl mx-auto mb-8">
              Not sure which path is right for you? Write to us. We will figure it out together.
            </p>
            <a href="/contact" className="inline-block px-8 py-4 border border-white/20 text-white font-semibold uppercase tracking-[0.2em] text-[11px] rounded-sm hover:border-[#bb9457] hover:text-[#bb9457] transition-all duration-300">
              Get in touch
            </a>
          </div>
        </div>
      </section>
    </div>
  )
}

export default ForCreatives
