import { useParams, Link, useNavigate } from 'react-router-dom'
import { useEffect, useState } from 'react'
import SEO from '../components/SEO'
import { supabase } from '../lib/supabase'
import type { DesignerProfile } from '../types/database'

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

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [slug])

  useEffect(() => {
    const fetchDesigner = async () => {
      if (!slug) return
      
      try {
        setLoading(true)
        
        // Fetch main designer data
        const { data: designerData, error: designerError } = await supabase
          .from('designers')
          .select('*')
          .eq('slug', slug)
          .eq('is_active', true)
          .single()

        if (designerError || !designerData) {
          console.error('Error fetching designer:', designerError)
          setDesigner(null)
          setLoading(false)
          return
        }

        // Fetch related data in parallel
        const [collectionsRes, educationRes, achievementsRes, skillsRes, certificationsRes, socialRes] = await Promise.all([
          supabase.from('designer_collections').select('*').eq('designer_id', designerData.id).order('created_at', { ascending: false }),
          supabase.from('designer_education').select('*').eq('designer_id', designerData.id).order('year', { ascending: false }),
          supabase.from('designer_achievements').select('*').eq('designer_id', designerData.id).order('created_at', { ascending: false }),
          supabase.from('designer_skills').select('*').eq('designer_id', designerData.id),
          supabase.from('designer_certifications').select('*').eq('designer_id', designerData.id),
          supabase.from('designer_social_links').select('*').eq('designer_id', designerData.id).single()
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
      <SEO title={`${designer.name} — ${designer.brand} | Adorzia Designers`} description={designer.short_bio || ''} canonicalURL={`https://adorzia.com/designers/${designer.slug}`} />

      {/* ===== HERO BANNER ===== */}
      <section className="relative h-[50vh] lg:h-[60vh] overflow-hidden">
        <img src={designer.cover_image_url || '/images/placeholder.webp'} alt={designer.brand} className="absolute inset-0 w-full h-full object-cover" />
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
      <section className="bg-black border-b border-neutral-900">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-16">
          {/* Brand mark + name centered */}
          <div className="text-center mb-8">
            <div className="w-20 h-20 mx-auto border border-neutral-800 rounded-full overflow-hidden bg-neutral-900 mb-4">
              <img src={designer.image_url || '/images/placeholder.webp'} alt={designer.name} className="w-full h-full object-cover" />
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
          <div className="flex items-center gap-8 mt-8 pt-8 border-t border-neutral-900">
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

            {/* Masonry Image Grid */}
            <div className="columns-2 sm:columns-3 lg:columns-4 gap-1 mb-12">
              {latestCollection.images?.map((img, i) => {
                const heights = ['h-64', 'h-80', 'h-96', 'h-72', 'h-56', 'h-88', 'h-64', 'h-72', 'h-80', 'h-56', 'h-72', 'h-64', 'h-96', 'h-72', 'h-64', 'h-80']
                return (
                  <div
                    key={i}
                    className={`break-inside-avoid mb-1 overflow-hidden cursor-pointer group relative ${heights[i % heights.length]}`}
                    onClick={() => setPreviewImage(img)}
                  >
                    <img
                      src={img}
                      alt={`${latestCollection.title} look ${i + 1}`}
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                      loading="lazy"
                    />
                    <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-all duration-300" />
                  </div>
                )
              })}
            </div>

            {/* Collection name + description */}
            <div className="flex flex-col sm:flex-row gap-6 sm:gap-12 pt-8 border-t border-neutral-900">
              <h3 className="text-2xl sm:text-3xl lg:text-4xl font-serif text-white leading-[0.95] tracking-tight shrink-0">
                {latestCollection.title}
              </h3>
              <div className="max-w-md">
                <p className="text-neutral-400 text-sm leading-relaxed mb-3">{latestCollection.description}</p>
                <p className="text-neutral-600 text-xs">
                  <span className="text-neutral-500">Inspiration:</span> {latestCollection.inspiration}
                </p>
                <p className="text-neutral-600 text-xs mt-1">{latestCollection.season} · {latestCollection.looks} looks</p>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* ===== PREVIOUS COLLECTIONS ===== */}
      {previousCollections.length > 0 && (
        <section className="py-16 lg:py-20 bg-black border-t border-neutral-900">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <p className="text-[#bb9457] text-[10px] uppercase tracking-[0.3em] mb-2">Archive</p>
            <h2 className="text-2xl lg:text-3xl font-serif text-white mb-8">Previous Collections</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {previousCollections.map(col => (
                <div key={col.id} className="group bg-neutral-950 border border-neutral-800 hover:border-[#bb9457]/30 transition-all duration-500 overflow-hidden">
                  <div className="relative h-52 overflow-hidden">
                    <img src={col.cover_image_url || '/images/placeholder.webp'} alt={col.title} className="w-full h-full object-cover opacity-70 group-hover:opacity-90 group-hover:scale-105 transition-all duration-700" loading="lazy" />
                    <div className="absolute inset-0 bg-gradient-to-t from-neutral-950 to-transparent" />
                  </div>
                  <div className="p-5">
                    <p className="text-neutral-600 text-[10px] uppercase tracking-[0.15em] mb-1">{col.season}</p>
                    <h3 className="text-white font-serif text-lg mb-2 group-hover:text-[#bb9457] transition-colors">{col.title}</h3>
                    <p className="text-neutral-400 text-xs leading-relaxed mb-3">{col.description}</p>
                    <div className="flex items-center justify-between">
                      <span className="text-neutral-600 text-[10px]">{col.looks} looks</span>
                      <span className="text-[#bb9457] text-xs tracking-wide opacity-0 group-hover:opacity-100 transition-all">View Collection →</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ===== ABOUT THE DESIGNER ===== */}
      <section className="py-20 lg:py-32 bg-black border-t border-neutral-900">
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
              {/* Brand Mark */}
              <div className="w-24 h-24 border border-neutral-800 rounded-full overflow-hidden bg-neutral-900 mb-12 flex items-center justify-center">
                <span className="text-white font-serif text-2xl tracking-wider">
                  {designer.name.split(' ').map(n => n[0]).join('').slice(0, 3).toUpperCase()}
                </span>
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
                <div className="mt-12 pt-8 border-t border-neutral-900">
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
            </div>
          </div>
        </div>
      </section>

      {/* ===== FOOTER ===== */}
      <section className="py-20 lg:py-32 bg-black border-t border-neutral-900">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-serif text-white leading-[0.95] tracking-tight mb-8">
            Where Visionaries Rise
          </h2>
          
          
        </div>
      </section>

      {/* ===== IMAGE PREVIEW MODAL ===== */}
      {previewImage && (
        <div className="fixed inset-0 z-[200] flex items-center justify-center bg-black/95 backdrop-blur-sm" onClick={() => setPreviewImage(null)}>
          <button className="absolute top-6 right-6 text-neutral-400 hover:text-white transition-colors" onClick={() => setPreviewImage(null)} aria-label="Close preview">
            <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M6 18L18 6M6 6l12 12" /></svg>
          </button>
          <img src={previewImage} alt="Collection preview" className="max-w-[90vw] max-h-[85vh] object-contain" onClick={e => e.stopPropagation()} />
        </div>
      )}
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
