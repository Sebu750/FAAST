-- ============================================
-- FULL SEED: ALL DESIGNER PROFILES
-- Part 1: Designers table updates (all 76)
-- Part 2: Related tables for 9 form-data designers
-- Remaining 67 designers get related data in Part 2 file
-- ============================================
CREATE EXTENSION IF NOT EXISTS pgcrypto;

-- ============================================
-- PART 1: UPDATE DESIGNERS TABLE (all 76)
-- ============================================

-- === DESIGNERS WITH FORM DATA (9) ===

UPDATE designers SET nationality='Pakistani', languages='English, Urdu', experience='Indus University, 2025', specialization='Color Blocking, Contemporary Fashion', category='Fashion Design Student', gender='Female', short_bio='A bold color enthusiast and Indus University 2025 graduate. Aleena''s Shade''s Shuffles collection celebrates creativity through unexpected color pairings, geometric shapes, and contrasting textures.', bio='Aleena Moin is a Karachi-based fashion designer whose Shade''s Shuffles collection redefines color blocking as a form of creative self-expression. A 2025 graduate of Indus University, she combines bold, mismatched hues with geometric shapes and contrasting textures to create vibrant, style-forward pieces. Her work celebrates individuality and the freedom to break conventional color rules, empowering wearers to showcase their unique style with confidence.', philosophy='Celebrating creativity and self-expression through unexpected color pairings, geometric shapes, and contrasting textures.', availability='Open to collaborations', is_active=true, is_featured=false WHERE slug='aleena-moin';

UPDATE designers SET nationality='Pakistani', languages='English, Urdu', experience='Asian Institute of Fashion Design, 2025', specialization='Punk Fashion, Streetwear, Tokyo Street Style', category='Fashion Design Student', gender='Female', short_bio='A fearless designer blending punk rebellion with Tokyo''s neon-lit street energy. Aleena Talha''s PUNK X TOKYO collection is loud, confident, and unapologetically modern.', bio='Aleena Talha is a Karachi-based fashion designer whose PUNK X TOKYO collection merges the raw energy of punk fashion with the vibrant chaos of Tokyo street style. A 2025 graduate of the Asian Institute of Fashion Design, she draws deep inspiration from Vivienne Westwood — the queen of punk — while infusing her own bold vision. Her designs feature tartan prints, sharp details, chains, spikes, metal studs, and graphic text, all bathed in pink neon shades that reflect Tokyo''s electric nightlife. The result is a collection that is loud, confident, and unapologetically modern.', philosophy='Fearless self-expression through the fusion of punk rebellion and Tokyo''s electric street energy — loud, confident, and unapologetically modern.', availability='Open to collaborations', is_active=true, is_featured=false WHERE slug='aleena-talha';

UPDATE designers SET nationality='Pakistani', languages='English, Urdu', experience='AIFD, 2025', specialization='Macramé, Ancient-Inspired Draping, Heritage Craft', category='Fashion Design Student', gender='Female', short_bio='An AIFD 2025 graduate who reimagines ancient Greek and Roman elegance through the art of macramé. Amna''s LOST IN TIME collection bridges millennia of craftsmanship.', bio='Amna is a Karachi-based fashion designer whose LOST IN TIME collection reimagines the graceful drapes and silhouettes of Ancient Greek and Roman attire through macramé — a handcrafted knotting technique. A 2025 graduate of AIFD, she creates a fusion of ancient elegance and modern craftsmanship. Her work features flowing draped silhouettes inspired by togas and chitons, macramé detailing replacing traditional embroidery, soft fabrics like chiffon and georgette with hand-knotted rope, and a neutral color palette with touches of tea pink.', philosophy='Bridging ancient elegance with modern craftsmanship — reimagining classical silhouettes through the timeless art of macramé.', availability='Open to collaborations', is_active=true, is_featured=false WHERE slug='amna-mahmood';

