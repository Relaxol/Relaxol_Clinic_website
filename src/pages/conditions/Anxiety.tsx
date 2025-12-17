import { Link } from "react-router-dom";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { Button } from "@/components/ui/button";
import conditionAnxiety from "@/assets/condition-anxiety.jpg";

const Anxiety = () => {
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
                  Anxiety Treatment
                </h1>
                <p className="text-lg text-muted-foreground mb-8 leading-relaxed">
                  Persistent anxiety can feel all-consuming, affecting your ability to work, sleep, and enjoy life. Our clinic offers treatments that target the brain's glutamate system, potentially offering rapid relief for those who haven't responded to conventional therapies.
                </p>
                <Button size="lg" className="bg-primary text-primary-foreground hover:bg-accent">
                  Schedule a Consultation
                </Button>
              </div>
              <div className="rounded-2xl overflow-hidden shadow-xl">
                <img 
                  src={conditionAnxiety} 
                  alt="Person practicing calm breathing" 
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
          </div>
        </section>

        {/* Content Section */}
        <section className="py-16 md:py-24 bg-background">
          <div className="container mx-auto px-4 max-w-4xl">
            <h2 className="text-3xl font-bold text-foreground mb-8">Breaking Free from Chronic Anxiety</h2>
            <div className="prose prose-lg text-muted-foreground space-y-6">
              <p>
                Generalized anxiety disorder, panic disorder, and social anxiety can significantly impact your quality of life. When traditional treatments like SSRIs and therapy haven't provided adequate relief, ketamine therapy offers a new approach.
              </p>
              <p>
                At Relaxol Clinic, we understand the exhausting cycle of anxiety. Our treatments work on different neural pathways than conventional medications, offering hope for rapid and sustained relief.
              </p>
              <h3 className="text-2xl font-semibold text-foreground mt-10 mb-4">How Ketamine Helps Anxiety</h3>
              <p>
                Ketamine works by modulating glutamate, the brain's most abundant neurotransmitter. This mechanism can help "reset" overactive anxiety circuits, often providing relief within hours rather than weeks.
              </p>
              <h3 className="text-2xl font-semibold text-foreground mt-10 mb-4">Who Is a Candidate?</h3>
              <ul className="list-disc pl-6 space-y-2">
                <li>Adults with generalized anxiety disorder resistant to traditional treatments</li>
                <li>Those with panic disorder or social anxiety affecting daily function</li>
                <li>Patients seeking faster relief from debilitating anxiety symptoms</li>
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

export default Anxiety;
