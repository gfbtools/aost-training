-- ═══════════════════════════════════════════════════════════════════════
-- AOST Training University — Institutional Knowledge Base Schema
-- "The Virtual Karen" — institutional knowledge retrieval system
-- Run this in Supabase SQL Editor
-- ═══════════════════════════════════════════════════════════════════════

-- ─── EXTENSIONS ──────────────────────────────────────────────────────────
create extension if not exists pg_trgm;  -- fuzzy text search

-- ─── KNOWLEDGE CATEGORIES ──────────────────────────────────────────────
-- Maps directly to the 📌 placeholder sections already in the training platform
create table kb_categories (
  id text primary key,
  label text not null,
  description text,
  applies_to_role text,        -- 'front-desk', 'office-manager', 'all', etc. or null = any
  sort_order integer default 0
);

insert into kb_categories (id, label, description, applies_to_role, sort_order) values
  ('scheduling',        'Scheduling & Surgical Calendar',     'Block templates, time allocations, surgeon-specific scheduling rules', 'front-desk', 1),
  ('insurance',         'Insurance & Billing',                'Payer-specific rules, prior auth requirements, coding workflows', 'front-desk', 2),
  ('referrals',         'Referral Network',                   'Referring office protocols, consultation report procedures', 'front-desk', 3),
  ('financial',         'Financial Presentation',             'Fee presentation scripts, CareCredit workflow, financing options', 'treatment-coord', 4),
  ('surgical-setup',    'Surgical Suite & Preference Cards',  'Surgeon preference cards, case-specific room setup', 'surgical-asst', 5),
  ('sedation',          'Sedation Protocols',                 'Monitoring parameters, emergency procedures, crash cart locations', 'surgical-asst', 6),
  ('sterilization',     'Sterilization Equipment',            'Autoclave models, cycle parameters, spore testing schedules', 'sterilization', 7),
  ('hr-policies',       'HR & Personnel',                      'Hiring, onboarding, scheduling policy, leave procedures', 'office-manager', 8),
  ('location-specific', 'Location-Specific Information',      'Facility details, equipment, contacts, layouts per location', 'all', 9),
  ('software-systems',  'Software & Systems',                  'Practice management software workflows, login/access procedures', 'all', 10),
  ('general',           'General Operations',                  'Anything that does not fit a more specific category', 'all', 99);

-- ─── KNOWLEDGE BASE ENTRIES ──────────────────────────────────────────────
-- This is "what Karen knows" — documented, attributed, searchable
create table kb_entries (
  id uuid primary key default gen_random_uuid(),
  category_id text references kb_categories(id) not null,
  location text,                          -- null = applies to all locations; or 'Tampa', 'Land O''Lakes', etc.
  question text not null,                 -- the question this entry answers, in plain language
  answer text not null,                   -- the actual answer/protocol
  keywords text,                          -- additional search terms, comma-separated
  documented_by text not null,            -- who provided this (name or role, e.g. "Karen / Practice Administrator")
  documented_at timestamptz default now(),
  last_reviewed_at timestamptz default now(),
  status text default 'active' check (status in ('active', 'needs_review', 'archived')),
  search_vector tsvector generated always as (
    to_tsvector('english', coalesce(question,'') || ' ' || coalesce(answer,'') || ' ' || coalesce(keywords,''))
  ) stored
);

create index kb_entries_search_idx on kb_entries using gin(search_vector);
create index kb_entries_category_idx on kb_entries(category_id);
create index kb_entries_location_idx on kb_entries(location);

-- ─── UNANSWERED QUESTIONS LOG ────────────────────────────────────────────
-- Every time the AI assistant can't find an answer in kb_entries,
-- the question gets logged here for practice leadership to review and answer.
create table kb_unanswered_log (
  id uuid primary key default gen_random_uuid(),
  question text not null,
  asked_by_name text,
  asked_by_role text,
  asked_by_location text,
  context text,                           -- which training module/track they were in when they asked
  asked_at timestamptz default now(),
  status text default 'pending' check (status in ('pending', 'answered', 'dismissed')),
  resolved_kb_entry_id uuid references kb_entries(id),
  resolved_at timestamptz
);

create index kb_unanswered_status_idx on kb_unanswered_log(status);

-- ─── ROW LEVEL SECURITY ──────────────────────────────────────────────────
alter table kb_categories enable row level security;
alter table kb_entries enable row level security;
alter table kb_unanswered_log enable row level security;

-- Anyone authenticated can READ active knowledge base entries (used by AI worker)
create policy "Anyone can read categories" on kb_categories for select using (true);
create policy "Anyone can read active KB entries" on kb_entries for select using (status = 'active');

-- Anyone can submit to the unanswered log (the AI worker does this on behalf of users)
create policy "Anyone can log unanswered questions" on kb_unanswered_log for insert using (true);

-- Only admins (via service role key) can write/edit KB entries and resolve the log
-- The anon key cannot insert/update/delete kb_entries or kb_unanswered_log (except insert above)
-- Admin operations should use the Supabase service_role key from a secured admin context

-- ─── HELPER VIEW: Knowledge Base Health ──────────────────────────────────
create view kb_health as
select
  c.id as category_id,
  c.label as category_label,
  count(e.id) as entry_count,
  count(e.id) filter (where e.status = 'needs_review') as needs_review_count,
  (select count(*) from kb_unanswered_log u where u.status = 'pending') as pending_questions_total
from kb_categories c
left join kb_entries e on e.category_id = c.id
group by c.id, c.label
order by c.sort_order;
