import { useState } from 'react'
import { supabase } from '../lib/supabase'
import { sendEmailNotification } from '../lib/email'
import SEO from '../components/SEO'
import Breadcrumb from '../components/Breadcrumb'
import heroHome from '../assets/hero-banner-coworking-studio 1 .webp'
import studio from '../assets/hero-banner-coworking-studio-2.webp'
import spotlight from '../assets/fashion-icon.webp'
import craft from '../assets/craft.webp'
import coworking from '../assets/coworking-studio-image .webp'

const ForPartners = () => {
  const [form, setForm] = useState({
    contact_name: '',
    company_name: '',
    email: '',
    phone: '',
    partnership_type: '',
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
        .insert([{
          contact_name: form.contact_name,
          company_name: form.company_name,
          email: form.email,
          phone: form.phone,
          message: `Partnership Type: ${form.partnership_type}\n\n${form.message}`
        }])

      if (supabaseError) throw supabaseError

      await sendEmailNotification('partnership', {
        name: form.contact_name,
        email: form.email,
        company: form.company_name,
        partnership_type: form.partnership_type,
        message: form.message
      })

      setSubmitted(true)
      setForm({ contact_name: '', company_name: '', email: '', phone: '', partnership_type: '', message: '' })
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
        title="Partnerships - Collaborate with Adorzia to Shape Pakistan's Fashion Future"
        description="Partner with Adorzia — Pakistan's fashion entrepreneurship ecosystem. Opportunities for manufacturers, artisans, suppliers, institutions, investors, brands, and media to collaborate and build the future of fashion together."
        canonicalURL="https://adorzia.com/for-partners"
        ogTitle="Partnerships - Build the Future of Pakistani Fashion Together"
        ogDescription="Manufacturers, artisans, institutions, investors, brands, and media — Adorzia is the ecosystem where fashion partnerships create lasting value."
        ogImageAlt="Adorzia partnerships - collaborative fashion ecosystem"
        schemaType="WebPage"
        keywords="fashion partnerships Pakistan, fashion manufacturing collaboration, fashion institution partnerships, fashion investment Pakistan, brand partnerships, fashion supplier collaboration, Adorzia partners, Pakistani fashion ecosystem, fashion industry collaboration, fashion media partnerships, Adorzia"
      />
      <Breadcrumb currentPage="Partnerships" />

      <style>{`
        @keyframes fadeInUp {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-fade-in-up { animation: fadeInUp 1s cubic-bezier(0.16, 1, 0.3, 1) forwards; }
      `}</style>

      {/* ====== SECTION 1: HERO ====== */}
      <section className="relative min-h-[70vh] sm:min-h-[80vh] md:min-h-screen flex items-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img src={heroHome} alt="Partnerships" className="w-full h-full object-cover object-center scale-105" style={{ objectPosition: 'center 35%' }} loading="lazy" decoding="async" />
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
              Partnerships
            </span>

            <h1 className="mt-6 font-serif text-4xl md:text-6xl lg:text-7xl leading-[1.05] text-white tracking-tight font-normal">
              Build the future of fashion<br />
              <span className="text-[#bb9457] italic font-light">together.</span>
            </h1>

            <div className="mt-8 space-y-6 text-neutral-300 font-light text-base md:text-lg leading-relaxed">
              <p>
                Adorzia is Pakistan's first complete fashion entrepreneurship ecosystem — and ecosystems are built through partnership. Whether you manufacture, supply, teach, invest, design, or tell the story of fashion — there is a place for you here.
              </p>
              <p>
                We are looking for manufacturers, artisans, institutions, investors, brands, and industry professionals who believe in what Pakistani fashion can become and want to be part of building it.
              </p>
            </div>

            <div className="mt-12 flex flex-wrap gap-5">
              <a
                href="#who-we-partner-with"
                className="px-8 py-4 bg-[#bb9457] text-black font-semibold uppercase tracking-[0.2em] text-[11px] rounded-sm hover:bg-white hover:text-black transition-all duration-300"
              >
                Explore Partnerships
              </a>
              <a
                href="#become-a-partner"
                className="px-8 py-4 border border-white/20 text-white font-semibold uppercase tracking-[0.2em] text-[11px] rounded-sm hover:border-[#bb9457] hover:text-[#bb9457] transition-all duration-300"
              >
                Become a Partner
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* ====== SECTION 2: WHO WE PARTNER WITH ====== */}
      <section id="who-we-partner-with" className="relative py-32 md:py-40 border-b border-neutral-900">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,rgba(187,148,87,0.08),transparent_50%)] pointer-events-none" />

        <div className="max-w-7xl mx-auto px-6 lg:px-8 relative z-10">
          <div className="max-w-3xl mb-16">
            <span className="text-[10px] uppercase tracking-[0.3em] text-[#bb9457] font-mono font-semibold">Who We Partner With</span>
            <h2 className="mt-4 font-serif text-3xl md:text-5xl text-white font-normal tracking-tight">
              Every part of the fashion ecosystem has a role.
            </h2>
            <p className="mt-4 text-neutral-400 font-light text-base md:text-lg leading-relaxed">
              Adorzia brings together the full spectrum of fashion industry professionals — each contributing something essential to the ecosystem we are building.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { title: "Manufacturers", body: "Production facilities and factories collaborating with emerging designers on product development and manufacturing." },
              { title: "Artisans & Craftspeople", body: "Master makers carrying Pakistan's heritage craft traditions — from hand embroidery to weaving, block printing to mirror work." },
              { title: "Suppliers", body: "Fabric mills, trim providers, material sources, and logistics partners supporting the fashion supply chain." },
              { title: "Fashion Institutions", body: "Universities, fashion schools, and educational bodies shaping the next generation of Pakistani fashion talent." },
              { title: "Investors", body: "Individuals, funds, and institutions providing capital to build Pakistani fashion brands into scalable businesses." },
              { title: "Brands", body: "Established fashion labels and retail businesses seeking collaboration, sourcing, or commercial partnerships." },
              { title: "Media", body: "Publications, content creators, and platforms telling the story of Pakistani fashion to the world." },
              { title: "Industry Professionals", body: "Consultants, mentors, buyers, and operators with the expertise to help fashion entrepreneurs grow." }
            ].map((item, idx) => (
              <div key={idx} className="group p-6 bg-neutral-950/60 backdrop-blur-md border border-neutral-800 rounded-sm hover:border-[#bb9457]/40 transition-all duration-500">
                <h3 className="font-serif text-lg text-white font-normal mb-2 group-hover:text-[#bb9457] transition-colors">{item.title}</h3>
                <p className="text-xs text-neutral-400 font-light leading-relaxed">{item.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ====== SECTION 3: WHY PARTNER WITH ADORZIA ====== */}
      <section className="relative py-32 md:py-40 border-b border-neutral-900 overflow-hidden">
        <div className="absolute inset-0">
          <img src={craft} alt="" aria-hidden="true" className="w-full h-full object-cover" loading="lazy" decoding="async" />
          <div className="absolute inset-0 bg-gradient-to-r from-neutral-950/95 via-neutral-950/90 to-neutral-950/95" />
        </div>
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_left,rgba(187,148,87,0.1),transparent_50%)] pointer-events-none" />

        <div className="max-w-7xl mx-auto px-6 lg:px-8 relative z-10">
          <div className="max-w-3xl mb-16">
            <span className="text-[10px] uppercase tracking-[0.3em] text-[#bb9457] font-mono font-semibold">Why Partner With Adorzia</span>
            <h2 className="mt-4 font-serif text-3xl md:text-5xl text-white font-normal tracking-tight">
              What partnership with Adorzia delivers.
            </h2>
            <p className="mt-4 text-neutral-400 font-light text-base md:text-lg leading-relaxed">
              When you partner with Adorzia, you plug into Pakistan's only complete fashion entrepreneurship ecosystem — gaining access to opportunities, people, and markets that do not exist elsewhere.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-5 gap-6">
            {[
              {
                title: "New Opportunities",
                body: "Access to emerging designers, new markets, collaboration proposals, and business opportunities that arise from a growing ecosystem.",
                icon: "M12 3v17.25m0 0c-1.472 0-2.882.265-4.185.75M12 20.25c1.472 0 2.882.265 4.185.75M18.75 4.97A48.108 48.108 0 0 0 7.5 4.97c0 10.932 4.584 18.11 11.25 18.11s11.25-7.178 11.25-18.11Z"
              },
              {
                title: "Industry Connections",
                body: "Direct relationships with designers, manufacturers, buyers, investors, and professionals across Pakistan's fashion landscape.",
                icon: "M18 18.72a9.094 9.094 0 0 0 3.741-.479 3 3 0 0 0-4.682-2.72m.94 3.198.001.031c0 .225-.012.447-.037.666A11.944 11.944 0 0 1 12 21c-2.17 0-4.207-.576-5.963-1.584A6.062 6.062 0 0 1 6 18.719m12 0a5.971 5.971 0 0 0-.941-3.197m0 0A5.995 5.995 0 0 0 12 12.75a5.995 5.995 0 0 0-5.058 2.772m0 0a3 3 0 0 0-4.681 2.72 8.986 8.986 0 0 0 3.74.477m.94-3.197a5.971 5.971 0 0 0-.94 3.197M15 6.75a3 3 0 1 1-6 0 3 3 0 0 1 6 0Zm6 3a2.25 2.25 0 1 1-4.5 0 2.25 2.25 0 0 1 4.5 0Zm-13.5 0a2.25 2.25 0 1 1-4.5 0 2.25 2.25 0 0 1 4.5 0Z"
              },
              {
                title: "Collaborative Projects",
                body: "Co-developed collections, joint ventures, research initiatives, and creative projects that emerge from ecosystem collaboration.",
                icon: "M15.59 14.37a6 6 0 0 1-5.84 7.38v-4.8m5.84-2.58a14.98 14.98 0 0 0 6.16-12.12A14.98 14.98 0 0 0 9.631 8.41m5.96 5.96a14.926 14.926 0 0 1-5.841 2.58m-.119-8.54a6 6 0 0 0-7.381 5.84h4.8m2.581-5.84a14.927 14.927 0 0 0-2.58 5.84m2.699 2.7c-.103.021-.207.041-.311.06a15.09 15.09 0 0 1-2.448-2.448 14.9 14.9 0 0 1 .06-.312m-2.24 2.39a4.493 4.493 0 0 0-1.757 4.306 4.493 4.493 0 0 0 4.306-1.758M16.5 9a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0Z"
              },
              {
                title: "Access to Talent",
                body: "First access to Pakistan's most promising emerging designers, fashion graduates, and heritage craftspeople — vetted and developed through our pipeline.",
                icon: "M15 19.128a9.38 9.38 0 0 0 2.625.372 9.337 9.337 0 0 0 4.121-.952 4.125 4.125 0 0 0-7.533-2.493M15 19.128v-.003c0-1.113-.285-2.16-.786-3.07M15 19.128v.106A12.318 12.318 0 0 1 8.624 21c-2.331 0-4.512-.645-6.374-1.766l-.001-.109a6.375 6.375 0 0 1 11.964-3.07M12 6.375a3.375 3.375 0 1 1-6.75 0 3.375 3.375 0 0 1 6.75 0Zm8.25 2.25a2.625 2.625 0 1 1-5.25 0 2.625 2.625 0 0 1 5.25 0Z"
              },
              {
                title: "Market Access",
                body: "Reach new customers, buyers, and audiences through Adorzia's marketplace, events, community, and brand platform.",
                icon: "M13.5 21v-7.5a.75.75 0 0 1 .75-.75h3a.75.75 0 0 1 .75.75V21m-4.5 0H2.36m11.14 0H18m0 0h3.64m-3.64 0v-7.5a.75.75 0 0 1 .75-.75h3a.75.75 0 0 1 .75.75V21m-18 0v-7.5a.75.75 0 0 1 .75-.75h3a.75.75 0 0 1 .75.75V21"
              }
            ].map((item, idx) => (
              <div key={idx} className="group p-6 bg-neutral-950/50 border border-neutral-800 rounded-sm hover:border-[#bb9457]/40 transition-all duration-500">
                <svg className="w-7 h-7 text-[#bb9457] mb-4 group-hover:scale-110 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d={item.icon} />
                </svg>
                <h3 className="font-serif text-lg text-white font-normal mb-2">{item.title}</h3>
                <p className="text-xs text-neutral-400 font-light leading-relaxed">{item.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ====== SECTION 4: MANUFACTURING & PRODUCTION ====== */}
      <section className="relative py-32 md:py-40 border-b border-neutral-900 overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_left,rgba(187,148,87,0.08),transparent_50%)] pointer-events-none" />

        <div className="max-w-7xl mx-auto px-6 lg:px-8 relative z-10">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div className="space-y-6">
              <span className="text-[10px] uppercase tracking-[0.3em] text-[#bb9457] font-mono font-semibold">Manufacturing & Production</span>
              <h2 className="font-serif text-3xl md:text-5xl text-white font-normal tracking-tight">
                Collaborate on product development, sampling, and production.
              </h2>
              <div className="space-y-4 text-neutral-400 font-light text-base leading-relaxed">
                <p>
                  Pakistan's manufacturing capability is world-class — yet most factories and workshops have never worked directly with the emerging designers who need them most. Adorzia bridges that gap.
                </p>
                <p>
                  As a manufacturing partner, you gain access to a curated pipeline of designers with viable collections, clear briefs, and the support infrastructure to make production collaborations successful — from sampling through to full production runs.
                </p>
              </div>

              <div className="grid sm:grid-cols-2 gap-4 mt-8">
                {[
                  "Product development collaboration",
                  "Sampling & prototyping",
                  "Small-batch production",
                  "Quality assurance partnerships",
                  "Material sourcing networks",
                  "Designer-manufacturer matching"
                ].map((item, i) => (
                  <div key={i} className="flex items-center gap-3">
                    <span className="w-1.5 h-1.5 bg-[#bb9457] rounded-full flex-shrink-0" />
                    <span className="text-sm text-neutral-300 font-light">{item}</span>
                  </div>
                ))}
              </div>

              <div className="pt-6">
                <a href="#become-a-partner" className="inline-block px-8 py-4 bg-[#bb9457] text-black font-semibold uppercase tracking-[0.2em] text-[11px] rounded-sm hover:bg-white hover:text-black transition-all duration-300">
                  Partner as a Manufacturer
                </a>
              </div>
            </div>

            <div className="aspect-[4/5] overflow-hidden rounded-sm border border-neutral-800 relative group">
              <img src={craft} alt="Manufacturing & Production" className="w-full h-full object-cover grayscale contrast-125 group-hover:grayscale-0 group-hover:scale-105 transition-all duration-700" loading="lazy" decoding="async" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
            </div>
          </div>
        </div>
      </section>

      {/* ====== SECTION 5: INDUSTRY PARTNERS ====== */}
      <section className="relative py-32 md:py-40 border-b border-neutral-900 overflow-hidden">
        <div className="absolute inset-0">
          <img src={studio} alt="" aria-hidden="true" className="w-full h-full object-cover" loading="lazy" decoding="async" />
          <div className="absolute inset-0 bg-gradient-to-l from-neutral-950/95 via-neutral-950/90 to-neutral-950/95" />
        </div>
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_right,rgba(187,148,87,0.1),transparent_50%)] pointer-events-none" />

        <div className="max-w-7xl mx-auto px-6 lg:px-8 relative z-10">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div className="order-last lg:order-first aspect-[4/5] overflow-hidden rounded-sm border border-neutral-800 relative group">
              <img src={studio} alt="Industry Partners" className="w-full h-full object-cover grayscale contrast-125 group-hover:scale-105 transition-transform duration-700" loading="lazy" decoding="async" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
            </div>

            <div className="space-y-6">
              <span className="text-[10px] uppercase tracking-[0.3em] text-[#bb9457] font-mono font-semibold">Industry Partners</span>
              <h2 className="font-serif text-3xl md:text-5xl text-white font-normal tracking-tight">
                Connect with emerging designers and fashion businesses.
              </h2>
              <div className="space-y-4 text-neutral-400 font-light text-base leading-relaxed">
                <p>
                  For brands, suppliers, and established fashion businesses — Adorzia offers direct access to Pakistan's most promising emerging design talent and a growing community of fashion entrepreneurs.
                </p>
                <p>
                  Whether you are looking for design collaborators, sourcing partners, commercial opportunities, or simply want to be connected to the pulse of Pakistan's fashion ecosystem — partnership with Adorzia opens doors.
                </p>
              </div>

              <div className="grid sm:grid-cols-2 gap-4 mt-8">
                {[
                  "Designer network access",
                  "Commercial collaborations",
                  "Sourcing & supply chain",
                  "Marketplace partnerships",
                  "Brand collaborations",
                  "Industry event access"
                ].map((item, i) => (
                  <div key={i} className="flex items-center gap-3">
                    <span className="w-1.5 h-1.5 bg-[#bb9457] rounded-full flex-shrink-0" />
                    <span className="text-sm text-neutral-300 font-light">{item}</span>
                  </div>
                ))}
              </div>

              <div className="pt-6">
                <a href="#become-a-partner" className="inline-block px-8 py-4 bg-[#bb9457] text-black font-semibold uppercase tracking-[0.2em] text-[11px] rounded-sm hover:bg-white hover:text-black transition-all duration-300">
                  Partner as an Industry Partner
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ====== SECTION 6: FASHION INSTITUTIONS ====== */}
      <section className="relative py-32 md:py-40 border-b border-neutral-900 overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_left,rgba(187,148,87,0.08),transparent_50%)] pointer-events-none" />

        <div className="max-w-7xl mx-auto px-6 lg:px-8 relative z-10">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div className="space-y-6">
              <span className="text-[10px] uppercase tracking-[0.3em] text-[#bb9457] font-mono font-semibold">Fashion Institutions</span>
              <h2 className="font-serif text-3xl md:text-5xl text-white font-normal tracking-tight">
                Student opportunities, programs, research, and collaboration.
              </h2>
              <div className="space-y-4 text-neutral-400 font-light text-base leading-relaxed">
                <p>
                  Pakistan's fashion schools and universities produce extraordinary talent every year. Adorzia partners with institutions to give students real-world pathways from education to industry — and to collaborate on the programs, competitions, and research that shape fashion education itself.
                </p>
                <p>
                  From graduate showcases to curriculum input, from student competitions to joint research initiatives — institutional partnerships are central to building the ecosystem's future.
                </p>
              </div>

              <div className="grid sm:grid-cols-2 gap-4 mt-8">
                {[
                  "Student pipeline programs",
                  "Competition collaborations",
                  "Graduate showcases",
                  "Curriculum development",
                  "Research partnerships",
                  "Faculty exchange & mentorship"
                ].map((item, i) => (
                  <div key={i} className="flex items-center gap-3">
                    <span className="w-1.5 h-1.5 bg-[#bb9457] rounded-full flex-shrink-0" />
                    <span className="text-sm text-neutral-300 font-light">{item}</span>
                  </div>
                ))}
              </div>

              <div className="pt-6">
                <a href="#become-a-partner" className="inline-block px-8 py-4 bg-[#bb9457] text-black font-semibold uppercase tracking-[0.2em] text-[11px] rounded-sm hover:bg-white hover:text-black transition-all duration-300">
                  Partner as an Institution
                </a>
              </div>
            </div>

            <div className="aspect-[4/5] overflow-hidden rounded-sm border border-neutral-800 relative group">
              <img src={coworking} alt="Fashion Institutions" className="w-full h-full object-cover grayscale contrast-125 group-hover:grayscale-0 group-hover:scale-105 transition-all duration-700" loading="lazy" decoding="async" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
            </div>
          </div>
        </div>
      </section>

      {/* ====== SECTION 7: INVESTMENT PARTNERS ====== */}
      <section className="relative py-32 md:py-40 border-b border-neutral-900 overflow-hidden">
        <div className="absolute inset-0">
          <img src={spotlight} alt="" aria-hidden="true" className="w-full h-full object-cover" loading="lazy" decoding="async" />
          <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/90 to-black/95" />
        </div>
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(187,148,87,0.12),transparent_60%)] pointer-events-none" />

        <div className="max-w-7xl mx-auto px-6 lg:px-8 relative z-10">
          <div className="max-w-3xl mb-16">
            <span className="text-[10px] uppercase tracking-[0.3em] text-[#bb9457] font-mono font-semibold">Investment Partners</span>
            <h2 className="mt-4 font-serif text-3xl md:text-5xl text-white font-normal tracking-tight">
              Participate in selected fashion brands and ventures.
            </h2>
            <p className="mt-4 text-neutral-400 font-light text-base md:text-lg leading-relaxed">
              Adorzia's ecosystem creates investable fashion businesses. Through our talent pipeline, incubation programs, and brand development support — we produce validated, supported, market-ready fashion brands for investment partners to back.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { num: "01", title: "Talent Pipeline", body: "Access designers discovered and validated through Adorzia's national talent search — vetted for both creative excellence and commercial viability." },
              { num: "02", title: "Brand Investment", body: "Participate in equity or revenue-share arrangements with fashion brands being built through our incubation and development programs." },
              { num: "03", title: "Venture Opportunities", body: "Co-invest in fashion ventures, marketplace opportunities, and ecosystem businesses that emerge from the Adorzia platform." },
              { num: "04", title: "Ongoing Returns", body: "Long-term partnership returns from a growing portfolio of Pakistani fashion brands — supported by our infrastructure from day one." }
            ].map((item, idx) => (
              <div key={idx} className="group p-6 bg-white/5 backdrop-blur-md border border-white/20 rounded-sm hover:border-[#bb9457]/60 transition-all duration-500">
                <div className="font-mono text-[#bb9457] text-xs uppercase tracking-widest mb-3">{item.num}</div>
                <h3 className="font-serif text-lg text-white font-normal mb-2 group-hover:text-[#bb9457] transition-colors">{item.title}</h3>
                <p className="text-sm text-white/70 font-light leading-relaxed">{item.body}</p>
              </div>
            ))}
          </div>

          <div className="mt-12 text-center">
            <a href="#become-a-partner" className="inline-block px-8 py-4 border border-white/20 text-white font-semibold uppercase tracking-[0.2em] text-[11px] rounded-sm hover:border-[#bb9457] hover:text-[#bb9457] transition-all duration-300">
              Enquire About Investment
            </a>
          </div>
        </div>
      </section>

      {/* ====== SECTION 8: OUR ECOSYSTEM ====== */}
      <section className="relative py-32 md:py-40 border-b border-neutral-900 overflow-hidden">
        <div className="absolute inset-0">
          <img src={heroHome} alt="" aria-hidden="true" className="w-full h-full object-cover" loading="lazy" decoding="async" />
          <div className="absolute inset-0 bg-gradient-to-b from-black/95 via-neutral-950/95 to-black/95" />
        </div>
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(187,148,87,0.08),transparent_50%)] pointer-events-none" />

        <div className="max-w-7xl mx-auto px-6 lg:px-8 relative z-10">
          <div className="max-w-3xl mb-16">
            <span className="text-[10px] uppercase tracking-[0.3em] text-[#bb9457] font-mono font-semibold">Our Ecosystem</span>
            <h2 className="mt-4 font-serif text-3xl md:text-5xl text-white font-normal tracking-tight">
              How the ecosystem connects.
            </h2>
            <p className="mt-4 text-neutral-400 font-light text-base md:text-lg leading-relaxed">
              Every partner plugs into a value chain that flows from creative talent to end customer — each stage creating value for the next.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-5 gap-6">
            {[
              { num: "01", title: "Designers", body: "Emerging and established fashion talent — the creative foundation of the ecosystem." },
              { num: "02", title: "Brands", body: "Fashion labels built and developed through incubation, mentorship, and support." },
              { num: "03", title: "Production", body: "Manufacturers, artisans, and suppliers turning designs into finished products." },
              { num: "04", title: "Market", body: "Marketplace, retail, and wholesale channels connecting products to buyers." },
              { num: "05", title: "Customers", body: "Local and international audiences purchasing Pakistani fashion." }
            ].map((step, idx) => (
              <div key={idx} className="group relative p-6 bg-neutral-950/60 backdrop-blur-md border border-neutral-800 rounded-sm hover:border-[#bb9457]/40 transition-all duration-500">
                <div className="font-mono text-2xl text-[#bb9457] mb-3">{step.num}</div>
                <h3 className="font-serif text-lg text-white font-normal mb-2">{step.title}</h3>
                <p className="text-xs text-neutral-400 font-light leading-relaxed">{step.body}</p>
                {idx < 4 && (
                  <div className="hidden lg:block absolute top-1/2 -right-3 transform -translate-y-1/2 text-neutral-700">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3" />
                    </svg>
                  </div>
                )}
              </div>
            ))}
          </div>

          <div className="mt-16 p-8 border border-neutral-800 rounded-sm bg-neutral-950/50 max-w-4xl mx-auto text-center">
            <p className="text-neutral-300 font-light text-base leading-relaxed">
              Partners can enter at any point in this chain — and benefit from the value created across all of it. A manufacturer partnering at the production stage gains access to designers, brands, and markets. An institution partnering at the designer stage connects to the entire pipeline. The ecosystem compounds.
            </p>
          </div>
        </div>
      </section>

      {/* ====== SECTION 9: PARTNERSHIP OPPORTUNITIES ====== */}
      <section className="relative py-32 md:py-40 border-b border-neutral-900">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(187,148,87,0.06),transparent_60%)] pointer-events-none" />

        <div className="max-w-7xl mx-auto px-6 lg:px-8 relative z-10">
          <div className="max-w-3xl mb-16">
            <span className="text-[10px] uppercase tracking-[0.3em] text-[#bb9457] font-mono font-semibold">Partnership Opportunities</span>
            <h2 className="mt-4 font-serif text-3xl md:text-5xl text-white font-normal tracking-tight">
              Explore different ways to collaborate.
            </h2>
            <p className="mt-4 text-neutral-400 font-light text-base md:text-lg leading-relaxed">
              Adorzia offers multiple partnership models — each designed to create mutual value. Find the one that fits your goals.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              {
                title: "Sponsorship & Brand Partnerships",
                body: "Sponsor Adorzia events, programs, and initiatives. Associate your brand with Pakistan's fashion entrepreneurship movement.",
                link: "/contact"
              },
              {
                title: "Production & Manufacturing",
                body: "Collaborate with emerging designers on product development, sampling, and production runs. Grow your manufacturing pipeline.",
                link: "/contact"
              },
              {
                title: "Educational & Institutional",
                body: "Partner on student programs, competitions, curriculum development, graduate showcases, and research initiatives.",
                link: "/contact"
              },
              {
                title: "Investment & Co-Investment",
                body: "Access vetted fashion brands and ventures for equity investment, revenue-share, or co-investment opportunities.",
                link: "/contact"
              },
              {
                title: "Marketplace & Commercial",
                body: "List products, source from designers, or establish commercial partnerships through Adorzia's curated marketplace.",
                link: "/contact"
              },
              {
                title: "Media & Content",
                body: "Tell the story of Pakistani fashion. Collaborate on content, coverage, and media partnerships that amplify the ecosystem.",
                link: "/contact"
              }
            ].map((item, idx) => (
              <div key={idx} className="group p-8 bg-neutral-950/60 backdrop-blur-md border border-neutral-800 rounded-sm hover:border-[#bb9457]/40 transition-all duration-500">
                <h3 className="font-serif text-xl text-white font-normal mb-3 group-hover:text-[#bb9457] transition-colors">{item.title}</h3>
                <p className="text-sm text-neutral-400 font-light leading-relaxed mb-6">{item.body}</p>
                <a href={item.link} className="inline-flex items-center gap-2 text-[#bb9457] text-xs uppercase tracking-[0.15em] font-semibold group-hover:gap-3 transition-all duration-300">
                  Enquire
                  <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </svg>
                </a>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ====== SECTION 10: BECOME A PARTNER ====== */}
      <section id="become-a-partner" className="relative py-40 md:py-48 overflow-hidden">
        <div className="absolute inset-0">
          <img src={heroHome} alt="" aria-hidden="true" className="w-full h-full object-cover" loading="lazy" decoding="async" />
          <div className="absolute inset-0 bg-gradient-to-b from-black via-black/90 to-neutral-950" />
        </div>
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(187,148,87,0.15),transparent_60%)]" />

        <div className="max-w-5xl mx-auto px-6 lg:px-8 relative z-10">
          <div className="text-center mb-16">
            <span className="text-[10px] uppercase tracking-[0.3em] text-[#bb9457] font-mono font-semibold">Become a Partner</span>
            <h2 className="mt-4 font-serif text-4xl md:text-6xl text-white font-normal tracking-tight">
              Start the conversation.
            </h2>
            <p className="mt-6 text-neutral-400 font-light text-base md:text-lg max-w-2xl mx-auto leading-relaxed">
              Tell us about your organization and how you would like to collaborate with Adorzia. We respond to every serious enquiry personally — with a real conversation about what partnership could look like.
            </p>
          </div>

          {submitted ? (
            <div className="max-w-lg mx-auto p-12 border border-[#bb9457]/30 rounded-sm bg-neutral-900/50 text-center">
              <div className="w-16 h-16 mx-auto mb-6 rounded-full bg-[#bb9457]/20 flex items-center justify-center">
                <svg className="w-8 h-8 text-[#bb9457]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <p className="text-white font-light text-lg mb-4">
                Your partnership inquiry has been submitted. We will respond within 3 business days.
              </p>
              <button
                onClick={() => setSubmitted(false)}
                className="mt-6 px-6 py-3 border border-[#bb9457]/40 text-[#bb9457] text-[10px] uppercase tracking-[0.2em] rounded-sm hover:bg-[#bb9457] hover:text-black transition-all duration-300"
              >
                Submit another inquiry
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="max-w-2xl mx-auto space-y-6 p-10 border border-neutral-800 rounded-sm bg-neutral-900/30 backdrop-blur-sm">
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label className="text-[10px] uppercase tracking-[0.2em] text-neutral-400 font-semibold block mb-2">Full name *</label>
                  <input
                    type="text"
                    required
                    value={form.contact_name}
                    onChange={(e) => setForm({ ...form, contact_name: e.target.value })}
                    className="w-full border-b border-neutral-800 bg-transparent py-3 text-white outline-none focus:border-[#bb9457] transition-colors placeholder:text-neutral-600"
                    placeholder="Your full name"
                  />
                </div>
                <div>
                  <label className="text-[10px] uppercase tracking-[0.2em] text-neutral-400 font-semibold block mb-2">Organization *</label>
                  <input
                    type="text"
                    required
                    value={form.company_name}
                    onChange={(e) => setForm({ ...form, company_name: e.target.value })}
                    className="w-full border-b border-neutral-800 bg-transparent py-3 text-white outline-none focus:border-[#bb9457] transition-colors placeholder:text-neutral-600"
                    placeholder="Your organization"
                  />
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label className="text-[10px] uppercase tracking-[0.2em] text-neutral-400 font-semibold block mb-2">Email address *</label>
                  <input
                    type="email"
                    required
                    value={form.email}
                    onChange={(e) => setForm({ ...form, email: e.target.value })}
                    className="w-full border-b border-neutral-800 bg-transparent py-3 text-white outline-none focus:border-[#bb9457] transition-colors placeholder:text-neutral-600"
                    placeholder="your@email.com"
                  />
                </div>
                <div>
                  <label className="text-[10px] uppercase tracking-[0.2em] text-neutral-400 font-semibold block mb-2">Phone number</label>
                  <input
                    type="tel"
                    value={form.phone}
                    onChange={(e) => setForm({ ...form, phone: e.target.value })}
                    className="w-full border-b border-neutral-800 bg-transparent py-3 text-white outline-none focus:border-[#bb9457] transition-colors placeholder:text-neutral-600"
                    placeholder="+92 XXX XXXXXXX"
                  />
                </div>
              </div>

              <div>
                <label className="text-[10px] uppercase tracking-[0.2em] text-neutral-400 font-semibold block mb-2">Partnership type *</label>
                <select
                  required
                  value={form.partnership_type}
                  onChange={(e) => setForm({ ...form, partnership_type: e.target.value })}
                  className="w-full border-b border-neutral-800 bg-transparent py-3 text-white outline-none focus:border-[#bb9457] transition-colors"
                >
                  <option value="" className="bg-neutral-950">Select partnership type</option>
                  <option value="Manufacturing" className="bg-neutral-950">Manufacturing & Production</option>
                  <option value="Institutional" className="bg-neutral-950">Educational & Institutional</option>
                  <option value="Investment" className="bg-neutral-950">Investment & Co-Investment</option>
                  <option value="Brand" className="bg-neutral-950">Brand & Commercial</option>
                  <option value="Media" className="bg-neutral-950">Media & Content</option>
                  <option value="Other" className="bg-neutral-950">Other</option>
                </select>
              </div>

              <div>
                <label className="text-[10px] uppercase tracking-[0.2em] text-neutral-400 font-semibold block mb-2">Tell us about your partnership interest *</label>
                <textarea
                  required
                  rows={4}
                  value={form.message}
                  onChange={(e) => setForm({ ...form, message: e.target.value })}
                  className="w-full border-b border-neutral-800 bg-transparent py-3 text-white outline-none focus:border-[#bb9457] transition-colors resize-none placeholder:text-neutral-600"
                  placeholder="What does your organization do, and how would you like to collaborate with Adorzia?"
                />
              </div>

              {error && <div className="text-red-500 text-sm">{error}</div>}

              <button
                type="submit"
                disabled={submitting}
                className="w-full px-8 py-4 bg-[#bb9457] text-black font-semibold uppercase tracking-[0.2em] text-[11px] rounded-sm hover:bg-white hover:text-black transition-all duration-300 disabled:opacity-50 flex items-center justify-center gap-3 group"
              >
                {submitting ? (
                  <>
                    <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                    </svg>
                    Submitting...
                  </>
                ) : (
                  <>
                    Submit Partnership Inquiry
                    <svg className="w-4 h-4 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                    </svg>
                  </>
                )}
              </button>

              <p className="text-xs text-neutral-500 font-light leading-relaxed text-center">
                We treat every enquiry with care. Your details will only be used to respond to your inquiry and will never be shared without your permission.
              </p>
            </form>
          )}

          <div className="mt-12 text-center">
            <p className="text-neutral-400 font-light text-sm">
              Prefer email? Reach us at <a href="mailto:hello@adorzia.com" className="text-[#bb9457] hover:underline">hello@adorzia.com</a>
            </p>
          </div>
        </div>
      </section>
    </div>
  )
}

export default ForPartners
