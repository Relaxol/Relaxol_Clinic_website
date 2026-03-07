import { useState } from "react";
import { PageSEO } from "@/components/seo/PageSEO";
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
  X,
  Loader2
} from "lucide-react";
import { usePageContent } from "@/hooks/usePageContent";
import { VitaminInfusionsV1Content } from "@/lib/templates/newSchemas";
import { defaultVitaminInfusionsContent } from "@/lib/templates/newDefaults";

// Import infusion images (used as fallbacks)
import infusionQuench from "@/assets/infusion-quench-new.jpg";
import infusionEnergy from "@/assets/infusion-energy.jpg";
import infusionRecovery from "@/assets/infusion-recovery-new.jpg";
import infusionImmunity from "@/assets/infusion-immunity-new.jpg";
import infusionAlleviate from "@/assets/infusion-alleviate-v3.jpg";
import infusionBeauty from "@/assets/infusion-beauty-new.jpg";
import vitaminB12Injection from "@/assets/vitamin-b12-injection.jpg";
import nadInfusion from "@/assets/nad-infusion.jpg";

// Map infusion titles to fallback images
const infusionImageMap: Record<string, string> = {
  'Vital Energy': infusionEnergy,
  'Hydration Reset': infusionQuench,
  'Endurance Support': infusionRecovery,
  'Immune Reset': infusionImmunity,
  'Radiance': infusionBeauty,
  'Digestive Support': infusionAlleviate,
};

