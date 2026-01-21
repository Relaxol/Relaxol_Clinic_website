import { Star, Quote } from "lucide-react";

interface TestimonialItem {
  name: string;
  treatment: string;
  text: string;
  rating: number;
}

interface TestimonialsSectionData {
  sectionId: string;
  type: 'testimonials';
  subtitle?: string;
  title: string;
  description?: string;
  items: TestimonialItem[];
}

interface Props {
  data: TestimonialsSectionData;
}

export function DynamicTestimonials({ data }: Props) {
  return (
    <section 
      className="py-20 bg-background"
      data-section-id={data.sectionId}
      data-section-type={data.type}
    >
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-12">
          {data.subtitle && (
            <p className="text-primary text-sm font-semibold uppercase tracking-widest mb-3">
              {data.subtitle}
            </p>
          )}
          <h2 className="text-3xl md:text-4xl lg:text-5xl text-foreground font-bold mb-4">
            {data.title}
          </h2>
          {data.description && (
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
              {data.description}
            </p>
          )}
        </div>

        {/* Testimonial Cards */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {data.items.map((testimonial, index) => (
            <div
              key={index}
              className="testimonial-card relative flex flex-col h-full"
            >
              {/* Quote Icon */}
              <Quote className="absolute top-6 right-6 w-10 h-10 text-primary/20" />

              {/* Stars */}
              <div className="flex gap-1 mb-4">
                {[...Array(testimonial.rating)].map((_, i) => (
                  <Star key={i} className="w-5 h-5 fill-primary text-primary" />
                ))}
              </div>

              {/* Text */}
              <p className="text-muted-foreground italic leading-relaxed mb-6 flex-grow">
                "{testimonial.text}"
              </p>

              {/* Author */}
              <div className="flex items-center gap-4 mt-auto">
                <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                  <span className="text-primary font-semibold text-lg">
                    {testimonial.name.charAt(0)}
                  </span>
                </div>
                <div>
                  <p className="font-semibold text-foreground">{testimonial.name}</p>
                  <p className="text-sm text-muted-foreground">{testimonial.treatment}</p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* CTA */}
        <div className="text-center mt-12">
          <a
            href="#contact"
            className="btn-primary"
          >
            Start Your Journey Today
          </a>
        </div>
      </div>
    </section>
  );
}
