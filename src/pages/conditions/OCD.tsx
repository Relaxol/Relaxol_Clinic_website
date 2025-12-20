import { Link } from "react-router-dom";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { Button } from "@/components/ui/button";
import conditionOcd from "@/assets/condition-ocd.jpg";

const OCD = () => {
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
                  OCD Treatment
                </h1>
                <p className="text-lg text-muted-foreground mb-8 leading-relaxed">
                  Obsessive-compulsive disorder can be exhausting and isolating. For patients who haven't found relief through traditional treatments, ketamine-based therapies may help interrupt the cycle of intrusive thoughts and compulsive behaviors.
                </p>
                <Link to="/contact">
                  <Button size="lg" className="bg-primary text-primary-foreground hover:bg-accent">
                    Schedule a Consultation
                  </Button>
                </Link>
              </div>
              <div className="rounded-2xl overflow-hidden shadow-xl">
                <img 
                  src={conditionOcd} 
                  alt="Person experiencing quiet focus and mental clarity" 
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
          </div>
        </section>

        {/* Content Section */}
        <section className="py-16 md:py-24 bg-background">
          <div className="container mx-auto px-4 max-w-4xl">
            <h2 className="text-3xl font-bold text-foreground mb-8">Finding Freedom from OCD</h2>
            <div className="prose prose-lg text-muted-foreground space-y-6">
              <p>
                OCD goes far beyond being "neat" or organized. The relentless intrusive thoughts and compulsive rituals can consume hours of each day, affecting work, relationships, and quality of life. When SSRIs and exposure therapy aren't enough, ketamine offers new hope.
              </p>
              <p>
                At Relaxol Clinic, we understand the unique challenges of OCD. Our treatments target different neural pathways than traditional medications, potentially offering relief for treatment-resistant cases.
              </p>
              <h3 className="text-2xl font-semibold text-foreground mt-10 mb-4">How Ketamine Helps OCD</h3>
              <p>
                Ketamine works on the glutamate system, which plays a key role in OCD. Research suggests it can help reduce the intensity of obsessions and the urge to perform compulsions, often with rapid results.
              </p>
              <h3 className="text-2xl font-semibold text-foreground mt-10 mb-4">Who Is a Candidate?</h3>
              <ul className="list-disc pl-6 space-y-2">
                <li>Adults with OCD who haven't responded adequately to SSRIs</li>
                <li>Those whose OCD significantly impacts daily functioning</li>
                <li>Patients looking for faster relief from severe OCD symptoms</li>
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

export default OCD;
