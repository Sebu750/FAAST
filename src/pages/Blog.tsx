import { useEffect, useState } from 'react'
import { Link, useParams, useSearchParams } from 'react-router-dom'
import { supabase } from '../lib/supabase'
import SEO from '../components/SEO'
import type { BlogPost, BlogCategory } from '../types/database'

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
        title="Features - Adorzia | Pakistani Fashion Journalism & Insights"
        description="Explore features derived from experienced fashion journalists and art directors. Stories on Pakistani fashion entrepreneurship, heritage craft, and emerging designers."
        canonicalURL="https://adorzia.com/features"
        ogTitle="Features - Adorzia | Pakistani Fashion Journalism"
        ogDescription="Features derived from experienced fashion journalists and art directors with integrity, brand knowledge and big ideas."
      />

      {/* Hero Section - Editorial Banner */}
      <section className="relative bg-black text-white overflow-hidden">
        {/* Background Image */}
        <div className="absolute inset-0 z-0">
          <img 
            src="https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=1920&q=80" 
            alt="Fashion Editorial"
            className="w-full h-full object-cover opacity-40"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black via-black/70 to-black/40" />
          <div className="absolute inset-0 bg-gradient-to-r from-black via-black/50 to-transparent" />
        </div>

        {/* Content */}
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-32 pb-20 sm:pt-40 sm:pb-28">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-end">
            <div className="lg:col-span-7">
              <p className="text-[10px] uppercase tracking-[0.3em] text-[#bb9457] font-mono font-semibold mb-6">
                The Journal
              </p>
              <h1 className="font-serif text-6xl sm:text-7xl md:text-8xl lg:text-9xl font-normal tracking-tight text-white leading-[0.9]">
                FEATURES
              </h1>
            </div>
            <div className="lg:col-span-5">
              <p className="text-sm text-neutral-300 leading-relaxed max-w-md">
                Adorzia provides features derived from experienced fashion journalists and art directors with integrity, brand knowledge and big ideas.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Filter + Search Bar */}
      <section className="bg-black sticky top-[60px] z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between gap-4">
            {/* Filter Button */}
            <button 
              onClick={() => setShowFilters(!showFilters)}
              className="flex items-center gap-2 text-xs uppercase tracking-[0.15em] font-semibold text-white hover:text-[#bb9457] transition-colors"
            >
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z" />
              </svg>
              Filter
            </button>

            {/* Search */}
            <div className="relative flex-1 max-w-xs">
              <input 
                type="text" 
                placeholder="Search features..." 
                value={searchQuery} 
                onChange={e => handleSearch(e.target.value)}
                className="w-full pl-0 pr-4 py-2 bg-transparent border-b border-white text-white text-sm placeholder-neutral-500 focus:outline-none focus:border-[#bb9457] transition-colors"
              />
              <svg className="w-4 h-4 absolute right-0 top-1/2 -translate-y-1/2 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </div>
          </div>

          {/* Filter Categories - Expandable */}
          {showFilters && (
            <div className="mt-4 pt-4 border-t border-neutral-800 flex flex-wrap gap-2">
              <button 
                onClick={() => { setActiveCategory(''); setVisibleCount(POSTS_PER_PAGE); setShowFilters(false) }}
                className={`px-4 py-2 text-xs uppercase tracking-wider transition-colors ${
                  !activeCategory ? 'bg-white text-black' : 'text-neutral-400 hover:text-white border border-neutral-700'
                }`}
              >
                All
              </button>
              {categories.map(cat => (
                <button 
                  key={cat.id} 
                  onClick={() => { setActiveCategory(cat.slug); setVisibleCount(POSTS_PER_PAGE); setShowFilters(false) }}
                  className={`px-4 py-2 text-xs uppercase tracking-wider transition-colors ${
                    activeCategory === cat.slug ? 'bg-white text-black' : 'text-neutral-400 hover:text-white border border-neutral-700'
                  }`}
                >
                  {cat.name}
                </button>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Content - NJAL Style Grid */}
      <main className="bg-black">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
          {loading ? (
            <div className="text-center py-20 text-neutral-500">Loading features...</div>
          ) : posts.length === 0 ? (
            <div className="text-center py-20">
              <p className="text-neutral-500">No features found.</p>
            </div>
          ) : (
            <>
              {/* Featured Post - Large */}
              {featuredPost && !activeCategory && !searchQuery && (
                <Link to={`/blog/${featuredPost.slug}`} className="block group mb-12">
                  <article>
                    <div className="aspect-[16/9] overflow-hidden bg-neutral-900 mb-6">
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
                    <h2 className="text-sm uppercase tracking-[0.15em] font-semibold text-white leading-tight group-hover:text-[#bb9457] transition-colors">
                      {featuredPost.title}
                    </h2>
                  </article>
                </Link>
              )}

              {/* Post Grid - 3 Columns */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-6 gap-y-12">
                {(activeCategory || searchQuery ? filteredPosts : visiblePosts).map(post => (
                  <Link key={post.id} to={`/blog/${post.slug}`} className="group">
                    <article>
                      <div className="aspect-[16/9] overflow-hidden bg-neutral-900 mb-4">
                        {post.featured_image_url ? (
                          <img 
                            src={post.featured_image_url} 
                            alt={post.title}
                            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" 
                            loading="lazy" 
                          />
                        ) : (
                          <div className="w-full h-full bg-neutral-900" />
                        )}
                      </div>
                      <h3 className="text-xs uppercase tracking-[0.15em] font-semibold text-white leading-tight group-hover:text-[#bb9457] transition-colors">
                        {post.title}
                      </h3>
                    </article>
                  </Link>
                ))}
              </div>

              {/* Load More */}
              {!searchQuery && !activeCategory && hasMore && (
                <div className="text-center mt-16 pt-8 border-t border-neutral-800">
                  <button 
                    onClick={() => setVisibleCount(prev => prev + POSTS_PER_PAGE)}
                    className="inline-flex items-center gap-2 text-xs uppercase tracking-[0.2em] font-semibold text-white hover:text-[#bb9457] transition-colors"
                  >
                    View More Features
                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                    </svg>
                  </button>
                </div>
              )}

              {/* Post count */}
              {!loading && filteredPosts.length > 0 && (
                <p className="text-center text-xs text-neutral-500 mt-8">
                  {searchQuery ? `${filteredPosts.length} results for "${searchQuery}"` : `${totalPosts} features`}
                </p>
              )}
            </>
          )}
        </div>
      </main>

      {/* Newsletter CTA */}
      <section className="bg-black py-16 sm:py-20">
        <div className="max-w-xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="font-serif text-2xl sm:text-3xl text-white mb-3">Stay Connected</h2>
          <p className="text-neutral-400 text-sm mb-8">
            Get the latest features on Pakistani fashion delivered to your inbox.
          </p>
          {subscribed ? (
            <div className="bg-green-900/30 border border-green-700 px-6 py-4">
              <p className="text-green-400 text-sm font-medium">Thank you for subscribing!</p>
              <p className="text-green-500 text-xs mt-1">Check your email to confirm.</p>
            </div>
          ) : (
            <form onSubmit={handleSubscribe} className="flex gap-3 max-w-md mx-auto">
              <input 
                type="email" 
                value={email} 
                onChange={e => setEmail(e.target.value)} 
                placeholder="Enter your email"
                required 
                className="flex-1 px-4 py-3 bg-neutral-900 border border-neutral-700 text-white text-sm placeholder-neutral-500 focus:outline-none focus:border-[#bb9457] transition-colors" 
              />
              <button 
                type="submit" 
                disabled={subscribing}
                className="px-6 py-3 bg-white text-black text-sm uppercase tracking-wider font-semibold hover:bg-[#bb9457] hover:text-black disabled:opacity-50 transition-colors shrink-0"
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
