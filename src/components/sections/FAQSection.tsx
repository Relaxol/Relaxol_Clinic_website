import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const defaultFaqs = [
  {
    question: "What is the difference between ketamine and SPRAVATO®?",
    answer: "Ketamine is administered intravenously (IV) and is used off-label for depression and other conditions. SPRAVATO® (esketamine) is a nasal spray that's FDA-approved specifically for treatment-resistant depression. Both work on similar brain pathways but have different administration methods, coverage options, and regulatory statuses.",
  },
  {
    question: "How quickly will I feel results?",
    answer: "Many patients notice improvement within hours to days of their first treatment—a stark contrast to traditional antidepressants, which can take weeks. However, results vary by individual, and a full treatment course is often needed to achieve lasting benefits.",
  },
  {
    question: "Is ketamine therapy safe?",
    answer: "When administered by trained medical professionals in a clinical setting, ketamine and SPRAVATO® are considered safe. Side effects are typically mild and short-lived (e.g., dizziness, nausea, dissociation). Our team monitors you throughout every session.",
  },
  {
    question: "Will my insurance cover treatment?",
    answer: "SPRAVATO® is covered by many insurance plans, including some Medicare and Medicaid programs. Ketamine infusions are typically out-of-pocket, though we offer flexible payment options. Contact us to verify your specific coverage.",
  },
  {
    question: "What should I expect during my first visit?",
    answer: "Your first visit will include a comprehensive psychiatric evaluation to determine whether ketamine or SPRAVATO® therapy is appropriate for you. We'll review your medical history, discuss your treatment goals, and answer any questions. If you're a good candidate, we can often schedule your first treatment session shortly after.",
  },
];

interface FAQItem {
  question: string;
  answer: string;
}

interface FAQContent {
  title?: string;
  description?: string;
  items?: FAQItem[];
}

interface FAQSectionProps {
  content?: FAQContent;
}

export function FAQSection({ content }: FAQSectionProps) {
  const title = content?.title || "Ketamine Therapy FAQs";
  const description = content?.description || "Get answers to common questions about our treatments and process.";
  const faqs = content?.items?.length ? content.items : defaultFaqs;

  return (
    <section className="py-20 bg-background">
      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 xl:px-16">
        <div className="max-w-3xl mx-auto">
          {/* Header */}
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl lg:text-5xl text-foreground font-bold mb-4">
              {title}
            </h2>
            <p className="text-muted-foreground text-lg">
              {description}
            </p>
          </div>

          {/* Accordion */}
          <Accordion type="single" collapsible className="space-y-4">
            {faqs.map((faq, index) => (
              <AccordionItem
                key={index}
                value={`item-${index}`}
                className="bg-white rounded-2xl shadow-soft border-none px-6"
              >
                <AccordionTrigger className="text-left text-lg font-semibold text-foreground hover:text-primary py-6 hover:no-underline">
                  {faq.question}
                </AccordionTrigger>
                <AccordionContent className="text-muted-foreground leading-relaxed pb-6">
                  {faq.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>

          {/* CTA */}
          <div className="text-center mt-10">
            <p className="text-muted-foreground mb-4">Still have questions?</p>
            <a
              href="#contact"
              className="btn-primary"
            >
              Contact Our Team
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
