import treatmentRoom from "@/assets/treatment-room.jpg";

export function EnvironmentSection() {
  return (
    <section className="py-20 bg-cream-dark">
      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 xl:px-16">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Content */}
          <div>
            <span className="section-label mb-4 inline-block">
              YOUR COMFORT MATTERS
            </span>
            <h2 className="text-3xl md:text-4xl lg:text-5xl text-foreground font-bold mb-6">
              A Calm, Private Treatment Environment
            </h2>
            <p className="text-muted-foreground text-lg leading-relaxed mb-4">
              We know that seeking mental health treatment can feel vulnerable. That's why we've designed our clinic to feel more like a spa than a sterile medical office. From soft lighting to comfortable recliners, every detail is intended to help you relax during your session.
            </p>
            <p className="text-muted-foreground text-lg leading-relaxed">
              Each treatment room is private, ensuring confidentiality and peace of mind. Our staff is trained not only in clinical care but in creating a welcoming, judgment-free atmosphere where you can focus entirely on your healing.
            </p>
          </div>

          {/* Image */}
          <div className="relative">
            <div className="image-card aspect-[3/4] sm:aspect-[4/3]">
              <img
                src={treatmentRoom}
                alt="Comfortable treatment room with calming atmosphere"
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