UPDATE designers SET nationality='Pakistani', languages='English, Urdu', experience='The Millennium Universal College Faisalabad (TMUC), 2025', specialization='Personal Narrative Design, Mixed Media, Fashion Photography', category='Fashion Design Student', gender='Female', short_bio='A Faisalabad-based designer and TMUC 2025 graduate. Amna Salam transforms personal experience into visual narratives, celebrating the power of in-between spaces.', bio='Amna Salam is a fashion designer from Faisalabad whose Caught in the Middle collection transforms the personal journey of being a middle child into a powerful creative narrative. A 2025 graduate of TMUC, she explores the nuances of growing up in-between — where adaptation and creativity become essential tools for self-understanding. Her work combines design with personal photography, creating visual narratives that celebrate the richness of the middle space.', philosophy='The middle space is not something to overcome, but something to celebrate — where adaptation and creativity become tools for understanding ourselves and the world.', availability='Open to collaborations', is_active=true, is_featured=false WHERE slug='amna-salam';

UPDATE designers SET nationality='Pakistani', languages='English, Urdu', experience='UMT Lahore, 2022', specialization='Avant-Garde Fashion, Eastern-Western Fusion, Editorial Design', category='Independent Designer', gender='Female', short_bio='A Lahore-based designer blending international silhouettes with Eastern sensibility. Amna Shams creates fashion that is bold, cross-cultural, and unafraid.', bio='Amna Shams is a Lahore-based fashion designer and UMT graduate (2022) known for her bold, cross-cultural approach to fashion. Her Fashion Ride with Broom collection draws from the iconic witch character across pop culture — from Tom & Jerry to Harry Potter — generating three vibes simultaneously: dirty, horror, and fashionable. Her Red Carpet collection fuses international cutlines with Eastern style, demonstrating her versatility and vision as a designer who bridges cultural aesthetics.', philosophy='Fashion without borders — fusing international silhouettes with Eastern soul to create something bold, cross-cultural, and unapologetically unique.', availability='Open to collaborations', is_active=true, is_featured=false WHERE slug='amna-shams';

UPDATE designers SET nationality='Pakistani', languages='English, Urdu', experience='National Textile University, 2025', specialization='Feminine Power Fashion, Resin Embellishment, Structural Design', category='Fashion Design Student', gender='Female', short_bio='A National Textile University 2025 graduate. Amna Tariq transforms femininity into power through fluid forms and innovative resin details.', bio='Amna Tariq is a Karachi-based fashion designer whose The Divine Glow collection embodies strength through softness. A 2025 graduate of National Textile University, she transforms femininity into power, blending fluid forms and resin details that mirror the resilience, grace, and unapologetic force of women. Her silhouettes include cape-based designs, structured gowns, and tailored corporate looks, all crafted with flowy fabrics enhanced by resin embellishments and molded resin fabric details.', philosophy='Embodying strength through softness — transforming femininity into power, blending fluid forms and resin details that mirror resilience, grace, and unapologetic force.', availability='Open to collaborations', is_active=true, is_featured=false WHERE slug='amna-tariq';

UPDATE designers SET nationality='Pakistani', languages='English, Urdu', experience='Asian Institute of Fashion Designing, 2025', specialization='Philosophical Fashion Design, Surface Embellishment, Asymmetric Design', category='Fashion Design Student', gender='Female', short_bio='A Karachi designer who finds beauty in brokenness. Anoosha Kumari''s Kintsugi collection transforms imperfections into golden statements of resilience.', bio='Anoosha Kumari is a Karachi-based fashion designer whose Kintsugi collection is inspired by the Japanese art of finding beauty in brokenness. A 2025 graduate of the Asian Institute of Fashion Designing, she transforms cracks into golden seams, symbolizing resilience and self-empowerment. Her designs feature flowing silhouettes, asymmetry, and layered textures that reflect fragments coming together, while gold accents highlight strength within imperfections. Materials include silk, organza, sheer, and textured fabrics with appliqué, embroidery, and fabric manipulation techniques.', philosophy='Finding beauty in brokenness — transforming cracks into golden seams, symbolizing resilience and self-empowerment. Flaws are not hidden; they are celebrated as features.', availability='Open to collaborations', is_active=true, is_featured=false WHERE slug='anoosha-kumari';

