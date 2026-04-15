// Template schemas for core pages
// These define the editable content structure for each template

export type TemplateType =
  | "home_v1"
  | "ketamine_v1"
  | "spravato_v1"
  | "contact_v1"
  | "faq_v1"
  | "condition_v1"
  | "vitamin_infusions_v1"
  | "our_team_v1"
  | "evaluations_v1";

export const TEMPLATE_TYPES: TemplateType[] = [
  "home_v1",
  "ketamine_v1",
  "spravato_v1",
  "contact_v1",
  "faq_v1",
  "condition_v1",
  "vitamin_infusions_v1",
  "our_team_v1",
  "evaluations_v1",
];

export const TEMPLATE_LABELS: Record<TemplateType, string> = {
  home_v1: "Home Page",
  ketamine_v1: "Ketamine Page",
  spravato_v1: "SPRAVATO® Page",
  contact_v1: "Contact Page",
  faq_v1: "FAQ Page",
  condition_v1: "Condition Page",
  vitamin_infusions_v1: "Vitamin Infusions Page",
  our_team_v1: "Our Team Page",
  evaluations_v1: "Evaluations Page",
};

// Common interfaces
interface HeroContent {
  subtitle?: string;
  headline: string;
  body?: string;
  ctaLabel?: string;
  ctaHref?: string;
  heroImageUrl?: string;
  heroImageAlt?: string;
}

interface AboutContent {
  subtitle?: string;
  title: string;
  bodyHtml: string;
  imageUrl?: string;
  imageAlt?: string;
}

interface VideoContent {
  subtitle?: string;
  title: string;
  body?: string;
  embedUrl: string;
  embedTitle?: string;
}

interface TreatmentItem {
  title: string;
  tag?: string;
  description: string;
  imageUrl?: string;
  ctaLabel?: string;
  href?: string;
}

interface ConditionItem {
  title: string;
  description: string;
  imageUrl?: string;
  imageAlt?: string;
  href?: string;
}

interface TestimonialItem {
  quote: string;
  author: string;
  role?: string;
  rating?: number;
}

interface TimelineItem {
  step: string;
  title: string;
  description: string;
}

interface FAQItem {
  question: string;
  answer: string;
}

interface StatItem {
  label: string;
  value: string;
}

interface CTAContent {
  title: string;
  body?: string;
  ctaLabel: string;
  ctaHref: string;
}

// Home Page Schema
export interface WhyChooseItem {
  title: string;
  description: string;
}

export interface CoverageContent {
  subtitle?: string;
  title?: string;
  description?: string;
  cardTitle?: string;
  cardBody?: string;
  coveragePoints?: string[];
  ctaLabel?: string;
  ctaHref?: string;
  phone?: string;
  quickFacts?: { title: string; description: string }[];
}

export interface HomeV1Content {
  hero: HeroContent;
  about: AboutContent;
  video: VideoContent & { secondParagraph?: string };
  treatments: {
    subtitle?: string;
    title: string;
    description?: string;
    items: TreatmentItem[];
  };
  conditions: {
    subtitle?: string;
    title: string;
    description?: string;
    items: ConditionItem[];
  };
  testimonials: {
    subtitle?: string;
    title: string;
    description?: string;
    items: TestimonialItem[];
  };
  timeline: {
    subtitle?: string;
    title: string;
    items: TimelineItem[];
  };
  contact: {
    subtitle?: string;
    title: string;
    body?: string;
  };
  environment?: {
    subtitle?: string;
    title?: string;
    body?: string[];
    imageUrl?: string;
    imageAlt?: string;
  };
  whyChoose?: {
    title?: string;
    description?: string;
    items?: WhyChooseItem[];
  };
  coverage?: CoverageContent;
}

// Ketamine Page Schema
export interface KetamineConditionAccordionItem {
  id: string;
  title: string;
  content: string;
}

export interface KetamineConditionData {
  id: string;
  title: string;
  imageUrl?: string;
  intro: string;
  quote: string;
  accordionItems: KetamineConditionAccordionItem[];
}

