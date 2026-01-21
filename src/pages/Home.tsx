import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { HeroSection } from "@/components/sections/HeroSection";
import { AboutSection } from "@/components/sections/AboutSection";
import { ConditionsSection } from "@/components/sections/ConditionsSection";
import { ArrowRight } from "lucide-react";

import { TreatmentsSection } from "@/components/sections/TreatmentsSection";
import { WhyChooseSection } from "@/components/sections/WhyChooseSection";
import { VideoSection } from "@/components/sections/VideoSection";
import { TestimonialsSection } from "@/components/sections/TestimonialsSection";
import { VideoTestimonialsSection } from "@/components/sections/VideoTestimonialsSection";
import { TimelineSection } from "@/components/sections/TimelineSection";
import { EnvironmentSection } from "@/components/sections/EnvironmentSection";
import { CoverageSection } from "@/components/sections/CoverageSection";
import { ContactSection } from "@/components/sections/ContactSection";
import { usePageContent } from "@/hooks/usePageContent";
import { HomeV1Content } from "@/lib/templates/schemas";

const Home = () => {
  const { content, loading } = usePageContent('home');
  
  // Cast to HomeV1Content if available
  const homeContent = content as HomeV1Content | null;

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main>
        <HeroSection content={homeContent?.hero} />
        <AboutSection content={homeContent?.about} />
        <VideoSection content={homeContent?.video} />
        <TreatmentsSection content={homeContent?.treatments} />
        <ContactSection content={homeContent?.contact} />
        <ConditionsSection content={homeContent?.conditions} />
        <EnvironmentSection />
        
        <WhyChooseSection />
        <TestimonialsSection content={homeContent?.testimonials} />
        {/* <VideoTestimonialsSection /> */}
        <TimelineSection content={homeContent?.timeline} />
        <CoverageSection />
        
        {/* Final CTA Section */}
        <section className="py-20 md:py-28 bg-gradient-to-b from-cream to-cream-dark/30">
          <div className="container mx-auto px-4 text-center">
            <p className="text-muted-foreground mb-8 text-lg">
              Ready to explore your treatment options?
            </p>
            <a
              href="#contact"
              className="inline-flex items-center gap-3 px-10 py-5 bg-primary text-primary-foreground rounded-full font-semibold text-lg hover:bg-primary/90 transition-all duration-300 shadow-lg hover:shadow-xl hover:-translate-y-1"
            >
              Schedule Your Consultation
              <ArrowRight className="w-5 h-5" />
            </a>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default Home;
