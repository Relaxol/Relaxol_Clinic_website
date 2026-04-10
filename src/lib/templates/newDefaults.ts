// Default content for our team template

import { OurTeamV1Content } from "./newSchemas";

// ── Our Team defaults ────────────────────────────────────────────────

export const defaultOurTeamContent: OurTeamV1Content = {
  hero: {
    subtitle: "MEET OUR EXPERTS",
    headline: "Our Team",
    body: "Compassionate care from experienced psychiatric professionals dedicated to your mental wellness.",
  },
  doctor: {
    subtitle: "CLINICAL PSYCHIATRIST",
    name: "Dr. Khanna",
    imageAlt: "Dr. Khanna, Clinical Psychiatrist",
    bio: [
      "Relaxol is founded by the esteemed Dr. Khanna, a leading specialist in Ketamine Therapy. Dr. Khanna and his compassionate team are dedicated to guiding you on your journey to optimal health.",
      "Dr. Khanna is not just a psychiatrist; he's a guide for those navigating the complex landscape of mental health. With years of experience and a deep commitment to patient care, Dr. Khanna brings expertise and empathy to every consultation.",
    ],
    credentials: [
      { icon: "Award", label: "Board Certified" },
      { icon: "Clock", label: "15+ Years Experience" },
      { icon: "GraduationCap", label: "Fellowship Trained" },
    ],
  },
  doctor2: {
    subtitle: "CLINICAL PSYCHIATRIST",
    name: "Dr. [Last Name]",
    imageAlt: "Dr. [Last Name], Clinical Psychiatrist",
    bio: [
      "Dr. [Last Name] is a dedicated psychiatrist bringing expertise in mental health treatment and patient-centered care to the Relaxol Clinic team.",
      "With a focus on innovative therapeutic approaches, Dr. [Last Name] works closely with patients to develop personalized treatment plans that address their unique needs.",
    ],
    credentials: [
      { icon: "Award", label: "Board Certified" },
      { icon: "Clock", label: "10+ Years Experience" },
      { icon: "GraduationCap", label: "Fellowship Trained" },
    ],
  },
  cta: {
    title: "Ready to Start Your Journey?",
    body: "Schedule a consultation with our team and take the first step toward mental wellness.",
    ctaLabel: "Schedule Your Consultation",
    ctaHref: "/contact",
  },
};