export interface KetamineV1Content {
  hero: HeroContent;
  stats: {
    title?: string;
    items: StatItem[];
  };
  parallax: {
    title: string;
    body: string;
    ctaLabel?: string;
    imageUrl?: string;
  };
  understanding?: {
    subtitle?: string;
    title?: string;
    cards?: {
      title: string;
      paragraphs: string[];
    }[];
  };
  services: {
    title: string;
    description?: string;
    items: {
      title: string;
      description: string;
      imageUrl?: string;
    }[];
  };
  conditions?: {
    subtitle?: string;
    title?: string;
    description?: string;
    items?: KetamineConditionData[];
  };
  eligibility: {
    subtitle?: string;
    title: string;
    body: string;
    trustBullets: string[];
    phone: string;
  };
  crossSell: {
    title: string;
    body: string;
    ctaLabel: string;
    ctaHref: string;
    imageUrl?: string;
  };
  faq: {
    title: string;
    items: FAQItem[];
  };
}

// SPRAVATO Page Schema
export interface SpravatoV1Content {
  hero: HeroContent & {
    credibilityItems?: { icon: string; text: string }[];
  };
  eligibilityForm: {
    title: string;
    body: string;
    trustBullets: string[];
  };
  trd: {
    title: string;
    body: string;
    imageUrl?: string;
    imageAlt?: string;
  };
  benefits: {
    subtitle?: string;
    title: string;
    items: {
      icon?: string;
      title: string;
      description: string;
    }[];
  };
  whatIs: {
    subtitle?: string;
    title: string;
    body: string;
    imageUrl?: string;
    imageAlt?: string;
  };
  timeline: {
    subtitle?: string;
    title: string;
    items: TimelineItem[];
    mechanismText?: string;
  };
  faq: {
    title: string;
    items: FAQItem[];
  };
  contact: {
    subtitle?: string;
    title: string;
    body?: string;
  };
}

// Contact Page Schema
export interface ContactV1Content {
  hero: HeroContent;
  clinicInfo: {
    name: string;
    address: string;
    phone: string;
    email: string;
    hours: string;
    mapEmbedUrl?: string;
  };
  form: {
    subtitle?: string;
    title: string;
    body?: string;
  };
}

// FAQ Page Schema
export interface FAQV1Content {
  hero: HeroContent & {
    tagline?: string;
    description?: string;
  };
  sections: {
    id: string;
    title: string;
    items: FAQItem[];
  }[];
  flatItems?: FAQItem[];
  cta: CTAContent & {
    contactPhone?: string;
    contactEmail?: string;
    contactAddress?: string;
  };
}

// Re-export new schema types
export type {
  ConditionV1Content,
  VitaminInfusionsV1Content,
  OurTeamV1Content,
} from "./newSchemas";
export {
  isConditionV1Content,
  isVitaminInfusionsV1Content,
  isOurTeamV1Content,
  isEvaluationsV1Content,
} from "./newSchemas";

import type {
  ConditionV1Content,
  VitaminInfusionsV1Content,
  OurTeamV1Content,
  EvaluationsV1Content,
} from "./newSchemas";

// Union type for all content types
export type TemplateContent =
  | HomeV1Content
  | KetamineV1Content
  | SpravatoV1Content
  | ContactV1Content
  | FAQV1Content
  | ConditionV1Content
  | VitaminInfusionsV1Content
  | OurTeamV1Content
  | EvaluationsV1Content;

// Type guard functions
export function isHomeV1Content(content: unknown): content is HomeV1Content {
  return (
    typeof content === "object" &&
    content !== null &&
    "hero" in content &&
    "about" in content &&
    "treatments" in content
  );
}

export function isKetamineV1Content(
  content: unknown,
): content is KetamineV1Content {
  return (
    typeof content === "object" &&
    content !== null &&
    "hero" in content &&
    "stats" in content &&
    "services" in content
  );
}

export function isSpravatoV1Content(
  content: unknown,
): content is SpravatoV1Content {
  return (
    typeof content === "object" &&
    content !== null &&
    "hero" in content &&
    "trd" in content &&
    "benefits" in content
  );
}

