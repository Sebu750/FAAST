import { useState } from 'react'
import { sendEmailNotification } from '../lib/email'
import SEO from '../components/SEO'
import heroHome from '../assets/hero-home.jpg'
import studio from '../assets/studio.jpg'
import craft from '../assets/craft.jpg'
import designer1 from '../assets/designer-1.jpg'
import designer2 from '../assets/designer-2.jpg'
import designer3 from '../assets/designer-3.jpg'
import spotlightImg from '../assets/spotlight.jpg'

const Marketplace = () => {
  const [email, setEmail] = useState('')
  const [submitted, setSubmitted] = useState(false)
  const [sellerSubmitted, setSellerSubmitted] = useState(false)
  const [sellerSubmitting, setSellerSubmitting] = useState(false)
  const [sellerFormData, setSellerFormData] = useState({
    full_name: '',
    email: '',
    brand_name: '',
    category: '',
    location: '',
    creative_practice: '',
    portfolio_url: ''
  })

  const handleBuyerSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setSubmitted(true)
    setEmail('')
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
          target_customer: ''
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
        portfolio_url: ''
      })
    } catch (err) {
      console.error('Error submitting seller application:', err)
      alert('Failed to submit application. Please try again.')
    } finally {
      setSellerSubmitting(false)
    }
  }

  return (
    <div className="min-h-screen bg-neutral-950 text-white">
      <SEO
        title="Adorzia Marketplace - Buy and Sell Pakistani Fashion and Heritage Craft Online"
        description="The Adorzia Marketplace is a curated online destination for contemporary Pakistani fashion designers and heritage craftspeople. Buy authentic Pakistani fashion with full maker provenance. Sell your work to local and international buyers. Early access and seller applications open now."
        canonicalURL="https://adorzia.com/marketplace"
        ogTitle="Adorzia Marketplace - Pakistani Fashion and Heritage Craft"
        ogDescription="The world's first curated destination for Pakistani fashion creativity. Contemporary designers and heritage craft. Coming soon - join early access now."
        ogImageAlt="Adorzia Marketplace - curated Pakistani fashion and heritage craft"
        schemaType="WebPage"
        schema={{
          "@context": "https://schema.org",
          "@type": "WebPage",
          "name": "Adorzia Marketplace",
          "description": "Curated online marketplace for contemporary Pakistani fashion designers and heritage craftspeople"
        }}
        keywords="Pakistani fashion marketplace online, buy Pakistani designer fashion online, sell Pakistani craft online, heritage craft marketplace, emerging Pakistani designer clothing, authentic Pakistani handmade fashion, Pakistani clothing, Pakistani textile, Heritage craft Pakistan, Traditional Pakistani craft for sale, Where to buy authentic Pakistani designer clothing online, Best online marketplace for Pakistani fashion brands, Artisan fashion Pakistan, Handcrafted Pakistani clothing, South Asian fashion marketplace, Pakistani textile heritage, Adorzia marketplace, Adorzia fashion"
      />

      <style>{`
        @keyframes ambientSwell {
          0%, 100% { transform: scale(1.02) translate(0px, 0px); }
          50% { transform: scale(1.06) translate(4px, -3px); }
        }
        .animate-ambient-swell { animation: ambientSwell 20s infinite ease-in-out; }
      `}</style>

      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img src={heroHome} alt="" className="w-full h-full object-cover grayscale opacity-40" />
        </div>
        <div className="absolute inset-0 bg-gradient-to-br from-black via-neutral-950/95 to-neutral-900/90" />
        <div className="absolute inset-0 bg-black/30" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(187,148,87,0.2),transparent_60%)]" />

        <div className="relative z-10 max-w-6xl mx-auto px-6 lg:px-8 py-32">
          <span className="text-[10px] uppercase tracking-[0.3em] text-[#bb9457] font-mono font-semibold">
            Coming soon
          </span>

          <h1 className="mt-8 font-serif text-5xl md:text-7xl lg:text-8xl text-white font-normal leading-[1.05] tracking-tight max-w-5xl">
            The world's first curated destination for Pakistani fashion is almost here.
          </h1>

          <div className="mt-8 max-w-3xl space-y-6 text-neutral-300 font-light text-base md:text-lg leading-relaxed">
            <p>
              For the first time, the full breadth of Pakistani fashion creativity - from the most contemporary emerging designers to the most ancient craft traditions still practiced today - will exist in one place. Discovered, curated, and presented to buyers who are ready to pay what it is worth.
            </p>
            <p>
              The Adorzia Marketplace is in its final stages of development. We are currently accepting early applications from sellers and building our early access list for buyers. The people who join now will shape what the marketplace becomes.
            </p>
          </div>

          <div className="mt-12 flex flex-wrap gap-6">
            <a href="#seller" className="px-8 py-4 bg-[#bb9457] text-black font-semibold uppercase tracking-[0.2em] text-[11px] rounded-sm hover:bg-white transition-all duration-300">
              Apply to sell on Adorzia
            </a>
            <a href="#buyer" className="px-8 py-4 border border-white/30 text-white font-semibold uppercase tracking-[0.2em] text-[11px] rounded-sm hover:border-[#bb9457] hover:text-[#bb9457] transition-all duration-300">
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
                image: designer1
              },
              {
                title: "Story over transaction",
                body: "Every listing on Adorzia carries more than a product and a price. It carries the name of the person who made it, the story behind the work, the craft tradition it belongs to, and the creative vision it represents. Buyers on Adorzia are not just purchasing a product. They are connecting with the person and the culture behind it.",
                image: craft
              },
              {
                title: "Fair value over false modesty",
                body: "Pakistani fashion and craft has been chronically underpriced - on domestic platforms, in export markets, and in the cultural imagination of what it is worth. Adorzia is built to correct that. We help every seller understand the true market value of their work and present it accordingly. What is made here deserves to be priced like it matters - because it does.",
                image: studio
              }
            ].map((principle, i) => (
              <div key={i} className="group p-10 border border-neutral-900 rounded-sm bg-neutral-950 hover:border-[#bb9457]/30 transition-colors duration-300">
                <div className="aspect-[4/3] overflow-hidden rounded-sm mb-6">
                  <img src={principle.image} alt="" className="w-full h-full object-cover grayscale contrast-125 group-hover:scale-105 transition-transform duration-700" />
                </div>
                <div className="font-mono text-[10px] text-[#bb9457] uppercase tracking-[0.2em] mb-4">PRINCIPLE {String(i + 1).padStart(2, '0')}</div>
                <h3 className="font-serif text-2xl text-white font-normal mb-4">{principle.title}</h3>
                <p className="text-neutral-400 font-light leading-relaxed text-sm">{principle.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

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
                <li className="flex gap-3"><span className="text-[#bb9457] mt-1">-</span><span>Textile-forward contemporary design</span></li>
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
                  <img src={designer2} alt="" className="w-full h-full object-cover grayscale contrast-125 hover:scale-105 transition-transform duration-700" />
                </div>
                <div className="grid grid-cols-2 gap-6">
                  <div className="aspect-square overflow-hidden rounded-sm">
                    <img src={designer3} alt="" className="w-full h-full object-cover grayscale contrast-125 hover:scale-105 transition-transform duration-700" />
                  </div>
                  <div className="aspect-square overflow-hidden rounded-sm">
                    <img src={spotlightImg} alt="" className="w-full h-full object-cover grayscale contrast-125 hover:scale-105 transition-transform duration-700" />
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
                  <img src={craft} alt="" className="w-full h-full object-cover grayscale contrast-125 hover:scale-105 transition-transform duration-700" />
                </div>
                <div className="grid grid-cols-2 gap-6">
                  <div className="aspect-square overflow-hidden rounded-sm">
                    <img src={studio} alt="" className="w-full h-full object-cover grayscale contrast-125 hover:scale-105 transition-transform duration-700" />
                  </div>
                  <div className="aspect-square overflow-hidden rounded-sm">
                    <img src={designer1} alt="" className="w-full h-full object-cover grayscale contrast-125 hover:scale-105 transition-transform duration-700" />
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

      {/* How It Works For Sellers */}
      <section id="seller" className="py-40 border-t border-neutral-900">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="grid lg:grid-cols-12 gap-16">
            <div className="lg:col-span-4">
              <div className="sticky top-32">
                <div className="aspect-[4/5] overflow-hidden rounded-sm mb-8">
                  <img src={designer1} alt="" className="w-full h-full object-cover grayscale contrast-125 hover:scale-105 transition-transform duration-700" />
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

            <div className="lg:col-span-8 space-y-12">
              {[
                {
                  step: "01",
                  title: "Apply to list",
                  body: "Submit your seller application with images of your work, a short description of your creative practice, and information about what you plan to list. Our curation team reviews every application. We are looking for quality, originality, and creative integrity - not follower counts or existing sales history."
                },
                {
                  step: "02",
                  title: "Get onboarding support",
                  body: "Approved sellers receive full onboarding support before going live. This includes listing copywriting guidance, photography recommendations, pricing advice based on the true market value of your work, and a walkthrough of the seller dashboard. We do not approve you and leave you to figure out the rest alone."
                },
                {
                  step: "03",
                  title: "Build your seller profile",
                  body: "Your Adorzia seller profile is more than a shop page. It is your brand story - where you are from, what you make, what tradition or creative vision drives your work, and why a buyer should care. We help you tell that story in a way that connects with the buyers on our platform."
                },
                {
                  step: "04",
                  title: "List your products",
                  body: "Upload your products with images, descriptions, pricing, and availability. Made-to-order listings include lead times. Heritage craft listings include provenance information. Every listing is reviewed before going live to ensure it meets our quality and presentation standards."
                },
                {
                  step: "05",
                  title: "Sell and grow",
                  body: "When a buyer purchases your work, you receive a notification, fulfill the order, and receive payment through our secure transaction system. Adorzia takes a commission on each sale - our full fee structure is shared during onboarding. As your presence on the platform grows, you gain access to promotional features, buyer introductions, and the wider Adorzia ecosystem including studio membership and Spotlight eligibility."
                }
              ].map((step, i) => (
                <div key={i} className="p-10 border border-neutral-900 rounded-sm bg-neutral-950 hover:border-[#bb9457]/30 transition-colors duration-300">
                  <div className="font-mono text-[10px] text-[#bb9457] uppercase tracking-[0.3em] mb-4">STEP {step.step}</div>
                  <h3 className="font-serif text-2xl text-white font-normal mb-4">{step.title}</h3>
                  <p className="text-neutral-400 font-light leading-relaxed">{step.body}</p>
                </div>
              ))}

              {/* What it costs */}
              <div className="p-10 border border-[#bb9457]/30 rounded-sm bg-neutral-950">
                <h3 className="text-[10px] uppercase tracking-[0.3em] text-[#bb9457] font-mono font-semibold mb-4">What it costs</h3>
                <p className="text-neutral-400 font-light leading-relaxed">
                  We operate on a commission model with no upfront listing fees for early sellers joining during our preview phase. Full fee structure published at launch. Early applicants lock in our founding seller rates.
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
                category: "Contemporary designer",
                title: "Your collection name here",
                maker: "Your name, your city",
                description: "Original ready-to-wear or made-to-order fashion from an emerging Pakistani designer. A creative point of view that is entirely their own. Available exclusively on Adorzia.",
                image: designer2
              },
              {
                category: "Heritage craft",
                title: "Your craft tradition here",
                maker: "Master craftsperson, their region",
                description: "Handmade textile work carrying the full weight of a Pakistani craft tradition. Every piece documented, authenticated, and priced at its true value.",
                image: craft
              },
              {
                category: "Contemporary designer",
                title: "Your brand name here",
                maker: "Your name, your city",
                description: "A fashion entrepreneur at the early stage of building something the market has not seen before. On Adorzia before anyone else discovered them.",
                image: designer3
              },
              {
                category: "Heritage craft",
                title: "Your work here",
                maker: "Artisan name, province",
                description: "Living craft from one of Pakistan's most extraordinary making traditions. The kind of work that belongs in international collections - and now has a platform to get there.",
                image: studio
              }
            ].map((card, i) => (
              <div key={i} className="group border border-neutral-900 rounded-sm bg-neutral-950 overflow-hidden hover:border-[#bb9457]/30 transition-colors duration-300">
                <div className="aspect-[4/5] overflow-hidden">
                  <img src={card.image} alt="" className="w-full h-full object-cover grayscale contrast-125 group-hover:scale-105 transition-transform duration-700" />
                </div>
                <div className="p-8">
                  <div className="text-[10px] uppercase tracking-[0.2em] text-[#bb9457] font-mono font-semibold mb-2">{card.category}</div>
                  <h3 className="font-serif text-xl text-white font-normal mb-2">{card.title}</h3>
                  <p className="text-neutral-500 font-light text-sm mb-4">{card.maker}</p>
                  <p className="text-neutral-400 font-light text-sm leading-relaxed mb-4">{card.description}</p>
                  <div className="text-[10px] uppercase tracking-[0.2em] text-neutral-500 font-mono">Waitlist - launching at marketplace opening</div>
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

      {/* Seller Application CTA */}
      <section className="py-40 relative overflow-hidden border-t border-neutral-900">
        <div className="absolute inset-0 opacity-15">
          <img src={studio} alt="" className="w-full h-full object-cover grayscale animate-ambient-swell" />
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
                <h3 className="text-[10px] uppercase tracking-[0.3em] text-[#bb9457] font-mono font-semibold mb-6">What founding sellers receive</h3>
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
                  <img src={designer1} alt="" className="w-full h-full object-cover grayscale contrast-125 hover:scale-105 transition-transform duration-700" />
                </div>
                <div className="grid grid-cols-2 gap-6">
                  <div className="aspect-square overflow-hidden rounded-sm">
                    <img src={craft} alt="" className="w-full h-full object-cover grayscale contrast-125 hover:scale-105 transition-transform duration-700" />
                  </div>
                  <div className="aspect-square overflow-hidden rounded-sm">
                    <img src={designer3} alt="" className="w-full h-full object-cover grayscale contrast-125 hover:scale-105 transition-transform duration-700" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Seller Application Form */}
      <section id="seller-form" className="py-40 border-t border-neutral-900">
        <div className="max-w-3xl mx-auto px-6 lg:px-8">
          <div className="text-center mb-20">
            <span className="text-[10px] uppercase tracking-[0.3em] text-[#bb9457] font-mono font-semibold">Apply to sell</span>
            <h2 className="mt-6 font-serif text-4xl md:text-5xl text-white font-normal tracking-tight">
              Start your Adorzia seller application
            </h2>
            <p className="mt-4 text-neutral-400 font-light">
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

      {/* Buyer Early Access Signup */}
      <section id="buyer-form" className="py-40 relative overflow-hidden border-t border-neutral-900 bg-neutral-900">
        <div className="absolute inset-0 opacity-10">
          <img src={heroHome} alt="" className="w-full h-full object-cover grayscale animate-ambient-swell" />
        </div>
        <div className="absolute inset-0 bg-gradient-to-b from-neutral-900 via-neutral-900/95 to-neutral-900" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_bottom,rgba(187,148,87,0.12),transparent_70%)]" />
        
        <div className="max-w-7xl mx-auto px-6 lg:px-8 relative z-10">
          <div className="grid lg:grid-cols-12 gap-16 items-center">
            <div className="lg:col-span-5 lg:order-1">
              <div className="space-y-6">
                <div className="aspect-[4/5] overflow-hidden rounded-sm">
                  <img src={designer2} alt="" className="w-full h-full object-cover grayscale contrast-125 hover:scale-105 transition-transform duration-700" />
                </div>
                <div className="grid grid-cols-2 gap-6">
                  <div className="aspect-square overflow-hidden rounded-sm">
                    <img src={spotlightImg} alt="" className="w-full h-full object-cover grayscale contrast-125 hover:scale-105 transition-transform duration-700" />
                  </div>
                  <div className="aspect-square overflow-hidden rounded-sm">
                    <img src={studio} alt="" className="w-full h-full object-cover grayscale contrast-125 hover:scale-105 transition-transform duration-700" />
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
                    <input type="text" required className="w-full border-b border-neutral-800 bg-transparent py-3 text-white outline-none focus:border-[#bb9457] transition-colors" placeholder="Your full name" />
                  </div>
                  <div>
                    <label className="text-[10px] uppercase tracking-[0.25em] text-neutral-400 font-semibold block mb-3">Email address *</label>
                    <input type="email" required value={email} onChange={(e) => setEmail(e.target.value)} className="w-full border-b border-neutral-800 bg-transparent py-3 text-white outline-none focus:border-[#bb9457] transition-colors" placeholder="your@email.com" />
                  </div>
                </div>

                <div>
                  <label className="text-[10px] uppercase tracking-[0.25em] text-neutral-400 font-semibold block mb-3">I am interested as *</label>
                  <select required className="w-full border-b border-neutral-800 bg-transparent py-3 text-white outline-none focus:border-[#bb9457] transition-colors">
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
                  <textarea rows={5} className="w-full border-b border-neutral-800 bg-transparent py-3 text-white outline-none focus:border-[#bb9457] transition-colors resize-none" placeholder="Tell us what draws you to Pakistani fashion..." />
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
