import { useState, useEffect, useRef } from 'react'
import { Link } from 'react-router-dom'
import SEO from '../components/SEO'
import hero1 from '../assets/home-hero-ecosystem1.webp'
import hero2 from '../assets/home-hero-runway.webp'
import hero3 from '../assets/home-hero-craft.webp'
import heroRunwayCta from '../assets/home-cta-runway.webp'
import heritageCraft from '../assets/home-heritage-craft.webp'
import designer1 from '../assets/home-designer-portrait-1.webp'
import designer2 from '../assets/home-designer-portrait-2.webp'
import designer3 from '../assets/home-designer-portrait-3.webp'
import fabricInnovation from '../assets/home-fabric-innovation.webp'
import karachiStudio from '../assets/coworking-studio-1.webp'
import lahoreStudio from '../assets/coworking-studio-2.webp'
import islamabadStudio from '../assets/coworking-studio-3.webp'

const Home = () => {
  const [scrollY, setScrollY] = useState(0)
  const [isVisible, setIsVisible] = useState<Record<string, boolean>>({})
  const [email, setEmail] = useState('')
  const [subscribed, setSubscribed] = useState(false)
  const [submitting, setSubmitting] = useState(false)
  const [designers, setDesigners] = useState<any[]>([])
  const [designersLoading, setDesignersLoading] = useState(true)
  const [collections, setCollections] = useState<any[]>([])
  const [collectionsLoading, setCollectionsLoading] = useState(true)
  const [activeTab, setActiveTab] = useState<'designers' | 'collections'>('designers')
  const sectionRefs = useRef<Record<string, HTMLDivElement | null>>({})
  const rafRef = useRef<number>(0)

  // Fetch featured designers (dynamic import defers @supabase chunk)
  useEffect(() => {
    const fetchDesigners = async () => {
      try {
        const { supabase } = await import('../lib/supabase')
        let { data, error } = await supabase
          .from('designers')
          .select('*')
          .eq('is_featured', true)
          .limit(6)
        if (error) {
          const result = await supabase
            .from('designers')
            .select('*')
            .eq('is_featured', true)
            .order('created_at', { ascending: false })
            .limit(6)
          data = result.data
        } else if (data) {
          data = data.sort((a, b) => (a.priority ?? 999999) - (b.priority ?? 999999))
        }
        if (data) setDesigners(data)
      } catch (err) { console.error('Designers fetch error:', err) }
      finally { setDesignersLoading(false) }
    }
    fetchDesigners()
  }, [])

  // Fetch latest collections (dynamic import defers @supabase chunk)
  useEffect(() => {
    const fetchCollections = async () => {
      try {
        const { supabase } = await import('../lib/supabase')
        const { data } = await supabase
          .from('designer_collections')
          .select('*, designers(name, slug)')
          .eq('is_latest', true)
          .order('created_at', { ascending: false })
          .limit(6)
        if (data) setCollections(data)
      } catch (err) { console.error('Collections fetch error:', err) }
      finally { setCollectionsLoading(false) }
    }
    fetchCollections()
  }, [])

  useEffect(() => {
    const handleScroll = () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current)
      rafRef.current = requestAnimationFrame(() => setScrollY(window.scrollY))
    }
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => { window.removeEventListener('scroll', handleScroll); if (rafRef.current) cancelAnimationFrame(rafRef.current) }
  }, [])

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => { entries.forEach((entry) => { if (entry.isIntersecting) setIsVisible((prev) => ({ ...prev, [entry.target.id]: true })) }) },
      { threshold: 0.05, rootMargin: '0px' }
    )
    Object.values(sectionRefs.current).forEach((ref) => { if (ref) observer.observe(ref) })
    return () => observer.disconnect()
  }, [])

  const setSectionRef = (id: string) => (el: HTMLDivElement | null) => { sectionRefs.current[id] = el }

  const handleNewsletterSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setSubmitting(true)
    try {
      const { supabase } = await import('../lib/supabase')
      const { error } = await supabase.from('newsletter_subscriptions').insert([{ email }])
      if (error) { if (error.code === '23505') alert('This email is already subscribed.'); else throw error }
      else { setSubscribed(true); setEmail('') }
    } catch (err) { console.error('Error subscribing:', err); alert('Failed to subscribe. Please try again.') }
    finally { setSubmitting(false) }
  }

  const slides = [
    { image: '/hero-lcp.webp', eyebrow: 'Pakistan\'s First Fashion Ecosystem', title: 'Where Designers Become Fashionpreneurs', subtitle: 'Adorzia is Pakistan\'s first complete fashion entrepreneurship ecosystem. Premium coworking studios in Karachi, Lahore & Islamabad, a curated global marketplace, and the annual Spotlight event that discovers and invests in Pakistan\'s next great fashion brands.', ctaPrimary: { label: 'Reserve Your Studio Spot', to: '/fashionpreneurship' }, ctaSecondary: { label: 'Explore Locations', to: '/contact' } },
    { image: hero2, eyebrow: 'Spotlight — Fall 2026', title: 'Pakistan\'s Premier Talent Investment Program', subtitle: 'Once a year, Adorzia scours every province to identify the visionary ready to redefine Pakistani fashion on a global scale. Selected designers receive funding, mentorship, and a platform to launch internationally.', ctaPrimary: { label: 'Apply for Spotlight 2026', to: '/contact' }, ctaSecondary: { label: 'Discover the Event', to: '/contact' } },
    { image: hero3, eyebrow: 'The Marketplace', title: 'From heritage craft to global curation.', subtitle: 'A curated digital platform connecting independent designers and master craftspeople with international buyers. We bridge Pakistani heritage craftsmanship with global demand.', ctaPrimary: { label: 'List Your Collection', to: '/for-partners' }, ctaSecondary: { label: 'Enter the Marketplace', to: '/fashionpreneurship' } }
  ]

  const [currentIndex, setCurrentIndex] = useState(0)
  useEffect(() => {
    const timer = setInterval(() => setCurrentIndex((prev) => (prev + 1) % slides.length), 7000)
    return () => clearInterval(timer)
  }, [slides.length])

  return (
    <div className="min-h-screen bg-black text-neutral-100 selection:bg-[#bb9457] selection:text-black font-sans antialiased overflow-x-hidden">
      <SEO
        title="Adorzia - Where Visionaries Rise | Pakistan Fashion"
        description="Adorzia is Pakistan's first fashion entrepreneurship ecosystem — studios, marketplace, and Spotlight talent investment."
        canonicalURL="https://adorzia.com"
        ogTitle="Adorzia - Where Visionaries Rise | Pakistan Fashion"
        ogDescription="Pakistan's first complete fashion entrepreneurship ecosystem. Studios. Marketplace. Spotlight."
        ogImageAlt="Adorzia - Pakistani fashion ecosystem"
        schemaType="Organization"
        schema={{
          "@context": "https://schema.org", "@type": "Organization", "name": "Adorzia",
          "description": "Fashion entrepreneurship ecosystem in Pakistan offering coworking studios, a curated marketplace, and the annual Spotlight talent investment event.",
          "url": "https://adorzia.com", "logo": "https://adorzia.com/logo.png", "foundingDate": "2025", "areaServed": "Pakistan",
          "knowsAbout": ["Pakistani Fashion", "Fashion Entrepreneurship", "Heritage Craft", "Fashion Marketplace", "Coworking Studios", "Fashion Incubation", "Emerging Designers"],
          "sameAs": ["https://www.instagram.com/adorziaofficial/", "https://www.linkedin.com/company/adorzia/", "https://www.facebook.com/adorziaofficial", "https://x.com/adorziaofficial", "https://www.youtube.com/@adorziaofficial"],
          "contactPoint": { "@type": "ContactPoint", "email": "hello@adorzia.com", "contactType": "customer service" },
          "founder": { "@type": "Person", "name": "Haseeb Malik" },
          "address": { "@type": "PostalAddress", "addressCountry": "PK", "addressLocality": "Karachi" }
        }}
        keywords="Pakistani fashion, Fashion Pakistan, Pakistan designer, Heritage craft, Fashion marketplace, Fashion entrepreneurship, Adorzia"
        localBusinessSchema={[
          { "@context": "https://schema.org", "@type": "Place", "name": "Adorzia Coworking Studio Karachi", "address": { "@type": "PostalAddress", "addressLocality": "Karachi", "addressCountry": "PK" }, "description": "Fashion coworking studio in Karachi for designers, entrepreneurs, and creative professionals." },
          { "@context": "https://schema.org", "@type": "Place", "name": "Adorzia Coworking Studio Lahore", "address": { "@type": "PostalAddress", "addressLocality": "Lahore", "addressCountry": "PK" }, "description": "Fashion coworking studio in Lahore for designers, entrepreneurs, and creative professionals." },
          { "@context": "https://schema.org", "@type": "Place", "name": "Adorzia Coworking Studio Islamabad", "address": { "@type": "PostalAddress", "addressLocality": "Islamabad", "addressCountry": "PK" }, "description": "Fashion coworking studio in Islamabad for designers, entrepreneurs, and creative professionals." }
        ]}
      />

      <style>{`
        @keyframes fadeInUp { from { opacity: 0; transform: translate3d(0, 40px, 0); } to { opacity: 1; transform: translate3d(0, 0, 0); } }
        .animate-fade-in-up { animation: fadeInUp 0.8s ease-out forwards; }
        @keyframes fadeInLeft { from { opacity: 0; transform: translate3d(-60px, 0, 0); } to { opacity: 1; transform: translate3d(0, 0, 0); } }
        .animate-fade-in-left { animation: fadeInLeft 1s ease-out forwards; }
        @keyframes fadeInRight { from { opacity: 0; transform: translate3d(60px, 0, 0); } to { opacity: 1; transform: translate3d(0, 0, 0); } }
        .animate-fade-in-right { animation: fadeInRight 1s ease-out forwards; }
        .text-gradient { background: linear-gradient(135deg, #bb9457 0%, #d4af37 50%, #bb9457 100%); -webkit-background-clip: text; -webkit-text-fill-color: transparent; background-clip: text; }
        .glass { background: rgba(255,255,255,0.03); backdrop-filter: blur(20px); -webkit-backdrop-filter: blur(20px); border: 1px solid rgba(255,255,255,0.08); }
        .hover-lift { transition: transform 0.4s cubic-bezier(0.25,1,0.5,1), box-shadow 0.4s ease; }
        .hover-lift:hover { transform: translateY(-4px); box-shadow: 0 12px 24px rgba(0,0,0,0.1); }
      `}</style>

      {/* ====== SECTION 1: HERO / VISION ====== */}
      <section className="relative overflow-hidden bg-black min-h-[60vh] sm:min-h-[70vh] md:min-h-screen flex items-center">
        <div className="absolute inset-0 z-0">
          <img src={slides[currentIndex].image} alt={slides[currentIndex].eyebrow} className="w-full h-full object-cover scale-110 opacity-50 transition-opacity duration-1000" style={{ transform: `translate3d(0, ${scrollY * 0.3}px, 0)` }} {...(currentIndex === 0 ? { fetchPriority: 'high', decoding: 'sync' } : { loading: 'lazy', decoding: 'async' } as React.ImgHTMLAttributes<HTMLImageElement>)} />
          <div className="absolute inset-0 bg-gradient-to-r from-black via-black/80 to-transparent z-10" />
          <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-black/50 z-10" />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(187,148,87,0.15),transparent_60%)] z-10" />
        </div>
        {/* SVG Pattern Overlay */}
        <div className="absolute inset-0 opacity-[0.03] pointer-events-none z-10 mix-blend-screen">
          <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg"><defs><pattern id="hero-grid" width="100" height="100" patternUnits="userSpaceOnUse"><path d="M 50 0 L 100 50 L 50 100 L 0 50 Z" fill="none" stroke="#bb9457" strokeWidth="0.5" /></pattern></defs><rect width="100%" height="100%" fill="url(#hero-grid)" /></svg>
        </div>

        <div className="relative z-20 max-w-7xl mx-auto w-full px-6 md:px-12 lg:px-8 py-32">
          <div className="max-w-4xl">
            <div className="inline-flex items-center gap-2 glass px-5 py-2 rounded-full mb-6">
              <span className="w-1.5 h-1.5 bg-[#bb9457] rounded-full" />
              <span className="text-[#bb9457] uppercase tracking-[0.3em] text-[10px] font-mono font-semibold">{slides[currentIndex].eyebrow}</span>
            </div>
            <h1 className="font-serif text-4xl md:text-6xl lg:text-7xl xl:text-8xl leading-[1.05] text-white tracking-tight font-normal">
              {slides[currentIndex].title.split(' ').slice(0, -1).join(' ')} <span className="text-gradient italic font-light">{slides[currentIndex].title.split(' ').slice(-1)}</span>
            </h1>
            <p className="mt-8 max-w-2xl text-neutral-400 text-base md:text-lg leading-relaxed font-light">{slides[currentIndex].subtitle}</p>
            <div className="mt-12 flex flex-wrap gap-5">
              <Link to={slides[currentIndex].ctaPrimary.to} className="px-8 py-4 bg-[#bb9457] text-black font-semibold uppercase tracking-[0.2em] text-[11px] rounded-sm hover:bg-white hover:text-black transition-all duration-300 transform hover:-translate-y-0.5">{slides[currentIndex].ctaPrimary.label}</Link>
              <Link to={slides[currentIndex].ctaSecondary.to} className="px-8 py-4 border border-white/20 text-white font-semibold uppercase tracking-[0.2em] text-[11px] rounded-sm hover:border-[#bb9457] hover:text-[#bb9457] transition-all duration-300 backdrop-blur-sm">{slides[currentIndex].ctaSecondary.label}</Link>
            </div>
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
          {/* Slide Indicators */}
          <div className="absolute bottom-16 left-1/2 -translate-x-1/2 flex gap-3">
            {slides.map((_, idx) => (<button key={idx} onClick={() => setCurrentIndex(idx)} className={`h-0.5 transition-all duration-500 ${idx === currentIndex ? 'w-12 bg-[#bb9457]' : 'w-6 bg-white/30 hover:bg-white/50'}`} aria-label={`Go to slide ${idx + 1}`} />))}
          </div>
          {/* Scroll Cue */}
          <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-neutral-600">
            <div className="w-px h-8 bg-gradient-to-b from-[#bb9457]/40 to-transparent" />
          </div>
        </div>
      </section>

      {/* ====== SECTION 2: WHAT IS ADORZIA? ====== */}
      <section id="what-is-adorzia" ref={setSectionRef('what-is-adorzia')} className="bg-white text-black py-32 relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="grid lg:grid-cols-12 gap-16 items-center">
            <div className={`lg:col-span-7 space-y-8 transition-all duration-1000 ${isVisible['what-is-adorzia'] ? 'animate-fade-in-left' : 'opacity-0 translate-x-[-60px]'}`}>
              <div className="flex items-center gap-4">
                <span className="font-mono text-[10px] uppercase tracking-[0.3em] text-neutral-400 font-bold">01</span>
                <span className="w-8 h-px bg-neutral-300" />
                <span className="text-[10px] uppercase tracking-[0.3em] text-neutral-400 font-mono font-semibold">What Is Adorzia?</span>
              </div>
              <h2 className="font-serif text-4xl md:text-6xl text-neutral-900 font-normal tracking-tight leading-[1.15]">
                Pakistan is not emerging. It has <span className="text-gradient italic font-light">always been here.</span>
              </h2>
              <div className="space-y-6 text-neutral-500 font-light text-base md:text-lg leading-relaxed max-w-xl">
                <p>For generations, this landscape has birthed master weavers, meticulous artisans, and designers capable of dressing the world. The missing variable was never talent. It was infrastructure. It was capital. It was a global stage.</p>
                <p className="font-serif text-xl md:text-2xl text-neutral-900 leading-relaxed border-l-2 border-[#bb9457] pl-6">Adorzia is that architecture.</p>
                <p>We are establishing the definitive ecosystem for fashion entrepreneurship in Pakistan — physical studios, a curated digital marketplace, and an annual vanguard event to discover, fund, and scale independent labels.</p>
              </div>
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-neutral-200 bg-neutral-50">
                <span className="w-1.5 h-1.5 bg-[#bb9457] rounded-full" />
                <span className="text-[10px] uppercase tracking-[0.2em] text-neutral-500 font-mono">Since 2025</span>
              </div>
            </div>
            <div className={`lg:col-span-5 relative group overflow-hidden rounded-sm bg-neutral-100 border border-neutral-200 transition-all duration-1000 delay-300 ${isVisible['what-is-adorzia'] ? 'animate-fade-in-right' : 'opacity-0 translate-x-[60px]'}`}>
              <img src={hero1} alt="Adorzia Ecosystem" className="w-full aspect-[4/5] object-cover scale-110 filter grayscale contrast-125 group-hover:grayscale-0 group-hover:scale-115 transition-all duration-[1.5s] ease-out" loading="lazy" decoding="async" />
              <div className="absolute bottom-6 left-6 z-20 text-white font-mono text-[10px] tracking-widest uppercase glass px-4 py-2">The Ecosystem</div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Strip */}
      <section className="bg-neutral-950 py-12 border-y border-neutral-800">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="flex items-center justify-center gap-4 mb-8">
            <span className="font-mono text-[10px] uppercase tracking-[0.3em] text-neutral-400 font-bold">02</span>
            <span className="w-8 h-px bg-neutral-700" />
            <span className="text-[10px] uppercase tracking-[0.3em] text-[#bb9457] font-mono font-semibold">By the Numbers</span>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {[{ number: "3", label: "Cities" }, { number: "100+", label: "Designers Targeted" }, { number: "1", label: "National Platform" }, { number: "500+", label: "Years of Craft Heritage" }].map((s, i) => (
              <div key={i} className="text-center">
                <div className="font-serif text-3xl md:text-4xl text-[#bb9457] font-normal tracking-tight">{s.number}</div>
                <div className="text-neutral-400 text-[10px] uppercase tracking-[0.2em] font-mono mt-2">{s.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ====== SECTION 3: OUR ECOSYSTEM ====== */}
      <section id="ecosystem" ref={setSectionRef('ecosystem')} className="bg-neutral-950 text-white py-32 relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_bottom_right,rgba(187,148,87,0.06),transparent_50%)] pointer-events-none" />
        <div className="max-w-7xl mx-auto px-6 lg:px-8 relative z-10">
          <div className={`max-w-3xl mb-20 transition-all duration-1000 ${isVisible['ecosystem'] ? 'animate-fade-in-up' : 'opacity-0 translate-y-[60px]'}`}>
            <div className="flex items-center gap-4 mb-3">
              <span className="font-mono text-[10px] uppercase tracking-[0.3em] text-neutral-500 font-bold">03</span>
              <span className="w-8 h-px bg-neutral-700" />
              <span className="text-[10px] uppercase tracking-[0.3em] text-[#bb9457] font-mono font-semibold">Our Ecosystem</span>
            </div>
            <h2 className="font-serif text-4xl md:text-5xl text-white font-normal tracking-tight">Three modules. One synchronized <span className="text-gradient italic font-light">system.</span></h2>
            <p className="mt-6 text-neutral-400 text-base md:text-lg font-light leading-relaxed max-w-2xl">Designers, brands, manufacturers, artisans, institutions & partners — connected through unified infrastructure.</p>
          </div>
          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {[
              { title: "Coworking Fashion Studios", image: islamabadStudio, body: "Premium environments engineered for fashion professionals. Industrial-grade machinery, pattern-cutting tables, and a high-caliber network across three cities.", link: "/fashionpreneurship", linkText: "Explore Studios" },
              { title: "The Marketplace", image: heritageCraft, body: "A curated digital platform connecting independent designers and master artisans directly with international collectors. We archive provenance.", link: "/marketplace", linkText: "Enter Marketplace" },
              { title: "Spotlight — Annual Event", image: hero2, body: "Our signature talent discovery event. We identify fashion entrepreneurs with distinct creative direction and commercial viability — then invest in their vision.", link: "/contact", linkText: "Learn More" }
            ].map((pillar, idx) => (
              <div key={idx} className={`group relative overflow-hidden rounded-sm transition-all duration-1000 ${isVisible['ecosystem'] ? 'animate-fade-in-up' : 'opacity-0 translate-y-[60px]'}`} style={{ transitionDelay: `${idx * 200}ms` }}>
                <div className="absolute inset-0">
                  <img src={pillar.image} alt={pillar.title} className="w-full h-full object-cover scale-110 filter grayscale brightness-50 group-hover:scale-120 group-hover:brightness-75 transition-all duration-700" loading="lazy" decoding="async" />
                  <div className="absolute inset-0 bg-gradient-to-t from-neutral-950 via-neutral-950/80 to-transparent" />
                </div>
                <div className="relative z-10 glass min-h-[400px] p-8 flex flex-col justify-between border border-transparent group-hover:border-[#bb9457]/30 transition-all duration-500">
                  <div>
                    <div className="w-12 h-0.5 bg-[#bb9457] mb-6 group-hover:w-20 transition-all duration-500" />
                    <h3 className="font-serif text-xl text-white font-normal group-hover:text-[#bb9457] transition-colors mb-4">{pillar.title}</h3>
                    <p className="text-sm text-neutral-300 font-light leading-relaxed mb-6">{pillar.body}</p>
                  </div>
                  <Link to={pillar.link} className="inline-flex items-center gap-2 text-[#bb9457] text-xs uppercase tracking-[0.2em] font-semibold group-hover:gap-3 transition-all duration-300">{pillar.linkText}<span className="transform group-hover:translate-x-1 transition-transform duration-300">→</span></Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ====== SECTION 4: FOR DESIGNERS (LIGHT) ====== */}
      <section id="for-designers" ref={setSectionRef('for-designers')} className="bg-white text-black py-32 relative overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-[#bb9457]/20 to-transparent" />
        <div className="max-w-7xl mx-auto px-6 lg:px-8 relative z-10">
          <div className={`max-w-3xl mb-16 transition-all duration-1000 ${isVisible['for-designers'] ? 'animate-fade-in-left' : 'opacity-0 translate-x-[-60px]'}`}>
            <div className="flex items-center gap-4 mb-3">
              <span className="font-mono text-[10px] uppercase tracking-[0.3em] text-neutral-400 font-bold">04</span>
              <span className="w-8 h-px bg-neutral-300" />
              <span className="text-[10px] uppercase tracking-[0.3em] text-neutral-400 font-mono font-semibold">For Designers</span>
            </div>
            <h2 className="font-serif text-4xl md:text-5xl text-neutral-900 font-normal tracking-tight">The designers we are <span className="text-gradient italic font-light">looking for.</span></h2>
            <p className="mt-6 text-neutral-500 text-base md:text-lg leading-relaxed font-light">We are not searching for perfection. We are searching for vision. These categories will define Pakistan's next fashion era.</p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
            {[
              { category: "Contemporary Womenswear", description: "Modern silhouettes rooted in Pakistani sensibility.", image: designer1 },
              { category: "Streetwear", description: "Urban narratives from Karachi, Lahore, Islamabad.", image: designer2 },
              { category: "Heritage Fashion", description: "Traditional craft reimagined for contemporary audiences.", image: designer3 },
              { category: "Fabric Innovation", description: "Sustainable materials, experimental techniques.", image: fabricInnovation }
            ].map((d, idx) => (
              <div key={idx} className={`group aspect-[3/4] overflow-hidden rounded-sm bg-neutral-50 border border-neutral-200 hover:border-[#bb9457]/50 transition-all duration-700 hover-lift ${isVisible['for-designers'] ? 'animate-fade-in-up' : 'opacity-0 translate-y-[60px]'}`} style={{ transitionDelay: `${idx * 100}ms` }}>
                <div className="relative w-full h-full">
                  <img src={d.image} alt={d.category} className="w-full h-full object-cover scale-105 group-hover:scale-110 transition-transform duration-700" loading="lazy" decoding="async" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent" />
                  <div className="absolute bottom-0 left-0 right-0 p-5 z-10">
                    <div className="text-white font-serif text-lg mb-1">{d.category}</div>
                    <div className="text-neutral-300 text-xs font-light leading-relaxed opacity-0 group-hover:opacity-100 transition-opacity duration-500">{d.description}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
          <div className={`mt-16 text-center transition-all duration-1000 delay-500 ${isVisible['for-designers'] ? 'animate-fade-in-up' : 'opacity-0 translate-y-[40px]'}`}>
            <Link to="/contact" className="px-8 py-4 bg-[#bb9457] text-black font-semibold uppercase tracking-[0.2em] text-[11px] rounded-sm hover:bg-neutral-900 hover:text-white transition-all duration-300 inline-block hover-lift">Apply Now</Link>
          </div>
        </div>
      </section>

      {/* ====== SECTION 5: BRAND INCUBATION ====== */}
      <section id="incubation" ref={setSectionRef('incubation')} className="bg-neutral-50 text-black py-32 relative overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-[#bb9457] to-transparent" />
        <div className="max-w-7xl mx-auto px-6 lg:px-8 relative z-10">
          <div className={`text-center max-w-3xl mx-auto mb-20 transition-all duration-1000 ${isVisible['incubation'] ? 'animate-fade-in-up' : 'opacity-0 translate-y-[60px]'}`}>
            <div className="flex items-center justify-center gap-4 mb-3">
              <span className="font-mono text-[10px] uppercase tracking-[0.3em] text-neutral-400 font-bold">05</span>
              <span className="w-8 h-px bg-neutral-300" />
              <span className="text-[10px] uppercase tracking-[0.3em] text-neutral-400 font-mono font-semibold">Brand Incubation</span>
            </div>
            <h2 className="font-serif text-4xl md:text-5xl text-neutral-900 font-normal tracking-tight">Future studio <span className="text-gradient italic font-light">locations.</span></h2>
            <p className="mt-6 text-neutral-500 text-base md:text-lg font-light leading-relaxed">Premium coworking spaces engineered for fashion professionals. Three cities, one ecosystem.</p>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              { city: "Karachi", subtitle: "Pakistan's Fashion Business District", description: "A high-performance workspace for ambitious fashion founders and creative teams.", features: ["Designer coworking studio", "Sewing & cutting atelier", "Photography studio", "Material library", "Collaboration spaces"], image: karachiStudio },
              { city: "Lahore", subtitle: "Where Craft Inspires Contemporary", description: "Created for designers who value craftsmanship and thoughtful design.", features: ["Designer coworking studio", "Sewing & cutting atelier", "Photography studio", "Material library", "Collaboration spaces"], image: lahoreStudio },
              { city: "Islamabad", subtitle: "Designed for Fashion's Next Generation", description: "A modern creative campus where emerging brands transform ideas into collections.", features: ["Designer coworking studio", "Sewing & cutting atelier", "Photography studio", "Material library", "Collaboration spaces"], image: islamabadStudio }
            ].map((studio, idx) => (
              <div key={studio.city} className={`group overflow-hidden rounded-sm bg-white border border-neutral-200 hover:border-[#bb9457]/50 transition-all duration-1000 hover-lift hover:shadow-xl ${isVisible['incubation'] ? 'animate-fade-in-up' : 'opacity-0 translate-y-[60px]'}`} style={{ transitionDelay: `${idx * 200}ms` }}>
                <div className="aspect-[4/3] overflow-hidden relative">
                  <img src={studio.image} alt={`${studio.city} Studio`} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" loading="lazy" decoding="async" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />
                  <div className="absolute top-4 left-4 glass px-4 py-2 rounded-sm"><div className="flex items-center gap-2"><span className="w-2 h-2 rounded-full bg-[#bb9457]" /><span className="text-[9px] uppercase tracking-[0.2em] text-white font-mono font-semibold">Launching Soon</span></div></div>
                  <div className="absolute bottom-0 left-0 right-0 p-6"><h3 className="font-serif text-3xl text-white mb-1">{studio.city}</h3><p className="text-white/70 text-xs font-light uppercase tracking-wider">{studio.subtitle}</p></div>
                </div>
                <div className="p-6">
                  <p className="text-neutral-600 text-sm font-light leading-relaxed mb-5">{studio.description}</p>
                  <div className="space-y-2.5 mb-6">
                    {studio.features.map((f, i) => (<div key={i} className="flex items-center gap-3"><svg className="w-4 h-4 text-[#bb9457] flex-shrink-0" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" /></svg><span className="text-neutral-600 text-sm font-light">{f}</span></div>))}
                  </div>
                  <Link to="/fashionpreneurship" className="w-full px-6 py-3 border border-[#bb9457] text-[#bb9457] font-semibold uppercase tracking-[0.15em] text-[10px] rounded-sm hover:bg-[#bb9457] hover:text-black transition-all duration-300 block text-center">Reserve Your Spot</Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ====== SECTION 6: HOW IT WORKS (MERGED) ====== */}
      <section id="how-it-works" ref={setSectionRef('how-it-works')} className="bg-black text-white py-32 relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(187,148,87,0.06),transparent_50%)] pointer-events-none" />
        <div className="max-w-7xl mx-auto px-6 lg:px-8 relative z-10">
          <div className={`text-center max-w-3xl mx-auto mb-20 transition-all duration-1000 ${isVisible['how-it-works'] ? 'animate-fade-in-up' : 'opacity-0 translate-y-[60px]'}`}>
            <div className="flex items-center justify-center gap-4 mb-3">
              <span className="font-mono text-[10px] uppercase tracking-[0.3em] text-neutral-500 font-bold">06</span>
              <span className="w-8 h-px bg-neutral-700" />
              <span className="text-[10px] uppercase tracking-[0.3em] text-[#bb9457] font-mono font-semibold">How It Works</span>
            </div>
            <h2 className="font-serif text-4xl md:text-5xl text-white font-normal tracking-tight">From application to international <span className="text-gradient italic font-light">scale.</span></h2>
            <p className="mt-6 text-neutral-400 text-base md:text-lg font-light leading-relaxed">A clear path built for fashion entrepreneurs. Six steps from concept to global brand.</p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-px bg-neutral-800">
            {[
              { step: "01", title: "Apply", description: "Submit your portfolio and brand vision. Tell us about your design philosophy and growth goals." },
              { step: "02", title: "Get Access", description: "Unlock premium studio spaces in your city. Access shared resources and a curated creative community." },
              { step: "03", title: "Build Your Collection", description: "Develop, prototype, and produce your collection with mentorship and industry guidance." },
              { step: "04", title: "Sell Through Marketplace", description: "List on our curated marketplace. Connect with international buyers who value Pakistani craftsmanship." },
              { step: "05", title: "Apply For Spotlight", description: "Submit your best work for annual Spotlight. Selected designers receive funding and global exposure." },
              { step: "06", title: "Scale Your Brand", description: "With infrastructure, marketplace access, and Spotlight backing, scale from local to international." }
            ].map((item, idx) => (
              <div key={item.step} className={`bg-black p-10 hover:bg-neutral-900/50 transition-all duration-700 group ${isVisible['how-it-works'] ? 'animate-fade-in-up' : 'opacity-0 translate-y-[40px]'}`} style={{ transitionDelay: `${idx * 100}ms` }}>
                <div className="font-serif text-4xl text-gradient font-light mb-4">{item.step}</div>
                <h3 className="font-serif text-xl text-white font-normal mb-3 group-hover:text-[#bb9457] transition-colors">{item.title}</h3>
                <p className="text-neutral-400 text-sm font-light leading-relaxed">{item.description}</p>
              </div>
            ))}
          </div>
          <div className={`mt-16 text-center transition-all duration-1000 delay-700 ${isVisible['how-it-works'] ? 'animate-fade-in-up' : 'opacity-0 translate-y-[40px]'}`}>
            <Link to="/designer/auth" className="px-8 py-4 bg-[#bb9457] text-black font-semibold uppercase tracking-[0.20em] text-[11px] rounded-sm hover:bg-white hover:text-black transition-all duration-300 inline-block hover-lift">Begin Your Journey</Link>
          </div>
        </div>
      </section>

      {/* ====== SECTION 7: FEATURED DESIGNERS + COLLECTIONS ====== */}
      <section id="featured" ref={setSectionRef('featured')} className="relative bg-gradient-to-b from-neutral-950 via-black to-neutral-950 text-white py-32 overflow-hidden">
        {/* Animated background elements */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-0 left-1/4 w-96 h-96 bg-[#bb9457]/5 rounded-full blur-3xl animate-pulse" />
          <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-[#bb9457]/5 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '2s' }} />
        </div>
        <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-[#bb9457]/30 to-transparent" />
        
        <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-8">
          {/* Header */}
          <div className={`text-center max-w-4xl mx-auto mb-20 transition-all duration-1000 ${isVisible['featured'] ? 'animate-fade-in-up' : 'opacity-0 translate-y-[60px]'}`}>
            <div className="inline-flex items-center gap-3 mb-6 px-5 py-2 rounded-full glass">
              <span className="w-2 h-2 bg-[#bb9457] rounded-full animate-pulse" />
              <span className="font-mono text-[10px] uppercase tracking-[0.3em] text-[#bb9457] font-bold">07 — Featured Talent</span>
            </div>
            <h2 className="font-serif text-5xl md:text-7xl lg:text-8xl font-normal tracking-tight text-white leading-[0.9] mb-6">
              Discover the <span className="text-gradient italic font-light">visionaries.</span>
            </h2>
            <p className="text-lg text-neutral-400 leading-relaxed max-w-2xl mx-auto font-light">Explore Pakistan's most promising emerging fashion designers and their groundbreaking collections.</p>
          </div>

          {/* Tab Toggle - Enhanced */}
          <div className={`flex justify-center mb-16 transition-all duration-1000 delay-200 ${isVisible['featured'] ? 'animate-fade-in-up' : 'opacity-0 translate-y-[40px]'}`}>
            <div className="flex gap-2 p-1.5 bg-neutral-900/80 backdrop-blur-xl rounded-full border border-neutral-800">
              <button onClick={() => setActiveTab('designers')} className={`px-8 py-3 text-xs uppercase tracking-[0.2em] font-bold rounded-full transition-all duration-500 ${activeTab === 'designers' ? 'bg-gradient-to-r from-[#bb9457] to-[#d4af37] text-black shadow-lg shadow-[#bb9457]/20' : 'text-neutral-400 hover:text-white'}`}>Designers</button>
              <button onClick={() => setActiveTab('collections')} className={`px-8 py-3 text-xs uppercase tracking-[0.2em] font-bold rounded-full transition-all duration-500 ${activeTab === 'collections' ? 'bg-gradient-to-r from-[#bb9457] to-[#d4af37] text-black shadow-lg shadow-[#bb9457]/20' : 'text-neutral-400 hover:text-white'}`}>Collections</button>
            </div>
          </div>

          {/* Designers Grid - Enhanced */}
          {activeTab === 'designers' && (
            <div className={`transition-all duration-1000 delay-300 ${isVisible['featured'] ? 'animate-fade-in-up' : 'opacity-0 translate-y-[60px]'}`}>
              {designersLoading ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">{[1,2,3,4,5,6].map((i) => (<div key={i} className="animate-pulse"><div className="aspect-[3/4] bg-neutral-800/50 rounded-lg" /></div>))}</div>
              ) : designers.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {designers.map((designer, idx) => (
                    <Link key={designer.id} to={`/designers/${designer.slug}`} className="group relative aspect-[3/4] overflow-hidden rounded-lg bg-neutral-900 border border-neutral-800 hover:border-[#bb9457]/50 transition-all duration-700 hover-lift" style={{ animationDelay: `${idx * 100}ms` }}>
                      <img src={designer.image_url || designer.cover_image_url} alt={designer.name} className="w-full h-full object-cover transition-all duration-700 group-hover:scale-110" loading="lazy" decoding="async" />
                      <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent opacity-60 group-hover:opacity-90 transition-all duration-500" />
                      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(187,148,87,0),rgba(187,148,87,0.2))] opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
                      <div className="absolute bottom-0 left-0 right-0 p-6 translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
                        <div className="w-12 h-0.5 bg-[#bb9457] mb-4 scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left" />
                        <p className="text-sm uppercase tracking-[0.2em] font-bold text-white mb-1">{designer.name}</p>
                        <p className="text-xs text-neutral-300 font-light">{designer.specialization}</p>
                        {designer.location && (
                          <div className="flex items-center gap-1 mt-2">
                            <svg className="w-3 h-3 text-[#bb9457]/70" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z" /></svg>
                            <span className="text-[10px] text-neutral-400 font-light tracking-wide">{designer.location}</span>
                          </div>
                        )}
                      </div>
                      <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                        <div className="w-10 h-10 rounded-full glass flex items-center justify-center">
                          <span className="text-[#bb9457] text-lg">→</span>
                        </div>
                      </div>
                    </Link>
                  ))}
                </div>
              ) : null}
            </div>
          )}

          {/* Collections Grid - Enhanced */}
          {activeTab === 'collections' && (
            <div className={`transition-all duration-1000 delay-300 ${isVisible['featured'] ? 'animate-fade-in-up' : 'opacity-0 translate-y-[60px]'}`}>
              {collectionsLoading ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">{[1,2,3,4,5,6].map((i) => (<div key={i} className="animate-pulse"><div className="aspect-[3/4] bg-neutral-800/50 rounded-lg" /></div>))}</div>
              ) : collections.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {collections.map((collection, idx) => (
                    <Link key={collection.id} to={`/designers/${collection.designers?.slug}`} className="group relative aspect-[3/4] overflow-hidden rounded-lg bg-neutral-900 border border-neutral-800 hover:border-[#bb9457]/50 transition-all duration-700 hover-lift" style={{ animationDelay: `${idx * 100}ms` }}>
                      <img src={collection.cover_image_url || collection.images?.[0]} alt={collection.title} className="w-full h-full object-cover transition-all duration-700 group-hover:scale-110" loading="lazy" decoding="async" />
                      <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent opacity-60 group-hover:opacity-90 transition-all duration-500" />
                      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(187,148,87,0),rgba(187,148,87,0.2))] opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
                      <div className="absolute bottom-0 left-0 right-0 p-6 translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
                        <div className="w-12 h-0.5 bg-[#bb9457] mb-4 scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left" />
                        <p className="text-sm uppercase tracking-[0.2em] font-bold text-white mb-1">{collection.title}</p>
                        <p className="text-xs text-neutral-300 font-light">{collection.designers?.name}</p>
                      </div>
                      <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                        <div className="w-10 h-10 rounded-full glass flex items-center justify-center">
                          <span className="text-[#bb9457] text-lg">→</span>
                        </div>
                      </div>
                    </Link>
                  ))}
                </div>
              ) : null}
            </div>
          )}

          {/* CTAs - Enhanced */}
          <div className={`mt-20 pt-12 border-t border-neutral-800/50 grid grid-cols-1 sm:grid-cols-2 gap-6 transition-all duration-1000 delay-500 ${isVisible['featured'] ? 'animate-fade-in-up' : 'opacity-0 translate-y-[40px]'}`}>
            <Link to="/contact" className="group inline-flex items-center justify-center gap-3 text-xs uppercase tracking-[0.25em] font-bold text-white hover:text-[#bb9457] transition-all duration-300 py-4 px-8 rounded-full border border-white/20 hover:border-[#bb9457]/50 hover:shadow-lg hover:shadow-[#bb9457]/10">
              <span>Join as Designer</span>
              <span className="transform group-hover:translate-x-1 transition-transform duration-300">→</span>
            </Link>
            <Link to="/designers" className="group inline-flex items-center justify-center gap-3 text-xs uppercase tracking-[0.25em] font-bold text-white hover:text-[#bb9457] transition-all duration-300 py-4 px-8 rounded-full border border-white/20 hover:border-[#bb9457]/50 hover:shadow-lg hover:shadow-[#bb9457]/10">
              <span>{activeTab === 'designers' ? 'Search More Designers' : 'Search More Collections'}</span>
              <span className="transform group-hover:translate-x-1 transition-transform duration-300">→</span>
            </Link>
          </div>
        </div>
      </section>

      {/* ====== SECTION 8: PARTNERS / NETWORK ====== */}
      <section id="partners" ref={setSectionRef('partners')} className="relative bg-gradient-to-br via-white to-neutral-50 text-black py-32 overflow-hidden">
        {/* Decorative elements */}
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-[#bb9457]/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
        <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-[#bb9457]/5 rounded-full blur-3xl translate-y-1/2 -translate-x-1/2" />
        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-[#bb9457]/30 to-transparent" />
        
        <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-8">
          {/* Header */}
          <div className={`text-center max-w-4xl mx-auto mb-20 transition-all duration-1000 ${isVisible['partners'] ? 'animate-fade-in-up' : 'opacity-0 translate-y-[60px]'}`}>
            <div className="inline-flex items-center gap-3 mb-6 px-5 py-2 rounded-full border border-neutral-200 bg-white/80 backdrop-blur-sm">
              <span className="w-2 h-2 bg-[#bb9457] rounded-full" />
              <span className="font-mono text-[10px] uppercase tracking-[0.3em] text-neutral-600 font-bold">08 — Our Commitments</span>
            </div>
            <h2 className="font-serif text-5xl md:text-7xl text-neutral-900 font-normal tracking-tight mb-6">
              Built on <span className="text-gradient italic font-light">principle.</span>
            </h2>
            <p className="text-xl text-neutral-600 leading-relaxed max-w-2xl mx-auto font-light">Not metrics. Not milestones. Principles that guide every decision we make and every designer we support.</p>
          </div>

          {/* Commitment Cards - Enhanced */}
          <div className="grid md:grid-cols-2 gap-8">
            {[
              { title: "Physical Infrastructure", description: "Premium studios in Karachi, Lahore, and Islamabad where fashion professionals access industrial equipment and collaborative environments.", icon: <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" /></svg> },
              { title: "Designer Funding", description: "Through Spotlight, we identify exceptional talent and provide capital, mentorship, and platform to build sustainable fashion businesses.", icon: <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg> },
              { title: "Global Marketplace", description: "We connect Pakistani designers with international buyers who value heritage craftsmanship and contemporary design.", icon: <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9" /></svg> },
              { title: "Heritage Preservation", description: "We honor centuries of Pakistani craft tradition by giving it modern relevance and commercial viability.", icon: <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" /></svg> }
            ].map((c, idx) => (
              <div key={c.title} className={`group relative p-10 rounded-2xl bg-white border border-neutral-200 hover:border-[#bb9457]/50 transition-all duration-700 hover-lift hover:shadow-2xl overflow-hidden ${isVisible['partners'] ? 'animate-fade-in-up' : 'opacity-0 translate-y-[60px]'}`} style={{ transitionDelay: `${idx * 150}ms` }}>
                {/* Background gradient on hover */}
                <div className="absolute inset-0 bg-gradient-to-br from-[#bb9457]/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
                
                <div className="relative z-10 flex items-start gap-6">
                  <div className="flex-shrink-0 w-16 h-16 rounded-2xl bg-gradient-to-br from-[#bb9457]/10 to-[#bb9457]/5 flex items-center justify-center text-[#bb9457] group-hover:scale-110 transition-transform duration-500">
                    {c.icon}
                  </div>
                  <div className="flex-1">
                    <h3 className="font-serif text-2xl text-neutral-900 font-normal mb-4 group-hover:text-[#bb9457] transition-colors duration-300">{c.title}</h3>
                    <p className="text-neutral-600 text-base font-light leading-relaxed">{c.description}</p>
                  </div>
                </div>
                
                {/* Decorative corner accent */}
                <div className="absolute top-0 right-0 w-20 h-20 bg-gradient-to-bl from-[#bb9457]/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ====== SECTION 9: NEWSLETTER + CTA ====== */}
      <section id="newsletter" ref={setSectionRef('newsletter')} className="relative py-40 overflow-hidden">
        {/* Cinematic background */}
        <div className="absolute inset-0">
          <img src={heroRunwayCta} alt="" aria-hidden="true" className="w-full h-full object-cover scale-110" style={{ transform: `translate3d(0, ${scrollY * 0.1}px, 0)` }} loading="lazy" decoding="async" />
          <div className="absolute inset-0 bg-black/85" />
          <div className="absolute inset-0 bg-gradient-to-r from-black via-black/80 to-black/60" />
          <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-black/50" />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(187,148,87,0.15),transparent_60%)]" />
        </div>

        {/* Animated particles */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-[#bb9457]/10 rounded-full blur-3xl animate-pulse" />
          <div className="absolute bottom-1/4 right-1/4 w-64 h-64 bg-[#bb9457]/10 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '3s' }} />
        </div>

        <div className={`relative z-10 max-w-5xl mx-auto px-6 text-center space-y-12 transition-all duration-1000 ${isVisible['newsletter'] ? 'animate-fade-in-up' : 'opacity-0 translate-y-[60px]'}`}>
          {/* Badge */}
          <div className="inline-flex items-center gap-3 px-6 py-3 rounded-full glass">
            <span className="w-2 h-2 bg-[#bb9457] rounded-full animate-pulse" />
            <span className="text-[10px] uppercase tracking-[0.3em] text-[#bb9457] font-mono font-bold">09 — Join The Movement</span>
          </div>

          {/* Headline */}
          <h2 className="font-serif text-5xl md:text-7xl lg:text-8xl text-white font-normal tracking-tight leading-[1.05]">
            Your vision deserves a <span className="text-gradient italic font-light">global stage.</span>
          </h2>
          
          {/* Subtitle */}
          <p className="text-xl text-neutral-300 max-w-3xl mx-auto font-light leading-relaxed">
            From concept to collection. From local craft to international acclaim. Adorzia is the bridge between where you are and where you belong.
          </p>

          {/* Newsletter Form - Enhanced */}
          <div className="max-w-2xl mx-auto">
            <form onSubmit={handleNewsletterSubmit} className="flex flex-col sm:flex-row gap-4 p-2 rounded-2xl glass">
              <input 
                type="email" 
                required 
                value={email} 
                onChange={(e) => setEmail(e.target.value)} 
                placeholder="your email address" 
                className="flex-1 px-8 py-5 bg-black/50 backdrop-blur-xl text-white text-base placeholder-neutral-500 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#bb9457]/50 transition-all duration-300 border border-white/10"
              />
              <button 
                type="submit" 
                disabled={submitting} 
                className="px-10 py-5 bg-gradient-to-r from-[#bb9457] to-[#d4af37] text-black font-bold uppercase tracking-[0.2em] text-xs rounded-xl hover:shadow-2xl hover:shadow-[#bb9457]/30 transition-all duration-300 disabled:opacity-50 whitespace-nowrap transform hover:-translate-y-0.5"
              >
                {submitting ? '...' : 'Join Now'}
              </button>
            </form>
            {subscribed && <p className="text-[#bb9457] text-base font-light mt-6 animate-fade-in-up">✓ You are on the list.</p>}
            <p className="text-neutral-500 text-xs font-light tracking-wide mt-4">Priority access to studio openings, Spotlight timelines, and marketplace drops.</p>
          </div>

          {/* CTA Buttons - Enhanced */}
          <div className="flex flex-wrap justify-center gap-6 pt-8">
            <Link to="/fashionpreneurship" className="group px-10 py-5 bg-gradient-to-r from-[#bb9457] to-[#d4af37] text-black font-bold uppercase tracking-[0.25em] text-xs rounded-xl hover:shadow-2xl hover:shadow-[#bb9457]/30 transition-all duration-300 transform hover:-translate-y-1">
              <span className="flex items-center gap-3">
                Start Your Journey
                <span className="transform group-hover:translate-x-1 transition-transform duration-300">→</span>
              </span>
            </Link>
            <Link to="/contact" className="px-10 py-5 glass text-white font-bold uppercase tracking-[0.25em] text-xs rounded-xl hover:border-[#bb9457]/50 hover:text-[#bb9457] transition-all duration-300 backdrop-blur-xl">
              Get in Touch
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}

export default Home
