-- ============================================================
-- BỘ TỘC TRADING — Supabase Table Setup
-- Run this in Supabase → SQL Editor → New Query
-- ============================================================

-- 1. EVENTS TABLE
create table if not exists events (
  id            uuid        default gen_random_uuid() primary key,
  created_at    timestamptz default now(),
  title         text        not null,
  description   text,
  event_date    date,
  event_time    text,
  location      text,
  event_type    text        default 'live',  -- 'live', 'workshop', 'ama', 'other'
  cover_image   text,
  status        text        default 'draft', -- 'draft', 'published'
  register_link text
);

-- 2. NEWS TABLE
create table if not exists news (
  id             uuid        default gen_random_uuid() primary key,
  created_at     timestamptz default now(),
  title_vi       text        not null,
  title_en       text,
  excerpt_vi     text,
  excerpt_en     text,
  tag            text        default 'Phân Tích',
  cover_image    text,
  published_date date        default current_date,
  status         text        default 'draft', -- 'draft', 'published'
  read_link      text
);

-- 3. Enable public read access for published events & news
-- (so the main website can load them without login)

-- Allow anyone to read published events
create policy "Public read published events"
  on events for select
  using (status = 'published');

-- Allow anyone to read published news
create policy "Public read published news"
  on news for select
  using (status = 'published');

-- Enable RLS on both tables
alter table events enable row level security;
alter table news    enable row level security;

-- NOTE: For now the admin panel writes directly using the service key.
-- In production, add authenticated write policies here.
