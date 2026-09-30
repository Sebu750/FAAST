import { useState, useEffect, useMemo } from 'react'
import { Link } from 'react-router-dom'
import SEO from '../components/SEO'
import Breadcrumb from '../components/Breadcrumb'
import { supabase } from '../lib/supabase'
import type { Designer } from '../types/database'

// Helper to get optimized thumbnail URL from Supabase storage
const getThumbnailUrl = (url: string | null | undefined, width = 400, height = 533): string => {
  if (!url) return '/images/placeholder.webp'
  // If it's a Supabase storage URL, add transformation params
  if (url.includes('supabase.co/storage')) {
    // Extract bucket and path from URL
    const match = url.match(/\/storage\/v1\/object\/(?:public\/)?([^/]+)\/(.+)/)
    if (match) {
      const [, bucket, path] = match
      return `${supabase.storage.from(bucket).getPublicUrl(path.split('?')[0]).data.publicUrl}?width=${width}&height=${height}&resize=cover`
    }
  }
  return url
}

// ============================================
// DESIGNERS DIRECTORY — Minimal Editorial Grid
// ============================================
// Images only. Name appears on hover.
// Full details on the designer profile page.
// ============================================

const categories = ['All', 'Womenswear', 'Menswear', 'Bridal', 'Sustainable', 'Textile', 'Streetwear']

const DESIGNERS_PER_PAGE = 15

