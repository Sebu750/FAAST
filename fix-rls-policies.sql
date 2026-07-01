-- ==========================================
-- FIX RLS POLICIES FOR ADMIN ACCESS
-- ==========================================
-- Run this in Supabase SQL Editor to allow
-- admin dashboard to save designer data
-- ==========================================

-- Drop existing restrictive policies
DROP POLICY IF EXISTS "designers_all_admin" ON designers;
DROP POLICY IF EXISTS "collections_all_admin" ON designer_collections;
DROP POLICY IF EXISTS "education_all_admin" ON designer_education;
DROP POLICY IF EXISTS "achievements_all_admin" ON designer_achievements;
DROP POLICY IF EXISTS "skills_all_admin" ON designer_skills;
DROP POLICY IF EXISTS "certifications_all_admin" ON designer_certifications;
DROP POLICY IF EXISTS "social_links_all_admin" ON designer_social_links;

-- Create permissive policies for admin (anon key access)
CREATE POLICY "designers_all_admin" ON designers FOR ALL USING (true) WITH CHECK (true);
CREATE POLICY "collections_all_admin" ON designer_collections FOR ALL USING (true) WITH CHECK (true);
CREATE POLICY "education_all_admin" ON designer_education FOR ALL USING (true) WITH CHECK (true);
CREATE POLICY "achievements_all_admin" ON designer_achievements FOR ALL USING (true) WITH CHECK (true);
CREATE POLICY "skills_all_admin" ON designer_skills FOR ALL USING (true) WITH CHECK (true);
CREATE POLICY "certifications_all_admin" ON designer_certifications FOR ALL USING (true) WITH CHECK (true);
CREATE POLICY "social_links_all_admin" ON designer_social_links FOR ALL USING (true) WITH CHECK (true);
