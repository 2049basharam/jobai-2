-- JobAI Candidate Platform V2 — Phase 5 Database & Storage Migration
-- Resume Source Documents, Extracted Parsed Artifacts, and Storage RLS

-- 1. Candidate Documents Master Table
CREATE TABLE IF NOT EXISTS public.candidate_documents (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  original_filename TEXT NOT NULL,
  storage_path TEXT NOT NULL UNIQUE,
  mime_type TEXT NOT NULL,
  file_size INT NOT NULL,
  file_hash TEXT DEFAULT '',
  document_type TEXT NOT NULL DEFAULT 'resume',
  processing_status TEXT NOT NULL DEFAULT 'UPLOADED',
  error_code TEXT DEFAULT NULL,
  error_message TEXT DEFAULT NULL,
  is_active BOOLEAN NOT NULL DEFAULT TRUE,
  uploaded_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  processed_at TIMESTAMPTZ DEFAULT NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Indexes for Candidate Documents
CREATE INDEX IF NOT EXISTS idx_candidate_docs_user ON public.candidate_documents(user_id);
CREATE INDEX IF NOT EXISTS idx_candidate_docs_status ON public.candidate_documents(processing_status);

-- Enable RLS for candidate_documents
ALTER TABLE public.candidate_documents ENABLE ROW LEVEL SECURITY;

DO $$ BEGIN
  CREATE POLICY "Users can view own candidate documents"
    ON public.candidate_documents FOR SELECT USING (auth.uid() = user_id);
EXCEPTION WHEN duplicate_object THEN NULL; END $$;

DO $$ BEGIN
  CREATE POLICY "Users can insert own candidate documents"
    ON public.candidate_documents FOR INSERT WITH CHECK (auth.uid() = user_id);
EXCEPTION WHEN duplicate_object THEN NULL; END $$;

DO $$ BEGIN
  CREATE POLICY "Users can update own candidate documents"
    ON public.candidate_documents FOR UPDATE USING (auth.uid() = user_id);
EXCEPTION WHEN duplicate_object THEN NULL; END $$;

DO $$ BEGIN
  CREATE POLICY "Users can delete own candidate documents"
    ON public.candidate_documents FOR DELETE USING (auth.uid() = user_id);
EXCEPTION WHEN duplicate_object THEN NULL; END $$;

-- 2. Parsed Resume Artifacts Table
CREATE TABLE IF NOT EXISTS public.candidate_parsed_artifacts (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  document_id UUID NOT NULL UNIQUE REFERENCES public.candidate_documents(id) ON DELETE CASCADE,
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  raw_text TEXT NOT NULL DEFAULT '',
  structured_data JSONB NOT NULL DEFAULT '{}'::jsonb,
  parser_version TEXT NOT NULL DEFAULT '1.0.0',
  extraction_method TEXT NOT NULL DEFAULT 'deterministic_pdf',
  extracted_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Indexes for Parsed Artifacts
CREATE INDEX IF NOT EXISTS idx_parsed_artifacts_user ON public.candidate_parsed_artifacts(user_id);
CREATE INDEX IF NOT EXISTS idx_parsed_artifacts_doc ON public.candidate_parsed_artifacts(document_id);

-- Enable RLS for candidate_parsed_artifacts
ALTER TABLE public.candidate_parsed_artifacts ENABLE ROW LEVEL SECURITY;

DO $$ BEGIN
  CREATE POLICY "Users can view own parsed artifacts"
    ON public.candidate_parsed_artifacts FOR SELECT USING (auth.uid() = user_id);
EXCEPTION WHEN duplicate_object THEN NULL; END $$;

DO $$ BEGIN
  CREATE POLICY "Users can insert own parsed artifacts"
    ON public.candidate_parsed_artifacts FOR INSERT WITH CHECK (auth.uid() = user_id);
EXCEPTION WHEN duplicate_object THEN NULL; END $$;

DO $$ BEGIN
  CREATE POLICY "Users can update own parsed artifacts"
    ON public.candidate_parsed_artifacts FOR UPDATE USING (auth.uid() = user_id);
EXCEPTION WHEN duplicate_object THEN NULL; END $$;

DO $$ BEGIN
  CREATE POLICY "Users can delete own parsed artifacts"
    ON public.candidate_parsed_artifacts FOR DELETE USING (auth.uid() = user_id);
EXCEPTION WHEN duplicate_object THEN NULL; END $$;

-- 3. Storage Bucket Configuration (candidate-resumes)
INSERT INTO storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
VALUES (
  'candidate-resumes',
  'candidate-resumes',
  false,
  5242880,
  ARRAY['application/pdf', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document', 'text/plain']
)
ON CONFLICT (id) DO NOTHING;

-- Storage Object RLS Policies
DO $$ BEGIN
  CREATE POLICY "Users can upload resumes to own folder"
    ON storage.objects FOR INSERT
    WITH CHECK (
      bucket_id = 'candidate-resumes' AND
      (storage.foldername(name))[1] = auth.uid()::text
    );
EXCEPTION WHEN duplicate_object THEN NULL; END $$;

DO $$ BEGIN
  CREATE POLICY "Users can view own resumes"
    ON storage.objects FOR SELECT
    USING (
      bucket_id = 'candidate-resumes' AND
      (storage.foldername(name))[1] = auth.uid()::text
    );
EXCEPTION WHEN duplicate_object THEN NULL; END $$;

DO $$ BEGIN
  CREATE POLICY "Users can delete own resumes"
    ON storage.objects FOR DELETE
    USING (
      bucket_id = 'candidate-resumes' AND
      (storage.foldername(name))[1] = auth.uid()::text
    );
EXCEPTION WHEN duplicate_object THEN NULL; END $$;
