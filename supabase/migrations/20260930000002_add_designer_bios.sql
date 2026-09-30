-- ============================================
-- ADD SHORT_BIO AND BIO TO DESIGNERS
-- ============================================
-- Populates short_bio and bio text fields for
-- the 14 designers added in 20260618000005
-- ============================================

-- Maryam Shahid
UPDATE designers SET
  short_bio = 'Contemporary pret wear blending minimalist aesthetics with subtle Eastern detailing.',
  bio = 'Maryam Shahid is a Rawalpindi-based fashion designer whose work is defined by its quiet sophistication and clean construction. A graduate of the Pakistan Institute of Fashion & Design, Maryam launched her practice with a focus on contemporary pret wear that bridges Eastern heritage and modern minimalism.\n\nHer design philosophy centers on the idea that elegance does not require embellishment. Each piece in her collection is built on precise tailoring, considered proportions, and a restrained palette that speaks to the modern Pakistani woman who values subtlety over spectacle. Maryam works closely with local manufacturing units in Rawalpindi, ensuring quality control at every stage of production.',
  nationality = 'Pakistani',
  specialization = 'Contemporary Pret & Minimalist Eastern Wear',
  category = 'Womenswear',
  gender = 'Female'
WHERE slug = 'maryam-shahid';

-- Amna Shams
UPDATE designers SET
  short_bio = 'Luxury formal wear crafted with traditional embroidery techniques and contemporary silhouettes.',
  bio = 'Amna Shams is a Lahore-based designer specializing in luxury formal wear and occasion dressing. Trained at the National College of Arts, Amna brings a fine-art sensibility to fashion — approaching each garment as a composition of color, texture, and movement.\n\nHer work is known for its intricate surface embellishment, combining traditional zardozi, dabka, and tilla work with modern silhouettes that flatter the contemporary body. Amna''s atelier in Lahore''s creative quarter serves a discerning clientele seeking one-of-a-kind pieces for life''s most important moments. She believes that occasion wear should feel personal — not costume, but an extension of the woman who wears it.',
  nationality = 'Pakistani',
  specialization = 'Luxury Formal Wear & Occasion Dressing',
  category = 'Womenswear',
  gender = 'Female'
WHERE slug = 'amna-shams';

-- Malaika Tanwir
UPDATE designers SET
  short_bio = 'Sustainable textiles meet editorial design in contemporary womenswear with a conscious ethos.',
  bio = 'Malaika Tanwir is an Islamabad-based fashion designer whose practice sits at the intersection of sustainability and editorial design. After completing her studies at the Pakistan Institute of Fashion & Design, Malaika spent two years working with artisan cooperatives in rural Punjab before establishing her own label.\n\nHer collections prioritize organic and handloom fabrics — khaddar, organic cotton, and naturally dyed silks — transformed into modern silhouettes that feel both grounded and forward-looking. Malaika is a vocal advocate for transparency in Pakistan''s fashion industry, publishing detailed breakdowns of her supply chain and artisan partnerships. Her work has been featured in Dawn Images and Elle Pakistan for its commitment to proving that responsible fashion can be commercially viable.',
  nationality = 'Pakistani',
  specialization = 'Sustainable Fashion & Editorial Womenswear',
  category = 'Sustainable',
  gender = 'Female'
WHERE slug = 'malaika-tanwir';

-- M. Shaban Bin Yousaf
UPDATE designers SET
  short_bio = 'Avant-garde menswear exploring the tension between Eastern heritage and global subculture.',
  bio = 'M. Shaban Bin Yousaf is a Lahore-based menswear designer pushing the boundaries of Pakistani men''s fashion through experimental silhouettes and conceptual storytelling. A graduate of the National College of Arts, Shaban''s work challenges the conventions of traditional South Asian menswear while honoring its construction heritage.\n\nHis collections explore the tension between Eastern tailoring traditions and global subculture — deconstructed kurtas, oversized shalwar silhouettes, and layered ensembles that feel simultaneously rooted and radical. Shaban''s practice is deeply research-driven, drawing inspiration from Sufi philosophy, Mughal court dress, and contemporary street culture. He works with a small team of master tailors in Lahore''s Walled City, where traditional construction methods meet modern design thinking.',
  nationality = 'Pakistani',
  specialization = 'Avant-Garde Menswear & Conceptual Design',
  category = 'Menswear',
  gender = 'Male'
WHERE slug = 'm-shaban-bin-yousaf';

-- Aliza Ikramullah
UPDATE designers SET
  short_bio = 'Refined bridal and formal wear balancing traditional craftsmanship with modern design sensibility.',
  bio = 'Aliza Ikramullah is a Rawalpindi-based designer whose work in bridal and formal wear has earned her a reputation for refined craftsmanship and thoughtful design. Trained at the Pakistan Institute of Fashion & Design, Aliza approaches each bridal commission as a collaborative process — working closely with her clients to create pieces that reflect their personal narrative while honoring centuries of Pakistani textile tradition.\n\nHer design language is defined by balanced proportions, considered embellishment, and a sophisticated color palette that extends beyond the conventional bridal red. Aliza''s atelier prioritizes ethical production, ensuring fair wages and safe working conditions for all artisans involved in her garments. She has completed over 150 bridal commissions and her work has been featured in Harper''s Bazaar Pakistan.',
  nationality = 'Pakistani',
  specialization = 'Bridal Couture & Formal Wear',
  category = 'Bridal',
  gender = 'Female'
