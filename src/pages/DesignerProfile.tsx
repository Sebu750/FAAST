import { useParams, Link, useNavigate } from 'react-router-dom'
import { useEffect, useState } from 'react'
import SEO from '../components/SEO'
import { supabase } from '../lib/supabase'
import type { DesignerProfile } from '../types/database'
import { resolveAsset } from '../lib/assetResolver'

// Optimized image URL with Supabase transformation
const getOptimizedUrl = (url: string | null | undefined, width = 800, height = 1000): string => {
  if (!url) return '/images/placeholder.webp'
  const resolved = resolveAsset(url)
  if (resolved.includes('supabase.co/storage')) {
    const match = resolved.match(/\/storage\/v1\/object\/(?:public\/)?([^/]+)\/(.+)/)
    if (match) {
      const [, bucket, path] = match
      return `${supabase.storage.from(bucket).getPublicUrl(path.split('?')[0]).data.publicUrl}?width=${width}&height=${height}&resize=cover`
    }
  }
  return resolved
}

// ============================================
// DESIGNER PROFILE
// ============================================
// A premium editorial profile showcasing the designer,
// brand identity, portfolio, and achievements.
// ============================================

const DesignerProfile = () => {
  const { slug } = useParams<{ slug: string }>()
  const navigate = useNavigate()
  const [designer, setDesigner] = useState<DesignerProfile | null>(null)
  const [loading, setLoading] = useState(true)
  const [previewImage, setPreviewImage] = useState<string | null>(null)
  const [viewCollection, setViewCollection] = useState<string | null>(null)

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [slug])

  useEffect(() => {
    const fetchDesigner = async () => {
      if (!slug) return
      
      try {
        setLoading(true)
        
        // Fetch main designer data - only needed columns
        const { data: designerData, error: designerError } = await supabase
          .from('designers')
          .select('id, name, brand, slug, location, nationality, languages, experience, specialization, category, gender, bio, short_bio, philosophy, image_url, cover_image_url, availability, instagram_reels, is_featured, is_active, created_at, updated_at')
          .eq('slug', slug)
          .eq('is_active', true)
          .single()

        if (designerError || !designerData) {
          console.error('Error fetching designer:', designerError)
          setDesigner(null)
          setLoading(false)
          return
        }

        // Fetch related data in parallel - only needed columns
        const [collectionsRes, educationRes, achievementsRes, skillsRes, certificationsRes, socialRes] = await Promise.all([
          supabase.from('designer_collections').select('id, designer_id, title, season, description, inspiration, looks, cover_image_url, images, is_latest, created_at').eq('designer_id', designerData.id).order('created_at', { ascending: false }),
          supabase.from('designer_education').select('id, designer_id, institution, degree, year, created_at').eq('designer_id', designerData.id).order('year', { ascending: false }),
          supabase.from('designer_achievements').select('id, designer_id, title, detail, created_at').eq('designer_id', designerData.id).order('created_at', { ascending: false }),
          supabase.from('designer_skills').select('id, designer_id, skill, created_at').eq('designer_id', designerData.id),
          supabase.from('designer_certifications').select('id, designer_id, certification, created_at').eq('designer_id', designerData.id),
          supabase.from('designer_social_links').select('id, designer_id, instagram, facebook, tiktok, pinterest, linkedin, behance, website, email, shop, portfolio, created_at').eq('designer_id', designerData.id).single()
        ])

        const fullDesigner: DesignerProfile = {
          ...designerData,
          collections: collectionsRes.data || [],
          education: educationRes.data || [],
          achievements: achievementsRes.data || [],
          skills: skillsRes.data || [],
          certifications: certificationsRes.data || [],
          social_links: socialRes.data || null
        }

        setDesigner(fullDesigner)
      } catch (err) {
        console.error('Error fetching designer:', err)
        setDesigner(null)
      } finally {
        setLoading(false)
      }
    }

    fetchDesigner()
  }, [slug])

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-black pt-20">
        <div className="inline-block w-8 h-8 border-2 border-neutral-800 border-t-[#bb9457] rounded-full animate-spin" />
      </div>
    )
  }

  if (!designer) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-black pt-20">
        <div className="text-center">
          <p className="text-neutral-500 text-lg mb-4">Designer not found</p>
          <Link to="/designers" className="text-[#bb9457] text-sm hover:text-white transition-colors">← Back to Directory</Link>
        </div>
      </div>
    )
  }

  const latestCollection = designer.collections.find(c => c.is_latest) || designer.collections[0]
  const previousCollections = designer.collections.filter(c => c.id !== latestCollection?.id)

  return (
    <>
      <SEO 
        title={`${designer.name} — ${designer.brand} | Adorzia Designers`}
        description={designer.short_bio || designer.bio || `Discover ${designer.name}, a Pakistani fashion designer showcasing contemporary collections and heritage craft on Adorzia.`}
        canonicalURL={`https://adorzia.com/designers/${designer.slug}`}
        ogTitle={`${designer.name} — ${designer.brand} | Adorzia`}
        ogDescription={designer.short_bio || designer.bio || `Discover ${designer.name}, a Pakistani fashion designer on Adorzia.`}
        ogImage={designer.cover_image_url || designer.image_url || 'https://adorzia.com/og-image.jpeg'}
        ogImageAlt={`${designer.name} - ${designer.brand} fashion designer profile`}
        schemaType="Person"
        schema={{
          "@context": "https://schema.org",
          "@type": "Person",
          "name": designer.name,
          "jobTitle": "Fashion Designer",
          "worksFor": {
            "@type": "Organization",
            "name": designer.brand
          },
          "description": designer.short_bio || designer.bio,
          "url": `https://adorzia.com/designers/${designer.slug}`,
          "image": designer.image_url,
          "knowsAbout": ["Fashion Design", "Pakistani Fashion", designer.specialization, designer.category].filter(Boolean),
          "memberOf": {
            "@type": "Organization",
            "name": "Adorzia",
            "url": "https://adorzia.com"
          }
        }}
        keywords={`${designer.name}, ${designer.brand}, Pakistani fashion designer, ${designer.location || 'Pakistan'} designer, ${designer.specialization || 'Fashion'}, ${designer.category || 'Contemporary Fashion'}, Adorzia designer, Pakistani fashion brand, Emerging designer Pakistan`}
      />

      {/* ===== HERO BANNER ===== */}
      <section className="relative h-[50vh] lg:h-[60vh] overflow-hidden">
        <img src={getOptimizedUrl(designer.cover_image_url, 1600, 900)} alt={designer.brand} className="absolute inset-0 w-full h-full object-cover" decoding="async" fetchPriority="high" />
        <div className="absolute inset-0 bg-black/30" />
        {/* Back button */}
        <div className="absolute top-28 left-4 sm:left-6 lg:left-8 z-10">
          <button onClick={() => navigate('/designers')} className="flex items-center gap-2 text-neutral-300 text-xs hover:text-white transition-colors">
            <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" /></svg>
            All Designers
          </button>
        </div>
      </section>

      {/* ===== DESIGNER HEADER ===== */}
      <section className="bg-black">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-16">
          {/* Brand mark + name centered */}
          <div className="text-center mb-8">
            <div className="w-20 h-20 mx-auto border border-neutral-800 rounded-full overflow-hidden bg-neutral-900 mb-4">
              <img src={getOptimizedUrl(designer.image_url, 200, 200)} alt={designer.name} className="w-full h-full object-cover" decoding="async" />
            </div>
            <p className="text-neutral-500 text-[10px] uppercase tracking-[0.25em] mb-2">{designer.brand}</p>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-serif text-white leading-[0.95] tracking-tight">{designer.name}</h1>
          </div>

          {/* Social links — right aligned */}
          <div className="flex items-center justify-end gap-3">
            {designer.social_links?.instagram && <a href={designer.social_links.instagram} target="_blank" rel="noopener noreferrer" className="text-neutral-400 hover:text-white transition-colors" aria-label="Instagram"><InstagramIcon /></a>}
            {designer.social_links?.facebook && <a href={designer.social_links.facebook} target="_blank" rel="noopener noreferrer" className="text-neutral-400 hover:text-white transition-colors" aria-label="Facebook"><FacebookIcon /></a>}
            {designer.social_links?.tiktok && <a href={designer.social_links.tiktok} target="_blank" rel="noopener noreferrer" className="text-neutral-400 hover:text-white transition-colors" aria-label="TikTok"><TiktokIcon /></a>}
            {designer.social_links?.pinterest && <a href={designer.social_links.pinterest} target="_blank" rel="noopener noreferrer" className="text-neutral-400 hover:text-white transition-colors" aria-label="Pinterest"><PinterestIcon /></a>}
            {designer.social_links?.linkedin && <a href={designer.social_links.linkedin} target="_blank" rel="noopener noreferrer" className="text-neutral-400 hover:text-white transition-colors" aria-label="LinkedIn"><LinkedinIcon /></a>}
            {designer.social_links?.behance && <a href={designer.social_links.behance} target="_blank" rel="noopener noreferrer" className="text-neutral-400 hover:text-white transition-colors" aria-label="Behance"><WebsiteIcon /></a>}
            {designer.social_links?.email && <a href={designer.social_links.email} className="text-neutral-400 hover:text-white transition-colors" aria-label="Email"><EmailIcon /></a>}
          </div>

          {/* Contact + Share */}
          <div className="flex items-center gap-8 mt-8 pt-8">
            <div>
              <p className="text-[10px] uppercase tracking-[0.2em] text-neutral-500 mb-1">Contact</p>
              <p className="text-neutral-300 text-sm">{designer.location}</p>
            </div>
            <div>
              <p className="text-[10px] uppercase tracking-[0.2em] text-neutral-500 mb-1">Share</p>
              <button onClick={() => navigator.clipboard?.writeText(window.location.href)} className="text-neutral-300 text-sm hover:text-white transition-colors">Copy link</button>
            </div>
          </div>
        </div>
      </section>

      {/* ===== CURRENT WORK (LATEST COLLECTION) ===== */}
      {latestCollection && (
        <section className="py-16 lg:py-24 bg-black">
          <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
            {/* Title */}
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-serif text-white leading-[0.95] tracking-tight mb-8">
              Latest Collection
            </h2>

            {/* MOODBOARD COLLAGE - Premium fashion editorial layout */}
            {latestCollection.images && latestCollection.images.length > 0 ? (
              <div className="mb-12">
                {/* Hero Image - Full Width Cinematic */}
                <div className="mb-2 overflow-hidden cursor-pointer group relative h-[70vh] min-h-[500px] max-h-[800px]">
                  <img
                    src={getOptimizedUrl(latestCollection.images[0], 1200, 1500)}
                    alt={`${latestCollection.title} hero`}
                    className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-[1.02]"
                    onClick={() => latestCollection.images && setPreviewImage(latestCollection.images[0])}
                    decoding="async"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />
                  <div className="absolute bottom-6 left-6 right-6 flex items-end justify-between opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                    <span className="text-white/90 text-xs uppercase tracking-[0.2em]">Look 01</span>
                    <span className="text-white/60 text-xs">Click to expand</span>
                  </div>
                </div>
                            
                {/* Asymmetric Supporting Grid */}
                {latestCollection.images.length > 1 && (
                  <div className="grid grid-cols-12 gap-1.5">
                    {latestCollection.images.slice(1).map((img, i) => {
                      // Moodboard pattern: varied sizes creating visual rhythm
                      const patterns = [
                        // Row 1: Large feature + 2 medium
                        'col-span-5 row-span-2 h-[420px]',
                        'col-span-4 row-span-1 h-[205px]',
                        'col-span-3 row-span-1 h-[205px]',
                        // Row 2 continuation
                        'col-span-4 row-span-1 h-[205px]',
                        'col-span-3 row-span-2 h-[420px]',
                        // Row 3: Wide panoramic + squares
                        'col-span-6 row-span-1 h-[280px]',
                        'col-span-3 row-span-1 h-[280px]',
                        'col-span-3 row-span-1 h-[280px]',
                        // Row 4: Mixed editorial
                        'col-span-4 row-span-1 h-[320px]',
                        'col-span-4 row-span-2 h-[650px]',
                        'col-span-4 row-span-1 h-[320px]',
                        // Row 5
                        'col-span-4 row-span-1 h-[320px]',
                        'col-span-4 row-span-1 h-[320px]',
                        // Additional images
                        'col-span-3 row-span-1 h-[260px]',
                        'col-span-6 row-span-1 h-[260px]',
                        'col-span-3 row-span-1 h-[260px]',
                        'col-span-4 row-span-1 h-[300px]',
                        'col-span-4 row-span-1 h-[300px]',
                        'col-span-4 row-span-1 h-[300px]',
                        'col-span-6 row-span-1 h-[350px]',
                        'col-span-3 row-span-1 h-[350px]',
                        'col-span-3 row-span-1 h-[350px]',
                        'col-span-4 row-span-1 h-[280px]',
                        'col-span-4 row-span-1 h-[280px]',
                        'col-span-4 row-span-1 h-[280px]',
                        'col-span-3 row-span-1 h-[320px]',
                        'col-span-6 row-span-1 h-[320px]',
                        'col-span-3 row-span-1 h-[320px]',
                      ]
                      const sizeClass = patterns[i % patterns.length]
                      return (
                        <div
                          key={i}
                          className={`overflow-hidden cursor-pointer group relative ${sizeClass}`}
                          onClick={() => setPreviewImage(img)}
                        >
                          <img
                            src={getOptimizedUrl(img, 600, 800)}
                            alt={`${latestCollection.title} look ${i + 2}`}
                            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                            loading="lazy"
                            decoding="async"
                          />
                          <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-all duration-300" />
                          <div className="absolute bottom-2 left-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                            <span className="text-white/80 text-[10px] uppercase tracking-wider bg-black/40 backdrop-blur-sm px-2 py-1">Look {String(i + 2).padStart(2, '0')}</span>
                          </div>
                        </div>
                      )
                    })}
                  </div>
                )}
              </div>
            ) : (
              /* No Images - Show Collection Info Card */
              <div className="mb-8 p-8 sm:p-12 border border-neutral-800 bg-neutral-950/50">
                <div className="flex items-center gap-3 mb-4">
                  <span className="w-2 h-2 bg-[#bb9457] rounded-full animate-pulse" />
                  <p className="text-neutral-500 text-xs uppercase tracking-wider">Collection images coming soon</p>
                </div>
                <p className="text-neutral-600 text-sm">Check back for the full lookbook</p>
              </div>
            )}

            {/* Collection name + description - Always shown */}
            <div className="flex flex-col sm:flex-row gap-6 sm:gap-12 pt-4 sm:pt-8">
              <div className="shrink-0">
                <p className="text-[#bb9457] text-[10px] uppercase tracking-[0.3em] mb-2">{latestCollection.season}</p>
                <h3 className="text-2xl sm:text-3xl lg:text-4xl font-serif text-white leading-[0.95] tracking-tight">
                  {latestCollection.title}
                </h3>
                {latestCollection.looks && (
                  <p className="text-neutral-600 text-xs mt-2">{latestCollection.looks} looks</p>
                )}
              </div>
              <div className="max-w-md">
                <p className="text-neutral-400 text-sm leading-relaxed mb-4">{latestCollection.description}</p>
                {latestCollection.inspiration && (
                  <div className="border-l border-neutral-800 pl-4">
                    <p className="text-neutral-500 text-xs">
                      <span className="text-neutral-600 uppercase tracking-wider text-[10px]">Inspiration: </span>
                      {latestCollection.inspiration}
                    </p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </section>
      )}

      {/* ===== PREVIOUS COLLECTIONS - Editorial Masonry Grid ===== */}
      {previousCollections.length > 0 && (
        <section className="py-16 lg:py-24 bg-black">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <p className="text-[#bb9457] text-[10px] uppercase tracking-[0.3em] mb-2">Archive</p>
            <h2 className="text-2xl lg:text-3xl font-serif text-white mb-10">Previous Collections</h2>
            
            {/* Masonry Grid - Pinterest/NJAL style with mixed heights */}
            <div className="columns-1 sm:columns-2 lg:columns-3 gap-4 space-y-4">
              {previousCollections.map((col, idx) => {
                // Vary card heights for editorial masonry effect
                const heights = ['h-72', 'h-80', 'h-96', 'h-[28rem]', 'h-64', 'h-[22rem]']
                const cardHeight = heights[idx % heights.length]
                
                return (
                  <div 
                    key={col.id} 
                    onClick={() => setViewCollection(col.id)}
                    className="group relative overflow-hidden cursor-pointer break-inside-avoid bg-neutral-950 border border-neutral-800/50 hover:border-[#bb9457]/40 transition-all duration-500"
                  >
                    {/* Cover Image with Variable Height */}
                    <div className={`relative ${cardHeight} overflow-hidden`}>
                      <img 
                        src={getOptimizedUrl(col.cover_image_url, 600, 800)}
                        alt={col.title} 
                        className="w-full h-full object-cover opacity-80 group-hover:opacity-100 group-hover:scale-105 transition-all duration-700" 
                        loading="lazy"
                        decoding="async"
                      />
                      {/* Gradient Overlay */}
                      <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent" />
                      
                      {/* Season Badge */}
                      <div className="absolute top-4 left-4">
                        <span className="bg-black/70 backdrop-blur-sm text-neutral-200 text-[10px] uppercase tracking-[0.2em] px-3 py-1.5 border border-white/10">
                          {col.season}
                        </span>
                      </div>
                      
                      {/* Looks Count Badge */}
                      <div className="absolute top-4 right-4">
                        <span className="bg-[#bb9457]/90 backdrop-blur-sm text-black text-[10px] uppercase tracking-wider font-semibold px-2.5 py-1">
                          {col.looks} looks
                        </span>
                      </div>
                      
                      {/* Bottom Content Overlay */}
                      <div className="absolute bottom-0 left-0 right-0 p-5">
                        <h3 className="text-white font-serif text-xl mb-1.5 group-hover:text-[#bb9457] transition-colors duration-300 leading-tight">
                          {col.title}
                        </h3>
                        <p className="text-neutral-400 text-xs leading-relaxed line-clamp-2 mb-3">
                          {col.description}
                        </p>
                        <div className="flex items-center justify-between pt-2 border-t border-white/10">
                          <span className="text-neutral-500 text-[10px] uppercase tracking-wider">View Collection</span>
                          <span className="text-[#bb9457] text-sm group-hover:translate-x-1 transition-transform duration-300">→</span>
                        </div>
                      </div>
                    </div>
                  </div>
                )
              })}
            </div>
          </div>
        </section>
      )}

      {/* ===== ABOUT THE DESIGNER ===== */}
      <section className="py-20 lg:py-32 bg-black">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Title */}
          <h2 className="text-5xl sm:text-6xl lg:text-7xl xl:text-8xl font-serif text-white leading-[0.9] tracking-tight mb-12 lg:mb-16">
            About Me
          </h2>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16">
            {/* Left: Bio */}
            <div className="lg:col-span-7">
              <p className="text-neutral-400 text-base leading-[1.8] mb-8">{designer.bio}</p>

              {/* Why I Design - Editorial Pull Quote */}
              <div className="border-l-2 border-neutral-800 pl-6 my-12">
                <p className="text-[10px] uppercase tracking-[0.3em] text-neutral-600 mb-4">Why I Design</p>
                <blockquote className="text-2xl lg:text-3xl font-serif text-white leading-[1.3] italic">
                  "{designer.philosophy}"
                </blockquote>
              </div>

              {/* Education - Prominent */}
              {designer.education.length > 0 && (
                <div className="mt-12">
                  <p className="text-[10px] uppercase tracking-[0.3em] text-neutral-600 mb-4">Education</p>
                  {designer.education.map((edu, i) => (
                    <div key={i} className="mb-6">
                      <p className="text-white text-lg font-serif">{edu.institution}</p>
                      <p className="text-neutral-500 text-sm mt-1">{edu.degree} · {edu.year}</p>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Right: Key Info */}
            <div className="lg:col-span-5 lg:pl-8">
              {/* Profile Image */}
              <div className="w-32 h-32 rounded-full overflow-hidden bg-neutral-900 mb-12 border border-neutral-800">
                <img 
                  src={getOptimizedUrl(designer.image_url, 300, 300)}
                  alt={designer.name}
                  className="w-full h-full object-cover"
                  decoding="async"
                />
              </div>

              {/* Location */}
              <div className="mb-8">
                <p className="text-[10px] uppercase tracking-[0.3em] text-neutral-600 mb-2">Location</p>
                <p className="text-neutral-300 text-sm">{designer.location}</p>
              </div>

              {/* University */}
              {designer.education.length > 0 && (
                <div className="mb-8">
                  <p className="text-[10px] uppercase tracking-[0.3em] text-neutral-600 mb-2">University</p>
                  <p className="text-neutral-300 text-sm">{designer.education[0].institution}</p>
                </div>
              )}

              {/* Graduation Year */}
              {designer.education.length > 0 && (
                <div className="mb-8">
                  <p className="text-[10px] uppercase tracking-[0.3em] text-neutral-600 mb-2">Graduation Year</p>
                  <p className="text-neutral-300 text-sm">{designer.education[0].year}</p>
                </div>
              )}

              {/* Achievements */}
              {designer.achievements.length > 0 && (
                <div className="mt-12 pt-8">
                  <p className="text-[10px] uppercase tracking-[0.3em] text-neutral-600 mb-4">Achievements</p>
                  <div className="space-y-3">
                    {designer.achievements.map((a, i) => (
                      <div key={i}>
                        <p className="text-neutral-300 text-sm">{a.title}</p>
                        <p className="text-neutral-600 text-xs mt-0.5">{a.detail}</p>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Skills */}
              {designer.skills.length > 0 && (
                <div className="mt-12 pt-8">
                  <p className="text-[10px] uppercase tracking-[0.3em] text-neutral-600 mb-4">Skills & Expertise</p>
                  <div className="flex flex-wrap gap-2">
                    {designer.skills.map((s, i) => (
                      <span key={i} className="px-3 py-1.5 bg-neutral-900 border border-neutral-800 text-neutral-300 text-xs rounded-full">
                        {s.skill}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {/* Certifications */}
              {designer.certifications.length > 0 && (
                <div className="mt-12 pt-8">
                  <p className="text-[10px] uppercase tracking-[0.3em] text-neutral-600 mb-4">Certifications</p>
                  <div className="space-y-2">
                    {designer.certifications.map((c, i) => (
                      <div key={i} className="flex items-center gap-2">
                        <span className="w-1 h-1 bg-[#bb9457] rounded-full" />
                        <p className="text-neutral-300 text-sm">{c.certification}</p>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Social Links */}
              {designer.social_links && (
                <div className="mt-12 pt-8">
                  <p className="text-[10px] uppercase tracking-[0.3em] text-neutral-600 mb-4">Connect</p>
                  <div className="space-y-2">
                    {designer.social_links.instagram && (
                      <a href={`https://instagram.com/${designer.social_links.instagram}`} target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 text-neutral-400 hover:text-[#bb9457] text-sm transition-colors">
                        <InstagramIcon /> Instagram
                      </a>
                    )}
                    {designer.social_links.website && (
                      <a href={designer.social_links.website.startsWith('http') ? designer.social_links.website : `https://${designer.social_links.website}`} target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 text-neutral-400 hover:text-[#bb9457] text-sm transition-colors">
                        <WebsiteIcon /> Website
                      </a>
                    )}
                    {designer.social_links.email && (
                      <a href={`mailto:${designer.social_links.email}`} className="flex items-center gap-3 text-neutral-400 hover:text-[#bb9457] text-sm transition-colors">
                        <EmailIcon /> {designer.social_links.email}
                      </a>
                    )}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* ===== INSTAGRAM REELS ===== */}
      {designer.instagram_reels && designer.instagram_reels.length > 0 && (
        <section className="py-20 lg:py-32 bg-black">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            {/* Title */}
            <h2 className="text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-serif text-white leading-[0.9] tracking-tight mb-12 lg:mb-16">
              Reels
            </h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {designer.instagram_reels.slice(0, 3).map((reelUrl, index) => {
                // Convert embed URL to regular URL
                const reelLink = reelUrl.replace('/embed', '')
                
                return (
                  <div key={index} className="relative w-full max-w-[360px] mx-auto" style={{ aspectRatio: '9/16' }}>
                    <iframe
                      src={reelUrl}
                      className="absolute inset-0 w-full h-full"
                      frameBorder="0"
                      scrolling="no"
                      allowFullScreen
                      title={`Instagram Reel ${index + 1}`}
                      style={{
                        // Crop Instagram header (~60px) and footer (~120px) to show only video
                        clipPath: 'inset(60px 0 120px 0)'
                      }}
                    />
                    {/* Overlay to hide Instagram UI - top */}
                    <div className="absolute top-0 left-0 right-0 h-[60px] bg-black z-10 pointer-events-none" />
                    {/* Overlay to hide Instagram UI - bottom */}
                    <div className="absolute bottom-0 left-0 right-0 h-[120px] bg-black z-10 pointer-events-none" />
                    
                    {/* Play Button Overlay - links to full reel */}
                    <a
                      href={reelLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="absolute inset-0 flex items-center justify-center z-20 group"
                    >
                      <div className="w-16 h-16 rounded-full bg-white/20 backdrop-blur-md flex items-center justify-center group-hover:scale-110 group-hover:bg-[#bb9457]/30 transition-all duration-500">
                        <svg className="w-8 h-8 text-white ml-1" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M8 5v14l11-7z"/>
                        </svg>
                      </div>
                    </a>
                  </div>
                )
              })}
            </div>

            {/* Instagram Link */}
            {designer.social_links?.instagram && (
              <div className="mt-12 text-center">
                <a
                  href={`https://instagram.com/${designer.social_links.instagram}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-3 text-xs uppercase tracking-[0.2em] font-semibold text-white hover:text-[#bb9457] transition-colors duration-300"
                >
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                  </svg>
                  Follow on Instagram
                </a>
              </div>
            )}
          </div>
        </section>
      )}

      {/* ===== IMAGE PREVIEW MODAL ===== */}
      {previewImage && (
        <div className="fixed inset-0 z-[200] flex items-center justify-center bg-black/95 backdrop-blur-sm" onClick={() => setPreviewImage(null)}>
          <button className="absolute top-6 right-6 text-neutral-400 hover:text-white transition-colors" onClick={() => setPreviewImage(null)} aria-label="Close preview">
            <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M6 18L18 6M6 6l12 12" /></svg>
          </button>
          <img src={previewImage} alt="Collection preview" className="max-w-[90vw] max-h-[85vh] object-contain" onClick={e => e.stopPropagation()} />
        </div>
      )}

      {/* ===== COLLECTION VIEW MODAL ===== */}
      {viewCollection && (() => {
        const col = previousCollections.find(c => c.id === viewCollection)
        if (!col) return null
        return (
          <div 
            className="fixed inset-0 z-[60] bg-black overflow-y-auto"
            onClick={() => setViewCollection(null)}
          >
            {/* Close Button - Fixed */}
            <button 
              onClick={() => setViewCollection(null)}
              className="fixed top-6 right-6 z-50 bg-black/60 backdrop-blur-sm border border-neutral-700 text-neutral-300 hover:text-white hover:border-neutral-500 transition-all p-3 rounded-full"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>

            {/* Hero Cover Section */}
            <div className="relative h-[50vh] lg:h-[60vh] overflow-hidden" onClick={e => e.stopPropagation()}>
              <img 
                src={getOptimizedUrl(col.cover_image_url, 1200, 1500)}
                alt={col.title} 
                className="w-full h-full object-cover opacity-80"
                decoding="async"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent" />
              {/* Collection Title Overlay */}
              <div className="absolute bottom-0 left-0 right-0 p-8 lg:p-16">
                <div className="max-w-5xl mx-auto">
                  <p className="text-[#bb9457] text-[10px] uppercase tracking-[0.3em] mb-3">{col.season}</p>
                  <h2 className="text-white font-serif text-4xl sm:text-5xl lg:text-6xl leading-[0.95] tracking-tight mb-4">{col.title}</h2>
                  <div className="flex items-center gap-4 text-neutral-400 text-xs">
                    <span>{col.looks} looks</span>
                    <span className="w-1 h-1 bg-neutral-600 rounded-full" />
                    <span>Collection</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Collection Content */}
            <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-16" onClick={e => e.stopPropagation()}>
              {/* Description Section */}
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-16 mb-16">
                <div className="lg:col-span-7">
                  <p className="text-neutral-300 text-base leading-[1.8] mb-6">{col.description}</p>
                </div>
                <div className="lg:col-span-5">
                  {col.inspiration && (
                    <div className="border-l-2 border-neutral-800 pl-6">
                      <p className="text-[10px] uppercase tracking-[0.3em] text-neutral-600 mb-3">Inspiration</p>
                      <p className="text-neutral-400 text-sm leading-relaxed italic">{col.inspiration}</p>
                    </div>
                  )}
                </div>
              </div>

              {/* Divider */}
              <div className="h-px bg-neutral-800 mb-12" />

              {/* Image Grid */}
              {col.images && col.images.length > 0 ? (
                <div>
                  <p className="text-neutral-500 text-[10px] uppercase tracking-[0.3em] mb-6">The Collection</p>
                  {/* Editorial Grid Layout */}
                  <div className="columns-2 sm:columns-3 lg:columns-4 gap-2">
                    {col.images.map((img, i) => {
                      const heights = ['h-72', 'h-80', 'h-96', 'h-80', 'h-64', 'h-88', 'h-72', 'h-96']
                      return (
                        <div
                          key={i}
                          className={`break-inside-avoid mb-2 overflow-hidden cursor-pointer group relative ${heights[i % heights.length]}`}
                          onClick={() => setPreviewImage(img)}
                        >
                          <img
                            src={getOptimizedUrl(img, 600, 800)}
                            alt={`${col.title} look ${i + 1}`}
                            className="w-full h-full object-cover transition-all duration-700 group-hover:scale-105 group-hover:brightness-110"
                            loading="lazy"
                            decoding="async"
                          />
                          <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-all duration-300" />
                          {/* Look number on hover */}
                          <div className="absolute bottom-3 left-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                            <span className="bg-black/70 backdrop-blur-sm text-white text-[10px] px-2 py-1">Look {i + 1}</span>
                          </div>
                        </div>
                      )
                    })}
                  </div>
                </div>
              ) : (
                <div className="py-20 text-center border border-neutral-800">
                  <p className="text-neutral-500 text-sm">No images available for this collection</p>
                </div>
              )}

              {/* Back to Profile */}
              <div className="mt-16 pt-8">
                <button 
                  onClick={() => setViewCollection(null)}
                  className="flex items-center gap-2 text-neutral-400 hover:text-white text-sm transition-colors group"
                >
                  <svg className="w-4 h-4 transition-transform group-hover:-translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                  </svg>
                  Back to Profile
                </button>
              </div>
            </div>
          </div>
        )
      })()}
    </>
  )
}

// Helper components
const WebsiteIcon = () => (
  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9" /></svg>
)
const EmailIcon = () => (
  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" /></svg>
)
const InstagramIcon = () => (
  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" /></svg>
)
const FacebookIcon = () => (
  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" /></svg>
)
const TiktokIcon = () => (
  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M12.525.02c1.31-.02 2.61-.01 3.91-.02.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.05-2.89-.35-4.2-.97-.57-.26-1.1-.59-1.62-.93-.01 2.92.01 5.84-.02 8.75-.08 1.4-.54 2.79-1.35 3.94-1.31 1.92-3.58 3.17-5.91 3.21-1.43.08-2.86-.31-4.08-1.03-2.02-1.19-3.44-3.37-3.65-5.71-.02-.5-.03-1-.01-1.49.18-1.9 1.12-3.72 2.58-4.96 1.66-1.44 3.98-2.13 6.15-1.72.02 1.48-.04 2.96-.04 4.44-.99-.32-2.15-.23-3.02.37-.63.41-1.11 1.04-1.36 1.75-.21.51-.15 1.07-.14 1.61.24 1.64 1.82 3.02 3.5 2.87 1.12-.01 2.19-.66 2.77-1.61.19-.33.4-.67.41-1.06.1-1.79.06-3.57.07-5.36.01-4.03-.01-8.05.02-12.07z" /></svg>
)
const PinterestIcon = () => (
  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M12.017 0C5.396 0 .029 5.367.029 11.987c0 5.079 3.158 9.417 7.618 11.162-.105-.949-.199-2.403.041-3.439.219-.937 1.406-5.957 1.406-5.957s-.359-.72-.359-1.781c0-1.663.967-2.911 2.168-2.911 1.024 0 1.518.769 1.518 1.688 0 1.029-.653 2.567-.992 3.992-.285 1.193.6 2.165 1.775 2.165 2.128 0 3.768-2.245 3.768-5.487 0-2.861-2.063-4.869-5.008-4.869-3.41 0-5.409 2.562-5.409 5.199 0 1.033.394 2.143.889 2.741.099.12.112.225.085.345-.09.375-.293 1.199-.334 1.363-.053.225-.174.271-.401.165-1.495-.69-2.433-2.878-2.433-4.646 0-3.776 2.748-7.252 7.92-7.252 4.158 0 7.392 2.967 7.392 6.923 0 4.135-2.607 7.462-6.233 7.462-1.214 0-2.354-.629-2.758-1.379l-.749 2.848c-.269 1.045-1.004 2.352-1.498 3.146 1.123.345 2.306.535 3.55.535 6.607 0 11.985-5.365 11.985-11.987C23.97 5.39 18.592.026 11.985.026L12.017 0z" /></svg>
)
const LinkedinIcon = () => (
  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" /></svg>
)

export default DesignerProfile
