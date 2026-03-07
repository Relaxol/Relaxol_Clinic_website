import { Stethoscope, FileCheck, CreditCard, Lock } from "lucide-react";
import { Separator } from "@/components/ui/separator";

const defaultReasons = [
  {
    icon: Stethoscope,
    title: "Clinician-Led Care",
    description: "Every treatment is administered and monitored by board-certified psychiatric professionals. You're never just a number—you're a patient under the direct care of experienced clinicians.",
  },
  {
    icon: FileCheck,
    title: "Evidence-Based Protocols",
    description: "We follow the latest research and FDA guidelines to ensure our treatments are safe, effective, and grounded in science. Our protocols are continuously updated as new evidence emerges.",
  },
  {
    icon: CreditCard,
    title: "Insurance & Billing Support",
    description: "Navigating insurance for mental health treatment can be confusing. Our team helps verify your benefits and submit claims so you can focus on getting better.",
  },
  {
    icon: Lock,
    title: "Private Treatment Rooms",
    description: "Your comfort and privacy matter. Our clinic features individual treatment rooms designed to create a calming, confidential environment for every session.",
  },
];

interface WhyChooseContent {
  title?: string;
  description?: string;
  items?: { title: string; description: string }[];
}

interface WhyChooseSectionProps {
  content?: WhyChooseContent;
}

export function WhyChooseSection({ content }: WhyChooseSectionProps) {
  const title = content?.title || "Why Choose Relaxol Clinic";
  const description = content?.description || "Compassionate care backed by expertise and evidence.";
  const cmsItems = content?.items;
  
  // Map icons by index for CMS items (icons stay hardcoded as they're visual design elements)
  const icons = [Stethoscope, FileCheck, CreditCard, Lock];

  const reasons = cmsItems?.length
    ? cmsItems.map((item, i) => ({
        icon: icons[i % icons.length],
        title: item.title,
        description: item.description,
      }))
    : defaultReasons;

  return (
    <section className="pt-8 pb-20 sm:py-20 bg-cream-band">
      {/* Mobile divider */}
      <div className="sm:hidden max-w-7xl mx-auto px-6 mb-8">
        <Separator className="bg-border/50" />
      </div>
      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 xl:px-16">
        {/* Header */}
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl lg:text-5xl text-foreground font-bold mb-4">
            {title}
          </h2>
          <p className="text-muted-foreground font-light tracking-wide text-[15px] leading-[1.65] sm:font-normal sm:tracking-normal sm:text-lg sm:leading-relaxed max-w-2xl mx-auto">
            {description}
          </p>
        </div>

        {/* Reasons Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {reasons.map((reason, index) => (
            <div
              key={index}
              className="bg-white rounded-3xl p-8 shadow-soft hover:shadow-card transition-shadow"
            >
              <div className="icon-container mb-6">
                <reason.icon className="w-7 h-7" />
              </div>
              <h3 className="text-lg font-bold text-foreground mb-3">
                {reason.title}
              </h3>
              <p className="text-muted-foreground font-light tracking-wide text-[13px] leading-[1.55] sm:font-normal sm:tracking-normal sm:text-sm sm:leading-relaxed">
                {reason.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
