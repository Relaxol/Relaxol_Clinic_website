import { Sparkles, Droplets, Video } from "lucide-react";

const treatments = [
  {
    icon: Sparkles,
    title: "SPRAVATO®",
    tag: "FDA-Approved",
    description: "SPRAVATO® (esketamine) is an FDA-approved nasal spray for treatment-resistant depression and major depressive disorder with suicidal ideation. Administered in-office under medical supervision, this breakthrough treatment can produce noticeable improvements within hours. Our clinic is a certified SPRAVATO® provider, ensuring you receive this therapy in a safe, controlled environment.",
  },
  {
    icon: Droplets,
    title: "Ketamine Infusion Therapy",
    tag: null,
    description: "Ketamine infusion therapy delivers a carefully controlled dose of ketamine intravenously over 40–60 minutes. Originally used as an anesthetic, ketamine has emerged as a powerful option for depression, anxiety, PTSD, and OCD—particularly in patients who haven't responded to other treatments. Our board-certified clinicians monitor every session to ensure safety and comfort.",
  },
  {
    icon: Video,
    title: "Ongoing Care & Telehealth",
    tag: null,
    description: "Healing doesn't end after a treatment session. We offer ongoing psychiatric support, including medication management and talk therapy referrals, to help you maintain progress. For follow-ups and consultations, telehealth appointments are available—making it easier to stay connected with your care team from home.",
  },
];

export function TreatmentsSection() {
  return (
    <section id="treatments" className="py-20 bg-background">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-12">
          <p className="text-primary text-sm font-semibold uppercase tracking-widest mb-3">
            OUR TREATMENTS
          </p>
          <h2 className="font-serif text-3xl md:text-4xl lg:text-5xl text-foreground font-bold mb-4">
            Treatment Options
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Advanced, evidence-based therapies tailored to your unique needs.
          </p>
        </div>

        {/* Treatment Cards Grid */}
        <div className="grid md:grid-cols-3 gap-8">
          {treatments.map((treatment, index) => (
            <div
              key={index}
              className="treatment-card group cursor-pointer relative"
            >
              {treatment.tag && (
                <span className="absolute top-6 right-6 px-3 py-1 bg-primary/10 text-primary text-xs font-semibold rounded-full">
                  {treatment.tag}
                </span>
              )}
              <div className="icon-container mb-6 group-hover:bg-primary/20 transition-colors">
                <treatment.icon className="w-7 h-7" />
              </div>
              <h3 className="font-serif text-xl font-bold text-foreground mb-4">
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
            Learn More About Our Treatments
          </a>
        </div>
      </div>
    </section>
  );
}
