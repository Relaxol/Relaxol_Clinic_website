import { ArrowRight } from "lucide-react";

interface ConditionItem {
  title: string;
  description: string;
  image: string;
  href: string;
}

interface ConditionsSectionData {
  sectionId: string;
  type: 'conditions';
  subtitle?: string;
  title: string;
  items: ConditionItem[];
}

interface Props {
  data: ConditionsSectionData;
}

export function DynamicConditions({ data }: Props) {
  return (
    <section 
      id="conditions" 
      className="py-20 bg-background"
      data-section-id={data.sectionId}
      data-section-type={data.type}
    >
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          {data.subtitle && (
            <p className="text-primary text-sm font-semibold uppercase tracking-widest mb-3">
              {data.subtitle}
            </p>
          )}
          <h2 className="text-3xl md:text-4xl lg:text-5xl text-foreground font-bold">
            {data.title}
          </h2>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
          {data.items.map((condition, index) => (
            <div
              key={index}
              className="group bg-card rounded-2xl overflow-hidden shadow-soft hover:shadow-hero transition-all duration-500 hover:-translate-y-2"
            >
              <div className="aspect-[16/9] overflow-hidden">
                <img
                  src={condition.image}
                  alt={condition.title}
                  className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-500"
                />
              </div>
              <div className="p-6">
                <h3 className="text-xl font-bold text-foreground mb-3">
                  {condition.title}
                </h3>
                <p className="text-muted-foreground text-sm leading-relaxed mb-4 line-clamp-3">
                  {condition.description}
                </p>
                <a
                  href={condition.href}
                  className="inline-flex items-center gap-2 text-primary font-semibold text-sm hover:gap-3 transition-all duration-300"
                >
                  <span>Learn More</span>
                  <ArrowRight className="w-4 h-4" />
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
