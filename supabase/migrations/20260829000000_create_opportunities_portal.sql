-- ==============================================================================
-- Schema Migration: Internship & Hackathon Registration Portal
-- Created: 2026-08-29
-- ==============================================================================

-- 1. Create updated_at trigger helper function
CREATE OR REPLACE FUNCTION public.handle_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- 2. Table: opportunities
CREATE TABLE IF NOT EXISTS public.opportunities (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title TEXT NOT NULL,
  type TEXT NOT NULL CHECK (type IN ('internship', 'hackathon')),
  description TEXT NOT NULL,
  eligibility TEXT NOT NULL,
  benefits TEXT NOT NULL,
  application_deadline TIMESTAMPTZ NOT NULL,
  is_active BOOLEAN NOT NULL DEFAULT true,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- Trigger for opportunities.updated_at
DROP TRIGGER IF EXISTS set_opportunities_updated_at ON public.opportunities;
CREATE TRIGGER set_opportunities_updated_at
  BEFORE UPDATE ON public.opportunities
  FOR EACH ROW
  EXECUTE FUNCTION public.handle_updated_at();

-- 3. Table: opportunity_fields (Dynamic custom questions)
CREATE TABLE IF NOT EXISTS public.opportunity_fields (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  opportunity_id UUID NOT NULL REFERENCES public.opportunities(id) ON DELETE CASCADE,
  label TEXT NOT NULL,
  field_key TEXT NOT NULL,
  type TEXT NOT NULL CHECK (type IN ('text', 'textarea', 'number', 'select', 'multi-select', 'checkbox', 'url', 'date')),
  required BOOLEAN NOT NULL DEFAULT false,
  options JSONB DEFAULT '[]'::jsonb,
  display_order INTEGER NOT NULL DEFAULT 0,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  CONSTRAINT unique_opp_field_key UNIQUE (opportunity_id, field_key)
);

-- 4. Table: applications
CREATE TABLE IF NOT EXISTS public.applications (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  opportunity_id UUID NOT NULL REFERENCES public.opportunities(id) ON DELETE RESTRICT,
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  phone TEXT NOT NULL,
  college_university TEXT NOT NULL,
  degree TEXT NOT NULL,
  branch TEXT NOT NULL,
  current_year TEXT NOT NULL,
  current_semester TEXT,
  cgpa_cpi NUMERIC(4, 2) NOT NULL,
  linkedin_url TEXT,
  github_url TEXT,
  portfolio_url TEXT,
  skills JSONB NOT NULL DEFAULT '[]'::jsonb,
  status TEXT NOT NULL DEFAULT 'submitted' CHECK (status IN ('submitted', 'under_review', 'shortlisted', 'selected', 'rejected')),
  custom_answers JSONB NOT NULL DEFAULT '{}'::jsonb,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  CONSTRAINT unique_application_per_opportunity UNIQUE (opportunity_id, email)
);

-- Trigger for applications.updated_at
DROP TRIGGER IF EXISTS set_applications_updated_at ON public.applications;
CREATE TRIGGER set_applications_updated_at
  BEFORE UPDATE ON public.applications
  FOR EACH ROW
  EXECUTE FUNCTION public.handle_updated_at();

-- 5. Performance & Query Indexes
CREATE INDEX IF NOT EXISTS idx_opportunities_type ON public.opportunities(type);
CREATE INDEX IF NOT EXISTS idx_opportunities_is_active ON public.opportunities(is_active);
CREATE INDEX IF NOT EXISTS idx_opportunities_deadline ON public.opportunities(application_deadline);

CREATE INDEX IF NOT EXISTS idx_opportunity_fields_opp_order ON public.opportunity_fields(opportunity_id, display_order);

CREATE INDEX IF NOT EXISTS idx_applications_opportunity_id ON public.applications(opportunity_id);
CREATE INDEX IF NOT EXISTS idx_applications_email ON public.applications(email);
CREATE INDEX IF NOT EXISTS idx_applications_status ON public.applications(status);

-- 6. Row Level Security (RLS) Configuration
ALTER TABLE public.opportunities ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.opportunity_fields ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.applications ENABLE ROW LEVEL SECURITY;

-- Opportunities Policies:
-- Public can view active opportunities
CREATE POLICY "Public can view active opportunities"
  ON public.opportunities
  FOR SELECT
  TO public
  USING (is_active = true);

-- Opportunity Fields Policies:
-- Public can view fields for active opportunities
CREATE POLICY "Public can view fields for active opportunities"
  ON public.opportunity_fields
  FOR SELECT
  TO public
  USING (
    EXISTS (
      SELECT 1 FROM public.opportunities o
      WHERE o.id = opportunity_fields.opportunity_id AND o.is_active = true
    )
  );

-- Applications Policies:
-- Applications are sensitive: Public users cannot read applications
-- Public users can insert applications (or insertion is managed by secure server handlers)
CREATE POLICY "Public can submit applications"
  ON public.applications
  FOR INSERT
  TO public
  WITH CHECK (
    EXISTS (
      SELECT 1 FROM public.opportunities o
      WHERE o.id = applications.opportunity_id
        AND o.is_active = true
        AND o.application_deadline > now()
    )
  );

-- Service role / Admin has full access (bypasses RLS by default or explicit policy)
