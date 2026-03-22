-- ============================================================
-- BỘ TỘC TRADING — Supabase Storage Setup
-- Run in Supabase → SQL Editor → New Query
-- ============================================================

-- Create a public "media" bucket for image uploads
insert into storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
values (
  'media',
  'media',
  true,
  5242880,  -- 5MB max per file
  array['image/jpeg','image/jpg','image/png','image/webp','image/gif']
)
on conflict (id) do nothing;

-- Allow anyone to read (view) images
create policy "Public read media"
  on storage.objects for select
  using (bucket_id = 'media');

-- Allow uploads (insert) from frontend
create policy "Allow upload media"
  on storage.objects for insert
  with check (bucket_id = 'media');

-- Allow delete (so admin can clean up)
create policy "Allow delete media"
  on storage.objects for delete
  using (bucket_id = 'media');
