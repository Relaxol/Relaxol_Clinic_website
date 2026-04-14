-- =============================================
-- UPDATE DB TO MATCH TODAY'S HARDCODED CHANGES
-- Run in the Supabase SQL Editor for project lstivrvcekiqqqmsczfy
-- =============================================

-- =============================================
-- 1. HOME PAGE - Update content_json fields
-- =============================================

-- 1a. Video section: Update YouTube embed URL
UPDATE public.pages
SET content_json = jsonb_set(
  content_json,
  '{video,embedUrl}',
  '"https://www.youtube.com/embed/qMjc_RMfQXw"'
)
WHERE slug = 'home';

-- 1b. Conditions section: "Conditions we treat" → "Conditions we support"
UPDATE public.pages
SET content_json = jsonb_set(
  content_json,
  '{conditions,subtitle}',
  '"Conditions we support"'
)
WHERE slug = 'home';

-- 1c. Coverage section: "Major Insurance Accepted" → "We Accept Most Insurance Plans"
UPDATE public.pages
SET content_json = jsonb_set(
  content_json,
  '{coverage,quickFacts,0,title}',
  '"We Accept Most Insurance Plans"'
)
WHERE slug = 'home';


-- =============================================
-- 2. FAQ PAGE - Update content_json with new template/content
-- =============================================

-- First, set template to faq-v1 if not already
UPDATE public.pages
SET 
  template = 'faq-v1',
  content_json = '{
    "hero": {
      "headline": "Ketamine Therapy FAQ''s",
      "tagline": "Your Journey to Your Best Self",
      "description": "Find answers to common questions about ketamine therapy, often considered when traditional depression treatments haven''t been effective. It may also be used as part of care for anxiety, PTSD, and related conditions. Individual evaluation is required to determine if this treatment is appropriate."
    },
    "flatItems": [
      {"question": "What is ketamine therapy?", "answer": "Ketamine therapy is a treatment option that may be used for individuals with depression who have not found sufficient relief with traditional approaches."},
      {"question": "What conditions can ketamine therapy help with?", "answer": "It is most commonly considered for treatment-resistant depression and may also be part of care for anxiety, PTSD, and related conditions."},
      {"question": "What is treatment-resistant depression?", "answer": "This refers to depression that has not improved after trying at least two standard treatments, such as antidepressant medications."},
      {"question": "How can ketamine therapy help?", "answer": "Ketamine may support changes in brain pathways involved in mood. Some individuals experience improvements in mood, energy, and overall functioning."},
      {"question": "How often is treatment given?", "answer": "Treatment is typically provided as a series of sessions, often once or twice per week for several weeks, depending on your provider''s recommendation."},
      {"question": "How soon can I feel better?", "answer": "Some individuals notice changes within hours or days, while others may require multiple sessions to experience improvement."},
      {"question": "What is the goal of treatment?", "answer": "The goal is to reduce symptoms and support better daily functioning as part of a comprehensive mental health plan."},
      {"question": "What should I expect during a session?", "answer": "You will be in a calm, supervised setting where your care team monitors you throughout the treatment."},
      {"question": "Will I be asleep during treatment?", "answer": "No. You remain awake, although you may feel relaxed or notice temporary changes in perception."},
      {"question": "What does the experience feel like?", "answer": "Some people describe feeling detached or deeply relaxed during treatment. These effects are temporary and monitored by staff."},
      {"question": "What happens after treatment?", "answer": "You will be observed until you are ready to leave. You may feel tired afterward and will need someone to drive you home."},
      {"question": "Are there side effects?", "answer": "Possible side effects may include nausea, dizziness, or temporary increases in blood pressure. These are usually short-lived."},
      {"question": "Is ketamine therapy safe?", "answer": "When provided in a medical setting with proper screening and monitoring, ketamine therapy is generally considered safe."},
      {"question": "Is ketamine addictive?", "answer": "While ketamine has potential for misuse, treatment in a supervised clinical setting is carefully managed to reduce risk."},
      {"question": "How long do results last?", "answer": "Some individuals experience relief for days or weeks, while others may require ongoing or maintenance treatments."},
      {"question": "Will I need long-term treatment?", "answer": "This varies by individual. Your provider will adjust your plan based on how you respond over time."},
      {"question": "Can I continue my current medications?", "answer": "In many cases, yes. Your provider will review your medications to ensure safety and compatibility."},
      {"question": "Can I eat or drink before treatment?", "answer": "You will receive specific instructions, but you may be asked to avoid eating for several hours before your session."},
      {"question": "Are there conditions that may prevent treatment?", "answer": "Certain medical or psychiatric conditions may affect eligibility. A full evaluation is required before starting treatment."},
      {"question": "Is ketamine therapy legal?", "answer": "Yes. Ketamine is an FDA-approved medication that may be used by licensed providers as part of a treatment plan."},
      {"question": "Is this an outpatient treatment?", "answer": "Yes. Treatment is typically provided in an outpatient setting, and patients return home the same day."},
      {"question": "What is SPRAVATO®?", "answer": "SPRAVATO® is an FDA-approved nasal spray (esketamine) used for treatment-resistant depression in combination with an oral antidepressant."},
      {"question": "How is SPRAVATO® different from ketamine therapy?", "answer": "SPRAVATO® is a specific form of ketamine delivered as a nasal spray and administered under a structured, FDA-regulated program."},
      {"question": "How is SPRAVATO® administered?", "answer": "It is given in the clinic under supervision, followed by a required observation period according to a protocol to ensure safety."},
      {"question": "Who may be a candidate for SPRAVATO®?", "answer": "Adults with treatment-resistant depression may be eligible after a clinical evaluation."},
      {"question": "Does insurance cover SPRAVATO®?", "answer": "SPRAVATO® is often covered by insurance for eligible patients. Coverage varies, and our team can help verify your benefits."}
    ],
    "cta": {
      "body": "Your Journey to Your Best Self",
      "title": "Start Transforming Your Life",
      "ctaLabel": "Schedule a Free Consultation",
      "ctaHref": "/contact",
      "contactPhone": "201-781-2101",
      "contactEmail": "info@relaxolclinic.com",
      "contactAddress": "560 Sylvan Avenue, Suite 2115, Englewood Cliffs, NJ 07632"
    }
  }'::jsonb
