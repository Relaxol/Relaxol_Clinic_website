-- Seed CMS pages - using 'page' type which should be valid
INSERT INTO pages (tenant_id, slug, title, status, published_at, type, hero_headline, seo_title, sections_json)
VALUES 
('11111111-1111-1111-1111-111111111111', 'home', 'Home', 'published', now(), 'page', 
 'New Jersey''s Premier Ketamine & SPRAVATO® Clinic',
 'Relaxol Clinic - Ketamine & SPRAVATO®',
 '[{"sectionId":"hero-001","type":"hero","subtitle":"FIND HOPE TODAY","headline":"New Jersey Premier Clinic","body":"Advanced treatments for depression.","cta":{"label":"Book Consultation","href":"#contact"}},{"sectionId":"contact-001","type":"contact","subtitle":"CONTACT","title":"Schedule Consultation","body":"We will contact you within one business day."}]'::jsonb
),
('11111111-1111-1111-1111-111111111111', 'ketamine', 'Ketamine Therapy', 'published', now(), 'page',
 'Ketamine Therapy',
 'Ketamine Therapy | Relaxol Clinic',
 '[{"sectionId":"hero-ket-001","type":"hero","headline":"Ketamine Therapy","body":"Rapid relief for treatment-resistant depression.","cta":{"label":"Check Eligibility","href":"/contact"}}]'::jsonb
),
('11111111-1111-1111-1111-111111111111', 'spravato-Englewood', 'SPRAVATO Treatment', 'published', now(), 'page',
 'SPRAVATO Treatment',
 'SPRAVATO | Relaxol Clinic',
 '[{"sectionId":"hero-sprav-001","type":"hero","headline":"When Antidepressants Have Not Worked","body":"FDA-approved nasal spray for treatment-resistant depression.","cta":{"label":"Check Eligibility","href":"/contact"}}]'::jsonb
),
('11111111-1111-1111-1111-111111111111', 'contact', 'Contact Us', 'published', now(), 'page',
 'Contact Us',
 'Contact | Relaxol Clinic',
 '[{"sectionId":"hero-contact-001","type":"hero","headline":"Get in Touch","body":"Our team is here to help."},{"sectionId":"contact-form-001","type":"contact","title":"Request Consultation","body":"Fill out the form below."}]'::jsonb
),
('11111111-1111-1111-1111-111111111111', 'faq', 'FAQ', 'published', now(), 'page',
 'Frequently Asked Questions',
 'FAQ | Relaxol Clinic',
 '[{"sectionId":"hero-faq-001","type":"hero","headline":"Frequently Asked Questions","body":"Find answers to common questions."},{"sectionId":"faq-001","type":"faq","title":"General Questions","faq_items":[{"question":"What conditions do you treat?","answer":"Depression, anxiety, PTSD, OCD, and chronic pain."}]}]'::jsonb
);