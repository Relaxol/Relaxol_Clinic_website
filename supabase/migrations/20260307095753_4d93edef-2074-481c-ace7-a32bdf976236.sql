
-- Form submissions table for contact and insurance verification forms
CREATE TABLE public.form_submissions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  tenant_id UUID NOT NULL REFERENCES public.tenants(id) ON DELETE CASCADE,
  form_type TEXT NOT NULL CHECK (form_type IN ('contact', 'insurance_verification')),
  data JSONB NOT NULL DEFAULT '{}'::jsonb,
  status TEXT NOT NULL DEFAULT 'new' CHECK (status IN ('new', 'reviewed', 'contacted', 'archived')),
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- Enable RLS
ALTER TABLE public.form_submissions ENABLE ROW LEVEL SECURITY;

-- Anyone can submit forms (no auth required)
CREATE POLICY "Anyone can insert form submissions"
  ON public.form_submissions
  FOR INSERT
  TO anon, authenticated
  WITH CHECK (true);

-- Only team members can view submissions
CREATE POLICY "Members can view form submissions"
  ON public.form_submissions
  FOR SELECT
  TO authenticated
  USING (is_tenant_member(auth.uid(), tenant_id));

-- Editors can update submission status
CREATE POLICY "Editors can update form submissions"
  ON public.form_submissions
  FOR UPDATE
  TO authenticated
  USING (can_edit_tenant(auth.uid(), tenant_id));

-- Admins can delete submissions
CREATE POLICY "Admins can delete form submissions"
  ON public.form_submissions
  FOR DELETE
  TO authenticated
  USING (is_tenant_admin(auth.uid(), tenant_id));
