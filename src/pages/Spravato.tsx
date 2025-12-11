import { Header } from "@/components/layout/Header";
import spravatoNasalSpray from "@/assets/spravato-nasal-spray.png";
import spravatoBrainMechanism from "@/assets/spravato-brain-mechanism.png";
import { Footer } from "@/components/layout/Footer";
import { Button } from "@/components/ui/button";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { 
  ShieldCheck, 
  Stethoscope, 
  FileCheck, 
  Brain, 
  HeartPulse, 
  Pill, 
  UserCheck,
  ClipboardCheck,
  BadgeCheck,
  Activity,
  CalendarCheck,
  Clock,
  Sofa,
  Users,
  TrendingUp,
  Sparkles,
  Heart,
  AlertCircle,
  Phone,
  ArrowRight
} from "lucide-react";

// Trust badges data
const trustBadges = [
  { icon: ShieldCheck, text: "FDA-Approved SPRAVATO® Clinic" },
  { icon: Stethoscope, text: "Board-Certified Psychiatric Care" },
  { icon: FileCheck, text: "Insurance & Benefits Support" },
];

// Eligibility cards data
const eligibilityCards = [
  {
    icon: Brain,
    title: "Treatment-Resistant Depression (TRD)",
    description: "For individuals whose depression has not adequately responded to standard treatments."
  },
  {
    icon: HeartPulse,
    title: "Major Depressive Disorder with Suicidal Ideation",
    description: "For adults with MDD experiencing acute suicidal thoughts or actions requiring rapid intervention."
  },
  {
    icon: Pill,
    title: "Tried Multiple Antidepressants",
    description: "Candidates who have tried two or more antidepressants without achieving adequate symptom relief."
  },
  {
    icon: UserCheck,
    title: "Working with a Mental Health Professional",
    description: "SPRAVATO® is used alongside an oral antidepressant as part of a comprehensive treatment plan."
  },
];

// Timeline steps
const timelineSteps = [
  {
    icon: ClipboardCheck,
    title: "Consultation & Evaluation",
    description: "Meet with our psychiatric team to discuss your history and determine if SPRAVATO® may be right for you."
  },
  {
    icon: FileCheck,
    title: "Insurance & REMS Enrollment",
    description: "We handle insurance verification and complete the required FDA REMS program enrollment on your behalf."
  },
  {
    icon: Activity,
    title: "In-Clinic Dosing",
    description: "Self-administer the nasal spray under clinical supervision in our comfortable treatment suite."
  },
  {
    icon: Clock,
    title: "Post-Treatment Monitoring",
    description: "Relax in our clinic for approximately two hours while our staff monitors your vitals and wellbeing."
  },
  {
    icon: CalendarCheck,
    title: "Ongoing Follow-Up",
    description: "Continue with a personalized maintenance schedule, adjusting frequency as your progress evolves."
  },
];

// Treatment day checklist
const treatmentDayChecklist = [
  "Arrive and complete a brief check-in with vital signs",
  "Review the session plan with your care coordinator",
  "Self-administer the nasal spray in a private, calming room",
  "Recline comfortably while staff monitors your response",
  "Remain in the clinic for observation (typically ~2 hours total)",
  "Arrange for a support person to drive you home afterward"
];

// Benefits cards
const benefitsCards = [
  {
    icon: Sparkles,
    title: "Rapid Symptom Relief",
    description: "Some patients report noticeable improvements within hours to days, unlike traditional antidepressants that may take weeks."
  },
  {
    icon: TrendingUp,
    title: "Another Option When Others Haven't Worked",
    description: "Designed specifically for those who haven't found adequate relief from standard depression treatments."
  },
  {
    icon: Heart,
    title: "Part of a Comprehensive Plan",
    description: "SPRAVATO® works alongside your oral antidepressant and ongoing psychiatric care for holistic support."
  },
  {
    icon: Users,
    title: "Supports Daily Functioning",
    description: "Many patients experience improvements in mood, energy, and the ability to engage with daily life."
  },
];

// Safety points
const safetyPoints = [
  "Continuous medical monitoring throughout each session",
  "Regular vital sign checks before, during, and after treatment",
  "Trained psychiatric staff on-site at all times",
  "Emergency protocols and equipment readily available",
  "Comprehensive patient education before starting treatment"
];

