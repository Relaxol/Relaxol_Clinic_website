import { Brain, Heart, Shield, Layers } from "lucide-react";

const conditions = [
  {
    icon: Brain,
    title: "Depression",
    description: "When traditional antidepressants fall short, ketamine and SPRAVATO® offer a new path forward. These treatments work differently—often producing relief within hours or days rather than weeks. If you've tried multiple medications without success, you may be a candidate for these breakthrough options.",
  },
  {
    icon: Heart,
    title: "Anxiety",
    description: "Persistent anxiety can feel all-consuming, affecting your ability to work, sleep, and enjoy life. Our clinic offers treatments that target the brain's glutamate system, potentially offering rapid relief for those who haven't responded to conventional therapies.",
  },
  {
    icon: Shield,
    title: "PTSD",
    description: "Trauma can leave lasting imprints on the mind and body. Ketamine therapy has shown promise in helping patients process traumatic memories and reduce the intensity of PTSD symptoms. Our clinicians create a safe, supportive environment for your healing journey.",
  },
  {
    icon: Layers,
    title: "OCD",
    description: "Obsessive-compulsive disorder can be exhausting and isolating. For patients who haven't found relief through traditional treatments, ketamine-based therapies may help interrupt the cycle of intrusive thoughts and compulsive behaviors.",
  },
];

export function ConditionsSection() {
  return (
    <section id="conditions" className="py-20 bg-cream-dark">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-12">
          <p className="text-primary text-sm font-semibold uppercase tracking-widest mb-3">
            CONDITIONS WE TREAT
          </p>
          <h2 className="font-serif text-3xl md:text-4xl lg:text-5xl text-foreground font-bold mb-4">
            Specialized Mental Health Care
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Our treatments are designed for patients who haven't found relief through traditional approaches.
          </p>
        </div>

        {/* Conditions Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {conditions.map((condition, index) => (
            <div
              key={index}
              className="treatment-card group"
            >
              <div className="icon-container mb-6 group-hover:bg-primary/20 transition-colors">
                <condition.icon className="w-7 h-7" />
              </div>
              <h3 className="font-serif text-xl font-bold text-foreground mb-3">
                {condition.title}
              </h3>
              <p className="text-muted-foreground leading-relaxed text-sm">
                {condition.description}
              </p>
              <a
                href="#contact"
                className="text-primary font-semibold hover:text-accent transition-colors mt-4 inline-flex items-center gap-2 text-sm"
              >
                Learn more →
              </a>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
