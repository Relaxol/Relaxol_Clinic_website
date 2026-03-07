import { Shield, Award, CreditCard } from "lucide-react";
import heroBackground from "@/assets/hero-background.jpg";

const defaultTrustPills = [
  { icon: Award, label: "Board-Certified Psychiatric Care" },
  { icon: Shield, label: "FDA-Approved SPRAVATO® Clinic" },
  { icon: CreditCard, label: "Insurance & Benefits Support" },
];

interface HeroContent {
  subtitle?: string;
  headline?: string;
  body?: string;
  ctaLabel?: string;
  ctaHref?: string;
  heroImageUrl?: string;
  heroImageAlt?: string;
}

interface HeroSectionProps {
  content?: HeroContent;
}

export function HeroSection({ content }: HeroSectionProps) {
  const subtitle = content?.subtitle ?? "FIND HOPE AND RELIEF TODAY";
  const headline = content?.headline ?? "New Jersey's Premier Ketamine & SPRAVATO® Clinic";
  const body = content?.body ?? "Advanced, clinician-led treatments for Depression, Anxiety, PTSD, OCD and Chronic Pain.";
  const ctaLabel = content?.ctaLabel ?? "Book Your Free Consultation Today!";
  const ctaHref = content?.ctaHref ?? "#contact";
  const bgImage = content?.heroImageUrl || heroBackground;

  return (
    <section className="relative min-h-[80vh] flex items-start md:items-center overflow-hidden">
      {/* Background image with subtle overlay for text readability */}
      <div 
        className="absolute inset-0 bg-cover bg-no-repeat bg-fixed"
        style={{ 
          backgroundImage: `url(${bgImage})`, 
          backgroundPosition: '50% 50%',
        }}
        role="img"
        aria-label={content?.heroImageAlt || 'Hero background'}
      >
        {/* Dark overlay for better text contrast */}
        <div className="absolute inset-0 bg-black/40" />
        <div className="absolute inset-0 bg-gradient-to-r from-black/30 via-transparent to-transparent" />
      </div>

      {/* Content */}
      <div className="relative max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 xl:px-16 pt-8 md:pt-10 pb-20">
        <div className="max-w-3xl">
          {/* Subtitle */}
          <p className="text-[#D09B3C] text-sm md:text-base font-semibold uppercase tracking-widest mb-4 animate-fade-up">
            {subtitle}
          </p>

          {/* Main Heading */}
          <h1 className="text-2xl sm:text-3xl lg:text-4xl text-white font-bold leading-tight mb-6 animate-fade-up" style={{ animationDelay: "0.1s" }}>
            {headline}
          </h1>

          {/* Subtitle Text */}
          <p className="text-white/90 text-lg md:text-xl leading-relaxed mb-8 animate-fade-up" style={{ animationDelay: "0.15s" }}>
            {body}
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-wrap gap-4 mb-10 animate-fade-up" style={{ animationDelay: "0.2s" }}>
            <a
              href={ctaHref}
              className="inline-flex items-center justify-center px-6 py-3 md:px-8 md:py-4 rounded-md bg-[#D09B3C] text-white font-medium text-base md:text-lg hover:bg-[#B8862F] transition-all duration-300 shadow-lg"
            >
              {ctaLabel}
            </a>
          </div>

          {/* Trust Pills */}
          <div className="flex flex-wrap gap-3 animate-fade-up" style={{ animationDelay: "0.3s" }}>
            {defaultTrustPills.map((pill) => (
              <div
                key={pill.label}
                className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/15 backdrop-blur-sm border border-white/25 text-white text-sm font-medium shadow-sm"
              >
                <pill.icon className="w-4 h-4 text-white/90" />
                <span>{pill.label}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