const VitaminInfusions = () => {
  const { content, loading } = usePageContent('vitamin-infusions');
  const hasContent = content && Object.keys(content).length > 0 && (content as any).hero;
  const c = (hasContent ? content : defaultVitaminInfusionsContent) as VitaminInfusionsV1Content;

  const [selectedInfusion, setSelectedInfusion] = useState<VitaminInfusionsV1Content['infusions']['items'][0] | null>(null);
  const [showB12Modal, setShowB12Modal] = useState(false);
  const [showNADModal, setShowNADModal] = useState(false);

  if (loading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
      </div>
    );
  }

  const getInfusionImage = (infusion: VitaminInfusionsV1Content['infusions']['items'][0]) => {
    return infusion.imageUrl || infusionImageMap[infusion.title] || infusionEnergy;
  };

  return (
    <div className="min-h-screen flex flex-col">
      <PageSEO
        title="IV Vitamin Infusions"
        description="Physician-supervised IV vitamin infusions for energy, immunity, recovery, and hydration in Englewood Cliffs, NJ. B12 injections and NAD+ therapy available."
        path="/vitamin-infusion-englewood"
      />
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
                  src={getInfusionImage(selectedInfusion)} 
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
                        <Check className="w-5 h-5 text-[hsl(var(--primary))] flex-shrink-0" />
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
                  className="w-full bg-accent hover:bg-accent/90 text-accent-foreground"
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
          <div 
            className="absolute inset-0 bg-cover bg-center bg-fixed"
            style={{
              backgroundImage: c.hero.backgroundImageUrl 
                ? `url('${c.hero.backgroundImageUrl}')` 
                : `url('https://images.unsplash.com/photo-1545205597-3d9d02c29597?auto=format&fit=crop&w=1920&q=80')`,
            }}
          />
          <div className="absolute inset-0 bg-gradient-to-b from-[hsl(var(--foreground))]/85 to-[hsl(var(--foreground))]/90" />
          
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            <div className="max-w-3xl mx-auto text-center text-white">
              {c.hero.badge && (
                <span className="inline-block px-4 py-1.5 bg-white/10 rounded-full text-sm font-medium mb-6">
                  {c.hero.badge}
                </span>
              )}
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight mb-6">
                {c.hero.headline}
              </h1>
              <p className="text-lg md:text-xl text-white/90 leading-relaxed mb-8">
                {c.hero.body}
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link to={c.hero.ctaHref || '/contact'}>
                  <Button size="lg" className="bg-accent hover:bg-accent/90 text-accent-foreground">
                    {c.hero.ctaLabel || 'Schedule Consultation'}
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* What is IV Vitamin Therapy */}
        <section className="py-16 lg:py-24 bg-background">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
              <div className="space-y-6">
                {c.about.subtitle && (
                  <span className="text-primary font-semibold text-sm uppercase tracking-widest">
                    {c.about.subtitle}
                  </span>
                )}
                <h2 className="text-3xl md:text-4xl font-semibold text-foreground leading-tight">
                  {c.about.title}
                </h2>
                {c.about.paragraphs.map((p, i) => (
                  <p key={i} className="text-muted-foreground leading-relaxed">{p}</p>
                ))}
                <div className="grid grid-cols-2 gap-4 pt-4">
                  {c.about.benefits.slice(0, 4).map((benefit, index) => (
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
                    {c.about.benefits.map((benefit, index) => (
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
              <h2 className="text-3xl md:text-4xl font-semibold text-primary italic">
                {c.infusions.title}
              </h2>
            </div>
            
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {c.infusions.items.map((infusion, index) => (
                <Card key={index} className="bg-background border-none shadow-lg hover:shadow-xl transition-all hover:-translate-y-1 overflow-hidden flex flex-col h-full">
                  <div className="aspect-[4/3] overflow-hidden flex-shrink-0">
                    <img 
                      src={getInfusionImage(infusion)} 
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
              <div className="rounded-2xl overflow-hidden shadow-xl">
                <img 
                  src={c.b12.imageUrl || vitaminB12Injection} 
                  alt={c.b12.imageAlt || 'Vitamin B12 Injection'}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="space-y-6">
                <h2 className="text-3xl md:text-4xl font-semibold text-foreground leading-tight">
                  {c.b12.title}
                </h2>
                {c.b12.paragraphs.map((p, i) => (
                  <p key={i} className="text-muted-foreground leading-relaxed">{p}</p>
                ))}
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
                src={c.b12.imageUrl || vitaminB12Injection} 
                alt={c.b12.imageAlt || 'Vitamin B12 Injection'}
                className="w-full h-48 object-cover rounded-lg"
              />
              
              <h3 className="text-2xl font-bold text-foreground">{c.b12.title}</h3>
              
              <p className="text-muted-foreground leading-relaxed">
                {c.b12.modalDescription}
              </p>
              
              <div className="grid grid-cols-2 gap-3">
                {c.b12.modalBenefits.map((benefit, i) => (
                  <div key={i} className="flex items-center gap-2 text-muted-foreground">
                    <Check className="w-5 h-5 text-primary flex-shrink-0" />
                    <span className="text-sm">{benefit}</span>
                  </div>
                ))}
              </div>
              
              <Button className="w-full bg-foreground hover:bg-foreground/90 text-background" asChild>
                <Link to="/contact">BOOK ONLINE</Link>
              </Button>
            </div>
          </DialogContent>
        </Dialog>

        {/* NAD & NAD+ Infusions Section */}
        <section className="py-16 lg:py-24 bg-card">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
              <div className="space-y-6 lg:order-1">
                <h2 className="text-3xl md:text-4xl font-semibold text-foreground leading-tight">
                  {c.nad.title}
                </h2>
                {c.nad.paragraphs.map((p, i) => (
                  <p key={i} className="text-muted-foreground leading-relaxed">{p}</p>
                ))}
                <Button 
                  className="bg-accent hover:bg-accent/90 text-accent-foreground shadow-glow hover:shadow-[0_0_0_1px_rgba(208,155,60,0.2),0_8px_24px_rgba(208,155,60,0.35)] transition-all duration-300"
                  onClick={() => setShowNADModal(true)}
                >
                  Learn more
                </Button>
              </div>
              <div className="rounded-2xl overflow-hidden shadow-xl lg:order-2">
                <img 
                  src={c.nad.imageUrl || nadInfusion} 
                  alt={c.nad.imageAlt || 'NAD+ IV Infusion'}
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
                src={c.nad.imageUrl || nadInfusion} 
                alt={c.nad.imageAlt || 'NAD+ Infusion'}
                className="w-full h-48 object-cover rounded-lg"
              />
              
              <h3 className="text-2xl font-bold text-foreground">{c.nad.title}</h3>
              
              <p className="text-muted-foreground leading-relaxed">{c.nad.modalDescription}</p>
              {c.nad.modalSubDescription && (
                <p className="text-muted-foreground leading-relaxed">{c.nad.modalSubDescription}</p>
              )}
              
              <div className="grid grid-cols-2 gap-3">
                {c.nad.modalBenefits.map((benefit, i) => (
                  <div key={i} className="flex items-center gap-2 text-muted-foreground">
                    <Check className="w-5 h-5 text-primary flex-shrink-0" />
                    <span className="text-sm">{benefit}</span>
                  </div>
                ))}
              </div>
              
              <Button className="w-full bg-foreground hover:bg-foreground/90 text-background" asChild>
                <Link to="/contact">BOOK ONLINE</Link>
              </Button>
            </div>
          </DialogContent>
        </Dialog>

        {/* Contact/Consultation Form */}
        <section className="py-16 lg:py-24 bg-foreground">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-start">
              <div className="text-background space-y-8">
                <div>
                  <h2 className="text-3xl md:text-4xl font-bold mb-4">
                    {c.contact.title}
                  </h2>
                  <p className="text-background/80 text-lg leading-relaxed">
                    {c.contact.body}
                  </p>
                </div>
                
                <div className="space-y-4">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-full bg-background/10 flex items-center justify-center">
                      <Phone className="w-5 h-5" />
                    </div>
                    <div>
                      <p className="text-background/60 text-sm">Call Us</p>
                      <a href={`tel:${c.contact.phone}`} className="text-lg font-medium hover:text-accent transition-colors">
                        {c.contact.phone}
                      </a>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-full bg-background/10 flex items-center justify-center">
                      <Mail className="w-5 h-5" />
                    </div>
                    <div>
                      <p className="text-background/60 text-sm">Email</p>
                      <a href={`mailto:${c.contact.email}`} className="text-lg font-medium hover:text-accent transition-colors">
                        {c.contact.email}
                      </a>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-full bg-background/10 flex items-center justify-center">
                      <MapPin className="w-5 h-5" />
                    </div>
                    <div>
                      <p className="text-background/60 text-sm">Location</p>
                      <p className="text-lg font-medium whitespace-pre-line">
                        {c.contact.address}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
              
              <Card className="bg-background border-none shadow-2xl">
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
                    
                    <Button type="submit" className="w-full bg-accent hover:bg-accent/90 text-accent-foreground">
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
