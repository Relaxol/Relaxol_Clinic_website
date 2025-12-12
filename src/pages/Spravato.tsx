import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { Button } from "@/components/ui/button";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Card, CardContent } from "@/components/ui/card";
import clinicInterior from "@/assets/spravato-clinic-interior.jpg";
import abstractMedical from "@/assets/spravato-abstract-medical.jpg";
import { 
  ShieldCheck, 
  Stethoscope, 
  FileCheck, 
  Brain, 
  HeartPulse, 
  Pill, 
  UserCheck,
  ClipboardCheck,
  Activity,
  CalendarCheck,
  Clock,
  Sofa,
  Eye,
  Car,
  AlertCircle,
  ArrowRight,
  CheckCircle2,
  Building2
} from "lucide-react";

// Credibility strip items
const credibilityItems = [
  { icon: ShieldCheck, text: "FDA-Approved" },
  { icon: Building2, text: "In-Clinic Administration" },
  { icon: Stethoscope, text: "Medically Supervised" },
  { icon: FileCheck, text: "Insurance Accepted" },
];

// Timeline steps
const treatmentSteps = [
  {
    icon: ClipboardCheck,
    title: "Evaluation & Eligibility",
    description: "Comprehensive psychiatric assessment to determine if SPRAVATO® is right for you."
  },
  {
    icon: Activity,
    title: "In-Clinic Administration",
    description: "Self-administer the nasal spray under direct clinical supervision."
  },
  {
    icon: Clock,
    title: "Observation Period",
    description: "Rest comfortably while our team monitors your response for ~2 hours."
  },
  {
    icon: CalendarCheck,
    title: "Follow-Up Care",
    description: "Continue with personalized maintenance and ongoing psychiatric support."
  },
];

// Reassurance points
const reassurancePoints = [
  { icon: Sofa, text: "Calm, comfortable environment" },
  { icon: Eye, text: "Continuous clinician monitoring" },
  { icon: Clock, text: "Same-day observation included" },
  { icon: Car, text: "No driving required post-treatment" },
];

// Who may benefit cards
const benefitCards = [
  {
    icon: Brain,
    title: "Treatment-Resistant Depression",
    description: "Depression that hasn't responded to standard antidepressants."
  },
  {
    icon: Pill,
    title: "Inadequate Medication Response",
    description: "Tried two or more antidepressants without adequate relief."
  },
  {
    icon: HeartPulse,
    title: "Major Depressive Disorder with Suicidal Ideation",
    description: "Adults with MDD experiencing acute suicidal thoughts."
  },
  {
    icon: UserCheck,
    title: "Clinician-Evaluated Eligibility",
    description: "Final candidacy determined through professional evaluation."
  },
];

// Safety accordion items
const safetyAccordionItems = [
  {
    id: "side-effects",
    title: "Common Side Effects",
    content: "Temporary effects may include dissociation, dizziness, nausea, sedation, and temporary blood pressure changes. Most side effects resolve within a few hours of treatment."
  },
  {
    id: "monitoring",
    title: "Monitoring Requirements",
    content: "Vital signs are checked before, during, and after each session. You'll remain in our clinic for approximately 2 hours post-administration under continuous observation."
  },
  {
    id: "protocols",
    title: "Safety Protocols",
    content: "SPRAVATO® is only available through certified REMS healthcare settings. Our trained psychiatric staff follows strict FDA-mandated protocols with emergency equipment readily available."
  },
];

