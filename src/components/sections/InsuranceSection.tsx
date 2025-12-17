import { Shield } from "lucide-react";

export function InsuranceSection() {
  return (
    <section id="insurance" className="py-16 bg-white">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-12">
          <p className="text-primary text-sm font-semibold uppercase tracking-widest mb-3">
            INSURANCE COVERAGE
          </p>
          <h2 className="text-3xl md:text-4xl lg:text-5xl text-foreground font-bold mb-4">
            Understanding Your Coverage
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            We believe cost shouldn't be a barrier to mental health care. Our team is here to help you understand your insurance options.
          </p>
        </div>

        <div className="max-w-2xl mx-auto">
          <div className="bg-card rounded-3xl p-8 shadow-[var(--shadow-card)] hover:shadow-[var(--shadow-hero)] transition-all duration-300 flex flex-col">
            <div className="icon-container mb-6">
              <Shield className="w-7 h-7" />
            </div>
            <h3 className="text-2xl font-bold text-foreground mb-4">
              Insurance Coverage for SPRAVATO®
            </h3>
            <p className="text-muted-foreground leading-relaxed mb-4">
              SPRAVATO® is FDA-approved and covered by many insurance plans, including Medicare and Medicaid in some states. Our team will verify your benefits and handle prior authorizations so you know what to expect before your first appointment.
            </p>
            <p className="text-primary font-medium mb-4">
              We work with most major insurance providers.
            </p>
            <a
              href="/contact"
              className="text-primary font-semibold hover:text-accent transition-colors mt-auto inline-flex items-center gap-2"
            >
              Verify your coverage →
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
