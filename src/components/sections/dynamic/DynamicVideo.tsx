import { VideoSectionData } from "@/lib/sections/registry";

interface Props {
  data: VideoSectionData;
}

export function DynamicVideo({ data }: Props) {
  // Extract video ID for YouTube
  const getYouTubeEmbedUrl = (url: string) => {
    const match = url.match(/(?:youtube\.com\/(?:embed\/|watch\?v=)|youtu\.be\/)([a-zA-Z0-9_-]{11})/);
    if (match) {
      return `https://www.youtube.com/embed/${match[1]}`;
    }
    return url;
  };

  // Extract Vimeo ID
  const getVimeoEmbedUrl = (url: string) => {
    const match = url.match(/vimeo\.com\/(\d+)/);
    if (match) {
      return `https://player.vimeo.com/video/${match[1]}`;
    }
    return url;
  };

  const getEmbedUrl = (url: string) => {
    if (url.includes('youtube') || url.includes('youtu.be')) {
      return getYouTubeEmbedUrl(url);
    }
    if (url.includes('vimeo')) {
      return getVimeoEmbedUrl(url);
    }
    return url;
  };

  return (
    <section 
      className="py-20 bg-background"
      data-section-id={data.sectionId}
      data-section-type={data.type}
    >
      <div className="container mx-auto px-4">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Content */}
          <div>
            {data.subtitle && (
              <p className="text-primary text-sm font-semibold uppercase tracking-widest mb-3">
                {data.subtitle}
              </p>
            )}
            <h2 className="text-3xl md:text-4xl text-foreground font-bold mb-6">
              {data.title}
            </h2>
            {data.body && (
              <p className="text-muted-foreground text-lg leading-relaxed">
                {data.body}
              </p>
            )}
          </div>

          {/* Video */}
          <div className="relative aspect-video rounded-2xl overflow-hidden shadow-xl">
            {data.videoUrl ? (
              <iframe
                src={getEmbedUrl(data.videoUrl)}
                title={data.videoTitle || data.title}
                className="absolute inset-0 w-full h-full"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              />
            ) : (
              <div className="absolute inset-0 bg-muted flex items-center justify-center">
                <span className="text-muted-foreground">No video URL provided</span>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
