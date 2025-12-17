import { Stethoscope, FileCheck, CreditCard, Lock } from "lucide-react";

const reasons = [
  {
    icon: Stethoscope,
    title: "Clinician-Led Care",
    description: "Every treatment is administered and monitored by board-certified psychiatric professionals. You're never just a number—you're a patient under the direct care of experienced clinicians.",
  },
  {
    icon: FileCheck,
    title: "Evidence-Based Protocols",
    description: "We follow the latest research and FDA guidelines to ensure our treatments are safe, effective, and grounded in science. Our protocols are continuously updated as new evidence emerges.",
  },
  {
    icon: CreditCard,
    title: "Insurance & Billing Support",
    description: "Navigating insurance for mental health treatment can be confusing. Our team helps verify your benefits and submit claims so you can focus on getting better.",
  },
  {
    icon: Lock,
    title: "Private Treatment Rooms",
    description: "Your comfort and privacy matter. Our clinic features individual treatment rooms designed to create a calming, confidential environment for every session.",
  },
];

export function WhyChooseSection() {
  return (
    <section className="py-20 bg-cream-band">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl lg:text-5xl text-foreground font-bold mb-4">
            Why Choose Relaxol Clinic
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Compassionate care backed by expertise and evidence.
          </p>
        </div>

        {/* Reasons Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {reasons.map((reason, index) => (
            <div
              key={index}
              className="bg-white rounded-3xl p-8 shadow-soft hover:shadow-card transition-shadow"
            >
              <div className="icon-container mb-6">
                <reason.icon className="w-7 h-7" />
              </div>
              <h3 className="text-lg font-bold text-foreground mb-3">
                {reason.title}
              </h3>
              <p className="text-muted-foreground leading-relaxed text-sm">
                {reason.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
