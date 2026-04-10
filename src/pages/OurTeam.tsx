import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { Award, Clock, GraduationCap, Loader2 } from "lucide-react";
import doctorPortrait from "@/assets/dr-sangeet-khanna.jpg";
import { usePageContent } from "@/hooks/usePageContent";
import { OurTeamV1Content } from "@/lib/templates/newSchemas";
import { defaultOurTeamContent } from "@/lib/templates/newDefaults";
import { JsonLdSchema } from "@/components/seo/JsonLdSchema";
import { PageSEO } from "@/components/seo/PageSEO";

const iconMap: Record<string, React.ComponentType<{ className?: string }>> = {
  Award,
  Clock,
  GraduationCap,
};

const OurTeam = () => {
  const { content, loading } = usePageContent('our-team');
  const hasContent = content && Object.keys(content).length > 0 && (content as any).hero;
  const raw = (hasContent ? content : defaultOurTeamContent) as OurTeamV1Content;
  // Merge in default doctor2 if DB content doesn't have it yet
  const c: OurTeamV1Content = {
    ...raw,
    doctor2: raw.doctor2 || defaultOurTeamContent.doctor2,
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <PageSEO
        title="Our Team"
        description="Meet Dr. Sangeet Khanna and the Relaxol Clinic team — experienced psychiatrists specializing in ketamine therapy and SPRAVATO® treatment."
        path="/our-team"
      />
      <JsonLdSchema type="physician" />
      <Header />
      <main>
        {/* Hero Section */}
        <section className="py-16 bg-cream-band">
          <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 xl:px-16 text-center">
            <p className="text-primary text-sm font-semibold uppercase tracking-widest mb-3">
              {c.hero.subtitle || 'MEET OUR EXPERTS'}
            </p>
            <h1 className="text-4xl md:text-5xl lg:text-6xl text-foreground font-bold mb-6">
              {c.hero.headline}
            </h1>
            <p className="text-muted-foreground text-lg md:text-xl max-w-2xl mx-auto">
              {c.hero.body}
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
                  <div className="absolute inset-0 rounded-full border-4 border-primary/20 transform scale-110" />
                  <div className="w-80 h-80 md:w-[28rem] md:h-[28rem] lg:w-[32rem] lg:h-[32rem] rounded-full overflow-hidden border-8 border-white shadow-hero">
                    <img
                      src={c.doctor.imageUrl || doctorPortrait}
                      alt={c.doctor.imageAlt || `${c.doctor.name}, Clinical Psychiatrist`}
                      className="w-full h-full object-cover"
                    />
                  </div>
                </div>
              </div>

              {/* Content Card */}
              <div className="bg-card rounded-3xl shadow-card p-8 md:p-12">
                <p className="text-primary text-sm font-semibold uppercase tracking-widest mb-3">
                  {c.doctor.subtitle || 'CLINICAL PSYCHIATRIST'}
                </p>
                <h2 className="text-3xl md:text-4xl text-foreground font-bold mb-6">
                  {c.doctor.name}
                </h2>
                {c.doctor.bio.map((paragraph, i) => (
                  <p key={i} className="text-muted-foreground leading-relaxed mb-4">
                    {paragraph}
                  </p>
                ))}

                {/* Credentials */}
                <div className="flex flex-wrap gap-4 mt-4">
                  {c.doctor.credentials.map((cred, index) => {
                    const IconComponent = iconMap[cred.icon] || Award;
                    return (
                      <div key={index} className="trust-badge">
                        <IconComponent className="w-5 h-5 text-primary" />
                        <span>{cred.label}</span>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Doctor 2 Section */}
        {c.doctor2 && (
          <section className="py-20 bg-background">
            <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 xl:px-16">
              <div className="grid lg:grid-cols-2 gap-12 items-center">
                {/* Content Card - left side for visual variety */}
                <div className="bg-card rounded-3xl shadow-card p-8 md:p-12 order-2 lg:order-1">
                  <p className="text-primary text-sm font-semibold uppercase tracking-widest mb-3">
                    {c.doctor2.subtitle || 'SPECIALIST'}
                  </p>
                  <h2 className="text-3xl md:text-4xl text-foreground font-bold mb-6">
                    {c.doctor2.name}
                  </h2>
                  {c.doctor2.bio.map((paragraph, i) => (
                    <p key={i} className="text-muted-foreground leading-relaxed mb-4">
                      {paragraph}
                    </p>
                  ))}
                  <div className="flex flex-wrap gap-4 mt-4">
                    {c.doctor2.credentials.map((cred, index) => {
                      const IconComponent = iconMap[cred.icon] || Award;
                      return (
                        <div key={index} className="trust-badge">
                          <IconComponent className="w-5 h-5 text-primary" />
                          <span>{cred.label}</span>
                        </div>
                      );
                    })}
                  </div>
                </div>

                {/* Image - right side */}
                <div className="flex justify-center lg:justify-start order-1 lg:order-2">
                  <div className="relative">
                    <div className="absolute inset-0 rounded-full border-4 border-primary/20 transform scale-110" />
                    <div className="w-80 h-80 md:w-[28rem] md:h-[28rem] lg:w-[32rem] lg:h-[32rem] rounded-full overflow-hidden border-8 border-white shadow-hero">
                      <img
                        src={c.doctor2.imageUrl || doctorPortrait}
                        alt={c.doctor2.imageAlt || c.doctor2.name}
                        className="w-full h-full object-cover"
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>
        )}

        {/* CTA Section */}
        <section className="py-16 bg-cream-band">
          <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 xl:px-16 text-center">
            <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-4">
              {c.cta.title}
            </h2>
            <p className="text-muted-foreground text-lg mb-8 max-w-xl mx-auto">
              {c.cta.body}
            </p>
            <a
              href={c.cta.ctaHref}
              className="inline-flex items-center justify-center px-8 py-4 rounded-full bg-primary text-primary-foreground font-semibold text-lg hover:bg-accent transition-all duration-300 shadow-glow"
            >
              {c.cta.ctaLabel}
            </a>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default OurTeam;
