/**
 * Build-time RSS feed generator
 * Queries Supabase for all published blog posts and generates public/rss.xml
 *
 * Usage: node scripts/generate-rss.js
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

function escapeXml(s) {
  if (!s) return ''
  return s
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&apos;')
}

function formatRssDate(d) {
  if (!d) return new Date().toUTCString()
  return new Date(d).toUTCString()
}

async function generate() {
  console.log('Generating RSS feed...')

  // Fetch published posts with categories
  const posts = await querySupabase(
    'blog_posts',
    'title,slug,excerpt,content,author_name,published_at,updated_at,featured_image_url,banner_image_url,category_id,tags',
    '&status=eq.published&order=published_at.desc&limit=50'
  )

  // Fetch categories for mapping
  const categories = await querySupabase('blog_categories', 'id,name,slug')
  const catMap = {}
  for (const c of categories) catMap[c.id] = c

  const items = posts.map(post => {
    const cat = catMap[post.category_id]
    const image = post.banner_image_url || post.featured_image_url
    const description = post.excerpt || post.content.replace(/<[^>]+>/g, '').substring(0, 300)

    let content = `      <description><![CDATA[${escapeXml(description)}]]></description>`
    if (image) {
      content += `\n      <enclosure url="${escapeXml(image)}" type="image/webp" />`
    }
    if (cat) {
      content += `\n      <category>${escapeXml(cat.name)}</category>`
    }
    if (post.tags && Array.isArray(post.tags)) {
      content += post.tags.map(t => `\n      <category>${escapeXml(t)}</category>`).join('')
    }
    content += `\n      <author>hello@adorzia.com (${escapeXml(post.author_name)})</author>`
    content += `\n      <guid isPermaLink="true">${SITE}/blog/${post.slug}</guid>`
    content += `\n      <pubDate>${formatRssDate(post.published_at)}</pubDate>`

    return `    <item>
      <title>${escapeXml(post.title)}</title>
      <link>${SITE}/blog/${post.slug}</link>
${content}
    </item>`
  })

  const now = new Date().toUTCString()
  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0"
  xmlns:atom="http://www.w3.org/2005/Atom"
  xmlns:dc="http://purl.org/dc/elements/1.1/"
  xmlns:content="http://purl.org/rss/1.0/modules/content/">
  <channel>
    <title>Adorzia Journal</title>
    <link>${SITE}/blog</link>
    <description>Pakistani fashion journalism, industry insights, and emerging designer stories from Adorzia — Pakistan's first fashion entrepreneurship ecosystem.</description>
    <language>en-us</language>
    <atom:link href="${SITE}/rss.xml" rel="self" type="application/rss+xml" />
    <lastBuildDate>${now}</lastBuildDate>
    <image>
      <url>${SITE}/og-image.jpeg</url>
      <title>Adorzia Journal</title>
      <link>${SITE}/blog</link>
    </image>
${items.join('\n')}
  </channel>
</rss>
`

  const fs = await import('fs')
  const path = await import('path')

  fs.writeFileSync(path.join(process.cwd(), 'public', 'rss.xml'), xml)

  console.log(`RSS feed generated: ${posts.length} articles`)
}

generate().catch(err => {
  console.error('RSS generation failed:', err)
  process.exit(1)
})
