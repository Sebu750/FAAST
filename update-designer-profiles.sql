-- Update existing designer profiles with Spotlight application data
-- Uses ONLY existing columns — no new columns added
-- Run this in Supabase SQL Editor

-- ============================================
-- UPDATE DESIGNERS TABLE
-- ============================================

-- Aleena Moin — Shade's Shuffles
UPDATE designers SET
  location = 'Karachi',
  brand = 'Shade''s Shuffles',
  philosophy = 'The Shades Shuffle Color Blocking Fashion Theme is a vibrant trend that combines bold, bright hues in mismatched, shuffled ways. It celebrates creativity and self-expression through unexpected color pairings, geometric shapes, and contrasting textures, allowing individuals to showcase their unique style.',
  experience = 'Indus University, 2025',
  cover_image_url = 'https://drive.google.com/open?id=1MuF7ETqTpdgCfpzDov2XnwyhMouEINxa'
WHERE slug = 'aleena-moin';

-- Aleena Talha — PUNK X TOKYO
UPDATE designers SET
  location = 'Karachi',
  brand = 'PUNK X TOKYO',
  philosophy = 'This collection is a mix of punk fashion and Tokyo street style, and also my biggest inspiration was Vivienne Westwood designer considered queen of punk. So my theme brings together tartan prints, sharp details, and bright city colors. The designs include elements like chains, spikes, metal studs, and graphic text, creating a strong and edgy look. Pink neon shades reflect the energy of Tokyo nights, while the overall style is loud, confident, and modern. It shows a fearless attitude, youth culture, and a bold way of expressing individuality through fashion.',
  experience = 'Asian Institute of Fashion Design, 2025',
  cover_image_url = 'https://drive.google.com/open?id=1BeiCykeXeTW_6IcBlfXMjJeezQ591le1'
WHERE slug = 'aleena-talha';

-- Amna — LOST IN TIME
UPDATE designers SET
  location = 'Karachi',
  brand = 'LOST IN TIME',
  philosophy = 'Inspiration & Concept: My collection, "Lost in Time: Ancient Elegance of Greece and Rome Meets Macrame", is inspired by the graceful drapes and silhouettes of Ancient Greek and Roman attire. I reimagined these classical elements using macrame — a handcrafted knotting technique — to create a fusion of ancient elegance and modern craftsmanship. Key Elements: Flowing draped silhouettes inspired by togas and chitons; Macrame detailing replacing embroidery for texture and structure; Soft fabrics like chiffon and georgette with hand-knotted rope; A neutral color palette with a touch of tea pink; A theme that blends history, art, and handmade techniques.',
  experience = 'AIFD, 2025',
  cover_image_url = 'https://drive.google.com/open?id=1LRYRL7brJWDKB1ex8NcI8mar2QxlxYca'
WHERE slug = 'amna-mahmood';

-- Amna Salam — Caught in the Middle
UPDATE designers SET
  location = 'Faisalabad',
  brand = 'Caught in the Middle',
  philosophy = 'My work is a reflection of my personal journey as a middle child — an experience that deeply shaped my identity and creative voice. Often positioned between roles and expectations, I learned to navigate a space of contrast and balance. Rather than viewing this as a challenge, I came to embrace it as a powerful source of individuality and expression. Caught in the Middle is a collection that captures this journey of self-discovery through design and personal photography. It explores the nuances of growing up in-between, where adaptation and creativity became essential tools for understanding myself and the world around me. Through this collection, I aim to communicate the richness of the middle space — not as something to overcome, but as something to celebrate.',
  experience = 'The Millennium Universal College Faisalabad (TMUC), 2025',
  cover_image_url = 'https://drive.google.com/open?id=1fui2ZjWucZCyKaB6-uhRTtoAxfoF5yed'
WHERE slug = 'amna-salam';

