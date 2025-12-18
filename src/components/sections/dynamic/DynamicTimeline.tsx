interface TimelineItem {
  step: string;
  title: string;
  description: string;
}

interface TimelineSectionData {
  sectionId: string;
  type: 'timeline';
  subtitle?: string;
  title: string;
  items: TimelineItem[];
}

interface Props {
  data: TimelineSectionData;
}

export function DynamicTimeline({ data }: Props) {
  return (
    <section 
      className="py-20 bg-background"
      data-section-id={data.sectionId}
      data-section-type={data.type}
    >
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          {data.subtitle && (
            <p className="text-primary text-sm font-semibold uppercase tracking-widest mb-3">
              {data.subtitle}
            </p>
          )}
          <h2 className="text-3xl md:text-4xl lg:text-5xl text-foreground font-bold">
            {data.title}
          </h2>
        </div>

        <div className="max-w-4xl mx-auto">
          <div className="relative">
            {/* Vertical line */}
            <div className="absolute left-8 md:left-1/2 transform md:-translate-x-1/2 top-0 bottom-0 w-0.5 bg-primary/20" />
            
            {data.items.map((item, index) => (
              <div
                key={index}
                className={`relative flex items-start gap-8 mb-12 ${
                  index % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'
                }`}
              >
                {/* Step number */}
                <div className="absolute left-8 md:left-1/2 transform -translate-x-1/2 w-16 h-16 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-bold text-xl shadow-lg z-10">
                  {item.step}
                </div>
                
                {/* Content */}
                <div className={`ml-28 md:ml-0 md:w-[calc(50%-4rem)] ${index % 2 === 0 ? 'md:pr-8 md:text-right' : 'md:pl-8'}`}>
                  <div className="bg-card rounded-2xl p-6 shadow-soft">
                    <h3 className="text-xl font-bold text-foreground mb-2">
                      {item.title}
                    </h3>
                    <p className="text-muted-foreground leading-relaxed">
                      {item.description}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
