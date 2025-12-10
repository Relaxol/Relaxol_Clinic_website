const steps = [
  {
    number: 1,
    title: "Consultation",
    description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Initial evaluation.",
  },
  {
    number: 2,
    title: "Insurance Check",
    description: "Sed do eiusmod tempor incididunt ut labore. Verify coverage options.",
  },
  {
    number: 3,
    title: "Treatment",
    description: "Duis aute irure dolor in reprehenderit. Begin personalized care plan.",
  },
  {
    number: 4,
    title: "Follow-Up",
    description: "Excepteur sint occaecat cupidatat non proident. Monitor progress.",
  },
  {
    number: 5,
    title: "Long-Term Care",
    description: "Sunt in culpa qui officia deserunt mollit. Ongoing support and wellness.",
  },
];

export function TimelineSection() {
  return (
    <section className="py-20 bg-background">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="font-serif text-3xl md:text-4xl lg:text-5xl text-foreground font-bold mb-4">
            What to Expect
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Our streamlined process makes getting started simple.
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
                  <h3 className="font-serif text-lg font-bold text-foreground mb-2">
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
