import { Shield, Award, CreditCard } from "lucide-react";
import heroBackground from "@/assets/hero-background.jpg";

const trustPills = [
  { icon: Award, label: "Board-Certified Psychiatric Care" },
  { icon: Shield, label: "FDA-Approved SPRAVATO® Clinic" },
  { icon: CreditCard, label: "Insurance & Benefits Support" },
];

export function HeroSection() {
  return (
    <section className="relative min-h-[80vh] flex items-center overflow-hidden">
      {/* Background image - bright white aesthetic */}
      <div 
        className="absolute inset-0 bg-cover bg-no-repeat bg-fixed"
        style={{ 
          backgroundImage: `url(${heroBackground})`, 
          backgroundPosition: '50% 50%',
        }}
      >
        {/* Subtle overlay for depth */}
        <div className="absolute inset-0 bg-gradient-to-r from-white/60 via-white/30 to-transparent" />
      </div>

      {/* Content */}
      <div className="relative container mx-auto px-4 pt-10 pb-20">
        <div className="max-w-3xl">
          {/* Subtitle */}
          <p className="text-primary text-sm md:text-base font-semibold uppercase tracking-widest mb-4 animate-fade-up">
            FIND HOPE AND RELIEF TODAY
          </p>

          {/* Main Heading */}
          <h1 className="text-4xl md:text-5xl lg:text-6xl text-foreground font-bold leading-tight mb-6 animate-fade-up" style={{ animationDelay: "0.1s" }}>
            New Jersey's Premier Ketamine & SPRAVATO® Clinic
          </h1>

          {/* Subtitle Text */}
          <p className="text-muted-foreground text-lg md:text-xl leading-relaxed mb-8 animate-fade-up" style={{ animationDelay: "0.15s" }}>
            Advanced, clinician-led treatments for depression, anxiety,<br className="hidden md:block" /> PTSD and OCD in a safe, monitored medical setting.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-wrap gap-4 mb-10 animate-fade-up" style={{ animationDelay: "0.2s" }}>
            <a
              href="#contact"
              className="btn-primary text-lg shadow-lg"
            >
              Schedule a Consultation
            </a>
            <a
              href="#treatments"
              className="inline-flex items-center justify-center px-8 py-4 rounded-full border-2 border-foreground/30 text-foreground font-semibold hover:bg-foreground hover:text-background text-lg transition-all duration-300"
            >
              Learn About Our Treatments
            </a>
          </div>

          {/* Trust Pills */}
          <div className="flex flex-wrap gap-3 animate-fade-up" style={{ animationDelay: "0.3s" }}>
            {trustPills.map((pill) => (
              <div
                key={pill.label}
                className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-foreground/10 backdrop-blur-sm border border-foreground/20 text-foreground text-sm font-medium shadow-sm"
              >
                <pill.icon className="w-4 h-4 text-primary" />
                <span>{pill.label}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}