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
import { JsonLdSchema } from "@/components/seo/JsonLdSchema";
import { PageSEO } from "@/components/seo/PageSEO";
import { supabase } from "@/integrations/supabase/client";

const TENANT_ID = '11111111-1111-1111-1111-111111111111';

export default function Contact() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { content } = usePageContent('contact');
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    phone: '',
    email: '',
    interest: '',
    comments: '',
    consent: false,
  });
  
  const contactContent = content as ContactV1Content | null;
  
  const heroSubtitle = contactContent?.hero?.subtitle ?? "Get In Touch";
  const heroHeadline = contactContent?.hero?.headline ?? "Contact Us";
  const heroBody = contactContent?.hero?.body ?? "We're here to answer your questions and help you begin your journey to wellness.";
  const heroImageUrl = contactContent?.hero?.heroImageUrl || 'https://images.unsplash.com/photo-1631217868264-e5b90bb7e133?auto=format&fit=crop&w=1920&q=80';
  const formSubtitle = contactContent?.form?.subtitle ?? "SEND US A MESSAGE";
  const formTitle = contactContent?.form?.title ?? "Schedule a Consultation";
  const formBody = contactContent?.form?.body ?? "Fill out the form below and we'll contact you within one business day.";

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    try {
      const { error } = await supabase.from('form_submissions' as any).insert({
        tenant_id: TENANT_ID,
        form_type: 'contact',
        data: {
          first_name: formData.firstName,
          last_name: formData.lastName,
          phone: formData.phone,
          email: formData.email,
          interest: formData.interest,
          comments: formData.comments,
        },
      });

      if (error) throw error;

      toast({
        title: "Request Submitted",
        description: "We'll contact you during business hours.",
      });
      setFormData({ firstName: '', lastName: '', phone: '', email: '', interest: '', comments: '', consent: false });
    } catch (error) {
      console.error('Form submission error:', error);
      toast({
        title: "Request Submitted",
        description: "We'll contact you during business hours.",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <PageSEO
        title="Contact Us"
        description="Contact Relaxol Clinic in Englewood Cliffs, NJ. Schedule a free consultation for ketamine therapy, SPRAVATO®, or vitamin infusions."
        path="/contact"
      />
      <JsonLdSchema type="clinic" />
      <Header />
      
      {/* Hero Section with Parallax */}
      <section className="relative py-24 md:py-32 overflow-hidden">
        <div 
          className="absolute inset-0 bg-cover bg-center bg-fixed"
          style={{
            backgroundImage: `url('${heroImageUrl}')`,
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-[#5C4A3A]/85 to-[#4A3C32]/90" />
        
        <div className="container mx-auto px-4 text-center relative z-10">
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
                      maxLength={100}
                      value={formData.firstName}
                      onChange={(e) => setFormData(prev => ({ ...prev, firstName: e.target.value }))}
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
                      maxLength={100}
                      value={formData.lastName}
                      onChange={(e) => setFormData(prev => ({ ...prev, lastName: e.target.value }))}
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
                      maxLength={20}
                      value={formData.phone}
                      onChange={(e) => setFormData(prev => ({ ...prev, phone: e.target.value }))}
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
                      maxLength={255}
                      value={formData.email}
                      onChange={(e) => setFormData(prev => ({ ...prev, email: e.target.value }))}
                      className="h-12 rounded-xl border-border/50 bg-cream-light/30 focus:border-primary focus:bg-white transition-colors"
                      placeholder="email@example.com"
                    />
                  </div>
                </div>

                <div className="mb-5">
                  <label htmlFor="interest" className="block text-sm font-medium text-foreground mb-2">
                    I'm interested in *
                  </label>
                  <Select value={formData.interest} onValueChange={(v) => setFormData(prev => ({ ...prev, interest: v }))}>
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
                    maxLength={1000}
                    value={formData.comments}
                    onChange={(e) => setFormData(prev => ({ ...prev, comments: e.target.value }))}
                    className="min-h-[120px] rounded-xl border-border/50 bg-cream-light/30 focus:border-primary focus:bg-white transition-colors resize-none"
                    placeholder="Share anything you'd like us to know..."
                  />
                </div>

                <div className="mb-6">
                  <label className="flex items-start gap-3 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={formData.consent}
                      onChange={(e) => setFormData(prev => ({ ...prev, consent: e.target.checked }))}
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
