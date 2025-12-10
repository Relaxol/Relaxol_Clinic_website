import { CheckCircle } from "lucide-react";
import treatmentRoom from "@/assets/treatment-room.jpg";
const features = ["Same-day consultation", "Convenient location", "Accelerated treatment"];
export function AboutSection() {
  return <section id="about" className="py-20 bg-background">
      <div className="container mx-auto px-4">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Content */}
          <div>
            <p className="text-primary text-sm font-semibold uppercase tracking-widest mb-3">
              WHY OUR CLINIC
            </p>
            <h2 className="font-serif text-3xl md:text-4xl lg:text-5xl text-foreground font-bold mb-6">
              Rethinking <span className="text-[#1d7324]">Mental Health</span>
            </h2>
            <p className="text-muted-foreground text-lg leading-relaxed mb-4">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris.
            </p>
            <p className="text-muted-foreground text-lg leading-relaxed mb-6">
              Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum. Lorem ipsum dolor sit amet, consectetur adipiscing elit.
            </p>

            {/* Feature List */}
            <ul className="space-y-3 mb-8">
              {features.map(feature => <li key={feature} className="flex items-center gap-3 text-foreground">
                  <CheckCircle className="w-5 h-5 text-primary flex-shrink-0" />
                  <span>{feature}</span>
                </li>)}
            </ul>

            <a href="#" className="text-primary font-semibold hover:text-accent transition-colors inline-flex items-center gap-2">
              Read More →
            </a>
          </div>

          {/* Image */}
          <div className="relative">
            <div className="image-card aspect-[4/3]">
              <img src={treatmentRoom} alt="Treatment facility interior" className="w-full h-full object-cover" />
            </div>
          </div>
        </div>
      </div>
    </section>;
}