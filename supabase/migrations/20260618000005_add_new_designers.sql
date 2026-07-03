-- Ensure uuid generation is available
CREATE EXTENSION IF NOT EXISTS pgcrypto;

-- Insert new designer profiles
INSERT INTO designers (id, slug, name, brand, location, is_active, is_featured) VALUES
  (gen_random_uuid(), 'maryam-shahid', 'Maryam Shahid', 'Maryam Shahid', 'Rawalpindi', true, false),
  (gen_random_uuid(), 'amna-shams', 'Amna Shams', 'Amna Shams', 'Lahore', true, false),
  (gen_random_uuid(), 'malaika-tanwir', 'Malaika Tanwir', 'Malaika Tanwir', 'Islamabad', true, false),
  (gen_random_uuid(), 'm-shaban-bin-yousaf', 'M. Shaban Bin Yousaf', 'M. Shaban Bin Yousaf', 'Lahore', true, false),
  (gen_random_uuid(), 'aliza-ikramullah', 'Aliza Ikramullah', 'Aliza Ikramullah', 'Rawalpindi', true, false),
  (gen_random_uuid(), 'syeda-a', 'Syeda A', 'Syeda A', 'Lahore, Punjab', true, false),
  (gen_random_uuid(), 'aleeza-shahid', 'Aleeza Shahid', 'Aleeza Shahid', 'Faisalabad', true, false),
  (gen_random_uuid(), 'adina-shafqat', 'Adina Shafqat', 'Adina Shafqat', 'Karachi, Sindh', true, false),
  (gen_random_uuid(), 'hira-baig', 'Hira Baig', 'Hira Baig', 'Karachi, Pakistan', true, false),
  (gen_random_uuid(), 'sangeen-arsalan', 'Sangeen Arsalan', 'Sangeen Arsalan', 'Kech, Balochistan', true, false),
  (gen_random_uuid(), 'abdul-samad', 'Abdul Samad', 'Abdul Samad', 'Islamabad', true, false),
  (gen_random_uuid(), 'faiqa-fatima', 'Faiqa Fatima', 'Faiqa Fatima', 'Faisalabad, Punjab', true, false),
  (gen_random_uuid(), 'raina-sarwar', 'Raina Sarwar', 'Raina Sarwar', 'Burewala, Punjab', true, false),
  (gen_random_uuid(), 'fatima-iftikhar', 'Fatima Iftikhar', 'Fatima Iftikhar', 'Karachi', true, false)
ON CONFLICT (slug) DO NOTHING;
