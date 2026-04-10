import { Award, Clock, GraduationCap, Loader2 } from "lucide-react";
import { OurTeamV1Content } from "@/lib/templates/newSchemas";
import { defaultOurTeamContent } from "@/lib/templates/newDefaults";

const iconMap: Record<string, React.ComponentType<{ className?: string }>> = {
  Award,
  Clock,
  GraduationCap,
};

const DoctorSection = ({ doctor }: { doctor: OurTeamV1Content['doctor'] }) => {
  const IconMap = iconMap;
  return (
    <section className="py-20 bg-background">
      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 xl:px-16">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Image */}
          <div className="flex justify-center lg:justify-end">
            <div className="relative">
              <div className="absolute inset-0 rounded-full border-4 border-primary/20 transform scale-110" />
              <div className="w-80 h-80 md:w-[28rem] md:h-[28rem] lg:w-[32rem] lg:h-[32rem] rounded-full overflow-hidden border-8 border-white shadow-xl">
                <img
                  src={doctor.imageUrl || '/placeholder.svg'}
                  alt={doctor.imageAlt || `${doctor.name}, Clinical Psychiatrist`}
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
          </div>

          {/* Content Card */}
          <div className="bg-card rounded-3xl shadow-lg p-8 md:p-12">
            <p className="text-primary text-sm font-semibold uppercase tracking-widest mb-3">
              {doctor.subtitle || 'CLINICAL PSYCHIATRIST'}
            </p>
            <h2 className="text-3xl md:text-4xl text-foreground font-bold mb-6">
              {doctor.name}
            </h2>
            {doctor.bio.map((paragraph, i) => (
              <p key={i} className="text-muted-foreground leading-relaxed mb-4">
                {paragraph}
              </p>
            ))}

            {/* Credentials */}
            <div className="flex flex-wrap gap-4 mt-4">
              {doctor.credentials.map((cred, index) => {
                const IconComponent = IconMap[cred.icon] || Award;
                return (
                  <div key={index} className="inline-flex items-center gap-2 bg-primary/10 text-foreground px-4 py-2 rounded-full text-sm font-medium">
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
  );
};

const OurTeam = () => {
  const c = defaultOurTeamContent;

  return (
    <div className="min-h-screen bg-background">
      <main>
        {/* Hero Section */}
        <section className="py-16 bg-muted">
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

        {/* Doctor 1 Section */}
        <DoctorSection doctor={c.doctor} />

        {/* Doctor 2 Section */}
        {c.doctor2 && <DoctorSection doctor={c.doctor2} />}

        {/* CTA Section */}
        <section className="py-16 bg-muted">
          <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 xl:px-16 text-center">
            <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-4">
              {c.cta.title}
            </h2>
            <p className="text-muted-foreground text-lg mb-8 max-w-xl mx-auto">
              {c.cta.body}
            </p>
            <a
              href={c.cta.ctaHref}
              className="inline-flex items-center justify-center px-8 py-4 rounded-full bg-primary text-primary-foreground font-semibold text-lg hover:opacity-90 transition-all duration-300"
            >
              {c.cta.ctaLabel}
            </a>
          </div>
        </section>
      </main>
    </div>
  );
};

export default OurTeam;
