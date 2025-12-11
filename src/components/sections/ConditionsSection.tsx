import conditionDepression from "@/assets/condition-depression.jpg";
import conditionAnxiety from "@/assets/condition-anxiety.jpg";
import conditionPtsd from "@/assets/condition-ptsd.jpg";
import conditionOcd from "@/assets/condition-ocd.jpg";

const conditions = [
  {
    title: "Depression",
    image: conditionDepression,
    imageAlt: "Person finding relief, sitting peacefully by a sunlit window",
    description: "When traditional antidepressants fall short, ketamine and SPRAVATO® offer rapid relief—often within hours, not weeks.",
  },
  {
    title: "Anxiety",
    image: conditionAnxiety,
    imageAlt: "Woman practicing calm breathing meditation in a serene setting",
    description: "For persistent anxiety that hasn't responded to conventional therapies, our treatments target the glutamate system for faster relief.",
  },
  {
    title: "PTSD",
    image: conditionPtsd,
    imageAlt: "Compassionate healthcare provider offering gentle support",
    description: "Ketamine therapy helps process traumatic memories and reduce PTSD symptoms in a safe, supportive environment.",
  },
  {
    title: "OCD",
    image: conditionOcd,
    imageAlt: "Person in quiet focused contemplation with mental clarity",
    description: "For medication-resistant OCD, ketamine-based therapies may help interrupt intrusive thoughts and compulsive behaviors.",
  },
];

export function ConditionsSection() {
  return (
    <section id="conditions" className="py-24 md:py-32 bg-cream-dark">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-16 max-w-3xl mx-auto">
          <p className="text-primary text-sm font-semibold uppercase tracking-widest mb-3">
            CONDITIONS WE TREAT
          </p>
          <h2 className="font-serif text-3xl md:text-4xl lg:text-5xl text-foreground font-bold mb-5">
            Specialized Mental Health Care
          </h2>
          <p className="text-muted-foreground text-lg">
            Our treatments are designed for patients who haven't found relief through traditional approaches.
          </p>
        </div>

        {/* Conditions Grid - 2x2 on desktop, single column on mobile */}
        <div className="grid md:grid-cols-2 gap-8 lg:gap-10 max-w-5xl mx-auto">
          {conditions.map((condition, index) => (
            <div
              key={index}
              className="group bg-card rounded-2xl shadow-md hover:shadow-xl transition-all duration-300 hover:-translate-y-1 overflow-hidden focus-within:ring-2 focus-within:ring-primary focus-within:ring-offset-2"
            >
              {/* Image */}
              <div className="aspect-video overflow-hidden">
                <img
                  src={condition.image}
                  alt={condition.imageAlt}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
              </div>
              
              {/* Card Body */}
              <div className="p-6 md:p-8">
                <h3 className="font-serif text-xl md:text-2xl font-semibold text-foreground mb-3">
                  {condition.title}
                </h3>
                <p className="text-muted-foreground leading-relaxed mb-5">
                  {condition.description}
                </p>
                <a
                  href="#contact"
                  className="text-primary font-semibold hover:text-accent transition-colors inline-flex items-center gap-2 text-base group/link"
                >
                  Learn more 
                  <span className="group-hover/link:translate-x-1 transition-transform">→</span>
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
