import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { 
  Zap, 
  Heart, 
  Shield, 
  Brain, 
  Sun, 
  Droplets,
  Sparkles,
  Phone,
  Mail,
  MapPin
} from "lucide-react";

const infusionTypes = [
  {
    icon: Zap,
    title: "Energy Boost",
    description: "Combat fatigue and restore your natural energy levels with our B-vitamin complex infusion.",
  },
  {
    icon: Shield,
    title: "Immune Support",
    description: "Strengthen your immune system with high-dose Vitamin C and essential minerals.",
  },
  {
    icon: Brain,
    title: "Cognitive Enhancement",
    description: "Improve mental clarity and focus with our brain-boosting nutrient blend.",
  },
  {
    icon: Heart,
    title: "Heart Health",
    description: "Support cardiovascular wellness with magnesium and antioxidant-rich formulations.",
  },
  {
    icon: Sun,
    title: "Skin Radiance",
    description: "Achieve glowing skin with glutathione and biotin-enriched IV therapy.",
  },
  {
    icon: Droplets,
    title: "Hydration Therapy",
    description: "Rapid rehydration with electrolytes for recovery and overall wellness.",
  },
];

const benefits = [
  "100% absorption directly into bloodstream",
  "Immediate effects within minutes",
  "Customized formulations for your needs",
  "Administered by licensed medical professionals",
  "Comfortable, relaxing treatment environment",
  "No downtime - return to activities immediately",
];

