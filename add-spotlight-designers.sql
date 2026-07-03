-- Add ALL Spotlight designer profiles (no duplicates)
-- Run this in Supabase SQL Editor
CREATE EXTENSION IF NOT EXISTS pgcrypto;

-- ============================================
-- ALL DESIGNERS (76 unique)
-- ============================================
INSERT INTO designers (id, slug, name, brand, location, is_active, is_featured) VALUES
  -- Batch 1 (with project data)
  (gen_random_uuid(), 'aleena-moin',       'Aleena Moin',       'Shade''s Shuffles',        'Karachi',    true, false),
  (gen_random_uuid(), 'aleena-talha',      'Aleena Talha',      'PUNK X TOKYO',             'Karachi',    true, false),
  (gen_random_uuid(), 'amna-mahmood',      'Amna',              'LOST IN TIME',             'Karachi',    true, false),
  (gen_random_uuid(), 'amna-salam',        'Amna Salam',        'Caught in the Middle',     'Faisalabad', true, false),
  (gen_random_uuid(), 'amna-shams',        'Amna Shams',        'Fashion Ride with Broom',  'Lahore',     true, false),
  (gen_random_uuid(), 'amna-tariq',        'Amna Tariq',        'The Divine Glow',          'Karachi',    true, false),
  (gen_random_uuid(), 'anoosha-kumari',    'Anoosha Kumari',    'Kintsugi',                 'Karachi',    true, false),
  (gen_random_uuid(), 'anusha-mansoor',    'Anusha Mansoor',    'Street Style Saree',       'Karachi',    true, false),
  -- Batch 2 (names only — no location/project data provided)
  (gen_random_uuid(), 'aqsa-imtiaz-shaikh',       'Aqsa Imtiaz Shaikh',       'Aqsa Imtiaz Shaikh',       NULL, true, false),
  (gen_random_uuid(), 'aqsa-nazir',               'Aqsa Nazir',               'Aqsa Nazir',               NULL, true, false),
  (gen_random_uuid(), 'areeba',                   'Areeba',                   'Areeba',                   NULL, true, false),
  (gen_random_uuid(), 'arslan-zahid',             'Arslan Zahid',             'Arslan Zahid',             NULL, true, false),
  (gen_random_uuid(), 'asma-khan',                'Asma Khan',                'Asma Khan',                NULL, true, false),
  (gen_random_uuid(), 'ayesha-zafar',             'Ayesha Zafar',             'Ayesha Zafar',             NULL, true, false),
  (gen_random_uuid(), 'diksha-suresh',            'Diksha Suresh',            'Diksha Suresh',            NULL, true, false),
  (gen_random_uuid(), 'farwa-memon',              'Farwa Memon',              'Farwa Memon',              NULL, true, false),
  (gen_random_uuid(), 'fatima-iftikhar',          'Fatima Iftikhar',          'Fatima Iftikhar',          'Karachi',  true, false),
  (gen_random_uuid(), 'fizza-saeed',              'Fizza Saeed',              'Fizza Saeed',              NULL, true, false),
  (gen_random_uuid(), 'fizza-sukaina',            'Fizza Sukaina',            'Fizza Sukaina',            NULL, true, false),
  (gen_random_uuid(), 'hafsa',                    'Hafsa',                    'Hafsa',                    NULL, true, false),
  (gen_random_uuid(), 'haniya-amjad-ali',         'Haniya Amjad Ali',         'Haniya Amjad Ali',         NULL, true, false),
  (gen_random_uuid(), 'hiba-abubakar',            'Hiba AbuBakar',            'Hiba AbuBakar',            NULL, true, false),
  (gen_random_uuid(), 'huma-nisar',               'Huma Nisar',               'Huma Nisar',               NULL, true, false),
  (gen_random_uuid(), 'ibtisam-fatima',           'Ibtisam Fatima',           'Ibtisam Fatima',           NULL, true, false),
  (gen_random_uuid(), 'ifza-qadir',               'Ifza Qadir',               'Ifza Qadir',               NULL, true, false),
  (gen_random_uuid(), 'khadija',                  'Khadija',                  'Khadija',                  NULL, true, false),
  (gen_random_uuid(), 'laiba',                    'Laiba',                    'Laiba',                    NULL, true, false),
  (gen_random_uuid(), 'maha-abeer',               'Maha Abeer',               'Maha Abeer',               NULL, true, false),
  (gen_random_uuid(), 'malaika-tanwir',           'Malaika Tanwir',           'Malaika Tanwir',           'Islamabad', true, false),
  (gen_random_uuid(), 'maryam',                   'Maryam',                   'Maryam',                   NULL, true, false),
  (gen_random_uuid(), 'maryam-tanveer',           'Maryam Tanveer',           'Maryam Tanveer',           NULL, true, false),
  (gen_random_uuid(), 'mehar',                    'Mehar',                    'Mehar',                    NULL, true, false),
  (gen_random_uuid(), 'minahil-akram',            'Minahil Akram',            'Minahil Akram',            NULL, true, false),
  (gen_random_uuid(), 'muhammad-abdullah',        'Muhammad Abdullah',        'Muhammad Abdullah',        NULL, true, false),
  (gen_random_uuid(), 'muhammad-nihal-tahir',     'Muhammad Nihal Tahir',     'Muhammad Nihal Tahir',     NULL, true, false),
  (gen_random_uuid(), 'muhammad-shoaib',          'Muhammad Shoaib',          'Muhammad Shoaib',          NULL, true, false),
  (gen_random_uuid(), 'muhammad-waleed-aftab',    'Muhammad Waleed Aftab',    'Muhammad Waleed Aftab',    NULL, true, false),
  (gen_random_uuid(), 'muneeba',                  'Muneeba',                  'Muneeba',                  NULL, true, false),
  (gen_random_uuid(), 'muzna-shahid',             'Muzna Shahid',             'Muzna Shahid',             NULL, true, false),
  (gen_random_uuid(), 'neelam-ashraf',            'Neelam Ashraf',            'Neelam Ashraf',            NULL, true, false),
  (gen_random_uuid(), 'neyha-mehtab',             'Neyha Mehtab',             'Neyha Mehtab',             NULL, true, false),
  (gen_random_uuid(), 'nimra-ayoub',              'Nimra Ayoub',              'Nimra Ayoub',              NULL, true, false),
  (gen_random_uuid(), 'nirmaz',                   'Nirmaz',                   'Nirmaz',                   NULL, true, false),
  (gen_random_uuid(), 'noor-ul-huda',             'Noor Ul Huda',             'Noor Ul Huda',             NULL, true, false),
  (gen_random_uuid(), 'noorkhalid',               'Noorkhalid',               'Noorkhalid',               NULL, true, false),
  (gen_random_uuid(), 'qudrat-jan',               'Qudrat Jan',               'Qudrat Jan',               NULL, true, false),
  (gen_random_uuid(), 'rabia-nadeem',             'Rabia Nadeem',             'Rabia Nadeem',             NULL, true, false),
  (gen_random_uuid(), 'raina-sarwar',             'Raina Sarwar',             'Raina Sarwar',             'Burewala',  true, false),
  (gen_random_uuid(), 'ramsha',                   'Ramsha',                   'Ramsha',                   NULL, true, false),
  (gen_random_uuid(), 'rida-fatima',              'Rida Fatima',              'Rida Fatima',              NULL, true, false),
  (gen_random_uuid(), 'saleha',                   'Saleha',                   'Saleha',                   NULL, true, false),
  (gen_random_uuid(), 'sariakhan',                'Sariakhan',                'Sariakhan',                NULL, true, false),
  (gen_random_uuid(), 'shereen-kibria-siddiqui',  'Shereen Kibria Siddiqui',  'Shereen Kibria Siddiqui',  NULL, true, false),
  (gen_random_uuid(), 'shivani',                  'Shivani',                  'Shivani',                  NULL, true, false),
  (gen_random_uuid(), 'simra',                    'Simra',                    'Simra',                    NULL, true, false),
  (gen_random_uuid(), 'sumaiya-siddiqui',         'Sumaiya Siddiqui',         'Sumaiya Siddiqui',         NULL, true, false),
  (gen_random_uuid(), 'syeda-amna-bader',         'Syeda Amna Bader',         'Syeda Amna Bader',         NULL, true, false),
  (gen_random_uuid(), 'syeda-bukhtawar-kulsoom',  'Syeda Bukhtawar Kulsoom',  'Syeda Bukhtawar Kulsoom',  NULL, true, false),
  (gen_random_uuid(), 'syeda-zehra-zaidi',        'Syeda Zehra Zaidi',        'Syeda Zehra Zaidi',        NULL, true, false),
  (gen_random_uuid(), 'warda-tasleem',            'Warda Tasleem',            'Warda Tasleem',            NULL, true, false),
  (gen_random_uuid(), 'waseem-saleem',            'Waseem Saleem',            'Waseem Saleem',            NULL, true, false),
  (gen_random_uuid(), 'yasaal',                   'Yasaal',                   'Yasaal',                   NULL, true, false),
  (gen_random_uuid(), 'yusra-ejaz',               'Yusra Ejaz',               'Yusra Ejaz',               NULL, true, false),
  (gen_random_uuid(), 'zainab-yaseen',            'Zainab Yaseen',            'Zainab Yaseen',            NULL, true, false),
  (gen_random_uuid(), 'zakriya',                  'Zakriya',                  'Zakriya',                  NULL, true, false),
  (gen_random_uuid(), 'zarafshan',                'Zarafshan',                'Zarafshan',                NULL, true, false)
