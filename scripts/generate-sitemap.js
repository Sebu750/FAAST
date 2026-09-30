/**
 * Build-time sitemap generator
 * Queries Supabase for all published blog posts and active designers,
 * combines with static routes, and writes dist/sitemap.xml
 *
 * Usage: node scripts/generate-sitemap.js
 */

const SUPABASE_URL = process.env.VITE_SUPABASE_URL || 'https://qchqwxoaqzdfalkeitpj.supabase.co'
const SUPABASE_ANON = process.env.VITE_SUPABASE_ANON_KEY || 'sb_publishable_vt1viH8p6POzb5rMckVqeg_ZFbYvhUn'
const SITE = 'https://adorzia.com'

async function querySupabase(table, select, filter = '') {
  const url = `${SUPABASE_URL}/rest/v1/${table}?select=${select}${filter ? '&' + filter : ''}`
  const res = await fetch(url, {
    headers: { 'apikey': SUPABASE_ANON, 'Authorization': `Bearer ${SUPABASE_ANON}` },
  })
  if (!res.ok) {
    console.error(`Supabase query failed for ${table}:`, res.status, res.statusText)
    return []
  }
  return res.json()
}

function formatDate(d) {
  if (!d) return new Date().toISOString().split('T')[0]
  return new Date(d).toISOString().split('T')[0]
}

function urlEntry(loc, lastmod, changefreq, priority) {
  return `  <url>
    <loc>${loc}</loc>
    <lastmod>${lastmod}</lastmod>
    <changefreq>${changefreq}</changefreq>
    <priority>${priority}</priority>
  </url>`
}

// Static pages with their metadata
const STATIC_ROUTES = [
  { path: '/', changefreq: 'weekly', priority: '1.0' },
  { path: '/about', changefreq: 'monthly', priority: '0.8' },
  { path: '/designers', changefreq: 'daily', priority: '0.9' },
  { path: '/fashionpreneurship', changefreq: 'weekly', priority: '0.8' },
  { path: '/for-partners', changefreq: 'monthly', priority: '0.8' },
  { path: '/marketplace', changefreq: 'weekly', priority: '0.9' },
  { path: '/contact', changefreq: 'monthly', priority: '0.7' },
  { path: '/blog', changefreq: 'daily', priority: '0.9' },
]

const BLOG_CATEGORIES = [
  'fashion-startups', 'designers', 'collections', 'universities',
  'fashion-business', 'branding-marketing', 'industry-insights',
  'resources', 'opportunities', 'adorzia-journal',
]

async function generate() {
  console.log('Generating sitemap...')

  // Fetch dynamic data in parallel
  const [posts, designers] = await Promise.all([
    querySupabase('blog_posts', 'slug,updated_at', '&status=eq.published&order=updated_at.desc'),
    querySupabase('designers', 'slug,updated_at', '&is_active=eq.true&order=updated_at.desc'),
  ])

  const today = formatDate(new Date())
  const entries = []

  // Static pages
  for (const route of STATIC_ROUTES) {
    entries.push(urlEntry(`${SITE}${route.path}`, today, route.changefreq, route.priority))
  }

  // Blog categories
  for (const cat of BLOG_CATEGORIES) {
    entries.push(urlEntry(`${SITE}/blog/category/${cat}`, today, 'weekly', '0.7'))
  }

  // Blog posts
  for (const post of posts) {
    entries.push(urlEntry(`${SITE}/blog/${post.slug}`, formatDate(post.updated_at), 'monthly', '0.8'))
  }

  // Designer profiles
  for (const designer of designers) {
    entries.push(urlEntry(`${SITE}/designers/${designer.slug}`, formatDate(designer.updated_at), 'monthly', '0.7'))
  }

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${entries.join('\n')}
</urlset>
`

  // Write to both public/ (for dev) and dist/ (for production build)
  const fs = await import('fs')
  const path = await import('path')

  // Ensure dist directory exists
  const distDir = path.join(process.cwd(), 'dist')
  if (!fs.existsSync(distDir)) fs.mkdirSync(distDir, { recursive: true })

  fs.writeFileSync(path.join(distDir, 'sitemap.xml'), xml)
  fs.writeFileSync(path.join(process.cwd(), 'public', 'sitemap.xml'), xml)

  console.log(`Sitemap generated: ${entries.length} URLs`)
  console.log(`  - ${STATIC_ROUTES.length} static pages`)
  console.log(`  - ${BLOG_CATEGORIES.length} blog categories`)
  console.log(`  - ${posts.length} blog posts`)
  console.log(`  - ${designers.length} designer profiles`)
}

generate().catch(err => {
  console.error('Sitemap generation failed:', err)
  process.exit(1)
})
