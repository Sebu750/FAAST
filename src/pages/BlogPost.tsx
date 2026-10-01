import { useEffect, useState, useMemo } from 'react'
import { useParams, Link, useNavigate } from 'react-router-dom'
import { Helmet } from 'react-helmet-async'
import Breadcrumb from '../components/Breadcrumb'
import { supabase } from '../lib/supabase'
import type { BlogPost, BlogCategory } from '../types/database'
import { markdownToHtml } from '../lib/markdownToHtml'
import '../styles/blog-content.css'

// ====== Editorial Components (available for admin rich-text editor) ======

export const PullQuote = ({ quote, author, role }: { quote: string; author?: string; role?: string }) => (
  <div className="my-14 py-10 px-8 md:px-12 border-t-2 border-b-2 border-[#bb9457]/40 bg-gradient-to-b from-[#bb9457]/5 to-transparent">
    <div className="max-w-3xl mx-auto text-center">
      <div className="text-5xl font-serif text-[#bb9457]/30 leading-none mb-3">&ldquo;</div>
      <p className="font-serif text-xl md:text-2xl lg:text-3xl text-white italic leading-relaxed mb-5">
        {quote}
      </p>
      {author && (
        <cite className="block not-italic">
          <span className="text-[#bb9457] font-medium">{author}</span>
          {role && <span className="text-neutral-500 text-sm ml-2">&mdash; {role}</span>}
        </cite>
      )}
    </div>
  </div>
)

export const HighlightCard = ({ title, children, variant = 'default' }: {
  title: string; children: React.ReactNode; variant?: 'default' | 'warning' | 'success' | 'info'
}) => {
  const borderColors = { default: 'border-[#bb9457]', warning: 'border-amber-500', success: 'border-emerald-500', info: 'border-blue-500' }
  return (
    <div className={`my-10 p-7 bg-neutral-900/50 border-l-4 ${borderColors[variant]} backdrop-blur-sm`}>
      <div className="text-[10px] uppercase tracking-[0.3em] text-[#bb9457] font-mono font-semibold mb-3">{title}</div>
      <div className="text-neutral-300 leading-relaxed">{children}</div>
    </div>
  )
}

export const StatisticsCard = ({ stats }: { stats: { value: string; label: string }[] }) => (
  <div className="my-12 p-8 bg-gradient-to-br from-neutral-900 to-neutral-950 border border-neutral-800">
    <div className="text-[10px] uppercase tracking-[0.3em] text-[#bb9457] font-mono font-semibold mb-8">Key Statistics</div>
    <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
      {stats.map((stat, i) => (
        <div key={i} className="text-center">
          <div className="text-3xl md:text-4xl font-serif text-[#bb9457] mb-2">{stat.value}</div>
          <div className="text-xs text-neutral-500 uppercase tracking-wider">{stat.label}</div>
        </div>
      ))}
    </div>
  </div>
)

export const Checklist = ({ items }: { items: string[] }) => (
  <div className="my-10 p-7 bg-neutral-900/30 border border-neutral-800">
    <div className="text-[10px] uppercase tracking-[0.3em] text-[#bb9457] font-mono font-semibold mb-5">Checklist</div>
    <ul className="space-y-3">
      {items.map((item, i) => (
        <li key={i} className="flex items-start gap-3 text-neutral-300">
          <div className="flex-shrink-0 w-5 h-5 rounded-sm border-2 border-[#bb9457]/50 flex items-center justify-center mt-0.5">
            <svg className="w-3.5 h-3.5 text-[#bb9457]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
            </svg>
          </div>
          <span className="leading-relaxed">{item}</span>
        </li>
      ))}
    </ul>
  </div>
)

