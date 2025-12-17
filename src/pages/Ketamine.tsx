import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { Button } from "@/components/ui/button";
import { Check, Clock, Shield, Brain } from "lucide-react";
import treatmentKetamine from "@/assets/treatment-ketamine.jpg";

const benefits = [
  {
    icon: Clock,
    title: "Rapid Relief",
    description: "Many patients experience improvement within hours to days, not weeks like traditional antidepressants."
  },
  {
    icon: Brain,
    title: "Neural Restoration",
    description: "Promotes neuroplasticity and helps repair neural connections affected by depression and chronic pain."
  },
  {
    icon: Shield,
    title: "Safe & Monitored",
    description: "Administered in our clinical setting with continuous medical supervision throughout your treatment."
  }
];

const conditions = [
  "Treatment-resistant depression",
  "Anxiety disorders",
  "PTSD",
  "OCD",
  "Chronic pain conditions",
  "Bipolar depression"
];

const Ketamine = () => {
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
                  KETAMINE THERAPY
                </p>
                <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-6">
                  Ketamine Infusion Therapy
                </h1>
                <p className="text-lg text-muted-foreground mb-8 leading-relaxed">
                  Experience breakthrough relief with IV ketamine therapy. Our precisely controlled infusions offer rapid results for depression, anxiety, PTSD, and chronic pain when other treatments haven't worked.
                </p>
                <Button size="lg" className="bg-primary text-primary-foreground hover:bg-accent">
                  Schedule a Consultation
                </Button>
              </div>
              <div className="rounded-2xl overflow-hidden shadow-xl">
                <img 
                  src={treatmentKetamine} 
                  alt="Patient receiving ketamine infusion therapy" 
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
          </div>
        </section>

        {/* Benefits Section */}
        <section className="py-16 md:py-24 bg-background">
          <div className="container mx-auto px-4">
            <div className="text-center mb-16">
              <p className="text-primary text-sm font-semibold uppercase tracking-widest mb-3">
                WHY KETAMINE
              </p>
              <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
                The Science Behind Ketamine Therapy
              </h2>
              <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
                Ketamine works differently than traditional medications, targeting the glutamate system to provide rapid relief and promote lasting brain changes.
              </p>
            </div>
            <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
              {benefits.map((benefit, index) => (
                <div key={index} className="bg-card p-8 rounded-2xl shadow-sm text-center">
                  <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-6">
                    <benefit.icon className="w-8 h-8 text-primary" />
                  </div>
                  <h3 className="text-xl font-bold text-foreground mb-3">{benefit.title}</h3>
                  <p className="text-muted-foreground">{benefit.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Conditions Section */}
        <section className="py-16 md:py-24 bg-cream-dark">
          <div className="container mx-auto px-4">
            <div className="grid lg:grid-cols-2 gap-12 items-center max-w-6xl mx-auto">
              <div>
                <p className="text-primary text-sm font-semibold uppercase tracking-widest mb-3">
                  CONDITIONS TREATED
                </p>
                <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-6">
                  Who Can Benefit from Ketamine?
                </h2>
                <p className="text-muted-foreground text-lg mb-8">
                  Ketamine infusion therapy is particularly effective for patients who haven't found relief with traditional treatments. Our clinic specializes in treating:
                </p>
                <ul className="space-y-4">
                  {conditions.map((condition, index) => (
                    <li key={index} className="flex items-center gap-3">
                      <div className="w-6 h-6 bg-primary rounded-full flex items-center justify-center flex-shrink-0">
                        <Check className="w-4 h-4 text-primary-foreground" />
                      </div>
                      <span className="text-foreground font-medium">{condition}</span>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="bg-card p-8 md:p-10 rounded-2xl shadow-lg">
                <h3 className="text-2xl font-bold text-foreground mb-6">What to Expect</h3>
                <div className="space-y-6">
                  <div className="flex gap-4">
                    <div className="w-8 h-8 bg-primary text-primary-foreground rounded-full flex items-center justify-center flex-shrink-0 font-bold">1</div>
                    <div>
                      <h4 className="font-semibold text-foreground mb-1">Initial Consultation</h4>
                      <p className="text-muted-foreground text-sm">Complete evaluation to determine if ketamine therapy is right for you.</p>
                    </div>
                  </div>
                  <div className="flex gap-4">
                    <div className="w-8 h-8 bg-primary text-primary-foreground rounded-full flex items-center justify-center flex-shrink-0 font-bold">2</div>
                    <div>
                      <h4 className="font-semibold text-foreground mb-1">Treatment Sessions</h4>
                      <p className="text-muted-foreground text-sm">Relaxing 40-60 minute infusions in our comfortable treatment rooms.</p>
                    </div>
                  </div>
                  <div className="flex gap-4">
                    <div className="w-8 h-8 bg-primary text-primary-foreground rounded-full flex items-center justify-center flex-shrink-0 font-bold">3</div>
                    <div>
                      <h4 className="font-semibold text-foreground mb-1">Recovery & Monitoring</h4>
                      <p className="text-muted-foreground text-sm">Brief observation period before you're ready to go home with a driver.</p>
                    </div>
                  </div>
                  <div className="flex gap-4">
                    <div className="w-8 h-8 bg-primary text-primary-foreground rounded-full flex items-center justify-center flex-shrink-0 font-bold">4</div>
                    <div>
                      <h4 className="font-semibold text-foreground mb-1">Ongoing Support</h4>
                      <p className="text-muted-foreground text-sm">Follow-up care and maintenance treatments as needed.</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-16 md:py-24 bg-background">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-6">
              Ready to Explore Ketamine Therapy?
            </h2>
            <p className="text-muted-foreground text-lg mb-8 max-w-2xl mx-auto">
              Schedule a consultation with our team to learn if ketamine infusion therapy is right for you.
            </p>
            <div className="flex flex-wrap gap-4 justify-center">
              <Button size="lg" className="bg-primary text-primary-foreground hover:bg-accent">
                Schedule Consultation
              </Button>
              <Button size="lg" variant="outline" className="border-primary text-primary hover:bg-primary hover:text-primary-foreground">
                Call 201-781-2101
              </Button>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default Ketamine;