export default function Spravato() {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      {/* 1. HERO SECTION - Two Column */}
      <section className="relative py-20 lg:py-28 bg-background overflow-hidden">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            {/* Left: Text Content */}
            <div className="space-y-6">
              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-foreground leading-tight">
                SPRAVATO® Treatment for Treatment-Resistant Depression
              </h1>
              <h2 className="text-xl md:text-2xl text-muted-foreground font-medium">
                FDA-approved care delivered in a medically supervised setting
              </h2>
              
              <div className="flex flex-col sm:flex-row gap-4 pt-4">
                <Button size="lg" className="group" asChild>
                  <a href="#contact">
                    Request a Consultation
                    <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
                  </a>
                </Button>
                <Button variant="ghost" size="lg" asChild>
                  <a href="#eligibility" className="text-primary hover:text-primary/80">
                    Is SPRAVATO® Right for Me?
                  </a>
                </Button>
              </div>
            </div>
            
            {/* Right: Image */}
            <div className="relative">
              <img 
                src={clinicInterior} 
                alt="Modern SPRAVATO treatment room at Relaxol Clinic"
                className="w-full rounded-2xl shadow-xl"
              />
            </div>
          </div>
        </div>
      </section>

      {/* 2. CREDIBILITY STRIP */}
      <section className="py-8 bg-card border-y border-border">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
            {credibilityItems.map((item, index) => (
              <div 
                key={index} 
                className="flex items-center gap-3 justify-center lg:justify-start"
              >
                <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                  <item.icon className="w-5 h-5 text-primary" />
                </div>
                <span className="text-sm font-semibold text-foreground">
                  {item.text}
                </span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 3. WHAT IS SPRAVATO - Condensed */}
      <section className="py-20 lg:py-28 bg-background">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
            {/* Left: Text */}
            <div className="space-y-6">
              <span className="text-primary font-semibold text-sm uppercase tracking-widest">
                About the Treatment
              </span>
              <h2 className="text-3xl md:text-4xl font-semibold text-foreground leading-tight">
                What is SPRAVATO®?
              </h2>
              
              <div className="space-y-4 text-muted-foreground leading-relaxed">
                <p>
                  SPRAVATO® (esketamine) is an FDA-approved nasal spray for adults with 
                  treatment-resistant depression or major depressive disorder with suicidal 
                  thoughts.
                </p>
                <p>
                  Unlike traditional antidepressants, SPRAVATO® works on the glutamate 
                  system—a different brain pathway that may help restore neural connections 
                  weakened by depression.
                </p>
              </div>
              
              <ul className="space-y-3 pt-2">
                <li className="flex items-center gap-3">
                  <CheckCircle2 className="w-5 h-5 text-primary flex-shrink-0" />
                  <span className="text-foreground">Nasal spray administered in-clinic</span>
                </li>
                <li className="flex items-center gap-3">
                  <CheckCircle2 className="w-5 h-5 text-primary flex-shrink-0" />
                  <span className="text-foreground">Available only at certified REMS settings</span>
                </li>
                <li className="flex items-center gap-3">
                  <CheckCircle2 className="w-5 h-5 text-primary flex-shrink-0" />
                  <span className="text-foreground">Used alongside an oral antidepressant</span>
                </li>
              </ul>
            </div>
            
            {/* Right: Abstract Medical Visual */}
            <div className="relative">
              <img 
                src={abstractMedical} 
                alt="Neural pathway illustration representing SPRAVATO mechanism"
                className="w-full rounded-2xl shadow-xl"
              />
            </div>
          </div>
        </div>
      </section>

      {/* 4. HOW TREATMENT WORKS - Timeline Style */}
      <section className="py-20 lg:py-28 bg-card">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <span className="text-primary font-semibold text-sm uppercase tracking-widest">
              The Process
            </span>
            <h2 className="text-3xl md:text-4xl font-semibold text-foreground mt-4">
              How the Treatment Works
            </h2>
          </div>
          
          {/* Desktop: Horizontal Timeline */}
          <div className="hidden lg:block">
            <div className="grid grid-cols-4 gap-6">
              {treatmentSteps.map((step, index) => (
                <div key={index} className="relative">
                  {/* Connector Line */}
                  {index < treatmentSteps.length - 1 && (
                    <div className="absolute top-8 left-1/2 w-full h-0.5 bg-border z-0" />
                  )}
                  
                  <div className="relative z-10 flex flex-col items-center text-center">
                    <div className="w-16 h-16 rounded-full bg-primary text-primary-foreground flex items-center justify-center mb-4 shadow-lg">
                      <step.icon className="w-7 h-7" />
                    </div>
                    <h3 className="text-lg font-semibold text-foreground mb-2">
                      {step.title}
                    </h3>
                    <p className="text-muted-foreground text-sm leading-relaxed">
                      {step.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
          
          {/* Mobile: Vertical Timeline */}
          <div className="lg:hidden space-y-8">
            {treatmentSteps.map((step, index) => (
              <div key={index} className="flex gap-4">
                <div className="flex flex-col items-center">
                  <div className="w-12 h-12 rounded-full bg-primary text-primary-foreground flex items-center justify-center flex-shrink-0">
                    <step.icon className="w-5 h-5" />
                  </div>
                  {index < treatmentSteps.length - 1 && (
                    <div className="w-0.5 h-full bg-border mt-2" />
                  )}
                </div>
                <div className="pb-4">
                  <h3 className="text-lg font-semibold text-foreground mb-1">
                    {step.title}
                  </h3>
                  <p className="text-muted-foreground text-sm leading-relaxed">
                    {step.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 5. WHAT TO EXPECT - Reassurance Block */}
      <section className="py-16 lg:py-20 bg-secondary/30">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-2xl md:text-3xl font-semibold text-foreground text-center mb-10">
              What to Expect During Your Visit
            </h2>
            
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {reassurancePoints.map((point, index) => (
                <div 
                  key={index}
                  className="flex items-center gap-3 bg-background rounded-xl p-4 shadow-sm"
                >
                  <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                    <point.icon className="w-5 h-5 text-primary" />
                  </div>
                  <span className="text-foreground font-medium text-sm">
                    {point.text}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* 6. WHO MAY BENEFIT - Card Based */}
      <section id="eligibility" className="py-20 lg:py-28 bg-background scroll-mt-24">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <span className="text-primary font-semibold text-sm uppercase tracking-widest">
              Eligibility
            </span>
            <h2 className="text-3xl md:text-4xl font-semibold text-foreground mt-4 mb-4">
              Who May Benefit from SPRAVATO®
            </h2>
            <p className="text-muted-foreground">
              Candidates typically include adults who meet specific clinical criteria.
            </p>
          </div>
          
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {benefitCards.map((card, index) => (
              <Card key={index} className="border-border/50 shadow-sm hover:shadow-md transition-shadow">
                <CardContent className="p-6">
                  <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mb-4">
                    <card.icon className="w-6 h-6 text-primary" />
                  </div>
                  <h3 className="text-lg font-semibold text-foreground mb-2">
                    {card.title}
                  </h3>
                  <p className="text-muted-foreground text-sm leading-relaxed">
                    {card.description}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
          
          <p className="text-center text-muted-foreground text-sm mt-10 flex items-center justify-center gap-2">
            <AlertCircle className="w-4 h-4" />
            Final eligibility determined by a licensed clinician after thorough evaluation.
          </p>
        </div>
      </section>

      {/* 7. SAFETY & SIDE EFFECTS - Accordion */}
      <section className="py-20 lg:py-28 bg-card">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto">
            <div className="text-center mb-12">
              <span className="text-primary font-semibold text-sm uppercase tracking-widest">
                Safety Information
              </span>
              <h2 className="text-3xl md:text-4xl font-semibold text-foreground mt-4">
                Safety & Side Effects
              </h2>
            </div>
            
            <Accordion type="single" collapsible className="space-y-4">
              {safetyAccordionItems.map((item) => (
                <AccordionItem 
                  key={item.id} 
                  value={item.id}
                  className="bg-background rounded-xl px-6 border-none shadow-sm"
                >
                  <AccordionTrigger className="text-left font-semibold text-foreground hover:no-underline py-5">
                    {item.title}
                  </AccordionTrigger>
                  <AccordionContent className="text-muted-foreground leading-relaxed pb-5">
                    {item.content}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
            
            <p className="text-center text-muted-foreground text-sm mt-8">
              Your clinician will discuss all potential effects before starting treatment.
            </p>
          </div>
        </div>
      </section>

      {/* 8. INSURANCE & ACCESS */}
      <section className="py-20 lg:py-28 bg-background">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto text-center">
            <span className="text-primary font-semibold text-sm uppercase tracking-widest">
              Coverage
            </span>
            <h2 className="text-3xl md:text-4xl font-semibold text-foreground mt-4 mb-6">
              Insurance & Access
            </h2>
            <p className="text-muted-foreground text-lg mb-8">
              We work with many major insurance providers. Our team will verify your benefits 
              and assist with prior authorization to help maximize your coverage.
            </p>
            
            <Button size="lg" variant="outline" className="group" asChild>
              <a href="#contact">
                Verify Coverage
                <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
              </a>
            </Button>
          </div>
        </div>
      </section>

      {/* 9. FINAL CTA */}
      <section id="contact" className="py-20 lg:py-28 bg-foreground text-background scroll-mt-24">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-2xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl font-semibold mb-6">
              Take the Next Step
            </h2>
            <p className="text-background/80 text-lg mb-8">
              Speak with our care team to determine whether SPRAVATO® is appropriate for you.
            </p>
            
            <Button 
              size="lg" 
              className="bg-primary text-primary-foreground hover:bg-primary/90 group"
              asChild
            >
              <a href="/contact">
                Schedule a Consultation
                <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
              </a>
            </Button>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
