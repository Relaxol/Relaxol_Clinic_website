import { TextSectionData } from "@/lib/sections/registry";

interface Props {
  data: TextSectionData;
}

export function DynamicText({ data }: Props) {
  return (
    <section 
      className="py-20 bg-background"
      data-section-id={data.sectionId}
      data-section-type={data.type}
    >
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          {data.title && (
            <h2 className="text-3xl md:text-4xl text-foreground font-bold mb-6">
              {data.title}
            </h2>
          )}
          <div 
            className="text-muted-foreground text-lg leading-relaxed prose prose-lg max-w-none"
            dangerouslySetInnerHTML={{ __html: data.body }}
          />
        </div>
      </div>
    </section>
  );
}
