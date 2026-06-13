# AOST Training University v2
## Deployment Guide

---

## Quick Deploy (GitHub Pages)

```bash
# 1. Unzip and enter
cd aost-training-v2

# 2. Initialize git (or connect to existing repo)
git init
git add .
git commit -m "AOST Training University v2"
git branch -M main
git remote add origin https://github.com/gfbtools/aost-training.git
git push -u origin main

# 3. Build and deploy to GitHub Pages
npm run build
git add dist -f
git commit -m "deploy v2"
git subtree push --prefix dist origin gh-pages
```

Live URL: `https://gfbtools.github.io/aost-training/`

---

## AI Assistant Setup (Cloudflare Worker)

The AI assistant requires a Cloudflare Worker. Deploy in ~5 minutes:

1. Go to **dash.cloudflare.com → Workers & Pages → Create**
2. Click **Create Worker**
3. Replace all code with the contents of `src/workers/aost-ai-worker.js`
4. Click **Save and Deploy**
5. Go to **Settings → Variables**
6. Add encrypted variable: `ANTHROPIC_API_KEY` = your Anthropic API key
7. Copy your Worker URL (e.g., `https://aost-training-ai.YOUR.workers.dev`)

Then set the Worker URL in the project:

Create a `.env` file in the project root:
```
VITE_AI_WORKER_URL=https://aost-training-ai.YOUR.workers.dev
```

Rebuild and redeploy after adding the env var.

---

## Admin Dashboard

The admin dashboard is accessible from the footer of the platform.
Default password: `aost2025` — **change this immediately** in `src/components/AdminDashboard.jsx` line 10.

### Multi-Device Progress Tracking (Supabase)

Currently the admin dashboard shows progress from the current device.
For full team tracking across all devices, connect Supabase:

**1. Create Supabase tables:**

```sql
-- Run in Supabase SQL editor

create table aost_profiles (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  role_id text not null,
  location text,
  experience text,
  device_id text unique,
  created_at timestamptz default now()
);

create table aost_progress (
  id uuid primary key default gen_random_uuid(),
  device_id text references aost_profiles(device_id),
  track_id text,
  module_id text,
  lesson_id text,
  completed_at timestamptz default now(),
  unique(device_id, track_id, module_id, lesson_id)
);

create table aost_quiz_results (
  id uuid primary key default gen_random_uuid(),
  device_id text references aost_profiles(device_id),
  module_id text,
  score integer,
  passed boolean,
  taken_at timestamptz default now()
);

-- Enable RLS
alter table aost_profiles enable row level security;
alter table aost_progress enable row level security;
alter table aost_quiz_results enable row level security;

-- Allow anon read/write (adjust for production security)
create policy "Public read/write" on aost_profiles for all using (true);
create policy "Public read/write" on aost_progress for all using (true);
create policy "Public read/write" on aost_quiz_results for all using (true);
```

**2. Add to .env:**
```
VITE_SUPABASE_URL=https://YOUR-PROJECT.supabase.co
VITE_SUPABASE_ANON_KEY=your-anon-key
```

**3. Rebuild and redeploy.**

---

## Adding Content

All training content lives in two files:

### `src/data/modules.js`
Contains all lessons and their content. To add a lesson:
```js
{
  id: 'fd5',        // unique ID
  title: 'New Module Title',
  duration: '20 min',
  hasQuiz: true,    // set to false if no assessment
  scope: 'aost',   // 'aost' = everyone, 'foundations' = new to field only
  lessons: [
    {
      id: 'fd5-l1',
      title: 'Lesson Title',
      content: [
        H('Section Heading'),
        B('Body paragraph text'),
        C('Callout Label', 'Callout text'),
        L('Bullet one', 'Bullet two', 'Bullet three'),
        PH('📌 Placeholder Label', 'Placeholder description'),
      ]
    }
  ]
}
```

### `src/data/quizzes.js`
Add quiz questions for any module with `hasQuiz: true`.

---

## Content Block Reference

| Function | Usage |
|----------|-------|
| `H(text)` | Section heading |
| `B(text)` | Body paragraph |
| `C(label, text)` | Teal callout box |
| `CG(label, text)` | Gold callout box |
| `CB(label, text)` | Blue callout box |
| `L(...items)` | Bulleted list |
| `ST(...{title,body})` | Numbered standards list |
| `PL(...{name,detail})` | Procedure list |
| `VS(left, right)` | Two-column comparison |
| `VB(...{title,body})` | Value blocks |
| `LV(...{title,subtitle,color,desc})` | Level cards |
| `PH(label, text)` | Placeholder block |

---

## File Structure

```
src/
├── App.jsx                 — Main router
├── main.jsx               — Entry point
├── index.css              — Design system
├── data/
│   ├── roles.js           — Role definitions
│   ├── modules.js         — All curriculum content
│   └── quizzes.js         — All assessment questions
├── hooks/
│   └── useProgress.js     — Progress tracking (localStorage)
├── components/
│   ├── Header.jsx         — Top navigation
│   ├── Registration.jsx   — First-run profile setup
│   ├── RoleDashboard.jsx  — Main learning path view
│   ├── ModuleView.jsx     — Module lesson list
│   ├── LessonView.jsx     — Lesson reading experience
│   ├── ContentBlocks.jsx  — Content type renderers
│   ├── QuizModal.jsx      — Assessment overlay
│   ├── AIAssistant.jsx    — Floating AI chat
│   └── AdminDashboard.jsx — Karen's team progress view
└── workers/
    └── aost-ai-worker.js  — Cloudflare Worker (deploy separately)
```
