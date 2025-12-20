interface VideoContent {
  subtitle?: string;
  title?: string;
  body?: string;
  embedUrl?: string;
  embedTitle?: string;
}

interface VideoSectionProps {
  content?: VideoContent;
}

export function VideoSection({ content }: VideoSectionProps) {
  const subtitle = content?.subtitle || "LEARN MORE";
  const title = content?.title || "Treatment Can Help";
  const body = content?.body || "For many patients who've struggled with depression, anxiety, PTSD, or OCD, traditional treatments simply haven't worked. Ketamine and SPRAVATO® offer a different approach—targeting glutamate receptors in the brain to create new neural pathways and provide rapid relief.";
  const embedUrl = content?.embedUrl || "https://www.youtube.com/embed/e0mdOODbGNU";
  const embedTitle = content?.embedTitle || "Understanding Ketamine Therapy";

  return (
    <section className="py-20 bg-cream-dark">
      <div className="container mx-auto px-4">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Content */}
          <div>
            <p className="text-primary text-sm font-semibold uppercase tracking-widest mb-3">
              {subtitle}
            </p>
            <h2 className="text-3xl md:text-4xl lg:text-5xl text-foreground font-bold mb-6">
              {title.includes("Can Help") ? (
                <>Treatment <span className="text-primary">Can Help</span></>
              ) : title}
            </h2>
            <p className="text-muted-foreground text-lg leading-relaxed mb-6">
              {body}
            </p>
            <p className="text-muted-foreground text-lg leading-relaxed mb-8">
              Watch our video to learn more about how these breakthrough treatments work and whether they might be right for you.
            </p>
            <a
              href="#treatments"
              className="btn-outline"
            >
              Explore Treatment Options
            </a>
          </div>

          {/* YouTube Video */}
          <div className="image-card aspect-video overflow-hidden">
            <iframe
              src={embedUrl}
              className="w-full h-full"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
              title={embedTitle}
            />
          </div>
        </div>
      </div>
    </section>
  );
}
