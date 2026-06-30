import { useState, useEffect, useMemo } from 'react'
import { Link } from 'react-router-dom'
import SEO from '../components/SEO'
import { supabase } from '../lib/supabase'
import type { Designer } from '../types/database'

// ============================================
// DESIGNERS DIRECTORY — Minimal Editorial Grid
// ============================================
// Images only. Name appears on hover.
// Full details on the designer profile page.
// ============================================

const categories = ['All', 'Womenswear', 'Menswear', 'Bridal', 'Sustainable', 'Textile', 'Streetwear']

const DESIGNERS_PER_PAGE = 6

const DesignersDirectory = () => {
  const [designers, setDesigners] = useState<Designer[]>([])
  const [loading, setLoading] = useState(true)
  const [searchQuery, setSearchQuery] = useState('')
  const [category, setCategory] = useState('All')
  const [showFilters, setShowFilters] = useState(false)
  const [currentPage, setCurrentPage] = useState(1)

  // Fetch designers from Supabase
  useEffect(() => {
    const fetchDesigners = async () => {
      try {
        const { data, error } = await supabase
          .from('designers')
          .select('*')
          .eq('is_active', true)
          .order('created_at', { ascending: false })

        if (error) {
          console.error('Error fetching designers:', error)
          return
        }

        if (data) {
          setDesigners(data as Designer[])
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
      <SEO title="Designers — Adorzia" description="Browse and explore Pakistan's most visionary fashion designers." canonicalURL="https://adorzia.com/designers" />

      {/* ===== HEADER ===== */}
      <section className="pt-28 pb-12 lg:pt-36 lg:pb-16 bg-black">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-5xl sm:text-6xl lg:text-7xl xl:text-8xl font-serif text-white leading-[0.95] tracking-tight mb-6">
            Designers
          </h1>
          <p className="text-neutral-500 text-sm lg:text-base max-w-md leading-relaxed">
            Discover emerging fashion designers in Pakistan's most curated showroom.
          </p>
        </div>
      </section>

      {/* ===== FILTER + SEARCH BAR ===== */}
      <section className="border-b border-neutral-900 bg-black sticky top-[60px] z-30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between gap-4">
            {/* Filter */}
            <div className="flex items-center gap-3">
              <button
                onClick={() => setShowFilters(!showFilters)}
                className="flex items-center gap-2 text-sm text-neutral-400 hover:text-white transition-colors"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z" /></svg>
                Filter
                {category !== 'All' && (
                  <span className="w-1.5 h-1.5 bg-[#bb9457] rounded-full" />
                )}
              </button>
              {category !== 'All' && (
                <span className="text-xs text-[#bb9457]">{category}</span>
              )}
            </div>

            {/* Search */}
            <div className="relative flex-1 max-w-xs sm:max-w-sm ml-auto">
              <input
                type="text"
                value={searchQuery}
                onChange={e => setSearchQuery(e.target.value)}
                placeholder="Search designers..."
                className="w-full bg-transparent border-b border-neutral-800 text-white text-sm placeholder:text-neutral-600 focus:outline-none focus:border-neutral-500 pb-1 transition-colors"
              />
              <svg className="absolute right-0 top-1/2 -translate-y-1/2 w-4 h-4 text-neutral-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" /></svg>
            </div>
          </div>

          {/* Category filter row */}
          {showFilters && (
            <div className="mt-4 pt-4 border-t border-neutral-900 flex flex-wrap gap-2">
              {categories.map(c => (
                <button
                  key={c}
                  onClick={() => handleFilterChange(c)}
                  className={`px-3 py-1.5 text-xs tracking-wide transition-all ${
                    category === c
                      ? 'bg-white text-black'
                      : 'text-neutral-500 hover:text-white border border-neutral-800 hover:border-neutral-600'
                  }`}
                >
                  {c}
                </button>
              ))}
              {category !== 'All' && (
                <button onClick={clearFilters} className="px-3 py-1.5 text-xs text-neutral-600 hover:text-white transition-colors">
                  Clear
                </button>
              )}
            </div>
          )}
        </div>
      </section>

      {/* ===== DESIGNERS GRID ===== */}
      <section className="bg-black min-h-screen">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {loading ? (
            <div className="text-center py-32">
              <div className="inline-block w-8 h-8 border-2 border-neutral-800 border-t-[#bb9457] rounded-full animate-spin" />
            </div>
          ) : filteredDesigners.length === 0 ? (
            <div className="text-center py-32">
              <p className="text-neutral-500 text-sm mb-4">No designers found</p>
              <button onClick={clearFilters} className="text-xs text-[#bb9457] hover:text-white transition-colors tracking-wide">
                Clear filters
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {paginatedDesigners.map(d => (
                <Link
                  key={d.id}
                  to={`/designers/${d.slug}`}
                  className="group relative block overflow-hidden bg-neutral-950 aspect-[3/4]"
                >
                  <img
                    src={d.image_url || '/images/placeholder.webp'}
                    alt={d.name}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                    loading="lazy"
                  />
                  {/* Name overlay — only on hover */}
                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/40 transition-all duration-500 flex items-end">
                    <div className="p-5 translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500">
                      <p className="text-white font-serif text-lg">{d.name}</p>
                      <p className="text-neutral-300 text-xs mt-0.5">{d.specialization}</p>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          )}

          {/* ===== PAGINATION ===== */}
          {totalPages > 1 && (
            <div className="mt-16 flex items-center justify-center gap-2">
              <button
                onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
                disabled={currentPage === 1}
                className="px-5 py-2.5 border border-neutral-800 text-sm text-neutral-400 hover:text-white hover:border-neutral-600 disabled:opacity-30 disabled:cursor-not-allowed transition-all"
              >
                ← Prev
              </button>
              {Array.from({ length: totalPages }, (_, i) => i + 1).map(page => (
                <button
                  key={page}
                  onClick={() => setCurrentPage(page)}
                  className={`w-10 h-10 flex items-center justify-center text-sm transition-all ${
                    page === currentPage
                      ? 'bg-white text-black font-semibold'
                      : 'border border-neutral-800 text-neutral-400 hover:text-white hover:border-neutral-600'
                  }`}
                >
                  {page}
                </button>
              ))}
              <button
                onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
                disabled={currentPage === totalPages}
                className="px-5 py-2.5 border border-neutral-800 text-sm text-neutral-400 hover:text-white hover:border-neutral-600 disabled:opacity-30 disabled:cursor-not-allowed transition-all"
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
