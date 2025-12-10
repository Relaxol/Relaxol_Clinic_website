import treatmentRoom from "@/assets/treatment-room.jpg";

export function EnvironmentSection() {
  return (
    <section className="py-20 bg-cream-dark">
      <div className="container mx-auto px-4">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Content */}
          <div>
            <span className="section-label mb-4 inline-block">
              YOUR COMFORT MATTERS
            </span>
            <h2 className="font-serif text-3xl md:text-4xl lg:text-5xl text-foreground font-bold mb-6">
              Calm Treatment Environment
            </h2>
            <p className="text-muted-foreground text-lg leading-relaxed mb-4">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
            </p>
            <p className="text-muted-foreground text-lg leading-relaxed">
              Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
            </p>
          </div>

          {/* Image */}
          <div className="relative">
            <div className="image-card aspect-[4/3]">
              <img
                src={treatmentRoom}
                alt="Treatment room interior"
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
