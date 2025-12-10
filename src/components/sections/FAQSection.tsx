import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const faqs = [
  {
    question: "What conditions can be treated with these therapies?",
    answer: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
  },
  {
    question: "How long does each treatment session last?",
    answer: "Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
  },
  {
    question: "Is treatment covered by insurance?",
    answer: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Many insurance plans now provide reimbursement to their members for a portion of the treatment costs. Our dedicated insurance specialist can help negotiate your estimated reimbursement.",
  },
  {
    question: "What should I expect during my first visit?",
    answer: "Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. During your initial consultation, our team will review your medical history, discuss your symptoms and treatment goals, and create a personalized care plan tailored to your needs.",
  },
];

export function FAQSection() {
  return (
    <section className="py-20 bg-background">
      <div className="container mx-auto px-4">
        <div className="max-w-3xl mx-auto">
          {/* Header */}
          <div className="text-center mb-12">
            <h2 className="font-serif text-3xl md:text-4xl lg:text-5xl text-foreground font-bold mb-4">
              Frequently Asked Questions
            </h2>
            <p className="text-muted-foreground text-lg">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Find answers to common questions about our treatments.
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
                <AccordionTrigger className="text-left font-serif text-lg font-semibold text-foreground hover:text-primary py-6 hover:no-underline">
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
            <a
              href="#"
              className="btn-outline"
            >
              View All FAQs
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
