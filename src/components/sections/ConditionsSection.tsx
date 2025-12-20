import { Link } from "react-router-dom";
import conditionDepression from "@/assets/condition-depression.jpg";
import conditionAnxiety from "@/assets/condition-anxiety.jpg";
import conditionPtsd from "@/assets/condition-ptsd.jpg";
import conditionOcd from "@/assets/condition-ocd.jpg";

const defaultConditions = [
  {
    title: "Depression",
    image: conditionDepression,
    imageAlt: "Person finding relief, sitting peacefully by a sunlit window",
    description: "When traditional antidepressants fall short, ketamine and SPRAVATO® offer rapid relief—often within hours, not weeks.",
    href: "/conditions/depression",
  },
  {
    title: "Anxiety",
    image: conditionAnxiety,
    imageAlt: "Woman practicing calm breathing meditation in a serene setting",
    description: "For persistent anxiety that hasn't responded to conventional therapies, our treatments target the glutamate system for faster relief.",
    href: "/conditions/anxiety",
  },
  {
    title: "PTSD",
    image: conditionPtsd,
    imageAlt: "Male veteran finding peace during therapy session in a calming environment",
    description: "Ketamine therapy helps process traumatic memories and reduce PTSD symptoms in a safe, supportive environment.",
    href: "/conditions/ptsd",
  },
  {
    title: "OCD",
    image: conditionOcd,
    imageAlt: "Person in quiet focused contemplation with mental clarity",
    description: "For medication-resistant OCD, ketamine-based therapies may help interrupt intrusive thoughts and compulsive behaviors.",
    href: "/conditions/ocd",
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
  const subtitle = content?.subtitle || "CONDITIONS WE TREAT";
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
    <section id="conditions" className="py-24 md:py-32 bg-white">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-16 max-w-3xl mx-auto">
          <p className="text-primary text-sm font-semibold uppercase tracking-widest mb-3">
            {subtitle}
          </p>
          <h2 className="text-3xl md:text-4xl lg:text-5xl text-foreground font-bold mb-5">
            {title}
          </h2>
          <p className="text-muted-foreground text-lg">
            {description}
          </p>
        </div>

        {/* Conditions Grid - 4 columns on desktop */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
          {conditions.map((condition, index) => (
            <div
              key={index}
              className="group bg-card rounded-2xl shadow-md hover:shadow-xl transition-all duration-300 hover:-translate-y-1 overflow-hidden focus-within:ring-2 focus-within:ring-primary focus-within:ring-offset-2"
            >
              {/* Image */}
              <div className="aspect-video overflow-hidden">
                <img
                  src={condition.image}
                  alt={condition.imageAlt}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
              </div>
              
              {/* Card Body */}
              <div className="p-6 md:p-8">
                <h3 className="text-xl md:text-2xl font-semibold text-foreground mb-3">
                  {condition.title}
                </h3>
                <p className="text-muted-foreground leading-relaxed mb-5">
                  {condition.description}
                </p>
                <Link
                  to={condition.href}
                  className="text-primary font-semibold hover:text-accent transition-colors inline-flex items-center gap-2 text-base group/link"
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