export function isContactV1Content(
  content: unknown,
): content is ContactV1Content {
  return (
    typeof content === "object" &&
    content !== null &&
    "hero" in content &&
    "clinicInfo" in content &&
    "form" in content
  );
}

export function isFAQV1Content(content: unknown): content is FAQV1Content {
  return (
    typeof content === "object" &&
    content !== null &&
    "hero" in content &&
    "sections" in content &&
    "cta" in content
  );
}

// Default content creators
export function createDefaultHomeContent(): HomeV1Content {
  return {
    hero: {
      subtitle: "FIND HOPE AND RELIEF TODAY",
      headline: "New Jersey's Premier Ketamine & SPRAVATO® Clinic",
      body: "Advanced, clinician-led treatments for Depression, Anxiety, PTSD, OCD and Chronic Pain.",
      ctaLabel: "Book Your Free Consultation Today!",
      ctaHref: "#contact",
    },
    about: {
      subtitle: "WHY JERSEY SERENITY MINDS",
      title: "A New Standard in Mental Health Care",
      bodyHtml:
        "<p>At Jersey Serenity Minds, we specialize in advanced psychiatric care with a focus on interventional psychiatry, pain management and FDA-approved treatments for treatment-resistant depression, including SPRAVATO® and medically supervised ketamine therapy. Care begins with a comprehensive evaluation, followed by personalized treatment when appropriate.</p><p>Our approach is evidence-based and tailored to each patient. We support individuals experiencing depression, anxiety, PTSD, and OCD with compassionate, clinician-led care in a safe, comfortable setting with flexible scheduling and insurance support.</p>",
      imageAlt: "Modern treatment facility interior",
    },
    video: {
      subtitle: "HOW IT WORKS",
      title: "A New Approach to Treatment",
      body: "Ketamine—originally used in anesthesia for surgical procedures—has been shown in recent research to rapidly affect brain chemistry linked to depression. Unlike traditional antidepressants, it targets glutamate receptors, helping the brain form new neural connections that support improved mood and cognitive function. SPRAVATO® works in a similar pathway and is FDA-approved specifically for treatment-resistant depression.",
      embedUrl: "https://www.youtube.com/embed/qMjc_RMfQXw",
      embedTitle: "Understanding Ketamine Therapy",
      secondParagraph:
        "These treatments are administered under medical supervision and are designed to provide relief for patients who have not responded to standard therapies.",
    },
    treatments: {
      subtitle: "OUR TREATMENTS",
      title: "Evidence-Based Treatment Options",
      description:
        "We offer a range of clinician-led treatments tailored to your needs.",
      items: [
        {
          title: "SPRAVATO® (Esketamine Nasal Spray)",
          tag: "FDA-Approved",
          description:
            "FDA‑approved treatment for resistant depression, offering proven relief when standard antidepressants fail. It is administered under medical supervision for safety.",
          ctaLabel: "Learn More",
          href: "/spravato-Englewood",
        },
        {
          title: "Ketamine Infusion Therapy for Relief",
          description:
            "Precisely controlled IV ketamine therapy offering rapid relief for Depression, Anxiety, PTSD, and OCD. Ideal for patients who haven't responded to standard treatments.",
          ctaLabel: "Learn More",
          href: "/ketamine",
        },
        {
          title: "Chronic Pain Management Solutions",
          description:
            "Comprehensive pain management solutions including ketamine infusions for Chronic Pain conditions. Our approach targets pain at its source for lasting relief.",
          ctaLabel: "Learn More",
          href: "/conditions/pain-management",
        },
        {
          title: "Comprehensive Evaluations",
          tag: "Assessment",
          description:
            "A comprehensive psychiatric evaluation is the first step in understanding your symptoms, history, and treatment goals. Personalized, thoughtful, clinician-led care.",
          ctaLabel: "Learn More",
          href: "/evaluations",
        },
      ],
    },
    conditions: {
      subtitle: "Conditions we support",
      title: "Specialized Care for Complex Conditions",
      description:
        "Our treatments are designed for patients who haven't found relief through traditional approaches.",
      items: [
        {
          title: "Depression",
          description:
            "When traditional antidepressants fall short, ketamine and SPRAVATO® offer rapid relief—often within hours, not weeks.",
          imageAlt: "Woman with hands covering face experiencing depression",
          href: "/conditions/depression",
        },
        {
          title: "Anxiety",
          description:
            "For persistent anxiety that hasn't responded to conventional therapies, our treatments target the glutamate system for faster relief.",
          imageAlt: "Woman with hands on head experiencing anxiety",
          href: "/conditions/anxiety",
        },
        {
          title: "PTSD",
          description:
            "Ketamine therapy helps process traumatic memories and reduce PTSD symptoms in a safe, supportive environment.",
          imageAlt: "Man in military clothing experiencing PTSD symptoms",
          href: "/conditions/ptsd",
        },
        {
          title: "OCD",
          description:
            "For medication-resistant OCD, ketamine-based therapies may help interrupt intrusive thoughts and compulsive behaviors.",
          imageAlt: "Woman arranging items in precise order representing OCD",
          href: "/conditions/ocd",
        },
        {
          title: "Chronic Pain",
          description:
            "Ketamine infusions offer relief for chronic pain conditions including CRPS, fibromyalgia, and neuropathic pain.",
          imageAlt: "Man experiencing chronic pain holding his back",
          href: "/conditions/pain-management",
        },
      ],
    },
    whyChoose: {
      title: "Why Choose Jersey Serenity Minds",
      description: "Compassionate care backed by expertise and evidence.",
      items: [
        {
          title: "Clinician-Led Care",
          description:
            "Every treatment is administered and monitored by board-certified psychiatric professionals. You're never just a number—you're a patient under the direct care of experienced clinicians.",
        },
        {
          title: "Evidence-Based Protocols",
          description:
            "We follow the latest research and FDA guidelines to ensure our treatments are safe, effective, and grounded in science. Our protocols are continuously updated as new evidence emerges.",
        },
        {
          title: "Insurance & Billing Support",
          description:
            "Navigating insurance for mental health treatment can be confusing. Our team helps verify your benefits and submit claims so you can focus on getting better.",
        },
        {
          title: "Private Treatment Rooms",
          description:
            "Your comfort and privacy matter. Our clinic features individual treatment rooms designed to create a calming, confidential environment for every session.",
        },
      ],
    },
    testimonials: {
      subtitle: "PATIENT EXPERIENCES",
      title: "What Our Patients Are Saying",
      description:
        "Real stories from patients who found relief through our treatments.",
      items: [
        {
          quote:
            "After years of trying different medications, I was skeptical that anything would work. Within a few weeks of starting SPRAVATO®, I noticed a shift. The fog lifted. I'm not 'cured,' but I finally feel like myself again.",
          author: "M.R.",
          role: "SPRAVATO® Patient",
          rating: 5,
        },
        {
          quote:
            "The staff made me feel safe from the moment I walked in. The treatment itself was surprisingly calm, and the relief I felt afterward was unlike anything I'd experienced before. I wish I'd found this clinic sooner.",
          author: "J.L.",
          role: "Ketamine Infusion Patient",
          rating: 5,
        },
        {
          quote:
            "I came here after a trauma that left me unable to function. The doctor and the team were incredibly compassionate. The ketamine treatments helped me process things I'd been avoiding for years. I'm grateful beyond words.",
          author: "S.T.",
          role: "PTSD Treatment Patient",
          rating: 5,
        },
      ],
    },
    timeline: {
      subtitle: "HOW IT WORKS",
      title: "Your Path to Feeling Better",
      items: [
        {
          step: "1",
          title: "Consultation",
          description:
            "During your initial consultation, we'll review your medical history, discuss your symptoms, and determine whether ketamine or SPRAVATO® therapy is right for you.",
        },
        {
          step: "2",
          title: "Insurance Check",
          description:
            "Our team will verify your insurance coverage for SPRAVATO® (which is often covered) and explain any out-of-pocket costs for ketamine infusions.",
        },
        {
          step: "3",
          title: "Treatment",
          description:
            "You'll receive your treatment in a private, comfortable room under the supervision of our clinical staff. Sessions typically last 1–2 hours depending on the therapy.",
        },
        {
          step: "4",
          title: "Follow-Up",
          description:
            "After your session, we'll check in to monitor your response and adjust your care plan as needed. Follow-up appointments can often be done via telehealth.",
        },
        {
          step: "5",
          title: "Long-Term Care",
          description:
            "Mental health is a journey. We offer ongoing support, including maintenance treatments and psychiatric follow-ups, to help you sustain your progress over time.",
        },
      ],
    },
    coverage: {
      subtitle: "INSURANCE & PAYMENT",
      title: "Understanding Your Coverage",
      description:
        "We believe cost shouldn't be a barrier to mental health care. Our team is here to help you navigate your insurance options.",
      cardTitle: "Insurance Coverage for SPRAVATO® & Ketamine",
      cardBody:
        "Our dedicated team will verify your benefits and explain your out-of-pocket costs before you begin treatment.",
      ctaLabel: "Verify Your Coverage",
      ctaHref: "/verify-coverage",
      phone: "201-781-2101",
      coveragePoints: [
        "SPRAVATO® is FDA-approved and covered by most major insurance plans",
        "Medicare and Medicaid coverage available in many states",
        "We handle all prior authorizations for you",
        "Transparent cost information before your first visit",
      ],
      quickFacts: [
        {
          title: "We Accept Most Insurance Plans",
          description:
            "We work with Aetna, Blue Cross Blue Shield, Cigna, United Healthcare, Medicare, Medicaid, and many other providers.",
        },
        {
          title: "Prior Authorization Support",
          description:
            "Our team handles all the paperwork and prior authorizations required by your insurance company.",
        },
        {
          title: "Free Benefits Verification",
          description:
            "Not sure if you're covered? We'll check your benefits at no cost and explain your options.",
        },
      ],
    },
    contact: {
      subtitle: "GET IN TOUCH",
      title: "Start Your Journey Today",
      body: "Ready to take the first step toward feeling better? Fill out the form below or call us to schedule your consultation.",
    },
    environment: {
      subtitle: "YOUR COMFORT MATTERS",
      title: "A Calm, Private Treatment Environment",
      body: [
        "We know that seeking mental health treatment can feel vulnerable. That's why we've designed our clinic to feel more like a spa than a sterile medical office. From soft lighting to comfortable recliners, every detail is intended to help you relax during your session.",
        "Each treatment room is private, ensuring confidentiality and peace of mind. Our staff is trained not only in clinical care but in creating a welcoming, judgment-free atmosphere where you can focus entirely on your healing.",
      ],
      imageAlt: "Comfortable treatment room with calming atmosphere",
    },
  };
}

