import heroBackground from "@/assets/hero-background.jpg";

export function HeroSection() {
  return (
    <section className="relative min-h-[90vh] flex items-center">
      {/* Background Image */}
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: `url(${heroBackground})` }}
      >
        {/* Overlay */}
        <div className="absolute inset-0 bg-gradient-to-r from-foreground/70 via-foreground/50 to-transparent" />
      </div>

      {/* Content */}
      <div className="relative container mx-auto px-4 py-20">
        <div className="max-w-3xl">
          {/* Subtitle */}
          <p className="text-primary text-sm md:text-base font-semibold uppercase tracking-widest mb-4 animate-fade-up">
            FIND HOPE AND RELIEF TODAY
          </p>

          {/* Main Heading */}
          <h1 className="font-serif text-4xl md:text-5xl lg:text-6xl text-background font-bold leading-tight mb-6 animate-fade-up" style={{ animationDelay: "0.1s" }}>
            City's Premier Ketamine & SPRAVATO® Provider
          </h1>

          {/* CTA Button */}
          <div className="flex flex-wrap gap-4 animate-fade-up" style={{ animationDelay: "0.2s" }}>
            <a
              href="#contact"
              className="btn-primary text-lg"
            >
              Book Your Free Consultation Today!
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
