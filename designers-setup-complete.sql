-- ==========================================
-- ADORZIA DESIGNER DATABASE - COMPLETE SETUP
-- Creates tables + Seeds 10 Pakistani designers
-- ==========================================

-- ==========================================
-- STEP 1: CREATE TABLES
-- ==========================================

-- Designers Table
CREATE TABLE IF NOT EXISTS designers (
  id TEXT PRIMARY KEY,
  slug TEXT UNIQUE NOT NULL,
  name TEXT NOT NULL,
  brand TEXT NOT NULL,
  location TEXT,
  nationality TEXT,
  languages TEXT,
  experience TEXT,
  specialization TEXT,
  category TEXT,
  gender TEXT,
  bio TEXT,
  short_bio TEXT,
  philosophy TEXT,
  image_url TEXT,
  cover_image_url TEXT,
  availability TEXT,
  is_featured BOOLEAN DEFAULT FALSE,
  is_active BOOLEAN DEFAULT TRUE,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Designer Collections Table
CREATE TABLE IF NOT EXISTS designer_collections (
  id TEXT PRIMARY KEY,
  designer_id TEXT NOT NULL REFERENCES designers(id) ON DELETE CASCADE,
  title TEXT NOT NULL,
  season TEXT,
  description TEXT,
  inspiration TEXT,
  looks INTEGER,
  cover_image_url TEXT,
  images TEXT[],
  is_latest BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Designer Education Table
CREATE TABLE IF NOT EXISTS designer_education (
  id TEXT PRIMARY KEY,
  designer_id TEXT NOT NULL REFERENCES designers(id) ON DELETE CASCADE,
  institution TEXT NOT NULL,
  degree TEXT,
  year TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Designer Achievements Table
CREATE TABLE IF NOT EXISTS designer_achievements (
  id TEXT PRIMARY KEY,
  designer_id TEXT NOT NULL REFERENCES designers(id) ON DELETE CASCADE,
  title TEXT NOT NULL,
  detail TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Designer Skills Table
CREATE TABLE IF NOT EXISTS designer_skills (
  id TEXT PRIMARY KEY,
  designer_id TEXT NOT NULL REFERENCES designers(id) ON DELETE CASCADE,
  skill TEXT NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Designer Certifications Table
CREATE TABLE IF NOT EXISTS designer_certifications (
  id TEXT PRIMARY KEY,
  designer_id TEXT NOT NULL REFERENCES designers(id) ON DELETE CASCADE,
  certification TEXT NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Designer Social Links Table
CREATE TABLE IF NOT EXISTS designer_social_links (
  id TEXT PRIMARY KEY,
  designer_id TEXT UNIQUE NOT NULL REFERENCES designers(id) ON DELETE CASCADE,
  instagram TEXT,
  facebook TEXT,
  tiktok TEXT,
  pinterest TEXT,
  linkedin TEXT,
  behance TEXT,
  email TEXT,
  website TEXT,
  shop TEXT,
  portfolio TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Enable RLS
ALTER TABLE designers ENABLE ROW LEVEL SECURITY;
ALTER TABLE designer_collections ENABLE ROW LEVEL SECURITY;
ALTER TABLE designer_education ENABLE ROW LEVEL SECURITY;
ALTER TABLE designer_achievements ENABLE ROW LEVEL SECURITY;
ALTER TABLE designer_skills ENABLE ROW LEVEL SECURITY;
ALTER TABLE designer_certifications ENABLE ROW LEVEL SECURITY;
ALTER TABLE designer_social_links ENABLE ROW LEVEL SECURITY;

-- Public read policies
DROP POLICY IF EXISTS "designers_select_public" ON designers;
CREATE POLICY "designers_select_public" ON designers FOR SELECT USING (is_active = TRUE);

DROP POLICY IF EXISTS "collections_select_public" ON designer_collections;
CREATE POLICY "collections_select_public" ON designer_collections FOR SELECT USING (true);

DROP POLICY IF EXISTS "education_select_public" ON designer_education;
CREATE POLICY "education_select_public" ON designer_education FOR SELECT USING (true);

DROP POLICY IF EXISTS "achievements_select_public" ON designer_achievements;
CREATE POLICY "achievements_select_public" ON designer_achievements FOR SELECT USING (true);

DROP POLICY IF EXISTS "skills_select_public" ON designer_skills;
CREATE POLICY "skills_select_public" ON designer_skills FOR SELECT USING (true);

DROP POLICY IF EXISTS "certifications_select_public" ON designer_certifications;
CREATE POLICY "certifications_select_public" ON designer_certifications FOR SELECT USING (true);

DROP POLICY IF EXISTS "social_links_select_public" ON designer_social_links;
CREATE POLICY "social_links_select_public" ON designer_social_links FOR SELECT USING (true);

-- Admin write policies
DROP POLICY IF EXISTS "designers_all_admin" ON designers;
CREATE POLICY "designers_all_admin" ON designers FOR ALL USING (true) WITH CHECK (true);

DROP POLICY IF EXISTS "collections_all_admin" ON designer_collections;
CREATE POLICY "collections_all_admin" ON designer_collections FOR ALL USING (true) WITH CHECK (true);

DROP POLICY IF EXISTS "education_all_admin" ON designer_education;
CREATE POLICY "education_all_admin" ON designer_education FOR ALL USING (true) WITH CHECK (true);

DROP POLICY IF EXISTS "achievements_all_admin" ON designer_achievements;
CREATE POLICY "achievements_all_admin" ON designer_achievements FOR ALL USING (true) WITH CHECK (true);

DROP POLICY IF EXISTS "skills_all_admin" ON designer_skills;
CREATE POLICY "skills_all_admin" ON designer_skills FOR ALL USING (true) WITH CHECK (true);

DROP POLICY IF EXISTS "certifications_all_admin" ON designer_certifications;
CREATE POLICY "certifications_all_admin" ON designer_certifications FOR ALL USING (true) WITH CHECK (true);

DROP POLICY IF EXISTS "social_links_all_admin" ON designer_social_links;
CREATE POLICY "social_links_all_admin" ON designer_social_links FOR ALL USING (true) WITH CHECK (true);

-- ==========================================
-- STORAGE BUCKET FOR DESIGNER IMAGES
-- ==========================================

-- Create the 'designers' storage bucket
INSERT INTO storage.buckets (id, name, public)
VALUES ('designers', 'designers', true)
ON CONFLICT (id) DO NOTHING;

-- Allow public access to view images
DROP POLICY IF EXISTS "designers_bucket_public_select" ON storage.objects;
CREATE POLICY "designers_bucket_public_select"
ON storage.objects FOR SELECT
USING (bucket_id = 'designers');

-- Allow all users to upload images (for admin)
DROP POLICY IF EXISTS "designers_bucket_authenticated_insert" ON storage.objects;
CREATE POLICY "designers_bucket_authenticated_insert"
ON storage.objects FOR INSERT
WITH CHECK (bucket_id = 'designers');

DROP POLICY IF EXISTS "designers_bucket_authenticated_update" ON storage.objects;
CREATE POLICY "designers_bucket_authenticated_update"
ON storage.objects FOR UPDATE
USING (bucket_id = 'designers');

DROP POLICY IF EXISTS "designers_bucket_authenticated_delete" ON storage.objects;
CREATE POLICY "designers_bucket_authenticated_delete"
ON storage.objects FOR DELETE
USING (bucket_id = 'designers');

-- ==========================================
-- STEP 2: SEED 10 PAKISTANI FASHION DESIGNERS
-- ==========================================

-- Clear existing data (optional - comment out if you want to keep existing)
DELETE FROM designer_social_links;
DELETE FROM designer_certifications;
DELETE FROM designer_skills;
DELETE FROM designer_achievements;
DELETE FROM designer_education;
DELETE FROM designer_collections;
DELETE FROM designers;

-- DESIGNER 1: Nazia Otho - Karachi
INSERT INTO designers (id, slug, name, brand, location, nationality, languages, experience, specialization, category, gender, bio, short_bio, philosophy, image_url, cover_image_url, availability, is_featured, is_active, created_at, updated_at)
VALUES (
  'd1-nazia-otho-001',
  'nazia-otho',
  'Nazia Otho',
  'Nazia Otho',
  'Karachi, Pakistan',
  'Pakistani',
  'English, Urdu, Sindhi',
  '8 years',
  'Luxury Pret, Bridal',
  'Womenswear',
  'female',
  'Nazia Otho is a Karachi-based designer known for her contemporary interpretation of traditional Pakistani craftsmanship. With a background in textile design, she brings a unique perspective to modern fashion, blending heritage techniques with silhouettes that resonate with the global Pakistani diaspora. Her work has been featured in multiple fashion weeks across Pakistan and Dubai.',
  'Contemporary luxury wear celebrating Pakistani craftsmanship with a modern global perspective.',
  'Fashion is a dialogue between heritage and modernity. I design to preserve our craft traditions while making them relevant for women who live bold, global lives.',
  '/src/assets/naziaotho.webp',
  '/src/assets/banner3.webp',
  'Available for commissions',
  true,
  true,
  NOW(),
  NOW()
);

-- DESIGNER 2: Zara Ahmad - Lahore
INSERT INTO designers (id, slug, name, brand, location, nationality, languages, experience, specialization, category, gender, bio, short_bio, philosophy, image_url, cover_image_url, availability, is_featured, is_active, created_at, updated_at)
VALUES (
  'd2-zara-ahmad-002',
  'zara-ahmad',
  'Zara Ahmad',
  'Zara Ahmad Studio',
  'Lahore, Pakistan',
  'Pakistani',
  'English, Urdu, Punjabi',
  '6 years',
  'Pret, Contemporary',
  'Womenswear',
  'female',
  'Zara Ahmad is a Lahore-based designer whose work reflects the vibrant cultural tapestry of Punjab. A graduate of the National College of Arts, Zara specializes in contemporary pret that bridges traditional aesthetics with modern wearability. Her collections are known for their thoughtful color palettes and innovative fabric combinations.',
  'Lahore-based contemporary pret brand blending Punjabi heritage with modern design sensibility.',
  'I believe in creating clothes that tell stories—of the artisans who make them, of the culture that inspires them, and of the women who wear them.',
  '/src/assets/Zara-ahmad.webp',
  '/src/assets/banner4.webp',
  'Available for collaborations',
  true,
  true,
  NOW(),
  NOW()
);

-- DESIGNER 3: Fatima Noor - Islamabad
INSERT INTO designers (id, slug, name, brand, location, nationality, languages, experience, specialization, category, gender, bio, short_bio, philosophy, image_url, cover_image_url, availability, is_featured, is_active, created_at, updated_at)
VALUES (
  'd3-fatima-noor-003',
  'fatima-noor',
  'Fatima Noor',
  'Fatima Noor',
  'Islamabad, Pakistan',
  'Pakistani',
  'English, Urdu',
  '5 years',
  'Luxury Formal, Evening Wear',
  'Womenswear',
  'female',
  'Fatima Noor is an Islamabad-based designer specializing in luxury formal wear and evening gowns. With a keen eye for detail and a passion for sophisticated silhouettes, Fatima creates pieces that embody elegance and modern femininity. Her work is characterized by clean lines, luxurious fabrics, and subtle embellishments.',
  'Islamabad-based luxury formal wear embodying elegance, sophistication, and modern femininity.',
  'True luxury lies in restraint. I design for women who understand that elegance is not about being noticed—it is about being remembered.',
  '/src/assets/Fatima-noor.webp',
  '/src/assets/hero-runway.webp',
  'Limited availability',
  true,
  true,
  NOW(),
  NOW()
);

-- DESIGNER 4: Bilal Hussain - Karachi
INSERT INTO designers (id, slug, name, brand, location, nationality, languages, experience, specialization, category, gender, bio, short_bio, philosophy, image_url, cover_image_url, availability, is_featured, is_active, created_at, updated_at)
VALUES (
  'd4-bilal-hussain-004',
  'bilal-hussain',
  'Bilal Hussain',
  'BH by Bilal',
  'Karachi, Pakistan',
  'Pakistani',
  'English, Urdu',
  '7 years',
  'Menswear, Streetwear',
  'Menswear',
  'male',
  'Bilal Hussain is redefining Pakistani menswear with his contemporary streetwear label BH by Bilal. Based in Karachi, he draws inspiration from urban culture, music, and the vibrant energy of the city. His designs challenge traditional notions of Pakistani fashion, offering young men clothing that is both culturally rooted and globally relevant.',
  'Karachi-based menswear label redefining Pakistani fashion through contemporary streetwear and urban culture.',
  'Streetwear is the uniform of a generation. I design to give young Pakistani men clothing that reflects their energy, their culture, and their ambitions.',
  '/src/assets/bilal-hussain.webp',
  '/src/assets/studio1.webp',
  'Open for collaborations',
  true,
  true,
  NOW(),
  NOW()
);

-- DESIGNER 5: Ayesha Khan - Lahore (Bridal)
INSERT INTO designers (id, slug, name, brand, location, nationality, languages, experience, specialization, category, gender, bio, short_bio, philosophy, image_url, cover_image_url, availability, is_featured, is_active, created_at, updated_at)
VALUES (
  'd5-ayesha-khan-005',
  'ayesha-khan',
  'Ayesha Khan',
  'Ayesha Khan Atelier',
  'Lahore, Pakistan',
  'Pakistani',
  'English, Urdu, Persian',
  '10 years',
  'Bridal, Luxury Couture',
  'Womenswear',
  'female',
  'Ayesha Khan is a Lahore-based bridal couture designer with over a decade of experience creating dream wedding ensembles. Trained at the Pakistan Institute of Fashion and Design (PIFD), Ayesha is known for her intricate hand embroidery, rich color palettes, and ability to blend Mughal-inspired motifs with contemporary silhouettes. Her atelier has dressed numerous high-profile brides across Pakistan.',
  'Lahore-based bridal couture atelier specializing in intricate hand embroidery and Mughal-inspired luxury.',
  'A bridal outfit is not just clothing—it is a vessel of dreams, heritage, and new beginnings. I design to honor that sacred moment.',
  '/src/assets/home-designer-portrait-1.webp',
  '/src/assets/home-luxury-bridal.webp',
  'Booking for 2025-2026 season',
  true,
  true,
  NOW(),
  NOW()
);

-- DESIGNER 6: Hassan Raza - Karachi (Menswear)
INSERT INTO designers (id, slug, name, brand, location, nationality, languages, experience, specialization, category, gender, bio, short_bio, philosophy, image_url, cover_image_url, availability, is_featured, is_active, created_at, updated_at)
VALUES (
  'd6-hassan-raza-006',
  'hassan-raza',
  'Hassan Raza',
  'HR Menswear',
  'Karachi, Pakistan',
  'Pakistani',
  'English, Urdu',
  '12 years',
  'Luxury Menswear, Sherwanis',
  'Menswear',
  'male',
  'Hassan Raza is a Karachi-based menswear designer specializing in luxury sherwanis and formal wear. With 12 years of experience, he has become a go-to designer for grooms and formal occasions. His work combines traditional Pakistani tailoring with contemporary cuts, ensuring each piece is both timeless and modern.',
  'Karachi-based luxury menswear designer specializing in sherwanis and sophisticated formal wear.',
  'A well-crafted sherwani carries the weight of tradition and the confidence of modernity. I design for men who understand both.',
  '/src/assets/home-designer-portrait-2.webp',
  '/src/assets/hero-home.webp',
  'Available for commissions',
  false,
  true,
  NOW(),
  NOW()
);

-- DESIGNER 7: Sana Malik - Islamabad (Sustainable)
INSERT INTO designers (id, slug, name, brand, location, nationality, languages, experience, specialization, category, gender, bio, short_bio, philosophy, image_url, cover_image_url, availability, is_featured, is_active, created_at, updated_at)
VALUES (
  'd7-sana-malik-007',
  'sana-malik',
  'Sana Malik',
  'Sana Malik Studio',
  'Islamabad, Pakistan',
  'Pakistani',
  'English, Urdu',
  '4 years',
  'Sustainable Fashion, Pret',
  'Womenswear',
  'female',
  'Sana Malik is an Islamabad-based designer focused on sustainable fashion and ethical production. A recent graduate of the National Institute of Design, she works exclusively with organic fabrics, natural dyes, and zero-waste pattern cutting techniques. Her collections prove that fashion can be both beautiful and responsible.',
  'Islamabad-based sustainable fashion label proving that ethical production and beautiful design coexist.',
  'Sustainability is not a trend—it is a responsibility. I design to show that conscious fashion can be luxurious, desirable, and transformative.',
  '/src/assets/home-designer-portrait-3.webp',
  '/src/assets/home-sustainable-fashion.webp',
  'Open to stockists',
  false,
  true,
  NOW(),
  NOW()
);

-- DESIGNER 8: Omar Farooq - Lahore (Textile Art)
INSERT INTO designers (id, slug, name, brand, location, nationality, languages, experience, specialization, category, gender, bio, short_bio, philosophy, image_url, cover_image_url, availability, is_featured, is_active, created_at, updated_at)
VALUES (
  'd8-omar-farooq-008',
  'omar-farooq',
  'Omar Farooq',
  'Omar Farooq',
  'Lahore, Pakistan',
  'Pakistani',
  'English, Urdu, Arabic',
  '9 years',
  'Contemporary Art, Textile Art',
  'Unisex',
  'male',
  'Omar Farooq is a Lahore-based textile artist and designer whose work sits at the intersection of fashion and fine art. His pieces are wearable art, featuring hand-painted motifs, experimental dyeing techniques, and deconstructed silhouettes. Omar has exhibited his work internationally and collaborates with galleries across Pakistan and the Middle East.',
  'Lahore-based textile artist creating wearable art that blurs the line between fashion and fine art.',
  'Fashion is my canvas, but my work belongs in the realm of art. I create pieces that challenge, provoke, and ultimately transform how we see clothing.',
  '/src/assets/designer-1.webp',
  '/src/assets/craft.webp',
  'Gallery commissions open',
  false,
  true,
  NOW(),
  NOW()
);

-- DESIGNER 9: Mariam Sheikh - Karachi (Workwear)
INSERT INTO designers (id, slug, name, brand, location, nationality, languages, experience, specialization, category, gender, bio, short_bio, philosophy, image_url, cover_image_url, availability, is_featured, is_active, created_at, updated_at)
VALUES (
  'd9-mariam-sheikh-009',
  'mariam-sheikh',
  'Mariam Sheikh',
  'MS Pret',
  'Karachi, Pakistan',
  'Pakistani',
  'English, Urdu',
  '6 years',
  'Pret, Workwear',
  'Womenswear',
  'female',
  'Mariam Sheikh is a Karachi-based designer specializing in contemporary pret and sophisticated workwear for the modern professional woman. Her designs are known for their clean lines, versatile silhouettes, and thoughtful details that transition seamlessly from office to evening. Mariam believes in creating clothing that empowers women through confidence and comfort.',
  'Karachi-based contemporary pret label designing sophisticated workwear for the modern professional woman.',
  'I design for women who do it all. My clothing should empower them—not restrict them. Versatility and confidence are at the heart of every piece.',
  '/src/assets/designer-2.webp',
  '/src/assets/home-fabric-innovation.webp',
  'Available for stockists',
  false,
  true,
  NOW(),
  NOW()
);

-- DESIGNER 10: Aliya Hassan - Lahore (Heritage Craft)
INSERT INTO designers (id, slug, name, brand, location, nationality, languages, experience, specialization, category, gender, bio, short_bio, philosophy, image_url, cover_image_url, availability, is_featured, is_active, created_at, updated_at)
VALUES (
  'd10-aliya-hassan-010',
  'aliya-hassan',
  'Aliya Hassan',
  'Aliya Hassan',
  'Lahore, Pakistan',
  'Pakistani',
  'English, Urdu, French',
  '11 years',
  'Luxury Pret, Heritage Craft',
  'Womenswear',
  'female',
  'Aliya Hassan is a Lahore-based designer dedicated to preserving and elevating Pakistan''s heritage craft traditions. Working closely with artisans from rural Sindh and Punjab, she creates contemporary luxury pieces that showcase traditional techniques like ajrak printing, phulkari embroidery, and rilli appliqué. Her work has been instrumental in bringing international attention to Pakistani craftspeople.',
  'Lahore-based luxury label preserving Pakistani heritage crafts through contemporary design and artisan collaboration.',
  'Every stitch carries a story. I design to honor the hands that create our heritage and to ensure these traditions thrive for generations to come.',
  '/src/assets/designer-3.webp',
  '/src/assets/home-heritage-craft.webp',
  'Limited edition releases',
  true,
  true,
  NOW(),
  NOW()
);

-- ==========================================
-- COLLECTIONS
-- ==========================================

-- Nazia Otho Collections
INSERT INTO designer_collections (id, designer_id, title, season, description, inspiration, looks, cover_image_url, images, is_latest, created_at)
VALUES 
('c1-nazia-001', 'd1-nazia-otho-001', 'Urban Heritage', 'SS24', 'A contemporary exploration of Karachi''s architectural heritage through modern silhouettes and traditional textile techniques.', 'The juxtaposition of colonial-era buildings with modern urban life in Karachi.', 24, '/src/assets/brand1.webp', NULL, false, NOW()),
('c2-nazia-002', 'd1-nazia-otho-001', 'Midnight Bloom', 'FW24', 'An evening wear collection inspired by the nocturnal gardens of Lahore, featuring rich jewel tones and intricate embroidery.', 'Mughal gardens at night, moonlit pathways, and blooming jasmine.', 25, '/src/assets/brand2.webp', ARRAY['/src/assets/hero1.webp', '/src/assets/hero-runway.webp', '/src/assets/runway.webp', '/src/assets/fashion.webp', '/src/assets/home-luxury-bridal.webp', '/src/assets/home-heritage-craft.webp', '/src/assets/home-sustainable-fashion.webp', '/src/assets/home-fabric-innovation.webp', '/src/assets/home-designer-portrait-1.webp', '/src/assets/home-designer-portrait-2.webp', '/src/assets/home-designer-portrait-3.webp', '/src/assets/home-hero-craft.webp', '/src/assets/home-hero-runway.webp', '/src/assets/home-hero-ecosystem1.webp', '/src/assets/home-cta-runway.webp', '/src/assets/craft.webp', '/src/assets/studio.webp', '/src/assets/studio1.webp', '/src/assets/spotlight.webp', '/src/assets/spotlight-hero-stage.webp', '/src/assets/spotlight-mentorship.webp', '/src/assets/spotlight-marketplace-launch.webp', '/src/assets/spotlight-mission-craft-1.webp', '/src/assets/spotlight-mission-craft-2.webp', '/src/assets/spotlight-mission-talent.webp'], true, NOW());

-- Zara Ahmad Collections
INSERT INTO designer_collections (id, designer_id, title, season, description, inspiration, looks, cover_image_url, is_latest, created_at)
VALUES 
('c3-zara-001', 'd2-zara-ahmad-002', 'Punjab Reimagined', 'SS24', 'A vibrant celebration of Punjabi culture through contemporary pret, featuring traditional phulkari motifs reimagined in modern color palettes.', 'The colorful landscapes of rural Punjab and traditional folk art.', 20, '/src/assets/brand3.webp', false, NOW()),
('c4-zara-002', 'd2-zara-ahmad-002', 'Monsoon', 'FW24', 'An elegant collection inspired by the Pakistani monsoon season, featuring flowing silhouettes and water-inspired prints.', 'The romance of rain in Lahore, wet streets, and the smell of earth.', 16, '/src/assets/brand4.webp', true, NOW());

-- Fatima Noor Collections
INSERT INTO designer_collections (id, designer_id, title, season, description, inspiration, looks, cover_image_url, is_latest, created_at)
VALUES 
('c5-fatima-001', 'd3-fatima-noor-003', 'Ethereal', 'SS24', 'A luxury formal wear collection featuring delicate fabrics, subtle embellishments, and sophisticated silhouettes for the modern woman.', 'The elegance of marble architecture and minimalist art.', 22, '/src/assets/brand5.webp', true, NOW());

-- Bilal Hussain Collections
INSERT INTO designer_collections (id, designer_id, title, season, description, inspiration, looks, cover_image_url, is_latest, created_at)
VALUES 
('c6-bilal-001', 'd4-bilal-hussain-004', 'Concrete Jungle', 'SS24', 'A streetwear collection capturing the raw energy of Karachi''s urban landscape, featuring graphic prints and relaxed silhouettes.', 'Karachi street art, truck art, and the city''s vibrant chaos.', 28, '/src/assets/mirror-rebel-tee-adorzia.webp', false, NOW()),
('c7-bilal-002', 'd4-bilal-hussain-004', 'Night Shift', 'FW24', 'An after-dark collection inspired by Karachi''s nightlife and music scene, featuring darker palettes and bold statements.', 'The energy of Karachi after midnight, neon lights, and underground music.', 22, '/src/assets/mirrorwork-bomber-jacket-adorzia.webp', true, NOW());

-- Ayesha Khan Collections
INSERT INTO designer_collections (id, designer_id, title, season, description, inspiration, looks, cover_image_url, is_latest, created_at)
VALUES 
('c8-ayesha-001', 'd5-ayesha-khan-005', 'Mughal Revival', 'Bridal 2024', 'A luxury bridal collection drawing from Mughal art and architecture, featuring intricate hand embroidery and rich fabrics.', 'The opulence of Mughal courts, miniature paintings, and royal textiles.', 15, '/src/assets/home-luxury-bridal.webp', true, NOW());

-- Hassan Raza Collections
INSERT INTO designer_collections (id, designer_id, title, season, description, inspiration, looks, cover_image_url, is_latest, created_at)
VALUES 
('c11-hassan-001', 'd6-hassan-raza-006', 'Royal Heritage', 'FW24', 'A luxury sherwani collection drawing from Mughal royal attire, featuring rich fabrics and intricate hand embroidery.', 'Mughal emperors court attire and royal textiles.', 20, '/src/assets/hero-home.webp', true, NOW()),
('c12-hassan-002', 'd6-hassan-raza-006', 'Modern Classic', 'SS24', 'Contemporary formal wear that bridges traditional Pakistani tailoring with modern silhouettes.', 'The evolution of Pakistani menswear through decades.', 18, '/src/assets/home-fabric-innovation.webp', false, NOW());

-- Sana Malik Collections
INSERT INTO designer_collections (id, designer_id, title, season, description, inspiration, looks, cover_image_url, is_latest, created_at)
VALUES 
('c13-sana-001', 'd7-sana-malik-007', 'Earth Tones', 'SS24', 'A sustainable collection using organic fabrics and natural dyes, featuring earth-inspired color palettes.', 'The landscapes of rural Pakistan and natural dye traditions.', 16, '/src/assets/home-sustainable-fashion.webp', true, NOW()),
('c14-sana-002', 'd7-sana-malik-007', 'Zero Waste', 'FW24', 'Innovative collection created with zero-waste pattern cutting techniques, proving sustainability and style coexist.', 'The challenge of creating beauty without waste.', 14, '/src/assets/craft.webp', false, NOW());

-- Omar Farooq Collections
INSERT INTO designer_collections (id, designer_id, title, season, description, inspiration, looks, cover_image_url, is_latest, created_at)
VALUES 
('c15-omar-001', 'd8-omar-farooq-008', 'Wearable Canvas', 'SS24', 'Art-meets-fashion collection featuring hand-painted textiles and experimental dyeing techniques.', 'The intersection of fine art and wearable design.', 12, '/src/assets/craft.webp', true, NOW()),
('c16-omar-002', 'd8-omar-farooq-008', 'Deconstructed', 'FW24', 'Avant-garde pieces that challenge conventional fashion silhouettes through deconstruction and reconstruction.', 'Questioning what clothing can be.', 10, '/src/assets/home-heritage-craft.webp', false, NOW());

-- Mariam Sheikh Collections
INSERT INTO designer_collections (id, designer_id, title, season, description, inspiration, looks, cover_image_url, is_latest, created_at)
VALUES 
('c17-mariam-001', 'd9-mariam-sheikh-009', 'Office to Evening', 'SS24', 'Versatile workwear collection designed for the modern professional woman, transitioning seamlessly from day to night.', 'The multifaceted lives of contemporary Pakistani women.', 22, '/src/assets/home-fabric-innovation.webp', true, NOW()),
('c18-mariam-002', 'd9-mariam-sheikh-009', 'Power Pret', 'FW24', 'Sophisticated pret collection empowering women through confident, comfortable design.', 'Confidence as a design principle.', 18, '/src/assets/home-sustainable-fashion.webp', false, NOW());

-- Aliya Hassan Collections
INSERT INTO designer_collections (id, designer_id, title, season, description, inspiration, looks, cover_image_url, is_latest, created_at)
VALUES 
('c9-aliya-001', 'd10-aliya-hassan-010', 'Ajrak Modern', 'SS24', 'A contemporary interpretation of traditional Sindhi ajrak printing, featuring modern silhouettes and updated color palettes.', 'The ancient craft of ajrak block printing and the Indus Valley civilization.', 20, '/src/assets/ajrak-architect-coat-adorzia1.webp', false, NOW()),
('c10-aliya-002', 'd10-aliya-hassan-010', 'Phulkari Reborn', 'FW24', 'A luxury collection reviving the traditional Punjabi phulkari embroidery technique through contemporary design.', 'The vibrant folk art of Punjab and the storytelling tradition of phulkari.', 18, '/src/assets/phulkari-reborn-blazer-adorzia.webp', true, NOW());

-- ==========================================
-- EDUCATION
-- ==========================================

INSERT INTO designer_education (id, designer_id, institution, degree, year, created_at)
VALUES 
('e1-nazia', 'd1-nazia-otho-001', 'Pakistan Institute of Fashion and Design (PIFD)', 'BFA in Fashion Design', '2014 - 2018', NOW()),
('e2-zara', 'd2-zara-ahmad-002', 'National College of Arts (NCA), Lahore', 'BFA in Textile Design', '2016 - 2020', NOW()),
('e3-fatima', 'd3-fatima-noor-003', 'National Institute of Design (NID)', 'BDes in Fashion Design', '2017 - 2021', NOW()),
('e4-bilal', 'd4-bilal-hussain-004', 'Indus Valley School of Art and Architecture (IVS)', 'BFA in Textile Design', '2015 - 2019', NOW()),
('e5-ayesha', 'd5-ayesha-khan-005', 'Pakistan Institute of Fashion and Design (PIFD)', 'BFA in Fashion Design', '2010 - 2014', NOW()),
('e6-hassan', 'd6-hassan-raza-006', 'Pakistan Institute of Fashion and Design (PIFD)', 'BFA in Fashion Design', '2008 - 2012', NOW()),
('e7-sana', 'd7-sana-malik-007', 'National Institute of Design (NID)', 'BDes in Sustainable Design', '2018 - 2022', NOW()),
('e8-omar', 'd8-omar-farooq-008', 'National College of Arts (NCA), Lahore', 'MFA in Fine Art', '2012 - 2014', NOW()),
('e9-mariam', 'd9-mariam-sheikh-009', 'Pakistan Institute of Fashion and Design (PIFD)', 'BFA in Fashion Design', '2016 - 2020', NOW()),
('e10-aliya', 'd10-aliya-hassan-010', 'National College of Arts (NCA), Lahore', 'BFA in Textile Design', '2010 - 2014', NOW());

-- ==========================================
-- ACHIEVEMENTS
-- ==========================================

INSERT INTO designer_achievements (id, designer_id, title, detail, created_at)
VALUES 
('a1-nazia', 'd1-nazia-otho-001', 'PFDC Sunsilk Fashion Week', 'Showcased at PFDC Sunsilk Fashion Week Karachi 2023', NOW()),
('a2-nazia', 'd1-nazia-otho-001', 'Lux Style Awards Nominee', 'Nominated for Emerging Designer of the Year 2023', NOW()),
('a3-zara', 'd2-zara-ahmad-002', 'Lahore Fashion Week', 'Featured designer at Lahore Fashion Week 2023', NOW()),
('a4-fatima', 'd3-fatima-noor-003', 'Bridal Couture Week', 'Showcased at Bridal Couture Week Islamabad 2024', NOW()),
('a5-bilal', 'd4-bilal-hussain-004', 'Karachi Street Style Awards', 'Won Best Streetwear Designer 2023', NOW()),
('a6-ayesha', 'd5-ayesha-khan-005', 'Hum Style Awards', 'Won Best Bridal Designer 2023', NOW()),
('a7-ayesha', 'd5-ayesha-khan-005', 'Dubai Fashion Week', 'Featured designer at Dubai Fashion Week 2024', NOW()),
('a8-hassan', 'd6-hassan-raza-006', 'Menswear Excellence Awards', 'Won Best Luxury Menswear Designer 2022', NOW()),
('a9-omar', 'd8-omar-farooq-008', 'International Textile Art Biennale', 'Exhibited at International Textile Art Biennale 2023', NOW()),
('a10-aliya', 'd10-aliya-hassan-010', 'Craft Pakistan Award', 'Received Craft Pakistan Award for Heritage Preservation 2023', NOW()),
('a11-aliya', 'd10-aliya-hassan-010', 'UNESCO Craft Recognition', 'Recognized by UNESCO for craft preservation efforts', NOW());

-- ==========================================
-- SKILLS
-- ==========================================

INSERT INTO designer_skills (id, designer_id, skill, created_at)
VALUES 
('s1-nazia-1', 'd1-nazia-otho-001', 'Hand Embroidery', NOW()),
('s2-nazia-2', 'd1-nazia-otho-001', 'Pattern Cutting', NOW()),
('s3-nazia-3', 'd1-nazia-otho-001', 'Draping', NOW()),
('s4-zara-1', 'd2-zara-ahmad-002', 'Textile Printing', NOW()),
('s5-zara-2', 'd2-zara-ahmad-002', 'Digital Design', NOW()),
('s6-zara-3', 'd2-zara-ahmad-002', 'Color Theory', NOW()),
('s7-fatima-1', 'd3-fatima-noor-003', 'Evening Wear Construction', NOW()),
('s8-fatima-2', 'd3-fatima-noor-003', 'Silk Work', NOW()),
('s9-bilal-1', 'd4-bilal-hussain-004', 'Streetwear Design', NOW()),
('s10-bilal-2', 'd4-bilal-hussain-004', 'Screen Printing', NOW()),
('s11-bilal-3', 'd4-bilal-hussain-004', 'Graphic Design', NOW()),
('s12-ayesha-1', 'd5-ayesha-khan-005', 'Zardozi Embroidery', NOW()),
('s13-ayesha-2', 'd5-ayesha-khan-005', 'Bridal Couture', NOW()),
('s14-ayesha-3', 'd5-ayesha-khan-005', 'Hand Embroidery', NOW()),
('s15-hassan-1', 'd6-hassan-raza-006', 'Sherwani Tailoring', NOW()),
('s16-hassan-2', 'd6-hassan-raza-006', 'Hand Embroidery', NOW()),
('s17-sana-1', 'd7-sana-malik-007', 'Sustainable Pattern Cutting', NOW()),
('s18-sana-2', 'd7-sana-malik-007', 'Natural Dyeing', NOW()),
('s19-sana-3', 'd7-sana-malik-007', 'Zero-Waste Design', NOW()),
('s20-omar-1', 'd8-omar-farooq-008', 'Textile Art', NOW()),
('s21-omar-2', 'd8-omar-farooq-008', 'Hand Painting', NOW()),
('s22-omar-3', 'd8-omar-farooq-008', 'Experimental Dyeing', NOW()),
('s23-mariam-1', 'd9-mariam-sheikh-009', 'Workwear Design', NOW()),
('s24-mariam-2', 'd9-mariam-sheikh-009', 'Pattern Cutting', NOW()),
('s25-aliya-1', 'd10-aliya-hassan-010', 'Ajrak Printing', NOW()),
('s26-aliya-2', 'd10-aliya-hassan-010', 'Phulkari Embroidery', NOW()),
('s27-aliya-3', 'd10-aliya-hassan-010', 'Artisan Collaboration', NOW());

-- ==========================================
-- SOCIAL LINKS
-- ==========================================

INSERT INTO designer_social_links (id, designer_id, instagram, website, email, created_at)
VALUES 
('sl1-nazia', 'd1-nazia-otho-001', '@naziaotho', 'https://naziaotho.com', 'hello@naziaotho.com', NOW()),
('sl2-zara', 'd2-zara-ahmad-002', '@zaraahmadstudio', 'https://zaraahmad.com', 'info@zaraahmad.com', NOW()),
('sl3-fatima', 'd3-fatima-noor-003', '@fatimanoor', 'https://fatimanoor.com', 'contact@fatimanoor.com', NOW()),
('sl4-bilal', 'd4-bilal-hussain-004', '@bhbybilal', 'https://bhbybilal.com', 'hello@bhbybilal.com', NOW()),
('sl5-ayesha', 'd5-ayesha-khan-005', '@ayeshakhanatelier', 'https://ayeshakhan.com', 'bookings@ayeshakhan.com', NOW()),
('sl6-hassan', 'd6-hassan-raza-006', '@hrmenswear', 'https://hrmenswear.com', 'info@hrmenswear.com', NOW()),
('sl7-sana', 'd7-sana-malik-007', '@sanamalilstudio', 'https://sanamalik.com', 'hello@sanamalik.com', NOW()),
('sl8-omar', 'd8-omar-farooq-008', '@omarfarooqart', 'https://omarfarooq.art', 'studio@omarfarooq.art', NOW()),
('sl9-mariam', 'd9-mariam-sheikh-009', '@mspret', 'https://mspret.com', 'info@mspret.com', NOW()),
('sl10-aliya', 'd10-aliya-hassan-010', '@aliyahassan', 'https://aliyahassan.com', 'hello@aliyahassan.com', NOW());

-- ==========================================
-- CERTIFICATIONS
-- ==========================================

INSERT INTO designer_certifications (id, designer_id, certification, created_at)
VALUES 
('cert1-ayesha', 'd5-ayesha-khan-005', 'PFDC Certified Designer', NOW()),
('cert2-hassan', 'd6-hassan-raza-006', 'PFDC Certified Designer', NOW()),
('cert3-aliya', 'd10-aliya-hassan-010', 'Pakistan Craft Council Certified', NOW()),
('cert4-sana', 'd7-sana-malik-007', 'Sustainable Fashion Certification - Textile Exchange', NOW());

-- ==========================================
-- DONE!
-- ==========================================
