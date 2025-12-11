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

// FAQ Data organized by section
const faqSections = [
  {
    id: "general",
    title: "General Questions",
    faqs: [
      {
        question: "What is Ketamine?",
        answer: "Ketamine is an FDA-approved anesthetic agent developed in 1962, primarily used as an induction agent for general anesthesia in surgeries. Its remarkable safety track record has made it a preferred choice in pediatric anesthesia. Recently, ketamine has been found to be highly effective in treating conditions such as depression, PTSD, fibromyalgia, and more."
      },
      {
        question: "What is the success rate in treating depression?",
        answer: "Research studies indicate that ketamine infusions can effectively treat depression in 60-80% of individuals. While the effects of ketamine typically last for several weeks, some people may remain free from depression for months."
      },
      {
        question: "What is the minimum age for treatment?",
        answer: "The minimum age for ketamine treatment at our clinic is 18 years old."
      },
      {
        question: "How does ketamine help treat depression?",
        answer: "Ketamine's mechanism of action is entirely different from other antidepressant medications. It acts on a neurotransmitter called glutamate, which leads to the production of an important growth factor that helps the brain repair neurons damaged by stress and mental illness. Consequently, ketamine can improve mood within hours or days and promote the regeneration of nerve cells over time."
      },
      {
        question: "What disorders can ketamine infusions treat?",
        answer: "At Relaxol Clinic, we utilize evidence-based research to administer ketamine infusion therapy. Our primary goal is to treat mental illness and offer an alternative for those who haven't found success with traditional medications or psychotherapy. Ketamine shows robust effects in treating severe, chronic, treatment-resistant depression—including major depression, bipolar depression, postpartum depression, and dysthymia. Research also indicates effectiveness for fibromyalgia, PTSD, suicidal ideation, OCD, and various anxiety disorders."
      },
      {
        question: "What administration methods are used for Ketamine Therapy?",
        answer: "We offer several administration methods: (1) Ketamine Infusion—administered intravenously (IV) for rapid and effective relief directly into the bloodstream; (2) Intranasal Sprays—Es-Ketamine (SPRAVATO®) is administered via a nasal spray, offering a convenient and non-invasive option; (3) Oral Tablets—though less common, ketamine can also be taken in pill form for those who prefer this method."
      },
      {
        question: "Is ketamine treatment legal?",
        answer: "Yes. Ketamine is FDA-approved as an anesthetic, which is why its use for pain treatment can sometimes be covered by insurance. In 2019, the S-form of ketamine was approved to treat depression as a nasal spray called SPRAVATO®. Our medical professionals use SPRAVATO® and the R-form of ketamine, which is legal to prescribe but considered 'off-label.' According to WebMD, over 20% of prescriptions in the US are for off-label therapies."
      },
      {
        question: "Is Ketamine therapy addictive?",
        answer: "No. Not one of our patients has displayed or reported any symptoms of addiction when ketamine is administered in a controlled clinical setting under medical supervision."
      },
    ],
  },
  {
    id: "safety",
    title: "Safety & Medical Monitoring",
    faqs: [
      {
        question: "Are there specific medical conditions that would prevent me from receiving treatment?",
        answer: "Ketamine infusion therapy is not recommended for patients diagnosed with psychosis. If you have high blood pressure, cardiac, or pulmonary issues, it may be necessary for your primary care physician to provide medical clearance before beginning ketamine infusions."
      },
      {
        question: "What are the risks of Ketamine?",
        answer: "The dose used for treating mood and anxiety disorders is very low and safe. During ketamine treatments, blood pressure and heart rate may increase temporarily, but these are closely monitored by our clinical staff to ensure your safety throughout the procedure."
      },
      {
        question: "Does Ketamine cause hallucinations?",
        answer: "Ketamine can cause mild dissociative effects when administered alone. To minimize any side effects, we use supportive medications when appropriate. It is very rare for a patient to discontinue treatment due to ketamine's side effects."
      },
    ],
  },
  {
    id: "eligibility",
    title: "Candidate Eligibility",
    faqs: [
      {
        question: "Who is a good candidate for ketamine therapy?",
        answer: "Good candidates typically include adults (18+) who have been diagnosed with treatment-resistant depression, anxiety disorders, PTSD, or OCD and have not found adequate relief through traditional medications or psychotherapy. Patients experiencing suicidal ideation may also benefit from ketamine's rapid-acting effects."
      },
      {
        question: "Do I need a referral from my doctor?",
        answer: "While a referral is not required, we do recommend discussing ketamine therapy with your current mental health provider or primary care physician. During your initial consultation, our team will review your medical history and determine if ketamine treatment is appropriate for you."
      },
    ],
  },
  {
    id: "experience",
    title: "Treatment Experience",
    faqs: [
      {
        question: "Can I eat and/or drink prior to my infusion?",
        answer: "Please refrain from consuming any solid foods or milk for 6 hours before your ketamine infusion. You may drink clear liquids (such as water, fruit juices without pulp, carbonated beverages, clear tea, and black coffee) up until 2 hours before your infusion. It is crucial to avoid alcohol and any illicit drugs, as these substances can be dangerous when combined with ketamine."
      },
      {
        question: "Will I be asleep during the procedure?",
        answer: "No, the dose of ketamine you will receive will not cause any loss of consciousness. You will remain awake but in a relaxed, comfortable state throughout the treatment."
      },
      {
        question: "What is involved in a ketamine infusion?",
        answer: "Patients receive infusion therapy in a private room with constant monitoring of heart rate, pulse, blood oxygen saturation, and blood pressure. An IV will be placed and ketamine will be administered over a 40-minute time frame or longer. Practitioners monitor vital signs continuously and will check on you several times during the infusion. Most patients report a relaxing and peaceful experience. You may experience changes in vision, slowed speech, and feelings of floating or disconnection. Expect to spend 90 to 120 minutes in the office total. You will need a trusted friend or family member to drive you home afterward."
      },
      {
        question: "How do I know if the infusion worked? How soon will I feel better?",
        answer: "Some patients begin to feel better within an hour of their first infusion. Those with thoughts of self-harm often notice these feelings dissipate almost immediately. Other patients may not see mood improvements until the day after their second infusion, and some may require a third infusion before feeling significantly better. While ketamine's effects can be sudden and dramatic, they are often more gradual and subtle, with functional improvements sometimes preceding mood enhancements."
      },
      {
        question: "What should I expect after my ketamine treatment?",
        answer: "Many patients recover within 20-30 minutes after the infusion. You may feel a bit tired, experience mild difficulty walking, or have 'cloudy thinking' for a few hours afterward. We recommend taking it easy and having a relaxing day following the infusion. Our team will ensure you are ready and safe before you go home."
      },
      {
        question: "What is the goal for Ketamine therapy?",
        answer: "Our goal is to significantly improve your mood disorder. As your symptoms decrease, you can expect to increase your activity level and enhance your overall quality of life."
      },
    ],
  },
  {
    id: "logistics",
    title: "Insurance & Logistics",
    faqs: [
      {
        question: "Will I require Ketamine therapy for the rest of my life?",
        answer: "No. Some patients experience long-term relief after just one series of infusions. Others find that infusions enhance the effectiveness of antidepressants or provide initial relief that is then maintained with oral medications, other therapies, and lifestyle changes. If ketamine therapy is your primary solution, you may be able to space your infusions 3-6 months apart. Follow-up or 'booster' infusions are available on an as-needed basis for maintenance."
      },
      {
        question: "Will I be treated as an outpatient?",
        answer: "Yes. All ketamine treatments at Relaxol Clinic are performed on an outpatient basis. You will be able to go home the same day after a brief recovery period."
      },
      {
        question: "Is ketamine therapy covered by insurance?",
        answer: "SPRAVATO® (esketamine nasal spray) is FDA-approved and may be covered by many insurance plans. IV ketamine infusions are typically considered off-label and may not be covered by insurance. Our team can help you verify your benefits and discuss payment options during your consultation."
      },
      {
        question: "What is your Privacy Policy?",
        answer: "All patient information is strictly confidential. Under state regulations, we do not sell, release, or share patient information without your written consent."
      },
    ],
  },
];

