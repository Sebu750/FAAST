-- ============================================
-- DESIGNERS SEED DATA
-- ============================================
-- Migrates hardcoded data from DesignerProfile.tsx
-- 10 designers with all related data
-- ============================================

-- ============================================
-- DESIGNER 1: Zara Ahmad
-- ============================================
INSERT INTO designers (id, slug, name, brand, location, nationality, languages, experience, specialization, category, gender, bio, short_bio, philosophy, image_url, cover_image_url, availability, is_featured, is_active)
VALUES (
  'a1b2c3d4-e5f6-7890-abcd-ef1234567890',
  'zara-ahmad',
  'Zara Ahmad',
  'Zara Ahmad Studio',
  'Lahore, Pakistan',
  'Pakistani',
  'English, Urdu, Punjabi',
  '8 years',
  'Womenswear & Luxury Pret',
  'Womenswear',
  'Female',
  'Zara Ahmad is a Lahore-based designer known for her mastery of traditional embroidery techniques reinterpreted through a contemporary lens. After graduating from the National College of Arts with distinction, she launched her eponymous label with a commitment to proving that heritage craft and modern design are not opposing forces — they are the same conversation, spoken across generations. Her atelier in the historic Walled City of Lahore employs over 30 artisans, many of whom are third-generation embroiderers. Each collection begins with extensive field research into regional textile traditions, from the phulkari of Punjab to the ajrak of Sindh, recontextualized for the modern wardrobe.',
  'Contemporary womenswear rooted in heritage embroidery and quiet luxury.',
  'I believe in the intelligence of restraint. Every stitch carries the weight of centuries — my role is not to overwrite that history, but to give it a contemporary voice. Design should honour the hand that made it.',
  '/images/designers/zara-ahmad.webp',
  '/images/designers/zara-ahmad-cover.webp',
  'Available for orders',
  TRUE,
  TRUE
);

INSERT INTO designer_collections (designer_id, title, season, description, inspiration, looks, cover_image_url, images, is_latest)
VALUES 
  ('a1b2c3d4-e5f6-7890-abcd-ef1234567890', 'The Architect''s Garden', 'Spring/Summer 2026', 'A meditation on the geometric gardens of Mughal Lahore — structured silhouettes softened by hand-embroidered botanicals.', 'Shalimar Gardens, Lahore', 24, '/images/collections/architects-garden.webp', ARRAY['/images/collections/architects-garden-1.webp', '/images/collections/architects-garden-2.webp', '/images/collections/architects-garden-3.webp', '/images/collections/architects-garden-4.webp', '/images/collections/architects-garden-5.webp', '/images/collections/architects-garden-6.webp'], TRUE),
  ('a1b2c3d4-e5f6-7890-abcd-ef1234567890', 'Khaddar Reimagined', 'Autumn/Winter 2025', 'Traditional khaddar fabric deconstructed into modern silhouettes — oversized blazers, sculptural coats, and tailored separates.', 'Punjabi weaving traditions', 18, '/images/collections/khaddar-reimagined.webp', ARRAY['/images/collections/khaddar-1.webp', '/images/collections/khaddar-2.webp', '/images/collections/khaddar-3.webp', '/images/collections/khaddar-4.webp'], FALSE),
  ('a1b2c3d4-e5f6-7890-abcd-ef1234567890', 'Mirror & Thread', 'Spring/Summer 2025', 'Exploring the reflective quality of mirror work in contemporary evening wear — each piece catches light like a whispered secret.', 'Sindhi mirror work traditions', 16, '/images/collections/mirror-thread.webp', ARRAY['/images/collections/mirror-1.webp', '/images/collections/mirror-2.webp', '/images/collections/mirror-3.webp'], FALSE);

INSERT INTO designer_education (designer_id, institution, degree, year)
VALUES 
  ('a1b2c3d4-e5f6-7890-abcd-ef1234567890', 'National College of Arts, Lahore', 'BFA in Textile Design', '2016'),
  ('a1b2c3d4-e5f6-7890-abcd-ef1234567890', 'Central Saint Martins, London', 'Short Course in Fashion Futures', '2018');

INSERT INTO designer_achievements (designer_id, title, detail)
VALUES 
  ('a1b2c3d4-e5f6-7890-abcd-ef1234567890', 'LUXE Style Awards — Best Emerging Designer', '2023'),
  ('a1b2c3d4-e5f6-7890-abcd-ef1234567890', 'Pakistan Fashion Week — Featured Designer', '2024, 2025'),
  ('a1b2c3d4-e5f6-7890-abcd-ef1234567890', 'Vogue Pakistan — "Designers to Watch"', '2024'),
  ('a1b2c3d4-e5f6-7890-abcd-ef1234567890', 'British Council Fashion Exchange', 'Resident Designer, 2023');

