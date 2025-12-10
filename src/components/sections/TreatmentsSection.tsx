import { Sparkles, Pill, Droplets, Brain, Stethoscope, Heart } from "lucide-react";

const treatments = [
  {
    icon: Heart,
    title: "Integrative Medicine",
    description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Combining traditional medical treatments with complementary therapies.",
  },
  {
    icon: Pill,
    title: "Medication Management",
    description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ensuring safe and effective use of medications for optimal outcomes.",
  },
  {
    icon: Droplets,
    title: "Vitamin Therapy",
    description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Direct absorption of vitamins and minerals for maximum effectiveness.",
  },
  {
    icon: Brain,
    title: "Ketamine Therapy",
    description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. The biggest discovery in mental health treatment in decades.",
  },
  {
    icon: Sparkles,
    title: "SPRAVATO®",
    description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. FDA-approved prescription nasal spray for treatment-resistant conditions.",
  },
  {
    icon: Stethoscope,
    title: "Psychiatry & Counseling",
    description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Comprehensive mental health care with an integrative approach.",
  },
];

export function TreatmentsSection() {
  return (
    <section id="treatments" className="py-20 bg-background">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-12">
          <p className="text-primary text-sm font-semibold uppercase tracking-widest mb-3">
            INNOVATIVE TREATMENTS FOR PERSISTENT CONDITIONS
          </p>
          <h2 className="font-serif text-3xl md:text-4xl lg:text-5xl text-foreground font-bold">
            Our Treatments
          </h2>
        </div>

        {/* Treatment Cards Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {treatments.map((treatment, index) => (
            <div
              key={index}
              className="treatment-card group cursor-pointer"
            >
              <div className="icon-container mb-6 group-hover:bg-primary/20 transition-colors">
                <treatment.icon className="w-7 h-7" />
              </div>
              <h3 className="font-serif text-xl font-bold text-foreground mb-3">
                {treatment.title}
              </h3>
              <p className="text-muted-foreground leading-relaxed">
                {treatment.description}
              </p>
            </div>
          ))}
        </div>

        {/* CTA */}
        <div className="text-center mt-12">
          <a
            href="#contact"
            className="btn-primary"
          >
            Learn more about treatments
          </a>
        </div>
      </div>
    </section>
  );
}
