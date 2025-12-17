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
import { 
  ShieldCheck, 
  Stethoscope, 
  FileCheck, 
  Brain, 
  HeartPulse, 
  Zap, 
  ArrowRight,
  Check,
  Eye,
  Phone
} from "lucide-react";

// Credibility strip items
const credibilityItems = [
  { icon: ShieldCheck, text: "Medical Supervision" },
  { icon: Eye, text: "In-Clinic Monitoring" },
  { icon: FileCheck, text: "Evidence-Based" },
];

// What Ketamine Helps With
const conditionsItems = [
  {
    title: "Treatment-Resistant Depression",
    description: "Persistent symptoms despite trying multiple antidepressants."
  },
  {
    title: "Ongoing Depressive Symptoms",
    description: "Depression that continues to affect daily functioning."
  },
  {
    title: "Limited Response to Medication",
    description: "Inadequate relief from standard oral antidepressants."
  },
  {
    title: "Need for an Alternative Approach",
    description: "Interest in evidence-based options that work differently."
  },
];

// Benefits - editorial style
const benefitsItems = [
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
];

// Timeline steps
const treatmentSteps = [
  {
    step: "01",
    title: "Clinical Evaluation",
    description: "Review of symptoms and treatment history."
  },
  {
    step: "02",
    title: "In-Clinic Administration",
    description: "Administered in a controlled medical setting."
  },
  {
    step: "03",
    title: "Monitoring & Observation",
    description: "Continuous monitoring by trained staff."
  },
  {
    step: "04",
    title: "Ongoing Care",
    description: "Plans adjusted based on response."
  },
];

