import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { HeroSection } from "@/components/sections/HeroSection";
import { AboutSection } from "@/components/sections/AboutSection";
import { InsuranceSection } from "@/components/sections/InsuranceSection";
import { TreatmentsSection } from "@/components/sections/TreatmentsSection";
import { VideoSection } from "@/components/sections/VideoSection";
import { TestimonialsSection } from "@/components/sections/TestimonialsSection";
import { VideoTestimonialsSection } from "@/components/sections/VideoTestimonialsSection";
import { TimelineSection } from "@/components/sections/TimelineSection";
import { EnvironmentSection } from "@/components/sections/EnvironmentSection";
import { DoctorSection } from "@/components/sections/DoctorSection";
import { FAQSection } from "@/components/sections/FAQSection";
import { ContactSection } from "@/components/sections/ContactSection";

const Home = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main>
        <HeroSection />
        <AboutSection />
        <InsuranceSection />
        <TreatmentsSection />
        <VideoSection />
        <TestimonialsSection />
        <VideoTestimonialsSection />
        <TimelineSection />
        <EnvironmentSection />
        <DoctorSection />
        <FAQSection />
        <ContactSection />
      </main>
      <Footer />
    </div>
  );
};

export default Home;