INSERT INTO designer_skills (designer_id, skill)
VALUES 
  ('a1b2c3d4-e5f6-7890-abcd-ef1234567890', 'Womenswear'),
  ('a1b2c3d4-e5f6-7890-abcd-ef1234567890', 'Luxury Fashion'),
  ('a1b2c3d4-e5f6-7890-abcd-ef1234567890', 'Textile Design'),
  ('a1b2c3d4-e5f6-7890-abcd-ef1234567890', 'Sustainable Fashion'),
  ('a1b2c3d4-e5f6-7890-abcd-ef1234567890', 'Fashion Illustration'),
  ('a1b2c3d4-e5f6-7890-abcd-ef1234567890', 'Pattern Making');

INSERT INTO designer_certifications (designer_id, certification)
VALUES 
  ('a1b2c3d4-e5f6-7890-abcd-ef1234567890', 'Certified Sustainable Textile Practitioner'),
  ('a1b2c3d4-e5f6-7890-abcd-ef1234567890', 'Pakistan Fashion Design Council Member');

INSERT INTO designer_social_links (designer_id, instagram, facebook, website, email, shop, portfolio)
VALUES ('a1b2c3d4-e5f6-7890-abcd-ef1234567890', '#', '#', '#', 'mailto:studio@zaraahmad.pk', '#', '#');

-- ============================================
-- DESIGNER 2: Bilal Hussain
-- ============================================
INSERT INTO designers (id, slug, name, brand, location, nationality, languages, experience, specialization, category, gender, bio, short_bio, philosophy, image_url, cover_image_url, availability, is_featured, is_active)
VALUES (
  'b2c3d4e5-f6a7-8901-bcde-f12345678901',
  'bilal-hussain',
  'Bilal Hussain',
  'BH by Bilal',
  'Karachi, Pakistan',
  'Pakistani',
  'English, Urdu, Sindhi',
  '6 years',
  'Menswear & Street Couture',
  'Menswear',
  'Male',
  'Bilal Hussain redefines Pakistani menswear by merging street culture with traditional craftsmanship. Born and raised in Karachi''s vibrant arts district, he studied at Indus Valley School of Art and Architecture before apprenticing with heritage menswear tailors in Jodhpur and Delhi. His work speaks to a new generation of men who wear their heritage with confidence — structured kurtas with utility pockets, bomber jackets with traditional embroidery, and shalwar kameez reimagined with streetwear proportions.',
  'Redefining Pakistani menswear at the intersection of street culture and craft.',
  'Menswear in Pakistan has always been caught between tradition and modernity. I don''t see that tension — I see an opportunity. My work lives in the space where a Karachi street corner meets a Rajasthani workshop.',
  '/images/designers/bilal-hussain.webp',
  '/images/designers/bilal-hussain-cover.webp',
  'Accepting commissions',
  FALSE,
  TRUE
);

INSERT INTO designer_collections (designer_id, title, season, description, inspiration, looks, cover_image_url, images, is_latest)
VALUES 
  ('b2c3d4e5-f6a7-8901-bcde-f12345678901', 'Concrete Heritage', 'Spring/Summer 2026', 'Urban silhouettes meet heritage textile — utility jackets with ajrak linings, structured kurtas with hidden pockets.', 'Karachi street culture', 20, '/images/collections/concrete-heritage.webp', ARRAY['/images/collections/concrete-1.webp', '/images/collections/concrete-2.webp', '/images/collections/concrete-3.webp'], TRUE),
  ('b2c3d4e5-f6a7-8901-bcde-f12345678901', 'The Karachi Uniform', 'Autumn/Winter 2025', 'A study in everyday dressing — elevated basics that bridge the gap between traditional and contemporary menswear.', 'Daily life in Karachi', 14, '/images/collections/karachi-uniform.webp', ARRAY['/images/collections/karachi-1.webp', '/images/collections/karachi-2.webp'], FALSE);

INSERT INTO designer_education (designer_id, institution, degree, year)
VALUES ('b2c3d4e5-f6a7-8901-bcde-f12345678901', 'Indus Valley School of Art and Architecture, Karachi', 'BFA in Fashion Design', '2018');

INSERT INTO designer_achievements (designer_id, title, detail)
VALUES 
  ('b2c3d4e5-f6a7-8901-bcde-f12345678901', 'Fashion Pakistan Week — Menswear Finalist', '2024'),
  ('b2c3d4e5-f6a7-8901-bcde-f12345678901', 'Hum Style Awards — Best Menswear', '2025'),
  ('b2c3d4e5-f6a7-8901-bcde-f12345678901', 'DAWN Images — "New Guard of Pakistani Menswear"', '2024');

