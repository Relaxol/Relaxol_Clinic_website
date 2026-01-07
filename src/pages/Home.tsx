import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { HeroSection } from "@/components/sections/HeroSection";
import { AboutSection } from "@/components/sections/AboutSection";
import { ConditionsSection } from "@/components/sections/ConditionsSection";
import { InsuranceSection } from "@/components/sections/InsuranceSection";
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
        <InsuranceSection />
        <WhyChooseSection />
        <TestimonialsSection content={homeContent?.testimonials} />
        {/* <VideoTestimonialsSection /> */}
        <TimelineSection content={homeContent?.timeline} />
        <CoverageSection />
      </main>
      <Footer />
    </div>
  );
};

export default Home;
