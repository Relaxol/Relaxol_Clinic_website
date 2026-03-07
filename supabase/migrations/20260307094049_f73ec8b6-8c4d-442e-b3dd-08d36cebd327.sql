-- Clear spravato content_json so hardcoded fallbacks are used
UPDATE pages 
SET content_json = '{}'::jsonb 
WHERE slug = 'spravato-Englewood' AND status = 'published';

-- Set ketamine template so CMS editor works
UPDATE pages 
SET template = 'ketamine_v1' 
WHERE slug = 'ketamine' AND status = 'published' AND template IS NULL;