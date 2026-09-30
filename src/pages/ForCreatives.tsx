import { useState } from 'react'
import { Link } from 'react-router-dom'
import SEO from '../components/SEO'
import Breadcrumb from '../components/Breadcrumb'
import heroHome from '../assets/hero-banner-coworking-studio 1 .webp'
import studio from '../assets/hero-banner-coworking-studio-2.webp'
import spotlight from '../assets/fashion-icon.webp'
import craft from '../assets/craft.webp'
import coworking from '../assets/coworking-studio-image .webp'

const ForCreatives = () => {
  const [formSubmitted, setFormSubmitted] = useState(false)
  const [formSubmitting, setFormSubmitting] = useState(false)
  const [regForm, setRegForm] = useState({
    name: '',
    email: '',
    phone: '',
    discipline: '',
    interest: ''
  })

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault()
    setFormSubmitting(true)

    try {
      const { supabase } = await import('../lib/supabase')

      const { error } = await supabase
        .from('studio_waitlist')
        .insert([{
          name: regForm.name,
          email: regForm.email,
          phone: regForm.phone,
          discipline: regForm.discipline,
          why_studio: regForm.interest,
          current_city: '',
          preferred_city: '',
          years_experience: '',
          membership_type: '',
          intended_start_date: null,
          current_workspace: '',
          portfolio_url: null,
          instagram_handle: null
        }])

      if (error) throw error

      const { sendEmailNotification } = await import('../lib/email')
      await sendEmailNotification('studio-waitlist', {
        name: regForm.name,
        email: regForm.email,
        phone: regForm.phone,
        discipline: regForm.discipline,
        preferred_city: ''
      })

      setFormSubmitted(true)
      setRegForm({ name: '', email: '', phone: '', discipline: '', interest: '' })
    } catch (err: any) {
      if (err?.code === '23505') {
        alert('This email is already registered. We will be in touch!')
      } else {
        alert('Failed to register. Please try again.')
      }
    } finally {
      setFormSubmitting(false)
    }
  }

  return (
    <div className="min-h-screen bg-black text-white">
      <SEO
        title="Fashionpreneurship in Pakistan - Build Your Fashion Brand with Adorzia"
        description="Adorzia is Pakistan's fashion entrepreneurship ecosystem. Discover opportunities to build your brand, connect with industry professionals, access production resources, and grow your fashion career."
        canonicalURL="https://adorzia.com/fashionpreneurship"
        ogTitle="Fashionpreneurship - Pakistan's Fashion Entrepreneurship Ecosystem"
        ogDescription="Build your brand. Connect with the industry. Access resources. Grow your fashion career with Adorzia."
        ogImageAlt="Fashion entrepreneurship in Pakistan - Adorzia"
        schemaType="Service"
        schema={{
          "@context": "https://schema.org",
          "@type": "Service",
          "serviceType": "Fashion Entrepreneurship Ecosystem",
          "description": "Adorzia provides resources, incubation, community, and market opportunities for fashion entrepreneurs in Pakistan",
          "provider": {
            "@type": "Organization",
            "name": "Adorzia"
          },
          "areaServed": "Pakistan"
        }}
        keywords="fashion entrepreneurship Pakistan, build fashion brand, fashion incubator Pakistan, emerging designers Pakistan, fashion community, designer directory Pakistan, fashion opportunities, Adorzia fashion ecosystem, fashion career Pakistan, fashion mentorship Pakistan, Adorzia"
      />
      <script type="application/ld+json">{JSON.stringify({
        "@context": "https://schema.org",
        "@type": "FAQPage",
        "mainEntity": [
          { "@type": "Question", "name": "Who can join Adorzia?", "acceptedAnswer": { "@type": "Answer", "text": "Adorzia is open to final-year fashion students, recent graduates, emerging designers, early-career designers, designers working for fashion brands, and experienced designers who want to create their own brand." } },
          { "@type": "Question", "name": "What is fashionpreneurship?", "acceptedAnswer": { "@type": "Answer", "text": "Fashionpreneurship is the intersection of fashion and entrepreneurship. It is the pathway from designer to entrepreneur to brand to market — combining creative talent with business acumen to build sustainable fashion brands." } },
          { "@type": "Question", "name": "How does the Adorzia marketplace work?", "acceptedAnswer": { "@type": "Answer", "text": "The Adorzia Marketplace is a curated online destination focused on emerging fashion brands. It features independent emerging brands and Adorzia-incubated brands. Products are primarily made-to-order and limited-edition, not fast fashion." } },
          { "@type": "Question", "name": "What is the Adorzia incubation model?", "acceptedAnswer": { "@type": "Answer", "text": "Adorzia selects designers and brands to invest in, then provides capital, product development, production support, branding, positioning, and market access. Revenue is shared between Adorzia and the brand according to pre-agreed terms." } }
        ]
      })}</script>
      <Breadcrumb currentPage="Fashionpreneurship" />

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
          <img src={heroHome} alt="Fashion Entrepreneurship" className="w-full h-full object-cover object-center scale-105" style={{ objectPosition: 'center 35%' }} loading="lazy" decoding="async" />
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
              Fashionpreneurship
            </span>

            <h1 className="mt-6 font-serif text-4xl md:text-6xl lg:text-7xl leading-[1.05] text-white tracking-tight font-normal">
              Empowering the next generation<br />
              of <span className="text-[#bb9457] italic font-light">fashion entrepreneurs.</span>
            </h1>

            <div className="mt-8 space-y-6 text-neutral-300 font-light text-base md:text-lg leading-relaxed">
              <p>
                Adorzia is Pakistan's first complete fashion entrepreneurship ecosystem. We provide the resources, connections, and opportunities that turn creative talent into thriving fashion brands.
              </p>
              <p>
                Whether you are a student with your first sketch, a graduate ready to launch, an emerging designer building your label, or an experienced creative scaling your vision — this is where your fashion career finds its foundation.
              </p>
            </div>

            <div className="mt-12 flex flex-wrap gap-5">
              <a
                href="#who-we-welcome"
                className="px-8 py-4 bg-[#bb9457] text-black font-semibold uppercase tracking-[0.2em] text-[11px] rounded-sm hover:bg-white hover:text-black transition-all duration-300"
              >
                Discover Your Path
              </a>
              <a
                href="#join-adorzia"
                className="px-8 py-4 border border-white/20 text-white font-semibold uppercase tracking-[0.2em] text-[11px] rounded-sm hover:border-[#bb9457] hover:text-[#bb9457] transition-all duration-300"
              >
                Join Adorzia
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* ====== SECTION 2: WHO WE WELCOME ====== */}
      <section id="who-we-welcome" className="relative py-32 md:py-40 border-b border-neutral-900">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,rgba(187,148,87,0.08),transparent_50%)] pointer-events-none" />

        <div className="max-w-7xl mx-auto px-6 lg:px-8 relative z-10">
          <div className="max-w-3xl mb-16">
            <span className="text-[10px] uppercase tracking-[0.3em] text-[#bb9457] font-mono font-semibold">Who We Welcome</span>
            <h2 className="mt-4 font-serif text-3xl md:text-5xl text-white font-normal tracking-tight">
              Every stage of the journey has a place here.
            </h2>
            <p className="mt-4 text-neutral-400 font-light text-base md:text-lg leading-relaxed">
              Adorzia is designed for fashion entrepreneurs at every level — from first-year students to established creatives ready to scale.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              {
                title: "Fashion Students",
                body: "Still learning, already building. Access resources, community, and early exposure to the industry while you develop your craft in the classroom and beyond.",
                icon: "M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"
              },
              {
                title: "Recent Graduates",
                body: "You have the degree and the portfolio. Now turn your academic work into a viable brand. We help you bridge the gap between education and industry.",
                icon: "M4.26 10.147a60.438 60.438 0 0 0-.491 6.347A48.62 48.62 0 0 1 12 20.904a48.62 48.62 0 0 1 8.232-4.41 60.46 60.46 0 0 0-.491-6.347m-15.482 0a50.636 50.636 0 0 0-2.658-.813A59.906 59.906 0 0 1 12 3.493a59.903 59.903 0 0 1 10.399 5.84c-.896.248-1.783.52-2.658.814m-15.482 0A50.717 50.717 0 0 1 12 13.489a50.702 50.702 0 0 1 7.74-3.342"
              },
              {
                title: "Emerging Designers",
                body: "You have started your label and need the next level — production access, market connections, brand strategy, and visibility. Adorzia is built for this stage.",
                icon: "M9.813 15.904 9 18.75l-.813-2.846a4.5 4.5 0 0 0-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 0 0 3.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 0 0 3.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 0 0-3.09 3.09ZM18.259 8.715 18 9.75l-.259-1.035a3.375 3.375 0 0 0-2.455-2.456L14.25 6l1.036-.259a3.375 3.375 0 0 0 2.455-2.456L18 2.25l.259 1.035a3.375 3.375 0 0 0 2.456 2.456L21.75 6l-1.035.259a3.375 3.375 0 0 0-2.456 2.456Z"
              },
              {
                title: "Experienced Creatives",
                body: "You have the track record. Adorzia offers the infrastructure, investment connections, and market access to scale your established practice to new heights.",
                icon: "M2.25 18 9 11.25l4.306 4.306a11.95 11.95 0 0 1 5.814-5.518l2.74-1.22m0 0-5.94-2.281m5.94 2.28-2.28 5.941"
              }
            ].map((item, idx) => (
              <div key={idx} className="group p-8 bg-neutral-950/60 backdrop-blur-md border border-neutral-800 rounded-sm hover:border-[#bb9457]/40 transition-all duration-500">
                <svg className="w-8 h-8 text-[#bb9457] mb-5 group-hover:scale-110 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d={item.icon} />
                </svg>
                <h3 className="font-serif text-xl text-white font-normal mb-3">{item.title}</h3>
                <p className="text-sm text-neutral-400 font-light leading-relaxed">{item.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ====== SECTION 3: THE OPPORTUNITY ====== */}
      <section className="relative py-32 md:py-40 border-b border-neutral-900 overflow-hidden">
        <div className="absolute inset-0">
          <img src={craft} alt="" aria-hidden="true" className="w-full h-full object-cover" loading="lazy" decoding="async" />
          <div className="absolute inset-0 bg-gradient-to-r from-neutral-950/95 via-neutral-950/90 to-neutral-950/95" />
        </div>
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_left,rgba(187,148,87,0.1),transparent_50%)] pointer-events-none" />

        <div className="max-w-7xl mx-auto px-6 lg:px-8 relative z-10">
          <div className="max-w-3xl mb-16">
            <span className="text-[10px] uppercase tracking-[0.3em] text-[#bb9457] font-mono font-semibold">The Opportunity</span>
            <h2 className="mt-4 font-serif text-3xl md:text-5xl text-white font-normal tracking-tight">
              Three paths. One ecosystem.
            </h2>
            <p className="mt-4 text-neutral-400 font-light text-base md:text-lg leading-relaxed">
              Fashion entrepreneurship is not one-size-fits-all. Adorzia offers multiple pathways depending on where you are and where you want to go.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                num: "01",
                title: "Build Your Own Brand",
                body: "Launch and grow your own fashion label. From creative concept to production, branding to market — we provide the infrastructure and guidance to turn your vision into a viable business.",
                features: ["Brand strategy & positioning", "Production access", "Marketplace listing", "Investment eligibility"]
              },
              {
                num: "02",
                title: "Collaborate & Work With Others",
                body: "Join a community of designers, makers, and creatives. Collaborate on projects, share resources, learn from peers, and create opportunities together in a supportive environment.",
                features: ["Designer community access", "Studio cowork spaces", "Cross-discipline projects", "Peer learning networks"]
              },
              {
                num: "03",
                title: "Develop Your Career",
                body: "Advance your professional trajectory. Whether you are seeking industry roles, mentorship, or skill development — Adorzia connects you with the people and platforms that move you forward.",
                features: ["Industry mentorship", "Skill development", "Portfolio building", "Career placement support"]
              }
            ].map((path, idx) => (
              <div key={idx} className="group relative bg-neutral-950/70 backdrop-blur-md border border-neutral-800 rounded-sm p-8 hover:border-[#bb9457]/40 transition-all duration-500">
                <div className="font-mono text-[#bb9457] text-xs uppercase tracking-widest mb-4">{path.num}</div>
                <h3 className="font-serif text-2xl text-white font-normal mb-4">{path.title}</h3>
                <p className="text-sm text-neutral-400 font-light leading-relaxed mb-6">{path.body}</p>
                <ul className="space-y-2">
                  {path.features.map((f, i) => (
                    <li key={i} className="flex items-center gap-2 text-xs text-neutral-500">
                      <span className="w-1 h-1 bg-[#bb9457] rounded-full flex-shrink-0" />
                      {f}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ====== SECTION 4: WHAT YOU GET ====== */}
      <section className="relative py-32 md:py-40 border-b border-neutral-900">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(187,148,87,0.06),transparent_60%)] pointer-events-none" />

        <div className="max-w-7xl mx-auto px-6 lg:px-8 relative z-10">
          <div className="max-w-3xl mb-16">
            <span className="text-[10px] uppercase tracking-[0.3em] text-[#bb9457] font-mono font-semibold">What You Get</span>
            <h2 className="mt-4 font-serif text-3xl md:text-5xl text-white font-normal tracking-tight">
              Everything you need to build, in one place.
            </h2>
            <p className="mt-4 text-neutral-400 font-light text-base md:text-lg leading-relaxed">
              For too long, building a fashion business in Pakistan meant solving the same problems alone. Adorzia ends that cycle.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-5 gap-6">
            {[
              {
                title: "Resources",
                body: "Studio spaces, equipment, materials, and the physical infrastructure your fashion work demands.",
                icon: "M11.42 15.17 17.25 21A2.652 2.652 0 0 0 21 17.25l-5.877-5.877M11.42 15.17l2.496-3.03c.317-.384.74-.626 1.208-.766M11.42 15.17l-4.655 5.653a2.548 2.548 0 1 1-3.586-3.586l6.837-5.63m5.108-.233c.55-.164 1.163-.188 1.743-.14a4.5 4.5 0 0 0 4.486-6.336l-3.276 3.277a3.004 3.004 0 0 1-2.25-2.25l3.276-3.276a4.5 4.5 0 0 0-6.336 4.486c.091 1.076-.071 2.264-.904 2.95l-.102.085m-1.745 1.437L5.909 7.5H4.5L2.25 3.75l1.5-1.5L7.5 4.5v1.409l4.26 4.26m-1.745 1.437 1.745-1.437m6.615 8.206L15.75 15.75M4.867 19.125h.008v.008h-.008v-.008Z"
              },
              {
                title: "Industry Connections",
                body: "Direct access to buyers, manufacturers, investors, and established professionals across the fashion ecosystem.",
                icon: "M18 18.72a9.094 9.094 0 0 0 3.741-.479 3 3 0 0 0-4.682-2.72m.94 3.198.001.031c0 .225-.012.447-.037.666A11.944 11.944 0 0 1 12 21c-2.17 0-4.207-.576-5.963-1.584A6.062 6.062 0 0 1 6 18.719m12 0a5.971 5.971 0 0 0-.941-3.197m0 0A5.995 5.995 0 0 0 12 12.75a5.995 5.995 0 0 0-5.058 2.772m0 0a3 3 0 0 0-4.681 2.72 8.986 8.986 0 0 0 3.74.477m.94-3.197a5.971 5.971 0 0 0-.94 3.197M15 6.75a3 3 0 1 1-6 0 3 3 0 0 1 6 0Zm6 3a2.25 2.25 0 1 1-4.5 0 2.25 2.25 0 0 1 4.5 0Zm-13.5 0a2.25 2.25 0 1 1-4.5 0 2.25 2.25 0 0 1 4.5 0Z"
              },
              {
                title: "Production Access",
                body: "From sampling to full production runs — connect with verified manufacturers and production facilities across Pakistan.",
                icon: "M3.75 21h16.5M4.5 3h15M5.25 3v18m13.5-18v18M9 6.75h1.5m-1.5 3h1.5m-1.5 3h1.5m3-6H15m-1.5 3H15m-1.5 3H15M9 21v-3.375c0-.621.504-1.125 1.125-1.125h3.75c.621 0 1.125.504 1.125 1.125V21"
              },
              {
                title: "Guidance & Mentorship",
                body: "One-on-one mentorship from industry leaders, business advisors, and creative professionals invested in your growth.",
                icon: "M4.26 10.147a60.438 60.438 0 0 0-.491 6.347A48.62 48.62 0 0 1 12 20.904a48.62 48.62 0 0 1 8.232-4.41 60.46 60.46 0 0 0-.491-6.347m-15.482 0a50.636 50.636 0 0 0-2.658-.813A59.906 59.906 0 0 1 12 3.493a59.903 59.903 0 0 1 10.399 5.84c-.896.248-1.783.52-2.658.814m-15.482 0A50.717 50.717 0 0 1 12 13.489a50.702 50.702 0 0 1 7.74-3.342"
              },
              {
                title: "Market Opportunities",
                body: "Curated marketplace access, buyer connections, retail placements, and the platform to reach audiences locally and globally.",
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

      {/* ====== SECTION 5: BUILD YOUR BRAND ====== */}
      <section className="relative py-32 md:py-40 border-b border-neutral-900 overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_left,rgba(187,148,87,0.08),transparent_50%)] pointer-events-none" />

        <div className="max-w-7xl mx-auto px-6 lg:px-8 relative z-10">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div className="space-y-6">
              <span className="text-[10px] uppercase tracking-[0.3em] text-[#bb9457] font-mono font-semibold">Build Your Brand</span>
              <h2 className="font-serif text-3xl md:text-5xl text-white font-normal tracking-tight">
                From creative idea to fashion brand.
              </h2>
              <div className="space-y-4 text-neutral-400 font-light text-base leading-relaxed">
                <p>
                  Having a creative vision is not the same as having a brand. Adorzia bridges that gap — helping you transform raw talent and creative ideas into a structured, marketable, investable fashion brand.
                </p>
                <p>
                  We work with you on every dimension: brand identity and positioning, collection development, production quality, pricing strategy, market entry, and the storytelling that makes buyers and investors pay attention.
                </p>
              </div>

              <div className="grid sm:grid-cols-2 gap-4 mt-8">
                {[
                  "Brand identity & strategy",
                  "Collection development",
                  "Production quality control",
                  "Market positioning",
                  "Pricing & business planning",
                  "Storytelling & visual identity"
                ].map((item, i) => (
                  <div key={i} className="flex items-center gap-3">
                    <span className="w-1.5 h-1.5 bg-[#bb9457] rounded-full flex-shrink-0" />
                    <span className="text-sm text-neutral-300 font-light">{item}</span>
                  </div>
                ))}
              </div>

              <div className="pt-6">
                <a href="#join-adorzia" className="inline-block px-8 py-4 bg-[#bb9457] text-black font-semibold uppercase tracking-[0.2em] text-[11px] rounded-sm hover:bg-white hover:text-black transition-all duration-300">
                  Start Building
                </a>
              </div>
            </div>

            <div className="aspect-[4/5] overflow-hidden rounded-sm border border-neutral-800 relative group">
              <img src={craft} alt="Build Your Brand" className="w-full h-full object-cover grayscale contrast-125 group-hover:grayscale-0 group-hover:scale-105 transition-all duration-700" loading="lazy" decoding="async" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
            </div>
          </div>
        </div>
      </section>

      {/* ====== SECTION 6: ADORZIA INCUBATION ====== */}
      <section className="relative py-32 md:py-40 border-b border-neutral-900 overflow-hidden">
        <div className="absolute inset-0">
          <img src={spotlight} alt="" aria-hidden="true" className="w-full h-full object-cover" loading="lazy" decoding="async" />
          <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/90 to-black/95" />
        </div>
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(187,148,87,0.12),transparent_60%)] pointer-events-none" />

        <div className="max-w-7xl mx-auto px-6 lg:px-8 relative z-10">
          <div className="max-w-3xl mb-16">
            <span className="text-[10px] uppercase tracking-[0.3em] text-[#bb9457] font-mono font-semibold">Adorzia Incubation</span>
            <h2 className="mt-4 font-serif text-3xl md:text-5xl text-white font-normal tracking-tight">
              Selected designers receive investment and development support.
            </h2>
            <p className="mt-4 text-neutral-400 font-light text-base md:text-lg leading-relaxed">
              Adorzia's incubation program identifies extraordinary fashion talent and provides the capital, mentorship, and infrastructure to build brands that compete on a global stage.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { num: "01", title: "National Visibility", body: "Present your work to industry leaders, investors, buyers, and press through Adorzia's annual Spotlight event and ongoing platforms." },
              { num: "02", title: "Direct Investment", body: "Selected designers receive capital to produce, scale, and launch — not a prize, a partnership. We invest in your vision for the long term." },
              { num: "03", title: "Expert Mentorship", body: "Paired with mentors from fashion, business, and creative industries who guide your brand development and strategic decisions." },
              { num: "04", title: "Long-term Support", body: "We build with you — branding, strategy, positioning, production support, and market access. Our commitment extends well beyond the selection." }
            ].map((item, idx) => (
              <div key={idx} className="group p-6 bg-white/5 backdrop-blur-md border border-white/20 rounded-sm hover:border-[#bb9457]/60 transition-all duration-500">
                <div className="font-mono text-[#bb9457] text-xs uppercase tracking-widest mb-3">{item.num}</div>
                <h3 className="font-serif text-lg text-white font-normal mb-2 group-hover:text-[#bb9457] transition-colors">{item.title}</h3>
                <p className="text-sm text-white/70 font-light leading-relaxed">{item.body}</p>
              </div>
            ))}
          </div>

          <div className="mt-12 text-center">
            <a href="/contact" className="inline-block px-8 py-4 border border-white/20 text-white font-semibold uppercase tracking-[0.2em] text-[11px] rounded-sm hover:border-[#bb9457] hover:text-[#bb9457] transition-all duration-300">
              Learn About Incubation
            </a>
          </div>
        </div>
      </section>

      {/* ====== SECTION 7: DESIGNER COMMUNITY ====== */}
      <section className="relative py-32 md:py-40 border-b border-neutral-900 overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_right,rgba(187,148,87,0.08),transparent_50%)] pointer-events-none" />

        <div className="max-w-7xl mx-auto px-6 lg:px-8 relative z-10">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div className="order-last lg:order-first aspect-[4/5] overflow-hidden rounded-sm border border-neutral-800 relative group">
              <img src={coworking} alt="Designer Community" className="w-full h-full object-cover grayscale contrast-125 group-hover:grayscale-0 group-hover:scale-105 transition-all duration-700" loading="lazy" decoding="async" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
            </div>

            <div className="space-y-6">
              <span className="text-[10px] uppercase tracking-[0.3em] text-[#bb9457] font-mono font-semibold">Designer Community</span>
              <h2 className="font-serif text-3xl md:text-5xl text-white font-normal tracking-tight">
                Connect, collaborate, learn, and create.
              </h2>
              <div className="space-y-4 text-neutral-400 font-light text-base leading-relaxed">
                <p>
                  Great fashion is not made in isolation. Adorzia's community brings together designers, makers, students, and industry professionals in a shared environment where ideas collide and opportunities emerge.
                </p>
                <p>
                  Whether you are looking for a collaborator on a collection, feedback on your designs, connections to buyers, or simply a workspace surrounded by people who understand what you are building — this is your community.
                </p>
              </div>

              <div className="grid grid-cols-2 gap-4 mt-8">
                {[
                  { title: "Connect", body: "Meet designers, mentors, and industry professionals" },
                  { title: "Collaborate", body: "Work on cross-discipline creative projects" },
                  { title: "Learn", body: "Workshops, masterclasses, and peer sessions" },
                  { title: "Create", body: "Generate new opportunities together" }
                ].map((item, i) => (
                  <div key={i} className="p-4 bg-neutral-950/50 border border-neutral-800 rounded-sm hover:border-[#bb9457]/30 transition-all duration-300">
                    <h4 className="font-serif text-base text-[#bb9457] mb-1">{item.title}</h4>
                    <p className="text-xs text-neutral-500 font-light">{item.body}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ====== SECTION 8: DESIGNER DIRECTORY ====== */}
      <section className="relative py-24 md:py-32 border-b border-neutral-900">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(187,148,87,0.06),transparent_60%)] pointer-events-none" />

        <div className="max-w-7xl mx-auto px-6 lg:px-8 relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            <span className="text-[10px] uppercase tracking-[0.3em] text-[#bb9457] font-mono font-semibold">Designer Directory</span>
            <h2 className="mt-4 font-serif text-3xl md:text-5xl text-white font-normal tracking-tight">
              Showcase your profile, skills, work, and portfolio.
            </h2>
            <p className="mt-4 text-neutral-400 font-light text-base md:text-lg leading-relaxed max-w-2xl mx-auto">
              The Adorzia Designer Directory is a public showcase of Pakistan's emerging and established fashion talent. Create your profile and let the industry find you.
            </p>

            <div className="mt-12 flex flex-col sm:flex-row items-center justify-center gap-6">
              <Link to="/designers" className="px-8 py-4 bg-[#bb9457] text-black font-semibold uppercase tracking-[0.2em] text-[11px] rounded-sm hover:bg-white hover:text-black transition-all duration-300">
                Explore the Directory
              </Link>
              <a href="/contact" className="px-8 py-4 border border-white/20 text-white font-semibold uppercase tracking-[0.2em] text-[11px] rounded-sm hover:border-[#bb9457] hover:text-[#bb9457] transition-all duration-300">
                Create Your Profile
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* ====== SECTION 9: HOW IT WORKS ====== */}
      <section className="relative py-32 md:py-40 border-b border-neutral-900 overflow-hidden">
        <div className="absolute inset-0">
          <img src={studio} alt="" aria-hidden="true" className="w-full h-full object-cover" loading="lazy" decoding="async" />
          <div className="absolute inset-0 bg-gradient-to-b from-black/95 via-neutral-950/95 to-black/95" />
        </div>
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(187,148,87,0.08),transparent_50%)] pointer-events-none" />

        <div className="max-w-7xl mx-auto px-6 lg:px-8 relative z-10">
          <div className="max-w-3xl mb-16">
            <span className="text-[10px] uppercase tracking-[0.3em] text-[#bb9457] font-mono font-semibold">How It Works</span>
            <h2 className="mt-4 font-serif text-3xl md:text-5xl text-white font-normal tracking-tight">
              Your journey through Adorzia.
            </h2>
            <p className="mt-4 text-neutral-400 font-light text-base md:text-lg leading-relaxed">
              From joining to growing — here is how the ecosystem works.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-6 gap-6">
            {[
              { num: "01", title: "Join", body: "Register with Adorzia and tell us about your creative practice and goals." },
              { num: "02", title: "Showcase", body: "Create your designer profile, list your work, and make your portfolio visible to the industry." },
              { num: "03", title: "Develop", body: "Access resources, mentorship, production facilities, and community support to grow your skills." },
              { num: "04", title: "Get Selected", body: "Stand out through your work and commitment. Selected designers enter our incubation pipeline." },
              { num: "05", title: "Build", body: "Receive investment, brand development support, and strategic guidance to build your fashion brand." },
              { num: "06", title: "Grow", body: "Scale your practice with ongoing support — market access, buyer connections, and long-term partnership." }
            ].map((step, idx) => (
              <div key={idx} className="group relative p-6 bg-neutral-950/60 backdrop-blur-md border border-neutral-800 rounded-sm hover:border-[#bb9457]/40 transition-all duration-500">
                <div className="font-mono text-2xl text-[#bb9457] mb-3">{step.num}</div>
                <h3 className="font-serif text-lg text-white font-normal mb-2">{step.title}</h3>
                <p className="text-xs text-neutral-400 font-light leading-relaxed">{step.body}</p>
                {idx < 5 && (
                  <div className="hidden lg:block absolute top-1/2 -right-3 transform -translate-y-1/2 text-neutral-700">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3" />
                    </svg>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ====== SECTION 10: JOIN ADORZIA ====== */}
      <section id="join-adorzia" className="relative py-40 md:py-48 overflow-hidden">
        <div className="absolute inset-0">
          <img src={heroHome} alt="" aria-hidden="true" className="w-full h-full object-cover" loading="lazy" decoding="async" />
          <div className="absolute inset-0 bg-gradient-to-b from-black via-black/90 to-neutral-950" />
        </div>
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(187,148,87,0.15),transparent_60%)]" />

        <div className="max-w-5xl mx-auto px-6 lg:px-8 relative z-10">
          <div className="text-center mb-16">
            <span className="text-[10px] uppercase tracking-[0.3em] text-[#bb9457] font-mono font-semibold">Join Adorzia</span>
            <h2 className="mt-4 font-serif text-4xl md:text-6xl text-white font-normal tracking-tight">
              Your next step starts here.
            </h2>
            <p className="mt-6 text-neutral-400 font-light text-base md:text-lg max-w-2xl mx-auto leading-relaxed">
              You do not need to have it all figured out. You need craft, commitment, and the belief that what you make deserves to be seen. We will help with the rest.
            </p>
          </div>

          {formSubmitted ? (
            <div className="max-w-lg mx-auto p-12 border border-[#bb9457]/30 rounded-sm bg-neutral-900/50 text-center">
              <div className="w-16 h-16 mx-auto mb-6 rounded-full bg-[#bb9457]/20 flex items-center justify-center">
                <svg className="w-8 h-8 text-[#bb9457]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <p className="text-white font-light text-lg mb-4">
                You are registered. We will reach out with next steps and opportunities.
              </p>
              <button
                onClick={() => setFormSubmitted(false)}
                className="mt-6 px-6 py-3 border border-[#bb9457]/40 text-[#bb9457] text-[10px] uppercase tracking-[0.2em] rounded-sm hover:bg-[#bb9457] hover:text-black transition-all duration-300"
              >
                Register another
              </button>
            </div>
          ) : (
            <form onSubmit={handleRegister} className="max-w-2xl mx-auto space-y-6 p-10 border border-neutral-800 rounded-sm bg-neutral-900/30 backdrop-blur-sm">
              <div>
                <label className="text-[10px] uppercase tracking-[0.2em] text-neutral-400 font-semibold block mb-2">Full name *</label>
                <input
                  type="text"
                  required
                  value={regForm.name}
                  onChange={(e) => setRegForm({ ...regForm, name: e.target.value })}
                  className="w-full border-b border-neutral-800 bg-transparent py-3 text-white outline-none focus:border-[#bb9457] transition-colors placeholder:text-neutral-600"
                  placeholder="Your full name"
                />
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label className="text-[10px] uppercase tracking-[0.2em] text-neutral-400 font-semibold block mb-2">Email address *</label>
                  <input
                    type="email"
                    required
                    value={regForm.email}
                    onChange={(e) => setRegForm({ ...regForm, email: e.target.value })}
                    className="w-full border-b border-neutral-800 bg-transparent py-3 text-white outline-none focus:border-[#bb9457] transition-colors placeholder:text-neutral-600"
                    placeholder="your@email.com"
                  />
                </div>
                <div>
                  <label className="text-[10px] uppercase tracking-[0.2em] text-neutral-400 font-semibold block mb-2">Phone number *</label>
                  <input
                    type="tel"
                    required
                    value={regForm.phone}
                    onChange={(e) => setRegForm({ ...regForm, phone: e.target.value })}
                    className="w-full border-b border-neutral-800 bg-transparent py-3 text-white outline-none focus:border-[#bb9457] transition-colors placeholder:text-neutral-600"
                    placeholder="+92 XXX XXXXXXX"
                  />
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label className="text-[10px] uppercase tracking-[0.2em] text-neutral-400 font-semibold block mb-2">Primary discipline *</label>
                  <select
                    required
                    value={regForm.discipline}
                    onChange={(e) => setRegForm({ ...regForm, discipline: e.target.value })}
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
                  <label className="text-[10px] uppercase tracking-[0.2em] text-neutral-400 font-semibold block mb-2">What are you looking for? *</label>
                  <select
                    required
                    value={regForm.interest}
                    onChange={(e) => setRegForm({ ...regForm, interest: e.target.value })}
                    className="w-full border-b border-neutral-800 bg-transparent py-3 text-white outline-none focus:border-[#bb9457] transition-colors"
                  >
                    <option value="" className="bg-neutral-950">Select interest</option>
                    <option value="build my brand" className="bg-neutral-950">Build my brand</option>
                    <option value="collaborate with others" className="bg-neutral-950">Collaborate with others</option>
                    <option value="develop my career" className="bg-neutral-950">Develop my career</option>
                    <option value="incubation & investment" className="bg-neutral-950">Incubation & investment</option>
                    <option value="marketplace access" className="bg-neutral-950">Marketplace access</option>
                  </select>
                </div>
              </div>

              <button
                type="submit"
                disabled={formSubmitting}
                className="w-full px-8 py-4 bg-[#bb9457] text-black font-semibold uppercase tracking-[0.2em] text-[11px] rounded-sm hover:bg-white hover:text-black transition-all duration-300 disabled:opacity-50 flex items-center justify-center gap-3 group"
              >
                {formSubmitting ? (
                  <>
                    <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                    </svg>
                    Registering...
                  </>
                ) : (
                  <>
                    Join Adorzia
                    <svg className="w-4 h-4 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                    </svg>
                  </>
                )}
              </button>
            </form>
          )}

          <div className="mt-12 text-center">
            <p className="text-neutral-400 font-light text-sm">
              Have questions? <a href="/contact" className="text-[#bb9457] hover:underline">Get in touch</a>
            </p>
          </div>
        </div>
      </section>
    </div>
  )
}

export default ForCreatives