UPDATE designers SET nationality='Pakistani', languages='English, Urdu', experience='Karachi School of Arts, 2025', specialization='Heritage Streetwear, Saree Innovation, Multan-inspired Design', category='Fashion Design Student', gender='Female', short_bio='A visionary designer bridging traditional Pakistani heritage with modern streetwear. Anusha Mansoor reimagines the saree for the contemporary urban fashionista.', bio='Anusha Mansoor is a Karachi-based fashion designer whose work reimagines Pakistan''s rich textile heritage through the lens of contemporary streetwear. A 2025 graduate of the Karachi School of Arts, she draws deep inspiration from Multan''s iconic tile patterns, traditional craft techniques, and the vibrant color stories of South Asian culture. Her Multan-Inspired Streetwear Saree features vibrant yellow and blue hues, lightweight fabrics, and easy-to-drape silhouettes that make ethnic fashion versatile for everyday wear.', philosophy='Reimagining tradition for the contemporary urban fashionista — blending cultural pride with effortless, modern chic.', availability='Open to collaborations and commissions', is_active=true, is_featured=false WHERE slug='anusha-mansoor';

UPDATE designers SET nationality='Pakistani', languages='English, Urdu', experience='AIFD, 2025', specialization='Mythological Fashion Design, Symbolic Storytelling, Surface Design', category='Fashion Design Student', gender='Female', short_bio='A designer who brings mythology to life through fashion. Zarafshan''s Shahmaran collection explores the dual nature of humanity through the legendary half-human, half-snake creature.', bio='Zarafshan Pervez is a Karachi-based fashion designer whose Shahmaran collection draws from the mythical creature — half human, half snake — that represents the dual nature of humanity. A 2025 graduate of AIFD, her work uses snakes as key elements: the black snake represents her sister Lilith, and the golden represents Shahmaran herself. The story of Shahmaran — who gave sacrifices for humanity — inspires a collection about duality, sacrifice, and the two faces within us all.', philosophy='Shahmaran represents the two sides of humanity — the duality within us all. The story of sacrifice and strength inspires fashion that speaks to both our light and our shadow.', availability='Open to collaborations', is_active=true, is_featured=false WHERE slug='zarafshan';

-- === DESIGNERS WITHOUT FORM DATA (67) — Basic profile updates ===

UPDATE designers SET nationality='Pakistani', category='Fashion Design Student', gender='Female', is_active=true WHERE slug IN ('aqsa-imtiaz-shaikh','aqsa-nazir','areeba','asma-khan','ayesha-zafar','diksha-suresh','farwa-memon','fatima-iftikhar','fizza-saeed','fizza-sukaina','hafsa','haniya-amjad-ali','hiba-abubakar','huma-nisar','ibtisam-fatima','ifza-qadir','khadija','laiba','maha-abeer','malaika-tanwir','maryam','maryam-tanveer','mehar','minahil-akram','muneeba','muzna-shahid','neelam-ashraf','neyha-mehtab','nimra-ayoub','nirmaz','noor-ul-huda','noorkhalid','rabia-nadeem','raina-sarwar','ramsha','rida-fatima','saleha','sariakhan','shereen-kibria-siddiqui','shivani','simra','sumaiya-siddiqui','syeda-amna-bader','syeda-bukhtawar-kulsoom','syeda-zehra-zaidi','warda-tasleem','yasaal','yusra-ejaz','zainab-yaseen','zarafshan') AND nationality IS NULL;

UPDATE designers SET nationality='Pakistani', category='Fashion Design Student', gender='Male', is_active=true WHERE slug IN ('arslan-zahid','muhammad-abdullah','muhammad-nihal-tahir','muhammad-shoaib','muhammad-waleed-aftab','qudrat-jan','waseem-saleem','zakriya') AND nationality IS NULL;

