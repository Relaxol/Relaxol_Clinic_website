import { ImageLeftSectionData, ImageRightSectionData } from "@/lib/sections/registry";

interface Props {
  data: ImageLeftSectionData | ImageRightSectionData;
}

export function DynamicImageSection({ data }: Props) {
  const isImageLeft = data.type === 'imageLeft';
  
  return (
    <section 
      className="py-20 bg-background"
      data-section-id={data.sectionId}
      data-section-type={data.type}
    >
      <div className="container mx-auto px-4">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Image */}
          <div className={`relative ${isImageLeft ? 'order-1' : 'order-2 lg:order-2'}`}>
            <div className="image-card aspect-[4/3] bg-muted flex items-center justify-center">
              {data.image.url ? (
                <img
                  src={data.image.url}
                  alt={data.image.alt || ''}
                  className="w-full h-full object-contain md:object-cover rounded-2xl"
                />
              ) : (
                <div className="w-full h-full bg-muted rounded-2xl flex items-center justify-center">
                  <span className="text-muted-foreground">No image</span>
                </div>
              )}
            </div>
          </div>

          {/* Content */}
          <div className={`${isImageLeft ? 'order-2' : 'order-1 lg:order-1'}`}>
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
      </div>
    </section>
  );
}
