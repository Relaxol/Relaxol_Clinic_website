import { Link } from "react-router-dom";

interface ConditionItem {
  title: string;
  description: string;
  image: string;
  imageAlt?: string;
  href: string;
}

interface ConditionsSectionData {
  sectionId: string;
  type: 'conditions';
  subtitle?: string;
  title: string;
  description?: string;
  items: ConditionItem[];
}

interface Props {
  data: ConditionsSectionData;
}

export function DynamicConditions({ data }: Props) {
  return (
    <section 
      id="conditions" 
      className="py-24 md:py-32 bg-white"
      data-section-id={data.sectionId}
      data-section-type={data.type}
    >
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-16 max-w-3xl mx-auto">
          {data.subtitle && (
            <p className="text-primary text-sm font-semibold uppercase tracking-widest mb-3">
              {data.subtitle}
            </p>
          )}
          <h2 className="text-3xl md:text-4xl lg:text-5xl text-foreground font-bold mb-5">
            {data.title}
          </h2>
          {data.description && (
            <p className="text-muted-foreground text-lg">
              {data.description}
            </p>
          )}
        </div>

        {/* Conditions Grid - 4 columns on desktop */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
          {data.items.map((condition, index) => (
            <div
              key={index}
              className="group bg-card rounded-2xl shadow-md hover:shadow-xl transition-all duration-300 hover:-translate-y-1 overflow-hidden focus-within:ring-2 focus-within:ring-primary focus-within:ring-offset-2"
            >
              {/* Image */}
              <div className="aspect-video overflow-hidden">
                <img
                  src={condition.image}
                  alt={condition.imageAlt || condition.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
              </div>
              
              {/* Card Body */}
              <div className="p-6 md:p-8">
                <h3 className="text-xl md:text-2xl font-semibold text-foreground mb-3">
                  {condition.title}
                </h3>
                <p className="text-muted-foreground leading-relaxed mb-5">
                  {condition.description}
                </p>
                <Link
                  to={condition.href}
                  className="text-primary font-semibold hover:text-accent transition-colors inline-flex items-center gap-2 text-base group/link"
                >
                  Learn more 
                  <span className="group-hover/link:translate-x-1 transition-transform">→</span>
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
