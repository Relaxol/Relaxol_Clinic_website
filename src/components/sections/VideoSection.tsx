import { Play } from "lucide-react";

export function VideoSection() {
  return (
    <section className="py-20 bg-cream-dark">
      <div className="container mx-auto px-4">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Video Placeholder */}
          <div className="relative image-card aspect-video bg-foreground/10 flex items-center justify-center cursor-pointer group overflow-hidden">
            <div className="absolute inset-0 bg-foreground/30 group-hover:bg-foreground/40 transition-colors" />
            <div className="relative w-20 h-20 rounded-full bg-primary flex items-center justify-center text-primary-foreground shadow-glow group-hover:scale-110 transition-transform">
              <Play className="w-8 h-8 ml-1" />
            </div>
            <span className="absolute bottom-6 left-6 text-background font-medium">
              Watch: Understanding Ketamine Therapy
            </span>
          </div>

          {/* Content */}
          <div>
            <p className="text-primary text-sm font-semibold uppercase tracking-widest mb-3">
              LEARN MORE
            </p>
            <h2 className="font-serif text-3xl md:text-4xl lg:text-5xl text-foreground font-bold mb-6">
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
        </div>
      </div>
    </section>
  );
}
