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
import trophy from '../assets/home-spotlight-trophy.webp'
import fabricInnovation from '../assets/home-fabric-innovation.webp'
import newsletterStudio from '../assets/home-newsletter-studio.webp'
import karachiStudio from '../assets/karachi-coworking-fashion-studio.webp'
import lahoreStudio from '../assets/lahore-coworking-fashion-studio.webp'
import islamabadStudio from '../assets/Islamabad-coworking-fashion-studio.webp'
import ajrakCoat from '../assets/ajrak-architect-coat-adorzia1.webp'
import phulkariBlazer from '../assets/phulkari-reborn-blazer-adorzia.webp'
import rilliTote from '../assets/rilli-sculpt-tote-adorzia.webp'
import khaddarSuit from '../assets/khaddar-modern-suit-adorzia.webp'
import mirrorworkBomber from '../assets/mirrorwork-bomber-jacket-adorzia.webp'
import mirrorRebelTee from '../assets/mirror-rebel-tee-adorzia.webp'


const Home = () => {
  const [scrollY, setScrollY] = useState(0)
  const [isVisible, setIsVisible] = useState<Record<string, boolean>>({})
  const [email, setEmail] = useState('')
  const [subscribed, setSubscribed] = useState(false)
  const [submitting, setSubmitting] = useState(false)
  const sectionRefs = useRef<Record<string, HTMLDivElement | null>>({})

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY)
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  // Preload hero images when component mounts
  useEffect(() => {
    const preloadImages = [hero1, hero2]
    preloadImages.forEach((src) => {
      const link = document.createElement('link')
      link.rel = 'preload'
      link.as = 'image'
      link.href = src
      document.head.appendChild(link)
    })
    
    return () => {
      preloadImages.forEach((src) => {
        const existingLink = document.querySelector(`link[href="${src}"]`)
        if (existingLink) document.head.removeChild(existingLink)
      })
    }
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

  const handleNewsletterSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setSubmitting(true)

    try {
      const { supabase } = await import('../lib/supabase')
      
      const { error } = await supabase
        .from('newsletter_subscriptions')
        .insert([{ email }])

      if (error) {
        if (error.code === '23505') {
          alert('This email is already subscribed.')
        } else {
          throw error
        }
      } else {
        setSubscribed(true)
        setEmail('')
      }
    } catch (err) {
      console.error('Error subscribing:', err)
      alert('Failed to subscribe. Please try again.')
    } finally {
      setSubmitting(false)
    }
  }
  const slides = [
    {
      image: hero1,
      eyebrow: 'Pakistan\'s First Fashion Ecosystem',
      title: 'Where Designers Become Fashionpreneurs',
      subtitle: 'Adorzia is Pakistan\'s first complete fashion entrepreneurship ecosystem. We provide premium coworking studios in Karachi, Lahore & Islamabad, a curated global marketplace for emerging designers, and the annual Spotlight event that discovers and invests in Pakistan\'s next great fashion brands. For designers, artisans, and fashion innovators ready to scale.',
      ctaPrimary: { label: 'Reserve Your Studio Spot', to: '/for-creatives' },
      ctaSecondary: { label: 'Explore Locations', to: '/contact' },
    },
    {
      image: hero2,
      eyebrow: 'Spotlight - Fall 2026',
      title: 'Pakistan\'s Premier Talent Investment Program',
      subtitle: 'Once a year, Adorzia scours every province, every city, and every subculture to identify the singular visionary ready to redefine Pakistani fashion on a global scale. Selected designers receive funding, mentorship, and a platform to launch their brand internationally.',
      ctaPrimary: { label: 'Apply for Spotlight 2026', to: '/spotlight-event' },
      ctaSecondary: { label: 'Discover the Event', to: '/spotlight-event' },
    },
    {
      image: hero3,
      eyebrow: 'The Marketplace',
      title: 'From heritage craft to global curation.',
      subtitle: 'A structured, high-end marketplace connecting independent designers and master craftspeople with international buyers. We bridge Pakistani heritage craftsmanship with global demand, creating sustainable income streams for local artisans and brands.',
      ctaPrimary: { label: 'List Your Collection', to: '/for-partners' },
      ctaSecondary: { label: 'Enter the Marketplace', to: '/for-creatives' },
    }
  ]

  const [currentIndex, setCurrentIndex] = useState(0)

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % slides.length)
    }, 7000)
    return () => clearInterval(timer)
  }, [slides.length])

  return (
    <div className="min-h-screen bg-black text-neutral-100 selection:bg-[#bb9457] selection:text-black font-sans antialiased overflow-x-hidden">
      <SEO
        title="Adorzia - Where Visionaries Rise | Pakistani Fashion Ecosystem"
        description="Adorzia is Pakistan's first fashion entrepreneurship ecosystem - coworking studios in Lahore, Islamabad and Karachi, a curated marketplace for emerging designers and heritage craft, and the annual Spotlight event that discovers and invests in Pakistan's next great fashion brands. Applications now open until July 31 2026."
        canonicalURL="https://adorzia.com"
        ogTitle="Adorzia - Where Visionaries Rise"
        ogDescription="Pakistan's first complete fashion entrepreneurship ecosystem. Studios. Marketplace. Spotlight."
        ogImageAlt="Adorzia - Pakistani fashion ecosystem hero image"
        schemaType="Organization"
        schema={{
          "@context": "https://schema.org",
          "@type": "Organization",
          "name": "Adorzia",
          "description": "Fashion entrepreneurship ecosystem based in Pakistan offering coworking studios, a curated designer marketplace, and the annual Spotlight talent investment event.",
          "url": "https://adorzia.com",
          "foundingDate": "2025",
          "areaServed": "Pakistan",
          "knowsAbout": ["Pakistani Fashion", "Fashion Entrepreneurship", "Heritage Craft", "Fashion Marketplace"]
        }}
        keywords="Pakistani fashion, Fashion Pakistan, Pakistan designer, Heritage craft Pakistan, Fashion marketplace Pakistan, Pakistani clothing, Pakistani textile, Fashion studio Pakistan, Fashion designer Lahore, Fashion designer Karachi, Fashion designer Islamabad, Pakistani fashion brand, Handmade Pakistan, Craft Pakistan, Pakistani embroidery, Traditional Pakistani clothing, Contemporary Pakistani fashion, Fashion event Pakistan, Emerging designer Pakistan, Fashion entrepreneurship, Adorzia, Adorzia fashion, Adorzia marketplace, Adorzia studios, Adorzia Spotlight"
      />
      
      {/* Dynamic Injection of Luxury Custom Animations */}
      <style>{`
        @keyframes fadeInUp {
          from { opacity: 0; transform: translateY(40px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes fadeInLeft {
          from { opacity: 0; transform: translateX(-40px); }
          to { opacity: 1; transform: translateX(0); }
        }
        @keyframes fadeInRight {
          from { opacity: 0; transform: translateX(40px); }
          to { opacity: 1; transform: translateX(0); }
        }
        @keyframes scaleIn {
          from { opacity: 0; transform: scale(0.95); }
          to { opacity: 1; transform: scale(1); }
        }
        @keyframes marqueeLeft {
          from { transform: translateX(0); }
          to { transform: translateX(-50%); }
        }
        .animate-fade-in-up { animation: fadeInUp 0.8s ease-out forwards; }
        .animate-fade-in-left { animation: fadeInLeft 0.8s ease-out forwards; }
        .animate-fade-in-right { animation: fadeInRight 0.8s ease-out forwards; }
        .animate-scale-in { animation: scaleIn 0.6s ease-out forwards; }
        .animate-marquee { animation: marqueeLeft 30s linear infinite; }
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
      `}</style>

      {/* Section 1: Cinematic Full-Bleed Carousel Hero */}
      <section className="relative overflow-hidden border-b border-neutral-900 bg-black min-h-[60vh] sm:min-h-[70vh] md:min-h-screen flex items-center">
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-gradient-to-r from-black via-black/85 to-transparent z-10 sm:bg-gradient-to-r" />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(187,148,87,0.2),transparent_50%)] sm:bg-[radial-gradient(circle_at_top_left,rgba(187,148,87,0.15),transparent_60%)] z-10" />
          <div className="absolute inset-0 bg-gradient-to-t from-neutral-950 via-transparent to-black/60 z-10" />

          {slides.map((slide, index) => (
            <img
              key={index}
              src={slide.image}
              alt=""
              width="1920"
              height="1080"
              fetchPriority={index === 0 ? "high" : "low"}
              loading={index === 0 ? "eager" : "lazy"}
              className={`absolute inset-0 h-full w-full object-cover object-center transition-all duration-[1400ms] cubic-bezier(0.25, 1, 0.5, 1) ${
                index === currentIndex ? 'opacity-50 sm:opacity-45 scale-110' : 'opacity-0 scale-115'
              }`}
              style={{
                transform: `translateY(${scrollY * 0.2}px) scale(${index === currentIndex ? 1.1 : 1.15})`,
                aspectRatio: '16 / 9',
                objectPosition: 'center 30%'
              }}
            />
          ))}
        </div>

        {/* Structural fine alignment vector overlay */}
        <div className="absolute inset-0 opacity-[0.04] pointer-events-none z-10 mix-blend-screen">
          <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <pattern id="grid-architecture" width="120" height="120" patternUnits="userSpaceOnUse">
                <path d="M 60 0 L 120 60 L 60 120 L 0 60 Z" fill="none" stroke="#bb9457" strokeWidth="0.5" />
                <line x1="60" y1="0" x2="60" y2="120" stroke="#bb9457" strokeWidth="0.25" />
                <line x1="0" y1="60" x2="120" y2="60" stroke="#bb9457" strokeWidth="0.25" />
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#grid-architecture)" />
          </svg>
        </div>

        <div className="relative z-20 max-w-7xl mx-auto w-full px-4 sm:px-6 md:px-12 lg:px-8 py-24 sm:py-32">
          <div className="max-w-4xl">
            <div className="inline-flex items-center gap-3 glass px-3 sm:px-4 py-2 rounded-full mb-4 sm:mb-6 transform translate-y-4 animate-fade-in">
              <span className="w-1.5 h-1.5 rounded-full bg-[#bb9457]" />
              <span className="text-[9px] sm:text-[10px] uppercase tracking-[0.25em] sm:tracking-[0.3em] text-neutral-300 font-medium font-mono">
                {slides[currentIndex].eyebrow}
              </span>
            </div>

            <h1 className="font-serif text-3xl sm:text-4xl md:text-6xl lg:text-7xl xl:text-8xl leading-[1.1] sm:leading-[1.05] tracking-tight text-white font-normal transition-all duration-700">
              {slides[currentIndex].title.split(' ').map((word, i) => {
                const clean = word.replace(/[.,]/g, '');
                const target = ['creators', 'Atelier', 'Spotlight', 'global'].includes(clean);
                return (
                  <span key={i} className={target ? 'text-gradient italic font-light block md:inline' : ''}>
                    {word}{' '}
                  </span>
                );
              })}
            </h1>

            <p className="mt-4 sm:mt-6 max-w-2xl text-neutral-400 text-sm sm:text-base md:text-lg leading-relaxed sm:leading-relaxed font-light transition-all duration-700">
              {slides[currentIndex].subtitle}
            </p>

            <div className="mt-8 sm:mt-12 flex flex-col sm:flex-row gap-4 sm:gap-5">
              <Link
                to={slides[currentIndex].ctaPrimary.to}
                className="px-6 sm:px-8 py-3.5 sm:py-4 bg-[#bb9457] text-black font-semibold uppercase tracking-[0.15em] sm:tracking-[0.2em] text-[10px] sm:text-[11px] rounded-sm hover:bg-white hover:text-black transition-all duration-300 transform hover:-translate-y-0.5 text-center"
              >
                {slides[currentIndex].ctaPrimary.label}
              </Link>
              <Link
                to={slides[currentIndex].ctaSecondary.to}
                className="px-6 sm:px-8 py-3.5 sm:py-4 border border-white/20 text-white font-semibold uppercase tracking-[0.15em] sm:tracking-[0.2em] text-[10px] sm:text-[11px] rounded-sm hover:border-[#bb9457] hover:text-[#bb9457] transition-all duration-300 backdrop-blur-sm text-center"
              >
                {slides[currentIndex].ctaSecondary.label}
              </Link>
            </div>
          </div>
        </div>

        {/* Cinematic Slide Indicators */}
        <div className="absolute bottom-8 sm:bottom-12 left-4 sm:left-6 right-4 sm:right-6 z-20 max-w-7xl mx-auto px-2 flex justify-between items-center border-t border-white/10 pt-4 sm:pt-6">
          <div className="flex gap-2 sm:gap-3">
            {slides.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentIndex(index)}
                className={`rounded-full transition-all duration-500 ${
                  index === currentIndex 
                    ? 'w-2.5 h-2.5 sm:w-3 sm:h-3 bg-[#bb9457] shadow-lg shadow-[#bb9457]/30' 
                    : 'w-2 h-2 bg-white/20 hover:bg-white/40 hover:scale-125'
                }`}
              />
            ))}
          </div>
          <span className="font-mono text-[9px] sm:text-[10px] tracking-[0.2em] sm:tracking-[0.25em] text-neutral-500 uppercase">
            System Index // 0{currentIndex + 1}
          </span>
        </div>
      </section>

      {/* Trust Strip - Above Fold Credibility */}
      <section className="bg-neutral-950 border-b border-neutral-900 py-8 sm:py-10 relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(187,148,87,0.03),transparent_70%)] pointer-events-none" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-12 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12 items-center">
            {/* Trust Pillar 1: Geographic Presence */}
            <div className="text-center md:text-left">
              <div className="text-[9px] uppercase tracking-[0.3em] text-neutral-500 font-mono font-semibold mb-2">
                Launching Across
              </div>
              <div className="flex items-center justify-center md:justify-start gap-3">
                <span className="w-1.5 h-1.5 rounded-full bg-[#bb9457]" />
                <span className="text-white text-sm sm:text-base font-light tracking-wide">
                  Karachi <span className="text-neutral-600 mx-1">•</span> Lahore <span className="text-neutral-600 mx-1">•</span> Islamabad
                </span>
              </div>
            </div>

            {/* Trust Pillar 2: Core Offerings */}
            <div className="text-center">
              <div className="text-[9px] uppercase tracking-[0.3em] text-neutral-500 font-mono font-semibold mb-2">
                Ecosystem Pillars
              </div>
              <div className="flex items-center justify-center gap-3">
                <span className="text-white text-sm sm:text-base font-light tracking-wide">
                  Studios <span className="text-neutral-600 mx-1">•</span> Marketplace <span className="text-neutral-600 mx-1">•</span> Spotlight
                </span>
              </div>
            </div>

            {/* Trust Pillar 3: Target Audience */}
            <div className="text-center md:text-right">
              <div className="text-[9px] uppercase tracking-[0.3em] text-neutral-500 font-mono font-semibold mb-2">
                Built For
              </div>
              <div className="text-white text-sm sm:text-base font-light tracking-wide">
                Emerging Fashion Designers
              </div>
            </div>
          </div>

          {/* Divider Line */}
          <div className="mt-8 pt-6 border-t border-neutral-900 text-center">
            <span className="text-[10px] uppercase tracking-[0.25em] text-[#bb9457] font-mono font-semibold">
              Pakistan's First Fashion Entrepreneurship Ecosystem
            </span>
          </div>
        </div>
      </section>

      {/* Section 2: Moving Text Monolith (Cinematic Marquee) */}
      <section className="bg-neutral-950 py-10 border-b border-neutral-900 overflow-hidden relative">
        <div className="absolute left-0 top-0 bottom-0 w-32 bg-gradient-to-r from-neutral-950 to-transparent z-10 pointer-events-none" />
        <div className="absolute right-0 top-0 bottom-0 w-32 bg-gradient-to-l from-neutral-950 to-transparent z-10 pointer-events-none" />
        <div className="flex whitespace-nowrap text-neutral-800 font-serif text-6xl md:text-8xl tracking-tight uppercase font-bold select-none opacity-40">
          <div className="animate-marquee flex gap-16 pr-16">
            <span>Physical Studios</span>
            <span className="text-[#bb9457]/20 italic font-light">Curated Marketplace</span>
            <span>Spotlight Incubator</span>
            <span className="text-[#bb9457]/20 italic font-light">Global Curation</span>
          </div>
          <div className="animate-marquee flex gap-16 pr-16" aria-hidden="true">
            <span>Physical Studios</span>
            <span className="text-[#bb9457]/20 italic font-light">Curated Marketplace</span>
            <span>Spotlight Incubator</span>
            <span className="text-[#bb9457]/20 italic font-light">Global Curation</span>
          </div>
        </div>
      </section>

      {/* Section 3: Brand Manifesto */}
      <section 
        id="manifesto" 
        ref={setSectionRef('manifesto')}
        className="bg-white text-black py-32 relative overflow-hidden"
      >
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="grid lg:grid-cols-12 gap-16 items-center">
            <div className={`lg:col-span-7 space-y-8 transition-all duration-1000 ${isVisible['manifesto'] ? 'animate-fade-in-left' : 'opacity-0 translate-x-[-60px]'}`}>
              <div className="text-[10px] uppercase tracking-[0.3em] text-neutral-400 font-mono font-semibold">
                Brand Manifesto
              </div>
              <h2 className="font-serif text-4xl md:text-6xl text-neutral-900 font-normal tracking-tight leading-[1.15]">
                Pakistan is not emerging. It has <span className="text-gradient italic font-light">always been here.</span>
              </h2>
              <div className="space-y-6 text-neutral-500 font-light text-base md:text-lg leading-relaxed max-w-xl">
                <p>
                  For generations, this landscape has birthed master weavers, meticulous artisans, and designers capable of dressing the world. The missing variable was never talent. It was infrastructure. It was capital. It was a global stage.
                </p>
                <p className="text-neutral-900 font-medium">
                  Adorzia is that architecture.
                </p>
                <p>
                  We are establishing the definitive ecosystem for fashion entrepreneurship in Pakistan. Physical studios where raw concepts materialize into garments; a curated digital marketplace navigating local craft to global doors; and an annual vanguard event designed to discover, fund, and scale independent labels.
                </p>
                <p className="text-[#bb9457] font-semibold">
                  This is not merely a platform. This is a cultural reset.
                </p>
              </div>
            </div>
            <div className={`lg:col-span-5 relative group overflow-hidden rounded-sm bg-neutral-100 border border-neutral-200 transition-all duration-1000 delay-300 ${isVisible['manifesto'] ? 'animate-fade-in-right' : 'opacity-0 translate-x-[60px]'}`}>
              <div className="absolute inset-0 bg-neutral-950/10 group-hover:bg-transparent transition-colors duration-500 z-10" />
              <img 
                src={hero1}
                alt="Editorial Texture" 
                className="w-full aspect-[4/5] object-cover scale-110 filter grayscale contrast-125 group-hover:scale-115 transition-transform duration-[1.5s] ease-out"
               loading="lazy" decoding="async" />
              <div className="absolute bottom-6 left-6 z-20 text-white font-mono text-[10px] tracking-widest uppercase glass-dark px-4 py-2">
                The Cultural Reset
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Section 4: Three Pillars Overview */}
      <section 
        id="pillars" 
        ref={setSectionRef('pillars')}
        className="bg-neutral-950 text-white py-32 border-b border-neutral-900 relative overflow-hidden"
      >
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_bottom_right,rgba(187,148,87,0.06),transparent_50%)] pointer-events-none" />
        
        <div className="max-w-7xl mx-auto px-6 lg:px-8 relative z-10">
          <div className={`max-w-3xl mb-20 transition-all duration-1000 ${isVisible['pillars'] ? 'animate-fade-in-up' : 'opacity-0 translate-y-[60px]'}`}>
            <div className="text-[10px] uppercase tracking-[0.3em] text-[#bb9457] font-mono font-semibold mb-3">
              Ecosystem Architecture
            </div>
            <h2 className="font-serif text-4xl md:text-5xl text-white font-normal tracking-tight">
              Three Pillars. One Unified Platform.
            </h2>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                title: "Fashion Studios",
                body: "Premium, fully equipped co-working environments engineered specifically for fashion professionals and independent designers. Launching in Karachi, Lahore, and Islamabad.",
                link: "/for-creatives",
                linkText: "Explore Studios →",
                image: hero2
              },
              {
                title: "The Marketplace",
                body: "A high-end digital gateway connecting Pakistan's exceptional design talent and heritage artisans directly with discerning global buyers.",
                link: "/for-partners",
                linkText: "Enter Marketplace →",
                image: hero3
              },
              {
                title: "Spotlight",
                body: "Our signature annual incubator designed to identify extraordinary, untapped talent across Pakistan and provide the capital and mentorship to build them into viable brands.",
                link: "/spotlight-event",
                linkText: "Learn About Spotlight →",
                image: hero2
              }
            ].map((pillar, idx) => (
              <div 
                key={pillar.title} 
                className={`group relative overflow-hidden rounded-sm hover-lift transition-all duration-1000 ${isVisible['pillars'] ? 'animate-fade-in-up' : 'opacity-0 translate-y-[60px]'}`}
                style={{ transitionDelay: `${idx * 200}ms` }}
              >
                {/* Background Image */}
                <div className="absolute inset-0">
                  <img 
                    src={pillar.image} 
                    alt={pillar.title}
                    className="w-full h-full object-cover filter grayscale brightness-50 group-hover:brightness-75 group-hover:scale-110 transition-all duration-700" 
                   loading="lazy" decoding="async" />
                  <div className="absolute inset-0 bg-gradient-to-t from-neutral-950 via-neutral-950/80 to-transparent" />
                </div>
                
                {/* Glassmorphism Card */}
                <div className="relative z-10 p-10 glass min-h-[380px] flex flex-col justify-between group-hover:border-[#bb9457]/30 transition-all duration-500">
                  <div>
                    <div className="w-12 h-0.5 bg-[#bb9457] mb-6 group-hover:w-20 transition-all duration-500" />
                    <h3 className="font-serif text-2xl text-white font-normal mb-4">{pillar.title}</h3>
                    <p className="text-neutral-300 text-sm leading-relaxed font-light mb-8">{pillar.body}</p>
                  </div>
                  <Link to={pillar.link} className="text-[#bb9457] uppercase tracking-wider font-semibold text-xs border-b border-[#bb9457] pb-0.5 hover:text-white hover:border-white transition-colors inline-flex items-center gap-2 group/link">
                    {pillar.linkText}
                    <span className="transform group-hover/link:translate-x-1 transition-transform duration-300">→</span>
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Section 5: How Adorzia Works */}
      <section 
        id="how-it-works" 
        ref={setSectionRef('how-it-works')}
        className="bg-white text-black py-32 border-b border-neutral-200 relative overflow-hidden"
      >
        {/* Decorative elements */}
        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-[#bb9457] to-transparent" />
        
        <div className="max-w-7xl mx-auto px-6 lg:px-8 relative z-10">
          <div className={`text-center max-w-3xl mx-auto mb-24 transition-all duration-1000 ${isVisible['how-it-works'] ? 'animate-fade-in-up' : 'opacity-0 translate-y-[60px]'}`}>
            <div className="text-[10px] uppercase tracking-[0.3em] text-neutral-400 font-mono font-semibold mb-3">
              The Process
            </div>
            <h2 className="font-serif text-4xl md:text-5xl text-neutral-900 font-normal tracking-tight">
              How Adorzia <span className="text-gradient italic font-light">works.</span>
            </h2>
            <p className="mt-6 text-neutral-500 text-base md:text-lg font-light leading-relaxed">
              From application to international scale. A clear path built for fashion entrepreneurs.
            </p>
          </div>

          {/* Vertical Timeline */}
          <div className="max-w-4xl mx-auto">
            <div className="relative">
              {/* Central Golden Line */}
              <div className="absolute left-8 md:left-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-[#bb9457]/0 via-[#bb9457] to-[#bb9457]/0 transform md:-translate-x-1/2" />

              {[
                {
                  step: "01",
                  title: "Apply",
                  description: "Submit your portfolio and brand vision. Tell us about your design philosophy, production capacity, and growth goals.",
                  link: "/for-creatives",
                  linkText: "Start Application"
                },
                {
                  step: "02",
                  title: "Get Access",
                  description: "Upon approval, unlock premium studio spaces in your city. Access shared resources, equipment, and a curated creative community.",
                  link: "/contact",
                  linkText: "Explore Studios"
                },
                {
                  step: "03",
                  title: "Build Your Collection",
                  description: "Use our infrastructure to develop, prototype, and produce your collection. Mentorship and industry guidance included.",
                  link: "/for-creatives",
                  linkText: "View Studio Amenities"
                },
                {
                  step: "04",
                  title: "Sell Through Marketplace",
                  description: "List your collection on our curated marketplace. Connect with international buyers who value Pakistani craftsmanship and contemporary design.",
                  link: "/for-partners",
                  linkText: "Enter Marketplace"
                },
                {
                  step: "05",
                  title: "Apply For Spotlight",
                  description: "Submit your best work for our annual Spotlight program. Selected designers receive funding, mentorship, and global exposure.",
                  link: "/spotlight-event",
                  linkText: "Learn About Spotlight"
                },
                {
                  step: "06",
                  title: "Scale Your Brand",
                  description: "With infrastructure, marketplace access, and potential Spotlight backing, scale from local designer to international fashion brand.",
                  link: "/for-creatives",
                  linkText: "Join the Ecosystem"
                }
              ].map((item, idx) => (
                <div 
                  key={item.step}
                  className={`relative flex items-start gap-8 md:gap-0 mb-16 last:mb-0 transition-all duration-1000 ${isVisible['how-it-works'] ? 'animate-fade-in-up' : 'opacity-0 translate-y-[60px]'}`}
                  style={{ transitionDelay: `${idx * 150}ms` }}
                >
                  {/* Step Number - Left Side */}
                  <div className="flex-shrink-0 w-16 md:w-1/2 md:pr-16 md:text-right">
                    <div className="font-serif text-5xl md:text-6xl text-gradient font-light">{item.step}</div>
                  </div>

                  {/* Timeline Dot */}
                  <div className="absolute left-8 md:left-1/2 w-4 h-4 rounded-full border-2 border-[#bb9457] bg-white transform -translate-x-1/2 z-10 group-hover:scale-125 transition-transform duration-300" />

                  {/* Content - Right Side */}
                  <div className="flex-1 md:w-1/2 md:pl-16 pb-16 md:pb-0">
                    <div className="group hover-lift p-6 border border-neutral-200 rounded-sm bg-white hover:border-[#bb9457]/50 transition-all duration-500">
                      <h3 className="font-serif text-2xl text-neutral-900 font-normal mb-3">{item.title}</h3>
                      <p className="text-neutral-500 text-sm font-light leading-relaxed mb-4">{item.description}</p>
                      <Link 
                        to={item.link} 
                        className="text-[#bb9457] uppercase tracking-wider font-semibold text-xs border-b border-[#bb9457] pb-0.5 hover:text-black hover:border-black transition-colors inline-flex items-center gap-2 group/link"
                      >
                        {item.linkText}
                        <span className="transform group-hover/link:translate-x-1 transition-transform duration-300">→</span>
                      </Link>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Bottom CTA */}
          <div className={`mt-16 text-center transition-all duration-1000 delay-900 ${isVisible['how-it-works'] ? 'animate-fade-in-up' : 'opacity-0 translate-y-[60px]'}`}>
            <Link to="/for-creatives" className="px-8 py-4 bg-[#bb9457] text-black font-semibold uppercase tracking-[0.20em] text-[11px] rounded-sm hover:bg-black hover:text-white transition-all duration-300 inline-block hover-lift">
              Begin Your Journey
            </Link>
          </div>
        </div>
      </section>

      {/* Section 6: Spotlight Award */}
      <section 
        id="spotlight-banner" 
        ref={setSectionRef('spotlight-banner')}
        className="relative bg-[#6f1d1b] text-white py-40 overflow-hidden"
      >
        <div className="absolute inset-0 opacity-30">
          <img 
            src={heroRunwayCta} 
            alt="Spotlight Background" 
            className="w-full h-full object-cover scale-110"
            style={{ transform: `translateY(${(scrollY - 2000) * 0.15}px)` }}
           loading="lazy" decoding="async" />
        </div>
        <div className="absolute inset-0 bg-gradient-to-t from-[#6f1d1b] via-[#6f1d1b]/90 to-transparent" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(187,148,87,0.15),transparent_70%)] pointer-events-none" />
        
        <div className={`relative z-10 max-w-6xl mx-auto px-6 lg:px-8 transition-all duration-1000 ${isVisible['spotlight-banner'] ? 'animate-scale-in' : 'opacity-0 scale-95'}`}>
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            {/* Trophy Visual */}
            <div className="text-center lg:text-left">
              <div className="relative inline-block">
                {/* Trophy Glow Effect */}
                <div className="absolute inset-0 bg-[#bb9457]/20 rounded-full blur-3xl" />
                
                {/* Trophy Image */}
                <div className="relative w-64 h-64 md:w-80 md:h-80 mx-auto lg:mx-0">
                  <img 
                    src={trophy} 
                    alt="Adorzia Spotlight Award Trophy" 
                    className="w-full h-full object-contain drop-shadow-2xl"
                   loading="lazy" decoding="async" />
                </div>
              </div>
            </div>

            {/* Award Copy */}
            <div className="space-y-8">
              <div className="inline-flex items-center gap-3 glass px-6 py-3 rounded-full">
                <span className="w-2 h-2 rounded-full bg-[#bb9457]" />
                <span className="text-[10px] uppercase tracking-[0.3em] text-[#bb9457] font-mono font-semibold">
                  Spotlight Award - Fall 2026
                </span>
              </div>
              
              <h2 className="font-serif text-4xl md:text-5xl lg:text-6xl font-normal tracking-tight text-white leading-[1.15]">
                One designer. <br />
                One national winner. <br />
                <span className="text-gradient italic font-light">One trophy.</span>
              </h2>
              
              <p className="text-white/80 text-base md:text-lg font-light leading-relaxed">
                The Adorzia Spotlight Trophy represents creative excellence, commercial potential, and the future of Pakistani fashion. It is not just an award — it is a national recognition that launches careers.
              </p>
              
              <div className="space-y-4 pt-4">
                <div className="flex items-start gap-4">
                  <div className="w-1.5 h-1.5 rounded-full bg-[#bb9457] mt-2" />
                  <p className="text-white/70 text-sm font-light">National platform and media coverage</p>
                </div>
                <div className="flex items-start gap-4">
                  <div className="w-1.5 h-1.5 rounded-full bg-[#bb9457] mt-2" />
                  <p className="text-white/70 text-sm font-light">Seed funding and business mentorship</p>
                </div>
                <div className="flex items-start gap-4">
                  <div className="w-1.5 h-1.5 rounded-full bg-[#bb9457] mt-2" />
                  <p className="text-white/70 text-sm font-light">Global buyer introductions and showcase</p>
                </div>
              </div>
              
              <div className="pt-8 flex flex-wrap gap-5">
                <Link
                  to="/spotlight-event"
                  className="px-8 py-4 bg-[#bb9457] text-black font-semibold uppercase tracking-[0.20em] text-[11px] rounded-sm hover:bg-white hover:text-black transition-all duration-300 transform hover:-translate-y-0.5"
                >
                  Apply For Spotlight
                </Link>
                <Link
                  to="/spotlight-event"
                  className="px-8 py-4 glass text-white font-semibold uppercase tracking-[0.20em] text-[11px] rounded-sm hover:border-[#bb9457] hover:text-[#bb9457] transition-all duration-300"
                >
                  View Program Benefits
                </Link>
              </div>
              
              <div className="pt-4 text-[10px] text-[#bb9457] font-medium tracking-wide">
                Applications now open — Deadline July 31, 2026
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Section 7: Newsletter Signup */}
      <section 
        id="newsletter" 
        ref={setSectionRef('newsletter')}
        className="bg-neutral-950 text-white py-40 border-b border-neutral-900 relative overflow-hidden"
      >
        <div className="absolute inset-0 z-0 opacity-20 pointer-events-none">
          <img 
            src={newsletterStudio}
            alt="Newsletter Background" 
            className="w-full h-full object-cover filter grayscale brightness-50"
           loading="lazy" decoding="async" />
          <div className="absolute inset-0 bg-gradient-to-t from-neutral-950 via-neutral-950 to-transparent" />
        </div>
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(187,148,87,0.08),transparent_60%)] pointer-events-none" />
        
        <div className={`max-w-3xl mx-auto px-6 text-center relative z-10 space-y-8 transition-all duration-1000 ${isVisible['newsletter'] ? 'animate-fade-in-up' : 'opacity-0 translate-y-[60px]'}`}>
          <div className="inline-flex items-center gap-3 glass px-6 py-3 rounded-full mx-auto">
            <span className="w-2 h-2 rounded-full bg-[#bb9457]" />
            <span className="text-[10px] uppercase tracking-[0.3em] text-[#bb9457] font-mono font-semibold">
              Exclusive Access
            </span>
          </div>
          <h2 className="font-serif text-4xl md:text-5xl tracking-tight font-normal text-white">
            Stay inside the <span className="text-gradient italic font-light">circle.</span>
          </h2>
          <p className="text-neutral-400 text-base md:text-lg max-w-2xl mx-auto font-light leading-relaxed">
            Receive priority access to studio openings, Spotlight submission timelines, and exclusive marketplace drops. Minimalist communication. Crucial updates only.
          </p>
          <form onSubmit={handleNewsletterSubmit} className="max-w-lg mx-auto space-y-4">
            <div className="relative group">
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="enter your email address"
                className="w-full px-6 py-4 bg-neutral-900/80 glass text-white text-sm placeholder-neutral-500 rounded-sm focus:outline-none focus:border-[#bb9457] transition-all duration-300"
              />
            </div>
            {subscribed ? (
              <div className="p-4 border border-[#bb9457]/30 rounded-sm bg-neutral-950">
                <p className="text-[#bb9457] text-sm font-light">
                  You are on the list. We will keep you updated.
                </p>
              </div>
            ) : (
              <button
                type="submit"
                disabled={submitting}
                className="w-full px-8 py-4 bg-[#bb9457] text-black font-semibold uppercase tracking-[0.20em] text-[11px] rounded-sm hover:bg-white hover:text-black transition-all duration-300 transform hover:-translate-y-0.5 disabled:opacity-50"
              >
                {submitting ? 'Subscribing...' : 'Request Access'}
              </button>
            )}
          </form>
          <div className="pt-4 text-[10px] text-neutral-600 font-light tracking-wide">
            We respect your attention. Unsubscribe at your discretion.
          </div>
        </div>
      </section>

      {/* Section 8: Marketplace Preview */}
      <section 
        id="marketplace-preview" 
        ref={setSectionRef('marketplace-preview')}
        className="bg-neutral-950 text-white py-32 border-b border-neutral-900 relative overflow-hidden"
      >
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(187,148,87,0.05),transparent_60%)] pointer-events-none" />
        
        <div className="max-w-7xl mx-auto px-6 lg:px-8 relative z-10">
          <div className={`text-center max-w-3xl mx-auto mb-20 transition-all duration-1000 ${isVisible['marketplace-preview'] ? 'animate-fade-in-up' : 'opacity-0 translate-y-[60px]'}`}>
            <div className="text-[10px] uppercase tracking-[0.3em] text-[#bb9457] font-mono font-semibold mb-3">
              Curated Collections
            </div>
            <h2 className="font-serif text-4xl md:text-5xl text-white font-normal tracking-tight">
              Marketplace <span className="text-gradient italic font-light">preview.</span>
            </h2>
            <p className="mt-6 text-neutral-400 text-base md:text-lg font-light leading-relaxed">
              A glimpse into the curated designer collections coming to the Adorzia Marketplace. Heritage craft meets contemporary design.
            </p>
          </div>

          {/* Product Grid - Editorial Style */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
            {[
              { 
                name: "Ajrak Architect Coat", 
                designer: "Studio Mehran", 
                price: "PKR 48,000",
                description: "Hand-block printed heritage outerwear reimagined for the modern world.",
                image: ajrakCoat 
              },
              { 
                name: "Phulkari Reborn Blazer", 
                designer: "Zari Collective", 
                price: "PKR 42,000",
                description: "Traditional Punjabi embroidery transformed into contemporary luxury tailoring.",
                image: phulkariBlazer 
              },
              { 
                name: "Rilli Sculpt Tote", 
                designer: "Baloch Atelier", 
                price: "PKR 24,000",
                description: "Collectible artisan patchwork crafted for modern everyday elegance.",
                image: rilliTote 
              },
              { 
                name: "Khaddar Modern Suit", 
                designer: "Loom Theory", 
                price: "PKR 36,000",
                description: "Handwoven Khaddar elevated through relaxed contemporary design.",
                image: khaddarSuit 
              },
              { 
                name: "Mirrorwork Bomber Jacket", 
                designer: "Sindh Studio", 
                price: "PKR 39,000",
                description: "Heritage mirrorwork meets next-generation luxury streetwear.",
                image: mirrorworkBomber 
              },
              { 
                name: "Mirror Rebel Tee", 
                designer: "Nomad Thread Studio", 
                price: "PKR 14,500",
                description: "Authentic Sindhi mirror work reimagined through contemporary luxury streetwear.",
                image: mirrorRebelTee 
              },
            ].map((product, idx) => (
              <div 
                key={idx}
                className={`group overflow-hidden rounded-sm bg-neutral-950 border border-neutral-900 hover:border-[#bb9457]/40 transition-all duration-700 ${isVisible['marketplace-preview'] ? 'animate-fade-in-up' : 'opacity-0 translate-y-[60px]'}`}
                style={{ transitionDelay: `${idx * 100}ms` }}
              >
                {/* Product Image - Minimal */}
                <div className="aspect-[3/4] overflow-hidden relative bg-neutral-900">
                  <img 
                    src={product.image} 
                    alt={product.name}
                    className="w-full h-full object-cover opacity-90 group-hover:opacity-100 group-hover:scale-[1.02] transition-all duration-1000 ease-out" 
                   loading="lazy" decoding="async" />
                  
                  {/* Coming Soon Badge - Top Right */}
                  <div className="absolute top-4 right-4">
                    <span className="text-[9px] uppercase tracking-[0.3em] text-[#bb9457] font-mono font-semibold bg-black/80 backdrop-blur-sm px-3 py-1.5">
                      Coming Soon
                    </span>
                  </div>
                </div>
                
                {/* Product Info - Editorial */}
                <div className="p-6">
                  <h3 className="text-white text-base font-normal mb-1 tracking-tight">
                    {product.name}
                  </h3>
                  <p className="text-neutral-500 text-xs font-light mb-3">
                    by {product.designer} • {product.price}
                  </p>
                  <p className="text-neutral-400 text-xs font-light leading-relaxed line-clamp-2">
                    {product.description}
                  </p>
                </div>
              </div>
            ))}
          </div>

          {/* CTA */}
          <div className={`mt-16 text-center transition-all duration-1000 delay-800 ${isVisible['marketplace-preview'] ? 'animate-fade-in-up' : 'opacity-0 translate-y-[60px]'}`}>
            <Link to="/for-partners" className="px-8 py-4 border border-[#bb9457] text-[#bb9457] font-semibold uppercase tracking-[0.2em] text-[11px] rounded-sm hover:bg-[#bb9457] hover:text-black transition-all duration-300 inline-block hover-lift">
              List Your Collection
            </Link>
            <p className="mt-4 text-neutral-500 text-xs font-light">
              Applications now open for founding sellers
            </p>
          </div>
        </div>
      </section>

      {/* Section 8: The Designers We Are Looking For */}
      <section 
        id="designers" 
        ref={setSectionRef('designers')}
        className="bg-neutral-950 text-white py-32 border-b border-neutral-900 relative overflow-hidden"
      >
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(187,148,87,0.05),transparent_60%)] pointer-events-none" />
        
        <div className="max-w-7xl mx-auto px-6 lg:px-8 relative z-10">
          <div className={`max-w-3xl mb-16 transition-all duration-1000 ${isVisible['designers'] ? 'animate-fade-in-left' : 'opacity-0 translate-x-[-60px]'}`}>
            <div className="text-[10px] uppercase tracking-[0.3em] text-[#bb9457] font-mono font-semibold mb-3">
              Spotlight 2026
            </div>
            <h2 className="font-serif text-4xl md:text-5xl text-white font-normal tracking-tight">
              The designers we are <span className="text-gradient italic font-light">looking for.</span>
            </h2>
            <p className="mt-6 text-neutral-400 text-base md:text-lg leading-relaxed font-light">
              We are not searching for perfection. We are searching for vision. These are the design categories that will define Pakistan's next fashion era — and the voices we want to amplify on a global stage.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
            {[
              { 
                category: "Contemporary Womenswear", 
                description: "Modern silhouettes rooted in Pakistani sensibility. Ready-to-wear that speaks to the global woman.",
                image: designer1 
              },
              { 
                category: "Streetwear", 
                description: "Urban narratives from Karachi, Lahore, Islamabad. The raw energy of Pakistan's youth culture.",
                image: designer2 
              },
              { 
                category: "Heritage Fashion", 
                description: "Traditional craft reimagined for contemporary audiences. Centuries of technique, modern relevance.",
                image: designer3 
              },
              { 
                category: "Fabric Innovation", 
                description: "Fabric-forward designers pushing boundaries. Sustainable materials, experimental techniques, new traditions.",
                image: fabricInnovation 
              }
            ].map((designer, idx) => (
              <div 
                key={idx} 
                className={`aspect-[3/4] overflow-hidden rounded-lg bg-neutral-900 border border-neutral-800 group hover:border-[#bb9457]/60 transition-all duration-700 hover-lift shadow-lg hover:shadow-2xl hover:shadow-[#bb9457]/10 ${isVisible['designers'] ? 'animate-fade-in-up' : 'opacity-0 translate-y-[60px]'}`}
                style={{ transitionDelay: `${idx * 100}ms` }}
              >
                <div className="relative w-full h-full">
                  <img 
                    src={designer.image} 
                    alt={designer.category} 
                    className="w-full h-full object-cover scale-105 group-hover:scale-110 transition-transform duration-700" 
                   loading="lazy" decoding="async" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/40 to-transparent opacity-85 group-hover:opacity-70 transition-opacity duration-500" />
                  
                  {/* Glass overlay on hover */}
                  <div className="absolute inset-0 bg-black/30 backdrop-blur-sm opacity-0 group-hover:opacity-100 transition-all duration-500" />
                  
                  <div className="absolute bottom-0 left-0 right-0 p-5 md:p-6 z-10 transform group-hover:-translate-y-2 transition-transform duration-500">
                    <div className="text-white font-serif text-lg md:text-xl mb-2">{designer.category}</div>
                    <div className="text-neutral-300 text-xs font-light leading-relaxed mb-3 opacity-0 group-hover:opacity-100 transition-opacity duration-500 delay-100 line-clamp-3">
                      {designer.description}
                    </div>
                    <div className="text-[#bb9457] text-xs font-mono uppercase tracking-widest flex items-center gap-2">
                      Submit Your Portfolio
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className={`mt-16 text-center transition-all duration-1000 delay-500 ${isVisible['designers'] ? 'animate-fade-in-up' : 'opacity-0 translate-y-[60px]'}`}>
            <Link to="/spotlight-event" className="px-8 py-4 border border-[#bb9457] text-[#bb9457] font-semibold uppercase tracking-[0.2em] text-[11px] rounded-sm hover:bg-[#bb9457] hover:text-black transition-all duration-300 inline-block hover-lift">
              Apply for Spotlight 2026
            </Link>
          </div>
        </div>
      </section>

      {/* Section 9: Future Studio Locations */}
      <section 
        id="studio-locations" 
        ref={setSectionRef('studio-locations')}
        className="bg-white text-black py-32 border-b border-neutral-200 relative overflow-hidden"
      >
        {/* Decorative elements */}
        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-[#bb9457] to-transparent" />
        
        <div className="max-w-7xl mx-auto px-6 lg:px-8 relative z-10">
          <div className={`text-center max-w-3xl mx-auto mb-20 transition-all duration-1000 ${isVisible['studio-locations'] ? 'animate-fade-in-up' : 'opacity-0 translate-y-[60px]'}`}>
            <div className="text-[10px] uppercase tracking-[0.3em] text-neutral-400 font-mono font-semibold mb-3">
              Physical Spaces
            </div>
            <h2 className="font-serif text-4xl md:text-5xl text-neutral-900 font-normal tracking-tight">
              Future studio <span className="text-gradient italic font-light">locations.</span>
            </h2>
            <p className="mt-6 text-neutral-500 text-base md:text-lg font-light leading-relaxed">
              Premium coworking spaces engineered specifically for fashion professionals. Three cities, one synchronized creative ecosystem.
            </p>
          </div>

          {/* Studio Cards Grid */}
          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                city: "Karachi",
                subtitle: "The Creative Capital",
                features: ["15,000 sq ft space", "Industrial sewing labs", "Natural light studios", "Material library"],
                image: karachiStudio
              },
              {
                city: "Lahore",
                subtitle: "Heritage Meets Innovation",
                features: ["12,000 sq ft space", "Pattern-making suites", "Photography studio", "Collaborative lounge"],
                image: lahoreStudio
              },
              {
                city: "Islamabad",
                subtitle: "Modern Design Hub",
                features: ["10,000 sq ft space", "Digital printing lab", "Private workstations", "Event space"],
                image: islamabadStudio
              }
            ].map((studio, idx) => (
              <div 
                key={studio.city}
                className={`group overflow-hidden rounded-sm bg-neutral-100 border border-neutral-200 hover:border-[#bb9457]/50 transition-all duration-1000 hover-lift ${isVisible['studio-locations'] ? 'animate-fade-in-up' : 'opacity-0 translate-y-[60px]'}`}
                style={{ transitionDelay: `${idx * 200}ms` }}
              >
                {/* Studio Image */}
                <div className="aspect-[4/3] overflow-hidden relative">
                  <img 
                    src={studio.image} 
                    alt={`${studio.city} Studio`}
                    className="w-full h-full object-cover scale-110 filter grayscale contrast-125 group-hover:grayscale-0 group-hover:scale-115 transition-all duration-700" 
                   loading="lazy" decoding="async" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent opacity-60 group-hover:opacity-40 transition-opacity duration-500" />
                  
                  {/* Launching Soon Badge */}
                  <div className="absolute top-4 left-4 glass px-4 py-2 rounded-sm">
                    <div className="flex items-center gap-2">
                      <span className="w-2 h-2 rounded-full bg-[#bb9457]" />
                      <span className="text-[9px] uppercase tracking-[0.2em] text-white font-mono font-semibold">
                        Launching Soon
                      </span>
                    </div>
                  </div>
                  
                  {/* City Name Overlay */}
                  <div className="absolute bottom-0 left-0 right-0 p-6">
                    <div className="transform translate-y-2 group-hover:translate-y-0 transition-transform duration-500">
                      <h3 className="font-serif text-3xl text-white mb-1">{studio.city}</h3>
                      <p className="text-white/70 text-xs font-light uppercase tracking-wider">{studio.subtitle}</p>
                    </div>
                  </div>
                </div>
                
                {/* Studio Details */}
                <div className="p-6 bg-white">
                  <div className="space-y-3 mb-6">
                    {studio.features.map((feature, fIdx) => (
                      <div key={fIdx} className="flex items-start gap-3">
                        <svg className="w-4 h-4 text-[#bb9457] mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                        </svg>
                        <span className="text-neutral-600 text-sm font-light">{feature}</span>
                      </div>
                    ))}
                  </div>
                  
                  <Link 
                    to="/for-creatives" 
                    className="w-full px-6 py-3 border border-[#bb9457] text-[#bb9457] font-semibold uppercase tracking-[0.15em] text-[10px] rounded-sm hover:bg-[#bb9457] hover:text-black transition-all duration-300 block text-center"
                  >
                    Reserve Your Spot
                  </Link>
                </div>
              </div>
            ))}
          </div>

          {/* CTA */}
          <div className={`mt-16 text-center transition-all duration-1000 delay-600 ${isVisible['studio-locations'] ? 'animate-fade-in-up' : 'opacity-0 translate-y-[60px]'}`}>
            <Link to="/contact" className="px-8 py-4 bg-[#bb9457] text-black font-semibold uppercase tracking-[0.20em] text-[11px] rounded-sm hover:bg-black hover:text-white transition-all duration-300 inline-block hover-lift">
              Schedule a Visit
            </Link>
            <p className="mt-4 text-neutral-500 text-xs font-light">
              Early access available for founding members
            </p>
          </div>
        </div>
      </section>

      {/* Section 9: Industry Partners */}
      <section 
        id="partners" 
        ref={setSectionRef('partners')}
        className="bg-white text-black py-32 border-b border-neutral-200 relative overflow-hidden"
      >
        {/* Decorative elements */}
        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-[#bb9457] to-transparent" />
        
        <div className="max-w-7xl mx-auto px-6 lg:px-8 relative z-10">
          <div className={`text-center max-w-3xl mx-auto mb-20 transition-all duration-1000 ${isVisible['partners'] ? 'animate-fade-in-up' : 'opacity-0 translate-y-[60px]'}`}>
            <div className="text-[10px] uppercase tracking-[0.3em] text-neutral-400 font-mono font-semibold mb-3">
              Ecosystem Network
            </div>
            <h2 className="font-serif text-4xl md:text-5xl text-neutral-900 font-normal tracking-tight">
              Industry <span className="text-gradient italic font-light">partners.</span>
            </h2>
            <p className="mt-6 text-neutral-500 text-base md:text-lg font-light leading-relaxed">
              Adorzia is building a comprehensive network of industry collaborators. Together, we create the infrastructure Pakistani fashion needs to scale globally.
            </p>
          </div>

          {/* Partner Categories Grid */}
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
            {[
              { category: "Textile Mills", description: "Premium fabric sourcing and production" },
              { category: "Manufacturers", description: "Ethical production facilities" },
              { category: "Photographers", description: "Editorial and campaign specialists" },
              { category: "Pattern Makers", description: "Technical design expertise" },
              { category: "Fashion Educators", description: "Industry training and mentorship" },
              { category: "Retail Partners", description: "Global distribution networks" }
            ].map((partner, idx) => (
              <div 
                key={partner.category}
                className={`group p-8 border border-neutral-200 rounded-sm hover:border-[#bb9457]/50 bg-white hover:bg-neutral-50 transition-all duration-700 text-center ${isVisible['partners'] ? 'animate-scale-in' : 'opacity-0 scale-95'}`}
                style={{ transitionDelay: `${idx * 100}ms` }}
              >
                <div className="w-12 h-12 mx-auto mb-4 rounded-full border border-neutral-200 group-hover:border-[#bb9457] flex items-center justify-center transition-all duration-500">
                  <svg className="w-6 h-6 text-neutral-400 group-hover:text-[#bb9457] transition-colors duration-500" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M13 6a3 3 0 11-6 0 3 3 0 016 0zM18 8a2 2 0 11-4 0 2 2 0 014 0zM14 15a4 4 0 00-8 0v3h8v-3zM6 8a2 2 0 11-4 0 2 2 0 014 0zM16 18v-3a5.972 5.972 0 00-.75-2.906A3.005 3.005 0 0119 15v3h-3zM4.75 12.094A5.973 5.973 0 004 15v3H1v-3a3 3 0 013.75-2.906z" />
                  </svg>
                </div>
                <h3 className="font-serif text-lg text-neutral-900 font-normal mb-2 group-hover:text-[#bb9457] transition-colors duration-500">
                  {partner.category}
                </h3>
                <p className="text-neutral-500 text-xs font-light leading-relaxed">
                  {partner.description}
                </p>
              </div>
            ))}
          </div>

          {/* Partnership CTA */}
          <div className={`mt-16 text-center transition-all duration-1000 delay-600 ${isVisible['partners'] ? 'animate-fade-in-up' : 'opacity-0 translate-y-[60px]'}`}>
            <Link to="/for-partners" className="px-8 py-4 border border-[#bb9457] text-[#bb9457] font-semibold uppercase tracking-[0.2em] text-[11px] rounded-sm hover:bg-[#bb9457] hover:text-black transition-all duration-300 inline-block hover-lift">
              Explore Partnership Opportunities
            </Link>
            <p className="mt-4 text-neutral-500 text-xs font-light">
              Join our growing network of industry collaborators
            </p>
          </div>
        </div>
      </section>

      {/* Section 10: Global Vision */}
      <section 
        id="global-vision" 
        ref={setSectionRef('global-vision')}
        className="bg-white text-black py-32 border-b border-neutral-200 relative overflow-hidden"
      >
        {/* Decorative elements */}
        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-[#bb9457] to-transparent" />
        
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="grid lg:grid-cols-12 gap-16 items-center">
            <div className={`lg:col-span-5 order-last lg:order-first transition-all duration-1000 ${isVisible['global-vision'] ? 'animate-fade-in-left' : 'opacity-0 translate-x-[-60px]'}`}>
              <div className="relative group overflow-hidden rounded-sm bg-neutral-100 border border-neutral-200 hover-lift">
                <img 
                  src={heritageCraft} 
                  alt="Pakistani Heritage Fashion Craft" 
                  loading="lazy" 
                  className="w-full aspect-[4/5] object-cover scale-110 filter grayscale contrast-125 group-hover:grayscale-0 group-hover:scale-115 transition-all duration-[1.5s] ease-out" 
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                <div className="absolute bottom-6 left-6 right-6 opacity-0 group-hover:opacity-100 transition-opacity duration-500 transform translate-y-4 group-hover:translate-y-0">
                  <div className="glass-dark px-4 py-3 rounded-sm">
                    <div className="text-white font-mono text-[10px] tracking-widest uppercase">Heritage Craft</div>
                    <div className="text-white/70 text-xs mt-1">Centuries of Design DNA</div>
                  </div>
                </div>
              </div>
            </div>
            <div className={`lg:col-span-7 space-y-8 transition-all duration-1000 delay-200 ${isVisible['global-vision'] ? 'animate-fade-in-right' : 'opacity-0 translate-x-[60px]'}`}>
              <div className="text-[10px] uppercase tracking-[0.3em] text-neutral-400 font-mono font-semibold">
                Strategic Vision
              </div>
              <h2 className="font-serif text-4xl md:text-5xl text-neutral-900 font-normal tracking-tight leading-[1.15]">
                A design narrative the global stage has yet to <span className="text-gradient italic font-light">experience.</span>
              </h2>
              <div className="space-y-6 text-neutral-500 font-light text-base md:text-lg leading-relaxed">
                <p>
                  From the geometric precision of Multani block prints and the intricate textures of Sindhi craft, to the pristine hand-loomed fabrics of the North and the raw, electric energy of Karachi's urban subcultures-Pakistan holds centuries of sophisticated design DNA.
                </p>
                <p className="text-neutral-900 font-medium">
                  Adorzia exists to transition this heritage into a global context. Not as an artifact of nostalgia, but as a living, breathing, commercially formidable design identity that commands respect on any runway worldwide.
                </p>
                <p className="text-[#bb9457] font-semibold">
                  We are engineering that bridge. One designer, one collection, one brand at a time.
                </p>
              </div>
              
              {/* Feature highlights */}
              <div className="grid grid-cols-2 gap-6 pt-6">
                {[
                  { number: "500+", label: "Years of Craft Heritage" },
                  { number: "3", label: "Major Cultural Hubs" },
                  { number: "∞", label: "Design Possibilities" },
                  { number: "1", label: "Unified Vision" }
                ].map((stat, idx) => (
                  <div key={idx} className="border-l-2 border-[#bb9457] pl-4">
                    <div className="font-serif text-2xl text-[#bb9457] font-light">{stat.number}</div>
                    <div className="text-xs text-neutral-500 font-mono uppercase tracking-wider mt-1">{stat.label}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Section 8: Our Commitments */}
      <section 
        id="numbers" 
        ref={setSectionRef('numbers')}
        className="bg-neutral-950 text-white py-32 border-b border-neutral-900 relative overflow-hidden"
      >
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.01),transparent_60%)] pointer-events-none" />
        
        <div className="max-w-7xl mx-auto px-6 lg:px-8 relative z-10">
          <div className={`text-center max-w-3xl mx-auto mb-24 transition-all duration-1000 ${isVisible['numbers'] ? 'animate-fade-in-up' : 'opacity-0 translate-y-[60px]'}`}>
            <div className="text-[10px] uppercase tracking-[0.3em] text-[#bb9457] font-mono font-semibold mb-3">
              Our Promise
            </div>
            <h2 className="font-serif text-4xl md:text-5xl text-white font-normal tracking-tight">
              Our <span className="text-gradient italic font-light">commitments.</span>
            </h2>
            <p className="mt-6 text-neutral-400 text-base md:text-lg font-light leading-relaxed">
              Not metrics. Not milestones. Principles that guide every decision we make.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-px bg-neutral-900">
            {[
              {
                title: "Physical Infrastructure",
                description: "We are building real spaces. Premium studios in Karachi, Lahore, and Islamabad where fashion professionals can access industrial equipment, collaborative environments, and the resources to transform concepts into collections.",
                icon: "◆"
              },
              {
                title: "Designer Funding",
                description: "Through Spotlight, we identify exceptional talent and provide the capital, mentorship, and platform needed to build sustainable fashion businesses. We invest in people, not just products.",
                icon: "◆"
              },
              {
                title: "Global Marketplace",
                description: "We connect Pakistani designers and artisans with international buyers who value heritage craftsmanship and contemporary design. A curated gateway to global commerce.",
                icon: "◆"
              },
              {
                title: "Heritage Preservation",
                description: "We honor centuries of Pakistani craft tradition by giving it modern relevance. Every collection tells a story of provenance, technique, and cultural continuity.",
                icon: "◆"
              }
            ].map((commitment, idx) => (
              <div 
                key={commitment.title}
                className={`bg-neutral-950 p-12 hover:bg-neutral-900/50 transition-all duration-700 group ${isVisible['numbers'] ? 'animate-fade-in-up' : 'opacity-0 translate-y-[60px]'}`}
                style={{ transitionDelay: `${idx * 100}ms` }}
              >
                <div className="flex items-start gap-6">
                  <div className="text-[#bb9457] text-2xl font-light opacity-60 group-hover:opacity-100 transition-opacity duration-500">
                    {commitment.icon}
                  </div>
                  <div>
                    <h3 className="font-serif text-2xl text-white font-normal mb-4 group-hover:text-[#bb9457] transition-colors duration-500">
                      {commitment.title}
                    </h3>
                    <p className="text-neutral-400 text-sm font-light leading-relaxed">
                      {commitment.description}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className={`mt-16 text-center transition-all duration-1000 delay-400 ${isVisible['numbers'] ? 'animate-fade-in-up' : 'opacity-0 translate-y-[60px]'}`}>
            <p className="text-neutral-500 font-light text-sm md:text-base leading-relaxed max-w-2xl mx-auto italic">
              We are early. We are intentional. We are building for the long term.
            </p>
          </div>
        </div>
      </section>

      {/* NEW Section 8.5: Cinematic Image Banner */}
      <section className="relative h-[60vh] md:h-[80vh] overflow-hidden">
        <div className="absolute inset-0">
          <img 
            src={heroRunwayCta} 
            alt="Fashion Runway CTA" 
            className="w-full h-full object-cover scale-110"
            style={{ transform: `translateY(${scrollY * 0.1}px)` }}
           loading="lazy" decoding="async" />
          <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/50 to-transparent" />
          <div className="absolute inset-0 bg-gradient-to-t from-neutral-950 via-transparent to-neutral-950/50" />
        </div>
        
        <div className="relative z-10 h-full flex items-center">
          <div className="max-w-7xl mx-auto px-6 lg:px-8 w-full">
            <div className="max-w-2xl space-y-6">
              <div className="inline-flex items-center gap-3 glass px-6 py-3 rounded-full">
                <span className="w-2 h-2 rounded-full bg-[#bb9457]" />
                <span className="text-[10px] uppercase tracking-[0.3em] text-[#bb9457] font-mono font-semibold">
                  The Journey Begins
                </span>
              </div>
              <h2 className="font-serif text-4xl md:text-6xl lg:text-7xl text-white font-normal tracking-tight leading-[1.1]">
                Your vision deserves a <span className="text-gradient italic font-light">global stage.</span>
              </h2>
              <p className="text-white/80 text-base md:text-lg font-light leading-relaxed">
                From concept to collection. From local craft to international acclaim. Adorzia is the bridge between where you are and where you belong.
              </p>
              <div className="flex flex-wrap gap-4 pt-4">
                <Link
                  to="/for-creatives"
                  className="px-8 py-4 bg-[#bb9457] text-black font-semibold uppercase tracking-[0.20em] text-[11px] rounded-sm hover:bg-white hover:text-black transition-all duration-300 transform hover:-translate-y-0.5"
                >
                  Start Your Journey
                </Link>
                <Link
                  to="/contact"
                  className="px-8 py-4 glass text-white font-semibold uppercase tracking-[0.20em] text-[11px] rounded-sm hover:border-[#bb9457] hover:text-[#bb9457] transition-all duration-300"
                >
                  Schedule a Visit
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Final CTA: Where Visionaries Rise */}
      <section 
        id="final-cta" 
        ref={setSectionRef('final-cta')}
        className="bg-neutral-950 text-white py-40 relative overflow-hidden"
      >
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(187,148,87,0.08),transparent_60%)] pointer-events-none" />
        
        <div className="max-w-7xl mx-auto px-6 lg:px-8 relative z-10">
          {/* Main Statement */}
          <div className={`text-center max-w-4xl mx-auto mb-20 transition-all duration-1000 ${isVisible['final-cta'] ? 'animate-fade-in-up' : 'opacity-0 translate-y-[60px]'}`}>
            <div className="text-[10px] uppercase tracking-[0.3em] text-[#bb9457] font-mono font-semibold mb-6">
              The Future Starts Now
            </div>
            <h2 className="font-serif text-5xl md:text-6xl lg:text-7xl text-white font-normal tracking-tight leading-[1.1] mb-6">
              Where visionaries <span className="text-gradient italic font-light">rise.</span>
            </h2>
            <p className="text-neutral-400 text-base md:text-lg font-light leading-relaxed max-w-2xl mx-auto">
              Ready to build your fashion future? Choose your path into Pakistan's first complete fashion entrepreneurship ecosystem.
            </p>
          </div>

          {/* Three CTA Cards */}
          <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {[
              {
                title: "Apply For Spotlight",
                description: "Compete for Pakistan's premier fashion talent award. One national winner receives funding, mentorship, and global exposure. Applications now open until July 31, 2026.",
                cta: "Submit Application",
                link: "/spotlight-event",
                highlight: "Founding Class - Limited Positions"
              },
              {
                title: "Explore Studios",
                description: "Access premium coworking spaces in Karachi, Lahore, and Islamabad. Industrial equipment, collaborative environment, and the resources to transform your vision.",
                cta: "Reserve Your Spot",
                link: "/for-creatives",
                highlight: "Launching Soon - Early Access Available"
              },
              {
                title: "Join Marketplace",
                description: "List your collection on our curated platform. Connect with international buyers who value Pakistani heritage craftsmanship and contemporary design.",
                cta: "List Your Collection",
                link: "/for-partners",
                highlight: "50+ Founding Seller Positions Open"
              }
            ].map((card, idx) => (
              <div 
                key={card.title}
                className={`group p-10 border border-neutral-800 bg-neutral-950 hover:border-[#bb9457]/50 transition-all duration-700 hover-lift ${isVisible['final-cta'] ? 'animate-fade-in-up' : 'opacity-0 translate-y-[60px]'}`}
                style={{ transitionDelay: `${idx * 150}ms` }}
              >
                {/* Highlight Badge */}
                <div className="inline-flex items-center gap-2 mb-6 px-3 py-1.5 rounded-full border border-[#bb9457]/30 bg-[#bb9457]/5">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#bb9457]" />
                  <span className="text-[9px] uppercase tracking-[0.2em] text-[#bb9457] font-mono font-semibold">
                    {card.highlight}
                  </span>
                </div>

                <h3 className="font-serif text-2xl text-white font-normal mb-4 group-hover:text-[#bb9457] transition-colors duration-500">
                  {card.title}
                </h3>
                
                <p className="text-neutral-400 text-sm font-light leading-relaxed mb-8">
                  {card.description}
                </p>
                
                <Link 
                  to={card.link}
                  className="inline-flex items-center gap-3 text-[#bb9457] uppercase tracking-wider font-semibold text-xs border-b border-[#bb9457] pb-1 hover:text-white hover:border-white transition-all duration-300 group/link"
                >
                  {card.cta}
                  <span className="transform group-hover/link:translate-x-1 transition-transform duration-300">→</span>
                </Link>
              </div>
            ))}
          </div>

          {/* Final Note */}
          <div className={`mt-20 text-center transition-all duration-1000 delay-500 ${isVisible['final-cta'] ? 'animate-fade-in-up' : 'opacity-0 translate-y-[60px]'}`}>
            <p className="text-neutral-600 text-xs font-light tracking-wide">
              Built for emerging designers. Backed by infrastructure. Designed for global impact.
            </p>
          </div>
        </div>
      </section>
    </div>
  )
}

export default Home