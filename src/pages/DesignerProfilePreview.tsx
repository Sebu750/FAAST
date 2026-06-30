import { Link } from 'react-router-dom'
import SEO from '../components/SEO'

// Import all images for the collection
import heroBanner from '../assets/hero1.jpg'
import designerPortrait from '../assets/designer-1.jpg'
import studioImg from '../assets/studio1.jpg'

// Collection images (26 images)
import collection1 from '../assets/brand1.jpg'
import collection2 from '../assets/brand2.jpg'
import collection3 from '../assets/brand3.jpg'
import collection4 from '../assets/brand4.jpg'
import collection5 from '../assets/brand5.jpg'
import collection6 from '../assets/fashion.jpg'
import collection7 from '../assets/runway.jpg'
import collection8 from '../assets/spotlight.jpg'
import collection9 from '../assets/hero-runway.jpg'
import collection10 from '../assets/studio.jpg'
import collection11 from '../assets/designer-2.jpg'
import collection12 from '../assets/designer-3.jpg'
import collection13 from '../assets/profile1.jpg'
import collection14 from '../assets/winner-1.jpg'
import collection15 from '../assets/winner-2.jpg'
import collection16 from '../assets/winner-3.jpg'
import collection17 from '../assets/banner3.jpg'
import collection18 from '../assets/banner4.jpg'
import collection19 from '../assets/hero-home.jpg'
import collection20 from '../assets/team1.jpg'
import collection21 from '../assets/advisor1.png'
import collection22 from '../assets/founder.png'
import collection23 from '../assets/fashion-icon.png'
import collection24 from '../assets/home-hero-craft.png'
import collection25 from '../assets/home-heritage-craft.png'
import collection26 from '../assets/home-sustainable-fashion.png'

// ============================================
// DESIGNER PROFILE PREVIEW - AYESHA KHAN
// ============================================
// A premium editorial profile showcasing:
// - Designer: Ayesha Khan
// - Brand: The Indigo Nomad
// - Location: Lahore, Pakistan
// - Latest Collection: 26 pieces
// ============================================

