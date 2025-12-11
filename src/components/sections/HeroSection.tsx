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
      {/* Background image with warm overlay */}
      <div 
        className="absolute inset-0 bg-cover bg-no-repeat bg-fixed"
        style={{ 
          backgroundImage: `url(${heroBackground})`, 
          backgroundPosition: '70% 65%',
        }}
      >
        {/* Warm golden/sepia overlay for readability */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/30 to-black/50" />
        <div className="absolute inset-0 bg-gradient-to-r from-amber-900/30 via-amber-800/20 to-amber-700/25" />
      </div>

      {/* Content */}
      <div className="relative container mx-auto px-4 pt-10 pb-20">
        <div className="max-w-3xl">
          {/* Subtitle */}
          <p className="text-amber-200 drop-shadow-md text-sm md:text-base font-semibold uppercase tracking-widest mb-4 animate-fade-up">
            FIND HOPE AND RELIEF TODAY
          </p>

          {/* Main Heading */}
          <h1 className="text-4xl md:text-5xl lg:text-6xl text-white font-bold leading-tight mb-6 animate-fade-up drop-shadow-[0_2px_4px_rgba(0,0,0,0.4)]" style={{ animationDelay: "0.1s" }}>
            New Jersey's Premier Ketamine & SPRAVATO® Clinic
          </h1>

          {/* Subtitle Text */}
          <p className="text-white/95 text-lg md:text-xl leading-relaxed mb-8 animate-fade-up drop-shadow-[0_1px_2px_rgba(0,0,0,0.3)]" style={{ animationDelay: "0.15s" }}>
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
              className="inline-flex items-center justify-center px-8 py-4 rounded-full border-2 border-white/70 text-white font-semibold hover:bg-white hover:text-foreground text-lg transition-all duration-300 backdrop-blur-sm"
            >
              Learn About Our Treatments
            </a>
          </div>

          {/* Trust Pills */}
          <div className="flex flex-wrap gap-3 animate-fade-up" style={{ animationDelay: "0.3s" }}>
            {trustPills.map((pill) => (
              <div
                key={pill.label}
                className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/20 backdrop-blur-md border border-white/30 text-white text-sm font-medium shadow-sm"
              >
                <pill.icon className="w-4 h-4 text-amber-300 drop-shadow-sm" />
                <span>{pill.label}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}