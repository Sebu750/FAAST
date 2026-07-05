-- ============================================
-- DESIGNER AUTH SYSTEM
-- ============================================
-- Created: 2026-07-04
-- Adds auth_user_id to designers table for Supabase Auth linking
-- Adds status field for approval workflow
-- Adds RLS policies for designer self-service
-- ============================================

-- ============================================
-- 1. ADD COLUMNS TO DESIGNERS TABLE
-- ============================================

-- Ensure id column has UUID default (fix for null id constraint violation)
ALTER TABLE designers ALTER COLUMN id SET DEFAULT gen_random_uuid();

-- Add auth_user_id for linking to Supabase Auth
ALTER TABLE designers 
ADD COLUMN IF NOT EXISTS auth_user_id UUID REFERENCES auth.users(id) ON DELETE SET NULL;

-- Add unique constraint (one auth user per designer profile)
DO $$
BEGIN
  IF NOT EXISTS (SELECT 1 FROM pg_constraint WHERE conname = 'designers_auth_user_id_unique') THEN
    ALTER TABLE designers ADD CONSTRAINT designers_auth_user_id_unique UNIQUE (auth_user_id);
  END IF;
END $$;

-- Add status for approval workflow
ALTER TABLE designers 
ADD COLUMN IF NOT EXISTS status TEXT DEFAULT 'pending' CHECK (status IN ('pending', 'approved', 'rejected'));

-- Create index for auth lookups
CREATE INDEX IF NOT EXISTS idx_designers_auth_user_id ON designers(auth_user_id);
 
-- ============================================
-- 2. UPDATE EXISTING DESIGNERS
-- ============================================
-- Mark existing seed designers as approved (they don't have auth accounts)
UPDATE designers SET status = 'approved' WHERE auth_user_id IS NULL AND status IS NULL;

-- ============================================
-- 3. ROW LEVEL SECURITY - DESIGNER SELF-SERVICE
-- ============================================

-- ============================================
-- DESIGNERS TABLE POLICIES
-- ============================================

-- Designers can SELECT their own profile (even if not active yet)
DROP POLICY IF EXISTS "designers_select_own" ON designers;
CREATE POLICY "designers_select_own" ON designers
  FOR SELECT
  TO authenticated
  USING (auth.uid()::uuid = auth_user_id);

-- Designers can UPDATE their own profile
DROP POLICY IF EXISTS "designers_update_own" ON designers;
CREATE POLICY "designers_update_own" ON designers
  FOR UPDATE
  TO authenticated
  USING (auth.uid()::uuid = auth_user_id)
  WITH CHECK (auth.uid()::uuid = auth_user_id);

-- Designers can INSERT their own profile (during registration)
DROP POLICY IF EXISTS "designers_insert_own" ON designers;
CREATE POLICY "designers_insert_own" ON designers
  FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid()::uuid = auth_user_id);

-- ============================================
-- COLLECTIONS TABLE POLICIES
-- ============================================

-- Designers can SELECT their own collections
DROP POLICY IF EXISTS "collections_select_own" ON designer_collections;
CREATE POLICY "collections_select_own" ON designer_collections
  FOR SELECT
  TO authenticated
  USING (
    designer_id IN (SELECT id FROM designers WHERE auth_user_id = auth.uid()::uuid)
  );

-- Designers can INSERT their own collections
DROP POLICY IF EXISTS "collections_insert_own" ON designer_collections;
CREATE POLICY "collections_insert_own" ON designer_collections
  FOR INSERT
  TO authenticated
  WITH CHECK (
    designer_id IN (SELECT id FROM designers WHERE auth_user_id = auth.uid()::uuid)
  );

-- Designers can UPDATE their own collections
DROP POLICY IF EXISTS "collections_update_own" ON designer_collections;
CREATE POLICY "collections_update_own" ON designer_collections
  FOR UPDATE
  TO authenticated
  USING (
    designer_id IN (SELECT id FROM designers WHERE auth_user_id = auth.uid()::uuid)
  )
  WITH CHECK (
    designer_id IN (SELECT id FROM designers WHERE auth_user_id = auth.uid()::uuid)
  );