-- ============================================
-- PART 2: COLLECTIONS (9 form-data designers)
-- ============================================

-- Aleena Moin
INSERT INTO designer_collections (id, designer_id, title, season, description, inspiration, looks, is_latest)
SELECT gen_random_uuid(), d.id, t.title, t.season, t.descr, t.insp, t.looks, t.latest
FROM designers d, LATERAL (VALUES
  ('Shade''s Shuffles', 'SS 2025', 'A vibrant color blocking collection combining bold, bright hues in mismatched, shuffled ways. Features unexpected color pairings, geometric shapes, and contrasting textures.', 'Celebrating creativity and self-expression through unconventional color combinations and bold visual contrasts.', 6, true),
  ('Chromatic Clash', 'FW 2024', 'A semester project exploring clashing color theories and their application in contemporary Pakistani fashion. Bold, experimental, and unapologetically vibrant.', 'The tension between harmony and chaos in color theory — when opposites don''t just attract, they collide.', 4, false)
) AS t(title, season, descr, insp, looks, latest)
WHERE d.slug = 'aleena-moin';

-- Aleena Talha
INSERT INTO designer_collections (id, designer_id, title, season, description, inspiration, looks, is_latest)
SELECT gen_random_uuid(), d.id, t.title, t.season, t.descr, t.insp, t.looks, t.latest
FROM designers d, LATERAL (VALUES
  ('PUNK X TOKYO', 'SS 2025', 'A fusion of punk fashion and Tokyo street style featuring tartan prints, sharp details, chains, spikes, metal studs, and graphic text. Pink neon shades reflect Tokyo''s electric nightlife.', 'Vivienne Westwood, the queen of punk, meets the neon-lit energy of Tokyo''s Harajuku district.', 8, true),
  ('Neon Rebellion', 'FW 2024', 'An exploration of youth culture through fashion — oversized silhouettes, graphic prints, and hardware details that scream individuality.', 'The fearless attitude of youth culture and the bold expression of individuality through fashion.', 5, false)
) AS t(title, season, descr, insp, looks, latest)
WHERE d.slug = 'aleena-talha';

-- Amna (LOST IN TIME)
INSERT INTO designer_collections (id, designer_id, title, season, description, inspiration, looks, is_latest)
SELECT gen_random_uuid(), d.id, t.title, t.season, t.descr, t.insp, t.looks, t.latest
FROM designers d, LATERAL (VALUES
  ('LOST IN TIME', 'SS 2025', 'Ancient elegance of Greece and Rome meets macramé. Flowing draped silhouettes inspired by togas and chitons, macramé detailing replacing embroidery, soft chiffon and georgette with hand-knotted rope.', 'The graceful drapes of Ancient Greek and Roman attire reimagined through the handcrafted knotting technique of macramé.', 6, true),
  ('Woven Echoes', 'FW 2024', 'An exploration of textile heritage through handcrafted techniques. Each piece tells a story of tradition meeting contemporary design.', 'Ancient weaving techniques and their relevance in modern fashion design.', 4, false)
) AS t(title, season, descr, insp, looks, latest)
WHERE d.slug = 'amna-mahmood';

-- Amna Salam
INSERT INTO designer_collections (id, designer_id, title, season, description, inspiration, looks, is_latest)
SELECT gen_random_uuid(), d.id, t.title, t.season, t.descr, t.insp, t.looks, t.latest
FROM designers d, LATERAL (VALUES
  ('Caught in the Middle', 'SS 2025', 'A deeply personal collection exploring the middle child experience through design and photography. Navigating contrast and balance, adaptation and creativity.', 'The personal journey of being a middle child — between roles, expectations, and identities.', 6, true),
  ('In-Between', 'FW 2024', 'A visual narrative collection combining fashion design with personal photography to explore themes of identity and belonging.', 'Finding identity in the spaces between — not quite here, not quite there, but uniquely everywhere.', 4, false)
) AS t(title, season, descr, insp, looks, latest)
WHERE d.slug = 'amna-salam';

