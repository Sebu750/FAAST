-- ==========================================
-- SUPABASE STORAGE BUCKET FOR DESIGNER IMAGES
-- ==========================================
-- Run this in Supabase SQL Editor to create
-- the storage bucket for collection images
-- ==========================================

-- Create the 'designers' storage bucket
INSERT INTO storage.buckets (id, name, public)
VALUES ('designers', 'designers', true)
ON CONFLICT (id) DO NOTHING;

-- Allow public access to view images
CREATE POLICY "designers_bucket_public_select"
ON storage.objects FOR SELECT
USING (bucket_id = 'designers');

-- Allow authenticated users to upload images
CREATE POLICY "designers_bucket_authenticated_insert"
ON storage.objects FOR INSERT
WITH CHECK (bucket_id = 'designers');

-- Allow authenticated users to update images
CREATE POLICY "designers_bucket_authenticated_update"
ON storage.objects FOR UPDATE
USING (bucket_id = 'designers');

-- Allow authenticated users to delete images
CREATE POLICY "designers_bucket_authenticated_delete"
ON storage.objects FOR DELETE
USING (bucket_id = 'designers');
