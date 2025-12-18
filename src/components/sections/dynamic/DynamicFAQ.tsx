import { FAQSectionData } from "@/lib/sections/registry";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

interface Props {
  data: FAQSectionData;
}

export function DynamicFAQ({ data }: Props) {
  return (
    <section 
      className="py-20 bg-background"
      data-section-id={data.sectionId}
      data-section-type={data.type}
    >
      <div className="container mx-auto px-4">
        <div className="max-w-3xl mx-auto">
          {data.title && (
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl lg:text-5xl text-foreground font-bold mb-4">
                {data.title}
              </h2>
            </div>
          )}

          <Accordion type="single" collapsible className="space-y-4">
            {data.faq_items.map((faq, index) => (
              <AccordionItem
                key={index}
                value={`item-${index}`}
                className="bg-card rounded-2xl shadow-soft border-none px-6"
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
        </div>
      </div>
    </section>
  );
}