INSERT INTO designer_skills (designer_id, skill)
VALUES 
  ('b2c3d4e5-f6a7-8901-bcde-f12345678901', 'Menswear'),
  ('b2c3d4e5-f6a7-8901-bcde-f12345678901', 'Ready-to-Wear'),
  ('b2c3d4e5-f6a7-8901-bcde-f12345678901', 'Fashion Illustration'),
  ('b2c3d4e5-f6a7-8901-bcde-f12345678901', 'Styling'),
  ('b2c3d4e5-f6a7-8901-bcde-f12345678901', 'Streetwear');

INSERT INTO designer_certifications (designer_id, certification)
VALUES ('b2c3d4e5-f6a7-8901-bcde-f12345678901', 'Pakistan Fashion Design Council — Certified Member');

INSERT INTO designer_social_links (designer_id, instagram, tiktok, website, email)
VALUES ('b2c3d4e5-f6a7-8901-bcde-f12345678901', '#', '#', '#', 'mailto:bilal@bhbybilal.com');

-- ============================================
-- DESIGNER 3: Fatima Noor
-- ============================================
INSERT INTO designers (id, slug, name, brand, location, nationality, languages, experience, specialization, category, gender, bio, short_bio, philosophy, image_url, cover_image_url, availability, is_featured, is_active)
VALUES (
  'c3d4e5f6-a7b8-9012-cdef-123456789012',
  'fatima-noor',
  'Fatima Noor',
  'Maison Fatima Noor',
  'Islamabad, Pakistan',
  'Pakistani',
  'English, Urdu, French',
  '12 years',
  'Bridal Couture & Formal Wear',
  'Bridal',
  'Female',
  'Fatima Noor creates bridal masterpieces that honour centuries of Pakistani textile tradition. Each piece is an editorial statement — sculptural, intentional, and deeply personal. Her maison in Islamabad''s F-7 market is known for its intimate consultations and meticulous attention to detail. With over 200 bridal commissions completed, Fatima has become the designer of choice for women who want their wedding wardrobe to tell a story.',
  'Sculptural bridal couture honouring centuries of Pakistani textile tradition.',
  'A bridal outfit is not a costume — it is an heirloom in the making. I design for the woman who understands that what she wears on her wedding day will be remembered in photographs, in stories, in the fabric passed down to her daughters.',
  '/images/designers/fatima-noor.webp',
  '/images/designers/fatima-noor-cover.webp',
  'Booking season 2026',
  TRUE,
  TRUE
);

INSERT INTO designer_collections (designer_id, title, season, description, inspiration, looks, cover_image_url, images, is_latest)
VALUES 
  ('c3d4e5f6-a7b8-9012-cdef-123456789012', 'Noor Nama', 'Bridal 2026', 'A celebration of light in textile — gold and silver thread work on ivory and blush, inspired by Mughal miniature painting.', 'Mughal miniature art', 16, '/images/collections/noor-nama.webp', ARRAY['/images/collections/noor-1.webp', '/images/collections/noor-2.webp', '/images/collections/noor-3.webp'], TRUE),
  ('c3d4e5f6-a7b8-9012-cdef-123456789012', 'The Gold Thread Diaries', 'Bridal 2025', 'Traditional zardozi and dabka work reinterpreted for the modern bride — lighter constructions, bolder silhouettes.', 'Lahore''s Walled City heritage', 22, '/images/collections/gold-thread.webp', ARRAY['/images/collections/gold-1.webp', '/images/collections/gold-2.webp'], FALSE),
  ('c3d4e5f6-a7b8-9012-cdef-123456789012', 'Raagini', 'Formal 2025', 'A formal wear collection inspired by classical music — each piece named after a raga, designed to move with the body in motion.', 'Classical ragas', 12, '/images/collections/raagini.webp', ARRAY['/images/collections/raagini-1.webp', '/images/collections/raagini-2.webp'], FALSE);

INSERT INTO designer_education (designer_id, institution, degree, year)
VALUES 
  ('c3d4e5f6-a7b8-9012-cdef-123456789012', 'Pakistan Institute of Fashion & Design, Islamabad', 'BDes in Fashion Design', '2012'),
  ('c3d4e5f6-a7b8-9012-cdef-123456789012', 'Institut Français de la Mode, Paris', 'Couture Techniques Certificate', '2014');

INSERT INTO designer_achievements (designer_id, title, detail)
VALUES 
  ('c3d4e5f6-a7b8-9012-cdef-123456789012', 'Bridal Asia Awards — Designer of the Year', '2024'),
  ('c3d4e5f6-a7b8-9012-cdef-123456789012', 'Fashion Pakistan Couture Week — Opening Designer', '2023, 2024, 2025'),
  ('c3d4e5f6-a7b8-9012-cdef-123456789012', 'Harper''s Bazaar Arabia — Featured Pakistani Designer', '2024'),
  ('c3d4e5f6-a7b8-9012-cdef-123456789012', '200+ Bridal Commissions Completed', '2014–2026');

