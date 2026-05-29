import { useState, useEffect, useRef } from 'react'
import { Link } from 'react-router-dom'
import SEO from '../components/SEO'
import heroHome from '../assets/hero-banner-coworking-studio 1 .png'
import studio from '../assets/hero-banner-coworking-studio-2.png'
import spotlight from '../assets/fashion-icon.png'
import heroRunway from '../assets/hero-runway.jpg'
import craft from '../assets/craft.jpg'
import designer1 from '../assets/designer-1.jpg'
import designer2 from '../assets/designer-2.jpg'
import designer3 from '../assets/designer-3.jpg'

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
      image: heroHome,
      eyebrow: 'The Network',
      title: 'The city is your atelier.',
      subtitle: 'Karachi. Lahore. Islamabad. Three cities, one synchronized creative ecosystem. A premium infrastructure where Pakistan\'s next generation of fashion minds draft, drape, and disrupt the industry.',
      ctaPrimary: { label: 'Reserve Your Studio Spot', to: '/for-creatives' },
      ctaSecondary: { label: 'Explore Locations', to: '/contact' },
    },
    {
      image: studio,
      eyebrow: 'Spotlight - Fall 2026',
      title: 'A national vision awaits.',
      subtitle: 'Once a year, Adorzia scours every province, every city, and every subculture to identify the singular visionary ready to redefine Pakistani fashion on a global scale.',
      ctaPrimary: { label: 'Apply for Spotlight 2026', to: '/spotlight-event' },
      ctaSecondary: { label: 'Discover the Event', to: '/spotlight-event' },
    },
    {
      image: spotlight,
      eyebrow: 'The Marketplace',
      title: 'From heritage craft to global curation.',
      subtitle: 'A structured, high-end marketplace connecting independent designers and master craftspeople with the international market. Discover the true caliber of contemporary Pakistani design.',
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
        description="Adorzia is Pakistan's first fashion entrepreneurship ecosystem - coworking studios in Lahore, Islamabad and Karachi, a curated marketplace for emerging designers and heritage craft, and the annual Spotlight event that discovers and invests in Pakistan's next great fashion brands. Submissions open June 1 2026."
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
        @keyframes ambientSwell {
          0%, 100% { transform: scale(1) translate(0px, 0px); }
          50% { transform: scale(1.04) translate(5px, -5px); }
        }
        @keyframes marqueeTrack {
          0% { transform: translateX(0%); }
          100% { transform: translateX(-50%); }
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
        .animate-ambient-swell { animation: ambientSwell 25s infinite ease-in-out; }
        .animate-marquee { animation: marqueeTrack 30s infinite linear; }
        .animate-fade-in-up { animation: fadeInUp 1s ease-out forwards; }
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

      {/* Section 1: Cinematic Full-Bleed Carousel Hero */}
      <section className="relative overflow-hidden border-b border-neutral-900 bg-black min-h-screen flex items-center">
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-gradient-to-r from-black via-black/85 to-transparent z-10" />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(187,148,87,0.15),transparent_60%)] z-10" />
          <div className="absolute inset-0 bg-gradient-to-t from-neutral-950 via-transparent to-black/60 z-10" />

          {slides.map((slide, index) => (
            <img
              key={index}
              src={slide.image}
              alt=""
              className={`absolute inset-0 h-full w-full object-cover transition-all duration-[1400ms] cubic-bezier(0.25, 1, 0.5, 1) ${
                index === currentIndex ? 'opacity-45 scale-110 animate-ambient-swell' : 'opacity-0 scale-115'
              }`}
              style={{
                transform: `translateY(${scrollY * 0.3}px) scale(${index === currentIndex ? 1.1 : 1.15})`
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

        <div className="relative z-20 max-w-7xl mx-auto w-full px-6 md:px-12 lg:px-8 py-32">
          <div className="max-w-4xl">
            <div className="inline-flex items-center gap-3 glass px-4 py-2 rounded-full mb-8 transform translate-y-4 animate-fade-in">
              <span className="w-1.5 h-1.5 rounded-full bg-[#bb9457] animate-pulse-glow" />
              <span className="text-[10px] uppercase tracking-[0.3em] text-neutral-300 font-medium font-mono">
                {slides[currentIndex].eyebrow}
              </span>
            </div>

            <h1 className="font-serif text-4xl md:text-6xl lg:text-7xl xl:text-8xl leading-[1.05] tracking-tight text-white font-normal transition-all duration-700">
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

            <p className="mt-8 max-w-2xl text-neutral-400 text-base md:text-lg leading-relaxed font-light transition-all duration-700">
              {slides[currentIndex].subtitle}
            </p>

            <div className="mt-12 flex flex-wrap gap-5">
              <Link
                to={slides[currentIndex].ctaPrimary.to}
                className="px-8 py-4 bg-[#bb9457] text-black font-semibold uppercase tracking-[0.2em] text-[11px] rounded-sm hover:bg-white hover:text-black transition-all duration-300 transform hover:-translate-y-0.5"
              >
                {slides[currentIndex].ctaPrimary.label}
              </Link>
              <Link
                to={slides[currentIndex].ctaSecondary.to}
                className="px-8 py-4 border border-white/20 text-white font-semibold uppercase tracking-[0.2em] text-[11px] rounded-sm hover:border-[#bb9457] hover:text-[#bb9457] transition-all duration-300 backdrop-blur-sm"
              >
                {slides[currentIndex].ctaSecondary.label}
              </Link>
            </div>
          </div>
        </div>

        {/* Cinematic Slide Indicators */}
        <div className="absolute bottom-12 left-6 right-6 z-20 max-w-7xl mx-auto px-2 flex justify-between items-center border-t border-white/10 pt-6">
          <div className="flex gap-3">
            {slides.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentIndex(index)}
                className={`rounded-full transition-all duration-500 ${
                  index === currentIndex 
                    ? 'w-3 h-3 bg-[#bb9457] shadow-lg shadow-[#bb9457]/30' 
                    : 'w-2 h-2 bg-white/20 hover:bg-white/40 hover:scale-125'
                }`}
              />
            ))}
          </div>
          <span className="font-mono text-[10px] tracking-[0.25em] text-neutral-500 uppercase">
            System Index // 0{currentIndex + 1}
          </span>
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
        {/* Decorative floating elements */}
        <div className="absolute top-20 right-20 w-64 h-64 bg-[#bb9457]/5 rounded-full blur-3xl animate-float pointer-events-none" />
        <div className="absolute bottom-20 left-20 w-48 h-48 bg-[#bb9457]/5 rounded-full blur-3xl animate-float pointer-events-none" style={{ animationDelay: '2s' }} />
        
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
                src={heroHome}
                alt="Editorial Texture" 
                className="w-full aspect-[4/5] object-cover scale-110 filter grayscale contrast-125 group-hover:scale-115 transition-transform duration-[1.5s] ease-out"
              />
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
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-[#bb9457]/5 rounded-full blur-3xl animate-float pointer-events-none" />
        
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
                image: heroHome
              },
              {
                title: "The Marketplace",
                body: "A high-end digital gateway connecting Pakistan's exceptional design talent and heritage artisans directly with discerning global buyers.",
                link: "/for-partners",
                linkText: "Enter Marketplace →",
                image: craft
              },
              {
                title: "Spotlight",
                body: "Our signature annual incubator designed to identify extraordinary, untapped talent across Pakistan and provide the capital and mentorship to build them into viable brands.",
                link: "/spotlight-event",
                linkText: "Learn About Spotlight →",
                image: heroRunway
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
                  />
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

      {/* Section 5: Spotlight 2026 Announcement Banner */}
      <section 
        id="spotlight-banner" 
        ref={setSectionRef('spotlight-banner')}
        className="relative bg-[#6f1d1b] text-white py-40 overflow-hidden"
      >
        <div className="absolute inset-0 opacity-30">
          <img 
            src={heroRunway} 
            alt="Background" 
            className="w-full h-full object-cover scale-110"
            style={{ transform: `translateY(${(scrollY - 2000) * 0.15}px)` }}
          />
        </div>
        <div className="absolute inset-0 bg-gradient-to-t from-[#6f1d1b] via-[#6f1d1b]/90 to-transparent" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(187,148,87,0.15),transparent_70%)] pointer-events-none" />
        
        {/* Decorative elements */}
        <div className="absolute top-10 left-10 w-32 h-32 border border-[#bb9457]/20 rounded-full animate-float pointer-events-none" />
        <div className="absolute bottom-10 right-10 w-48 h-48 border border-[#bb9457]/10 rounded-full animate-float pointer-events-none" style={{ animationDelay: '1.5s' }} />
        
        <div className={`relative z-10 max-w-5xl mx-auto px-6 lg:px-8 text-center space-y-8 transition-all duration-1000 ${isVisible['spotlight-banner'] ? 'animate-scale-in' : 'opacity-0 scale-95'}`}>
          <div className="inline-flex items-center gap-3 glass px-6 py-3 rounded-full mx-auto">
            <span className="w-2 h-2 rounded-full bg-[#bb9457] animate-pulse-glow" />
            <span className="text-[10px] uppercase tracking-[0.3em] text-[#bb9457] font-mono font-semibold">
              Submissions Open - June 1, 2026
            </span>
          </div>
          <h2 className="font-serif text-4xl md:text-6xl lg:text-7xl font-normal tracking-tight text-white">
            Shape the New <span className="text-gradient italic font-light">Vanguard.</span>
          </h2>
          <p className="text-white/80 text-base md:text-lg max-w-3xl mx-auto font-light leading-relaxed">
            The Adorzia Spotlight Fall 2026 cycle is officially open. We are searching for the designers, pattern-makers, and creative visionaries ready to be seen, backed, and scaled into an international legacy.
          </p>
          <div className="pt-6 flex flex-wrap justify-center gap-5">
            <Link
              to="/spotlight-event"
              className="px-8 py-4 bg-[#bb9457] text-black font-semibold uppercase tracking-[0.20em] text-[11px] rounded-sm hover:bg-white hover:text-black transition-all duration-300 transform hover:-translate-y-0.5 animate-pulse-glow"
            >
              Submit Application
            </Link>
            <Link
              to="/spotlight-event"
              className="px-8 py-4 glass text-white font-semibold uppercase tracking-[0.20em] text-[11px] rounded-sm hover:border-[#bb9457] hover:text-[#bb9457] transition-all duration-300"
            >
              View Program Benefits
            </Link>
          </div>
        </div>
      </section>

      {/* Section 6: Featured Designers Teaser */}
      <section 
        id="designers" 
        ref={setSectionRef('designers')}
        className="bg-neutral-950 text-white py-32 border-b border-neutral-900 relative overflow-hidden"
      >
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(187,148,87,0.05),transparent_60%)] pointer-events-none" />
        <div className="absolute top-1/2 right-0 w-72 h-72 bg-[#bb9457]/5 rounded-full blur-3xl animate-float pointer-events-none" />
        
        <div className="max-w-7xl mx-auto px-6 lg:px-8 relative z-10">
          <div className={`max-w-3xl mb-16 transition-all duration-1000 ${isVisible['designers'] ? 'animate-fade-in-left' : 'opacity-0 translate-x-[-60px]'}`}>
            <div className="text-[10px] uppercase tracking-[0.3em] text-[#bb9457] font-mono font-semibold mb-3">
              The Vanguard
            </div>
            <h2 className="font-serif text-4xl md:text-5xl text-white font-normal tracking-tight">
              The faces of Pakistan's next design era.
            </h2>
            <p className="mt-6 text-neutral-400 text-base md:text-lg leading-relaxed font-light">
              We are operating at the genesis of a major shift. The caliber of creativity, rigorous technique, and vision we have encountered across the country validates our core thesis. These are the narratives we are here to amplify.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              { name: "Designer 01", role: "Lahore", image: designer1 },
              { name: "Designer 02", role: "Karachi", image: designer2 },
              { name: "Designer 03", role: "Islamabad", image: designer3 }
            ].map((designer, idx) => (
              <div 
                key={idx} 
                className={`aspect-[4/5] overflow-hidden rounded-sm bg-neutral-900 border border-neutral-800 group hover:border-[#bb9457]/50 transition-all duration-1000 hover-lift ${isVisible['designers'] ? 'animate-fade-in-up' : 'opacity-0 translate-y-[60px]'}`}
                style={{ transitionDelay: `${idx * 200}ms` }}
              >
                <div className="relative w-full h-full">
                  <img 
                    src={designer.image} 
                    alt={designer.name} 
                    className="w-full h-full object-cover scale-110 filter grayscale contrast-125 group-hover:grayscale-0 group-hover:scale-120 transition-all duration-700" 
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent opacity-80 group-hover:opacity-60 transition-opacity duration-500" />
                  
                  {/* Glass overlay on hover */}
                  <div className="absolute inset-0 glass opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                  
                  <div className="absolute bottom-0 left-0 right-0 p-6 z-10 transform group-hover:-translate-y-2 transition-transform duration-500">
                    <div className="text-white font-serif text-2xl mb-1">{designer.name}</div>
                    <div className="text-[#bb9457] text-xs font-mono uppercase tracking-widest">{designer.role}</div>
                    <div className="mt-3 opacity-0 group-hover:opacity-100 transition-opacity duration-500 delay-100">
                      <span className="text-white/80 text-xs font-light">View Portfolio →</span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className={`mt-16 text-center transition-all duration-1000 delay-500 ${isVisible['designers'] ? 'animate-fade-in-up' : 'opacity-0 translate-y-[60px]'}`}>
            <Link to="/for-creatives" className="px-8 py-4 border border-[#bb9457] text-[#bb9457] font-semibold uppercase tracking-[0.2em] text-[11px] rounded-sm hover:bg-[#bb9457] hover:text-black transition-all duration-300 inline-block hover-lift">
              Join the Community
            </Link>
          </div>
        </div>
      </section>

      {/* Section 7: From Pakistan to the World */}
      <section 
        id="global-vision" 
        ref={setSectionRef('global-vision')}
        className="bg-white text-black py-32 border-b border-neutral-200 relative overflow-hidden"
      >
        {/* Decorative elements */}
        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-[#bb9457] to-transparent" />
        <div className="absolute bottom-20 left-20 w-56 h-56 bg-[#bb9457]/5 rounded-full blur-3xl animate-float pointer-events-none" />
        
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="grid lg:grid-cols-12 gap-16 items-center">
            <div className={`lg:col-span-5 order-last lg:order-first transition-all duration-1000 ${isVisible['global-vision'] ? 'animate-fade-in-left' : 'opacity-0 translate-x-[-60px]'}`}>
              <div className="relative group overflow-hidden rounded-sm bg-neutral-100 border border-neutral-200 hover-lift">
                <img 
                  src={craft} 
                  alt="Pakistani Heritage Craft" 
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
                  From the geometric precision of Multani block prints and the intricate textures of Sindhi craft, to the pristine hand-loomed textiles of the North and the raw, electric energy of Karachi's urban subcultures—Pakistan holds centuries of sophisticated design DNA.
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

      {/* Section 8: Numbers That Matter */}
      <section 
        id="numbers" 
        ref={setSectionRef('numbers')}
        className="bg-neutral-950 text-white py-32 border-b border-neutral-900 relative overflow-hidden"
      >
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.01),transparent_60%)] pointer-events-none" />
        <div className="absolute top-1/3 left-1/4 w-80 h-80 bg-[#bb9457]/5 rounded-full blur-3xl animate-float pointer-events-none" />
        
        <div className="max-w-7xl mx-auto px-6 lg:px-8 relative z-10">
          <div className={`text-center max-w-3xl mx-auto mb-24 transition-all duration-1000 ${isVisible['numbers'] ? 'animate-fade-in-up' : 'opacity-0 translate-y-[60px]'}`}>
            <div className="text-[10px] uppercase tracking-[0.3em] text-[#bb9457] font-mono font-semibold mb-3">
              Adorzia in Motion
            </div>
            <h2 className="font-serif text-4xl md:text-5xl text-white font-normal tracking-tight">
              Building for the Long Term.
            </h2>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {[
              { metric: "03", label: "Studio Cities Launching" },
              { metric: "2025", label: "Foundation Year" },
              { metric: "01", label: "National Spotlight Event" },
              { metric: "00", label: "Compromises on Craft" }
            ].map((item, idx) => (
              <div 
                key={item.metric} 
                className={`text-center p-8 border border-neutral-900 bg-neutral-950/50 hover:border-[#bb9457]/30 transition-all duration-1000 hover-lift ${isVisible['numbers'] ? 'animate-scale-in' : 'opacity-0 scale-95'}`}
                style={{ transitionDelay: `${idx * 150}ms` }}
              >
                <div className="font-serif text-5xl md:text-6xl text-gradient font-light mb-3">{item.metric}</div>
                <div className="text-[10px] text-neutral-400 font-medium tracking-widest uppercase font-mono">{item.label}</div>
              </div>
            ))}
          </div>

          <div className={`mt-16 text-center transition-all duration-1000 delay-600 ${isVisible['numbers'] ? 'animate-fade-in-up' : 'opacity-0 translate-y-[60px]'}`}>
            <p className="text-neutral-500 font-light text-sm md:text-base leading-relaxed max-w-2xl mx-auto">
              We are early. We are intentional. We are building for the long term.
            </p>
          </div>
        </div>
      </section>

      {/* NEW Section 8.5: Cinematic Image Banner */}
      <section className="relative h-[60vh] md:h-[80vh] overflow-hidden">
        <div className="absolute inset-0">
          <img 
            src={heroRunway} 
            alt="Fashion Runway" 
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

      {/* Section 9: Newsletter Signup */}
      <section 
        id="newsletter" 
        ref={setSectionRef('newsletter')}
        className="bg-neutral-950 text-white py-40 relative overflow-hidden"
      >
        <div className="absolute inset-0 z-0 opacity-20 pointer-events-none">
          <img 
            src={heroHome}
            alt="Background Contrast" 
            className="w-full h-full object-cover filter grayscale brightness-50"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-neutral-950 via-neutral-950 to-transparent" />
        </div>
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(187,148,87,0.08),transparent_60%)] pointer-events-none" />
        <div className="absolute top-20 right-20 w-64 h-64 bg-[#bb9457]/5 rounded-full blur-3xl animate-float pointer-events-none" />
        <div className="absolute bottom-20 left-20 w-48 h-48 bg-[#bb9457]/5 rounded-full blur-3xl animate-float pointer-events-none" style={{ animationDelay: '2s' }} />
        
        <div className={`max-w-3xl mx-auto px-6 text-center relative z-10 space-y-8 transition-all duration-1000 ${isVisible['newsletter'] ? 'animate-fade-in-up' : 'opacity-0 translate-y-[60px]'}`}>
          <div className="inline-flex items-center gap-3 glass px-6 py-3 rounded-full mx-auto">
            <span className="w-2 h-2 rounded-full bg-[#bb9457] animate-pulse-glow" />
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
              <div className="absolute inset-0 animate-shimmer opacity-0 group-hover:opacity-100 pointer-events-none rounded-sm" />
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
                className="w-full px-8 py-4 bg-[#bb9457] text-black font-semibold uppercase tracking-[0.20em] text-[11px] rounded-sm hover:bg-white hover:text-black transition-all duration-300 transform hover:-translate-y-0.5 animate-pulse-glow disabled:opacity-50"
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
    </div>
  )
}

export default Home