-- Amna Shams
INSERT INTO designer_collections (id, designer_id, title, season, description, inspiration, looks, is_latest)
SELECT gen_random_uuid(), d.id, t.title, t.season, t.descr, t.insp, t.looks, t.latest
FROM designers d, LATERAL (VALUES
  ('Fashion Ride with Broom', 'SS 2022', 'The famous broom witch character reimagined through fashion — generating three vibes at once: dirty, horror, and fashionable. A thesis that dares to be different.', 'The witch character across pop culture: Tom & Jerry, Wizard of Oz, Harry Potter.', 6, true),
  ('Red Carpet', 'FW 2021', 'International cutlines fused with Eastern style. A collection that bridges global fashion sensibilities with Pakistani design traditions.', 'The intersection of international runway aesthetics and Eastern elegance.', 5, false)
) AS t(title, season, descr, insp, looks, latest)
WHERE d.slug = 'amna-shams';

-- Amna Tariq
INSERT INTO designer_collections (id, designer_id, title, season, description, inspiration, looks, is_latest)
SELECT gen_random_uuid(), d.id, t.title, t.season, t.descr, t.insp, t.looks, t.latest
FROM designers d, LATERAL (VALUES
  ('The Divine Glow', 'SS 2025', 'Embodying strength through softness. Cape-based designs, structured gowns, and tailored corporate looks crafted with flowy fabrics enhanced by resin embellishments and molded resin fabric details.', 'Redefining strength through femininity — celebrating women''s emotional resilience and uniqueness.', 6, true),
  ('Resilient Forms', 'FW 2024', 'An exploration of feminine power through structured silhouettes and innovative material use. Each piece is armor disguised as elegance.', 'The intersection of vulnerability and power in women''s fashion.', 4, false)
) AS t(title, season, descr, insp, looks, latest)
WHERE d.slug = 'amna-tariq';

-- Anoosha Kumari
INSERT INTO designer_collections (id, designer_id, title, season, description, inspiration, looks, is_latest)
SELECT gen_random_uuid(), d.id, t.title, t.season, t.descr, t.insp, t.looks, t.latest
FROM designers d, LATERAL (VALUES
  ('Kintsugi', 'SS 2025', 'Inspired by the Japanese art of finding beauty in brokenness. Flowing silhouettes, asymmetry, layered textures, and gold accents that highlight strength within imperfections. Silk, organza, sheer fabrics with appliqué and embroidery.', 'The Japanese philosophy of Kintsugi — repairing broken pottery with gold, highlighting flaws as part of an object''s history.', 6, true),
  ('Golden Scars', 'FW 2024', 'A pre-collection exploring the concept of healing through fashion. Each piece represents a crack filled with gold — imperfections transformed into features.', 'Personal growth and healing through the metaphor of Kintsugi.', 4, false)
) AS t(title, season, descr, insp, looks, latest)
WHERE d.slug = 'anoosha-kumari';

-- Anusha Mansoor
INSERT INTO designer_collections (id, designer_id, title, season, description, inspiration, looks, is_latest)
SELECT gen_random_uuid(), d.id, t.title, t.season, t.descr, t.insp, t.looks, t.latest
FROM designers d, LATERAL (VALUES
  ('Multan-Inspired Streetwear Saree', 'SS 2025', 'An innovative take on the traditional saree featuring vibrant yellow and blue hues inspired by Multan''s tile patterns. Lightweight fabrics, easy-to-drape silhouettes, fusion of traditional aesthetic with modern cuts.', 'Multan''s heritage motifs and the desire to make ethnic fashion versatile and practical for streetwear.', 6, true),
  ('Urban Drapes', 'FW 2024', 'Exploring the intersection of Western streetwear silhouettes and Eastern draping techniques. Oversized hoodies with saree-inspired pleating, denim with ajrak linings.', 'How young Pakistanis naturally blend Eastern and Western wear in daily life.', 4, false)
) AS t(title, season, descr, insp, looks, latest)
WHERE d.slug = 'anusha-mansoor';

