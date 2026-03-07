// Template schemas for core pages
// These define the editable content structure for each template

export type TemplateType = 'home_v1' | 'ketamine_v1' | 'spravato_v1' | 'contact_v1' | 'faq_v1' | 'condition_v1' | 'vitamin_infusions_v1' | 'our_team_v1';

export const TEMPLATE_TYPES: TemplateType[] = ['home_v1', 'ketamine_v1', 'spravato_v1', 'contact_v1', 'faq_v1', 'condition_v1', 'vitamin_infusions_v1', 'our_team_v1'];

export const TEMPLATE_LABELS: Record<TemplateType, string> = {
  home_v1: 'Home Page',
  ketamine_v1: 'Ketamine Page',
  spravato_v1: 'SPRAVATO® Page',
  contact_v1: 'Contact Page',
  faq_v1: 'FAQ Page',
  condition_v1: 'Condition Page',
  vitamin_infusions_v1: 'Vitamin Infusions Page',
  our_team_v1: 'Our Team Page',
};

// Common interfaces
interface HeroContent {
  subtitle?: string;
  headline: string;
  body?: string;
  ctaLabel?: string;
  ctaHref?: string;
}

interface AboutContent {
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
export interface HomeV1Content {
  hero: HeroContent;
  about: AboutContent;
  video: VideoContent;
  treatments: {
    subtitle?: string;
    title: string;
    description?: string;
    items: TreatmentItem[];
  };
  doctor: {
    subtitle?: string;
    name: string;
    imageUrl?: string;
    bio: string[];
  };
  conditions: {
    subtitle?: string;
    title: string;
    items: ConditionItem[];
  };
  testimonials: {
    subtitle?: string;
    title: string;
    items: TestimonialItem[];
  };
  timeline: {
    subtitle?: string;
    title: string;
    items: TimelineItem[];
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

// Ketamine Page Schema
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
  hero: HeroContent;
  sections: {
    id: string;
    title: string;
    items: FAQItem[];
  }[];
  cta: CTAContent;
}

// Re-export new schema types
export type { ConditionV1Content, VitaminInfusionsV1Content, OurTeamV1Content } from './newSchemas';
export { isConditionV1Content, isVitaminInfusionsV1Content, isOurTeamV1Content } from './newSchemas';

import type { ConditionV1Content, VitaminInfusionsV1Content, OurTeamV1Content } from './newSchemas';

// Union type for all content types
export type TemplateContent = 
  | HomeV1Content 
  | KetamineV1Content 
  | SpravatoV1Content 
  | ContactV1Content 
  | FAQV1Content
  | ConditionV1Content
  | VitaminInfusionsV1Content
  | OurTeamV1Content;

// Type guard functions
export function isHomeV1Content(content: unknown): content is HomeV1Content {
  return typeof content === 'object' && content !== null && 'hero' in content && 'about' in content && 'treatments' in content;
}

export function isKetamineV1Content(content: unknown): content is KetamineV1Content {
  return typeof content === 'object' && content !== null && 'hero' in content && 'stats' in content && 'services' in content;
}

export function isSpravatoV1Content(content: unknown): content is SpravatoV1Content {
  return typeof content === 'object' && content !== null && 'hero' in content && 'trd' in content && 'benefits' in content;
}

export function isContactV1Content(content: unknown): content is ContactV1Content {
  return typeof content === 'object' && content !== null && 'hero' in content && 'clinicInfo' in content && 'form' in content;
}

export function isFAQV1Content(content: unknown): content is FAQV1Content {
  return typeof content === 'object' && content !== null && 'hero' in content && 'sections' in content && 'cta' in content;
}

// Default content creators
export function createDefaultHomeContent(): HomeV1Content {
  return {
    hero: {
      subtitle: 'FIND HOPE AND RELIEF TODAY',
      headline: "New Jersey's Premier Ketamine & SPRAVATO® Clinic",
      body: 'Advanced, clinician-led treatments for depression, anxiety, PTSD, and chronic pain.',
      ctaLabel: 'Book Your Free Consultation Today!',
      ctaHref: '#contact',
    },
    about: {
      title: 'A New Standard in Mental Health Care',
      bodyHtml: '<p>At Relaxol Clinic, we believe mental health treatment should be personalized, compassionate, and effective.</p>',
      imageUrl: '',
      imageAlt: 'Modern treatment facility interior',
    },
    video: {
      subtitle: 'LEARN MORE',
      title: 'Treatment Can Help',
      body: 'See how our advanced treatments are helping patients find relief.',
      embedUrl: 'https://www.youtube.com/embed/e0mdOODbGNU',
      embedTitle: 'Treatment Overview',
    },
    treatments: {
      subtitle: 'Our Treatments',
      title: 'Treatment Options',
      description: 'Evidence-based therapies tailored to your needs.',
      items: [],
    },
    doctor: {
      subtitle: 'CLINICAL PSYCHIATRIST',
      name: 'Dr. Khanna',
      imageUrl: '',
      bio: ['Dr. Khanna is a board-certified psychiatrist with expertise in treatment-resistant conditions.'],
    },
    conditions: {
      subtitle: 'WHAT WE TREAT',
      title: 'Conditions We Treat',
      items: [],
    },
    testimonials: {
      subtitle: 'PATIENT STORIES',
      title: 'What Our Patients Say',
      items: [],
    },
    timeline: {
      subtitle: 'YOUR JOURNEY',
      title: 'What to Expect',
      items: [],
    },
    faq: {
      title: 'Frequently Asked Questions',
      items: [],
    },
    contact: {
      subtitle: 'SCHEDULE A CONSULTATION',
      title: 'Ready to Explore Your Treatment Options?',
      body: 'Take the first step toward relief.',
    },
  };
}

export function createDefaultKetamineContent(): KetamineV1Content {
  return {
    hero: {
      headline: 'Ketamine Therapy for Treatment-Resistant Depression',
      body: 'Personalized care for individuals who haven\'t found relief with traditional treatments.',
      ctaLabel: 'Book Consultation',
      ctaHref: '#eligibility',
    },
    stats: {
      items: [
        { value: '470+', label: 'Patients helped' },
        { value: '98%', label: 'Patient satisfaction' },
        { value: '15+', label: 'Years experience' },
        { value: '1000+', label: 'Treatments delivered' },
      ],
    },
    parallax: {
      title: 'Rapid Relief When Traditional Treatments Haven\'t Worked',
      body: 'Ketamine therapy offers a different mechanism of action that can help patients who haven\'t responded to conventional antidepressants.',
      ctaLabel: 'Learn More',
    },
    services: {
      title: 'Our Services',
      description: 'Comprehensive ketamine therapy programs tailored to your needs.',
      items: [],
    },
    eligibility: {
      subtitle: 'Start Your Journey',
      title: 'Take the Next Step Toward Relief',
      body: 'If traditional treatments haven\'t worked, our care team can help.',
      trustBullets: [
        'No obligation assessment',
        'Response within 48 hours',
        'Confidential submission',
        'Insurance verification available',
      ],
      phone: '201-781-2101',
    },
    crossSell: {
      title: 'Also Offering SPRAVATO® Treatment',
      body: 'FDA-approved esketamine therapy for treatment-resistant depression.',
      ctaLabel: 'Learn More About SPRAVATO®',
      ctaHref: '/spravato-Englewood',
    },
    faq: {
      title: 'Safety & Side Effects',
      items: [],
    },
  };
}

export function createDefaultSpravatoContent(): SpravatoV1Content {
  return {
    hero: {
      headline: 'SPRAVATO® Treatment for Depression That Hasn\'t Responded to Medication',
      subtitle: 'FDA-approved esketamine therapy administered in a medically supervised clinic',
      ctaLabel: 'Check Eligibility',
      ctaHref: '#eligibility-form',
    },
    eligibilityForm: {
      title: 'Find Out If You\'re a Candidate',
      body: 'SPRAVATO® is specifically designed for adults with treatment-resistant depression.',
      trustBullets: [
        'No obligation—we simply assess eligibility',
        'Response within 48 hours from our care team',
        'Insurance verification included',
      ],
    },
    trd: {
      title: 'Treatment-Resistant Depression',
      body: 'Depression is not as simple as just "sadness." Fortunately, SPRAVATO® is showing excellent results.',
    },
    benefits: {
      subtitle: 'Why SPRAVATO®',
      title: 'Benefits of SPRAVATO® Treatment',
      items: [],
    },
    whatIs: {
      subtitle: 'About the Treatment',
      title: 'What Is SPRAVATO®?',
      body: 'SPRAVATO® is a prescription nasal spray derived from esketamine and approved by the FDA.',
    },
    timeline: {
      subtitle: 'Your Treatment Journey',
      title: 'How SPRAVATO® Works',
      items: [],
    },
    faq: {
      title: 'SPRAVATO® FAQ',
      items: [],
    },
    contact: {
      subtitle: 'GET STARTED',
      title: 'Check Your SPRAVATO® Eligibility',
      body: 'Take the first step toward relief.',
    },
  };
}

export function createDefaultContactContent(): ContactV1Content {
  return {
    hero: {
      subtitle: 'Get In Touch',
      headline: 'Contact Us',
      body: 'We\'re here to answer your questions and help you begin your journey to wellness.',
    },
    clinicInfo: {
      name: 'Relaxol Clinic',
      address: '560 Sylvan Avenue, Suite 2115\nEnglewood Cliffs, NJ 07632',
      phone: '201-781-2101',
      email: 'info@relaxolclinic.com',
      hours: 'Monday – Friday: 9:00 AM – 5:00 PM\nSaturday – Sunday: Closed',
    },
    form: {
      subtitle: 'SEND US A MESSAGE',
      title: 'Schedule a Consultation',
      body: 'Fill out the form below and we\'ll contact you within one business day.',
    },
  };
}

export function createDefaultFAQContent(): FAQV1Content {
  return {
    hero: {
      headline: 'Frequently Asked Questions',
      body: 'Clear answers about ketamine therapy, SPRAVATO®, safety, and the treatment process.',
    },
    sections: [],
    cta: {
      title: 'Still Have Questions? We\'re Here to Help.',
      body: 'Our team is ready to answer any additional questions.',
      ctaLabel: 'Schedule a Consultation',
      ctaHref: '/contact',
    },
  };
}

import { defaultConditionContent, defaultVitaminInfusionsContent, defaultOurTeamContent } from './newDefaults';

export function createDefaultConditionContent(slug?: string): ConditionV1Content {
  return defaultConditionContent[slug || 'depression'] || defaultConditionContent.depression;
}

export function createDefaultVitaminInfusionsContent(): VitaminInfusionsV1Content {
  return { ...defaultVitaminInfusionsContent };
}

export function createDefaultOurTeamContent(): OurTeamV1Content {
  return { ...defaultOurTeamContent };
}

export function createDefaultContent(template: TemplateType, slug?: string): TemplateContent {
  switch (template) {
    case 'home_v1':
      return createDefaultHomeContent();
    case 'ketamine_v1':
      return createDefaultKetamineContent();
    case 'spravato_v1':
      return createDefaultSpravatoContent();
    case 'contact_v1':
      return createDefaultContactContent();
    case 'faq_v1':
      return createDefaultFAQContent();
    case 'condition_v1':
      return createDefaultConditionContent(slug);
    case 'vitamin_infusions_v1':
      return createDefaultVitaminInfusionsContent();
    case 'our_team_v1':
      return createDefaultOurTeamContent();
  }
}
