import { Shield, Award, CreditCard, LucideIcon } from "lucide-react";

const iconMap: Record<string, LucideIcon> = {
  Shield,
  Award,
  CreditCard,
};

interface TrustPill {
  icon: string;
  label: string;
}

interface HeroSectionData {
  sectionId: string;
  type: 'hero';
  subtitle?: string;
  headline: string;
  body?: string;
  cta?: { label: string; href: string };
  backgroundImage?: string;
  trustPills?: TrustPill[];
}

interface Props {
  data: HeroSectionData;
}

export function DynamicHero({ data }: Props) {
  return (
    <section 
      className="relative min-h-[80vh] flex items-center overflow-hidden"
      data-section-id={data.sectionId}
      data-section-type={data.type}
    >
      {/* Background image with subtle overlay for text readability */}
      <div 
        className="absolute inset-0 bg-cover bg-no-repeat bg-fixed"
        style={{ 
          backgroundImage: data.backgroundImage ? `url(${data.backgroundImage})` : undefined,
          backgroundColor: data.backgroundImage ? undefined : 'hsl(var(--muted))',
          backgroundPosition: '50% 50%',
        }}
      >
        {/* Light overlay for text contrast without muting colors */}
        <div className="absolute inset-0 bg-gradient-to-r from-black/50 via-black/30 to-transparent" />
      </div>

      {/* Content */}
      <div className="relative container mx-auto px-4 pt-10 pb-20">
        <div className="max-w-3xl">
          {/* Subtitle */}
          {data.subtitle && (
            <p className="text-[#D09B3C] text-sm md:text-base font-semibold uppercase tracking-widest mb-4 animate-fade-up">
              {data.subtitle}
            </p>
          )}

          {/* Main Heading */}
          <h1 className="text-4xl md:text-5xl lg:text-6xl text-white font-bold leading-tight mb-6 animate-fade-up" style={{ animationDelay: "0.1s" }}>
            {data.headline}
          </h1>

          {/* Subtitle Text */}
          {data.body && (
            <p className="text-white/90 text-lg md:text-xl leading-relaxed mb-8 animate-fade-up" style={{ animationDelay: "0.15s" }}>
              {data.body}
            </p>
          )}

          {/* CTA Buttons */}
          {data.cta && (
            <div className="flex flex-wrap gap-4 mb-10 animate-fade-up" style={{ animationDelay: "0.2s" }}>
              <a
                href={data.cta.href}
                className="inline-flex items-center justify-center px-8 py-4 rounded-md bg-[#D09B3C] text-white font-semibold text-lg hover:bg-[#B8862F] transition-all duration-300 shadow-lg"
              >
                {data.cta.label}
              </a>
            </div>
          )}

          {/* Trust Pills */}
          {data.trustPills && data.trustPills.length > 0 && (
            <div className="flex flex-wrap gap-3 animate-fade-up" style={{ animationDelay: "0.3s" }}>
              {data.trustPills.map((pill, index) => {
                const IconComponent = iconMap[pill.icon] || Award;
                return (
                  <div
                    key={index}
                    className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/15 backdrop-blur-sm border border-white/25 text-white text-sm font-medium shadow-sm"
                  >
                    <IconComponent className="w-4 h-4 text-white/90" />
                    <span>{pill.label}</span>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
