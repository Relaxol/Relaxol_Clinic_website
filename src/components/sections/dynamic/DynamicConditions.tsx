import { Link } from "react-router-dom";

interface ConditionItem {
  title: string;
  description: string;
  /** Backwards compatible with older templates */
  image?: string;
  /** Preferred key used by CMS */
  imageUrl?: string;
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

        {/* Conditions Grid - 5 columns on desktop for all cards in one row */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4 lg:gap-5">
          {data.items.map((condition, index) => (
            <div
              key={index}
              className="group bg-card rounded-xl shadow-md hover:shadow-xl transition-all duration-300 hover:-translate-y-1 overflow-hidden focus-within:ring-2 focus-within:ring-primary focus-within:ring-offset-2"
            >
              {/* Image */}
              <div className="aspect-[4/3] overflow-hidden">
                <img
                  src={condition.imageUrl || condition.image || ""}
                  alt={condition.imageAlt || condition.title}
                  loading="lazy"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
              </div>
              
              {/* Card Body */}
              <div className="p-4 lg:p-5">
                <h3 className="text-lg lg:text-xl font-semibold text-foreground mb-2">
                  {condition.title}
                </h3>
                <p className="text-muted-foreground text-sm leading-relaxed mb-3 line-clamp-3">
                  {condition.description}
                </p>
                <Link
                  to={condition.href}
                  className="text-primary font-semibold hover:text-accent transition-colors inline-flex items-center gap-1.5 text-sm group/link"
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
