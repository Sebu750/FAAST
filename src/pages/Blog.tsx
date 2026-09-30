import { useEffect, useState } from 'react'
import { Link, useParams, useSearchParams } from 'react-router-dom'
import { supabase } from '../lib/supabase'
import SEO from '../components/SEO'
import Breadcrumb from '../components/Breadcrumb'
import type { BlogPost, BlogCategory } from '../types/database'
import craft from '../assets/craft.webp'

const POSTS_PER_PAGE = 9

const Blog = () => {
  const { category: categorySlug } = useParams<{ category: string }>()
  const [searchParams, setSearchParams] = useSearchParams()
  const [posts, setPosts] = useState<(BlogPost & { category?: BlogCategory | null })[]>([])
  const [categories, setCategories] = useState<BlogCategory[]>([])
  const [loading, setLoading] = useState(true)
  const [activeCategory, setActiveCategory] = useState<string>(categorySlug || '')
  const [searchQuery, setSearchQuery] = useState(searchParams.get('q') || '')
  const [visibleCount, setVisibleCount] = useState(POSTS_PER_PAGE)
  const [totalPosts, setTotalPosts] = useState(0)
  const [showFilters, setShowFilters] = useState(false)
  const [email, setEmail] = useState('')
  const [subscribing, setSubscribing] = useState(false)
  const [subscribed, setSubscribed] = useState(false)

  useEffect(() => {
    fetchCategories()
    fetchPosts()
  }, [activeCategory])

  useEffect(() => {
    if (categorySlug) setActiveCategory(categorySlug)
  }, [categorySlug])

  useEffect(() => {
    const q = searchParams.get('q') || ''
    setSearchQuery(q)
  }, [searchParams])

  const fetchCategories = async () => {
    const { data } = await supabase.from('blog_categories').select('*').order('name')
    setCategories(data || [])
  }

  const fetchPosts = async () => {
    setLoading(true)
    try {
      let query = supabase
        .from('blog_posts')
        .select('*, category:blog_categories(id, name, slug)', { count: 'exact' })
        .eq('status', 'published')
        .lte('published_at', new Date().toISOString())
        .order('published_at', { ascending: false })

      if (activeCategory) {
        const cat = categories.find(c => c.slug === activeCategory)
        if (cat) query = query.eq('category_id', cat.id)
      }

      const { data, error, count } = await query
      if (error) throw error
      setPosts(data || [])
      setTotalPosts(count || 0)
    } catch (err) {
      console.error('Error fetching posts:', err)
    } finally {
      setLoading(false)
    }
  }

  const handleSearch = (value: string) => {
    setSearchQuery(value)
    setVisibleCount(POSTS_PER_PAGE)
    if (value) {
      setSearchParams({ q: value })
    } else {
      setSearchParams({})
    }
  }

  const handleSubscribe = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!email.trim()) return
    setSubscribing(true)
    try {
      await supabase.from('newsletter_subscriptions').insert({ email: email.trim() })
      setSubscribed(true)
      setEmail('')
    } catch (err) {
      console.error('Subscribe error:', err)
    } finally {
      setSubscribing(false)
    }
  }

  const formatDate = (dateStr: string) => {
    try {
      return new Date(dateStr).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })
    } catch {
      return ''
    }
  }

  // Client-side search filtering
  const filteredPosts = searchQuery
    ? posts.filter(p =>
        p.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        (p.excerpt || '').toLowerCase().includes(searchQuery.toLowerCase()) ||
        p.content.toLowerCase().includes(searchQuery.toLowerCase())
      )
    : posts

  const featuredPost = !searchQuery && !activeCategory ? filteredPosts[0] : null
  const regularPosts = featuredPost ? filteredPosts.slice(1) : filteredPosts
  const visiblePosts = regularPosts.slice(0, visibleCount)
  const hasMore = regularPosts.length > visibleCount

  return (
    <div className="min-h-screen bg-black text-neutral-100 font-sans antialiased">
      <SEO
        title={activeCategory ? `${activeCategory.split('-').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' ')} — Adorzia Journal` : "Journal — Adorzia | Pakistani Fashion Journalism & Industry Insights"}
        description={activeCategory ? `Read ${activeCategory.split('-').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' ')} articles on Adorzia Journal — Pakistani fashion entrepreneurship, heritage craft, and emerging designers.` : "Explore in-depth stories on Pakistani fashion entrepreneurship, heritage craft preservation, emerging designer spotlights, and industry insights. Designer Stories, Brand Stories, Fashion Industry, Opportunities, and Adorzia Updates."}
        canonicalURL={activeCategory ? `https://adorzia.com/blog/category/${activeCategory}` : "https://adorzia.com/blog"}
        ogTitle="Journal — Adorzia | Pakistani Fashion Journalism"
        ogDescription="Designer Stories, Brand Stories, Fashion Industry, Opportunities, and Adorzia Updates."
        ogImageAlt="Adorzia Journal - Pakistani Fashion Journalism"
        schemaType="CollectionPage"
        schema={{
          "@context": "https://schema.org",
          "@type": "CollectionPage",
          "name": "Adorzia Journal",
          "description": "Pakistani fashion journalism, industry insights, and designer stories",
          "url": activeCategory ? `https://adorzia.com/blog/category/${activeCategory}` : "https://adorzia.com/blog",
          "isPartOf": {
            "@type": "WebSite",
            "name": "Adorzia",
            "url": "https://adorzia.com"
          },
          "mainEntity": {
            "@type": "ItemList",
            "name": "Fashion Journal & Articles",
            "description": "Curated journalism and insights on Pakistani fashion industry",
            "itemListElement": posts.slice(0, 20).map((p, i) => ({
              "@type": "ListItem",
              "position": i + 1,
              "name": p.title,
              "url": `https://adorzia.com/blog/${p.slug}`
            }))
          }
        }}
        keywords="Pakistani fashion journal, designer stories Pakistan, brand stories fashion, fashion industry insights, fashion opportunities Pakistan, Adorzia updates, Fashion entrepreneurship Pakistan, Heritage craft pakistan, Emerging designers Pakistan, Fashion industry insights, Pakistani fashion stories, Fashion business Pakistan, Adorzia"
      />
      <Breadcrumb currentPage={activeCategory ? activeCategory.split('-').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' ') : 'Journal'} />
      
      <style>{`
        @keyframes fadeInUp {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-fade-in-up { animation: fadeInUp 1s cubic-bezier(0.16, 1, 0.3, 1) forwards; }
      `}</style>

      {/* ====== HERO ====== */}
      <section className="relative min-h-[50vh] sm:min-h-[60vh] flex items-end overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img src={craft} alt="Pakistani fashion craftsmanship and heritage textile art" className="w-full h-full object-cover opacity-30 grayscale contrast-125" loading="eager" decoding="async" />
          <div className="absolute inset-0 bg-gradient-to-t from-black via-black/80 to-black/50" />
          <div className="absolute inset-0 bg-gradient-to-r from-black via-black/50 to-transparent" />
        </div>
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_left,rgba(187,148,87,0.15),transparent_60%)]" />

        <div className="absolute inset-0 opacity-[0.03] pointer-events-none z-10 mix-blend-screen">
          <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <pattern id="journal-grid" width="100" height="100" patternUnits="userSpaceOnUse">
                <path d="M 50 0 L 100 50 L 50 100 L 0 50 Z" fill="none" stroke="#bb9457" strokeWidth="0.5" />
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#journal-grid)" />
          </svg>
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-8 pb-16 pt-32 animate-fade-in-up">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-end">
            <div className="lg:col-span-8">
              <span className="inline-flex items-center gap-2 text-[#bb9457] uppercase tracking-[0.3em] text-[10px] font-mono font-semibold mb-6">
                <span className="w-1.5 h-1.5 bg-[#bb9457] rounded-full animate-pulse" />
                The Journal
              </span>
              <h1 className="font-serif text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-normal tracking-tight text-white leading-[0.9]">
                Stories, insights &<br />
                <span className="text-[#bb9457] italic font-light">perspectives.</span>
              </h1>
            </div>
            <div className="lg:col-span-4">
              <p className="text-neutral-400 font-light text-base leading-relaxed">
                Fashion journalism, industry insights, and designer stories from Pakistan's creative ecosystem — told with integrity.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ====== FILTER + SEARCH BAR ====== */}
      <section className="bg-neutral-950 sticky top-[60px] z-40 border-b border-neutral-800">
        <div className="max-w-7xl mx-auto px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between gap-4">
            <button
              onClick={() => setShowFilters(!showFilters)}
              className={`flex items-center gap-2 px-4 py-2 text-[10px] uppercase tracking-[0.2em] font-semibold border rounded-sm transition-all duration-300 ${
                showFilters
                  ? 'bg-[#bb9457] text-black border-[#bb9457]'
                  : 'text-neutral-400 border-neutral-700 hover:text-white hover:border-neutral-500'
              }`}
            >
              <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z" />
              </svg>
              Filter
            </button>

            <div className="relative flex-1 max-w-xs">
              <input
                type="text"
                placeholder="Search articles..."
                value={searchQuery}
                onChange={e => handleSearch(e.target.value)}
                className="w-full pl-0 pr-8 py-2 bg-transparent border-b border-neutral-700 text-white text-sm placeholder-neutral-600 focus:outline-none focus:border-[#bb9457] transition-colors"
              />
              <svg className="w-4 h-4 absolute right-0 top-1/2 -translate-y-1/2 text-neutral-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </div>
          </div>

          {showFilters && (
            <div className="mt-4 pt-4 border-t border-neutral-800 flex flex-wrap gap-2">
              <button
                onClick={() => { setActiveCategory(''); setVisibleCount(POSTS_PER_PAGE); setShowFilters(false) }}
                className={`px-4 py-2 text-[10px] uppercase tracking-[0.15em] font-semibold rounded-sm transition-all duration-300 ${
                  !activeCategory ? 'bg-[#bb9457] text-black' : 'text-neutral-500 hover:text-white border border-neutral-800 hover:border-neutral-600'
                }`}
              >
                All
              </button>
              {categories.map(cat => (
                <button
                  key={cat.id}
                  onClick={() => { setActiveCategory(cat.slug); setVisibleCount(POSTS_PER_PAGE); setShowFilters(false) }}
                  className={`px-4 py-2 text-[10px] uppercase tracking-[0.15em] font-semibold rounded-sm transition-all duration-300 ${
                    activeCategory === cat.slug ? 'bg-[#bb9457] text-black' : 'text-neutral-500 hover:text-white border border-neutral-800 hover:border-neutral-600'
                  }`}
                >
                  {cat.name}
                </button>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* ====== CONTENT ====== */}
      <main className="bg-black">
        <div className="max-w-7xl mx-auto px-6 lg:px-8 py-16 sm:py-20">
          {loading ? (
            <div className="text-center py-20">
              <div className="text-[#bb9457] text-xs uppercase tracking-[0.3em] font-mono">Loading...</div>
            </div>
          ) : posts.length === 0 ? (
            <div className="text-center py-20">
              <p className="text-neutral-500 font-light">No articles found.</p>
            </div>
          ) : (
            <>
              {/* Featured Post */}
              {featuredPost && !activeCategory && !searchQuery && (
                <Link to={`/blog/${featuredPost.slug}`} className="block group mb-16">
                  <article className="grid lg:grid-cols-2 gap-8 items-center">
                    <div className="aspect-[16/10] overflow-hidden bg-neutral-900 rounded-sm border border-neutral-800 group-hover:border-[#bb9457]/40 transition-all duration-500">
                      {featuredPost.featured_image_url ? (
                        <img
                          src={featuredPost.featured_image_url}
                          alt={featuredPost.title}
                          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                          loading="eager"
                        />
                      ) : (
                        <div className="w-full h-full bg-neutral-900" />
                      )}
                    </div>
                    <div className="space-y-4">
                      {featuredPost.category && (
                        <span className="inline-flex items-center gap-2 text-[#bb9457] uppercase tracking-[0.2em] text-[9px] font-mono font-semibold">
                          <span className="w-1 h-1 bg-[#bb9457] rounded-full" />
                          {featuredPost.category.name}
                        </span>
                      )}
                      <h2 className="font-serif text-2xl sm:text-3xl text-white font-normal tracking-tight leading-tight group-hover:text-[#bb9457] transition-colors duration-300">
                        {featuredPost.title}
                      </h2>
                      {featuredPost.excerpt && (
                        <p className="text-neutral-400 font-light text-sm leading-relaxed line-clamp-3">
                          {featuredPost.excerpt}
                        </p>
                      )}
                      {featuredPost.published_at && (
                        <p className="text-neutral-600 text-xs font-light">{formatDate(featuredPost.published_at)}</p>
                      )}
                      <span className="inline-flex items-center gap-2 text-[#bb9457] text-[10px] uppercase tracking-[0.2em] font-semibold group-hover:gap-3 transition-all duration-300">
                        Read Article
                        <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                        </svg>
                      </span>
                    </div>
                  </article>
                </Link>
              )}

              {/* Section Label */}
              {(activeCategory || searchQuery) && (
                <div className="mb-10">
                  <span className="text-[10px] uppercase tracking-[0.3em] text-[#bb9457] font-mono font-semibold">
                    {searchQuery ? `Results for "${searchQuery}"` : activeCategory ? categories.find(c => c.slug === activeCategory)?.name || activeCategory : 'Latest Articles'}
                  </span>
                </div>
              )}

              {/* Post Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-6 gap-y-12">
                {(activeCategory || searchQuery ? filteredPosts : visiblePosts).map(post => (
                  <Link key={post.id} to={`/blog/${post.slug}`} className="group">
                    <article>
                      <div className="aspect-[16/10] overflow-hidden bg-neutral-900 rounded-sm border border-neutral-800 group-hover:border-[#bb9457]/40 transition-all duration-500 mb-4">
                        {post.featured_image_url ? (
                          <img
                            src={post.featured_image_url}
                            alt={post.title}
                            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                            loading="lazy"
                          />
                        ) : (
                          <div className="w-full h-full bg-neutral-900 flex items-center justify-center">
                            <svg className="w-8 h-8 text-neutral-800" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253" />
                            </svg>
                          </div>
                        )}
                      </div>
                      {post.category && (
                        <span className="inline-block text-[#bb9457] uppercase tracking-[0.2em] text-[8px] font-mono font-semibold mb-2">
                          {post.category.name}
                        </span>
                      )}
                      <h3 className="font-serif text-base text-white font-normal leading-snug group-hover:text-[#bb9457] transition-colors duration-300">
                        {post.title}
                      </h3>
                      {post.excerpt && (
                        <p className="mt-2 text-xs text-neutral-500 font-light leading-relaxed line-clamp-2">
                          {post.excerpt}
                        </p>
                      )}
                      {post.published_at && (
                        <p className="mt-2 text-neutral-700 text-[10px] font-light">{formatDate(post.published_at)}</p>
                      )}
                    </article>
                  </Link>
                ))}
              </div>

              {/* Load More */}
              {!searchQuery && !activeCategory && hasMore && (
                <div className="text-center mt-16 pt-8 border-t border-neutral-900">
                  <button
                    onClick={() => setVisibleCount(prev => prev + POSTS_PER_PAGE)}
                    className="inline-flex items-center gap-3 px-8 py-4 border border-neutral-800 text-white text-[10px] uppercase tracking-[0.2em] font-semibold rounded-sm hover:border-[#bb9457]/40 hover:text-[#bb9457] transition-all duration-300"
                  >
                    View More Articles
                    <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                    </svg>
                  </button>
                </div>
              )}

              {/* Post count */}
              {!loading && filteredPosts.length > 0 && (
                <p className="text-center text-[10px] text-neutral-600 mt-8 font-light uppercase tracking-[0.2em]">
                  {searchQuery ? `${filteredPosts.length} results` : `${totalPosts} articles`}
                </p>
              )}
            </>
          )}
        </div>
      </main>

      {/* ====== NEWSLETTER CTA ====== */}
      <section className="relative py-32 md:py-40 overflow-hidden border-t border-neutral-900">
        <div className="absolute inset-0">
          <img src={craft} alt="" aria-hidden="true" className="w-full h-full object-cover opacity-20" loading="lazy" decoding="async" />
          <div className="absolute inset-0 bg-gradient-to-b from-black via-neutral-950/95 to-black" />
        </div>
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(187,148,87,0.1),transparent_60%)]" />

        <div className="max-w-xl mx-auto px-6 lg:px-8 relative z-10 text-center">
          <span className="inline-flex items-center gap-2 text-[#bb9457] uppercase tracking-[0.3em] text-[10px] font-mono font-semibold mb-6">
            <span className="w-1.5 h-1.5 bg-[#bb9457] rounded-full animate-pulse" />
            Newsletter
          </span>
          <h2 className="font-serif text-3xl md:text-4xl text-white font-normal tracking-tight mb-4">
            Stay connected to the<br />
            <span className="text-[#bb9457] italic font-light">conversation.</span>
          </h2>
          <p className="text-neutral-400 font-light text-sm mb-10 leading-relaxed">
            The latest journal articles on Pakistani fashion delivered to your inbox.
          </p>

          {subscribed ? (
            <div className="p-8 border border-[#bb9457]/30 rounded-sm bg-neutral-900/50">
              <div className="w-12 h-12 mx-auto mb-4 rounded-full bg-[#bb9457]/20 flex items-center justify-center">
                <svg className="w-6 h-6 text-[#bb9457]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <p className="text-white font-light text-sm mb-1">You are subscribed.</p>
              <p className="text-neutral-500 text-xs">Check your email to confirm.</p>
            </div>
          ) : (
            <form onSubmit={handleSubscribe} className="flex gap-3 max-w-md mx-auto">
              <input
                type="email"
                value={email}
                onChange={e => setEmail(e.target.value)}
                placeholder="Enter your email"
                required
                className="flex-1 px-4 py-3.5 bg-neutral-900/50 border border-neutral-800 text-white text-sm placeholder-neutral-600 focus:outline-none focus:border-[#bb9457] focus:ring-1 focus:ring-[#bb9457]/20 transition-all rounded-sm"
              />
              <button
                type="submit"
                disabled={subscribing}
                className="px-6 py-3.5 bg-[#bb9457] text-black text-[10px] uppercase tracking-[0.2em] font-semibold rounded-sm hover:bg-white disabled:opacity-50 transition-all shrink-0"
              >
                {subscribing ? '...' : 'Subscribe'}
              </button>
            </form>
          )}
        </div>
      </section>
    </div>
  )
}

export default Blog
