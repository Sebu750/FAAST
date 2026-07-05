-- ============================================
-- FIX DESIGNER RLS POLICIES
-- ============================================
-- Drops old admin policies and creates clean
-- designer self-service policies for all tables
-- ============================================

-- ============================================
-- 1. DROP OLD ADMIN POLICIES
-- ============================================

-- Designers
DROP POLICY IF EXISTS "designers_select_public" ON designers;
DROP POLICY IF EXISTS "designers_all_admin" ON designers;

-- Collections
DROP POLICY IF EXISTS "collections_select_public" ON designer_collections;
DROP POLICY IF EXISTS "collections_all_admin" ON designer_collections;

-- Education
DROP POLICY IF EXISTS "education_select_public" ON designer_education;
DROP POLICY IF EXISTS "education_all_admin" ON designer_education;

-- Achievements
DROP POLICY IF EXISTS "achievements_select_public" ON designer_achievements;
DROP POLICY IF EXISTS "achievements_all_admin" ON designer_achievements;

-- Skills
DROP POLICY IF EXISTS "skills_select_public" ON designer_skills;
DROP POLICY IF EXISTS "skills_all_admin" ON designer_skills;

-- Certifications
DROP POLICY IF EXISTS "certifications_select_public" ON designer_certifications;
DROP POLICY IF EXISTS "certifications_all_admin" ON designer_certifications;

-- Social Links
DROP POLICY IF EXISTS "social_links_select_public" ON designer_social_links;
DROP POLICY IF EXISTS "social_links_all_admin" ON designer_social_links;

-- ============================================
-- 2. DESIGNERS TABLE - Designer Self-Service
-- ============================================

DROP POLICY IF EXISTS "designers_select_own" ON designers;
DROP POLICY IF EXISTS "designers_insert_own" ON designers;
DROP POLICY IF EXISTS "designers_update_own" ON designers;

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
-- 3. COLLECTIONS TABLE
-- ============================================

DROP POLICY IF EXISTS "collections_select_own" ON designer_collections;
DROP POLICY IF EXISTS "collections_insert_own" ON designer_collections;
DROP POLICY IF EXISTS "collections_update_own" ON designer_collections;
DROP POLICY IF EXISTS "collections_delete_own" ON designer_collections;

CREATE POLICY "collections_select_own" ON designer_collections
  FOR SELECT TO authenticated
  USING (designer_id IN (SELECT id FROM designers WHERE auth_user_id = auth.uid()::uuid));

CREATE POLICY "collections_insert_own" ON designer_collections
  FOR INSERT TO authenticated
  WITH CHECK (designer_id IN (SELECT id FROM designers WHERE auth_user_id = auth.uid()::uuid));

CREATE POLICY "collections_update_own" ON designer_collections
  FOR UPDATE TO authenticated
  USING (designer_id IN (SELECT id FROM designers WHERE auth_user_id = auth.uid()::uuid))
  WITH CHECK (designer_id IN (SELECT id FROM designers WHERE auth_user_id = auth.uid()::uuid));

CREATE POLICY "collections_delete_own" ON designer_collections
  FOR DELETE TO authenticated
  USING (designer_id IN (SELECT id FROM designers WHERE auth_user_id = auth.uid()::uuid));

-- ============================================
-- 4. EDUCATION TABLE
-- ============================================

DROP POLICY IF EXISTS "education_select_own" ON designer_education;
DROP POLICY IF EXISTS "education_insert_own" ON designer_education;
DROP POLICY IF EXISTS "education_update_own" ON designer_education;
DROP POLICY IF EXISTS "education_delete_own" ON designer_education;

CREATE POLICY "education_select_own" ON designer_education
  FOR SELECT TO authenticated
  USING (designer_id IN (SELECT id FROM designers WHERE auth_user_id = auth.uid()::uuid));

CREATE POLICY "education_insert_own" ON designer_education
  FOR INSERT TO authenticated
  WITH CHECK (designer_id IN (SELECT id FROM designers WHERE auth_user_id = auth.uid()::uuid));

CREATE POLICY "education_update_own" ON designer_education
  FOR UPDATE TO authenticated
  USING (designer_id IN (SELECT id FROM designers WHERE auth_user_id = auth.uid()::uuid))
  WITH CHECK (designer_id IN (SELECT id FROM designers WHERE auth_user_id = auth.uid()::uuid));

CREATE POLICY "education_delete_own" ON designer_education
  FOR DELETE TO authenticated
  USING (designer_id IN (SELECT id FROM designers WHERE auth_user_id = auth.uid()::uuid));

-- ============================================
-- 5. ACHIEVEMENTS TABLE
-- ============================================

DROP POLICY IF EXISTS "achievements_select_own" ON designer_achievements;
DROP POLICY IF EXISTS "achievements_insert_own" ON designer_achievements;
DROP POLICY IF EXISTS "achievements_update_own" ON designer_achievements;
DROP POLICY IF EXISTS "achievements_delete_own" ON designer_achievements;

CREATE POLICY "achievements_select_own" ON designer_achievements
  FOR SELECT TO authenticated
  USING (designer_id IN (SELECT id FROM designers WHERE auth_user_id = auth.uid()::uuid));

