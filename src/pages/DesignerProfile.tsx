import { useParams, Link, useNavigate } from 'react-router-dom'
import { useEffect, useState } from 'react'
import SEO from '../components/SEO'
import { supabase } from '../lib/supabase'
import type { DesignerProfile, DesignerFilm } from '../types/database'
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

// Extract YouTube embed URL from various formats
const getYouTubeEmbedUrl = (url: string): string => {
  // Handle youtu.be/ID
  const shortMatch = url.match(/youtu\.be\/([^?&]+)/)
  if (shortMatch) return `https://www.youtube.com/embed/${shortMatch[1]}`
  // Handle watch?v=ID
  const longMatch = url.match(/[?&]v=([^&]+)/)
  if (longMatch) return `https://www.youtube.com/embed/${longMatch[1]}`
  // Already an embed URL
  if (url.includes('/embed/')) return url
  return url
}

// ============================================
// DESIGNER PROFILE
// ============================================
// Clean editorial portfolio:
// 1. Header — banner, name, short bio, socials, photo
// 2. Latest Collection — moodboard grid
// 3. Previous Collections — compact cards
// 4. About Me — 2 paragraphs, location, university, year
// 5. Films — YouTube embeds
// ============================================

const DesignerProfile = () => {
  const { slug } = useParams<{ slug: string }>()
  const navigate = useNavigate()
  const [designer, setDesigner] = useState<DesignerProfile | null>(null)
  const [loading, setLoading] = useState(true)
  const [previewImage, setPreviewImage] = useState<string | null>(null)
  const [viewCollection, setViewCollection] = useState<string | null>(null)

  useEffect(() => { window.scrollTo(0, 0) }, [slug])

  useEffect(() => {
    const fetchDesigner = async () => {
      if (!slug) return
      try {
        setLoading(true)
        const { data: designerData, error: designerError } = await supabase
          .from('designers')
          .select('id, name, brand, slug, location, nationality, bio, short_bio, image_url, cover_image_url, is_featured, is_active, status, created_at, updated_at')
          .eq('slug', slug)
          .eq('is_active', true)
          .single()

        if (designerError || !designerData) {
          setDesigner(null)
          setLoading(false)
          return
        }

        const [collectionsRes, educationRes, socialRes, filmsRes] = await Promise.all([
          supabase.from('designer_collections').select('*').eq('designer_id', designerData.id).order('created_at', { ascending: false }),
          supabase.from('designer_education').select('*').eq('designer_id', designerData.id).order('year', { ascending: false }),
          supabase.from('designer_social_links').select('*').eq('designer_id', designerData.id).single(),
          supabase.from('designer_films').select('*').eq('designer_id', designerData.id).order('display_order', { ascending: true }),
        ])

        const fullDesigner: DesignerProfile = {
          ...(designerData as any),
          collections: collectionsRes.data || [],
          education: educationRes.data || [],
          achievements: [],
          skills: [],
          certifications: [],
          social_links: socialRes.data || null,
          films: filmsRes.data || [],
        }
        setDesigner(fullDesigner)
      } catch {
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
          <Link to="/designers" className="text-[#bb9457] text-sm hover:text-white transition-colors">&larr; Back to Directory</Link>
        </div>
      </div>
    )
  }

  const latestCollection = designer.collections.find(c => c.is_latest) || designer.collections[0]
  const previousCollections = designer.collections.filter(c => c.id !== latestCollection?.id)

  // Split bio into max 2 paragraphs
  const bioParagraphs = designer.bio
    ? designer.bio.split(/\n\n+/).filter(Boolean).slice(0, 2)
    : []

  return (
    <>
      <SEO
        title={`${designer.name} — Adorzia`}
        description={designer.short_bio || `Discover ${designer.name}, a Pakistani fashion designer on Adorzia.`}
        canonicalURL={`https://adorzia.com/designers/${designer.slug}`}
        ogTitle={`${designer.name} — Adorzia`}
        ogDescription={designer.short_bio || `Discover ${designer.name} on Adorzia.`}
        ogImage={designer.cover_image_url || designer.image_url || 'https://adorzia.com/og-image.jpeg'}
        ogImageAlt={designer.name}
        schemaType="Person"
        schema={{
          "@context": "https://schema.org",
          "@type": "Person",
          "name": designer.name,
          "jobTitle": "Fashion Designer",
          "description": designer.short_bio,
          "url": `https://adorzia.com/designers/${designer.slug}`,
          "image": designer.image_url,
        }}
        keywords={`${designer.name}, Pakistani fashion designer, ${designer.location || 'Pakistan'}, Adorzia designer`}
      />

      {/* ===== 1. PROFILE HEADER ===== */}
      <section className="relative">
        {/* Background Banner */}
        <div className="relative h-[45vh] lg:h-[55vh] overflow-hidden">
          <img
            src={getOptimizedUrl(designer.cover_image_url, 1600, 900)}
            alt={designer.name}
            className="absolute inset-0 w-full h-full object-cover"
            decoding="async"
            fetchPriority="high"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black via-black/30 to-transparent" />
          <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-[#bb9457]/30 to-transparent" />
          {/* Back button */}
          <div className="absolute top-24 sm:top-28 left-4 sm:left-6 lg:left-8 z-10">
            <button onClick={() => navigate('/designers')} className="group flex items-center gap-2 px-4 py-2 rounded-full glass text-neutral-300 text-xs hover:text-white hover:border-[#bb9457]/50 transition-all duration-300">
              <svg className="w-3 h-3 transform group-hover:-translate-x-0.5 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" /></svg>
              All Designers
            </button>
          </div>
        </div>

        {/* Header Content */}
        <div className="relative bg-black border-b border-neutral-800/50">
          <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-14">
            <div className="flex flex-col sm:flex-row items-center sm:items-end gap-6 sm:gap-8">
              {/* Profile Picture */}
              <div className="shrink-0 -mt-16 sm:-mt-20">
                <div className="w-28 h-28 sm:w-36 sm:h-36 border-4 border-black rounded-full overflow-hidden bg-neutral-900 shadow-2xl">
                  <img src={getOptimizedUrl(designer.image_url, 300, 300)} alt={designer.name} className="w-full h-full object-cover" decoding="async" />
                </div>
              </div>
              {/* Name + Bio + Socials */}
              <div className="flex-1 text-center sm:text-left min-w-0">
                <h1 className="text-3xl sm:text-4xl lg:text-5xl font-serif text-white leading-[0.95] tracking-tight mb-3">
                  {designer.name}
                </h1>
                {designer.short_bio && (
                  <p className="text-neutral-400 text-sm sm:text-base leading-relaxed max-w-xl mb-4">{designer.short_bio}</p>
                )}
                {/* Social Links */}
                <div className="flex items-center justify-center sm:justify-start gap-2.5 flex-wrap">
                  {designer.social_links?.instagram && <SocialLink href={designer.social_links.instagram.startsWith('http') ? designer.social_links.instagram : `https://instagram.com/${designer.social_links.instagram.replace('@', '')}`} label="Instagram"><InstagramIcon /></SocialLink>}
                  {designer.social_links?.facebook && <SocialLink href={designer.social_links.facebook.startsWith('http') ? designer.social_links.facebook : `https://facebook.com/${designer.social_links.facebook}`} label="Facebook"><FacebookIcon /></SocialLink>}
                  {designer.social_links?.tiktok && <SocialLink href={designer.social_links.tiktok.startsWith('http') ? designer.social_links.tiktok : `https://tiktok.com/${designer.social_links.tiktok.replace('@', '')}`} label="TikTok"><TiktokIcon /></SocialLink>}
                  {designer.social_links?.pinterest && <SocialLink href={designer.social_links.pinterest.startsWith('http') ? designer.social_links.pinterest : `https://pinterest.com/${designer.social_links.pinterest}`} label="Pinterest"><PinterestIcon /></SocialLink>}
                  {designer.social_links?.linkedin && <SocialLink href={designer.social_links.linkedin.startsWith('http') ? designer.social_links.linkedin : `https://linkedin.com/in/${designer.social_links.linkedin}`} label="LinkedIn"><LinkedinIcon /></SocialLink>}
                  {designer.social_links?.website && <SocialLink href={designer.social_links.website.startsWith('http') ? designer.social_links.website : `https://${designer.social_links.website}`} label="Website"><WebsiteIcon /></SocialLink>}
                  {designer.social_links?.email && <SocialLink href={`mailto:${designer.social_links.email}`} label="Email"><EmailIcon /></SocialLink>}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ===== 2. LATEST COLLECTION — MOODBOARD ===== */}
      {latestCollection && (
        <section className="relative py-16 sm:py-20 lg:py-24 bg-gradient-to-b from-black via-neutral-950 to-black overflow-hidden">
          <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            {/* Section Label */}
            <div className="mb-8 sm:mb-12">
              <div className="inline-flex items-center gap-3 mb-4 px-4 py-2 rounded-full glass">
                <span className="w-2 h-2 bg-[#bb9457] rounded-full animate-pulse" />
                <span className="text-[10px] uppercase tracking-[0.3em] text-[#bb9457] font-mono font-bold">Latest Collection</span>
              </div>
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-serif text-white leading-[0.9] tracking-tight">
                {latestCollection.title}
              </h2>
              {latestCollection.season && (
                <p className="text-neutral-500 text-xs uppercase tracking-[0.2em] mt-3">{latestCollection.season}</p>
              )}
            </div>

            {/* Moodboard Grid */}
            {latestCollection.images && latestCollection.images.length > 0 ? (
              <div className="mb-10">
                {/* Hero Image */}
                <div className="mb-2 overflow-hidden cursor-pointer group relative h-[60vh] min-h-[400px] max-h-[700px]">
                  <img
                    src={getOptimizedUrl(latestCollection.images[0], 1200, 1500)}
                    alt={`${latestCollection.title} hero`}
                    className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-[1.02]"
                    onClick={() => setPreviewImage(latestCollection.images?.[0] ?? null)}
                    decoding="async"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent" />
                  <div className="absolute bottom-4 left-4 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                    <span className="text-white/80 text-xs uppercase tracking-[0.2em] bg-black/40 backdrop-blur-sm px-3 py-1.5">Look 01</span>
                  </div>
                </div>

                {/* Supporting Grid — asymmetric moodboard */}
                {latestCollection.images.length > 1 && (
                  <div className="grid grid-cols-12 gap-1.5">
                    {latestCollection.images.slice(1).map((img, i) => {
                      const patterns = [
                        'col-span-5 row-span-2 h-[400px]',
                        'col-span-4 row-span-1 h-[195px]',
                        'col-span-3 row-span-1 h-[195px]',
                        'col-span-4 row-span-1 h-[195px]',
                        'col-span-3 row-span-2 h-[400px]',
                        'col-span-6 row-span-1 h-[260px]',
                        'col-span-3 row-span-1 h-[260px]',
                        'col-span-3 row-span-1 h-[260px]',
                        'col-span-4 row-span-1 h-[300px]',
                        'col-span-4 row-span-2 h-[610px]',
                        'col-span-4 row-span-1 h-[300px]',
                        'col-span-4 row-span-1 h-[300px]',
                        'col-span-4 row-span-1 h-[300px]',
                        'col-span-6 row-span-1 h-[320px]',
                        'col-span-3 row-span-1 h-[320px]',
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
              <div className="mb-8 p-8 border border-neutral-800 bg-neutral-950/50 text-center">
                <p className="text-neutral-600 text-sm">Collection images coming soon</p>
              </div>
            )}

            {/* Short description — ~50 chars visible */}
            <p className="text-neutral-400 text-sm leading-relaxed max-w-lg line-clamp-2">
              {latestCollection.description}
            </p>
          </div>
        </section>
      )}

      {/* ===== 3. PREVIOUS COLLECTIONS ===== */}
      {previousCollections.length > 0 && (
        <section className="relative py-16 sm:py-20 lg:py-24 border-t border-neutral-800/50 bg-black overflow-hidden">
          {/* Animated background orbs */}
          <div className="absolute inset-0 overflow-hidden pointer-events-none">
            <div className="absolute top-1/4 right-0 w-96 h-96 bg-[#bb9457]/3 rounded-full blur-3xl animate-pulse" />
            <div className="absolute bottom-1/4 left-0 w-96 h-96 bg-[#bb9457]/3 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '2s' }} />
          </div>

          <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            {/* Section Header */}
            <div className="mb-12 sm:mb-16 text-center">
              <div className="inline-flex items-center gap-3 mb-5 px-5 py-2 rounded-full glass">
                <span className="w-2 h-2 bg-[#bb9457] rounded-full animate-pulse" />
                <span className="text-[10px] uppercase tracking-[0.3em] text-[#bb9457] font-mono font-bold">The Archive</span>
              </div>
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-serif text-white leading-[0.9] tracking-tight">
                Previous <span className="text-gradient italic font-light">Collections</span>
              </h2>
              <p className="mt-4 text-neutral-500 text-sm font-light max-w-lg mx-auto">
                A curated journey through past seasons and creative explorations
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {previousCollections.map((col, idx) => (
                <div
                  key={col.id}
                  onClick={() => setViewCollection(col.id)}
                  className="group relative overflow-hidden cursor-pointer bg-neutral-950 rounded-2xl border border-neutral-800 hover:border-[#bb9457]/50 transition-all duration-700 hover:shadow-2xl hover:shadow-[#bb9457]/5 hover:-translate-y-1 opacity-0 animate-[fadeInUp_0.6s_ease_forwards]"
                  style={{ animationDelay: `${idx * 0.12}s` }}
                >
                  {/* Cover Image */}
                  <div className="relative h-64 overflow-hidden">
                    <img
                      src={getOptimizedUrl(col.cover_image_url, 600, 400)}
                      alt={col.title}
                      className="w-full h-full object-cover opacity-70 group-hover:opacity-100 group-hover:scale-105 transition-all duration-700"
                      loading="lazy"
                      decoding="async"
                    />
                    {/* Gradient overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent" />
                    {/* Radial gold glow on hover */}
                    <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(187,148,87,0),rgba(187,148,87,0.12))] opacity-0 group-hover:opacity-100 transition-opacity duration-700" />

                    {/* Floating arrow button */}
                    <div className="absolute top-4 right-4 w-10 h-10 rounded-full glass flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-500 transform translate-y-2 group-hover:translate-y-0">
                      <svg className="w-4 h-4 text-[#bb9457]" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17 8l4 4m0 0l-4 4m4-4H3" /></svg>
                    </div>

                    {/* Title overlay */}
                    <div className="absolute bottom-0 left-0 right-0 p-5">
                      <h3 className="text-white font-serif text-xl leading-tight group-hover:text-[#bb9457] transition-colors duration-500">
                        {col.title}
                      </h3>
                    </div>
                  </div>

                  {/* Content */}
                  <div className="p-5 pt-4">
                    {/* Description */}
                    <p className="text-neutral-500 text-xs leading-relaxed line-clamp-2 group-hover:text-neutral-400 transition-colors duration-500">
                      {col.description}
                    </p>
                    {/* Animated gold underline + CTA */}
                    <div className="relative mt-4 pt-3 border-t border-neutral-800/50 group-hover:border-transparent transition-all duration-500">
                      <div className="absolute top-0 left-0 h-px w-0 bg-gradient-to-r from-[#bb9457] to-[#d4af37] group-hover:w-full transition-all duration-700 ease-out" />
                      <div className="flex items-center justify-between">
                        <span className="text-neutral-600 text-[10px] uppercase tracking-wider font-semibold group-hover:text-[#bb9457] transition-colors duration-500">View Collection</span>
                        <span className="text-[#bb9457] text-sm group-hover:translate-x-1.5 transition-transform duration-500">&rarr;</span>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* CSS keyframe for fade-in-up animation */}
          <style>{`
            @keyframes fadeInUp {
              from { opacity: 0; transform: translateY(20px); }
              to { opacity: 1; transform: translateY(0); }
            }
          `}</style>
        </section>
      )}

      {/* ===== 4. ABOUT ME ===== */}
      <section className="relative py-16 sm:py-20 lg:py-24 border-t border-neutral-800/50 bg-gradient-to-b from-black to-neutral-950 overflow-hidden">
        <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-10">
            <div className="inline-flex items-center gap-3 mb-4 px-4 py-2 rounded-full glass">
              <span className="w-2 h-2 bg-[#bb9457] rounded-full" />
              <span className="text-[10px] uppercase tracking-[0.3em] text-[#bb9457] font-mono font-bold">About</span>
            </div>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-serif text-white leading-[0.9] tracking-tight">
              About <span className="text-gradient italic font-light">Me</span>
            </h2>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16">
            {/* Bio — 2 paragraphs */}
            <div className="lg:col-span-8 space-y-5">
              {bioParagraphs.length > 0 ? (
                bioParagraphs.map((p, i) => (
                  <p key={i} className="text-neutral-400 text-base leading-[1.8]">{p}</p>
                ))
              ) : designer.bio ? (
                <p className="text-neutral-400 text-base leading-[1.8]">{designer.bio}</p>
              ) : (
                <p className="text-neutral-600 text-base italic">Biography coming soon.</p>
              )}
            </div>

            {/* Quick Info */}
            <div className="lg:col-span-4">
              <div className="space-y-6 p-6 rounded-xl bg-neutral-900/40 border border-neutral-800/60">
                {designer.location && (
                  <div>
                    <p className="text-[10px] uppercase tracking-[0.3em] text-neutral-600 mb-1.5">Location</p>
                    <p className="text-neutral-300 text-sm">{designer.location}</p>
                  </div>
                )}
                {designer.education.length > 0 && (
                  <>
                    <div>
                      <p className="text-[10px] uppercase tracking-[0.3em] text-neutral-600 mb-1.5">University</p>
                      <p className="text-neutral-300 text-sm">{designer.education[0].institution}</p>
                      {designer.education[0].degree && (
                        <p className="text-neutral-500 text-xs mt-0.5">{designer.education[0].degree}</p>
                      )}
                    </div>
                    {designer.education[0].year && (
                      <div>
                        <p className="text-[10px] uppercase tracking-[0.3em] text-neutral-600 mb-1.5">Graduation Year</p>
                        <p className="text-neutral-300 text-sm">{designer.education[0].year}</p>
                      </div>
                    )}
                  </>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ===== 5. FILMS — YouTube Embeds ===== */}
      {designer.films && designer.films.length > 0 && (
        <section className="relative py-16 sm:py-20 lg:py-24 border-t border-neutral-800/50 bg-black overflow-hidden">
          <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="mb-10">
              <div className="inline-flex items-center gap-3 mb-4 px-4 py-2 rounded-full glass">
                <span className="w-2 h-2 bg-[#bb9457] rounded-full" />
                <span className="text-[10px] uppercase tracking-[0.3em] text-[#bb9457] font-mono font-bold">Films</span>
              </div>
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-serif text-white leading-[0.9] tracking-tight">
                Collection <span className="text-gradient italic font-light">Films</span>
              </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {designer.films.map((film: DesignerFilm) => (
                <div key={film.id} className="group">
                  <div className="aspect-video rounded-lg overflow-hidden bg-neutral-950 border border-neutral-800 hover:border-[#bb9457]/50 transition-all duration-500">
                    <iframe
                      src={getYouTubeEmbedUrl(film.youtube_url)}
                      className="w-full h-full"
                      frameBorder="0"
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                      allowFullScreen
                      title={film.title}
                      loading="lazy"
                    />
                  </div>
                  <div className="mt-3">
                    <h3 className="text-white font-serif text-lg group-hover:text-[#bb9457] transition-colors duration-300">
                      {film.title}
                    </h3>
                    {film.description && (
                      <p className="text-neutral-500 text-xs mt-1 leading-relaxed line-clamp-2">{film.description}</p>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ===== FOOTER NAV ===== */}
      <section className="border-t border-neutral-800/50 bg-black py-10">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <Link to="/designers" className="group inline-flex items-center gap-2 px-5 py-2.5 rounded-full border border-white/20 hover:border-[#bb9457]/50 text-neutral-400 hover:text-white transition-all duration-300">
            <span className="text-lg transform group-hover:-translate-x-1 transition-transform duration-300">&larr;</span>
            <span className="text-xs font-semibold">Back to Designers</span>
          </Link>
          <div className="flex items-center gap-3 text-neutral-600 font-light text-xs">
            <span>{designer.location}</span>
          </div>
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

      {/* ===== COLLECTION VIEW MODAL ===== */}
      {viewCollection && (() => {
        const col = previousCollections.find(c => c.id === viewCollection)
        if (!col) return null
        return (
          <div className="fixed inset-0 z-[60] bg-black overflow-y-auto" onClick={() => setViewCollection(null)}>
            {/* Close button */}
            <button onClick={() => setViewCollection(null)} className="fixed top-6 right-6 z-50 w-12 h-12 rounded-full glass flex items-center justify-center text-neutral-400 hover:text-white hover:border-[#bb9457]/50 transition-all duration-300">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M6 18L18 6M6 6l12 12" /></svg>
            </button>

            {/* Hero */}
            <div className="relative h-[55vh] sm:h-[60vh] overflow-hidden" onClick={e => e.stopPropagation()}>
              <img src={getOptimizedUrl(col.cover_image_url, 1400, 900)} alt={col.title} className="w-full h-full object-cover opacity-70" decoding="async" />
              <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-black/20" />
              {/* Gold accent line */}
              <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-[#bb9457]/40 to-transparent" />
              <div className="absolute bottom-0 left-0 right-0 p-8 lg:p-14">
                <div className="max-w-5xl mx-auto">
                  <h2 className="text-white font-serif text-4xl sm:text-5xl lg:text-6xl leading-[0.95] tracking-tight">
                    {col.title}
                  </h2>
                </div>
              </div>
            </div>

            {/* Content */}
            <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-14" onClick={e => e.stopPropagation()}>
              {/* Description */}
              {col.description && (
                <div className="mb-14 max-w-3xl">
                  <div className="relative pl-6 border-l-2 border-[#bb9457]/30">
                    <p className="text-neutral-300 text-base sm:text-lg leading-[1.9] font-light">{col.description}</p>
                  </div>
                </div>
              )}

              {/* Images Grid */}
              {col.images && col.images.length > 0 ? (
                <div>
                  <div className="flex items-center gap-4 mb-8">
                    <div className="h-px flex-1 bg-gradient-to-r from-[#bb9457]/30 to-transparent" />
                    <p className="text-[10px] uppercase tracking-[0.3em] text-[#bb9457] font-mono font-bold">The Collection</p>
                    <div className="h-px flex-1 bg-gradient-to-l from-[#bb9457]/30 to-transparent" />
                  </div>
                  <div className="columns-2 sm:columns-3 lg:columns-4 gap-3">
                    {col.images.map((img, i) => {
                      const heights = ['h-72', 'h-80', 'h-96', 'h-80', 'h-64']
                      return (
                        <div
                          key={i}
                          className={`break-inside-avoid mb-3 overflow-hidden cursor-pointer group relative rounded-lg border border-neutral-800 hover:border-[#bb9457]/50 transition-all duration-700 ${heights[i % heights.length]}`}
                          onClick={() => setPreviewImage(img)}
                        >
                          <img
                            src={getOptimizedUrl(img, 600, 800)}
                            alt={`${col.title} look ${i + 1}`}
                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                            loading="lazy"
                            decoding="async"
                          />
                          {/* Hover overlay */}
                          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                          {/* Radial gold glow */}
                          <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(187,148,87,0),rgba(187,148,87,0.1))] opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
                          {/* Look number */}
                          <div className="absolute bottom-3 left-3 opacity-0 group-hover:opacity-100 transition-all duration-500 transform translate-y-2 group-hover:translate-y-0">
                            <span className="text-[#bb9457] text-[10px] uppercase tracking-[0.2em] font-mono font-semibold bg-black/50 backdrop-blur-sm px-2.5 py-1 rounded-full">
                              Look {String(i + 1).padStart(2, '0')}
                            </span>
                          </div>
                        </div>
                      )
                    })}
                  </div>
                </div>
              ) : (
                <div className="text-center py-16 rounded-2xl border border-neutral-800/50 bg-neutral-950/30">
                  <svg className="w-10 h-10 text-neutral-700 mx-auto mb-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" /></svg>
                  <p className="text-neutral-600 text-sm">No images available for this collection</p>
                </div>
              )}

              {/* Back button */}
              <div className="mt-14 pt-8 border-t border-neutral-800/50">
                <button onClick={() => setViewCollection(null)} className="group inline-flex items-center gap-3 px-6 py-3 rounded-full glass text-neutral-400 hover:text-white hover:border-[#bb9457]/50 transition-all duration-300">
                  <svg className="w-4 h-4 transition-transform group-hover:-translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M10 19l-7-7m0 0l7-7m-7 7h18" /></svg>
                  <span className="text-xs font-semibold uppercase tracking-wider">Back to Profile</span>
                </button>
              </div>
            </div>
          </div>
        )
      })()}
    </>
  )
}

// ── Helper Components ──

const SocialLink = ({ href, label, children }: { href: string; label: string; children: React.ReactNode }) => (
  <a href={href} target="_blank" rel="noopener noreferrer" className="w-9 h-9 rounded-full glass flex items-center justify-center text-neutral-400 hover:text-[#bb9457] hover:border-[#bb9457]/50 transition-all duration-300" aria-label={label}>
    {children}
  </a>
)

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
