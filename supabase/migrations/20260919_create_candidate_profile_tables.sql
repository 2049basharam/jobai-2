-- JobAI Candidate Platform V2 — Phase 4 Database Migration
-- Authoritative Professional Identity Relational Schema & Row Level Security

-- 1. Candidate Profiles Master Table
CREATE TABLE IF NOT EXISTS public.candidate_profiles (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL UNIQUE REFERENCES auth.users(id) ON DELETE CASCADE,
  full_name TEXT NOT NULL,
  email TEXT NOT NULL,
  professional_summary TEXT DEFAULT '',
  career_goal TEXT DEFAULT 'find_job',
  career_stage TEXT DEFAULT 'professional',
  primary_target_role TEXT DEFAULT '',
  location TEXT DEFAULT '',
  work_mode TEXT DEFAULT 'hybrid',
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Enable RLS for candidate_profiles
ALTER TABLE public.candidate_profiles ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Candidates can view own profile"
  ON public.candidate_profiles FOR SELECT
  USING (auth.uid() = user_id);

CREATE POLICY "Candidates can insert own profile"
  ON public.candidate_profiles FOR INSERT
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Candidates can update own profile"
  ON public.candidate_profiles FOR UPDATE
  USING (auth.uid() = user_id);

CREATE POLICY "Candidates can delete own profile"
  ON public.candidate_profiles FOR DELETE
  USING (auth.uid() = user_id);

-- 2. Candidate Experience Table
CREATE TABLE IF NOT EXISTS public.candidate_experience (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  profile_id UUID NOT NULL REFERENCES public.candidate_profiles(id) ON DELETE CASCADE,
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  company TEXT NOT NULL,
  position TEXT NOT NULL,
  location TEXT DEFAULT '',
  start_date TEXT NOT NULL,
  end_date TEXT DEFAULT '',
  is_current BOOLEAN DEFAULT FALSE,
  description TEXT DEFAULT '',
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

ALTER TABLE public.candidate_experience ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Candidates can view own experience"
  ON public.candidate_experience FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Candidates can insert own experience"
  ON public.candidate_experience FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Candidates can update own experience"
  ON public.candidate_experience FOR UPDATE USING (auth.uid() = user_id);
CREATE POLICY "Candidates can delete own experience"
  ON public.candidate_experience FOR DELETE USING (auth.uid() = user_id);

-- 3. Candidate Education Table
CREATE TABLE IF NOT EXISTS public.candidate_education (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  profile_id UUID NOT NULL REFERENCES public.candidate_profiles(id) ON DELETE CASCADE,
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  institution TEXT NOT NULL,
  degree TEXT NOT NULL,
  field_of_study TEXT DEFAULT '',
  start_date TEXT DEFAULT '',
  end_date TEXT DEFAULT '',
  is_current BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

ALTER TABLE public.candidate_education ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Candidates can view own education"
  ON public.candidate_education FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Candidates can insert own education"
  ON public.candidate_education FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Candidates can update own education"
  ON public.candidate_education FOR UPDATE USING (auth.uid() = user_id);
CREATE POLICY "Candidates can delete own education"
  ON public.candidate_education FOR DELETE USING (auth.uid() = user_id);

-- 4. Candidate Projects Table
CREATE TABLE IF NOT EXISTS public.candidate_projects (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  profile_id UUID NOT NULL REFERENCES public.candidate_profiles(id) ON DELETE CASCADE,
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  title TEXT NOT NULL,
  description TEXT DEFAULT '',
  role TEXT DEFAULT '',
  project_url TEXT DEFAULT '',
  github_url TEXT DEFAULT '',
  technologies TEXT[] DEFAULT '{}',
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

ALTER TABLE public.candidate_projects ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Candidates can view own projects"
  ON public.candidate_projects FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Candidates can insert own projects"
  ON public.candidate_projects FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Candidates can update own projects"
  ON public.candidate_projects FOR UPDATE USING (auth.uid() = user_id);
CREATE POLICY "Candidates can delete own projects"
  ON public.candidate_projects FOR DELETE USING (auth.uid() = user_id);

-- 5. Candidate Certifications Table
CREATE TABLE IF NOT EXISTS public.candidate_certifications (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  profile_id UUID NOT NULL REFERENCES public.candidate_profiles(id) ON DELETE CASCADE,
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  name TEXT NOT NULL,
  issuing_organization TEXT NOT NULL,
  issue_date TEXT DEFAULT '',
  expiry_date TEXT DEFAULT '',
  credential_id TEXT DEFAULT '',
  credential_url TEXT DEFAULT '',
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

ALTER TABLE public.candidate_certifications ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Candidates can view own certifications"
  ON public.candidate_certifications FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Candidates can insert own certifications"
  ON public.candidate_certifications FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Candidates can update own certifications"
  ON public.candidate_certifications FOR UPDATE USING (auth.uid() = user_id);
CREATE POLICY "Candidates can delete own certifications"
  ON public.candidate_certifications FOR DELETE USING (auth.uid() = user_id);

-- 6. Candidate Links Table
CREATE TABLE IF NOT EXISTS public.candidate_links (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  profile_id UUID NOT NULL REFERENCES public.candidate_profiles(id) ON DELETE CASCADE,
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  label TEXT NOT NULL,
  url TEXT NOT NULL,
  type TEXT DEFAULT 'custom',
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

ALTER TABLE public.candidate_links ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Candidates can view own links"
  ON public.candidate_links FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Candidates can insert own links"
  ON public.candidate_links FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Candidates can update own links"
  ON public.candidate_links FOR UPDATE USING (auth.uid() = user_id);
CREATE POLICY "Candidates can delete own links"
  ON public.candidate_links FOR DELETE USING (auth.uid() = user_id);
