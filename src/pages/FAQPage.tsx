import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { Button } from "@/components/ui/button";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Link } from "react-router-dom";
import { JsonLdSchema } from "@/components/seo/JsonLdSchema";
import { PageSEO } from "@/components/seo/PageSEO";
import { usePageContent } from "@/hooks/usePageContent";
import { FAQV1Content } from "@/lib/templates/schemas";
import { Loader2 } from "lucide-react";

// FAQ Data from original Relaxol Clinic website (used as fallback)
const defaultFaqItems = [
  {
    question: "What is ketamine therapy?",
    answer: "Ketamine therapy is a treatment option that may be used for individuals with depression who have not found sufficient relief with traditional approaches."
  },
  {
    question: "What conditions can ketamine therapy help with?",
    answer: "It is most commonly considered for treatment-resistant depression and may also be part of care for anxiety, PTSD, and related conditions."
  },
  {
    question: "What is treatment-resistant depression?",
    answer: "This refers to depression that has not improved after trying at least two standard treatments, such as antidepressant medications."
  },
  {
    question: "How can ketamine therapy help?",
    answer: "Ketamine may support changes in brain pathways involved in mood. Some individuals experience improvements in mood, energy, and overall functioning."
  },
  {
    question: "How often is treatment given?",
    answer: "Treatment is typically provided as a series of sessions, often once or twice per week for several weeks, depending on your provider's recommendation."
  },
  {
    question: "How soon can I feel better?",
    answer: "Some individuals notice changes within hours or days, while others may require multiple sessions to experience improvement."
  },
  {
    question: "What is the goal of treatment?",
    answer: "The goal is to reduce symptoms and support better daily functioning as part of a comprehensive mental health plan."
  },
  {
    question: "What should I expect during a session?",
    answer: "You will be in a calm, supervised setting where your care team monitors you throughout the treatment."
  },
  {
    question: "Will I be asleep during treatment?",
    answer: "No. You remain awake, although you may feel relaxed or notice temporary changes in perception."
  },
  {
    question: "What does the experience feel like?",
    answer: "Some people describe feeling detached or deeply relaxed during treatment. These effects are temporary and monitored by staff."
  },
  {
    question: "What happens after treatment?",
    answer: "You will be observed until you are ready to leave. You may feel tired afterward and will need someone to drive you home."
  },
  {
    question: "Are there side effects?",
    answer: "Possible side effects may include nausea, dizziness, or temporary increases in blood pressure. These are usually short-lived."
  },
  {
    question: "Is ketamine therapy safe?",
    answer: "When provided in a medical setting with proper screening and monitoring, ketamine therapy is generally considered safe."
  },
  {
    question: "Is ketamine addictive?",
    answer: "While ketamine has potential for misuse, treatment in a supervised clinical setting is carefully managed to reduce risk."
  },
  {
    question: "How long do results last?",
    answer: "Some individuals experience relief for days or weeks, while others may require ongoing or maintenance treatments."
  },
  {
    question: "Will I need long-term treatment?",
    answer: "This varies by individual. Your provider will adjust your plan based on how you respond over time."
  },
  {
    question: "Can I continue my current medications?",
    answer: "In many cases, yes. Your provider will review your medications to ensure safety and compatibility."
  },
  {
    question: "Can I eat or drink before treatment?",
    answer: "You will receive specific instructions, but you may be asked to avoid eating for several hours before your session."
  },
  {
    question: "Are there conditions that may prevent treatment?",
    answer: "Certain medical or psychiatric conditions may affect eligibility. A full evaluation is required before starting treatment."
  },
  {
    question: "Is ketamine therapy legal?",
    answer: "Yes. Ketamine is an FDA-approved medication that may be used by licensed providers as part of a treatment plan."
  },
  {
    question: "Is this an outpatient treatment?",
    answer: "Yes. Treatment is typically provided in an outpatient setting, and patients return home the same day."
  },
  {
    question: "What is SPRAVATO®?",
    answer: "SPRAVATO® is an FDA-approved nasal spray (esketamine) used for treatment-resistant depression in combination with an oral antidepressant."
  },
  {
    question: "How is SPRAVATO® different from ketamine therapy?",
    answer: "SPRAVATO® is a specific form of ketamine delivered as a nasal spray and administered under a structured, FDA-regulated program."
  },
  {
    question: "How is SPRAVATO® administered?",
    answer: "It is given in the clinic under supervision, followed by a required observation period according to a protocol to ensure safety."
  },
  {
    question: "Who may be a candidate for SPRAVATO®?",
    answer: "Adults with treatment-resistant depression may be eligible after a clinical evaluation."
  },
  {
    question: "Does insurance cover SPRAVATO®?",
    answer: "SPRAVATO® is often covered by insurance for eligible patients. Coverage varies, and our team can help verify your benefits."
  },
];

