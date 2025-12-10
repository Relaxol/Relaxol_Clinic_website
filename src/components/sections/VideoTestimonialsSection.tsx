import { Play } from "lucide-react";

const videos = [
  {
    title: "Recovery Story: Finding Hope Again",
    duration: "4:32",
  },
  {
    title: "Patient Journey: From Skeptic to Believer",
    duration: "3:45",
  },
];

export function VideoTestimonialsSection() {
  return (
    <section className="py-20 bg-cream-band">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-12">
          <p className="text-primary text-sm font-semibold uppercase tracking-widest mb-3">
            REAL STORIES
          </p>
          <h2 className="font-serif text-3xl md:text-4xl lg:text-5xl text-foreground font-bold mb-4">
            Video Testimonials
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Hear directly from patients who've experienced the transformative power of our treatments.
          </p>
        </div>

        {/* Video Grid */}
        <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          {videos.map((video, index) => (
            <div
              key={index}
              className="relative image-card aspect-video bg-foreground/20 flex items-center justify-center cursor-pointer group overflow-hidden"
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
      </div>
    </section>
  );
}
