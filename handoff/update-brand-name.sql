-- =============================================
-- BRAND NAME UPDATE: "Relaxol" → "Jersey Serenity Minds"
-- Run in the Supabase SQL Editor
-- This replaces all occurrences of "Relaxol" in content_json
-- across ALL pages, while preserving URLs and email addresses.
-- =============================================

-- Global replace across ALL pages in content_json
-- This handles every text field in every page at once
UPDATE public.pages
SET content_json = REPLACE(content_json::text, 'Relaxol Clinic', 'Jersey Serenity Minds')::jsonb
WHERE content_json::text LIKE '%Relaxol Clinic%';

UPDATE public.pages
SET content_json = REPLACE(content_json::text, 'Relaxol', 'Jersey Serenity Minds')::jsonb
WHERE content_json::text LIKE '%Relaxol%'
  AND NOT content_json::text LIKE '%relaxolclinic.com%Relaxol%'; 
-- Safety: only run if no ambiguity with URLs

-- In case any rows still have standalone "Relaxol" (not in URLs/emails),
-- do a targeted pass that preserves relaxolclinic.com and info@relaxolclinic
UPDATE public.pages
SET content_json = REPLACE(
  REPLACE(content_json::text, 'Relaxol', 'Jersey Serenity Minds'),
  'Jersey Serenity Mindsclinic.com', 'relaxolclinic.com'
)::jsonb
WHERE content_json::text LIKE '%Relaxol%';

-- Fix any email addresses that got mangled
UPDATE public.pages
SET content_json = REPLACE(content_json::text, 'info@Jersey Serenity Minds', 'info@relaxolclinic')::jsonb
WHERE content_json::text LIKE '%info@Jersey Serenity Minds%';

-- Also update the posts table if blog posts reference the brand
UPDATE public.posts
SET content = REPLACE(content, 'Relaxol Clinic', 'Jersey Serenity Minds')
WHERE content LIKE '%Relaxol Clinic%';

UPDATE public.posts
SET content = REPLACE(
  REPLACE(content, 'Relaxol', 'Jersey Serenity Minds'),
  'Jersey Serenity Mindsclinic.com', 'relaxolclinic.com'
)
WHERE content LIKE '%Relaxol%';

UPDATE public.posts
SET excerpt = REPLACE(excerpt, 'Relaxol Clinic', 'Jersey Serenity Minds')
WHERE excerpt LIKE '%Relaxol Clinic%';

UPDATE public.posts
SET excerpt = REPLACE(
  REPLACE(excerpt, 'Relaxol', 'Jersey Serenity Minds'),
  'Jersey Serenity Mindsclinic.com', 'relaxolclinic.com'
)
WHERE excerpt LIKE '%Relaxol%';

-- Verify: Check for any remaining "Relaxol" references (excluding URLs)
-- SELECT id, slug, substring(content_json::text from 'Relaxol') 
-- FROM public.pages 
-- WHERE content_json::text LIKE '%Relaxol%';
