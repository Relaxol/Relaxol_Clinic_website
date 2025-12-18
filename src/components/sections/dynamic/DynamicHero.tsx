import { HeroSectionData } from "@/lib/sections/registry";

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
      {/* Background */}
      <div 
        className="absolute inset-0 bg-cover bg-no-repeat bg-fixed"
        style={{ 
          backgroundImage: data.backgroundImage ? `url(${data.backgroundImage})` : undefined,
          backgroundColor: data.backgroundImage ? undefined : 'hsl(var(--muted))',
          backgroundPosition: '50% 50%',
        }}
      >
        <div className="absolute inset-0 bg-gradient-to-r from-black/50 via-black/30 to-transparent" />
      </div>

      {/* Content */}
      <div className="relative container mx-auto px-4 pt-10 pb-20">
        <div className="max-w-3xl">
          {data.subtitle && (
            <p className="text-primary text-sm md:text-base font-semibold uppercase tracking-widest mb-4 animate-fade-up">
              {data.subtitle}
            </p>
          )}

          <h1 className="text-4xl md:text-5xl lg:text-6xl text-white font-bold leading-tight mb-6 animate-fade-up" style={{ animationDelay: "0.1s" }}>
            {data.headline}
          </h1>

          {data.body && (
            <p className="text-white/90 text-lg md:text-xl leading-relaxed mb-8 animate-fade-up" style={{ animationDelay: "0.15s" }}>
              {data.body}
            </p>
          )}

          {data.cta && (
            <div className="flex flex-wrap gap-4 mb-10 animate-fade-up" style={{ animationDelay: "0.2s" }}>
              <a
                href={data.cta.href}
                className="inline-flex items-center justify-center px-8 py-4 rounded-md bg-primary text-primary-foreground font-semibold text-lg hover:bg-primary/90 transition-all duration-300 shadow-lg"
              >
                {data.cta.label}
              </a>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
