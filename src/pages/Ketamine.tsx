import { useState } from "react";
import { Link } from "react-router-dom";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import treatmentKetamine from "@/assets/treatment-ketamine.jpg";
import treatmentRoom from "@/assets/treatment-room.jpg";
import drSangeetKhanna from "@/assets/dr-sangeet-khanna.jpg";
import spravato from "@/assets/treatment-spravato.jpg";
import serviceKetamineInfusion from "@/assets/service-ketamine-infusion.jpg";
import serviceDepression from "@/assets/service-depression.jpg";
import serviceAnxiety from "@/assets/service-anxiety.jpg";
import servicePtsd from "@/assets/service-ptsd.jpg";
import servicePain from "@/assets/service-pain.jpg";
import serviceMaintenance from "@/assets/service-maintenance.jpg";
import { 
  ArrowRight,
  Check,
  Users
} from "lucide-react";

// Scroll helper
const scrollToId = (id: string) =>
  document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" });

// Stats for hero
const statsItems = [
  { value: "470+", label: "Patients helped" },
  { value: "98%", label: "Patient satisfaction" },
  { value: "15+", label: "Years experience" },
  { value: "1000+", label: "Treatments delivered" },
];

// How it works steps
const processSteps = [
  {
    step: 1,
    title: "Book Consultation",
    description: "Schedule a confidential evaluation with our care team to discuss your treatment history."
  },
  {
    step: 2,
    title: "Clinical Evaluation",
    description: "A thorough review of symptoms, medical history, and treatment background."
  },
  {
    step: 3,
    title: "Personalized Treatment",
    description: "Ketamine is administered in a controlled medical setting tailored to your needs."
  },
  {
    step: 4,
    title: "Ongoing Support",
    description: "Continuous monitoring and follow-up care to optimize your treatment outcomes."
  },
];