export const ArticleCTA = ({ title, description, buttons }: {
  title: string; description: string;
  buttons: { text: string; link: string; variant?: 'primary' | 'secondary' | 'outline' }[]
}) => (
  <div className="relative p-10 md:p-14 border border-[#bb9457]/30 text-center overflow-hidden">
    <div className="absolute inset-0 bg-gradient-to-br from-[#bb9457]/10 via-neutral-900/50 to-neutral-950" />
    <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,rgba(187,148,87,0.15),transparent_60%)]" />
    <div className="relative max-w-2xl mx-auto">
      <span className="inline-flex items-center gap-2 text-[#bb9457] uppercase tracking-[0.3em] text-[9px] font-mono font-semibold mb-5">
        <span className="w-1.5 h-1.5 bg-[#bb9457] rounded-full animate-pulse" />
        Get Involved
      </span>
      <h3 className="font-serif text-2xl md:text-3xl text-white mb-4 tracking-tight">{title}</h3>
      <p className="text-neutral-400 mb-8 leading-relaxed font-light">{description}</p>
      <div className="flex flex-wrap justify-center gap-3">
        {buttons.map((btn, i) => (
          <Link key={i} to={btn.link}
            className={`inline-flex items-center gap-2 px-6 py-3 text-[10px] uppercase tracking-[0.2em] font-semibold rounded-sm transition-all duration-300 ${
              btn.variant === 'secondary' ? 'bg-neutral-800 text-white hover:bg-neutral-700'
              : btn.variant === 'outline' ? 'border border-neutral-700 text-neutral-300 hover:border-[#bb9457]/40 hover:text-[#bb9457]'
              : 'bg-[#bb9457] text-black hover:bg-white'
            }`}>
            {btn.text}
            <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </Link>
        ))}
      </div>
    </div>
  </div>
)

// ====== BlogPost Page ======