INSERT INTO designer_skills (designer_id, skill)
VALUES 
  ('c3d4e5f6-a7b8-9012-cdef-123456789012', 'Bridal'),
  ('c3d4e5f6-a7b8-9012-cdef-123456789012', 'Couture'),
  ('c3d4e5f6-a7b8-9012-cdef-123456789012', 'Luxury Fashion'),
  ('c3d4e5f6-a7b8-9012-cdef-123456789012', 'Surface Design'),
  ('c3d4e5f6-a7b8-9012-cdef-123456789012', 'Embroidery'),
  ('c3d4e5f6-a7b8-9012-cdef-123456789012', 'Pattern Making');

INSERT INTO designer_certifications (designer_id, certification)
VALUES 
  ('c3d4e5f6-a7b8-9012-cdef-123456789012', 'PFDC Certified Couturier'),
  ('c3d4e5f6-a7b8-9012-cdef-123456789012', 'Craft Revival Trust — Master Artisan Partner');

INSERT INTO designer_social_links (designer_id, instagram, facebook, pinterest, website, email)
VALUES ('c3d4e5f6-a7b8-9012-cdef-123456789012', '#', '#', '#', '#', 'mailto:brides@maisonfatimanoor.pk');

-- ============================================
-- DESIGNER 4: Nazia Otho
-- ============================================
INSERT INTO designers (id, slug, name, brand, location, nationality, languages, experience, specialization, category, gender, bio, short_bio, philosophy, image_url, cover_image_url, availability, is_featured, is_active)
VALUES (
  'd4e5f6a7-b8c9-0123-def1-234567890123',
  'nazia-otho',
  'Nazia Otho',
  'Nazia Otho',
  'Hyderabad, Pakistan',
  'Pakistani',
  'English, Urdu, Sindhi',
  '5 years',
  'Sustainable Fashion & Craft Revival',
  'Sustainable',
  'Female',
  'Nazia Otho is a pioneer of sustainable fashion in Pakistan, working directly with artisan communities in Sindh to revive endangered textile techniques and bring them to the global stage. Her practice is built on deep collaboration — not extraction — with craftspeople, ensuring fair wages, creative credit, and cultural preservation.',
  'Reviving endangered textile techniques through sustainable design practice.',
  'Sustainability in Pakistan isn''t a trend — it''s a return to how things were always done. My grandmother''s generation didn''t waste fabric. They didn''t mass-produce. They made things that lasted. I''m just bringing that intelligence back.',
  '/images/designers/nazia-otho.webp',
  '/images/designers/nazia-otho-cover.webp',
  'Available for collaborations',
  FALSE,
  TRUE
);

INSERT INTO designer_collections (designer_id, title, season, description, inspiration, looks, cover_image_url, images, is_latest)
VALUES 
  ('d4e5f6a7-b8c9-0123-def1-234567890123', 'Sindhu', 'Spring/Summer 2026', 'Hand-block printed textiles from Sindh — each motif sourced from 300-year-old wooden blocks preserved by artisan families.', 'Indus Valley textile heritage', 14, '/images/collections/sindhu.webp', ARRAY['/images/collections/sindhu-1.webp', '/images/collections/sindhu-2.webp'], TRUE),
  ('d4e5f6a7-b8c9-0123-def1-234567890123', 'Artisan''s Archive', 'Autumn/Winter 2025', 'A documentation project turned collection — traditional Sindhi motifs translated into contemporary separates.', 'Sindhi craft archives', 10, '/images/collections/artisan-archive.webp', ARRAY['/images/collections/artisan-1.webp'], FALSE);

INSERT INTO designer_education (designer_id, institution, degree, year)
VALUES 
  ('d4e5f6a7-b8c9-0123-def1-234567890123', 'University of Sindh, Jamshoro', 'BA in Fine Arts', '2019'),
  ('d4e5f6a7-b8c9-0123-def1-234567890123', 'NED University, Karachi', 'Certificate in Sustainable Textile Practices', '2021');

INSERT INTO designer_achievements (designer_id, title, detail)
VALUES 
  ('d4e5f6a7-b8c9-0123-def1-234567890123', 'UNESCO Craft Innovation Award', '2025'),
  ('d4e5f6a7-b8c9-0123-def1-234567890123', 'Elle Pakistan — "Sustainability Pioneer"', '2024'),
  ('d4e5f6a7-b8c9-0123-def1-234567890123', 'British Council — Creative Entrepreneur Award', '2024');

