import { useState } from "react";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { Button } from "@/components/ui/button";
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
  Eye,
  Phone
} from "lucide-react";

// Credibility strip items
const credibilityItems = [
  { icon: ShieldCheck, text: "Medical Supervision" },
  { icon: Eye, text: "In-Clinic Monitoring" },
  { icon: FileCheck, text: "Evidence-Based" },
];

// What Ketamine Helps With - simplified
const conditionsItems = [
  {
    icon: HeartPulse,
    title: "Treatment-Resistant Depression",
    description: "Persistent symptoms despite trying multiple antidepressants."
  },
  {
    icon: Brain,
    title: "Ongoing Depressive Symptoms",
    description: "Depression that continues to affect daily functioning."
  },
  {
    icon: Zap,
    title: "Limited Response to Medication",
    description: "Inadequate relief from standard oral antidepressants."
  },
  {
    icon: Stethoscope,
    title: "Need for an Alternative Approach",
    description: "Interest in evidence-based options that work differently."
  },
];

// Benefits cards with images - top 3 emphasized
const benefitsCards = [
  {
    image: ketamineRapidRelief,
    title: "Rapid Relief for Some Patients",
    description: "Some individuals experience improvement sooner than with traditional medications.",
    featured: true
  },
  {
    image: ketamineMechanism,
    title: "Different Mechanism of Action",
    description: "Ketamine works on glutamate pathways rather than traditional serotonin pathways.",
    featured: true
  },
  {
    image: ketamineSupervised,
    title: "Medically Supervised Care",
    description: "Treatment is delivered in-clinic with monitoring before, during, and after each session.",
    featured: true
  },
  {
    image: ketaminePersonalized,
    title: "Personalized Treatment Planning",
    description: "Therapy is tailored based on individual history, response, and clinical needs.",
    featured: false
  },
];

// Timeline steps
const treatmentSteps = [
  {
    icon: ClipboardCheck,
    title: "Clinical Evaluation",
    description: "Review of symptoms and treatment history."
  },
  {
    icon: Activity,
    title: "In-Clinic Administration",
    description: "Administered in a controlled medical setting."
  },
  {
    icon: Clock,
    title: "Monitoring & Observation",
    description: "Continuous monitoring by trained staff."
  },
  {
    icon: CalendarCheck,
    title: "Ongoing Care",
    description: "Plans adjusted based on response."
  },
];

// Experience features
const experienceFeatures = [
  "Calm, private clinical environment",
  "Continuous medical monitoring",
  "Dedicated care team present throughout",
  "Structured follow-up and support"
];

// Safety accordion items
const safetyAccordionItems = [
  {
    id: "side-effects",
    title: "Common Side Effects",
    content: "Temporary effects may include dissociation, dizziness, nausea, drowsiness, and changes in perception. These typically resolve within 1-2 hours after treatment ends."
  },
  {
    id: "monitoring",
    title: "Monitoring Procedures",
    content: "Vital signs are checked before, during, and after each infusion. You'll remain in our clinic until effects have subsided."
  },
  {
    id: "safety",
    title: "Safety Considerations",
    content: "Ketamine therapy is not suitable for everyone. A thorough evaluation ensures treatment is safe and appropriate for you."
  },
];