export function createDefaultKetamineContent(): KetamineV1Content {
  return {
    hero: {
      headline: "Ketamine Therapy:",
      subtitle: "A New Approach for a Range of Mood and Chronic Conditions",
      body: "Personalized, innovative care for individuals who haven't found relief with traditional treatments. Ketamine therapy is part of interventional psychiatry and may be considered for individuals who have not found relief with traditional treatments. Administered under medical supervision, it works differently from standard antidepressants and is recommended based on a clinical evaluation.",
      ctaLabel: "Book Consultation",
      ctaHref: "#eligibility",
    },
    stats: {
      items: [
        { value: "470+", label: "Patients helped" },
        { value: "98%", label: "Patient satisfaction" },
        { value: "15+", label: "Years experience" },
        { value: "1000+", label: "Treatments delivered" },
      ],
    },
    parallax: {
      title: "When Traditional Treatments Haven't Provided Enough Relief",
      body: "Ketamine therapy may be an option for individuals who have not responded to traditional medications.",
      ctaLabel: "Learn More",
    },
    services: {
      title: "Our Services",
      description:
        "Comprehensive ketamine therapy programs tailored to your needs.",
      items: [],
    },
    eligibility: {
      subtitle: "Start Your Journey",
      title: "Take the Next Step Toward Relief",
      body: "If traditional treatments haven't worked, our care team can help you understand whether ketamine therapy may be appropriate for you.",
      trustBullets: [
        "No obligation assessment",
        "Response within 48 hours",
        "Confidential submission",
        "Insurance verification available",
      ],
      phone: "201-781-2101",
    },
    crossSell: {
      title: "Also Offering SPRAVATO® Treatment",
      body: "SPRAVATO® (esketamine) is an FDA-approved nasal spray for treatment-resistant depression. It's administered in our clinic under medical supervision and may be covered by insurance.",
      ctaLabel: "Learn About SPRAVATO®",
      ctaHref: "/spravato-Englewood",
    },
    faq: {
      title: "Safety & Side Effects",
      items: [
        {
          question: "Common Side Effects",
          answer:
            "Temporary effects may include dissociation, dizziness, nausea, drowsiness, and changes in perception. These typically resolve within 1-2 hours after treatment ends.",
        },
        {
          question: "Monitoring Procedures",
          answer:
            "Vital signs are checked before, during, and after each infusion. You'll remain in our clinic until effects have subsided.",
        },
        {
          question: "Safety Considerations",
          answer:
            "Ketamine therapy is not suitable for everyone. A thorough evaluation ensures treatment is safe and appropriate for you.",
        },
      ],
    },
  };
}

