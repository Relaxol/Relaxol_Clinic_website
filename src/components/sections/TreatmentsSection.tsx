import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import treatmentSpravato from "@/assets/treatment-spravato.jpg";
import treatmentKetamine from "@/assets/treatment-ketamine-new.jpg";
import treatmentPainManagement from "@/assets/treatment-pain-management-v2.png";
import infusionEnergy from "@/assets/infusion-energy.jpg";

const defaultTreatments = [
  {
    title: "SPRAVATO® (Esketamine Nasal Spray)",
    tag: "FDA-Approved",
    description: "FDA-approved nasal spray for treatment-resistant depression. Provides clinically proven relief when traditional antidepressants haven't worked. Administered under medical supervision for safety and comfort.",
    image: treatmentSpravato,
    cta: "Learn More",
    href: "/spravato-Englewood",
  },
  {
    title: "Ketamine Infusion Therapy for Relief",
    tag: null,
    description: "Precisely controlled IV ketamine therapy offering rapid relief for Depression, Anxiety, PTSD, and OCD. Ideal for patients who haven't responded to standard treatments.",
    image: treatmentKetamine,
    cta: "Learn More",
    href: "/ketamine",
  },
  {
    title: "Chronic Pain Management Solutions",
    tag: null,
    description: "Comprehensive pain management solutions including ketamine infusions for Chronic Pain conditions. Our approach targets pain at its source for lasting relief.",
    image: treatmentPainManagement,
    cta: "Learn More",
    href: "/conditions/pain-management",
  },
  {
    title: "IV Vitamin Infusion Therapy",
    tag: "Wellness",
    description: "Recharge your body with our physician-supervised IV vitamin drips. Whether you need an energy boost, immune support, or hydration recovery, experience 100% nutrient absorption for optimal wellness.",
    image: infusionEnergy,
    cta: "Learn More",
    href: "/vitamin-infusion-englewood",
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
        href: item.href || defaultTreatments[index]?.href || "/contact",
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
    <section id="treatments" className="relative py-16 md:py-28 lg:py-36 overflow-hidden">
      {/* Premium warm gradient background */}
      <div className="absolute inset-0 bg-gradient-to-b from-cream via-cream-dark/40 to-cream" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-primary/5 via-transparent to-transparent" />
      
      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 xl:px-16 relative z-10">
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
          <p className="text-muted-foreground font-light tracking-wide text-[15px] leading-[1.65] sm:font-normal sm:tracking-normal sm:text-lg md:sm:text-xl sm:leading-relaxed max-w-2xl mx-auto">
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
              <div className="relative h-72 sm:h-80 md:h-96 overflow-hidden">
                <img
                  src={treatment.image}
                  alt={treatment.title}
                  className={`w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-700 ease-out ${
                    index === 1 ? 'object-[center_20%]' : index === 2 ? 'object-[80%_30%] md:object-center' : 'object-top'
                  }`}
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
              <div className="relative p-6 md:p-8 bg-card flex flex-col flex-grow">
                <h3 className="text-xl md:text-2xl font-bold text-foreground mb-3 leading-tight">
                  {treatment.title}
                </h3>
                
                <p className="text-muted-foreground font-light tracking-wide text-[13px] leading-[1.6] sm:font-normal sm:tracking-normal sm:text-sm md:sm:text-base sm:leading-relaxed mb-4 flex-grow">
                  {treatment.description}
                </p>
                
                {/* CTA Link */}
                <Link
                  to={treatment.href}
                  className="inline-flex items-center gap-2 text-primary font-semibold text-sm hover:gap-3 transition-all duration-300 group/link"
                >
                  <span>{treatment.cta}</span>
                  <ArrowRight className="w-4 h-4 transform group-hover/link:translate-x-1 transition-transform duration-300" />
                </Link>
              </div>

              {/* Hover lift effect */}
              <div className="absolute inset-0 rounded-2xl transition-transform duration-500 group-hover:-translate-y-2" style={{ pointerEvents: 'none' }} />
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
