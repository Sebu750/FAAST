-- ============================================
-- ELEVATE ALL DESIGNER SPECIALIZATIONS
-- ============================================
-- Updates specialization for all designers to
-- reflect international high-fashion and luxury
-- craftsmanship positioning.
-- ============================================

-- ============================================
-- PART 1: ALREADY ELEVATED (27 designers)
-- These were handled in the previous version
-- of this migration — kept here for completeness.
-- ============================================

UPDATE designers SET specialization = 'Luxury Embroidered Couture & Heritage Textile Reinterpretation' WHERE slug = 'zara-ahmad';
UPDATE designers SET specialization = 'Avant-Garde Menswear & Urban Couture' WHERE slug = 'bilal-hussain';
UPDATE designers SET specialization = 'Sculptural Bridal Couture & Luxury Occasion Wear' WHERE slug = 'fatima-noor';
UPDATE designers SET specialization = 'Sustainable Luxury & Artisan Craft Revival' WHERE slug = 'nazia-otho';
UPDATE designers SET specialization = 'Architectural Luxury Pret & Power Dressing' WHERE slug = 'ayesha-siddiqui';
UPDATE designers SET specialization = 'Sculptural Menswear & Experimental Couture' WHERE slug = 'hassan-raza';
UPDATE designers SET specialization = 'Fine Art Textile Design & Surface Embellishment' WHERE slug = 'sana-khalid';
UPDATE designers SET specialization = 'Premium Streetwear & Calligraphic Design' WHERE slug = 'omar-farooq';
UPDATE designers SET specialization = 'Minimalist Couture & Luxury Evening Wear' WHERE slug = 'mehreen-ali';
UPDATE designers SET specialization = 'Heritage Luxury & Artisanal Menswear' WHERE slug = 'kamran-sheikh';
UPDATE designers SET specialization = 'Experimental Knitwear & Subconscious Textile Design' WHERE slug = 'aleena-talha';
UPDATE designers SET specialization = 'Contemporary Luxury Pret & Refined Eastern Elegance' WHERE slug = 'maryam-shahid';
UPDATE designers SET specialization = 'Luxury Evening Wear & Embellished Haute Couture' WHERE slug = 'amna-shams';
UPDATE designers SET specialization = 'Sustainable Haute Couture & Editorial Design' WHERE slug = 'malaika-tanwir';
UPDATE designers SET specialization = 'Conceptual Menswear & Deconstructed Couture' WHERE slug = 'm-shaban-bin-yousaf';
UPDATE designers SET specialization = 'Bridal Haute Couture & Luxury Formal Wear' WHERE slug = 'aliza-ikramullah';
UPDATE designers SET specialization = 'Luxury Pret & Fluid Architectural Silhouettes' WHERE slug = 'syeda-a';
UPDATE designers SET specialization = 'Bespoke Textile Design & Haute Broderie' WHERE slug = 'aleeza-shahid';
UPDATE designers SET specialization = 'Architectural Couture & Structured Luxury Wear' WHERE slug = 'adina-shafqat';
UPDATE designers SET specialization = 'Contemporary Craft Luxury & Artisanal Eastern Wear' WHERE slug = 'hira-baig';
UPDATE designers SET specialization = 'Heritage Embroidery & Luxury Contemporary Menswear' WHERE slug = 'sangeen-arsalan';
UPDATE designers SET specialization = 'Minimalist Luxury Tailoring & Precision Menswear' WHERE slug = 'abdul-samad';
UPDATE designers SET specialization = 'Textile Innovation & Contemporary Luxury Womenswear' WHERE slug = 'faiqa-fatima';
UPDATE designers SET specialization = 'Conscious Luxury Fashion & Community-Driven Craft' WHERE slug = 'raina-sarwar';
UPDATE designers SET specialization = 'Contemporary Luxury Occasion Wear & Power Dressing' WHERE slug = 'fatima-iftikhar';
UPDATE designers SET specialization = 'Luxury Heritage Streetwear & Contemporary Saree Couture' WHERE name = 'Anusha Mansoor';
UPDATE designers SET specialization = 'Mythological Haute Couture & Narrative Surface Design' WHERE slug = 'zarafshan';