INSERT INTO designer_skills (designer_id, skill)
VALUES 
  ('d4e5f6a7-b8c9-0123-def1-234567890123', 'Sustainable Fashion'),
  ('d4e5f6a7-b8c9-0123-def1-234567890123', 'Textile Design'),
  ('d4e5f6a7-b8c9-0123-def1-234567890123', 'Surface Design'),
  ('d4e5f6a7-b8c9-0123-def1-234567890123', 'Accessories'),
  ('d4e5f6a7-b8c9-0123-def1-234567890123', 'Craft Revival');

INSERT INTO designer_certifications (designer_id, certification)
VALUES 
  ('d4e5f6a7-b8c9-0123-def1-234567890123', 'World Craft Council — Certified Artisan Partner'),
  ('d4e5f6a7-b8c9-0123-def1-234567890123', 'Fashion for Good — Sustainable Design Fellow');

INSERT INTO designer_social_links (designer_id, instagram, linkedin, website, email)
VALUES ('d4e5f6a7-b8c9-0123-def1-234567890123', '#', '#', '#', 'mailto:hello@naziaotho.com');

-- ============================================
-- DESIGNER 5: Ayesha Siddiqui
-- ============================================
INSERT INTO designers (id, slug, name, brand, location, nationality, languages, experience, specialization, category, gender, bio, short_bio, philosophy, image_url, cover_image_url, availability, is_featured, is_active)
VALUES (
  'e5f6a7b8-c9d0-1234-ef12-345678901234',
  'ayesha-siddiqui',
  'Ayesha Siddiqui',
  'AS Formal',
  'Lahore, Pakistan',
  'Pakistani',
  'English, Urdu',
  '7 years',
  'Luxury Pret & Formal Wear',
  'Womenswear',
  'Female',
  'Ayesha Siddiqui designs for the modern Pakistani woman who demands both elegance and substance. Her luxury pret line balances architectural silhouettes with wearable ease — pieces that transition from boardroom to dinner without missing a beat.',
  'Architectural silhouettes and wearable elegance for the modern Pakistani woman.',
  'Clothes should work as hard as the women who wear them. I design for real life — but I make it look effortless.',
  '/images/designers/ayesha-siddiqui.webp',
  '/images/designers/ayesha-siddiqui-cover.webp',
  'Ready-to-wear available',
  FALSE,
  TRUE
);

INSERT INTO designer_collections (designer_id, title, season, description, inspiration, looks, cover_image_url, images, is_latest)
VALUES 
  ('e5f6a7b8-c9d0-1234-ef12-345678901234', 'Structural Ease', 'Spring/Summer 2026', 'Architectural pret wear designed for movement — fluid trousers, deconstructed kurtas, and tailored capes.', 'Modernist architecture of Lahore', 18, '/images/collections/structural-ease.webp', ARRAY['/images/collections/structural-1.webp', '/images/collections/structural-2.webp'], TRUE),
  ('e5f6a7b8-c9d0-1234-ef12-345678901234', 'The Power Edit', 'Autumn/Winter 2025', 'Formal wear for women who lead — structured blazers, wide-leg trousers, and statement coats.', 'Working women of Pakistan', 14, '/images/collections/power-edit.webp', ARRAY['/images/collections/power-1.webp'], FALSE);

INSERT INTO designer_education (designer_id, institution, degree, year)
VALUES ('e5f6a7b8-c9d0-1234-ef12-345678901234', 'NCA Lahore', 'BFA Fashion Design', '2017');

INSERT INTO designer_achievements (designer_id, title, detail)
VALUES 
  ('e5f6a7b8-c9d0-1234-ef12-345678901234', 'Fashion Pakistan Week — Pret Finalist', '2024'),
  ('e5f6a7b8-c9d0-1234-ef12-345678901234', 'News International — "Women in Business"', '2025');

INSERT INTO designer_skills (designer_id, skill)
VALUES 
  ('e5f6a7b8-c9d0-1234-ef12-345678901234', 'Womenswear'),
  ('e5f6a7b8-c9d0-1234-ef12-345678901234', 'Ready-to-Wear'),
  ('e5f6a7b8-c9d0-1234-ef12-345678901234', 'Luxury Fashion'),
  ('e5f6a7b8-c9d0-1234-ef12-345678901234', 'Pattern Making');

INSERT INTO designer_certifications (designer_id, certification)
VALUES ('e5f6a7b8-c9d0-1234-ef12-345678901234', 'PFDC Member');

INSERT INTO designer_social_links (designer_id, instagram, facebook, website, email)
VALUES ('e5f6a7b8-c9d0-1234-ef12-345678901234', '#', '#', '#', 'mailto:info@asformal.pk');

