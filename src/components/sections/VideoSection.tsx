export function VideoSection() {
  return (
    <section className="py-20 bg-cream-dark">
      <div className="container mx-auto px-4">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Content */}
          <div>
            <p className="text-primary text-sm font-semibold uppercase tracking-widest mb-3">
              LEARN MORE
            </p>
            <h2 className="text-3xl md:text-4xl lg:text-5xl text-foreground font-bold mb-6">
              Treatment <span className="text-primary">Can Help</span>
            </h2>
            <p className="text-muted-foreground text-lg leading-relaxed mb-6">
              For many patients who've struggled with depression, anxiety, PTSD, or OCD, traditional treatments simply haven't worked. Ketamine and SPRAVATO® offer a different approach—targeting glutamate receptors in the brain to create new neural pathways and provide rapid relief.
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
              src="https://www.youtube.com/embed/e0mdOODbGNU"
              className="w-full h-full"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
              title="Understanding Ketamine Therapy"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
