

interface MedicalClinicJsonLdProps {
  type?: 'clinic' | 'faq' | 'physician';
  faqItems?: { question: string; answer: string }[];
}

export function JsonLdSchema({ type = 'clinic', faqItems }: MedicalClinicJsonLdProps) {
  const clinicSchema = {
    '@context': 'https://schema.org',
    '@type': 'MedicalClinic',
    name: 'Jersey Serenity Minds',
    description: 'Jersey Serenity Minds offers FDA-approved SPRAVATO® (esketamine), ketamine infusion therapy, and comprehensive psychiatric evaluations for treatment-resistant depression, anxiety, PTSD, OCD, and chronic pain management in Englewood Cliffs, NJ.',
    url: 'https://relaxolclinic.com',
    telephone: '201-781-2101',
    email: 'info@relaxolclinic.com',
    address: {
      '@type': 'PostalAddress',
      streetAddress: '560 Sylvan Avenue, Suite 2115',
      addressLocality: 'Englewood Cliffs',
      addressRegion: 'NJ',
      postalCode: '07632',
      addressCountry: 'US',
    },
    geo: {
      '@type': 'GeoCoordinates',
      latitude: 40.88,
      longitude: -73.95,
    },
    openingHoursSpecification: {
      '@type': 'OpeningHoursSpecification',
      dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'],
      opens: '09:00',
      closes: '17:00',
    },
    medicalSpecialty: [
      'Psychiatry',
      'Pain Medicine',
    ],
    availableService: [
      {
        '@type': 'MedicalTherapy',
        name: 'SPRAVATO® (Esketamine Nasal Spray)',
        description: 'FDA-approved nasal spray for treatment-resistant depression.',
      },
      {
        '@type': 'MedicalTherapy',
        name: 'Ketamine Infusion Therapy',
        description: 'IV ketamine therapy for depression, anxiety, PTSD, OCD, and chronic pain.',
      },
      {
        '@type': 'MedicalTherapy',
        name: 'Comprehensive Psychiatric Evaluation',
        description: 'Individualized, evidence-based psychiatric evaluations for personalized treatment planning.',
      },
    ],
    sameAs: [],
  };

  const physicianSchema = {
    '@context': 'https://schema.org',
    '@type': 'Physician',
    name: 'Dr. Sangeet Khanna',
    jobTitle: 'Medical Director',
    medicalSpecialty: 'Psychiatry',
    worksFor: {
      '@type': 'MedicalClinic',
      name: 'Jersey Serenity Minds',
    },
    address: clinicSchema.address,
  };

  const faqSchema = faqItems?.length ? {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqItems.map((item) => ({
      '@type': 'Question',
      name: item.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: item.answer,
      },
    })),
  } : null;

  const getSchema = () => {
    switch (type) {
      case 'clinic':
        return clinicSchema;
      case 'physician':
        return physicianSchema;
      case 'faq':
        return faqSchema;
      default:
        return clinicSchema;
    }
  };

  const schema = getSchema();
  if (!schema) return null;

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}
