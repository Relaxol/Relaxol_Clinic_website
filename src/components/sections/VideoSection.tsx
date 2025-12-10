import { Play } from "lucide-react";

export function VideoSection() {
  return (
    <section className="py-20 bg-cream-dark">
      <div className="container mx-auto px-4">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Video Placeholder */}
          <div className="relative image-card aspect-video bg-foreground/10 flex items-center justify-center cursor-pointer group">
            <div className="absolute inset-0 bg-foreground/20 group-hover:bg-foreground/30 transition-colors" />
            <div className="relative w-20 h-20 rounded-full bg-primary flex items-center justify-center text-primary-foreground shadow-glow group-hover:scale-110 transition-transform">
              <Play className="w-8 h-8 ml-1" />
            </div>
            <span className="absolute bottom-6 left-6 text-background font-medium">
              Patient Testimonial Video
            </span>
          </div>

          {/* Content */}
          <div>
            <h2 className="font-serif text-3xl md:text-4xl lg:text-5xl text-foreground font-bold mb-6">
              Treatment <span className="text-primary">Can Help</span>
            </h2>
            <p className="text-muted-foreground text-lg leading-relaxed mb-6">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
            </p>
            <p className="text-muted-foreground text-lg leading-relaxed mb-8">
              Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident.
            </p>
            <a
              href="#treatments"
              className="btn-outline"
            >
              Learn more about treatment
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
