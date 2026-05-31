import { useState } from 'react'
import { sendEmailNotification } from '../lib/email'
import SEO from '../components/SEO'
import heroHome from '../assets/hero-home.jpg'
import heroBanner from '../assets/hero1.jpg'
import studio from '../assets/studio.jpg'
import craft from '../assets/craft.jpg'
import designer1 from '../assets/designer-1.jpg'
import designer2 from '../assets/designer-2.jpg'
import designer3 from '../assets/designer-3.jpg'
import spotlightImg from '../assets/spotlight.jpg'
import fashionBanner from '../assets/fashion.jpg'
import runwayImg from '../assets/runway.jpg'
import studio1 from '../assets/studio1.jpg'
import brand1 from '../assets/brand1.jpg'
import brand2 from '../assets/brand2.jpg'
import brand3 from '../assets/brand3.jpg'
import banner3 from '../assets/banner3.jpg'
import banner4 from '../assets/banner4.jpg'

// ============================================
// ADORZIA MARKETPLACE PAGE
// ============================================
// A curated online destination for contemporary Pakistani fashion 
// designers and heritage craftspeople. Features seller applications, 
// buyer waitlist, and comprehensive marketplace information.
// ============================================

const Marketplace = () => {
  // ============================================
  // STATE MANAGEMENT
  // ============================================
  
  // Buyer form state
  const [email, setEmail] = useState('')
  const [buyerName, setBuyerName] = useState('')
  const [buyerType, setBuyerType] = useState('')
  const [buyerInterest, setBuyerInterest] = useState('')
  const [submitted, setSubmitted] = useState(false)
  const [sellerSubmitted, setSellerSubmitted] = useState(false)
  const [sellerSubmitting, setSellerSubmitting] = useState(false)
  const [openFaq, setOpenFaq] = useState<number | null>(null)
  
  // Seller form state
  const [sellerFormData, setSellerFormData] = useState({
    full_name: '',
    email: '',
    brand_name: '',
    category: '',
    location: '',
    creative_practice: '',
    portfolio_url: '',
    years_in_operation: '',
    instagram_handle: '',
    manufactures_self: '',
    price_range: '',
    lookbook_url: '',
    product_photos_url: '',
    hear_about: ''
  })
  
  // ============================================
  // FORM HANDLERS
  // ============================================
    
  // Buyer waitlist form submission handler
  const handleBuyerSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    try {
      const { supabase } = await import('../lib/supabase')
      
      const { error } = await supabase
        .from('buyer_waitlist')
        .insert([{
          name: buyerName,
          email: email,
          buyer_type: buyerType,
          interest: buyerInterest || null
        }])

      if (error) throw error

      // Send email notification
      await sendEmailNotification('marketplace', {
        designer_name: buyerName,
        name: buyerName,
        email: email,
        phone: '',
        brand_name: '',
        category: buyerType,
        description: buyerInterest
      })

      setSubmitted(true)
      setEmail('')
      setBuyerName('')
      setBuyerType('')
      setBuyerInterest('')
    } catch (err) {
      console.error('Error submitting buyer waitlist:', err)
      alert('Failed to join waitlist. Please try again.')
    }
  }

  const handleSellerSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setSellerSubmitting(true)

    try {
      const { supabase } = await import('../lib/supabase')
      
      const { error } = await supabase
        .from('marketplace_applications')
        .insert([{
          brand_name: sellerFormData.brand_name,
          founder_name: sellerFormData.full_name,
          email: sellerFormData.email,
          phone: '',
          location: sellerFormData.location,
          product_category: sellerFormData.category,
          product_description: sellerFormData.creative_practice,
          website: sellerFormData.portfolio_url || null,
          unique_selling_proposition: sellerFormData.creative_practice,
          target_customer: '',
          years_in_operation: sellerFormData.years_in_operation,
          instagram_handle: sellerFormData.instagram_handle || null,
          manufactures_self: sellerFormData.manufactures_self,
          price_range: sellerFormData.price_range,
          lookbook_url: sellerFormData.lookbook_url || null,
          product_photos_url: sellerFormData.product_photos_url || null,
          hear_about: sellerFormData.hear_about
        }])

      if (error) throw error

      // Send email notification
      await sendEmailNotification('marketplace', {
        designer_name: sellerFormData.full_name,
        name: sellerFormData.full_name,
        email: sellerFormData.email,
        phone: '',
        brand_name: sellerFormData.brand_name,
        category: sellerFormData.category,
        description: sellerFormData.creative_practice
      })

      setSellerSubmitted(true)
      setSellerFormData({
        full_name: '',
        email: '',
        brand_name: '',
        category: '',
        location: '',
        creative_practice: '',
        portfolio_url: '',
        years_in_operation: '',
        instagram_handle: '',
        manufactures_self: '',
        price_range: '',
        lookbook_url: '',
        product_photos_url: '',
        hear_about: ''
      })
    } catch (err) {
      console.error('Error submitting seller application:', err)
      alert('Failed to submit application. Please try again.')
    } finally {
      setSellerSubmitting(false)
    }
  }

  return (
    <div className="min-h-screen bg-neutral-950 text-white grain-overlay">
      {/* ============================================
          SECTION 1: SEO & METADATA
          Structured data, Open Graph, and FAQ schema
          ============================================ */}
      <SEO
        title="Adorzia Marketplace - Buy and Sell Pakistani Fashion and Heritage Craft Online"
        description="The Adorzia Marketplace is a curated online destination for contemporary Pakistani fashion designers and heritage craftspeople. Buy authentic Pakistani fashion with full maker provenance. Sell your work to local and international buyers. Early access and seller applications open now."
        canonicalURL="https://adorzia.com/marketplace"
        ogTitle="Adorzia Marketplace - Pakistani Fashion and Heritage Craft"
        ogDescription="The world's first curated destination for Pakistani fashion creativity. Contemporary designers and heritage craft. Coming soon - join early access now."
        ogImageAlt="Adorzia Marketplace - curated Pakistani fashion and heritage craft"
        schemaType="CollectionPage"
        schema={{
          "@context": "https://schema.org",
          "@graph": [
            {
              "@type": "CollectionPage",
              "name": "Adorzia Marketplace",
              "description": "Curated online marketplace for contemporary Pakistani fashion designers and heritage craftspeople",
              "url": "https://adorzia.com/marketplace",
              "isPartOf": {
                "@type": "WebSite",
                "name": "Adorzia",
                "url": "https://adorzia.com"
              }
            },
            {
              "@type": "FAQPage",
              "mainEntity": [
                {
                  "@type": "Question",
                  "name": "When does the marketplace launch?",
                  "acceptedAnswer": {
                    "@type": "Answer",
                    "text": "The Adorzia Marketplace will launch to the public following our first Spotlight event in Fall 2026. We are currently in our curation phase - reviewing seller applications, onboarding founding sellers, and building the collection that will define the marketplace at launch. Early access members will get in before the public opening."
                  }
                },
                {
                  "@type": "Question",
                  "name": "Who can sell on Adorzia?",
                  "acceptedAnswer": {
                    "@type": "Answer",
                    "text": "Adorzia is open to emerging fashion designers, independent makers, artisan-led labels, fashion innovators, heritage craft practitioners, and fashion accessories brands based in Pakistan. We are looking for creators who produce original work - whether that means designing contemporary fashion or practicing traditional craft. We do not accept resellers, mass-produced imports, or generic wholesale products."
                  }
                },
                {
                  "@type": "Question",
                  "name": "How much does it cost to sell on Adorzia?",
                  "acceptedAnswer": {
                    "@type": "Answer",
                    "text": "We operate on a commission model with no upfront listing fees for early sellers joining during our preview phase. Adorzia takes a commission on each sale - our full fee structure is shared during onboarding. Apply before December 31, 2026 to lock in our founding seller rates, which will be lower than public launch pricing. There are no hidden fees, monthly subscriptions, or setup costs."
                  }
                },
                {
                  "@type": "Question",
                  "name": "Do I need an existing brand to apply?",
                  "acceptedAnswer": {
                    "@type": "Answer",
                    "text": "No. We are looking for quality, originality, and creative integrity - not follower counts or existing sales history. Whether you are a fashion designer in your first year of operation or a heritage craft maker who has been practicing for decades, what matters is the quality and authenticity of your work. Many of our founding sellers are at the early stages of building their brands."
                  }
                },
                {
                  "@type": "Question",
                  "name": "Can heritage craft makers apply?",
                  "acceptedAnswer": {
                    "@type": "Answer",
                    "text": "Absolutely. Heritage craft makers are central to what Adorzia is building. Whether you practice Ajrak block printing, Phulkari embroidery, Rilli patchwork, Pashmina weaving, Khaddar handloom, or any other Pakistani craft tradition - you belong here. Every heritage craft listing includes full provenance documentation, and we work with craft makers to ensure their work is presented with the respect and context it deserves."
                  }
                },
                {
                  "@type": "Question",
                  "name": "Will international shipping be available?",
                  "acceptedAnswer": {
                    "@type": "Answer",
                    "text": "Yes. Adorzia supports international orders with transparent shipping costs, customs guidance for Pakistani exports, and seller support to ensure cross-border orders are fulfilled properly. We are building the infrastructure for Pakistani fashion to reach the world - one order at a time. International buyers can expect clear shipping timelines and proper documentation for all cross-border purchases."
                  }
                },
                {
                  "@type": "Question",
                  "name": "How are sellers selected?",
                  "acceptedAnswer": {
                    "@type": "Answer",
                    "text": "Every seller application is reviewed by our curation team. We assess quality, originality, creative integrity, and alignment with Adorzia's values. We do not use automated approval systems or accept every application. The curation process typically takes seven working days, and we provide honest feedback to every applicant. Being listed on Adorzia means something - we intend to keep it that way."
                  }
                },
                {
                  "@type": "Question",
                  "name": "Can buyers order internationally?",
                  "acceptedAnswer": {
                    "@type": "Answer",
                    "text": "Yes. The Adorzia Marketplace is built for a global buyer audience. Whether you are in Pakistan, the UK, the US, the Middle East, or anywhere else in the world, you can browse, discover, and purchase from our curated collection of Pakistani fashion and heritage craft. We support international payment methods and provide shipping guidance for cross-border orders."
                  }
                }
              ]
            }
          ]
        }}
        keywords="Pakistani fashion marketplace online, buy Pakistani designer fashion online, sell Pakistani craft online, heritage craft marketplace, emerging Pakistani designer clothing, authentic Pakistani handmade fashion, Pakistani clothing, Pakistani textile, Heritage craft Pakistan, Traditional Pakistani craft for sale, Where to buy authentic Pakistani designer clothing online, Best online marketplace for Pakistani fashion brands, Artisan fashion Pakistan, Handcrafted Pakistani clothing, South Asian fashion marketplace, Pakistani textile heritage, Adorzia marketplace, Adorzia fashion"
      />

      {/* ============================================
          SECTION 2: ANIMATION STYLES
          Keyframe animations for ambient effects
          ============================================ */}
      <style>{`
        /* Ambient swell for background images */
        @keyframes ambientSwell {
          0%, 100% { transform: scale(1.02) translate(0px, 0px); }
          50% { transform: scale(1.06) translate(4px, -3px); }
        }
        .animate-ambient-swell { animation: ambientSwell 20s infinite ease-in-out; }

        /* Fade-up reveal on scroll */
        @keyframes fadeUp {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        .animate-fade-up {
          animation: fadeUp 0.8s ease-out forwards;
        }
        .animate-fade-up-delay-1 { animation: fadeUp 0.8s ease-out 0.1s forwards; opacity: 0; }
        .animate-fade-up-delay-2 { animation: fadeUp 0.8s ease-out 0.2s forwards; opacity: 0; }
        .animate-fade-up-delay-3 { animation: fadeUp 0.8s ease-out 0.3s forwards; opacity: 0; }

        /* Floating grain texture overlay */
        @keyframes grain {
          0%, 100% { transform: translate(0, 0); }
          10% { transform: translate(-5%, -10%); }
          20% { transform: translate(-15%, 5%); }
          30% { transform: translate(7%, -25%); }
          40% { transform: translate(-5%, 25%); }
          50% { transform: translate(-15%, 10%); }
          60% { transform: translate(15%, 0%); }
          70% { transform: translate(0%, 15%); }
          80% { transform: translate(3%, 35%); }
          90% { transform: translate(-10%, 10%); }
        }
        .grain-overlay::before {
          content: '';
          position: fixed;
          top: -50%;
          left: -50%;
          right: -50%;
          bottom: -50%;
          width: 200%;
          height: 200%;
          background: url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)' opacity='0.02'/%3E%3C/svg%3E");
          animation: grain 8s steps(10) infinite;
          pointer-events: none;
          z-index: 9999;
        }

        /* Golden divider line animation */
        @keyframes shimmer {
          0% { background-position: -200% center; }
          100% { background-position: 200% center; }
        }
        .golden-divider {
          background: linear-gradient(90deg, transparent 0%, #bb9457 50%, transparent 100%);
          background-size: 200% 100%;
          animation: shimmer 8s infinite linear;
        }

        /* Subtle parallax for hero images */
        @keyframes parallax {
          0%, 100% { transform: translateY(0) scale(1); }
          50% { transform: translateY(-20px) scale(1.02); }
        }
        .animate-parallax { animation: parallax 15s infinite ease-in-out; }

        /* Image hover lift */
        .hover-lift {
          transition: transform 0.7s cubic-bezier(0.25, 0.46, 0.45, 0.94);
        }
        .hover-lift:hover {
          transform: translateY(-8px);
        }

        /* Smooth scroll behavior */
        html {
          scroll-behavior: smooth;
        }
      `}</style>

      {/* ============================================
          SECTION 3: HERO SECTION
          Main hero with headline, description, and dual CTAs
          ============================================ */}
      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center overflow-hidden">
        {/* Background Image - Enhanced Visibility */}
        <div className="absolute inset-0 z-0">
          <img src={heroBanner} alt="Pakistani fashion designer presenting contemporary collection in studio" className="w-full h-full object-cover grayscale opacity-70 animate-parallax" />
        </div>
        
        {/* Gradient Overlays - More transparent for better image visibility */}
        <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/50 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-t from-neutral-950 via-neutral-950/60 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-br from-black/40 via-transparent to-neutral-900/30" />
        
        {/* Golden Accent Glow - Positioned left to enhance text area */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_40%,rgba(187,148,87,0.3),transparent_65%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_60%,rgba(187,148,87,0.15),transparent_50%)]" />

        {/* Content - Left Aligned */}
        <div className="relative z-10 w-full max-w-7xl mx-auto px-6 lg:px-8 py-32">
          <div className="max-w-4xl">
            <span className="text-[11px] uppercase tracking-[0.35em] text-[#bb9457] font-mono font-semibold animate-fade-up">
              Coming soon
            </span>

            <h1 className="mt-8 font-serif text-5xl md:text-6xl lg:text-7xl xl:text-8xl text-white font-normal leading-[1.05] tracking-tight animate-fade-up-delay-1">
              The world's first curated destination
              <br />
              for Pakistani fashion is almost here.
            </h1>

            <div className="mt-10 max-w-2xl space-y-6 text-neutral-200 font-light text-base md:text-lg leading-relaxed animate-fade-up-delay-2">
              <p>
                For the first time, the full breadth of Pakistani fashion creativity - from the most contemporary emerging designers to the most ancient craft traditions still practiced today - will exist in one place. Discovered, curated, and presented to buyers who are ready to pay what it is worth.
              </p>
              <p>
                The Adorzia Marketplace is in its final stages of development. We are currently accepting early applications from sellers and building our early access list for buyers. The people who join now will shape what the marketplace becomes.
              </p>
            </div>

            <div className="mt-12 flex flex-wrap gap-6 animate-fade-up-delay-3">
              <a href="#seller" className="px-10 py-5 bg-[#bb9457] text-black font-semibold uppercase tracking-[0.2em] text-[11px] rounded-sm hover:bg-white transition-all duration-300 shadow-lg shadow-[#bb9457]/20 hover:shadow-white/30">
                Apply to sell on Adorzia
              </a>
              <a href="#buyer" className="px-10 py-5 border-2 border-white/40 text-white font-semibold uppercase tracking-[0.2em] text-[11px] rounded-sm hover:border-[#bb9457] hover:text-[#bb9457] transition-all duration-300 backdrop-blur-sm">
                Join the buyer early access list
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* ============================================
          SECTION 4: WHY ADORZIA EXISTS
          Founder manifesto connecting marketplace to larger mission
          ============================================ */}
      {/* Why Adorzia Exists - Founder Manifesto */}
      <section className="py-40 border-t border-neutral-900 bg-neutral-950">
        <div className="max-w-5xl mx-auto px-6 lg:px-8">
          <div className="text-center mb-16">
            <span className="text-[10px] uppercase tracking-[0.3em] text-[#bb9457] font-mono font-semibold">Why Adorzia exists</span>
          </div>

          <div className="space-y-8 text-center">
            <p className="text-white font-light text-xl md:text-2xl leading-relaxed font-serif">
              Pakistani fashion has extraordinary creative talent.
            </p>
            <p className="text-white font-light text-xl md:text-2xl leading-relaxed font-serif">
              What it has lacked is infrastructure.
            </p>
            <p className="text-neutral-400 font-light text-lg md:text-xl leading-relaxed max-w-3xl mx-auto">
              Adorzia exists to give designers and craft makers the tools, visibility, and commercial opportunities required to build sustainable fashion businesses.
            </p>
            <p className="text-neutral-400 font-light text-lg md:text-xl leading-relaxed max-w-3xl mx-auto">
              The marketplace is one part of that mission.
            </p>
          </div>

          <div className="mt-20 p-12 border border-[#bb9457]/30 rounded-sm bg-neutral-950">
            <div className="space-y-6">
              <div className="text-center">
                <div className="font-mono text-[10px] uppercase tracking-[0.3em] text-[#bb9457] font-semibold mb-4">The Adorzia Ecosystem</div>
                <p className="text-neutral-400 font-light leading-relaxed max-w-2xl mx-auto">
                  The marketplace does not exist in isolation. It is part of a larger ecosystem designed to support Pakistani fashion at every stage - from creative development and brand building to market access and commercial growth.
                </p>
              </div>
              <div className="grid md:grid-cols-3 gap-8 pt-8 border-t border-neutral-800">
                <div className="text-center">
                  <div className="font-serif text-lg text-white font-normal mb-2">Spotlight Events</div>
                  <p className="text-neutral-500 font-light text-sm leading-relaxed">
                    Physical showcases that bring Pakistani fashion creativity to life and introduce emerging talent to the industry.
                  </p>
                </div>
                <div className="text-center">
                  <div className="font-serif text-lg text-white font-normal mb-2">The Marketplace</div>
                  <p className="text-neutral-500 font-light text-sm leading-relaxed">
                    A curated online destination where designers and craft makers can sell directly to local and international buyers.
                  </p>
                </div>
                <div className="text-center">
                  <div className="font-serif text-lg text-white font-normal mb-2">Creative Support</div>
                  <p className="text-neutral-500 font-light text-sm leading-relaxed">
                    Tools, guidance, and community for makers building sustainable fashion businesses in Pakistan.
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-16 text-center">
            <p className="text-neutral-400 font-light text-base leading-relaxed max-w-2xl mx-auto">
              When you apply to sell on Adorzia, or join our buyer early access list, you are not just joining a marketplace. You are becoming part of a movement to reposition Pakistani fashion on the global stage.
            </p>
          </div>
        </div>
      </section>

      {/* ============================================
          SECTION 5: MARKETPLACE SNAPSHOT
          Quick overview grid with 6 key selling points
          ============================================ */}
      {/* Marketplace Snapshot */}
      <section className="py-24 border-t border-neutral-900 bg-neutral-950">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="text-center mb-16">
            <span className="text-[10px] uppercase tracking-[0.3em] text-[#bb9457] font-mono font-semibold">Marketplace Snapshot</span>
            <h2 className="mt-6 font-serif text-3xl md:text-5xl text-white font-normal tracking-tight">
              A curated destination for Pakistani fashion creativity
            </h2>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
            {[
              {
                icon: "✓",
                title: "Curated sellers only",
                description: "Every seller reviewed and approved by our curation team. Quality over volume."
              },
              {
                icon: "✓",
                title: "Contemporary fashion + heritage craft",
                description: "Emerging designers and ancient craft traditions in one destination."
              },
              {
                icon: "✓",
                title: "Global buyer audience",
                description: "Local and international buyers discovering Pakistani fashion with full provenance."
              },
              {
                icon: "✓",
                title: "Founding seller benefits",
                description: "Locked-in rates, priority placement, and full onboarding support for early applicants."
              },
              {
                icon: "✓",
                title: "Launching after Spotlight Fall 2026",
                description: "Marketplace opens to the public following our first Spotlight event."
              },
              {
                icon: "✓",
                title: "Story over transaction",
                description: "Every listing carries the maker's name, story, and craft tradition."
              }
            ].map((item, i) => (
              <div key={i} className="p-8 border border-neutral-800 rounded-sm bg-neutral-900/30 hover:border-[#bb9457]/30 transition-colors duration-300">
                <div className="text-2xl text-[#bb9457] mb-4">{item.icon}</div>
                <h3 className="text-white font-semibold text-sm mb-2 uppercase tracking-wider">{item.title}</h3>
                <p className="text-neutral-400 font-light text-sm leading-relaxed">{item.description}</p>
              </div>
            ))}
          </div>

          <div className="flex flex-col sm:flex-row gap-6 justify-center">
            <a href="#seller-form" className="px-8 py-4 bg-[#bb9457] text-black font-semibold uppercase tracking-[0.2em] text-[11px] rounded-sm hover:bg-white transition-all duration-300">
              Apply to sell on Adorzia
            </a>
            <a href="#buyer-form" className="px-8 py-4 border border-white/30 text-white font-semibold uppercase tracking-[0.2em] text-[11px] rounded-sm hover:border-[#bb9457] hover:text-[#bb9457] transition-all duration-300">
              Join the buyer early access list
            </a>
          </div>
        </div>
      </section>

      {/* What The Marketplace Is */}
      <section className="py-40 relative overflow-hidden border-t border-neutral-900">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_bottom,rgba(187,148,87,0.08),transparent_70%)]" />
        
        <div className="max-w-7xl mx-auto px-6 lg:px-8 relative z-10">
          <div className="max-w-4xl mb-20">
            <span className="text-[10px] uppercase tracking-[0.3em] text-[#bb9457] font-mono font-semibold">A marketplace built differently</span>
            <h2 className="mt-6 font-serif text-4xl md:text-6xl text-white font-normal tracking-tight">
              Not a platform. A curated destination.
            </h2>
            <p className="mt-6 text-neutral-400 font-light text-base md:text-lg leading-relaxed">
              There is no shortage of places to sell things online. What has never existed - until now - is a marketplace built specifically around the creative and commercial value of Pakistani fashion, with the curation, the storytelling, and the international positioning to match.
            </p>
            <p className="text-neutral-400 font-light text-base md:text-lg leading-relaxed">
              The Adorzia Marketplace is built on three principles that make it different from every other selling platform available to Pakistani creatives today.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                title: "Curation over volume",
                body: "We do not accept every application. Every seller on Adorzia goes through a review process because the value of the marketplace to buyers - and to every seller on it - depends on the quality of what sits alongside them. Being listed on Adorzia means something. We intend to keep it that way.",
                image: designer1,
                alt: "Contemporary Pakistani fashion designer reviewing collection pieces"
              },
              {
                title: "Story over transaction",
                body: "Every listing on Adorzia carries more than a product and a price. It carries the name of the person who made it, the story behind the work, the craft tradition it belongs to, and the creative vision it represents. Buyers on Adorzia are not just purchasing a product. They are connecting with the person and the culture behind it.",
                image: craft,
                alt: "Traditional artisan creating handcrafted fashion work using heritage techniques"
              },
              {
                title: "Fair value over false modesty",
                body: "Pakistani fashion and craft has been chronically underpriced - on domestic platforms, in export markets, and in the cultural imagination of what it is worth. Adorzia is built to correct that. We help every seller understand the true market value of their work and present it accordingly. What is made here deserves to be priced like it matters - because it does.",
                image: studio,
                alt: "Fashion designer working in creative studio on Pakistani fashion collection"
              }
            ].map((principle, i) => (
              <div key={i} className="group p-10 border border-neutral-900 rounded-sm bg-neutral-950 hover:border-[#bb9457]/30 transition-colors duration-300 hover-lift">
                <div className="aspect-[4/3] overflow-hidden rounded-sm mb-6">
                  <img src={principle.image} alt={principle.alt} loading="lazy" className="w-full h-full object-cover grayscale contrast-125 group-hover:scale-105 transition-transform duration-700" />
                </div>
                <div className="font-mono text-[10px] text-[#bb9457] uppercase tracking-[0.2em] mb-4">PRINCIPLE {String(i + 1).padStart(2, '0')}</div>
                <h3 className="font-serif text-2xl text-white font-normal mb-4">{principle.title}</h3>
                <p className="text-neutral-400 font-light leading-relaxed text-sm">{principle.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ============================================
          SECTION 9: TRUST SECTION
          Six trust pillars to reduce skepticism
          ============================================ */}
      {/* Why Designers Trust Adorzia */}
      <section className="py-40 border-t border-neutral-900">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="max-w-4xl mb-20">
            <span className="text-[10px] uppercase tracking-[0.3em] text-[#bb9457] font-mono font-semibold">Why designers trust Adorzia</span>
            <h2 className="mt-6 font-serif text-4xl md:text-6xl text-white font-normal tracking-tight">
              A marketplace that protects your work.
            </h2>
            <p className="mt-6 text-neutral-400 font-light text-base md:text-lg leading-relaxed">
              We understand the hesitation. You have seen what happens when craft is commoditized, when designers are reduced to product listings, and when platforms prioritize volume over value. Adorzia is built differently - and we are committed to proving that to every seller who joins us.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                title: "Curated approval process",
                description: "We do not accept every application. Every seller goes through review because the quality of the marketplace protects everyone on it."
              },
              {
                title: "No mass-market seller onboarding",
                description: "This is not a platform where anyone can list anything. Adorzia remains selective by design, ensuring your work is surrounded by quality, not noise."
              },
              {
                title: "Founder support and onboarding",
                description: "Approved sellers receive full onboarding support - listing copywriting, photography guidance, pricing advice, and platform walkthrough. You are not left to figure it out alone."
              },
              {
                title: "Story-first brand positioning",
                description: "Your Adorzia seller profile is more than a shop page. It is your brand story - who you are, what you make, what drives your work, and why buyers should care."
              },
              {
                title: "International buyer reach",
                description: "We are building the infrastructure for Pakistani fashion to reach the world - transparent shipping, customs guidance, and cross-border fulfillment support."
              },
              {
                title: "Heritage craft protection",
                description: "Heritage craft listings include full provenance documentation. Every piece carries the name, region, and tradition of the maker. Nothing is anonymous. Nothing is treated as a commodity."
              }
            ].map((item, i) => (
              <div key={i} className="p-10 border border-neutral-800 rounded-sm bg-neutral-950 hover:border-[#bb9457]/30 transition-colors duration-300">
                <div className="w-12 h-px bg-[#bb9457] mb-6" />
                <h3 className="font-serif text-xl text-white font-normal mb-4">{item.title}</h3>
                <p className="text-neutral-400 font-light leading-relaxed text-sm">{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ============================================
          SECTION 6: MARKETPLACE STATISTICS
          Measurable credibility signals (5 metrics)
          ============================================ */}
      {/* Marketplace Statistics */}
      <section className="py-24 border-t border-neutral-900 bg-neutral-900/30">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="grid md:grid-cols-2 lg:grid-cols-5 gap-8">
            <div className="text-center p-8">
              <div className="font-serif text-4xl md:text-5xl text-[#bb9457] font-normal mb-3">Fall 2026</div>
              <div className="text-xs text-neutral-400 font-light uppercase tracking-wider">Launching</div>
            </div>
            <div className="text-center p-8">
              <div className="font-serif text-4xl md:text-5xl text-[#bb9457] font-normal mb-3">2</div>
              <div className="text-xs text-neutral-400 font-light uppercase tracking-wider mb-2">Categories</div>
              <div className="text-xs text-neutral-500 font-light">Contemporary Fashion + Heritage Craft</div>
            </div>
            <div className="text-center p-8">
              <div className="font-serif text-4xl md:text-5xl text-[#bb9457] font-normal mb-3">100%</div>
              <div className="text-xs text-neutral-400 font-light uppercase tracking-wider">Curated Applications</div>
            </div>
            <div className="text-center p-8">
              <div className="font-serif text-4xl md:text-5xl text-[#bb9457] font-normal mb-3">Global</div>
              <div className="text-xs text-neutral-400 font-light uppercase tracking-wider">Buyer Access</div>
            </div>
            <div className="text-center p-8">
              <div className="font-serif text-4xl md:text-5xl text-[#bb9457] font-normal mb-3">Now</div>
              <div className="text-xs text-neutral-400 font-light uppercase tracking-wider mb-2">Founding Seller</div>
              <div className="text-xs text-neutral-500 font-light">Applications Open</div>
            </div>
          </div>
        </div>
      </section>

      {/* ============================================
          SECTION 8: TWO CATEGORIES
          Detailed breakdown of Contemporary Designers and Heritage Craft
          ============================================ */}
      {/* Two Categories */}
      <section className="py-40 border-t border-neutral-900">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="text-center max-w-4xl mx-auto mb-20">
            <span className="text-[10px] uppercase tracking-[0.3em] text-[#bb9457] font-mono font-semibold">What you will find here</span>
            <h2 className="mt-6 font-serif text-4xl md:text-6xl text-white font-normal tracking-tight">
              Two worlds of Pakistani creativity. One destination.
            </h2>
          </div>

          {/* Category 1: Contemporary Designers */}
          <div className="grid lg:grid-cols-12 gap-16 items-start mb-40">
            <div className="lg:col-span-7">
              <span className="text-[10px] uppercase tracking-[0.3em] text-[#bb9457] font-mono font-semibold">Emerging Pakistani fashion</span>
              <h3 className="mt-6 font-serif text-4xl md:text-5xl text-white font-normal tracking-tight mb-8">
                Contemporary designers
              </h3>
              <p className="text-neutral-400 font-light text-base md:text-lg leading-relaxed mb-6">
                Pakistan's next generation of fashion designers is producing work that belongs on the international stage - bold, original, culturally rooted, and commercially compelling. The contemporary designer category on Adorzia is where early-stage fashion brands find their first serious buyer audience.
              </p>
              <p className="text-white font-normal mb-8">What you will find:</p>
              <ul className="space-y-4 text-neutral-400 font-light">
                <li className="flex gap-3"><span className="text-[#bb9457] mt-1">-</span><span>Ready-to-wear collections from emerging Pakistani designers</span></li>
                <li className="flex gap-3"><span className="text-[#bb9457] mt-1">-</span><span>Made-to-order pieces with distinctive creative identities</span></li>
                <li className="flex gap-3"><span className="text-[#bb9457] mt-1">-</span><span>Fashion accessories and objects</span></li>
                <li className="flex gap-3"><span className="text-[#bb9457] mt-1">-</span><span>Fabric-forward contemporary design</span></li>
                <li className="flex gap-3"><span className="text-[#bb9457] mt-1">-</span><span>Small-batch limited collections that will not be available anywhere else</span></li>
                <li className="flex gap-3"><span className="text-[#bb9457] mt-1">-</span><span>Brands that are one year old, two years old, three years old - and already making work that demands to be seen</span></li>
              </ul>
              <p className="mt-8 text-white font-serif text-xl italic">
                These are not established names. They are the names you will be saying you discovered first.
              </p>
            </div>
            <div className="lg:col-span-5">
              <div className="sticky top-32 space-y-6">
                <div className="aspect-[4/5] overflow-hidden rounded-sm">
                  <img src={designer2} alt="Emerging Pakistani fashion designer showcasing contemporary womenswear collection" loading="lazy" className="w-full h-full object-cover grayscale contrast-125 hover:scale-105 transition-transform duration-700" />
                </div>
                <div className="grid grid-cols-2 gap-6">
                  <div className="aspect-square overflow-hidden rounded-sm">
                    <img src={designer3} alt="Independent fashion designer working on fabric-forward contemporary design" loading="lazy" className="w-full h-full object-cover grayscale contrast-125 hover:scale-105 transition-transform duration-700" />
                  </div>
                  <div className="aspect-square overflow-hidden rounded-sm">
                    <img src={spotlightImg} alt="Pakistani fashion presentation at Adorzia Spotlight event" loading="lazy" className="w-full h-full object-cover grayscale contrast-125 hover:scale-105 transition-transform duration-700" />
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Category 2: Heritage Craft */}
          <div className="grid lg:grid-cols-12 gap-16 items-start">
            <div className="lg:col-span-5 lg:order-1">
              <div className="sticky top-32 space-y-6">
                <div className="aspect-[4/5] overflow-hidden rounded-sm">
                  <img src={craft} alt="Traditional Pakistani artisan creating heritage craft fashion using ancestral techniques" loading="lazy" className="w-full h-full object-cover grayscale contrast-125 hover:scale-105 transition-transform duration-700" />
                </div>
                <div className="grid grid-cols-2 gap-6">
                  <div className="aspect-square overflow-hidden rounded-sm">
                    <img src={studio} alt="Fashion designer crafting made-to-order pieces in Pakistani design studio" loading="lazy" className="w-full h-full object-cover grayscale contrast-125 hover:scale-105 transition-transform duration-700" />
                  </div>
                  <div className="aspect-square overflow-hidden rounded-sm">
                    <img src={designer1} alt="Contemporary Pakistani fashion brand showcasing original collection" loading="lazy" className="w-full h-full object-cover grayscale contrast-125 hover:scale-105 transition-transform duration-700" />
                  </div>
                </div>
              </div>
            </div>
            <div className="lg:col-span-7 lg:order-2">
              <span className="text-[10px] uppercase tracking-[0.3em] text-[#bb9457] font-mono font-semibold">Pakistan's living craft traditions</span>
              <h3 className="mt-6 font-serif text-4xl md:text-5xl text-white font-normal tracking-tight mb-8">
                Heritage craft
              </h3>
              <p className="text-neutral-400 font-light text-base md:text-lg leading-relaxed mb-6">
                Pakistan carries one of the most extraordinary accumulations of textile and craft knowledge in the world. Ajrak block printing from Sindh. Phulkari embroidery from Punjab. Rilli patchwork quilting from Balochistan. Pashmina and shawl weaving from Kashmir. Khaddar handloom weaving from across the country. Mirror work, thread work, and hand embroidery traditions that have been refined across centuries.
              </p>
              <p className="text-neutral-400 font-light text-base md:text-lg leading-relaxed mb-6">
                These traditions are not museum pieces. They are living crafts practiced by masters who have dedicated their lives to them - and they deserve to reach buyers who understand and value what they represent.
              </p>
              <p className="text-neutral-400 font-light text-base md:text-lg leading-relaxed mb-8">
                The heritage craft category on Adorzia is where those traditions meet the market that has always been waiting for them. Every piece carries the name, the region, and the tradition of the person who made it. Nothing is anonymous. Nothing is treated as a commodity.
              </p>
              <p className="text-white font-normal mb-8">What you will find:</p>
              <ul className="space-y-4 text-neutral-400 font-light">
                <li className="flex gap-3"><span className="text-[#bb9457] mt-1">-</span><span>Handcrafted textile pieces with documented craft provenance</span></li>
                <li className="flex gap-3"><span className="text-[#bb9457] mt-1">-</span><span>Heritage embroidery and needlework</span></li>
                <li className="flex gap-3"><span className="text-[#bb9457] mt-1">-</span><span>Hand-woven fabrics and finished garments</span></li>
                <li className="flex gap-3"><span className="text-[#bb9457] mt-1">-</span><span>Block-printed cloth and clothing</span></li>
                <li className="flex gap-3"><span className="text-[#bb9457] mt-1">-</span><span>Craft objects at the intersection of fashion and art</span></li>
                <li className="flex gap-3"><span className="text-[#bb9457] mt-1">-</span><span>Work that cannot be replicated by a machine - and should never be priced as though it could</span></li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works For Buyers */}
      <section id="buyer" className="py-40 relative overflow-hidden border-t border-neutral-900 bg-neutral-900">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(187,148,87,0.1),transparent_70%)]" />
        
        <div className="max-w-7xl mx-auto px-6 lg:px-8 relative z-10">
          <div className="max-w-4xl mb-20">
            <span className="text-[10px] uppercase tracking-[0.3em] text-[#bb9457] font-mono font-semibold">For buyers</span>
            <h2 className="mt-6 font-serif text-4xl md:text-6xl text-white font-normal tracking-tight">
              Discover Pakistani fashion the way it deserves to be discovered.
            </h2>
            <p className="mt-6 text-neutral-400 font-light text-base md:text-lg leading-relaxed">
              Adorzia is built for buyers who are tired of generic marketplaces and ready to invest in something with genuine creative and cultural value. Here is how the experience works.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mb-20">
            {[
              {
                step: "01",
                title: "Browse with context",
                body: "Every listing on Adorzia comes with the full story - who made it, where they are from, what tradition or creative vision informs the work, and why this piece exists. You are not scrolling through a product grid. You are moving through a curated editorial experience where every item has earned its place."
              },
              {
                step: "02",
                title: "Buy with confidence",
                body: "Every seller on Adorzia has been reviewed and approved by our curation team. Every listing meets our standards for quality, authenticity, and creative integrity. When you buy on Adorzia you know exactly what you are getting and exactly who made it."
              },
              {
                step: "03",
                title: "Connect directly with makers",
                body: "Adorzia facilitates direct communication between buyers and sellers for made-to-order pieces, custom commissions, and wholesale enquiries. If you want something specific, or want to build a longer relationship with a maker whose work you love - the platform makes that straightforward."
              },
              {
                step: "04",
                title: "Receive something worth keeping",
                body: "Packaging, presentation, and the care with which orders are fulfilled on Adorzia reflects the value of what is inside. We work with sellers to ensure that the experience of receiving something from the marketplace matches the experience of discovering it."
              }
            ].map((step, i) => (
              <div key={i} className="p-10 border border-neutral-900 rounded-sm bg-neutral-950 hover:border-[#bb9457]/30 transition-colors duration-300">
                <div className="font-mono text-[10px] text-[#bb9457] uppercase tracking-[0.3em] mb-4">STEP {step.step}</div>
                <h3 className="font-serif text-xl text-white font-normal mb-4">{step.title}</h3>
                <p className="text-neutral-400 font-light leading-relaxed text-sm">{step.body}</p>
              </div>
            ))}
          </div>

          {/* International Buyers */}
          <div className="max-w-3xl p-10 border border-[#bb9457]/30 rounded-sm bg-neutral-950 mb-16">
            <h3 className="text-[10px] uppercase tracking-[0.3em] text-[#bb9457] font-mono font-semibold mb-4">For international buyers</h3>
            <p className="text-neutral-400 font-light leading-relaxed">
              Adorzia supports international orders with transparent shipping costs, customs guidance for Pakistani exports, and seller support to ensure cross-border orders are fulfilled properly. We are building the infrastructure for Pakistani fashion to reach the world - one order at a time.
            </p>
          </div>

          <div className="text-center">
            <a href="#buyer-form" className="px-8 py-4 bg-[#bb9457] text-black font-semibold uppercase tracking-[0.2em] text-[11px] rounded-sm hover:bg-white transition-all duration-300 inline-block">
              Join the buyer early access list
            </a>
          </div>
        </div>
      </section>

      {/* ============================================
          SECTION 11: HOW IT WORKS FOR SELLERS
          Benefits, costs, and support for sellers
          ============================================ */}
      {/* How It Works For Sellers */}
      <section id="seller" className="py-40 border-t border-neutral-900">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="grid lg:grid-cols-12 gap-16">
            <div className="lg:col-span-4">
              <div className="sticky top-32">
                <div className="aspect-[4/5] overflow-hidden rounded-sm mb-8">
                  <img src={brand1} alt="Pakistani fashion designer presenting contemporary collection to buyers" loading="lazy" className="w-full h-full object-cover grayscale contrast-125 hover:scale-105 transition-transform duration-700" />
                </div>
                <span className="text-[10px] uppercase tracking-[0.3em] text-[#bb9457] font-mono font-semibold">For sellers</span>
                <h2 className="mt-6 font-serif text-4xl text-white font-normal tracking-tight mb-6">
                  List once. Reach everywhere.
                </h2>
                <p className="text-neutral-400 font-light leading-relaxed">
                  Adorzia is designed to make selling your work as straightforward as possible - while giving it the context, the positioning, and the audience it deserves. Here is what the seller experience looks like.
                </p>
              </div>
            </div>

            <div className="lg:col-span-8">
              {/* Timeline Container */}
              <div className="relative">
                {/* Vertical Golden Line */}
                <div className="absolute left-8 top-0 bottom-0 w-px bg-gradient-to-b from-[#bb9457] via-[#bb9457]/50 to-transparent hidden md:block" />

                <div className="space-y-16">
                  {[
                    {
                      step: "01",
                      icon: "✦",
                      title: "Apply to list",
                      body: "Submit your seller application with images of your work, a short description of your creative practice, and information about what you plan to list. Our curation team reviews every application. We are looking for quality, originality, and creative integrity - not follower counts or existing sales history."
                    },
                    {
                      step: "02",
                      icon: "◈",
                      title: "Get onboarding support",
                      body: "Approved sellers receive full onboarding support before going live. This includes listing copywriting guidance, photography recommendations, pricing advice based on the true market value of your work, and a walkthrough of the seller dashboard. We do not approve you and leave you to figure out the rest alone."
                    },
                    {
                      step: "03",
                      icon: "◉",
                      title: "Build your seller profile",
                      body: "Your Adorzia seller profile is more than a shop page. It is your brand story - where you are from, what you make, what tradition or creative vision drives your work, and why a buyer should care. We help you tell that story in a way that connects with the buyers on our platform."
                    },
                    {
                      step: "04",
                      icon: "◆",
                      title: "List your products",
                      body: "Upload your products with images, descriptions, pricing, and availability. Made-to-order listings include lead times. Heritage craft listings include provenance information. Every listing is reviewed before going live to ensure it meets our quality and presentation standards."
                    },
                    {
                      step: "05",
                      icon: "✧",
                      title: "Sell and grow",
                      body: "When a buyer purchases your work, you receive a notification, fulfill the order, and receive payment through our secure transaction system. Adorzia takes a commission on each sale - our full fee structure is shared during onboarding. As your presence on the platform grows, you gain access to promotional features, buyer introductions, and the wider Adorzia ecosystem including studio membership and Spotlight eligibility."
                    }
                  ].map((step, i) => (
                    <div key={i} className="relative flex gap-8 md:gap-12 group">
                      {/* Step Number Circle */}
                      <div className="flex-shrink-0">
                        <div className="w-16 h-16 rounded-full border-2 border-[#bb9457] bg-neutral-950 flex items-center justify-center group-hover:bg-[#bb9457]/10 transition-all duration-300">
                          <span className="font-serif text-2xl text-[#bb9457] font-normal">{step.step}</span>
                        </div>
                      </div>

                      {/* Content */}
                      <div className="flex-1 pt-2">
                        <div className="flex items-center gap-3 mb-4">
                          <span className="text-[#bb9457] text-xl">{step.icon}</span>
                          <h3 className="font-serif text-2xl md:text-3xl text-white font-normal">{step.title}</h3>
                        </div>
                        <p className="text-neutral-400 font-light leading-relaxed">{step.body}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* What it costs */}
              <div className="p-10 border border-[#bb9457]/30 rounded-sm bg-neutral-950">
                <h3 className="text-[10px] uppercase tracking-[0.3em] text-[#bb9457] font-mono font-semibold mb-4">What it costs</h3>
                <p className="text-neutral-400 font-light leading-relaxed mb-4">
                  We operate on a commission model with no upfront listing fees for early sellers joining during our preview phase. Full fee structure published at launch.
                </p>
                <p className="text-white font-medium text-sm">
                  Apply before December 31, 2026 to lock in founding seller rates.
                </p>
              </div>

              <div>
                <a href="#seller-form" className="px-8 py-4 bg-[#bb9457] text-black font-semibold uppercase tracking-[0.2em] text-[11px] rounded-sm hover:bg-white transition-all duration-300 inline-block">
                  Apply to become a seller
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ============================================
          EDITORIAL BANNER 1: BETWEEN HOW IT WORKS AND FEATURED LISTINGS
          Cinematic fashion photography with minimal text
          ============================================ */}
      <section className="relative h-[70vh] min-h-[500px] overflow-hidden">
        <div className="absolute inset-0">
          <img src={banner3} alt="Traditional Pakistani artisan creating heritage craft textile" loading="lazy" className="w-full h-full object-cover animate-parallax" />
        </div>
        <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/50 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-t from-neutral-950 via-transparent to-transparent" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_50%,rgba(187,148,87,0.15),transparent_60%)]" />
        <div className="relative z-10 h-full flex items-center">
          <div className="max-w-7xl mx-auto px-6 lg:px-8">
            <h2 className="font-serif text-5xl md:text-7xl lg:text-8xl text-white font-normal tracking-tight max-w-3xl animate-fade-up">
              Craft meets
              <br />
              commerce.
            </h2>
          </div>
        </div>
      </section>

      {/* ============================================
          SECTION 10: FEATURED LISTINGS PREVIEW
          Four realistic fictional examples to showcase marketplace
          ============================================ */}
      {/* Featured Listings Preview */}
      <section className="py-40 relative overflow-hidden border-t border-neutral-900 bg-neutral-900">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(187,148,87,0.08),transparent_70%)]" />
        
        <div className="max-w-7xl mx-auto px-6 lg:px-8 relative z-10">
          <div className="max-w-4xl mb-20">
            <span className="text-[10px] uppercase tracking-[0.3em] text-[#bb9457] font-mono font-semibold">A glimpse of what is coming</span>
            <h2 className="mt-6 font-serif text-4xl md:text-6xl text-white font-normal tracking-tight">
              The marketplace is being built. This is what it will feel like.
            </h2>
            <p className="mt-6 text-neutral-400 font-light text-base md:text-lg leading-relaxed">
              We are in our curation phase - reviewing early seller applications and building the collection that will define the Adorzia Marketplace at launch. Here is a preview of the kind of work that will live here.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              {
                category: "Contemporary Designer",
                title: "The Indigo Nomad Capsule",
                maker: "Ayesha Khan",
                location: "Lahore",
                tags: ["Limited Edition", "Made To Order"],
                description: "Limited-run contemporary womenswear inspired by indigenous Ajrak dyeing traditions. Six pieces exploring the intersection of heritage craft and modern silhouettes.",
                image: brand1,
                alt: "Contemporary Pakistani womenswear collection inspired by traditional Ajrak dyeing"
              },
              {
                category: "Heritage Craft",
                title: "Sindhi Rilli Collection",
                maker: "Zainab Bhutto",
                location: "Hyderabad",
                tags: ["Handcrafted", "5th Generation"],
                description: "Hand-stitched patchwork quilts using techniques passed down through five generations. Each piece takes three weeks to complete, carrying the geometric language of Sindh.",
                image: brand2,
                alt: "Traditional Sindhi Rilli patchwork quilt made using five-generation craft techniques"
              },
              {
                category: "Contemporary Designer",
                title: "Thread & Terrain",
                maker: "Hassan Ali",
                location: "Karachi",
                tags: ["Debut Collection", "Textile-Forward"],
                description: "A fashion entrepreneur's debut collection exploring urban Pakistani identity through textile manipulation and architectural tailoring. Eighteen months in development.",
                image: brand3,
                alt: "Contemporary Pakistani fashion collection exploring urban identity through textile design"
              },
              {
                category: "Heritage Craft",
                title: "Kashmir Pashmina Archive",
                maker: "Ghulam Rasool",
                location: "Srinagar",
                tags: ["Master Weaver", "Since 1920"],
                description: "Hand-woven pashmina shawls from a master weaver whose family has worked with Kashmiri wool since 1920. Each piece authenticated and documented with full provenance.",
                image: runwayImg,
                alt: "Hand-woven Kashmir pashmina shawl crafted by master weaver using traditional techniques"
              }
            ].map((card, i) => (
              <div key={i} className="group relative border border-neutral-900 rounded-sm bg-neutral-950 overflow-hidden hover:border-[#bb9457]/50 transition-all duration-500">
                {/* Image Container */}
                <div className="relative aspect-[4/5] overflow-hidden">
                  <img 
                    src={card.image} 
                    alt={card.alt} 
                    loading="lazy" 
                    className="w-full h-full object-cover grayscale contrast-125 group-hover:scale-110 group-hover:grayscale-0 transition-all duration-700" 
                  />
                  
                  {/* Floating Category Badge */}
                  <div className="absolute top-4 left-4 px-3 py-2 bg-neutral-950/90 backdrop-blur-sm border border-[#bb9457]/30 rounded-sm">
                    <span className="text-[9px] uppercase tracking-[0.2em] text-[#bb9457] font-mono font-semibold">{card.category}</span>
                  </div>

                  {/* Hover Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-neutral-950 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                </div>

                {/* Content */}
                <div className="p-6">
                  {/* Title */}
                  <h3 className="font-serif text-lg text-white font-normal mb-3 group-hover:text-[#bb9457] transition-colors duration-300">{card.title}</h3>

                  {/* Maker & Location */}
                  <div className="flex items-center gap-2 mb-4">
                    <span className="text-neutral-300 font-light text-sm">{card.maker}</span>
                    <span className="text-neutral-600">·</span>
                    <span className="text-neutral-500 font-light text-sm">{card.location}</span>
                  </div>

                  {/* Product Tags */}
                  <div className="flex flex-wrap gap-2 mb-4">
                    {card.tags.map((tag, j) => (
                      <span key={j} className="px-2 py-1 bg-neutral-900 border border-neutral-800 rounded-sm text-[10px] uppercase tracking-[0.15em] text-neutral-400 font-light">
                        {tag}
                      </span>
                    ))}
                  </div>

                  {/* Preview Button */}
                  <button className="w-full mt-2 px-4 py-3 border border-[#bb9457]/50 text-[#bb9457] text-[10px] uppercase tracking-[0.2em] font-semibold rounded-sm hover:bg-[#bb9457] hover:text-black transition-all duration-300 opacity-0 group-hover:opacity-100 transform translate-y-2 group-hover:translate-y-0">
                    Preview Collection →
                  </button>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-20 text-center">
            <p className="text-white font-serif text-xl md:text-2xl font-normal tracking-tight max-w-4xl mx-auto">
              These spots belong to the people who apply now. The marketplace launches after Spotlight Fall 2026 - and our founding sellers will be introduced to our buyer network as the first names on the platform.
            </p>
          </div>
        </div>
      </section>

      {/* ============================================
          EDITORIAL BANNER 2: BEFORE SELLER APPLICATION CTA
          Cinematic fashion photography with minimal text
          ============================================ */}
      <section className="relative h-[70vh] min-h-[500px] overflow-hidden">
        <div className="absolute inset-0">
          <img src={fashionBanner} alt="Contemporary Pakistani fashion designer presenting collection" loading="lazy" className="w-full h-full object-cover animate-parallax" />
        </div>
        <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/40 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-t from-neutral-950 via-transparent to-transparent" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_50%,rgba(187,148,87,0.12),transparent_60%)]" />
        <div className="relative z-10 h-full flex items-center">
          <div className="max-w-7xl mx-auto px-6 lg:px-8">
            <h2 className="font-serif text-5xl md:text-7xl lg:text-8xl text-white font-normal tracking-tight max-w-4xl animate-fade-up">
              Your work
              <br />
              deserves visibility.
            </h2>
          </div>
        </div>
      </section>

      {/* ============================================
          MARKETPLACE STATISTICS
          Premium metrics block with large serif numbers
          ============================================ */}
      <section className="py-32 border-t border-neutral-900 bg-neutral-950">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="text-center mb-20">
            <span className="text-[10px] uppercase tracking-[0.3em] text-[#bb9457] font-mono font-semibold">Marketplace at a glance</span>
            <h2 className="mt-6 font-serif text-4xl md:text-5xl text-white font-normal tracking-tight">
              The numbers behind the mission.
            </h2>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-8">
            {[
              {
                number: "50+",
                label: "Founding Seller Positions",
                description: "Limited positions available before public launch"
              },
              {
                number: "20+",
                label: "Cities Across Pakistan",
                description: "From Karachi to Khyber, Lahore to Larkana"
              },
              {
                number: "100%",
                label: "Curated Applications",
                description: "Every seller reviewed by our curation team"
              },
              {
                number: "Global",
                label: "Buyer Access",
                description: "Local and international buyers from day one"
              }
            ].map((stat, i) => (
              <div key={i} className="relative text-center">
                <div className="font-serif text-6xl md:text-7xl text-[#bb9457] font-normal tracking-tight mb-4">
                  {stat.number}
                </div>
                <div className="text-white font-normal text-lg mb-2">{stat.label}</div>
                <div className="text-neutral-500 font-light text-sm">{stat.description}</div>
                {i < 3 && (
                  <div className="hidden lg:block absolute right-0 top-1/2 -translate-y-1/2 w-px h-24 bg-gradient-to-b from-transparent via-neutral-800 to-transparent" />
                )}
              </div>
            ))}
          </div>

          <div className="mt-20 pt-12 border-t golden-divider text-center">
            <p className="text-neutral-400 font-light text-base md:text-lg leading-relaxed max-w-3xl mx-auto">
              The Adorzia Marketplace is being built with intention - not scale. Every seller, every listing, every buyer relationship matters. These numbers will grow, but our commitment to curation will not change.
            </p>
          </div>
        </div>
      </section>

      {/* ============================================
          SECTION 12: SELLER APPLICATION CTA
          Urgency messaging with founding seller deadline
          ============================================ */}
      {/* Seller Application CTA */}
      <section className="py-40 relative overflow-hidden border-t border-neutral-900">
        <div className="absolute inset-0 opacity-15">
          <img src={studio} alt="Pakistani fashion designer working on collection in creative studio" loading="lazy" className="w-full h-full object-cover grayscale animate-ambient-swell" />
        </div>
        <div className="absolute inset-0 bg-gradient-to-b from-neutral-950 via-neutral-950/95 to-neutral-950" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(187,148,87,0.1),transparent_70%)]" />
        
        <div className="max-w-7xl mx-auto px-6 lg:px-8 relative z-10">
          <div className="grid lg:grid-cols-12 gap-16 items-center">
            <div className="lg:col-span-7">
              <span className="text-[10px] uppercase tracking-[0.3em] text-[#bb9457] font-mono font-semibold">Your work belongs here</span>
              <h2 className="mt-6 font-serif text-4xl md:text-6xl text-white font-normal tracking-tight">
                Apply to be among the first sellers on the Adorzia Marketplace.
              </h2>
              
              <div className="mt-8 max-w-3xl space-y-6 text-neutral-300 font-light text-base md:text-lg leading-relaxed">
                <p>
                  We are accepting a limited number of seller applications during our preview phase - before the marketplace opens to the public following Spotlight Fall 2026. Sellers who apply now receive founding seller rates, priority curation review, and full onboarding support before launch.
                </p>
                <p>
                  If you are a fashion designer, a heritage craft maker, or a fashion entrepreneur with original Pakistani work ready to reach a global audience - this is the moment to apply.
                </p>
              </div>

              <div className="mt-12">
                <h3 className="text-[10px] uppercase tracking-[0.3em] text-[#bb9457] font-mono font-semibold mb-6">Founding Seller Applications</h3>
                <div className="p-6 border border-[#bb9457]/30 rounded-sm bg-neutral-950 mb-6">
                  <div className="font-serif text-2xl text-[#bb9457] font-normal mb-2">Priority review until December 31, 2026</div>
                  <p className="text-neutral-400 font-light text-sm leading-relaxed">
                    Only a limited number of founding seller positions will be available before launch. Applications received after this date will be reviewed for the next intake.
                  </p>
                </div>
                <ul className="space-y-4 text-neutral-400 font-light">
                  <li className="flex gap-3"><span className="text-[#bb9457] mt-1">-</span><span>Locked-in commission rates before public launch pricing</span></li>
                  <li className="flex gap-3"><span className="text-[#bb9457] mt-1">-</span><span>Priority placement in marketplace launch promotion</span></li>
                  <li className="flex gap-3"><span className="text-[#bb9457] mt-1">-</span><span>Full onboarding and listing support from the Adorzia team</span></li>
                  <li className="flex gap-3"><span className="text-[#bb9457] mt-1">-</span><span>Early access to our buyer network ahead of public opening</span></li>
                  <li className="flex gap-3"><span className="text-[#bb9457] mt-1">-</span><span>Spotlight eligibility and full Adorzia ecosystem access</span></li>
                  <li className="flex gap-3"><span className="text-[#bb9457] mt-1">-</span><span>The permanent distinction of being one of the first names on the platform</span></li>
                </ul>
              </div>

              <div className="mt-12 flex flex-col sm:flex-row gap-6 items-start">
                <a href="#seller-form" className="px-8 py-4 bg-[#bb9457] text-black font-semibold uppercase tracking-[0.2em] text-[11px] rounded-sm hover:bg-white transition-all duration-300 inline-block">
                  Apply to sell on Adorzia
                </a>
              </div>
              <p className="mt-6 text-neutral-500 font-light text-sm">
                Applications reviewed on a rolling basis. We respond to every complete application within seven working days.
              </p>
            </div>

            <div className="lg:col-span-5">
              <div className="space-y-6">
                <div className="aspect-[4/5] overflow-hidden rounded-sm">
                  <img src={designer1} alt="Contemporary Pakistani fashion designer presenting original collection" loading="lazy" className="w-full h-full object-cover grayscale contrast-125 hover:scale-105 transition-transform duration-700" />
                </div>
                <div className="grid grid-cols-2 gap-6">
                  <div className="aspect-square overflow-hidden rounded-sm">
                    <img src={brand3} alt="Traditional Pakistani craft artisan creating heritage textile work" loading="lazy" className="w-full h-full object-cover grayscale contrast-125 hover:scale-105 transition-transform duration-700" />
                  </div>
                  <div className="aspect-square overflow-hidden rounded-sm">
                    <img src={designer3} alt="Emerging Pakistani fashion brand showcasing contemporary design" loading="lazy" className="w-full h-full object-cover grayscale contrast-125 hover:scale-105 transition-transform duration-700" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ============================================
          SECTION 14: FAQ SECTION
          Eight common questions in accordion format
          ============================================ */}
      {/* FAQ Section */}
      <section className="py-40 border-t border-neutral-900">
        <div className="max-w-4xl mx-auto px-6 lg:px-8">
          <div className="text-center mb-20">
            <span className="text-[10px] uppercase tracking-[0.3em] text-[#bb9457] font-mono font-semibold">Frequently asked questions</span>
            <h2 className="mt-6 font-serif text-4xl md:text-5xl text-white font-normal tracking-tight">
              Everything you need to know.
            </h2>
            <p className="mt-6 text-neutral-400 font-light text-base md:text-lg leading-relaxed">
              Whether you are a seller looking to list your work or a buyer searching for authentic Pakistani fashion, here are the answers to the questions we hear most often.
            </p>
          </div>

          <div className="space-y-4">
            {[
              {
                question: "When does the marketplace launch?",
                answer: "The Adorzia Marketplace will launch to the public following our first Spotlight event in Fall 2026. We are currently in our curation phase - reviewing seller applications, onboarding founding sellers, and building the collection that will define the marketplace at launch. Early access members will get in before the public opening."
              },
              {
                question: "Who can sell on Adorzia?",
                answer: "Adorzia is open to emerging fashion designers, independent makers, artisan-led labels, textile innovators, heritage craft practitioners, and fashion accessories brands based in Pakistan. We are looking for creators who produce original work - whether that means designing contemporary fashion or practicing traditional craft. We do not accept resellers, mass-produced imports, or generic wholesale products."
              },
              {
                question: "How much does it cost to sell on Adorzia?",
                answer: "We operate on a commission model with no upfront listing fees for early sellers joining during our preview phase. Adorzia takes a commission on each sale - our full fee structure is shared during onboarding. Apply before December 31, 2026 to lock in our founding seller rates, which will be lower than public launch pricing. There are no hidden fees, monthly subscriptions, or setup costs."
              },
              {
                question: "Do I need an existing brand to apply?",
                answer: "No. We are looking for quality, originality, and creative integrity - not follower counts or existing sales history. Whether you are a fashion designer in your first year of operation or a heritage craft maker who has been practicing for decades, what matters is the quality and authenticity of your work. Many of our founding sellers are at the early stages of building their brands."
              },
              {
                question: "Can heritage craft makers apply?",
                answer: "Absolutely. Heritage craft makers are central to what Adorzia is building. Whether you practice Ajrak block printing, Phulkari embroidery, Rilli patchwork, Pashmina weaving, Khaddar handloom, or any other Pakistani craft tradition - you belong here. Every heritage craft listing includes full provenance documentation, and we work with craft makers to ensure their work is presented with the respect and context it deserves."
              },
              {
                question: "Will international shipping be available?",
                answer: "Yes. Adorzia supports international orders with transparent shipping costs, customs guidance for Pakistani exports, and seller support to ensure cross-border orders are fulfilled properly. We are building the infrastructure for Pakistani fashion to reach the world - one order at a time. International buyers can expect clear shipping timelines and proper documentation for all cross-border purchases."
              },
              {
                question: "How are sellers selected?",
                answer: "Every seller application is reviewed by our curation team. We assess quality, originality, creative integrity, and alignment with Adorzia's values. We do not use automated approval systems or accept every application. The curation process typically takes seven working days, and we provide honest feedback to every applicant. Being listed on Adorzia means something - we intend to keep it that way."
              },
              {
                question: "Can buyers order internationally?",
                answer: "Yes. The Adorzia Marketplace is built for a global buyer audience. Whether you are in Pakistan, the UK, the US, the Middle East, or anywhere else in the world, you can browse, discover, and purchase from our curated collection of Pakistani fashion and heritage craft. We support international payment methods and provide shipping guidance for cross-border orders."
              }
            ].map((faq, i) => (
              <div key={i} className="border border-neutral-800 rounded-sm bg-neutral-950 overflow-hidden">
                <button
                  onClick={() => setOpenFaq(openFaq === i ? null : i)}
                  className="w-full p-8 text-left flex items-start justify-between gap-4 hover:bg-neutral-900/50 transition-colors"
                >
                  <h3 className="text-white font-normal text-lg pr-4">{faq.question}</h3>
                  <svg
                    className={`w-6 h-6 text-[#bb9457] flex-shrink-0 mt-1 transition-transform duration-300 ${openFaq === i ? 'rotate-45' : ''}`}
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                  </svg>
                </button>
                {openFaq === i && (
                  <div className="px-8 pb-8">
                    <p className="text-neutral-400 font-light leading-relaxed">{faq.answer}</p>
                  </div>
                )}
              </div>
            ))}
          </div>

          <div className="mt-16 p-10 border border-[#bb9457]/30 rounded-sm bg-neutral-950 text-center">
            <p className="text-neutral-400 font-light text-base mb-4">
              Still have questions?
            </p>
            <a 
              href="mailto:marketplace@adorzia.com" 
              className="text-[#bb9457] font-medium hover:underline"
            >
              Get in touch with our team
            </a>
          </div>
        </div>
      </section>

      {/* ============================================
          SECTION 14: FOUNDING SELLER BENEFITS
          Exclusive benefits for early applicants with deadline urgency
          ============================================ */}
      {/* Founding Seller Benefits */}
      <section className="py-40 border-t border-neutral-900 bg-neutral-900/30">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="grid lg:grid-cols-12 gap-16 items-start">
            <div className="lg:col-span-5">
              <div className="sticky top-32">
                <span className="text-[10px] uppercase tracking-[0.3em] text-[#bb9457] font-mono font-semibold">Founding seller benefits</span>
                <h2 className="mt-6 font-serif text-4xl md:text-5xl text-white font-normal tracking-tight mb-8">
                  Apply before December 31, 2026.
                </h2>
                <p className="text-neutral-400 font-light text-base md:text-lg leading-relaxed mb-8">
                  Only a limited number of founding seller positions will be available before launch. Sellers who apply during our preview phase receive exclusive benefits that will not be available after public launch.
                </p>
                <div className="p-6 border border-[#bb9457]/30 rounded-sm bg-neutral-950">
                  <div className="font-serif text-xl text-[#bb9457] font-normal mb-2">Limited positions available</div>
                  <p className="text-neutral-400 font-light text-sm leading-relaxed">
                    Once these founding seller spots are filled, applications will be reviewed for the next intake at standard launch pricing.
                  </p>
                </div>
              </div>
            </div>

            <div className="lg:col-span-7 space-y-6">
              {[
                {
                  benefit: "Locked-in commission rates",
                  description: "Secure permanently reduced commission rates that will be lower than our public launch pricing. Your rate is locked in from day one and will never increase, even as our standard rates rise after launch."
                },
                {
                  benefit: "Priority launch promotion",
                  description: "Your brand will be featured prominently in our marketplace launch campaign, including social media promotion, email announcements to our early access buyer list, and dedicated placement during our opening promotional period."
                },
                {
                  benefit: "Dedicated onboarding support",
                  description: "Receive one-on-one assistance from the Adorzia team to set up your seller account, optimize your listings, photograph your products, write compelling product descriptions, and prepare for launch day."
                },
                {
                  benefit: "Early buyer introductions",
                  description: "Get access to our buyer early access list before the public opening. Connect with serious buyers who have already expressed interest in purchasing from curated Pakistani fashion and heritage craft sellers."
                },
                {
                  benefit: "Spotlight ecosystem access",
                  description: "Gain eligibility for Adorzia Spotlight events - our physical showcases that bring Pakistani fashion creativity to life and introduce emerging talent to industry professionals, press, and buyers."
                },
                {
                  benefit: "Founding Seller recognition",
                  description: "Receive the permanent distinction of being one of the first sellers on the platform. Your brand will carry the Founding Seller badge, signaling to buyers that you were among the original names that defined Adorzia."
                }
              ].map((item, i) => (
                <div key={i} className="p-8 border border-neutral-800 rounded-sm bg-neutral-950 hover:border-[#bb9457]/30 transition-colors duration-300">
                  <div className="flex items-start gap-4">
                    <div className="font-mono text-[10px] text-[#bb9457] uppercase tracking-[0.2em] mt-1">{String(i + 1).padStart(2, '0')}</div>
                    <div className="flex-1">
                      <h3 className="font-serif text-xl text-white font-normal mb-3">{item.benefit}</h3>
                      <p className="text-neutral-400 font-light leading-relaxed text-sm">{item.description}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ============================================
          SECTION 15: SELECTION CRITERIA
          Five evaluation criteria with percentages
          ============================================ */}
      {/* Selection Criteria */}
      <section className="py-40 border-t border-neutral-900 bg-neutral-900/30">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="grid lg:grid-cols-12 gap-16 items-start">
            <div className="lg:col-span-5">
              <div className="sticky top-32">
                <span className="text-[10px] uppercase tracking-[0.3em] text-[#bb9457] font-mono font-semibold">Selection criteria</span>
                <h2 className="mt-6 font-serif text-4xl md:text-5xl text-white font-normal tracking-tight mb-8">
                  What our curators look for.
                </h2>
                <p className="text-neutral-400 font-light text-base md:text-lg leading-relaxed mb-8">
                  Every application is evaluated against five key criteria. We are not looking for perfection - we are looking for potential, authenticity, and creative integrity. Here is how we assess each application.
                </p>
                <p className="text-neutral-400 font-light text-base md:text-lg leading-relaxed">
                  This is not a scoring system designed to reject people. It is a framework that helps us understand your work, your vision, and where you are on your creative journey.
                </p>
              </div>
            </div>

            <div className="lg:col-span-7 space-y-8">
              {[
                {
                  criteria: "Creative Vision",
                  percentage: "30%",
                  description: "Do you have a clear creative point of view? We want to understand what drives your work, what inspires you, and where you are heading. A strong creative vision doesn't mean having everything figured out - it means knowing what matters to you as a maker and being able to articulate it.",
                  examples: [
                    "Clear aesthetic identity",
                    "Understanding of your creative influences",
                    "Direction and ambition for your work",
                    "Ability to explain what makes your work yours"
                  ]
                },
                {
                  criteria: "Craft Quality",
                  percentage: "25%",
                  description: "The quality of your making - whether that means the construction of your garments, the precision of your embroidery, the finish of your textiles, or the care with which you execute your work. We are not looking for industrial perfection. We are looking for attention to detail, technical competence, and respect for your materials.",
                  examples: [
                    "Attention to construction and finish",
                    "Technical competence in your discipline",
                    "Quality of materials and execution",
                    "Respect for craft traditions (if applicable)"
                  ]
                },
                {
                  criteria: "Commercial Potential",
                  percentage: "20%",
                  description: "Does your work have a market? We assess whether there are buyers who would value and purchase what you make. This doesn't mean you need existing sales - it means your work should demonstrate an understanding of who it is for and why someone would want it.",
                  examples: [
                    "Understanding of your target customer",
                    "Pricing that reflects your work's value",
                    "Products that solve a market need or fill a gap",
                    "Readiness to sell (even if you haven't yet)"
                  ]
                },
                {
                  criteria: "Originality",
                  percentage: "15%",
                  description: "What makes your work different? We are not looking for something the world has never seen - that is rare in fashion. We are looking for your unique interpretation, your personal voice, the thing that makes your work distinguishable from everything else in the market.",
                  examples: [
                    "Distinctive creative voice",
                    "Unique interpretation of traditions or trends",
                    "Work that stands out in the market",
                    "Personal signature in your making"
                  ]
                },
                {
                  criteria: "Brand Story",
                  percentage: "10%",
                  description: "Your story matters on Adorzia because every listing carries more than a product - it carries the person behind it. We assess whether you can communicate who you are, where you are from, and why your work exists. A compelling story helps buyers connect with your work on a deeper level.",
                  examples: [
                    "Clear narrative about who you are",
                    "Connection to place, tradition, or personal journey",
                    "Ability to communicate your story authentically",
                    "Work that carries meaning beyond the product"
                  ]
                }
              ].map((item, i) => (
                <div key={i} className="p-10 border border-neutral-800 rounded-sm bg-neutral-950 hover:border-[#bb9457]/30 transition-colors duration-300">
                  <div className="flex items-start justify-between mb-6">
                    <div>
                      <div className="font-mono text-[10px] text-[#bb9457] uppercase tracking-[0.2em] mb-2">CRITERION {String(i + 1).padStart(2, '0')}</div>
                      <h3 className="font-serif text-2xl text-white font-normal">{item.criteria}</h3>
                    </div>
                    <div className="font-serif text-4xl text-[#bb9457] font-normal">{item.percentage}</div>
                  </div>
                  <p className="text-neutral-400 font-light leading-relaxed mb-6">{item.description}</p>
                  <div className="grid md:grid-cols-2 gap-3">
                    {item.examples.map((example, j) => (
                      <div key={j} className="flex items-start gap-2">
                        <span className="text-[#bb9457] text-sm mt-0.5">-</span>
                        <span className="text-neutral-300 font-light text-sm">{example}</span>
                      </div>
                    ))}
                  </div>
                </div>
              ))}

              <div className="p-10 border border-[#bb9457]/30 rounded-sm bg-neutral-950">
                <h3 className="text-[10px] uppercase tracking-[0.3em] text-[#bb9457] font-mono font-semibold mb-4">Important note</h3>
                <p className="text-neutral-400 font-light leading-relaxed">
                  These percentages indicate relative importance, not pass/fail thresholds. We evaluate the whole application, not individual scores in isolation. A strong creative vision can compensate for early-stage commercial development. Exceptional craft quality can outweigh limited brand storytelling. What matters most is authenticity - we want to see real work from real makers, not perfection.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ============================================
          SECTION 16: WHO SHOULD APPLY
          Ideal for / Not suitable for filtering
          ============================================ */}
      {/* Who Should Apply */}
      <section id="seller-form" className="py-40 border-t border-neutral-900">
        <div className="max-w-3xl mx-auto px-6 lg:px-8">
          <div className="text-center mb-20">
            <span className="text-[10px] uppercase tracking-[0.3em] text-[#bb9457] font-mono font-semibold">Apply to sell</span>
            <h2 className="mt-6 font-serif text-4xl md:text-5xl text-white font-normal tracking-tight">
              Start your Adorzia seller application
            </h2>
            <div className="mt-6 p-6 border border-[#bb9457]/30 rounded-sm bg-neutral-950">
              <div className="font-serif text-xl text-[#bb9457] font-normal mb-2">Founding Seller Applications Open</div>
              <p className="text-neutral-400 font-light text-sm leading-relaxed">
                Priority review until <span className="text-white font-medium">December 31, 2026</span>. Only a limited number of founding seller positions will be available before launch.
              </p>
            </div>
            <p className="mt-6 text-neutral-400 font-light">
              Early applicants lock in founding seller rates and priority listing at launch.
            </p>
          </div>

          {sellerSubmitted ? (
            <div className="p-10 border border-[#bb9457]/30 rounded-sm bg-neutral-950 text-center">
              <p className="text-white font-light text-lg mb-4">
                Your seller application has been received. Our curation team reviews every application and will respond within seven working days.
              </p>
              <button 
                onClick={() => setSellerSubmitted(false)} 
                className="mt-6 px-6 py-3 border border-[#bb9457]/40 text-[#bb9457] text-[10px] uppercase tracking-[0.2em] rounded-sm hover:bg-[#bb9457] hover:text-black transition-all duration-300"
              >
                Submit another application
              </button>
            </div>
          ) : (
            <form onSubmit={handleSellerSubmit} className="space-y-8">
              <div>
                <label className="text-[10px] uppercase tracking-[0.25em] text-neutral-400 font-semibold block mb-3">Full name *</label>
                <input 
                  type="text" 
                  required 
                  value={sellerFormData.full_name}
                  onChange={(e) => setSellerFormData({ ...sellerFormData, full_name: e.target.value })}
                  className="w-full border-b border-neutral-800 bg-transparent py-3 text-white outline-none focus:border-[#bb9457] transition-colors" 
                  placeholder="Your full name" 
                />
              </div>

              <div>
                <label className="text-[10px] uppercase tracking-[0.25em] text-neutral-400 font-semibold block mb-3">Email address *</label>
                <input 
                  type="email" 
                  required 
                  value={sellerFormData.email}
                  onChange={(e) => setSellerFormData({ ...sellerFormData, email: e.target.value })}
                  className="w-full border-b border-neutral-800 bg-transparent py-3 text-white outline-none focus:border-[#bb9457] transition-colors" 
                  placeholder="your@email.com" 
                />
              </div>

              <div>
                <label className="text-[10px] uppercase tracking-[0.25em] text-neutral-400 font-semibold block mb-3">Brand or maker name *</label>
                <input 
                  type="text" 
                  required 
                  value={sellerFormData.brand_name}
                  onChange={(e) => setSellerFormData({ ...sellerFormData, brand_name: e.target.value })}
                  className="w-full border-b border-neutral-800 bg-transparent py-3 text-white outline-none focus:border-[#bb9457] transition-colors" 
                  placeholder="Your brand name" 
                />
              </div>

              <div>
                <label className="text-[10px] uppercase tracking-[0.25em] text-neutral-400 font-semibold block mb-3">Category *</label>
                <select 
                  required 
                  value={sellerFormData.category}
                  onChange={(e) => setSellerFormData({ ...sellerFormData, category: e.target.value })}
                  className="w-full border-b border-neutral-800 bg-transparent py-3 text-white outline-none focus:border-[#bb9457] transition-colors"
                >
                  <option value="" className="bg-neutral-950">Select category</option>
                  <option value="fashion" className="bg-neutral-950">Contemporary designer</option>
                  <option value="textiles" className="bg-neutral-950">Heritage craft</option>
                  <option value="accessories" className="bg-neutral-950">Accessories</option>
                  <option value="home-decor" className="bg-neutral-950">Home decor</option>
                  <option value="other" className="bg-neutral-950">Other</option>
                </select>
              </div>

              <div>
                <label className="text-[10px] uppercase tracking-[0.25em] text-neutral-400 font-semibold block mb-3">City and province *</label>
                <input 
                  type="text" 
                  required 
                  value={sellerFormData.location}
                  onChange={(e) => setSellerFormData({ ...sellerFormData, location: e.target.value })}
                  className="w-full border-b border-neutral-800 bg-transparent py-3 text-white outline-none focus:border-[#bb9457] transition-colors" 
                  placeholder="Lahore, Punjab" 
                />
              </div>

              <div>
                <label className="text-[10px] uppercase tracking-[0.25em] text-neutral-400 font-semibold block mb-3">
                  Describe your creative practice and what you plan to sell on Adorzia *<br />
                  <span className="text-neutral-600">(Minimum 100 words)</span>
                </label>
                <textarea 
                  required 
                  rows={8} 
                  value={sellerFormData.creative_practice}
                  onChange={(e) => setSellerFormData({ ...sellerFormData, creative_practice: e.target.value })}
                  className="w-full border-b border-neutral-800 bg-transparent py-3 text-white outline-none focus:border-[#bb9457] transition-colors resize-none" 
                  placeholder="Tell us about your work..." 
                />
              </div>

              <div>
                <label className="text-[10px] uppercase tracking-[0.25em] text-neutral-400 font-semibold block mb-3">
                  Share a link to your work - website, Instagram, or portfolio<br />
                  <span className="text-neutral-600">(Optional)</span>
                </label>
                <input 
                  type="url" 
                  value={sellerFormData.portfolio_url}
                  onChange={(e) => setSellerFormData({ ...sellerFormData, portfolio_url: e.target.value })}
                  className="w-full border-b border-neutral-800 bg-transparent py-3 text-white outline-none focus:border-[#bb9457] transition-colors" 
                  placeholder="https://" 
                />
              </div>

              <div className="grid md:grid-cols-2 gap-8">
                <div>
                  <label className="text-[10px] uppercase tracking-[0.25em] text-neutral-400 font-semibold block mb-3">Years in operation *</label>
                  <select 
                    required 
                    value={sellerFormData.years_in_operation}
                    onChange={(e) => setSellerFormData({ ...sellerFormData, years_in_operation: e.target.value })}
                    className="w-full border-b border-neutral-800 bg-transparent py-3 text-white outline-none focus:border-[#bb9457] transition-colors"
                  >
                    <option value="" className="bg-neutral-950">Select duration</option>
                    <option value="<1" className="bg-neutral-950">Less than 1 year</option>
                    <option value="1-2" className="bg-neutral-950">1-2 years</option>
                    <option value="3-5" className="bg-neutral-950">3-5 years</option>
                    <option value="5-10" className="bg-neutral-950">5-10 years</option>
                    <option value="10+" className="bg-neutral-950">10+ years</option>
                  </select>
                </div>

                <div>
                  <label className="text-[10px] uppercase tracking-[0.25em] text-neutral-400 font-semibold block mb-3">Instagram handle</label>
                  <input 
                    type="text" 
                    value={sellerFormData.instagram_handle}
                    onChange={(e) => setSellerFormData({ ...sellerFormData, instagram_handle: e.target.value })}
                    className="w-full border-b border-neutral-800 bg-transparent py-3 text-white outline-none focus:border-[#bb9457] transition-colors" 
                    placeholder="@yourbrand" 
                  />
                </div>
              </div>

              <div>
                <label className="text-[10px] uppercase tracking-[0.25em] text-neutral-400 font-semibold block mb-3">Do you manufacture your products yourself? *</label>
                <select 
                  required 
                  value={sellerFormData.manufactures_self}
                  onChange={(e) => setSellerFormData({ ...sellerFormData, manufactures_self: e.target.value })}
                  className="w-full border-b border-neutral-800 bg-transparent py-3 text-white outline-none focus:border-[#bb9457] transition-colors"
                >
                  <option value="" className="bg-neutral-950">Select an option</option>
                  <option value="yes" className="bg-neutral-950">Yes, I manufacture everything myself</option>
                  <option value="partial" className="bg-neutral-950">Partially - I work with artisans/workers</option>
                  <option value="no" className="bg-neutral-950">No, I work with manufacturers</option>
                </select>
              </div>

              <div>
                <label className="text-[10px] uppercase tracking-[0.25em] text-neutral-400 font-semibold block mb-3">Average product price range (PKR) *</label>
                <select 
                  required 
                  value={sellerFormData.price_range}
                  onChange={(e) => setSellerFormData({ ...sellerFormData, price_range: e.target.value })}
                  className="w-full border-b border-neutral-800 bg-transparent py-3 text-white outline-none focus:border-[#bb9457] transition-colors"
                >
                  <option value="" className="bg-neutral-950">Select price range</option>
                  <option value="under-5000" className="bg-neutral-950">Under PKR 5,000</option>
                  <option value="5000-15000" className="bg-neutral-950">PKR 5,000 - 15,000</option>
                  <option value="15000-30000" className="bg-neutral-950">PKR 15,000 - 30,000</option>
                  <option value="30000-50000" className="bg-neutral-950">PKR 30,000 - 50,000</option>
                  <option value="50000+" className="bg-neutral-950">PKR 50,000+</option>
                </select>
              </div>

              <div className="grid md:grid-cols-2 gap-8">
                <div>
                  <label className="text-[10px] uppercase tracking-[0.25em] text-neutral-400 font-semibold block mb-3">
                    Link to lookbook or collection<br />
                    <span className="text-neutral-600">(Optional)</span>
                  </label>
                  <input 
                    type="url" 
                    value={sellerFormData.lookbook_url}
                    onChange={(e) => setSellerFormData({ ...sellerFormData, lookbook_url: e.target.value })}
                    className="w-full border-b border-neutral-800 bg-transparent py-3 text-white outline-none focus:border-[#bb9457] transition-colors" 
                    placeholder="https://drive.google.com/..." 
                  />
                </div>

                <div>
                  <label className="text-[10px] uppercase tracking-[0.25em] text-neutral-400 font-semibold block mb-3">
                    Link to product photos<br />
                    <span className="text-neutral-600">(Optional)</span>
                  </label>
                  <input 
                    type="url" 
                    value={sellerFormData.product_photos_url}
                    onChange={(e) => setSellerFormData({ ...sellerFormData, product_photos_url: e.target.value })}
                    className="w-full border-b border-neutral-800 bg-transparent py-3 text-white outline-none focus:border-[#bb9457] transition-colors" 
                    placeholder="https://drive.google.com/..." 
                  />
                </div>
              </div>

              <div>
                <label className="text-[10px] uppercase tracking-[0.25em] text-neutral-400 font-semibold block mb-3">How did you hear about Adorzia? *</label>
                <select 
                  required 
                  value={sellerFormData.hear_about}
                  onChange={(e) => setSellerFormData({ ...sellerFormData, hear_about: e.target.value })}
                  className="w-full border-b border-neutral-800 bg-transparent py-3 text-white outline-none focus:border-[#bb9457] transition-colors"
                >
                  <option value="" className="bg-neutral-950">Select an option</option>
                  <option value="instagram" className="bg-neutral-950">Instagram</option>
                  <option value="facebook" className="bg-neutral-950">Facebook</option>
                  <option value="google" className="bg-neutral-950">Google search</option>
                  <option value="friend" className="bg-neutral-950">Friend or colleague</option>
                  <option value="event" className="bg-neutral-950">Event or exhibition</option>
                  <option value="press" className="bg-neutral-950">Press or media</option>
                  <option value="other" className="bg-neutral-950">Other</option>
                </select>
              </div>

              <button 
                type="submit" 
                disabled={sellerSubmitting}
                className="inline-flex items-center bg-[#bb9457] text-black px-8 py-4 text-[11px] uppercase tracking-[0.25em] font-semibold hover:bg-white transition-colors disabled:opacity-50"
              >
                {sellerSubmitting ? 'Submitting...' : 'Submit seller application'}
              </button>
            </form>
          )}
        </div>
      </section>

      {/* ============================================
          EDITORIAL BANNER 3: BEFORE BUYER EARLY ACCESS
          Cinematic fashion photography with minimal text
          ============================================ */}
      <section className="relative h-[70vh] min-h-[500px] overflow-hidden">
        <div className="absolute inset-0">
          <img src={banner4} alt="Contemporary Pakistani fashion collection for international buyers" loading="lazy" className="w-full h-full object-cover animate-parallax" />
        </div>
        <div className="absolute inset-0 bg-gradient-to-r from-black/75 via-black/45 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-t from-neutral-950 via-transparent to-transparent" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(187,148,87,0.1),transparent_60%)]" />
        <div className="relative z-10 h-full flex items-center">
          <div className="max-w-7xl mx-auto px-6 lg:px-8">
            <h2 className="font-serif text-5xl md:text-7xl lg:text-8xl text-white font-normal tracking-tight max-w-4xl animate-fade-up">
              Discover what's
              <br />
              coming next.
            </h2>
          </div>
        </div>
      </section>

      {/* ============================================
          SECTION 17: BUYER EARLY ACCESS SIGNUP
          Buyer waitlist form with Supabase integration
          ============================================ */}
      {/* Buyer Early Access Signup */}
      <section id="buyer-form" className="py-40 relative overflow-hidden border-t border-neutral-900 bg-neutral-900">
        <div className="absolute inset-0 opacity-10">
          <img src={heroHome} alt="Pakistani fashion designers and artisans showcasing contemporary and heritage collections" loading="lazy" className="w-full h-full object-cover grayscale animate-ambient-swell" />
        </div>
        <div className="absolute inset-0 bg-gradient-to-b from-neutral-900 via-neutral-900/95 to-neutral-900" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_bottom,rgba(187,148,87,0.12),transparent_70%)]" />
        
        <div className="max-w-7xl mx-auto px-6 lg:px-8 relative z-10">
          <div className="grid lg:grid-cols-12 gap-16 items-center">
            <div className="lg:col-span-5 lg:order-1">
              <div className="space-y-6">
                <div className="aspect-[4/5] overflow-hidden rounded-sm">
                  <img src={brand2} alt="Contemporary Pakistani womenswear collection displayed for international buyers" loading="lazy" className="w-full h-full object-cover grayscale contrast-125 hover:scale-105 transition-transform duration-700" />
                </div>
                <div className="grid grid-cols-2 gap-6">
                  <div className="aspect-square overflow-hidden rounded-sm">
                    <img src={spotlightImg} alt="Adorzia Spotlight fashion event showcasing Pakistani designers" loading="lazy" className="w-full h-full object-cover grayscale contrast-125 hover:scale-105 transition-transform duration-700" />
                  </div>
                  <div className="aspect-square overflow-hidden rounded-sm">
                    <img src={studio1} alt="Fashion designer creating contemporary Pakistani clothing in studio" loading="lazy" className="w-full h-full object-cover grayscale contrast-125 hover:scale-105 transition-transform duration-700" />
                  </div>
                </div>
              </div>
            </div>

            <div className="lg:col-span-7 lg:order-2">
              <span className="text-[10px] uppercase tracking-[0.3em] text-[#bb9457] font-mono font-semibold">Be first through the door</span>
              <h2 className="mt-6 font-serif text-4xl md:text-5xl text-white font-normal tracking-tight mb-8">
                The marketplace opens after Spotlight Fall 2026. Get there before everyone else.
              </h2>
              
              <div className="space-y-6 text-neutral-300 font-light text-base md:text-lg leading-relaxed mb-12">
                <p>
                  The Adorzia Marketplace will launch to the public following our first Spotlight event in Fall 2026 - with a curated collection of contemporary Pakistani fashion and heritage craft that has been selected, onboarded, and positioned for a global buyer audience.
                </p>
                <p>
                  Early access members get in before the public launch - with first look at new listings, priority access to limited and made-to-order pieces, direct introductions to makers available for commission and wholesale, and updates on every new seller joining the platform.
                </p>
                <p>
                  If you are a buyer, a collector, a retailer, a stylist, or simply someone who wants to discover Pakistani fashion before the rest of the world does - join the list now.
                </p>
              </div>

              <form onSubmit={handleBuyerSubmit} className="space-y-8">
                <div className="grid md:grid-cols-2 gap-8">
                  <div>
                    <label className="text-[10px] uppercase tracking-[0.25em] text-neutral-400 font-semibold block mb-3">Full name *</label>
                    <input 
                      type="text" 
                      required 
                      value={buyerName}
                      onChange={(e) => setBuyerName(e.target.value)}
                      className="w-full border-b border-neutral-800 bg-transparent py-3 text-white outline-none focus:border-[#bb9457] transition-colors" 
                      placeholder="Your full name" 
                    />
                  </div>
                  <div>
                    <label className="text-[10px] uppercase tracking-[0.25em] text-neutral-400 font-semibold block mb-3">Email address *</label>
                    <input 
                      type="email" 
                      required 
                      value={email} 
                      onChange={(e) => setEmail(e.target.value)} 
                      className="w-full border-b border-neutral-800 bg-transparent py-3 text-white outline-none focus:border-[#bb9457] transition-colors" 
                      placeholder="your@email.com" 
                    />
                  </div>
                </div>

                <div>
                  <label className="text-[10px] uppercase tracking-[0.25em] text-neutral-400 font-semibold block mb-3">I am interested as *</label>
                  <select 
                    required 
                    value={buyerType}
                    onChange={(e) => setBuyerType(e.target.value)}
                    className="w-full border-b border-neutral-800 bg-transparent py-3 text-white outline-none focus:border-[#bb9457] transition-colors"
                  >
                    <option value="" className="bg-neutral-950">Select an option</option>
                    <option value="individual" className="bg-neutral-950">Individual buyer</option>
                    <option value="retailer" className="bg-neutral-950">Retailer or boutique</option>
                    <option value="stylist" className="bg-neutral-950">Stylist or creative professional</option>
                    <option value="collector" className="bg-neutral-950">Collector</option>
                    <option value="press" className="bg-neutral-950">Press or media</option>
                    <option value="other" className="bg-neutral-950">Other</option>
                  </select>
                </div>

                <div>
                  <label className="text-[10px] uppercase tracking-[0.25em] text-neutral-400 font-semibold block mb-3">
                    What draws you to Pakistani fashion<br />
                    <span className="text-neutral-600">(Optional)</span>
                  </label>
                  <textarea 
                    rows={5} 
                    value={buyerInterest}
                    onChange={(e) => setBuyerInterest(e.target.value)}
                    className="w-full border-b border-neutral-800 bg-transparent py-3 text-white outline-none focus:border-[#bb9457] transition-colors resize-none" 
                    placeholder="Tell us what draws you to Pakistani fashion..." 
                  />
                </div>

                {submitted && (
                  <div className="p-6 border border-[#bb9457]/30 rounded-sm bg-neutral-950">
                    <p className="text-[#bb9457] font-light">
                      You are on the list. We will be in touch before the marketplace opens - with early access, first look invitations, and everything you need to be first through the door when Adorzia launches.
                    </p>
                  </div>
                )}

                <button
                  type="submit"
                  className="w-full md:w-auto px-8 py-4 bg-[#bb9457] text-black font-semibold uppercase tracking-[0.2em] text-[11px] rounded-sm hover:bg-white transition-all duration-300"
                >
                  Join the early access list
                </button>
              </form>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}

export default Marketplace