-- Amna Shams — Fashion Ride with Broom
UPDATE designers SET
  location = 'Lahore',
  brand = 'Fashion Ride with Broom',
  philosophy = 'The famous broom witch character inspired by Tom & Jerry but you can also see it in Wizard of Oz as well as Harry Potter and many more. This thesis is the representation of witch character generating 3 vibes at a time: dirty, horror and fashionable.',
  experience = 'UMT Lahore, 2022',
  cover_image_url = 'https://drive.google.com/open?id=1QdqD0KnO1npGN-m8xRWgkZxu3ulXOiGg'
WHERE slug = 'amna-shams';

-- Amna Tariq — The Divine Glow
UPDATE designers SET
  location = 'Karachi',
  brand = 'The Divine Glow',
  philosophy = 'Embodying strength through softness — my collection transforms femininity into power, blending fluid forms and resin details that mirror the resilience, grace, and unapologetic force of women.',
  experience = 'National Textile University, 2025',
  cover_image_url = 'https://drive.google.com/open?id=1ZibbahCtEc94fDIKt1v-YnB305NO-2Xz'
WHERE slug = 'amna-tariq';

-- Anoosha Kumari — Kintsugi
UPDATE designers SET
  location = 'Karachi',
  brand = 'Kintsugi',
  philosophy = 'My collection is inspired by the Japanese art of Kintsugi, which finds beauty in brokenness. The concept transforms cracks into golden seams, symbolizing resilience and self-empowerment. Flowing silhouettes, asymmetry, and layered textures reflect fragments coming together, while gold accents highlight strength within imperfections. This collection redefines flaws as features, celebrating individuality and healing through fashion.',
  experience = 'Asian Institute of Fashion Designing, 2025',
  cover_image_url = 'https://drive.google.com/open?id=1lxYGDSkgd3Ov5FWAhsiq4QNlHzQPUGPc'
WHERE slug = 'anoosha-kumari';

-- Anusha Mansoor — Multan-Inspired Streetwear Saree
UPDATE designers SET
  location = 'Karachi',
  brand = 'Multan-Inspired Streetwear Saree',
  short_bio = 'A visionary designer and graduate of the Karachi School of Arts (2025). Anusha specializes in bridging the gap between traditional Pakistani heritage and modern, trend-forward streetwear. Her work is characterized by cultural storytelling, vibrant color palettes, and a focus on practical, everyday elegance.',
  bio = 'An innovative take on the traditional saree, redesigned for the modern urban landscape. It features vibrant yellow and blue hues inspired by the rich cultural artistry and iconic tile patterns of Multan. Key features include lightweight fabrics, easy-to-drape silhouettes, and a fusion of traditional aesthetic with modern cuts.',
  philosophy = 'Reimagining tradition for the contemporary urban fashionista, blending cultural pride with effortless, modern chic.',
  experience = 'Karachi School of Arts, 2025',
  cover_image_url = 'https://drive.google.com/open?id=1_ZzcjI-WDr'
WHERE slug = 'anusha-mansoor';

-- Zarafshan — Shahmaran
UPDATE designers SET
  location = 'Karachi',
  brand = 'Shahmaran',
  short_bio = 'Shahmaran is a mythical creature — half human, half snake — representing the dual nature of humanity. The black snake represents her sister Lilith, and the golden represents Shahmaran herself.',
  philosophy = 'Key elements are snakes — the black snake represents her sister Lilith and the golden represents Shahmaran herself. Shahmaran is a mythical creature half human, half snake, which represents the two sides of humans who are double-faced. But the story of Shahmaran is inspiring because Shahmaran herself gave sacrifices of herself just for humanity.',
  experience = 'AIFD, 2025',
  cover_image_url = 'https://drive.google.com/open?id=1NHdecMo5af-Roxhvj6EigVLCpXcIf5Qr'
WHERE slug = 'zarafshan';

-- ============================================
-- UPSERT SOCIAL LINKS
-- ============================================

-- Aleena Moin
INSERT INTO designer_social_links (id, designer_id, email, portfolio)
SELECT gen_random_uuid(), d.id, 'aleenamoin00@gmail.com', 'https://photos.app.goo.gl/TZxKrDW5bcspdoEd6'
FROM designers d WHERE d.slug = 'aleena-moin'
ON CONFLICT (designer_id) DO UPDATE SET
  email = EXCLUDED.email,
  portfolio = EXCLUDED.portfolio;

