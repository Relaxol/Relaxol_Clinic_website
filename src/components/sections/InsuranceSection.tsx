import { Shield, CreditCard } from "lucide-react";

const cards = [
  {
    icon: Shield,
    title: "Insurance Coverage for SPRAVATO®",
    description: "SPRAVATO® is FDA-approved and covered by many insurance plans, including Medicare and Medicaid in some states. Our team will verify your benefits and handle prior authorizations so you know what to expect before your first appointment.",
    highlight: "We work with most major insurance providers.",
    linkText: "Verify your coverage",
    linkHref: "#contact",
  },
  {
    icon: CreditCard,
    title: "Flexible Payment Options",
    description: "For ketamine infusions and other out-of-pocket services, we offer transparent pricing and flexible payment plans. We also accept HSAs, FSAs, and major credit cards to make treatment accessible.",
    highlight: null,
    linkText: "Discuss financing options",
    linkHref: "#contact",
  },
];

export function InsuranceSection() {
  return (
    <section id="financing" className="py-16 bg-cream-dark">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-12">
          <p className="text-primary text-sm font-semibold uppercase tracking-widest mb-3">
            INSURANCE & FINANCING
          </p>
          <h2 className="text-3xl md:text-4xl lg:text-5xl text-foreground font-bold mb-4">
            Navigating Coverage & Costs
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            We believe cost shouldn't be a barrier to mental health care. Our team is here to help you understand your options.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          {cards.map((card, index) => (
            <div
              key={index}
              className="treatment-card flex flex-col"
            >
              <div className="icon-container mb-6">
                <card.icon className="w-7 h-7" />
              </div>
              <h3 className="text-2xl font-bold text-foreground mb-4">
                {card.title}
              </h3>
              <p className="text-muted-foreground leading-relaxed mb-4">
                {card.description}
              </p>
              {card.highlight && (
                <p className="text-primary font-medium mb-4">
                  {card.highlight}
                </p>
              )}
              <a
                href={card.linkHref}
                className="text-primary font-semibold hover:text-accent transition-colors mt-auto inline-flex items-center gap-2"
              >
                {card.linkText} →
              </a>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
