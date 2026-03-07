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
    question: "What is Ketamine?",
    answer: "Ketamine, an FDA-approved anesthetic agent developed in 1962, has been primarily used as an induction agent for general anesthesia in surgeries involving children, adults, and animals. Its remarkable safety track record has made it a preferred choice in pediatric anesthesia. Recently, ketamine has been found to be highly effective in treating conditions such as depression, PTSD, fibromyalgia, and more."
  },
  {
    question: "What is the success rate in treating depression?",
    answer: "Research studies indicate that ketamine infusions can effectively treat depression in 60-80% of individuals. While the effects of ketamine typically last for several weeks, some people may remain free from depression for months."
  },
  {
    question: "What is the minimum age for treatment?",
    answer: "18 years old."
  },
  {
    question: "How does it help treat depression?",
    answer: "Ketamine's mechanism of action is entirely different from that of any other antidepressant medication. The exact process by which ketamine alleviates depression is complex and still under investigation. What we do know is that it acts on a neurotransmitter called glutamate, which leads to the production of an important growth factor that helps the brain repair neurons damaged by stress and mental illness. Consequently, ketamine can improve mood within hours or days and promote the regeneration of nerve cells over time."
  },
  {
    question: "What disorders can ketamine infusions treat?",
    answer: "At Relaxol Clinic, we utilize evidence-based research to administer ketamine infusion therapy to our patients. Our primary goal is to treat mental illness and offer an alternative for those who have not found success with traditional medications or psychotherapy. Promising data has shown robust effects in treating severe, chronic, treatment-resistant depression. Therefore, individuals diagnosed with major depression, bipolar depression, postpartum depression, or dysthymia may benefit from ketamine infusions. Research has also indicated that ketamine can be effective in treating fibromyalgia, post-traumatic stress disorder (PTSD), and suicidal ideation. Additionally, ketamine shows promise in alleviating symptoms of obsessive-compulsive disorder (OCD) and various anxiety disorders."
  },
  {
    question: "Are there any specific medical conditions that would prevent me from receiving treatment?",
    answer: "Ketamine infusion therapy is not recommended for patients diagnosed with psychosis. If you have high blood pressure, cardiac, or pulmonary issues, it may be necessary for your primary care physician to provide medical clearance before beginning ketamine infusions."
  },
  {
    question: "Can I eat and/or drink prior to my infusion?",
    answer: "Please refrain from consuming any solid foods or milk for 6 hours before your ketamine infusion. You may drink clear liquids (such as water, fruit juices without pulp, carbonated beverages, clear tea, and black coffee) up until 2 hours before your infusion. It is crucial to avoid alcohol and any illicit drugs, as these substances can be extremely dangerous when combined with ketamine."
  },
  {
    question: "Will I be asleep during the procedure?",
    answer: "No, the dose of ketamine you will receive will not cause any loss of consciousness."
  },
  {
    question: "Is this treatment legal?",
    answer: "Ketamine is FDA-approved as an anesthetic, which is why its use for pain treatment can sometimes be covered by insurance. In 2019, the S-form of ketamine was approved to treat depression as a nasal spray called Spravato®. Our medical professionals use Spravato® and the R-form of ketamine, which is legal to prescribe but not FDA-approved and considered 'off-label.' According to WebMD, over 20% of prescriptions in the US are for off-label therapies."
  },
  {
    question: "What administration methods are used for Ketamine Therapy?",
    answer: "Ketamine Infusion: Administered intravenously (IV), this method delivers the medication directly into the bloodstream for rapid and effective relief. Intranasal Sprays: Es-Ketamine, a derivative of Ketamine, is administered via a nasal spray, offering a convenient and non-invasive option. Oral Tablets: Although less common, Ketamine can also be taken in pill form for those who prefer this method."
  },
  {
    question: "What is involved in a ketamine infusion?",
    answer: "Patients will usually receive infusion therapy in a private room with constant mechanical monitoring of heart rate, pulse, blood oxygen saturation percentages and blood pressure. Infusion therapy means an IV will be placed and an appropriate dose of ketamine will be administered over a 40-minute time frame or longer. Practitioners can see a patient's vital signs from the monitors at all times from the nursing station. However, patients will notice that a practitioner will enter the patient treatment room several times during the active phase of the infusion to monitor the depth of sedation and ensure patient comfort. Most patients report a relaxing and peaceful experience. Patients will most likely experience changes in vision and their ability to clearly focus on objects or people, speech will be slurred or slowed, and most will have an experience of floating or being disconnected. Patients on average should expect to spend 90 to 120 minutes in the office allowing for the check in procedure, the active phase of infusion, and recovery time. Patients will need a trusted friend or family member to drive you home after your infusion. Patient may drive and return to work the next day. Patients may have a friend or family member in the treatment room during infusion, but this is not necessary."
  },
  {
    question: "Is Ketamine therapy addictive?",
    answer: "No. Not one of our patients has displayed or reported any symptoms of addiction."
  },
  {
    question: "What are the risks of Ketamine?",
    answer: "The dose used for treating mood and anxiety disorders is very low and safe. During ketamine treatments, blood pressure and heart rate may increase, but these are closely monitored to ensure your safety."
  },
  {
    question: "Will I require Ketamine therapy for the rest of my life?",
    answer: "No. Some patients experience long-term relief after just one series of infusions. Others find that infusions enhance the effectiveness of antidepressants or provide initial relief that is then maintained with oral medications, other therapies, and lifestyle changes. If ketamine therapy is your primary solution, you may be able to space your infusions 3-6 months apart. Once the initial series of infusions restores the brain to a healthy balance, maintaining that balance is generally easier than achieving it initially. Follow-up or 'booster' infusions are available on an as-needed basis for maintenance."
  },
  {
    question: "How do I know if the infusion worked? How soon will I begin to feel better?",
    answer: "Some patients begin to feel better within an hour of their first infusion. Those with thoughts of self-harm or suicidal ideation often notice these thoughts and feelings dissipate almost immediately, experiencing dramatic relief from dread and hopelessness. Other patients may not see mood improvements until the day after their second infusion, and some may require a third infusion before feeling significantly better. It's important to note that while Ketamine's effects can be sudden and dramatic, they are not always so. More commonly, patients experience gradual, subtle improvements, with functional improvements sometimes preceding mood enhancements."
  },
  {
    question: "What should I expect after my ketamine treatment?",
    answer: "Many patients recover within 20-30 minutes after the infusion. You may feel a bit tired, experience mild difficulty walking, or have 'cloudy thinking' for a few hours afterward. We recommend taking it easy and having a relaxing day following the infusion. We will ensure you are ready and safe before you go home."
  },
  {
    question: "What is the goal for Ketamine therapy?",
    answer: "Our goal is to significantly improve your mood disorder. As your symptoms decrease, you can expect to increase your activity level and enhance your overall quality of life."
  },
  {
    question: "Does Ketamine cause hallucination?",
    answer: "Ketamine can cause hallucinations when administered alone. To minimize this side effect, we use midazolam, a highly effective benzodiazepine. It is very rare for a patient to discontinue treatment due to ketamine's side effects."
  },
  {
    question: "Will I be treated as an outpatient?",
    answer: "Yes. This is outpatient Ketamine treatment."
  },
  {
    question: "What is your Privacy Policy?",
    answer: "All patient's information is confidential. Under the State regulation we do not sale, release or share the patient information without your written Consent."
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
  const heroDescription = cms?.hero?.description || "Frequently asked questions about Ketamine Therapy. Every individual's case is unique, we encourage you to contact us for a free consultation to determine whether this is suitable for you.";

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