-- Aleena Talha
INSERT INTO designer_social_links (id, designer_id, email, instagram)
SELECT gen_random_uuid(), d.id, 'Aleena.shoro@gmail.com', 'https://www.instagram.com/fashiondiariesby_aleena'
FROM designers d WHERE d.slug = 'aleena-talha'
ON CONFLICT (designer_id) DO UPDATE SET
  email = EXCLUDED.email,
  instagram = EXCLUDED.instagram;

-- Amna
INSERT INTO designer_social_links (id, designer_id, email)
SELECT gen_random_uuid(), d.id, 'amnakaliwala658@gmail.com'
FROM designers d WHERE d.slug = 'amna-mahmood'
ON CONFLICT (designer_id) DO UPDATE SET
  email = EXCLUDED.email;

-- Amna Salam
INSERT INTO designer_social_links (id, designer_id, email)
SELECT gen_random_uuid(), d.id, 'Amnasalam03@gmail.com'
FROM designers d WHERE d.slug = 'amna-salam'
ON CONFLICT (designer_id) DO UPDATE SET
  email = EXCLUDED.email;

-- Amna Shams
INSERT INTO designer_social_links (id, designer_id, email, instagram)
SELECT gen_random_uuid(), d.id, 'aas0078600@gmail.com', 'https://instagram.com/as.artgalleria'
FROM designers d WHERE d.slug = 'amna-shams'
ON CONFLICT (designer_id) DO UPDATE SET
  email = EXCLUDED.email,
  instagram = EXCLUDED.instagram;

-- Amna Tariq
INSERT INTO designer_social_links (id, designer_id, email, instagram)
SELECT gen_random_uuid(), d.id, 'Amnaatariq26@gmail.com', 'https://www.instagram.com/by.amnatariq'
FROM designers d WHERE d.slug = 'amna-tariq'
ON CONFLICT (designer_id) DO UPDATE SET
  email = EXCLUDED.email,
  instagram = EXCLUDED.instagram;

-- Anoosha Kumari
INSERT INTO designer_social_links (id, designer_id, email)
SELECT gen_random_uuid(), d.id, 'anushathakur456@gmail.com'
FROM designers d WHERE d.slug = 'anoosha-kumari'
ON CONFLICT (designer_id) DO UPDATE SET
  email = EXCLUDED.email;

-- Anusha Mansoor
INSERT INTO designer_social_links (id, designer_id, email, instagram, portfolio)
SELECT gen_random_uuid(), d.id, 'anumans158@gmail.com', 'https://www.instagram.com/fashiontales12', 'Collection Assets Folder'
FROM designers d WHERE d.slug = 'anusha-mansoor'
ON CONFLICT (designer_id) DO UPDATE SET
  email = EXCLUDED.email,
  instagram = EXCLUDED.instagram,
  portfolio = EXCLUDED.portfolio;

-- Zarafshan
INSERT INTO designer_social_links (id, designer_id, email, portfolio)
SELECT gen_random_uuid(), d.id, 'Zarafshanpervez2525@gmail.com', 'Zahvez by zarafshan pervez'
FROM designers d WHERE d.slug = 'zarafshan'
ON CONFLICT (designer_id) DO UPDATE SET
  email = EXCLUDED.email,
  portfolio = EXCLUDED.portfolio;

-- ============================================
-- VERIFY
-- ============================================
SELECT d.slug, d.name, d.brand, d.location, d.experience, d.philosophy IS NOT NULL AS has_philosophy,
       ds.email, ds.instagram, ds.portfolio
FROM designers d
LEFT JOIN designer_social_links ds ON ds.designer_id = d.id
WHERE d.slug IN ('aleena-moin','aleena-talha','amna-mahmood','amna-salam','amna-shams','amna-tariq','anoosha-kumari','anusha-mansoor','zarafshan')
ORDER BY d.name;
