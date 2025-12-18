// Section Registry - Maps section types to their configuration
// Each section type has a render function and default data shape

export interface SectionData {
  sectionId: string;
  type: string;
  [key: string]: unknown;
}

export interface TextSectionData extends SectionData {
  type: 'text';
  title?: string;
  body: string;
}

export interface ImageLeftSectionData extends SectionData {
  type: 'imageLeft';
  title?: string;
  body: string;
  image: { url: string; alt: string };
}

export interface ImageRightSectionData extends SectionData {
  type: 'imageRight';
  title?: string;
  body: string;
  image: { url: string; alt: string };
}

export interface FAQSectionData extends SectionData {
  type: 'faq';
  title?: string;
  faq_items: { question: string; answer: string }[];
}

export interface CTASectionData extends SectionData {
  type: 'cta';
  title?: string;
  body?: string;
  cta: { label: string; href: string };
}

export interface StatsSectionData extends SectionData {
  type: 'stats';
  title?: string;
  stats_items: { label: string; value: string }[];
}

export interface HeroSectionData extends SectionData {
  type: 'hero';
  subtitle?: string;
  headline: string;
  body?: string;
  cta?: { label: string; href: string };
  backgroundImage?: string;
}

export interface TreatmentsSectionData extends SectionData {
  type: 'treatments';
  title?: string;
  subtitle?: string;
  items: {
    title: string;
    description: string;
    image: string;
    tag?: string;
    href: string;
  }[];
}

export interface TestimonialsSectionData extends SectionData {
  type: 'testimonials';
  title?: string;
  items: {
    quote: string;
    author: string;
    role?: string;
  }[];
}

export interface DoctorSectionData extends SectionData {
  type: 'doctor';
  name: string;
  title: string;
  bio: string[];
  image: string;
  credentials: { icon: string; label: string }[];
}

export interface ContactSectionData extends SectionData {
  type: 'contact';
  subtitle?: string;
  title: string;
  body?: string;
}

export interface ConditionsSectionData extends SectionData {
  type: 'conditions';
  subtitle?: string;
  title: string;
  items: {
    title: string;
    description: string;
    image: string;
    href: string;
  }[];
}

export interface VideoSectionData extends SectionData {
  type: 'video';
  subtitle?: string;
  title: string;
  body?: string;
  videoUrl: string;
  videoTitle?: string;
}

// Union type of all section data
export type AnySectionData =
  | TextSectionData
  | ImageLeftSectionData
  | ImageRightSectionData
  | FAQSectionData
  | CTASectionData
  | StatsSectionData
  | HeroSectionData
  | TreatmentsSectionData
  | TestimonialsSectionData
  | DoctorSectionData
  | ContactSectionData
  | ConditionsSectionData
  | VideoSectionData;

// All supported section types
export const SECTION_TYPES = [
  'hero',
  'text',
  'imageLeft',
  'imageRight',
  'faq',
  'cta',
  'stats',
  'treatments',
  'testimonials',
  'doctor',
  'contact',
  'conditions',
  'video',
] as const;

export type SectionType = typeof SECTION_TYPES[number];

// Generate a new section with defaults
export function createDefaultSection(type: SectionType): AnySectionData {
  const sectionId = crypto.randomUUID();
  
  switch (type) {
    case 'hero':
      return {
        sectionId,
        type: 'hero',
        subtitle: 'Subtitle',
        headline: 'Your Headline Here',
        body: 'Supporting text for the hero section.',
        cta: { label: 'Get Started', href: '#contact' },
      };
    case 'text':
      return {
        sectionId,
        type: 'text',
        title: 'Section Title',
        body: 'Enter your content here...',
      };
    case 'imageLeft':
    case 'imageRight':
      return {
        sectionId,
        type,
        title: 'Section Title',
        body: 'Enter your content here...',
        image: { url: '', alt: '' },
      };
    case 'faq':
      return {
        sectionId,
        type: 'faq',
        title: 'Frequently Asked Questions',
        faq_items: [{ question: 'Question?', answer: 'Answer.' }],
      };
    case 'cta':
      return {
        sectionId,
        type: 'cta',
        title: 'Call to Action',
        body: 'Supporting text',
        cta: { label: 'Click Here', href: '#' },
      };
    case 'stats':
      return {
        sectionId,
        type: 'stats',
        title: 'Our Impact',
        stats_items: [{ label: 'Patients', value: '1000+' }],
      };
    case 'treatments':
      return {
        sectionId,
        type: 'treatments',
        title: 'Our Treatments',
        subtitle: 'Treatment Options',
        items: [],
      };
    case 'testimonials':
      return {
        sectionId,
        type: 'testimonials',
        title: 'What Our Patients Say',
        items: [],
      };
    case 'doctor':
      return {
        sectionId,
        type: 'doctor',
        name: 'Dr. Name',
        title: 'Specialist',
        bio: ['Bio paragraph here.'],
        image: '',
        credentials: [],
      };
    case 'contact':
      return {
        sectionId,
        type: 'contact',
        subtitle: 'Get in Touch',
        title: 'Contact Us',
        body: 'We\'d love to hear from you.',
      };
    case 'conditions':
      return {
        sectionId,
        type: 'conditions',
        subtitle: 'What We Treat',
        title: 'Conditions We Treat',
        items: [],
      };
    case 'video':
      return {
        sectionId,
        type: 'video',
        subtitle: 'Learn More',
        title: 'Video Section',
        videoUrl: '',
      };
    default:
      return {
        sectionId,
        type: 'text',
        body: '',
      };
  }
}