-- Designers can DELETE their own collections
DROP POLICY IF EXISTS "collections_delete_own" ON designer_collections;
CREATE POLICY "collections_delete_own" ON designer_collections
  FOR DELETE
  TO authenticated
  USING (
    designer_id IN (SELECT id FROM designers WHERE auth_user_id = auth.uid()::uuid)
  );

-- ============================================
-- EDUCATION TABLE POLICIES
-- ============================================

DROP POLICY IF EXISTS "education_select_own" ON designer_education;
CREATE POLICY "education_select_own" ON designer_education
  FOR SELECT
  TO authenticated
  USING (
    designer_id IN (SELECT id FROM designers WHERE auth_user_id = auth.uid()::uuid)
  );

DROP POLICY IF EXISTS "education_insert_own" ON designer_education;
CREATE POLICY "education_insert_own" ON designer_education
  FOR INSERT
  TO authenticated
  WITH CHECK (
    designer_id IN (SELECT id FROM designers WHERE auth_user_id = auth.uid()::uuid)
  );

DROP POLICY IF EXISTS "education_update_own" ON designer_education;
CREATE POLICY "education_update_own" ON designer_education
  FOR UPDATE
  TO authenticated
  USING (
    designer_id IN (SELECT id FROM designers WHERE auth_user_id = auth.uid()::uuid)
  )
  WITH CHECK (
    designer_id IN (SELECT id FROM designers WHERE auth_user_id = auth.uid()::uuid)
  );

DROP POLICY IF EXISTS "education_delete_own" ON designer_education;
CREATE POLICY "education_delete_own" ON designer_education
  FOR DELETE
  TO authenticated
  USING (
    designer_id IN (SELECT id FROM designers WHERE auth_user_id = auth.uid()::uuid)
  );

-- ============================================
-- ACHIEVEMENTS TABLE POLICIES
-- ============================================

DROP POLICY IF EXISTS "achievements_select_own" ON designer_achievements;
CREATE POLICY "achievements_select_own" ON designer_achievements
  FOR SELECT
  TO authenticated
  USING (
    designer_id IN (SELECT id FROM designers WHERE auth_user_id = auth.uid()::uuid)
  );

DROP POLICY IF EXISTS "achievements_insert_own" ON designer_achievements;
CREATE POLICY "achievements_insert_own" ON designer_achievements
  FOR INSERT
  TO authenticated
  WITH CHECK (
    designer_id IN (SELECT id FROM designers WHERE auth_user_id = auth.uid()::uuid)
  );

DROP POLICY IF EXISTS "achievements_update_own" ON designer_achievements;
CREATE POLICY "achievements_update_own" ON designer_achievements
  FOR UPDATE
  TO authenticated
  USING (
    designer_id IN (SELECT id FROM designers WHERE auth_user_id = auth.uid()::uuid)
  )
  WITH CHECK (
    designer_id IN (SELECT id FROM designers WHERE auth_user_id = auth.uid()::uuid)
  );

DROP POLICY IF EXISTS "achievements_delete_own" ON designer_achievements;
CREATE POLICY "achievements_delete_own" ON designer_achievements
  FOR DELETE
  TO authenticated
  USING (
    designer_id IN (SELECT id FROM designers WHERE auth_user_id = auth.uid()::uuid)
  );

-- ============================================
-- SKILLS TABLE POLICIES
-- ============================================

DROP POLICY IF EXISTS "skills_select_own" ON designer_skills;
CREATE POLICY "skills_select_own" ON designer_skills
  FOR SELECT
  TO authenticated
  USING (
    designer_id IN (SELECT id FROM designers WHERE auth_user_id = auth.uid()::uuid)
  );

DROP POLICY IF EXISTS "skills_insert_own" ON designer_skills;
CREATE POLICY "skills_insert_own" ON designer_skills
  FOR INSERT
  TO authenticated
  WITH CHECK (
    designer_id IN (SELECT id FROM designers WHERE auth_user_id = auth.uid()::uuid)
  );

