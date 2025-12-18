// Dynamic Section Renderer - Maps section types to components
import { DynamicHero } from "./DynamicHero";
import { DynamicText } from "./DynamicText";
import { DynamicImageSection } from "./DynamicImageSection";
import { DynamicFAQ } from "./DynamicFAQ";
import { DynamicCTA } from "./DynamicCTA";
import { DynamicStats } from "./DynamicStats";
import { DynamicContact } from "./DynamicContact";
import { DynamicVideo } from "./DynamicVideo";
import { DynamicTreatments } from "./DynamicTreatments";
import { DynamicDoctor } from "./DynamicDoctor";
import { DynamicConditions } from "./DynamicConditions";
import { DynamicTestimonials } from "./DynamicTestimonials";
import { DynamicTimeline } from "./DynamicTimeline";

interface SectionRendererProps {
  section: Record<string, unknown>;
}

export function SectionRenderer({ section }: SectionRendererProps) {
  const type = section.type as string;
  
  switch (type) {
    case 'hero':
      return <DynamicHero data={section as any} />;
    case 'text':
      return <DynamicText data={section as any} />;
    case 'imageLeft':
    case 'imageRight':
      return <DynamicImageSection data={section as any} />;
    case 'faq':
      return <DynamicFAQ data={section as any} />;
    case 'cta':
      return <DynamicCTA data={section as any} />;
    case 'stats':
      return <DynamicStats data={section as any} />;
    case 'contact':
      return <DynamicContact data={section as any} />;
    case 'video':
      return <DynamicVideo data={section as any} />;
    case 'treatments':
      return <DynamicTreatments data={section as any} />;
    case 'doctor':
      return <DynamicDoctor data={section as any} />;
    case 'conditions':
      return <DynamicConditions data={section as any} />;
    case 'testimonials':
      return <DynamicTestimonials data={section as any} />;
    case 'timeline':
      return <DynamicTimeline data={section as any} />;
    default:
      console.warn(`Unknown section type: ${type}`);
      return (
        <section className="py-10 bg-muted/30">
          <div className="container mx-auto px-4 text-center">
            <p className="text-muted-foreground">Unknown section type: {type}</p>
          </div>
        </section>
      );
  }
}

export { 
  DynamicHero, 
  DynamicText, 
  DynamicImageSection, 
  DynamicFAQ, 
  DynamicCTA, 
  DynamicStats, 
  DynamicContact, 
  DynamicVideo,
  DynamicTreatments,
  DynamicDoctor,
  DynamicConditions,
  DynamicTestimonials,
  DynamicTimeline,
};