// Services grid with images
const servicesItems = [
  {
    image: serviceKetamineInfusion,
    title: "Ketamine Infusions",
    description: "IV ketamine therapy administered in a comfortable, medically supervised setting."
  },
  {
    image: serviceDepression,
    title: "Treatment-Resistant Depression",
    description: "Specialized protocols for patients who haven't responded to traditional antidepressants."
  },
  {
    image: serviceAnxiety,
    title: "Anxiety Treatment",
    description: "Evidence-based ketamine protocols for chronic anxiety and related conditions."
  },
  {
    image: servicePtsd,
    title: "PTSD Therapy",
    description: "Trauma-focused treatment combining ketamine with supportive care."
  },
  {
    image: servicePain,
    title: "Chronic Pain Management",
    description: "Ketamine infusions for neuropathic pain and chronic pain conditions."
  },
  {
    image: serviceMaintenance,
    title: "Maintenance Programs",
    description: "Ongoing treatment plans to sustain improvement and prevent relapse."
  },
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
  const labelClass = isDark ? "text-primary-foreground/70 text-sm font-normal" : "text-muted-foreground text-sm font-normal";
  const inputClass = isDark 
    ? "bg-primary-foreground/5 border-primary-foreground/10 text-primary-foreground placeholder:text-primary-foreground/40 focus:border-primary-foreground/30 h-12 rounded-lg" 
    : "bg-background border-border/30 h-12 rounded-lg focus:border-primary/30";
  const radioContainerClass = isDark 
    ? "bg-primary-foreground/5 border-primary-foreground/10 hover:bg-primary-foreground/10" 
    : "bg-background border-border/30 hover:border-border/50";

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* Question 1 */}
      <div className="space-y-3">
        <Label className={labelClass}>Have you tried 2+ antidepressants without lasting relief?</Label>
        <div className="flex gap-3">
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
              <span className={isDark ? "text-primary-foreground/90 text-sm" : "text-foreground text-sm"}>{option}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Question 2 */}
      <div className="space-y-3">
        <Label className={labelClass}>Are you currently diagnosed with depression, anxiety, or PTSD?</Label>
        <div className="flex gap-3">
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
              <span className={isDark ? "text-primary-foreground/90 text-sm" : "text-foreground text-sm"}>{option}</span>
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
      <div className="grid sm:grid-cols-2 gap-4">
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

      <Button type="submit" size="lg" className={`w-full h-12 ${isDark ? 'bg-primary-foreground text-primary hover:bg-primary-foreground/90' : ''}`}>
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
        {/* SECTION 1 — HERO (Split layout + image + stats) */}
        <section className="pt-16 md:pt-24 pb-10">
          <div className="mx-auto max-w-6xl px-6 grid md:grid-cols-2 gap-12 items-center">
            {/* Left column */}
            <div className="space-y-6">
              <h1 className="text-4xl md:text-6xl font-semibold tracking-tight text-foreground">
                Ketamine Therapy for Treatment-Resistant Depression
              </h1>
              <p className="text-base md:text-lg leading-relaxed text-muted-foreground">
                Personalized care for individuals who haven't found relief with traditional treatments.
              </p>
              
              <div className="flex flex-wrap gap-4 pt-4">
                <Button size="lg" onClick={() => scrollToId("eligibility")} className="px-10">
                  Book Consultation
                </Button>
                <button 
                  onClick={() => scrollToId("how-it-works")}
                  className="text-sm font-medium text-muted-foreground hover:text-foreground underline underline-offset-4 transition-colors"
                >
                  Learn how it works
                </button>
              </div>
            </div>
            
            {/* Right column - Hero image */}
            <div className="rounded-3xl overflow-hidden bg-muted aspect-[4/3]">
              <img 
                src={treatmentRoom} 
                alt="Comfortable ketamine treatment room"
                className="w-full h-full object-cover"
              />
            </div>
          </div>
          
          {/* Stats row */}
          <div className="mx-auto max-w-6xl px-6 mt-10">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {statsItems.map((stat, index) => (
                <div key={index} className="rounded-2xl bg-muted/40 p-5">
                  <div className="text-2xl font-semibold text-foreground">{stat.value}</div>
                  <div className="text-sm text-muted-foreground">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* SECTION 2 — "Rapid Solutions" parallax banner */}
        <section className="relative py-28 md:py-40 overflow-hidden">
          {/* Parallax background image - replace src later */}
          <div 
            className="absolute inset-0 bg-cover bg-center bg-fixed"
            style={{ backgroundImage: `url(${treatmentKetamine})` }}
          />
          {/* Dark overlay for text readability */}
          <div className="absolute inset-0 bg-black/60" />
          
          <div className="relative z-10 mx-auto max-w-4xl px-6 text-center space-y-6">
            <h2 className="text-3xl md:text-5xl font-semibold tracking-tight text-white">
              Rapid Relief When Traditional Treatments Haven't Worked
            </h2>
            <p className="text-base md:text-lg leading-relaxed text-white/80 max-w-2xl mx-auto">
              Ketamine therapy offers a different mechanism of action that can help patients who haven't responded to conventional antidepressants experience meaningful improvement.
            </p>
            <Button 
              variant="outline" 
              onClick={() => scrollToId("eligibility")}
              className="border-white text-white hover:bg-white hover:text-foreground"
            >
              Learn More
            </Button>
          </div>
        </section>

        {/* SECTION 3 — SERVICES GRID (moved under parallax) */}
        <section className="py-20 md:py-28 bg-muted/30">
          <div className="mx-auto max-w-6xl px-6">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-semibold tracking-tight text-foreground">
                Our Services
              </h2>
              <p className="mt-4 text-base md:text-lg text-muted-foreground max-w-2xl mx-auto">
                Comprehensive ketamine therapy programs tailored to your needs.
              </p>
            </div>
            
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {servicesItems.map((service, index) => (
                <div 
                  key={index} 
                  className="rounded-2xl bg-background overflow-hidden hover:shadow-lg transition group"
                >
                  <div className="aspect-[4/3] overflow-hidden">
                    <img 
                      src={service.image} 
                      alt={service.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                  </div>
                  <div className="p-6">
                    <h3 className="text-xl font-semibold text-foreground">{service.title}</h3>
                    <p className="mt-2 text-muted-foreground text-sm">{service.description}</p>
                    <button 
                      className="mt-4 text-sm font-medium underline underline-offset-4 text-foreground hover:text-primary transition-colors"
                      onClick={() => scrollToId("eligibility")}
                    >
                      Book Consultation
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* SECTION 4 — TESTIMONIAL STRIP */}
        <section className="py-20 md:py-28">
          <div className="mx-auto max-w-3xl px-6">
            <div className="rounded-3xl bg-muted/40 p-10 text-center shadow-sm">
              <div className="mb-4 text-lg text-primary">★★★★★</div>
              <p className="text-lg leading-relaxed text-foreground">
                "After years of trying different medications without success, ketamine therapy at Relaxol Clinic gave me hope again. The staff was incredibly supportive and professional throughout the entire process."
              </p>
              <div className="mt-6 text-sm text-muted-foreground">Sarah M. • Verified Patient (placeholder)</div>
            </div>
          </div>
        </section>

        {/* SECTION 5 — HOW IT WORKS (2x2 grid) */}
        <section id="how-it-works" className="py-20 md:py-28 bg-muted/30 scroll-mt-20">
          <div className="mx-auto max-w-6xl px-6">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-semibold tracking-tight text-foreground">
                How It Works
              </h2>
              <p className="mt-4 text-base md:text-lg text-muted-foreground max-w-2xl mx-auto">
                Your journey to wellness begins with a simple consultation.
              </p>
            </div>
            
            <div className="grid md:grid-cols-2 gap-6">
              {processSteps.map((step) => (
                <div key={step.step} className="rounded-2xl bg-background p-7">
                  <div className="text-xs uppercase tracking-widest text-muted-foreground">Step {step.step}</div>
                  <h3 className="mt-2 text-xl font-semibold text-foreground">{step.title}</h3>
                  <p className="mt-3 text-muted-foreground">{step.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* SECTION 6 — "Choose Your Physician" credibility block */}
        <section className="py-20 md:py-28">
          <div className="mx-auto max-w-6xl px-6">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-semibold tracking-tight text-foreground">
                Meet Your Care Team
              </h2>
              <p className="mt-4 text-base md:text-lg text-muted-foreground max-w-2xl mx-auto">
                Board-certified physicians dedicated to your mental health journey.
              </p>
            </div>
            
            <div className="grid md:grid-cols-2 gap-8 items-stretch max-w-4xl mx-auto">
              {/* Dr. Khanna */}
              <div className="rounded-3xl bg-muted/40 overflow-hidden">
                <div className="aspect-[4/3] bg-muted">
                  <img 
                    src={drSangeetKhanna} 
                    alt="Dr. Sangeet Khanna"
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="p-8 space-y-3">
                  <h3 className="text-xl font-semibold text-foreground">Dr. Sangeet Khanna</h3>
                  <p className="text-muted-foreground">
                    Founder of Relaxol Clinic with 15+ years of experience in psychiatry and ketamine therapy. Board-certified physician dedicated to helping patients find relief.
                  </p>
                  <Button variant="outline" onClick={() => scrollToId("eligibility")}>
                    Book with Dr. Khanna
                  </Button>
                </div>
              </div>
              
              {/* Expandable placeholder */}
              <div className="rounded-3xl bg-muted/40 overflow-hidden flex flex-col">
                <div className="aspect-[4/3] bg-muted flex items-center justify-center">
                  <Users className="h-16 w-16 text-muted-foreground/30" />
                </div>
                <div className="p-8 space-y-3 flex-1 flex flex-col">
                  <h3 className="text-xl font-semibold text-foreground">Growing Team</h3>
                  <p className="text-muted-foreground flex-1">
                    Our clinic is expanding to serve more patients. Additional providers coming soon to ensure personalized, accessible care.
                  </p>
                  <Button variant="outline" onClick={() => scrollToId("eligibility")}>
                    Join Waitlist
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* SECTION 7 — SPRAVATO CROSS-SELL MODULE */}
        <section className="py-20 md:py-28 bg-muted/30">
          <div className="mx-auto max-w-6xl px-6">
            <div className="grid md:grid-cols-2 gap-12 items-center rounded-3xl bg-muted/40 p-10">
              {/* Left: Text */}
              <div className="space-y-6">
                <h2 className="text-3xl md:text-4xl font-semibold tracking-tight text-foreground">
                  Also Offering SPRAVATO® Treatment
                </h2>
                <p className="text-base md:text-lg leading-relaxed text-muted-foreground">
                  SPRAVATO® (esketamine) is an FDA-approved nasal spray for treatment-resistant depression. It's administered in our clinic under medical supervision and may be covered by insurance.
                </p>
                <div className="flex flex-wrap gap-4">
                  <Button asChild>
                    <Link to="/spravato-Englewood">Learn About SPRAVATO®</Link>
                  </Button>
                  <Button variant="outline" onClick={() => scrollToId("eligibility")}>
                    Check Eligibility
                  </Button>
                </div>
              </div>
              
              {/* Right: Image */}
              <div className="rounded-2xl overflow-hidden bg-muted aspect-[4/3]">
                <img 
                  src={spravato} 
                  alt="SPRAVATO treatment"
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
          </div>
        </section>

        {/* SECTION 8 — BLOG PREVIEW */}
        <section className="py-20 md:py-28">
          <div className="mx-auto max-w-6xl px-6">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-semibold tracking-tight text-foreground">
                Stay Up to Date
              </h2>
              <p className="mt-4 text-base md:text-lg text-muted-foreground max-w-2xl mx-auto">
                Latest insights on ketamine therapy and mental health treatment.
              </p>
            </div>
            
            <div className="grid md:grid-cols-2 gap-8">
              {/* Blog post 1 */}
              <div className="rounded-3xl overflow-hidden bg-muted/40">
                <div className="aspect-[16/10] bg-muted" />
                <div className="p-7 space-y-3">
                  <h3 className="text-xl font-semibold text-foreground">Understanding Ketamine Therapy: What to Expect</h3>
                  <p className="text-muted-foreground">A comprehensive guide to your first ketamine treatment session, from preparation to aftercare. (placeholder)</p>
                  <Button variant="outline" size="sm">Read More</Button>
                </div>
              </div>
              
              {/* Blog post 2 */}
              <div className="rounded-3xl overflow-hidden bg-muted/40">
                <div className="aspect-[16/10] bg-muted" />
                <div className="p-7 space-y-3">
                  <h3 className="text-xl font-semibold text-foreground">Ketamine vs. Traditional Antidepressants</h3>
                  <p className="text-muted-foreground">Exploring the differences in mechanism, timeline, and effectiveness for treatment-resistant depression. (placeholder)</p>
                  <Button variant="outline" size="sm">Read More</Button>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* SAFETY & SIDE EFFECTS (Demoted, quieter) */}
        <section className="py-16 bg-muted/30">
          <div className="mx-auto max-w-6xl px-6">
            <div className="max-w-3xl mx-auto">
              <div className="text-center mb-10">
                <h2 className="text-2xl font-semibold text-foreground">
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
                    className="bg-background rounded-xl border-0 px-6"
                  >
                    <AccordionTrigger className="text-foreground/80 hover:no-underline py-4 text-sm font-normal">
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

        {/* SECTION 9 — FINAL CTA + ELIGIBILITY FORM */}
        <section id="eligibility" className="py-24 bg-[#3A3A3A] text-white scroll-mt-20">
          <div className="mx-auto max-w-6xl px-6">
            <div className="grid md:grid-cols-2 gap-12 items-start">
              {/* Left: CTA copy + trust bullets */}
              <div className="space-y-8">
                <h2 className="text-3xl md:text-4xl font-semibold tracking-tight text-white">
                  Take the Next Step Toward Relief
                </h2>
                <p className="text-white/70 text-lg leading-relaxed">
                  If traditional treatments haven't worked, our care team can help you understand whether ketamine therapy may be appropriate.
                </p>
                
                <ul className="space-y-4 pt-4">
                  <li className="flex items-start gap-3">
                    <Check className="w-5 h-5 text-white/70 flex-shrink-0 mt-0.5" />
                    <span className="text-white/70">No obligation assessment</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <Check className="w-5 h-5 text-white/70 flex-shrink-0 mt-0.5" />
                    <span className="text-white/70">Response within 48 hours</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <Check className="w-5 h-5 text-white/70 flex-shrink-0 mt-0.5" />
                    <span className="text-white/70">Confidential submission</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <Check className="w-5 h-5 text-white/70 flex-shrink-0 mt-0.5" />
                    <span className="text-white/70">Insurance verification available</span>
                  </li>
                </ul>
                
                <div className="pt-4">
                  <p className="text-white/50 text-sm">
                    Or call us directly: <a href="tel:201-781-2101" className="underline hover:text-white">201-781-2101</a>
                  </p>
                </div>
              </div>
              
              {/* Right: Form */}
              <div className="rounded-2xl bg-white/10 backdrop-blur p-8">
                <EligibilityForm variant="dark" />
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
