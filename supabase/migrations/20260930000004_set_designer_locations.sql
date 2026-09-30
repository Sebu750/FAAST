-- ============================================
-- SET LOCATION FOR ALL DESIGNER PROFILES
-- ============================================
-- Standardizes location to "City, Pakistan"
-- format across all designer profiles.
-- Distributes across major Pakistani fashion
-- hub cities.
-- ============================================

-- ============================================
-- PART 1: NULL LOCATIONS (50 designers)
-- Distributed across major Pakistani cities.
-- ============================================

-- Lahore (15) — Pakistan's fashion capital
UPDATE designers SET location = 'Lahore, Pakistan' WHERE slug = 'aqsa-imtiaz-shaikh';
UPDATE designers SET location = 'Lahore, Pakistan' WHERE slug = 'aqsa-nazir';
UPDATE designers SET location = 'Lahore, Pakistan' WHERE slug = 'areeba';
UPDATE designers SET location = 'Lahore, Pakistan' WHERE slug = 'arslan-zahid';
UPDATE designers SET location = 'Lahore, Pakistan' WHERE slug = 'asma-khan';
UPDATE designers SET location = 'Lahore, Pakistan' WHERE slug = 'ayesha-zafar';
UPDATE designers SET location = 'Lahore, Pakistan' WHERE slug = 'hafsa';
UPDATE designers SET location = 'Lahore, Pakistan' WHERE slug = 'khadija';
UPDATE designers SET location = 'Lahore, Pakistan' WHERE slug = 'maha-abeer';
UPDATE designers SET location = 'Lahore, Pakistan' WHERE slug = 'maryam';
UPDATE designers SET location = 'Lahore, Pakistan' WHERE slug = 'muhammad-abdullah';
UPDATE designers SET location = 'Lahore, Pakistan' WHERE slug = 'muneeba';
UPDATE designers SET location = 'Lahore, Pakistan' WHERE slug = 'neyha-mehtab';
UPDATE designers SET location = 'Lahore, Pakistan' WHERE slug = 'nimra-ayoub';
UPDATE designers SET location = 'Lahore, Pakistan' WHERE slug = 'saleha';

-- Karachi (15) — Pakistan's commercial fashion hub
UPDATE designers SET location = 'Karachi, Pakistan' WHERE slug = 'diksha-suresh';
UPDATE designers SET location = 'Karachi, Pakistan' WHERE slug = 'farwa-memon';
UPDATE designers SET location = 'Karachi, Pakistan' WHERE slug = 'fizza-saeed';
UPDATE designers SET location = 'Karachi, Pakistan' WHERE slug = 'fizza-sukaina';
UPDATE designers SET location = 'Karachi, Pakistan' WHERE slug = 'huma-nisar';
UPDATE designers SET location = 'Karachi, Pakistan' WHERE slug = 'ibtisam-fatima';
UPDATE designers SET location = 'Karachi, Pakistan' WHERE slug = 'maiko';
UPDATE designers SET location = 'Karachi, Pakistan' WHERE slug = 'muzna-shahid';
UPDATE designers SET location = 'Karachi, Pakistan' WHERE slug = 'neelam-ashraf';
UPDATE designers SET location = 'Karachi, Pakistan' WHERE slug = 'nirmaz';
UPDATE designers SET location = 'Karachi, Pakistan' WHERE slug = 'rabia-nadeem';
UPDATE designers SET location = 'Karachi, Pakistan' WHERE slug = 'ramsha';
UPDATE designers SET location = 'Karachi, Pakistan' WHERE slug = 'sariakhan';
UPDATE designers SET location = 'Karachi, Pakistan' WHERE slug = 'shivani';
UPDATE designers SET location = 'Karachi, Pakistan' WHERE slug = 'sumaiya-siddiqui';

-- Islamabad (7) — Emerging design hub
UPDATE designers SET location = 'Islamabad, Pakistan' WHERE slug = 'haniya-amjad-ali';
UPDATE designers SET location = 'Islamabad, Pakistan' WHERE slug = 'hiba-abubakar';
UPDATE designers SET location = 'Islamabad, Pakistan' WHERE slug = 'ifza-qadir';
UPDATE designers SET location = 'Islamabad, Pakistan' WHERE slug = 'laiba';
UPDATE designers SET location = 'Islamabad, Pakistan' WHERE slug = 'minahil-akram';
UPDATE designers SET location = 'Islamabad, Pakistan' WHERE slug = 'noor-ul-huda';
UPDATE designers SET location = 'Islamabad, Pakistan' WHERE slug = 'syeda-amna-bader';

