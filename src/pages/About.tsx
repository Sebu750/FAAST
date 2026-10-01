import { useState, useEffect, useRef, forwardRef } from 'react'
import { Link } from 'react-router-dom'
import SEO from '../components/SEO'
import Breadcrumb from '../components/Breadcrumb'
import founder from '../assets/founder.webp'
import advisor1 from '../assets/fadnoori-cheif-advisor.webp'
import naziaOtho from '../assets/naziaotho.webp'
import zaraAhmed from '../assets/Zara-ahmad.webp'
import bilalHussain from '../assets/bilal-hussain.webp'
import fatimaNoor from '../assets/Fatima-noor.webp'
import heroHome from '../assets/hero-banner-coworking-studio 1 .webp'
import studio from '../assets/hero-banner-coworking-studio-2.webp'
import spotlight from '../assets/fashion-icon.webp'
import craft from '../assets/craft.webp'
import coworking from '../assets/coworking-studio-image .webp'

// --- REUSABLE EDITORIAL GRID MODULES ---
const Eyebrow = ({ children, className = '' }: { children: React.ReactNode; className?: string }) => (
  <span className={`inline-flex items-center gap-2 text-[#bb9457] uppercase tracking-[0.3em] text-[10px] font-mono font-semibold ${className}`}>
    <span className="w-1.5 h-1.5 bg-[#bb9457] rounded-full" />
    {children}
  </span>
)

interface SectionProps {
  children: React.ReactNode
  className?: string
  id?: string
}

const Section = forwardRef<HTMLDivElement, SectionProps>(
  ({ children, className = '', id }, ref) => (
    <section
      ref={ref}
      id={id}
      className={`relative overflow-hidden py-28 md:py-36 bg-black text-neutral-300 ${className}`}
    >
      {children}
    </section>
  )
)

Section.displayName = 'Section'

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
  location?: string
  specialization?: string
}

