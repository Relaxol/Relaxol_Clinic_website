import { useEffect, useRef, useState } from "react";
import { ArrowRight } from "lucide-react";

const treatments = [
  {
    title: "SPRAVATO® (Esketamine Nasal Spray)",
    tag: "FDA-Approved",
    description: "A breakthrough nasal spray for treatment-resistant depression. Experience noticeable improvements within hours in our certified, medically-supervised environment.",
    image: "https://images.unsplash.com/photo-1631549916768-4119b2e5f926?w=800&auto=format&fit=crop&q=80",
    cta: "Explore SPRAVATO®",
    href: "/spravato",
  },
  {
    title: "Ketamine Infusion Therapy",
    tag: null,
    description: "Precisely controlled IV therapy that offers hope for depression, anxiety, PTSD, and OCD—especially when other treatments haven't worked.",
    image: "https://images.unsplash.com/photo-1666214280391-8ff5bd3c0bf0?w=800&auto=format&fit=crop&q=80",
    cta: "Learn About Infusions",
    href: "#contact",
  },
  {
    title: "Ongoing Care & Telehealth",
    tag: null,
    description: "Comprehensive follow-up support including medication management and telehealth appointments—healing that continues beyond your treatment sessions.",
    image: "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=800&auto=format&fit=crop&q=80",
    cta: "View Care Options",
    href: "#contact",
  },
];

export function TreatmentsSection() {
  const [visibleCards, setVisibleCards] = useState<boolean[]>(new Array(treatments.length).fill(false));
  const cardsRef = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const observers = cardsRef.current.map((card, index) => {
      if (!card) return null;
      
      const observer = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) {
            setTimeout(() => {
              setVisibleCards(prev => {
                const newState = [...prev];
                newState[index] = true;
                return newState;
              });
            }, index * 150); // Staggered animation
          }
        },
        { threshold: 0.2 }
      );
      
      observer.observe(card);
      return observer;
    });

    return () => {
      observers.forEach(observer => observer?.disconnect());
    };
  }, []);

  return (
    <section id="treatments" className="relative py-24 md:py-32 overflow-hidden">
      {/* Warm gradient background */}
      <div className="absolute inset-0 bg-gradient-to-br from-cream via-cream-dark/50 to-primary/10" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-primary/5 via-transparent to-transparent" />
      
      <div className="container mx-auto px-4 relative z-10">
        {/* Elegant Header */}
        <div className="text-center mb-16 md:mb-20">
          <p className="text-primary text-sm font-semibold uppercase tracking-[0.25em] mb-4">
            Advanced Therapies
          </p>
          <h2 className="text-4xl md:text-5xl lg:text-6xl text-foreground font-bold mb-6 leading-tight">
            Treatment Options
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-primary/50 via-primary to-primary/50 mx-auto rounded-full mb-6" />
          <p className="text-muted-foreground text-lg md:text-xl max-w-2xl mx-auto leading-relaxed">
            Evidence-based, FDA-approved therapies designed to restore hope and transform lives.
          </p>
        </div>

        {/* Premium Treatment Cards Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-10">
          {treatments.map((treatment, index) => (
            <div
              key={index}
              ref={(el) => (cardsRef.current[index] = el)}
              className={`group relative bg-card rounded-3xl overflow-hidden shadow-[0_20px_60px_rgba(0,0,0,0.08)] hover:shadow-[0_30px_80px_rgba(0,0,0,0.12)] transition-all duration-500 transform ${
                visibleCards[index] 
                  ? 'opacity-100 translate-y-0' 
                  : 'opacity-0 translate-y-12'
              }`}
              style={{ transitionDelay: `${index * 100}ms` }}
            >
              {/* Image Container */}
              <div className="relative h-56 md:h-64 overflow-hidden">
                <img
                  src={treatment.image}
                  alt={treatment.title}
                  className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-card/90 via-card/20 to-transparent" />
                
                {/* Tag Badge */}
                {treatment.tag && (
                  <span className="absolute top-5 right-5 px-4 py-1.5 bg-primary text-primary-foreground text-xs font-bold uppercase tracking-wider rounded-full shadow-lg">
                    {treatment.tag}
                  </span>
                )}
              </div>

              {/* Content */}
              <div className="p-8 md:p-10">
                <h3 className="text-xl md:text-2xl font-bold text-foreground mb-4 leading-tight group-hover:text-primary transition-colors duration-300">
                  {treatment.title}
                </h3>
                <p className="text-muted-foreground text-base md:text-lg leading-relaxed mb-6">
                  {treatment.description}
                </p>
                
                {/* CTA Link */}
                <a
                  href={treatment.href}
                  className="inline-flex items-center gap-2 text-primary font-semibold text-base md:text-lg group/link hover:gap-3 transition-all duration-300"
                >
                  {treatment.cta}
                  <ArrowRight className="w-5 h-5 transform group-hover/link:translate-x-1 transition-transform duration-300" />
                </a>
              </div>

              {/* Decorative accent line */}
              <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-primary/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            </div>
          ))}
        </div>

        {/* Bottom CTA */}
        <div className="text-center mt-16 md:mt-20">
          <p className="text-muted-foreground mb-6 text-lg">
            Not sure which treatment is right for you?
          </p>
          <a
            href="#contact"
            className="inline-flex items-center gap-3 px-8 py-4 bg-foreground text-background rounded-full font-semibold text-lg hover:bg-primary hover:text-primary-foreground transition-all duration-300 shadow-xl hover:shadow-2xl hover:-translate-y-1"
          >
            Schedule a Consultation
            <ArrowRight className="w-5 h-5" />
          </a>
        </div>
      </div>
    </section>
  );
}