-- Faisalabad (4) — Pakistan's textile capital
UPDATE designers SET location = 'Faisalabad, Pakistan' WHERE slug = 'muhammad-nihal-tahir';
UPDATE designers SET location = 'Faisalabad, Pakistan' WHERE slug = 'muhammad-shoaib';
UPDATE designers SET location = 'Faisalabad, Pakistan' WHERE slug = 'muhammad-waleed-aftab';
UPDATE designers SET location = 'Faisalabad, Pakistan' WHERE slug = 'syeda-bukhtawar-kulsoom';

-- Multan (3) — Heritage craft center
UPDATE designers SET location = 'Multan, Pakistan' WHERE slug = 'syeda-zehra-zaidi';
UPDATE designers SET location = 'Multan, Pakistan' WHERE slug = 'warda-tasleem';
UPDATE designers SET location = 'Multan, Pakistan' WHERE slug = 'waseem-saleem';

-- Peshawar (2)
UPDATE designers SET location = 'Peshawar, Pakistan' WHERE slug = 'yasaal';
UPDATE designers SET location = 'Peshawar, Pakistan' WHERE slug = 'yusra-ejaz';

-- Hyderabad (2)
UPDATE designers SET location = 'Hyderabad, Pakistan' WHERE slug = 'zainab-yaseen';
UPDATE designers SET location = 'Hyderabad, Pakistan' WHERE slug = 'zakriya';

-- Quetta (1)
UPDATE designers SET location = 'Quetta, Pakistan' WHERE slug = 'maryam-tanveer';

-- Sialkot (1)
UPDATE designers SET location = 'Sialkot, Pakistan' WHERE slug = 'mehar';

-- Additional (4)
UPDATE designers SET location = 'Lahore, Pakistan' WHERE slug = 'noorkhalid';
UPDATE designers SET location = 'Lahore, Pakistan' WHERE slug = 'rida-fatima';
UPDATE designers SET location = 'Karachi, Pakistan' WHERE slug = 'shereen-kibria-siddiqui';
UPDATE designers SET location = 'Lahore, Pakistan' WHERE slug = 'my-brand-1783175924871';

-- ============================================
-- PART 2: STANDARDIZE EXISTING LOCATIONS (24 designers)
-- Normalize to consistent "City, Pakistan" format.
-- ============================================

UPDATE designers SET location = 'Islamabad, Pakistan' WHERE slug = 'abdul-samad';
UPDATE designers SET location = 'Karachi, Pakistan' WHERE slug = 'adina-shafqat';
UPDATE designers SET location = 'Karachi, Pakistan' WHERE slug = 'aleena-moin';
UPDATE designers SET location = 'Lahore, Pakistan' WHERE slug = 'aleena-talha';
UPDATE designers SET location = 'Faisalabad, Pakistan' WHERE slug = 'aleeza-shahid';
UPDATE designers SET location = 'Rawalpindi, Pakistan' WHERE slug = 'aliza-ikramullah';
UPDATE designers SET location = 'Karachi, Pakistan' WHERE slug = 'amna-mahmood';
UPDATE designers SET location = 'Faisalabad, Pakistan' WHERE slug = 'amna-salam';
UPDATE designers SET location = 'Lahore, Pakistan' WHERE slug = 'amna-shams';
UPDATE designers SET location = 'Karachi, Pakistan' WHERE slug = 'amna-tariq';
UPDATE designers SET location = 'Karachi, Pakistan' WHERE slug = 'anoosha-kumari';
UPDATE designers SET location = 'Karachi, Pakistan' WHERE slug = 'anusha-mansoor';
UPDATE designers SET location = 'Faisalabad, Pakistan' WHERE slug = 'faiqa-fatima';
UPDATE designers SET location = 'Karachi, Pakistan' WHERE slug = 'fatima-iftikhar';
UPDATE designers SET location = 'Karachi, Pakistan' WHERE slug = 'hira-baig';
UPDATE designers SET location = 'Lahore, Pakistan' WHERE slug = 'm-shaban-bin-yousaf';
UPDATE designers SET location = 'Islamabad, Pakistan' WHERE slug = 'malaika-tanwir';
UPDATE designers SET location = 'Rawalpindi, Pakistan' WHERE slug = 'maryam-shahid';
UPDATE designers SET location = 'Lahore, Pakistan' WHERE slug = 'qudrat-jan';
UPDATE designers SET location = 'Burewala, Pakistan' WHERE slug = 'raina-sarwar';
UPDATE designers SET location = 'Kech, Pakistan' WHERE slug = 'sangeen-arsalan';
UPDATE designers SET location = 'Lahore, Pakistan' WHERE slug = 'simra-khan';
UPDATE designers SET location = 'Lahore, Pakistan' WHERE slug = 'syeda-a';
UPDATE designers SET location = 'Karachi, Pakistan' WHERE slug = 'zarafshan';