// Eligibility form component - refined for premium feel
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
  const labelClass = isDark ? "text-background/80 text-sm font-normal" : "text-muted-foreground text-sm font-normal";
  const inputClass = isDark 
    ? "bg-background/5 border-background/20 text-background placeholder:text-background/40 focus:border-background/40 h-12" 
    : "bg-background border-border/40 h-12 focus:border-primary/40";
  const radioContainerClass = isDark 
    ? "bg-background/5 border-background/20 hover:bg-background/10" 
    : "bg-background border-border/30 hover:border-border/50";

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* Question 1 */}
      <div className="space-y-3">
        <Label className={labelClass}>Have you tried 2+ antidepressants without lasting relief?</Label>
        <div className="flex gap-4">
          {["Yes", "No"].map((option) => (
            <button
              key={option}
              type="button"
              onClick={() => setFormData(prev => ({ ...prev, triedAntidepressants: option }))}
              className={`flex-1 py-3 px-5 rounded-xl border transition-all ${radioContainerClass} ${
                formData.triedAntidepressants === option 
                  ? "ring-1 ring-primary/50 border-primary/30" 
                  : ""
              }`}
            >
              <span className={isDark ? "text-background/90 text-sm" : "text-foreground text-sm"}>{option}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Question 2 */}
      <div className="space-y-3">
        <Label className={labelClass}>Are you currently diagnosed with depression, anxiety, or PTSD?</Label>
        <div className="flex gap-4">
          {["Yes", "No"].map((option) => (
            <button
              key={option}
              type="button"
              onClick={() => setFormData(prev => ({ ...prev, diagnosedDepression: option }))}
              className={`flex-1 py-3 px-5 rounded-xl border transition-all ${radioContainerClass} ${
                formData.diagnosedDepression === option 
                  ? "ring-1 ring-primary/50 border-primary/30" 
                  : ""
              }`}
            >
              <span className={isDark ? "text-background/90 text-sm" : "text-foreground text-sm"}>{option}</span>
            </button>
          ))}
        </div>
      </div>

      {/* ZIP Code */}
      <div className="space-y-3">
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
      <div className="grid sm:grid-cols-2 gap-5">
        <div className="space-y-3">
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
        <div className="space-y-3">
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

      <Button type="submit" size="lg" className="w-full h-12 mt-2">
        See If I Qualify
        <ArrowRight className="w-4 h-4 ml-2" />
      </Button>
    </form>
  );
}

