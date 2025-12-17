import { useState } from "react";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import treatmentKetamine from "@/assets/treatment-ketamine.jpg";
import treatmentRoom from "@/assets/treatment-room.jpg";
import ketamineRapidRelief from "@/assets/ketamine-rapid-relief.jpg";
import ketamineMechanism from "@/assets/ketamine-mechanism.jpg";
import ketamineSupervised from "@/assets/ketamine-supervised.jpg";
import ketaminePersonalized from "@/assets/ketamine-personalized.jpg";
import { 
  ShieldCheck, 
  Stethoscope, 
  FileCheck, 
  Brain, 
  HeartPulse, 
  Zap, 
  Clock,
  ClipboardCheck,
  Activity,
  CalendarCheck,
  ArrowRight,
  CheckCircle2,
  ShieldPlus,
  Timer,
  Eye,
  AlertCircle,
  Phone
} from "lucide-react";

// Credibility strip items
const credibilityItems = [
  { icon: ShieldCheck, text: "Medical Supervision" },
  { icon: Eye, text: "In-Clinic Monitoring" },
  { icon: FileCheck, text: "Evidence-Based" },
];

// What Ketamine Helps With cards
const conditionsCards = [
  {
    icon: HeartPulse,
    title: "Treatment-Resistant Depression",
    description: "Persistent symptoms despite trying multiple antidepressants."
  },
  {
    icon: Brain,
    title: "Ongoing Depressive Symptoms",
    description: "Depression that continues to affect daily functioning and quality of life."
  },
  {
    icon: Zap,
    title: "Limited Response to Medication",
    description: "Inadequate relief from standard oral antidepressants."
  },
  {
    icon: Stethoscope,
    title: "Need for an Alternative Approach",
    description: "Interest in evidence-based options that work differently in the brain."
  },
];

// Benefits cards with images
const benefitsCards = [
  {
    image: ketamineRapidRelief,
    title: "Rapid Relief for Some Patients",
    description: "Some individuals experience improvement sooner than with traditional medications."
  },
  {
    image: ketamineMechanism,
    title: "Different Mechanism of Action",
    description: "Ketamine works on glutamate pathways rather than traditional serotonin pathways."
  },
  {
    image: ketamineSupervised,
    title: "Medically Supervised Care",
    description: "Treatment is delivered in-clinic with monitoring before, during, and after each session."
  },
  {
    image: ketaminePersonalized,
    title: "Personalized Treatment Planning",
    description: "Therapy is tailored based on individual history, response, and clinical needs."
  },
];

// Timeline steps
const treatmentSteps = [
  {
    icon: ClipboardCheck,
    title: "Clinical Evaluation",
    description: "A thorough review of symptoms, medical history, and treatment background."
  },
  {
    icon: Activity,
    title: "In-Clinic Administration",
    description: "Ketamine is administered in a controlled medical setting."
  },
  {
    icon: Clock,
    title: "Monitoring & Observation",
    description: "Patients are monitored throughout the session by trained medical staff."
  },
  {
    icon: CalendarCheck,
    title: "Ongoing Care & Follow-Up",
    description: "Treatment plans are adjusted based on response and clinical guidance."
  },
];

// Experience features
const experienceFeatures = [
  "Calm, private clinical environment",
  "Continuous medical monitoring",
  "Dedicated care team present throughout treatment",
  "Structured follow-up and support"
];

// Safety accordion items
const safetyAccordionItems = [
  {
    id: "side-effects",
    title: "Common Side Effects",
    content: "Temporary effects may include dissociation, dizziness, nausea, drowsiness, and changes in perception. These typically resolve within 1-2 hours after treatment ends. Our clinical team monitors you throughout to ensure your comfort and safety."
  },
  {
    id: "monitoring",
    title: "Monitoring Procedures",
    content: "Your vital signs (blood pressure, heart rate, oxygen saturation) are checked before, during, and after each infusion. You'll remain in our clinic until effects have subsided and you're cleared to leave with a driver."
  },
  {
    id: "safety",
    title: "Safety Considerations",
    content: "Ketamine therapy is not suitable for everyone. Patients with uncontrolled hypertension, active substance abuse, or certain psychiatric conditions may not be candidates. A thorough evaluation ensures treatment is safe and appropriate for you."
  },
];

