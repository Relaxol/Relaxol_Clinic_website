// Default content for condition, vitamin infusions, and our team templates

import {
  ConditionV1Content,
  VitaminInfusionsV1Content,
  OurTeamV1Content,
} from "./newSchemas";

// ── Condition defaults (keyed by slug suffix) ────────────────────────

export const defaultConditionContent: Record<string, ConditionV1Content> = {
  depression: {
    hero: {
      subtitle: "CONDITIONS WE TREAT",
      headline: "Depression Treatment",
      body: "When traditional antidepressants fall short, ketamine and SPRAVATO® offer a new path forward. These breakthrough treatments work differently—often producing relief within hours or days rather than weeks.",
      ctaLabel: "Schedule a Consultation",
      ctaHref: "/contact",
      imageUrl: "",
      imageAlt: "Person finding relief from depression",
    },
    content: {
      title: "Understanding Treatment-Resistant Depression",
      paragraphs: [
        "Treatment-resistant depression (TRD) affects millions of people who haven't found relief through traditional antidepressants. If you've tried multiple medications without success, you're not alone—and there is hope.",
        "At Relaxol Clinic, we specialize in advanced treatments specifically designed for patients like you. Ketamine and SPRAVATO® work through different mechanisms than traditional antidepressants, targeting the brain's glutamate system to create rapid, meaningful improvement.",
      ],
      subsections: [
        {
          title: "How Ketamine Helps Depression",
          body: "Unlike traditional antidepressants that can take weeks to work, ketamine often produces noticeable improvements within hours to days. This rapid onset can be life-changing for those who have struggled for years.",
        },
        {
          title: "Who Is a Candidate?",
          bullets: [
            "Adults with major depressive disorder who haven't responded to at least two antidepressants",
            "Those experiencing severe depression with suicidal ideation",
            "Patients seeking faster relief than traditional medications provide",
          ],
        },
      ],
    },
    cta: { label: "Contact Us to Learn More", href: "/contact" },
  },
  anxiety: {
    hero: {
      subtitle: "CONDITIONS WE TREAT",
      headline: "Anxiety Treatment",
      body: "Persistent anxiety can feel all-consuming, affecting your ability to work, sleep, and enjoy life. Our clinic offers treatments that target the brain's glutamate system, potentially offering rapid relief for those who haven't responded to conventional therapies.",
      ctaLabel: "Schedule a Consultation",
      ctaHref: "/contact",
      imageUrl: "",
      imageAlt: "Person practicing calm breathing",
    },
    content: {
      title: "Breaking Free from Chronic Anxiety",
      paragraphs: [
        "Generalized anxiety disorder, panic disorder, and social anxiety can significantly impact your quality of life. When traditional treatments like SSRIs and therapy haven't provided adequate relief, ketamine therapy offers a new approach.",
        "At Relaxol Clinic, we understand the exhausting cycle of anxiety. Our treatments work on different neural pathways than conventional medications, offering hope for rapid and sustained relief.",
      ],
      subsections: [
        {
          title: "How Ketamine Helps Anxiety",
          body: 'Ketamine works by modulating glutamate, the brain\'s most abundant neurotransmitter. This mechanism can help "reset" overactive anxiety circuits, often providing relief within hours rather than weeks.',
        },
        {
          title: "Who Is a Candidate?",
          bullets: [
            "Adults with generalized anxiety disorder resistant to traditional treatments",
            "Those with panic disorder or social anxiety affecting daily function",
            "Patients seeking faster relief from debilitating anxiety symptoms",
          ],
        },
      ],
    },
    cta: { label: "Contact Us to Learn More", href: "/contact" },
  },
  ptsd: {
    hero: {
      subtitle: "CONDITIONS WE TREAT",
      headline: "PTSD Treatment",
      body: "Trauma can leave lasting imprints on the mind and body. Ketamine therapy has shown remarkable promise in helping patients process traumatic memories and reduce the intensity of PTSD symptoms in a safe, supportive environment.",
      ctaLabel: "Schedule a Consultation",
      ctaHref: "/contact",
      imageUrl: "",
      imageAlt: "Veteran finding peace during therapy",
    },
    content: {
      title: "Healing from Trauma",
      paragraphs: [
        "Post-traumatic stress disorder affects veterans, first responders, survivors of abuse, accidents, and anyone who has experienced severe trauma. Traditional treatments don't work for everyone, and that's where ketamine therapy can make a difference.",
        "At Relaxol Clinic, we create a safe, compassionate space for your healing journey. Our clinicians specialize in trauma-informed care, ensuring you feel supported throughout your treatment.",
      ],
      subsections: [
        {
          title: "How Ketamine Helps PTSD",
          body: "Research shows ketamine can help reduce the emotional intensity of traumatic memories and decrease hypervigilance. By promoting neuroplasticity, it may help the brain form new, healthier neural pathways.",
        },
        {
          title: "Who Is a Candidate?",
          bullets: [
            "Veterans and active military personnel with combat-related PTSD",
            "Survivors of trauma who haven't responded to traditional therapies",
            "Those experiencing flashbacks, nightmares, or severe anxiety related to past trauma",
          ],
        },
      ],
    },
    cta: { label: "Contact Us to Learn More", href: "/contact" },
  },
  ocd: {
    hero: {
      subtitle: "CONDITIONS WE TREAT",
      headline: "OCD Treatment",
      body: "Obsessive-compulsive disorder can be exhausting and isolating. For patients who haven't found relief through traditional treatments, ketamine-based therapies may help interrupt the cycle of intrusive thoughts and compulsive behaviors.",
      ctaLabel: "Schedule a Consultation",
      ctaHref: "/contact",
      imageUrl: "",
      imageAlt: "Person experiencing quiet focus and mental clarity",
    },
    content: {
      title: "Finding Freedom from OCD",
      paragraphs: [
        'OCD goes far beyond being "neat" or organized. The relentless intrusive thoughts and compulsive rituals can consume hours of each day, affecting work, relationships, and quality of life. When SSRIs and exposure therapy aren\'t enough, ketamine offers new hope.',
        "At Relaxol Clinic, we understand the unique challenges of OCD. Our treatments target different neural pathways than traditional medications, potentially offering relief for treatment-resistant cases.",
      ],
      subsections: [
        {
          title: "How Ketamine Helps OCD",
          body: "Ketamine works on the glutamate system, which plays a key role in OCD. Research suggests it can help reduce the intensity of obsessions and the urge to perform compulsions, often with rapid results.",
        },
        {
          title: "Who Is a Candidate?",
          bullets: [
            "Adults with OCD who haven't responded adequately to SSRIs",
            "Those whose OCD significantly impacts daily functioning",
            "Patients looking for faster relief from severe OCD symptoms",
          ],
        },
      ],
    },
    cta: { label: "Contact Us to Learn More", href: "/contact" },
  },
  "pain-management": {
    hero: {
      subtitle: "CONDITIONS WE TREAT",
      headline: "Pain Management",
      body: "Chronic pain can be debilitating and significantly impact your quality of life. When traditional pain treatments haven't provided lasting relief, ketamine infusion therapy offers a promising alternative for managing various chronic pain conditions.",
      ctaLabel: "Schedule a Consultation",
      ctaHref: "/contact",
      imageUrl: "",
      imageAlt: "Person experiencing relief from chronic pain",
    },
    content: {
      title: "Advanced Pain Management Solutions",
      paragraphs: [
        "Living with chronic pain affects every aspect of life—from work and relationships to sleep and mental health. At Relaxol Clinic, we offer innovative ketamine-based treatments that target pain through different mechanisms than traditional pain medications.",
        "Ketamine infusion therapy has shown remarkable results for patients with various chronic pain conditions, including those who have not found relief through conventional treatments.",
      ],
      subsections: [
        {
          title: "How Ketamine Helps with Pain",
          body: 'Unlike opioids and other traditional pain medications, ketamine works on the NMDA receptors in the brain. This unique mechanism can help "reset" pain pathways, providing relief that often lasts well beyond the treatment session.',
        },
        {
          title: "Conditions We Treat",
          bullets: [
            "Complex Regional Pain Syndrome (CRPS)",
            "Fibromyalgia",
            "Neuropathic pain",
            "Chronic migraines and headaches",
            "Failed back surgery syndrome",
            "Phantom limb pain",
          ],
        },
        {
          title: "Who Is a Candidate?",
          bullets: [
            "Adults with chronic pain lasting more than 3 months",
            "Those who haven't responded adequately to conventional pain treatments",
            "Patients looking to reduce dependence on opioid medications",
            "Individuals with pain conditions that have a neuropathic component",
          ],
        },
      ],
    },
    cta: { label: "Contact Us to Learn More", href: "/contact" },
  },
};

