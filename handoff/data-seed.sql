-- =============================================
-- RELAXOL CLINIC - DATA SEED
-- Run AFTER schema.sql in the client's Supabase SQL Editor
-- =============================================

-- 1. TENANT
INSERT INTO public.tenants (id, name, slug) VALUES
  ('11111111-1111-1111-1111-111111111111', 'Relaxol Clinic', 'relaxol-clinic');

-- 2. PLANS
INSERT INTO public.plans (id, name, features) VALUES
  ('a01df9e6-009e-445f-aa5d-52234877dabb', 'starter', '{"blog": true, "max_posts": 10, "max_users": 2, "advanced_seo": false, "treatment_pages": false}'),
  ('e28a074f-78e6-4c90-ba33-10331840a759', 'growth', '{"blog": true, "max_posts": 100, "max_users": 10, "advanced_seo": true, "treatment_pages": true}'),
  ('84ee39f1-e7ce-4970-8649-a7be25b03a81', 'lifetime', '{"blog": true, "max_posts": null, "max_users": null, "advanced_seo": true, "treatment_pages": true}');

-- 3. LICENSE
INSERT INTO public.licenses (id, tenant_id, plan_id, status) VALUES
  ('83a81155-5f43-4a14-bf4a-5856a36faba8', '11111111-1111-1111-1111-111111111111', '84ee39f1-e7ce-4970-8649-a7be25b03a81', 'active');

-- 4. AUTHORS
INSERT INTO public.authors (id, tenant_id, name, bio, avatar_url) VALUES
  ('40973d6c-404d-4ee8-9037-b96fa69de715', '11111111-1111-1111-1111-111111111111', 'Dr. Sangeet Khanna', 'Dr. Sangeet Khanna is the founder of Relaxol Clinic, specializing in innovative mental health treatments including ketamine therapy and SPRAVATO®. With years of experience in psychiatry, he is dedicated to helping patients find relief from treatment-resistant conditions.', 'https://relaxolclinic.com/wp-content/uploads/2024/09/Dr-Sangeet-Khanna-Relaxol.jpg'),
  ('e0db094a-bd87-41e0-9445-6c96579acca1', '11111111-1111-1111-1111-111111111111', 'Relaxol Clinical Team', 'The Relaxol Clinical Team consists of experienced healthcare professionals dedicated to providing compassionate, evidence-based care for mental health and wellness.', NULL);

-- 5. CATEGORIES
INSERT INTO public.categories (id, tenant_id, name, slug, description) VALUES
  ('2fc6fbf2-4fdd-4a3a-afbb-8d2bcf0cfe61', '11111111-1111-1111-1111-111111111111', 'Ketamine Therapy', 'ketamine-therapy', 'Articles about ketamine infusion therapy and its benefits'),
  ('8bd20ce8-3e8e-47ca-968a-173959793b94', '11111111-1111-1111-1111-111111111111', 'SPRAVATO®', 'spravato', 'Information about SPRAVATO® (esketamine) nasal spray treatment'),
  ('469a77e5-c1fb-4e7d-ae2d-463c54442280', '11111111-1111-1111-1111-111111111111', 'Vitamin Infusions', 'vitamin-infusions', 'IV vitamin therapy and wellness infusions'),
  ('e44954f6-2755-40a9-941f-19ee968340a8', '11111111-1111-1111-1111-111111111111', 'Mental Health', 'mental-health', 'General mental health topics and treatment approaches');

-- 6. PAGES (CMS Pages)
-- Note: sections_json and content_json contain complex JSON - inserting key pages