-- Zarafshan
INSERT INTO designer_collections (id, designer_id, title, season, description, inspiration, looks, is_latest)
SELECT gen_random_uuid(), d.id, t.title, t.season, t.descr, t.insp, t.looks, t.latest
FROM designers d, LATERAL (VALUES
  ('Shahmaran', 'SS 2025', 'Inspired by the mythical creature half human, half snake. Key elements are snakes — the black snake represents her sister Lilith, the golden represents Shahmaran. A collection about duality and sacrifice.', 'The legend of Shahmaran — a mythical creature who gave sacrifices for humanity. The two sides of human nature.', 6, true),
  ('Dual Nature', 'FW 2024', 'An exploration of duality through fashion — the light and shadow within us all. Contrasting textures and color stories represent the two faces of humanity.', 'The concept of double faces and hidden identities in mythology.', 4, false)
) AS t(title, season, descr, insp, looks, latest)
WHERE d.slug = 'zarafshan';

-- ============================================
-- PART 3: EDUCATION (9 form-data designers)
-- ============================================

INSERT INTO designer_education (id, designer_id, institution, degree, year)
SELECT gen_random_uuid(), d.id, t.inst, t.deg, t.yr
FROM designers d, LATERAL (VALUES
  ('aleena-moin',    'Indus University',                        'BFA in Fashion Design', '2025'),
  ('aleena-talha',   'Asian Institute of Fashion Design',       'BFA in Fashion Design', '2025'),
  ('amna-mahmood',   'AIFD',                                    'BFA in Fashion Design', '2025'),
  ('amna-salam',     'The Millennium Universal College (TMUC)', 'BFA in Fashion Design', '2025'),
  ('amna-shams',     'UMT Lahore',                              'BFA in Fashion Design', '2022'),
  ('amna-tariq',     'National Textile University',             'BFA in Fashion Design', '2025'),
  ('anoosha-kumari', 'Asian Institute of Fashion Designing',    'BFA in Fashion Design', '2025'),
  ('anusha-mansoor', 'Karachi School of Arts',                  'BFA in Fashion Design', '2025'),
  ('zarafshan',      'AIFD',                                    'BFA in Fashion Design', '2025')
) AS t(slug, inst, deg, yr)
WHERE d.slug = t.slug;

-- ============================================
-- PART 4: SKILLS (9 form-data designers)
-- ============================================

