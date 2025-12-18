-- Add template column to pages table for identifying core page templates
ALTER TABLE public.pages
  ADD COLUMN IF NOT EXISTS template text;

-- Add comment for documentation
COMMENT ON COLUMN public.pages.template IS 'Template identifier for core pages (home_v1, ketamine_v1, spravato_v1, contact_v1, faq_v1). NULL for generic CMS pages.';

-- Create index for efficient template queries
CREATE INDEX IF NOT EXISTS idx_pages_template ON public.pages(template) WHERE template IS NOT NULL;