// Eligibility form component
function EligibilityForm({ variant = "default" }: { variant?: "default" | "dark" }) {
  const [formData, setFormData] = useState({
    triedAntidepressants: "",
    diagnosedDepression: "",
    zipCode: "",
    email: "",
    phone: ""
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Form submitted:", formData);
  };

  const isDark = variant === "dark";
  const labelClass = isDark ? "text-background/90" : "text-foreground";
  const inputClass = isDark 
    ? "bg-background/10 border-background/30 text-background placeholder:text-background/50 focus:border-background/60" 
    : "";
  const radioContainerClass = isDark 
    ? "bg-background/10 border-background/30 hover:bg-background/20" 
    : "bg-card border-border hover:bg-secondary/50";

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      {/* Question 1 */}
      <div className="space-y-2">
        <Label className={labelClass}>Have you tried 2+ antidepressants without lasting relief?</Label>
        <div className="flex gap-3">
          {["Yes", "No"].map((option) => (
            <button
              key={option}
              type="button"
              onClick={() => setFormData(prev => ({ ...prev, triedAntidepressants: option }))}
              className={`flex-1 py-3 px-4 rounded-lg border transition-all ${radioContainerClass} ${
                formData.triedAntidepressants === option 
                  ? "ring-2 ring-primary border-primary" 
                  : ""
              }`}
            >
              <span className={isDark ? "text-background" : "text-foreground"}>{option}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Question 2 */}
      <div className="space-y-2">
        <Label className={labelClass}>Are you currently diagnosed with depression, anxiety, or PTSD?</Label>
        <div className="flex gap-3">
          {["Yes", "No"].map((option) => (
            <button
              key={option}
              type="button"
              onClick={() => setFormData(prev => ({ ...prev, diagnosedDepression: option }))}
              className={`flex-1 py-3 px-4 rounded-lg border transition-all ${radioContainerClass} ${
                formData.diagnosedDepression === option 
                  ? "ring-2 ring-primary border-primary" 
                  : ""
              }`}
            >
              <span className={isDark ? "text-background" : "text-foreground"}>{option}</span>
            </button>
          ))}
        </div>
      </div>

      {/* ZIP Code */}
      <div className="space-y-2">
        <Label htmlFor="zipCode" className={labelClass}>ZIP Code</Label>
        <Input 
          id="zipCode"
          type="text"
          placeholder="Enter your ZIP code"
          value={formData.zipCode}
          onChange={(e) => setFormData(prev => ({ ...prev, zipCode: e.target.value }))}
          className={inputClass}
        />
      </div>

      {/* Contact fields */}
      <div className="grid sm:grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="email" className={labelClass}>Email</Label>
          <Input 
            id="email"
            type="email"
            placeholder="your@email.com"
            value={formData.email}
            onChange={(e) => setFormData(prev => ({ ...prev, email: e.target.value }))}
            className={inputClass}
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="phone" className={labelClass}>Phone</Label>
          <Input 
            id="phone"
            type="tel"
            placeholder="(555) 123-4567"
            value={formData.phone}
            onChange={(e) => setFormData(prev => ({ ...prev, phone: e.target.value }))}
            className={inputClass}
          />
        </div>
      </div>

      <Button type="submit" size="lg" className="w-full group">
        See If I Qualify
        <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
      </Button>
    </form>
  );
}

const Ketamine = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main>
        {/* 1. HERO SECTION - Service-First, Calm, Premium */}
        <section className="relative py-16 lg:py-24 overflow-hidden">
          <div className="absolute inset-0 bg-[#5C4A3A]" />
          <div className="absolute inset-0 bg-gradient-to-r from-[#4A3C32]/60 via-[#6B5A4A]/40 to-[#5C4A3A]/80" />
          
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            <div className="grid lg:grid-cols-2 gap-10 lg:gap-16 items-center">
              {/* Left: Text Content */}
              <div className="space-y-6">
                <span className="text-primary font-semibold text-sm uppercase tracking-widest">
                  KETAMINE INFUSION THERAPY
                </span>
                <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-background leading-tight">
                  Ketamine Therapy in a Medically Supervised Setting
                </h1>
                <p className="text-xl text-background/80 leading-relaxed">
                  Personalized care for individuals who have not found relief with traditional depression treatments.
                </p>
                <p className="text-background/70 leading-relaxed">
                  Ketamine therapy is an evidence-supported option delivered in a calm clinical environment, with continuous medical oversight and individualized care.
                </p>
                
                <div className="flex flex-wrap gap-4 pt-2">
                  <Button size="lg" className="group" asChild>
                    <a href="#eligibility-form">
                      Learn if Ketamine Therapy Is Right for You
                      <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
                    </a>
                  </Button>
                </div>
                
                {/* Micro-trust row */}
                <div className="flex flex-wrap gap-6 pt-6">
                  {credibilityItems.map((item, index) => (
                    <div key={index} className="flex items-center gap-2">
                      <item.icon className="w-5 h-5 text-primary" />
                      <span className="text-background/90 text-sm font-medium">{item.text}</span>
                    </div>
                  ))}
                </div>
              </div>
              
              {/* Right: Image */}
              <div className="relative aspect-video rounded-2xl overflow-hidden shadow-2xl">
                <img 
                  src={treatmentKetamine}
                  alt="Patient receiving ketamine infusion therapy in comfortable clinical setting"
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
          </div>
        </section>

        {/* 2. ELIGIBILITY / CONTACT FORM */}
        <section id="eligibility-form" className="py-16 lg:py-24 bg-secondary/30 scroll-mt-20">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-start">
              {/* Left: Reassurance copy */}
              <div className="space-y-6">
                <h2 className="text-2xl md:text-3xl font-semibold text-foreground">
                  Find Out If You May Be a Candidate
                </h2>
                <p className="text-muted-foreground text-lg leading-relaxed">
                  Ketamine infusion therapy is designed for adults who haven't found adequate 
                  relief from traditional antidepressants. Complete this brief form to see 
                  if you may qualify.
                </p>
                
                <ul className="space-y-4 pt-4">
                  <li className="flex items-start gap-3">
                    <CheckCircle2 className="w-6 h-6 text-primary flex-shrink-0 mt-0.5" />
                    <span className="text-foreground">No obligation—we simply assess eligibility</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle2 className="w-6 h-6 text-primary flex-shrink-0 mt-0.5" />
                    <span className="text-foreground">Response within 48 hours from our care team</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle2 className="w-6 h-6 text-primary flex-shrink-0 mt-0.5" />
                    <span className="text-foreground">Confidential and secure submission</span>
                  </li>
                </ul>
              </div>
              
              {/* Right: Form */}
              <div className="bg-background rounded-2xl p-6 md:p-8 shadow-lg border border-border">
                <EligibilityForm />
              </div>
            </div>
          </div>
        </section>

        {/* 3. WHAT KETAMINE THERAPY HELPS WITH */}
        <section className="py-16 lg:py-24 bg-background">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center max-w-2xl mx-auto mb-12">
              <span className="text-primary font-semibold text-sm uppercase tracking-widest">
                Conditions
              </span>
              <h2 className="text-3xl md:text-4xl font-semibold text-foreground mt-4">
                What Ketamine Therapy Helps With
              </h2>
              <p className="text-muted-foreground mt-4">
                Ketamine therapy may be considered for individuals experiencing:
              </p>
            </div>
            
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {conditionsCards.map((card, index) => (
                <Card key={index} className="border-border/50 shadow-sm hover:shadow-md transition-shadow text-center">
                  <CardContent className="p-6">
                    <div className="w-14 h-14 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4">
                      <card.icon className="w-7 h-7 text-primary" />
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
          </div>
        </section>

        {/* 4. BENEFITS OF KETAMINE THERAPY - Visual Cards with Images */}
        <section className="py-16 lg:py-24 bg-card">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center max-w-2xl mx-auto mb-12">
              <span className="text-primary font-semibold text-sm uppercase tracking-widest">
                Why Ketamine Therapy
              </span>
              <h2 className="text-3xl md:text-4xl font-semibold text-foreground mt-4">
                Benefits of Ketamine Therapy
              </h2>
              <p className="text-muted-foreground mt-4">
                Why patients explore ketamine therapy:
              </p>
            </div>
            
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
              {benefitsCards.map((card, index) => (
                <Card key={index} className="bg-background border-none shadow-lg hover:shadow-xl transition-all hover:-translate-y-1 overflow-hidden">
                  <div className="aspect-[4/3] overflow-hidden">
                    <img 
                      src={card.image} 
                      alt={card.title}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <CardContent className="p-6 text-center">
                    <h3 className="text-lg font-semibold text-foreground mb-3">
                      {card.title}
                    </h3>
                    <p className="text-muted-foreground text-sm leading-relaxed">
                      {card.description}
                    </p>
                  </CardContent>
                </Card>
              ))}
            </div>
            
            {/* Soft CTA */}
            <div className="text-center mt-10">
              <Button variant="outline" asChild>
                <a href="#eligibility-form">
                  Check Your Eligibility
                  <ArrowRight className="w-4 h-4 ml-2" />
                </a>
              </Button>
            </div>
          </div>
        </section>

        {/* 5. WHAT IS KETAMINE THERAPY? */}
        <section className="py-16 lg:py-24 bg-background">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
              {/* Left: Text */}
              <div className="space-y-6">
                <span className="text-primary font-semibold text-sm uppercase tracking-widest">
                  About the Treatment
                </span>
                <h2 className="text-3xl md:text-4xl font-semibold text-foreground leading-tight">
                  What Is Ketamine Therapy?
                </h2>
                
                <p className="text-muted-foreground leading-relaxed">
                  Ketamine therapy uses a medication that has been studied for decades and is now used 
                  in controlled medical settings to help address certain mental health conditions, 
                  including depression.
                </p>
                
                <p className="text-muted-foreground leading-relaxed">
                  Unlike traditional antidepressants, ketamine works on different neural pathways 
                  in the brain that are associated with mood regulation, cognition, and emotional processing.
                </p>
                
                <p className="text-muted-foreground leading-relaxed">
                  When administered in a clinical environment, ketamine therapy follows strict medical 
                  protocols to ensure safety, monitoring, and appropriate patient support.
                </p>
              </div>
              
              {/* Right: Image */}
              <div className="relative aspect-[4/3] rounded-2xl overflow-hidden shadow-xl bg-secondary/50">
                <img 
                  src={treatmentRoom}
                  alt="Comfortable ketamine treatment room at Relaxol Clinic"
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
              </div>
            </div>
          </div>
        </section>

        {/* 6. HOW KETAMINE THERAPY WORKS - Process Timeline */}
        <section id="how-it-works" className="py-16 lg:py-24 bg-card scroll-mt-24">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center max-w-2xl mx-auto mb-16">
              <span className="text-primary font-semibold text-sm uppercase tracking-widest">
                The Process
              </span>
              <h2 className="text-3xl md:text-4xl font-semibold text-foreground mt-4">
                How Ketamine Therapy Works
              </h2>
              <p className="text-muted-foreground mt-4">
                Your care typically follows a structured process:
              </p>
            </div>
            
            {/* Timeline */}
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8 max-w-5xl mx-auto mb-16">
              {treatmentSteps.map((step, index) => (
                <div key={index} className="relative text-center">
                  {/* Connector line */}
                  {index < treatmentSteps.length - 1 && (
                    <div className="hidden lg:block absolute top-8 left-1/2 w-full h-0.5 bg-primary/20" />
                  )}
                  
                  {/* Step circle */}
                  <div className="relative z-10 w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4">
                    <step.icon className="w-7 h-7 text-primary" />
                  </div>
                  
                  <h3 className="text-lg font-semibold text-foreground mb-2">{step.title}</h3>
                  <p className="text-muted-foreground text-sm">{step.description}</p>
                </div>
              ))}
            </div>
            
            {/* Mechanism explanation */}
            <div className="bg-background rounded-2xl p-8 md:p-10 max-w-3xl mx-auto text-center">
              <Brain className="w-12 h-12 text-primary mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-foreground mb-4">
                How Ketamine Works in the Brain
              </h3>
              <p className="text-muted-foreground leading-relaxed mb-4">
                Ketamine affects glutamate signaling in the brain, which plays a key role in mood, 
                learning, and neural connectivity.
              </p>
              <p className="text-muted-foreground leading-relaxed">
                This mechanism is different from most traditional antidepressants and may help explain 
                why ketamine can be effective for individuals who have not responded to other treatments.
              </p>
            </div>
          </div>
        </section>

        {/* 7. YOUR KETAMINE THERAPY EXPERIENCE */}
        <section className="relative py-20 lg:py-28 overflow-hidden">
          <div className="absolute inset-0 bg-[#5C4A3A]" />
          <div className="absolute inset-0 bg-gradient-to-r from-[#4A3C32]/80 to-[#5C4A3A]/60" />
          
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <div className="space-y-6">
                <span className="text-primary font-semibold text-sm uppercase tracking-widest">
                  Your Experience
                </span>
                <h2 className="text-3xl md:text-4xl font-bold text-background leading-tight">
                  Your Ketamine Therapy Experience
                </h2>
                <p className="text-background/80 text-lg">
                  What patients can expect:
                </p>
                
                <ul className="space-y-4">
                  {experienceFeatures.map((feature, index) => (
                    <li key={index} className="flex items-center gap-3">
                      <CheckCircle2 className="w-6 h-6 text-primary flex-shrink-0" />
                      <span className="text-background/90 text-lg">{feature}</span>
                    </li>
                  ))}
                </ul>
                
                <p className="text-background/70 text-lg pt-4">
                  Our focus is on patient safety, comfort, and personalized care at every step.
                </p>
              </div>
              
              <div className="flex justify-center">
                <Button size="lg" className="group" asChild>
                  <a href="#eligibility-form">
                    Start Your Evaluation
                    <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
                  </a>
                </Button>
              </div>
            </div>
          </div>
        </section>

        {/* 8. SAFETY & SIDE EFFECTS - Accordion */}
        <section className="py-16 lg:py-24 bg-background">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-3xl mx-auto">
              <div className="text-center mb-12">
                <span className="text-primary font-semibold text-sm uppercase tracking-widest">
                  Your Safety Matters
                </span>
                <h2 className="text-3xl md:text-4xl font-semibold text-foreground mt-4">
                  Safety, Side Effects & Monitoring
                </h2>
                <p className="text-muted-foreground mt-4 max-w-2xl mx-auto">
                  Your safety is our priority. Ketamine therapy is provided under strict medical protocols, 
                  with careful screening and ongoing monitoring.
                </p>
              </div>
              
              <Accordion type="single" collapsible className="space-y-4">
                {safetyAccordionItems.map((item) => (
                  <AccordionItem 
                    key={item.id} 
                    value={item.id}
                    className="bg-card rounded-xl border border-border px-6"
                  >
                    <AccordionTrigger className="text-foreground hover:no-underline py-5">
                      <div className="flex items-center gap-3">
                        <AlertCircle className="w-5 h-5 text-primary" />
                        <span className="font-medium">{item.title}</span>
                      </div>
                    </AccordionTrigger>
                    <AccordionContent className="text-muted-foreground pb-5">
                      {item.content}
                    </AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            </div>
          </div>
        </section>

        {/* 9. INSURANCE & ACCESS */}
        <section className="py-16 lg:py-24 bg-card">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto text-center">
              <span className="text-primary font-semibold text-sm uppercase tracking-widest">
                Coverage & Cost
              </span>
              <h2 className="text-3xl md:text-4xl font-semibold text-foreground mt-4 mb-6">
                Insurance & Access
              </h2>
              <p className="text-muted-foreground text-lg max-w-2xl mx-auto mb-8">
                Ketamine therapy may be eligible for coverage depending on individual plans and clinical circumstances. 
                Our team can help review options and discuss next steps.
              </p>
              
              <div className="grid sm:grid-cols-3 gap-6 mb-10">
                <Card className="border-border/50">
                  <CardContent className="p-6 text-center">
                    <FileCheck className="w-10 h-10 text-primary mx-auto mb-3" />
                    <h3 className="font-semibold text-foreground mb-2">Coverage Check</h3>
                    <p className="text-muted-foreground text-sm">We'll verify any potential coverage for your treatment.</p>
                  </CardContent>
                </Card>
                <Card className="border-border/50">
                  <CardContent className="p-6 text-center">
                    <Timer className="w-10 h-10 text-primary mx-auto mb-3" />
                    <h3 className="font-semibold text-foreground mb-2">Transparent Pricing</h3>
                    <p className="text-muted-foreground text-sm">Clear pricing with no hidden fees or surprises.</p>
                  </CardContent>
                </Card>
                <Card className="border-border/50">
                  <CardContent className="p-6 text-center">
                    <ShieldPlus className="w-10 h-10 text-primary mx-auto mb-3" />
                    <h3 className="font-semibold text-foreground mb-2">HSA/FSA Accepted</h3>
                    <p className="text-muted-foreground text-sm">Use pre-tax health savings accounts for treatment.</p>
                  </CardContent>
                </Card>
              </div>
              
              <Button size="lg" asChild>
                <a href="tel:201-781-2101">
                  <Phone className="w-5 h-5 mr-2" />
                  Verify Coverage: 201-781-2101
                </a>
              </Button>
            </div>
          </div>
        </section>

        {/* 10. FINAL CTA + REPEATED FORM */}
        <section className="py-16 lg:py-24 bg-[#5C4A3A]">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-start">
              {/* Left: CTA copy */}
              <div className="space-y-6">
                <h2 className="text-3xl md:text-4xl font-bold text-background leading-tight">
                  Take the Next Step Toward Relief
                </h2>
                <p className="text-background/80 text-lg leading-relaxed">
                  If you are exploring alternatives after traditional treatments have not worked, 
                  our care team is here to help you understand whether ketamine therapy may be appropriate.
                </p>
                
                <div className="flex flex-wrap gap-6 pt-4">
                  {credibilityItems.map((item, index) => (
                    <div key={index} className="flex items-center gap-2">
                      <item.icon className="w-5 h-5 text-primary" />
                      <span className="text-background/90 text-sm font-medium">{item.text}</span>
                    </div>
                  ))}
                </div>
              </div>
              
              {/* Right: Form */}
              <div className="bg-background rounded-2xl p-6 md:p-8 shadow-lg">
                <h3 className="text-xl font-semibold text-foreground mb-6">Speak With Our Care Team</h3>
                <EligibilityForm />
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default Ketamine;
