import SEO from '../components/SEO'
import Breadcrumb from '../components/Breadcrumb'
import heroHome from '../assets/hero-banner-coworking-studio 1 .png'
import studio from '../assets/hero-banner-coworking-studio-2.png'
import spotlight from '../assets/fashion-icon.png'
import craft from '../assets/craft.jpg'
import coworking from '../assets/coworking-studio-image .png'

const ForCreatives = () => {
  return (
    <div className="min-h-screen bg-black text-white">
      <SEO
        title="For Fashion Creatives in Pakistan - Studios, Marketplace and Spotlight | Adorzia"
        description="Adorzia is built for Pakistani fashion designers, heritage craftspeople and fashion entrepreneurs. Join our coworking studios in Lahore, Islamabad and Karachi, list your work on our curated marketplace, and apply for Spotlight Fall 2026 - Pakistan's first national fashion talent investment event."
        canonicalURL="https://adorzia.com/for-creatives"
        ogTitle="For Pakistani Fashion Creatives - Everything You Need in One Ecosystem"
        ogDescription="Studios. Marketplace. Spotlight. Adorzia is the complete ecosystem for fashion entrepreneurs in Pakistan."
        ogImageAlt="Pakistani fashion creative at work - Adorzia for creatives"
        schemaType="Service"
        schema={{
          "@context": "https://schema.org",
          "@type": "Service",
          "serviceType": "Adorzia Creative Ecosystem",
          "description": "Coworking studios, curated marketplace and national talent event for Pakistani fashion designers and craftspeople",
          "provider": {
            "@type": "Organization",
            "name": "Adorzia"
          },
          "areaServed": "Pakistan"
        }}
        keywords="fashion designer Pakistan opportunities, coworking studio fashion Lahore, sell Pakistani fashion online, heritage craft marketplace Pakistan, Spotlight application 2026, Fashion studio Pakistan, Fashion coworking space Karachi, Fashion coworking space Islamabad, Pakistani fashion marketplace online, Emerging fashion designers Pakistan, Fashion incubator Pakistan, Creative entrepreneurship Pakistan, Fashion community Pakistan, Adorzia, Adorzia studios, Adorzia marketplace, Adorzia Spotlight"
      />
      <Breadcrumb currentPage="For Creatives" />
      
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
          <img src={heroHome} alt="Creative Workspace" className="w-full h-full object-cover opacity-30 grayscale contrast-125 scale-105 animate-ambient-swell" />
        </div>
        <div className="absolute inset-0 bg-gradient-to-b from-black via-black/80 to-neutral-950" />
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
            This page is for you
          </span>

          <h1 className="mt-6 font-serif text-4xl md:text-6xl lg:text-7xl leading-[1.05] text-white tracking-tight font-normal">
            You have the talent.<br />
            We built <span className="text-[#bb9457] italic font-light">everything else.</span>
          </h1>

          <p className="mt-8 max-w-3xl text-neutral-400 text-base md:text-lg leading-relaxed font-light">
            The workspace. The marketplace. The investor network. The national stage. Adorzia was designed from the ground up for one kind of person - the Pakistani creative who is serious about turning their craft into a career, and their career into a brand.
          </p>
          <p className="mt-4 max-w-3xl text-neutral-400 text-base md:text-lg leading-relaxed font-light">
            Whether you are a fashion graduate with your first collection forming, an independent designer ready to scale, a heritage craftsperson whose work deserves a global audience, or a fashion entrepreneur with a vision bigger than your current resources - you are exactly who Adorzia was built for.
          </p>

          <div className="mt-12 flex flex-wrap gap-5">
            <a
              href="/spotlight-event"
              className="px-8 py-4 bg-[#bb9457] text-black font-semibold uppercase tracking-[0.2em] text-[11px] rounded-sm hover:bg-white hover:text-black transition-all duration-300"
            >
              Apply for Spotlight 2026
            </a>
            <a
              href="#what-we-offer"
              className="px-8 py-4 border border-white/20 text-white font-semibold uppercase tracking-[0.2em] text-[11px] rounded-sm hover:border-[#bb9457] hover:text-[#bb9457] transition-all duration-300"
            >
              Explore what we offer
            </a>
          </div>
        </div>
      </section>

      {/* What Adorzia Offers */}
      <section id="what-we-offer" className="relative py-32 border-b border-neutral-900 bg-neutral-950">
        <div className="absolute inset-0 opacity-10">
          <img src={craft} alt="" className="w-full h-full object-cover grayscale animate-ambient-swell" />
        </div>
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(187,148,87,0.08),transparent_50%)] pointer-events-none" />
        <div className="max-w-7xl mx-auto px-6 lg:px-8 relative z-10">
          <div className="max-w-3xl mb-20">
            <span className="text-[10px] uppercase tracking-[0.3em] text-[#bb9457] font-mono font-semibold">Your complete ecosystem</span>
            <h2 className="mt-4 font-serif text-3xl md:text-5xl text-white font-normal tracking-tight">
              Everything a fashion entrepreneur needs. Finally, in one place.
            </h2>
            <p className="mt-4 text-neutral-400 font-light text-base leading-relaxed">
              For too long, building a fashion business in Pakistan meant solving the same problems alone that every creative before you had already solved alone. Finding a workspace. Finding buyers. Finding investors. Finding visibility. Adorzia ends that cycle.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            {[
              { title: "A place to create", body: "Professional studio spaces in three cities, built specifically for fashion work. Equipment, community, and an environment that treats your craft with the seriousness it deserves.", image: coworking },
              { title: "A platform to sell", body: "Your work, on a curated marketplace with a story behind it - reaching buyers in Pakistan and across the world who are actively looking for what you make.", image: studio },
              { title: "A stage to be discovered", body: "Adorzia Spotlight gives extraordinary Pakistani fashion talent a national platform, direct investment, and the mentorship to become a brand the world knows.", image: spotlight },
              { title: "A community to grow with", body: "You are not joining a platform. You are joining a movement of Pakistani fashion creatives who are building something together - and supporting each other in the process.", image: heroHome }
            ].map((offer, idx) => (
              <div key={idx} className="bg-neutral-950 border border-neutral-900 rounded-sm overflow-hidden group hover:border-[#bb9457]/30 transition-colors duration-300">
                <div className="aspect-[4/3] overflow-hidden">
                  <img src={offer.image} alt={offer.title} className="w-full h-full object-cover grayscale contrast-125 group-hover:scale-105 transition-transform duration-700" />
                </div>
                <div className="p-8">
                  <h3 className="font-serif text-2xl text-white font-normal mb-3">{offer.title}</h3>
                  <p className="text-sm text-neutral-400 font-light leading-relaxed">{offer.body}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Coworking Studios */}
      <section className="py-32 border-b border-neutral-900 bg-black relative overflow-hidden">
        <div className="absolute inset-0 opacity-[0.03] pointer-events-none">
          <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <pattern id="studio-grid" width="60" height="60" patternUnits="userSpaceOnUse">
                <path d="M 30 0 L 60 30 L 30 60 L 0 30 Z" fill="none" stroke="#bb9457" strokeWidth="0.5" />
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#studio-grid)" />
          </svg>
        </div>
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-16 items-start">
            <div className="space-y-6">
              <span className="text-[10px] uppercase tracking-[0.3em] text-[#bb9457] font-mono font-semibold">Adorzia Studios</span>
              <h2 className="font-serif text-3xl md:text-5xl text-white font-normal tracking-tight">
                Your city has a studio waiting for you.
              </h2>
              <p className="text-neutral-400 font-light text-base leading-relaxed">
                Great fashion is not made in isolation. It is made in spaces where ideas collide, where fabric and form and ambition share the same room, where the person at the next table understands exactly what you are building and why it matters.
              </p>
              <p className="text-neutral-400 font-light text-base leading-relaxed">
                That is what Adorzia Studios are.
              </p>
              <p className="text-neutral-400 font-light text-base leading-relaxed">
                We are launching dedicated coworking spaces for fashion professionals in Lahore, Islamabad, and Karachi - with more cities on the horizon as our community grows. These are not generic co-working offices with a mood board on the wall. They are purpose-built creative environments designed around how fashion professionals actually work.
              </p>
            </div>
            <div className="aspect-[4/5] overflow-hidden rounded-sm border border-neutral-900">
              <img src={coworking} alt="Studio Workspace" className="w-full h-full object-cover grayscale contrast-125 hover:scale-105 transition-transform duration-700" />
            </div>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mt-20">
            {[
              { title: "Professional workspace", body: "Cutting tables, sewing stations, pressing equipment, fitting areas, and the tools serious fashion work demands - available daily, weekly, or monthly." },
              { title: "A creative community", body: "Work alongside other designers, makers, and fashion entrepreneurs. Collaborate, critique, refer, and grow together inside a community that is genuinely invested in each other's success." },
              { title: "Business infrastructure", body: "High-speed internet, meeting rooms for client sessions, photography corners for product shoots, and the professional environment your brand needs to operate from." },
              { title: "Mentorship access", body: "Studio members get first access to Adorzia's growing network of industry mentors, business advisors, and creative professionals who visit, host sessions, and invest time in our community." }
            ].map((item, idx) => (
              <div key={idx} className="p-8 border border-neutral-900 rounded-sm hover:border-[#bb9457]/30 transition-colors duration-300">
                <h3 className="font-serif text-xl text-white font-normal mb-3">{item.title}</h3>
                <p className="text-sm text-neutral-400 font-light leading-relaxed">{item.body}</p>
              </div>
            ))}
          </div>

          <div className="mt-20 grid md:grid-cols-3 gap-8">
            <div className="border border-neutral-900 p-8 rounded-sm text-center">
              <h4 className="font-serif text-2xl text-[#bb9457] mb-2">Lahore</h4>
              <p className="text-neutral-400 text-sm">Opening 2026</p>
            </div>
            <div className="border border-neutral-900 p-8 rounded-sm text-center">
              <h4 className="font-serif text-2xl text-[#bb9457] mb-2">Islamabad</h4>
              <p className="text-neutral-400 text-sm">Opening 2026</p>
            </div>
            <div className="border border-neutral-900 p-8 rounded-sm text-center">
              <h4 className="font-serif text-2xl text-[#bb9457] mb-2">Karachi</h4>
              <p className="text-neutral-400 text-sm">Opening 2026</p>
            </div>
          </div>

          <div className="mt-20 p-12 border border-neutral-900 rounded-sm bg-neutral-950">
            <h3 className="font-serif text-2xl text-white font-normal mb-6">How to join:</h3>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              <div>
                <div className="font-mono text-3xl text-[#bb9457] mb-2">01</div>
                <p className="text-sm text-neutral-400 font-light">Submit a short creative profile - tell us who you are and what you make.</p>
              </div>
              <div>
                <div className="font-mono text-3xl text-[#bb9457] mb-2">02</div>
                <p className="text-sm text-neutral-400 font-light">We review and reach out within five working days.</p>
              </div>
              <div>
                <div className="font-mono text-3xl text-[#bb9457] mb-2">03</div>
                <p className="text-sm text-neutral-400 font-light">Choose your membership - daily drop-ins, monthly memberships, or dedicated desk arrangements.</p>
              </div>
              <div>
                <div className="font-mono text-3xl text-[#bb9457] mb-2">04</div>
                <p className="text-sm text-neutral-400 font-light">Walk in, set up, and start creating.</p>
              </div>
            </div>
          </div>

          <div className="mt-12 text-center">
            <a href="/contact" className="inline-block px-8 py-4 bg-[#bb9457] text-black font-semibold uppercase tracking-[0.2em] text-[11px] rounded-sm hover:bg-white hover:text-black transition-all duration-300">
              Apply for studio membership
            </a>
          </div>
        </div>
      </section>

      {/* Marketplace */}
      <section className="py-32 border-b border-neutral-900 bg-neutral-950 relative overflow-hidden">
        <div className="absolute bottom-0 right-0 w-96 h-96 opacity-15 pointer-events-none">
          <img src={studio} alt="" className="w-full h-full object-cover grayscale contrast-125" />
        </div>
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-16 items-start">
            <div className="order-last lg:order-first">
              <div className="aspect-[4/5] overflow-hidden rounded-sm border border-neutral-900">
                <img src={studio} alt="Marketplace" className="w-full h-full object-cover grayscale contrast-125 hover:scale-105 transition-transform duration-700" />
              </div>
            </div>
            <div className="space-y-6">
              <span className="text-[10px] uppercase tracking-[0.3em] text-[#bb9457] font-mono font-semibold">The Adorzia Marketplace</span>
              <h2 className="font-serif text-3xl md:text-5xl text-white font-normal tracking-tight">
                The world is looking for what you make. We are building where it finds you.
              </h2>
              <p className="text-neutral-400 font-light text-base leading-relaxed">
                The Adorzia Marketplace is not another e-commerce platform where your work gets lost between a thousand identical listings. It is a curated destination - built for buyers who want to discover genuine Pakistani creative talent, and built for sellers whose work has a story worth telling.
              </p>
              <p className="text-neutral-400 font-light text-base leading-relaxed">
                We are currently in our preview phase, accepting early applications from designers and craftspeople who want to be among the first listings when we launch.
              </p>
            </div>
          </div>

          <div className="mt-20 grid md:grid-cols-3 gap-8">
            {[
              { title: "Early-stage fashion designers", body: "You do not need an established brand or a years-long track record. You need original work, a creative point of view, and the commitment to fulfill orders with care. If you are making something genuine, we want it on the marketplace." },
              { title: "Heritage craft makers", body: "If your work carries the traditions of Pakistani craft - whether that is block printing, hand embroidery, weaving, mirror work, or any of the extraordinary making traditions this country holds - there is a dedicated place for you on Adorzia." },
              { title: "Fashion entrepreneurs", body: "If you are building a fashion brand at any early stage and need a platform that treats your work as premium rather than commodity, apply to list with us." }
            ].map((item, idx) => (
              <div key={idx} className="p-8 border border-neutral-900 rounded-sm bg-black hover:border-[#bb9457]/30 transition-colors duration-300">
                <h3 className="font-serif text-xl text-white font-normal mb-3">{item.title}</h3>
                <p className="text-sm text-neutral-400 font-light leading-relaxed">{item.body}</p>
              </div>
            ))}
          </div>

          <div className="mt-20 p-12 border border-neutral-900 rounded-sm bg-black">
            <h3 className="font-serif text-2xl text-white font-normal mb-6">What sells:</h3>
            <p className="text-neutral-400 font-light leading-relaxed">
              Ready-to-wear collections, made-to-order pieces, accessories, fabric and textile work, handcrafted fashion objects, culturally rooted contemporary design, and heritage craft in any medium - as long as it is original, Pakistani, and made with intention.
            </p>
          </div>

          <div className="mt-20 p-12 border border-neutral-900 rounded-sm bg-neutral-950">
            <h3 className="font-serif text-2xl text-white font-normal mb-6">How listing works:</h3>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              <div>
                <div className="font-mono text-3xl text-[#bb9457] mb-2">01</div>
                <p className="text-sm text-neutral-400 font-light">Submit your seller application with images of your work and a short description of what you make.</p>
              </div>
              <div>
                <div className="font-mono text-3xl text-[#bb9457] mb-2">02</div>
                <p className="text-sm text-neutral-400 font-light">Our curation team reviews every application - we respond within seven working days.</p>
              </div>
              <div>
                <div className="font-mono text-3xl text-[#bb9457] mb-2">03</div>
                <p className="text-sm text-neutral-400 font-light">Approved sellers receive onboarding support - photography guidance, listing copywriting tips, and pricing advice.</p>
              </div>
              <div>
                <div className="font-mono text-3xl text-[#bb9457] mb-2">04</div>
                <p className="text-sm text-neutral-400 font-light">Your work goes live with your story attached to every single piece.</p>
              </div>
            </div>
          </div>

          <div className="mt-12 flex flex-wrap justify-center gap-5">
            <a href="/contact" className="inline-block px-8 py-4 bg-[#bb9457] text-black font-semibold uppercase tracking-[0.2em] text-[11px] rounded-sm hover:bg-white hover:text-black transition-all duration-300">
              Apply to list your work
            </a>
            <a href="/contact" className="inline-block px-8 py-4 border border-white/20 text-white font-semibold uppercase tracking-[0.2em] text-[11px] rounded-sm hover:border-[#bb9457] hover:text-[#bb9457] transition-all duration-300">
              Join the seller waitlist
            </a>
          </div>
        </div>
      </section>

      {/* Spotlight Event */}
      <section className="py-40 relative overflow-hidden bg-[#6f1d1b]">
        <div className="absolute inset-0 opacity-20">
          <img src={spotlight} alt="" className="w-full h-full object-cover grayscale contrast-125 animate-ambient-swell" />
        </div>
        <div className="absolute inset-0 bg-gradient-to-t from-[#6f1d1b] via-[#6f1d1b]/90 to-transparent" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(187,148,87,0.1),transparent_60%)] pointer-events-none" />
        <div className="max-w-7xl mx-auto px-6 lg:px-8 relative z-10">
          <div className="text-center max-w-4xl mx-auto mb-20">
            <span className="text-[10px] uppercase tracking-[0.3em] text-[#bb9457] font-mono font-semibold">Adorzia Spotlight</span>
            <h2 className="mt-4 font-serif text-4xl md:text-6xl text-white font-normal tracking-tight">
              One event. One investment. One career that changes forever.
            </h2>
            <p className="mt-6 text-white/80 font-light text-base md:text-lg leading-relaxed">
              Most talent in Pakistan never gets seen. Not because it is not extraordinary - but because extraordinary talent and the right opportunity rarely meet by accident. Adorzia Spotlight exists to make that meeting deliberate.
            </p>
            <p className="mt-4 text-white/80 font-light text-base md:text-lg leading-relaxed">
              Once a year, we search across the entire country - every city, every province, every creative community - for fashion entrepreneurs who are ready to be more than talented. Who are ready to be a brand.
            </p>
            <p className="mt-4 text-white/80 font-light text-base md:text-lg leading-relaxed">
              Those we find, we do not just celebrate. We invest in them. We build with them. We give them the platform, the mentorship, the funding, and the connections to become something Pakistan and the world will remember.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8 mb-20">
            {[
              { title: "Visibility at a national scale", body: "Selected finalists are presented to an audience of industry figures, investors, buyers, press, and the Pakistani public - at a live event that puts their work in front of the people who can move their career forward overnight." },
              { title: "Direct investment", body: "Spotlight winners receive direct investment from Adorzia and our partner network - capital to produce, scale, and launch their brand properly. Not a prize. A partnership." },
              { title: "Mentorship from people who have done it", body: "Every Spotlight finalist is paired with mentors from within the fashion, business, and creative industries - people who understand both the craft and the commerce of building a fashion brand." },
              { title: "A brand built with you", body: "Adorzia does not hand winners a trophy and a press release. We sit down with them and build. Branding, strategy, market positioning, production support - we are in it with you for the long term." }
            ].map((item, idx) => (
              <div key={idx} className="p-8 border border-white/20 rounded-sm hover:border-[#bb9457]/50 transition-colors duration-300">
                <h3 className="font-serif text-xl text-white font-normal mb-3">{item.title}</h3>
                <p className="text-sm text-white/70 font-light leading-relaxed">{item.body}</p>
              </div>
            ))}
          </div>

          <div className="text-center">
            <div className="inline-block p-12 border border-white/30 rounded-sm bg-black/30 backdrop-blur-sm">
              <h3 className="font-serif text-2xl text-white font-normal mb-4">Spotlight Fall 2026 - our first ever:</h3>
              <p className="text-[#bb9457] font-mono text-sm uppercase tracking-widest mb-2">Submissions open: June 1, 2026</p>
              <p className="text-white/70 font-light">This is the beginning of something. Be part of the first chapter.</p>
            </div>
            <div className="mt-8 flex flex-wrap justify-center gap-5">
              <a href="/spotlight-event" className="inline-block px-8 py-4 bg-[#bb9457] text-black font-semibold uppercase tracking-[0.2em] text-[11px] rounded-sm hover:bg-white hover:text-black transition-all duration-300">
                Apply for Spotlight 2026
              </a>
              <a href="/spotlight-event" className="inline-block px-8 py-4 border border-white/40 text-white font-semibold uppercase tracking-[0.2em] text-[11px] rounded-sm hover:border-[#bb9457] hover:text-[#bb9457] transition-all duration-300">
                Learn everything about the event
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Heritage Craft Program */}
      <section className="py-32 border-b border-neutral-900 bg-black relative overflow-hidden">
        <div className="absolute top-0 left-0 w-1/2 h-full opacity-10 pointer-events-none">
          <img src={craft} alt="" className="w-full h-full object-cover grayscale" />
        </div>
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-16 items-start">
            <div className="space-y-6">
              <span className="text-[10px] uppercase tracking-[0.3em] text-[#bb9457] font-mono font-semibold">For our master makers</span>
              <h2 className="font-serif text-3xl md:text-5xl text-white font-normal tracking-tight">
                Your hands hold centuries of knowledge. Adorzia is here to give them a global stage.
              </h2>
              <p className="text-neutral-400 font-light text-base leading-relaxed">
                Pakistan is one of the most craft-rich nations on earth. Ajrak from Sindh. Phulkari from Punjab. Rilli quilting from Balochistan. Pashmina from Kashmir. Truck art-inspired textile work from Karachi. Khaddar weaving from across the country. Hand embroidery traditions so sophisticated they have no equivalent anywhere in the world.
              </p>
              <p className="text-neutral-400 font-light text-base leading-relaxed">
                And yet most of the people who carry these traditions have never had access to a platform that presents their work with the dignity, the pricing, and the audience it deserves.
              </p>
              <p className="text-neutral-400 font-light text-base leading-relaxed">
                The Adorzia Heritage Craft Program is built specifically for traditional craftspeople and makers - to bridge the gap between generational skill and the global market that is hungry for exactly what they make.
              </p>
            </div>
            <div className="aspect-[4/5] overflow-hidden rounded-sm border border-neutral-900">
              <img src={craft} alt="Heritage Craft" className="w-full h-full object-cover grayscale contrast-125 hover:scale-105 transition-transform duration-700" />
            </div>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mt-20">
            {[
              { title: "A dedicated marketplace presence", body: "Heritage craft listings on Adorzia are presented as their own category - with the context, the cultural story, and the premium positioning that this work commands." },
              { title: "Storytelling support", body: "We work with every heritage maker to document and communicate the tradition behind their craft - in a language that connects with buyers internationally without diluting the authenticity of what they make." },
              { title: "Pricing guidance", body: "Heritage craft in Pakistan is chronically underpriced. We help makers understand the true market value of their work and price it accordingly - because what you make is not cheap, and we will never present it as though it is." },
              { title: "Spotlight eligibility", body: "Heritage craftspeople are fully eligible for Adorzia Spotlight. A master weaver with a vision for how their tradition becomes a contemporary brand is exactly the kind of visionary we are looking for." },
              { title: "Community and connection", body: "The Heritage Craft Program connects makers with designers who want to collaborate, buyers who want to commission, and a community of people who believe that Pakistan's craft traditions belong at the center of its fashion future - not at the margins." }
            ].map((item, idx) => (
              <div key={idx} className="p-8 border border-neutral-900 rounded-sm hover:border-[#bb9457]/30 transition-colors duration-300">
                <h3 className="font-serif text-xl text-white font-normal mb-3">{item.title}</h3>
                <p className="text-sm text-neutral-400 font-light leading-relaxed">{item.body}</p>
              </div>
            ))}
          </div>

          <div className="mt-12 flex flex-wrap justify-center gap-5">
            <a href="/contact" className="inline-block px-8 py-4 bg-[#bb9457] text-black font-semibold uppercase tracking-[0.2em] text-[11px] rounded-sm hover:bg-white hover:text-black transition-all duration-300">
              Apply to the heritage craft program
            </a>
            <a href="/about" className="inline-block px-8 py-4 border border-white/20 text-white font-semibold uppercase tracking-[0.2em] text-[11px] rounded-sm hover:border-[#bb9457] hover:text-[#bb9457] transition-all duration-300">
              Learn more about what we preserve
            </a>
          </div>
        </div>
      </section>

      {/* Designer Success Stories */}
      <section className="py-32 border-b border-neutral-900 bg-neutral-950 relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(187,148,87,0.05),transparent_60%)] pointer-events-none" />
        <div className="max-w-4xl mx-auto px-6 lg:px-8 text-center">
          <span className="text-[10px] uppercase tracking-[0.3em] text-[#bb9457] font-mono font-semibold">The community speaks</span>
          <h2 className="mt-4 font-serif text-3xl md:text-5xl text-white font-normal tracking-tight">
            These stories are just beginning. Yours could be next.
          </h2>
          <p className="mt-6 text-neutral-400 font-light text-base leading-relaxed">
            Adorzia launched in 2025. We are early, we are building, and we are honest about the fact that our greatest success stories are still being written - by the designers, makers, and fashion entrepreneurs who are joining us right now at the ground floor.
          </p>
          <p className="mt-4 text-neutral-400 font-light text-base leading-relaxed">
            We will fill this section with real voices, real journeys, and real transformations as our community grows. If you join Adorzia today, your story could be the one that inspires the next generation of Pakistani fashion entrepreneurs.
          </p>
          <p className="mt-8 text-[#bb9457] font-mono text-xs uppercase tracking-widest">
            First stories publishing after Spotlight Fall 2026.
          </p>
          <div className="mt-12">
            <a href="/spotlight-event" className="inline-block px-8 py-4 bg-[#bb9457] text-black font-semibold uppercase tracking-[0.2em] text-[11px] rounded-sm hover:bg-white hover:text-black transition-all duration-300">
              Be one of the first
            </a>
          </div>
        </div>
      </section>

      {/* Apply / Get Started */}
      <section className="py-40 relative overflow-hidden bg-black">
        <div className="absolute inset-0 opacity-15">
          <img src={heroHome} alt="" className="w-full h-full object-cover grayscale contrast-125 animate-ambient-swell" />
        </div>
        <div className="absolute inset-0 bg-gradient-to-b from-black via-black/90 to-neutral-950" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(187,148,87,0.1),transparent_60%)]" />
        
        <div className="absolute inset-0 opacity-[0.02] pointer-events-none">
          <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <pattern id="cta-grid" width="80" height="80" patternUnits="userSpaceOnUse">
                <path d="M 40 0 L 80 40 L 40 80 L 0 40 Z" fill="none" stroke="#bb9457" strokeWidth="0.5" />
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#cta-grid)" />
          </svg>
        </div>
        
        <div className="max-w-5xl mx-auto px-6 lg:px-8 text-center relative z-10">
          <span className="text-[10px] uppercase tracking-[0.3em] text-[#bb9457] font-mono font-semibold">Your next step starts here</span>
          <h2 className="mt-4 font-serif text-4xl md:text-6xl text-white font-normal tracking-tight">
            Whatever you make, there is a door at Adorzia with your name on it.
          </h2>
          <p className="mt-6 text-neutral-400 font-light text-base md:text-lg max-w-3xl mx-auto leading-relaxed">
            You do not need to have it all figured out. You do not need a finished collection or an established following or a business plan in a binder. You need craft, commitment, and the belief that what you make deserves to be seen.
          </p>
          <p className="mt-4 text-neutral-400 font-light text-base md:text-lg max-w-3xl mx-auto leading-relaxed">
            We will help with the rest.
          </p>

          <div className="grid md:grid-cols-3 gap-8 mt-20">
            <div className="p-8 border border-neutral-900 rounded-sm bg-neutral-950 hover:border-[#bb9457]/30 transition-colors duration-300">
              <h3 className="font-serif text-2xl text-white font-normal mb-3">Apply for a studio membership</h3>
              <p className="text-sm text-neutral-400 font-light leading-relaxed mb-6">Join our creative coworking community in Lahore, Islamabad, or Karachi.</p>
              <a href="/contact" className="inline-block px-6 py-3 bg-[#bb9457] text-black font-semibold uppercase tracking-[0.2em] text-[10px] rounded-sm hover:bg-white hover:text-black transition-all duration-300">
                Apply for a studio
              </a>
            </div>
            <div className="p-8 border border-neutral-900 rounded-sm bg-neutral-950 hover:border-[#bb9457]/30 transition-colors duration-300">
              <h3 className="font-serif text-2xl text-white font-normal mb-3">List on the marketplace</h3>
              <p className="text-sm text-neutral-400 font-light leading-relaxed mb-6">Get your work in front of buyers locally and internationally.</p>
              <a href="/contact" className="inline-block px-6 py-3 bg-[#bb9457] text-black font-semibold uppercase tracking-[0.2em] text-[10px] rounded-sm hover:bg-white hover:text-black transition-all duration-300">
                Apply to list
              </a>
            </div>
            <div className="p-8 border border-[#bb9457]/30 rounded-sm bg-neutral-950">
              <h3 className="font-serif text-2xl text-white font-normal mb-3">Submit for Spotlight 2026</h3>
              <p className="text-sm text-neutral-400 font-light leading-relaxed mb-6">Submissions open June 1, 2026. This is your national stage.</p>
              <a href="/spotlight-event" className="inline-block px-6 py-3 bg-[#bb9457] text-black font-semibold uppercase tracking-[0.2em] text-[10px] rounded-sm hover:bg-white hover:text-black transition-all duration-300">
                Submit for Spotlight
              </a>
            </div>
          </div>

          <div className="grid md:grid-cols-3 gap-8 mt-8">
            <div className="p-8 border border-neutral-900 rounded-sm bg-neutral-950 hover:border-[#bb9457]/30 transition-colors duration-300 md:col-start-2">
              <h3 className="font-serif text-2xl text-white font-normal mb-3">Join the heritage craft program</h3>
              <p className="text-sm text-neutral-400 font-light leading-relaxed mb-6">For traditional makers ready for a global audience.</p>
              <a href="/contact" className="inline-block px-6 py-3 bg-[#bb9457] text-black font-semibold uppercase tracking-[0.2em] text-[10px] rounded-sm hover:bg-white hover:text-black transition-all duration-300">
                Apply to the program
              </a>
            </div>
          </div>

          <div className="mt-20 text-center">
            <p className="text-neutral-400 font-light text-base md:text-lg max-w-2xl mx-auto mb-8">
              Not sure which path is right for you? Write to us. We will figure it out together.
            </p>
            <a href="/contact" className="inline-block px-8 py-4 border border-white/20 text-white font-semibold uppercase tracking-[0.2em] text-[11px] rounded-sm hover:border-[#bb9457] hover:text-[#bb9457] transition-all duration-300">
              Get in touch
            </a>
          </div>
        </div>
      </section>
    </div>
  )
}

export default ForCreatives
