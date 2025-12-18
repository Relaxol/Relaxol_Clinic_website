import { StatsSectionData } from "@/lib/sections/registry";

interface Props {
  data: StatsSectionData;
}

export function DynamicStats({ data }: Props) {
  return (
    <section 
      className="py-16 bg-cream-band"
      data-section-id={data.sectionId}
      data-section-type={data.type}
    >
      <div className="container mx-auto px-4">
        {data.title && (
          <h2 className="text-3xl md:text-4xl text-foreground font-bold text-center mb-12">
            {data.title}
          </h2>
        )}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {data.stats_items.map((stat, index) => (
            <div key={index} className="text-center">
              <div className="text-4xl md:text-5xl font-bold text-primary mb-2">
                {stat.value}
              </div>
              <div className="text-muted-foreground font-medium">
                {stat.label}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
