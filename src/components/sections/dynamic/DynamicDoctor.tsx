import { Award, Clock, GraduationCap, LucideIcon } from "lucide-react";

const iconMap: Record<string, LucideIcon> = {
  Award,
  Clock,
  GraduationCap,
};

interface DoctorSectionData {
  sectionId: string;
  type: 'doctor';
  subtitle: string;
  name: string;
  image: string;
  bio: string[];
  credentials: { icon: string; label: string }[];
}

interface Props {
  data: DoctorSectionData;
}

export function DynamicDoctor({ data }: Props) {
  return (
    <section 
      className="py-20 bg-cream-band"
      data-section-id={data.sectionId}
      data-section-type={data.type}
    >
      <div className="container mx-auto px-4">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div className="flex justify-center lg:justify-end">
            <div className="relative">
              <div className="absolute inset-0 rounded-full border-4 border-primary/20 transform scale-110" />
              <div className="w-80 h-80 md:w-[28rem] md:h-[28rem] lg:w-[32rem] lg:h-[32rem] rounded-full overflow-hidden border-8 border-white shadow-hero">
                <img
                  src={data.image}
                  alt={data.name}
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
          </div>

          <div className="bg-white rounded-3xl shadow-card p-8 md:p-12">
            <p className="text-primary text-sm font-semibold uppercase tracking-widest mb-3">
              {data.subtitle}
            </p>
            <h2 className="text-3xl md:text-4xl text-foreground font-bold mb-6">
              {data.name}
            </h2>
            {data.bio.map((paragraph, index) => (
              <p key={index} className="text-muted-foreground leading-relaxed mb-4">
                {paragraph}
              </p>
            ))}

            <div className="flex flex-wrap gap-4 mt-8">
              {data.credentials.map((cred, index) => {
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
  );
}
