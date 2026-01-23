import { useState } from "react";
import { Link } from "react-router-dom";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { 
  Sparkles,
  Phone,
  Mail,
  MapPin,
  Droplets,
  Check,
  X
} from "lucide-react";

// Import infusion images
import infusionQuench from "@/assets/infusion-quench-new.jpg";
import infusionEnergy from "@/assets/infusion-energy.jpg";
import infusionRecovery from "@/assets/infusion-recovery-new.jpg";
import infusionImmunity from "@/assets/infusion-immunity-new.jpg";
import infusionAlleviate from "@/assets/infusion-alleviate-v3.jpg";
import infusionBeauty from "@/assets/infusion-beauty-new.jpg";
import vitaminB12Injection from "@/assets/vitamin-b12-injection.jpg";
import nadInfusion from "@/assets/nad-infusion.jpg";

const infusionTypes = [
  {
    image: infusionEnergy,
    title: "Vital Energy",
    description: "Our Vital Energy infusion supports fat metabolism and boosts energy.",
    fullDescription: "The Vital Energy IV infusion is formulated to kickstart your metabolism and enhance your energy levels. This blend of B vitamins and amino acids helps your body convert food into energy more efficiently, supporting weight management and athletic performance.",
    benefits: [
      "Boosts metabolism",
      "Increases energy levels",
      "Supports fat burning",
      "Enhances athletic performance",
      "Reduces fatigue"
    ],
    ingredients: "B-Complex Vitamins, Vitamin B12, L-Carnitine, MIC (Methionine, Inositol, Choline)",
    duration: "30-45 minutes",
  },
  {
    image: infusionQuench,
    title: "Hydration Reset",
    description: "Reset hydration levels and replenish essential vitamins with our Hydration Reset infusion.",
    fullDescription: "Our Hydration Reset IV infusion is designed to combat dehydration and restore your body's essential vitamins and minerals. Whether you're recovering from illness, jet lag, or simply feeling run down, this hydrating therapy delivers fluids and nutrients directly to your bloodstream for immediate relief.",
    benefits: [
      "Rapid rehydration",
      "Restores electrolyte balance",
      "Relieves fatigue and headaches",
      "Improves skin hydration",
      "Supports kidney function"
    ],
    ingredients: "Normal Saline, B-Complex Vitamins, Vitamin B12, Vitamin C, Magnesium",
    duration: "30-45 minutes",
  },
  {
    image: infusionRecovery,
    title: "Endurance Support",
    description: "Replenish nutrients and support recovery with our Endurance Support infusion.",
    fullDescription: "Designed for athletes and active individuals, our Endurance Support IV infusion helps replenish nutrients lost during intense physical activity. This powerful blend supports muscle recovery, reduces inflammation, and helps you get back to peak performance faster.",
    benefits: [
      "Accelerates muscle recovery",
      "Reduces inflammation",
      "Replenishes electrolytes",
      "Reduces muscle soreness",
      "Enhances endurance"
    ],
    ingredients: "Normal Saline, B-Complex, Vitamin C, Glutathione, Magnesium, Zinc, Amino Acids",
    duration: "45-60 minutes",
  },
  {
    image: infusionImmunity,
    title: "Immune Reset",
    description: "Boost your body's defenses with our Immune Support infusion.",
    fullDescription: "Our Immune Reset IV infusion delivers a powerful dose of immune-boosting vitamins and antioxidants directly to your bloodstream. High-dose Vitamin C, Zinc, and other essential nutrients help strengthen your body's natural defenses against illness and infection.",
    benefits: [
      "Strengthens immune system",
      "High-dose Vitamin C therapy",
      "Protects against infections",
      "Reduces cold and flu duration",
      "Powerful antioxidant support"
    ],
    ingredients: "High-Dose Vitamin C, Zinc, B-Complex, Vitamin D, Glutathione",
    duration: "45-60 minutes",
  },
  {
    image: infusionBeauty,
    title: "Radiance",
    description: "Minimizes wrinkles while replenishing and refreshing skin.",
    fullDescription: "Our Radiance IV infusion delivers a powerful blend of antioxidants and skin-nourishing vitamins that work from the inside out. Glutathione, Biotin, and Vitamin C help reduce the appearance of fine lines, brighten skin tone, and promote healthy hair and nails.",
    benefits: [
      "Reduces fine lines and wrinkles",
      "Brightens and evens skin tone",
      "Strengthens hair and nails",
      "Powerful antioxidant detox",
      "Promotes collagen production"
    ],
    ingredients: "Glutathione, Vitamin C, Biotin, B-Complex, Zinc",
    duration: "45-60 minutes",
  },
  {
    image: infusionAlleviate,
    title: "Digestive Support",
    description: "Eases abdominal discomfort and promotes digestive wellness.",
    fullDescription: "The Digestive Support IV infusion is specially formulated to help reduce abdominal discomfort, bloating, and symptoms associated with PMS or digestive issues. This soothing blend of vitamins and minerals helps relax muscles and reduce inflammation for lasting relief.",
    benefits: [
      "Reduces bloating and cramping",
      "Relieves PMS symptoms",
      "Relaxes muscle tension",
      "Reduces inflammation",
      "Promotes digestive comfort"
    ],
    ingredients: "Calcium, Magnesium, B-Complex, Vitamin B12, Anti-inflammatory compounds",
    duration: "30-45 minutes",
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
  const [selectedInfusion, setSelectedInfusion] = useState<typeof infusionTypes[0] | null>(null);
  const [showB12Modal, setShowB12Modal] = useState(false);
  const [showNADModal, setShowNADModal] = useState(false);
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      {/* Infusion Detail Modal */}
      <Dialog open={!!selectedInfusion} onOpenChange={(open) => !open && setSelectedInfusion(null)}>
        <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
          {selectedInfusion && (
            <>
              <DialogHeader>
                <DialogTitle className="text-2xl font-bold text-foreground">
                  {selectedInfusion.title}
                </DialogTitle>
              </DialogHeader>
              
              <div className="space-y-6 mt-4">
                <img 
                  src={selectedInfusion.image} 
                  alt={selectedInfusion.title}
                  className="w-full h-48 object-cover rounded-lg"
                />
                
                <p className="text-muted-foreground leading-relaxed">
                  {selectedInfusion.fullDescription}
                </p>
                
                <div>
                  <h4 className="font-semibold text-foreground mb-3">Benefits</h4>
                  <ul className="space-y-2">
                    {selectedInfusion.benefits.map((benefit, index) => (
                      <li key={index} className="flex items-center gap-2 text-muted-foreground">
                        <Check className="w-5 h-5 text-[#8B7355] flex-shrink-0" />
                        {benefit}
                      </li>
                    ))}
                  </ul>
                </div>
                
                <div className="grid sm:grid-cols-2 gap-4 bg-muted/50 rounded-lg p-4">
                  <div>
                    <h4 className="font-semibold text-foreground text-sm mb-1">Key Ingredients</h4>
                    <p className="text-muted-foreground text-sm">{selectedInfusion.ingredients}</p>
                  </div>
                  <div>
                    <h4 className="font-semibold text-foreground text-sm mb-1">Treatment Duration</h4>
                    <p className="text-muted-foreground text-sm">{selectedInfusion.duration}</p>
                  </div>
                </div>
                
                <Button 
                  className="w-full bg-[#D09B3C] hover:bg-[#C48A25] text-white"
                  onClick={() => setSelectedInfusion(null)}
                >
                  Schedule This Treatment
                </Button>
              </div>
            </>
          )}
        </DialogContent>
      </Dialog>
      
      <main className="flex-grow">
        {/* Hero Section with Parallax */}
        <section className="relative py-24 lg:py-32 overflow-hidden">
          {/* Parallax Background */}
          <div 
            className="absolute inset-0 bg-cover bg-center bg-fixed"
            style={{
              backgroundImage: `url('https://images.unsplash.com/photo-1545205597-3d9d02c29597?auto=format&fit=crop&w=1920&q=80')`,
            }}
          />
          {/* Overlay */}
          <div className="absolute inset-0 bg-gradient-to-b from-[#5C4A3A]/85 to-[#4A3C32]/90" />
          
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

        {/* Vitamin Infusions We Offer */}
        <section className="py-16 lg:py-24 bg-card">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center max-w-2xl mx-auto mb-12">
              <h2 className="text-3xl md:text-4xl font-semibold text-[#8B7355] italic">
                Vitamin Infusions We Offer
              </h2>
            </div>
            
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {infusionTypes.map((infusion, index) => (
                <Card key={index} className="bg-background border-none shadow-lg hover:shadow-xl transition-all hover:-translate-y-1 overflow-hidden flex flex-col h-full">
                  <div className="aspect-[4/3] overflow-hidden flex-shrink-0">
                    <img 
                      src={infusion.image} 
                      alt={infusion.title}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <CardContent className="p-6 text-center flex flex-col flex-1">
                    <h3 className="text-xl font-semibold text-foreground mb-3">
                      {infusion.title}
                    </h3>
                    <p className="text-muted-foreground leading-relaxed mb-4 flex-1">
                      {infusion.description}
                    </p>
                    <Button 
                      className="bg-accent hover:bg-accent/90 text-accent-foreground mt-auto shadow-glow hover:shadow-[0_0_0_1px_rgba(208,155,60,0.2),0_8px_24px_rgba(208,155,60,0.35)] transition-all duration-300"
                      onClick={() => setSelectedInfusion(infusion)}
                    >
                      Learn more
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Vitamin B12 Injections Section */}
        <section className="py-16 lg:py-24 bg-background">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
              {/* Left: Image */}
              <div className="rounded-2xl overflow-hidden shadow-xl">
                <img 
                  src={vitaminB12Injection} 
                  alt="Vitamin B12 Injection"
                  className="w-full h-full object-cover"
                />
              </div>
              
              {/* Right: Content */}
              <div className="space-y-6">
                <h2 className="text-3xl md:text-4xl font-semibold text-foreground leading-tight">
                  Vitamin B12 Injections
                </h2>
                
                <p className="text-muted-foreground leading-relaxed">
                  Vitamin B12 supports natural energy, healthy metabolism, and overall vitality. It plays an important role in red blood cell production, nerve health, and helping the body turn food into usable energy.
                </p>
                
                <p className="text-muted-foreground leading-relaxed">
                  B12 injections deliver this essential vitamin directly into the muscle, allowing for better absorption and helping support energy levels, mental clarity, and physical wellness.
                </p>
                
                <p className="text-muted-foreground leading-relaxed">
                  Low B12 levels are common, especially for those following vegetarian or vegan lifestyles, and supplementation can help restore balance and support day-to-day wellbeing.
                </p>
                
                <Button 
                  className="bg-accent hover:bg-accent/90 text-accent-foreground shadow-glow hover:shadow-[0_0_0_1px_rgba(208,155,60,0.2),0_8px_24px_rgba(208,155,60,0.35)] transition-all duration-300"
                  onClick={() => setShowB12Modal(true)}
                >
                  Learn more
                </Button>
              </div>
            </div>
          </div>
        </section>

        {/* B12 Modal */}
        <Dialog open={showB12Modal} onOpenChange={setShowB12Modal}>
          <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
            <button 
              onClick={() => setShowB12Modal(false)} 
              className="absolute right-4 top-4 text-muted-foreground hover:text-foreground"
            >
              <X className="w-5 h-5" />
            </button>
            
            <div className="space-y-6 mt-2">
              <img 
                src={vitaminB12Injection} 
                alt="Vitamin B12 Injection"
                className="w-full h-48 object-cover rounded-lg"
              />
              
              <h3 className="text-2xl font-bold text-foreground">
                Vitamin B12 Injections
              </h3>
              
              <p className="text-muted-foreground leading-relaxed">
                Vitamin B12 is essential for energy, brain function, and overall health, but your body needs a protein called intrinsic factor, produced in the stomach, to absorb it properly. If your body doesn't produce enough, a deficiency can occur. Intramuscular B12 injections are an effective way to restore healthy B12 levels and support your wellbeing.
              </p>
              
              <div className="grid grid-cols-2 gap-3">
                <div className="flex items-center gap-2 text-muted-foreground">
                  <Check className="w-5 h-5 text-[#8B7355] flex-shrink-0" />
                  <span className="text-sm">Boosts energy levels</span>
                </div>
                <div className="flex items-center gap-2 text-muted-foreground">
                  <Check className="w-5 h-5 text-[#8B7355] flex-shrink-0" />
                  <span className="text-sm">Supports brain function and concentration</span>
                </div>
                <div className="flex items-center gap-2 text-muted-foreground">
                  <Check className="w-5 h-5 text-[#8B7355] flex-shrink-0" />
                  <span className="text-sm">Improves metabolism</span>
                </div>
                <div className="flex items-center gap-2 text-muted-foreground">
                  <Check className="w-5 h-5 text-[#8B7355] flex-shrink-0" />
                  <span className="text-sm">Helps prevent anemia</span>
                </div>
                <div className="flex items-center gap-2 text-muted-foreground">
                  <Check className="w-5 h-5 text-[#8B7355] flex-shrink-0" />
                  <span className="text-sm">Supports mood and may relieve depression</span>
                </div>
                <div className="flex items-center gap-2 text-muted-foreground">
                  <Check className="w-5 h-5 text-[#8B7355] flex-shrink-0" />
                  <span className="text-sm">Strengthens immunity</span>
                </div>
                <div className="flex items-center gap-2 text-muted-foreground">
                  <Check className="w-5 h-5 text-[#8B7355] flex-shrink-0" />
                  <span className="text-sm">Promotes bone health and reduces risk of osteoporosis</span>
                </div>
                <div className="flex items-center gap-2 text-muted-foreground">
                  <Check className="w-5 h-5 text-[#8B7355] flex-shrink-0" />
                  <span className="text-sm">Enhances heart health</span>
                </div>
                <div className="flex items-center gap-2 text-muted-foreground">
                  <Check className="w-5 h-5 text-[#8B7355] flex-shrink-0" />
                  <span className="text-sm">Improves sleep quality</span>
                </div>
                <div className="flex items-center gap-2 text-muted-foreground">
                  <Check className="w-5 h-5 text-[#8B7355] flex-shrink-0" />
                  <span className="text-sm">Supports healthy hair, skin, and nails</span>
                </div>
                <div className="flex items-center gap-2 text-muted-foreground">
                  <Check className="w-5 h-5 text-[#8B7355] flex-shrink-0" />
                  <span className="text-sm">Reduces hair loss</span>
                </div>
                <div className="flex items-center gap-2 text-muted-foreground">
                  <Check className="w-5 h-5 text-[#8B7355] flex-shrink-0" />
                  <span className="text-sm">Supports red blood cell formation</span>
                </div>
              </div>
              
              <Button 
                className="w-full bg-[#5C4A3A] hover:bg-[#4A3C32] text-white"
                asChild
              >
                <Link to="/contact">BOOK ONLINE</Link>
              </Button>
            </div>
          </DialogContent>
        </Dialog>

        {/* NAD & NAD+ Infusions Section */}
        <section className="py-16 lg:py-24 bg-card">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
              {/* Left: Content */}
              <div className="space-y-6 lg:order-1">
                <h2 className="text-3xl md:text-4xl font-semibold text-foreground leading-tight">
                  NAD & NAD+ Infusions
                </h2>
                
                <p className="text-muted-foreground leading-relaxed">
                  Nicotinamide adenine dinucleotide (NAD+) is a naturally occurring coenzyme found in nearly every cell of the body. It plays a vital role in cellular energy production, metabolism, and overall cellular health.
                </p>
                
                <p className="text-muted-foreground leading-relaxed">
                  NAD+ supports healthy aging, mental clarity, athletic performance, and the body's natural repair processes. It is widely used in wellness and functional medicine to help promote balance, resilience, and recovery at a cellular level.
                </p>
                
                <p className="text-muted-foreground leading-relaxed">
                  Delivering NAD+ through an IV infusion allows for faster absorption and more efficient results compared to oral supplementation, helping optimize NAD+ levels and support whole-body vitality.
                </p>
                
                <Button 
                  className="bg-accent hover:bg-accent/90 text-accent-foreground shadow-glow hover:shadow-[0_0_0_1px_rgba(208,155,60,0.2),0_8px_24px_rgba(208,155,60,0.35)] transition-all duration-300"
                  onClick={() => setShowNADModal(true)}
                >
                  Learn more
                </Button>
              </div>
              
              {/* Right: Image */}
              <div className="rounded-2xl overflow-hidden shadow-xl lg:order-2">
                <img 
                  src={nadInfusion} 
                  alt="NAD+ IV Infusion"
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
          </div>
        </section>

        {/* NAD Modal */}
        <Dialog open={showNADModal} onOpenChange={setShowNADModal}>
          <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
            <button 
              onClick={() => setShowNADModal(false)} 
              className="absolute right-4 top-4 text-muted-foreground hover:text-foreground"
            >
              <X className="w-5 h-5" />
            </button>
            
            <div className="space-y-6 mt-2">
              <img 
                src={nadInfusion} 
                alt="NAD+ Infusion"
                className="w-full h-48 object-cover rounded-lg"
              />
              
              <h3 className="text-2xl font-bold text-foreground">
                NAD+ Infusions
              </h3>
              
              <p className="text-muted-foreground leading-relaxed">
                NAD+ is a vital molecule our bodies naturally produce, but like many things, its levels decline with age. Often called a "miracle molecule," NAD+ is known for supporting healthy aging and is considered one of the closest things we have to a "fountain of youth."
              </p>
              
              <p className="text-muted-foreground leading-relaxed">
                When administered intravenously, NAD+ helps activate enzymes called sirtuins, which support your body's natural repair processes, promote overall wellness, and help reduce the effects of aging.
              </p>
              
              <div className="grid grid-cols-2 gap-3">
                <div className="flex items-center gap-2 text-muted-foreground">
                  <Check className="w-5 h-5 text-[#8B7355] flex-shrink-0" />
                  <span className="text-sm">Pain alleviation</span>
                </div>
                <div className="flex items-center gap-2 text-muted-foreground">
                  <Check className="w-5 h-5 text-[#8B7355] flex-shrink-0" />
                  <span className="text-sm">Anti-aging benefits</span>
                </div>
                <div className="flex items-center gap-2 text-muted-foreground">
                  <Check className="w-5 h-5 text-[#8B7355] flex-shrink-0" />
                  <span className="text-sm">Increased energy</span>
                </div>
                <div className="flex items-center gap-2 text-muted-foreground">
                  <Check className="w-5 h-5 text-[#8B7355] flex-shrink-0" />
                  <span className="text-sm">Increased metabolism</span>
                </div>
                <div className="flex items-center gap-2 text-muted-foreground">
                  <Check className="w-5 h-5 text-[#8B7355] flex-shrink-0" />
                  <span className="text-sm">Reduced inflammation</span>
                </div>
                <div className="flex items-center gap-2 text-muted-foreground">
                  <Check className="w-5 h-5 text-[#8B7355] flex-shrink-0" />
                  <span className="text-sm">Prevent and correct DNA damage</span>
                </div>
              </div>
              
              <div className="flex items-center gap-2 text-muted-foreground">
                <Check className="w-5 h-5 text-[#8B7355] flex-shrink-0" />
                <span className="text-sm">Alleviate opiate or substance withdrawal symptoms</span>
              </div>
              
              <Button 
                className="w-full bg-[#5C4A3A] hover:bg-[#4A3C32] text-white"
                asChild
              >
                <Link to="/contact">BOOK ONLINE</Link>
              </Button>
            </div>
          </DialogContent>
        </Dialog>

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
                        <Label htmlFor="firstName">First Name <span className="text-destructive">*</span></Label>
                        <Input id="firstName" placeholder="John" required />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="lastName">Last Name <span className="text-destructive">*</span></Label>
                        <Input id="lastName" placeholder="Doe" required />
                      </div>
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="email">Email <span className="text-destructive">*</span></Label>
                      <Input id="email" type="email" placeholder="john@example.com" required />
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="phone">Phone Number <span className="text-destructive">*</span></Label>
                      <Input id="phone" type="tel" placeholder="(201) 555-0123" required />
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