// Side effects
const sideEffects = [
  "Temporary dissociation or feeling disconnected",
  "Dizziness or lightheadedness",
  "Nausea or changes in taste",
  "Temporary increases in blood pressure",
  "Sedation or drowsiness"
];

// FAQ data
const faqItems = [
  {
    question: "How soon might I notice changes in my symptoms?",
    answer: "Response times vary by individual. Some patients report feeling improvements within hours to days of their first treatment, while others may need several sessions before noticing meaningful changes. Your clinician will work with you to assess progress throughout your treatment course."
  },
  {
    question: "How long will I be in the clinic for each visit?",
    answer: "Plan for approximately 2 to 2.5 hours per visit. This includes check-in, the nasal spray administration (which takes only a few minutes), and the required post-treatment monitoring period mandated by the FDA."
  },
  {
    question: "Can I drive myself home after SPRAVATO®?",
    answer: "No. Due to the medication's effects, you must have a responsible adult drive you home after each treatment session. You should not drive, operate machinery, or engage in activities requiring full alertness until the following day after a restful sleep."
  },
  {
    question: "Is SPRAVATO® the same as IV ketamine?",
    answer: "While both are related compounds, SPRAVATO® (esketamine) is an FDA-approved nasal spray specifically for treatment-resistant depression and is administered only at certified healthcare settings under strict protocols. IV ketamine infusions are a different treatment approach with different regulatory considerations."
  },
  {
    question: "Will I have to stop my current medications?",
    answer: "SPRAVATO® is designed to be used alongside an oral antidepressant, not as a replacement. Your psychiatrist will review your current medications and make individualized recommendations. Never stop or change medications without consulting your healthcare provider."
  },
  {
    question: "Does insurance cover SPRAVATO® treatment?",
    answer: "Many insurance plans, including Medicare, may cover SPRAVATO® for eligible patients with treatment-resistant depression. Our team will verify your benefits and assist with prior authorization requests to help maximize your coverage."
  },
];