-- ============================================
-- DESIGNER 6: Hassan Raza
-- ============================================
INSERT INTO designers (id, slug, name, brand, location, nationality, languages, experience, specialization, category, gender, bio, short_bio, philosophy, image_url, cover_image_url, availability, is_featured, is_active)
VALUES (
  'f6a7b8c9-d0e1-2345-f123-456789012345',
  'hassan-raza',
  'Hassan Raza',
  'HR Menswear',
  'Karachi, Pakistan',
  'Pakistani',
  'English, Urdu',
  '5 years',
  'Menswear & Couture',
  'Menswear',
  'Male',
  'Hassan Raza brings a sculptor''s eye to menswear. His structured silhouettes and experimental fabric treatments have earned him recognition at multiple international fashion platforms.',
  'Sculptural menswear with experimental fabric treatments and structured silhouettes.',
  'I approach fabric the way a sculptor approaches stone — with respect for the material and a vision for what it can become.',
  '/images/designers/hassan-raza.webp',
  '/images/designers/hassan-raza-cover.webp',
  'Made-to-order',
  FALSE,
  TRUE
);

INSERT INTO designer_collections (designer_id, title, season, description, inspiration, looks, cover_image_url, images, is_latest)
VALUES 
  ('f6a7b8c9-d0e1-2345-f123-456789012345', 'Monolith', 'Spring/Summer 2026', 'Sculptural menswear exploring volume and structure — oversized shoulders, compressed waists, and architectural draping.', 'Brutalist architecture', 16, '/images/collections/monolith.webp', ARRAY['/images/collections/monolith-1.webp', '/images/collections/monolith-2.webp'], TRUE);

INSERT INTO designer_education (designer_id, institution, degree, year)
VALUES ('f6a7b8c9-d0e1-2345-f123-456789012345', 'Indus Valley School of Art, Karachi', 'BFA Fashion', '2019');

INSERT INTO designer_achievements (designer_id, title, detail)
VALUES ('f6a7b8c9-d0e1-2345-f123-456789012345', 'PFDC Menswear Award — Nominee', '2025');

INSERT INTO designer_skills (designer_id, skill)
VALUES 
  ('f6a7b8c9-d0e1-2345-f123-456789012345', 'Menswear'),
  ('f6a7b8c9-d0e1-2345-f123-456789012345', 'Couture'),
  ('f6a7b8c9-d0e1-2345-f123-456789012345', 'Pattern Making'),
  ('f6a7b8c9-d0e1-2345-f123-456789012345', 'Fashion Illustration');

INSERT INTO designer_social_links (designer_id, instagram, linkedin, website)
VALUES ('f6a7b8c9-d0e1-2345-f123-456789012345', '#', '#', '#');

-- ============================================
-- DESIGNER 7: Sana Khalid
-- ============================================
INSERT INTO designers (id, slug, name, brand, location, nationality, languages, experience, specialization, category, gender, bio, short_bio, philosophy, image_url, cover_image_url, availability, is_featured, is_active)
VALUES (
  'a7b8c9d0-e1f2-3456-1234-567890123456',
  'sana-khalid',
  'Sana Khalid',
  'Sana Khalid Textiles',
  'Islamabad, Pakistan',
  'Pakistani',
  'English, Urdu',
  '4 years',
  'Textile & Surface Design',
  'Textile',
  'Female',
  'Sana Khalid is a textile artist turned fashion designer whose work explores the boundary between craft and contemporary design. Her hand-painted textiles are exhibited internationally.',
  'Hand-painted textiles exploring the boundary between craft and contemporary design.',
  'Textile is the oldest human art form. Every thread carries memory. I paint on fabric because it remembers every touch.',
  '/images/designers/sana-khalid.webp',
  '/images/designers/sana-khalid-cover.webp',
  'Studio open for visits',
  FALSE,
  TRUE
);

INSERT INTO designer_collections (designer_id, title, season, description, inspiration, looks, cover_image_url, images, is_latest)
VALUES 
  ('a7b8c9d0-e1f2-3456-1234-567890123456', 'Chromatic Landscape', 'Spring/Summer 2026', 'Hand-painted silk and cotton textiles inspired by Pakistan''s northern landscapes — Hunza valleys, Deosai plains, and the Arabian Sea coast.', 'Pakistan''s natural landscapes', 12, '/images/collections/chromatic-landscape.webp', ARRAY['/images/collections/chromatic-1.webp', '/images/collections/chromatic-2.webp'], TRUE);

INSERT INTO designer_education (designer_id, institution, degree, year)
VALUES ('a7b8c9d0-e1f2-3456-1234-567890123456', 'Quaid-i-Azam University, Islamabad', 'BFA Fine Arts', '2020');

INSERT INTO designer_achievements (designer_id, title, detail)
VALUES ('a7b8c9d0-e1f2-3456-1234-567890123456', 'Jamini Art Gallery — Solo Exhibition', '2025');

