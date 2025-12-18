import { useState } from "react";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { toast } from "@/hooks/use-toast";
import { Phone, Mail, MapPin, Clock } from "lucide-react";
import { usePageContent } from "@/hooks/usePageContent";
import { ContactV1Content } from "@/lib/templates/schemas";

export default function Contact() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { content } = usePageContent('contact');
  
  const contactContent = content as ContactV1Content | null;
  
  // Extract content with defaults
  const heroSubtitle = contactContent?.hero?.subtitle ?? "Get In Touch";
  const heroHeadline = contactContent?.hero?.headline ?? "Contact Us";
  const heroBody = contactContent?.hero?.body ?? "We're here to answer your questions and help you begin your journey to wellness.";
  const formSubtitle = contactContent?.form?.subtitle ?? "SEND US A MESSAGE";
  const formTitle = contactContent?.form?.title ?? "Schedule a Consultation";
  const formBody = contactContent?.form?.body ?? "Fill out the form below and we'll contact you within one business day.";

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    setTimeout(() => {
      setIsSubmitting(false);
      toast({
        title: "Request Submitted",
        description: "We'll contact you during business hours.",
      });
    }, 1000);
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      {/* Hero Section */}
      <section className="relative py-20 md:py-28 bg-gradient-to-b from-[#5C4A3A] to-[#4A3C32]">
        <div className="container mx-auto px-4 text-center">
          <p className="text-primary text-sm font-semibold uppercase tracking-[0.3em] mb-4">
            {heroSubtitle}
          </p>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6">
            {heroHeadline}
          </h1>
          <p className="text-white/80 text-lg md:text-xl max-w-2xl mx-auto">
            {heroBody}
          </p>
        </div>
      </section>

      {/* Contact Info + Form Section */}
      <section className="py-16 md:py-24 bg-cream">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-12 max-w-6xl mx-auto">
            
            {/* Contact Information */}
            <div>
              <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-8">
                Relaxol Clinic
              </h2>
              
              <div className="space-y-6 mb-10">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                    <MapPin className="w-6 h-6 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-foreground mb-1">Address</h3>
                    <p className="text-muted-foreground">
                      560 Sylvan Avenue, Suite 2115<br />
                      Englewood Cliffs, NJ 07632
                    </p>
                  </div>
                </div>
                
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                    <Phone className="w-6 h-6 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-foreground mb-1">Phone</h3>
                    <a href="tel:201-781-2101" className="text-muted-foreground hover:text-primary transition-colors">
                      201-781-2101
                    </a>
                  </div>
                </div>
                
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                    <Mail className="w-6 h-6 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-foreground mb-1">Email</h3>
                    <a href="mailto:info@relaxolclinic.com" className="text-muted-foreground hover:text-primary transition-colors">
                      info@relaxolclinic.com
                    </a>
                  </div>
                </div>
                
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                    <Clock className="w-6 h-6 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-foreground mb-1">Hours</h3>
                    <p className="text-muted-foreground">
                      Monday – Friday: 9:00 AM – 5:00 PM<br />
                      Saturday – Sunday: Closed
                    </p>
                  </div>
                </div>
              </div>

              {/* Map Placeholder */}
              <div className="rounded-2xl overflow-hidden shadow-lg">
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3017.8!2d-73.95!3d40.88!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zNDDCsDUyJzQ4LjAiTiA3M8KwNTcnMDAuMCJX!5e0!3m2!1sen!2sus!4v1234567890"
                  width="100%"
                  height="250"
                  style={{ border: 0 }}
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  title="Relaxol Clinic Location"
                  className="grayscale hover:grayscale-0 transition-all duration-500"
                />
              </div>
            </div>

            {/* Contact Form */}
            <div className="bg-white rounded-3xl shadow-card p-8 md:p-10">
              <p className="text-primary text-sm font-semibold uppercase tracking-widest mb-2">
                {formSubtitle}
              </p>
              <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-2">
                {formTitle}
              </h2>
              <p className="text-muted-foreground mb-8">
                {formBody}
              </p>

              <form onSubmit={handleSubmit}>
                <div className="grid sm:grid-cols-2 gap-5 mb-5">
                  <div>
                    <label htmlFor="firstName" className="block text-sm font-medium text-foreground mb-2">
                      First Name *
                    </label>
                    <Input
                      id="firstName"
                      type="text"
                      required
                      className="h-12 rounded-xl border-border/50 bg-cream-light/30 focus:border-primary focus:bg-white transition-colors"
                      placeholder="Enter first name"
                    />
                  </div>
                  <div>
                    <label htmlFor="lastName" className="block text-sm font-medium text-foreground mb-2">
                      Last Name *
                    </label>
                    <Input
                      id="lastName"
                      type="text"
                      required
                      className="h-12 rounded-xl border-border/50 bg-cream-light/30 focus:border-primary focus:bg-white transition-colors"
                      placeholder="Enter last name"
                    />
                  </div>
                </div>

                <div className="grid sm:grid-cols-2 gap-5 mb-5">
                  <div>
                    <label htmlFor="phone" className="block text-sm font-medium text-foreground mb-2">
                      Phone *
                    </label>
                    <Input
                      id="phone"
                      type="tel"
                      required
                      className="h-12 rounded-xl border-border/50 bg-cream-light/30 focus:border-primary focus:bg-white transition-colors"
                      placeholder="(555) 123-4567"
                    />
                  </div>
                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-foreground mb-2">
                      Email *
                    </label>
                    <Input
                      id="email"
                      type="email"
                      required
                      className="h-12 rounded-xl border-border/50 bg-cream-light/30 focus:border-primary focus:bg-white transition-colors"
                      placeholder="email@example.com"
                    />
                  </div>
                </div>

                <div className="mb-5">
                  <label htmlFor="interest" className="block text-sm font-medium text-foreground mb-2">
                    I'm interested in *
                  </label>
                  <Select>
                    <SelectTrigger className="h-12 rounded-xl border-border/50 bg-cream-light/30 focus:border-primary">
                      <SelectValue placeholder="Select a treatment" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="spravato">SPRAVATO® Treatment</SelectItem>
                      <SelectItem value="ketamine">Ketamine Infusion Therapy</SelectItem>
                      <SelectItem value="vitamin">Vitamin Infusions</SelectItem>
                      <SelectItem value="pain">Pain Management</SelectItem>
                      <SelectItem value="consultation">General Consultation</SelectItem>
                      <SelectItem value="other">Other / Not Sure</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="mb-5">
                  <label htmlFor="comments" className="block text-sm font-medium text-foreground mb-2">
                    Tell us about your situation
                  </label>
                  <Textarea
                    id="comments"
                    className="min-h-[120px] rounded-xl border-border/50 bg-cream-light/30 focus:border-primary focus:bg-white transition-colors resize-none"
                    placeholder="Share anything you'd like us to know..."
                  />
                </div>

                <div className="mb-6">
                  <label className="flex items-start gap-3 cursor-pointer">
                    <input
                      type="checkbox"
                      className="w-5 h-5 rounded border-border text-primary mt-0.5"
                    />
                    <span className="text-sm text-muted-foreground">
                      I consent to receive communications from Relaxol Clinic. Message frequency varies. Reply STOP to unsubscribe.
                    </span>
                  </label>
                </div>

                <Button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full h-14 bg-[#D09B3C] hover:bg-[#B8862F] text-white text-lg"
                >
                  {isSubmitting ? "Submitting..." : "Send Message"}
                </Button>
              </form>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