CREATE POLICY "achievements_insert_own" ON designer_achievements
  FOR INSERT TO authenticated
  WITH CHECK (designer_id IN (SELECT id FROM designers WHERE auth_user_id = auth.uid()::uuid));

CREATE POLICY "achievements_update_own" ON designer_achievements
  FOR UPDATE TO authenticated
  USING (designer_id IN (SELECT id FROM designers WHERE auth_user_id = auth.uid()::uuid))
  WITH CHECK (designer_id IN (SELECT id FROM designers WHERE auth_user_id = auth.uid()::uuid));

CREATE POLICY "achievements_delete_own" ON designer_achievements
  FOR DELETE TO authenticated
  USING (designer_id IN (SELECT id FROM designers WHERE auth_user_id = auth.uid()::uuid));

-- ============================================
-- 6. SKILLS TABLE
-- ============================================

DROP POLICY IF EXISTS "skills_select_own" ON designer_skills;
DROP POLICY IF EXISTS "skills_insert_own" ON designer_skills;
DROP POLICY IF EXISTS "skills_update_own" ON designer_skills;
DROP POLICY IF EXISTS "skills_delete_own" ON designer_skills;

CREATE POLICY "skills_select_own" ON designer_skills
  FOR SELECT TO authenticated
  USING (designer_id IN (SELECT id FROM designers WHERE auth_user_id = auth.uid()::uuid));

CREATE POLICY "skills_insert_own" ON designer_skills
  FOR INSERT TO authenticated
  WITH CHECK (designer_id IN (SELECT id FROM designers WHERE auth_user_id = auth.uid()::uuid));

CREATE POLICY "skills_update_own" ON designer_skills
  FOR UPDATE TO authenticated
  USING (designer_id IN (SELECT id FROM designers WHERE auth_user_id = auth.uid()::uuid))
  WITH CHECK (designer_id IN (SELECT id FROM designers WHERE auth_user_id = auth.uid()::uuid));

CREATE POLICY "skills_delete_own" ON designer_skills
  FOR DELETE TO authenticated
  USING (designer_id IN (SELECT id FROM designers WHERE auth_user_id = auth.uid()::uuid));

-- ============================================
-- 7. CERTIFICATIONS TABLE
-- ============================================

DROP POLICY IF EXISTS "certifications_select_own" ON designer_certifications;
DROP POLICY IF EXISTS "certifications_insert_own" ON designer_certifications;
DROP POLICY IF EXISTS "certifications_update_own" ON designer_certifications;
DROP POLICY IF EXISTS "certifications_delete_own" ON designer_certifications;

CREATE POLICY "certifications_select_own" ON designer_certifications
  FOR SELECT TO authenticated
  USING (designer_id IN (SELECT id FROM designers WHERE auth_user_id = auth.uid()::uuid));

CREATE POLICY "certifications_insert_own" ON designer_certifications
  FOR INSERT TO authenticated
  WITH CHECK (designer_id IN (SELECT id FROM designers WHERE auth_user_id = auth.uid()::uuid));

CREATE POLICY "certifications_update_own" ON designer_certifications
  FOR UPDATE TO authenticated
  USING (designer_id IN (SELECT id FROM designers WHERE auth_user_id = auth.uid()::uuid))
  WITH CHECK (designer_id IN (SELECT id FROM designers WHERE auth_user_id = auth.uid()::uuid));

CREATE POLICY "certifications_delete_own" ON designer_certifications
  FOR DELETE TO authenticated
  USING (designer_id IN (SELECT id FROM designers WHERE auth_user_id = auth.uid()::uuid));

-- ============================================
-- 8. SOCIAL LINKS TABLE
-- ============================================

DROP POLICY IF EXISTS "social_links_select_own" ON designer_social_links;
DROP POLICY IF EXISTS "social_links_insert_own" ON designer_social_links;
DROP POLICY IF EXISTS "social_links_update_own" ON designer_social_links;
DROP POLICY IF EXISTS "social_links_delete_own" ON designer_social_links;

CREATE POLICY "social_links_select_own" ON designer_social_links
  FOR SELECT TO authenticated
  USING (designer_id IN (SELECT id FROM designers WHERE auth_user_id = auth.uid()::uuid));

CREATE POLICY "social_links_insert_own" ON designer_social_links
  FOR INSERT TO authenticated
  WITH CHECK (designer_id IN (SELECT id FROM designers WHERE auth_user_id = auth.uid()::uuid));

CREATE POLICY "social_links_update_own" ON designer_social_links
  FOR UPDATE TO authenticated
  USING (designer_id IN (SELECT id FROM designers WHERE auth_user_id = auth.uid()::uuid))
  WITH CHECK (designer_id IN (SELECT id FROM designers WHERE auth_user_id = auth.uid()::uuid));

CREATE POLICY "social_links_delete_own" ON designer_social_links
  FOR DELETE TO authenticated
  USING (designer_id IN (SELECT id FROM designers WHERE auth_user_id = auth.uid()::uuid));