WHERE slug = 'faq';


-- =============================================
-- 3. KETAMINE PAGE - Update content_json fields
-- =============================================

-- 3a. Hero subtitle: "Rapid Relief..." → "A New Approach..."
UPDATE public.pages
SET content_json = jsonb_set(
  content_json,
  '{hero,subtitle}',
  '"A New Approach for a Range of Mood and Chronic Conditions"'
)
WHERE slug = 'ketamine'
  AND content_json ? 'hero';

-- 3b. Hero body: updated text
UPDATE public.pages
SET content_json = jsonb_set(
  content_json,
  '{hero,body}',
  '"Personalized, innovative care for individuals who haven''t found relief with traditional treatments. Ketamine therapy is part of interventional psychiatry and may be considered for individuals who have not found relief with traditional treatments. Administered under medical supervision, it works differently from standard antidepressants and is recommended based on a clinical evaluation."'
)
WHERE slug = 'ketamine'
  AND content_json ? 'hero';

-- 3c. Parallax title: "Rapid Relief When Traditional..." → new text
UPDATE public.pages
SET content_json = jsonb_set(
  content_json,
  '{parallax,title}',
  '"When Traditional Treatments Haven''t Provided Enough Relief"'
)
WHERE slug = 'ketamine'
  AND content_json ? 'parallax';

-- 3d. Parallax body: updated text
UPDATE public.pages
SET content_json = jsonb_set(
  content_json,
  '{parallax,body}',
  '"Ketamine therapy may be an option for individuals who have not responded to traditional medications."'
)
WHERE slug = 'ketamine'
  AND content_json ? 'parallax';