const DesignerProfilePreview = () => {
  const designer = {
    name: "Ayesha Khan",
    brand_name: "The Indigo Nomad",
    slug: "ayesha-khan",
    location: "Lahore, Pakistan",
    debut_year: 2023,
    bio: "Ayesha Khan is a contemporary fashion designer exploring the intersection of heritage craft and modern silhouettes through her brand, The Indigo Nomad. Based in Lahore, she works with traditional artisans to create limited-edition collections that honor Pakistan's textile heritage while speaking to a global audience.\n\nHer work is rooted in extensive research into indigenous dyeing techniques, particularly Ajrak block printing from Sindh. Each collection tells a story of cultural preservation through fashion, challenging the notion that heritage craft belongs only to the past.\n\nAyesha graduated with distinction from the National College of Arts (NCA) in Lahore, where her thesis collection 'Indigo Architectures' explored the geometric language embedded in traditional Sindhi craft patterns. This research continues to inform her design practice today.",
    email: "ayesha@theindigonomad.com",
    website: "www.theindigonomad.com",
    instagram: "@theindigonomad",
    facebook: "theindigonomad",
    pinterest: "theindigonomad",
    linkedin: "ayesha-khan-indigo",
    stats: {
      pieces_launched: 48,
      craft_traditions: 3,
      collections_on_adorzia: 2,
      debut_year: 2023
    },
    education: [
      {
        institution: "National College of Arts (NCA)",
        degree: "BFA in Fashion Design",
        year: 2023,
        thesis: "Indigo Architectures: Geometric Language in Sindhi Craft Patterns"
      }
    ],
    achievements: [
      {
        title: "PFDC Emerging Designer Award",
        organization: "Pakistan Fashion Design Council",
        year: 2024
      },
      {
        title: "Featured in Vogue Pakistan",
        organization: "Vogue Pakistan",
        year: 2024
      },
      {
        title: "Lahore Fashion Week",
        organization: "LFWR",
        year: 2024
      },
      {
        title: "Textile Innovation Grant",
        organization: "Pakistan Textile Export Association",
        year: 2023
      }
    ],
    skills: [
      "Ajrak Block Printing",
      "Natural Indigo Dyeing",
      "Pattern Development",
      "Textile Manipulation",
      "Sustainable Design",
      "Heritage Craft Research"
    ],
    certifications: [
      "Sustainable Fashion Certification - London College of Fashion (2023)",
      "Natural Dyeing Techniques - Textile Research Institute (2022)"
    ],
    collections: [
      {
        id: 1,
        name: "The Indigo Capsule",
        season: "Fall 2024",
        is_latest: true,
        description: "A limited-edition collection exploring the intersection of indigenous Ajrak dyeing traditions and contemporary architectural silhouettes. Six pieces that honor the geometric language of Sindh while speaking to a global audience. Each garment is hand-block printed by master artisans in Hyderabad using techniques passed down through five generations.",
        pieces_count: 26,
        images: [
          collection1, collection2, collection3, collection4, collection5,
          collection6, collection7, collection8, collection9, collection10,
          collection11, collection12, collection13, collection14, collection15,
          collection16, collection17, collection18, collection19, collection20,
          collection21, collection22, collection23, collection24, collection25, collection26
        ]
      },
      {
        id: 2,
        name: "Thread & Terrain",
        season: "Spring 2024",
        is_latest: false,
        description: "A debut collection exploring urban Pakistani identity through textile manipulation and architectural tailoring. Eighteen months of development resulted in a collection that bridges the gap between heritage craft and contemporary design language.",
        pieces_count: 22,
        images: [collection1, collection2, collection3, collection4, collection5, collection6]
      }
    ],
    selected_works: [
      {
        name: "Ajrak Architect Coat",
        price: "PKR 65,000",
        description: "Hand-block printed coat inspired by geometric patterns found in traditional Sindhi architecture. Made with natural indigo dye on handwoven cotton.",
        image: collection1
      },
      {
        name: "Indigo Nomad Dress",
        price: "PKR 45,000",
        description: "Flowing silk dress with hand-dyed indigo gradient. Features traditional Ajrak motifs reinterpreted through contemporary silhouettes.",
        image: collection2
      },
      {
        name: "Heritage Wrap Blazer",
        price: "PKR 55,000",
        description: "Structured blazer crafted from handwoven khaddar with Ajrak detailing on lapels and cuffs. Fully lined in silk.",
        image: collection3
      },
      {
        name: "Rilli Sculpt Tote",
        price: "PKR 28,000",
        description: "Hand-stitched patchwork tote using traditional Rilli techniques from Sindh. Each piece takes three weeks to complete.",
        image: collection4
      }
    ]
  }

  const latestCollection = designer.collections.find(c => c.is_latest) || designer.collections[0]
  const previousCollections = designer.collections.filter(c => c.id !== latestCollection?.id)

  return (
    <>
      <SEO 
        title={`${designer.name} | ${designer.brand_name} - Designer Profile`}
        description={designer.bio.substring(0, 160)}
        keywords={`${designer.name}, ${designer.brand_name}, Pakistani fashion designer, contemporary Pakistani fashion, heritage craft, Ajrak, indigo dyeing, Lahore fashion designer`}
        canonicalURL={`/designer-preview`}
      />

      <style>{`
        /* Moodboard masonry layout */
        .columns-2, .columns-3, .columns-4 {
          column-fill: balance;
        }
        
        /* Smooth image transitions */
        .group:hover img {
          transform: scale(1.1);
        }
        
        /* Break inside avoid for masonry */
        .break-inside-avoid {
          break-inside: avoid;
        }
      `}</style>

      <div className="min-h-screen bg-neutral-950 text-white">
        {/* Hero Section */}
        <section className="relative h-[85vh] min-h-[700px] overflow-hidden">
          <div className="absolute inset-0">
            <img src={heroBanner} alt={`${designer.name} - ${designer.brand_name}`} className="w-full h-full object-cover grayscale opacity-60" />
          </div>
          <div className="absolute inset-0 bg-gradient-to-r from-black/90 via-black/60 to-transparent" />
          <div className="absolute inset-0 bg-gradient-to-t from-neutral-950 via-transparent to-transparent" />
          
          <div className="relative z-10 h-full flex items-end">
            <div className="max-w-7xl mx-auto px-6 lg:px-8 pb-20 w-full">
              <div className="max-w-3xl">
                <span className="text-[10px] uppercase tracking-[0.3em] text-[#bb9457] font-mono font-semibold">Designer Profile</span>
                <h1 className="mt-6 font-serif text-5xl md:text-7xl lg:text-8xl text-white font-normal tracking-tight">
                  {designer.name}
                </h1>
                <div className="mt-6 text-2xl md:text-3xl text-neutral-300 font-light">
                  {designer.brand_name}
                </div>
                <div className="mt-4 flex items-center gap-4 text-neutral-400 font-light">
                  <span>{designer.location}</span>
                  <span className="w-1 h-1 bg-[#bb9457] rounded-full" />
                  <span>Since {designer.debut_year}</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Stats Bar */}
        <section className="py-12 border-t border-b border-neutral-900 bg-neutral-950">
          <div className="max-w-7xl mx-auto px-6 lg:px-8">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
              <div className="text-center">
                <div className="font-serif text-4xl text-[#bb9457] font-normal">{designer.stats.pieces_launched}</div>
                <div className="mt-2 text-neutral-400 font-light text-sm uppercase tracking-[0.15em]">Pieces Launched</div>
              </div>
              <div className="text-center">
                <div className="font-serif text-4xl text-[#bb9457] font-normal">{designer.stats.craft_traditions}</div>
                <div className="mt-2 text-neutral-400 font-light text-sm uppercase tracking-[0.15em]">Craft Traditions</div>
              </div>
              <div className="text-center">
                <div className="font-serif text-4xl text-[#bb9457] font-normal">{designer.stats.collections_on_adorzia}</div>
                <div className="mt-2 text-neutral-400 font-light text-sm uppercase tracking-[0.15em]">Collections on Adorzia</div>
              </div>
              <div className="text-center">
                <div className="font-serif text-4xl text-[#bb9457] font-normal">{designer.stats.debut_year}</div>
                <div className="mt-2 text-neutral-400 font-light text-sm uppercase tracking-[0.15em]">Debut Year</div>
              </div>
            </div>
          </div>
        </section>

        {/* About the Designer */}
        <section className="py-32 border-t border-neutral-900">
          <div className="max-w-7xl mx-auto px-6 lg:px-8">
            <div className="grid lg:grid-cols-12 gap-16">
              <div className="lg:col-span-4">
                <div className="sticky top-32">
                  <img src={designerPortrait} alt={designer.name} className="w-full aspect-[3/4] object-cover grayscale contrast-125" />
                  <div className="mt-6">
                    <span className="text-[10px] uppercase tracking-[0.3em] text-[#bb9457] font-mono font-semibold">About the Designer</span>
                    <h2 className="mt-4 font-serif text-3xl text-white font-normal">{designer.name}</h2>
                  </div>
                </div>
              </div>

              <div className="lg:col-span-8">
                <div className="space-y-6 text-neutral-300 font-light text-base md:text-lg leading-relaxed">
                  {designer.bio.split('\n\n').map((paragraph, i) => (
                    <p key={i}>{paragraph}</p>
                  ))}
                </div>

                {/* Why I Design Pull Quote */}
                <div className="my-16 border-l-2 border-[#bb9457] pl-8">
                  <p className="font-serif text-3xl md:text-4xl text-white font-normal italic leading-tight">
                    "I design to preserve what is being lost - to give heritage craft a future, not just a past."
                  </p>
                  <div className="mt-6 text-neutral-400 font-light">— {designer.name}</div>
                </div>

                {/* Education */}
                <div className="mt-16">
                  <span className="text-[10px] uppercase tracking-[0.3em] text-[#bb9457] font-mono font-semibold">Education</span>
                  <div className="mt-6 space-y-4">
                    {designer.education.map((edu, i) => (
                      <div key={i} className="border-l border-neutral-800 pl-6">
                        <div className="text-white font-normal text-lg">{edu.institution}</div>
                        <div className="mt-1 text-neutral-400 font-light">{edu.degree}, {edu.year}</div>
                        <div className="mt-2 text-neutral-500 font-light text-sm italic">Thesis: {edu.thesis}</div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Latest Collection - 26 Images */}
        <section className="py-32 border-t border-neutral-900 bg-neutral-900">
          <div className="max-w-7xl mx-auto px-6 lg:px-8">
            <div className="max-w-4xl mb-20">
              <div className="flex items-start gap-6 mb-6">
                <div className="flex-shrink-0 w-12 h-px bg-[#bb9457] mt-3" />
                <div className="flex-1">
                  <span className="text-[10px] uppercase tracking-[0.3em] text-[#bb9457] font-mono font-semibold">Latest Collection</span>
                  <div className="mt-2 text-neutral-500 font-light text-sm">Fall / Winter 2024</div>
                </div>
              </div>
              
              <h2 className="font-serif text-4xl md:text-6xl lg:text-7xl text-white font-normal tracking-tight leading-tight">
                {latestCollection.name}
              </h2>
              
              <div className="mt-8 flex items-center gap-6">
                <div className="text-2xl text-neutral-400 font-light">{latestCollection.season}</div>
                <div className="w-px h-8 bg-neutral-700" />
                <div className="text-neutral-500 font-light">{latestCollection.pieces_count} pieces</div>
              </div>
              
              <p className="mt-10 text-neutral-300 font-light text-base md:text-lg leading-relaxed max-w-3xl">
                {latestCollection.description}
              </p>
              
              {/* Collection Meta Tags */}
              <div className="mt-8 flex flex-wrap gap-3">
                <span className="px-4 py-2 border border-neutral-800 text-neutral-500 font-light text-xs uppercase tracking-[0.15em]">Contemporary</span>
                <span className="px-4 py-2 border border-neutral-800 text-neutral-500 font-light text-xs uppercase tracking-[0.15em]">Heritage Craft</span>
                <span className="px-4 py-2 border border-neutral-800 text-neutral-500 font-light text-xs uppercase tracking-[0.15em]">Limited Edition</span>
                <span className="px-4 py-2 border border-[#bb9457]/30 text-[#bb9457] font-medium text-xs uppercase tracking-[0.15em]">New Arrival</span>
              </div>
            </div>

            {/* 26 Image Moodboard Grid - Enhanced Editorial Layout */}
            <div className="relative">
              {/* Collection Header Accent */}
              <div className="absolute -top-20 left-0 w-px h-16 bg-gradient-to-b from-transparent via-[#bb9457]/50 to-transparent" />
              
              {/* Main Moodboard Grid */}
              <div className="columns-2 md:columns-3 lg:columns-4 gap-3 md:gap-4 space-y-3 md:space-y-4">
                {latestCollection.images.map((img, i) => {
                  // Create more varied aspect ratios with weighted distribution
                  const getAspectRatio = (index: number) => {
                    // Create intentional rhythm: tall, medium, square, landscape pattern
                    if (index % 7 === 0) return 'aspect-[2/3]'      // Every 7th: extra tall
                    if (index % 7 === 1) return 'aspect-[3/4]'      // Portrait
                    if (index % 7 === 2) return 'aspect-square'     // Square
                    if (index % 7 === 3) return 'aspect-[4/3]'      // Landscape
                    if (index % 7 === 4) return 'aspect-[4/5]'      // Tall portrait
                    if (index % 7 === 5) return 'aspect-[5/6]'      // Medium tall
                    return 'aspect-[16/9]'                           // Wide
                  }
                  
                  const aspectClass = getAspectRatio(i)
                  
                  // Featured pieces with special treatment
                  const isFeatured = i === 0 || i === 7 || i === 14 || i === 21 || i === 25
                  const isHero = i === 0 || i === 25  // First and last
                  
                  return (
                    <div 
                      key={i} 
                      className={`group relative overflow-hidden bg-neutral-950 mb-3 md:mb-4 break-inside-avoid ${
                        isHero ? 'ring-2 ring-[#bb9457]/30 shadow-2xl shadow-black/50' :
                        isFeatured ? 'ring-1 ring-[#bb9457]/20 shadow-xl shadow-black/30' : ''
                      }`}
                      style={{
                        animationDelay: `${i * 0.05}s`
                      }}
                    >
                      <div className={`${aspectClass} ${isHero ? 'brightness-110' : ''}`}>
                        <img 
                          src={img} 
                          alt={`${latestCollection.name} - Piece ${i + 1}`}
                          className={`w-full h-full object-cover grayscale contrast-125 group-hover:scale-110 group-hover:grayscale-0 transition-all duration-700 ease-out ${
                            isFeatured ? 'brightness-110' : ''
                          }`}
                        />
                      </div>
                      
                      {/* Enhanced Hover Overlay with Gradient */}
                      <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 ease-out" />
                      
                      {/* Piece Info Panel */}
                      <div className="absolute bottom-0 left-0 right-0 p-5 md:p-6 opacity-0 group-hover:opacity-100 transition-all duration-500 ease-out transform translate-y-4 group-hover:translate-y-0">
                        {/* Piece Number */}
                        <div className="flex items-center gap-3 mb-3">
                          <div className="w-8 h-px bg-[#bb9457]" />
                          <div className="text-[9px] uppercase tracking-[0.3em] text-[#bb9457] font-mono font-semibold">
                            {String(i + 1).padStart(2, '0')} / {latestCollection.pieces_count}
                          </div>
                        </div>
                        
                        {/* Piece Title */}
                        <div className="text-white font-serif text-lg md:text-xl font-normal leading-tight">
                          {i === 0 && "Opening Look"}
                          {i === 7 && "Centerpiece"}
                          {i === 14 && "Key Piece"}
                          {i === 21 && "Penultimate Look"}
                          {i === 25 && "Closing Look"}
                          {!isFeatured && `Look ${i + 1}`}
                        </div>
                        
                        {/* View Details Link */}
                        <div className="mt-3 text-[10px] uppercase tracking-[0.25em] text-neutral-400 font-light">
                          View Details →
                        </div>
                      </div>
                      
                      {/* Corner Accents for Featured Pieces */}
                      {isHero && (
                        <>
                          <div className="absolute top-0 left-0 w-16 h-16 border-t-2 border-l-2 border-[#bb9457]/60" />
                          <div className="absolute bottom-0 right-0 w-16 h-16 border-b-2 border-r-2 border-[#bb9457]/60" />
                        </>
                      )}
                      {isFeatured && !isHero && (
                        <div className="absolute top-0 right-0 w-12 h-12 border-t-2 border-r-2 border-[#bb9457]/40" />
                      )}
                      
                      {/* Piece Counter Badge (Mobile) */}
                      <div className="absolute top-3 right-3 md:hidden w-8 h-8 bg-black/80 backdrop-blur-sm rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                        <span className="text-[#bb9457] text-xs font-mono">{String(i + 1).padStart(2, '0')}</span>
                      </div>
                    </div>
                  )
                })}
              </div>
              
              {/* Collection Footer with Enhanced Design */}
              <div className="mt-20 pt-12 border-t border-neutral-800">
                <div className="grid md:grid-cols-3 gap-8 items-center">
                  <div className="md:col-span-1">
                    <div className="text-neutral-500 font-light text-sm">
                      <span className="text-[#bb9457] font-medium">{latestCollection.pieces_count}</span> pieces total
                    </div>
                  </div>
                  
                  <div className="md:col-span-1 text-center">
                    <div className="inline-flex items-center gap-3">
                      <div className="w-12 h-px bg-neutral-700" />
                      <div className="text-[9px] uppercase tracking-[0.3em] text-neutral-500 font-mono">The Collection</div>
                      <div className="w-12 h-px bg-neutral-700" />
                    </div>
                  </div>
                  
                  <div className="md:col-span-1 text-right">
                    <a href="#" className="inline-flex items-center gap-3 text-[#bb9457] hover:text-white transition-colors group">
                      <span className="text-sm font-medium">View Full Collection</span>
                      <span className="text-lg transform group-hover:translate-x-1 transition-transform duration-300">→</span>
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Selected Works */}
        <section className="py-32 border-t border-neutral-900">
          <div className="max-w-7xl mx-auto px-6 lg:px-8">
            <div className="max-w-4xl mb-20">
              <span className="text-[10px] uppercase tracking-[0.3em] text-[#bb9457] font-mono font-semibold">Selected Works</span>
              <h2 className="mt-6 font-serif text-4xl md:text-5xl text-white font-normal tracking-tight">
                Signature pieces from the collection
              </h2>
            </div>

            <div className="grid md:grid-cols-2 gap-8">
              {designer.selected_works.map((work, i) => (
                <div key={i} className="group">
                  <div className="aspect-[4/5] overflow-hidden bg-neutral-950 mb-6">
                    <img 
                      src={work.image} 
                      alt={work.name}
                      className="w-full h-full object-cover grayscale contrast-125 group-hover:scale-105 group-hover:grayscale-0 transition-all duration-700"
                    />
                  </div>
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <h3 className="text-white font-normal text-xl">{work.name}</h3>
                      <p className="mt-2 text-neutral-400 font-light text-sm">{work.description}</p>
                    </div>
                    <div className="text-[#bb9457] font-normal text-lg whitespace-nowrap">{work.price}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Previous Collections */}
        {previousCollections.length > 0 && (
          <section className="py-32 border-t border-neutral-900 bg-neutral-900">
            <div className="max-w-7xl mx-auto px-6 lg:px-8">
              <div className="max-w-4xl mb-20">
                <span className="text-[10px] uppercase tracking-[0.3em] text-[#bb9457] font-mono font-semibold">Previous Collections</span>
                <h2 className="mt-6 font-serif text-4xl md:text-5xl text-white font-normal tracking-tight">
                  Archive
                </h2>
              </div>

              <div className="space-y-16">
                {previousCollections.map((collection, i) => (
                  <div key={i} className="grid lg:grid-cols-12 gap-8">
                    <div className="lg:col-span-4">
                      <img src={collection.images[0]} alt={collection.name} className="w-full aspect-[4/5] object-cover grayscale contrast-125" />
                    </div>
                    <div className="lg:col-span-8">
                      <h3 className="font-serif text-3xl text-white font-normal">{collection.name}</h3>
                      <div className="mt-2 text-xl text-neutral-400 font-light">{collection.season}</div>
                      <p className="mt-6 text-neutral-300 font-light text-base md:text-lg leading-relaxed">
                        {collection.description}
                      </p>
                      <div className="mt-4 text-neutral-500 font-light text-sm">
                        {collection.pieces_count} pieces
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>
        )}

        {/* Achievements */}
        <section className="py-32 border-t border-neutral-900">
          <div className="max-w-7xl mx-auto px-6 lg:px-8">
            <div className="max-w-4xl mb-20">
              <span className="text-[10px] uppercase tracking-[0.3em] text-[#bb9457] font-mono font-semibold">Recognition</span>
              <h2 className="mt-6 font-serif text-4xl md:text-5xl text-white font-normal tracking-tight">
                Achievements & Press
              </h2>
            </div>

            <div className="grid md:grid-cols-2 gap-8">
              {designer.achievements.map((achievement, i) => (
                <div key={i} className="border-l border-[#bb9457]/30 pl-6">
                  <div className="text-white font-normal text-lg">{achievement.title}</div>
                  <div className="mt-1 text-neutral-400 font-light">{achievement.organization}, {achievement.year}</div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Creative Process */}
        <section className="py-32 border-t border-neutral-900 bg-neutral-900">
          <div className="max-w-7xl mx-auto px-6 lg:px-8">
            <div className="grid lg:grid-cols-12 gap-16">
              <div className="lg:col-span-5">
                <img src={studioImg} alt="Designer workspace" className="w-full aspect-[4/5] object-cover grayscale contrast-125" />
              </div>
              <div className="lg:col-span-7">
                <span className="text-[10px] uppercase tracking-[0.3em] text-[#bb9457] font-mono font-semibold">Creative Process</span>
                <h2 className="mt-6 font-serif text-4xl md:text-5xl text-white font-normal tracking-tight">
                  From research to reality
                </h2>
                <div className="mt-8 space-y-6 text-neutral-300 font-light text-base md:text-lg leading-relaxed">
                  <p>
                    Every collection begins with extensive field research into traditional craft techniques. I travel to craft clusters across Pakistan, working directly with master artisans to understand the cultural and technical context of their work.
                  </p>
                  <p>
                    This research informs the design direction, ensuring that each piece honors the heritage it draws from while speaking to contemporary audiences. The process is slow, deliberate, and deeply respectful of tradition.
                  </p>
                  <p>
                    All garments are produced in small batches in our Lahore studio, with hand-finishing by skilled artisans. We use natural dyes wherever possible and work with handwoven fabrics sourced directly from weavers.
                  </p>
                </div>

                {/* Skills */}
                <div className="mt-12">
                  <span className="text-[10px] uppercase tracking-[0.3em] text-[#bb9457] font-mono font-semibold">Expertise</span>
                  <div className="mt-6 flex flex-wrap gap-3">
                    {designer.skills.map((skill, i) => (
                      <span key={i} className="px-4 py-2 border border-neutral-800 text-neutral-400 font-light text-sm">
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Contact & Social - Enhanced Editorial Layout */}
        <section className="py-32 border-t border-neutral-900 bg-neutral-950">
          <div className="max-w-7xl mx-auto px-6 lg:px-8">
            {/* Header Section */}
            <div className="max-w-4xl mb-20">
              <div className="flex items-start gap-6 mb-6">
                <div className="flex-shrink-0 w-12 h-px bg-[#bb9457] mt-3" />
                <div className="flex-1">
                  <span className="text-[10px] uppercase tracking-[0.3em] text-[#bb9457] font-mono font-semibold">Connect</span>
                  <div className="mt-2 text-neutral-500 font-light text-sm">Let's collaborate</div>
                </div>
              </div>
              
              <h2 className="font-serif text-5xl md:text-6xl lg:text-7xl text-white font-normal tracking-tight leading-tight">
                Get in touch
              </h2>
              
              <p className="mt-8 text-neutral-400 font-light text-base md:text-lg leading-relaxed max-w-2xl">
                Interested in collaborating, purchasing, or learning more about {designer.brand_name}? Reach out through any of the channels below.
              </p>
            </div>

            {/* Contact Grid */}
            <div className="grid lg:grid-cols-12 gap-12 mb-20">
              {/* Primary Contact - Left */}
              <div className="lg:col-span-5">
                <div className="space-y-8">
                  {/* Email */}
                  <div className="group">
                    <div className="flex items-center gap-3 mb-3">
                      <div className="w-8 h-px bg-[#bb9457]" />
                      <span className="text-[9px] uppercase tracking-[0.3em] text-[#bb9457] font-mono font-semibold">Email</span>
                    </div>
                    <a 
                      href={`mailto:${designer.email}`} 
                      className="block text-2xl md:text-3xl text-white font-light hover:text-[#bb9457] transition-colors duration-300 leading-tight"
                    >
                      {designer.email}
                    </a>
                    <div className="mt-2 text-neutral-500 font-light text-sm">Response within 48 hours</div>
                  </div>

                  {/* Website */}
                  {designer.website && (
                    <div className="group">
                      <div className="flex items-center gap-3 mb-3">
                        <div className="w-8 h-px bg-[#bb9457]" />
                        <span className="text-[9px] uppercase tracking-[0.3em] text-[#bb9457] font-mono font-semibold">Website</span>
                      </div>
                      <a 
                        href={designer.website.startsWith('http') ? designer.website : `https://${designer.website}`} 
                        target="_blank" 
                        rel="noopener noreferrer" 
                        className="block text-2xl md:text-3xl text-white font-light hover:text-[#bb9457] transition-colors duration-300 leading-tight group-hover:underline"
                      >
                        {designer.website}
                      </a>
                      <div className="mt-2 text-neutral-500 font-light text-sm">Visit official website</div>
                    </div>
                  )}
                </div>
              </div>

              {/* Divider */}
              <div className="hidden lg:block lg:col-span-2">
                <div className="w-px h-full bg-gradient-to-b from-transparent via-neutral-800 to-transparent" />
              </div>

              {/* Studio Info - Right */}
              <div className="lg:col-span-5">
                <div className="bg-neutral-900 border border-neutral-800 p-8 md:p-10">
                  <div className="text-[9px] uppercase tracking-[0.3em] text-[#bb9457] font-mono font-semibold mb-6">
                    Studio Location
                  </div>
                  
                  <h3 className="font-serif text-3xl text-white font-normal mb-4">
                    {designer.location}
                  </h3>
                  
                  <div className="space-y-4 text-neutral-400 font-light text-base leading-relaxed">
                    <p>
                      Available for appointments and studio visits. Please schedule in advance through email correspondence.
                    </p>
                    <p className="text-neutral-500 text-sm">
                      By appointment only
                    </p>
                  </div>
                  
                  <div className="mt-8 pt-8 border-t border-neutral-800">
                    <div className="flex items-center gap-3 text-neutral-500 font-light text-sm">
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                      </svg>
                      <span>Based in Pakistan</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Social Platforms */}
            <div className="mb-20">
              <div className="flex items-center gap-6 mb-10">
                <div className="flex-1 h-px bg-neutral-800" />
                <span className="text-[9px] uppercase tracking-[0.3em] text-neutral-500 font-mono">Follow</span>
                <div className="flex-1 h-px bg-neutral-800" />
              </div>
              
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                {designer.instagram && (
                  <a 
                    href={`https://instagram.com/${designer.instagram.replace('@', '')}`} 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    className="group p-6 border border-neutral-800 hover:border-[#bb9457]/50 transition-all duration-300"
                  >
                    <div className="flex items-center justify-between mb-4">
                      <span className="text-[9px] uppercase tracking-[0.3em] text-neutral-500 font-mono">Instagram</span>
                      <svg className="w-4 h-4 text-neutral-600 group-hover:text-[#bb9457] transition-colors" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                      </svg>
                    </div>
                    <div className="text-white font-light text-lg group-hover:text-[#bb9457] transition-colors">
                      {designer.instagram}
                    </div>
                  </a>
                )}
                
                {designer.facebook && (
                  <a 
                    href={`https://facebook.com/${designer.facebook}`} 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    className="group p-6 border border-neutral-800 hover:border-[#bb9457]/50 transition-all duration-300"
                  >
                    <div className="flex items-center justify-between mb-4">
                      <span className="text-[9px] uppercase tracking-[0.3em] text-neutral-500 font-mono">Facebook</span>
                      <svg className="w-4 h-4 text-neutral-600 group-hover:text-[#bb9457] transition-colors" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                      </svg>
                    </div>
                    <div className="text-white font-light text-lg group-hover:text-[#bb9457] transition-colors">
                      {designer.facebook}
                    </div>
                  </a>
                )}
                
                {designer.linkedin && (
                  <a 
                    href={`https://linkedin.com/in/${designer.linkedin}`} 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    className="group p-6 border border-neutral-800 hover:border-[#bb9457]/50 transition-all duration-300"
                  >
                    <div className="flex items-center justify-between mb-4">
                      <span className="text-[9px] uppercase tracking-[0.3em] text-neutral-500 font-mono">LinkedIn</span>
                      <svg className="w-4 h-4 text-neutral-600 group-hover:text-[#bb9457] transition-colors" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                      </svg>
                    </div>
                    <div className="text-white font-light text-lg group-hover:text-[#bb9457] transition-colors">
                      Connect on LinkedIn
                    </div>
                  </a>
                )}
              </div>
            </div>

            {/* Footer Navigation */}
            <div className="pt-12 border-t border-neutral-900">
              <div className="flex flex-col md:flex-row items-center justify-between gap-6">
                <Link 
                  to="/designers" 
                  className="group inline-flex items-center gap-3 text-neutral-400 hover:text-white transition-colors"
                >
                  <span className="text-lg transform group-hover:-translate-x-1 transition-transform duration-300">←</span>
                  <span className="text-sm">Back to Designer Directory</span>
                </Link>
                
                <div className="flex items-center gap-6 text-neutral-600 font-light text-sm">
                  <span>{designer.brand_name}</span>
                  <span className="w-1 h-1 bg-neutral-700 rounded-full" />
                  <span>{designer.location}</span>
                  <span className="w-1 h-1 bg-neutral-700 rounded-full" />
                  <span>Since {designer.debut_year}</span>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </>
  )
}

export default DesignerProfilePreview
