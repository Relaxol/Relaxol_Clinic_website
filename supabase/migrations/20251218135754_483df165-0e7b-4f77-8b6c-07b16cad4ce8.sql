-- Add content_json column to pages table for template-based content
ALTER TABLE public.pages 
ADD COLUMN IF NOT EXISTS content_json jsonb DEFAULT '{}'::jsonb;