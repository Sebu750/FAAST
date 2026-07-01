import { createClient } from '@supabase/supabase-js'
import { readFileSync } from 'fs'
import { fileURLToPath } from 'url'
import { dirname, join } from 'path'

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)

// Load environment variables
const supabaseUrl = 'https://qchqwxoaqzdfalkeitpj.supabase.co'
const supabaseKey = 'sb_publishable_vt1viH8p6POzb5rMckVqeg_ZFbYvhUn'

const supabase = createClient(supabaseUrl, supabaseKey)

async function seedDesigners() {
  console.log('🌱 Starting designer seed...\n')

  // Designer data
  const designers = [
    {
      id: 'd1-nazia-otho-001',
      slug: 'nazia-otho',
      name: 'Nazia Otho',
      brand: 'Nazia Otho',
      location: 'Karachi, Pakistan',
      nationality: 'Pakistani',
      languages: 'English, Urdu, Sindhi',
      experience: '8 years',
      specialization: 'Luxury Pret, Bridal',
      category: 'Womenswear',
      gender: 'female',
      bio: 'Nazia Otho is a Karachi-based designer known for her contemporary interpretation of traditional Pakistani craftsmanship. With a background in textile design, she brings a unique perspective to modern fashion, blending heritage techniques with silhouettes that resonate with the global Pakistani diaspora. Her work has been featured in multiple fashion weeks across Pakistan and Dubai.',
      short_bio: 'Contemporary luxury wear celebrating Pakistani craftsmanship with a modern global perspective.',
      philosophy: 'Fashion is a dialogue between heritage and modernity. I design to preserve our craft traditions while making them relevant for women who live bold, global lives.',
      image_url: '/src/assets/naziaotho.webp',
      cover_image_url: '/src/assets/banner3.webp',
      availability: 'Available for commissions',
      is_featured: true,
      is_active: true
    },
    {
      id: 'd2-zara-ahmad-002',
      slug: 'zara-ahmad',
      name: 'Zara Ahmad',
      brand: 'Zara Ahmad Studio',
      location: 'Lahore, Pakistan',
      nationality: 'Pakistani',
      languages: 'English, Urdu, Punjabi',
      experience: '6 years',
      specialization: 'Pret, Contemporary',
      category: 'Womenswear',
      gender: 'female',
      bio: 'Zara Ahmad is a Lahore-based designer whose work reflects the vibrant cultural tapestry of Punjab. A graduate of the National College of Arts, Zara specializes in contemporary pret that bridges traditional aesthetics with modern wearability. Her collections are known for their thoughtful color palettes and innovative fabric combinations.',
      short_bio: 'Lahore-based contemporary pret brand blending Punjabi heritage with modern design sensibility.',
      philosophy: 'I believe in creating clothes that tell stories—of the artisans who make them, of the culture that inspires them, and of the women who wear them.',
      image_url: '/src/assets/Zara-ahmad.webp',
      cover_image_url: '/src/assets/banner4.webp',
      availability: 'Available for collaborations',
      is_featured: true,
      is_active: true
    },
    {
      id: 'd3-fatima-noor-003',
      slug: 'fatima-noor',
      name: 'Fatima Noor',
      brand: 'Fatima Noor',
      location: 'Islamabad, Pakistan',
      nationality: 'Pakistani',
      languages: 'English, Urdu',
      experience: '5 years',
      specialization: 'Luxury Formal, Evening Wear',
      category: 'Womenswear',
      gender: 'female',
      bio: 'Fatima Noor is an Islamabad-based designer specializing in luxury formal wear and evening gowns. With a keen eye for detail and a passion for sophisticated silhouettes, Fatima creates pieces that embody elegance and modern femininity. Her work is characterized by clean lines, luxurious fabrics, and subtle embellishments.',
      short_bio: 'Islamabad-based luxury formal wear embodying elegance, sophistication, and modern femininity.',
      philosophy: 'True luxury lies in restraint. I design for women who understand that elegance is not about being noticed—it is about being remembered.',
      image_url: '/src/assets/Fatima-noor.webp',
      cover_image_url: '/src/assets/hero-runway.webp',
      availability: 'Limited availability',
      is_featured: true,
      is_active: true
    },
    {
      id: 'd4-bilal-hussain-004',
      slug: 'bilal-hussain',
      name: 'Bilal Hussain',
      brand: 'BH by Bilal',
      location: 'Karachi, Pakistan',
      nationality: 'Pakistani',
      languages: 'English, Urdu',
      experience: '7 years',
      specialization: 'Menswear, Streetwear',
      category: 'Menswear',
      gender: 'male',
      bio: 'Bilal Hussain is redefining Pakistani menswear with his contemporary streetwear label BH by Bilal. Based in Karachi, he draws inspiration from urban culture, music, and the vibrant energy of the city. His designs challenge traditional notions of Pakistani fashion, offering young men clothing that is both culturally rooted and globally relevant.',
      short_bio: 'Karachi-based menswear label redefining Pakistani fashion through contemporary streetwear and urban culture.',
      philosophy: 'Streetwear is the uniform of a generation. I design to give young Pakistani men clothing that reflects their energy, their culture, and their ambitions.',
      image_url: '/src/assets/bilal-hussain.webp',
      cover_image_url: '/src/assets/studio1.webp',
      availability: 'Open for collaborations',
      is_featured: true,
      is_active: true
    },
    {
      id: 'd5-ayesha-khan-005',
      slug: 'ayesha-khan',
      name: 'Ayesha Khan',
      brand: 'Ayesha Khan Atelier',
      location: 'Lahore, Pakistan',
      nationality: 'Pakistani',
      languages: 'English, Urdu, Persian',
      experience: '10 years',
      specialization: 'Bridal, Luxury Couture',
      category: 'Womenswear',
      gender: 'female',
      bio: 'Ayesha Khan is a Lahore-based bridal couture designer with over a decade of experience creating dream wedding ensembles. Trained at the Pakistan Institute of Fashion and Design (PIFD), Ayesha is known for her intricate hand embroidery, rich color palettes, and ability to blend Mughal-inspired motifs with contemporary silhouettes. Her atelier has dressed numerous high-profile brides across Pakistan.',
      short_bio: 'Lahore-based bridal couture atelier specializing in intricate hand embroidery and Mughal-inspired luxury.',
      philosophy: 'A bridal outfit is not just clothing—it is a vessel of dreams, heritage, and new beginnings. I design to honor that sacred moment.',
      image_url: '/src/assets/home-designer-portrait-1.webp',
      cover_image_url: '/src/assets/home-luxury-bridal.webp',
      availability: 'Booking for 2025-2026 season',
      is_featured: true,
      is_active: true
    },
    {
      id: 'd6-hassan-raza-006',
      slug: 'hassan-raza',
      name: 'Hassan Raza',
      brand: 'HR Menswear',
      location: 'Karachi, Pakistan',
      nationality: 'Pakistani',
      languages: 'English, Urdu',
      experience: '12 years',
      specialization: 'Luxury Menswear, Sherwanis',
      category: 'Menswear',
      gender: 'male',
      bio: 'Hassan Raza is a Karachi-based menswear designer specializing in luxury sherwanis and formal wear. With 12 years of experience, he has become a go-to designer for grooms and formal occasions. His work combines traditional Pakistani tailoring with contemporary cuts, ensuring each piece is both timeless and modern.',
      short_bio: 'Karachi-based luxury menswear designer specializing in sherwanis and sophisticated formal wear.',
      philosophy: 'A well-crafted sherwani carries the weight of tradition and the confidence of modernity. I design for men who understand both.',
      image_url: '/src/assets/home-designer-portrait-2.webp',
      cover_image_url: '/src/assets/hero-home.webp',
      availability: 'Available for commissions',
      is_featured: false,
      is_active: true
    },
    {
      id: 'd7-sana-malik-007',
      slug: 'sana-malik',
      name: 'Sana Malik',
      brand: 'Sana Malik Studio',
      location: 'Islamabad, Pakistan',
      nationality: 'Pakistani',
      languages: 'English, Urdu',
      experience: '4 years',
      specialization: 'Sustainable Fashion, Pret',
      category: 'Womenswear',
      gender: 'female',
      bio: 'Sana Malik is an Islamabad-based designer focused on sustainable fashion and ethical production. A recent graduate of the National Institute of Design, she works exclusively with organic fabrics, natural dyes, and zero-waste pattern cutting techniques. Her collections prove that fashion can be both beautiful and responsible.',
      short_bio: 'Islamabad-based sustainable fashion label proving that ethical production and beautiful design coexist.',
      philosophy: 'Sustainability is not a trend—it is a responsibility. I design to show that conscious fashion can be luxurious, desirable, and transformative.',
      image_url: '/src/assets/home-designer-portrait-3.webp',
      cover_image_url: '/src/assets/home-sustainable-fashion.webp',
      availability: 'Open to stockists',
      is_featured: false,
      is_active: true
    },
    {
      id: 'd8-omar-farooq-008',
      slug: 'omar-farooq',
      name: 'Omar Farooq',
      brand: 'Omar Farooq',
      location: 'Lahore, Pakistan',
      nationality: 'Pakistani',
      languages: 'English, Urdu, Arabic',
      experience: '9 years',
      specialization: 'Contemporary Art, Textile Art',
      category: 'Unisex',
      gender: 'male',
      bio: 'Omar Farooq is a Lahore-based textile artist and designer whose work sits at the intersection of fashion and fine art. His pieces are wearable art, featuring hand-painted motifs, experimental dyeing techniques, and deconstructed silhouettes. Omar has exhibited his work internationally and collaborates with galleries across Pakistan and the Middle East.',
      short_bio: 'Lahore-based textile artist creating wearable art that blurs the line between fashion and fine art.',
      philosophy: 'Fashion is my canvas, but my work belongs in the realm of art. I create pieces that challenge, provoke, and ultimately transform how we see clothing.',
      image_url: '/src/assets/designer-1.webp',
      cover_image_url: '/src/assets/craft.webp',
      availability: 'Gallery commissions open',
      is_featured: false,
      is_active: true
    },
    {
      id: 'd9-mariam-sheikh-009',
      slug: 'mariam-sheikh',
      name: 'Mariam Sheikh',
      brand: 'MS Pret',
      location: 'Karachi, Pakistan',
      nationality: 'Pakistani',
      languages: 'English, Urdu',
      experience: '6 years',
      specialization: 'Pret, Workwear',
      category: 'Womenswear',
      gender: 'female',
      bio: 'Mariam Sheikh is a Karachi-based designer specializing in contemporary pret and sophisticated workwear for the modern professional woman. Her designs are known for their clean lines, versatile silhouettes, and thoughtful details that transition seamlessly from office to evening. Mariam believes in creating clothing that empowers women through confidence and comfort.',
      short_bio: 'Karachi-based contemporary pret label designing sophisticated workwear for the modern professional woman.',
      philosophy: 'I design for women who do it all. My clothing should empower them—not restrict them. Versatility and confidence are at the heart of every piece.',
      image_url: '/src/assets/designer-2.webp',
      cover_image_url: '/src/assets/home-fabric-innovation.webp',
      availability: 'Available for stockists',
      is_featured: false,
      is_active: true
    },
    {
      id: 'd10-aliya-hassan-010',
      slug: 'aliya-hassan',
      name: 'Aliya Hassan',
      brand: 'Aliya Hassan',
      location: 'Lahore, Pakistan',
      nationality: 'Pakistani',
      languages: 'English, Urdu, French',
      experience: '11 years',
      specialization: 'Luxury Pret, Heritage Craft',
      category: 'Womenswear',
      gender: 'female',
      bio: 'Aliya Hassan is a Lahore-based designer dedicated to preserving and elevating Pakistan\'s heritage craft traditions. Working closely with artisans from rural Sindh and Punjab, she creates contemporary luxury pieces that showcase traditional techniques like ajrak printing, phulkari embroidery, and rilli appliqué. Her work has been instrumental in bringing international attention to Pakistani craftspeople.',
      short_bio: 'Lahore-based luxury label preserving Pakistani heritage crafts through contemporary design and artisan collaboration.',
      philosophy: 'Every stitch carries a story. I design to honor the hands that create our heritage and to ensure these traditions thrive for generations to come.',
      image_url: '/src/assets/designer-3.webp',
      cover_image_url: '/src/assets/home-heritage-craft.webp',
      availability: 'Limited edition releases',
      is_featured: true,
      is_active: true
    }
  ]

  // Insert designers
  console.log('📝 Inserting designers...')
  const { data: designerData, error: designerError } = await supabase
    .from('designers')
    .upsert(designers, { onConflict: 'id' })
  
  if (designerError) {
    console.error('❌ Error inserting designers:', designerError)
    return
  }
  console.log(`✅ Inserted ${designers.length} designers\n`)

  // Collections
  const collections = [
    { id: 'c1-nazia-001', designer_id: 'd1-nazia-otho-001', title: 'Urban Heritage', season: 'SS24', description: 'A contemporary exploration of Karachi\'s architectural heritage through modern silhouettes and traditional textile techniques.', inspiration: 'The juxtaposition of colonial-era buildings with modern urban life in Karachi.', looks: 24, cover_image_url: '/src/assets/brand1.webp', is_latest: false },
    { id: 'c2-nazia-002', designer_id: 'd1-nazia-otho-001', title: 'Midnight Bloom', season: 'FW24', description: 'An evening wear collection inspired by the nocturnal gardens of Lahore, featuring rich jewel tones and intricate embroidery.', inspiration: 'Mughal gardens at night, moonlit pathways, and blooming jasmine.', looks: 18, cover_image_url: '/src/assets/brand2.webp', is_latest: true },
    { id: 'c3-zara-001', designer_id: 'd2-zara-ahmad-002', title: 'Punjab Reimagined', season: 'SS24', description: 'A vibrant celebration of Punjabi culture through contemporary pret, featuring traditional phulkari motifs reimagined in modern color palettes.', inspiration: 'The colorful landscapes of rural Punjab and traditional folk art.', looks: 20, cover_image_url: '/src/assets/brand3.webp', is_latest: false },
    { id: 'c4-zara-002', designer_id: 'd2-zara-ahmad-002', title: 'Monsoon', season: 'FW24', description: 'An elegant collection inspired by the Pakistani monsoon season, featuring flowing silhouettes and water-inspired prints.', inspiration: 'The romance of rain in Lahore, wet streets, and the smell of earth.', looks: 16, cover_image_url: '/src/assets/brand4.webp', is_latest: true },
    { id: 'c5-fatima-001', designer_id: 'd3-fatima-noor-003', title: 'Ethereal', season: 'SS24', description: 'A luxury formal wear collection featuring delicate fabrics, subtle embellishments, and sophisticated silhouettes for the modern woman.', inspiration: 'The elegance of marble architecture and minimalist art.', looks: 22, cover_image_url: '/src/assets/brand5.webp', is_latest: true },
    { id: 'c6-bilal-001', designer_id: 'd4-bilal-hussain-004', title: 'Concrete Jungle', season: 'SS24', description: 'A streetwear collection capturing the raw energy of Karachi\'s urban landscape, featuring graphic prints and relaxed silhouettes.', inspiration: 'Karachi street art, truck art, and the city\'s vibrant chaos.', looks: 28, cover_image_url: '/src/assets/mirror-rebel-tee-adorzia.webp', is_latest: false },
    { id: 'c7-bilal-002', designer_id: 'd4-bilal-hussain-004', title: 'Night Shift', season: 'FW24', description: 'An after-dark collection inspired by Karachi\'s nightlife and music scene, featuring darker palettes and bold statements.', inspiration: 'The energy of Karachi after midnight, neon lights, and underground music.', looks: 22, cover_image_url: '/src/assets/mirrorwork-bomber-jacket-adorzia.webp', is_latest: true },
    { id: 'c8-ayesha-001', designer_id: 'd5-ayesha-khan-005', title: 'Mughal Revival', season: 'Bridal 2024', description: 'A luxury bridal collection drawing from Mughal art and architecture, featuring intricate hand embroidery and rich fabrics.', inspiration: 'The opulence of Mughal courts, miniature paintings, and royal textiles.', looks: 15, cover_image_url: '/src/assets/home-luxury-bridal.webp', is_latest: true },
    { id: 'c9-aliya-001', designer_id: 'd10-aliya-hassan-010', title: 'Ajrak Modern', season: 'SS24', description: 'A contemporary interpretation of traditional Sindhi ajrak printing, featuring modern silhouettes and updated color palettes.', inspiration: 'The ancient craft of ajrak block printing and the Indus Valley civilization.', looks: 20, cover_image_url: '/src/assets/ajrak-architect-coat-adorzia1.webp', is_latest: false },
    { id: 'c10-aliya-002', designer_id: 'd10-aliya-hassan-010', title: 'Phulkari Reborn', season: 'FW24', description: 'A luxury collection reviving the traditional Punjabi phulkari embroidery technique through contemporary design.', inspiration: 'The vibrant folk art of Punjab and the storytelling tradition of phulkari.', looks: 18, cover_image_url: '/src/assets/phulkari-reborn-blazer-adorzia.webp', is_latest: true }
  ]

  console.log('📝 Inserting collections...')
  const { error: collectionsError } = await supabase
    .from('designer_collections')
    .upsert(collections, { onConflict: 'id' })
  
  if (collectionsError) {
    console.error('❌ Error inserting collections:', collectionsError)
  } else {
    console.log(`✅ Inserted ${collections.length} collections\n`)
  }

  // Education
  const education = [
    { id: 'e1-nazia', designer_id: 'd1-nazia-otho-001', institution: 'Pakistan Institute of Fashion and Design (PIFD)', degree: 'BFA in Fashion Design', year: '2014 - 2018' },
    { id: 'e2-zara', designer_id: 'd2-zara-ahmad-002', institution: 'National College of Arts (NCA), Lahore', degree: 'BFA in Textile Design', year: '2016 - 2020' },
    { id: 'e3-fatima', designer_id: 'd3-fatima-noor-003', institution: 'National Institute of Design (NID)', degree: 'BDes in Fashion Design', year: '2017 - 2021' },
    { id: 'e4-bilal', designer_id: 'd4-bilal-hussain-004', institution: 'Indus Valley School of Art and Architecture (IVS)', degree: 'BFA in Textile Design', year: '2015 - 2019' },
    { id: 'e5-ayesha', designer_id: 'd5-ayesha-khan-005', institution: 'Pakistan Institute of Fashion and Design (PIFD)', degree: 'BFA in Fashion Design', year: '2010 - 2014' },
    { id: 'e6-hassan', designer_id: 'd6-hassan-raza-006', institution: 'Pakistan Institute of Fashion and Design (PIFD)', degree: 'BFA in Fashion Design', year: '2008 - 2012' },
    { id: 'e7-sana', designer_id: 'd7-sana-malik-007', institution: 'National Institute of Design (NID)', degree: 'BDes in Sustainable Design', year: '2018 - 2022' },
    { id: 'e8-omar', designer_id: 'd8-omar-farooq-008', institution: 'National College of Arts (NCA), Lahore', degree: 'MFA in Fine Art', year: '2012 - 2014' },
    { id: 'e9-mariam', designer_id: 'd9-mariam-sheikh-009', institution: 'Pakistan Institute of Fashion and Design (PIFD)', degree: 'BFA in Fashion Design', year: '2016 - 2020' },
    { id: 'e10-aliya', designer_id: 'd10-aliya-hassan-010', institution: 'National College of Arts (NCA), Lahore', degree: 'BFA in Textile Design', year: '2010 - 2014' }
  ]

  console.log('📝 Inserting education...')
  const { error: educationError } = await supabase
    .from('designer_education')
    .upsert(education, { onConflict: 'id' })
  
  if (educationError) {
    console.error('❌ Error inserting education:', educationError)
  } else {
    console.log(`✅ Inserted ${education.length} education records\n`)
  }

  // Achievements
  const achievements = [
    { id: 'a1-nazia', designer_id: 'd1-nazia-otho-001', title: 'PFDC Sunsilk Fashion Week', detail: 'Showcased at PFDC Sunsilk Fashion Week Karachi 2023' },
    { id: 'a2-nazia', designer_id: 'd1-nazia-otho-001', title: 'Lux Style Awards Nominee', detail: 'Nominated for Emerging Designer of the Year 2023' },
    { id: 'a3-zara', designer_id: 'd2-zara-ahmad-002', title: 'Lahore Fashion Week', detail: 'Featured designer at Lahore Fashion Week 2023' },
    { id: 'a4-fatima', designer_id: 'd3-fatima-noor-003', title: 'Bridal Couture Week', detail: 'Showcased at Bridal Couture Week Islamabad 2024' },
    { id: 'a5-bilal', designer_id: 'd4-bilal-hussain-004', title: 'Karachi Street Style Awards', detail: 'Won Best Streetwear Designer 2023' },
    { id: 'a6-ayesha', designer_id: 'd5-ayesha-khan-005', title: 'Hum Style Awards', detail: 'Won Best Bridal Designer 2023' },
    { id: 'a7-ayesha', designer_id: 'd5-ayesha-khan-005', title: 'Dubai Fashion Week', detail: 'Featured designer at Dubai Fashion Week 2024' },
    { id: 'a8-hassan', designer_id: 'd6-hassan-raza-006', title: 'Menswear Excellence Awards', detail: 'Won Best Luxury Menswear Designer 2022' },
    { id: 'a9-omar', designer_id: 'd8-omar-farooq-008', title: 'International Textile Art Biennale', detail: 'Exhibited at International Textile Art Biennale 2023' },
    { id: 'a10-aliya', designer_id: 'd10-aliya-hassan-010', title: 'Craft Pakistan Award', detail: 'Received Craft Pakistan Award for Heritage Preservation 2023' },
    { id: 'a11-aliya', designer_id: 'd10-aliya-hassan-010', title: 'UNESCO Craft Recognition', detail: 'Recognized by UNESCO for craft preservation efforts' }
  ]

  console.log('📝 Inserting achievements...')
  const { error: achievementsError } = await supabase
    .from('designer_achievements')
    .upsert(achievements, { onConflict: 'id' })
  
  if (achievementsError) {
    console.error('❌ Error inserting achievements:', achievementsError)
  } else {
    console.log(`✅ Inserted ${achievements.length} achievements\n`)
  }

  // Skills
  const skills = [
    { id: 's1-nazia-1', designer_id: 'd1-nazia-otho-001', skill: 'Hand Embroidery' },
    { id: 's2-nazia-2', designer_id: 'd1-nazia-otho-001', skill: 'Pattern Cutting' },
    { id: 's3-nazia-3', designer_id: 'd1-nazia-otho-001', skill: 'Draping' },
    { id: 's4-zara-1', designer_id: 'd2-zara-ahmad-002', skill: 'Textile Printing' },
    { id: 's5-zara-2', designer_id: 'd2-zara-ahmad-002', skill: 'Digital Design' },
    { id: 's6-zara-3', designer_id: 'd2-zara-ahmad-002', skill: 'Color Theory' },
    { id: 's7-fatima-1', designer_id: 'd3-fatima-noor-003', skill: 'Evening Wear Construction' },
    { id: 's8-fatima-2', designer_id: 'd3-fatima-noor-003', skill: 'Silk Work' },
    { id: 's9-bilal-1', designer_id: 'd4-bilal-hussain-004', skill: 'Streetwear Design' },
    { id: 's10-bilal-2', designer_id: 'd4-bilal-hussain-004', skill: 'Screen Printing' },
    { id: 's11-bilal-3', designer_id: 'd4-bilal-hussain-004', skill: 'Graphic Design' },
    { id: 's12-ayesha-1', designer_id: 'd5-ayesha-khan-005', skill: 'Zardozi Embroidery' },
    { id: 's13-ayesha-2', designer_id: 'd5-ayesha-khan-005', skill: 'Bridal Couture' },
    { id: 's14-ayesha-3', designer_id: 'd5-ayesha-khan-005', skill: 'Hand Embroidery' },
    { id: 's15-hassan-1', designer_id: 'd6-hassan-raza-006', skill: 'Sherwani Tailoring' },
    { id: 's16-hassan-2', designer_id: 'd6-hassan-raza-006', skill: 'Hand Embroidery' },
    { id: 's17-sana-1', designer_id: 'd7-sana-malik-007', skill: 'Sustainable Pattern Cutting' },
    { id: 's18-sana-2', designer_id: 'd7-sana-malik-007', skill: 'Natural Dyeing' },
    { id: 's19-sana-3', designer_id: 'd7-sana-malik-007', skill: 'Zero-Waste Design' },
    { id: 's20-omar-1', designer_id: 'd8-omar-farooq-008', skill: 'Textile Art' },
    { id: 's21-omar-2', designer_id: 'd8-omar-farooq-008', skill: 'Hand Painting' },
    { id: 's22-omar-3', designer_id: 'd8-omar-farooq-008', skill: 'Experimental Dyeing' },
    { id: 's23-mariam-1', designer_id: 'd9-mariam-sheikh-009', skill: 'Workwear Design' },
    { id: 's24-mariam-2', designer_id: 'd9-mariam-sheikh-009', skill: 'Pattern Cutting' },
    { id: 's25-aliya-1', designer_id: 'd10-aliya-hassan-010', skill: 'Ajrak Printing' },
    { id: 's26-aliya-2', designer_id: 'd10-aliya-hassan-010', skill: 'Phulkari Embroidery' },
    { id: 's27-aliya-3', designer_id: 'd10-aliya-hassan-010', skill: 'Artisan Collaboration' }
  ]

  console.log('📝 Inserting skills...')
  const { error: skillsError } = await supabase
    .from('designer_skills')
    .upsert(skills, { onConflict: 'id' })
  
  if (skillsError) {
    console.error('❌ Error inserting skills:', skillsError)
  } else {
    console.log(`✅ Inserted ${skills.length} skills\n`)
  }

  // Social Links
  const socialLinks = [
    { id: 'sl1-nazia', designer_id: 'd1-nazia-otho-001', instagram: '@naziaotho', website: 'https://naziaotho.com', email: 'hello@naziaotho.com' },
    { id: 'sl2-zara', designer_id: 'd2-zara-ahmad-002', instagram: '@zaraahmadstudio', website: 'https://zaraahmad.com', email: 'info@zaraahmad.com' },
    { id: 'sl3-fatima', designer_id: 'd3-fatima-noor-003', instagram: '@fatimanoor', website: 'https://fatimanoor.com', email: 'contact@fatimanoor.com' },
    { id: 'sl4-bilal', designer_id: 'd4-bilal-hussain-004', instagram: '@bhbybilal', website: 'https://bhbybilal.com', email: 'hello@bhbybilal.com' },
    { id: 'sl5-ayesha', designer_id: 'd5-ayesha-khan-005', instagram: '@ayeshakhanatelier', website: 'https://ayeshakhan.com', email: 'bookings@ayeshakhan.com' },
    { id: 'sl6-hassan', designer_id: 'd6-hassan-raza-006', instagram: '@hrmenswear', website: 'https://hrmenswear.com', email: 'info@hrmenswear.com' },
    { id: 'sl7-sana', designer_id: 'd7-sana-malik-007', instagram: '@sanamalilstudio', website: 'https://sanamalik.com', email: 'hello@sanamalik.com' },
    { id: 'sl8-omar', designer_id: 'd8-omar-farooq-008', instagram: '@omarfarooqart', website: 'https://omarfarooq.art', email: 'studio@omarfarooq.art' },
    { id: 'sl9-mariam', designer_id: 'd9-mariam-sheikh-009', instagram: '@mspret', website: 'https://mspret.com', email: 'info@mspret.com' },
    { id: 'sl10-aliya', designer_id: 'd10-aliya-hassan-010', instagram: '@aliyahassan', website: 'https://aliyahassan.com', email: 'hello@aliyahassan.com' }
  ]

  console.log('📝 Inserting social links...')
  const { error: socialError } = await supabase
    .from('designer_social_links')
    .upsert(socialLinks, { onConflict: 'id' })
  
  if (socialError) {
    console.error('❌ Error inserting social links:', socialError)
  } else {
    console.log(`✅ Inserted ${socialLinks.length} social links\n`)
  }

  // Certifications
  const certifications = [
    { id: 'cert1-ayesha', designer_id: 'd5-ayesha-khan-005', certification: 'PFDC Certified Designer' },
    { id: 'cert2-hassan', designer_id: 'd6-hassan-raza-006', certification: 'PFDC Certified Designer' },
    { id: 'cert3-aliya', designer_id: 'd10-aliya-hassan-010', certification: 'Pakistan Craft Council Certified' },
    { id: 'cert4-sana', designer_id: 'd7-sana-malik-007', certification: 'Sustainable Fashion Certification - Textile Exchange' }
  ]

  console.log('📝 Inserting certifications...')
  const { error: certsError } = await supabase
    .from('designer_certifications')
    .upsert(certifications, { onConflict: 'id' })
  
  if (certsError) {
    console.error('❌ Error inserting certifications:', certsError)
  } else {
    console.log(`✅ Inserted ${certifications.length} certifications\n`)
  }

  console.log('🎉 Designer seed completed successfully!')
}

seedDesigners().catch(console.error)
