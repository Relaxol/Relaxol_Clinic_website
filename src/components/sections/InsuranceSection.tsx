import { Shield, CreditCard } from "lucide-react";
import { Button } from "@/components/ui/button";

const cards = [
  {
    icon: Shield,
    title: "Now Accepting Insurance",
    description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
    highlight: "Covered treatments available with qualifying insurance plans.",
    linkText: "More financing options",
    linkHref: "#",
  },
  {
    icon: CreditCard,
    title: "HSAs and FSAs Accepted",
    description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. We accept health saving accounts, flexible spending accounts, and more.",
    highlight: null,
    linkText: "More financing options",
    linkHref: "#",
  },
];

export function InsuranceSection() {
  return (
    <section id="financing" className="py-16 bg-cream-dark">
      <div className="container mx-auto px-4">
        <div className="grid md:grid-cols-2 gap-8">
          {cards.map((card, index) => (
            <div
              key={index}
              className="treatment-card flex flex-col"
            >
              <div className="icon-container mb-6">
                <card.icon className="w-7 h-7" />
              </div>
              <h3 className="font-serif text-2xl font-bold text-foreground mb-4">
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
