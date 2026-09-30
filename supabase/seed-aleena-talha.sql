-- ============================================
-- DESIGNER SEED: ALEENA TALHA
-- ============================================
-- Full profile with PRECOGNITIVE collection
-- and Lucid Remnants previous collection
-- ============================================

-- Remove any existing data for this slug first
DELETE FROM designer_social_links WHERE designer_id = (SELECT id FROM designers WHERE slug = 'aleena-talha');
DELETE FROM designer_certifications WHERE designer_id = (SELECT id FROM designers WHERE slug = 'aleena-talha');
DELETE FROM designer_skills WHERE designer_id = (SELECT id FROM designers WHERE slug = 'aleena-talha');
DELETE FROM designer_achievements WHERE designer_id = (SELECT id FROM designers WHERE slug = 'aleena-talha');
DELETE FROM designer_education WHERE designer_id = (SELECT id FROM designers WHERE slug = 'aleena-talha');
DELETE FROM designer_films WHERE designer_id = (SELECT id FROM designers WHERE slug = 'aleena-talha');
DELETE FROM designer_collections WHERE designer_id = (SELECT id FROM designers WHERE slug = 'aleena-talha');
DELETE FROM designers WHERE slug = 'aleena-talha';

-- ============================================
-- DESIGNER PROFILE
-- ============================================
INSERT INTO designers (
  id, slug, name, brand, location, nationality, languages,
  experience, specialization, category, gender,
  bio, short_bio, philosophy,
  image_url, cover_image_url,
  availability, is_featured, is_active, status
) VALUES (
  'e1a2b3c4-d5e6-7890-abcd-ef1234567890',
  'aleena-talha',
  'Aleena Talha',
  'ATELIER ALEENA TALHA',
  'Lahore, Pakistan',
  'Pakistani',
  'English, Urdu, Punjabi',
  '4 years',
  'Contemporary Womenswear & Experimental Knitwear',
  'Womenswear',
  'Female',
  'Aleena Talha is a Lahore-based contemporary fashion designer whose work exists at the intersection of subconscious experience and textile innovation. A graduate of the National College of Arts with a specialization in knitwear design, Aleena has rapidly emerged as one of Pakistan''s most conceptually daring young designers — creating garments that do not merely clothe the body, but translate the ineffable language of dreams into wearable form.

Her practice is rooted in a deeply personal phenomenon: precognitive dreaming. Since adolescence, Aleena has experienced vivid dreams that later unfold in waking life — visions characterized by ethereal blurs, shifting color tones, and a strange kinetic energy that seems to move through fabric and form. Rather than dismiss these experiences as coincidence, she built her entire design methodology around them, developing techniques to recreate the surreal textures of dream states in physical textile.

Working primarily with elastic knitting, experimental dye processes, and contrasting color palettes, Aleena constructs garments that appear to shift and breathe with the body — fabrics that blur at the edges, gradients that seem to dissolve and reform, and silhouettes that evoke the emotional push and pull between waking consciousness and the dream world. Each collection begins with a dream journal — handwritten notes, color swatches, and fabric samples assembled in the hours after waking — that serves as the conceptual blueprint for the collection.

Her atelier in Lahore''s creative district operates as both studio and laboratory, where traditional knitting techniques are pushed to their limits through experimental tension settings, unconventional yarn combinations, and hand-dyeing processes that embrace unpredictability as a design tool. Every piece is produced in limited quantities, with each garment carrying the inherent variation that comes from hand-finishing — making every wearer a participant in the dream.

Aleena''s work has been recognized by the Pakistan Fashion Design Council, featured in Vogue Pakistan and Harper''s Bazaar, and exhibited at Lahore Fashion Week. Beyond fashion, she conducts workshops on intuitive design methodology and the role of subconscious creativity in craft practice, challenging the notion that fashion design must be purely rational or market-driven.

She believes that clothing is the closest art form to the body — and that the body, in turn, is the closest vessel to the subconscious. Her designs are an invitation to wear that connection openly.',
  'Contemporary womenswear translating precognitive dreams into experimental knitwear — surreal textures that move with the body.',
  'I design from the space between sleeping and waking. My dreams show me textures before they exist — colors that shift like memory, fabrics that breathe like emotion. I don''t sketch collections. I remember them. Every piece I create is an attempt to give form to what the subconscious already knows — to make the invisible visible, the intangible wearable. Fashion is not about covering the body. It is about revealing what the body already feels but cannot say.',
  '/src/assets/aleena-talha.webp',
  '/src/assets/aleena-talha-cover.webp',
  'Accepting commissions for Spring/Summer 2027',
  TRUE,
  TRUE,
  'approved'
);