INSERT INTO designer_skills (designer_id, skill)
VALUES 
  ('a7b8c9d0-e1f2-3456-1234-567890123456', 'Textile Design'),
  ('a7b8c9d0-e1f2-3456-1234-567890123456', 'Surface Design'),
  ('a7b8c9d0-e1f2-3456-1234-567890123456', 'Sustainable Fashion'),
  ('a7b8c9d0-e1f2-3456-1234-567890123456', 'Fashion Illustration');

INSERT INTO designer_certifications (designer_id, certification)
VALUES ('a7b8c9d0-e1f2-3456-1234-567890123456', 'Textile Design Certificate — NCA Lahore');

INSERT INTO designer_social_links (designer_id, instagram, pinterest, website)
VALUES ('a7b8c9d0-e1f2-3456-1234-567890123456', '#', '#', '#');

-- ============================================
-- DESIGNER 8: Omar Farooq
-- ============================================
INSERT INTO designers (id, slug, name, brand, location, nationality, languages, experience, specialization, category, gender, bio, short_bio, philosophy, image_url, cover_image_url, availability, is_featured, is_active)
VALUES (
  'b8c9d0e1-f2a3-4567-2345-678901234567',
  'omar-farooq',
  'Omar Farooq',
  'OF Studio',
  'Lahore, Pakistan',
  'Pakistani',
  'English, Urdu, Punjabi',
  '3 years',
  'Contemporary Streetwear',
  'Streetwear',
  'Male',
  'Omar Farooq is the voice of Pakistan''s new-gen streetwear movement. His designs blend Urdu calligraphy, pop culture, and premium construction into pieces that feel both local and global.',
  'Pakistan''s new-gen streetwear — Urdu calligraphy meets premium construction.',
  'Streetwear in Pakistan isn''t just about looking cool — it''s about claiming identity. I design for young Pakistan who refuse to choose between their roots and their future.',
  '/images/designers/omar-farooq.webp',
  '/images/designers/omar-farooq-cover.webp',
  'Drops quarterly',
  FALSE,
  TRUE
);

INSERT INTO designer_collections (designer_id, title, season, description, inspiration, looks, cover_image_url, images, is_latest)
VALUES 
  ('b8c9d0e1-f2a3-4567-2345-678901234567', 'Hurriyat', 'Drop 04 — 2026', 'Urdu calligraphy meets streetwear — hand-drawn typography on premium blanks, oversized fits, and limited-edition screen prints.', 'Urdu literary tradition', 10, '/images/collections/hurriyat.webp', ARRAY['/images/collections/hurriyat-1.webp', '/images/collections/hurriyat-2.webp'], TRUE);

INSERT INTO designer_education (designer_id, institution, degree, year)
VALUES ('b8c9d0e1-f2a3-4567-2345-678901234567', 'Beaconhouse National University, Lahore', 'BA Visual Communications', '2021');

INSERT INTO designer_achievements (designer_id, title, detail)
VALUES ('b8c9d0e1-f2a3-4567-2345-678901234567', 'Pakistani Streetwear Awards — Best New Brand', '2025');

INSERT INTO designer_skills (designer_id, skill)
VALUES 
  ('b8c9d0e1-f2a3-4567-2345-678901234567', 'Streetwear'),
  ('b8c9d0e1-f2a3-4567-2345-678901234567', 'Ready-to-Wear'),
  ('b8c9d0e1-f2a3-4567-2345-678901234567', 'Surface Design'),
  ('b8c9d0e1-f2a3-4567-2345-678901234567', 'Styling');

INSERT INTO designer_social_links (designer_id, instagram, tiktok, facebook, website)
VALUES ('b8c9d0e1-f2a3-4567-2345-678901234567', '#', '#', '#', '#');

-- ============================================
-- DESIGNER 9: Mehreen Ali
-- ============================================
INSERT INTO designers (id, slug, name, brand, location, nationality, languages, experience, specialization, category, gender, bio, short_bio, philosophy, image_url, cover_image_url, availability, is_featured, is_active)
VALUES (
  'c9d0e1f2-a3b4-5678-3456-789012345678',
  'mehreen-ali',
  'Mehreen Ali',
  'Mehreen Ali Couture',
  'Karachi, Pakistan',
  'Pakistani',
  'English, Urdu',
  '10 years',
  'Couture & Occasion Wear',
  'Womenswear',
  'Female',
  'Mehreen Ali''s couture is defined by its restraint — where others add, she subtracts. Her occasion wear is for women who understand that true luxury whispers.',
  'Restrained couture for women who understand that true luxury whispers.',
  'Luxury is not about excess. It is about precision — the perfect seam, the exact drape, the fabric that moves like water.',
  '/images/designers/mehreen-ali.webp',
  '/images/designers/mehreen-ali-cover.webp',
  'By appointment',
  TRUE,
  TRUE
);