INSERT INTO public.pages (id, tenant_id, title, slug, type, status, published_at, seo_title, seo_description, hero_headline, hero_subheadline, sections_json) VALUES
(
  '06e751cd-e5ff-4d72-a3f5-a068a24c95f2',
  '11111111-1111-1111-1111-111111111111',
  'Ketamine Therapy', 'ketamine', 'page', 'published', now(),
  'Ketamine Therapy | Relaxol Clinic New Jersey',
  'IV ketamine infusion therapy offering rapid relief for depression, anxiety, PTSD, and chronic pain. Medically supervised treatment in Englewood Cliffs, NJ.',
  'Ketamine Therapy in a Medically Supervised Setting',
  'Rapid relief for treatment-resistant depression, anxiety, PTSD, and chronic pain.',
  '[{"type":"hero","sectionId":"hero-ket-001","subtitle":"KETAMINE INFUSION THERAPY","headline":"Ketamine Therapy in a Medically Supervised Setting","body":"Rapid relief for treatment-resistant depression, anxiety, PTSD, and chronic pain with personalized IV ketamine therapy.","backgroundImage":"/src/assets/treatment-ketamine.jpg","cta":{"label":"Check Your Eligibility","href":"#contact"}},{"type":"stats","sectionId":"stats-ket-001","title":"Our Track Record","stats_items":[{"value":"470+","label":"Patients Helped"},{"value":"15+","label":"Years Experience"},{"value":"70%","label":"Success Rate"},{"value":"Yes","label":"Board Certified"}]},{"type":"imageRight","sectionId":"about-ket-001","title":"What is Ketamine Therapy?","body":"<p>Ketamine infusion therapy is a breakthrough treatment for patients who have not responded to traditional antidepressants. Originally developed as an anesthetic, ketamine has been shown to rapidly reduce symptoms of depression, anxiety, PTSD, and chronic pain.</p><p>Our IV ketamine protocol is administered in a comfortable, medically supervised environment with precise dosing tailored to your individual needs. Unlike traditional antidepressants that can take weeks to work, many patients experience relief within hours of their first treatment.</p>","image":{"url":"/src/assets/ketamine-mechanism.jpg","alt":"Ketamine therapy mechanism illustration"}},{"type":"conditions","sectionId":"conditions-ket-001","subtitle":"WHAT WE TREAT","title":"Conditions We Treat with Ketamine","items":[{"title":"Treatment-Resistant Depression","description":"When two or more antidepressants haven''t provided relief, ketamine offers a new pathway to wellness.","image":"/src/assets/condition-depression.jpg","href":"/conditions/depression"},{"title":"Anxiety Disorders","description":"Rapid relief from chronic anxiety and panic disorders that haven''t responded to standard treatments.","image":"/src/assets/condition-anxiety.jpg","href":"/conditions/anxiety"},{"title":"PTSD","description":"Helping veterans and trauma survivors find relief through innovative ketamine protocols.","image":"/src/assets/condition-ptsd.jpg","href":"/conditions/ptsd"},{"title":"Chronic Pain","description":"Ketamine infusions can help break the cycle of chronic pain conditions like CRPS and fibromyalgia.","image":"/src/assets/condition-pain.jpg","href":"/conditions/pain-management"}]},{"type":"timeline","sectionId":"timeline-ket-001","subtitle":"TREATMENT PROCESS","title":"Your Ketamine Journey","items":[{"step":1,"title":"Initial Evaluation","description":"Comprehensive psychiatric assessment to determine if ketamine therapy is appropriate for your condition."},{"step":2,"title":"Treatment Planning","description":"We develop a personalized protocol including dosing, frequency, and treatment goals."},{"step":3,"title":"Infusion Sessions","description":"Receive IV ketamine in our comfortable treatment rooms with continuous medical monitoring."},{"step":4,"title":"Maintenance & Follow-up","description":"Ongoing support with maintenance infusions and regular check-ins to sustain your progress."}]},{"type":"faq","sectionId":"faq-ket-001","title":"Safety & Side Effects","faq_items":[{"question":"Is ketamine therapy safe?","answer":"Yes, when administered by trained medical professionals in a clinical setting. We monitor vital signs throughout treatment and provide a comfortable recovery environment."},{"question":"What are common side effects?","answer":"Temporary side effects may include mild dissociation, dizziness, nausea, and changes in blood pressure. These typically resolve within 1-2 hours after treatment."},{"question":"How many treatments will I need?","answer":"Most patients receive a series of 6 infusions over 2-3 weeks, followed by maintenance treatments as needed. The exact protocol depends on your response and condition."},{"question":"Can I drive after treatment?","answer":"No, you should not drive for at least 24 hours after a ketamine infusion. Please arrange for someone to drive you home after your appointment."}]},{"type":"cta","sectionId":"cta-ket-001","title":"Ready to Take the Next Step?","body":"Schedule a free consultation to discuss whether ketamine therapy is right for you.","cta":{"label":"Schedule Consultation","href":"/contact"}}]'::jsonb
),
(
  '68e65c76-be21-45f2-8e59-4a97930ad073',
  '11111111-1111-1111-1111-111111111111',
  'SPRAVATO Treatment', 'spravato-Englewood', 'page', 'published', now(),
  'SPRAVATO® Treatment Englewood | Relaxol Clinic',
  'FDA-approved SPRAVATO® (esketamine) nasal spray for treatment-resistant depression. Certified REMS clinic in Englewood Cliffs, New Jersey.',
  'FDA-Approved SPRAVATO® for Treatment-Resistant Depression',
  'Breakthrough nasal spray therapy when antidepressants haven''t worked.',
  '[{"type":"hero","sectionId":"hero-sprav-001","subtitle":"FDA-APPROVED TREATMENT","headline":"When Antidepressants Haven''t Worked","body":"SPRAVATO® (esketamine) is a breakthrough nasal spray treatment for adults with treatment-resistant depression.","backgroundImage":"/src/assets/treatment-spravato.jpg","cta":{"label":"Check Your Eligibility","href":"#contact"}},{"type":"video","sectionId":"video-sprav-001","subtitle":"LEARN ABOUT SPRAVATO®","title":"What is SPRAVATO®?","body":"SPRAVATO® is an FDA-approved nasal spray used alongside an oral antidepressant for treatment-resistant depression (TRD) in adults. It works differently than traditional antidepressants by targeting the glutamate system.","videoUrl":"https://vimeo.com/332355023","videoTitle":"SPRAVATO Treatment Overview"},{"type":"imageLeft","sectionId":"about-sprav-001","title":"Treatment-Resistant Depression","body":"<p>If you''ve tried two or more antidepressants without adequate relief, you may have treatment-resistant depression (TRD). SPRAVATO® works differently than traditional antidepressants, targeting the NMDA receptor to help restore neural connections.</p><p>As a certified REMS clinic, we provide SPRAVATO® in a supervised setting with all required safety monitoring. Our team ensures your comfort and safety throughout every session.</p>","image":{"url":"/src/assets/spravato-nasal-spray.png","alt":"SPRAVATO nasal spray device"}},{"type":"stats","sectionId":"stats-sprav-001","title":"SPRAVATO® Results","stats_items":[{"value":"2019","label":"FDA Approved"},{"value":"1700+","label":"Clinical Trial Patients"},{"value":"2hrs","label":"Treatment Sessions"},{"value":"Most Plans","label":"Insurance Coverage"}]},{"type":"timeline","sectionId":"timeline-sprav-001","subtitle":"TREATMENT PROCESS","title":"Your SPRAVATO® Journey","items":[{"step":1,"title":"Eligibility Assessment","description":"We evaluate your treatment history and verify insurance coverage for SPRAVATO®."},{"step":2,"title":"REMS Enrollment","description":"We complete the required REMS enrollment process as a certified treatment center."},{"step":3,"title":"Treatment Sessions","description":"Self-administer the nasal spray under our supervision with 2-hour post-dose monitoring."},{"step":4,"title":"Ongoing Care","description":"Regular treatment sessions and follow-up care to maintain your progress."}]},{"type":"faq","sectionId":"faq-sprav-001","title":"SPRAVATO® FAQ","faq_items":[{"question":"How is SPRAVATO® administered?","answer":"SPRAVATO® is self-administered as a nasal spray under the supervision of a healthcare provider. You''ll remain at our clinic for at least 2 hours for monitoring after each dose."},{"question":"Is SPRAVATO® covered by insurance?","answer":"Yes, SPRAVATO® is covered by many insurance plans including Medicare and some Medicaid programs. We help verify your benefits before treatment begins."},{"question":"What are common side effects?","answer":"Common side effects include dissociation, dizziness, nausea, sedation, and increased blood pressure. These typically resolve within 2 hours after treatment."},{"question":"How often do I need treatment?","answer":"Treatment typically starts twice weekly for the first month, then weekly or every two weeks depending on your response."}]},{"type":"contact","sectionId":"contact-sprav-001","subtitle":"GET STARTED","title":"Check Your SPRAVATO® Eligibility","body":"Complete our form to see if SPRAVATO® may be right for you. Our team will verify your insurance benefits and schedule your consultation."}]'::jsonb
),
(
  'd73de216-b958-4b34-8cdc-533fab8741f7',
  '11111111-1111-1111-1111-111111111111',
  'Contact Us', 'contact', 'page', 'published', now(),
  NULL, NULL,
  'Contact Us', NULL,
  '[{"type":"hero","sectionId":"hero-contact-001","subtitle":"CONTACT US","headline":"Get in Touch","body":"Ready to take the first step toward better mental health? Our team is here to answer your questions and help you get started.","cta":{"label":"Call Us: 201-781-2101","href":"tel:201-781-2101"}},{"type":"text","sectionId":"text-contact-001","title":"Visit Our Clinic","body":"<p><strong>Relaxol Clinic</strong></p><p>560 Sylvan Avenue, Suite 2115<br/>Englewood Cliffs, NJ 07632</p><p><strong>Phone:</strong> 201-781-2101<br/><strong>Email:</strong> info@relaxolclinic.com</p><p><strong>Hours:</strong><br/>Monday - Friday: 9:00 AM - 5:00 PM<br/>Saturday: By appointment</p>"},{"type":"contact","sectionId":"contact-form-001","subtitle":"SEND US A MESSAGE","title":"Request a Consultation","body":"Fill out the form below and we''ll get back to you within one business day."}]'::jsonb
),
(
  '6ab5af1d-8cf9-460d-8f12-3fcb9d7525af',
  '11111111-1111-1111-1111-111111111111',
  'FAQ', 'faq', 'page', 'published', now(),
  NULL, NULL,
  'Frequently Asked Questions', NULL,
  '[{"type":"hero","sectionId":"hero-faq-001","subtitle":"HELP CENTER","headline":"Frequently Asked Questions","body":"Find answers to common questions about our treatments, process, and what to expect.","cta":{"label":"Still have questions? Contact us","href":"/contact"}},{"type":"faq","sectionId":"faq-general-001","title":"General Questions","faq_items":[{"question":"What conditions do you treat?","answer":"We specialize in treatment-resistant depression, major depressive disorder, anxiety disorders, PTSD, OCD, and chronic pain conditions."},{"question":"How do I know if I''m a candidate?","answer":"You may be a candidate if you''ve tried two or more antidepressants without adequate relief. Schedule a consultation for a personalized evaluation."},{"question":"What is your location?","answer":"We''re located at 560 Sylvan Avenue, Suite 2115, Englewood Cliffs, NJ 07632."}]},{"type":"faq","sectionId":"faq-treatment-001","title":"Treatment Questions","faq_items":[{"question":"What is the difference between ketamine and SPRAVATO®?","answer":"Ketamine is administered via IV infusion and is used off-label. SPRAVATO® is an FDA-approved nasal spray specifically for treatment-resistant depression."},{"question":"How quickly will I see results?","answer":"Many patients notice improvement within hours to days of their first treatment, unlike traditional antidepressants which can take weeks."},{"question":"How long do treatments take?","answer":"Ketamine infusions typically last 40-60 minutes plus recovery time. SPRAVATO® sessions require a 2-hour minimum monitoring period."}]},{"type":"faq","sectionId":"faq-insurance-001","title":"Insurance & Costs","faq_items":[{"question":"Does insurance cover treatment?","answer":"SPRAVATO® is covered by most major insurance plans. Ketamine infusions are typically self-pay, though we offer payment plans."},{"question":"How can I verify my insurance benefits?","answer":"Contact us or fill out our insurance verification form. We''ll check your benefits and explain your coverage options."}]},{"type":"cta","sectionId":"cta-faq-001","title":"Still Have Questions?","body":"Our team is here to help. Reach out anytime.","cta":{"label":"Contact Us","href":"/contact"}}]'::jsonb
);

