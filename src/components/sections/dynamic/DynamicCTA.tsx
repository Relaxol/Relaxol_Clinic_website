import { CTASectionData } from "@/lib/sections/registry";

interface Props {
  data: CTASectionData;
}

export function DynamicCTA({ data }: Props) {
  return (
    <section 
      className="py-20 bg-primary/5"
      data-section-id={data.sectionId}
      data-section-type={data.type}
    >
      <div className="container mx-auto px-4 text-center">
        {data.title && (
          <h2 className="text-3xl md:text-4xl text-foreground font-bold mb-4">
            {data.title}
          </h2>
        )}
        {data.body && (
          <p className="text-muted-foreground text-lg mb-8 max-w-2xl mx-auto">
            {data.body}
          </p>
        )}
        <a
          href={data.cta.href}
          className="inline-flex items-center justify-center px-8 py-4 rounded-md bg-primary text-primary-foreground font-semibold text-lg hover:bg-primary/90 transition-all duration-300 shadow-lg"
        >
          {data.cta.label}
        </a>
      </div>
    </section>
  );
}
