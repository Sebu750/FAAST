-- Full Profile Seed: Anusha Mansoor
-- Run in Supabase SQL Editor
CREATE EXTENSION IF NOT EXISTS pgcrypto;

-- ============================================
-- 1. DESIGNERS TABLE — Full Profile
-- ============================================
UPDATE designers SET
  name = 'Anusha Mansoor',
  brand = 'Multan-Inspired Streetwear Saree',
  location = 'Karachi',
  nationality = 'Pakistani',
  languages = 'English, Urdu',
  experience = 'Karachi School of Arts, 2025',
  specialization = 'Streetwear, Heritage Textiles, Saree Design',
  category = 'Fashion Design Student',
  gender = 'Female',
  short_bio = 'A visionary designer and graduate of the Karachi School of Arts (2025). Anusha specializes in bridging the gap between traditional Pakistani heritage and modern, trend-forward streetwear. Her work is characterized by cultural storytelling, vibrant color palettes, and a focus on practical, everyday elegance.',
  bio = 'Anusha Mansoor is a Karachi-based fashion designer whose work reimagines Pakistan''s rich textile heritage through the lens of contemporary streetwear. A 2025 graduate of the Karachi School of Arts, she draws deep inspiration from Multan''s iconic tile patterns, traditional craft techniques, and the vibrant color stories of South Asian culture. Her designs are rooted in the belief that heritage fashion can be both culturally proud and effortlessly modern — creating pieces that speak to a new generation of urban fashionistas who refuse to choose between tradition and trend. Anusha''s approach centers on lightweight, easy-to-drape silhouettes that make ethnic fashion versatile and practical for everyday wear.',
  philosophy = 'Reimagining tradition for the contemporary urban fashionista, blending cultural pride with effortless, modern chic.',
  image_url = NULL,
  cover_image_url = 'https://drive.google.com/open?id=1_ZzcjI-WDr',
  availability = 'Open to collaborations and commissions',
  is_active = true,
  is_featured = false
WHERE slug = 'anusha-mansoor';

-- ============================================
-- 2. DESIGNER COLLECTIONS
-- ============================================

-- Latest Collection
INSERT INTO designer_collections (id, designer_id, title, season, description, inspiration, looks, cover_image_url, images, is_latest)
SELECT gen_random_uuid(), d.id,
  'Multan-Inspired Streetwear Saree',
  'SS 2025',
  'An innovative take on the traditional saree, redesigned for the modern urban landscape. Features vibrant yellow and blue hues inspired by the rich cultural artistry and iconic tile patterns of Multan. Key features include lightweight fabrics, easy-to-drape silhouettes, and a fusion of traditional aesthetic with modern cuts.',
  'Multan''s heritage motifs and the desire to make ethnic fashion more versatile and practical for streetwear. The iconic blue and yellow tile work of Multan''s shrines and mosques served as the primary visual reference.',
  6,
  'https://drive.google.com/open?id=1_ZzcjI-WDr',
  ARRAY[
    'https://drive.google.com/open?id=1_ZzcjI-WDr'
  ],
  true
FROM designers d WHERE d.slug = 'anusha-mansoor'
ON CONFLICT DO NOTHING;

-- Previous Collection
INSERT INTO designer_collections (id, designer_id, title, season, description, inspiration, looks, is_latest)
SELECT gen_random_uuid(), d.id,
  'Urban Drapes',
  'FW 2024',
  'A semester project exploring the intersection of Western streetwear silhouettes and Eastern draping techniques. The collection featured oversized hoodies with saree-inspired pleating, denim jackets with ajrak print linings, and structured trousers crafted from traditional khaddar fabric.',
  'Observing how young Pakistanis naturally blend Eastern and Western wear in daily life — the way a kurta gets paired with sneakers, or a saree gets styled with a leather jacket.',
  4,
  false
FROM designers d WHERE d.slug = 'anusha-mansoor'
ON CONFLICT DO NOTHING;

-- ============================================
-- 3. DESIGNER EDUCATION
-- ============================================
INSERT INTO designer_education (id, designer_id, institution, degree, year)
SELECT gen_random_uuid(), d.id, 'Karachi School of Arts', 'BFA in Fashion Design', '2025'
FROM designers d WHERE d.slug = 'anusha-mansoor'
ON CONFLICT DO NOTHING;