const TeamGrid = ({ eyebrow, title, intro, members, columns, variant = 'dark' }: { eyebrow: string; title: string; intro?: string; members: Member[]; columns: number; variant?: 'light' | 'dark' }) => {
  const isLightBg = variant === 'light'
  
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
        <div key={idx} className={`group hover:-translate-y-1 transition-all duration-500 ${
          isLightBg ? '' : ''
        }`}>
          {/* Image */}
          <div className="aspect-[4/5] w-full overflow-hidden mb-5 rounded-sm">
            {m.image ? (
              <img 
                src={m.image} 
                alt={m.name} 
                className="w-full h-full object-cover transition-all duration-700 group-hover:scale-105" 
               loading="lazy" decoding="async" />
            ) : (
              <div className={`aspect-[4/5] w-full flex items-center justify-center font-mono text-2xl font-light border rounded-sm transition-colors ${
                isLightBg 
                  ? 'bg-neutral-100 border-neutral-200 text-neutral-400 group-hover:text-[#bb9457] group-hover:border-[#bb9457]/30' 
                  : 'bg-neutral-900 border-neutral-800 text-neutral-700 group-hover:text-[#bb9457]'
              }`}>
                FA
              </div>
            )}
          </div>

          {/* Name */}
          <h3 className={`font-serif text-xl font-normal transition-colors ${
            isLightBg ? 'text-neutral-900 group-hover:text-[#bb9457]' : 'text-white group-hover:text-[#bb9457]'
          }`}>{m.name}</h3>

          {/* Role */}
          <div className={`text-[11px] font-medium mt-1 mb-4 ${
            isLightBg ? 'text-neutral-700' : 'text-neutral-300'
          }`}>{m.role}</div>

          {/* Divider */}
          <div className={`w-8 h-px mb-4 ${
            isLightBg ? 'bg-neutral-300' : 'bg-neutral-700'
          }`} />

          {/* Location & Specialization */}
          <div className="space-y-1.5">
            {m.location && (
              <div className={`text-[10px] uppercase tracking-[0.2em] font-mono ${
                isLightBg ? 'text-neutral-500' : 'text-neutral-400'
              }`}>
                {m.location}
              </div>
            )}
            {m.specialization && (
              <div className={`text-xs font-light leading-relaxed ${
                isLightBg ? 'text-neutral-600' : 'text-neutral-500'
              }`}>
                {m.specialization}
              </div>
            )}
          </div>
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
    advisor2: founder,
    advisor3: craft,
    workspace: coworking,
    texture: craft
  }

  const coreTeam = [
    { 
      name: "Zara Ahmed", 
      role: "Head of Studio Operations", 
      image: zaraAhmed, 
      location: "Karachi, Pakistan",
      specialization: "Coworking Space Design & Fashion Production Systems" 
    },
    { 
      name: "Bilal Hussain", 
      role: "Marketplace Director", 
      image: bilalHussain, 
      location: "Lahore, Pakistan",
      specialization: "Designer Onboarding & International Buyer Relations" 
    },
    { 
      name: "Fatima Noor", 
      role: "Spotlight Program Lead", 
      image: fatimaNoor, 
      location: "Islamabad, Pakistan",
      specialization: "Talent Discovery & Brand Development Strategy" 
    },
  ]

  const advisoryBoard = [
    { 
      name: "Muhammad Fawad Noori", 
      role: "Chief Strategic & Creative Advisor", 
      image: advisor1, 
      location: "Lahore, Pakistan",
      specialization: "Fashion Ecosystem Development & Creative Direction" 
    },
    { 
      name: "Nazia Otho", 
      role: "Fashion Artist & Creative Storytelling Advisor", 
      image: naziaOtho, 
      location: "Karachi, Pakistan",
      specialization: "Fashion Illustration, Artistry & Creative Craftsmanship" 
    }
  ]

  return (
    <div className="min-h-screen bg-black text-neutral-100 selection:bg-[#bb9457] selection:text-black font-sans antialiased overflow-x-hidden">
      <SEO
        title="About Adorzia - Building Pakistan's Fashion Entrepreneurship Ecosystem"
        description="Adorzia is building the growth architecture Pakistani fashion entrepreneurs need. Our story, mission, team, and the ecosystem connecting designers, brands, manufacturers, and partners."
        canonicalURL="https://adorzia.com/about"
        ogTitle="About Adorzia - Our Story, Mission and Vision"
        ogDescription="Building Pakistan's first fashion entrepreneurship ecosystem. Discover our story, team, and the ecosystem for emerging fashion designers."
        ogImageAlt="Adorzia - Pakistani fashion entrepreneurship ecosystem"
        schemaType="AboutPage"
        schema={{
          "@context": "https://schema.org",
          "@type": "AboutPage",
          "mainEntity": {
            "@type": "Organization",
            "name": "Adorzia",
            "url": "https://adorzia.com",
            "logo": "https://adorzia.com/logo.png",
            "founder": {
              "@type": "Person",
              "name": "Haseeb Malik"
            },
            "foundingDate": "2025",
            "foundingLocation": {
              "@type": "Place",
              "name": "Karachi, Pakistan"
            },
            "areaServed": "Pakistan",
            "description": "Pakistan's first fashion entrepreneurship ecosystem providing coworking studios, curated marketplace, and national spotlight event for emerging designers.",
            "sameAs": ["https://www.instagram.com/adorziaofficial/", "https://www.linkedin.com/company/adorzia/"]
          }
        }}
        keywords="Adorzia, Pakistani fashion entrepreneurship, fashion ecosystem Pakistan, fashion brand building, Adorzia team, Adorzia story"
      />
      <script type="application/ld+json">{JSON.stringify({
        "@context": "https://schema.org",
        "@type": "FAQPage",
        "mainEntity": [
          { "@type": "Question", "name": "What is Adorzia?", "acceptedAnswer": { "@type": "Answer", "text": "Adorzia is Pakistan's first fashion entrepreneurship ecosystem. It discovers emerging designers, helps build fashion brands, invests in selected brands, and connects them with the market through coworking studios, a curated marketplace, and talent events." } },
          { "@type": "Question", "name": "Who founded Adorzia?", "acceptedAnswer": { "@type": "Answer", "text": "Adorzia was founded by Haseeb Malik in 2025, with the mission of building the growth architecture Pakistani fashion entrepreneurs have never had." } },
          { "@type": "Question", "name": "Where is Adorzia located?", "acceptedAnswer": { "@type": "Answer", "text": "Adorzia is based in Pakistan with coworking studios planned for Karachi, Lahore, and Islamabad, opening in 2026." } }
        ]
      })}</script>
      <Breadcrumb currentPage="About" />

      {/* Luxury Animation Injections */}
      <style>{`
        @keyframes fadeInUp {
          from { opacity: 0; transform: translateY(40px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-fade-in-up { animation: fadeInUp 0.8s ease-out forwards; }
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
          transform: translateY(-4px);
          box-shadow: 0 12px 24px rgba(0, 0, 0, 0.1);
        }
        @keyframes marqueeLeft {
          from { transform: translateX(0); }
          to { transform: translateX(-50%); }
        }
        .animate-marquee {
          animation: marqueeLeft 40s linear infinite;
          will-change: transform;
        }
        .animate-marquee:hover {
          animation-play-state: paused;
        }
      `}</style>

      {/* --- HERO SECTION --- */}
      <section className="relative min-h-screen flex items-center overflow-hidden text-white">
        <div className="absolute inset-0 z-0">
          <img
            src={imgs.craft}
            alt="Tactile Atelier Manufacturing"
            className="w-full h-full object-cover scale-110 opacity-45 grayscale contrast-115"
            style={{ transform: `translateY(${scrollY * 0.3}px)` }}
            fetchPriority="high" decoding="sync" />
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
              <span className="w-1.5 h-1.5 bg-[#bb9457] rounded-full" />
              <span className="text-[#bb9457] uppercase tracking-[0.3em] text-[10px] font-mono font-semibold">ABOUT ADORZIA</span>
            </div>

            <h1 className="font-serif text-4xl md:text-6xl lg:text-7xl xl:text-8xl leading-[1.05] text-white tracking-tight font-normal">
              A fashion entrepreneurship ecosystem for Pakistani designers to build <span className="text-gradient italic font-light">successful brands.</span>
            </h1>

            <p className="mt-8 max-w-2xl text-neutral-400 text-base md:text-lg leading-relaxed font-light">
              In 2025, a question that demanded an answer: Why does a nation with profound heritage and extraordinary creative ambition lack a structured ecosystem for fashion entrepreneurs? Adorzia is the response.
            </p>

            <div className="mt-12 flex flex-wrap gap-5">
              <Link
                to="/fashionpreneurship"
                className="px-8 py-4 bg-[#bb9457] text-black font-semibold uppercase tracking-[0.2em] text-[11px] rounded-sm hover:bg-white hover:text-black transition-all duration-300 transform hover:-translate-y-0.5"
              >
                Enter the Ecosystem
              </Link>
              <Link
                to="/contact"
                className="px-8 py-4 border border-white/20 text-white font-semibold uppercase tracking-[0.2em] text-[11px] rounded-sm hover:border-[#bb9457] hover:text-[#bb9457] transition-all duration-300 backdrop-blur-sm"
              >
                Get in Touch
              </Link>
            </div>

            {/* Trust Strip */}
            <div className="mt-16 pt-8 border-t border-white/10">
              <div className="flex flex-wrap items-center gap-x-6 gap-y-3 text-neutral-500 text-[10px] uppercase tracking-[0.25em] font-mono">
                <span>Karachi <span className="text-[#bb9457] mx-1.5">·</span> Lahore <span className="text-[#bb9457] mx-1.5">·</span> Islamabad</span>
                <span className="w-px h-3 bg-white/15" />
                <span>Studios <span className="text-[#bb9457] mx-1.5">·</span> Marketplace <span className="text-[#bb9457] mx-1.5">·</span> Spotlight</span>
                <span className="w-px h-3 bg-white/15" />
                <span className="text-[#bb9457]">Built for Emerging Fashion Designers</span>
              </div>
            </div>
          </div>

          {/* Scroll cue */}
          <div className="absolute bottom-12 left-1/2 -translate-x-1/2 flex flex-col items-center gap-3 text-neutral-600">
            <span className="text-[9px] uppercase tracking-[0.3em] font-mono">Scroll</span>
            <div className="w-px h-10 bg-gradient-to-b from-[#bb9457]/50 to-transparent" />
          </div>
        </div>
      </section>

      {/* --- SECTION 1: OUR STORY --- */}
      <Section className="bg-neutral-950 text-neutral-300" id="story" ref={setSectionRef('story') as React.Ref<HTMLDivElement>}>
        <div className="absolute inset-0 z-0">
          <img
            src={imgs.cinematic}
            alt=""
            className="w-full h-full object-cover opacity-15 filter grayscale contrast-150 scale-100"
           loading="lazy" decoding="async" />
          <div className="absolute inset-0 bg-gradient-to-b from-neutral-950 via-neutral-950/80 to-neutral-950" />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(187,148,87,0.08),transparent_50%)]" />
        </div>

        <Container>
          {/* Origin Story */}
          <div className="grid md:grid-cols-12 gap-12 lg:gap-16 items-start mb-24">
            <div className={`md:col-span-4 flex flex-col items-start transition-all duration-1000 ${isVisible['story'] ? 'animate-fade-in-up' : 'opacity-0 translate-y-[40px]'}`}>
              <div className="inline-flex items-center gap-3 glass px-5 py-2 rounded-full">
                <span className="w-1.5 h-1.5 bg-[#bb9457] rounded-full" />
                <span className="text-[#bb9457] uppercase tracking-[0.3em] text-[10px] font-mono font-semibold">01 / OUR STORY</span>
              </div>
            </div>

            <div className={`md:col-span-8 space-y-8 text-neutral-400 leading-relaxed font-light text-base md:text-lg transition-all duration-1000 delay-200 ${isVisible['story'] ? 'animate-fade-in-up' : 'opacity-0 translate-y-[40px]'}`}>
              <p className="font-serif text-2xl md:text-4xl text-white leading-[1.25] tracking-tight font-normal border-l-2 border-[#bb9457] pl-6 md:pl-8">
                Adorzia emerged from that precise vacuum — bridging the sharp divide between raw national talent and non-existent support networks.
              </p>
              
              <div className="space-y-6 pl-6 md:pl-8">
                <p>
                  Derived from concepts of adornment and ascension, our platform was founded on a singular directive: ensure the next generation of Pakistani fashion designers no longer navigate the global market in isolation.
                </p>
                <p className="pt-2">
                  One year in, building toward three metropolitan hubs, we are working to reshape the blueprint. <span className="text-gradient font-normal">We are early. We are intentional. We are building for the long term.</span>
                </p>
              </div>
            </div>
          </div>

          {/* Founder's Note */}
          <div className={`max-w-5xl mx-auto transition-all duration-1000 ${isVisible['story'] ? 'animate-fade-in-up' : 'opacity-0 translate-y-[40px]'}`}>
            <div className="grid md:grid-cols-12 gap-12 lg:gap-16 items-center">
              {/* Founder Image */}
              <div className="md:col-span-4">
                <div className="aspect-[4/5] overflow-hidden rounded-sm">
                  <img 
                    src={founder} 
                    alt="Haseeb Malik, Founder of Adorzia" 
                    className="w-full h-full object-cover grayscale contrast-125 hover:grayscale-0 transition-all duration-700"
                   loading="lazy" decoding="async" />
                </div>
                <div className="mt-6 text-center md:text-left">
                  <h3 className="font-serif text-xl text-white font-normal">Haseeb Malik</h3>
                  <p className="text-[#bb9457] text-xs uppercase tracking-[0.2em] font-mono mt-1">Founder & Creative Director</p>
                </div>
              </div>

              {/* Founder Note */}
              <div className="md:col-span-8 space-y-8">
                <div className="inline-flex items-center gap-2 glass px-5 py-2 rounded-full">
                  <span className="w-1.5 h-1.5 bg-[#bb9457] rounded-full" />
                  <span className="text-[#bb9457] uppercase tracking-[0.3em] text-[10px] font-mono font-semibold">A NOTE FROM THE FOUNDER</span>
                </div>

                <blockquote className="font-serif text-2xl md:text-4xl text-white leading-[1.25] tracking-tight font-normal border-l-2 border-[#bb9457] pl-6 md:pl-8">
                  Adorzia began with a simple observation: Pakistan produces extraordinary fashion talent, yet most designers build alone.
                </blockquote>

                <div className="space-y-6 text-neutral-400 font-light leading-relaxed text-base md:text-lg pl-6 md:pl-8">
                  <p>
                    I created Adorzia to change that. Every designer I met shared the same frustration: brilliant creative vision, limited resources to execute it. So we are building the missing pieces — physical <Link to="/contact" className="text-[#bb9457] hover:text-white transition-colors underline underline-offset-4">studios</Link>, a curated <Link to="/marketplace" className="text-[#bb9457] hover:text-white transition-colors underline underline-offset-4">marketplace</Link>, and a national <Link to="/contact" className="text-[#bb9457] hover:text-white transition-colors underline underline-offset-4">spotlight event</Link> — to ensure the next generation of Pakistani fashion entrepreneurs never has to navigate the global market in isolation.
                  </p>
                  <p className="text-white font-medium">
                    This is not a platform built for designers. It is a platform built by someone who understands what designers need to thrive.
                  </p>
                </div>

                <div className="pt-4 pl-6 md:pl-8">
                  <div className="w-16 h-px bg-[#bb9457]/30 mb-4" />
                  <p className="text-neutral-500 text-xs uppercase tracking-[0.2em] font-mono">
                    Karachi, 2025
                  </p>
                </div>
              </div>
            </div>
          </div>
        </Container>
      </Section>

      {/* --- SECTION 2: VISION & MISSION --- */}
      <Section className="bg-neutral-950 text-neutral-300" id="mission" ref={setSectionRef('mission') as React.Ref<HTMLDivElement>}>
        <Container>
          <div className={`grid md:grid-cols-2 gap-16 mb-16 transition-all duration-1000 ${isVisible['mission'] ? 'animate-fade-in-up' : 'opacity-0 translate-y-[60px]'}`}>
            <div className="space-y-6">
              <div className="inline-flex items-center gap-2 glass px-5 py-2 rounded-full">
                <span className="w-1.5 h-1.5 bg-[#bb9457] rounded-full" />
                <span className="text-[#bb9457] uppercase tracking-[0.3em] text-[10px] font-mono font-semibold">02 / MISSION</span>
              </div>
              <h2 className="font-serif text-3xl md:text-4xl leading-[1.1] text-white font-normal tracking-tight">
                Building the definitive ecosystem for fashion entrepreneurship in Pakistan.
              </h2>
              <p className="text-neutral-400 text-sm md:text-base leading-relaxed font-light">
                Adorzia exists to provide serious creative entrepreneurs with the precise ecosystem required to scale: specialized <Link to="/contact" className="text-[#bb9457] hover:text-white transition-colors underline underline-offset-4">fashion coworking spaces</Link> to produce, a curated <Link to="/marketplace" className="text-[#bb9457] hover:text-white transition-colors underline underline-offset-4">handcraft fashion marketplace in Pakistan</Link> to distribute, and a high-profile national stage to secure institutional backing. We are not here to romanticize fashion; we are here to professionalize it.
              </p>
            </div>
            <div className="space-y-6">
              <div className="inline-flex items-center gap-2 glass px-5 py-2 rounded-full">
                <span className="w-1.5 h-1.5 bg-[#bb9457] rounded-full" />
                <span className="text-[#bb9457] uppercase tracking-[0.3em] text-[10px] font-mono font-semibold">VISION</span>
              </div>
              <h2 className="font-serif text-3xl md:text-4xl leading-[1.1] text-white font-normal tracking-tight">
                From the Khaak of our heritage to the <span className="text-gradient italic font-light">global stage.</span>
              </h2>
              <p className="text-neutral-400 text-sm md:text-base leading-relaxed font-light">
                We envision a future where independent Pakistani fashion brands occupy premier retail spaces worldwide, where heritage fashion commands luxury-tier valuations on international platforms, and where the name Adorzia is synonymous with the cultural renaissance that made it happen.
              </p>
            </div>
          </div>
          <div className={`overflow-hidden rounded-sm border border-neutral-800 hover-lift transition-all duration-1000 delay-300 ${isVisible['mission'] ? 'animate-fade-in-up' : 'opacity-0 translate-y-[60px]'}`}>
            <img src={heroHome} alt="Vision and Mission" className="w-full h-96 object-cover scale-110 hover:scale-115 transition-transform duration-700"  loading="lazy" decoding="async" />
          </div>

          {/* Signature Quote */}
          <div className={`mt-24 text-center transition-all duration-1000 delay-500 ${isVisible['mission'] ? 'animate-fade-in-up' : 'opacity-0 translate-y-[40px]'}`}>
            <div className="w-16 h-px bg-[#bb9457]/40 mx-auto mb-10" />
            <blockquote className="font-serif text-3xl md:text-5xl lg:text-6xl text-white font-normal tracking-tight leading-[1.2]">
              "Fashion deserves the same <span className="text-gradient italic font-light">growth architecture</span> as technology, finance, and media."
            </blockquote>
            <div className="space-y-2 pt-6">
              <p className="text-[#bb9457] text-sm font-medium tracking-wide">Haseeb Malik</p>
              <p className="text-neutral-500 text-xs uppercase tracking-[0.25em] font-mono">Founder & Creative Director, Adorzia</p>
            </div>
            <div className="w-16 h-px bg-[#bb9457]/40 mx-auto mt-10" />
          </div>
        </Container>
      </Section>

      {/* --- SECTION 3: WHY ADORZIA --- */}
      <Section className="bg-white text-neutral-900" id="why" ref={setSectionRef('why') as React.Ref<HTMLDivElement>}>
        <Container>
          {/* The Structural Gap */}
          <div className={`grid md:grid-cols-12 gap-12 items-start mb-24 transition-all duration-1000 ${isVisible['why'] ? 'animate-fade-in-up' : 'opacity-0 translate-y-[60px]'}`}>
            <div className="md:col-span-4">
              <span className="font-mono text-[10px] uppercase tracking-[0.3em] text-neutral-400 font-bold block">
                03 / WHY ADORZIA
              </span>
            </div>
            <div className="md:col-span-8 space-y-6 text-neutral-500 font-light leading-relaxed text-base md:text-lg">
              <p className="font-serif text-2xl md:text-3xl text-neutral-950 leading-[1.3] font-normal tracking-tight">
                World-class design, restricted by fragmented foundation.
              </p>
              <p>
                Walk through any regional bazaar and you will encounter artisanal mastery — from the geometric precision of Ajrak embroidery in contemporary fashion to pristine hand-loomed silk — that commands international reverence. Speak to any design graduate in Karachi and you will find strategic ambition suited for any global runway. Yet, systemic limitations routinely dilute this potential.
              </p>
              <p>
                The emerging talent lacks a dedicated fashion workspace in Islamabad, Karachi, or Lahore. The heritage artisan is restricted to hyper-localized supply chains. The visionary founder faces an investment climate blind to the commercial power of fashion IP.
              </p>
              <p className="text-neutral-900 font-medium">
                Adorzia is engineering an integrated ecosystem to close this loop. We aim to move contemporary Pakistani clothing away from the margins of casual craft and toward a highly professionalized, economically formidable industry through physical spaces, strategic capital, and global market access.
              </p>
            </div>
          </div>

          {/* Founding Values */}
          <div className={`transition-all duration-1000 delay-200 ${isVisible['why'] ? 'animate-fade-in-up' : 'opacity-0 translate-y-[40px]'}`}>
            <div className="text-left max-w-2xl mb-16">
              <div className="inline-flex items-center gap-2 px-5 py-2 rounded-full border border-neutral-200 bg-neutral-50">
                <span className="w-1.5 h-1.5 bg-[#bb9457] rounded-full" />
                <span className="text-[#bb9457] uppercase tracking-[0.3em] text-[10px] font-mono font-semibold">OUR OPERATING PRINCIPLES</span>
              </div>
              <h2 className="mt-4 font-serif text-3xl md:text-5xl text-neutral-950 font-normal tracking-tight">
                Five Non-Negotiable Tenets.
              </h2>
            </div>
            
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {[
                { n: "01", t: "Creative Capital", b: "We reject the paradigm of fashion as a passive passion project. Every designer, pattern-maker, and artisan within our network is an economic driver. We build professional support networks to match that reality." },
                { n: "02", t: "Living Heritage", b: "Traditional craftsmanship is not a relic of nostalgia — it is a distinct competitive advantage. A Pakistani heritage craft fashion brand should not look backward; it should apply historic visual languages to modern global luxury." },
                { n: "03", t: "Decentralized Talent", b: "Exceptional design is not restricted to metropolitan monopolies. Our scouting mechanisms operate nationally, ensuring the Adorzia ecosystem reflects the raw creative output of every province and subculture." },
                { n: "04", t: "Deliberate Visibility", b: "The correct platform at a critical inflection point permanently alters a brand's trajectory. We engineer high-stakes exposure deliberately, at scale, for the Adorzia visionaries who have earned the stage." },
                { n: "05", t: "Collective Building", b: "Adorzia is not a corporate entity detached from its industry. We are a community of operators building in absolute alignment and continuous dialogue with the creative community we serve." }
              ].map((v, idx) => (
                <div 
                  key={v.n} 
                  className={`p-8 border border-neutral-200 bg-neutral-50 hover:border-[#bb9457]/30 transition-all duration-1000 hover-lift`}
                  style={{ transitionDelay: `${idx * 150}ms` }}
                >
                  <div className="font-serif text-4xl text-gradient font-light">{v.n}</div>
                  <h3 className="mt-4 font-serif text-xl text-neutral-950 font-normal">{v.t}</h3>
                  <p className="mt-3 text-xs md:text-sm text-neutral-500 font-light leading-relaxed">{v.b}</p>
                </div>
              ))}
            </div>
          </div>
        </Container>
      </Section>

      {/* --- SECTION 4: OUR TEAM --- */}
      <Section className="bg-neutral-950 py-32" id="team" ref={setSectionRef('team') as React.Ref<HTMLDivElement>}>
        <Container>
          {/* Advisory Board */}
          <div className={`mb-24 transition-all duration-1000 ${isVisible['team'] ? 'animate-fade-in-up' : 'opacity-0 translate-y-[40px]'}`}>
            <TeamGrid
              eyebrow="04 / OUR TEAM"
              title="Strategic guidance from industry leaders."
              intro="Advisors bringing decades of expertise in fashion heritage, business strategy, and sustainable fashion development."
              members={advisoryBoard}
              columns={3}
              variant="dark"
            />
          </div>

          {/* Core Team */}
          <div className={`transition-all duration-1000 delay-300 ${isVisible['team'] ? 'animate-fade-in-up' : 'opacity-0 translate-y-[40px]'}`}>
            <div className="max-w-3xl mb-20">
              <Eyebrow>CORE TEAM</Eyebrow>
              <h2 className="mt-4 font-serif text-3xl md:text-5xl font-normal tracking-tight text-white">The operators building the ecosystem.</h2>
              <p className="mt-4 font-light text-sm md:text-base leading-relaxed text-neutral-400">A multi-disciplinary collective at the intersection of fashion design, enterprise software, and brand strategy.</p>
            </div>

            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {coreTeam.map((m, idx) => (
                <div key={idx} className="group hover:-translate-y-1 transition-all duration-500">
                  <div className="aspect-[4/5] w-full overflow-hidden mb-5 rounded-sm">
                    <img 
                      src={m.image} 
                      alt={m.name} 
                      className="w-full h-full object-cover transition-all duration-700 group-hover:scale-105" 
                     loading="lazy" decoding="async" />
                  </div>
                  <h3 className="font-serif text-xl font-normal text-white group-hover:text-[#bb9457] transition-colors">{m.name}</h3>
                  <div className="text-[11px] font-medium mt-1 mb-4 text-neutral-300">{m.role}</div>
                  <div className="w-8 h-px mb-4 bg-neutral-700" />
                  {m.location && <div className="text-[10px] uppercase tracking-[0.2em] font-mono text-neutral-400">{m.location}</div>}
                  {m.specialization && <div className="text-xs font-light leading-relaxed text-neutral-500 mt-1.5">{m.specialization}</div>}
                </div>
              ))}
            </div>
          </div>
        </Container>
      </Section>

      {/* --- SECTION 5: OUR ECOSYSTEM --- */}
      <Section className="bg-black py-32" id="ecosystem" ref={setSectionRef('ecosystem') as React.Ref<HTMLDivElement>}>
        <Container>
          <div className={`max-w-3xl mb-20 transition-all duration-1000 ${isVisible['ecosystem'] ? 'animate-fade-in-up' : 'opacity-0 translate-y-[60px]'}`}>
            <div className="inline-flex items-center gap-2 glass px-5 py-2 rounded-full">
              <span className="w-1.5 h-1.5 bg-[#bb9457] rounded-full" />
              <span className="text-[#bb9457] uppercase tracking-[0.3em] text-[10px] font-mono font-semibold">05 / OUR ECOSYSTEM</span>
            </div>
            <h2 className="mt-4 font-serif text-3xl md:text-5xl text-white font-normal tracking-tight">
              Three Modules. One Synchronized System.
            </h2>
            <p className="mt-4 text-neutral-400 font-light text-sm md:text-base leading-relaxed max-w-2xl">
              Designers, brands, manufacturers, artisans, institutions & partners — connected through a unified infrastructure built for fashion entrepreneurship.
            </p>
          </div>
          
          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {[
              {
                title: "Coworking Fashion Studios",
                image: coworking,
                body: "Creative execution should not be confined to isolated, under-equipped spaces. Adorzia fashion studios deliver premium, specialized environments engineered strictly for fashion professionals. Outfitted with industrial-grade machinery, pattern-cutting tables, and a high-caliber network, our studios in Karachi, Lahore, and Islamabad are built for rigorous output.",
                note: "Early-Stage Note: Studio spaces are currently breaking ground. Reserve your position in the collective early."
              },
              {
                title: "The Marketplace",
                image: craft,
                body: "Pakistan produces extraordinary design; the global market simply lacks a transparent gateway to acquire it. The Adorzia marketplace is a highly curated digital platform connecting independent designers and master artisans directly with international collectors. We do not merely list products; we archive provenance.",
                note: "Coming Soon: A curated online marketplace for emerging Pakistani designers launching late 2026."
              },
              {
                title: "Spotlight - The Annual Event",
                image: spotlight,
                body: "Raw talent without a high-visibility platform remains economically invisible. Adorzia Spotlight is our signature early-stage fashion brand incubator and talent discovery event. We audit the country to identify fashion entrepreneurs possessing both distinct creative direction and commercial viability.",
                note: "Applications open for the Fall 2026 cycle. Connect with us to learn more."
              }
            ].map((pillar, idx) => (
              <div 
                key={idx} 
                className={`group relative overflow-hidden rounded-sm hover-lift transition-all duration-1000 ${isVisible['ecosystem'] ? 'animate-fade-in-up' : 'opacity-0 translate-y-[60px]'}`}
                style={{ transitionDelay: `${idx * 200}ms` }}
              >
                {/* Background Image */}
                <div className="absolute inset-0">
                  <img 
                    src={pillar.image} 
                    alt={pillar.title}
                    className="w-full h-full object-cover scale-110 filter grayscale brightness-50 group-hover:scale-120 group-hover:brightness-75 transition-all duration-700" 
                   loading="lazy" decoding="async" />
                  <div className="absolute inset-0 bg-gradient-to-t from-neutral-950 via-neutral-950/80 to-transparent" />
                </div>
                
                {/* Glassmorphism Card */}
                <div className="relative z-10 glass min-h-[400px] p-8 flex flex-col justify-between group-hover:border-[#bb9457]/30 transition-all duration-500">
                  <div>
                    <div className="w-12 h-0.5 bg-[#bb9457] mb-6 group-hover:w-20 transition-all duration-500" />
                    <h3 className="font-serif text-xl text-white font-normal group-hover:text-[#bb9457] transition-colors mb-4">{pillar.title}</h3>
                    <p className="text-sm text-neutral-300 font-light leading-relaxed mb-6">{pillar.body}</p>
                  </div>
                  <p className="text-xs text-[#bb9457] font-light leading-relaxed border-t border-white/10 pt-4">{pillar.note}</p>
                </div>
              </div>
            ))}
          </div>

          {/* By the Numbers */}
          <div className={`mt-24 transition-all duration-1000 delay-500 ${isVisible['ecosystem'] ? 'animate-fade-in-up' : 'opacity-0 translate-y-[40px]'}`}>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-px bg-neutral-800/50">
              {[
                { number: "3", label: "Cities Planned", description: "Planned studio locations across Karachi, Lahore, and Islamabad by 2027" },
                { number: "1", label: "National Platform", description: "Working toward a unified talent discovery and funding ecosystem" },
                { number: "100+", label: "Designers Targeted", description: "Founding cohort of curated Pakistani fashion entrepreneurs" },
                { number: "1", label: "Global Marketplace", description: "Planned international buyer access for heritage and contemporary fashion" }
              ].map((metric, idx) => (
                <div key={idx} className="bg-black p-8 md:p-12 text-center group hover:bg-neutral-900/50 transition-colors">
                  <div className="font-serif text-5xl md:text-6xl text-[#bb9457] font-normal tracking-tight mb-3">
                    {metric.number}
                  </div>
                  <div className="w-8 h-px bg-[#bb9457]/30 mx-auto mb-4" />
                  <h3 className="text-white font-medium text-sm uppercase tracking-[0.15em] mb-3">
                    {metric.label}
                  </h3>
                  <p className="text-neutral-500 font-light text-xs leading-relaxed">
                    {metric.description}
                  </p>
                </div>
              ))}
            </div>
            <div className="mt-6 text-center">
              <p className="text-neutral-500 text-xs uppercase tracking-[0.2em] font-mono">
                Data as of Q2 2026 · Targets subject to strategic execution
              </p>
            </div>
          </div>
        </Container>
      </Section>

      {/* --- SECTION 6: PARTNERSHIPS --- */}
      <Section className="bg-white text-neutral-900 py-32 relative overflow-hidden" id="partners" ref={setSectionRef('partners') as React.Ref<HTMLDivElement>}>
        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-[#bb9457] to-transparent" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(187,148,87,0.04),transparent_60%)] pointer-events-none" />
        
        <Container>
          <div className={`text-center max-w-3xl mx-auto mb-20 transition-all duration-1000 ${isVisible['partners'] ? 'animate-fade-in-up' : 'opacity-0 translate-y-[40px]'}`}>
            <div className="inline-flex items-center gap-2 px-5 py-2 rounded-full border border-neutral-200 bg-neutral-50 mb-6">
              <span className="w-1.5 h-1.5 bg-[#bb9457] rounded-full" />
              <span className="text-[#bb9457] uppercase tracking-[0.3em] text-[10px] font-mono font-semibold">06 / PARTNERSHIPS</span>
            </div>
            <h2 className="font-serif text-3xl md:text-5xl text-neutral-900 font-normal tracking-tight">
              Strategic <span className="text-gradient italic font-light">partnerships.</span>
            </h2>
            <p className="mt-6 text-neutral-500 font-light text-base md:text-lg leading-relaxed">
              Forging alliances with premium fabric mills, design institutions, and venture funds who recognize the untapped potential of Pakistan's fashion IP.
            </p>
          </div>

          {/* Partner Logos Slider */}
          <div className={`relative mb-20 transition-all duration-1000 delay-300 ${isVisible['partners'] ? 'animate-fade-in-up' : 'opacity-0 translate-y-[40px]'}`}>
            <div className="absolute left-0 top-0 bottom-0 w-24 bg-gradient-to-r from-white to-transparent z-10 pointer-events-none" />
            <div className="absolute right-0 top-0 bottom-0 w-24 bg-gradient-to-l from-white to-transparent z-10 pointer-events-none" />
            
            <div className="overflow-hidden">
              <div className="flex animate-marquee gap-12 py-6" style={{ width: 'max-content' }}>
                {[
                  { name: "Nishat Textiles", category: "Fabric Mills" },
                  { name: "Gul Ahmed", category: "Manufacturing" },
                  { name: "Sapphire Textiles", category: "Fabric Mills" },
                  { name: "Khaadi", category: "Fashion Brand" },
                  { name: "Fashion Institute", category: "Education" },
                  { name: "Design Academy", category: "Education" },
                  { name: "Venture Capital", category: "Investment" },
                  { name: "Retail Group", category: "Distribution" },
                  { name: "Design Council", category: "Advisory" },
                  { name: "Export Ltd", category: "Trade" },
                  { name: "Luxury Brand", category: "Retail" },
                  { name: "Craft Foundation", category: "Heritage" },
                  { name: "Textile Corp", category: "Production" },
                  { name: "Fashion House", category: "Design" },
                  { name: "Studio Photography", category: "Creative" },
                  { name: "Pattern Studio", category: "Technical" },
                  { name: "Craft Council", category: "Heritage" },
                ].concat([
                  { name: "Nishat Textiles", category: "Fabric Mills" },
                  { name: "Gul Ahmed", category: "Manufacturing" },
                  { name: "Sapphire Textiles", category: "Fabric Mills" },
                  { name: "Khaadi", category: "Fashion Brand" },
                  { name: "Fashion Institute", category: "Education" },
                  { name: "Design Academy", category: "Education" },
                  { name: "Venture Capital", category: "Investment" },
                  { name: "Retail Group", category: "Distribution" },
                  { name: "Design Council", category: "Advisory" },
                  { name: "Export Ltd", category: "Trade" },
                  { name: "Luxury Brand", category: "Retail" },
                  { name: "Craft Foundation", category: "Heritage" },
                  { name: "Textile Corp", category: "Production" },
                  { name: "Fashion House", category: "Design" },
                  { name: "Studio Photography", category: "Creative" },
                  { name: "Pattern Studio", category: "Technical" },
                  { name: "Craft Council", category: "Heritage" },
                ]).map((partner, idx) => (
                  <div key={idx} className="flex-shrink-0 group">
                    <div className="flex items-center gap-4 px-6 py-4">
                      <div className="w-14 h-14 rounded-full bg-neutral-100 flex items-center justify-center group-hover:bg-[#bb9457]/10 transition-colors duration-500">
                        <span className="text-xl font-serif text-[#bb9457]">{partner.name.charAt(0)}</span>
                      </div>
                      <div>
                        <p className="text-neutral-900 text-sm font-medium">{partner.name}</p>
                        <p className="text-neutral-400 text-[10px] uppercase tracking-wider">{partner.category}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* CTA */}
          <div className={`text-center transition-all duration-1000 delay-500 ${isVisible['partners'] ? 'animate-fade-in-up' : 'opacity-0 translate-y-[40px]'}`}>
            <p className="text-neutral-500 font-light text-sm mb-6">
              If your organization aligns with the industrialization of contemporary Pakistani design
            </p>
            <Link to="/contact" className="px-8 py-4 bg-[#bb9457] text-black font-semibold uppercase tracking-[0.20em] text-[11px] rounded-sm hover:bg-neutral-900 hover:text-white transition-all duration-300 inline-block hover-lift">
              Request Partnership Details
            </Link>
          </div>
        </Container>
      </Section>

      {/* --- SECTION 7: CONTACT --- */}
      <Section className="bg-neutral-950 py-40 relative overflow-hidden" id="contact" ref={setSectionRef('contact') as React.Ref<HTMLDivElement>}>
        <div className="absolute inset-0 z-0 opacity-20 pointer-events-none">
          <img 
            src={heroHome}
            alt="Background Contrast" 
            className="w-full h-full object-cover filter grayscale brightness-50"
           loading="lazy" decoding="async" />
          <div className="absolute inset-0 bg-gradient-to-t from-neutral-950 via-neutral-950 to-transparent" />
        </div>
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(187,148,87,0.08),transparent_60%)] pointer-events-none" />
        
        <Container>
          <div className={`max-w-4xl mx-auto text-center relative z-10 space-y-10 transition-all duration-1000 ${isVisible['contact'] ? 'animate-fade-in-up' : 'opacity-0 translate-y-[40px]'}`}>
            <div className="inline-flex items-center gap-2 glass px-6 py-3 rounded-full mx-auto">
              <span className="w-2 h-2 rounded-full bg-[#bb9457]" />
              <span className="text-[#bb9457] uppercase tracking-[0.3em] text-[10px] font-mono font-semibold">07 / CONTACT</span>
            </div>
            
            <h2 className="font-serif text-4xl md:text-6xl tracking-tight font-normal text-white">
              Let's start a <span className="text-gradient italic font-light">conversation.</span>
            </h2>
            <p className="text-neutral-400 text-base md:text-lg max-w-2xl mx-auto font-light leading-relaxed">
              Whether you're a designer seeking resources, a partner exploring collaboration, or an investor interested in Pakistani fashion — we'd love to hear from you.
            </p>

            <div className="flex flex-wrap justify-center gap-5 pt-4">
              <Link
                to="/contact"
                className="px-10 py-4 bg-[#bb9457] text-black font-semibold uppercase tracking-[0.2em] text-[11px] rounded-sm hover:bg-white hover:text-black transition-all duration-300 transform hover:-translate-y-0.5"
              >
                Get in Touch
              </Link>
              <Link
                to="/fashionpreneurship"
                className="px-10 py-4 glass text-white font-semibold uppercase tracking-[0.2em] text-[11px] rounded-sm hover:border-[#bb9457] hover:text-[#bb9457] transition-all duration-300"
              >
                Fashionpreneurship
              </Link>
            </div>
          </div>
        </Container>
      </Section>
    </div>
  )
}

export default About
