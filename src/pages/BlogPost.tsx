import { useEffect, useState, useMemo } from 'react'
import { useParams, Link, useNavigate } from 'react-router-dom'
import { Helmet } from 'react-helmet-async'
import { supabase } from '../lib/supabase'
import type { BlogPost, BlogCategory } from '../types/database'
import { markdownToHtml } from '../lib/markdownToHtml'
import '../styles/blog-content.css'

// Editorial Components - Available for use in blog content
// These components can be inserted into blog posts for premium editorial layout

// Pull Quote component - Large editorial quotes
export const PullQuote = ({ quote, author, role }: { quote: string; author?: string; role?: string }) => (
  <div className="my-16 py-12 px-8 md:px-12 border-t-2 border-b-2 border-[#bb9457]/40 bg-gradient-to-b from-[#bb9457]/5 to-transparent">
    <div className="max-w-3xl mx-auto text-center">
      <div className="text-6xl font-serif text-[#bb9457]/30 leading-none mb-4">"</div>
      <p className="font-serif text-2xl md:text-3xl lg:text-4xl text-white italic leading-relaxed mb-6">
        {quote}
      </p>
      {author && (
        <cite className="block not-italic">
          <span className="text-[#bb9457] font-medium">{author}</span>
          {role && <span className="text-neutral-500 text-sm ml-2">— {role}</span>}
        </cite>
      )}
    </div>
  </div>
)

// Highlight Card - For key insights and callouts
export const HighlightCard = ({ title, children, variant = 'default' }: { 
  title: string; 
  children: React.ReactNode; 
  variant?: 'default' | 'warning' | 'success' | 'info' 
}) => {
  const borderColors = {
    default: 'border-[#bb9457]',
    warning: 'border-amber-500',
    success: 'border-emerald-500',
    info: 'border-blue-500'
  }
  
  return (
    <div className={`my-10 p-8 bg-neutral-900/50 border-l-4 ${borderColors[variant]} backdrop-blur-sm`}>
      <div className="text-[10px] uppercase tracking-[0.3em] text-[#bb9457] font-mono font-semibold mb-4">
        {title}
      </div>
      <div className="text-neutral-300 leading-relaxed">
        {children}
      </div>
    </div>
  )
}

// Statistics Card - For data and metrics
export const StatisticsCard = ({ stats }: { stats: { value: string; label: string }[] }) => (
  <div className="my-12 p-8 bg-gradient-to-br from-neutral-900 to-neutral-950 border border-neutral-800">
    <div className="text-[10px] uppercase tracking-[0.3em] text-[#bb9457] font-mono font-semibold mb-8">
      Key Statistics
    </div>
    <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
      {stats.map((stat, index) => (
        <div key={index} className="text-center">
          <div className="text-3xl md:text-4xl font-serif text-[#bb9457] mb-2">
            {stat.value}
          </div>
          <div className="text-xs text-neutral-500 uppercase tracking-wider">
            {stat.label}
          </div>
        </div>
      ))}
    </div>
  </div>
)

// Checklist component
export const Checklist = ({ items }: { items: string[] }) => (
  <div className="my-10 p-8 bg-neutral-900/30 border border-neutral-800">
    <div className="text-[10px] uppercase tracking-[0.3em] text-[#bb9457] font-mono font-semibold mb-6">
      Checklist
    </div>
    <ul className="space-y-4">
      {items.map((item, index) => (
        <li key={index} className="flex items-start gap-4 text-neutral-300">
          <div className="flex-shrink-0 w-6 h-6 rounded-sm border-2 border-[#bb9457]/50 flex items-center justify-center mt-0.5">
            <svg className="w-4 h-4 text-[#bb9457]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
            </svg>
          </div>
          <span className="leading-relaxed">{item}</span>
        </li>
      ))}
    </ul>
  </div>
)

