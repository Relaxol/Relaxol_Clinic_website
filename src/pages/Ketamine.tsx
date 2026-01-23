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
import conditionDepression from "@/assets/condition-depression-new.jpg";
import conditionAnxiety from "@/assets/condition-anxiety-new.jpg";
import conditionPtsd from "@/assets/condition-ptsd-new.jpg";
import conditionOcd from "@/assets/condition-ocd-new.jpg";
import conditionPain from "@/assets/condition-pain-new.jpg";
import { 
  ArrowRight,
  Check,
  Quote
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
    description: "Evidence-based ketamine protocols for Chronic Anxiety and related conditions."
  },
  {
    image: servicePtsd,
    title: "PTSD Therapy",
    description: "Trauma-focused treatment combining ketamine with supportive care."
  },
  {
    image: servicePain,
    title: "Chronic Pain Management",
    description: "Ketamine infusions for neuropathic pain and Chronic Pain conditions."
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

// Conditions data with accordion items (migrated from original site)
const conditionsData = [
  {
    id: "depression",
    title: "Ketamine and Depression",
    image: conditionDepression,
    intro: "Ketamine has emerged as a powerful treatment for depression, particularly for those who have not found relief through conventional treatments. Its unique mechanism of action offers hope and rapid improvements for many patients.",
    quote: "What you're going through may feel overwhelming now, but it's just one chapter of your story, not the whole book.",
    accordionItems: [
      {
        id: "depression-mechanism",
        title: "Unique Mechanism of Action",
        content: "Unlike conventional antidepressants that primarily target the serotonin and norepinephrine systems, ketamine works on the glutamate system, the most prevalent neurotransmitter in the brain. By antagonizing the N-methyl-D-aspartate (NMDA) receptor, ketamine helps to restore normal communication between brain cells that has been disrupted by chronic stress and depression. This unique action allows for a different approach in treating depression, especially in cases where traditional antidepressants have not been effective."
      },
      {
        id: "depression-rapid",
        title: "Rapid Action",
        content: "One of the most notable features of ketamine treatment for depression is its rapid onset of action. While traditional antidepressants can take weeks to months to show effects, ketamine can produce noticeable improvements in mood and outlook within hours to days. This rapid response is particularly crucial for patients with treatment-resistant depression who are in urgent need of relief."
      },
      {
        id: "depression-neural",
        title: "Neural Regeneration",
        content: "Ketamine promotes the growth of new neural connections through a process known as synaptogenesis. In patients with chronic depression, there is often a decrease in synaptic connections in key areas of the brain associated with mood regulation. Ketamine's ability to stimulate the growth of these connections is thought to contribute significantly to its antidepressant effects, offering a form of neural repair that goes beyond the temporary relief provided by other treatments."
      },
      {
        id: "depression-mood",
        title: "Mood Enhancement",
        content: "By modulating the activity of glutamate and other neurotransmitters, ketamine can lead to improvements in mood, anxiety, and overall well-being. Patients often report a sense of emotional release or breakthrough during treatment, which can be a pivotal experience in their recovery journey."
      },
      {
        id: "depression-suicidal",
        title: "Reduction of Suicidal Ideation",
        content: "Ketamine has been shown to rapidly reduce suicidal thoughts, even in patients with treatment-resistant depression. This effect is particularly vital as it can provide critical time for other treatments to take effect and for patients to engage more fully in comprehensive care programs."
      }
    ]
  },
  {
    id: "anxiety",
    title: "Ketamine and Anxiety",
    image: conditionAnxiety,
    intro: "Ketamine therapy offers a new avenue of hope for individuals struggling with anxiety disorders, especially those who have found limited relief from traditional treatments. Its unique pharmacological properties can rapidly alleviate symptoms and offer a fresh perspective on managing anxiety.",
    quote: "You don't have to let anxiety dictate your life. Each step you take towards understanding and managing it is a victory.",
    accordionItems: [
      {
        id: "anxiety-modulation",
        title: "Modulation of the Glutamate System",
        content: "Ketamine's primary action is on the glutamate neurotransmitter system, the most abundant excitatory neurotransmitter in the brain. By blocking the NMDA receptors, ketamine influences glutamate activity, which plays a crucial role in mood regulation and anxiety responses. This modulation leads to rapid changes in brain chemistry that can significantly reduce anxiety symptoms."
      },
      {
        id: "anxiety-rapid",
        title: "Rapid Onset of Action",
        content: "Unlike many traditional anxiety medications that may take weeks to become effective, ketamine can produce quick relief from anxiety symptoms, sometimes within hours. This rapid action is particularly beneficial for individuals with severe anxiety who are in immediate need of intervention."
      },
      {
        id: "anxiety-neural",
        title: "Promotion of Neural Plasticity",
        content: "Ketamine stimulates neuroplasticity – the brain's ability to form new neural connections. This can help 'rewire' the brain's response to anxiety-inducing stimuli, offering a more lasting impact compared to traditional anxiolytics that only temporarily alleviate symptoms."
      },
      {
        id: "anxiety-dissociative",
        title: "Dissociative Effects",
        content: "At controlled doses, ketamine's mild dissociative effects can provide a unique psychological space that allows individuals to distance themselves from their anxiety, gain perspective, and potentially explore the roots of their anxiety with greater objectivity. This effect is carefully managed to ensure safety and therapeutic benefit."
      },
      {
        id: "anxiety-enhancement",
        title: "Enhancement of Mindfulness and Psychotherapy",
        content: "Ketamine therapy can enhance the effectiveness of psychotherapy and mindfulness practices. The altered state of consciousness it induces can facilitate deeper self-reflection and make individuals more receptive to therapeutic interventions, leading to more profound and lasting changes in anxiety management."
      }
    ]
  },
  {
    id: "ptsd",
    title: "Ketamine and PTSD",
    image: conditionPtsd,
    intro: "Ketamine therapy presents a transformative approach for those suffering from PTSD, particularly when traditional treatments have not been sufficient. Its unique pharmacological action offers rapid relief from PTSD symptoms and aids in the deeper processing of traumatic experiences.",
    quote: "Your past doesn't define you. What you choose to do now and what you overcome define your character. Healing is possible, and it starts with a single step.",
    accordionItems: [
      {
        id: "ptsd-rapid",
        title: "Rapid Symptom Relief",
        content: "Ketamine can provide quick relief from the intense and often debilitating symptoms of PTSD, such as flashbacks, severe anxiety, and emotional numbing. This rapid action can be a significant relief for patients who have struggled with these symptoms for extended periods."
      },
      {
        id: "ptsd-glutamate",
        title: "Modulation of Glutamate",
        content: "By acting on the NMDA receptors, ketamine influences the glutamate system, which is involved in learning, memory, and emotional responses. This can help recalibrate the brain's response to trauma-related memories, reducing the intensity of the patient's reactions to triggers."
      },
      {
        id: "ptsd-neural",
        title: "Facilitation of Neural Plasticity",
        content: "Ketamine promotes the growth of new synaptic connections. For PTSD patients, this can mean a restructuring of the neural pathways associated with traumatic memories, potentially leading to a reduction in the hold these memories have over the individual."
      },
      {
        id: "ptsd-dissociative",
        title: "Dissociative Properties",
        content: "In a controlled therapeutic setting, ketamine's dissociative effects can enable patients to revisit traumatic memories with a sense of detachment. This can facilitate a more objective processing of traumatic experiences, which is a crucial part of trauma-focused therapies."
      },
      {
        id: "ptsd-enhancement",
        title: "Enhancement of Therapeutic Processes",
        content: "The altered state of consciousness induced by ketamine can enhance the effectiveness of concurrent psychotherapy. It can make patients more open to exploring their trauma and more receptive to therapeutic strategies, potentially accelerating the healing process."
      }
    ]
  },
  {
    id: "ocd",
    title: "Ketamine and OCD",
    image: conditionOcd,
    intro: "Ketamine therapy is showing promise for individuals with Obsessive-Compulsive Disorder (OCD), particularly for those who have not responded adequately to traditional treatments. Its unique action on the brain's neurotransmitter systems can offer a new path to relief.",
    quote: "You are not defined by OCD. Your courage to confront and overcome these challenges reflects your true strength.",
    accordionItems: [
      {
        id: "ocd-glutamate",
        title: "Impact on Glutamate System",
        content: "Ketamine's primary action on the glutamate system, specifically its antagonism of NMDA receptors, plays a key role in its potential effectiveness for OCD. Glutamate dysregulation has been implicated in OCD, and by modulating this system, ketamine can help normalize neural activity in areas of the brain involved in obsessive and compulsive behaviors."
      },
      {
        id: "ocd-rapid",
        title: "Rapid Reduction in Symptoms",
        content: "One of the most significant advantages of ketamine therapy for OCD is its rapid onset of action. Unlike SSRIs or other treatments that may take weeks to become effective, ketamine can offer quicker relief from the intrusive thoughts and compulsive behaviors characteristic of OCD."
      },
      {
        id: "ocd-neural",
        title: "Neuroplasticity Enhancement",
        content: "Ketamine has been shown to promote neuroplasticity, the brain's ability to form and reorganize synaptic connections. This could be particularly beneficial for OCD patients, as it may help 'rewire' the brain's pathways that are involved in the cycle of obsessive thoughts and compulsive actions."
      },
      {
        id: "ocd-mood",
        title: "Mood and Anxiety Relief",
        content: "OCD often coexists with anxiety and mood disorders. Ketamine's ability to rapidly alleviate anxiety and improve mood can provide additional relief for OCD patients, addressing the broader mental health picture and improving overall quality of life."
      },
      {
        id: "ocd-therapy",
        title: "Enhancing Therapy Outcomes",
        content: "For some patients, ketamine therapy may enhance the effectiveness of cognitive-behavioral therapy (CBT) and other therapeutic approaches for OCD. The altered state of consciousness induced by ketamine can increase openness to new perspectives and therapeutic insights."
      }
    ]
  },
  {
    id: "chronic-pain",
    title: "Ketamine and Chronic Pain",
    image: conditionPain,
    intro: "Ketamine has emerged as a promising option for people living with chronic pain, especially for those who have tried multiple treatments without finding lasting relief. By working differently than many traditional pain therapies, ketamine may help ease pain, support daily functioning, and improve overall quality of life.",
    quote: "Chronic pain may be a chapter in your life, but it is not the whole story—there are still pages of hope yet to be written.",
    accordionItems: [
      {
        id: "pain-mechanism",
        title: "Unique Mechanism of Action",
        content: "Unlike traditional pain medications that primarily address symptoms, ketamine works by modulating the NMDA receptor system and reducing nerve hypersensitivity, helping the nervous system reset its pain signaling."
      },
      {
        id: "pain-rapid",
        title: "Rapid Relief",
        content: "Many patients experience noticeable reductions in pain and improved comfort within hours, rather than the weeks or months typical of standard pain treatments."
      },
      {
        id: "pain-rewiring",
        title: "Re-Wiring the Nervous System",
        content: "Ketamine encourages neuroplasticity—meaning the brain and spinal cord can form new connections and pathways, helping disrupt long-standing pain circuits and restore more normal sensation and movement."
      },
      {
        id: "pain-sensitivity",
        title: "Reduced Sensitivity & Improved Function",
        content: "By reducing over-active pain signaling and nerve sensitization, ketamine not only eases discomfort but can also improve mobility, sleep, and quality of life for individuals living with chronic pain."
      },
      {
        id: "pain-conditions",
        title: "Conditions We Treat",
        content: "Complex Regional Pain Syndrome (CRPS), Fibromyalgia, Neuropathic pain, Chronic migraines and headaches, Failed back surgery syndrome, and Phantom limb pain."
      },
      {
        id: "pain-candidate",
        title: "Who Is a Candidate?",
        content: "Adults with chronic pain lasting more than 3 months, those who haven't responded adequately to conventional pain treatments, patients looking to reduce dependence on opioid medications, and individuals with pain conditions that have a neuropathic component."
      }
    ]
  }
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
        <Label className={labelClass}>Are you currently diagnosed with Depression, Anxiety, or PTSD?</Label>
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
        <Label htmlFor="zipCode" className={labelClass}>ZIP Code <span className="text-destructive">*</span></Label>
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
          <Label htmlFor="email" className={labelClass}>Email <span className="text-destructive">*</span></Label>
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
          <Label htmlFor="phone" className={labelClass}>Phone <span className="text-destructive">*</span></Label>
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
              <h1 className="tracking-tight text-foreground">
                <span className="block text-3xl sm:text-4xl lg:text-5xl font-bold">Ketamine Therapy:</span>
                <span className="block text-xl sm:text-2xl lg:text-3xl font-medium text-muted-foreground mt-2">Rapid Relief for a Range of Mood and Chronic Conditions</span>
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

        {/* SECTION — UNDERSTANDING KETAMINE THERAPY */}
        <section className="py-10 md:py-20 lg:py-28 bg-background">
          <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 xl:px-16">
            {/* Section Header */}
            <div className="text-center mb-16">
              <p className="text-primary text-sm font-semibold uppercase tracking-widest mb-3">
                LEARN MORE
              </p>
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-foreground">
                Understanding Ketamine Therapy
              </h2>
            </div>

            {/* Content Grid */}
            <div className="grid lg:grid-cols-2 gap-8 lg:gap-12">
              {/* What Is Ketamine Card */}
              <div className="bg-card rounded-3xl p-8 md:p-10 shadow-card">
                <h3 className="text-2xl font-bold text-foreground mb-6 flex items-center gap-3">
                  <span className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center text-primary font-semibold">1</span>
                  What Is Ketamine?
                </h3>
                <div className="space-y-4 text-muted-foreground leading-relaxed">
                  <p>
                    Ketamine is a well-researched medication that has been FDA-approved since 1970. For decades, it has been safely used as an anesthetic in hospitals, emergency rooms, ambulances, and surgical settings for both adults and children. It is also widely used in veterinary medicine and is listed by the World Health Organization (WHO) as an essential medication due to its effectiveness and strong safety profile when properly administered.
                  </p>
                  <p>
                    Over the past decade, leading institutions such as Yale University and the National Institutes of Health (NIH) have identified additional benefits of ketamine in the treatment of mood disorders, including depression. These findings have drawn significant attention in the mental health field and have expanded how clinicians think about treating treatment-resistant depression.
                  </p>
                </div>
              </div>

              {/* How Ketamine Therapy Works Card */}
              <div className="bg-card rounded-3xl p-8 md:p-10 shadow-card">
                <h3 className="text-2xl font-bold text-foreground mb-6 flex items-center gap-3">
                  <span className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center text-primary font-semibold">2</span>
                  How Ketamine Therapy Works
                </h3>
                <div className="space-y-4 text-muted-foreground leading-relaxed">
                  <p>
                    Ketamine therapy is being studied for its potential to help individuals with depression and other mental health conditions who have not found relief with traditional treatments. Unlike conventional antidepressants, which often take weeks to build up in the system, ketamine may work more quickly by targeting different pathways in the brain involved in mood regulation.
                  </p>
                  <p>
                    Treatment is provided in a clinical setting and may be administered through intravenous (IV) infusion or nasal spray. During each session, patients are closely monitored by trained medical professionals to ensure safety and comfort.
                  </p>
                  <p>
                    The goal of ketamine therapy is to help "reset" certain brain circuits involved in mood and emotional regulation, which may lead to faster symptom relief and improved overall well-being for some individuals.
                  </p>
                </div>
              </div>
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
          </div>
        </section>


        {/* SECTION — CONDITIONS WE TREAT */}
        <section className="py-20 md:py-28">
          <div className="mx-auto max-w-6xl px-6">
            <div className="text-center mb-16">
              <p className="text-sm font-medium uppercase tracking-widest text-primary mb-4">Conditions We Treat</p>
              <h2 className="text-3xl md:text-4xl font-semibold tracking-tight text-foreground">
                Ketamine Therapy
              </h2>
              <p className="mt-4 text-base md:text-lg text-muted-foreground max-w-3xl mx-auto">
                Discover how ketamine therapy can help with treatment-resistant conditions through its unique mechanism of action.
              </p>
            </div>
            
            <div className="space-y-16">
              {conditionsData.map((condition, index) => (
                <div 
                  key={condition.id}
                  id={condition.id}
                  className={`scroll-mt-32 grid md:grid-cols-2 gap-8 md:gap-12 items-start ${
                    index % 2 === 1 ? 'md:[&>*:first-child]:order-2' : ''
                  }`}
                >
                  {/* Image side */}
                  <div className="rounded-2xl overflow-hidden bg-muted aspect-[4/3]">
                    <img 
                      src={condition.image} 
                      alt={condition.title}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  
                  {/* Content side */}
                  <div className="space-y-6">
                    <h3 className="text-2xl md:text-3xl font-semibold text-foreground">
                      {condition.title}
                    </h3>
                    <p className="text-muted-foreground leading-relaxed">
                      {condition.intro}
                    </p>
                    
                    {/* Quote */}
                    <div className="relative bg-muted/50 rounded-xl p-5 border-l-4 border-primary/30">
                      <Quote className="absolute top-4 right-4 w-6 h-6 text-primary/20" />
                      <p className="text-foreground/80 italic text-sm leading-relaxed pr-8">
                        "{condition.quote}"
                      </p>
                    </div>
                    
                    {/* Accordion */}
                    <Accordion type="single" collapsible className="space-y-2">
                      {condition.accordionItems.map((item) => (
                        <AccordionItem 
                          key={item.id} 
                          value={item.id}
                          className="bg-background rounded-xl border border-border/30 px-5"
                        >
                          <AccordionTrigger className="text-foreground hover:no-underline py-4 text-sm font-medium text-left">
                            {item.title}
                          </AccordionTrigger>
                          <AccordionContent className="text-muted-foreground pb-4 text-sm leading-relaxed">
                            {item.content}
                          </AccordionContent>
                        </AccordionItem>
                      ))}
                    </Accordion>
                    
                    {/* Schedule Consultation Button */}
                    <Link to="/contact">
                      <Button className="mt-4 bg-primary hover:bg-accent text-primary-foreground font-semibold px-6 py-3 rounded-full">
                        Schedule Consultation
                      </Button>
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* SECTION — CTA + ELIGIBILITY FORM */}
        <section id="eligibility" className="py-24 md:py-32 bg-[hsl(0,0%,92%)] scroll-mt-20">
          <div className="mx-auto max-w-6xl px-6">
            <div className="grid md:grid-cols-2 gap-16 items-start">
              {/* Left: CTA copy + trust bullets */}
              <div className="space-y-8">
                <div className="space-y-4">
                  <p className="text-sm font-medium uppercase tracking-widest text-primary">Start Your Journey</p>
                  <h2 className="text-3xl md:text-5xl font-semibold tracking-tight text-foreground leading-tight">
                    Take the Next Step Toward Relief
                  </h2>
                </div>
                <p className="text-muted-foreground text-lg leading-relaxed">
                  If traditional treatments haven't worked, our care team can help you understand whether ketamine therapy may be appropriate for you.
                </p>
                
                <ul className="space-y-5 pt-4">
                  <li className="flex items-start gap-4">
                    <div className="w-6 h-6 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0 mt-0.5">
                      <Check className="w-3.5 h-3.5 text-primary" />
                    </div>
                    <span className="text-foreground">No obligation assessment</span>
                  </li>
                  <li className="flex items-start gap-4">
                    <div className="w-6 h-6 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0 mt-0.5">
                      <Check className="w-3.5 h-3.5 text-primary" />
                    </div>
                    <span className="text-foreground">Response within 48 hours</span>
                  </li>
                  <li className="flex items-start gap-4">
                    <div className="w-6 h-6 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0 mt-0.5">
                      <Check className="w-3.5 h-3.5 text-primary" />
                    </div>
                    <span className="text-foreground">Confidential submission</span>
                  </li>
                  <li className="flex items-start gap-4">
                    <div className="w-6 h-6 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0 mt-0.5">
                      <Check className="w-3.5 h-3.5 text-primary" />
                    </div>
                    <span className="text-foreground">Insurance verification available</span>
                  </li>
                </ul>
                
                <div className="pt-6 border-t border-border/30">
                  <p className="text-muted-foreground text-sm">
                    Prefer to speak with someone? Call us directly at{" "}
                    <a href="tel:201-781-2101" className="font-medium text-foreground hover:text-primary transition-colors">201-781-2101</a>
                  </p>
                </div>
              </div>
              
              {/* Right: Form */}
              <div className="rounded-3xl bg-background shadow-xl p-8 md:p-10">
                <EligibilityForm variant="default" />
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
                  <Button variant="outline" asChild>
                    <Link to="/verify-coverage">Check Eligibility</Link>
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

        {/* SECTION 8 — BLOG PREVIEW (hidden for now)
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
              <div className="rounded-3xl overflow-hidden bg-muted/40">
                <div className="aspect-[16/10] bg-muted" />
                <div className="p-7 space-y-3">
                  <h3 className="text-xl font-semibold text-foreground">Understanding Ketamine Therapy: What to Expect</h3>
                  <p className="text-muted-foreground">A comprehensive guide to your first ketamine treatment session, from preparation to aftercare. (placeholder)</p>
                  <Button variant="outline" size="sm">Read More</Button>
                </div>
              </div>
              
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
        */}
      </main>
      <Footer />
    </div>
  );
};

export default Ketamine;
