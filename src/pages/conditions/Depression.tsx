import { Link } from "react-router-dom";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { Button } from "@/components/ui/button";
import conditionDepression from "@/assets/condition-depression.jpg";

const Depression = () => {
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
                  Depression Treatment
                </h1>
                <p className="text-lg text-muted-foreground mb-8 leading-relaxed">
                  When traditional antidepressants fall short, ketamine and SPRAVATO® offer a new path forward. These breakthrough treatments work differently—often producing relief within hours or days rather than weeks.
                </p>
                <Button size="lg" className="bg-primary text-primary-foreground hover:bg-accent">
                  Schedule a Consultation
                </Button>
              </div>
              <div className="rounded-2xl overflow-hidden shadow-xl">
                <img 
                  src={conditionDepression} 
                  alt="Person finding relief from depression" 
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
          </div>
        </section>

        {/* Content Section */}
        <section className="py-16 md:py-24 bg-background">
          <div className="container mx-auto px-4 max-w-4xl">
            <h2 className="text-3xl font-bold text-foreground mb-8">Understanding Treatment-Resistant Depression</h2>
            <div className="prose prose-lg text-muted-foreground space-y-6">
              <p>
                Treatment-resistant depression (TRD) affects millions of people who haven't found relief through traditional antidepressants. If you've tried multiple medications without success, you're not alone—and there is hope.
              </p>
              <p>
                At Relaxol Clinic, we specialize in advanced treatments specifically designed for patients like you. Ketamine and SPRAVATO® work through different mechanisms than traditional antidepressants, targeting the brain's glutamate system to create rapid, meaningful improvement.
              </p>
              <h3 className="text-2xl font-semibold text-foreground mt-10 mb-4">How Ketamine Helps Depression</h3>
              <p>
                Unlike traditional antidepressants that can take weeks to work, ketamine often produces noticeable improvements within hours to days. This rapid onset can be life-changing for those who have struggled for years.
              </p>
              <h3 className="text-2xl font-semibold text-foreground mt-10 mb-4">Who Is a Candidate?</h3>
              <ul className="list-disc pl-6 space-y-2">
                <li>Adults with major depressive disorder who haven't responded to at least two antidepressants</li>
                <li>Those experiencing severe depression with suicidal ideation</li>
                <li>Patients seeking faster relief than traditional medications provide</li>
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

export default Depression;
