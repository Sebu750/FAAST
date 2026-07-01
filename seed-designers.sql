-- ==========================================
-- ADORZIA DESIGNER SEED DATA
-- 10 Pakistani Fashion Designers
-- ==========================================

-- Clear existing designer data (optional - comment out if you want to keep existing)
-- DELETE FROM designer_social_links;
-- DELETE FROM designer_certifications;
-- DELETE FROM designer_skills;
-- DELETE FROM designer_achievements;
-- DELETE FROM designer_education;
-- DELETE FROM designer_collections;
-- DELETE FROM designers;

-- ==========================================
-- DESIGNER 1: Nazia Otho
-- ==========================================
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

-- ==========================================
-- DESIGNER 2: Zara Ahmad
-- ==========================================
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

-- ==========================================
-- DESIGNER 3: Fatima Noor
-- ==========================================
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

-- ==========================================
-- DESIGNER 4: Bilal Hussain
-- ==========================================
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

-- ==========================================
-- DESIGNER 5: Ayesha Khan
-- ==========================================
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

-- ==========================================
-- DESIGNER 6: Hassan Raza
-- ==========================================
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

-- ==========================================
-- DESIGNER 7: Sana Malik
-- ==========================================
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

-- ==========================================
-- DESIGNER 8: Omar Farooq
-- ==========================================
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

-- ==========================================
-- DESIGNER 9: Mariam Sheikh
-- ==========================================
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

-- ==========================================
-- DESIGNER 10: Aliya Hassan
-- ==========================================
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
-- COLLECTIONS FOR DESIGNERS
-- ==========================================

-- Nazia Otho Collections
INSERT INTO designer_collections (id, designer_id, title, season, description, inspiration, looks, cover_image_url, is_latest, created_at)
VALUES 
('c1-nazia-001', 'd1-nazia-otho-001', 'Urban Heritage', 'SS24', 'A contemporary exploration of Karachi''s architectural heritage through modern silhouettes and traditional textile techniques.', 'The juxtaposition of colonial-era buildings with modern urban life in Karachi.', 24, '/src/assets/brand1.webp', false, NOW()),
('c2-nazia-002', 'd1-nazia-otho-001', 'Midnight Bloom', 'FW24', 'An evening wear collection inspired by the nocturnal gardens of Lahore, featuring rich jewel tones and intricate embroidery.', 'Mughal gardens at night, moonlit pathways, and blooming jasmine.', 18, '/src/assets/brand2.webp', true, NOW());

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

-- Aliya Hassan Collections
INSERT INTO designer_collections (id, designer_id, title, season, description, inspiration, looks, cover_image_url, is_latest, created_at)
VALUES 
('c9-aliya-001', 'd10-aliya-hassan-010', 'Ajrak Modern', 'SS24', 'A contemporary interpretation of traditional Sindhi ajrak printing, featuring modern silhouettes and updated color palettes.', 'The ancient craft of ajrak block printing and the Indus Valley civilization.', 20, '/src/assets/ajrak-architect-coat-adorzia1.webp', false, NOW()),
('c10-aliya-002', 'd10-aliya-hassan-010', 'Phulkari Reborn', 'FW24', 'A luxury collection reviving the traditional Punjabi phulkari embroidery technique through contemporary design.', 'The vibrant folk art of Punjab and the storytelling tradition of phulkari.', 18, '/src/assets/phulkari-reborn-blazer-adorzia.webp', true, NOW());

-- ==========================================
-- EDUCATION FOR DESIGNERS
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
-- ACHIEVEMENTS FOR DESIGNERS
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
-- SKILLS FOR DESIGNERS
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
-- SOCIAL LINKS FOR DESIGNERS
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
-- CERTIFICATIONS FOR DESIGNERS
-- ==========================================

INSERT INTO designer_certifications (id, designer_id, certification, created_at)
VALUES 
('cert1-ayesha', 'd5-ayesha-khan-005', 'PFDC Certified Designer', NOW()),
('cert2-hassan', 'd6-hassan-raza-006', 'PFDC Certified Designer', NOW()),
('cert3-aliya', 'd10-aliya-hassan-010', 'Pakistan Craft Council Certified', NOW()),
('cert4-sana', 'd7-sana-malik-007', 'Sustainable Fashion Certification - Textile Exchange', NOW());
