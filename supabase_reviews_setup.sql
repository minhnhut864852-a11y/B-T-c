-- ============================================================
-- BỘ TỘC TRADING — REVIEWS TABLE
-- Run this AFTER supabase_rls_hardening.sql.
-- Idempotent — safe to re-run.
-- ============================================================
-- Image-only reviews (admin uploads screenshots of member feedback).
-- Same draft/published workflow as news/events.
-- ============================================================


-- ── 1. TABLE ─────────────────────────────────────────────────
create table if not exists public.reviews (
  id            uuid primary key default gen_random_uuid(),
  image_url     text not null,
  status        text default 'draft'
                check (status in ('draft', 'published')),
  display_order integer default 0,
  created_at    timestamptz default now()
);

create index if not exists reviews_status_order_idx
  on public.reviews (status, display_order desc, created_at desc);


-- ── 2. RLS ───────────────────────────────────────────────────
alter table public.reviews enable row level security;

drop policy if exists "Public read published reviews" on public.reviews;
drop policy if exists "Admins manage reviews"         on public.reviews;

create policy "Public read published reviews"
  on public.reviews for select
  using ( status = 'published' );

create policy "Admins manage reviews"
  on public.reviews for all
  to authenticated
  using     ( public.is_admin() )
  with check( public.is_admin() );


-- ── 3. SANITY CHECK ──────────────────────────────────────────
-- Should return: reviews, ON, 2 policies
select tablename,
       case when rowsecurity then 'ON' else 'OFF' end as rls,
       (select count(*) from pg_policies
         where schemaname='public' and tablename='reviews') as policy_count
  from pg_tables
 where schemaname='public' and tablename='reviews';