WHERE slug = 'aliza-ikramullah';

-- Syeda A
UPDATE designers SET
  short_bio = 'Emerging talent in luxury pret — bold color narratives and fluid silhouettes for the modern woman.',
  bio = 'Syeda A is a Lahore-based fashion designer whose eponymous label has quickly gained attention for its bold color sensibility and fluid, body-positive silhouettes. A recent graduate of the National College of Arts, Syeda brings a fresh perspective to Pakistani womenswear — one that honors tradition without being constrained by it.\n\nHer work is characterized by unexpected color combinations, draped constructions that celebrate diverse body types, and a commitment to making luxury fashion feel accessible. Syeda''s design process begins with textile — she sources handloom fabrics directly from weavers in Punjab and Sindh, then develops custom prints and embroideries that transform these base materials into statement pieces. Her debut collection received critical acclaim at Lahore Fashion Week.',
  nationality = 'Pakistani',
  specialization = 'Luxury Pret & Fluid Silhouettes',
  category = 'Womenswear',
  gender = 'Female'
WHERE slug = 'syeda-a';

-- Aleeza Shahid
UPDATE designers SET
  short_bio = 'Textile innovation and intricate surface design defining contemporary Pakistani fashion.',
  bio = 'Aleeza Shahid is a Faisalabad-based designer whose work is driven by a deep love of textile and surface design. Faisalabad — Pakistan''s textile capital — provides the backdrop for Aleeza''s practice, which is built around the belief that fabric is the foundation of everything in fashion.\n\nHer collections are known for their intricate hand-embroidery, custom-developed textiles, and experimental surface treatments that push the boundaries of traditional craft. Aleeza works directly with Faisalabad''s weaving mills and artisan workshops, developing proprietary fabrics that become the starting point for each garment. Her approach has earned her recognition as a designer who understands fashion from the thread up — every piece begins with the textile and unfolds into form.',
  nationality = 'Pakistani',
  specialization = 'Textile Design & Surface Embroidery',
  category = 'Textile',
  gender = 'Female'
WHERE slug = 'aleeza-shahid';

-- Adina Shafqat
UPDATE designers SET
  short_bio = 'Contemporary occasion wear with a focus on architectural detail and refined construction.',
  bio = 'Adina Shafqat is a Karachi-based fashion designer whose work is defined by architectural precision and refined construction. A graduate of the Pakistan Institute of Fashion & Design, Adina spent several years working in Karachi''s commercial fashion industry before launching her own label with a focus on occasion wear that balances statement design with wearability.\n\nHer pieces are known for their structured silhouettes, geometric embellishment patterns, and a sophisticated neutral palette punctuated by seasonal color stories. Adina''s design process is deeply technical — she creates detailed technical packs for every garment and works closely with her production team to ensure consistent quality across all pieces. Her clientele includes professional women, public figures, and style-conscious individuals who value design integrity.',
  nationality = 'Pakistani',
  specialization = 'Contemporary Occasion Wear & Architectural Design',
  category = 'Womenswear',
  gender = 'Female'
WHERE slug = 'adina-shafqat';

-- Hira Baig
UPDATE designers SET
  short_bio = 'Modern Eastern wear celebrating Pakistani craft traditions through contemporary design.',
  bio = 'Hira Baig is a Karachi-based designer whose work celebrates the richness of Pakistani craft traditions through a contemporary lens. With a background in textile design and years of experience working with artisan communities across Sindh and Punjab, Hira brings deep craft knowledge to every collection she creates.\n\nHer design practice is built on collaboration — she works with block printers, embroiderers, and weavers to develop textiles that honor traditional techniques while feeling entirely modern. Hira''s collections are known for their vibrant color palettes, playful print development, and silhouettes that make traditional craft feel fresh and relevant. She is committed to ethical production and transparent pricing, ensuring that artisan partners receive fair compensation for their extraordinary skill.',
  nationality = 'Pakistani',
  specialization = 'Modern Eastern Wear & Craft Collaboration',
  category = 'Womenswear',
  gender = 'Female'
WHERE slug = 'hira-baig';

