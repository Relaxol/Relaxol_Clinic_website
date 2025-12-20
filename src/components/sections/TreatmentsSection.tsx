import { useEffect, useRef, useState } from "react";
import { ArrowRight } from "lucide-react";
import treatmentSpravato from "@/assets/treatment-spravato.jpg";
import treatmentKetamine from "@/assets/treatment-ketamine.jpg";
import treatmentTelehealth from "@/assets/treatment-telehealth.jpg";
import treatmentPainManagement from "@/assets/treatment-pain-management.jpg";

const defaultTreatments = [
  {
    title: "SPRAVATO® (Esketamine Nasal Spray)",
    tag: "FDA-Approved",
    description: "FDA-approved nasal spray for treatment-resistant depression. Provides clinically proven relief when traditional antidepressants haven't worked. Administered under medical supervision for safety and comfort.",
    image: treatmentSpravato,
    cta: "Learn More",
    href: "/spravato",
  },
  {
    title: "Ketamine Infusion Therapy for Relief",
    tag: null,
    description: "Precisely controlled IV ketamine therapy offering rapid relief for depression, anxiety, PTSD, and OCD. Ideal for patients who haven't responded to standard treatments.",
    image: treatmentKetamine,
    cta: "Learn More",
    href: "#contact",
  },
  {
    title: "Chronic Pain Management Solutions",
    tag: null,
    description: "Comprehensive pain management solutions including ketamine infusions for chronic pain conditions. Our approach targets pain at its source for lasting relief.",
    image: treatmentPainManagement,
    cta: "Learn More",
    href: "/conditions/pain-management",
  },
  {
    title: "Ongoing Care & Telehealth Support",
    tag: null,
    description: "Comprehensive follow-up support including psychiatric consultations, medication management, and telehealth check-ins to ensure long-term wellness.",
    image: treatmentTelehealth,
    cta: "Learn More",
    href: "#contact",
  },
];

interface TreatmentItem {
  title: string;
  tag?: string | null;
  description: string;
  imageUrl?: string;
  ctaLabel?: string;
  href?: string;
}

interface TreatmentsContent {
  subtitle?: string;
  title?: string;
  description?: string;
  items?: TreatmentItem[];
}

interface TreatmentsSectionProps {
  content?: TreatmentsContent;
}

export function TreatmentsSection({ content }: TreatmentsSectionProps) {
  const [visibleCards, setVisibleCards] = useState<boolean[]>(new Array(4).fill(false));
  const cardsRef = useRef<(HTMLDivElement | null)[]>([]);
  const headerRef = useRef<HTMLDivElement>(null);
  const [headerVisible, setHeaderVisible] = useState(false);

  const subtitle = content?.subtitle || "Our Treatments";
  const title = content?.title || "Treatment Options";
  const description = content?.description || "Evidence-based therapies designed to provide lasting relief and restore your quality of life.";
  
  const treatments = content?.items?.length 
    ? content.items.map((item, index) => ({
        title: item.title,
        tag: item.tag ?? null,
        description: item.description,
        image: item.imageUrl || defaultTreatments[index]?.image || treatmentSpravato,
        cta: item.ctaLabel || "Learn More",
        href: item.href || defaultTreatments[index]?.href || "#contact",
      }))
    : defaultTreatments;

  useEffect(() => {
    // Header observer
    if (headerRef.current) {
      const headerObserver = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) {
            setHeaderVisible(true);
          }
        },
        { threshold: 0.2 }
      );
      headerObserver.observe(headerRef.current);
    }

    // Cards observer
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
            }, index * 200);
          }
        },
        { threshold: 0.15 }
      );
      
      observer.observe(card);
      return observer;
    });

    return () => {
      observers.forEach(observer => observer?.disconnect());
    };
  }, []);

  return (
    <section id="treatments" className="relative py-28 md:py-36 overflow-hidden">
      {/* Premium warm gradient background */}
      <div className="absolute inset-0 bg-gradient-to-b from-cream via-cream-dark/40 to-cream" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-primary/5 via-transparent to-transparent" />
      
      <div className="container mx-auto px-4 relative z-10">
        {/* Elegant Centered Header */}
        <div 
          ref={headerRef}
          className={`text-center mb-20 md:mb-24 transition-all duration-1000 ${
            headerVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}
        >
          <p className="text-primary text-sm font-semibold uppercase tracking-[0.3em] mb-5">
            {subtitle}
          </p>
          <h2 className="text-4xl md:text-5xl lg:text-6xl text-foreground font-bold mb-8 leading-[1.1]">
            {title}
          </h2>
          <div className="w-20 h-0.5 bg-primary/60 mx-auto mb-8" />
          <p className="text-muted-foreground text-lg md:text-xl max-w-2xl mx-auto leading-relaxed">
            {description}
          </p>
        </div>

        {/* Premium Treatment Cards */}
        <div className="grid md:grid-cols-2 xl:grid-cols-4 gap-8 md:gap-10 max-w-7xl mx-auto">
          {treatments.map((treatment, index) => (
            <div
              key={index}
              ref={(el) => (cardsRef.current[index] = el)}
              className={`group relative bg-card rounded-2xl overflow-hidden transition-all duration-700 ease-out flex flex-col ${
                visibleCards[index] 
                  ? 'opacity-100 translate-y-0' 
                  : 'opacity-0 translate-y-16'
              }`}
              style={{ 
                boxShadow: '0 4px 40px rgba(0, 0, 0, 0.06)',
              }}
            >
              {/* Hover shadow overlay */}
              <div className="absolute inset-0 rounded-2xl transition-shadow duration-500 group-hover:shadow-[0_20px_60px_rgba(0,0,0,0.12)]" />
              
              {/* Image Container */}
              <div className="relative h-64 md:h-72 overflow-hidden">
                <img
                  src={treatment.image}
                  alt={treatment.title}
                  className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-700 ease-out"
                />
                
                {/* Subtle gradient overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-card via-transparent to-transparent opacity-60" />
                
                {/* Tag Badge */}
                {treatment.tag && (
                  <span className="absolute top-6 left-6 px-4 py-2 bg-primary text-primary-foreground text-xs font-bold uppercase tracking-wider rounded-full shadow-md">
                    {treatment.tag}
                  </span>
                )}
              </div>

              {/* Content Area */}
              <div className="relative p-8 md:p-10 bg-card flex flex-col h-full min-h-[280px]">
                <h3 className="text-xl md:text-2xl font-bold text-foreground mb-5 leading-tight min-h-[5.5rem] md:min-h-[6rem]">
                  {treatment.title}
                </h3>
                
                <p className="text-muted-foreground text-base md:text-lg leading-relaxed flex-grow">
                  {treatment.description}
                </p>
                
                {/* CTA Link */}
                <a
                  href={treatment.href}
                  className="inline-flex items-center gap-2 text-primary font-semibold text-base hover:gap-3 transition-all duration-300 group/link mt-8"
                >
                  <span>{treatment.cta}</span>
                  <ArrowRight className="w-5 h-5 transform group-hover/link:translate-x-1 transition-transform duration-300" />
                </a>
              </div>

              {/* Hover lift effect */}
              <div className="absolute inset-0 rounded-2xl transition-transform duration-500 group-hover:-translate-y-2" style={{ pointerEvents: 'none' }} />
            </div>
          ))}
        </div>

        {/* Bottom CTA */}
        <div className={`text-center mt-20 md:mt-24 transition-all duration-1000 delay-500 ${
          headerVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
        }`}>
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