const FAQPage = () => {
  const { content, loading } = usePageContent('faq');
  
  const cms = (content && typeof content === 'object' && 'cta' in content) 
    ? content as FAQV1Content 
    : null;

  if (loading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
      </div>
    );
  }

  const heroHeadline = cms?.hero?.headline || "Ketamine Therapy FAQ's";
  const heroTagline = cms?.hero?.tagline || "Your Journey to Your Best Self";
  const heroDescription = cms?.hero?.description || "Find answers to common questions about ketamine therapy, often considered when traditional depression treatments haven't been effective. It may also be used as part of care for anxiety, PTSD, and related conditions. Individual evaluation is required to determine if this treatment is appropriate.";

  const faqItems = cms?.flatItems?.length ? cms.flatItems : defaultFaqItems;

  const ctaTagline = cms?.cta?.body || "Your Journey to Your Best Self";
  const ctaTitle = cms?.cta?.title || "Start Transforming Your Life";
  const ctaLabel = cms?.cta?.ctaLabel || "Schedule a Free Consultation";
  const ctaHref = cms?.cta?.ctaHref || "/contact";
  const ctaPhone = cms?.cta?.contactPhone || "201-781-2101";
  const ctaEmail = cms?.cta?.contactEmail || "info@relaxolclinic.com";
  const ctaAddress = cms?.cta?.contactAddress || "560 Sylvan Avenue, Suite 2115, Englewood Cliffs, NJ 07632";

  return (
    <div className="min-h-screen bg-background">
      <PageSEO
        title="Ketamine Therapy FAQ"
        description="Frequently asked questions about ketamine therapy, treatment process, safety, side effects, and eligibility at Relaxol Clinic."
        path="/faq"
      />
      <JsonLdSchema type="faq" faqItems={faqItems} />
      <Header />
      <main>
        {/* Hero Section */}
        <section className="py-16 md:py-24 bg-gradient-to-b from-cream to-primary/10">
          <div className="container mx-auto px-4 text-center">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-foreground mb-6">
              {heroHeadline}
            </h1>
            <p className="text-xl md:text-2xl text-primary font-medium mb-4">
              {heroTagline}
            </p>
            <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
              {heroDescription}
            </p>
          </div>
        </section>

        {/* FAQ Section */}
        <section className="py-16 md:py-24 bg-background">
          <div className="container mx-auto px-4">
            <div className="max-w-6xl mx-auto">
              <div className="grid md:grid-cols-2 gap-6">
                {/* Left Column */}
                <Accordion type="single" collapsible className="space-y-4">
                  {faqItems.filter((_, index) => index % 2 === 0).map((faq, index) => (
                    <AccordionItem
                      key={index}
                      value={`faq-left-${index}`}
                      className="bg-card rounded-2xl border border-border/30 px-6 overflow-hidden"
                    >
                      <AccordionTrigger className="text-left text-base md:text-lg font-semibold text-foreground hover:text-primary py-5 hover:no-underline [&[data-state=open]>svg]:rotate-180">
                        {faq.question}
                      </AccordionTrigger>
                      <AccordionContent className="text-muted-foreground leading-relaxed pb-5 text-sm">
                        {faq.answer}
                      </AccordionContent>
                    </AccordionItem>
                  ))}
                </Accordion>
                
                {/* Right Column */}
                <Accordion type="single" collapsible className="space-y-4">
                  {faqItems.filter((_, index) => index % 2 === 1).map((faq, index) => (
                    <AccordionItem
                      key={index}
                      value={`faq-right-${index}`}
                      className="bg-card rounded-2xl border border-border/30 px-6 overflow-hidden"
                    >
                      <AccordionTrigger className="text-left text-base md:text-lg font-semibold text-foreground hover:text-primary py-5 hover:no-underline [&[data-state=open]>svg]:rotate-180">
                        {faq.question}
                      </AccordionTrigger>
                      <AccordionContent className="text-muted-foreground leading-relaxed pb-5 text-sm">
                        {faq.answer}
                      </AccordionContent>
                    </AccordionItem>
                  ))}
                </Accordion>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-16 md:py-24 bg-cream-dark">
          <div className="container mx-auto px-4 text-center">
            <p className="text-primary font-medium mb-4">
              {ctaTagline}
            </p>
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-8">
              {ctaTitle}
            </h2>
            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-8">
              <Button 
                size="lg" 
                className="bg-primary text-primary-foreground hover:bg-accent rounded-full px-8"
                asChild
              >
                <Link to={ctaHref}>{ctaLabel}</Link>
              </Button>
            </div>
            <div className="text-muted-foreground">
              <p className="mb-2">Have a Question? Contact us:</p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                <a href={`tel:${ctaPhone.replace(/[^\d]/g, '')}`} className="hover:text-primary transition-colors">
                  ({ctaPhone.slice(0,3)}) {ctaPhone.slice(4)}
                </a>
                <span className="hidden sm:inline">•</span>
                <a href={`mailto:${ctaEmail}`} className="hover:text-primary transition-colors">
                  {ctaEmail}
                </a>
                <span className="hidden sm:inline">•</span>
                <a 
                  href="https://maps.app.goo.gl/hzp6yXh3q3oGjv1v7" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="hover:text-primary transition-colors"
                >
                  {ctaAddress}
                </a>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default FAQPage;