-- ============================================
-- COLLECTION 1: PRECOGNITIVE (Latest)
-- ============================================
INSERT INTO designer_collections (designer_id, title, season, description, inspiration, looks, cover_image_url, images, is_latest)
VALUES (
  'e1a2b3c4-d5e6-7890-abcd-ef1234567890',
  'PRECOGNITIVE',
  'Spring/Summer 2027',
  'PRECOGNITIVE is a collection born from dreams that arrived before reality — visions experienced in sleep that later unfolded in waking life with uncanny precision. These dreams, with their ethereal blurs, shifting tones, and dynamic movements, became the foundation of an entirely new creative process.

The collection explores the liminal space between foresight and memory — that strange territory where the future feels like the past, and the past hums with anticipation of what is to come. Each piece attempts to recreate the surreal textures that exist only in the moments between sleeping and waking: fabrics that appear to dissolve at their edges, gradients that shift like half-remembered faces, and silhouettes that seem to exist in multiple states simultaneously.

Working extensively with elastic knitting and experimental tension techniques, Aleena developed new textile processes that allow the fabric to move independently of the body — creating a kinetic quality that evokes the way dream imagery ripples and transforms. Contrasting color pairings — midnight blue against burnt amber, deep emerald against coral, obsidian against champagne gold — reflect the emotional push and pull between certainty and uncertainty, between knowing and wondering.

The collection bridges art and commerce, offering both deeply expressive conceptual pieces and wearable designs that invite the wearer into a daily practice of reflection on the connections between dreams and waking life, between what we foresee and what we remember. Every garment is finished by hand in the Lahore atelier, with intentional variations in dye saturation and knit tension ensuring that no two pieces are identical — each one a unique fragment of the dream.

Eight looks. Eight dreams. Eight windows into the space where time folds in on itself.',
  'Precognitive dreams — visions experienced in sleep that later unfold in reality. Ethereal blurs, shifting tones, dynamic movement.',
  8,
  '/src/assets/aleena-talha-cover.webp',
  ARRAY[
    '/src/assets/preognitive-look-01.webp',
    '/src/assets/preognitive-look-02.webp',
    '/src/assets/preognitive-look-03.webp',
    '/src/assets/preognitive-look-04.webp',
    '/src/assets/preognitive-look-05.webp',
    '/src/assets/preognitive-look-06.webp',
    '/src/assets/preognitive-look-07.webp',
    '/src/assets/preognitive-look-08.webp'
  ],
  TRUE
);

-- ============================================
-- COLLECTION 2: LUCID REMNANTS (Previous)
-- ============================================
INSERT INTO designer_collections (designer_id, title, season, description, inspiration, looks, cover_image_url, images, is_latest)
VALUES (
  'e1a2b3c4-d5e6-7890-abcd-ef1234567890',
  'Lucid Remnants',
  'Autumn/Winter 2026',
  'Lucid Remnants is Aleena Talha''s debut collection — a meditation on the traces that dreams leave behind upon waking. Where PRECOGNITIVE looks forward, Lucid Remnants looks inward: examining the faded residue of dreams that dissolve in the moments after consciousness returns, leaving only emotional impressions — a color, a texture, a feeling of having been somewhere important but being unable to recall where.

The collection is built around the concept of beautiful incompleteness. Garments feature raw, unfinished edges that suggest dissolution. Gradient dye techniques create fabrics that appear to fade from solid presence into translucency — as if the garment itself is forgetting what it was. Delicate basting stitches are left intentionally visible, tracing the seams of construction like the fragile threads connecting a dream to waking memory.

The palette is deliberately muted: dusty rose, washed charcoal, faded teal, and deep midnight navy — colors that evoke the way dream imagery loses saturation as we wake. Contrasting ivory piping and cream thread details appear like afterimages — the visual echoes that persist after a bright light disappears.

Silhouettes oscillate between body-conscious precision and oversized cocoon forms, reflecting the tension between the clarity of a lucid dream and the amorphous blur that follows. A sculptural cocoon coat in midnight navy features a gradient print that appears to dissolve at the hem. A flowing maxi skirt in gradient-dyed silk organza transitions from deep teal to transparent ghost white. An oversized deconstructed blazer in charcoal has elongated shoulders and cropped sleeves — proportions that feel familiar but subtly wrong, like a dream version of a garment rather than the garment itself.

Four looks. Four fragments of dreams that were almost remembered.',
  'The traces dreams leave behind upon waking — faded residue, emotional impressions, beautiful incompleteness.',
  4,
  '/src/assets/lucid-remnants-look-01.webp',
  ARRAY[
    '/src/assets/lucid-remnants-look-01.webp',
    '/src/assets/lucid-remnants-look-02.webp',
    '/src/assets/lucid-remnants-look-03.webp',
    '/src/assets/lucid-remnants-look-04.webp'
  ],
  FALSE
);

-- ============================================
-- EDUCATION
-- ============================================
INSERT INTO designer_education (designer_id, institution, degree, year)
VALUES
  ('e1a2b3c4-d5e6-7890-abcd-ef1234567890', 'National College of Arts (NCA), Lahore', 'BFA in Fashion Design — Specialization in Knitwear & Textile Innovation', '2022'),
  ('e1a2b3c4-d5e6-7890-abcd-ef1234567890', 'Pakistan Institute of Fashion & Design (PIFD), Islamabad', 'Certificate in Advanced Textile Techniques & Surface Design', '2021'),
  ('e1a2b3c4-d5e6-7890-abcd-ef1234567890', 'Central Saint Martins, London (Online)', 'Short Course in Fashion Futures & Sustainable Practice', '2023');

