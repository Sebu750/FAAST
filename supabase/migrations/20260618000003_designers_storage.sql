-- ==========================================
-- SUPABASE STORAGE BUCKET FOR DESIGNER IMAGES
-- ==========================================
-- Run this in Supabase SQL Editor to create
-- the storage bucket for designer/collection images
-- ==========================================

-- Create the 'designers' storage bucket
INSERT INTO storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
VALUES ('designers', 'designers', true, 10485760, ARRAY['image/jpeg', 'image/png', 'image/webp', 'image/gif'])
ON CONFLICT (id) DO UPDATE
SET public = true,
    file_size_limit = 10485760,
    allowed_mime_types = ARRAY['image/jpeg', 'image/png', 'image/webp', 'image/gif'];

-- Allow public access to view images
DROP POLICY IF EXISTS "designers_bucket_public_select" ON storage.objects;
CREATE POLICY "designers_bucket_public_select"
ON storage.objects FOR SELECT
USING (bucket_id = 'designers');

-- Allow all users to upload images (admin panel)
DROP POLICY IF EXISTS "designers_bucket_authenticated_insert" ON storage.objects;
CREATE POLICY "designers_bucket_authenticated_insert"
ON storage.objects FOR INSERT
WITH CHECK (bucket_id = 'designers');

-- Allow all users to update images
DROP POLICY IF EXISTS "designers_bucket_authenticated_update" ON storage.objects;
CREATE POLICY "designers_bucket_authenticated_update"
ON storage.objects FOR UPDATE
USING (bucket_id = 'designers');

-- Allow all users to delete images
DROP POLICY IF EXISTS "designers_bucket_authenticated_delete" ON storage.objects;
CREATE POLICY "designers_bucket_authenticated_delete"
ON storage.objects FOR DELETE
USING (bucket_id = 'designers');
