import { ArrowRight } from "lucide-react";

interface TreatmentItem {
  title: string;
  description: string;
  image: string;
  tag?: string;
  href: string;
  cta: string;
}

interface TreatmentsSectionData {
  sectionId: string;
  type: 'treatments';
  subtitle?: string;
  title: string;
  description?: string;
  items: TreatmentItem[];
}

interface Props {
  data: TreatmentsSectionData;
}

export function DynamicTreatments({ data }: Props) {
  return (
    <section 
      id="treatments" 
      className="relative py-28 md:py-36 overflow-hidden"
      data-section-id={data.sectionId}
      data-section-type={data.type}
    >
      <div className="absolute inset-0 bg-gradient-to-b from-cream via-cream-dark/40 to-cream" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-primary/5 via-transparent to-transparent" />
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center mb-20 md:mb-24">
          {data.subtitle && (
            <p className="text-primary text-sm font-semibold uppercase tracking-[0.3em] mb-5">
              {data.subtitle}
            </p>
          )}
          <h2 className="text-4xl md:text-5xl lg:text-6xl text-foreground font-bold mb-8 leading-[1.1]">
            {data.title}
          </h2>
          <div className="w-20 h-0.5 bg-primary/60 mx-auto mb-8" />
          {data.description && (
            <p className="text-muted-foreground text-lg md:text-xl max-w-2xl mx-auto leading-relaxed">
              {data.description}
            </p>
          )}
        </div>

        <div className="grid md:grid-cols-2 xl:grid-cols-4 gap-8 md:gap-10 max-w-7xl mx-auto">
          {data.items.map((treatment, index) => (
            <div
              key={index}
              className="group relative bg-card rounded-2xl overflow-hidden transition-all duration-700 ease-out flex flex-col"
              style={{ boxShadow: '0 4px 40px rgba(0, 0, 0, 0.06)' }}
            >
              <div className="absolute inset-0 rounded-2xl transition-shadow duration-500 group-hover:shadow-[0_20px_60px_rgba(0,0,0,0.12)]" />
              
              <div className="relative h-64 md:h-72 overflow-hidden">
                <img
                  src={treatment.image}
                  alt={treatment.title}
                  className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-700 ease-out"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-card via-transparent to-transparent opacity-60" />
                
                {treatment.tag && (
                  <span className="absolute top-6 left-6 px-4 py-2 bg-primary text-primary-foreground text-xs font-bold uppercase tracking-wider rounded-full shadow-md">
                    {treatment.tag}
                  </span>
                )}
              </div>

              <div className="relative p-8 md:p-10 bg-card flex flex-col h-full min-h-[280px]">
                <h3 className="text-xl md:text-2xl font-bold text-foreground mb-5 leading-tight min-h-[5.5rem] md:min-h-[6rem]">
                  {treatment.title}
                </h3>
                
                <p className="text-muted-foreground text-base md:text-lg leading-relaxed flex-grow">
                  {treatment.description}
                </p>
                
                <a
                  href={treatment.href}
                  className="inline-flex items-center gap-2 text-primary font-semibold text-base hover:gap-3 transition-all duration-300 group/link mt-8"
                >
                  <span>{treatment.cta}</span>
                  <ArrowRight className="w-5 h-5 transform group-hover/link:translate-x-1 transition-transform duration-300" />
                </a>
              </div>
            </div>
          ))}
        </div>

        <div className="text-center mt-20 md:mt-24">
          <p className="text-muted-foreground mb-8 text-lg">
            Ready to explore your treatment options?
          </p>
          <a
            href="#contact"
            className="inline-flex items-center gap-3 px-10 py-5 bg-primary text-primary-foreground rounded-full font-semibold text-lg hover:bg-primary/90 transition-all duration-300 shadow-lg hover:shadow-xl hover:-translate-y-1"
          >
            Schedule Your Consultation
            <ArrowRight className="w-5 h-5" />
          </a>
        </div>
      </div>
    </section>
  );
}