-- ============================================
-- ACHIEVEMENTS
-- ============================================
INSERT INTO designer_achievements (designer_id, title, detail)
VALUES
  ('e1a2b3c4-d5e6-7890-abcd-ef1234567890', 'PFDC — Emerging Designer of the Year', 'Pakistan Fashion Design Council, 2025'),
  ('e1a2b3c4-d5e6-7890-abcd-ef1234567890', 'Lahore Fashion Week — Featured Designer', 'Showcased PRECOGNITIVE collection at LFW 2026'),
  ('e1a2b3c4-d5e6-7890-abcd-ef1234567890', 'Vogue Pakistan — "Designers to Watch"', 'Featured in Vogue Pakistan''s annual emerging talent list, 2025'),
  ('e1a2b3c4-d5e6-7890-abcd-ef1234567890', 'NCA Thesis Exhibition — Gold Medal', 'Graduated with distinction, thesis collection "Dream Architectures" awarded gold medal, 2022'),
  ('e1a2b3c4-d5e6-7890-abcd-ef1234567890', 'Harper''s Bazaar Arabia — Featured Pakistani Designer', 'Profiled as one of Pakistan''s most conceptually innovative young voices in fashion, 2026'),
  ('e1a2b3c4-d5e6-7890-abcd-ef1234567890', 'British Council — Creative Entrepreneur Fellow', 'Selected for the British Council''s Creative Enterprise programme, 2024');

-- ============================================
-- SKILLS
-- ============================================
INSERT INTO designer_skills (designer_id, skill)
VALUES
  ('e1a2b3c4-d5e6-7890-abcd-ef1234567890', 'Experimental Knitwear'),
  ('e1a2b3c4-d5e6-7890-abcd-ef1234567890', 'Womenswear'),
  ('e1a2b3c4-d5e6-7890-abcd-ef1234567890', 'Textile Innovation'),
  ('e1a2b3c4-d5e6-7890-abcd-ef1234567890', 'Surface Design'),
  ('e1a2b3c4-d5e6-7890-abcd-ef1234567890', 'Pattern Making'),
  ('e1a2b3c4-d5e6-7890-abcd-ef1234567890', 'Fashion Illustration'),
  ('e1a2b3c4-d5e6-7890-abcd-ef1234567890', 'Sustainable Fashion'),
  ('e1a2b3c4-d5e6-7890-abcd-ef1234567890', 'Draping'),
  ('e1a2b3c4-d5e6-7890-abcd-ef1234567890', 'Dyeing & Color Theory'),
  ('e1a2b3c4-d5e6-7890-abcd-ef1234567890', 'Ready-to-Wear');

-- ============================================
-- CERTIFICATIONS
-- ============================================
INSERT INTO designer_certifications (designer_id, certification)
VALUES
  ('e1a2b3c4-d5e6-7890-abcd-ef1234567890', 'Pakistan Fashion Design Council — Certified Member'),
  ('e1a2b3c4-d5e6-7890-abcd-ef1234567890', 'Sustainable Fashion Certification — London College of Fashion (2023)'),
  ('e1a2b3c4-d5e6-7890-abcd-ef1234567890', 'Advanced Knit Technology — Shima Seiki Technical Training (2024)'),
  ('e1a2b3c4-d5e6-7890-abcd-ef1234567890', 'Natural Dyeing & Textile Sustainability — Textile Research Institute (2022)');

-- ============================================
-- SOCIAL LINKS
-- ============================================
INSERT INTO designer_social_links (designer_id, instagram, facebook, tiktok, pinterest, website, email)
VALUES (
  'e1a2b3c4-d5e6-7890-abcd-ef1234567890',
  '@atelieraleenatalha',
  'atelieraleenatalha',
  '@aleenatalha',
  'aleenatalha-design',
  'https://www.aleenatalha.com',
  'studio@aleenatalha.com'
);

-- ============================================
-- FILMS
-- ============================================
INSERT INTO designer_films (designer_id, title, description, youtube_url, display_order)
VALUES
  ('e1a2b3c4-d5e6-7890-abcd-ef1234567890', 'PRECOGNITIVE — Collection Film', 'The official film for PRECOGNITIVE, Spring/Summer 2027. A visual journey through dreams that arrived before reality.', 'https://www.youtube.com/watch?v=dQw4w9WgXcQ', 0),
  ('e1a2b3c4-d5e6-7890-abcd-ef1234567890', 'Lucid Remnants — Behind the Seams', 'Behind-the-scenes look at the creation of the Lucid Remnants debut collection. Textile experiments, dream journals, and the Lahore atelier.', 'https://www.youtube.com/watch?v=dQw4w9WgXcQ', 1),
  ('e1a2b3c4-d5e6-7890-abcd-ef1234567890', 'PRECOGNITIVE — Runway Show', 'Full runway presentation of PRECOGNITIVE at Lahore Fashion Week 2026. Eight looks, eight dreams.', 'https://www.youtube.com/watch?v=dQw4w9WgXcQ', 2);
