-- ============================================================
-- BỘ TỘC TRADING — Create First Admin Account
-- Run this in Supabase → SQL Editor → New Query
-- Replace the email and password with your own!
-- ============================================================

-- Create your first admin user directly (bypasses email confirmation)
SELECT supabase_auth.create_user(
  email    := 'admin@botoctrading.com',   -- ← CHANGE THIS
  password := 'YourStrongPassword123!',   -- ← CHANGE THIS (min 6 chars)
  email_confirmed := true
);

-- ============================================================
-- AFTER RUNNING: Go to admin.html and log in with the
-- email + password you set above.
--
-- To add MORE admins later:
-- Supabase Dashboard → Authentication → Users → Invite User
-- ============================================================