export default function Spravato() {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      {/* Hero Section */}
      <section className="relative py-16 md:py-20 flex items-center overflow-hidden">
        {/* Background with gradient */}
        <div className="absolute inset-0 bg-gradient-to-r from-[#3D2E24] via-foreground to-foreground" />
        
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10 py-16 md:py-20">
          <div className="max-w-3xl mx-auto text-center text-background space-y-6">
            <p className="text-primary font-medium tracking-widest uppercase text-xs sm:text-sm">
              FIND HOPE AND RELIEF TODAY
            </p>
            
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold leading-tight">
              New York's Premier<br />
              <span className="text-primary">SPRAVATO®</span> & Ketamine Clinic
            </h1>
            
            <p className="text-base sm:text-lg md:text-xl text-background/80 leading-relaxed max-w-2xl mx-auto">
              FDA-approved SPRAVATO® and ketamine treatments for adults with treatment-resistant 
              depression. Clinician-led care in a safe, monitored setting designed for your 
              comfort and wellbeing.
            </p>
          </div>
        </div>
      </section>

      {/* What is SPRAVATO Section */}
      <section className="py-20 lg:py-28 bg-background">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
            {/* Left Column - Text */}
            <div className="space-y-6">
              <span className="section-label">About the Treatment</span>
              <h2 className="text-3xl md:text-4xl font-semibold text-foreground leading-tight">
                What is SPRAVATO®?
              </h2>
              
              <div className="space-y-4 text-muted-foreground leading-relaxed">
                <p>
                  SPRAVATO® (esketamine) is an FDA-approved nasal spray medication designed 
                  specifically for adults with treatment-resistant depression (TRD) or major 
                  depressive disorder (MDD) with suicidal thoughts or actions.
                </p>
                <p>
                  Unlike traditional antidepressants that primarily affect serotonin or 
                  norepinephrine, SPRAVATO® works on the glutamate system—a different 
                  pathway in the brain associated with mood regulation and neural connectivity.
                </p>
                <p>
                  Because of its unique mechanism, SPRAVATO® may help patients who have not 
                  found adequate relief from other depression treatments, offering a new 
                  avenue for those who have struggled with their mental health journey.
                </p>
              </div>
              
              {/* Bullet Points */}
              <ul className="space-y-3 pt-4">
                <li className="flex items-start gap-3">
                  <div className="w-6 h-6 rounded-full bg-primary/20 flex items-center justify-center flex-shrink-0 mt-0.5">
                    <BadgeCheck className="w-4 h-4 text-primary" />
                  </div>
                  <span className="text-foreground">Nasal spray medication administered in-clinic</span>
                </li>
                <li className="flex items-start gap-3">
                  <div className="w-6 h-6 rounded-full bg-primary/20 flex items-center justify-center flex-shrink-0 mt-0.5">
                    <BadgeCheck className="w-4 h-4 text-primary" />
                  </div>
                  <span className="text-foreground">Available only at certified REMS healthcare settings</span>
                </li>
                <li className="flex items-start gap-3">
                  <div className="w-6 h-6 rounded-full bg-primary/20 flex items-center justify-center flex-shrink-0 mt-0.5">
                    <BadgeCheck className="w-4 h-4 text-primary" />
                  </div>
                  <span className="text-foreground">Used in combination with an oral antidepressant</span>
                </li>
              </ul>
            </div>
            
            {/* Right Column - Video */}
            <div className="space-y-6">
              <div className="image-card aspect-video overflow-hidden">
                <iframe
                  src="https://player.vimeo.com/video/332355023?h=0&title=0&byline=0&portrait=0"
                  className="w-full h-full"
                  allow="autoplay; fullscreen; picture-in-picture"
                  allowFullScreen
                  title="What is SPRAVATO®?"
                />
              </div>
              
              {/* CTA Button */}
              <Button 
                variant="default" 
                size="lg"
                className="w-full group"
                asChild
              >
                <a href="/contact">
                  Schedule a SPRAVATO® Consultation
                  <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
                </a>
              </Button>
              
              {/* Contact Info */}
              <div className="bg-card rounded-2xl p-6 shadow-sm">
                <p className="text-foreground font-semibold mb-3">Have questions about SPRAVATO®?</p>
                <div className="space-y-2 text-muted-foreground">
                  <a 
                    href="tel:201-781-2101" 
                    className="flex items-center gap-2 hover:text-primary transition-colors"
                  >
                    <Phone className="w-4 h-4" />
                    <span>201-781-2101</span>
                  </a>
                  <p className="text-sm">
                    Schedule your consultation at Relaxol Clinic in New York
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Treatment-Resistant Depression Section */}
      <section className="py-20 lg:py-28 bg-[#8A6E3A]">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-5 gap-12 lg:gap-16 items-center">
            {/* Left Column - Image (40%) */}
            <div className="lg:col-span-2 flex items-center justify-center">
              <div className="relative">
                <img 
                  src={spravatoNasalSpray} 
                  alt="SPRAVATO® Nasal Spray Device"
                  className="w-full max-w-[280px] lg:max-w-[320px] drop-shadow-2xl"
                />
              </div>
            </div>
            
            {/* Right Column - Content (60%) */}
            <div className="lg:col-span-3 space-y-6">
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white leading-tight">
                Treatment-Resistant Depression
              </h2>
              
              <div className="space-y-5 text-white/90 text-base md:text-lg leading-relaxed">
                <p>
                  Depression is far more complex than occasional sadness. While sadness naturally 
                  comes and goes, clinical depression affects nearly 300 million people worldwide 
                  and often persists despite multiple treatment attempts. Even with a wide range 
                  of available antidepressants, many individuals continue to struggle without 
                  meaningful relief.
                </p>
                <p>
                  SPRAVATO® (esketamine) is an FDA-approved nasal spray offering a new path forward 
                  for treatment-resistant depression. For patients who have not improved with 
                  traditional medications, SPRAVATO® has shown significant and rapid symptom 
                  reduction. As a fully REMS-certified provider, our clinical team is trained to 
                  administer SPRAVATO® safely and effectively—helping patients experience relief 
                  even from the most severe forms of treatment-resistant depression.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* How Is SPRAVATO Different Section */}
      <section className="py-20 lg:py-28 bg-[#F5F1EA]">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            {/* Left Column - Content */}
            <div className="space-y-6">
              <h2 className="text-3xl md:text-4xl lg:text-[42px] font-bold text-[#23160E] leading-tight">
                How Is SPRAVATO® Different?
              </h2>
              
              <div className="text-[#5A4A3A] text-base md:text-lg leading-relaxed space-y-4">
                <p>
                  For decades, the most widely prescribed antidepressants have worked by adjusting 
                  serotonin, norepinephrine, or dopamine levels in the brain. While effective for 
                  many, these medications leave a significant number of patients without relief—even 
                  after trying multiple options.
                </p>
                <p>
                  SPRAVATO® takes a fundamentally different approach. Rather than targeting the 
                  same neurotransmitter pathways, it acts on the NMDA receptor—a key component 
                  of the glutamate system. This mechanism is believed to help restore neural 
                  connections that depression may have weakened, potentially addressing the 
                  underlying condition rather than just managing symptoms.
                </p>
              </div>
            </div>
            
            {/* Right Column - Image */}
            <div className="flex items-center justify-center">
              <div className="relative rounded-2xl overflow-hidden shadow-xl">
                <img 
                  src={spravatoBrainMechanism} 
                  alt="SPRAVATO® brain mechanism illustration showing NMDA receptor pathway"
                  className="w-full max-w-[520px] rounded-xl"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Insurance Coverage Check Form */}
      <section className="py-20 lg:py-28 bg-background">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-2xl mx-auto">
            {/* Header */}
            <div className="text-center mb-10">
              <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-foreground leading-tight mb-4">
                Fill Out The Form Below to See If Your Insurance Covers Our Services
              </h2>
              <p className="text-muted-foreground">
                If you do not have an insurance provider, there are financing options available.
              </p>
            </div>

            {/* Form */}
            <form className="space-y-6">
              {/* Name Fields */}
              <div>
                <label className="block text-sm font-medium text-foreground mb-2">
                  Name<span className="text-red-500">*</span>
                </label>
                <div className="grid grid-cols-2 gap-4">
                  <input
                    type="text"
                    placeholder="First"
                    className="w-full px-4 py-3 border border-border rounded-md bg-background text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50"
                    required
                  />
                  <input
                    type="text"
                    placeholder="Last"
                    className="w-full px-4 py-3 border border-border rounded-md bg-background text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50"
                    required
                  />
                </div>
              </div>

              {/* Email and Phone */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">
                    Email<span className="text-red-500">*</span>
                  </label>
                  <input
                    type="email"
                    className="w-full px-4 py-3 border border-border rounded-md bg-background text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">
                    Best Contact Phone #<span className="text-red-500">*</span>
                  </label>
                  <input
                    type="tel"
                    placeholder="### ### ####"
                    className="w-full px-4 py-3 border border-border rounded-md bg-background text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50"
                    required
                  />
                </div>
              </div>

              {/* Member ID and DOB */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">
                    Member ID on Card<span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    className="w-full px-4 py-3 border border-border rounded-md bg-background text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">
                    Date of Birth<span className="text-red-500">*</span>
                  </label>
                  <input
                    type="date"
                    className="w-full px-4 py-3 border border-border rounded-md bg-background text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50"
                    required
                  />
                </div>
              </div>

              {/* Insurance Company */}
              <div>
                <label className="block text-sm font-medium text-foreground mb-2">
                  Insurance Company<span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  className="w-full px-4 py-3 border border-border rounded-md bg-background text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50"
                  required
                />
              </div>

              {/* Upload Front of Insurance Card */}
              <div>
                <label className="block text-sm font-medium text-foreground mb-2">
                  Upload Front of Insurance Card<span className="text-red-500">*</span>
                </label>
                <div className="border-2 border-dashed border-border rounded-md p-8 text-center hover:border-primary/50 transition-colors cursor-pointer">
                  <input type="file" className="hidden" id="insurance-front" accept="image/*,.pdf" />
                  <label htmlFor="insurance-front" className="cursor-pointer text-muted-foreground">
                    Choose files or drag here
                  </label>
                </div>
              </div>

              {/* Upload Back of Insurance Card */}
              <div>
                <label className="block text-sm font-medium text-foreground mb-2">
                  Upload Back of Insurance Card<span className="text-red-500">*</span>
                </label>
                <div className="border-2 border-dashed border-border rounded-md p-8 text-center hover:border-primary/50 transition-colors cursor-pointer">
                  <input type="file" className="hidden" id="insurance-back" accept="image/*,.pdf" />
                  <label htmlFor="insurance-back" className="cursor-pointer text-muted-foreground">
                    Choose files or drag here
                  </label>
                </div>
              </div>

              {/* Additional Notes */}
              <div>
                <label className="block text-sm font-medium text-foreground mb-2">
                  Do you have anything you would like us to know regarding your insurance?
                </label>
                <textarea
                  rows={4}
                  className="w-full px-4 py-3 border border-border rounded-md bg-background text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 resize-none"
                />
              </div>

              {/* Submit Button */}
              <Button 
                type="submit" 
                className="w-full py-6 text-lg font-semibold"
              >
                Get Benefits
              </Button>
            </form>
          </div>
        </div>
      </section>

      {/* Eligibility Section */}
      <section id="spravato-eligibility" className="py-20 lg:py-28 bg-card scroll-mt-24">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <span className="section-label">Eligibility</span>
            <h2 className="text-3xl md:text-4xl font-semibold text-foreground mt-4 mb-6">
              Who is SPRAVATO® For?
            </h2>
            <p className="text-muted-foreground text-lg leading-relaxed">
              SPRAVATO® eligibility is determined through a comprehensive psychiatric evaluation. 
              Generally, candidates include adults who meet specific clinical criteria.
            </p>
          </div>
          
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {eligibilityCards.map((card, index) => (
              <div 
                key={index}
                className="treatment-card text-center"
              >
                <div className="icon-container mx-auto mb-6">
                  <card.icon className="w-7 h-7" />
                </div>
                <h3 className="text-lg font-semibold text-foreground mb-3">
                  {card.title}
                </h3>
                <p className="text-muted-foreground text-sm leading-relaxed">
                  {card.description}
                </p>
              </div>
            ))}
          </div>
          
          <p className="text-center text-muted-foreground text-sm mt-10 max-w-2xl mx-auto">
            <AlertCircle className="w-4 h-4 inline-block mr-2" />
            Final eligibility can only be determined by a licensed clinician after a thorough evaluation.
          </p>
        </div>
      </section>

      {/* Timeline Section */}
      <section className="py-20 lg:py-28 bg-background">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <span className="section-label">The Process</span>
            <h2 className="text-3xl md:text-4xl font-semibold text-foreground mt-4 mb-6">
              How SPRAVATO® Treatment Works
            </h2>
            <p className="text-muted-foreground text-lg leading-relaxed">
              From your first consultation to ongoing maintenance, here's what to expect 
              on your SPRAVATO® treatment journey at Relaxol Clinic.
            </p>
          </div>
          
          {/* Desktop Timeline */}
          <div className="hidden lg:block relative">
            {/* Connector Line */}
            <div className="absolute top-7 left-0 right-0 h-0.5 bg-border" />
            
            <div className="grid grid-cols-5 gap-4">
              {timelineSteps.map((step, index) => (
                <div key={index} className="timeline-step">
                  <div className="timeline-circle mb-6">
                    {index + 1}
                  </div>
                  <div className="icon-container mb-4">
                    <step.icon className="w-6 h-6" />
                  </div>
                  <h3 className="text-lg font-semibold text-foreground mb-2 text-center">
                    {step.title}
                  </h3>
                  <p className="text-muted-foreground text-sm text-center leading-relaxed">
                    {step.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
          
          {/* Mobile Timeline */}
          <div className="lg:hidden space-y-8">
            {timelineSteps.map((step, index) => (
              <div key={index} className="flex gap-4">
                <div className="flex flex-col items-center">
                  <div className="timeline-circle text-lg">
                    {index + 1}
                  </div>
                  {index < timelineSteps.length - 1 && (
                    <div className="w-0.5 h-full bg-border mt-2" />
                  )}
                </div>
                <div className="pb-8">
                  <div className="icon-container mb-3 w-12 h-12">
                    <step.icon className="w-5 h-5" />
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
      </section>

      {/* Treatment Day Section */}
      <section className="py-20 lg:py-28 bg-card">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
            {/* Image Side */}
            <div className="order-2 lg:order-1 relative">
              <div className="image-card aspect-[4/3] bg-gradient-to-br from-secondary via-muted to-card flex items-center justify-center">
                <div className="text-center p-8">
                  <div className="w-20 h-20 mx-auto mb-4 rounded-2xl bg-primary/20 flex items-center justify-center">
                    <Sofa className="w-10 h-10 text-primary" />
                  </div>
                  <p className="text-muted-foreground text-sm">
                    Treatment Room Image
                  </p>
                </div>
              </div>
            </div>
            
            {/* Text Side */}
            <div className="order-1 lg:order-2 space-y-6">
              <span className="section-label">Your Visit</span>
              <h2 className="text-3xl md:text-4xl font-semibold text-foreground leading-tight">
                What to Expect on Treatment Day
              </h2>
              
              <p className="text-muted-foreground text-lg leading-relaxed">
                Each SPRAVATO® session at Relaxol Clinic is designed for your comfort and safety. 
                Here's a step-by-step overview of your treatment day experience.
              </p>
              
              <ul className="space-y-4 pt-2">
                {treatmentDayChecklist.map((item, index) => (
                  <li key={index} className="flex items-start gap-3">
                    <div className="w-6 h-6 rounded-full bg-primary text-primary-foreground flex items-center justify-center flex-shrink-0 mt-0.5 text-sm font-medium">
                      {index + 1}
                    </div>
                    <span className="text-foreground">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-20 lg:py-28 bg-background">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <span className="section-label">Benefits</span>
            <h2 className="text-3xl md:text-4xl font-semibold text-foreground mt-4 mb-6">
              Benefits & Outcomes
            </h2>
            <p className="text-muted-foreground text-lg leading-relaxed">
              SPRAVATO® offers a different approach for patients who haven't responded 
              to traditional treatments, with potential benefits that many find meaningful.
            </p>
          </div>
          
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {benefitsCards.map((card, index) => (
              <div 
                key={index}
                className="treatment-card"
              >
                <div className="icon-container mb-6">
                  <card.icon className="w-7 h-7" />
                </div>
                <h3 className="text-lg font-semibold text-foreground mb-3">
                  {card.title}
                </h3>
                <p className="text-muted-foreground text-sm leading-relaxed">
                  {card.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Safety Section */}
      <section className="py-20 lg:py-28 bg-card">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <span className="section-label">Safety</span>
            <h2 className="text-3xl md:text-4xl font-semibold text-foreground mt-4 mb-6">
              Safety, Monitoring & Side Effects
            </h2>
            <p className="text-muted-foreground text-lg leading-relaxed">
              Your safety is our top priority. SPRAVATO® is administered under strict 
              medical supervision with comprehensive monitoring protocols.
            </p>
          </div>
          
          <div className="grid lg:grid-cols-2 gap-8 lg:gap-12">
            {/* Safety Column */}
            <div className="bg-white rounded-3xl p-8 shadow-[var(--shadow-soft)]">
              <div className="flex items-center gap-3 mb-6">
                <div className="icon-container">
                  <ShieldCheck className="w-6 h-6" />
                </div>
                <h3 className="text-xl font-semibold text-foreground">
                  How We Keep You Safe
                </h3>
              </div>
              <ul className="space-y-4">
                {safetyPoints.map((point, index) => (
                  <li key={index} className="flex items-start gap-3">
                    <BadgeCheck className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                    <span className="text-muted-foreground">{point}</span>
                  </li>
                ))}
              </ul>
            </div>
            
            {/* Side Effects Column */}
            <div className="bg-white rounded-3xl p-8 shadow-[var(--shadow-soft)]">
              <div className="flex items-center gap-3 mb-6">
                <div className="icon-container">
                  <AlertCircle className="w-6 h-6" />
                </div>
                <h3 className="text-xl font-semibold text-foreground">
                  Common Experiences & Side Effects
                </h3>
              </div>
              <ul className="space-y-4">
                {sideEffects.map((effect, index) => (
                  <li key={index} className="flex items-start gap-3">
                    <div className="w-5 h-5 rounded-full border-2 border-muted-foreground/30 flex-shrink-0 mt-0.5" />
                    <span className="text-muted-foreground">{effect}</span>
                  </li>
                ))}
              </ul>
              <p className="text-sm text-muted-foreground mt-6 pt-4 border-t border-border">
                Most side effects are temporary and resolve within a few hours. Your clinician 
                will discuss all potential effects with you before starting treatment.
              </p>
            </div>
          </div>
          
          <p className="text-center text-muted-foreground text-sm mt-10 max-w-3xl mx-auto">
            This information is for educational purposes only and does not constitute medical advice. 
            Consult with a qualified healthcare provider for personalized guidance.
          </p>
        </div>
      </section>

      {/* Insurance Section */}
      <section className="py-20 lg:py-28 bg-background">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <span className="section-label">Insurance & Details</span>
            <h2 className="text-3xl md:text-4xl font-semibold text-foreground mt-4 mb-6">
              Insurance & Practical Details
            </h2>
            <p className="text-muted-foreground text-lg leading-relaxed">
              We strive to make SPRAVATO® treatment accessible. Our team handles the 
              administrative details so you can focus on your care.
            </p>
          </div>
          
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="treatment-card text-center">
              <div className="icon-container mx-auto mb-6">
                <FileCheck className="w-7 h-7" />
              </div>
              <h3 className="text-lg font-semibold text-foreground mb-3">
                Insurance Verification
              </h3>
              <p className="text-muted-foreground text-sm leading-relaxed">
                We verify your benefits and assist with prior authorization requests before treatment begins.
              </p>
            </div>
            
            <div className="treatment-card text-center">
              <div className="icon-container mx-auto mb-6">
                <BadgeCheck className="w-7 h-7" />
              </div>
              <h3 className="text-lg font-semibold text-foreground mb-3">
                Coverage Options
              </h3>
              <p className="text-muted-foreground text-sm leading-relaxed">
                Many insurance plans, including Medicare, may cover SPRAVATO® for eligible TRD patients.
              </p>
            </div>
            
            <div className="treatment-card text-center">
              <div className="icon-container mx-auto mb-6">
                <Clock className="w-7 h-7" />
              </div>
              <h3 className="text-lg font-semibold text-foreground mb-3">
                Visit Duration
              </h3>
              <p className="text-muted-foreground text-sm leading-relaxed">
                Expect each treatment session to last approximately 2 to 2.5 hours, including monitoring time.
              </p>
            </div>
            
            <div className="treatment-card text-center">
              <div className="icon-container mx-auto mb-6">
                <CalendarCheck className="w-7 h-7" />
              </div>
              <h3 className="text-lg font-semibold text-foreground mb-3">
                Treatment Schedule
              </h3>
              <p className="text-muted-foreground text-sm leading-relaxed">
                Typically starts with twice-weekly sessions, transitioning to weekly, then bi-weekly maintenance.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-20 lg:py-28 bg-card">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <span className="section-label">FAQ</span>
            <h2 className="text-3xl md:text-4xl font-semibold text-foreground mt-4 mb-6">
              SPRAVATO® Frequently Asked Questions
            </h2>
            <p className="text-muted-foreground text-lg leading-relaxed">
              Have questions about SPRAVATO® treatment? Find answers to common inquiries below.
            </p>
          </div>
          
          <div className="max-w-3xl mx-auto">
            <Accordion type="single" collapsible className="space-y-4">
              {faqItems.map((item, index) => (
                <AccordionItem 
                  key={index} 
                  value={`item-${index}`}
                  className="bg-white rounded-2xl px-6 border-none shadow-sm"
                >
                  <AccordionTrigger className="text-left text-foreground hover:no-underline py-5">
                    {item.question}
                  </AccordionTrigger>
                  <AccordionContent className="text-muted-foreground pb-5">
                    {item.answer}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
            
            <p className="text-center text-muted-foreground mt-10">
              Still have questions? Our team is here to help.{" "}
              <a href="/contact" className="text-primary hover:text-accent font-medium transition-colors">
                Contact us directly
              </a>
            </p>
          </div>
        </div>
      </section>

      {/* Final CTA Section */}
      <section className="py-20 lg:py-28 bg-foreground">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-semibold text-background mb-6">
            Ready to Discuss Whether SPRAVATO® is Right for You?
          </h2>
          <p className="text-background/70 text-lg max-w-2xl mx-auto mb-10 leading-relaxed">
            Take the first step toward exploring a new treatment option. Our compassionate 
            team at Relaxol Clinic is here to answer your questions and guide you through the process.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-10">
            <Button 
              variant="hero" 
              size="xl"
              className="group"
              asChild
            >
              <a href="/contact">
                Schedule a Consultation
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </a>
            </Button>
          </div>
          
          <div className="flex flex-col sm:flex-row items-center justify-center gap-6 text-background/80">
            <a 
              href="tel:201-781-2101" 
              className="flex items-center gap-2 hover:text-primary transition-colors"
            >
              <Phone className="w-5 h-5" />
              <span>201-781-2101</span>
            </a>
            <span className="hidden sm:inline">|</span>
            <span className="text-sm">
              Referrals from psychiatrists and mental health professionals welcome
            </span>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
