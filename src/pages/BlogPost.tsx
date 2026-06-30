import { useEffect, useState } from 'react'
import { useParams, Link, useNavigate } from 'react-router-dom'
import { Helmet } from 'react-helmet-async'
import { supabase } from '../lib/supabase'
import type { BlogPost, BlogCategory } from '../types/database'

const BlogPost = () => {
  const { slug } = useParams<{ slug: string }>()
  const navigate = useNavigate()
  const [post, setPost] = useState<(BlogPost & { category?: BlogCategory | null }) | null>(null)
  const [relatedPosts, setRelatedPosts] = useState<(BlogPost & { category?: BlogCategory | null })[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (slug) fetchPost()
  }, [slug])

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
      <article className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
        {/* Back Link */}
        <Link to="/blog" className="inline-flex items-center gap-2 text-neutral-500 hover:text-[#bb9457] transition-colors mb-8 text-sm">
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
          Back to Journal
        </Link>

        {/* Header */}
        <header className="mb-10">
          {post.category && (
            <Link
              to={`/blog/category/${post.category.slug}`}
              className="inline-block text-[#bb9457] text-xs uppercase tracking-wider font-semibold mb-4 hover:underline"
            >
              {post.category.name}
            </Link>
          )}
          <h1 className="font-serif text-3xl sm:text-4xl md:text-5xl text-white tracking-tight leading-tight">
            {post.title}
          </h1>
          {post.excerpt && (
            <p className="mt-6 text-lg sm:text-xl text-neutral-400 leading-relaxed">
              {post.excerpt}
            </p>
          )}

          {/* Meta */}
          <div className="mt-8 flex flex-wrap items-center gap-4 text-sm text-neutral-500 border-t border-b border-neutral-800 py-4">
            <span className="font-medium text-neutral-300">{post.author_name}</span>
            <span className="w-1 h-1 bg-neutral-700 rounded-full" />
            <time dateTime={publishDate.toISOString()}>
              {publishDate.toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}
            </time>
            <span className="w-1 h-1 bg-neutral-700 rounded-full" />
            <span>{post.reading_time} min read</span>
            {post.views > 0 && (
              <>
                <span className="w-1 h-1 bg-neutral-700 rounded-full" />
                <span>{post.views} views</span>
              </>
            )}
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

        {/* Content */}
        <div className="prose prose-invert prose-lg max-w-none">
          {post.content.split('\n\n').map((paragraph, index) => {
            // Handle headings (lines starting with #)
            if (paragraph.startsWith('# ')) {
              return <h2 key={index} className="text-2xl font-serif text-white mt-10 mb-4">{paragraph.replace('# ', '')}</h2>
            }
            if (paragraph.startsWith('## ')) {
              return <h3 key={index} className="text-xl font-serif text-white mt-8 mb-3">{paragraph.replace('## ', '')}</h3>
            }
            // Handle bullet points
            if (paragraph.startsWith('- ')) {
              const items = paragraph.split('\n').map(line => line.replace('- ', ''))
              return (
                <ul key={index} className="list-disc list-inside space-y-2 my-4 text-neutral-300">
                  {items.map((item, i) => <li key={i}>{item}</li>)}
                </ul>
              )
            }
            // Regular paragraph
            return (
              <p key={index} className="text-neutral-300 leading-relaxed mb-6">
                {paragraph}
              </p>
            )
          })}
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

      {/* Related Posts */}
      {relatedPosts.length > 0 && (
        <section className="border-t border-neutral-900 bg-neutral-950 py-16 sm:py-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="font-serif text-2xl sm:text-3xl text-white mb-10">
              More in {post.category?.name || 'This Category'}
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
              {relatedPosts.map(related => (
                <Link
                  key={related.id}
                  to={`/blog/${related.slug}`}
                  className="group"
                >
                  <article>
                    <div className="aspect-[4/3] overflow-hidden bg-neutral-900 mb-4">
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
