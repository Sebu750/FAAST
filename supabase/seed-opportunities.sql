-- ============================================
-- SEED DATA: OPPORTUNITIES
-- ============================================

-- Clear existing seed data (optional - remove if you want to keep existing)
DELETE FROM opportunities WHERE slug IN (
  'senior-fashion-designer-gul-ahmed',
  'textile-print-designer-sana-safinaz',
  'fashion-design-internship-nida-azwer',
  'pattern-making-internship-deepak-perwani',
  'pfdc-lux-style-awards-emerging-designer',
  'sustainable-fashion-challenge-pakistan',
  'adorzia-heritage-craft-preservation-grant',
  'young-designer-launch-fund',
  'open-call-bridal-couture-showcase-2026',
  'open-call-textile-innovation-lab',
  'lahore-fashion-week-2026',
  'karachi-textile-fashion-expo',
  'virtual-fashion-summit-pakistan'
);

INSERT INTO opportunities (
  title, slug, description, opportunity_type, start_date, end_date,
  application_deadline, location, city, is_remote, status,
  is_open_for_applications, application_method, requirements, benefits,
  salary_range, employment_type, experience_level, prize_amount,
  event_format, max_participants, tags, category, is_featured,
  published_at, created_at
) VALUES
-- JOBS
(
  'Senior Fashion Designer - Gul Ahmed',
  'senior-fashion-designer-gul-ahmed',
  'Gul Ahmed is seeking an experienced Senior Fashion Designer to lead their prêt-à-porter line. The ideal candidate has deep knowledge of Pakistani textile heritage combined with contemporary design sensibility. You will oversee design from concept to production, working closely with pattern masters and sampling teams.',
  'job', '2026-08-01', '2026-12-31',
  '2026-07-25', 'Gul Ahmed Textile Mills, Lahore', 'Lahore', false, 'published',
  true, 'internal',
  '5+ years experience in fashion design, proficiency in Adobe Creative Suite, strong portfolio demonstrating technical skill and creative vision, knowledge of Pakistani textiles and manufacturing processes.',
  'Competitive salary, health insurance, annual bonus, creative freedom to lead a collection, exposure to international trade shows.',
  'PKR 150,000 - 250,000/month', 'full_time', 'senior', NULL,
  NULL, NULL, ARRAY['fashion', 'textiles', 'prêt', 'senior'], 'Jobs', true,
  NOW(), NOW()
),
(
  'Textile Print Designer - Sana Safinaz',
  'textile-print-designer-sana-safinaz',
  'Join Sana Safinaz as a Textile Print Designer. Create original prints and patterns for their luxury pret and bridal collections. Work with traditional techniques like ajrak, block print, and digital printing.',
  'job', '2026-08-15', '2026-12-31',
  '2026-08-01', 'Sana Safinaz HQ, Karachi', 'Karachi', false, 'published',
  true, 'internal',
  '3+ years in textile/print design, strong hand-drawing skills, experience with digital printing, understanding of color theory and repeat patterns.',
  'Work with leading luxury brand, creative growth, exposure to high-end production, competitive compensation.',
  'PKR 100,000 - 150,000/month', 'full_time', 'mid', NULL,
  NULL, NULL, ARRAY['textiles', 'print', 'luxury', 'bridal'], 'Jobs', false,
  NOW(), NOW()
),

-- INTERNSHIPS
(
  'Fashion Design Internship - Nida Azwer',
  'fashion-design-internship-nida-azwer',
  'A 3-month intensive internship with Nida Azwer, one of Pakistan''s most celebrated designers. Learn the complete design process from sketch to runway. Ideal for recent graduates looking to build their portfolio and gain industry experience.',
  'internship', '2026-09-01', '2026-11-30',
  '2026-08-15', 'Nida Azwer Studio, Lahore', 'Lahore', false, 'published',
  true, 'internal',
  'Recent fashion design graduate or final year student, strong sketching abilities, passion for Pakistani fashion, willingness to learn.',
  'Hands-on experience with luxury couture, mentorship from lead designer, portfolio building, potential full-time offer.',
  'PKR 25,000/month stipend', 'internship', 'entry', NULL,
  NULL, NULL, ARRAY['internship', 'couture', 'mentorship', 'graduate'], 'Internships', true,
  NOW(), NOW()
),
(
  'Pattern Making Internship - Deepak Perwani',
  'pattern-making-internship-deepak-perwani',
  'Learn pattern making and garment construction techniques from master craftsmen at Deepak Perwani. This internship covers both traditional and modern pattern drafting methods.',
  'internship', '2026-09-15', '2026-12-15',
  '2026-08-20', 'Deepak Perwani Atelier, Karachi', 'Karachi', false, 'published',
  true, 'internal',
  'Fashion student or graduate, basic sewing skills, interest in technical design and pattern making.',
  'Technical skill development, industry connections, certificate of completion.',
  'PKR 20,000/month stipend', 'internship', 'entry', NULL,
  NULL, NULL, ARRAY['pattern making', 'technical', 'construction'], 'Internships', false,
  NOW(), NOW()
),