DROP POLICY IF EXISTS "skills_update_own" ON designer_skills;
CREATE POLICY "skills_update_own" ON designer_skills
  FOR UPDATE
  TO authenticated
  USING (
    designer_id IN (SELECT id FROM designers WHERE auth_user_id = auth.uid()::uuid)
  )
  WITH CHECK (
    designer_id IN (SELECT id FROM designers WHERE auth_user_id = auth.uid()::uuid)
  );

DROP POLICY IF EXISTS "skills_delete_own" ON designer_skills;
CREATE POLICY "skills_delete_own" ON designer_skills
  FOR DELETE
  TO authenticated
  USING (
    designer_id IN (SELECT id FROM designers WHERE auth_user_id = auth.uid()::uuid)
  );

-- ============================================
-- CERTIFICATIONS TABLE POLICIES
-- ============================================

DROP POLICY IF EXISTS "certifications_select_own" ON designer_certifications;
CREATE POLICY "certifications_select_own" ON designer_certifications
  FOR SELECT
  TO authenticated
  USING (
    designer_id IN (SELECT id FROM designers WHERE auth_user_id = auth.uid()::uuid)
  );

DROP POLICY IF EXISTS "certifications_insert_own" ON designer_certifications;
CREATE POLICY "certifications_insert_own" ON designer_certifications
  FOR INSERT
  TO authenticated
  WITH CHECK (
    designer_id IN (SELECT id FROM designers WHERE auth_user_id = auth.uid()::uuid)
  );

DROP POLICY IF EXISTS "certifications_update_own" ON designer_certifications;
CREATE POLICY "certifications_update_own" ON designer_certifications
  FOR UPDATE
  TO authenticated
  USING (
    designer_id IN (SELECT id FROM designers WHERE auth_user_id = auth.uid()::uuid)
  )
  WITH CHECK (
    designer_id IN (SELECT id FROM designers WHERE auth_user_id = auth.uid()::uuid)
  );

DROP POLICY IF EXISTS "certifications_delete_own" ON designer_certifications;
CREATE POLICY "certifications_delete_own" ON designer_certifications
  FOR DELETE
  TO authenticated
  USING (
    designer_id IN (SELECT id FROM designers WHERE auth_user_id = auth.uid()::uuid)
  );

-- ============================================
-- SOCIAL LINKS TABLE POLICIES
-- ============================================

DROP POLICY IF EXISTS "social_links_select_own" ON designer_social_links;
CREATE POLICY "social_links_select_own" ON designer_social_links
  FOR SELECT
  TO authenticated
  USING (
    designer_id IN (SELECT id FROM designers WHERE auth_user_id = auth.uid()::uuid)
  );

DROP POLICY IF EXISTS "social_links_insert_own" ON designer_social_links;
CREATE POLICY "social_links_insert_own" ON designer_social_links
  FOR INSERT
  TO authenticated
  WITH CHECK (
    designer_id IN (SELECT id FROM designers WHERE auth_user_id = auth.uid()::uuid)
  );

DROP POLICY IF EXISTS "social_links_update_own" ON designer_social_links;
CREATE POLICY "social_links_update_own" ON designer_social_links
  FOR UPDATE
  TO authenticated
  USING (
    designer_id IN (SELECT id FROM designers WHERE auth_user_id = auth.uid()::uuid)
  )
  WITH CHECK (
    designer_id IN (SELECT id FROM designers WHERE auth_user_id = auth.uid()::uuid)
  );

DROP POLICY IF EXISTS "social_links_delete_own" ON designer_social_links;
CREATE POLICY "social_links_delete_own" ON designer_social_links
  FOR DELETE
  TO authenticated
  USING (
    designer_id IN (SELECT id FROM designers WHERE auth_user_id = auth.uid()::uuid)
  );

-- ============================================
-- COMMENTS
-- ============================================
COMMENT ON COLUMN designers.auth_user_id IS 'Links to Supabase Auth user ID for designer login';
COMMENT ON COLUMN designers.status IS 'Approval status: pending, approved, or rejected';