// CTA component for end of article
export const ArticleCTA = ({ title, description, buttonText, buttonLink }: {
  title: string;
  description: string;
  buttonText: string;
  buttonLink: string;
}) => (
  <div className="my-16 p-10 md:p-14 bg-gradient-to-br from-[#bb9457]/10 to-neutral-900 border border-[#bb9457]/30 text-center">
    <div className="max-w-2xl mx-auto">
      <h3 className="font-serif text-2xl md:text-3xl text-white mb-4">
        {title}
      </h3>
      <p className="text-neutral-400 mb-8 leading-relaxed">
        {description}
      </p>
      <Link
        to={buttonLink}
        className="inline-block px-8 py-4 bg-[#bb9457] text-black font-semibold uppercase tracking-wider text-sm hover:bg-white transition-colors duration-300"
      >
        {buttonText}
      </Link>
    </div>
  </div>
)

const BlogPost = () => {
  const { slug } = useParams<{ slug: string }>()
  const navigate = useNavigate()
  const [post, setPost] = useState<(BlogPost & { category?: BlogCategory | null }) | null>(null)
  const [relatedPosts, setRelatedPosts] = useState<(BlogPost & { category?: BlogCategory | null })[]>([])
  const [loading, setLoading] = useState(true)
  const [scrollProgress, setScrollProgress] = useState(0)

  useEffect(() => {
    if (slug) fetchPost()
  }, [slug])

  // Detect if content is Markdown (contains # or ** or -)
  const isMarkdown = (content: string) => {
    return /^#{1,6}\s|\*\*[^*]+\*\*|^-\s|\[.*\]\(.*\)/m.test(content)
  }

  // Convert content to HTML if needed
  const htmlContent = useMemo(() => {
    if (!post?.content) return ''
    if (isMarkdown(post.content)) {
      return markdownToHtml(post.content)
    }
    return post.content
  }, [post?.content])

  // Generate table of contents from headings
  const tableOfContents = useMemo(() => {
    if (!htmlContent) return []
    const headingRegex = /<h[2-3][^>]*>(.*?)<\/h[2-3]>/g
    const headings: { id: string; text: string; level: number }[] = []
    let match
    let index = 0
    while ((match = headingRegex.exec(htmlContent)) !== null) {
      const level = parseInt(match[0].charAt(2))
      const text = match[1].replace(/<[^>]+>/g, '')
      headings.push({ id: `heading-${index++}`, text, level })
    }
    return headings
  }, [htmlContent])

  // Scroll progress tracking
  useEffect(() => {
    const handleScroll = () => {
      const totalHeight = document.documentElement.scrollHeight - window.innerHeight
      const progress = (window.scrollY / totalHeight) * 100
      setScrollProgress(progress)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const fetchPost = async () => {
    setLoading(true)
    try {
      // Fetch the post
      const { data, error } = await supabase
        .from('blog_posts')
        .select('*, category:blog_categories(id, name, slug)')
        .eq('slug', slug)
        .eq('status', 'published')
        .single()

      if (error || !data) {
        navigate('/blog')
        return
      }

      setPost(data)

      // Increment view count
      await supabase
        .from('blog_posts')
        .update({ views: (data.views || 0) + 1 })
        .eq('id', data.id)

      // Fetch related posts (same category)
      if (data.category_id) {
        const { data: related } = await supabase
          .from('blog_posts')
          .select('*, category:blog_categories(id, name, slug)')
          .eq('status', 'published')
          .eq('category_id', data.category_id)
          .neq('id', data.id)
          .order('published_at', { ascending: false })
          .limit(3)
        setRelatedPosts(related || [])
      }
    } catch (err) {
      console.error('Error fetching post:', err)
      navigate('/blog')
    } finally {
      setLoading(false)
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center text-neutral-500">
        Loading...
      </div>
    )
  }

  if (!post) return null

  const publishDate = new Date(post.published_at || post.created_at)

  // JSON-LD Article Schema
  const articleSchema = {
    "@context": "https://schema.org",
    "@type": "Article",
    "headline": post.title,
    "description": post.excerpt || post.content.substring(0, 160),
    "image": post.featured_image_url || post.banner_image_url,
    "author": {
      "@type": "Person",
      "name": post.author_name
    },
    "publisher": {
      "@type": "Organization",
      "name": "Adorzia",
      "logo": {
        "@type": "ImageObject",
        "url": "https://adorzia.com/logo.png"
      }
    },
    "datePublished": publishDate.toISOString(),
    "dateModified": post.updated_at,
    "mainEntityOfPage": {
      "@type": "WebPage",
      "@id": `https://adorzia.com/blog/${post.slug}`
    }
  }

  return (
    <div className="min-h-screen bg-black text-neutral-100 font-sans antialiased">
      <Helmet>
        <title>{post.meta_title || `${post.title} - Adorzia Blog`}</title>
        <meta name="description" content={post.meta_description || post.excerpt || ''} />
        <link rel="canonical" href={`https://adorzia.com/blog/${post.slug}`} />
        
        {/* Open Graph */}
        <meta property="og:type" content="article" />
        <meta property="og:title" content={post.meta_title || post.title} />
        <meta property="og:description" content={post.meta_description || post.excerpt || ''} />
        <meta property="og:image" content={post.featured_image_url || post.banner_image_url || ''} />
        <meta property="article:published_time" content={publishDate.toISOString()} />
        <meta property="article:author" content="Adorzia" />
        {post.category && <meta property="article:section" content={post.category.name} />}
        {post.tags?.map(tag => <meta key={tag} property="article:tag" content={tag} />)}

        {/* Twitter */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={post.title} />
        <meta name="twitter:description" content={post.excerpt || ''} />
        {post.featured_image_url && <meta name="twitter:image" content={post.featured_image_url} />}

        {/* JSON-LD */}
        <script type="application/ld+json">{JSON.stringify(articleSchema)}</script>
      </Helmet>

      {/* Banner Image */}
      {post.banner_image_url && (
        <div className="relative h-[40vh] sm:h-[50vh] overflow-hidden">
          <img
            src={post.banner_image_url}
            alt=""
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent" />
        </div>
      )}

      {/* Article */}
      <article className="max-w-[820px] mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
        {/* Back Link */}
        <Link to="/blog" className="inline-flex items-center gap-2 text-neutral-500 hover:text-[#bb9457] transition-colors mb-8 text-sm">
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
          Back to Journal
        </Link>

        {/* Header */}
        <header className="mb-12">
          {post.category && (
            <Link
              to={`/blog/category/${post.category.slug}`}
              className="inline-block text-[#bb9457] text-[10px] uppercase tracking-[0.3em] font-mono font-semibold mb-6 hover:underline"
            >
              {post.category.name}
            </Link>
          )}
          <h1 className="font-serif text-3xl sm:text-4xl md:text-5xl lg:text-6xl text-white tracking-tight leading-[1.1] mb-8">
            {post.title}
          </h1>
          {post.excerpt && (
            <p className="text-lg sm:text-xl text-neutral-400 leading-relaxed mb-8">
              {post.excerpt}
            </p>
          )}

          {/* Meta - Editorial Style */}
          <div className="flex flex-wrap items-center gap-6 text-sm">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-[#bb9457]/20 border border-[#bb9457]/30 flex items-center justify-center">
                <span className="text-[#bb9457] font-serif font-bold">
                  {post.author_name.charAt(0)}
                </span>
              </div>
              <div>
                <div className="text-white font-medium">{post.author_name}</div>
                <div className="text-xs text-neutral-500">Author</div>
              </div>
            </div>
            
            <div className="h-8 w-px bg-neutral-800" />
            
            <div>
              <div className="text-white font-medium">
                {publishDate.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
              </div>
              <div className="text-xs text-neutral-500">Published</div>
            </div>
            
            <div className="h-8 w-px bg-neutral-800" />
            
            <div className="flex items-center gap-2">
              <svg className="w-4 h-4 text-[#bb9457]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <div>
                <div className="text-white font-medium">{post.reading_time} min</div>
                <div className="text-xs text-neutral-500">Reading Time</div>
              </div>
            </div>
          </div>
        </header>

        {/* Featured Image (if no banner) */}
        {!post.banner_image_url && post.featured_image_url && (
          <div className="aspect-[16/9] overflow-hidden mb-10">
            <img
              src={post.featured_image_url}
              alt={post.title}
              className="w-full h-full object-cover"
            />
          </div>
        )}

        {/* Reading Progress Bar */}
        <div className="fixed top-0 left-0 right-0 h-1 bg-neutral-900 z-50">
          <div 
            className="h-full bg-[#bb9457] transition-all duration-150 ease-out"
            style={{ width: `${scrollProgress}%` }}
          />
        </div>

        {/* Main Content Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          {/* Table of Contents - Sidebar */}
          {tableOfContents.length > 0 && (
            <aside className="hidden lg:block lg:col-span-3">
              <div className="sticky top-24">
                <div className="text-[10px] uppercase tracking-[0.3em] text-[#bb9457] font-mono font-semibold mb-6">
                  In This Article
                </div>
                <nav className="space-y-3">
                  {tableOfContents.map((heading, index) => (
                    <a
                      key={index}
                      href={`#heading-${index}`}
                      className={`block text-sm transition-all duration-200 hover:text-[#bb9457] group ${
                        heading.level === 2 
                          ? 'text-neutral-300 font-medium' 
                          : 'text-neutral-500 pl-4 text-xs'
                      }`}
                    >
                      <span className="inline-block mr-2 text-[#bb9457] opacity-0 group-hover:opacity-100 transition-opacity">
                        →
                      </span>
                      {heading.text}
                    </a>
                  ))}
                </nav>
              </div>
            </aside>
          )}

          {/* Article Content */}
          <article className={`${tableOfContents.length > 0 ? 'lg:col-span-9' : 'lg:col-span-12'} max-w-[820px]`}>
            {/* Content Body */}
            <div 
              className="prose prose-invert prose-adlorzia"
              dangerouslySetInnerHTML={{ __html: htmlContent }}
            />

            {/* End of Article CTA */}
            <ArticleCTA
              title="Ready to Launch Your Fashion Brand?"
              description="Join Adorzia's curated marketplace and connect with buyers who value craftsmanship, heritage, and authentic design."
              buttonText="Apply to Adorzia"
              buttonLink="/spotlight"
            />

            {/* Inline Share Buttons */}
            <div className="mt-12 pt-8 border-t border-neutral-800">
              <div className="flex items-center justify-between">
                <span className="text-sm text-neutral-500">Share this article:</span>
                <div className="flex items-center gap-3">
                  <a
                    href={`https://twitter.com/intent/tweet?text=${encodeURIComponent(post.title)}&url=${encodeURIComponent(`https://adorzia.com/blog/${post.slug}`)}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-10 h-10 rounded-full border border-neutral-800 flex items-center justify-center text-neutral-400 hover:border-[#bb9457] hover:text-[#bb9457] transition-all duration-300"
                  >
                    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                    </svg>
                  </a>
                  <a
                    href={`https://www.linkedin.com/shareArticle?mini=true&url=${encodeURIComponent(`https://adorzia.com/blog/${post.slug}`)}&title=${encodeURIComponent(post.title)}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-10 h-10 rounded-full border border-neutral-800 flex items-center justify-center text-neutral-400 hover:border-[#bb9457] hover:text-[#bb9457] transition-all duration-300"
                  >
                    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                    </svg>
                  </a>
                  <button
                    onClick={() => {
                      navigator.clipboard.writeText(window.location.href)
                      alert('Link copied to clipboard!')
                    }}
                    className="w-10 h-10 rounded-full border border-neutral-800 flex items-center justify-center text-neutral-400 hover:border-[#bb9457] hover:text-[#bb9457] transition-all duration-300"
                  >
                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
                    </svg>
                  </button>
                </div>
              </div>
            </div>
          </article>
        </div>

        {/* Tags */}
        {post.tags && post.tags.length > 0 && (
          <div className="mt-12 pt-8 border-t border-neutral-800">
            <div className="flex flex-wrap gap-2">
              {post.tags.map(tag => (
                <span key={tag} className="px-3 py-1 bg-neutral-900 text-neutral-400 text-xs uppercase tracking-wider">
                  {tag}
                </span>
              ))}
            </div>
          </div>
        )}

        {/* Author Section */}
        <div className="mt-10 pt-8 border-t border-neutral-800">
          <div className="flex items-center gap-4 bg-neutral-950/50 border border-neutral-800 p-6">
            <div className="w-14 h-14 bg-[#bb9457]/20 border border-[#bb9457]/30 rounded-full flex items-center justify-center shrink-0">
              {post.author_image_url ? (
                <img src={post.author_image_url} alt={post.author_name} className="w-full h-full rounded-full object-cover" />
              ) : (
                <span className="text-[#bb9457] font-serif text-lg">{post.author_name.charAt(0)}</span>
              )}
            </div>
            <div>
              <p className="text-xs text-neutral-500 uppercase tracking-wider mb-1">Written by</p>
              <p className="text-white font-medium">{post.author_name}</p>
              <p className="text-xs text-neutral-500 mt-1">Covering Pakistani fashion entrepreneurship, design education, and the emerging creative economy.</p>
            </div>
          </div>
        </div>

        {/* Share */}
        <div className="mt-8 flex items-center gap-4">
          <span className="text-sm text-neutral-500">Share:</span>
          <a
            href={`https://twitter.com/intent/tweet?text=${encodeURIComponent(post.title)}&url=${encodeURIComponent(`https://adorzia.com/blog/${post.slug}`)}`}
            target="_blank"
            rel="noopener noreferrer"
            className="text-neutral-400 hover:text-white transition-colors"
          >
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
              <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
            </svg>
          </a>
          <a
            href={`https://www.linkedin.com/shareArticle?mini=true&url=${encodeURIComponent(`https://adorzia.com/blog/${post.slug}`)}&title=${encodeURIComponent(post.title)}`}
            target="_blank"
            rel="noopener noreferrer"
            className="text-neutral-400 hover:text-white transition-colors"
          >
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
              <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
            </svg>
          </a>
        </div>
      </article>

      {/* Related Posts - Editorial Style */}
      {relatedPosts.length > 0 && (
        <section className="border-t border-neutral-900 bg-neutral-950 py-20 sm:py-28">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="mb-12">
              <div className="text-[10px] uppercase tracking-[0.3em] text-[#bb9457] font-mono font-semibold mb-4">
                Continue Reading
              </div>
              <h2 className="font-serif text-3xl sm:text-4xl text-white">
                More in {post.category?.name || 'This Category'}
              </h2>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10">
              {relatedPosts.map(related => (
                <Link
                  key={related.id}
                  to={`/blog/${related.slug}`}
                  className="group"
                >
                  <article>
                    <div className="aspect-[4/3] overflow-hidden bg-neutral-900 mb-6">
                      {related.featured_image_url ? (
                        <img
                          src={related.featured_image_url}
                          alt={related.title}
                          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                          loading="lazy"
                        />
                      ) : (
                        <div className="w-full h-full bg-gradient-to-br from-neutral-800 to-neutral-900" />
                      )}
                    </div>
                    <h3 className="font-serif text-lg text-white group-hover:text-[#bb9457] transition-colors line-clamp-2">
                      {related.title}
                    </h3>
                    <p className="mt-2 text-xs text-neutral-500">
                      {new Date(related.published_at || related.created_at).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })} · {related.reading_time} min
                    </p>
                  </article>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Back to Blog CTA */}
      <section className="border-t border-neutral-900 py-12">
        <div className="max-w-3xl mx-auto px-4 text-center">
          <Link
            to="/blog"
            className="inline-flex items-center gap-2 px-6 py-3 border border-neutral-700 text-neutral-300 hover:border-[#bb9457] hover:text-[#bb9457] transition-colors text-sm uppercase tracking-wider"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            All Articles
          </Link>
        </div>
      </section>
    </div>
  )
}

export default BlogPost