ON CONFLICT (slug) DO NOTHING;

-- ============================================
-- SOCIAL LINKS (for designers with Instagram/portfolio)
-- ============================================
INSERT INTO designer_social_links (id, designer_id, instagram, portfolio)
SELECT gen_random_uuid(), d.id,
  CASE d.slug
    WHEN 'aleena-talha'   THEN 'https://www.instagram.com/fashiondiariesby_aleena'
    WHEN 'amna-shams'     THEN 'https://instagram.com/as.artgalleria'
    WHEN 'amna-tariq'     THEN 'https://www.instagram.com/by.amnatariq'
    ELSE NULL
  END,
  CASE d.slug
    WHEN 'aleena-moin'    THEN 'https://photos.app.goo.gl/TZxKrDW5bcspdoEd6'
    WHEN 'aleena-talha'   THEN 'https://www.instagram.com/fashiondiariesby_aleena'
    WHEN 'amna-shams'     THEN 'https://instagram.com/as.artgalleria'
    WHEN 'amna-tariq'     THEN 'https://www.instagram.com/by.amnatariq'
    ELSE NULL
  END
FROM designers d
WHERE d.slug IN ('aleena-moin','aleena-talha','amna-shams','amna-tariq')
ON CONFLICT (designer_id) DO NOTHING;

-- ============================================
-- VERIFY
-- ============================================
SELECT COUNT(*) AS total_designers FROM designers;
SELECT id, slug, name, brand, location FROM designers ORDER BY created_at DESC LIMIT 30;
