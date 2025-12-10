import { Award, Clock, GraduationCap } from "lucide-react";
import doctorPortrait from "@/assets/doctor-portrait.jpg";

const credentials = [
  { icon: Award, label: "Board Certified" },
  { icon: Clock, label: "15+ Years Experience" },
  { icon: GraduationCap, label: "Fellowship Trained" },
];

export function DoctorSection() {
  return (
    <section className="py-20 bg-cream-band">
      <div className="container mx-auto px-4">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Image */}
          <div className="flex justify-center lg:justify-end">
            <div className="relative">
              {/* Decorative ring */}
              <div className="absolute inset-0 rounded-full border-4 border-primary/20 transform scale-110" />
              <div className="w-72 h-72 md:w-96 md:h-96 rounded-full overflow-hidden border-8 border-white shadow-hero">
                <img
                  src={doctorPortrait}
                  alt="Dr. Khanna - Board-Certified Psychiatrist"
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
          </div>

          {/* Content Card */}
          <div className="bg-white rounded-3xl shadow-card p-8 md:p-12">
            <p className="text-primary text-sm font-semibold uppercase tracking-widest mb-3">
              BOARD-CERTIFIED PSYCHIATRIST
            </p>
            <h2 className="font-serif text-3xl md:text-4xl text-foreground font-bold mb-6">
              Meet Dr. Khanna
            </h2>
            <p className="text-muted-foreground leading-relaxed mb-4">
              Dr. Khanna is a board-certified psychiatrist with over 15 years of experience treating mood disorders, anxiety, trauma, and OCD. After completing advanced training in ketamine-assisted therapies, Dr. Khanna founded this clinic to bring cutting-edge treatments to patients who had lost hope in traditional approaches.
            </p>
            <p className="text-muted-foreground leading-relaxed mb-8">
              "I've seen firsthand how transformative these treatments can be," Dr. Khanna says. "My goal is to provide every patient with the same level of care and attention I would want for my own family."
            </p>

            {/* Credentials */}
            <div className="flex flex-wrap gap-4">
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
