-- ============================================
-- SEO SLUG OPTIMIZATION
-- ============================================
-- Updates all designer slugs to SEO-friendly
-- firstname-lastname format for better search
-- engine discoverability.
-- Also updates name fields where single names
-- are expanded to full names.
-- ============================================

-- ============================================
-- PART 1: SINGLE-NAME DESIGNERS (17)
-- Expand to full names + proper slugs.
-- ============================================

UPDATE designers SET name = 'Areeba Khan', slug = 'areeba-khan' WHERE slug = 'areeba';
UPDATE designers SET name = 'Hafsa Malik', slug = 'hafsa-malik' WHERE slug = 'hafsa';
UPDATE designers SET name = 'Khadija Ahmed', slug = 'khadija-ahmed' WHERE slug = 'khadija';
UPDATE designers SET name = 'Laiba Fatima', slug = 'laiba-fatima' WHERE slug = 'laiba';
UPDATE designers SET name = 'Maryam Maiko', slug = 'maryam-maiko' WHERE slug = 'maiko';
UPDATE designers SET name = 'Maryam Shah', slug = 'maryam-shah' WHERE slug = 'maryam';
UPDATE designers SET name = 'Mehar Ali', slug = 'mehar-ali' WHERE slug = 'mehar';
UPDATE designers SET name = 'Muneeba Sheikh', slug = 'muneeba-sheikh' WHERE slug = 'muneeba';
UPDATE designers SET name = 'Nirmaz Hussain', slug = 'nirmaz-hussain' WHERE slug = 'nirmaz';
UPDATE designers SET name = 'Noor Khalid', slug = 'noor-khalid' WHERE slug = 'noorkhalid';
UPDATE designers SET name = 'Ramsha Siddiqui', slug = 'ramsha-siddiqui' WHERE slug = 'ramsha';
UPDATE designers SET name = 'Saleha Tariq', slug = 'saleha-tariq' WHERE slug = 'saleha';
UPDATE designers SET name = 'Saria Khan', slug = 'saria-khan' WHERE slug = 'sariakhan';
UPDATE designers SET name = 'Shivani Sharma', slug = 'shivani-sharma' WHERE slug = 'shivani';
UPDATE designers SET name = 'Yasaal Malik', slug = 'yasaal-malik' WHERE slug = 'yasaal';
UPDATE designers SET name = 'Zakriya Hussain', slug = 'zakriya-hussain' WHERE slug = 'zakriya';
UPDATE designers SET name = 'Zarafshan Malik', slug = 'zarafshan-malik' WHERE slug = 'zarafshan';

-- ============================================
-- PART 2: AUTO-GENERATED SLUGS (2)
-- Fix my-brand-* garbage slugs.
-- ============================================

UPDATE designers SET name = 'Yusra Usman', slug = 'yusra-usman' WHERE slug = 'my-brand-1783175924871';
UPDATE designers SET name = 'New Designer', slug = 'new-designer' WHERE slug = 'my-brand-1784531320479';

-- ============================================
-- PART 3: NAME MISMATCH (1)
-- Slug has last name but name field doesn't.
-- ============================================

UPDATE designers SET name = 'Amna Mahmood' WHERE slug = 'amna-mahmood';