-- ============================================
-- PART 2: EMPTY / NULL SPECIALIZATION (43 designers)
-- Fashion design students & emerging talent —
-- elevated to international luxury positioning.
-- ============================================

UPDATE designers SET specialization = 'Contemporary Luxury Womenswear & Refined Ready-to-Wear' WHERE slug = 'aqsa-imtiaz-shaikh';
UPDATE designers SET specialization = 'Avant-Garde Design & Conceptual Fashion' WHERE slug = 'aqsa-nazir';
UPDATE designers SET specialization = 'Luxury Evening Wear & Sculptural Silhouettes' WHERE slug = 'areeba';
UPDATE designers SET specialization = 'Precision Tailoring & Contemporary Menswear' WHERE slug = 'arslan-zahid';
UPDATE designers SET specialization = 'Minimalist Luxury & Contemporary Eastern Wear' WHERE slug = 'asma-khan';
UPDATE designers SET specialization = 'Editorial Fashion & Luxury Ready-to-Wear' WHERE slug = 'ayesha-zafar';
UPDATE designers SET specialization = 'Sustainable Luxury & Contemporary Textile Design' WHERE slug = 'diksha-suresh';
UPDATE designers SET specialization = 'Couture Craftsmanship & Luxury Occasion Wear' WHERE slug = 'farwa-memon';
UPDATE designers SET specialization = 'Experimental Pattern Cutting & Luxury Pret' WHERE slug = 'fizza-saeed';
UPDATE designers SET specialization = 'Contemporary Couture & Refined Formal Wear' WHERE slug = 'fizza-sukaina';
UPDATE designers SET specialization = 'Architectural Fashion & Structured Luxury Wear' WHERE slug = 'hafsa';
UPDATE designers SET specialization = 'Luxury Pret & Contemporary Power Dressing' WHERE slug = 'haniya-amjad-ali';
UPDATE designers SET specialization = 'Refined Couture & Embellished Evening Wear' WHERE slug = 'hiba-abubakar';
UPDATE designers SET specialization = 'Contemporary Luxury Womenswear & Fluid Silhouettes' WHERE slug = 'huma-nisar';
UPDATE designers SET specialization = 'Minimalist Couture & Precision Formal Wear' WHERE slug = 'ibtisam-fatima';
UPDATE designers SET specialization = 'Luxury Craft Design & Artisanal Fashion' WHERE slug = 'ifza-qadir';
UPDATE designers SET specialization = 'Contemporary Eastern Luxury & Modern Pret' WHERE slug = 'khadija';
UPDATE designers SET specialization = 'Modern Luxury Ready-to-Wear & Contemporary Design' WHERE slug = 'laiba';
UPDATE designers SET specialization = 'Sculptural Fashion & Avant-Garde Couture' WHERE slug = 'maiko';
UPDATE designers SET specialization = 'Editorial Luxury & Contemporary Design' WHERE slug = 'maryam';
UPDATE designers SET specialization = 'Refined Luxury Pret & Textural Design' WHERE slug = 'maryam-tanveer';
UPDATE designers SET specialization = 'Contemporary Couture & Bold Silhouette Design' WHERE slug = 'mehar';
UPDATE designers SET specialization = 'Luxury Womenswear & Contemporary Elegance' WHERE slug = 'minahil-akram';
UPDATE designers SET specialization = 'Conceptual Menswear & Contemporary Tailoring' WHERE slug = 'muhammad-abdullah';
UPDATE designers SET specialization = 'Avant-Garde Menswear & Experimental Design' WHERE slug = 'muhammad-nihal-tahir';
UPDATE designers SET specialization = 'Contemporary Menswear & Urban Luxury' WHERE slug = 'muhammad-shoaib';
UPDATE designers SET specialization = 'Modern Menswear & Street-Luxe Design' WHERE slug = 'muhammad-waleed-aftab';
UPDATE designers SET specialization = 'Luxury Eastern Wear & Contemporary Design' WHERE slug = 'muneeba';
UPDATE designers SET specialization = 'Refined Pret & Luxury Formal Design' WHERE slug = 'muzna-shahid';
UPDATE designers SET specialization = 'Textile Art & Luxury Surface Design' WHERE slug = 'neelam-ashraf';
UPDATE designers SET specialization = 'Sculptural Couture & Architectural Fashion' WHERE slug = 'neyha-mehtab';
UPDATE designers SET specialization = 'Contemporary Luxury & Refined Silhouettes' WHERE slug = 'nimra-ayoub';
UPDATE designers SET specialization = 'Precision Tailoring & Contemporary Couture' WHERE slug = 'nirmaz';
UPDATE designers SET specialization = 'Ethereal Luxury & Editorial Fashion Design' WHERE slug = 'noor-ul-huda';
UPDATE designers SET specialization = 'Contemporary Menswear & Luxury Street Design' WHERE slug = 'noorkhalid';
UPDATE designers SET specialization = 'Luxury Womenswear & Contemporary Craft' WHERE slug = 'rabia-nadeem';
UPDATE designers SET specialization = 'Avant-Garde Couture & Conceptual Design' WHERE slug = 'ramsha';
UPDATE designers SET specialization = 'Luxury Formal Wear & Refined Design' WHERE slug = 'rida-fatima';
UPDATE designers SET specialization = 'Sculptural Fashion & Luxury Evening Wear' WHERE slug = 'saleha';
UPDATE designers SET specialization = 'Conceptual Fashion & Narrative Design' WHERE slug = 'sariakhan';
UPDATE designers SET specialization = 'Luxury Couture & Embellished Design' WHERE slug = 'shereen-kibria-siddiqui';
UPDATE designers SET specialization = 'Contemporary Luxury & Textural Innovation' WHERE slug = 'shivani';
UPDATE designers SET specialization = 'Refined Couture & Luxury Womenswear' WHERE slug = 'sumaiya-siddiqui';
UPDATE designers SET specialization = 'Contemporary Luxury Womenswear & Editorial Silhouettes' WHERE slug = 'maha-abeer';
UPDATE designers SET specialization = 'Avant-Garde Couture & Conceptual Fashion Design' WHERE slug = 'syeda-amna-bader';
UPDATE designers SET specialization = 'Luxury Eastern Heritage & Contemporary Couture' WHERE slug = 'syeda-bukhtawar-kulsoom';
UPDATE designers SET specialization = 'Sculptural Luxury Wear & Architectural Fashion' WHERE slug = 'syeda-zehra-zaidi';
UPDATE designers SET specialization = 'Luxury Pret & Refined Contemporary Design' WHERE slug = 'warda-tasleem';
UPDATE designers SET specialization = 'Precision Tailoring & Luxury Menswear' WHERE slug = 'waseem-saleem';
UPDATE designers SET specialization = 'Contemporary Couture & Luxury Ready-to-Wear' WHERE slug = 'yasaal';
UPDATE designers SET specialization = 'Editorial Fashion & Luxury Silhouette Design' WHERE slug = 'yusra-ejaz';
UPDATE designers SET specialization = 'Refined Luxury Womenswear & Modern Craft' WHERE slug = 'zainab-yaseen';
UPDATE designers SET specialization = 'Contemporary Menswear & Urban Couture' WHERE slug = 'zakriya';