-- 7. BLOG POSTS
INSERT INTO public.blog_posts (id, tenant_id, title, slug, excerpt, hero_image, hero_image_alt, content_json, status, published_at, category_id, author_id, seo_title, seo_description) VALUES
(
  'ce6c5272-9718-4f91-824d-4332ceee3570',
  '11111111-1111-1111-1111-111111111111',
  'Understanding Ketamine Therapy: A Breakthrough Treatment for Depression',
  'understanding-ketamine-therapy',
  'Discover how ketamine therapy is revolutionizing the treatment of treatment-resistant depression and providing hope for millions of patients who haven''t found relief with traditional medications.',
  'https://images.unsplash.com/photo-1559757175-5700dde675bc?w=800&h=500&fit=crop',
  'Medical professional administering ketamine therapy in a calm clinical setting',
  '[{"type":"paragraph","text":"For millions of Americans living with depression, traditional antidepressants simply don''t work. After trying medication after medication, many patients feel hopeless. But ketamine therapy is changing that narrative, offering rapid relief where other treatments have failed."},{"type":"heading","level":2,"text":"What is Ketamine Therapy?"},{"type":"paragraph","text":"Ketamine is an FDA-approved anesthetic that, at lower doses, has shown remarkable effectiveness in treating depression, anxiety, PTSD, and chronic pain. Unlike traditional antidepressants that can take weeks to work, ketamine often provides relief within hours or days."},{"type":"heading","level":2,"text":"How Does Ketamine Work?"},{"type":"paragraph","text":"Traditional antidepressants work by adjusting serotonin, norepinephrine, or dopamine levels. Ketamine works differently—it targets the glutamate system and promotes the growth of new neural connections. This neuroplasticity effect helps the brain essentially rewire itself, creating new pathways for healthier thought patterns."},{"type":"heading","level":2,"text":"Who is a Candidate for Ketamine Therapy?"},{"type":"paragraph","text":"Ketamine therapy may be right for you if you''ve been diagnosed with depression, anxiety, PTSD, or chronic pain and haven''t found adequate relief from traditional treatments. Our team at Relaxol Clinic conducts thorough evaluations to determine if ketamine therapy is appropriate for your specific situation."},{"type":"heading","level":2,"text":"What to Expect During Treatment"},{"type":"paragraph","text":"At Relaxol Clinic, ketamine is administered via IV infusion in a comfortable, medically supervised setting. Each session typically lasts 40-60 minutes, during which you''ll relax in a private room while our medical team monitors your vitals. Most patients describe the experience as deeply relaxing."},{"type":"paragraph","text":"If you''re struggling with treatment-resistant depression and want to explore whether ketamine therapy might help, we invite you to schedule a consultation with our team."}]'::jsonb,
  'published', '2025-12-18 12:03:55+00',
  '2fc6fbf2-4fdd-4a3a-afbb-8d2bcf0cfe61',
  '40973d6c-404d-4ee8-9037-b96fa69de715',
  'Ketamine Therapy for Depression | Relaxol Clinic NJ',
  'Learn how ketamine therapy offers rapid relief for treatment-resistant depression. Discover the science, benefits, and what to expect at Relaxol Clinic.'
),
(
  'a1b37fdd-be71-4659-8639-721b821e3aad',
  '11111111-1111-1111-1111-111111111111',
  'SPRAVATO® vs Traditional Antidepressants: What You Need to Know',
  'spravato-vs-traditional-antidepressants',
  'Learn about the key differences between SPRAVATO® (esketamine) and traditional antidepressants, including how they work, effectiveness, and what to expect during treatment.',
  'https://images.unsplash.com/photo-1576091160550-2173dba999ef?w=800&h=500&fit=crop',
  'Healthcare professional discussing SPRAVATO treatment options with patient',
  '[{"type":"paragraph","text":"When traditional antidepressants haven''t provided the relief you need, SPRAVATO® (esketamine) offers a different approach. As the first FDA-approved nasal spray for treatment-resistant depression, SPRAVATO® represents a significant advancement in mental health treatment."},{"type":"heading","level":2,"text":"How Traditional Antidepressants Work"},{"type":"paragraph","text":"Most conventional antidepressants—SSRIs, SNRIs, and tricyclics—work by increasing the availability of neurotransmitters like serotonin and norepinephrine in the brain. While effective for many people, these medications typically take 4-6 weeks to show results and don''t work for everyone."},{"type":"heading","level":2,"text":"The SPRAVATO® Difference"},{"type":"paragraph","text":"SPRAVATO® works on the glutamate system, the brain''s most abundant neurotransmitter. This novel mechanism of action can produce rapid antidepressant effects—often within hours to days rather than weeks. It''s specifically designed for patients who haven''t responded to at least two other antidepressant treatments."},{"type":"heading","level":2,"text":"Treatment Protocol"},{"type":"paragraph","text":"SPRAVATO® is administered as a nasal spray in a certified healthcare setting like Relaxol Clinic. You''ll self-administer the spray under medical supervision, then remain at our facility for at least two hours for monitoring. Initial treatment typically involves twice-weekly sessions, transitioning to weekly and then every-other-week maintenance."},{"type":"heading","level":2,"text":"Insurance Coverage"},{"type":"paragraph","text":"Many insurance plans cover SPRAVATO® for qualified patients. Our team at Relaxol Clinic can help verify your coverage and navigate the authorization process. We believe cost shouldn''t be a barrier to effective treatment."},{"type":"paragraph","text":"If you''ve struggled with depression despite trying multiple medications, SPRAVATO® may offer the breakthrough you''ve been searching for. Contact us to learn more about whether this treatment is right for you."}]'::jsonb,
  'published', '2025-12-13 12:03:55+00',
  '8bd20ce8-3e8e-47ca-968a-173959793b94',
  '40973d6c-404d-4ee8-9037-b96fa69de715',
  'SPRAVATO® vs Antidepressants | Relaxol Clinic',
  'Compare SPRAVATO® (esketamine) nasal spray to traditional antidepressants. Learn about effectiveness, side effects, and treatment protocols.'
),
(
  '8ea8c891-3739-4e9e-9ca8-3e638fce66c7',
  '11111111-1111-1111-1111-111111111111',
  'The Science Behind IV Vitamin Infusions for Wellness',
  'science-behind-iv-vitamin-infusions',
  'Explore the scientific evidence supporting IV vitamin infusions and how they can boost energy, immunity, and overall wellness more effectively than oral supplements.',
  'https://images.unsplash.com/photo-1631549916768-4119b2e5f926?w=800&h=500&fit=crop',
  'IV vitamin infusion therapy being administered in a modern wellness clinic',
  '[{"type":"paragraph","text":"You take your vitamins religiously, yet still feel fatigued, run-down, or like you''re not operating at your best. The problem might not be what you''re taking—it''s how you''re taking it. IV vitamin infusions bypass the digestive system entirely, delivering nutrients directly to your cells for maximum absorption."},{"type":"heading","level":2,"text":"Why IV Delivery Matters"},{"type":"paragraph","text":"When you take oral supplements, they must pass through your digestive system, where absorption rates can be as low as 20-50% depending on the nutrient and your gut health. IV infusions deliver 100% of the vitamins and minerals directly into your bloodstream, ensuring your cells receive the full benefit."},{"type":"heading","level":2,"text":"Popular IV Infusion Formulas"},{"type":"paragraph","text":"At Relaxol Clinic, we offer several targeted infusion formulas: the Myers'' Cocktail for general wellness and energy, Immunity Boost for immune system support, Recovery for athletic performance and muscle repair, and Beauty for skin, hair, and nail health. Each formula is crafted with specific therapeutic goals in mind."},{"type":"heading","level":2,"text":"What Does the Research Say?"},{"type":"paragraph","text":"Studies have shown IV vitamin therapy can be effective for conditions ranging from chronic fatigue to migraines to fibromyalgia. The direct delivery method allows for higher therapeutic doses than would be possible orally, as some vitamins cause GI upset at high oral doses."},{"type":"heading","level":2,"text":"What to Expect"},{"type":"paragraph","text":"A typical IV infusion session at Relaxol Clinic takes 30-60 minutes. You''ll relax in a comfortable chair while nutrients flow directly into your bloodstream. Many patients report feeling more energized and clear-headed immediately after treatment."},{"type":"paragraph","text":"Whether you''re looking to boost your energy, support your immune system, or simply optimize your wellness, IV vitamin therapy offers a science-backed approach to feeling your best."}]'::jsonb,
  'published', '2025-12-08 12:03:55+00',
  '469a77e5-c1fb-4e7d-ae2d-463c54442280',
  'e0db094a-bd87-41e0-9445-6c96579acca1',
  'IV Vitamin Infusions Explained | Relaxol Clinic NJ',
  'Discover the science behind IV vitamin therapy. Learn how direct nutrient delivery can boost energy, immunity, and wellness at Relaxol Clinic.'
),
(
  '67de6303-0850-47d0-80a5-5ef9f1f2a0c1',
  '11111111-1111-1111-1111-111111111111',
  'Managing Anxiety: Combining Therapy with Modern Treatments',
  'managing-anxiety-modern-treatments',
  'A comprehensive guide to managing anxiety disorders through a combination of traditional therapy approaches and innovative treatments like ketamine-assisted therapy.',
  'https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?w=800&h=500&fit=crop',
  'Person practicing mindfulness meditation for anxiety relief',
  '[{"type":"paragraph","text":"Anxiety affects over 40 million adults in the United States, making it the most common mental health condition in the country. Yet despite its prevalence, anxiety remains highly treatable—especially when patients have access to the right combination of therapeutic approaches."},{"type":"heading","level":2,"text":"Understanding Anxiety Disorders"},{"type":"paragraph","text":"Anxiety isn''t just occasional worry or stress. Clinical anxiety disorders involve persistent, excessive fear or worry that interferes with daily activities. Common types include generalized anxiety disorder (GAD), social anxiety, panic disorder, and specific phobias. Each presents differently and may respond to different treatment approaches."},{"type":"heading","level":2,"text":"Traditional Treatment Approaches"},{"type":"paragraph","text":"Cognitive Behavioral Therapy (CBT) remains the gold standard for anxiety treatment. CBT helps patients identify and change negative thought patterns that fuel anxiety. Combined with medications like SSRIs or benzodiazepines, many patients find significant relief. However, these approaches don''t work for everyone."},{"type":"heading","level":2,"text":"When Traditional Treatments Fall Short"},{"type":"paragraph","text":"For patients with treatment-resistant anxiety, innovative approaches like ketamine therapy offer new hope. Ketamine''s rapid-acting mechanism can provide relief within hours, and its ability to promote neuroplasticity may help the brain form new, healthier patterns of response to stress and fear."},{"type":"heading","level":2,"text":"An Integrative Approach"},{"type":"paragraph","text":"At Relaxol Clinic, we believe the most effective anxiety treatment combines multiple modalities. This might include ketamine or SPRAVATO® for rapid symptom relief, ongoing therapy to develop coping skills, lifestyle modifications including exercise and sleep hygiene, and appropriate medication management."},{"type":"paragraph","text":"If anxiety is holding you back from living your fullest life, know that effective treatment exists. Our team is here to help you find the right combination of approaches for your unique situation."}]'::jsonb,
  'published', '2025-12-03 12:03:55+00',
  'e44954f6-2755-40a9-941f-19ee968340a8',
  '40973d6c-404d-4ee8-9037-b96fa69de715',
  'Anxiety Treatment Options | Relaxol Clinic NJ',
  'Explore modern anxiety treatment options including therapy, medication, and ketamine-assisted treatment. Find relief at Relaxol Clinic in New Jersey.'
);

-- 8. POST-SETUP: Create an admin user manually in Supabase Auth,
--    then run this (replace YOUR_USER_ID with the actual UUID):
--
-- INSERT INTO public.tenant_members (tenant_id, user_id, role)
-- VALUES ('11111111-1111-1111-1111-111111111111', 'YOUR_USER_ID', 'admin');
