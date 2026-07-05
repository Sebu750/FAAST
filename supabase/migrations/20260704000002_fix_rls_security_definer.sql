-- ============================================
-- FIX DESIGNER RLS - SECURITY DEFINER APPROACH
-- ============================================
-- Uses a SECURITY DEFINER function to check
-- designer ownership, bypassing RLS recursion
-- ============================================

-- ============================================
-- 1. DROP ALL EXISTING POLICIES
-- ============================================

-- Designers
DROP POLICY IF EXISTS "designers_select_public" ON designers;
DROP POLICY IF EXISTS "designers_all_admin" ON designers;
DROP POLICY IF EXISTS "designers_select_own" ON designers;
DROP POLICY IF EXISTS "designers_insert_own" ON designers;
DROP POLICY IF EXISTS "designers_update_own" ON designers;

-- Collections
DROP POLICY IF EXISTS "collections_select_public" ON designer_collections;
DROP POLICY IF EXISTS "collections_all_admin" ON designer_collections;
DROP POLICY IF EXISTS "collections_select_own" ON designer_collections;
DROP POLICY IF EXISTS "collections_insert_own" ON designer_collections;
DROP POLICY IF EXISTS "collections_update_own" ON designer_collections;
DROP POLICY IF EXISTS "collections_delete_own" ON designer_collections;

-- Education
DROP POLICY IF EXISTS "education_select_public" ON designer_education;
DROP POLICY IF EXISTS "education_all_admin" ON designer_education;
DROP POLICY IF EXISTS "education_select_own" ON designer_education;
DROP POLICY IF EXISTS "education_insert_own" ON designer_education;
DROP POLICY IF EXISTS "education_update_own" ON designer_education;
DROP POLICY IF EXISTS "education_delete_own" ON designer_education;

-- Achievements
DROP POLICY IF EXISTS "achievements_select_public" ON designer_achievements;
DROP POLICY IF EXISTS "achievements_all_admin" ON designer_achievements;
DROP POLICY IF EXISTS "achievements_select_own" ON designer_achievements;
DROP POLICY IF EXISTS "achievements_insert_own" ON designer_achievements;
DROP POLICY IF EXISTS "achievements_update_own" ON designer_achievements;
DROP POLICY IF EXISTS "achievements_delete_own" ON designer_achievements;

-- Skills
DROP POLICY IF EXISTS "skills_select_public" ON designer_skills;
DROP POLICY IF EXISTS "skills_all_admin" ON designer_skills;
DROP POLICY IF EXISTS "skills_select_own" ON designer_skills;
DROP POLICY IF EXISTS "skills_insert_own" ON designer_skills;
DROP POLICY IF EXISTS "skills_update_own" ON designer_skills;
DROP POLICY IF EXISTS "skills_delete_own" ON designer_skills;

-- Certifications
DROP POLICY IF EXISTS "certifications_select_public" ON designer_certifications;
DROP POLICY IF EXISTS "certifications_all_admin" ON designer_certifications;
DROP POLICY IF EXISTS "certifications_select_own" ON designer_certifications;
DROP POLICY IF EXISTS "certifications_insert_own" ON designer_certifications;
DROP POLICY IF EXISTS "certifications_update_own" ON designer_certifications;
DROP POLICY IF EXISTS "certifications_delete_own" ON designer_certifications;

-- Social Links
DROP POLICY IF EXISTS "social_links_select_public" ON designer_social_links;
DROP POLICY IF EXISTS "social_links_all_admin" ON designer_social_links;
DROP POLICY IF EXISTS "social_links_select_own" ON designer_social_links;
DROP POLICY IF EXISTS "social_links_insert_own" ON designer_social_links;
DROP POLICY IF EXISTS "social_links_update_own" ON designer_social_links;
DROP POLICY IF EXISTS "social_links_delete_own" ON designer_social_links;

-- ============================================
-- 2. CREATE OWNERSHIP CHECK FUNCTION
-- ============================================
-- SECURITY DEFINER runs as table owner, bypassing RLS
-- This avoids RLS recursion when child table policies
-- need to check the designers table

CREATE OR REPLACE FUNCTION public.is_own_designer(check_designer_id UUID)
RETURNS BOOLEAN
LANGUAGE sql
SECURITY DEFINER
STABLE
AS $$
  SELECT EXISTS (
    SELECT 1 FROM designers
    WHERE id = check_designer_id
    AND auth_user_id = auth.uid()::uuid
  )
$$;

-- ============================================
-- 3. DESIGNERS TABLE POLICIES
-- ============================================

-- Public read access for active designers (directory listing)
CREATE POLICY "designers_select_public" ON designers
  FOR SELECT TO anon, authenticated
  USING (is_active = TRUE);

-- Designers can read their own profile (even if not active)
CREATE POLICY "designers_select_own" ON designers
  FOR SELECT TO authenticated
  USING (auth.uid()::uuid = auth_user_id);

CREATE POLICY "designers_insert_own" ON designers
  FOR INSERT TO authenticated
  WITH CHECK (auth.uid()::uuid = auth_user_id);

CREATE POLICY "designers_update_own" ON designers
  FOR UPDATE TO authenticated
  USING (auth.uid()::uuid = auth_user_id)
  WITH CHECK (auth.uid()::uuid = auth_user_id);

-- ============================================
-- 4. COLLECTIONS TABLE POLICIES
-- ============================================

-- Public read for active designers' collections
CREATE POLICY "collections_select_public" ON designer_collections
  FOR SELECT TO anon, authenticated
  USING (designer_id IN (SELECT id FROM designers WHERE is_active = TRUE));

