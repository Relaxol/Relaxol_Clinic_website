const defaultSteps = [
  {
    number: 1,
    title: "Consultation",
    description: "During your initial consultation, we'll review your medical history, discuss your symptoms, and determine whether ketamine or SPRAVATO® therapy is right for you.",
  },
  {
    number: 2,
    title: "Insurance Check",
    description: "Our team will verify your insurance coverage for SPRAVATO® (which is often covered) and explain any out-of-pocket costs for ketamine infusions.",
  },
  {
    number: 3,
    title: "Treatment",
    description: "You'll receive your treatment in a private, comfortable room under the supervision of our clinical staff. Sessions typically last 1–2 hours depending on the therapy.",
  },
  {
    number: 4,
    title: "Follow-Up",
    description: "After your session, we'll check in to monitor your response and adjust your care plan as needed. Follow-up appointments can often be done via telehealth.",
  },
  {
    number: 5,
    title: "Long-Term Care",
    description: "Mental health is a journey. We offer ongoing support, including maintenance treatments and psychiatric follow-ups, to help you sustain your progress over time.",
  },
];

interface TimelineItem {
  step?: string;
  number?: number;
  title: string;
  description: string;
}

interface TimelineContent {
  subtitle?: string;
  title?: string;
  description?: string;
  items?: TimelineItem[];
}

interface TimelineSectionProps {
  content?: TimelineContent;
}

export function TimelineSection({ content }: TimelineSectionProps) {
  const title = content?.title || "What to Expect";
  const description = content?.description || "From your first consultation to long-term wellness, here's how we guide you through treatment.";
  
  const steps = content?.items?.length ? content.items.map((item, index) => ({
    number: item.number ?? parseInt(item.step || String(index + 1)),
    title: item.title,
    description: item.description,
  })) : defaultSteps;

  return (
    <section className="py-20 bg-background">
      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 xl:px-16">
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl lg:text-5xl text-foreground font-bold mb-4">
            {title}
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            {description}
          </p>
        </div>

        {/* Timeline */}
        <div className="relative">
          {/* Connecting Line (Desktop) */}
          <div className="hidden lg:block absolute top-7 left-0 right-0 h-0.5 bg-primary/30" />

          {/* Steps - dynamically adjust columns based on item count */}
          <div className={`grid grid-cols-1 md:grid-cols-2 gap-8 ${
            steps.length === 4 ? 'lg:grid-cols-4' : 
            steps.length === 5 ? 'lg:grid-cols-5' : 
            steps.length === 3 ? 'lg:grid-cols-3' : 'lg:grid-cols-4'
          }`}>
            {steps.map((step, index) => (
              <div key={index} className="timeline-step flex flex-col">
                {/* Number Circle */}
                <div className="timeline-circle mb-6 relative flex-shrink-0">
                  {step.number}
                </div>

                {/* Content Card */}
                <div className="bg-white rounded-2xl shadow-soft p-6 text-center flex-1 flex flex-col">
                  <h3 className="text-lg font-bold text-foreground mb-2">
                    {step.title}
                  </h3>
                  <p className="text-muted-foreground text-sm leading-relaxed flex-1">
                    {step.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
