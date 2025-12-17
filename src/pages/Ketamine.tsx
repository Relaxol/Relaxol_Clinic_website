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
  Sparkles,
  ShieldPlus,
  Timer,
  Eye,
  AlertCircle
} from "lucide-react";

// Credibility strip items
const credibilityItems = [
  { icon: ShieldCheck, text: "Medical Supervision" },
  { icon: Eye, text: "In-Clinic Monitoring" },
  { icon: FileCheck, text: "Evidence-Based" },
];

// Benefits cards
const benefitsCards = [
  {
    icon: Zap,
    title: "Rapid Symptom Relief",
    description: "Some patients experience improvement within hours to days, not the weeks typically required by traditional antidepressants."
  },
  {
    icon: Brain,
    title: "Works Differently",
    description: "Targets the glutamate system and NMDA receptors—a fundamentally different pathway than standard medications."
  },
  {
    icon: HeartPulse,
    title: "Treatment-Resistant Option",
    description: "Designed for patients who haven't found adequate relief from multiple traditional antidepressant trials."
  },
  {
    icon: Stethoscope,
    title: "Medically Supervised",
    description: "Every infusion is administered and monitored by trained clinical staff in a controlled environment."
  },
  {
    icon: Sparkles,
    title: "Evidence-Supported",
    description: "Backed by decades of research and clinical studies demonstrating efficacy for depression and related conditions."
  },
];

// Timeline steps
const treatmentSteps = [
  {
    icon: ClipboardCheck,
    title: "Evaluation",
    description: "Comprehensive assessment to determine if ketamine therapy is appropriate for your condition."
  },
  {
    icon: Activity,
    title: "Administration",
    description: "Relaxing 40-60 minute IV infusion in our comfortable, private treatment rooms."
  },
  {
    icon: Clock,
    title: "Monitoring",
    description: "Continuous vital sign monitoring and clinical observation throughout your session."
  },
  {
    icon: CalendarCheck,
    title: "Follow-Up",
    description: "Personalized aftercare and maintenance treatment planning with our clinical team."
  },
];