CREATE POLICY "collections_select_own" ON designer_collections
  FOR SELECT TO authenticated
  USING (public.is_own_designer(designer_id));

CREATE POLICY "collections_insert_own" ON designer_collections
  FOR INSERT TO authenticated
  WITH CHECK (public.is_own_designer(designer_id));

CREATE POLICY "collections_update_own" ON designer_collections
  FOR UPDATE TO authenticated
  USING (public.is_own_designer(designer_id))
  WITH CHECK (public.is_own_designer(designer_id));

CREATE POLICY "collections_delete_own" ON designer_collections
  FOR DELETE TO authenticated
  USING (public.is_own_designer(designer_id));

-- ============================================
-- 5. EDUCATION TABLE POLICIES
-- ============================================

CREATE POLICY "education_select_public" ON designer_education
  FOR SELECT TO anon, authenticated
  USING (designer_id IN (SELECT id FROM designers WHERE is_active = TRUE));

CREATE POLICY "education_select_own" ON designer_education
  FOR SELECT TO authenticated
  USING (public.is_own_designer(designer_id));

CREATE POLICY "education_insert_own" ON designer_education
  FOR INSERT TO authenticated
  WITH CHECK (public.is_own_designer(designer_id));

CREATE POLICY "education_update_own" ON designer_education
  FOR UPDATE TO authenticated
  USING (public.is_own_designer(designer_id))
  WITH CHECK (public.is_own_designer(designer_id));

CREATE POLICY "education_delete_own" ON designer_education
  FOR DELETE TO authenticated
  USING (public.is_own_designer(designer_id));

-- ============================================
-- 6. ACHIEVEMENTS TABLE POLICIES
-- ============================================

CREATE POLICY "achievements_select_public" ON designer_achievements
  FOR SELECT TO anon, authenticated
  USING (designer_id IN (SELECT id FROM designers WHERE is_active = TRUE));

CREATE POLICY "achievements_select_own" ON designer_achievements
  FOR SELECT TO authenticated
  USING (public.is_own_designer(designer_id));

CREATE POLICY "achievements_insert_own" ON designer_achievements
  FOR INSERT TO authenticated
  WITH CHECK (public.is_own_designer(designer_id));

CREATE POLICY "achievements_update_own" ON designer_achievements
  FOR UPDATE TO authenticated
  USING (public.is_own_designer(designer_id))
  WITH CHECK (public.is_own_designer(designer_id));

CREATE POLICY "achievements_delete_own" ON designer_achievements
  FOR DELETE TO authenticated
  USING (public.is_own_designer(designer_id));

-- ============================================
-- 7. SKILLS TABLE POLICIES
-- ============================================

CREATE POLICY "skills_select_public" ON designer_skills
  FOR SELECT TO anon, authenticated
  USING (designer_id IN (SELECT id FROM designers WHERE is_active = TRUE));

CREATE POLICY "skills_select_own" ON designer_skills
  FOR SELECT TO authenticated
  USING (public.is_own_designer(designer_id));

CREATE POLICY "skills_insert_own" ON designer_skills
  FOR INSERT TO authenticated
  WITH CHECK (public.is_own_designer(designer_id));

CREATE POLICY "skills_update_own" ON designer_skills
  FOR UPDATE TO authenticated
  USING (public.is_own_designer(designer_id))
  WITH CHECK (public.is_own_designer(designer_id));

CREATE POLICY "skills_delete_own" ON designer_skills
  FOR DELETE TO authenticated
  USING (public.is_own_designer(designer_id));

-- ============================================
-- 8. CERTIFICATIONS TABLE POLICIES
-- ============================================

CREATE POLICY "certifications_select_public" ON designer_certifications
  FOR SELECT TO anon, authenticated
  USING (designer_id IN (SELECT id FROM designers WHERE is_active = TRUE));

CREATE POLICY "certifications_select_own" ON designer_certifications
  FOR SELECT TO authenticated
  USING (public.is_own_designer(designer_id));

CREATE POLICY "certifications_insert_own" ON designer_certifications
  FOR INSERT TO authenticated
  WITH CHECK (public.is_own_designer(designer_id));

CREATE POLICY "certifications_update_own" ON designer_certifications
  FOR UPDATE TO authenticated
  USING (public.is_own_designer(designer_id))
  WITH CHECK (public.is_own_designer(designer_id));

CREATE POLICY "certifications_delete_own" ON designer_certifications
  FOR DELETE TO authenticated
  USING (public.is_own_designer(designer_id));

-- ============================================
-- 9. SOCIAL LINKS TABLE POLICIES
-- ============================================

CREATE POLICY "social_links_select_public" ON designer_social_links
  FOR SELECT TO anon, authenticated
  USING (designer_id IN (SELECT id FROM designers WHERE is_active = TRUE));

CREATE POLICY "social_links_select_own" ON designer_social_links
  FOR SELECT TO authenticated
  USING (public.is_own_designer(designer_id));

CREATE POLICY "social_links_insert_own" ON designer_social_links
  FOR INSERT TO authenticated
  WITH CHECK (public.is_own_designer(designer_id));

CREATE POLICY "social_links_update_own" ON designer_social_links
  FOR UPDATE TO authenticated
  USING (public.is_own_designer(designer_id))
  WITH CHECK (public.is_own_designer(designer_id));

CREATE POLICY "social_links_delete_own" ON designer_social_links
  FOR DELETE TO authenticated
  USING (public.is_own_designer(designer_id));
