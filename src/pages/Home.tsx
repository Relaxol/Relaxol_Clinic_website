import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { HeroSection } from "@/components/sections/HeroSection";
import { AboutSection } from "@/components/sections/AboutSection";
import { ConditionsSection } from "@/components/sections/ConditionsSection";

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
import { JsonLdSchema } from "@/components/seo/JsonLdSchema";
import { PageSEO } from "@/components/seo/PageSEO";

const Home = () => {
  const { content, loading } = usePageContent('home');
  
  // Cast to HomeV1Content if available
  const homeContent = content as HomeV1Content | null;

  return (
    <div className="min-h-screen bg-background">
      <PageSEO
        title="Jersey Serenity Minds | Premier Ketamine & SPRAVATO® Treatment in New Jersey"
        description="Leading provider of innovative mental health treatments including ketamine therapy, SPRAVATO®, and integrative medicine in Englewood Cliffs, NJ."
        path="/"
      />
      <JsonLdSchema type="clinic" />
      <Header />
      <main>
        <HeroSection content={homeContent?.hero} />
        <AboutSection content={homeContent?.about} />
        <VideoSection content={homeContent?.video} />
        <TreatmentsSection content={homeContent?.treatments} />
        <EnvironmentSection content={homeContent?.environment} />
        <ConditionsSection content={homeContent?.conditions} />
        
        <WhyChooseSection content={homeContent?.whyChoose} />
        <TestimonialsSection content={homeContent?.testimonials} />
        {/* <VideoTestimonialsSection /> */}
        <TimelineSection content={homeContent?.timeline} />
        <CoverageSection content={homeContent?.coverage} />
        <ContactSection content={homeContent?.contact} />
      </main>
      <Footer />
    </div>
  );
};

export default Home;