// Candidate qualifications
const candidateQualifications = [
  "Diagnosed with depression, anxiety, PTSD, or OCD",
  "Tried multiple antidepressants without lasting relief",
  "Seeking faster-acting treatment options",
  "Looking for alternatives to traditional medications",
  "Experiencing chronic pain alongside mood symptoms",
  "Open to innovative, evidence-based approaches"
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
    title: "Monitoring Protocols",
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
        {/* 1. HERO SECTION */}
        <section className="relative py-16 lg:py-24 overflow-hidden">
          {/* Warm brown background matching homepage branding */}
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
                  When Traditional Antidepressants Haven't Worked
                </h1>
                <h2 className="text-xl md:text-2xl text-background/80">
                  Medically supervised IV ketamine therapy for treatment-resistant depression, anxiety, and PTSD
                </h2>
                
                <div className="flex flex-wrap gap-4 pt-2">
                  <Button size="lg" className="group" asChild>
                    <a href="#eligibility-form">
                      Check Eligibility
                      <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
                    </a>
                  </Button>
                  
                  <a 
                    href="#who-candidate" 
                    className="inline-flex items-center text-background/70 hover:text-background underline underline-offset-4"
                  >
                    Am I a Candidate?
                  </a>
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
                  Find Out If You're a Candidate
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

        {/* 3. BENEFITS OF KETAMINE THERAPY */}
        <section className="py-16 lg:py-24 bg-background">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center max-w-2xl mx-auto mb-12">
              <span className="text-primary font-semibold text-sm uppercase tracking-widest">
                Why Ketamine Therapy
              </span>
              <h2 className="text-3xl md:text-4xl font-semibold text-foreground mt-4">
                Benefits of Ketamine Infusion
              </h2>
            </div>
            
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {benefitsCards.map((card, index) => (
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

        {/* 4. WHAT IS KETAMINE THERAPY? */}
        <section className="py-16 lg:py-24 bg-card">
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
                  Ketamine is a medication that has been used safely in medical settings for 
                  decades. In recent years, research has shown that low-dose ketamine infusions 
                  can provide rapid relief for treatment-resistant depression, anxiety, PTSD, 
                  and certain chronic pain conditions.
                </p>
                
                <p className="text-muted-foreground leading-relaxed">
                  Unlike traditional antidepressants that can take weeks to work, ketamine 
                  targets the brain's glutamate system—potentially restoring neural connections 
                  and providing relief for some patients within hours to days.
                </p>
                
                <p className="text-muted-foreground leading-relaxed">
                  At Relaxol Clinic, ketamine is administered intravenously (IV) in a comfortable, 
                  medically supervised setting. Each infusion lasts approximately 40-60 minutes, 
                  with continuous monitoring by our clinical team.
                </p>
              </div>
              
              {/* Right: Image placeholder */}
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

        {/* 5. HOW KETAMINE WORKS - Process Timeline */}
        <section id="how-it-works" className="py-16 lg:py-24 bg-background scroll-mt-24">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center max-w-2xl mx-auto mb-16">
              <span className="text-primary font-semibold text-sm uppercase tracking-widest">
                The Process
              </span>
              <h2 className="text-3xl md:text-4xl font-semibold text-foreground mt-4">
                How Ketamine Therapy Works
              </h2>
              <p className="text-muted-foreground mt-4">
                From your first consultation to ongoing care, here's what to expect.
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
            <div className="bg-card rounded-2xl p-8 md:p-10 max-w-3xl mx-auto text-center">
              <Brain className="w-12 h-12 text-primary mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-foreground mb-4">
                The Science Behind Ketamine
              </h3>
              <p className="text-muted-foreground leading-relaxed">
                Ketamine works by blocking NMDA receptors and triggering a cascade of changes 
                in the brain. This promotes synaptogenesis—the formation of new neural connections—and 
                may rapidly reverse some of the changes caused by chronic stress and depression. 
                Research suggests these effects can provide relief even when other treatments have failed.
              </p>
            </div>
          </div>
        </section>

        {/* 6. VISUAL REASSURANCE SECTION */}
        <section className="relative py-20 lg:py-28 overflow-hidden">
          <div className="absolute inset-0 bg-[#5C4A3A]" />
          <div className="absolute inset-0 bg-gradient-to-r from-[#4A3C32]/80 to-[#5C4A3A]/60" />
          
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
            <div className="max-w-3xl mx-auto space-y-6">
              <Eye className="w-14 h-14 text-primary mx-auto" />
              <h2 className="text-3xl md:text-4xl font-bold text-background leading-tight">
                Ketamine therapy is delivered in a calm, medically supervised environment
              </h2>
              <p className="text-background/80 text-lg">
                Our private treatment rooms are designed for comfort and relaxation. 
                Our clinical team monitors you throughout every session, ensuring your 
                safety and well-being.
              </p>
              <Button size="lg" className="mt-4 group" asChild>
                <a href="#eligibility-form">
                  Start Your Evaluation
                  <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
                </a>
              </Button>
            </div>
          </div>
        </section>

        {/* 7. WHO MAY BE A GOOD CANDIDATE? */}
        <section id="who-candidate" className="py-16 lg:py-24 bg-background scroll-mt-20">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
              <div className="space-y-6">
                <span className="text-primary font-semibold text-sm uppercase tracking-widest">
                  Is This Right For You?
                </span>
                <h2 className="text-3xl md:text-4xl font-semibold text-foreground leading-tight">
                  Who May Be a Good Candidate?
                </h2>
                <p className="text-muted-foreground text-lg leading-relaxed">
                  Ketamine therapy may be appropriate if you identify with any of the following:
                </p>
              </div>
              
              <div className="bg-card rounded-2xl p-8 shadow-lg">
                <ul className="space-y-4">
                  {candidateQualifications.map((item, index) => (
                    <li key={index} className="flex items-start gap-3">
                      <CheckCircle2 className="w-6 h-6 text-primary flex-shrink-0 mt-0.5" />
                      <span className="text-foreground">{item}</span>
                    </li>
                  ))}
                </ul>
                
                <div className="mt-8 pt-6 border-t border-border">
                  <p className="text-muted-foreground text-sm mb-4">
                    Not sure if you qualify? Our team can help determine if ketamine therapy 
                    is appropriate for your situation.
                  </p>
                  <Button asChild>
                    <a href="#eligibility-form">
                      Check Eligibility
                      <ArrowRight className="w-4 h-4 ml-2" />
                    </a>
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* 8. SAFETY & SIDE EFFECTS - Accordion */}
        <section className="py-16 lg:py-24 bg-card">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-3xl mx-auto">
              <div className="text-center mb-12">
                <span className="text-primary font-semibold text-sm uppercase tracking-widest">
                  Your Safety Matters
                </span>
                <h2 className="text-3xl md:text-4xl font-semibold text-foreground mt-4">
                  Safety & Side Effects
                </h2>
                <p className="text-muted-foreground mt-4">
                  Understanding what to expect ensures a comfortable treatment experience.
                </p>
              </div>
              
              <Accordion type="single" collapsible className="space-y-4">
                {safetyAccordionItems.map((item) => (
                  <AccordionItem 
                    key={item.id} 
                    value={item.id}
                    className="bg-background rounded-xl border border-border px-6"
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
        <section className="py-16 lg:py-24 bg-background">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto text-center">
              <span className="text-primary font-semibold text-sm uppercase tracking-widest">
                Coverage & Cost
              </span>
              <h2 className="text-3xl md:text-4xl font-semibold text-foreground mt-4 mb-6">
                Insurance & Access
              </h2>
              <p className="text-muted-foreground text-lg max-w-2xl mx-auto mb-8">
                While ketamine infusions are not typically covered by insurance, our team 
                can help you understand your options and work with you on payment arrangements.
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
                  Call to Discuss Options: 201-781-2101
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
                  Ready to Take the Next Step?
                </h2>
                <p className="text-background/80 text-lg leading-relaxed">
                  If you've been struggling with depression, anxiety, or PTSD and haven't 
                  found relief from traditional treatments, ketamine therapy may offer a 
                  new path forward.
                </p>
                <p className="text-background/80 text-lg leading-relaxed">
                  Complete our brief eligibility form to connect with our care team. 
                  There's no obligation—just a conversation about whether this treatment 
                  is right for you.
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
                <h3 className="text-xl font-semibold text-foreground mb-6">Check Your Eligibility</h3>
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
