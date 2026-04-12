import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { PageSEO } from "@/components/seo/PageSEO";
import { Check, Loader2 } from "lucide-react";
import { usePageContent } from "@/hooks/usePageContent";
import { EvaluationsV1Content } from "@/lib/templates/newSchemas";
import { defaultEvaluationsContent } from "@/lib/templates/newDefaults";
import evaluationsImage from "@/assets/evaluations-hero.jpg";

const Evaluations = () => {
  const { content, loading } = usePageContent('evaluations');
  const hasContent = content && Object.keys(content).length > 0 && (content as any).hero;
  const c = (hasContent ? content : defaultEvaluationsContent) as EvaluationsV1Content;

  if (loading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
      </div>
    );
  }

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
              {c.hero.subtitle || 'Comprehensive Evaluation'}
            </p>
            <h1 className="text-4xl md:text-5xl lg:text-6xl text-foreground font-bold mb-6">
              {c.hero.headline}
            </h1>
          </div>
        </section>

        {/* Content with Image */}
        <section className="py-16 lg:py-24 bg-background">
          <div className="max-w-6xl mx-auto px-6 sm:px-8 lg:px-12">
            <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-start">
              {/* Image */}
              <div className="relative order-1">
                <div className="rounded-2xl overflow-hidden shadow-lg">
                  <img
                    src={evaluationsImage}
                    alt="Clinician-led psychiatric evaluation session"
                    className="w-full h-auto object-cover aspect-[4/3]"
                  />
                </div>
              </div>

              {/* Intro paragraphs only */}
              <div className="order-2">
                {c.content.paragraphs.map((p, i) => (
                  <p key={i} className="text-muted-foreground leading-relaxed text-lg mb-6">
                    {p}
                  </p>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Full-width: priorities, closing, disclaimer */}
        <section className="py-16 lg:py-20 bg-background">
          <div className="max-w-3xl mx-auto px-6 sm:px-8 lg:px-12">
            <h2 className="text-2xl font-bold text-foreground mb-6">
              {c.content.prioritiesTitle}
            </h2>

            <ul className="space-y-4 mb-10">
              {c.content.priorities.map((item) => (
                <li key={item} className="flex items-start gap-3">
                  <Check className="w-5 h-5 text-primary mt-1 flex-shrink-0" />
                  <span className="text-muted-foreground text-lg">{item}</span>
                </li>
              ))}
            </ul>

            <p className="text-muted-foreground leading-relaxed text-lg mb-6">
              {c.content.closingParagraph}
            </p>

            {c.content.disclaimer && (
              <p className="text-muted-foreground italic text-base">
                {c.content.disclaimer}
              </p>
            )}
          </div>
        </section>

        {/* CTA */}
        <section className="py-16 bg-cream-band">
          <div className="max-w-3xl mx-auto px-6 sm:px-8 lg:px-12 text-center">
            <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-4">
              {c.cta.title}
            </h2>
            <p className="text-muted-foreground text-lg mb-8 max-w-xl mx-auto">
              {c.cta.body}
            </p>
            <a
              href={c.cta.ctaHref}
              className="inline-flex items-center justify-center px-8 py-4 rounded-full bg-primary text-primary-foreground font-semibold text-lg hover:bg-accent transition-all duration-300 shadow-glow"
            >
              {c.cta.ctaLabel}
            </a>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default Evaluations;