-- COMPETITIONS
(
  'PFDC LUX Style Awards - Emerging Designer Competition',
  'pfdc-lux-style-awards-emerging-designer',
  'The PFDC LUX Style Awards presents its annual Emerging Designer Competition. Submit your best collection for a chance to win Pakistan''s most prestigious fashion award and launch your career on the national stage.',
  'competition', '2026-10-01', '2026-10-15',
  '2026-08-30', 'PFDC Headquarters, Lahore', 'Lahore', false, 'published',
  true, 'internal',
  'Designers under 35 years of age, maximum 3 years in industry, original work only, collection of minimum 8 looks.',
  'PKR 500,000 cash prize, feature in LUX Style Awards show, media coverage, mentorship from established designers, retail placement opportunity.',
  NULL, NULL, NULL, 'PKR 500,000 + mentorship',
  NULL, NULL, ARRAY['competition', 'award', 'emerging', 'national'], 'Competitions', true,
  NOW(), NOW()
),
(
  'Sustainable Fashion Challenge Pakistan',
  'sustainable-fashion-challenge-pakistan',
  'Design innovative fashion solutions using sustainable and upcycled materials. This competition challenges designers to prove that fashion can be both beautiful and responsible.',
  'competition', '2026-09-20', '2026-10-20',
  '2026-08-25', 'Virtual + Lahore', 'Lahore', true, 'published',
  true, 'internal',
  'Open to all Pakistani designers and students, submission must use at least 70% sustainable/upcycled materials, collection of 5 looks.',
  'PKR 200,000 prize, feature in sustainable fashion publication, materials sourcing support for 6 months.',
  NULL, NULL, NULL, 'PKR 200,000',
  NULL, NULL, ARRAY['sustainable', 'upcycled', 'eco-fashion', 'challenge'], 'Competitions', false,
  NOW(), NOW()
),

-- GRANTS
(
  'Adorzia Heritage Craft Preservation Grant',
  'adorzia-heritage-craft-preservation-grant',
  'The Adorzia Heritage Craft Preservation Grant supports designers working to preserve and innovate traditional Pakistani crafts. Funding available for research, material sourcing, and collection development that celebrates Pakistan''s rich textile heritage.',
  'grant', '2026-09-01', '2027-02-28',
  '2026-08-15', 'Nationwide', NULL, true, 'published',
  true, 'internal',
  'Active practice in traditional crafts (ajrak, block print, embroidery, weaving), clear project proposal, commitment to preservation and innovation.',
  'PKR 300,000 grant, access to artisan networks, studio space at Adorzia, mentorship, exhibition opportunity.',
  NULL, NULL, NULL, 'PKR 300,000',
  NULL, NULL, ARRAY['grant', 'heritage', 'craft', 'preservation', 'traditional'], 'Grants', true,
  NOW(), NOW()
),
(
  'Young Designer Launch Fund',
  'young-designer-launch-fund',
  'A micro-grant program to help emerging designers launch their first collection. Funding covers production costs, lookbook photography, and initial marketing.',
  'grant', '2026-10-01', '2026-12-31',
  '2026-09-01', 'Nationwide', NULL, true, 'published',
  true, 'external',
  'Designers aged 21-30, first collection only, clear business plan, commitment to showing at Adorzia platform.',
  'PKR 150,000 micro-grant, production support, professional photoshoot, marketing assistance.',
  NULL, NULL, NULL, 'PKR 150,000',
  NULL, NULL, ARRAY['grant', 'emerging', 'launch', 'micro-fund'], 'Grants', false,
  NOW(), NOW()
),