// Candidate qualifiers
const candidateItems = [
  "You have tried two or more antidepressants without lasting relief",
  "You are currently diagnosed with depression, anxiety, or PTSD",
  "You are looking for an evidence-based alternative approach",
  "You are able to attend in-clinic sessions with medical supervision"
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

// Eligibility form component - premium, inviting feel
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
  const labelClass = isDark ? "text-background/70 text-sm font-normal" : "text-muted-foreground text-sm font-normal";
  const inputClass = isDark 
    ? "bg-background/5 border-background/10 text-background placeholder:text-background/40 focus:border-background/30 h-12 rounded-lg" 
    : "bg-background border-border/20 h-12 rounded-lg focus:border-primary/30";
  const radioContainerClass = isDark 
    ? "bg-background/5 border-background/10 hover:bg-background/10" 
    : "bg-background border-border/20 hover:border-border/30";

  return (
    <form onSubmit={handleSubmit} className="space-y-8">
      {/* Question 1 */}
      <div className="space-y-3">
        <Label className={labelClass}>Have you tried 2+ antidepressants without lasting relief?</Label>
        <div className="flex gap-4">
          {["Yes", "No"].map((option) => (
            <button
              key={option}
              type="button"
              onClick={() => setFormData(prev => ({ ...prev, triedAntidepressants: option }))}
              className={`flex-1 py-3 px-5 rounded-lg border transition-all ${radioContainerClass} ${
                formData.triedAntidepressants === option 
                  ? "ring-1 ring-primary/30 border-primary/20" 
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
              className={`flex-1 py-3 px-5 rounded-lg border transition-all ${radioContainerClass} ${
                formData.diagnosedDepression === option 
                  ? "ring-1 ring-primary/30 border-primary/20" 
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
      <div className="grid sm:grid-cols-2 gap-6">
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

      <Button type="submit" size="lg" className="w-full h-12 mt-4">
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
        <section className="relative py-32 lg:py-40 overflow-hidden">
          <div className="absolute inset-0 bg-[#4A3C32]" />
          <div className="absolute inset-0 bg-gradient-to-b from-black/40 to-black/60" />
          
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            <div className="max-w-3xl">
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-light text-background leading-[1.1] tracking-tight">
                Ketamine Therapy in a Medically Supervised Setting
              </h1>
              <p className="text-xl md:text-2xl text-background/60 leading-relaxed mt-8 max-w-2xl">
                Personalized care for those who haven't found relief with traditional treatments.
              </p>
              
              <Button size="lg" className="mt-10 px-10 py-6 text-lg h-auto" asChild>
                <a href="#eligibility-form">
                  Learn if Ketamine Therapy Is Right for You
                </a>
              </Button>
              
              {/* Micro-trust row - subtle */}
              <div className="flex flex-wrap gap-8 mt-16 pt-8 border-t border-background/10">
                {credibilityItems.map((item, index) => (
                  <div key={index} className="flex items-center gap-2">
                    <item.icon className="w-4 h-4 text-background/40" />
                    <span className="text-background/50 text-sm">{item.text}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* 2. ELIGIBILITY / CONTACT FORM - Open, inviting */}
        <section id="eligibility-form" className="py-24 lg:py-32 bg-background scroll-mt-20">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid md:grid-cols-2 gap-16 lg:gap-20 items-start max-w-6xl mx-auto">
              {/* Left: Reassurance copy */}
              <div className="space-y-8">
                <div className="space-y-6">
                  <h2 className="text-4xl md:text-5xl font-light text-foreground leading-tight">
                    Find Out If You May Be a Candidate
                  </h2>
                  <p className="text-muted-foreground text-xl leading-relaxed">
                    Complete this brief form to see if you may qualify for ketamine therapy.
                  </p>
                </div>
                
                <ul className="space-y-5 pt-4">
                  <li className="flex items-start gap-4">
                    <Check className="w-5 h-5 text-primary flex-shrink-0 mt-1" />
                    <span className="text-muted-foreground">No obligation assessment</span>
                  </li>
                  <li className="flex items-start gap-4">
                    <Check className="w-5 h-5 text-primary flex-shrink-0 mt-1" />
                    <span className="text-muted-foreground">Response within 48 hours</span>
                  </li>
                  <li className="flex items-start gap-4">
                    <Check className="w-5 h-5 text-primary flex-shrink-0 mt-1" />
                    <span className="text-muted-foreground">Confidential submission</span>
                  </li>
                </ul>
              </div>
              
              {/* Right: Form - softened container */}
              <div className="space-y-6 rounded-2xl bg-white/70 backdrop-blur p-10">
                <EligibilityForm />
              </div>
            </div>
          </div>
        </section>

        {/* 3. WHAT KETAMINE THERAPY HELPS WITH - Editorial grid */}
        <section className="py-24 lg:py-32 bg-muted/30">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-5xl mx-auto">
              <div className="text-center mb-20">
                <p className="text-primary text-sm font-medium tracking-widest uppercase mb-4">
                  Conditions
                </p>
                <h2 className="text-4xl md:text-5xl font-light text-foreground">
                  What Ketamine Therapy Helps With
                </h2>
              </div>
              
              <div className="grid md:grid-cols-2 gap-12 lg:gap-16">
                {conditionsItems.map((item, index) => (
                  <div key={index} className="space-y-3">
                    <h3 className="text-2xl font-medium text-foreground">
                      {item.title}
                    </h3>
                    <p className="text-muted-foreground leading-relaxed">
                      {item.description}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* 4. BENEFITS OF KETAMINE THERAPY - Editorial, open layout */}
        <section className="py-24 lg:py-32 bg-background">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center max-w-2xl mx-auto mb-20">
              <p className="text-primary text-sm font-medium tracking-widest uppercase mb-4">
                Why Ketamine Therapy
              </p>
              <h2 className="text-4xl md:text-5xl font-light text-foreground">
                Benefits of Ketamine Therapy
              </h2>
            </div>
            
            <div className="grid md:grid-cols-3 gap-12 max-w-5xl mx-auto">
              {benefitsItems.map((item, index) => (
                <div key={index} className="space-y-5">
                  <div className="aspect-[4/3] rounded-2xl overflow-hidden">
                    <img 
                      src={item.image} 
                      alt={item.title}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <h3 className="text-2xl font-medium text-foreground">
                    {item.title}
                  </h3>
                  <p className="text-muted-foreground text-base leading-relaxed">
                    {item.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* 5. WHAT IS KETAMINE THERAPY? - Typography-led */}
        <section className="py-24 lg:py-32 bg-muted/30">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid md:grid-cols-2 gap-20 items-center max-w-6xl mx-auto">
              {/* Left: Text */}
              <div className="space-y-6 max-w-xl">
                <p className="text-primary text-sm font-medium tracking-widest uppercase">
                  About the Treatment
                </p>
                <h2 className="text-4xl md:text-5xl font-light text-foreground leading-tight">
                  What Is Ketamine Therapy?
                </h2>
                
                <div className="space-y-6 pt-4">
                  <p className="text-muted-foreground text-base leading-loose">
                    Ketamine therapy uses a medication studied for decades, now administered 
                    in controlled medical settings to help address certain mental health conditions.
                  </p>
                  
                  <p className="text-muted-foreground text-base leading-loose">
                    Unlike traditional antidepressants, ketamine works on different neural 
                    pathways associated with mood regulation and emotional processing.
                  </p>
                  
                  <p className="text-muted-foreground text-base leading-loose">
                    When administered in a clinical environment, ketamine therapy follows 
                    strict medical protocols to ensure safety and appropriate patient support.
                  </p>
                </div>
              </div>
              
              {/* Right: Image */}
              <div className="relative rounded-3xl overflow-hidden">
                <img 
                  src={treatmentRoom}
                  alt="Comfortable ketamine treatment room"
                  className="w-full h-full object-cover aspect-[4/3]"
                />
              </div>
            </div>
          </div>
        </section>

        {/* 6. HOW KETAMINE THERAPY WORKS - Spacious timeline */}
        <section id="how-it-works" className="py-24 lg:py-32 bg-background scroll-mt-24">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center max-w-2xl mx-auto mb-20">
              <p className="text-primary text-sm font-medium tracking-widest uppercase mb-4">
                The Process
              </p>
              <h2 className="text-4xl md:text-5xl font-light text-foreground">
                How Ketamine Therapy Works
              </h2>
            </div>
            
            {/* Timeline - open layout */}
            <div className="grid md:grid-cols-4 gap-12 max-w-5xl mx-auto mb-20">
              {treatmentSteps.map((step, index) => (
                <div key={index} className="space-y-4">
                  <span className="text-sm uppercase tracking-widest text-muted-foreground">
                    Step {step.step}
                  </span>
                  <h4 className="text-xl font-medium text-foreground">{step.title}</h4>
                  <p className="text-sm text-muted-foreground leading-relaxed">{step.description}</p>
                </div>
              ))}
            </div>
            
            {/* Mechanism explanation - quieter */}
            <div className="max-w-2xl mx-auto text-center pt-12 border-t border-border/30">
              <h3 className="text-xl md:text-2xl font-medium text-foreground mb-4">
                How Ketamine Works in the Brain
              </h3>
              <p className="text-muted-foreground leading-relaxed">
                Ketamine affects glutamate signaling, which plays a key role in mood and neural connectivity. 
                This mechanism differs from traditional antidepressants.
              </p>
            </div>
          </div>
        </section>

        {/* 7. MID-PAGE REASSURANCE BANNER - Visual anchor */}
        <section className="py-32 bg-primary text-primary-foreground text-center">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-4xl md:text-5xl font-light max-w-3xl mx-auto leading-tight">
              Ketamine therapy is delivered in a calm, medically supervised environment.
            </h2>
            
            <Button size="lg" variant="secondary" className="mt-10 px-10 py-6 text-lg h-auto" asChild>
              <a href="#eligibility-form">
                Check Your Eligibility
              </a>
            </Button>
          </div>
        </section>

        {/* 8. WHO MAY BE A GOOD CANDIDATE? - Open checklist */}
        <section className="py-24 lg:py-32 bg-background">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-3xl mx-auto">
              <div className="text-center mb-16">
                <p className="text-primary text-sm font-medium tracking-widest uppercase mb-4">
                  Eligibility
                </p>
                <h2 className="text-4xl md:text-5xl font-light text-foreground">
                  Who May Be a Good Candidate?
                </h2>
              </div>
              
              <ul className="space-y-6 max-w-xl mx-auto">
                {candidateItems.map((item, index) => (
                  <li key={index} className="flex items-start gap-4">
                    <Check className="mt-1 h-5 w-5 text-primary flex-shrink-0" />
                    <span className="text-lg text-foreground/80">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </section>

        {/* 9. SAFETY & SIDE EFFECTS - Visually demoted */}
        <section className="py-16 bg-muted/40">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-3xl mx-auto">
              <div className="text-center mb-10">
                <h2 className="text-3xl font-light text-foreground">
                  Safety & Side Effects
                </h2>
                <p className="text-muted-foreground mt-3 text-base">
                  Ketamine therapy is provided under strict medical protocols with careful screening.
                </p>
              </div>
              
              <Accordion type="single" collapsible className="space-y-3">
                {safetyAccordionItems.map((item) => (
                  <AccordionItem 
                    key={item.id} 
                    value={item.id}
                    className="bg-background rounded-xl border-0 px-6"
                  >
                    <AccordionTrigger className="text-foreground/80 hover:no-underline py-5 text-base font-normal">
                      {item.title}
                    </AccordionTrigger>
                    <AccordionContent className="text-muted-foreground pb-5 text-base leading-relaxed">
                      {item.content}
                    </AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            </div>
          </div>
        </section>

        {/* 10. INSURANCE & ACCESS - 3-column icon row */}
        <section className="py-16 bg-background">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto">
              <div className="text-center mb-12">
                <h2 className="text-3xl font-light text-foreground mb-4">
                  Insurance & Access
                </h2>
                <p className="text-muted-foreground">
                  Ketamine therapy may be eligible for coverage depending on individual plans. 
                  Our team can help review options.
                </p>
              </div>
              
              <div className="grid md:grid-cols-3 gap-12 text-center mb-10">
                <div className="space-y-3">
                  <FileCheck className="w-6 h-6 text-primary mx-auto" />
                  <span className="text-sm text-muted-foreground block">Coverage verification</span>
                </div>
                <div className="space-y-3">
                  <Eye className="w-6 h-6 text-primary mx-auto" />
                  <span className="text-sm text-muted-foreground block">Transparent pricing</span>
                </div>
                <div className="space-y-3">
                  <ShieldCheck className="w-6 h-6 text-primary mx-auto" />
                  <span className="text-sm text-muted-foreground block">HSA/FSA accepted</span>
                </div>
              </div>
              
              <div className="text-center">
                <Button variant="outline" size="sm" asChild>
                  <a href="tel:201-781-2101">
                    <Phone className="w-4 h-4 mr-2" />
                    Verify Coverage
                  </a>
                </Button>
              </div>
            </div>
          </div>
        </section>

        {/* 11. FINAL CTA + REPEATED FORM */}
        <section className="py-32 bg-muted">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid md:grid-cols-2 gap-16 lg:gap-20 items-start max-w-6xl mx-auto">
              {/* Left: CTA copy */}
              <div className="space-y-8">
                <h2 className="text-4xl md:text-5xl font-light text-foreground leading-tight">
                  Take the Next Step Toward Relief
                </h2>
                <p className="text-muted-foreground text-xl leading-relaxed max-w-md">
                  If traditional treatments haven't worked, our care team can help you 
                  understand whether ketamine therapy may be appropriate.
                </p>
              </div>
              
              {/* Right: Form */}
              <div className="space-y-6 rounded-2xl bg-background p-10">
                <h3 className="text-xl md:text-2xl font-medium text-foreground mb-6">Speak With Our Care Team</h3>
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