export function createDefaultSpravatoContent(): SpravatoV1Content {
  return {
    hero: {
      headline: "Treatment for Depression That Hasn't Responded to Medication",
      subtitle:
        "FDA-approved esketamine therapy administered in a medically supervised clinic",
      ctaLabel: "Check Eligibility",
      ctaHref: "#eligibility-form",
    },
    eligibilityForm: {
      title: "Find Out If You're a Candidate",
      body: "SPRAVATO® is specifically designed for adults with treatment-resistant depression.",
      trustBullets: [
        "No obligation—we simply assess eligibility",
        "Response within 48 hours from our care team",
        "Insurance verification included",
      ],
    },
    trd: {
      title: "Treatment-Resistant Depression",
      body: 'Depression is not as simple as just "sadness." Sadness is a feeling that comes and goes with everyday life. Almost 300 million people suffer from depression worldwide, and despite a variety of depression treatments available, many continue to suffer without relief from these medications.\n\nFortunately, SPRAVATO® – the breakthrough FDA-approved esketamine nasal spray – is showing excellent results in relieving those symptoms of depression. As a SPRAVATO® REMS-certified treatment provider, our treatment team can alleviate even the most severe forms of treatment-resistant depression.',
    },
    benefits: {
      subtitle: "Why SPRAVATO®",
      title: "Benefits of SPRAVATO® Treatment",
      items: [
        {
          title: "Faster Relief",
          description:
            "May improve symptoms within hours to days, unlike weeks with traditional antidepressants.",
        },
        {
          title: "Works Differently",
          description:
            "Targets NMDA receptors and glutamate—a different brain pathway than standard medications.",
        },
        {
          title: "Treatment-Resistant Option",
          description:
            "Specifically designed for patients who haven't responded to other antidepressants.",
        },
        {
          title: "Medical Supervision",
          description:
            "Every session is administered and monitored by trained clinical staff.",
        },
        {
          title: "FDA-Approved",
          description:
            "Rigorously tested and approved for treatment-resistant depression and MDD with suicidal ideation.",
        },
      ],
    },
    whatIs: {
      subtitle: "About the Treatment",
      title: "What Is SPRAVATO®?",
      body: "SPRAVATO® is a prescription nasal spray derived from esketamine and approved by the FDA for treatment-resistant depression. It's used alongside an oral antidepressant for adults who haven't found relief from standard medications.\n\nUnlike traditional antidepressants that target serotonin or norepinephrine, SPRAVATO® works on the glutamate system—potentially restoring neural connections weakened by chronic depression.",
    },
    timeline: {
      subtitle: "The Process",
      title: "How the Treatment Works",
      items: [
        {
          step: "1",
          title: "Evaluation & Eligibility",
          description:
            "Comprehensive psychiatric assessment to determine candidacy.",
        },
        {
          step: "2",
          title: "In-Clinic Administration",
          description:
            "Self-administer the nasal spray under clinical supervision.",
        },
        {
          step: "3",
          title: "Observation Period",
          description:
            "Rest while our team monitors your response for ~2 hours.",
        },
        {
          step: "4",
          title: "Ongoing Care",
          description: "Continue with personalized maintenance and support.",
        },
      ],
    },
    faq: {
      title: "Safety & Side Effects",
      items: [
        {
          question: "Common Side Effects",
          answer:
            "Temporary effects may include dissociation, dizziness, nausea, sedation, and temporary blood pressure changes. Most side effects resolve within a few hours of treatment.",
        },
        {
          question: "Monitoring Requirements",
          answer:
            "Vital signs are checked before, during, and after each session. You'll remain in our clinic for approximately 2 hours post-administration under continuous observation.",
        },
        {
          question: "Safety Protocols",
          answer:
            "SPRAVATO® is only available through certified REMS healthcare settings. Our trained psychiatric staff follows strict FDA-mandated protocols with emergency equipment readily available.",
        },
      ],
    },
    contact: {
      subtitle: "Coverage",
      title: "Insurance & Access",
      body: "We work with many major insurance providers. Our team will verify your benefits and assist with prior authorization to help maximize your coverage.",
    },
  };
}