const VitaminInfusions = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-grow">
        {/* Hero Section */}
        <section className="relative py-20 lg:py-28 overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-[#5C4A3A] via-[#4A3C32] to-[#6B5A4A]" />
          
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            <div className="max-w-3xl mx-auto text-center text-white">
              <span className="inline-block px-4 py-1.5 bg-white/10 rounded-full text-sm font-medium mb-6">
                IV Vitamin Therapy
              </span>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight mb-6">
                Vitamin Infusion Therapy
              </h1>
              <p className="text-lg md:text-xl text-white/90 leading-relaxed mb-8">
                Experience the power of IV vitamin therapy at Relaxol Clinic in Englewood Cliffs, NJ. 
                Our customized infusions deliver essential nutrients directly to your bloodstream for 
                maximum absorption and immediate benefits.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button size="lg" className="bg-[#D09B3C] hover:bg-[#C48A25] text-white">
                  Schedule Consultation
                </Button>
                <Button size="lg" variant="outline" className="border-white text-white hover:bg-white/10">
                  Learn More
                </Button>
              </div>
            </div>
          </div>
        </section>

        {/* What is IV Vitamin Therapy */}
        <section className="py-16 lg:py-24 bg-background">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
              <div className="space-y-6">
                <span className="text-primary font-semibold text-sm uppercase tracking-widest">
                  About the Treatment
                </span>
                <h2 className="text-3xl md:text-4xl font-semibold text-foreground leading-tight">
                  What Is IV Vitamin Therapy?
                </h2>
                
                <p className="text-muted-foreground leading-relaxed">
                  IV Vitamin Therapy delivers vitamins, minerals, and other vital nutrients directly 
                  into your bloodstream, bypassing the digestive system for 100% absorption. This 
                  method allows your body to receive higher concentrations of nutrients than would 
                  be possible through oral supplements.
                </p>
                
                <p className="text-muted-foreground leading-relaxed">
                  At Relaxol Clinic, our medical team customizes each infusion to address your 
                  specific health goals—whether you're seeking increased energy, immune support, 
                  enhanced mental clarity, or overall wellness optimization.
                </p>

                <div className="grid grid-cols-2 gap-4 pt-4">
                  {benefits.slice(0, 4).map((benefit, index) => (
                    <div key={index} className="flex items-start gap-2">
                      <Sparkles className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" />
                      <span className="text-sm text-foreground">{benefit}</span>
                    </div>
                  ))}
                </div>
              </div>
              
              <div className="bg-gradient-to-br from-primary/10 via-secondary/20 to-primary/5 rounded-2xl p-8 lg:p-12">
                <div className="text-center space-y-6">
                  <Droplets className="w-16 h-16 text-primary mx-auto" />
                  <h3 className="text-2xl font-semibold text-foreground">
                    Why Choose IV Therapy?
                  </h3>
                  <ul className="text-left space-y-3">
                    {benefits.map((benefit, index) => (
                      <li key={index} className="flex items-center gap-3 text-muted-foreground">
                        <div className="w-2 h-2 bg-primary rounded-full flex-shrink-0" />
                        {benefit}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Infusion Types */}
        <section className="py-16 lg:py-24 bg-card">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center max-w-2xl mx-auto mb-12">
              <span className="text-primary font-semibold text-sm uppercase tracking-widest">
                Our Treatments
              </span>
              <h2 className="text-3xl md:text-4xl font-semibold text-foreground mt-4">
                Vitamin Infusion Options
              </h2>
              <p className="text-muted-foreground mt-4">
                Choose from our range of customized IV vitamin infusions designed to meet your 
                specific health and wellness needs.
              </p>
            </div>
            
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {infusionTypes.map((infusion, index) => (
                <Card key={index} className="bg-background border-none shadow-lg hover:shadow-xl transition-shadow">
                  <CardContent className="p-6">
                    <div className="w-14 h-14 rounded-xl bg-primary/10 flex items-center justify-center mb-4">
                      <infusion.icon className="w-7 h-7 text-primary" />
                    </div>
                    <h3 className="text-xl font-semibold text-foreground mb-3">
                      {infusion.title}
                    </h3>
                    <p className="text-muted-foreground leading-relaxed">
                      {infusion.description}
                    </p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Contact/Consultation Form */}
        <section className="py-16 lg:py-24 bg-[#5C4A3A]">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-start">
              {/* Left: Contact Info */}
              <div className="text-white space-y-8">
                <div>
                  <h2 className="text-3xl md:text-4xl font-bold mb-4">
                    Ready to Feel Your Best?
                  </h2>
                  <p className="text-white/80 text-lg leading-relaxed">
                    Schedule a consultation to discuss which vitamin infusion is right for you. 
                    Our medical team will create a personalized treatment plan based on your 
                    health goals.
                  </p>
                </div>
                
                <div className="space-y-4">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-full bg-white/10 flex items-center justify-center">
                      <Phone className="w-5 h-5" />
                    </div>
                    <div>
                      <p className="text-white/60 text-sm">Call Us</p>
                      <a href="tel:201-781-2101" className="text-lg font-medium hover:text-[#D09B3C] transition-colors">
                        201-781-2101
                      </a>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-full bg-white/10 flex items-center justify-center">
                      <Mail className="w-5 h-5" />
                    </div>
                    <div>
                      <p className="text-white/60 text-sm">Email</p>
                      <a href="mailto:info@relaxolclinic.com" className="text-lg font-medium hover:text-[#D09B3C] transition-colors">
                        info@relaxolclinic.com
                      </a>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-full bg-white/10 flex items-center justify-center">
                      <MapPin className="w-5 h-5" />
                    </div>
                    <div>
                      <p className="text-white/60 text-sm">Location</p>
                      <p className="text-lg font-medium">
                        560 Sylvan Avenue, Suite 2115<br />
                        Englewood Cliffs, NJ 07632
                      </p>
                    </div>
                  </div>
                </div>
              </div>
              
              {/* Right: Form */}
              <Card className="bg-white border-none shadow-2xl">
                <CardContent className="p-6 md:p-8">
                  <h3 className="text-2xl font-semibold text-foreground mb-6">
                    Request a Consultation
                  </h3>
                  
                  <form className="space-y-4">
                    <div className="grid sm:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="firstName">First Name</Label>
                        <Input id="firstName" placeholder="John" />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="lastName">Last Name</Label>
                        <Input id="lastName" placeholder="Doe" />
                      </div>
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="email">Email</Label>
                      <Input id="email" type="email" placeholder="john@example.com" />
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="phone">Phone Number</Label>
                      <Input id="phone" type="tel" placeholder="(201) 555-0123" />
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="interest">Treatment Interest</Label>
                      <Input id="interest" placeholder="e.g., Energy Boost, Immune Support" />
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="message">Message (Optional)</Label>
                      <Textarea 
                        id="message" 
                        placeholder="Tell us about your health goals..."
                        rows={3}
                      />
                    </div>
                    
                    <Button type="submit" className="w-full bg-[#D09B3C] hover:bg-[#C48A25] text-white">
                      Submit Request
                    </Button>
                  </form>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>
      </main>
      
      <Footer />
    </div>
  );
};

export default VitaminInfusions;
