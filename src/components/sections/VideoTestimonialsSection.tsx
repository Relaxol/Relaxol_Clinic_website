import { Play } from "lucide-react";

const videos = [
  {
    title: "Patient Story: Treatment Success",
    duration: "5:03",
  },
  {
    title: "Recovery Journey",
    duration: "3:21",
  },
];

export function VideoTestimonialsSection() {
  return (
    <section className="py-20 bg-cream-band">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-12">
          <h2 className="font-serif text-3xl md:text-4xl lg:text-5xl text-foreground font-bold mb-4">
            Video Testimonials
          </h2>
        </div>

        {/* Video Grid */}
        <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          {videos.map((video, index) => (
            <div
              key={index}
              className="relative image-card aspect-video bg-foreground/20 flex items-center justify-center cursor-pointer group"
            >
              <div className="absolute inset-0 bg-foreground/30 group-hover:bg-foreground/40 transition-colors" />
              <div className="relative w-16 h-16 rounded-full bg-primary flex items-center justify-center text-primary-foreground shadow-glow group-hover:scale-110 transition-transform">
                <Play className="w-6 h-6 ml-1" />
              </div>
              <div className="absolute bottom-4 left-4 right-4">
                <p className="text-background font-medium mb-1">{video.title}</p>
                <p className="text-background/70 text-sm">{video.duration}</p>
              </div>
            </div>
          ))}
        </div>

        {/* CTA */}
        <div className="text-center mt-10">
          <a
            href="#"
            className="btn-outline"
          >
            View More
          </a>
        </div>
      </div>
    </section>
  );
}
