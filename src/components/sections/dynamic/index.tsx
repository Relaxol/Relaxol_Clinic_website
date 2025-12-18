// Dynamic Section Renderer - Maps section types to components
import { AnySectionData } from "@/lib/sections/registry";
import { DynamicHero } from "./DynamicHero";
import { DynamicText } from "./DynamicText";
import { DynamicImageSection } from "./DynamicImageSection";
import { DynamicFAQ } from "./DynamicFAQ";
import { DynamicCTA } from "./DynamicCTA";
import { DynamicStats } from "./DynamicStats";
import { DynamicContact } from "./DynamicContact";
import { DynamicVideo } from "./DynamicVideo";

interface SectionRendererProps {
  section: AnySectionData;
}

export function SectionRenderer({ section }: SectionRendererProps) {
  switch (section.type) {
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
    // For complex sections that need special rendering, return null for now
    // They will be handled by legacy components or custom implementations
    case 'treatments':
    case 'testimonials':
    case 'doctor':
    case 'conditions':
      return (
        <section 
          className="py-20 bg-muted/30"
          data-section-id={section.sectionId}
          data-section-type={section.type}
        >
          <div className="container mx-auto px-4 text-center">
            <p className="text-muted-foreground">
              Section type "{section.type}" requires migration to dynamic rendering.
            </p>
          </div>
        </section>
      );
    default: {
      const unknownSection = section as { type?: string; sectionId?: string };
      console.warn(`Unknown section type: ${unknownSection.type}`);
      return null;
    }
  }
}

export { DynamicHero, DynamicText, DynamicImageSection, DynamicFAQ, DynamicCTA, DynamicStats, DynamicContact, DynamicVideo };