const DesignersDirectory = () => {
  const [designers, setDesigners] = useState<Designer[]>([])
  const [loading, setLoading] = useState(true)
  const [searchQuery, setSearchQuery] = useState('')
  const [category, setCategory] = useState('All')
  const [showFilters, setShowFilters] = useState(false)
  const [currentPage, setCurrentPage] = useState(1)

  // Fetch designers from Supabase - only needed columns
  useEffect(() => {
    const fetchDesigners = async () => {
      try {
        // Build query - handle case where priority column might not exist yet
        let query = supabase
          .from('designers')
          .select('id, name, brand, slug, image_url, specialization, category, location, is_active, is_featured, created_at')

        // Only filter by is_active if we want to hide inactive designers
        // For now, show all designers (including those with is_active = null)
        // query = query.eq('is_active', true)

        // Order by priority if column exists, fallback to created_at
        const { data, error } = await query.order('created_at', { ascending: false })

        if (error) {
          console.error('Error fetching designers:', error)
          // Fallback: try without priority column
          const { data: fallbackData, error: fallbackError } = await supabase
            .from('designers')
            .select('id, name, brand, slug, image_url, specialization, category, location')
            .order('created_at', { ascending: false })

          if (fallbackError) {
            console.error('Fallback error:', fallbackError)
            return
          }
          if (fallbackData) {
            setDesigners(fallbackData as Designer[])
          }
          return
        }

        if (data) {
          // Sort: featured first, then by priority (lower first, nulls last), then oldest first
          const sorted = data.sort((a, b) => {
            const featA = a.is_featured ? 0 : 1
            const featB = b.is_featured ? 0 : 1
            if (featA !== featB) return featA - featB
            const priorityA = (a as any).priority ?? 999999
            const priorityB = (b as any).priority ?? 999999
            if (priorityA !== priorityB) return priorityA - priorityB
            return new Date(a.created_at).getTime() - new Date(b.created_at).getTime()
          })
          setDesigners(sorted as Designer[])
        }
      } catch (err) {
        console.error('Error fetching designers:', err)
      } finally {
        setLoading(false)
      }
    }

    fetchDesigners()
  }, [])

  const filteredDesigners = useMemo(() => {
    let result = [...designers]
    if (searchQuery) {
      const q = searchQuery.toLowerCase()
      result = result.filter(d =>
        d.name.toLowerCase().includes(q) ||
        d.brand.toLowerCase().includes(q) ||
        (d.specialization?.toLowerCase().includes(q) ?? false) ||
        (d.location?.toLowerCase().includes(q) ?? false)
      )
    }
    if (category !== 'All') result = result.filter(d => d.category === category)
    return result
  }, [designers, searchQuery, category])

  const totalPages = Math.ceil(filteredDesigners.length / DESIGNERS_PER_PAGE)
  const paginatedDesigners = filteredDesigners.slice(
    (currentPage - 1) * DESIGNERS_PER_PAGE,
    currentPage * DESIGNERS_PER_PAGE
  )

  const clearFilters = () => {
    setCategory('All')
    setSearchQuery('')
    setCurrentPage(1)
  }

  const handleFilterChange = (newCategory: string) => {
    setCategory(newCategory)
    setCurrentPage(1)
  }

  return (
    <>
      <SEO 
        title="Designers Directory — Adorzia | Pakistan's Emerging Fashion Designers" 
        description="Discover and connect with Pakistan's most visionary emerging fashion designers. Browse curated profiles, collections, and stories from Lahore, Karachi, and Islamabad. Find independent designers specializing in pret, bridal, textiles, and heritage crafts." 
        canonicalURL="https://adorzia.com/designers"
        ogTitle="Designers Directory — Adorzia | Pakistani Fashion Talent"
        ogDescription="Discover Pakistan's most promising emerging fashion designers. Curated profiles, collections, and stories from the heart of Pakistani fashion."
        ogImageAlt="Adorzia Designers Directory - Pakistani Fashion Designers"
        schemaType="CollectionPage"
        schema={{
          "@context": "https://schema.org",
          "@type": "CollectionPage",
          "name": "Adorzia Designers Directory",
          "description": "Discover and connect with Pakistan's most visionary emerging fashion designers. Browse curated profiles, collections, and stories.",
          "url": "https://adorzia.com/designers",
          "isPartOf": {
            "@type": "WebSite",
            "name": "Adorzia",
            "url": "https://adorzia.com"
          },
          "mainEntity": {
            "@type": "ItemList",
            "name": "Pakistani Fashion Designers",
            "description": "A curated directory of Pakistan's emerging and established fashion designers"
          }
        }}
        keywords="Pakistani fashion designers, Emerging designers Pakistan, Fashion designers Lahore, Fashion designers Karachi, Fashion designers Islamabad, Pakistani fashion brands, Independent fashion designers, Heritage craft designers, Pakistani clothing designers, Contemporary Pakistani fashion, Adorzia designers, Pakistani fashion directory, pret designers, bridal designers Pakistan, textile designers"
      />
      <Breadcrumb currentPage="Designers" />

      {/* ===== HEADER ===== */}
      <section className="relative pt-28 pb-16 lg:pt-36 lg:pb-20 bg-gradient-to-b from-neutral-950 via-black to-neutral-950 overflow-hidden">
        {/* Animated background elements */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-0 left-1/4 w-96 h-96 bg-[#bb9457]/5 rounded-full blur-3xl animate-pulse" />
          <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-[#bb9457]/5 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '2s' }} />
        </div>
        <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-[#bb9457]/30 to-transparent" />
        
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="inline-flex items-center gap-3 mb-8 px-5 py-2 rounded-full glass">
            <span className="w-2 h-2 bg-[#bb9457] rounded-full animate-pulse" />
            <span className="font-mono text-[10px] uppercase tracking-[0.3em] text-[#bb9457] font-bold">The Directory</span>
          </div>
          <h1 className="text-5xl sm:text-6xl lg:text-7xl xl:text-8xl font-serif text-white leading-[0.9] tracking-tight mb-6">
            Discover the <span className="text-gradient italic font-light">visionaries.</span>
          </h1>
          <p className="text-lg text-neutral-400 max-w-2xl mx-auto leading-relaxed font-light">
            Explore Pakistan's most promising emerging fashion designers and their groundbreaking collections.
          </p>
        </div>
      </section>

      {/* ===== FILTER + SEARCH BAR ===== */}
      <section className="bg-neutral-950/80 backdrop-blur-xl sticky top-[60px] z-30 border-b border-neutral-800/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-5">
          <div className="flex items-center justify-between gap-4">
            {/* Filter */}
            <div className="flex items-center gap-3">
              <button
                onClick={() => setShowFilters(!showFilters)}
                className="flex items-center gap-2 px-5 py-2.5 rounded-full glass text-sm text-neutral-300 hover:text-white hover:border-[#bb9457]/50 transition-all duration-300"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z" /></svg>
                Filter
                {category !== 'All' && (
                  <span className="w-1.5 h-1.5 bg-[#bb9457] rounded-full" />
                )}
              </button>
              {category !== 'All' && (
                <span className="text-xs text-[#bb9457] font-semibold uppercase tracking-wider">{category}</span>
              )}
            </div>

            {/* Search */}
            <div className="relative flex-1 max-w-xs sm:max-w-sm ml-auto">
              <input
                type="text"
                value={searchQuery}
                onChange={e => setSearchQuery(e.target.value)}
                placeholder="Search designers..."
                className="w-full bg-black/50 backdrop-blur-xl border border-white/10 rounded-full text-white text-sm placeholder:text-neutral-500 focus:outline-none focus:ring-2 focus:ring-[#bb9457]/50 focus:border-[#bb9457]/50 px-5 py-2.5 transition-all duration-300"
              />
              <svg className="absolute right-4 top-1/2 -translate-y-1/2 w-4 h-4 text-neutral-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" /></svg>
            </div>
          </div>

          {/* Category filter row */}
          {showFilters && (
            <div className="mt-5 pt-5 flex flex-wrap gap-2">
              {categories.map(c => (
                <button
                  key={c}
                  onClick={() => handleFilterChange(c)}
                  className={`px-5 py-2 text-xs uppercase tracking-wider font-semibold rounded-full transition-all duration-300 ${
                    category === c
                      ? 'bg-gradient-to-r from-[#bb9457] to-[#d4af37] text-black shadow-lg shadow-[#bb9457]/20'
                      : 'text-neutral-400 hover:text-white border border-neutral-700 hover:border-[#bb9457]/50'
                  }`}
                >
                  {c}
                </button>
              ))}
              {category !== 'All' && (
                <button onClick={clearFilters} className="px-5 py-2 text-xs text-neutral-500 hover:text-white transition-colors uppercase tracking-wider">
                  Clear All
                </button>
              )}
            </div>
          )}
        </div>
      </section>

      {/* ===== DESIGNERS GRID ===== */}
      <section className="relative bg-gradient-to-b from-neutral-950 via-black to-neutral-950 min-h-screen overflow-hidden">
        {/* Background accents */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-1/3 right-0 w-96 h-96 bg-[#bb9457]/3 rounded-full blur-3xl" />
          <div className="absolute bottom-1/3 left-0 w-96 h-96 bg-[#bb9457]/3 rounded-full blur-3xl" />
        </div>
        
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          {loading ? (
            <div className="text-center py-32">
              <div className="inline-block w-10 h-10 border-2 border-neutral-800 border-t-[#bb9457] rounded-full animate-spin" />
            </div>
          ) : filteredDesigners.length === 0 ? (
            <div className="text-center py-32">
              <p className="text-neutral-500 text-base mb-6">No designers found</p>
              <button onClick={clearFilters} className="px-6 py-3 text-xs text-[#bb9457] hover:text-white border border-[#bb9457]/30 hover:border-[#bb9457] rounded-full transition-all duration-300 uppercase tracking-wider font-semibold">
                Clear filters
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {paginatedDesigners.map((d, idx) => (
                <Link
                  key={d.id}
                  to={`/designers/${d.slug}`}
                  className="group relative block overflow-hidden bg-neutral-900 aspect-[3/4] rounded-lg border border-neutral-800 hover:border-[#bb9457]/50 transition-all duration-700 hover-lift"
                  style={{ animationDelay: `${idx * 50}ms` }}
                >
                  <img
                    src={getThumbnailUrl(d.image_url)}
                    alt={d.name}
                    className="w-full h-full object-cover transition-all duration-700 group-hover:scale-110"
                    loading="lazy"
                    decoding="async"
                  />
                  {/* Gradient overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent opacity-60 group-hover:opacity-90 transition-all duration-500" />
                  {/* Radial gold glow on hover */}
                  <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(187,148,87,0),rgba(187,148,87,0.2))] opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
                  
                  {/* Content overlay */}
                  <div className="absolute bottom-0 left-0 right-0 p-6 translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
                    <div className="w-12 h-0.5 bg-[#bb9457] mb-4 scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left" />
                    <p className="text-sm uppercase tracking-[0.2em] font-bold text-white mb-1">{d.name}</p>
                    <p className="text-xs text-neutral-300 font-light">{d.specialization}</p>
                    {d.location && (
                      <div className="flex items-center gap-1 mt-2">
                        <svg className="w-3 h-3 text-[#bb9457]/70" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z" /></svg>
                        <span className="text-[10px] text-neutral-400 font-light tracking-wide">{d.location}</span>
                      </div>
                    )}
                  </div>
                  
                  {/* Arrow button */}
                  <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                    <div className="w-10 h-10 rounded-full glass flex items-center justify-center">
                      <span className="text-[#bb9457] text-lg">→</span>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          )}

          {/* ===== PAGINATION ===== */}
          {totalPages > 1 && (
            <div className="mt-20 pt-12 border-t border-neutral-800/50 flex items-center justify-center gap-3">
              <button
                onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
                disabled={currentPage === 1}
                className="px-6 py-3 border border-neutral-700 text-xs text-neutral-400 hover:text-white hover:border-[#bb9457]/50 rounded-full disabled:opacity-30 disabled:cursor-not-allowed transition-all duration-300 uppercase tracking-wider font-semibold"
              >
                ← Prev
              </button>
              {Array.from({ length: totalPages }, (_, i) => i + 1).map(page => (
                <button
                  key={page}
                  onClick={() => setCurrentPage(page)}
                  className={`w-11 h-11 flex items-center justify-center text-xs font-bold rounded-full transition-all duration-300 ${
                    page === currentPage
                      ? 'bg-gradient-to-r from-[#bb9457] to-[#d4af37] text-black shadow-lg shadow-[#bb9457]/20'
                      : 'border border-neutral-700 text-neutral-400 hover:text-white hover:border-[#bb9457]/50'
                  }`}
                >
                  {page}
                </button>
              ))}
              <button
                onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
                disabled={currentPage === totalPages}
                className="px-6 py-3 border border-neutral-700 text-xs text-neutral-400 hover:text-white hover:border-[#bb9457]/50 rounded-full disabled:opacity-30 disabled:cursor-not-allowed transition-all duration-300 uppercase tracking-wider font-semibold"
              >
                Next →
              </button>
            </div>
          )}
        </div>
      </section>
    </>
  )
}

export default DesignersDirectory
