import { Quote } from "lucide-react";

interface TestimonialItem {
  quote: string;
  author: string;
  role?: string;
  rating?: number;
}

interface TestimonialsSectionData {
  sectionId: string;
  type: 'testimonials';
  subtitle?: string;
  title: string;
  items: TestimonialItem[];
}

interface Props {
  data: TestimonialsSectionData;
}

export function DynamicTestimonials({ data }: Props) {
  return (
    <section 
      className="py-20 bg-cream-band"
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

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {data.items.map((testimonial, index) => (
            <div
              key={index}
              className="bg-card rounded-2xl p-8 shadow-soft relative"
            >
              <Quote className="absolute top-6 right-6 w-8 h-8 text-primary/20" />
              
              {testimonial.rating && (
                <div className="flex gap-1 mb-4">
                  {Array.from({ length: testimonial.rating }).map((_, i) => (
                    <svg key={i} className="w-5 h-5 text-yellow-400 fill-current" viewBox="0 0 20 20">
                      <path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z" />
                    </svg>
                  ))}
                </div>
              )}
              
              <p className="text-muted-foreground leading-relaxed mb-6 italic">
                "{testimonial.quote}"
              </p>
              
              <div>
                <p className="font-semibold text-foreground">{testimonial.author}</p>
                {testimonial.role && (
                  <p className="text-sm text-muted-foreground">{testimonial.role}</p>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
