import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { ContactSection } from "@/components/sections/ContactSection";

export default function Contact() {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main>
        {/* Hero */}
        <section className="pt-32 pb-16 bg-gradient-to-b from-[#5C4A3A] to-[#4A3C32]">
          <div className="container mx-auto px-4 text-center">
            <p className="text-[#D09B3C] text-sm font-semibold uppercase tracking-widest mb-3">
              GET IN TOUCH
            </p>
            <h1 className="text-3xl md:text-4xl lg:text-5xl text-white font-bold mb-4">
              Contact Relaxol Clinic
            </h1>
            <p className="text-white/80 text-lg max-w-2xl mx-auto">
              Ready to take the first step? Our team is here to answer your questions and help you begin your journey to wellness.
            </p>
          </div>
        </section>

        {/* Contact Form Section */}
        <ContactSection />

        {/* Location & Hours */}
        <section className="py-16 bg-background">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto grid md:grid-cols-2 gap-12">
              {/* Location */}
              <div>
                <h2 className="text-2xl font-bold text-foreground mb-6">Our Location</h2>
                <div className="space-y-4 text-muted-foreground">
                  <p className="font-medium text-foreground">Relaxol Clinic</p>
                  <p>560 Sylvan Avenue, Suite 2115</p>
                  <p>Englewood Cliffs, NJ 07632</p>
                  <div className="pt-4">
                    <a 
                      href="tel:201-781-2101" 
                      className="text-primary font-semibold hover:text-accent transition-colors"
                    >
                      201-781-2101
                    </a>
                  </div>
                  <div>
                    <a 
                      href="mailto:info@relaxolclinic.com" 
                      className="text-primary font-semibold hover:text-accent transition-colors"
                    >
                      info@relaxolclinic.com
                    </a>
                  </div>
                </div>
              </div>

              {/* Hours */}
              <div>
                <h2 className="text-2xl font-bold text-foreground mb-6">Office Hours</h2>
                <div className="space-y-3 text-muted-foreground">
                  <div className="flex justify-between">
                    <span>Monday - Friday</span>
                    <span className="font-medium text-foreground">9 AM – 6 PM</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Saturday</span>
                    <span className="font-medium text-foreground">By Appointment</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Sunday</span>
                    <span className="font-medium text-foreground">Closed</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