const BlogPost = () => {
  const { slug } = useParams<{ slug: string }>()
  const navigate = useNavigate()
  const [post, setPost] = useState<(BlogPost & { category?: BlogCategory | null }) | null>(null)
  const [relatedPosts, setRelatedPosts] = useState<(BlogPost & { category?: BlogCategory | null })[]>([])
  const [loading, setLoading] = useState(true)
  const [scrollProgress, setScrollProgress] = useState(0)
  const [copied, setCopied] = useState(false)
  const [mobileTocOpen, setMobileTocOpen] = useState(false)

  useEffect(() => {
    if (slug) fetchPost()
  }, [slug])

  const isMarkdown = (content: string) =>
    /^#{1,6}\s|\*\*[^*]+\*\*|^-\s|\[.*\]\(.*\)/m.test(content)

  // Convert content to HTML
  const rawHtml = useMemo(() => {
    if (!post?.content) return ''
    return isMarkdown(post.content) ? markdownToHtml(post.content) : post.content
  }, [post?.content])

  // Extract TOC headings + inject IDs into heading HTML
  const { htmlContent, tableOfContents } = useMemo(() => {
    if (!rawHtml) return { htmlContent: '', tableOfContents: [] as { id: string; text: string; level: number }[] }
    const headings: { id: string; text: string; level: number }[] = []
    let index = 0
    const injected = rawHtml.replace(/<(h[2-3])([^>]*)>(.*?)<\/\1>/gi, (_match, tag, attrs, content) => {
      const id = `heading-${index}`
      const text = content.replace(/<[^>]+>/g, '')
      headings.push({ id, text, level: parseInt(tag.charAt(1)) })
      index++
      return `<${tag}${attrs} id="${id}">${content}</${tag}>`
    })
    return { htmlContent: injected, tableOfContents: headings }
  }, [rawHtml])

  // Scroll progress
  useEffect(() => {
    const onScroll = () => {
      const total = document.documentElement.scrollHeight - window.innerHeight
      setScrollProgress(total > 0 ? (window.scrollY / total) * 100 : 0)
    }
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const fetchPost = async () => {
    setLoading(true)
    try {
      const { data, error } = await supabase
        .from('blog_posts')
        .select('*, category:blog_categories(id, name, slug)')
        .eq('slug', slug)
        .eq('status', 'published')
        .single()

      if (error || !data) { navigate('/blog'); return }
      setPost(data)

      // Increment views
      await supabase.from('blog_posts').update({ views: (data.views || 0) + 1 }).eq('id', data.id)

      // Related posts (same category)
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

  const handleCopyLink = () => {
    navigator.clipboard.writeText(window.location.href)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <div className="text-center">
          <div className="w-10 h-10 mx-auto mb-3 rounded-full bg-[#bb9457]/20 flex items-center justify-center">
            <div className="w-4 h-4 border-2 border-[#bb9457] border-t-transparent rounded-full animate-spin" />
          </div>
          <p className="text-[10px] uppercase tracking-[0.3em] text-[#bb9457] font-mono font-semibold">Loading</p>
        </div>
      </div>
    )
  }

  if (!post) return null

  const publishDate = new Date(post.published_at || post.created_at)
  const heroImage = post.banner_image_url || post.featured_image_url

  const articleSchema = {
    "@context": "https://schema.org",
    "@type": "Article",
    "headline": post.title,
    "description": post.excerpt || post.content.substring(0, 160),
    "image": heroImage,
    "author": { "@type": "Person", "name": post.author_name },
    "publisher": {
      "@type": "Organization",
      "name": "Adorzia",
      "logo": { "@type": "ImageObject", "url": "https://adorzia.com/logo.png" },
      "url": "https://adorzia.com",
      "sameAs": ["https://instagram.com/adorziaofficial", "https://linkedin.com/company/adorzia"]
    },
    "datePublished": publishDate.toISOString(),
    "dateModified": post.updated_at,
    "mainEntityOfPage": { "@type": "WebPage", "@id": `https://adorzia.com/blog/${post.slug}` },
    ...(post.reading_time ? { "timeRequired": `PT${post.reading_time}M` } : {}),
    ...(post.category ? { "articleSection": post.category.name } : {}),
    ...(post.tags && post.tags.length > 0 ? { "keywords": post.tags.join(', ') } : {})
  }

  return (
    <div className="min-h-screen bg-black text-neutral-100 font-sans antialiased">
      <Helmet>
        <title>{post.meta_title || `${post.title} — Adorzia Journal`}</title>
        <meta name="description" content={post.meta_description || post.excerpt || ''} />
        <meta name="robots" content="index, follow" />
        <meta name="language" content="English" />
        <link rel="canonical" href={`https://adorzia.com/blog/${post.slug}`} />
        <meta property="og:type" content="article" />
        <meta property="og:title" content={post.meta_title || post.title} />
        <meta property="og:description" content={post.meta_description || post.excerpt || ''} />
        <meta property="og:image" content={heroImage || ''} />
        <meta property="og:image:alt" content={post.title} />
        <meta property="og:locale" content="en_US" />
        <meta property="og:site_name" content="Adorzia" />
        <meta property="article:published_time" content={publishDate.toISOString()} />
        <meta property="article:author" content="Adorzia" />
        {post.category && <meta property="article:section" content={post.category.name} />}
        {post.tags?.map(tag => <meta key={tag} property="article:tag" content={tag} />)}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={post.title} />
        <meta name="twitter:description" content={post.excerpt || ''} />
        {heroImage && <meta name="twitter:image" content={heroImage} />}
        <script type="application/ld+json">{JSON.stringify(articleSchema)}</script>
      </Helmet>
      <Breadcrumb currentPage={post.title} />

      {/* Reading Progress */}
      <div className="fixed top-0 left-0 right-0 h-[2px] bg-neutral-900/50 z-50">
        <div className="h-full bg-gradient-to-r from-[#bb9457] to-[#d4b87a] transition-all duration-150 ease-out" style={{ width: `${scrollProgress}%` }} />
      </div>

      {/* ====== HERO HEADER ====== */}
      <header className="max-w-3xl mx-auto px-4 sm:px-6 pt-12 sm:pt-16 pb-8">
        {/* Back */}
        <Link to="/blog" className="inline-flex items-center gap-2 text-neutral-400 hover:text-[#bb9457] transition-colors mb-8 text-xs uppercase tracking-[0.15em] font-semibold group">
          <svg className="w-4 h-4 transition-transform group-hover:-translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
          Back to Journal
        </Link>

        {/* Category */}
        {post.category && (
          <Link to={`/blog/category/${post.category.slug}`}
            className="inline-flex items-center gap-2 text-[#bb9457] uppercase tracking-[0.25em] text-[9px] font-mono font-semibold mb-5 hover:underline decoration-[#bb9457]/30">
            <span className="w-1 h-1 bg-[#bb9457] rounded-full" />
            {post.category.name}
          </Link>
        )}

        {/* Title */}
        <h1 className="font-serif text-3xl sm:text-4xl md:text-5xl text-white tracking-tight leading-[1.1] mb-6">
          {post.title}
        </h1>

        {/* Subtitle */}
        {post.excerpt && (
          <p className="text-lg text-neutral-400 leading-relaxed mb-8 font-light">
            {post.excerpt}
          </p>
        )}

        {/* Meta row */}
        <div className="flex flex-wrap items-center gap-5 pb-8 border-b border-neutral-800">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-[#bb9457]/20 border border-[#bb9457]/30 flex items-center justify-center shrink-0">
              {post.author_image_url ? (
                <img src={post.author_image_url} alt={post.author_name} className="w-full h-full rounded-full object-cover" />
              ) : (
                <span className="text-[#bb9457] font-serif font-bold text-sm">{post.author_name.charAt(0)}</span>
              )}
            </div>
            <div>
              <div className="text-white font-medium text-sm">{post.author_name}</div>
              <div className="text-[10px] text-neutral-400 uppercase tracking-wider">Author</div>
            </div>
          </div>
          <div className="h-7 w-px bg-neutral-800 hidden sm:block" />
          <div className="hidden sm:block">
            <div className="text-white font-medium text-sm">{publishDate.toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}</div>
            <div className="text-[10px] text-neutral-400 uppercase tracking-wider">Published</div>
          </div>
          <div className="h-7 w-px bg-neutral-800 hidden sm:block" />
          <div className="flex items-center gap-2">
            <svg className="w-4 h-4 text-[#bb9457]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <div>
              <div className="text-white font-medium text-sm">{post.reading_time} min</div>
              <div className="text-[10px] text-neutral-400 uppercase tracking-wider">Read</div>
            </div>
          </div>
        </div>
      </header>

      {/* ====== FEATURED IMAGE ====== */}
      {heroImage && (
        <div className="max-w-4xl mx-auto px-4 sm:px-6 mb-12">
          <div className="relative aspect-[16/9] overflow-hidden rounded-sm border border-neutral-800">
            <img src={heroImage} alt={post.title} className="w-full h-full object-cover" fetchPriority="high" decoding="sync" />
            <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
          </div>
        </div>
      )}

      {/* ====== MOBILE TOC ====== */}
      {tableOfContents.length > 0 && (
        <div className="lg:hidden max-w-3xl mx-auto px-4 sm:px-6 mb-8">
          <button onClick={() => setMobileTocOpen(!mobileTocOpen)}
            className="w-full flex items-center justify-between p-4 border border-neutral-800 rounded-sm bg-neutral-950/50">
            <span className="flex items-center gap-2 text-[10px] uppercase tracking-[0.2em] text-[#bb9457] font-mono font-semibold">
              <span className="w-1.5 h-1.5 bg-[#bb9457] rounded-full" />
              In This Article ({tableOfContents.length})
            </span>
            <svg className={`w-4 h-4 text-neutral-500 transition-transform ${mobileTocOpen ? 'rotate-180' : ''}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
            </svg>
          </button>
          {mobileTocOpen && (
            <nav className="mt-2 p-4 border border-neutral-800 rounded-sm bg-neutral-950/50 space-y-2">
              {tableOfContents.map((h, i) => (
                <a key={i} href={`#${h.id}`} onClick={() => setMobileTocOpen(false)}
                  className={`block transition-colors hover:text-[#bb9457] ${h.level === 2 ? 'text-sm text-neutral-300 font-medium' : 'text-xs text-neutral-500 pl-4'}`}>
                  {h.text}
                </a>
              ))}
            </nav>
          )}
        </div>
      )}

      {/* ====== CONTENT LAYOUT ====== */}
      <div className="max-w-[1200px] mx-auto px-4 sm:px-6 pb-20">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">

          {/* TOC Sidebar (Desktop) */}
          {tableOfContents.length > 0 && (
            <aside className="hidden lg:block lg:col-span-3">
              <div className="sticky top-24">
                <div className="p-5 border border-neutral-800 rounded-sm bg-neutral-950/50">
                  <div className="flex items-center gap-2 mb-4">
                    <span className="w-1.5 h-1.5 bg-[#bb9457] rounded-full" />
                    <span className="text-[9px] uppercase tracking-[0.3em] text-[#bb9457] font-mono font-semibold">In This Article</span>
                  </div>
                  <nav className="space-y-2">
                    {tableOfContents.map((h, i) => (
                      <a key={i} href={`#${h.id}`}
                        className={`block text-sm transition-colors hover:text-[#bb9457] group ${
                          h.level === 2 ? 'text-neutral-300 font-medium' : 'text-neutral-500 pl-4 text-xs'
                        }`}>
                        <span className="inline-block mr-2 text-[#bb9457] opacity-0 group-hover:opacity-100 transition-opacity text-xs">&rarr;</span>
                        {h.text}
                      </a>
                    ))}
                  </nav>
                </div>
              </div>
            </aside>
          )}

          {/* Article Content */}
          <article className={`${tableOfContents.length > 0 ? 'lg:col-span-9' : 'lg:col-span-8 lg:col-start-3'}`}>

            {/* Prose Body */}
            <div className="prose prose-invert prose-adlorzia" dangerouslySetInnerHTML={{ __html: htmlContent }} />

            {/* ====== TAGS ====== */}
            {post.tags && post.tags.length > 0 && (
              <div className="mt-14 pt-6 border-t border-neutral-900">
                <span className="text-[9px] uppercase tracking-[0.3em] text-neutral-500 font-mono font-semibold block mb-3">Tags</span>
                <div className="flex flex-wrap gap-2">
                  {post.tags.map(tag => (
                    <span key={tag} className="px-3 py-1.5 bg-neutral-900/50 border border-neutral-800 text-neutral-400 text-[10px] uppercase tracking-wider rounded-sm hover:border-[#bb9457]/30 hover:text-[#bb9457] transition-colors cursor-default">
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {/* ====== SHARE ====== */}
            <div className="mt-8 pt-6 border-t border-neutral-900">
              <div className="flex items-center justify-between">
                <span className="text-[9px] uppercase tracking-[0.3em] text-neutral-500 font-mono font-semibold">Share</span>
                <div className="flex items-center gap-2">
                  <a href={`https://twitter.com/intent/tweet?text=${encodeURIComponent(post.title)}&url=${encodeURIComponent(`https://adorzia.com/blog/${post.slug}`)}`}
                    target="_blank" rel="noopener noreferrer" aria-label="Share on X"
                    className="w-9 h-9 rounded-full border border-neutral-800 flex items-center justify-center text-neutral-400 hover:border-[#bb9457] hover:text-[#bb9457] transition-all duration-300">
                    <svg className="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                    </svg>
                  </a>
                  <a href={`https://www.linkedin.com/shareArticle?mini=true&url=${encodeURIComponent(`https://adorzia.com/blog/${post.slug}`)}&title=${encodeURIComponent(post.title)}`}
                    target="_blank" rel="noopener noreferrer" aria-label="Share on LinkedIn"
                    className="w-9 h-9 rounded-full border border-neutral-800 flex items-center justify-center text-neutral-400 hover:border-[#bb9457] hover:text-[#bb9457] transition-all duration-300">
                    <svg className="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                    </svg>
                  </a>
                  <button onClick={handleCopyLink} aria-label="Copy link"
                    className="w-9 h-9 rounded-full border border-neutral-800 flex items-center justify-center text-neutral-400 hover:border-[#bb9457] hover:text-[#bb9457] transition-all duration-300">
                    {copied ? (
                      <svg className="w-3.5 h-3.5 text-[#bb9457]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                    ) : (
                      <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
                      </svg>
                    )}
                  </button>
                </div>
              </div>
            </div>

            {/* ====== AUTHOR BIO ====== */}
            <div className="mt-10 p-6 border border-neutral-800 rounded-sm bg-neutral-950/50">
              <div className="flex items-start gap-5">
                <div className="w-16 h-16 bg-[#bb9457]/20 border border-[#bb9457]/30 rounded-full flex items-center justify-center shrink-0">
                  {post.author_image_url ? (
                    <img src={post.author_image_url} alt={post.author_name} className="w-full h-full rounded-full object-cover" />
                  ) : (
                    <span className="text-[#bb9457] font-serif text-xl">{post.author_name.charAt(0)}</span>
                  )}
                </div>
                <div>
                  <p className="text-[9px] text-neutral-400 uppercase tracking-[0.3em] font-mono font-semibold mb-1.5">About the Author</p>
                  <p className="text-white font-serif text-lg mb-2">{post.author_name}</p>
                  <p className="text-sm text-neutral-400 leading-relaxed mb-3">Covering Pakistani fashion entrepreneurship, design education, heritage craft preservation, and the emerging creative economy.</p>
                  <Link to="/blog" className="text-[10px] uppercase tracking-[0.15em] text-[#bb9457] font-semibold hover:underline">View all articles &rarr;</Link>
                </div>
              </div>
            </div>
          </article>
        </div>
      </div>

      {/* ====== RELATED POSTS ====== */}
      {relatedPosts.length > 0 && (
        <section className="relative py-20 sm:py-28 border-t border-neutral-900 overflow-hidden">
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(187,148,87,0.05),transparent_60%)]" />
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            <div className="mb-10">
              <span className="inline-flex items-center gap-2 text-[#bb9457] uppercase tracking-[0.3em] text-[9px] font-mono font-semibold mb-3">
                <span className="w-1 h-1 bg-[#bb9457] rounded-full" />
                Related Content
              </span>
              <h2 className="font-serif text-2xl sm:text-3xl text-white font-normal tracking-tight">
                More in {post.category?.name || 'This Category'}
              </h2>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
              {relatedPosts.map(r => (
                <Link key={r.id} to={`/blog/${r.slug}`} className="group">
                  <article>
                    <div className="aspect-[16/10] overflow-hidden bg-neutral-900 rounded-sm border border-neutral-800 group-hover:border-[#bb9457]/40 transition-all duration-500 mb-4">
                      {r.featured_image_url ? (
                        <img src={r.featured_image_url} alt={r.title} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" loading="lazy" />
                      ) : (
                        <div className="w-full h-full bg-gradient-to-br from-neutral-800 to-neutral-900 flex items-center justify-center">
                          <svg className="w-7 h-7 text-neutral-800" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253" />
                          </svg>
                        </div>
                      )}
                    </div>
                    {r.category && (
                      <span className="inline-block text-[#bb9457] uppercase tracking-[0.2em] text-[8px] font-mono font-semibold mb-1.5">{r.category.name}</span>
                    )}
                    <h3 className="font-serif text-base text-white group-hover:text-[#bb9457] transition-colors duration-300 line-clamp-2">{r.title}</h3>
                    {r.excerpt && <p className="mt-1.5 text-xs text-neutral-500 font-light leading-relaxed line-clamp-2">{r.excerpt}</p>}
                    <p className="mt-2 text-[10px] text-neutral-600 font-light uppercase tracking-wider">
                      {new Date(r.published_at || r.created_at).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })} &middot; {r.reading_time} min
                    </p>
                  </article>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ====== CTA ====== */}
      <section className="relative py-20 sm:py-28 border-t border-neutral-900 overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(187,148,87,0.06),transparent_60%)]" />
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <ArticleCTA
            title="Be Part of Pakistan's Fashion Future"
            description="Whether you're a designer ready to scale, a creative seeking incubation, or a partner looking to invest — Adorzia is your gateway."
            buttons={[
              { text: 'Explore Designers', link: '/designers', variant: 'primary' },
              { text: 'Join Adorzia', link: '/fashionpreneurship', variant: 'secondary' },
              { text: 'Partner With Us', link: '/for-partners', variant: 'outline' },
            ]}
          />
        </div>
      </section>
    </div>
  )
}

export default BlogPost
