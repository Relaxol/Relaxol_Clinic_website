const steps = [
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

export function TimelineSection() {
  return (
    <section className="py-20 bg-background">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl lg:text-5xl text-foreground font-bold mb-4">
            What to Expect
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            From your first consultation to long-term wellness, here's how we guide you through treatment.
          </p>
        </div>

        {/* Timeline */}
        <div className="relative">
          {/* Connecting Line (Desktop) */}
          <div className="hidden lg:block absolute top-7 left-0 right-0 h-0.5 bg-primary/30" />

          {/* Steps */}
          <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-8">
            {steps.map((step, index) => (
              <div key={index} className="timeline-step">
                {/* Number Circle */}
                <div className="timeline-circle mb-6 relative">
                  {step.number}
                </div>

                {/* Content Card */}
                <div className="bg-white rounded-2xl shadow-soft p-6 text-center">
                  <h3 className="text-lg font-bold text-foreground mb-2">
                    {step.title}
                  </h3>
                  <p className="text-muted-foreground text-sm leading-relaxed">
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
