-- =============================================
-- UPDATE HOME PAGE content_json
-- Run in the Supabase SQL Editor for project lstivrvcekiqqqmsczfy
-- =============================================

UPDATE public.pages
SET content_json = '{
  "hero": {
    "subtitle": "FIND HOPE AND RELIEF TODAY",
    "headline": "New Jersey''s Premier Ketamine & SPRAVATO® Clinic",
    "body": "Advanced, clinician-led treatments for Depression, Anxiety, PTSD, OCD and Chronic Pain.",
    "ctaLabel": "Book Your Free Consultation Today!",
    "ctaHref": "#contact"
  },
  "about": {
    "subtitle": "WHY RELAXOL CLINIC",
    "title": "A New Standard in Mental Health Care",
    "bodyHtml": "<p>At Relaxol Clinic, we specialize in advanced psychiatric care with a focus on interventional psychiatry, pain management and FDA-approved treatments for treatment-resistant depression, including SPRAVATO® and medically supervised ketamine therapy. Care begins with a comprehensive evaluation, followed by personalized treatment when appropriate.</p><p>Our approach is evidence-based and tailored to each patient. We support individuals experiencing depression, anxiety, PTSD, and OCD with compassionate, clinician-led care in a safe, comfortable setting with flexible scheduling and insurance support.</p>",
    "imageAlt": "Modern treatment facility interior"
  },
  "video": {
    "subtitle": "HOW IT WORKS",
    "title": "A New Approach to Treatment",
    "body": "Ketamine—originally used in anesthesia for surgical procedures—has been shown in recent research to rapidly affect brain chemistry linked to depression. Unlike traditional antidepressants, it targets glutamate receptors, helping the brain form new neural connections that support improved mood and cognitive function. SPRAVATO® works in a similar pathway and is FDA-approved specifically for treatment-resistant depression.",
    "embedUrl": "https://www.youtube.com/embed/e0mdOODbGNU",
    "embedTitle": "Understanding Ketamine Therapy",
    "secondParagraph": "These treatments are administered under medical supervision and are designed to provide relief for patients who have not responded to standard therapies."
  },
  "treatments": {
    "subtitle": "OUR TREATMENTS",
    "title": "Evidence-Based Treatment Options",
    "description": "We offer a range of clinician-led treatments tailored to your needs.",
    "items": [
      {
        "title": "SPRAVATO® (Esketamine Nasal Spray)",
        "tag": "FDA-Approved",
        "description": "FDA-approved nasal spray for treatment-resistant depression. Provides clinically proven relief when traditional antidepressants haven''t worked. Administered under medical supervision for safety and comfort.",
        "ctaLabel": "Learn More",
        "href": "/spravato-Englewood"
      },
      {
        "title": "Ketamine Infusion Therapy for Relief",
        "description": "Precisely controlled IV ketamine therapy offering rapid relief for Depression, Anxiety, PTSD, and OCD. Ideal for patients who haven''t responded to standard treatments.",
        "ctaLabel": "Learn More",
        "href": "/ketamine"
      },
      {
        "title": "Chronic Pain Management Solutions",
        "description": "Comprehensive pain management solutions including ketamine infusions for Chronic Pain conditions. Our approach targets pain at its source for lasting relief.",
        "ctaLabel": "Learn More",
        "href": "/conditions/pain-management"
      },
      {
        "title": "Comprehensive Evaluations",
        "tag": "Assessment",
        "description": "A comprehensive psychiatric evaluation is the first step in understanding your symptoms, history, and treatment goals. Personalized, thoughtful, clinician-led care.",
        "ctaLabel": "Learn More",
        "href": "/evaluations"
      }
    ]
  },
  "environment": {
    "subtitle": "YOUR COMFORT MATTERS",
    "title": "A Calm, Private Treatment Environment",
    "body": [
      "We know that seeking mental health treatment can feel vulnerable. That''s why we''ve designed our clinic to feel more like a spa than a sterile medical office. From soft lighting to comfortable recliners, every detail is intended to help you relax during your session.",
      "Each treatment room is private, ensuring confidentiality and peace of mind. Our staff is trained not only in clinical care but in creating a welcoming, judgment-free atmosphere where you can focus entirely on your healing."
    ],
    "imageAlt": "Comfortable treatment room with calming atmosphere"
  },
  "conditions": {
    "subtitle": "CONDITIONS WE TREAT",
    "title": "Specialized Care for Complex Conditions",
    "description": "Our treatments are designed for patients who haven''t found relief through traditional approaches.",
    "items": [
      {
        "title": "Depression",
        "description": "When traditional antidepressants fall short, ketamine and SPRAVATO® offer rapid relief—often within hours, not weeks.",
        "imageAlt": "Woman with hands covering face experiencing depression",
        "href": "/conditions/depression"
      },
      {
        "title": "Anxiety",
        "description": "For persistent anxiety that hasn''t responded to conventional therapies, our treatments target the glutamate system for faster relief.",
        "imageAlt": "Woman with hands on head experiencing anxiety",
        "href": "/conditions/anxiety"
      },
      {
        "title": "PTSD",
        "description": "Ketamine therapy helps process traumatic memories and reduce PTSD symptoms in a safe, supportive environment.",
        "imageAlt": "Man in military clothing experiencing PTSD symptoms",
        "href": "/conditions/ptsd"
      },
      {
        "title": "OCD",
        "description": "For medication-resistant OCD, ketamine-based therapies may help interrupt intrusive thoughts and compulsive behaviors.",
        "imageAlt": "Woman arranging items in precise order representing OCD",
        "href": "/conditions/ocd"
      },
      {
        "title": "Chronic Pain",
        "description": "Ketamine infusions offer relief for chronic pain conditions including CRPS, fibromyalgia, and neuropathic pain.",
        "imageAlt": "Man experiencing chronic pain holding his back",
        "href": "/conditions/pain-management"
      }
    ]
  },
  "whyChoose": {
    "title": "Why Choose Relaxol Clinic",
    "description": "Compassionate care backed by expertise and evidence.",
    "items": [
      {
        "title": "Clinician-Led Care",
        "description": "Every treatment is administered and monitored by board-certified psychiatric professionals. You''re never just a number—you''re a patient under the direct care of experienced clinicians."
      },
      {
        "title": "Evidence-Based Protocols",
        "description": "We follow the latest research and FDA guidelines to ensure our treatments are safe, effective, and grounded in science. Our protocols are continuously updated as new evidence emerges."
      },
      {
        "title": "Insurance & Billing Support",
        "description": "Navigating insurance for mental health treatment can be confusing. Our team helps verify your benefits and submit claims so you can focus on getting better."
      },
      {
        "title": "Private Treatment Rooms",
        "description": "Your comfort and privacy matter. Our clinic features individual treatment rooms designed to create a calming, confidential environment for every session."
      }
    ]
  },
  "testimonials": {
    "subtitle": "PATIENT EXPERIENCES",
    "title": "What Our Patients Are Saying",
    "description": "Real stories from patients who found relief through our treatments.",
    "items": [
      {
        "quote": "After years of trying different medications, I was skeptical that anything would work. Within a few weeks of starting SPRAVATO®, I noticed a shift. The fog lifted. I''m not ''cured,'' but I finally feel like myself again.",
        "author": "M.R.",
        "role": "SPRAVATO® Patient",
        "rating": 5
      },
      {
        "quote": "The staff made me feel safe from the moment I walked in. The treatment itself was surprisingly calm, and the relief I felt afterward was unlike anything I''d experienced before. I wish I''d found this clinic sooner.",
        "author": "J.L.",
        "role": "Ketamine Infusion Patient",
        "rating": 5
      },
      {
        "quote": "I came here after a trauma that left me unable to function. The doctor and the team were incredibly compassionate. The ketamine treatments helped me process things I''d been avoiding for years. I''m grateful beyond words.",
        "author": "S.T.",
        "role": "PTSD Treatment Patient",
        "rating": 5
      }
    ]
  },
  "timeline": {
    "subtitle": "HOW IT WORKS",
    "title": "Your Path to Feeling Better",
    "items": [
      {
        "step": "1",
        "title": "Consultation",
        "description": "During your initial consultation, we''ll review your medical history, discuss your symptoms, and determine whether ketamine or SPRAVATO® therapy is right for you."
      },
      {
        "step": "2",
        "title": "Insurance Check",
        "description": "Our team will verify your insurance coverage for SPRAVATO® (which is often covered) and explain any out-of-pocket costs for ketamine infusions."
      },
      {
        "step": "3",
        "title": "Treatment",
        "description": "You''ll receive your treatment in a private, comfortable room under the supervision of our clinical staff. Sessions typically last 1–2 hours depending on the therapy."
      },
      {
        "step": "4",
        "title": "Follow-Up",
        "description": "After your session, we''ll check in to monitor your response and adjust your care plan as needed. Follow-up appointments can often be done via telehealth."
      },
      {
        "step": "5",
        "title": "Long-Term Care",
        "description": "Mental health is a journey. We offer ongoing support, including maintenance treatments and psychiatric follow-ups, to help you sustain your progress over time."
      }
    ]
  },
  "coverage": {
    "subtitle": "INSURANCE & PAYMENT",
    "title": "Understanding Your Coverage",
    "description": "We believe cost shouldn''t be a barrier to mental health care. Our team is here to help you navigate your insurance options.",
    "cardTitle": "Insurance Coverage for SPRAVATO® & Ketamine",
    "cardBody": "Our dedicated team will verify your benefits and explain your out-of-pocket costs before you begin treatment.",
    "ctaLabel": "Verify Your Coverage",
    "ctaHref": "/verify-coverage",
    "phone": "201-781-2101",
    "coveragePoints": [
      "SPRAVATO® is FDA-approved and covered by most major insurance plans",
      "Medicare and Medicaid coverage available in many states",
      "We handle all prior authorizations for you",
      "Transparent cost information before your first visit"
    ],
    "quickFacts": [
      {
        "title": "Major Insurance Accepted",
        "description": "We work with Aetna, Blue Cross Blue Shield, Cigna, United Healthcare, Medicare, Medicaid, and many other providers."
      },
      {
        "title": "Prior Authorization Support",
        "description": "Our team handles all the paperwork and prior authorizations required by your insurance company."
      },
      {
        "title": "Free Benefits Verification",
        "description": "Not sure if you''re covered? We''ll check your benefits at no cost and explain your options."
      }
    ]
  },
  "contact": {
    "subtitle": "GET IN TOUCH",
    "title": "Start Your Journey Today",
    "body": "Ready to take the first step toward feeling better? Fill out the form below or call us to schedule your consultation."
  }
}'::jsonb
WHERE slug = 'home';