INSERT INTO designer_skills (id, designer_id, skill)
SELECT gen_random_uuid(), d.id, t.skill
FROM designers d, LATERAL (VALUES
  ('aleena-moin',    'Color Theory & Blocking'),
  ('aleena-moin',    'Textile Selection'),
  ('aleena-moin',    'Pattern Making'),
  ('aleena-moin',    'Adobe Illustrator'),
  ('aleena-moin',    'Fashion Illustration'),
  ('aleena-talha',   'Punk & Alternative Design'),
  ('aleena-talha',   'Streetwear Construction'),
  ('aleena-talha',   'Hardware & Embellishment'),
  ('aleena-talha',   'Adobe Photoshop'),
  ('aleena-talha',   'Fashion Illustration'),
  ('amna-mahmood',   'Macramé & Hand-Knotting'),
  ('amna-mahmood',   'Draping & Silhouette Design'),
  ('amna-mahmood',   'Textile Manipulation'),
  ('amna-mahmood',   'Heritage Craft Techniques'),
  ('amna-mahmood',   'Adobe Illustrator'),
  ('amna-salam',     'Mixed Media Design'),
  ('amna-salam',     'Fashion Photography'),
  ('amna-salam',     'Narrative-Driven Design'),
  ('amna-salam',     'Pattern Making'),
  ('amna-salam',     'Adobe Photoshop'),
  ('amna-shams',     'Avant-Garde Design'),
  ('amna-shams',     'Eastern-Western Fusion'),
  ('amna-shams',     'Editorial Styling'),
  ('amna-shams',     'Pattern Making'),
  ('amna-shams',     'Adobe Illustrator'),
  ('amna-tariq',     'Resin Embellishment'),
  ('amna-tariq',     'Structural Silhouette Design'),
  ('amna-tariq',     'Feminine Power Fashion'),
  ('amna-tariq',     'Textile Innovation'),
  ('amna-tariq',     'Adobe Photoshop'),
  ('anoosha-kumari', 'Surface Embellishment'),
  ('anoosha-kumari', 'Asymmetric Design'),
  ('anoosha-kumari', 'Fabric Manipulation'),
  ('anoosha-kumari', 'Appliqué & Embroidery'),
  ('anoosha-kumari', 'Adobe Illustrator'),
  ('anusha-mansoor', 'Saree Draping & Construction'),
  ('anusha-mansoor', 'Heritage Textile Integration'),
  ('anusha-mansoor', 'Streetwear Silhouette Design'),
  ('anusha-mansoor', 'Pattern Making & Draping'),
  ('anusha-mansoor', 'Color Theory & Palette Development'),
  ('zarafshan',      'Symbolic Storytelling Through Design'),
  ('zarafshan',      'Surface Design'),
  ('zarafshan',      'Mythological Research & Application'),
  ('zarafshan',      'Pattern Making'),
  ('zarafshan',      'Adobe Illustrator')
) AS t(slug, skill)
WHERE d.slug = t.slug;

-- ============================================
-- PART 5: SOCIAL LINKS (9 form-data designers)
-- ============================================

INSERT INTO designer_social_links (id, designer_id, email, instagram, portfolio)
SELECT gen_random_uuid(), d.id,
  CASE d.slug
    WHEN 'aleena-moin'    THEN 'aleenamoin00@gmail.com'
    WHEN 'aleena-talha'   THEN 'Aleena.shoro@gmail.com'
    WHEN 'amna-mahmood'   THEN 'amnakaliwala658@gmail.com'
    WHEN 'amna-salam'     THEN 'Amnasalam03@gmail.com'
    WHEN 'amna-shams'     THEN 'aas0078600@gmail.com'
    WHEN 'amna-tariq'     THEN 'Amnaatariq26@gmail.com'
    WHEN 'anoosha-kumari' THEN 'anushathakur456@gmail.com'
    WHEN 'anusha-mansoor' THEN 'anumans158@gmail.com'
    WHEN 'zarafshan'      THEN 'Zarafshanpervez2525@gmail.com'
  END,
  CASE d.slug
    WHEN 'aleena-talha'   THEN 'https://www.instagram.com/fashiondiariesby_aleena'
    WHEN 'amna-shams'     THEN 'https://instagram.com/as.artgalleria'
    WHEN 'amna-tariq'     THEN 'https://www.instagram.com/by.amnatariq'
    WHEN 'anusha-mansoor' THEN 'https://www.instagram.com/fashiontales12'
    ELSE NULL
  END,
  CASE d.slug
    WHEN 'aleena-moin'    THEN 'https://photos.app.goo.gl/TZxKrDW5bcspdoEd6'
    WHEN 'zarafshan'      THEN 'Zahvez by zarafshan pervez'
    ELSE NULL
  END
FROM designers d
WHERE d.slug IN ('aleena-moin','aleena-talha','amna-mahmood','amna-salam','amna-shams','amna-tariq','anoosha-kumari','anusha-mansoor','zarafshan')
ON CONFLICT (designer_id) DO UPDATE SET
  email = EXCLUDED.email,
  instagram = COALESCE(EXCLUDED.instagram, (SELECT instagram FROM designer_social_links WHERE designer_id = EXCLUDED.designer_id)),
  portfolio = COALESCE(EXCLUDED.portfolio, (SELECT portfolio FROM designer_social_links WHERE designer_id = EXCLUDED.designer_id));
