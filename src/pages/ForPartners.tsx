import { useState } from 'react'
import { supabase } from '../lib/supabase'
import { sendEmailNotification } from '../lib/email'
import SEO from '../components/SEO'
import heroHome from '../assets/hero-banner-coworking-studio 1 .png'
import studio from '../assets/hero-banner-coworking-studio-2.png'
import spotlight from '../assets/fashion-icon.png'
import craft from '../assets/craft.jpg'
import coworking from '../assets/coworking-studio-image .png'

const ForPartners = () => {
  const [form, setForm] = useState({
    contact_name: '',
    company_name: '',
    email: '',
    phone: '',
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
        .from('partnership_inquiries')
        .insert([form])

      if (supabaseError) throw supabaseError

      // Send email notification
      await sendEmailNotification('partnership', {
        name: form.contact_name,
        email: form.email,
        company: form.company_name,
        partnership_type: 'General Partnership',
        message: form.message
      })

      setSubmitted(true)
      setForm({ contact_name: '', company_name: '', email: '', phone: '', message: '' })
    } catch (err) {
      setError('Failed to submit inquiry. Please try again.')
      console.error(err)
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <div className="min-h-screen bg-black text-white">
      <SEO
        title="Invest in Pakistani Fashion - Adorzia Investor and Partnership Opportunities"
        description="Pakistan's fashion entrepreneurship ecosystem represents one of the most underinvested creative economy opportunities in Asia. Adorzia offers structured investment pathways through studio growth, marketplace commerce and the Spotlight talent pipeline. Request our investor deck today."
        canonicalURL="https://adorzia.com/for-partners"
        ogTitle="The Pakistani Fashion Investment Opportunity - Adorzia"
        ogDescription="Three revenue streams. A national talent pipeline. An underserved market of 240 million. The case for investing in Pakistani fashion entrepreneurship."
        ogImageAlt="Adorzia investor opportunity - Pakistani fashion ecosystem"
        schemaType="WebPage"
        keywords="invest in Pakistani fashion, Pakistani fashion investment opportunity, fashion entrepreneurship Pakistan, Adorzia investor deck, Spotlight co-investment Pakistan, Fashion investment Pakistan, Fashion entrepreneurship, Pakistani fashion startup, Invest in Pakistani fashion entrepreneurs, Pakistani fashion brand investment opportunity, Fashion brand building Pakistan, Pakistani fashion investment, Adorzia, Adorzia fashion"
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
          <img src={heroHome} alt="Creative Ecosystem" className="w-full h-full object-cover opacity-25 grayscale contrast-125 scale-105 animate-ambient-swell" />
        </div>
        <div className="absolute inset-0 bg-gradient-to-b from-black via-black/85 to-neutral-950" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(187,148,87,0.15),transparent_60%)]" />

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

        <div className="relative z-10 max-w-5xl mx-auto px-6 md:px-12 lg:px-20 py-32 animate-fade-in-up">
          <span className="inline-flex items-center gap-2 text-[#bb9457] uppercase tracking-[0.3em] text-[10px] font-mono font-semibold">
            <span className="w-1.5 h-1.5 bg-[#bb9457] rounded-full animate-pulse" />
            The opportunity
          </span>

          <h1 className="mt-6 font-serif text-4xl md:text-6xl lg:text-7xl leading-[1.05] text-white tracking-tight font-normal">
            The most underinvested creative economy in Asia is about to have its moment.
          </h1>

          <p className="mt-8 max-w-3xl text-neutral-400 text-base md:text-lg leading-relaxed font-light">
            Pakistan has two hundred and forty million people, a craft tradition that spans three thousand years, a fashion industry that generates billions in textile exports annually, and almost no domestic infrastructure for fashion entrepreneurship.
          </p>
          <p className="mt-4 max-w-3xl text-neutral-400 text-base md:text-lg leading-relaxed font-light">
            That is not a problem. That is an investment thesis.
          </p>
          <p className="mt-4 max-w-3xl text-neutral-400 text-base md:text-lg leading-relaxed font-light">
            Adorzia is building the first complete ecosystem for fashion entrepreneurship in Pakistan - the studios, the marketplace, the talent pipeline, and the annual event that turns visionaries into investable brands. We are early, we are deliberate, and we are inviting the right partners to be part of this from the beginning.
          </p>

          <div className="mt-12 flex flex-wrap gap-5">
            <a
              href="#deck"
              className="px-8 py-4 bg-[#bb9457] text-black font-semibold uppercase tracking-[0.2em] text-[11px] rounded-sm hover:bg-white hover:text-black transition-all duration-300"
            >
              Request our investor deck
            </a>
            <a
              href="#contact"
              className="px-8 py-4 border border-white/20 text-white font-semibold uppercase tracking-[0.2em] text-[11px] rounded-sm hover:border-[#bb9457] hover:text-[#bb9457] transition-all duration-300"
            >
              Get in touch
            </a>
          </div>
        </div>
      </section>

      {/* Market Size and Gap */}
      <section className="py-32 border-b border-neutral-900 bg-neutral-950 relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <img src={craft} alt="" className="w-full h-full object-cover grayscale animate-ambient-swell" />
        </div>
        <div className="max-w-7xl mx-auto px-6 lg:px-8 relative z-10">
          <div className="max-w-3xl mb-20">
            <span className="text-[10px] uppercase tracking-[0.3em] text-[#bb9457] font-mono font-semibold">The numbers behind the opportunity</span>
            <h2 className="mt-4 font-serif text-3xl md:text-5xl text-white font-normal tracking-tight">
              Pakistan's fashion economy is enormous. Its infrastructure is not.
            </h2>
            <p className="mt-6 text-neutral-400 font-light text-base leading-relaxed">
              Pakistan is the fourth largest producer of cotton in the world. Its textile and garment sector accounts for over sixty percent of total export earnings. The domestic fashion retail market is growing at a rate that outpaces most comparable economies in the region. And beneath the export industry sits an entire creative economy - independent designers, heritage craftspeople, fashion entrepreneurs - that has never had an ecosystem built around it.
            </p>
            <p className="mt-4 text-neutral-400 font-light text-base leading-relaxed">
              The gap is not in talent. Pakistan produces fashion graduates, master craftspeople, and independent designers at scale. The gap is in everything that turns talent into a business.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8 mb-20">
            <div className="p-8 border border-neutral-900 rounded-sm bg-black">
              <div className="font-serif text-5xl text-[#bb9457] mb-2">$19B+</div>
              <div className="text-sm text-neutral-400 font-light">Pakistan textile and apparel export value annually</div>
            </div>
            <div className="p-8 border border-neutral-900 rounded-sm bg-black">
              <div className="font-serif text-5xl text-[#bb9457] mb-2">240M+</div>
              <div className="text-sm text-neutral-400 font-light">Population - the fourth largest in the world</div>
            </div>
            <div className="p-8 border border-neutral-900 rounded-sm bg-black">
              <div className="font-serif text-5xl text-[#bb9457] mb-2">65%</div>
              <div className="text-sm text-neutral-400 font-light">Population under thirty - the core fashion consumer demographic</div>
            </div>
            <div className="p-8 border border-neutral-900 rounded-sm bg-black">
              <div className="font-serif text-5xl text-[#bb9457] mb-2">Near zero</div>
              <div className="text-sm text-neutral-400 font-light">Dedicated fashion entrepreneurship infrastructure before Adorzia</div>
            </div>
          </div>

          <p className="text-neutral-400 font-light text-base leading-relaxed max-w-3xl">
            The domestic premium fashion market is growing. The appetite for Pakistani identity in global fashion is growing. The number of serious creative entrepreneurs in this country who need infrastructure, capital, and a platform is growing. The investor ecosystem that serves them has not kept pace.
          </p>
          <p className="mt-4 text-white font-medium text-base leading-relaxed max-w-3xl">
            Adorzia is built to close that gap - and to build significant value in the process.
          </p>
        </div>
      </section>

      {/* Why Now */}
      <section className="py-32 border-b border-neutral-900 bg-black relative overflow-hidden">
        <div className="absolute inset-0 opacity-[0.03] pointer-events-none">
          <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <pattern id="timing-grid" width="60" height="60" patternUnits="userSpaceOnUse">
                <path d="M 30 0 L 60 30 L 30 60 L 0 30 Z" fill="none" stroke="#bb9457" strokeWidth="0.5" />
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#timing-grid)" />
          </svg>
        </div>
        <div className="max-w-7xl mx-auto px-6 lg:px-8 relative z-10">
          <div className="max-w-3xl mb-20">
            <span className="text-[10px] uppercase tracking-[0.3em] text-[#bb9457] font-mono font-semibold">The timing</span>
            <h2 className="mt-4 font-serif text-3xl md:text-5xl text-white font-normal tracking-tight">
              2025 was the only year this made sense to start.
            </h2>
            <p className="mt-6 text-neutral-400 font-light text-base leading-relaxed">
              Three things converged in 2025 that made Adorzia not just possible but inevitable.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 mb-20">
            {[
              { title: "A generation ready to build", body: "Pakistan's under-thirty population is the largest, most educated, and most digitally connected it has ever been. Fashion graduates are emerging from institutions across the country with skills, ambition, and nowhere near enough infrastructure to support them. The creative supply has never been greater. The ecosystem to absorb it has never existed." },
              { title: "Global appetite for non-Western fashion identity", body: "The global fashion conversation shifted permanently in the early 2020s. Buyers, editors, investors, and consumers are actively seeking fashion identities that are not European in origin. South Asian aesthetics - and Pakistani craft specifically - are at the center of that hunger. The world is ready for what Pakistan makes. Pakistan just needs a channel to reach it." },
              { title: "Digital infrastructure finally catching up", body: "E-commerce, digital payments, logistics networks, and social commerce in Pakistan have matured to the point where a marketplace built for Pakistani fashion can actually operate at scale. The same infrastructure barriers that would have made Adorzia impossible five years ago have been systematically removed." }
            ].map((item, idx) => (
              <div key={idx} className="p-8 border border-neutral-900 rounded-sm hover:border-[#bb9457]/30 transition-colors duration-300">
                <div className="font-mono text-3xl text-[#bb9457] mb-4">0{idx + 1}</div>
                <h3 className="font-serif text-xl text-white font-normal mb-3">{item.title}</h3>
                <p className="text-sm text-neutral-400 font-light leading-relaxed">{item.body}</p>
              </div>
            ))}
          </div>

          <div className="p-12 border border-[#bb9457]/30 rounded-sm bg-neutral-950 max-w-4xl">
            <p className="text-neutral-300 font-light text-base leading-relaxed">
              We are not early in the sense that the market does not exist yet. We are early in the sense that the right company has not been built yet. Adorzia is that company - and 2025 was the moment to build it.
            </p>
          </div>
        </div>
      </section>

      {/* What Adorzia Is Building */}
      <section className="py-32 border-b border-neutral-900 bg-neutral-950 relative overflow-hidden">
        <div className="absolute bottom-0 right-0 w-96 h-96 opacity-15 pointer-events-none">
          <img src={studio} alt="" className="w-full h-full object-cover grayscale contrast-125" />
        </div>
        <div className="max-w-7xl mx-auto px-6 lg:px-8 relative z-10">
          <div className="max-w-3xl mb-20">
            <span className="text-[10px] uppercase tracking-[0.3em] text-[#bb9457] font-mono font-semibold">The ecosystem</span>
            <h2 className="mt-4 font-serif text-3xl md:text-5xl text-white font-normal tracking-tight">
              Three businesses. One compounding asset.
            </h2>
            <p className="mt-6 text-neutral-400 font-light text-base leading-relaxed">
              Adorzia is not a single product or a single bet. It is an ecosystem - three interconnected businesses that each generate their own value while making the others stronger. Every studio member is a potential marketplace seller. Every marketplace seller is a potential Spotlight applicant. Every Spotlight winner becomes a proof point that attracts the next generation of studio members, marketplace sellers, and investors.
            </p>
            <p className="mt-4 text-neutral-400 font-light text-base leading-relaxed">
              This is a flywheel. And we are building every part of it deliberately.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 mb-20">
            {[
              { title: "Adorzia Studios - the creative infrastructure", body: "Dedicated coworking spaces for fashion professionals in Lahore, Islamabad, and Karachi. Revenue through membership fees, daily and weekly access packages, event hosting, and studio partnerships with fashion institutions. Studios also function as community anchors - building the trust and loyalty that drives adoption of the marketplace and Spotlight pipeline.", image: coworking },
              { title: "The Adorzia Marketplace - the commercial engine", body: "A curated platform connecting Pakistan's emerging designers and heritage craftspeople with buyers locally and internationally. Revenue through seller commissions, premium listing packages, brand partnership placements, and international wholesale facilitation. The marketplace grows in direct proportion to the quality of talent in our community - which Spotlight is specifically designed to produce.", image: studio },
              { title: "Adorzia Spotlight - the talent and brand pipeline", body: "Our annual national fashion event discovers extraordinary creative talent, invests in the most promising, and builds them into brands. Revenue through event sponsorship, brand partnership deals, equity stakes in Spotlight-backed designers, licensing arrangements, and the premium positioning that Spotlight association creates for every part of the Adorzia ecosystem.", image: spotlight }
            ].map((biz, idx) => (
              <div key={idx} className="bg-black border border-neutral-900 rounded-sm overflow-hidden group hover:border-[#bb9457]/30 transition-colors duration-300">
                <div className="aspect-[4/3] overflow-hidden">
                  <img src={biz.image} alt={biz.title} className="w-full h-full object-cover grayscale contrast-125 group-hover:scale-105 transition-transform duration-700" />
                </div>
                <div className="p-8">
                  <h3 className="font-serif text-xl text-white font-normal mb-3">{biz.title}</h3>
                  <p className="text-sm text-neutral-400 font-light leading-relaxed">{biz.body}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Three Revenue Streams */}
      <section className="py-32 border-b border-neutral-900 bg-black">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="max-w-3xl mb-20">
            <span className="text-[10px] uppercase tracking-[0.3em] text-[#bb9457] font-mono font-semibold">How Adorzia makes money</span>
            <h2 className="mt-4 font-serif text-3xl md:text-5xl text-white font-normal tracking-tight">
              Recurring, transactional, and event-driven - across three compounding streams.
            </h2>
          </div>

          <div className="space-y-8">
            {[
              { title: "Studio membership revenue", model: "Monthly and annual memberships, daily drop-in access, dedicated desk arrangements, private studio bookings, and institutional partnerships with fashion schools and design programs. Recurring, predictable, and growing with each new city.", stage: "Launching 2026 across three cities." },
              { title: "Marketplace commission and premium services", model: "Percentage commission on every transaction, tiered seller subscription packages, premium placement and promotional features, international buyer facilitation, and wholesale arrangement fees. Scales directly with community growth and seller quality.", stage: "Preview phase open. Full launch following Spotlight Fall 2026." },
              { title: "Spotlight event and brand investment returns", model: "Sponsorship and partnership deals for the annual event, ticket and access revenue, equity or revenue-share arrangements with Spotlight-backed designers, brand licensing deals, and the long-term returns on investment in the fashion entrepreneurs we build into brands.", stage: "First event, Fall 2026. Submissions open June 1." }
            ].map((stream, idx) => (
              <div key={idx} className="grid md:grid-cols-12 gap-8 p-8 border border-neutral-900 rounded-sm hover:border-[#bb9457]/30 transition-colors duration-300">
                <div className="md:col-span-4">
                  <div className="font-mono text-3xl text-[#bb9457] mb-4">0{idx + 1}</div>
                  <h3 className="font-serif text-2xl text-white font-normal">{stream.title}</h3>
                </div>
                <div className="md:col-span-6">
                  <p className="text-sm text-neutral-400 font-light leading-relaxed">{stream.model}</p>
                </div>
                <div className="md:col-span-2">
                  <div className="text-xs text-[#bb9457] font-mono uppercase tracking-widest">{stream.stage}</div>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-16 p-12 border border-[#bb9457]/30 rounded-sm bg-neutral-950 max-w-4xl">
            <p className="text-neutral-300 font-light text-base leading-relaxed">
              These three streams are designed to compound. A healthy studio community produces better marketplace sellers. A better marketplace produces stronger Spotlight applicants. Stronger Spotlight winners attract bigger sponsors, more investors, and a more commercially powerful ecosystem across all three.
            </p>
          </div>
        </div>
      </section>

      {/* Spotlight Pipeline */}
      <section className="py-40 relative overflow-hidden bg-[#6f1d1b]">
        <div className="absolute inset-0 opacity-20">
          <img src={spotlight} alt="" className="w-full h-full object-cover grayscale contrast-125 animate-ambient-swell" />
        </div>
        <div className="absolute inset-0 bg-gradient-to-t from-[#6f1d1b] via-[#6f1d1b]/90 to-transparent" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(187,148,87,0.1),transparent_60%)] pointer-events-none" />
        <div className="max-w-7xl mx-auto px-6 lg:px-8 relative z-10">
          <div className="text-center max-w-4xl mx-auto mb-20">
            <span className="text-[10px] uppercase tracking-[0.3em] text-[#bb9457] font-mono font-semibold">The talent investment thesis</span>
            <h2 className="mt-4 font-serif text-4xl md:text-6xl text-white font-normal tracking-tight">
              We are not just discovering talent. We are building the brands you will want to invest in next.
            </h2>
            <p className="mt-6 text-white/80 font-light text-base md:text-lg leading-relaxed">
              Adorzia Spotlight is the most strategically important part of what we are building - because it solves the single biggest problem in fashion investment in Pakistan: there is no reliable pipeline of investment-ready fashion brands.
            </p>
            <p className="mt-4 text-white/80 font-light text-base md:text-lg leading-relaxed">
              Investors who want to back Pakistani fashion talent have nowhere to find it, no way to evaluate it at scale, and no infrastructure to support it once they back it. Spotlight changes all three.
            </p>
          </div>

          <div className="space-y-6 mb-20">
            {[
              { title: "National discovery", body: "We search the entire country - every city, every institution, every craft community - for fashion entrepreneurs who have the talent, the vision, and the commercial instinct to build a brand. We find people that conventional fashion industry networks would never reach." },
              { title: "Rigorous selection", body: "Applications go through a multi-stage selection process evaluated by designers, business professionals, and investors. We are not selecting the most aesthetically impressive work. We are selecting the most promising fashion entrepreneurs - people who can build, not just create." },
              { title: "Public platform", body: "Finalists are presented at the Adorzia Spotlight live event - in front of an audience that includes investors, buyers, press, and industry figures. This is not a student showcase. This is a professional platform with real commercial stakes." },
              { title: "Investment and brand building", body: "Winners receive direct investment, mentorship, production support, marketplace placement, and an ongoing partnership with Adorzia to develop their brand. We take a considered stake in their success - which means our interests are aligned with theirs for the long term." },
              { title: "An investable asset", body: "What emerges from Spotlight is not a talented individual - it is the beginning of a brand with validation, visibility, investment history, and a community behind it. That is the asset we are creating for the broader investment ecosystem." }
            ].map((stage, idx) => (
              <div key={idx} className="grid md:grid-cols-12 gap-8 p-8 border border-white/20 rounded-sm hover:border-[#bb9457]/50 transition-colors duration-300 bg-black/20">
                <div className="md:col-span-3">
                  <div className="font-mono text-3xl text-[#bb9457] mb-2">Stage {idx + 1}</div>
                  <h3 className="font-serif text-xl text-white font-normal">{stage.title}</h3>
                </div>
                <div className="md:col-span-9">
                  <p className="text-sm text-white/70 font-light leading-relaxed">{stage.body}</p>
                </div>
              </div>
            ))}
          </div>

          <div className="text-center">
            <div className="inline-block p-12 border border-white/30 rounded-sm bg-black/30 backdrop-blur-sm max-w-3xl">
              <p className="text-white font-medium mb-4">Adorzia is actively building a co-investment framework for Spotlight winners - allowing external investors to participate in the brands we back through structured, transparent arrangements. If this interests you, we want to speak with you before our first event.</p>
              <a href="#deck" className="inline-block px-8 py-4 bg-[#bb9457] text-black font-semibold uppercase tracking-[0.2em] text-[11px] rounded-sm hover:bg-white hover:text-black transition-all duration-300">
                Enquire about Spotlight co-investment
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Early Stage Deck and Partnership Enquiry */}
      <section id="deck" className="py-40 relative overflow-hidden bg-black">
        <div className="absolute inset-0 opacity-15">
          <img src={heroHome} alt="" className="w-full h-full object-cover grayscale contrast-125 animate-ambient-swell" />
        </div>
        <div className="absolute inset-0 bg-gradient-to-b from-black via-black/90 to-neutral-950" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(187,148,87,0.1),transparent_60%)]" />
        
        <div className="max-w-7xl mx-auto px-6 lg:px-8 relative z-10">
          <div className="grid lg:grid-cols-2 gap-16 items-start">
            <div className="space-y-6">
              <span className="text-[10px] uppercase tracking-[0.3em] text-[#bb9457] font-mono font-semibold">Let us show you what we are building</span>
              <h2 className="font-serif text-3xl md:text-5xl text-white font-normal tracking-tight">
                We do not believe in pitching cold. We believe in the right conversations with the right people.
              </h2>
              <p className="text-neutral-400 font-light text-base leading-relaxed">
                Adorzia is at the stage where the partners we bring in now will shape not just the capital structure of what we are building - but the culture, the direction, and the long-term identity of the ecosystem.
              </p>
              <p className="text-neutral-400 font-light text-base leading-relaxed">
                We are not looking for passive capital. We are looking for investors, institutional partners, and strategic allies who understand the Pakistani creative economy, believe in what fashion entrepreneurship can become here, and want to be genuinely involved in building it.
              </p>
              <p className="text-neutral-300 font-medium text-base leading-relaxed">
                If that is you, we would like to send you our current deck - and then have a real conversation.
              </p>

              <div className="p-8 border border-neutral-900 rounded-sm bg-neutral-950 mt-8">
                <h3 className="font-serif text-xl text-white font-normal mb-4">What we share:</h3>
                <ul className="space-y-2 text-sm text-neutral-400 font-light">
                  <li>- Full business model and revenue projections</li>
                  <li>- Studio launch timeline and city-by-city rollout plan</li>
                  <li>- Marketplace development roadmap</li>
                  <li>- Spotlight Fall 2026 event structure and sponsorship framework</li>
                  <li>- Co-investment framework for Spotlight-backed brands</li>
                  <li>- Team backgrounds and founding story</li>
                </ul>
              </div>
            </div>

            <div id="contact" className="p-12 border border-neutral-900 rounded-sm bg-neutral-950">
              {submitted ? (
                <div className="text-center py-16">
                  <div className="text-6xl mb-4">✓</div>
                  <h3 className="text-2xl font-serif text-white font-normal mb-3">Inquiry submitted successfully!</h3>
                  <p className="text-neutral-400 mb-6">We'll respond within 3 business days.</p>
                  <button
                    onClick={() => setSubmitted(false)}
                    className="text-[#bb9457] hover:text-white font-semibold transition-colors"
                  >
                    Submit another inquiry
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div>
                    <label className="text-[10px] uppercase tracking-[0.3em] text-neutral-400 font-semibold block mb-3">
                      Full name *
                    </label>
                    <input
                      type="text"
                      required
                      value={form.contact_name}
                      onChange={(e) => setForm({ ...form, contact_name: e.target.value })}
                      className="w-full border-b border-neutral-900 bg-transparent py-3 outline-none focus:border-[#bb9457] transition-colors text-white"
                      placeholder="Your name"
                    />
                  </div>

                  <div>
                    <label className="text-[10px] uppercase tracking-[0.3em] text-neutral-400 font-semibold block mb-3">
                      Organization or fund name *
                    </label>
                    <input
                      type="text"
                      required
                      value={form.company_name}
                      onChange={(e) => setForm({ ...form, company_name: e.target.value })}
                      className="w-full border-b border-neutral-900 bg-transparent py-3 outline-none focus:border-[#bb9457] transition-colors text-white"
                      placeholder="Your organization"
                    />
                  </div>

                  <div>
                    <label className="text-[10px] uppercase tracking-[0.3em] text-neutral-400 font-semibold block mb-3">
                      What interests you most about Adorzia? *
                    </label>
                    <textarea
                      required
                      rows={4}
                      value={form.message}
                      onChange={(e) => setForm({ ...form, message: e.target.value })}
                      className="w-full border-b border-neutral-900 bg-transparent py-3 outline-none focus:border-[#bb9457] transition-colors resize-none text-white"
                      placeholder="Tell us what excites you..."
                    />
                  </div>

                  <div>
                    <label className="text-[10px] uppercase tracking-[0.3em] text-neutral-400 font-semibold block mb-3">
                      Email address *
                    </label>
                    <input
                      type="email"
                      required
                      value={form.email}
                      onChange={(e) => setForm({ ...form, email: e.target.value })}
                      className="w-full border-b border-neutral-900 bg-transparent py-3 outline-none focus:border-[#bb9457] transition-colors text-white"
                      placeholder="your@email.com"
                    />
                  </div>

                  <div>
                    <label className="text-[10px] uppercase tracking-[0.3em] text-neutral-400 font-semibold block mb-3">
                      Phone number
                    </label>
                    <input
                      type="tel"
                      value={form.phone}
                      onChange={(e) => setForm({ ...form, phone: e.target.value })}
                      className="w-full border-b border-neutral-900 bg-transparent py-3 outline-none focus:border-[#bb9457] transition-colors text-white"
                      placeholder="+92 xxx xxxxxxx"
                    />
                  </div>

                  {error && <div className="text-red-500 text-sm">{error}</div>}

                  <button
                    type="submit"
                    disabled={submitting}
                    className="w-full px-8 py-4 bg-[#bb9457] text-black font-semibold uppercase tracking-[0.2em] text-[11px] rounded-sm hover:bg-white hover:text-black transition-all duration-300 disabled:opacity-50"
                  >
                    {submitting ? 'Submitting…' : 'Request the deck'}
                  </button>

                  <p className="text-xs text-neutral-500 font-light leading-relaxed">
                    We treat every enquiry with discretion. Your details will only be used to respond to your request and will never be shared without your permission.
                  </p>
                </form>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Contact for Investment */}
      <section className="py-40 relative overflow-hidden bg-neutral-950 border-t border-neutral-900">
        <div className="absolute inset-0 opacity-10">
          <img src={craft} alt="" className="w-full h-full object-cover grayscale animate-ambient-swell" />
        </div>
        <div className="absolute inset-0 bg-gradient-to-b from-neutral-950 via-neutral-950/95 to-black" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_bottom,rgba(187,148,87,0.08),transparent_60%)]" />
        
        <div className="max-w-5xl mx-auto px-6 lg:px-8 relative z-10">
          <div className="text-center max-w-3xl mx-auto mb-20">
            <span className="text-[10px] uppercase tracking-[0.3em] text-[#bb9457] font-mono font-semibold">Start the conversation</span>
            <h2 className="mt-4 font-serif text-4xl md:text-6xl text-white font-normal tracking-tight">
              The right partner finds us early. That moment is now.
            </h2>
            <p className="mt-8 text-neutral-400 font-light text-base md:text-lg leading-relaxed">
              Adorzia is building something that Pakistan's creative economy has needed for a generation. We are doing it carefully, ambitiously, and with complete conviction in the opportunity.
            </p>
            <p className="mt-4 text-neutral-400 font-light text-base md:text-lg leading-relaxed">
              If you are an investor, a corporate partner, a fashion institution, or an organization that wants to be part of what Pakistani fashion is about to become - we want to hear from you.
            </p>
            <p className="mt-4 text-neutral-300 font-medium text-base leading-relaxed">
              We respond to every serious enquiry personally. No automated responses. No holding pattern. A real conversation with the people building this.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-12 mb-16">
            <div className="p-12 border border-neutral-900 rounded-sm bg-black text-center">
              <div className="font-mono text-xs uppercase tracking-[0.3em] text-[#bb9457] mb-4">Email</div>
              <div className="font-serif text-2xl text-white font-normal mb-2">investors@adorzia.com</div>
              <div className="text-sm text-neutral-400 font-light">Direct line to founding team</div>
            </div>
            <div className="p-12 border border-neutral-900 rounded-sm bg-black text-center">
              <div className="font-mono text-xs uppercase tracking-[0.3em] text-[#bb9457] mb-4">Response Time</div>
              <div className="font-serif text-2xl text-white font-normal mb-2">Within 3 working days</div>
              <div className="text-sm text-neutral-400 font-light">Personal response, always</div>
            </div>
          </div>

          <div className="flex flex-wrap justify-center gap-5 mb-16">
            <a
              href="#deck"
              className="px-8 py-4 bg-[#bb9457] text-black font-semibold uppercase tracking-[0.2em] text-[11px] rounded-sm hover:bg-white hover:text-black transition-all duration-300"
            >
              Request our investor deck
            </a>
            <a
              href="mailto:investors@adorzia.com"
              className="px-8 py-4 border border-white/20 text-white font-semibold uppercase tracking-[0.2em] text-[11px] rounded-sm hover:border-[#bb9457] hover:text-[#bb9457] transition-all duration-300"
            >
              Schedule a conversation
            </a>
          </div>

          <div className="text-center">
            <p className="text-neutral-300 font-light text-base md:text-lg max-w-2xl mx-auto leading-relaxed">
              Adorzia is one year old and already building across three cities. Imagine where we are in five.
            </p>
          </div>
        </div>
      </section>
    </div>
  )
}

export default ForPartners
