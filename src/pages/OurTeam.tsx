import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { Award, Clock, GraduationCap } from "lucide-react";
import doctorPortrait from "@/assets/dr-sangeet-khanna.jpg";

const credentials = [
  { icon: Award, label: "Board Certified" },
  { icon: Clock, label: "15+ Years Experience" },
  { icon: GraduationCap, label: "Fellowship Trained" },
];

const OurTeam = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main>
        {/* Hero Section */}
        <section className="py-16 bg-cream-band">
          <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 xl:px-16 text-center">
            <p className="text-primary text-sm font-semibold uppercase tracking-widest mb-3">
              MEET OUR EXPERTS
            </p>
            <h1 className="text-4xl md:text-5xl lg:text-6xl text-foreground font-bold mb-6">
              Our Team
            </h1>
            <p className="text-muted-foreground text-lg md:text-xl max-w-2xl mx-auto">
              Compassionate care from experienced psychiatric professionals dedicated to your mental wellness.
            </p>
          </div>
        </section>

        {/* Doctor Section */}
        <section className="py-20 bg-background">
          <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 xl:px-16">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              {/* Image */}
              <div className="flex justify-center lg:justify-end">
                <div className="relative">
                  {/* Decorative ring */}
                  <div className="absolute inset-0 rounded-full border-4 border-primary/20 transform scale-110" />
                  <div className="w-80 h-80 md:w-[28rem] md:h-[28rem] lg:w-[32rem] lg:h-[32rem] rounded-full overflow-hidden border-8 border-white shadow-hero">
                    <img
                      src={doctorPortrait}
                      alt="Dr. Khanna, Clinical Psychiatrist"
                      className="w-full h-full object-cover"
                    />
                  </div>
                </div>
              </div>

              {/* Content Card */}
              <div className="bg-white rounded-3xl shadow-card p-8 md:p-12">
                <p className="text-primary text-sm font-semibold uppercase tracking-widest mb-3">
                  CLINICAL PSYCHIATRIST
                </p>
                <h2 className="text-3xl md:text-4xl text-foreground font-bold mb-6">
                  Dr. Khanna
                </h2>
                <p className="text-muted-foreground leading-relaxed mb-4">
                  Relaxol is founded by the esteemed Dr. Khanna, a leading specialist in Ketamine Therapy. Dr. Khanna and his compassionate team are dedicated to guiding you on your journey to optimal health.
                </p>
                <p className="text-muted-foreground leading-relaxed mb-6">
                  Dr. Khanna is not just a psychiatrist; he's a guide for those navigating the complex landscape of mental health. With years of experience and a deep commitment to patient care, Dr. Khanna brings expertise and empathy to every consultation.
                </p>

                {/* Credentials */}
                <div className="flex flex-wrap gap-4 mt-4">
                  {credentials.map((cred, index) => (
                    <div
                      key={index}
                      className="trust-badge"
                    >
                      <cred.icon className="w-5 h-5 text-primary" />
                      <span>{cred.label}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-16 bg-cream-band">
          <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 xl:px-16 text-center">
            <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-4">
              Ready to Start Your Journey?
            </h2>
            <p className="text-muted-foreground text-lg mb-8 max-w-xl mx-auto">
              Schedule a consultation with Dr. Khanna and take the first step toward mental wellness.
            </p>
            <a
              href="/contact"
              className="inline-flex items-center justify-center px-8 py-4 rounded-full bg-primary text-primary-foreground font-semibold text-lg hover:bg-accent transition-all duration-300 shadow-glow"
            >
              Schedule Your Consultation
            </a>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default OurTeam;
