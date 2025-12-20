import { Award, Clock, GraduationCap } from "lucide-react";
import doctorPortrait from "@/assets/dr-sangeet-khanna.jpg";

const credentials = [
  { icon: Award, label: "Board Certified" },
  { icon: Clock, label: "15+ Years Experience" },
  { icon: GraduationCap, label: "Fellowship Trained" },
];

interface DoctorContent {
  subtitle?: string;
  name?: string;
  imageUrl?: string;
  bio?: string[];
}

interface DoctorSectionProps {
  content?: DoctorContent;
}

export function DoctorSection({ content }: DoctorSectionProps) {
  const subtitle = content?.subtitle || "CLINICAL PSYCHIATRIST";
  const name = content?.name || "Dr. Khanna";
  const imageUrl = content?.imageUrl || doctorPortrait;
  const bio = content?.bio?.length ? content.bio : [
    "Relaxol is founded by the esteemed Dr. Khanna, a leading specialist in Ketamine Therapy. Dr. Khanna and his compassionate team are dedicated to guiding you on your journey to optimal health.",
    "Dr. Khanna is not just a psychiatrist; he's a guide for those navigating the complex landscape of mental health. With years of experience and a deep commitment to patient care, Dr. Khanna brings expertise and empathy to every consultation."
  ];

  return (
    <section className="py-20 bg-cream-band">
      <div className="container mx-auto px-4">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Image - Much larger */}
          <div className="flex justify-center lg:justify-end">
            <div className="relative">
              {/* Decorative ring */}
              <div className="absolute inset-0 rounded-full border-4 border-primary/20 transform scale-110" />
              <div className="w-80 h-80 md:w-[28rem] md:h-[28rem] lg:w-[32rem] lg:h-[32rem] rounded-full overflow-hidden border-8 border-white shadow-hero">
                <img
                  src={imageUrl}
                  alt={`${name}, Clinical Psychiatrist`}
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
          </div>

          {/* Content Card */}
          <div className="bg-white rounded-3xl shadow-card p-8 md:p-12">
            <p className="text-primary text-sm font-semibold uppercase tracking-widest mb-3">
              {subtitle}
            </p>
            <h2 className="text-3xl md:text-4xl text-foreground font-bold mb-6">
              {name}
            </h2>
            {bio.map((paragraph, index) => (
              <p key={index} className="text-muted-foreground leading-relaxed mb-4">
                {paragraph}
              </p>
            ))}

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
  );
}
