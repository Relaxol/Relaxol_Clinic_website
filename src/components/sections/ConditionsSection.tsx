import { Link } from "react-router-dom";
import conditionDepression from "@/assets/condition-depression-new.jpg";
import conditionAnxiety from "@/assets/condition-anxiety-new.jpg";
import conditionPtsd from "@/assets/condition-ptsd-new.jpg";
import conditionOcd from "@/assets/condition-ocd-new.jpg";
import conditionPain from "@/assets/condition-pain-v4.jpg";

const defaultConditions = [
  {
    title: "Depression",
    image: conditionDepression,
    imageAlt: "Woman with hands covering face experiencing depression",
    description: "When traditional antidepressants fall short, ketamine and SPRAVATO® offer rapid relief—often within hours, not weeks.",
    href: "/conditions/depression",
  },
  {
    title: "Anxiety",
    image: conditionAnxiety,
    imageAlt: "Woman with hands on head experiencing anxiety",
    description: "For persistent anxiety that hasn't responded to conventional therapies, our treatments target the glutamate system for faster relief.",
    href: "/conditions/anxiety",
  },
  {
    title: "PTSD",
    image: conditionPtsd,
    imageAlt: "Man in military clothing experiencing PTSD symptoms",
    description: "Ketamine therapy helps process traumatic memories and reduce PTSD symptoms in a safe, supportive environment.",
    href: "/conditions/ptsd",
  },
  {
    title: "OCD",
    image: conditionOcd,
    imageAlt: "Woman arranging items in precise order representing OCD",
    description: "For medication-resistant OCD, ketamine-based therapies may help interrupt intrusive thoughts and compulsive behaviors.",
    href: "/conditions/ocd",
  },
  {
    title: "Chronic Pain",
    image: conditionPain,
    imageAlt: "Man experiencing chronic pain holding his back",
    description: "Ketamine infusions offer relief for chronic pain conditions including CRPS, fibromyalgia, and neuropathic pain.",
    href: "/conditions/pain-management",
  },
];

interface ConditionItem {
  title: string;
  description: string;
  imageUrl?: string;
  imageAlt?: string;
  href?: string;
}

interface ConditionsContent {
  subtitle?: string;
  title?: string;
  description?: string;
  items?: ConditionItem[];
}

interface ConditionsSectionProps {
  content?: ConditionsContent;
}

export function ConditionsSection({ content }: ConditionsSectionProps) {
  const subtitle = content?.subtitle || "";
  const title = content?.title || "Specialized Mental Health Care";
  const description = content?.description || "Our treatments are designed for patients who haven't found relief through traditional approaches.";
  
  // Map CMS items to display format, or use defaults
  const conditions = content?.items?.length ? content.items.map((item, index) => ({
    title: item.title,
    image: item.imageUrl || defaultConditions[index]?.image || conditionDepression,
    imageAlt: item.imageAlt || defaultConditions[index]?.imageAlt || item.title,
    description: item.description,
    href: item.href || defaultConditions[index]?.href || "#",
  })) : defaultConditions;

  return (
    <section id="conditions" className="pt-6 pb-12 md:py-24 lg:py-32 bg-white">
      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 xl:px-16">
        {/* Header */}
        <div className="text-center mb-10 md:mb-16 max-w-3xl mx-auto">
          <p className="text-primary text-sm font-semibold uppercase tracking-widest mb-3">
            {subtitle}
          </p>
          <h2 className="text-3xl md:text-4xl lg:text-5xl text-foreground font-bold mb-5">
            {title}
          </h2>
          <p className="text-muted-foreground font-light tracking-wide text-[15px] leading-[1.65] sm:font-normal sm:tracking-normal sm:text-lg sm:leading-relaxed">
            {description}
          </p>
        </div>

        {/* Conditions Grid - 5 columns on desktop */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4 lg:gap-6 max-w-7xl mx-auto">
          {conditions.map((condition, index) => (
            <div
              key={index}
              className="group bg-card rounded-xl shadow-md hover:shadow-xl transition-all duration-300 hover:-translate-y-1 overflow-hidden focus-within:ring-2 focus-within:ring-primary focus-within:ring-offset-2 flex flex-col h-full"
            >
              {/* Image */}
              <div className="aspect-[3/4] sm:aspect-[3/4] overflow-hidden">
                <img
                  src={condition.image}
                  alt={condition.imageAlt}
                  className="w-full h-full object-cover object-top group-hover:scale-105 transition-transform duration-500"
                />
              </div>
              
              {/* Card Body */}
              <div className="p-4 lg:p-5 flex flex-col flex-grow">
                <h3 className="text-lg lg:text-xl font-semibold text-foreground mb-2">
                  {condition.title}
                </h3>
                <p className="text-muted-foreground font-light tracking-wide text-[12px] leading-[1.55] sm:font-normal sm:tracking-normal sm:text-sm sm:leading-relaxed mb-4 flex-grow">
                  {condition.description}
                </p>
                <Link
                  to={condition.href}
                  className="text-primary font-semibold hover:text-accent transition-colors inline-flex items-center gap-1.5 text-sm group/link mt-auto"
                >
                  Learn more 
                  <span className="group-hover/link:translate-x-1 transition-transform">→</span>
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
