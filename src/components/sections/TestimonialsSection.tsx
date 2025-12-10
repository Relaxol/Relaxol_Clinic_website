import { Star, Quote } from "lucide-react";

const testimonials = [
  {
    name: "M.R.",
    treatment: "SPRAVATO® Patient",
    text: "After years of trying different medications, I was skeptical that anything would work. Within a few weeks of starting SPRAVATO®, I noticed a shift. The fog lifted. I'm not 'cured,' but I finally feel like myself again.",
    rating: 5,
  },
  {
    name: "J.L.",
    treatment: "Ketamine Infusion Patient",
    text: "The staff made me feel safe from the moment I walked in. The treatment itself was surprisingly calm, and the relief I felt afterward was unlike anything I'd experienced before. I wish I'd found this clinic sooner.",
    rating: 5,
  },
  {
    name: "S.T.",
    treatment: "PTSD Treatment Patient",
    text: "I came here after a trauma that left me unable to function. The doctor and the team were incredibly compassionate. The ketamine treatments helped me process things I'd been avoiding for years. I'm grateful beyond words.",
    rating: 5,
  },
];

export function TestimonialsSection() {
  return (
    <section className="py-20 bg-background">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-12">
          <p className="text-primary text-sm font-semibold uppercase tracking-widest mb-3">
            PATIENT EXPERIENCES
          </p>
          <h2 className="font-serif text-3xl md:text-4xl lg:text-5xl text-foreground font-bold mb-4">
            What Our Patients Are Saying
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Real stories from patients who found relief through our treatments.
          </p>
        </div>

        {/* Testimonial Cards */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <div
              key={index}
              className="testimonial-card relative"
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
              <p className="text-muted-foreground italic leading-relaxed mb-6">
                "{testimonial.text}"
              </p>

              {/* Author */}
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
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