// ── Vitamin Infusions defaults ───────────────────────────────────────

export const defaultVitaminInfusionsContent: VitaminInfusionsV1Content = {
  hero: {
    badge: "IV Vitamin Therapy",
    headline: "Vitamin Infusion Therapy",
    body: "Experience the power of IV vitamin therapy at Relaxol Clinic in Englewood Cliffs, NJ. Our customized infusions deliver essential nutrients directly to your bloodstream for maximum absorption and immediate benefits.",
    ctaLabel: "Schedule Consultation",
    ctaHref: "/contact",
  },
  about: {
    subtitle: "About the Treatment",
    title: "What Is IV Vitamin Therapy?",
    paragraphs: [
      "IV Vitamin Therapy delivers vitamins, minerals, and other vital nutrients directly into your bloodstream, bypassing the digestive system for 100% absorption. This method allows your body to receive higher concentrations of nutrients than would be possible through oral supplements.",
      "At Relaxol Clinic, our medical team customizes each infusion to address your specific health goals—whether you're seeking increased energy, immune support, enhanced mental clarity, or overall wellness optimization.",
    ],
    benefits: [
      "100% absorption directly into bloodstream",
      "Immediate effects within minutes",
      "Customized formulations for your needs",
      "Administered by licensed medical professionals",
      "Comfortable, relaxing treatment environment",
      "No downtime - return to activities immediately",
    ],
  },
  infusions: {
    title: "Vitamin Infusions We Offer",
    items: [
      {
        title: "Vital Energy",
        description:
          "Our Vital Energy infusion supports fat metabolism and boosts energy.",
        fullDescription:
          "The Vital Energy IV infusion is formulated to kickstart your metabolism and enhance your energy levels. This blend of B vitamins and amino acids helps your body convert food into energy more efficiently, supporting weight management and athletic performance.",
        benefits: [
          "Boosts metabolism",
          "Increases energy levels",
          "Supports fat burning",
          "Enhances athletic performance",
          "Reduces fatigue",
        ],
        ingredients:
          "B-Complex Vitamins, Vitamin B12, L-Carnitine, MIC (Methionine, Inositol, Choline)",
        duration: "30-45 minutes",
      },
      {
        title: "Hydration Reset",
        description:
          "Reset hydration levels and replenish essential vitamins with our Hydration Reset infusion.",
        fullDescription:
          "Our Hydration Reset IV infusion is designed to combat dehydration and restore your body's essential vitamins and minerals. Whether you're recovering from illness, jet lag, or simply feeling run down, this hydrating therapy delivers fluids and nutrients directly to your bloodstream for immediate relief.",
        benefits: [
          "Rapid rehydration",
          "Restores electrolyte balance",
          "Relieves fatigue and headaches",
          "Improves skin hydration",
          "Supports kidney function",
        ],
        ingredients:
          "Normal Saline, B-Complex Vitamins, Vitamin B12, Vitamin C, Magnesium",
        duration: "30-45 minutes",
      },
      {
        title: "Endurance Support",
        description:
          "Replenish nutrients and support recovery with our Endurance Support infusion.",
        fullDescription:
          "Designed for athletes and active individuals, our Endurance Support IV infusion helps replenish nutrients lost during intense physical activity. This powerful blend supports muscle recovery, reduces inflammation, and helps you get back to peak performance faster.",
        benefits: [
          "Accelerates muscle recovery",
          "Reduces inflammation",
          "Replenishes electrolytes",
          "Reduces muscle soreness",
          "Enhances endurance",
        ],
        ingredients:
          "Normal Saline, B-Complex, Vitamin C, Glutathione, Magnesium, Zinc, Amino Acids",
        duration: "45-60 minutes",
      },
      {
        title: "Immune Reset",
        description:
          "Boost your body's defenses with our Immune Support infusion.",
        fullDescription:
          "Our Immune Reset IV infusion delivers a powerful dose of immune-boosting vitamins and antioxidants directly to your bloodstream. High-dose Vitamin C, Zinc, and other essential nutrients help strengthen your body's natural defenses against illness and infection.",
        benefits: [
          "Strengthens immune system",
          "High-dose Vitamin C therapy",
          "Protects against infections",
          "Reduces cold and flu duration",
          "Powerful antioxidant support",
        ],
        ingredients:
          "High-Dose Vitamin C, Zinc, B-Complex, Vitamin D, Glutathione",
        duration: "45-60 minutes",
      },
      {
        title: "Radiance",
        description:
          "Minimizes wrinkles while replenishing and refreshing skin.",
        fullDescription:
          "Our Radiance IV infusion delivers a powerful blend of antioxidants and skin-nourishing vitamins that work from the inside out. Glutathione, Biotin, and Vitamin C help reduce the appearance of fine lines, brighten skin tone, and promote healthy hair and nails.",
        benefits: [
          "Reduces fine lines and wrinkles",
          "Brightens and evens skin tone",
          "Strengthens hair and nails",
          "Powerful antioxidant detox",
          "Promotes collagen production",
        ],
        ingredients: "Glutathione, Vitamin C, Biotin, B-Complex, Zinc",
        duration: "45-60 minutes",
      },
      {
        title: "Digestive Support",
        description:
          "Eases abdominal discomfort and promotes digestive wellness.",
        fullDescription:
          "The Digestive Support IV infusion is specially formulated to help reduce abdominal discomfort, bloating, and symptoms associated with PMS or digestive issues. This soothing blend of vitamins and minerals helps relax muscles and reduce inflammation for lasting relief.",
        benefits: [
          "Reduces bloating and cramping",
          "Relieves PMS symptoms",
          "Relaxes muscle tension",
          "Reduces inflammation",
          "Promotes digestive comfort",
        ],
        ingredients:
          "Calcium, Magnesium, B-Complex, Vitamin B12, Anti-inflammatory compounds",
        duration: "30-45 minutes",
      },
    ],
  },
  b12: {
    title: "Vitamin B12 Injections",
    paragraphs: [
      "Vitamin B12 supports natural energy, healthy metabolism, and overall vitality. It plays an important role in red blood cell production, nerve health, and helping the body turn food into usable energy.",
      "B12 injections deliver this essential vitamin directly into the muscle, allowing for better absorption and helping support energy levels, mental clarity, and physical wellness.",
      "Low B12 levels are common, especially for those following vegetarian or vegan lifestyles, and supplementation can help restore balance and support day-to-day wellbeing.",
    ],
    imageAlt: "Vitamin B12 Injection",
    modalDescription:
      "Vitamin B12 is essential for energy, brain function, and overall health, but your body needs a protein called intrinsic factor, produced in the stomach, to absorb it properly. If your body doesn't produce enough, a deficiency can occur. Intramuscular B12 injections are an effective way to restore healthy B12 levels and support your wellbeing.",
    modalBenefits: [
      "Boosts energy levels",
      "Supports brain function and concentration",
      "Improves metabolism",
      "Helps prevent anemia",
      "Supports mood and may relieve depression",
      "Strengthens immunity",
      "Promotes bone health and reduces risk of osteoporosis",
      "Enhances heart health",
      "Improves sleep quality",
      "Supports healthy hair, skin, and nails",
      "Reduces hair loss",
      "Supports red blood cell formation",
    ],
  },
  nad: {
    title: "NAD & NAD+ Infusions",
    paragraphs: [
      "Nicotinamide adenine dinucleotide (NAD+) is a naturally occurring coenzyme found in nearly every cell of the body. It plays a vital role in cellular energy production, metabolism, and overall cellular health.",
      "NAD+ supports healthy aging, mental clarity, athletic performance, and the body's natural repair processes. It is widely used in wellness and functional medicine to help promote balance, resilience, and recovery at a cellular level.",
      "Delivering NAD+ through an IV infusion allows for faster absorption and more efficient results compared to oral supplementation, helping optimize NAD+ levels and support whole-body vitality.",
    ],
    imageAlt: "NAD+ IV Infusion",
    modalDescription:
      'NAD+ is a vital molecule our bodies naturally produce, but like many things, its levels decline with age. Often called a "miracle molecule," NAD+ is known for supporting healthy aging and is considered one of the closest things we have to a "fountain of youth."',
    modalSubDescription:
      "When administered intravenously, NAD+ helps activate enzymes called sirtuins, which support your body's natural repair processes, promote overall wellness, and help reduce the effects of aging.",
    modalBenefits: [
      "Pain alleviation",
      "Anti-aging benefits",
      "Increased energy",
      "Increased metabolism",
      "Reduced inflammation",
      "Prevent and correct DNA damage",
      "Alleviate opiate or substance withdrawal symptoms",
    ],
  },
  contact: {
    title: "Ready to Feel Your Best?",
    body: "Schedule a consultation to discuss which vitamin infusion is right for you. Our medical team will create a personalized treatment plan based on your health goals.",
    phone: "201-781-2101",
    email: "info@relaxolclinic.com",
    address: "560 Sylvan Avenue, Suite 2115\nEnglewood Cliffs, NJ 07632",
  },
};

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
  cta: {
    title: "Ready to Start Your Journey?",
    body: "Schedule a consultation with Dr. Khanna and take the first step toward mental wellness.",
    ctaLabel: "Schedule Your Consultation",
    ctaHref: "/contact",
  },
};
