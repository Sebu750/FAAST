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
        title="Blog - Adorzia | Fashion Entrepreneurship Insights"
        description="Explore insights on Pakistani fashion entrepreneurship, PIFD, AIFD, fashion startups, heritage craft, and the future of Pakistan's fashion industry."
        canonicalURL="https://adorzia.com/blog"
        ogTitle="Adorzia Blog - Fashion Entrepreneurship & Industry Insights"
        ogDescription="Stories, insights, and analysis on Pakistani fashion entrepreneurship, design education, and the emerging fashion startup ecosystem."
      />

      {/* Hero Section */}
      <section className="relative border-b border-neutral-900 bg-neutral-950 py-20 sm:py-28">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(187,148,87,0.08),transparent_50%)]" />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <span className="inline-flex items-center gap-2 text-[#bb9457] uppercase tracking-[0.3em] text-[10px] font-mono font-semibold mb-4">
            <span className="w-1.5 h-1.5 bg-[#bb9457] rounded-full" />
            The Journal
          </span>
          <h1 className="font-serif text-4xl sm:text-5xl md:text-6xl text-white tracking-tight">
            Stories from Pakistan's<br className="hidden sm:block" /> Fashion Frontier
          </h1>
          <p className="mt-6 max-w-2xl mx-auto text-neutral-400 text-base sm:text-lg leading-relaxed">
            Insights on fashion entrepreneurship, design education, heritage craft, and the emerging startup ecosystem reshaping Pakistan's fashion industry.
          </p>
        </div>
      </section>

      {/* Category Filter + Search */}
      <section className="border-b border-neutral-900 bg-neutral-950/50 sticky top-[60px] z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex flex-col sm:flex-row gap-3">
          <div className="flex items-center gap-2 sm:gap-4 whitespace-nowrap overflow-x-auto flex-1">
            <button onClick={() => { setActiveCategory(''); setVisibleCount(POSTS_PER_PAGE) }}
              className={`px-4 py-2 text-xs uppercase tracking-wider transition-colors shrink-0 ${
                !activeCategory ? 'bg-[#bb9457] text-black' : 'text-neutral-500 hover:text-white'
              }`}>All</button>
            {categories.map(cat => (
              <button key={cat.id} onClick={() => { setActiveCategory(cat.slug); setVisibleCount(POSTS_PER_PAGE) }}
                className={`px-4 py-2 text-xs uppercase tracking-wider transition-colors shrink-0 ${
                  activeCategory === cat.slug ? 'bg-[#bb9457] text-black' : 'text-neutral-500 hover:text-white'
                }`}>{cat.name}</button>
            ))}
          </div>
          <div className="relative shrink-0">
            <svg className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-neutral-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
            <input type="text" placeholder="Search articles..." value={searchQuery} onChange={e => handleSearch(e.target.value)}
              className="w-full sm:w-56 pl-9 pr-4 py-2 bg-neutral-900 border border-neutral-800 text-white text-xs placeholder-neutral-600 focus:outline-none focus:border-[#bb9457]" />
          </div>
        </div>
      </section>

      {/* Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
        {loading ? (
          <div className="text-center py-20 text-neutral-500">Loading articles...</div>
        ) : posts.length === 0 ? (
          <div className="text-center py-20">
            <p className="text-neutral-500">No articles found in this category.</p>
          </div>
        ) : (
          <>
            {/* Featured Post */}
            {featuredPost && !activeCategory && (
              <Link to={`/blog/${featuredPost.slug}`} className="block group mb-16">
                <article className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center">
                  <div className="aspect-[16/10] overflow-hidden bg-neutral-900">
                    {featuredPost.featured_image_url ? (
                      <img
                        src={featuredPost.featured_image_url}
                        alt={featuredPost.title}
                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                        loading="eager"
                      />
                    ) : (
                      <div className="w-full h-full bg-gradient-to-br from-neutral-800 to-neutral-900 flex items-center justify-center">
                        <span className="text-neutral-600 text-sm">No image</span>
                      </div>
                    )}
                  </div>
                  <div>
                    {featuredPost.category && (
                      <span className="inline-block text-[#bb9457] text-xs uppercase tracking-wider font-semibold mb-4">
                        {featuredPost.category.name}
                      </span>
                    )}
                    <h2 className="font-serif text-2xl sm:text-3xl lg:text-4xl text-white tracking-tight group-hover:text-[#bb9457] transition-colors">
                      {featuredPost.title}
                    </h2>
                    {featuredPost.excerpt && (
                      <p className="mt-4 text-neutral-400 leading-relaxed line-clamp-3">
                        {featuredPost.excerpt}
                      </p>
                    )}
                    {featuredPost.tags && featuredPost.tags.length > 0 && (
                      <div className="mt-4 flex flex-wrap gap-2">
                        {featuredPost.tags.map(tag => (
                          <span key={tag} className="px-2.5 py-1 bg-neutral-900 border border-neutral-800 text-neutral-400 text-[10px] uppercase tracking-wider">
                            {tag}
                          </span>
                        ))}
                      </div>
                    )}
                    <div className="mt-6 flex items-center gap-4 text-xs text-neutral-500">
                      <span>{featuredPost.author_name}</span>
                      <span className="w-1 h-1 bg-neutral-700 rounded-full" />
                      <span>{new Date(featuredPost.published_at || featuredPost.created_at).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}</span>
                      <span className="w-1 h-1 bg-neutral-700 rounded-full" />
                      <span>{featuredPost.reading_time} min read</span>
                    </div>
                  </div>
                </article>
              </Link>
            )}

            {/* Post Grid */}
            <div className={`grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8`}>
              {(activeCategory || searchQuery ? filteredPosts : visiblePosts).map(post => (
                <Link key={post.id} to={`/blog/${post.slug}`} className="group">
                  <article className="h-full flex flex-col">
                    <div className="aspect-[4/3] overflow-hidden bg-neutral-900 mb-4">
                      {post.featured_image_url ? (
                        <img src={post.featured_image_url} alt={post.title}
                          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" loading="lazy" />
                      ) : (
                        <div className="w-full h-full bg-gradient-to-br from-neutral-800 to-neutral-900" />
                      )}
                    </div>
                    {post.category && (
                      <span className="text-[#bb9457] text-[10px] uppercase tracking-wider font-semibold mb-2">
                        {post.category.name}
                      </span>
                    )}
                    <h3 className="font-serif text-lg sm:text-xl text-white tracking-tight group-hover:text-[#bb9457] transition-colors line-clamp-2">
                      {post.title}
                    </h3>
                    {post.excerpt && (
                      <p className="mt-2 text-sm text-neutral-500 line-clamp-2 flex-1">{post.excerpt}</p>
                    )}
                    {post.tags && post.tags.length > 0 && (
                      <div className="mt-3 flex flex-wrap gap-1.5">
                        {post.tags.slice(0, 3).map(tag => (
                          <span key={tag} className="px-2 py-0.5 bg-neutral-900 text-neutral-500 text-[10px] uppercase tracking-wider">
                            {tag}
                          </span>
                        ))}
                        {post.tags.length > 3 && (
                          <span className="px-2 py-0.5 text-neutral-600 text-[10px]">+{post.tags.length - 3}</span>
                        )}
                      </div>
                    )}
                    <div className="mt-4 flex items-center gap-3 text-xs text-neutral-600">
                      <span>{new Date(post.published_at || post.created_at).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}</span>
                      <span className="w-1 h-1 bg-neutral-800 rounded-full" />
                      <span>{post.reading_time} min</span>
                    </div>
                  </article>
                </Link>
              ))}
            </div>

            {/* Load More */}
            {!searchQuery && !activeCategory && hasMore && (
              <div className="text-center mt-12">
                <button onClick={() => setVisibleCount(prev => prev + POSTS_PER_PAGE)}
                  className="px-8 py-3 border border-neutral-700 text-neutral-300 hover:border-[#bb9457] hover:text-[#bb9457] transition-colors text-sm uppercase tracking-wider">
                  Load More ({regularPosts.length - visibleCount} remaining)
                </button>
              </div>
            )}

            {/* Post count */}
            {!loading && filteredPosts.length > 0 && (
              <p className="text-center text-xs text-neutral-600 mt-8">
                {searchQuery ? `${filteredPosts.length} results for "${searchQuery}"` : `${totalPosts} articles`}
              </p>
            )}
          </>
        )}
      </main>

      {/* Newsletter CTA */}
      <section className="border-t border-neutral-900 bg-neutral-950 py-16 sm:py-20">
        <div className="max-w-xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="font-serif text-2xl sm:text-3xl text-white mb-3">Stay Connected</h2>
          <p className="text-neutral-400 text-sm mb-8">
            Get the latest insights on Pakistani fashion entrepreneurship delivered to your inbox.
          </p>
          {subscribed ? (
            <div className="bg-green-900/20 border border-green-800/30 px-6 py-4">
              <p className="text-green-400 text-sm font-medium">Thank you for subscribing!</p>
              <p className="text-green-400/60 text-xs mt-1">Check your email to confirm.</p>
            </div>
          ) : (
            <form onSubmit={handleSubscribe} className="flex gap-3 max-w-md mx-auto">
              <input type="email" value={email} onChange={e => setEmail(e.target.value)} placeholder="Enter your email"
                required className="flex-1 px-4 py-3 bg-neutral-900 border border-neutral-800 text-white text-sm placeholder-neutral-600 focus:outline-none focus:border-[#bb9457]" />
              <button type="submit" disabled={subscribing}
                className="px-6 py-3 bg-[#bb9457] text-black text-sm uppercase tracking-wider font-semibold hover:bg-white disabled:opacity-50 transition-colors shrink-0">
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
