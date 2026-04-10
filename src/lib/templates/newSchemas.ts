// Template schemas for condition, vitamin infusions, and our team pages

// Condition Page Schema (shared by all 5 condition pages)
export interface ConditionV1Content {
  hero: {
    subtitle?: string;
    headline: string;
    body: string;
    ctaLabel?: string;
    ctaHref?: string;
    imageUrl?: string;
    imageAlt?: string;
  };
  content: {
    title: string;
    paragraphs: string[];
    subsections: {
      title: string;
      body?: string;
      bullets?: string[];
    }[];
  };
  cta: {
    label: string;
    href: string;
  };
}

// Vitamin Infusions Page Schema
export interface VitaminInfusionsV1Content {
  hero: {
    badge?: string;
    headline: string;
    body: string;
    ctaLabel?: string;
    ctaHref?: string;
    backgroundImageUrl?: string;
  };
  about: {
    subtitle?: string;
    title: string;
    paragraphs: string[];
    benefits: string[];
  };
  infusions: {
    title: string;
    items: {
      title: string;
      description: string;
      fullDescription: string;
      imageUrl?: string;
      benefits: string[];
      ingredients: string;
      duration: string;
    }[];
  };
  b12: {
    title: string;
    paragraphs: string[];
    imageUrl?: string;
    imageAlt?: string;
    modalDescription: string;
    modalBenefits: string[];
  };
  nad: {
    title: string;
    paragraphs: string[];
    imageUrl?: string;
    imageAlt?: string;
    modalDescription: string;
    modalSubDescription?: string;
    modalBenefits: string[];
  };
  contact: {
    title: string;
    body: string;
    phone: string;
    email: string;
    address: string;
  };
}

// Our Team Page Schema
export interface OurTeamV1Content {
  hero: {
    subtitle?: string;
    headline: string;
    body: string;
  };
  doctor: {
    subtitle?: string;
    name: string;
    imageUrl?: string;
    imageAlt?: string;
    bio: string[];
    credentials: { icon: string; label: string }[];
  };
  doctor2?: {
    subtitle?: string;
    name: string;
    imageUrl?: string;
    imageAlt?: string;
    bio: string[];
    credentials: { icon: string; label: string }[];
  };
  cta: {
    title: string;
    body: string;
    ctaLabel: string;
    ctaHref: string;
  };
}

// Evaluations Page Schema
export interface EvaluationsV1Content {
  hero: {
    subtitle?: string;
    headline: string;
  };
  content: {
    paragraphs: string[];
    prioritiesTitle: string;
    priorities: string[];
    closingParagraph: string;
    disclaimer?: string;
  };
  cta: {
    title: string;
    body: string;
    ctaLabel: string;
    ctaHref: string;
  };
}

export function isEvaluationsV1Content(content: unknown): content is EvaluationsV1Content {
  return typeof content === 'object' && content !== null && 'hero' in content && 'content' in content &&
    typeof (content as any).content === 'object' && 'priorities' in (content as any).content;
}

// Type guards
export function isConditionV1Content(content: unknown): content is ConditionV1Content {
  return typeof content === 'object' && content !== null && 'hero' in content && 'content' in content && 'cta' in content &&
    typeof (content as any).content === 'object' && 'paragraphs' in (content as any).content;
}

export function isVitaminInfusionsV1Content(content: unknown): content is VitaminInfusionsV1Content {
  return typeof content === 'object' && content !== null && 'hero' in content && 'infusions' in content && 'b12' in content;
}

export function isOurTeamV1Content(content: unknown): content is OurTeamV1Content {
  return typeof content === 'object' && content !== null && 'hero' in content && 'doctor' in content &&
    typeof (content as any).doctor === 'object' && 'credentials' in (content as any).doctor;
}