const FAQPage = () => {
  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main>
        {/* Hero Section */}
        <section className="py-16 md:py-24 bg-gradient-to-b from-cream to-primary/10">
          <div className="container mx-auto px-4 text-center">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-foreground mb-6">
              Frequently Asked Questions
            </h1>
            <p className="text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto">
              Clear answers about ketamine therapy, SPRAVATO®, safety, and the treatment process.
            </p>
          </div>
        </section>

        {/* Table of Contents */}
        <section className="py-8 bg-background border-b border-border">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <p className="text-sm font-semibold text-muted-foreground mb-4 uppercase tracking-wider">
                On this page:
              </p>
              <div className="flex flex-wrap gap-3">
                {faqSections.map((section) => (
                  <button
                    key={section.id}
                    onClick={() => scrollToSection(section.id)}
                    className="px-4 py-2 rounded-full bg-cream-dark text-foreground text-sm font-medium hover:bg-primary hover:text-primary-foreground transition-colors"
                  >
                    {section.title}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* FAQ Sections */}
        <section className="py-16 md:py-24 bg-background">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto space-y-16">
              {faqSections.map((section) => (
                <div key={section.id} id={section.id} className="scroll-mt-24">
                  <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-8">
                    {section.title}
                  </h2>
                  <Accordion type="single" collapsible className="space-y-4">
                    {section.faqs.map((faq, index) => (
                      <AccordionItem
                        key={index}
                        value={`${section.id}-${index}`}
                        className="bg-card rounded-2xl border border-border/30 px-6 overflow-hidden"
                      >
                        <AccordionTrigger className="text-left text-lg md:text-xl font-semibold text-foreground hover:text-primary py-6 hover:no-underline [&[data-state=open]>svg]:rotate-180">
                          {faq.question}
                        </AccordionTrigger>
                        <AccordionContent className="text-muted-foreground leading-relaxed pb-6 text-base">
                          {faq.answer}
                        </AccordionContent>
                      </AccordionItem>
                    ))}
                  </Accordion>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-16 md:py-24 bg-cream-dark">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
              Still Have Questions? We're Here to Help.
            </h2>
            <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">
              Our team is ready to answer any additional questions and help you determine if ketamine therapy is right for you.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button 
                size="lg" 
                className="bg-primary text-primary-foreground hover:bg-accent rounded-full px-8"
                asChild
              >
                <Link to="/#contact">Schedule a Consultation</Link>
              </Button>
              <Button 
                size="lg" 
                variant="outline" 
                className="border-2 border-foreground text-foreground hover:bg-foreground hover:text-background rounded-full px-8"
              >
                <a href="tel:201-781-2101">Contact Our Team</a>
              </Button>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default FAQPage;
