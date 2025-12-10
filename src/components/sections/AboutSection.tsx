import treatmentRoom from "@/assets/treatment-room.jpg";

export function AboutSection() {
  return (
    <section id="about" className="py-20 bg-background">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-12">
          <p className="text-primary text-sm font-semibold uppercase tracking-widest mb-3">
            WHY KHANNA PSYCHIATRIC & KETAMINE
          </p>
          <h2 className="font-serif text-3xl md:text-4xl lg:text-5xl text-foreground font-bold">
            Rethinking <span className="text-primary">Mental Health</span>
          </h2>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Image */}
          <div className="relative order-2 lg:order-1">
            <div className="image-card aspect-[4/3]">
              <img
                src={treatmentRoom}
                alt="Modern treatment facility interior"
                className="w-full h-full object-cover"
              />
            </div>
          </div>

          {/* Content */}
          <div className="order-1 lg:order-2">
            <p className="text-muted-foreground text-lg leading-relaxed mb-6">
              At Khanna Psychiatric & Ketamine, we combine advanced psychiatric expertise with FDA-approved treatments like SPRAVATO® and ketamine infusion therapy. Our approach is grounded in evidence-based medicine while remaining attentive to each patient's unique journey. Whether you're struggling with treatment-resistant depression, chronic anxiety, PTSD, or OCD, our team is here to provide compassionate, clinician-led care.
            </p>
            <p className="text-muted-foreground text-lg leading-relaxed mb-8">
              We believe mental health care should be accessible, personalized, and delivered in an environment that feels safe. That's why our clinic offers private treatment rooms, flexible scheduling, and support navigating insurance and financing—because healing shouldn't feel like a hurdle.
            </p>
            <a 
              href="#contact" 
              className="btn-primary"
            >
              Schedule Your Consultation
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
