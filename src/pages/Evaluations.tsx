import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { PageSEO } from "@/components/seo/PageSEO";
import { Check } from "lucide-react";

const priorities = [
  "Thorough, individualized assessments",
  "Clear diagnostic understanding",
  "Evidence-based treatment recommendations",
  "Open communication and patient education",
];

const Evaluations = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <PageSEO
        title="Comprehensive Evaluation"
        description="Personalized, clinician-led psychiatric evaluations at Relaxol Clinic. Thorough assessments for anxiety, depression, ADHD, OCD, trauma, and mood disorders."
        path="/evaluations"
      />
      <Header />
      <main className="flex-1">
        {/* Hero */}
        <section className="py-16 lg:py-24 bg-cream-band">
          <div className="max-w-4xl mx-auto px-6 sm:px-8 lg:px-12 text-center">
            <p className="text-primary text-sm font-semibold uppercase tracking-widest mb-3">
              Comprehensive Evaluation
            </p>
            <h1 className="text-4xl md:text-5xl lg:text-6xl text-foreground font-bold mb-6">
              Personalized. Thoughtful. Clinician-Led.
            </h1>
          </div>
        </section>

        {/* Content */}
        <section className="py-16 lg:py-24 bg-background">
          <div className="max-w-3xl mx-auto px-6 sm:px-8 lg:px-12">
            <div className="prose prose-lg max-w-none">
              <p className="text-muted-foreground leading-relaxed text-lg mb-6">
                A comprehensive psychiatric evaluation is the first step in understanding your
                symptoms, history, and treatment goals. At Relaxol Clinic, we take an individualized,
                evidence-based approach to ensure each patient receives care that is appropriate for
                their needs.
              </p>

              <p className="text-muted-foreground leading-relaxed text-lg mb-6">
                During the evaluation, our providers assess your mental health history, current
                concerns, and prior treatments to develop a clear clinical picture. Based on this, we
                provide personalized recommendations, which may include interventional psychiatry
                options when clinically appropriate.
              </p>

              <h2 className="text-2xl font-bold text-foreground mt-12 mb-6">We prioritize:</h2>

              <ul className="space-y-4 mb-10">
                {priorities.map((item) => (
                  <li key={item} className="flex items-start gap-3">
                    <Check className="w-5 h-5 text-primary mt-1 flex-shrink-0" />
                    <span className="text-muted-foreground text-lg">{item}</span>
                  </li>
                ))}
              </ul>

              <p className="text-muted-foreground leading-relaxed text-lg mb-6">
                Our goal is to provide clarity, direction, and a foundation for effective care—so you can
                move forward with confidence.
              </p>

              <p className="text-muted-foreground italic text-base mb-12">
                Individual results may vary.
              </p>
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="py-16 bg-cream-band">
          <div className="max-w-3xl mx-auto px-6 sm:px-8 lg:px-12 text-center">
            <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-4">
              Start with an Evaluation
            </h2>
            <p className="text-muted-foreground text-lg mb-8 max-w-xl mx-auto">
              If you're considering medication or looking to optimize your current treatment, our team
              is here to help.
            </p>
            <a
              href="/contact"
              className="inline-flex items-center justify-center px-8 py-4 rounded-full bg-primary text-primary-foreground font-semibold text-lg hover:bg-accent transition-all duration-300 shadow-glow"
            >
              Schedule an Appointment
            </a>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default Evaluations;
