-- ============================================================
-- Add full content columns to news table
-- Run in Supabase → SQL Editor → New Query
-- ============================================================

alter table news add column if not exists content_vi text;
alter table news add column if not exists content_en text;
