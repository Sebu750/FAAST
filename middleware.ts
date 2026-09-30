// Vercel Edge Middleware — injects page-specific meta tags for social crawlers
// For non-crawler requests, passes through with zero overhead.

// ── Crawler detection ──────────────────────────────────────────────
const CRAWLER_UAS = [
  'facebookexternalhit', 'twitterbot', 'linkedinbot', 'whatsapp',
  'telegrambot', 'slackbot', 'discordbot', 'googlebot', 'bingbot',
  'applebot', 'baiduspider', 'yandexbot', 'duckduckbot',
  'pinterestbot', 'redditbot', 'embedly', 'outbrain', 'feedfetcher',
  'preview', 'prerender',
]

function isCrawler(ua: string): boolean {
  const lower = ua.toLowerCase()
  return CRAWLER_UAS.some(bot => lower.includes(bot))
}

// ── Supabase helpers ───────────────────────────────────────────────
const SUPABASE_URL = 'https://qchqwxoaqzdfalkeitpj.supabase.co'
const SUPABASE_ANON = 'sb_publishable_vt1viH8p6POzb5rMckVqeg_ZFbYvhUn'

async function querySupabase(table: string, select: string, filter: string): Promise<any> {
  const url = `${SUPABASE_URL}/rest/v1/${table}?${filter}&select=${select}`
  try {
    const res = await fetch(url, {
      headers: { 'apikey': SUPABASE_ANON, 'Authorization': `Bearer ${SUPABASE_ANON}` },
    })
    if (!res.ok) return null
    const data = await res.json()
    return Array.isArray(data) ? data[0] || null : data
  } catch { return null }
}

// ── Static page metadata ───────────────────────────────────────────
const DEFAULT_OG = 'https://adorzia.com/og-image.jpeg'

interface PageMeta { title: string; description: string; image: string; ogType: string }

const CATEGORY_NAMES: Record<string, string> = {
  'fashion-startups': 'Fashion Startups', designers: 'Designers', collections: 'Collections',
  universities: 'Universities', 'fashion-business': 'Fashion Business',
  'branding-marketing': 'Branding & Marketing', 'industry-insights': 'Industry Insights',
  resources: 'Resources', opportunities: 'Opportunities', 'adorzia-journal': 'Adorzia Journal',
}

const STATIC_PAGES: Record<string, PageMeta> = {
  '/': { title: 'Adorzia - Where Visionaries Rise | Pakistani Fashion Ecosystem', description: "Pakistan's first complete fashion entrepreneurship ecosystem. Studios. Marketplace. Spotlight.", image: DEFAULT_OG, ogType: 'website' },
  '/about': { title: 'About Adorzia - Building Pakistan\'s Fashion Entrepreneurship Ecosystem', description: 'Building Pakistan\'s first fashion entrepreneurship ecosystem. Discover our story, team, and the ecosystem for emerging fashion designers.', image: DEFAULT_OG, ogType: 'website' },
  '/fashionpreneurship': { title: 'Fashionpreneurship in Pakistan - Build Your Fashion Brand with Adorzia', description: 'Build your brand. Connect with the industry. Access resources. Grow your fashion career with Adorzia.', image: DEFAULT_OG, ogType: 'website' },
  '/for-partners': { title: 'Partnerships - Collaborate with Adorzia to Shape Pakistan\'s Fashion Future', description: 'Manufacturers, artisans, institutions, investors, brands, and media — Adorzia is the ecosystem where fashion partnerships create lasting value.', image: DEFAULT_OG, ogType: 'website' },
  '/designers': { title: 'Designers Directory — Adorzia | Pakistan\'s Emerging Fashion Designers', description: 'Discover and connect with Pakistan\'s most visionary emerging fashion designers. Browse curated profiles, collections, and stories.', image: DEFAULT_OG, ogType: 'website' },
  '/marketplace': { title: 'Adorzia Marketplace - Buy and Sell Pakistani Fashion and Heritage Craft Online', description: 'The world\'s first curated destination for Pakistani fashion creativity. Contemporary designers and heritage craft. Coming soon.', image: DEFAULT_OG, ogType: 'website' },
  '/blog': { title: 'Journal — Adorzia | Pakistani Fashion Journalism & Industry Insights', description: 'Explore in-depth stories on Pakistani fashion entrepreneurship, heritage craft preservation, emerging designer spotlights, and industry insights.', image: DEFAULT_OG, ogType: 'website' },
  '/contact': { title: 'Contact Adorzia', description: "Get in touch with Adorzia. Whether you're a designer, emerging brand, institution, investor, or potential partner, we'd love to hear from you.", image: DEFAULT_OG, ogType: 'website' },
}

