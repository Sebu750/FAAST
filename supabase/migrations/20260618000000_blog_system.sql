-- ==========================================
-- ADORZIA BLOG SYSTEM DATABASE SCHEMA
-- ==========================================

-- Blog Categories
CREATE TABLE blog_categories (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  name VARCHAR(100) NOT NULL UNIQUE,
  slug VARCHAR(100) NOT NULL UNIQUE,
  description TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Blog Posts
CREATE TABLE blog_posts (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  title VARCHAR(255) NOT NULL,
  slug VARCHAR(255) NOT NULL UNIQUE,
  excerpt TEXT,
  content TEXT NOT NULL,
  featured_image_url TEXT,
  banner_image_url TEXT,
  category_id UUID REFERENCES blog_categories(id) ON DELETE SET NULL,
  author_name VARCHAR(255) DEFAULT 'Adorzia Team',
  author_image_url TEXT,
  status VARCHAR(50) DEFAULT 'draft', -- draft, published, archived
  published_at TIMESTAMP WITH TIME ZONE,
  reading_time INTEGER DEFAULT 5,
  tags TEXT[],
  meta_title VARCHAR(255),
  meta_description TEXT,
  views INTEGER DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- ==========================================
-- ENABLE ROW LEVEL SECURITY
-- ==========================================
ALTER TABLE blog_categories ENABLE ROW LEVEL SECURITY;
ALTER TABLE blog_posts ENABLE ROW LEVEL SECURITY;

-- ==========================================
-- PUBLIC READ POLICIES (for published posts)
-- ==========================================
CREATE POLICY "Allow public read on blog_categories"
  ON blog_categories FOR SELECT TO anon, authenticated USING (true);

CREATE POLICY "Allow public read on published blog_posts"
  ON blog_posts FOR SELECT TO anon, authenticated 
  USING (status = 'published' AND published_at <= NOW());

-- ==========================================
-- AUTHENTICATED ADMIN POLICIES
-- ==========================================
-- Categories
CREATE POLICY "Allow authenticated all on blog_categories"
  ON blog_categories FOR ALL TO authenticated USING (true) WITH CHECK (true);

-- Posts (full CRUD for authenticated users)
CREATE POLICY "Allow authenticated select on blog_posts"
  ON blog_posts FOR SELECT TO authenticated USING (true);

CREATE POLICY "Allow authenticated insert on blog_posts"
  ON blog_posts FOR INSERT TO authenticated WITH CHECK (true);

CREATE POLICY "Allow authenticated update on blog_posts"
  ON blog_posts FOR UPDATE TO authenticated USING (true) WITH CHECK (true);

CREATE POLICY "Allow authenticated delete on blog_posts"
  ON blog_posts FOR DELETE TO authenticated USING (true);

-- ==========================================
-- CREATE INDEXES
-- ==========================================
CREATE INDEX idx_blog_posts_status ON blog_posts(status);
CREATE INDEX idx_blog_posts_published_at ON blog_posts(published_at DESC);
CREATE INDEX idx_blog_posts_category_id ON blog_posts(category_id);
CREATE INDEX idx_blog_posts_slug ON blog_posts(slug);
CREATE INDEX idx_blog_posts_created_at ON blog_posts(created_at DESC);
CREATE INDEX idx_blog_categories_slug ON blog_categories(slug);

-- ==========================================
-- AUTO-UPDATE TRIGGER
-- ==========================================
CREATE TRIGGER update_blog_posts_updated_at 
  BEFORE UPDATE ON blog_posts 
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- ==========================================
-- ENABLE REALTIME
-- ==========================================
ALTER TABLE blog_posts REPLICA IDENTITY FULL;
ALTER PUBLICATION supabase_realtime ADD TABLE blog_posts;

-- ==========================================
-- SEED INITIAL CATEGORIES
-- ==========================================
INSERT INTO blog_categories (name, slug, description) VALUES
  ('Fashion Entrepreneurship', 'fashion-entrepreneurship', 'Insights on building fashion businesses in Pakistan'),
  ('PIFD', 'pifd', 'Pakistan Institute of Fashion and Design - news, alumni, and insights'),
  ('AIFD', 'aifd', 'Asian Institute of Fashion Design - trends, graduates, and industry connections'),
  ('Pakistan Fashion Startups', 'pakistan-fashion-startups', 'Emerging fashion brands and startups making waves in Pakistan'),
  ('Heritage Craft', 'heritage-craft', 'Traditional Pakistani craftsmanship meeting contemporary fashion'),
  ('Industry Insights', 'industry-insights', 'Market analysis, trends, and industry developments'),
  ('Spotlight Stories', 'spotlight-stories', 'Success stories and updates from Adorzia Spotlight program');

-- ==========================================
-- STORAGE BUCKET SETUP INSTRUCTIONS
-- ==========================================
-- Run this in Supabase Dashboard > Storage > New Bucket:
-- Name: blog-images
-- Public bucket: Yes
-- File size limit: 5242880 (5MB)
-- Allowed MIME types: image/webp, image/jpeg, image/png

-- ==========================================
-- SEED INITIAL BLOG POSTS
-- ==========================================
INSERT INTO blog_posts (title, slug, excerpt, content, featured_image_url, category_id, author_name, status, published_at, reading_time, tags, meta_title, meta_description)
SELECT 
  'The Rise of Fashion Entrepreneurship in Pakistan',
  'rise-of-fashion-entrepreneurship-pakistan',
  'How a new generation of Pakistani designers is building fashion brands from the ground up, blending heritage craft with contemporary vision.',
  'Pakistan''s fashion industry is undergoing a quiet revolution. While the country has long been known for its rich textile heritage and masterful craftsmanship, a new wave of fashion entrepreneurs is emerging — designers who see themselves not just as creators, but as business builders.

# The Entrepreneurial Shift

For decades, Pakistani fashion existed primarily in the realm of bridal wear and formal occasion dressing. Today''s emerging designers are thinking bigger. They''re launching ready-to-wear lines, exploring sustainable production methods, and building brands that speak to global audiences.

The shift is partly driven by necessity. Without established infrastructure for fashion businesses, these designers have had to become entrepreneurs by default — learning marketing, operations, and finance alongside pattern-making and draping.

# Challenges and Opportunities

The path isn''t easy. Pakistani fashion entrepreneurs face:

- Limited access to business mentorship specific to fashion
- Fragmented supply chains for quality materials
- Lack of organized retail infrastructure beyond major cities
- Difficulty accessing international markets

Yet these challenges have also sparked innovation. Designers are building direct-to-consumer brands, leveraging social media for marketing, and finding creative ways to bridge traditional craft with modern aesthetics.

# The Adorzia Vision

This is precisely why Adorzia exists. We''re building the infrastructure that Pakistani fashion entrepreneurs have never had — premium coworking studios, a curated marketplace connecting designers with global buyers, and the Spotlight program that invests directly in emerging talent.

The future of Pakistani fashion isn''t just about beautiful clothes. It''s about building sustainable businesses that honor our craft heritage while creating economic opportunity for the next generation.',
  '/blog/fashion-entrepreneurship.webp',
  (SELECT id FROM blog_categories WHERE slug = 'fashion-entrepreneurship'),
  'Adorzia Team',
  'published',
  NOW(),
  7,
  ARRAY['fashion', 'entrepreneurship', 'pakistan', 'startups'],
  'Fashion Entrepreneurship in Pakistan - The Rise of Designer-Builders',
  'How Pakistani designers are becoming fashion entrepreneurs, building brands that blend heritage craft with contemporary business vision.'
WHERE NOT EXISTS (SELECT 1 FROM blog_posts WHERE slug = 'rise-of-fashion-entrepreneurship-pakistan');

INSERT INTO blog_posts (title, slug, excerpt, content, featured_image_url, category_id, author_name, status, published_at, reading_time, tags, meta_title, meta_description)
SELECT 
  'PIFD: Shaping Pakistan''s Fashion Future',
  'pifd-shaping-pakistan-fashion-future',
  'Inside the Pakistan Institute of Fashion and Design — where the next generation of fashion talent is being trained and transformed.',
  'The Pakistan Institute of Fashion and Design (PIFD) stands as one of the country''s most important institutions for fashion education. Located in Lahore, PIFD has been quietly shaping the future of Pakistani fashion for over two decades.

# A Legacy of Excellence

Founded with the vision of professionalizing Pakistan''s fashion industry, PIFD offers comprehensive programs in fashion design, textiles, and accessories. The institute combines traditional craft training with contemporary design thinking.

Students at PIFD learn everything from pattern-making and draping to fashion illustration and collection development. The curriculum emphasizes both technical skill and creative vision.

# Alumni Making Waves

PIFD graduates are increasingly visible in Pakistan''s fashion landscape. Many have gone on to:

- Launch their own fashion brands
- Work with established Pakistani designers
- Bring fresh perspectives to textile innovation
- Bridge traditional craft with modern design

The institute''s annual graduate showcase has become a key event for industry professionals scouting new talent.

# The Gap Between Education and Industry

Despite PIFD''s excellence, graduates often face a challenging transition from student to professional. The gap between academic training and business reality remains significant.

This is where ecosystem support becomes crucial. Programs like Adorzia''s Spotlight are designed to bridge this gap — providing emerging designers with the mentorship, resources, and platform they need to turn their vision into viable businesses.

# Looking Forward

As Pakistan''s fashion industry continues to grow, institutions like PIFD will play an increasingly important role. The question isn''t whether Pakistan has fashion talent — it''s whether we can build the infrastructure to support that talent''s growth into sustainable, globally competitive businesses.',
  '/blog/pifd-fashion.webp',
  (SELECT id FROM blog_categories WHERE slug = 'pifd'),
  'Adorzia Team',
  'published',
  NOW() - INTERVAL '2 days',
  6,
  ARRAY['pifd', 'education', 'lahore', 'fashion-design'],
  'PIFD Pakistan - Shaping the Future of Fashion Education',
  'Inside PIFD, Pakistan''s premier fashion institute, and how its graduates are transforming the country''s fashion landscape.'
WHERE NOT EXISTS (SELECT 1 FROM blog_posts WHERE slug = 'pifd-shaping-pakistan-fashion-future');

INSERT INTO blog_posts (title, slug, excerpt, content, featured_image_url, category_id, author_name, status, published_at, reading_time, tags, meta_title, meta_description)
SELECT 
  'Spotlight 2026: Investing in Pakistan''s Next Fashion Visionary',
  'spotlight-2026-investing-pakistan-fashion',
  'Adorzia''s Spotlight program isn''t just a competition — it''s an investment in the designer who will define Pakistani fashion''s next chapter.',
  'Every year, Adorzia Spotlight searches every province, every city, and every subculture of Pakistan to find one singular visionary — the designer ready to redefine Pakistani fashion on a global scale.

# More Than a Competition

Spotlight isn''t your typical fashion competition. We''re not looking for the most commercially viable collection or the most Instagram followers. We''re looking for vision — the designer whose work speaks to something deeper, something that could reshape how the world sees Pakistani fashion.

The selected designer receives:

- Direct funding to launch their brand
- Year-long mentorship from industry leaders
- Access to Adorzia''s coworking studios
- A platform to present their work internationally

# The Selection Process

Our selection process is rigorous and holistic. We evaluate:

- Creative vision and originality
- Technical skill and craftsmanship
- Understanding of heritage and cultural context
- Potential for global impact

Applications for Spotlight 2026 are open until July 31, 2026. We''re looking for designers who are ready to commit fully to their vision — whether they''re recent graduates, independent creatives, or emerging brand founders.

# Why Investment Matters

Pakistani fashion has no shortage of talent. What we lack is investment — not just financial, but the investment of time, mentorship, and infrastructure that allows emerging designers to grow without compromising their vision.

Spotlight is our commitment to changing that. By investing in one designer each year, we''re building a foundation for sustainable fashion entrepreneurship in Pakistan.

# Join the Movement

If you''re a Pakistani designer with a vision that demands to be seen, Spotlight is your platform. Applications are open now.

The future of Pakistani fashion won''t be built by institutions alone. It will be built by individual visionaries with the courage to create something new — and the support to make it real.',
  '/blog/spotlight-stage.webp',
  (SELECT id FROM blog_categories WHERE slug = 'spotlight-stories'),
  'Adorzia Team',
  'published',
  NOW() - INTERVAL '5 days',
  8,
  ARRAY['spotlight', 'investment', 'fashion', 'pakistan', '2026'],
  'Spotlight 2026 - Investing in Pakistan''s Fashion Future',
  'Adorzia Spotlight invests in Pakistan''s next fashion visionary. Applications open for designers ready to define the industry''s next chapter.'
WHERE NOT EXISTS (SELECT 1 FROM blog_posts WHERE slug = 'spotlight-2026-investing-pakistan-fashion');
