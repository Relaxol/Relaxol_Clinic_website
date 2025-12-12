import { useState } from "react";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { Button } from "@/components/ui/button";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import abstractMedical from "@/assets/spravato-abstract-medical.jpg";
import spravatoBrainMechanism from "@/assets/spravato-brain-mechanism.png";
import spravatoMechanism from "@/assets/spravato-mechanism.png";
import spravatoNasalSpray from "@/assets/spravato-nasal-spray.png";
import { 
  ShieldCheck, 
  Stethoscope, 
  FileCheck, 
  Brain, 
  HeartPulse, 
  Zap, 
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
  Building2,
  Sparkles,
  ShieldPlus,
  Timer
} from "lucide-react";

// Credibility strip items
const credibilityItems = [
  { icon: ShieldCheck, text: "FDA-Approved" },
  { icon: Eye, text: "In-Clinic Monitoring" },
  { icon: FileCheck, text: "Insurance Accepted" },
];

// Benefits cards
const benefitsCards = [
  {
    icon: Zap,
    title: "Faster Relief",
    description: "May improve symptoms within hours to days, unlike weeks with traditional antidepressants."
  },
  {
    icon: Brain,
    title: "Works Differently",
    description: "Targets NMDA receptors and glutamate—a different brain pathway than standard medications."
  },
  {
    icon: HeartPulse,
    title: "Treatment-Resistant Option",
    description: "Specifically designed for patients who haven't responded to other antidepressants."
  },
  {
    icon: Stethoscope,
    title: "Medical Supervision",
    description: "Every session is administered and monitored by trained clinical staff."
  },
  {
    icon: ShieldPlus,
    title: "FDA-Approved",
    description: "Rigorously tested and approved for treatment-resistant depression and MDD with suicidal ideation."
  },
];

