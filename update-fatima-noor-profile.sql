-- ==========================================
-- ENHANCE FATIMA NOOR PROFILE
-- ==========================================
-- Run this in Supabase SQL Editor to update
-- Fatima Noor's profile with image and more details
-- ==========================================

-- Update profile with image URL and enhanced bio
UPDATE designers
SET 
  image_url = 'https://placeholder.com/400x400?text=Fatima+Noor',
  cover_image_url = 'https://placeholder.com/1920x800?text=Cover',
  bio = 'Fatima Noor is an Islamabad-based designer specializing in luxury formal wear and evening gowns. With a keen eye for detail and a passion for sophisticated silhouettes, Fatima creates pieces that embody elegance and modern femininity. Her work is characterized by clean lines, luxurious fabrics, and subtle embellishments. Each collection tells a story of refined craftsmanship and timeless beauty, designed for the contemporary woman who values understated luxury.',
  short_bio = 'Islamabad-based luxury formal wear designer creating elegant evening gowns and sophisticated silhouettes for the modern woman.',
  philosophy = 'True luxury lies in restraint. I design for women who understand that elegance is not about being noticed—it is about being remembered.',
  experience = '6 years',
  availability = 'Accepting custom orders',
  updated_at = NOW()
WHERE id = 'd3-fatima-noor-003';

-- Add more achievements
INSERT INTO designer_achievements (id, designer_id, title, detail, created_at)
VALUES 
('a4-fatima-2', 'd3-fatima-noor-003', 'Islamabad Fashion Week', 'Featured designer at Islamabad Fashion Week 2024', NOW()),
('a4-fatima-3', 'd3-fatima-noor-003', 'Lux Style Awards', 'Nominated for Best Formal Wear Designer 2024', NOW())
ON CONFLICT (id) DO NOTHING;

-- Add more skills
INSERT INTO designer_skills (id, designer_id, skill, created_at)
VALUES 
('s8-fatima-3', 'd3-fatima-noor-003', 'Luxury Fabric Selection', NOW()),
('s8-fatima-4', 'd3-fatima-noor-003', 'Beadwork & Embellishment', NOW()),
('s8-fatima-5', 'd3-fatima-noor-003', 'Pattern Drafting', NOW()),
('s8-fatima-6', 'd3-fatima-noor-003', 'Draping Techniques', NOW())
ON CONFLICT (id) DO NOTHING;
