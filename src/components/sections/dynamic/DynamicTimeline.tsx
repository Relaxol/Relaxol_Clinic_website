interface TimelineStep {
  number: number;
  title: string;
  description: string;
}

interface TimelineSectionData {
  sectionId: string;
  type: 'timeline';
  title: string;
  description?: string;
  steps: TimelineStep[];
}

interface Props {
  data: TimelineSectionData;
}

export function DynamicTimeline({ data }: Props) {
  return (
    <section 
      className="py-20 bg-cream-dark"
      data-section-id={data.sectionId}
      data-section-type={data.type}
    >
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl lg:text-5xl text-foreground font-bold mb-4">
            {data.title}
          </h2>
          {data.description && (
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
              {data.description}
            </p>
          )}
        </div>

        {/* Timeline */}
        <div className="relative">
          {/* Connecting Line (Desktop) */}
          <div className="hidden lg:block absolute top-7 left-0 right-0 h-0.5 bg-primary/30" />

          {/* Steps */}
          <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-8">
            {data.steps.map((step, index) => (
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
