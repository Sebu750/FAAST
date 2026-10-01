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

interface PageMeta { title: string; description: string; image: string; ogType: string; seoContent?: string }

const CATEGORY_NAMES: Record<string, string> = {
  'fashion-startups': 'Fashion Startups', designers: 'Designers', collections: 'Collections',
  universities: 'Universities', 'fashion-business': 'Fashion Business',
  'branding-marketing': 'Branding & Marketing', 'industry-insights': 'Industry Insights',
  resources: 'Resources', opportunities: 'Opportunities', 'adorzia-journal': 'Adorzia Journal',
}

// ── Shared SEO content helpers ────────────────────────────────────
const SEO_NAV = '<nav><a href="/about">About</a> | <a href="/designers">Designers</a> | <a href="/fashionpreneurship">Fashionpreneurship</a> | <a href="/blog">Journal</a> | <a href="/contact">Contact</a> | <a href="/for-partners">Partners</a> | <a href="/marketplace">Marketplace</a></nav>'

function buildSeoDiv(inner: string): string {
  return `<div style="position:absolute;width:1px;height:1px;padding:0;margin:-1px;overflow:hidden;clip:rect(0,0,0,0);border:0">${inner}${SEO_NAV}</div>`
}

const STATIC_PAGES: Record<string, PageMeta> = {
  '/': {
    title: 'Adorzia - Where Visionaries Rise | Pakistan Fashion',
    description: "Adorzia is Pakistan's first fashion entrepreneurship ecosystem \u2014 studios, marketplace, and Spotlight talent investment.",
    image: DEFAULT_OG,
    ogType: 'website',
    seoContent: `<div style="position:absolute;width:1px;height:1px;padding:0;margin:-1px;overflow:hidden;clip:rect(0,0,0,0);border:0"><h1>Adorzia \u2014 Pakistan\u2019s First Fashion Entrepreneurship Ecosystem</h1><h2>Three Synchronized Modules</h2><p>Adorzia unites coworking studios, a curated designer marketplace, and the annual Spotlight talent investment event into one synchronized ecosystem for emerging fashion talent in Pakistan.</p><h3>Coworking Studios</h3><p>Fashion production studios in Karachi, Lahore, and Islamabad providing emerging designers with manufacturing infrastructure, mentorship, and industry access.</p><h3>Designer Marketplace</h3><p>A curated online marketplace for Pakistani fashion designers to sell contemporary fashion, heritage craft, and limited collections to a global audience.</p><h3>Spotlight Talent Investment</h3><p>The annual Spotlight event identifies and invests in Pakistan\u2019s most promising emerging fashion designers, providing funding, mentorship, and international scale opportunities.</p><h2>About Adorzia</h2><p>Founded by Haseeb Malik in 2025, Adorzia is building Pakistan\u2019s first complete fashion entrepreneurship ecosystem. From application to international scale, Adorzia supports emerging designers at every stage through studios in Karachi, Lahore, and Islamabad, a curated marketplace, and the annual Spotlight talent investment event.</p><nav><a href="/about">About Us</a> | <a href="/designers">Designers Directory</a> | <a href="/fashionpreneurship">Fashionpreneurship</a> | <a href="/blog">Journal</a> | <a href="/contact">Contact</a> | <a href="/for-partners">Partnerships</a> | <a href="/marketplace">Marketplace</a></nav><p>Author: Haseeb Malik, Founder of Adorzia. Address: Karachi, Pakistan. Adorzia operates fashion coworking studios in Karachi, Lahore, and Islamabad.</p></div><script type="application/ld+json">{"@context":"https://schema.org","@type":"Organization","name":"Adorzia","url":"https://adorzia.com","logo":"https://adorzia.com/logo.png","founder":{"@type":"Person","name":"Haseeb Malik"},"foundingDate":"2025","address":{"@type":"PostalAddress","addressLocality":"Karachi","addressCountry":"PK"},"contactPoint":{"@type":"ContactPoint","email":"hello@adorzia.com","contactType":"customer service"},"sameAs":["https://www.instagram.com/adorziaofficial/","https://www.linkedin.com/company/adorzia/","https://www.facebook.com/adorziaofficial","https://x.com/adorziaofficial","https://www.youtube.com/@adorziaofficial"]}</script>`
  },
  '/about': {
    title: 'About Adorzia - Pakistan Fashion Ecosystem',
    description: 'Discover Adorzia, Pakistan\'s first fashion entrepreneurship ecosystem. Our story, team, and mission for emerging fashion designers.',
    image: DEFAULT_OG,
    ogType: 'website',
    seoContent: buildSeoDiv('<h1>About Adorzia</h1><p>Adorzia is Pakistan\'s first fashion entrepreneurship ecosystem, founded by Haseeb Malik in 2025. Our mission is to build a complete support system for emerging fashion designers from application to international scale.</p><h2>Our Mission</h2><p>To create Pakistan\'s first integrated fashion ecosystem that combines coworking studios, a curated marketplace, and the annual Spotlight talent investment event. We believe Pakistani fashion talent deserves world-class infrastructure and global visibility.</p><h2>Our Team</h2><p>Led by founder Haseeb Malik, the Adorzia team brings together fashion industry veterans, business strategists, and creative directors committed to transforming Pakistan\'s fashion landscape.</p><p>Adorzia operates fashion coworking studios in Karachi, Lahore, and Islamabad.</p>') + '<script type="application/ld+json">{"@context":"https://schema.org","@type":"Organization","name":"Adorzia","url":"https://adorzia.com","founder":{"@type":"Person","name":"Haseeb Malik"},"foundingDate":"2025","address":{"@type":"PostalAddress","addressLocality":"Karachi","addressCountry":"PK"},"sameAs":["https://www.instagram.com/adorziaofficial/","https://www.linkedin.com/company/adorzia/","https://www.facebook.com/adorziaofficial","https://x.com/adorziaofficial","https://www.youtube.com/@adorziaofficial"]}</script>'
  },
  '/fashionpreneurship': {
    title: 'Fashionpreneurship Pakistan - Build Your Fashion Brand | Adorzia',
    description: 'Launch your fashion brand with Adorzia. Brand incubation, studio access, and industry connections for emerging Pakistani fashion entrepreneurs.',
    image: DEFAULT_OG,
    ogType: 'website',
    seoContent: buildSeoDiv('<h1>Fashionpreneurship in Pakistan</h1><p>Adorzia\'s Fashionpreneurship pathway is Pakistan\'s first structured program for emerging fashion entrepreneurs. Build your brand from concept to market with comprehensive support.</p><h2>What Fashionpreneurship Offers</h2><ul><li>Brand Incubation: Develop your fashion brand identity, collection, and business model</li><li>Studio Access: Work from fully-equipped fashion production studios in Karachi, Lahore, and Islamabad</li><li>Industry Connection: Access mentors, manufacturers, and retail channels across Pakistan</li></ul><p>Whether you are a recent fashion graduate or an independent designer ready to scale, Fashionpreneurship provides the infrastructure and guidance to grow.</p>') + '<script type="application/ld+json">{"@context":"https://schema.org","@type":"FAQPage","mainEntity":[{"@type":"Question","name":"What is fashionpreneurship?","acceptedAnswer":{"@type":"Answer","text":"Fashionpreneurship is Adorzia\'s integrated pathway combining fashion brand incubation, studio access, and industry connections to help emerging Pakistani fashion entrepreneurs build and scale their brands."}},{"@type":"Question","name":"Who is fashionpreneurship for?","acceptedAnswer":{"@type":"Answer","text":"Fashionpreneurship is for emerging fashion designers, recent fashion graduates, and creative entrepreneurs in Pakistan who want to build a sustainable fashion brand."}},{"@type":"Question","name":"How do I join the fashionpreneurship program?","acceptedAnswer":{"@type":"Answer","text":"Apply through Adorzia\'s fashionpreneurship page. The program includes studio access in Karachi, Lahore, and Islamabad, mentorship, and industry connections."}}]}</script>'
  },
  '/for-partners': {
    title: 'Fashion Partnerships Pakistan - Collaborate with Adorzia',
    description: 'Partner with Adorzia to shape Pakistan\'s fashion future. Opportunities for manufacturers, investors, institutions, brands, media, and artisans.',
    image: DEFAULT_OG,
    ogType: 'website',
    seoContent: buildSeoDiv('<h1>Partnerships with Adorzia</h1><p>Adorzia welcomes partnerships from organizations and individuals committed to advancing Pakistan\'s fashion ecosystem. Together, we can build infrastructure, nurture talent, and bring Pakistani fashion to the global stage.</p><h2>Partnership Types</h2><ul><li>Manufacturers: Provide production capacity and expertise for emerging designers</li><li>Investors: Invest in Pakistan\'s most promising fashion talent through Spotlight</li><li>Educational Institutions: Connect students and faculty to industry resources</li><li>Brands: Collaborate with emerging designers on collections and capsule projects</li><li>Media: Cover Pakistan\'s fashion entrepreneurship story</li><li>Artisans: Bring heritage craft traditions into contemporary fashion</li></ul><p>Every partnership with Adorzia directly supports emerging fashion designers in Pakistan.</p>') + '<script type="application/ld+json">{"@context":"https://schema.org","@type":"FAQPage","mainEntity":[{"@type":"Question","name":"How can I partner with Adorzia?","acceptedAnswer":{"@type":"Answer","text":"Adorzia offers partnership opportunities for manufacturers, investors, educational institutions, brands, media organizations, and artisans. Visit the For Partners page to explore collaboration options."}},{"@type":"Question","name":"What does Adorzia offer partners?","acceptedAnswer":{"@type":"Answer","text":"Partners gain access to Pakistan\'s emerging fashion talent pipeline, studio facilities in Karachi, Lahore, and Islamabad, and the annual Spotlight talent investment event."}}]}</script>'
  },
  '/designers': {
    title: 'Designers Directory - Pakistan Fashion | Adorzia',
    description: 'Browse Pakistan\'s emerging fashion designers. Curated profiles, collections, and stories from Adorzia\'s design directory.',
    image: DEFAULT_OG,
    ogType: 'website',
    seoContent: buildSeoDiv('<h1>Designers Directory</h1><p>Discover Pakistan\'s most visionary emerging fashion designers through the Adorzia directory. Each designer profile showcases their brand story, collections, skills, and creative philosophy.</p><h2>What You Will Find</h2><p>Designer profiles include brand information, location, specialization, biography, philosophy, collections, education, achievements, skills, certifications, and social media links. Designers are based across Pakistan including Karachi, Lahore, and Islamabad.</p><p>The directory features designers working in contemporary fashion, heritage craft, luxury bridal, pret, and experimental fashion.</p>') + '<script type="application/ld+json">{"@context":"https://schema.org","@type":"CollectionPage","name":"Adorzia Designers Directory","description":"Curated directory of Pakistan\'s emerging fashion designers","url":"https://adorzia.com/designers"}</script>'
  },
  '/marketplace': {
    title: 'Pakistani Fashion Marketplace - Adorzia',
    description: 'Adorzia Marketplace: a curated destination for Pakistani fashion. Independent designer brands and heritage craft. Coming soon.',
    image: DEFAULT_OG,
    ogType: 'website',
    seoContent: buildSeoDiv('<h1>Adorzia Marketplace</h1><p>The Adorzia Marketplace is a curated online destination for Pakistani fashion creativity. Browse collections from independent emerging designers and heritage craft artisans.</p><h2>What to Expect</h2><p>The marketplace features contemporary fashion, luxury pret, heritage craft, and limited-edition collections from Pakistan\'s most talented emerging designers. Products span clothing, accessories, and textiles.</p><p>All brands are carefully curated by the Adorzia team to ensure quality, originality, and fair practices. The marketplace supports both independent emerging brands and Adorzia-incubated brands.</p>') + '<script type="application/ld+json">{"@context":"https://schema.org","@type":"Organization","name":"Adorzia Marketplace","url":"https://adorzia.com/marketplace","description":"Curated marketplace for Pakistani fashion"}</script>'
  },
  '/blog': {
    title: 'Journal - Pakistani Fashion Stories | Adorzia',
    description: 'Read Adorzia Journal: Pakistani fashion entrepreneurship stories, heritage craft features, emerging designer spotlights, and industry insights.',
    image: DEFAULT_OG,
    ogType: 'website',
    seoContent: buildSeoDiv('<h1>Adorzia Journal</h1><p>The Adorzia Journal is Pakistan\'s destination for fashion entrepreneurship journalism, heritage craft features, emerging designer spotlights, and industry insights.</p><h2>Content Categories</h2><p>Explore stories across fashion startups, designers, collections, universities, fashion business, branding and marketing, industry insights, resources, and opportunities.</p><p>Each article is written by the Adorzia editorial team and covers the people, brands, and trends shaping Pakistan\'s fashion ecosystem.</p>') + '<script type="application/ld+json">{"@context":"https://schema.org","@type":"CollectionPage","name":"Adorzia Journal","description":"Pakistani fashion journalism and industry insights","url":"https://adorzia.com/blog"}</script>'
  },
  '/contact': {
    title: 'Contact Adorzia',
    description: 'Contact the Adorzia team. Reach out about designer applications, partnerships, studio access, press inquiries, and marketplace questions.',
    image: DEFAULT_OG,
    ogType: 'website',
    seoContent: buildSeoDiv('<h1>Contact Adorzia</h1><p>Get in touch with the Adorzia team. Whether you are a fashion designer, emerging brand, institution, investor, or potential partner, we want to hear from you.</p><h2>How to Reach Us</h2><p>Email: hello@adorzia.com</p><p>Instagram: @adorziaofficial</p><p>LinkedIn: Adorzia</p><h2>What We Can Help With</h2><ul><li>Designer applications and Spotlight event submissions</li><li>Partnership and sponsorship inquiries</li><li>Studio access and coworking memberships</li><li>Press and media requests</li><li>Marketplace brand applications</li></ul><p>Adorzia is based in Karachi, Pakistan with studio locations in Karachi, Lahore, and Islamabad.</p>') + '<script type="application/ld+json">{"@context":"https://schema.org","@type":"ContactPage","name":"Contact Adorzia","url":"https://adorzia.com/contact","description":"Get in touch with the Adorzia team"}</script>'
  },
}

