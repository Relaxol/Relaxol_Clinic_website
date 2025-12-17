import { Link } from "react-router-dom";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { Button } from "@/components/ui/button";
import conditionPain from "@/assets/condition-pain.jpg";

const PainManagement = () => {
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
                  Pain Management
                </h1>
                <p className="text-lg text-muted-foreground mb-8 leading-relaxed">
                  Chronic pain can be debilitating and significantly impact your quality of life. When traditional pain treatments haven't provided lasting relief, ketamine infusion therapy offers a promising alternative for managing various chronic pain conditions.
                </p>
                <Button size="lg" className="bg-primary text-primary-foreground hover:bg-accent">
                  Schedule a Consultation
                </Button>
              </div>
              <div className="rounded-2xl overflow-hidden shadow-xl">
                <img 
                  src={conditionPain} 
                  alt="Person experiencing relief from chronic pain" 
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
          </div>
        </section>

        {/* Content Section */}
        <section className="py-16 md:py-24 bg-background">
          <div className="container mx-auto px-4 max-w-4xl">
            <h2 className="text-3xl font-bold text-foreground mb-8">Advanced Pain Management Solutions</h2>
            <div className="prose prose-lg text-muted-foreground space-y-6">
              <p>
                Living with chronic pain affects every aspect of life—from work and relationships to sleep and mental health. At Relaxol Clinic, we offer innovative ketamine-based treatments that target pain through different mechanisms than traditional pain medications.
              </p>
              <p>
                Ketamine infusion therapy has shown remarkable results for patients with various chronic pain conditions, including those who have not found relief through conventional treatments.
              </p>
              <h3 className="text-2xl font-semibold text-foreground mt-10 mb-4">How Ketamine Helps with Pain</h3>
              <p>
                Unlike opioids and other traditional pain medications, ketamine works on the NMDA receptors in the brain. This unique mechanism can help "reset" pain pathways, providing relief that often lasts well beyond the treatment session.
              </p>
              <h3 className="text-2xl font-semibold text-foreground mt-10 mb-4">Conditions We Treat</h3>
              <ul className="list-disc pl-6 space-y-2">
                <li>Complex Regional Pain Syndrome (CRPS)</li>
                <li>Fibromyalgia</li>
                <li>Neuropathic pain</li>
                <li>Chronic migraines and headaches</li>
                <li>Failed back surgery syndrome</li>
                <li>Phantom limb pain</li>
              </ul>
              <h3 className="text-2xl font-semibold text-foreground mt-10 mb-4">Who Is a Candidate?</h3>
              <ul className="list-disc pl-6 space-y-2">
                <li>Adults with chronic pain lasting more than 3 months</li>
                <li>Those who haven't responded adequately to conventional pain treatments</li>
                <li>Patients looking to reduce dependence on opioid medications</li>
                <li>Individuals with pain conditions that have a neuropathic component</li>
              </ul>
            </div>
            <div className="mt-12">
              <Button size="lg" className="bg-primary text-primary-foreground hover:bg-accent" asChild>
                <Link to="/contact">Contact Us to Learn More</Link>
              </Button>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default PainManagement;