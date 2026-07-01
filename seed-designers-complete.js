import { createClient } from '@supabase/supabase-js'

// Supabase configuration
const supabaseUrl = 'https://qchqwxoaqzdfalkeitpj.supabase.co'
const supabaseKey = 'sb_publishable_vt1viH8p6POzb5rMckVqeg_ZFbYvhUn'

const supabase = createClient(supabaseUrl, supabaseKey)

async function createTablesAndSeed() {
  console.log('🚀 Starting designer database setup...\n')

  // Step 1: Create tables
  console.log('📋 Creating designer tables...')
  
  const createTablesSQL = `
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

    -- Admin write policies (allow all for now)
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
  `

  // Execute the SQL using RPC (we'll need to use the REST API for this)
  // For now, let's just try to insert data and see if tables exist
  const { error: tableCheckError } = await supabase.from('designers').select('id').limit(1)
  
  if (tableCheckError && tableCheckError.message.includes('does not exist')) {
    console.log('⚠️  Tables do not exist. Please run the SQL migration first.')
    console.log('📋 Go to your Supabase dashboard and run the SQL from:')
    console.log('   /home/s3bu/Desktop/FAAST/supabase/migrations/20260618000001_designers_system.sql')
    console.log('\nOr use the seed-designers.sql file after modifying it for UUID support.')
    return
  }

  console.log('✅ Tables exist!\n')

  // Step 2: Seed data
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
      bio: 'Nazia Otho is a Karachi-based designer known for her contemporary interpretation of traditional Pakistani craftsmanship. With a background in textile design, she brings a unique perspective to modern fashion, blending heritage techniques with silhouettes that resonate with the global Pakistani diaspora.',
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
      bio: 'Zara Ahmad is a Lahore-based designer whose work reflects the vibrant cultural tapestry of Punjab. A graduate of the National College of Arts, Zara specializes in contemporary pret that bridges traditional aesthetics with modern wearability.',
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
      bio: 'Fatima Noor is an Islamabad-based designer specializing in luxury formal wear and evening gowns. With a keen eye for detail and a passion for sophisticated silhouettes, Fatima creates pieces that embody elegance and modern femininity.',
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
      bio: 'Bilal Hussain is redefining Pakistani menswear with his contemporary streetwear label BH by Bilal. Based in Karachi, he draws inspiration from urban culture, music, and the vibrant energy of the city.',
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
      bio: 'Ayesha Khan is a Lahore-based bridal couture designer with over a decade of experience creating dream wedding ensembles. Trained at PIFD, Ayesha is known for her intricate hand embroidery and Mughal-inspired motifs.',
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
      bio: 'Hassan Raza is a Karachi-based menswear designer specializing in luxury sherwanis and formal wear. With 12 years of experience, he has become a go-to designer for grooms and formal occasions.',
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
      bio: 'Sana Malik is an Islamabad-based designer focused on sustainable fashion and ethical production. She works exclusively with organic fabrics, natural dyes, and zero-waste pattern cutting techniques.',
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
      bio: 'Omar Farooq is a Lahore-based textile artist and designer whose work sits at the intersection of fashion and fine art. His pieces are wearable art, featuring hand-painted motifs and experimental dyeing techniques.',
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
      bio: 'Mariam Sheikh is a Karachi-based designer specializing in contemporary pret and sophisticated workwear for the modern professional woman. Her designs transition seamlessly from office to evening.',
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
      bio: 'Aliya Hassan is a Lahore-based designer dedicated to preserving Pakistan\'s heritage craft traditions. Working with artisans from rural Sindh and Punjab, she creates contemporary luxury pieces showcasing ajrak, phulkari, and rilli.',
      short_bio: 'Lahore-based luxury label preserving Pakistani heritage crafts through contemporary design and artisan collaboration.',
      philosophy: 'Every stitch carries a story. I design to honor the hands that create our heritage and to ensure these traditions thrive for generations to come.',
      image_url: '/src/assets/designer-3.webp',
      cover_image_url: '/src/assets/home-heritage-craft.webp',
      availability: 'Limited edition releases',
      is_featured: true,
      is_active: true
    }
  ]

  console.log('📝 Inserting 10 designers...')
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
    { id: 'c1-nazia-001', designer_id: 'd1-nazia-otho-001', title: 'Urban Heritage', season: 'SS24', description: 'A contemporary exploration of Karachi\'s architectural heritage.', inspiration: 'Colonial-era buildings with modern urban life.', looks: 24, cover_image_url: '/src/assets/brand1.webp', is_latest: false },
    { id: 'c2-nazia-002', designer_id: 'd1-nazia-otho-001', title: 'Midnight Bloom', season: 'FW24', description: 'Evening wear inspired by nocturnal gardens of Lahore.', inspiration: 'Mughal gardens at night, moonlit pathways.', looks: 18, cover_image_url: '/src/assets/brand2.webp', is_latest: true },
    { id: 'c3-zara-001', designer_id: 'd2-zara-ahmad-002', title: 'Punjab Reimagined', season: 'SS24', description: 'Vibrant celebration of Punjabi culture through contemporary pret.', inspiration: 'Colorful landscapes of rural Punjab.', looks: 20, cover_image_url: '/src/assets/brand3.webp', is_latest: false },
    { id: 'c4-zara-002', designer_id: 'd2-zara-ahmad-002', title: 'Monsoon', season: 'FW24', description: 'Elegant collection inspired by Pakistani monsoon season.', inspiration: 'Romance of rain in Lahore.', looks: 16, cover_image_url: '/src/assets/brand4.webp', is_latest: true },
    { id: 'c5-fatima-001', designer_id: 'd3-fatima-noor-003', title: 'Ethereal', season: 'SS24', description: 'Luxury formal wear with delicate fabrics and subtle embellishments.', inspiration: 'Marble architecture and minimalist art.', looks: 22, cover_image_url: '/src/assets/brand5.webp', is_latest: true },
    { id: 'c6-bilal-001', designer_id: 'd4-bilal-hussain-004', title: 'Concrete Jungle', season: 'SS24', description: 'Streetwear capturing Karachi\'s urban energy.', inspiration: 'Karachi street art and truck art.', looks: 28, cover_image_url: '/src/assets/mirror-rebel-tee-adorzia.webp', is_latest: false },
    { id: 'c7-bilal-002', designer_id: 'd4-bilal-hussain-004', title: 'Night Shift', season: 'FW24', description: 'After-dark collection inspired by Karachi nightlife.', inspiration: 'Energy of Karachi after midnight.', looks: 22, cover_image_url: '/src/assets/mirrorwork-bomber-jacket-adorzia.webp', is_latest: true },
    { id: 'c8-ayesha-001', designer_id: 'd5-ayesha-khan-005', title: 'Mughal Revival', season: 'Bridal 2024', description: 'Luxury bridal drawing from Mughal art and architecture.', inspiration: 'Opulence of Mughal courts.', looks: 15, cover_image_url: '/src/assets/home-luxury-bridal.webp', is_latest: true },
    { id: 'c9-aliya-001', designer_id: 'd10-aliya-hassan-010', title: 'Ajrak Modern', season: 'SS24', description: 'Contemporary interpretation of traditional Sindhi ajrak.', inspiration: 'Ancient craft of ajrak block printing.', looks: 20, cover_image_url: '/src/assets/ajrak-architect-coat-adorzia1.webp', is_latest: false },
    { id: 'c10-aliya-002', designer_id: 'd10-aliya-hassan-010', title: 'Phulkari Reborn', season: 'FW24', description: 'Reviving traditional Punjabi phulkari embroidery.', inspiration: 'Vibrant folk art of Punjab.', looks: 18, cover_image_url: '/src/assets/phulkari-reborn-blazer-adorzia.webp', is_latest: true }
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

  console.log('🎉 Designer seed completed successfully!')
  console.log('\n📊 Summary:')
  console.log(`   - 10 Designers`)
  console.log(`   - 10 Collections`)
  console.log(`   - 10 Education records`)
  console.log(`   - 10 Social links`)
}

createTablesAndSeed().catch(console.error)
