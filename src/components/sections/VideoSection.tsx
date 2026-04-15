interface VideoContent {
  subtitle?: string;
  title?: string;
  body?: string;
  embedUrl?: string;
  embedTitle?: string;
  secondParagraph?: string;
}

interface VideoSectionProps {
  content?: VideoContent;
}

export function VideoSection({ content }: VideoSectionProps) {
  const subtitle = content?.subtitle || "HOW IT WORKS";
  const title = content?.title || "A New Approach to Treatment";
  const body =
    content?.body ||
    "Ketamine - originally used in anesthesia for surgical procedures - has been shown in recent research to rapidly affect brain chemistry linked to depression. Unlike traditional antidepressants, it targets glutamate receptors, helping the brain form new neural connections that support improved mood and cognitive function. SPRAVATO® works in a similar pathway and is FDA-approved specifically for treatment-resistant depression.";
  const embedUrl =
    content?.embedUrl || "https://www.youtube.com/embed/qMjc_RMfQXw";
  const embedTitle = content?.embedTitle || "Understanding Ketamine Therapy";
  const secondParagraph =
    content?.secondParagraph ||
    "These treatments are administered under medical supervision and are designed to provide relief for patients who have not responded to standard therapies.";

  return (
    <section className="py-20 bg-cream-dark">
      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 xl:px-16">
        {/* Header - shown on mobile only */}
        <div className="lg:hidden mb-6">
          <p className="text-primary text-sm font-semibold uppercase tracking-widest mb-3">
            {subtitle}
          </p>
          <h2 className="text-3xl md:text-4xl text-foreground font-bold">
            {title.includes("Can Help") ? (
              <>
                Treatment <span className="text-primary">Can Help</span>
              </>
            ) : (
              title
            )}
          </h2>
        </div>

        {/* YouTube Video - shown on mobile only, right after header */}
        <div className="lg:hidden mb-8">
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

        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Content */}
          <div>
            {/* Header - shown on desktop only */}
            <div className="hidden lg:block">
              <p className="text-primary text-sm font-semibold uppercase tracking-widest mb-3">
                {subtitle}
              </p>
              <h2 className="text-3xl md:text-4xl lg:text-5xl text-foreground font-bold mb-6">
                {title.includes("Can Help") ? (
                  <>
                    Treatment <span className="text-primary">Can Help</span>
                  </>
                ) : (
                  title
                )}
              </h2>
            </div>
            <p className="text-muted-foreground font-light tracking-wide text-[15px] leading-[1.65] sm:font-normal sm:tracking-normal sm:text-lg sm:leading-relaxed mb-6">
              {body}
            </p>
            <p className="text-muted-foreground font-light tracking-wide text-[15px] leading-[1.65] sm:font-normal sm:tracking-normal sm:text-lg sm:leading-relaxed mb-8">
              {secondParagraph}
            </p>
            <a
              href="#treatments"
              className="inline-flex items-center justify-center px-8 py-4 rounded-full bg-accent text-accent-foreground font-semibold hover:bg-accent/90 transition-all duration-300 shadow-glow"
            >
              Explore Treatment Options
            </a>
          </div>

          {/* YouTube Video - shown on desktop only */}
          <div className="hidden lg:block image-card aspect-video overflow-hidden">
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
