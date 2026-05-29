import { useState, useEffect, useRef } from 'react'
import { Link } from 'react-router-dom'
import SEO from '../components/SEO'
import founder from '../assets/founder.png'
import advisor1 from '../assets/advisor1.png'
import team1 from '../assets/team1.jpg'
import heroHome from '../assets/hero-banner-coworking-studio 1 .png'
import studio from '../assets/hero-banner-coworking-studio-2.png'
import spotlight from '../assets/fashion-icon.png'
import craft from '../assets/craft.jpg'
import coworking from '../assets/coworking-studio-image .png'
import heroRunway from '../assets/hero-runway.jpg'

// --- REUSABLE EDITORIAL GRID MODULES ---
const Eyebrow = ({ children, className = '' }: { children: React.ReactNode; className?: string }) => (
  <span className={`inline-flex items-center gap-2 text-[#bb9457] uppercase tracking-[0.3em] text-[10px] font-mono font-semibold ${className}`}>
    <span className="w-1.5 h-1.5 bg-[#bb9457] rounded-full animate-pulse" />
    {children}
  </span>
)

const Section = ({ children, className = '', id, ref }: { children: React.ReactNode; className?: string; id?: string; ref?: (el: HTMLDivElement | null) => void }) => (
  <section id={id} ref={ref} className={`relative overflow-hidden py-28 md:py-36 border-b border-neutral-900 bg-black text-neutral-300 ${className}`}>
    {children}
  </section>
)

const Container = ({ children, className = '' }: { children: React.ReactNode; className?: string }) => (
  <div className={`max-w-7xl mx-auto px-6 lg:px-8 relative z-20 ${className}`}>
    {children}
  </div>
)

// Dynamic Modular Team Deck Matrix
interface Member {
  name: string
  role: string
  image?: string
  initials?: string
  bio: string
}

const TeamGrid = ({ eyebrow, title, intro, members, columns }: { eyebrow: string; title: string; intro?: string; members: Member[]; columns: number }) => {
  const isLightBg = title.includes('operators')
  
  return (
  <div>
    <div className="max-w-3xl mb-20">
      <Eyebrow>{eyebrow}</Eyebrow>
      <h2 className={`mt-4 font-serif text-3xl md:text-5xl font-normal tracking-tight ${isLightBg ? 'text-neutral-900' : 'text-white'}`}>{title}</h2>
      {intro && <p className={`mt-4 font-light text-sm md:text-base leading-relaxed ${isLightBg ? 'text-neutral-600' : 'text-neutral-400'}`}>{intro}</p>}
    </div>
    
    <div className={`grid gap-6 ${
      columns === 4 ? 'sm:grid-cols-2 md:grid-cols-4' : 'sm:grid-cols-2 lg:grid-cols-3'
    }`}>
      {members.map((m, idx) => (
        <div key={idx} className={`p-6 rounded-sm transition-all duration-300 flex flex-col justify-between group hover:-translate-y-1 ${
          isLightBg 
            ? 'bg-white border border-neutral-200 hover:border-[#bb9457]/30 hover:shadow-xl hover:shadow-[#bb9457]/10' 
            : 'bg-neutral-950 border border-neutral-800 hover:bg-neutral-900/60'
        }`}>
          <div>
            {m.image ? (
              <div className="aspect-[4/5] w-full overflow-hidden mb-6 rounded-sm">
                <img 
                  src={m.image} 
                  alt={m.name} 
                  className={`w-full h-full object-cover transition-all duration-700 ${
                    isLightBg 
                      ? 'grayscale contrast-110 group-hover:grayscale-0 group-hover:scale-105' 
                      : 'grayscale contrast-125 group-hover:scale-105'
                  }`} 
                />
              </div>
            ) : (
              <div className={`aspect-[4/5] w-full mb-6 flex items-center justify-center font-mono text-2xl font-light border rounded-sm transition-colors ${
                isLightBg 
                  ? 'bg-neutral-100 border-neutral-200 text-neutral-400 group-hover:text-[#bb9457] group-hover:border-[#bb9457]/30' 
                  : 'bg-neutral-900 border-neutral-800 text-neutral-700 group-hover:text-[#bb9457]'
              }`}>
                FA
              </div>
            )}
            <h4 className={`font-serif text-lg font-normal transition-colors ${
              isLightBg ? 'text-neutral-900 group-hover:text-[#bb9457]' : 'text-white group-hover:text-[#bb9457]'
            }`}>{m.name}</h4>
            <div className="text-[10px] font-mono text-[#bb9457] uppercase tracking-widest mt-1 mb-4">{m.role}</div>
          </div>
          <p className={`text-xs font-light leading-relaxed mt-2 ${
            isLightBg ? 'text-neutral-600' : 'text-neutral-500'
          }`}>{m.bio}</p>
        </div>
      ))}
    </div>
  </div>
  )
}

