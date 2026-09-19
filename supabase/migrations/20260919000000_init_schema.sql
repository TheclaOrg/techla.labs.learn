-- ==============================================================================
-- TECHLA.LABS.LEARN - SCHEMA MIGRATION
-- ==============================================================================

-- 1. PROFILES
create table if not exists public.profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  full_name text,
  avatar_url text,
  created_at timestamptz default now() not null,
  updated_at timestamptz default now() not null
);

-- 2. LEARNING DOMAINS
create table if not exists public.learning_domains (
  id uuid primary key default gen_random_uuid(),
  slug text unique not null,
  name text not null,
  description text,
  status text not null default 'coming_soon',
  created_at timestamptz default now() not null
);

-- 3. TOPICS
create table if not exists public.topics (
  id uuid primary key default gen_random_uuid(),
  domain_id uuid references public.learning_domains(id) on delete cascade,
  parent_id uuid references public.topics(id) on delete set null,
  slug text unique not null,
  title text not null,
  description text,
  category text not null,
  difficulty integer not null default 1,
  estimated_minutes integer not null default 45,
  created_at timestamptz default now() not null
);

-- 4. TOPIC PREREQUISITES (Directed Edges)
create table if not exists public.topic_prerequisites (
  topic_id uuid references public.topics(id) on delete cascade,
  prerequisite_id uuid references public.topics(id) on delete cascade,
  primary key(topic_id, prerequisite_id)
);

-- 5. DIAGNOSTIC QUESTIONS
create table if not exists public.diagnostic_questions (
  id uuid primary key default gen_random_uuid(),
  topic_id uuid references public.topics(id) on delete cascade,
  question text not null,
  type text not null default 'multiple_choice',
  difficulty text not null default 'intermediate',
  options jsonb not null default '[]'::jsonb,
  correct_answer text not null,
  explanation text,
  created_at timestamptz default now() not null
);

-- 6. DIAGNOSTIC ATTEMPTS
create table if not exists public.diagnostic_attempts (
  id uuid primary key default gen_random_uuid(),
  user_id uuid references auth.users(id) on delete cascade not null,
  domain_id uuid references public.learning_domains(id) on delete cascade not null,
  score numeric not null default 0,
  started_at timestamptz default now() not null,
  completed_at timestamptz
);

-- 7. DIAGNOSTIC ANSWERS
create table if not exists public.diagnostic_answers (
  id uuid primary key default gen_random_uuid(),
  attempt_id uuid references public.diagnostic_attempts(id) on delete cascade not null,
  question_id uuid references public.diagnostic_questions(id) on delete cascade not null,
  answer text not null,
  is_correct boolean not null,
  created_at timestamptz default now() not null
);

-- 8. USER TOPIC MASTERY
create table if not exists public.user_topic_mastery (
  id uuid primary key default gen_random_uuid(),
  user_id uuid references auth.users(id) on delete cascade not null,
  topic_id uuid references public.topics(id) on delete cascade not null,
  mastery_level integer not null default 0 check (mastery_level >= 0 and mastery_level <= 5),
  score numeric not null default 0,
  confidence numeric not null default 0.2,
  attempts integer not null default 0,
  last_assessed_at timestamptz default now(),
  updated_at timestamptz default now() not null,
  unique(user_id, topic_id)
);

-- 9. RESOURCES
create table if not exists public.resources (
  id uuid primary key default gen_random_uuid(),
  topic_id uuid references public.topics(id) on delete cascade not null,
  title text not null,
  url text not null,
  provider text not null,
  type text not null,
  is_free boolean not null default true,
  created_at timestamptz default now() not null
);

-- 10. PRACTICE PROBLEMS
create table if not exists public.practice_problems (
  id uuid primary key default gen_random_uuid(),
  topic_id uuid references public.topics(id) on delete cascade not null,
  title text not null,
  slug text not null,
  platform text not null default 'LeetCode',
  url text not null,
  difficulty text not null default 'Easy',
  created_at timestamptz default now() not null
);

-- 11. USER PROBLEM PROGRESS
create table if not exists public.user_problem_progress (
  id uuid primary key default gen_random_uuid(),
  user_id uuid references auth.users(id) on delete cascade not null,
  problem_id uuid references public.practice_problems(id) on delete cascade not null,
  status text not null default 'not_started',
  attempts integer not null default 0,
  solved_at timestamptz,
  unique(user_id, problem_id)
);

-- 12. LEARNING SESSIONS
create table if not exists public.learning_sessions (
  id uuid primary key default gen_random_uuid(),
  user_id uuid references auth.users(id) on delete cascade not null,
  topic_id uuid references public.topics(id) on delete cascade not null,
  started_at timestamptz default now() not null,
  completed_at timestamptz,
  duration_seconds integer default 0
);

-- ==============================================================================
-- ROW LEVEL SECURITY (RLS)
-- ==============================================================================

alter table public.profiles enable row level security;
alter table public.learning_domains enable row level security;
alter table public.topics enable row level security;
alter table public.topic_prerequisites enable row level security;
alter table public.diagnostic_questions enable row level security;
alter table public.diagnostic_attempts enable row level security;
alter table public.diagnostic_answers enable row level security;
alter table public.user_topic_mastery enable row level security;
alter table public.resources enable row level security;
alter table public.practice_problems enable row level security;
alter table public.user_problem_progress enable row level security;
alter table public.learning_sessions enable row level security;

-- Public Curriculum & Resources (Read-only for all)
create policy "Public domains viewable by all" on public.learning_domains for select using (true);
create policy "Public topics viewable by all" on public.topics for select using (true);
create policy "Public prerequisites viewable by all" on public.topic_prerequisites for select using (true);
create policy "Public questions viewable by all" on public.diagnostic_questions for select using (true);
create policy "Public resources viewable by all" on public.resources for select using (true);
create policy "Public practice problems viewable by all" on public.practice_problems for select using (true);

-- User Profiles
create policy "Users can view own profile" on public.profiles for select using (auth.uid() = id);
create policy "Users can update own profile" on public.profiles for update using (auth.uid() = id);
create policy "Users can insert own profile" on public.profiles for insert with check (auth.uid() = id);

-- Diagnostic Attempts & Answers
create policy "Users can view own diagnostic attempts" on public.diagnostic_attempts for select using (auth.uid() = user_id);
create policy "Users can insert own diagnostic attempts" on public.diagnostic_attempts for insert with check (auth.uid() = user_id);
create policy "Users can view own answers" on public.diagnostic_answers for select using (
  exists (select 1 from public.diagnostic_attempts where id = attempt_id and user_id = auth.uid())
);
create policy "Users can insert own answers" on public.diagnostic_answers for insert with check (
  exists (select 1 from public.diagnostic_attempts where id = attempt_id and user_id = auth.uid())
);

-- User Topic Mastery
create policy "Users can view own mastery" on public.user_topic_mastery for select using (auth.uid() = user_id);
create policy "Users can insert/update own mastery" on public.user_topic_mastery for all using (auth.uid() = user_id);

-- User Problem Progress
create policy "Users can view own problem progress" on public.user_problem_progress for select using (auth.uid() = user_id);
create policy "Users can insert/update own problem progress" on public.user_problem_progress for all using (auth.uid() = user_id);

-- Learning Sessions
create policy "Users can view own learning sessions" on public.learning_sessions for select using (auth.uid() = user_id);
create policy "Users can insert own learning sessions" on public.learning_sessions for insert with check (auth.uid() = user_id);