// ── Resolve dynamic page metadata ──────────────────────────────────
async function getPageMeta(pathname: string): Promise<PageMeta | null> {
  if (STATIC_PAGES[pathname]) return STATIC_PAGES[pathname]

  // Blog post: /blog/:slug
  const blogMatch = pathname.match(/^\/blog\/([^/]+)$/)
  if (blogMatch) {
    const post = await querySupabase('blog_posts', 'title,excerpt,banner_image_url,featured_image_url,author_name,published_at,created_at', `slug=eq.${encodeURIComponent(blogMatch[1])}`)
    if (post) {
      const author = post.author_name || 'Adorzia Editorial'
      const date = post.published_at || post.created_at || ''
      const dateStr = date ? new Date(date).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' }) : ''
      const seoContent = buildSeoDiv(
        `<h1>${esc(post.title)}</h1>` +
        (author ? `<p>By ${esc(author)}${dateStr ? ` | Published: ${dateStr}` : ''}</p>` : '') +
        `<p>${esc(post.excerpt || post.title)}</p>` +
        `<p>Read this article on the Adorzia Journal for more Pakistani fashion entrepreneurship stories, heritage craft features, and emerging designer spotlights.</p>`
      ) + `<script type="application/ld+json">{"@context":"https://schema.org","@type":"Article","headline":"${esc(post.title)}","author":{"@type":"Person","name":"${esc(author)}"}${date ? `,"datePublished":"${date.split('T')[0]}"` : ''},"publisher":{"@type":"Organization","name":"Adorzia Journal"},"url":"https://adorzia.com${pathname}"}</script>`
      return { title: `${post.title} — Adorzia Journal`, description: post.excerpt || post.title, image: post.banner_image_url || post.featured_image_url || DEFAULT_OG, ogType: 'article', seoContent }
    }
  }

  // Blog category: /blog/category/:category
  const catMatch = pathname.match(/^\/blog\/category\/([^/]+)$/)
  if (catMatch) {
    const catName = CATEGORY_NAMES[catMatch[1]] || catMatch[1].split('-').map((w: string) => w.charAt(0).toUpperCase() + w.slice(1)).join(' ')
    const seoContent = buildSeoDiv(
      `<h1>${esc(catName)} — Adorzia Journal</h1>` +
      `<p>Read ${esc(catName)} articles on Adorzia Journal covering Pakistani fashion entrepreneurship, heritage craft, and emerging designers.</p>` +
      `<p>Browse all journal categories to discover stories about the people, brands, and trends shaping Pakistan's fashion ecosystem.</p>`
    ) + `<script type="application/ld+json">{"@context":"https://schema.org","@type":"CollectionPage","name":"${esc(catName)} — Adorzia Journal","url":"https://adorzia.com${pathname}"}</script>`
    return { title: `${catName} — Adorzia Journal`, description: `Read ${catName} articles on Adorzia Journal — Pakistani fashion entrepreneurship, heritage craft, and emerging designers.`, image: DEFAULT_OG, ogType: 'website', seoContent }
  }

  // Designer profile: /designers/:slug
  const designerMatch = pathname.match(/^\/designers\/([^/]+)$/)
  if (designerMatch) {
    const d = await querySupabase('designers', 'name,short_bio,bio,image_url,cover_image_url,location,specialization,brand', `slug=eq.${encodeURIComponent(designerMatch[1])}`)
    if (d) {
      const seoContent = buildSeoDiv(
        `<h1>${esc(d.name)}${d.brand ? ` — ${esc(d.brand)}` : ''}</h1>` +
        `<p>${esc(d.short_bio || d.bio || `Discover ${d.name}, a Pakistani fashion designer on Adorzia.`)}</p>` +
        (d.location ? `<p>Based in ${esc(d.location)}</p>` : '') +
        (d.specialization ? `<p>Specialization: ${esc(d.specialization)}</p>` : '') +
        `<p>View the full profile of ${esc(d.name)} on the Adorzia designers directory to see collections, skills, achievements, and social media links.</p>`
      ) + `<script type="application/ld+json">{"@context":"https://schema.org","@type":"Person","name":"${esc(d.name)}"${d.brand ? `,"worksFor":{"@type":"Organization","name":"${esc(d.brand)}"}` : ''}${d.location ? `,"address":{"@type":"PostalAddress","addressLocality":"${esc(d.location)}"}` : ''},"url":"https://adorzia.com${pathname}"}</script>`
      return { title: `${d.name} — Adorzia`, description: d.short_bio || `Discover ${d.name}, a Pakistani fashion designer on Adorzia.`, image: d.cover_image_url || d.image_url || DEFAULT_OG, ogType: 'profile', seoContent }
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

// ── Inject SEO body content for crawlers ──────────────────────────
function injectSeoContent(html: string, content: string): string {
  return html.replace('</body>', `${content}</body>`)
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

  // Inject SEO body content for crawlers (H1, headings, descriptive text)
  if (meta.seoContent) {
    html = injectSeoContent(html, meta.seoContent)
  }

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
  matcher: ['/((?!_next/static|_next/image|favicon|icons\\.svg|api/|.*\\.json$).*)'],
}