INSERT INTO designer_collections (designer_id, title, season, description, inspiration, looks, cover_image_url, images, is_latest)
VALUES 
  ('c9d0e1f2-a3b4-5678-3456-789012345678', 'Less, But Better', 'Formal 2026', 'A study in reduction — six silhouettes, each perfected over months, in a palette of ivory, stone, and midnight.', 'Dieter Rams'' design principles', 6, '/images/collections/less-but-better.webp', ARRAY['/images/collections/less-1.webp', '/images/collections/less-2.webp'], TRUE);

INSERT INTO designer_education (designer_id, institution, degree, year)
VALUES ('c9d0e1f2-a3b4-5678-3456-789012345678', 'PIFD, Islamabad', 'BDes Fashion Design', '2014');

INSERT INTO designer_achievements (designer_id, title, detail)
VALUES ('c9d0e1f2-a3b4-5678-3456-789012345678', 'Couture Pakistan — Designer of the Year', '2024');

INSERT INTO designer_skills (designer_id, skill)
VALUES 
  ('c9d0e1f2-a3b4-5678-3456-789012345678', 'Couture'),
  ('c9d0e1f2-a3b4-5678-3456-789012345678', 'Luxury Fashion'),
  ('c9d0e1f2-a3b4-5678-3456-789012345678', 'Bridal'),
  ('c9d0e1f2-a3b4-5678-3456-789012345678', 'Pattern Making');

INSERT INTO designer_certifications (designer_id, certification)
VALUES ('c9d0e1f2-a3b4-5678-3456-789012345678', 'PFDC Certified');

INSERT INTO designer_social_links (designer_id, instagram, facebook, pinterest, website, email)
VALUES ('c9d0e1f2-a3b4-5678-3456-789012345678', '#', '#', '#', '#', 'mailto:atelier@mehreenali.com');

-- ============================================
-- DESIGNER 10: Kamran Sheikh
-- ============================================
INSERT INTO designers (id, slug, name, brand, location, nationality, languages, experience, specialization, category, gender, bio, short_bio, philosophy, image_url, cover_image_url, availability, is_featured, is_active)
VALUES (
  'd0e1f2a3-b4c5-6789-4567-890123456789',
  'kamran-sheikh',
  'Kamran Sheikh',
  'KS Heritage',
  'Multan, Pakistan',
  'Pakistani',
  'English, Urdu, Saraiki',
  '15 years',
  'Heritage Craft & Menswear',
  'Menswear',
  'Male',
  'Kamran Sheikh works from Multan to preserve the city''s legendary blue pottery and glazed tile traditions, translating them into wearable art that honours centuries of craft.',
  'Translating Multan''s legendary craft traditions into wearable heritage.',
  'Multan has been a city of crafts for a thousand years. I am not inventing anything — I am translating what already exists into a language the next generation can wear.',
  '/images/designers/kamran-sheikh.webp',
  '/images/designers/kamran-sheikh-cover.webp',
  'Limited editions',
  FALSE,
  TRUE
);

INSERT INTO designer_collections (designer_id, title, season, description, inspiration, looks, cover_image_url, images, is_latest)
VALUES 
  ('d0e1f2a3-b4c5-6789-4567-890123456789', 'Blue City', 'Autumn/Winter 2026', 'Multan''s iconic blue glazed tiles translated into textile prints and embroidered motifs — indigo, cobalt, and white on raw cotton.', 'Multan blue pottery', 14, '/images/collections/blue-city.webp', ARRAY['/images/collections/blue-1.webp', '/images/collections/blue-2.webp'], TRUE);

INSERT INTO designer_education (designer_id, institution, degree, year)
VALUES ('d0e1f2a3-b4c5-6789-4567-890123456789', 'NCA Multan Campus', 'BFA Decorative Arts', '2009');

INSERT INTO designer_achievements (designer_id, title, detail)
VALUES 
  ('d0e1f2a3-b4c5-6789-4567-890123456789', 'UNESCO Craft Innovation Award', '2024'),
  ('d0e1f2a3-b4c5-6789-4567-890123456789', 'Multan Heritage Ambassador', '2023');

INSERT INTO designer_skills (designer_id, skill)
VALUES 
  ('d0e1f2a3-b4c5-6789-4567-890123456789', 'Menswear'),
  ('d0e1f2a3-b4c5-6789-4567-890123456789', 'Textile Design'),
  ('d0e1f2a3-b4c5-6789-4567-890123456789', 'Surface Design'),
  ('d0e1f2a3-b4c5-6789-4567-890123456789', 'Sustainable Fashion');

INSERT INTO designer_certifications (designer_id, certification)
VALUES ('d0e1f2a3-b4c5-6789-4567-890123456789', 'UNESCO Craft Heritage Guardian');

INSERT INTO designer_social_links (designer_id, instagram, website)
VALUES ('d0e1f2a3-b4c5-6789-4567-890123456789', '#', '#');