// ── Resolve dynamic page metadata ──────────────────────────────────
async function getPageMeta(pathname: string): Promise<PageMeta | null> {
  if (STATIC_PAGES[pathname]) return STATIC_PAGES[pathname]

  // Blog post: /blog/:slug
  const blogMatch = pathname.match(/^\/blog\/([^/]+)$/)
  if (blogMatch) {
    const post = await querySupabase('blog_posts', 'title,excerpt,banner_image_url,featured_image_url', `slug=eq.${encodeURIComponent(blogMatch[1])}`)
    if (post) {
      return { title: `${post.title} — Adorzia Journal`, description: post.excerpt || post.title, image: post.banner_image_url || post.featured_image_url || DEFAULT_OG, ogType: 'article' }
    }
  }

  // Blog category: /blog/category/:category
  const catMatch = pathname.match(/^\/blog\/category\/([^/]+)$/)
  if (catMatch) {
    const catName = CATEGORY_NAMES[catMatch[1]] || catMatch[1].split('-').map((w: string) => w.charAt(0).toUpperCase() + w.slice(1)).join(' ')
    return { title: `${catName} — Adorzia Journal`, description: `Read ${catName} articles on Adorzia Journal — Pakistani fashion entrepreneurship, heritage craft, and emerging designers.`, image: DEFAULT_OG, ogType: 'website' }
  }

  // Designer profile: /designers/:slug
  const designerMatch = pathname.match(/^\/designers\/([^/]+)$/)
  if (designerMatch) {
    const d = await querySupabase('designers', 'name,short_bio,image_url,cover_image_url', `slug=eq.${encodeURIComponent(designerMatch[1])}`)
    if (d) {
      return { title: `${d.name} — Adorzia`, description: d.short_bio || `Discover ${d.name}, a Pakistani fashion designer on Adorzia.`, image: d.cover_image_url || d.image_url || DEFAULT_OG, ogType: 'profile' }
    }
  }

  return null
}

// ── Escape HTML attribute value ────────────────────────────────────
function esc(s: string): string { return s.replace(/&/g, '&amp;').replace(/"/g, '&quot;').replace(/</g, '&lt;').replace(/>/g, '&gt;') }

// ── Inject meta tags into HTML ─────────────────────────────────────
function injectMetaTags(html: string, meta: PageMeta, canonicalUrl: string): string {
  const t = esc(meta.title)
  const d = esc(meta.description)
  const img = meta.image

  // Replace default <title>
  html = html.replace(/<title>[^<]*<\/title>/, `<title>${t}</title>`)
  // Replace default meta description
  html = html.replace(/<meta name="description" content="[^"]*" \/>/, `<meta name="description" content="${d}" />`)
  // Replace default canonical
  html = html.replace(/<link rel="canonical" href="[^"]*" \/>/, `<link rel="canonical" href="${canonicalUrl}" />`)
  // Replace OG tags
  html = html.replace(/<meta property="og:title" content="[^"]*" \/>/, `<meta property="og:title" content="${t}" />`)
  html = html.replace(/<meta property="og:description" content="[^"]*" \/>/, `<meta property="og:description" content="${d}" />`)
  html = html.replace(/<meta property="og:image" content="[^"]*" \/>/, `<meta property="og:image" content="${img}" />`)
  html = html.replace(/<meta property="og:url" content="[^"]*" \/>/, `<meta property="og:url" content="${canonicalUrl}" />`)
  html = html.replace(/<meta property="og:type" content="[^"]*" \/>/, `<meta property="og:type" content="${meta.ogType}" />`)
  // Replace Twitter tags
  html = html.replace(/<meta name="twitter:title" content="[^"]*" \/>/, `<meta name="twitter:title" content="${t}" />`)
  html = html.replace(/<meta name="twitter:description" content="[^"]*" \/>/, `<meta name="twitter:description" content="${d}" />`)
  html = html.replace(/<meta name="twitter:image" content="[^"]*" \/>/, `<meta name="twitter:image" content="${img}" />`)

  return html
}

// ── Middleware handler ──────────────────────────────────────────────
export default async function middleware(request: Request): Promise<Response> {
  const ua = request.headers.get('user-agent') || ''

  // Let non-crawlers through immediately — zero overhead for real users
  if (!isCrawler(ua)) {
    return fetch(new URL(request.url))
  }

  const url = new URL(request.url)
  const pathname = url.pathname

  // Fetch page metadata
  const meta = await getPageMeta(pathname)
  if (!meta) {
    return fetch(new URL(request.url))
  }

  // Fetch the HTML shell
  const origin = url.origin
  const response = await fetch(`${origin}/`)
  let html = await response.text()

  // Inject page-specific meta tags
  const fullUrl = `https://adorzia.com${pathname}`
  html = injectMetaTags(html, meta, fullUrl)

  return new Response(html, {
    status: 200,
    headers: {
      'content-type': 'text/html; charset=utf-8',
      'cache-control': 'public, max-age=60, s-maxage=300',
      'x-prerendered': 'true',
    },
  })
}

export const config = {
  matcher: ['/((?!_next/static|_next/image|favicon|icons\\.svg|api/).*)'],
}