-- ============================================
-- PART 3: EXISTING COMMA-SEPARATED VALUES (8 designers)
-- Elevated from comma-separated lists to
-- cohesive luxury positioning statements.
-- ============================================

UPDATE designers SET specialization = 'Color-Block Couture & Contemporary Architectural Fashion' WHERE slug = 'aleena-moin';
UPDATE designers SET specialization = 'Macramé Haute Couture & Ancient-Inspired Draping' WHERE slug = 'amna-mahmood';
UPDATE designers SET specialization = 'Narrative Fashion Design & Mixed-Media Luxury' WHERE slug = 'amna-salam';
UPDATE designers SET specialization = 'Feminine Power Couture & Resin Embellishment' WHERE slug = 'amna-tariq';
UPDATE designers SET specialization = 'Philosophical Couture & Asymmetric Luxury Design' WHERE slug = 'anoosha-kumari';
UPDATE designers SET specialization = 'Luxury Conceptual Kidswear & Couture Children''s Fashion' WHERE slug = 'qudrat-jan';
UPDATE designers SET specialization = 'Luxury Pret & Bridal Haute Couture' WHERE slug = 'simra-khan';
UPDATE designers SET specialization = 'Luxury Pret & Evening Couture' WHERE slug = 'my-brand-1783175924871';