-- OPEN CALLS
(
  'Open Call: Bridal Couture Showcase 2026',
  'open-call-bridal-couture-showcase-2026',
  'Calling all bridal designers! Submit your work for the annual Bridal Couture Showcase. Selected designers will present their collections at a curated event attended by industry leaders, media, and potential clients.',
  'open_call', '2026-11-15', '2026-11-20',
  '2026-09-30', 'Marriott Hotel, Lahore', 'Lahore', false, 'published',
  true, 'internal',
  'Established bridalwear designers, minimum 2 years experience, portfolio of at least 10 bridal looks, ability to produce 5 sample pieces.',
  'Showcase slot, media coverage, buyer meetings, feature in bridal magazine, potential orders.',
  NULL, NULL, NULL, NULL,
  NULL, 20, ARRAY['bridal', 'couture', 'showcase', 'open call'], 'Open Calls', true,
  NOW(), NOW()
),
(
  'Open Call: Textile Innovation Lab',
  'open-call-textile-innovation-lab',
  'Seeking designers experimenting with innovative textile techniques. Selected participants will join a 2-week residency exploring new materials, sustainable processes, and digital fabrication in textiles.',
  'open_call', '2026-10-01', '2026-10-15',
  '2026-08-30', 'NCA Labs, Lahore', 'Lahore', false, 'published',
  true, 'internal',
  'Designers with experimental practice, interest in material innovation, willingness to collaborate and share knowledge.',
  '2-week fully funded residency, access to lab equipment, expert mentorship, exhibition of developed work.',
  NULL, NULL, NULL, NULL,
  NULL, 15, ARRAY['innovation', 'textiles', 'residency', 'experimental'], 'Open Calls', false,
  NOW(), NOW()
),

-- FASHION EVENTS
(
  'Lahore Fashion Week 2026',
  'lahore-fashion-week-2026',
  'Pakistan''s premier fashion event returns for its 15th edition. Lahore Fashion Week showcases the best of Pakistani design talent across prêt, luxury, bridal, and textiles. Designers can apply to present their collections on the main runway.',
  'fashion_event', '2026-11-20', '2026-11-24',
  '2026-09-15', 'Lahore Expo Center', 'Lahore', false, 'published',
  true, 'internal',
  'Established designers with production capability, collection of minimum 15 looks, ability to meet production deadlines.',
  'Runway slot, backstage team, media coverage, buyer access, live streaming to international audience.',
  NULL, NULL, NULL, NULL,
  'in_person', 50, ARRAY['fashion week', 'runway', 'lahore', 'premier'], 'Fashion Events', true,
  NOW(), NOW()
),
(
  'Karachi Textile & Fashion Expo',
  'karachi-textile-fashion-expo',
  'A B2B and B2C expo connecting Pakistani textile manufacturers with fashion designers and buyers. Network with industry leaders, source materials, and showcase your work.',
  'fashion_event', '2026-10-10', '2026-10-13',
  '2026-09-01', 'Karachi Expo Center', 'Karachi', false, 'published',
  true, 'internal',
  'Open to all fashion designers and textile professionals. Booth space available for emerging designers.',
  'Networking opportunities, material sourcing, potential bulk orders, industry visibility.',
  NULL, NULL, NULL, NULL,
  'in_person', 100, ARRAY['expo', 'textile', 'B2B', 'karachi', 'networking'], 'Fashion Events', false,
  NOW(), NOW()
),
(
  'Virtual Fashion Summit Pakistan',
  'virtual-fashion-summit-pakistan',
  'Join industry leaders for a 3-day virtual summit covering trends, sustainability, technology in fashion, and business strategies for Pakistani designers.',
  'fashion_event', '2026-09-15', '2026-09-17',
  '2026-09-10', 'Virtual Event', NULL, true, 'published',
  true, 'external',
  'Open to all fashion professionals and students.',
  'Industry insights, networking with global speakers, certificate of participation, recorded sessions access.',
  NULL, NULL, NULL, NULL,
  'virtual', 500, ARRAY['summit', 'virtual', 'education', 'trends'], 'Fashion Events', false,
  NOW(), NOW()
);