-- Sangeen Arsalan
UPDATE designers SET
  short_bio = 'Menswear from Balochistan — heritage textiles and craft traditions reimagined for today.',
  bio = 'Sangeen Arsalan is a designer from Kech, Balochistan, whose work brings the rich textile heritage of Pakistan''s southwestern province to the national fashion stage. Growing up surrounded by Balochi embroidery traditions — some of the most intricate and distinctive in South Asia — Sangeen developed a deep appreciation for the craft language of his region.\n\nHis collections translate Balochi mirror work, geometric embroidery, and traditional textile patterns into contemporary menswear and unisex pieces. Sangeen works with local artisan communities in Balochistan, providing sustainable employment while preserving endangered craft techniques. His practice is as much about cultural documentation as it is about fashion — each collection includes research notes and photographs from the communities that inspired the work, ensuring proper attribution and visibility.',
  nationality = 'Pakistani',
  specialization = 'Heritage Textiles & Balochi Craft in Contemporary Menswear',
  category = 'Menswear',
  gender = 'Male'
WHERE slug = 'sangeen-arsalan';

-- Abdul Samad
UPDATE designers SET
  short_bio = 'Minimalist luxury menswear rooted in Eastern construction and contemporary design thinking.',
  bio = 'Abdul Samad is an Islamabad-based menswear designer whose work is defined by its minimalism and precision. A graduate of the Pakistan Institute of Fashion & Design, Abdul Samad''s approach to fashion is deeply considered — each garment is the result of extensive research into proportion, fabric behavior, and the relationship between Eastern construction traditions and contemporary design.\n\nHis collections are known for their restrained palette, impeccable tailoring, and subtle detailing that rewards close inspection. Abdul Samad works with a small, dedicated production team in Islamabad, producing limited quantities to ensure quality and exclusivity. His philosophy is simple: make fewer things, but make them exceptional. His clientele includes architects, creatives, and professionals who appreciate design that speaks through cut and fabric rather than decoration.',
  nationality = 'Pakistani',
  specialization = 'Minimalist Luxury Menswear',
  category = 'Menswear',
  gender = 'Male'
WHERE slug = 'abdul-samad';

-- Faiqa Fatima
UPDATE designers SET
  short_bio = 'Contemporary womenswear from Faisalabad — textile innovation meets modern silhouettes.',
  bio = 'Faiqa Fatima is a Faisalabad-based fashion designer whose work is rooted in the city''s rich textile heritage while speaking to a contemporary audience. With direct access to some of Pakistan''s finest weaving mills and textile laboratories, Faiqa brings a material-first approach to her design practice.\n\nHer collections are characterized by innovative fabric development — custom-woven textiles, experimental dye techniques, and surface treatments that give each piece a distinctive tactile quality. Faiqa''s silhouettes are clean and modern, designed to let the textile do the talking. She is passionate about bridging the gap between Faisalabad''s industrial textile expertise and the creative fashion community, and regularly hosts workshops connecting fashion students with local textile manufacturers.',
  nationality = 'Pakistani',
  specialization = 'Textile Innovation & Contemporary Womenswear',
  category = 'Womenswear',
  gender = 'Female'
WHERE slug = 'faiqa-fatima';

-- Raina Sarwar
UPDATE designers SET
  short_bio = 'Sustainable contemporary fashion from Burewaho — organic textiles meet modern design.',
  bio = 'Raina Sarwar is a designer from Burewaho, Punjab, whose work proves that compelling fashion can emerge from anywhere — not just the major fashion capitals. Self-taught with supplementary training through online programs and artisan apprenticeships, Raina brings an outsider''s perspective and fresh energy to Pakistani fashion.\n\nHer practice is built on sustainability and community. Raina works with local women''s cooperatives in southern Punjab, creating employment opportunities while producing collections that feature handloom textiles, natural dyes, and traditional embroidery techniques from the region. Her designs are contemporary and wearable — relaxed silhouettes, earth-toned palettes, and pieces designed for everyday life. Raina''s story is one of fashion''s democratization — talent, dedication, and access to craft knowledge can create something remarkable regardless of geography.',
  nationality = 'Pakistani',
  specialization = 'Sustainable Fashion & Community Craft',
  category = 'Sustainable',
  gender = 'Female'
WHERE slug = 'raina-sarwar';

-- Fatima Iftikhar
UPDATE designers SET
  short_bio = 'Karachi-based contemporary occasion wear — bold design with refined wearability.',
  bio = 'Fatima Iftikhar is a Karachi-based fashion designer whose work in contemporary occasion wear has established her as a voice of confidence and clarity in Pakistan''s fashion landscape. A graduate of the Pakistan Institute of Fashion & Design, Fatima''s design philosophy is built on the belief that clothing should empower the wearer — not overwhelm them.\n\nHer collections balance bold design choices with refined wearability — structured silhouettes that flatter, embellishment that enhances rather than dominates, and a color sensibility that moves confidently between seasonal trends and timeless sophistication. Fatima works from her Karachi studio with a small production team, ensuring quality control and personal attention to every order. Her clientele values design that makes a statement while remaining effortless — fashion that works as hard as they do.',
  nationality = 'Pakistani',
  specialization = 'Contemporary Occasion Wear',
  category = 'Womenswear',
  gender = 'Female'
WHERE slug = 'fatima-iftikhar';