export function createDefaultContactContent(): ContactV1Content {
  return {
    hero: {
      subtitle: "Get In Touch",
      headline: "Contact Us",
      body: "We're here to answer your questions and help you begin your journey to wellness.",
    },
    clinicInfo: {
      name: "Jersey Serenity Minds",
      address: "560 Sylvan Avenue, Suite 2115\nEnglewood Cliffs, NJ 07632",
      phone: "201-781-2101",
      email: "info@relaxolclinic.com",
      hours: "Monday – Friday: 9:00 AM – 5:00 PM\nSaturday – Sunday: Closed",
    },
    form: {
      subtitle: "SEND US A MESSAGE",
      title: "Schedule a Consultation",
      body: "Fill out the form below and we'll contact you within one business day.",
    },
  };
}

export function createDefaultFAQContent(): FAQV1Content {
  return {
    hero: {
      headline: "Ketamine Therapy FAQs",
      body: "Clear answers about ketamine therapy, SPRAVATO®, safety, and the treatment process.",
    },
    sections: [],
    cta: {
      title: "Still Have Questions? We're Here to Help.",
      body: "Our team is ready to answer any additional questions.",
      ctaLabel: "Schedule a Consultation",
      ctaHref: "/contact",
    },
  };
}

import {
  defaultConditionContent,
  defaultVitaminInfusionsContent,
  defaultOurTeamContent,
  defaultEvaluationsContent,
} from "./newDefaults";