-- ============================================
-- 4. DESIGNER ACHIEVEMENTS
-- ============================================
INSERT INTO designer_achievements (id, designer_id, title, detail) VALUES
  (gen_random_uuid(), (SELECT id FROM designers WHERE slug = 'anusha-mansoor'),
   'Adorzia Spotlight Shortlistee', 'Selected for the Adorzia Spotlight program for emerging designers, recognized for innovative fusion of heritage craft with streetwear aesthetics.'),
  (gen_random_uuid(), (SELECT id FROM designers WHERE slug = 'anusha-mansoor'),
   'Best Thesis Collection — Karachi School of Arts 2025', 'Awarded for the Multan-Inspired Streetwear Saree collection, praised for cultural relevance and commercial viability.'),
  (gen_random_uuid(), (SELECT id FROM designers WHERE slug = 'anusha-mansoor'),
   'Pakistan Fashion Showcase Participant', 'Showcased work at the Pakistan Fashion Showcase 2025, representing the next generation of Pakistani fashion designers.')
ON CONFLICT DO NOTHING;

-- ============================================
-- 5. DESIGNER SKILLS
-- ============================================
INSERT INTO designer_skills (id, designer_id, skill)
SELECT gen_random_uuid(), d.id, skill
FROM designers d,
LATERAL (VALUES
  ('Saree Draping & Construction'),
  ('Textile Sourcing & Fabric Selection'),
  ('Pattern Making & Draping'),
  ('Heritage Textile Integration'),
  ('Streetwear Silhouette Design'),
  ('Color Theory & Palette Development'),
  ('Adobe Illustrator'),
  ('Adobe Photoshop'),
  ('Fashion Illustration'),
  ('Sustainable Design Practices')
) AS t(skill)
WHERE d.slug = 'anusha-mansoor'
ON CONFLICT DO NOTHING;

-- ============================================
-- 6. DESIGNER CERTIFICATIONS
-- ============================================
INSERT INTO designer_certifications (id, designer_id, certification)
SELECT gen_random_uuid(), d.id, cert
FROM designers d,
LATERAL (VALUES
  ('BFA Fashion Design — Karachi School of Arts, 2025'),
  ('Textile & Surface Design Workshop — Indus Valley School of Art and Architecture'),
  ('Sustainable Fashion Practices — Pakistan Fashion Council')
) AS t(cert)
WHERE d.slug = 'anusha-mansoor'
ON CONFLICT DO NOTHING;

-- ============================================
-- 7. SOCIAL LINKS
-- ============================================
INSERT INTO designer_social_links (id, designer_id, email, instagram, portfolio)
SELECT gen_random_uuid(), d.id, 'anumans158@gmail.com', 'https://www.instagram.com/fashiontales12', 'Collection Assets Folder'
FROM designers d WHERE d.slug = 'anusha-mansoor'
ON CONFLICT (designer_id) DO UPDATE SET
  email = EXCLUDED.email,
  instagram = EXCLUDED.instagram,
  portfolio = EXCLUDED.portfolio;

-- ============================================
-- VERIFY
-- ============================================
SELECT 'Designer' AS type, d.name, d.brand, d.location, d.specialization, d.category
FROM designers d WHERE d.slug = 'anusha-mansoor'
UNION ALL
SELECT 'Collection', c.title, c.season, CAST(c.looks AS TEXT), CASE WHEN c.is_latest THEN 'Latest' ELSE 'Previous' END, NULL
FROM designer_collections c
JOIN designers d ON d.id = c.designer_id WHERE d.slug = 'anusha-mansoor'
UNION ALL
SELECT 'Education', e.institution, e.degree, e.year, NULL, NULL
FROM designer_education e
JOIN designers d ON d.id = e.designer_id WHERE d.slug = 'anusha-mansoor'
UNION ALL
SELECT 'Achievement', a.title, LEFT(a.detail, 60), NULL, NULL, NULL
FROM designer_achievements a
JOIN designers d ON d.id = a.designer_id WHERE d.slug = 'anusha-mansoor'
UNION ALL
SELECT 'Skill', s.skill, NULL, NULL, NULL, NULL
FROM designer_skills s
JOIN designers d ON d.id = s.designer_id WHERE d.slug = 'anusha-mansoor';
