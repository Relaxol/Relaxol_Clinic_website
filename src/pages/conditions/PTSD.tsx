import { Link } from "react-router-dom";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { Button } from "@/components/ui/button";
import conditionPtsd from "@/assets/condition-ptsd-new.jpg";

const PTSD = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main>
        {/* Hero Section */}
        <section className="py-16 md:py-24 bg-cream-dark">
          <div className="container mx-auto px-4">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <div>
                <p className="text-primary text-sm font-semibold uppercase tracking-widest mb-3">
                  CONDITIONS WE TREAT
                </p>
                <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-6">
                  PTSD Treatment
                </h1>
                <p className="text-lg text-muted-foreground mb-8 leading-relaxed">
                  Trauma can leave lasting imprints on the mind and body. Ketamine therapy has shown remarkable promise in helping patients process traumatic memories and reduce the intensity of PTSD symptoms in a safe, supportive environment.
                </p>
                <Link to="/contact">
                  <Button size="lg" className="bg-primary text-primary-foreground hover:bg-accent">
                    Schedule a Consultation
                  </Button>
                </Link>
              </div>
              <div className="rounded-2xl overflow-hidden shadow-xl">
                <img 
                  src={conditionPtsd} 
                  alt="Veteran finding peace during therapy" 
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
          </div>
        </section>

        {/* Content Section */}
        <section className="py-16 md:py-24 bg-background">
          <div className="container mx-auto px-4 max-w-4xl">
            <h2 className="text-3xl font-bold text-foreground mb-8">Healing from Trauma</h2>
            <div className="prose prose-lg text-muted-foreground space-y-6">
              <p>
                Post-traumatic stress disorder affects veterans, first responders, survivors of abuse, accidents, and anyone who has experienced severe trauma. Traditional treatments don't work for everyone, and that's where ketamine therapy can make a difference.
              </p>
              <p>
                At Relaxol Clinic, we create a safe, compassionate space for your healing journey. Our clinicians specialize in trauma-informed care, ensuring you feel supported throughout your treatment.
              </p>
              <h3 className="text-2xl font-semibold text-foreground mt-10 mb-4">How Ketamine Helps PTSD</h3>
              <p>
                Research shows ketamine can help reduce the emotional intensity of traumatic memories and decrease hypervigilance. By promoting neuroplasticity, it may help the brain form new, healthier neural pathways.
              </p>
              <h3 className="text-2xl font-semibold text-foreground mt-10 mb-4">Who Is a Candidate?</h3>
              <ul className="list-disc pl-6 space-y-2">
                <li>Veterans and active military personnel with combat-related PTSD</li>
                <li>Survivors of trauma who haven't responded to traditional therapies</li>
                <li>Those experiencing flashbacks, nightmares, or severe anxiety related to past trauma</li>
              </ul>
            </div>
            <div className="mt-12">
              <Link to="/contact">
                <Button size="lg" className="bg-primary text-primary-foreground hover:bg-accent">
                  Contact Us to Learn More
                </Button>
              </Link>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default PTSD;