const About = () => {
  const [scrollY, setScrollY] = useState(0)
  const [isVisible, setIsVisible] = useState<Record<string, boolean>>({})
  const sectionRefs = useRef<Record<string, HTMLDivElement | null>>({})

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY)
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsVisible((prev) => ({ ...prev, [entry.target.id]: true }))
          }
        })
      },
      { threshold: 0.1, rootMargin: '0px 0px -50px 0px' }
    )

    Object.values(sectionRefs.current).forEach((ref) => {
      if (ref) observer.observe(ref)
    })

    return () => observer.disconnect()
  }, [])

  const setSectionRef = (id: string) => (el: HTMLDivElement | null) => {
    sectionRefs.current[id] = el
  }

  const imgs = {
    craft: heroHome,
    d1: founder,
    d2: studio,
    d3: spotlight,
    studio: studio,
    cinematic: heroHome,
    marketplace: studio,
    advisor1: advisor1,
    advisor2: team1,
    advisor3: craft,
    workspace: coworking,
    texture: craft
  }

  const coreTeam = [
    { name: "Haseeb Malik", role: "Founder & Creative Director", image: founder, bio: "Multi-disciplinary operator at the intersection of fashion design, enterprise software, and brand strategy. Built Adorzia to close the infrastructure gap for Pakistani fashion entrepreneurs." },
    { name: "Ayesha Rahman", role: "Head of Studio Operations", image: founder, bio: "Oversees the design, launch, and daily operations of Adorzia's coworking fashion studios across Karachi, Lahore, and Islamabad." },
    { name: "Sara Malik", role: "Marketplace Curator", image: founder, bio: "Manages the curated digital marketplace, connecting independent designers and heritage artisans with international collectors and buyers." }
  ]

  const advisoryBoard = [
    { name: "Muhammad Fawad Noori", role: "Chief Strategic & Creative Advisor ", image: advisor1, bio: "Helping shape ADORZIA into a next-generation fashion ecosystem empowering designers through creativity, innovation, and scalable opportunities." },
    { name: "Omar Khattak", role: "Fashion Industry Strategist", image: team1, bio: "Former executive at major fashion houses. Provides strategic guidance on scaling independent Pakistani labels for global market entry." },
    { name: "Zainab Tariq", role: "Sustainable Fashion Advocate", image: craft, bio: "Sustainability expert specializing in ethical fashion supply chains. Ensures Adorzia's ecosystem maintains environmental and cultural integrity." }
  ]

  return (
    <div className="min-h-screen bg-black text-neutral-100 selection:bg-[#bb9457] selection:text-black font-sans antialiased overflow-x-hidden">
      <SEO
        title="About Adorzia - Building Pakistan's Fashion Entrepreneurship Ecosystem Since 2025"
        description="Adorzia was founded in 2025 to build the infrastructure Pakistani fashion entrepreneurs have never had. Learn about our origin story, our mission to take Pakistani craft global, our founding values, and the team building this movement from the ground up."
        canonicalURL="https://adorzia.com/about"
        ogTitle="About Adorzia - Our Story, Mission and Vision"
        ogDescription="Founded in 2025. Building Pakistan's first fashion entrepreneurship ecosystem. This is why we started and where we are going."
        ogImageAlt="Adorzia founding story - Pakistani fashion entrepreneurship"
        schemaType="AboutPage"
        schema={{
          "@context": "https://schema.org",
          "@type": "AboutPage",
          "mainEntity": {
            "@type": "Organization",
            "name": "Adorzia",
            "foundingDate": "2025",
            "areaServed": "Pakistan",
            "description": "Fashion entrepreneurship ecosystem offering coworking studios, curated marketplace, and Spotlight talent event"
          }
        }}
        keywords="Pakistani fashion entrepreneurship, Adorzia story, fashion ecosystem Pakistan, Pakistani fashion brand building, Pakistani fashion 2025, Fashion entrepreneurship, Creative entrepreneurship Pakistan, Fashion brand building Pakistan, Adorzia, Adorzia Pakistan"
      />

      
      {/* Luxury Custom Animation Matrix Injections */}
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

      {/* --- HERO SECTION --- */}
      <section className="relative min-h-screen flex items-center overflow-hidden text-white border-b border-neutral-900">
        <div className="absolute inset-0 z-0">
          <img
            src={imgs.craft}
            alt="Tactile Atelier Manufacturing"
            className="w-full h-full object-cover scale-110 animate-ambient-swell opacity-45 grayscale contrast-115"
            style={{ transform: `translateY(${scrollY * 0.3}px)` }}
          />
          <div className="absolute inset-0 bg-black/60 z-10" />
          <div className="absolute inset-0 bg-gradient-to-r from-black via-black/85 to-transparent z-10" />
          <div className="absolute inset-0 bg-gradient-to-t from-neutral-950 via-transparent to-black/50 z-10" />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(187,148,87,0.18),transparent_60%)] z-10" />
        </div>

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

        <div className="relative z-20 max-w-7xl mx-auto w-full px-6 md:px-12 lg:px-8 py-32 animate-fade-in-up">
          <div className="max-w-4xl">
            <div className="inline-flex items-center gap-2 glass px-5 py-2 rounded-full mb-6">
              <span className="w-1.5 h-1.5 bg-[#bb9457] rounded-full animate-pulse-glow" />
              <span className="text-[#bb9457] uppercase tracking-[0.3em] text-[10px] font-mono font-semibold">01 / AGHAZ (THE GENESIS)</span>
            </div>

            <h1 className="font-serif text-4xl md:text-6xl lg:text-7xl xl:text-8xl leading-[1.05] text-white tracking-tight font-normal">
              Adorzia was not planned.<br />
              It was <span className="text-gradient italic font-light">inevitable.</span>
            </h1>

            <p className="mt-8 max-w-2xl text-neutral-400 text-base md:text-lg leading-relaxed font-light">
              In 2025, a fundamental question was raised in Lahore that demanded an industry shift: Why does a nation with such profound heritage, rigorous craft, and creative velocity lack a structured ecosystem for fashion entrepreneurs? The deficit was not a lack of intent; it was a lack of execution.
            </p>

            <div className="mt-12 flex flex-wrap gap-5">
              <Link
                to="/spotlight-event"
                className="px-8 py-4 bg-[#bb9457] text-black font-semibold uppercase tracking-[0.2em] text-[11px] rounded-sm hover:bg-white hover:text-black transition-all duration-300 transform hover:-translate-y-0.5"
              >
                Explore Spotlight
              </Link>
              <Link
                to="/for-creatives"
                className="px-8 py-4 border border-white/20 text-white font-semibold uppercase tracking-[0.2em] text-[11px] rounded-sm hover:border-[#bb9457] hover:text-[#bb9457] transition-all duration-300 backdrop-blur-sm"
              >
                Enter the Ecosystem
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* --- SECTION 1: BRAND ORIGIN STORY --- */}
      <Section className="bg-neutral-950 text-neutral-300" id="origin" ref={setSectionRef('origin')}>
        <div className="absolute inset-0 z-0">
          <img
            src={imgs.cinematic}
            alt=""
            className="w-full h-full object-cover opacity-15 filter grayscale contrast-150 scale-100"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-neutral-950 via-neutral-950/80 to-neutral-950" />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(187,148,87,0.08),transparent_50%)]" />
        </div>

        {/* Floating decorative elements */}
        <div className="absolute top-20 right-20 w-64 h-64 bg-[#bb9457]/5 rounded-full blur-3xl animate-float pointer-events-none" />
        <div className="absolute bottom-20 left-20 w-48 h-48 bg-[#bb9457]/5 rounded-full blur-3xl animate-float pointer-events-none" style={{ animationDelay: '2s' }} />

        <div className="absolute inset-0 opacity-[0.04] pointer-events-none z-10 mix-blend-screen">
          <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <pattern id="story-lines" width="80" height="80" patternUnits="userSpaceOnUse">
                <path d="M 40 0 L 80 40 L 40 80 L 0 40 Z" fill="none" stroke="#bb9457" strokeWidth="0.5" />
                <line x1="40" y1="0" x2="40" y2="80" stroke="#bb9457" strokeWidth="0.25" />
                <line x1="0" y1="40" x2="80" y2="40" stroke="#bb9457" strokeWidth="0.25" />
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#story-lines)" />
          </svg>
        </div>

        <Container>
          <div className="grid md:grid-cols-12 gap-12 lg:gap-16 items-start">
            <div className={`md:col-span-4 flex flex-col items-start transition-all duration-1000 ${isVisible['origin'] ? 'animate-fade-in-left' : 'opacity-0 translate-x-[-60px]'}`}>
              <div className="inline-flex items-center gap-3 glass px-5 py-2 rounded-full">
                <span className="w-1.5 h-1.5 bg-[#bb9457] rounded-full animate-pulse-glow" />
                <span className="text-[#bb9457] uppercase tracking-[0.3em] text-[10px] font-mono font-semibold">01 / AGHAZ (THE GENESIS)</span>
              </div>
              <div className="hidden md:block w-[1px] h-32 bg-gradient-to-b from-[#bb9457]/20 to-transparent mt-8 ml-5" />
            </div>

            <div className={`md:col-span-8 space-y-8 text-neutral-400 leading-relaxed font-light text-base md:text-lg transition-all duration-1000 delay-200 ${isVisible['origin'] ? 'animate-fade-in-right' : 'opacity-0 translate-x-[60px]'}`}>
              <p className="font-serif text-2xl md:text-4xl text-white leading-[1.25] tracking-tight font-normal border-l-2 border-[#bb9457] pl-6 md:pl-8">
                Adorzia emerged from that precise vacuum-bridging the sharp divide between raw national talent and non-existent infrastructure.
              </p>

              <div className="space-y-6 pl-6 md:pl-8">
                <p>
                  Derived from concepts of adornment and ascension, our platform was founded on a singular directive: ensure the next generation of Pakistani fashion designers no longer navigate the global market in isolation.
                </p>
                <p className="pt-2">
                  One year in, operating across three metropolitan hubs, we are fundamentally altering the blueprint. <span className="text-gradient font-normal">We are early. We are intentional. We are building for the long term.</span>
                </p>
              </div>
            </div>
          </div>
        </Container>
      </Section>

      {/* --- SECTION 2: THE PROBLEM WE ARE SOLVING --- */}
      <Section className="bg-white text-neutral-900" id="problem" ref={setSectionRef('problem')}>
        <Container>
          <div className={`grid md:grid-cols-12 gap-12 items-start mb-16 transition-all duration-1000 ${isVisible['problem'] ? 'animate-fade-in-up' : 'opacity-0 translate-y-[60px]'}`}>
            <div className="md:col-span-4">
              <span className="font-mono text-[10px] uppercase tracking-[0.3em] text-neutral-400 font-bold block">
                02 / THE STRUCTURAL GAP
              </span>
            </div>
            <div className="md:col-span-8 space-y-6 text-neutral-500 font-light leading-relaxed text-base md:text-lg">
              <p className="font-serif text-2xl md:text-3xl text-neutral-950 leading-[1.3] font-normal tracking-tight">
                World-class design, restricted by fragmented infrastructure.
              </p>
              <p>
                Walk through any regional bazaar and you will encounter artisanal mastery-from the geometric precision of Ajrak embroidery in contemporary fashion to pristine hand-loomed silk-that commands international reverence. Speak to any design graduate in Karachi and you will find strategic ambition suited for any global runway. Yet, systemic limitations routinely dilute this potential.
              </p>
              <p>
                The emerging talent lacks a dedicated fashion workspace in Islamabad, Karachi, or Lahore. The heritage artisan is restricted to hyper-localized supply chains. The visionary founder faces an investment climate blind to the commercial power of fashion IP.
              </p>
              <p className="text-neutral-900 font-medium">
                Adorzia engineered an integrated ecosystem to close this loop. We are moving contemporary Pakistani clothing away from the margins of casual craft and establishing it as a highly professionalized, economically formidable industry through physical infrastructure, strategic capital, and global market access.
              </p>
            </div>
          </div>
        </Container>
      </Section>

      {/* --- SECTION 3: MISSION & VISION --- */}
      <Section className="bg-neutral-950 border-t border-neutral-900 text-neutral-300" id="mission" ref={setSectionRef('mission')}>
        <Container>
          <div className={`grid md:grid-cols-2 gap-16 mb-16 transition-all duration-1000 ${isVisible['mission'] ? 'animate-fade-in-up' : 'opacity-0 translate-y-[60px]'}`}>
            <div className="space-y-6">
              <div className="inline-flex items-center gap-2 glass px-5 py-2 rounded-full">
                <span className="w-1.5 h-1.5 bg-[#bb9457] rounded-full animate-pulse-glow" />
                <span className="text-[#bb9457] uppercase tracking-[0.3em] text-[10px] font-mono font-semibold">03 / MISSION</span>
              </div>
              <h2 className="font-serif text-3xl md:text-4xl leading-[1.1] text-white font-normal tracking-tight">
                Building the definitive ecosystem for fashion entrepreneurship in Pakistan.
              </h2>
              <p className="text-neutral-400 text-sm md:text-base leading-relaxed font-light">
                Adorzia exists to provide serious creative entrepreneurs with the precise infrastructure required to scale: specialized fashion coworking spaces to produce, a curated handcraft fashion marketplace in Pakistan to distribute, and a high-profile national stage to secure institutional backing. We are not here to romanticize fashion; we are here to professionalize it.
              </p>
            </div>
            <div className="space-y-6">
              <div className="inline-flex items-center gap-2 glass px-5 py-2 rounded-full">
                <span className="w-1.5 h-1.5 bg-[#bb9457] rounded-full animate-pulse-glow" />
                <span className="text-[#bb9457] uppercase tracking-[0.3em] text-[10px] font-mono font-semibold">VISION</span>
              </div>
              <h2 className="font-serif text-3xl md:text-4xl leading-[1.1] text-white font-normal tracking-tight">
                From the Khaak of our heritage to the <span className="text-gradient italic font-light">global stage.</span>
              </h2>
              <p className="text-neutral-400 text-sm md:text-base leading-relaxed font-light">
                We envision a future where independent Pakistani fashion brands occupy premier retail spaces worldwide, where heritage textiles command luxury-tier valuations on international platforms, and where the name Adorzia is synonymous with the cultural renaissance that made it happen.
              </p>
            </div>
          </div>
          <div className={`overflow-hidden rounded-sm border border-neutral-800 hover-lift transition-all duration-1000 delay-300 ${isVisible['mission'] ? 'animate-fade-in-up' : 'opacity-0 translate-y-[60px]'}`}>
            <img src={heroHome} alt="Vision and Mission" className="w-full h-96 object-cover scale-110 hover:scale-115 transition-transform duration-700" />
          </div>
        </Container>
      </Section>

      {/* --- SECTION 4: THE THREE PILLARS EXPLAINED --- */}
      <Section className="border-b border-neutral-900 bg-black py-32" id="pillars" ref={setSectionRef('pillars')}>
        <Container>
          <div className={`max-w-3xl mb-20 transition-all duration-1000 ${isVisible['pillars'] ? 'animate-fade-in-up' : 'opacity-0 translate-y-[60px]'}`}>
            <div className="inline-flex items-center gap-2 glass px-5 py-2 rounded-full">
              <span className="w-1.5 h-1.5 bg-[#bb9457] rounded-full animate-pulse-glow" />
              <span className="text-[#bb9457] uppercase tracking-[0.3em] text-[10px] font-mono font-semibold">04 / ECOSYSTEM ARCHITECTURE</span>
            </div>
            <h2 className="mt-4 font-serif text-3xl md:text-5xl text-white font-normal tracking-tight">
              Three Modules. One Synchronized System.
            </h2>
          </div>
          
          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {[
              {
                title: "Coworking Fashion Studios",
                image: coworking,
                body: "Creative execution should not be confined to isolated, under-equipped spaces. Adorzia fashion studios deliver premium, specialized environments engineered strictly for fashion professionals. Outfitted with industrial-grade machinery, pattern-cutting tables, and a high-caliber network, our fashion workspaces in Islamabad, Karachi, and Lahore are built for rigorous output-from independent label founders to heritage preservationists.",
                note: "Early-Stage Note: Studio infrastructure is currently breaking ground. Reserve your position in the collective early."
              },
              {
                title: "The Marketplace",
                image: craft,
                body: "Pakistan produces extraordinary design; the global market simply lacks a transparent gateway to acquire it. The Adorzia marketplace is a highly curated digital platform connecting independent designers and master artisans directly with international collectors. We do not merely list products; we archive provenance. Every piece carries the documented lineage, technique, and identity of the hand that made it.",
                note: "Coming Soon: A curated online marketplace for emerging Pakistani designers launching late 2026."
              },
              {
                title: "Spotlight - The Annual Event",
                image: spotlight,
                body: "Raw talent without a high-visibility platform remains economically invisible. Adorzia Spotlight is our signature early-stage fashion brand incubator and talent discovery event in Pakistan. We audit the country to identify fashion entrepreneurs possessing both distinct creative direction and commercial viability. We do not just showcase them; we invest in Pakistani fashion designers-providing the capital, mentorship, and corporate infrastructure to build lasting international brands.",
                note: "The Fall 2026 cycle begins here. Submissions open June 1, 2026."
              }
            ].map((pillar, idx) => (
              <div 
                key={idx} 
                className={`group relative overflow-hidden rounded-sm hover-lift transition-all duration-1000 ${isVisible['pillars'] ? 'animate-fade-in-up' : 'opacity-0 translate-y-[60px]'}`}
                style={{ transitionDelay: `${idx * 200}ms` }}
              >
                {/* Background Image */}
                <div className="absolute inset-0">
                  <img 
                    src={pillar.image} 
                    alt={pillar.title}
                    className="w-full h-full object-cover scale-110 filter grayscale brightness-50 group-hover:scale-120 group-hover:brightness-75 transition-all duration-700" 
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-neutral-950 via-neutral-950/80 to-transparent" />
                </div>
                
                {/* Glassmorphism Card */}
                <div className="relative z-10 glass min-h-[400px] p-8 flex flex-col justify-between group-hover:border-[#bb9457]/30 transition-all duration-500">
                  <div>
                    <div className="w-12 h-0.5 bg-[#bb9457] mb-6 group-hover:w-20 transition-all duration-500" />
                    <h4 className="font-serif text-xl text-white font-normal group-hover:text-[#bb9457] transition-colors mb-4">{pillar.title}</h4>
                    <p className="text-sm text-neutral-300 font-light leading-relaxed mb-6">{pillar.body}</p>
                  </div>
                  <p className="text-xs text-[#bb9457] font-light leading-relaxed border-t border-white/10 pt-4">{pillar.note}</p>
                </div>
              </div>
            ))}
          </div>
        </Container>
      </Section>

      {/* --- SECTION 5: FOUNDING VALUES --- */}
      <Section className="border-b border-neutral-900 bg-neutral-950 py-32" id="values" ref={setSectionRef('values')}>
        <Container>
          <div className={`text-left max-w-2xl mb-16 transition-all duration-1000 ${isVisible['values'] ? 'animate-fade-in-left' : 'opacity-0 translate-x-[-60px]'}`}>
            <div className="inline-flex items-center gap-2 glass px-5 py-2 rounded-full">
              <span className="w-1.5 h-1.5 bg-[#bb9457] rounded-full animate-pulse-glow" />
              <span className="text-[#bb9457] uppercase tracking-[0.3em] text-[10px] font-mono font-semibold">05 / OPERATIONAL PRINCIPLES</span>
            </div>
            <h2 className="mt-4 font-serif text-3xl md:text-5xl text-white font-normal tracking-tight">
              Five Non-Negotiable Tenets.
            </h2>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              { n: "01", t: "Creative Capital", b: "We reject the paradigm of fashion as a passive passion project. Every designer, pattern-maker, and artisan within our network is an economic driver. We build professional infrastructure to match that reality." },
              { n: "02", t: "Living Heritage", b: "Traditional craftsmanship is not a relic of nostalgia-it is a distinct competitive advantage. A Pakistani heritage craft fashion brand should not look backward; it should apply historic visual languages to modern global luxury." },
              { n: "03", t: "Decentralized Talent", b: "Exceptional design is not restricted to metropolitan monopolies. Our scouting mechanisms operate nationally, ensuring the Adorzia ecosystem reflects the raw creative output of every province and subculture." },
              { n: "04", t: "Deliberate Visibility", b: "The correct platform at a critical inflection point permanently alters a brand's trajectory. We engineer high-stakes exposure deliberately, at scale, for the Adorzia visionaries who have earned the stage." },
              { n: "05", t: "Collective Building", b: "Adorzia is not a corporate entity detached from its industry. We are a community of operators building in absolute alignment and continuous dialogue with the creative community we serve." }
            ].map((v, idx) => (
              <div 
                key={v.n} 
                className={`p-8 border border-neutral-900 bg-neutral-950/40 hover:border-[#bb9457]/30 transition-all duration-1000 hover-lift ${isVisible['values'] ? 'animate-scale-in' : 'opacity-0 scale-95'}`}
                style={{ transitionDelay: `${idx * 150}ms` }}
              >
                <div className="font-serif text-4xl text-gradient font-light">{v.n}</div>
                <h3 className="mt-4 font-serif text-xl text-white font-normal">{v.t}</h3>
                <p className="mt-3 text-xs md:text-sm text-neutral-400 font-light leading-relaxed">{v.b}</p>
              </div>
            ))}
          </div>
        </Container>
      </Section>

      {/* --- SECTION 6: CORE TEAM --- */}
      <Section className="border-b border-neutral-200 bg-white py-32">
        <Container>
          <TeamGrid
            eyebrow="06 / CORE TEAM"
            title="The operators building the infrastructure."
            intro="A multi-disciplinary collective at the intersection of fashion design, enterprise software, and brand strategy."
            members={coreTeam}
            columns={3}
          />
        </Container>
      </Section>

      {/* --- SECTION 7: ADVISORY BOARD --- */}
      <Section className="border-b border-neutral-800 bg-neutral-950 py-32">
        <Container>
          <div className="max-w-3xl mb-20">
            <Eyebrow>07 / ADVISORY BOARD</Eyebrow>
            <h2 className="mt-4 font-serif text-3xl md:text-5xl text-white font-normal tracking-tight">Strategic guidance from industry leaders.</h2>
            <p className="mt-4 text-neutral-400 font-light text-sm md:text-base leading-relaxed">Advisors bringing decades of expertise in textile heritage, fashion business strategy, and sustainable fashion development.</p>
          </div>
          
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {advisoryBoard.map((m, idx) => (
              <div key={idx} className="bg-white p-6 rounded-sm transition-all duration-300 flex flex-col justify-between group hover:-translate-y-1 hover:shadow-xl hover:shadow-white/10 border border-neutral-200">
                <div>
                  {m.image ? (
                    <div className="aspect-[4/5] w-full overflow-hidden mb-6 rounded-sm">
                      <img 
                        src={m.image} 
                        alt={m.name} 
                        className="w-full h-full object-cover grayscale contrast-110 group-hover:grayscale-0 group-hover:scale-105 transition-all duration-700" 
                      />
                    </div>
                  ) : (
                    <div className="aspect-[4/5] w-full mb-6 bg-neutral-100 flex items-center justify-center font-mono text-2xl text-neutral-400 font-light border border-neutral-200 rounded-sm group-hover:text-[#bb9457] group-hover:border-[#bb9457]/30 transition-colors">
                      FA
                    </div>
                  )}
                  <h4 className="font-serif text-lg text-neutral-900 font-normal group-hover:text-[#bb9457] transition-colors">{m.name}</h4>
                  <div className="text-[10px] font-mono text-[#bb9457] uppercase tracking-widest mt-1 mb-4">{m.role}</div>
                </div>
                <p className="text-xs text-neutral-600 font-light leading-relaxed mt-2">{m.bio}</p>
              </div>
            ))}
          </div>
        </Container>
      </Section>

     

      {/* --- SECTION 8: PARTNERS & SUPPORTERS --- */}
      <Section className="bg-white text-neutral-900 py-32 relative overflow-hidden" id="partners" ref={setSectionRef('partners')}>
        <div className="absolute top-0 right-0 w-1/2 h-full opacity-10 pointer-events-none">
          <img src={imgs.workspace} alt="" className="w-full h-full object-cover" />
        </div>
        <div className="absolute top-20 left-20 w-56 h-56 bg-[#bb9457]/5 rounded-full blur-3xl animate-float pointer-events-none" />
        
        <Container>
          <div className={`grid md:grid-cols-12 gap-12 items-start transition-all duration-1000 ${isVisible['partners'] ? 'animate-fade-in-right' : 'opacity-0 translate-x-[60px]'}`}>
            <div className="md:col-span-4">
              <span className="font-mono text-[10px] uppercase tracking-[0.3em] text-neutral-400 font-bold block">
                07 / ALLIANCES
              </span>
            </div>
            <div className="md:col-span-8 space-y-6 text-neutral-500 font-light leading-relaxed text-base md:text-lg">
              <p className="font-serif text-2xl md:text-3xl text-neutral-950 leading-[1.3] font-normal tracking-tight">
                A shared institutional vision.
              </p>
              <p>
                Adorzia is actively expanding its network of strategic partners across the global investment, textile, and cultural sectors. We are forging alliances with premium textile mills, design institutions, and venture funds who recognize the untapped fiscal potential of Pakistan's fashion IP.
              </p>
              <p className="text-neutral-900 font-medium">
                If your organization aligns with the industrialization of contemporary Pakistani design, let us begin a conversation.
              </p>
              <div className="pt-4">
                <Link to="/contact" className="px-8 py-4 bg-[#bb9457] text-black font-semibold uppercase tracking-[0.20em] text-[11px] rounded-sm hover:bg-white hover:text-black transition-all duration-300 hover-lift inline-block animate-pulse-glow">
                  Request Partnership Details
                </Link>
              </div>
            </div>
          </div>
        </Container>
      </Section>

      {/* NEW: Cinematic Parallax Banner */}
      <section className="relative h-[60vh] md:h-[80vh] overflow-hidden">
        <div className="absolute inset-0">
          <img 
            src={heroRunway} 
            alt="Fashion Vision" 
            className="w-full h-full object-cover scale-110"
            style={{ transform: `translateY(${scrollY * 0.1}px)` }}
          />
          <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/50 to-transparent" />
          <div className="absolute inset-0 bg-gradient-to-t from-neutral-950 via-transparent to-neutral-950/50" />
        </div>
        
        <div className="relative z-10 h-full flex items-center">
          <div className="max-w-7xl mx-auto px-6 lg:px-8 w-full">
            <div className="max-w-2xl space-y-6">
              <div className="inline-flex items-center gap-3 glass px-6 py-3 rounded-full">
                <span className="w-2 h-2 rounded-full bg-[#bb9457] animate-pulse-glow" />
                <span className="text-[10px] uppercase tracking-[0.3em] text-[#bb9457] font-mono font-semibold">
                  The Movement
                </span>
              </div>
              <h2 className="font-serif text-4xl md:text-6xl lg:text-7xl text-white font-normal tracking-tight leading-[1.1]">
                Your vision deserves a <span className="text-gradient italic font-light">legacy.</span>
              </h2>
              <p className="text-white/80 text-base md:text-lg font-light leading-relaxed">
                From heritage craft to international acclaim. Adorzia is the architecture that transforms Pakistani design potential into global reality.
              </p>
              <div className="flex flex-wrap gap-4 pt-4">
                <Link
                  to="/for-creatives"
                  className="px-8 py-4 bg-[#bb9457] text-black font-semibold uppercase tracking-[0.20em] text-[11px] rounded-sm hover:bg-white hover:text-black transition-all duration-300 transform hover:-translate-y-0.5"
                >
                  Enter the Ecosystem
                </Link>
                <Link
                  to="/contact"
                  className="px-8 py-4 glass text-white font-semibold uppercase tracking-[0.20em] text-[11px] rounded-sm hover:border-[#bb9457] hover:text-[#bb9457] transition-all duration-300"
                >
                  Connect with Us
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* --- SECTION 9: JOIN THE MOVEMENT --- */}
      <Section className="bg-neutral-950 py-40 relative overflow-hidden" id="join" ref={setSectionRef('join')}>
        <div className="absolute inset-0 z-0 opacity-20 pointer-events-none">
          <img 
            src={heroHome}
            alt="Background Contrast" 
            className="w-full h-full object-cover filter grayscale brightness-50"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-neutral-950 via-neutral-950 to-transparent" />
        </div>
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(187,148,87,0.08),transparent_60%)] pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-96 h-96 opacity-15 pointer-events-none">
          <img src={imgs.texture} alt="" className="w-full h-full object-cover grayscale contrast-125" />
        </div>
        <div className="absolute top-20 right-20 w-64 h-64 bg-[#bb9457]/5 rounded-full blur-3xl animate-float pointer-events-none" />
        <div className="absolute bottom-20 left-20 w-48 h-48 bg-[#bb9457]/5 rounded-full blur-3xl animate-float pointer-events-none" style={{ animationDelay: '2s' }} />
        
        <Container>
          <div className={`max-w-4xl mx-auto text-center relative z-10 space-y-8 transition-all duration-1000 ${isVisible['join'] ? 'animate-scale-in' : 'opacity-0 scale-95'}`}>
            <div className="inline-flex items-center gap-2 glass px-6 py-3 rounded-full mx-auto">
              <span className="w-2 h-2 rounded-full bg-[#bb9457] animate-pulse-glow" />
              <span className="text-[#bb9457] uppercase tracking-[0.3em] text-[10px] font-mono font-semibold">08 / ALIGNMENT</span>
            </div>
            <h2 className="font-serif text-4xl md:text-6xl tracking-tight font-normal text-white">
              Shape the genesis of the <span className="text-gradient italic font-light">ecosystem.</span>
            </h2>
            <p className="text-neutral-400 text-base md:text-lg max-w-3xl mx-auto font-light leading-relaxed">
              We are operating at a definitive inflection point-early enough to shape the foundation, yet precise enough in our trajectory to guarantee scale.
            </p>
            <div className="space-y-4 text-neutral-300 text-sm md:text-base font-light max-w-2xl mx-auto">
              <p>For the designer, your specialized workspace, global marketplace, and national stage are ready.</p>
              <p>For the investor, a vetted pipeline of high-potential fashion IP awaits capital.</p>
              <p>For the cultural stakeholder, this is the architecture that takes our design narrative global.</p>
            </div>
            <div className="pt-8 flex flex-wrap justify-center gap-5">
              <Link
                to="/spotlight-event"
                className="px-8 py-4 bg-[#bb9457] text-black font-semibold uppercase tracking-[0.20em] text-[11px] rounded-sm hover:bg-white hover:text-black transition-all duration-300 transform hover:-translate-y-0.5 animate-pulse-glow"
              >
                Apply for Spotlight 2026
              </Link>
              <Link
                to="/contact"
                className="px-8 py-4 glass text-white font-semibold uppercase tracking-[0.20em] text-[11px] rounded-sm hover:border-[#bb9457] hover:text-[#bb9457] transition-all duration-300"
              >
                Initiate Contact
              </Link>
            </div>
          </div>
        </Container>
      </Section>

      {/* --- SECTION 10: PHYSICAL FACILITY TEASER --- */}
      <Section className="bg-neutral-950 py-32 border-t border-neutral-900" id="facilities" ref={setSectionRef('facilities')}>
        <Container>
          <div className={`max-w-3xl mb-16 transition-all duration-1000 ${isVisible['facilities'] ? 'animate-fade-in-left' : 'opacity-0 translate-x-[-60px]'}`}>
            <div className="inline-flex items-center gap-2 glass px-5 py-2 rounded-full">
              <span className="w-1.5 h-1.5 bg-[#bb9457] rounded-full animate-pulse-glow" />
              <span className="text-[#bb9457] uppercase tracking-[0.3em] text-[10px] font-mono font-semibold">09 / PHYSICAL INFRASTRUCTURE</span>
            </div>
            <h2 className="mt-4 font-serif text-3xl md:text-5xl text-white font-normal tracking-tight">
              Where concepts materialize into <span className="text-gradient italic font-light">garments.</span>
            </h2>
            <p className="mt-4 text-neutral-400 font-light text-sm md:text-base leading-relaxed">
              Premium, fully equipped coworking environments engineered specifically for fashion professionals. Launching across three metropolitan hubs.
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              { city: "Karachi Studio", date: "Launching Q3 2026", image: coworking },
              { city: "Lahore Atelier", date: "Launching Q4 2026", image: studio },
              { city: "Islamabad Hub", date: "Launching Q1 2027", image: heroHome }
            ].map((facility, idx) => (
              <div 
                key={idx} 
                className={`aspect-[4/5] overflow-hidden rounded-sm bg-neutral-900 border border-neutral-800 group hover:border-[#bb9457]/50 transition-all duration-1000 hover-lift ${isVisible['facilities'] ? 'animate-fade-in-up' : 'opacity-0 translate-y-[60px]'}`}
                style={{ transitionDelay: `${idx * 200}ms` }}
              >
                <div className="relative w-full h-full">
                  <img 
                    src={facility.image}
                    alt={facility.city} 
                    loading="lazy" 
                    className="w-full h-full object-cover scale-110 filter grayscale contrast-125 group-hover:grayscale-0 group-hover:scale-120 transition-all duration-[1.5s] ease-out" 
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent opacity-80 group-hover:opacity-60 transition-opacity duration-500" />
                  <div className="absolute inset-0 glass opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                  
                  {/* Coming Soon Overlay */}
                  <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                    <div className="text-center">
                      <div className="inline-flex items-center gap-2 glass px-4 py-2 rounded-full mb-3">
                        <span className="w-1.5 h-1.5 bg-[#bb9457] rounded-full animate-pulse" />
                        <span className="text-[#bb9457] uppercase tracking-[0.3em] text-[10px] font-mono font-semibold">Coming Soon</span>
                      </div>
                    </div>
                  </div>
                  
                  <div className="absolute bottom-0 left-0 right-0 p-6 z-10 transform group-hover:-translate-y-2 transition-transform duration-500">
                    <h4 className="font-serif text-2xl text-white font-normal mb-1">{facility.city}</h4>
                    <p className="text-[10px] font-mono text-[#bb9457] uppercase tracking-widest">{facility.date}</p>
                    <div className="mt-3 opacity-0 group-hover:opacity-100 transition-opacity duration-500 delay-100">
                      <span className="text-white/80 text-xs font-light">Reserve Your Spot →</span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </Container>
      </Section>
    </div>
  )
}

export default About