// Timeline steps
const treatmentSteps = [
  {
    icon: ClipboardCheck,
    title: "Evaluation & Eligibility",
    description: "Comprehensive psychiatric assessment to determine candidacy."
  },
  {
    icon: Activity,
    title: "In-Clinic Administration",
    description: "Self-administer the nasal spray under clinical supervision."
  },
  {
    icon: Clock,
    title: "Observation Period",
    description: "Rest while our team monitors your response for ~2 hours."
  },
  {
    icon: CalendarCheck,
    title: "Ongoing Care",
    description: "Continue with personalized maintenance and support."
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
    // Form submission logic would go here
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
        <Label className={labelClass}>Are you currently diagnosed with depression?</Label>
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

export default function Spravato() {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      {/* 1. HERO - Text Left, Video Right */}
      <section className="relative py-16 lg:py-24 overflow-hidden">
        {/* Warm brown background matching homepage branding */}
        <div className="absolute inset-0 bg-[#5C4A3A]" />
        <div className="absolute inset-0 bg-gradient-to-r from-[#4A3C32]/60 via-[#6B5A4A]/40 to-[#5C4A3A]/80" />
        
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid lg:grid-cols-2 gap-10 lg:gap-16 items-center">
            {/* Left: Text Content */}
            <div className="space-y-6">
              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-background leading-tight">
                SPRAVATO® Treatment for Depression That Hasn't Responded to Medication
              </h1>
              <h2 className="text-xl md:text-2xl text-background/80">
                FDA-approved esketamine therapy administered in a medically supervised clinic
              </h2>
              
              <div className="flex flex-wrap gap-4 pt-2">
                <Button size="lg" className="group" asChild>
                  <a href="#eligibility-form">
                    Check Eligibility
                    <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
                  </a>
                </Button>
                
                <a 
                  href="#who-benefits" 
                  className="inline-flex items-center text-background/70 hover:text-background underline underline-offset-4"
                >
                  Is SPRAVATO® Right for Me?
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
            
            {/* Right: Video */}
            <div className="relative aspect-video rounded-2xl overflow-hidden shadow-2xl">
              <iframe
                src="https://player.vimeo.com/video/332355023?title=0&byline=0&portrait=0"
                className="w-full h-full"
                allow="autoplay; fullscreen"
                title="SPRAVATO® Treatment Overview"
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
                SPRAVATO® is specifically designed for adults with treatment-resistant depression 
                who haven't found relief from traditional antidepressants. Complete this brief 
                form to see if you may qualify.
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
                  <span className="text-foreground">Insurance verification included</span>
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

      {/* TREATMENT-RESISTANT DEPRESSION - Two Column Layout */}
      <section className="py-16 lg:py-20 bg-[#5C4A3A]">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            {/* Left: Image */}
            <div className="flex justify-center">
              <img 
                src={spravatoMechanism}
                alt="SPRAVATO brain mechanism - NMDA receptor antagonist"
                className="max-w-[450px] w-full h-auto"
              />
            </div>
            
            {/* Right: Text Content */}
            <div className="space-y-5 text-white">
              <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold">
                Treatment-Resistant Depression
              </h2>
              
              <p className="text-white/90 leading-relaxed text-base md:text-lg">
                Depression is not as simple as just "sadness." Sadness is a feeling that comes and goes with 
                everyday life. Almost 300 million people suffer from depression worldwide, and despite a variety 
                of depression treatments available, many continue to suffer without relief from these medications.
              </p>
              
              <p className="text-white/90 leading-relaxed text-base md:text-lg">
                Fortunately, SPRAVATO® – the breakthrough FDA-approved esketamine nasal spray – is showing 
                excellent results in relieving those symptoms of depression. As a SPRAVATO® REMS-certified 
                treatment provider, our treatment team can alleviate even the most severe forms of treatment-resistant depression.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 3. BENEFITS OF SPRAVATO - Card Based */}
      <section className="py-16 lg:py-24 bg-background">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <span className="text-primary font-semibold text-sm uppercase tracking-widest">
              Why SPRAVATO®
            </span>
            <h2 className="text-3xl md:text-4xl font-semibold text-foreground mt-4">
              Benefits of SPRAVATO® Treatment
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
        </div>
      </section>

      {/* 4. WHAT IS SPRAVATO - Explanation + Image */}
      <section className="py-16 lg:py-24 bg-card">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            {/* Left: Text */}
            <div className="space-y-6">
              <span className="text-primary font-semibold text-sm uppercase tracking-widest">
                About the Treatment
              </span>
              <h2 className="text-3xl md:text-4xl font-semibold text-foreground leading-tight">
                What Is SPRAVATO®?
              </h2>
              
              <p className="text-muted-foreground leading-relaxed">
                SPRAVATO® is a prescription nasal spray derived from esketamine and approved 
                by the FDA for treatment-resistant depression. It's used alongside an oral 
                antidepressant for adults who haven't found relief from standard medications.
              </p>
              
              <p className="text-muted-foreground leading-relaxed">
                Unlike traditional antidepressants that target serotonin or norepinephrine, 
                SPRAVATO® works on the glutamate system—potentially restoring neural connections 
                weakened by chronic depression.
              </p>
            </div>
            
            {/* Right: Image placeholder */}
            <div className="relative">
              <img 
                src={abstractMedical} 
                alt="SPRAVATO nasal spray treatment"
                className="w-full rounded-2xl shadow-xl"
              />
              {/* Placeholder label for CMS */}
              <div className="absolute bottom-4 right-4 bg-foreground/80 text-background text-xs px-3 py-1 rounded-full">
                explainer_image
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 5. HOW SPRAVATO WORKS - Process Timeline + Mechanism */}
      <section id="how-it-works" className="py-16 lg:py-24 bg-background scroll-mt-24">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <span className="text-primary font-semibold text-sm uppercase tracking-widest">
              The Process
            </span>
            <h2 className="text-3xl md:text-4xl font-semibold text-foreground mt-4">
              How the Treatment Works
            </h2>
          </div>
          
          {/* Timeline */}
          <div className="grid md:grid-cols-4 gap-6 mb-16">
            {treatmentSteps.map((step, index) => (
              <div key={index} className="relative">
                {/* Connector Line (desktop) */}
                {index < treatmentSteps.length - 1 && (
                  <div className="hidden md:block absolute top-8 left-1/2 w-full h-0.5 bg-border z-0" />
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
          
          {/* Mechanism explanation */}
          <div className="max-w-3xl mx-auto text-center">
            <p className="text-muted-foreground leading-relaxed">
              SPRAVATO® targets NMDA receptors in the brain, increasing glutamate release which 
              helps restore synaptic connections affected by depression. This mechanism differs 
              from traditional antidepressants and may provide relief when other treatments haven't worked.
            </p>
          </div>
        </div>
      </section>

      {/* 6. VISUAL REASSURANCE SECTION */}
      <section className="relative py-20 lg:py-28 overflow-hidden">
        {/* Background image placeholder */}
        <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-secondary/20 to-primary/5" />
        <div className="absolute inset-0 bg-[url('/placeholder.svg')] bg-cover bg-center opacity-10" />
        
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="max-w-3xl mx-auto text-center">
            <Sparkles className="w-12 h-12 text-primary mx-auto mb-6" />
            <p className="text-xl md:text-2xl text-foreground font-medium leading-relaxed">
              "SPRAVATO® is administered only in certified medical settings under professional 
              supervision—ensuring your safety and comfort throughout treatment."
            </p>
            
            <div className="flex flex-wrap justify-center gap-6 mt-10">
              <div className="flex items-center gap-2 bg-background/80 rounded-full px-4 py-2">
                <Sofa className="w-5 h-5 text-primary" />
                <span className="text-foreground text-sm">Calm environment</span>
              </div>
              <div className="flex items-center gap-2 bg-background/80 rounded-full px-4 py-2">
                <Eye className="w-5 h-5 text-primary" />
                <span className="text-foreground text-sm">Clinician monitoring</span>
              </div>
              <div className="flex items-center gap-2 bg-background/80 rounded-full px-4 py-2">
                <Timer className="w-5 h-5 text-primary" />
                <span className="text-foreground text-sm">Same-day observation</span>
              </div>
              <div className="flex items-center gap-2 bg-background/80 rounded-full px-4 py-2">
                <Car className="w-5 h-5 text-primary" />
                <span className="text-foreground text-sm">No driving post-treatment</span>
              </div>
            </div>
          </div>
        </div>
        
        {/* Placeholder label for CMS */}
        <div className="absolute bottom-4 right-4 bg-foreground/80 text-background text-xs px-3 py-1 rounded-full">
          visual_reassurance_section
        </div>
      </section>

      {/* 7. SAFETY & SIDE EFFECTS - Accordion */}
      <section className="py-16 lg:py-24 bg-card">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto">
            <div className="text-center mb-8">
              <span className="text-primary font-semibold text-sm uppercase tracking-widest">
                Safety Information
              </span>
              <h2 className="text-3xl md:text-4xl font-semibold text-foreground mt-4">
                Safety & Side Effects
              </h2>
            </div>
            
            <p className="text-center text-muted-foreground mb-8">
              As with any medical treatment, it's important to understand safety considerations.
            </p>
            
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
      <section className="py-16 lg:py-24 bg-background">
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
              <a href="#final-form">
                Verify Coverage
                <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
              </a>
            </Button>
          </div>
        </div>
      </section>

      {/* 9. FINAL CTA - Repeat Eligibility Form */}
      <section id="final-form" className="py-16 lg:py-24 bg-foreground scroll-mt-20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-start">
            {/* Left: Headline */}
            <div className="space-y-6">
              <h2 className="text-2xl md:text-3xl lg:text-4xl font-semibold text-background">
                Find Out If SPRAVATO® Is Right for You
              </h2>
              <p className="text-background/70 text-lg leading-relaxed">
                If you've been struggling with depression and traditional treatments haven't 
                provided relief, SPRAVATO® may be an option worth exploring. Complete this 
                form and our team will assess your eligibility.
              </p>
              
              <div className="flex items-center gap-3 text-background/60 text-sm">
                <AlertCircle className="w-5 h-5" />
                <span>This is a lead qualifier, not a medical intake.</span>
              </div>
            </div>
            
            {/* Right: Form */}
            <div className="bg-background/10 backdrop-blur-sm rounded-2xl p-6 md:p-8 border border-background/20">
              <EligibilityForm variant="dark" />
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