const Ketamine = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main>
        {/* 1. HERO SECTION - Restrained, Authoritative */}
        <section className="relative py-24 lg:py-36 overflow-hidden">
          <div className="absolute inset-0 bg-[#4A3C32]" />
          <div className="absolute inset-0 bg-gradient-to-br from-[#3D3228]/90 via-[#5C4A3A]/70 to-[#6B5A4A]/50" />
          
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
              {/* Left: Text Content */}
              <div className="space-y-8">
                <div className="space-y-6">
                  <h1 className="text-4xl sm:text-5xl lg:text-6xl font-semibold text-background leading-[1.1] tracking-tight">
                    Ketamine Therapy in a Medically Supervised Setting
                  </h1>
                  <p className="text-xl text-background/70 leading-relaxed max-w-lg">
                    Personalized care for those who haven't found relief with traditional treatments.
                  </p>
                </div>
                
                <div className="pt-4">
                  <Button size="lg" className="h-14 px-8 text-base" asChild>
                    <a href="#eligibility-form">
                      Learn if Ketamine Therapy Is Right for You
                      <ArrowRight className="w-5 h-5 ml-3" />
                    </a>
                  </Button>
                </div>
                
                {/* Micro-trust row - subtle */}
                <div className="flex flex-wrap gap-8 pt-8 border-t border-background/10">
                  {credibilityItems.map((item, index) => (
                    <div key={index} className="flex items-center gap-2">
                      <item.icon className="w-4 h-4 text-primary/80" />
                      <span className="text-background/60 text-sm">{item.text}</span>
                    </div>
                  ))}
                </div>
              </div>
              
              {/* Right: Image */}
              <div className="relative aspect-[4/3] rounded-2xl overflow-hidden">
                <img 
                  src={treatmentKetamine}
                  alt="Patient receiving ketamine infusion therapy"
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
              </div>
            </div>
          </div>
        </section>

        {/* 2. ELIGIBILITY / CONTACT FORM - Simplified */}
        <section id="eligibility-form" className="py-20 lg:py-28 bg-secondary/20 scroll-mt-20">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid lg:grid-cols-2 gap-16 lg:gap-24 items-start max-w-6xl mx-auto">
              {/* Left: Reassurance copy */}
              <div className="space-y-8">
                <div className="space-y-4">
                  <h2 className="text-3xl md:text-4xl font-semibold text-foreground leading-tight">
                    Find Out If You May Be a Candidate
                  </h2>
                  <p className="text-muted-foreground text-lg leading-relaxed">
                    Complete this brief form to see if you may qualify for ketamine therapy.
                  </p>
                </div>
                
                <ul className="space-y-5 pt-4">
                  <li className="flex items-start gap-4">
                    <CheckCircle2 className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                    <span className="text-foreground/80">No obligation assessment</span>
                  </li>
                  <li className="flex items-start gap-4">
                    <CheckCircle2 className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                    <span className="text-foreground/80">Response within 48 hours</span>
                  </li>
                  <li className="flex items-start gap-4">
                    <CheckCircle2 className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                    <span className="text-foreground/80">Confidential submission</span>
                  </li>
                </ul>
              </div>
              
              {/* Right: Form */}
              <div className="bg-background rounded-2xl p-8 md:p-10 shadow-sm border border-border/30">
                <EligibilityForm />
              </div>
            </div>
          </div>
        </section>

        {/* 3. WHAT KETAMINE THERAPY HELPS WITH - Open list, not boxed cards */}
        <section className="py-20 lg:py-28 bg-background">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto">
              <div className="text-center mb-16">
                <p className="text-primary text-sm font-medium tracking-wide uppercase mb-4">
                  Conditions
                </p>
                <h2 className="text-3xl md:text-4xl font-semibold text-foreground">
                  What Ketamine Therapy Helps With
                </h2>
              </div>
              
              <div className="grid sm:grid-cols-2 gap-x-16 gap-y-10">
                {conditionsItems.map((item, index) => (
                  <div key={index} className="flex items-start gap-4">
                    <div className="w-10 h-10 rounded-full bg-primary/8 flex items-center justify-center flex-shrink-0 mt-1">
                      <item.icon className="w-5 h-5 text-primary" />
                    </div>
                    <div className="space-y-1">
                      <h3 className="text-lg font-medium text-foreground">
                        {item.title}
                      </h3>
                      <p className="text-muted-foreground text-sm leading-relaxed">
                        {item.description}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* 4. BENEFITS OF KETAMINE THERAPY - Editorial, less card-heavy */}
        <section className="py-20 lg:py-28 bg-secondary/20">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center max-w-2xl mx-auto mb-16">
              <p className="text-primary text-sm font-medium tracking-wide uppercase mb-4">
                Why Ketamine Therapy
              </p>
              <h2 className="text-3xl md:text-4xl font-semibold text-foreground">
                Benefits of Ketamine Therapy
              </h2>
            </div>
            
            {/* Featured benefits - larger */}
            <div className="grid md:grid-cols-3 gap-10 max-w-5xl mx-auto mb-12">
              {benefitsCards.filter(c => c.featured).map((card, index) => (
                <div key={index} className="group">
                  <div className="aspect-[4/3] rounded-xl overflow-hidden mb-5">
                    <img 
                      src={card.image} 
                      alt={card.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                  </div>
                  <h3 className="text-xl font-medium text-foreground mb-2">
                    {card.title}
                  </h3>
                  <p className="text-muted-foreground text-sm leading-relaxed">
                    {card.description}
                  </p>
                </div>
              ))}
            </div>
            
            {/* Secondary benefit - text only */}
            <div className="max-w-2xl mx-auto text-center pt-8 border-t border-border/30">
              <p className="text-foreground font-medium mb-2">
                {benefitsCards[3].title}
              </p>
              <p className="text-muted-foreground text-sm">
                {benefitsCards[3].description}
              </p>
            </div>
          </div>
        </section>

        {/* 5. WHAT IS KETAMINE THERAPY? - Typography-led */}
        <section className="py-20 lg:py-28 bg-background">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid lg:grid-cols-2 gap-16 lg:gap-24 items-center max-w-6xl mx-auto">
              {/* Left: Text */}
              <div className="space-y-8">
                <div className="space-y-4">
                  <p className="text-primary text-sm font-medium tracking-wide uppercase">
                    About the Treatment
                  </p>
                  <h2 className="text-3xl md:text-4xl lg:text-5xl font-semibold text-foreground leading-tight">
                    What Is Ketamine Therapy?
                  </h2>
                </div>
                
                <div className="space-y-6 max-w-lg">
                  <p className="text-muted-foreground text-lg leading-[1.8]">
                    Ketamine therapy uses a medication studied for decades, now administered 
                    in controlled medical settings to help address certain mental health conditions.
                  </p>
                  
                  <p className="text-muted-foreground leading-[1.8]">
                    Unlike traditional antidepressants, ketamine works on different neural 
                    pathways associated with mood regulation and emotional processing.
                  </p>
                </div>
              </div>
              
              {/* Right: Image */}
              <div className="relative aspect-[4/3] rounded-2xl overflow-hidden">
                <img 
                  src={treatmentRoom}
                  alt="Comfortable ketamine treatment room"
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
          </div>
        </section>

        {/* 6. HOW KETAMINE THERAPY WORKS - More air */}
        <section id="how-it-works" className="py-20 lg:py-28 bg-secondary/20 scroll-mt-24">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center max-w-2xl mx-auto mb-20">
              <p className="text-primary text-sm font-medium tracking-wide uppercase mb-4">
                The Process
              </p>
              <h2 className="text-3xl md:text-4xl font-semibold text-foreground">
                How Ketamine Therapy Works
              </h2>
            </div>
            
            {/* Timeline - more spacious */}
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-16 max-w-5xl mx-auto mb-20">
              {treatmentSteps.map((step, index) => (
                <div key={index} className="text-center">
                  <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-5">
                    <step.icon className="w-5 h-5 text-primary" />
                  </div>
                  <h3 className="text-lg font-medium text-foreground mb-2">{step.title}</h3>
                  <p className="text-muted-foreground text-sm leading-relaxed">{step.description}</p>
                </div>
              ))}
            </div>
            
            {/* Mechanism explanation - quieter */}
            <div className="max-w-2xl mx-auto text-center">
              <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-5">
                <Brain className="w-5 h-5 text-primary" />
              </div>
              <h3 className="text-lg font-medium text-foreground mb-3">
                How Ketamine Works in the Brain
              </h3>
              <p className="text-muted-foreground leading-relaxed">
                Ketamine affects glutamate signaling, which plays a key role in mood and neural connectivity. 
                This mechanism differs from traditional antidepressants.
              </p>
            </div>
          </div>
        </section>

        {/* 7. MID-PAGE REASSURANCE BANNER - Iconic, Tier-1 */}
        <section className="relative py-28 lg:py-36 overflow-hidden">
          <div className="absolute inset-0 bg-[#3D3228]" />
          <div className="absolute inset-0 bg-gradient-to-br from-[#2D2620]/90 to-[#4A3C32]/70" />
          
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            <div className="max-w-3xl mx-auto text-center space-y-10">
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-semibold text-background leading-tight">
                Ketamine therapy is delivered in a calm, medically supervised environment.
              </h2>
              
              <Button size="lg" className="h-14 px-10 text-base" asChild>
                <a href="#eligibility-form">
                  Check Your Eligibility
                  <ArrowRight className="w-5 h-5 ml-3" />
                </a>
              </Button>
            </div>
          </div>
        </section>

        {/* 8. YOUR KETAMINE THERAPY EXPERIENCE - Simplified */}
        <section className="py-20 lg:py-28 bg-background">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-3xl mx-auto">
              <div className="text-center mb-12">
                <p className="text-primary text-sm font-medium tracking-wide uppercase mb-4">
                  Your Experience
                </p>
                <h2 className="text-3xl md:text-4xl font-semibold text-foreground">
                  What Patients Can Expect
                </h2>
              </div>
              
              <ul className="space-y-5 max-w-lg mx-auto">
                {experienceFeatures.map((feature, index) => (
                  <li key={index} className="flex items-center gap-4">
                    <CheckCircle2 className="w-5 h-5 text-primary flex-shrink-0" />
                    <span className="text-foreground/80 text-lg">{feature}</span>
                  </li>
                ))}
              </ul>
              
              <p className="text-center text-muted-foreground mt-10 max-w-md mx-auto">
                Our focus is on patient safety, comfort, and personalized care at every step.
              </p>
            </div>
          </div>
        </section>

        {/* 9. SAFETY & SIDE EFFECTS - Visually demoted */}
        <section className="py-16 lg:py-20 bg-secondary/10">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-2xl mx-auto">
              <div className="text-center mb-10">
                <h2 className="text-2xl font-medium text-foreground">
                  Safety & Side Effects
                </h2>
                <p className="text-muted-foreground mt-3 text-sm">
                  Ketamine therapy is provided under strict medical protocols with careful screening.
                </p>
              </div>
              
              <Accordion type="single" collapsible className="space-y-3">
                {safetyAccordionItems.map((item) => (
                  <AccordionItem 
                    key={item.id} 
                    value={item.id}
                    className="bg-background rounded-xl border border-border/30 px-5"
                  >
                    <AccordionTrigger className="text-foreground/80 hover:no-underline py-4 text-sm">
                      {item.title}
                    </AccordionTrigger>
                    <AccordionContent className="text-muted-foreground pb-4 text-sm leading-relaxed">
                      {item.content}
                    </AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            </div>
          </div>
        </section>

        {/* 10. INSURANCE & ACCESS - Quiet confidence */}
        <section className="py-16 lg:py-20 bg-background">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-2xl mx-auto text-center">
              <h2 className="text-2xl font-medium text-foreground mb-4">
                Insurance & Access
              </h2>
              <p className="text-muted-foreground mb-8">
                Ketamine therapy may be eligible for coverage depending on individual plans. 
                Our team can help review options.
              </p>
              
              <div className="flex flex-col sm:flex-row items-center justify-center gap-8 mb-10 text-sm text-muted-foreground">
                <span className="flex items-center gap-2">
                  <FileCheck className="w-4 h-4 text-primary" />
                  Coverage verification
                </span>
                <span className="flex items-center gap-2">
                  <Eye className="w-4 h-4 text-primary" />
                  Transparent pricing
                </span>
                <span className="flex items-center gap-2">
                  <ShieldCheck className="w-4 h-4 text-primary" />
                  HSA/FSA accepted
                </span>
              </div>
              
              <Button variant="outline" asChild>
                <a href="tel:201-781-2101">
                  <Phone className="w-4 h-4 mr-2" />
                  Verify Coverage
                </a>
              </Button>
            </div>
          </div>
        </section>

        {/* 11. FINAL CTA + REPEATED FORM - Mirrors hero restraint */}
        <section className="py-24 lg:py-32 bg-[#4A3C32]">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid lg:grid-cols-2 gap-16 lg:gap-24 items-start max-w-6xl mx-auto">
              {/* Left: CTA copy */}
              <div className="space-y-8">
                <h2 className="text-3xl md:text-4xl lg:text-5xl font-semibold text-background leading-tight">
                  Take the Next Step Toward Relief
                </h2>
                <p className="text-background/70 text-lg leading-relaxed max-w-md">
                  If traditional treatments haven't worked, our care team can help you 
                  understand whether ketamine therapy may be appropriate.
                </p>
                
                <div className="flex flex-wrap gap-6 pt-6 border-t border-background/10">
                  {credibilityItems.map((item, index) => (
                    <div key={index} className="flex items-center gap-2">
                      <item.icon className="w-4 h-4 text-primary/80" />
                      <span className="text-background/60 text-sm">{item.text}</span>
                    </div>
                  ))}
                </div>
              </div>
              
              {/* Right: Form */}
              <div className="bg-background rounded-2xl p-8 md:p-10 shadow-sm">
                <h3 className="text-xl font-medium text-foreground mb-6">Speak With Our Care Team</h3>
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