export function createDefaultConditionContent(
  slug?: string,
): ConditionV1Content {
  return (
    defaultConditionContent[slug || "depression"] ||
    defaultConditionContent.depression
  );
}

export function createDefaultVitaminInfusionsContent(): VitaminInfusionsV1Content {
  return { ...defaultVitaminInfusionsContent };
}

export function createDefaultOurTeamContent(): OurTeamV1Content {
  return { ...defaultOurTeamContent };
}

export function createDefaultEvaluationsContent(): EvaluationsV1Content {
  return { ...defaultEvaluationsContent };
}

export function createDefaultContent(
  template: TemplateType,
  slug?: string,
): TemplateContent {
  switch (template) {
    case "home_v1":
      return createDefaultHomeContent();
    case "ketamine_v1":
      return createDefaultKetamineContent();
    case "spravato_v1":
      return createDefaultSpravatoContent();
    case "contact_v1":
      return createDefaultContactContent();
    case "faq_v1":
      return createDefaultFAQContent();
    case "condition_v1":
      return createDefaultConditionContent(slug);
    case "vitamin_infusions_v1":
      return createDefaultVitaminInfusionsContent();
    case "our_team_v1":
      return createDefaultOurTeamContent();
    case "evaluations_v1":
      return createDefaultEvaluationsContent();
  }
}
