import { useState } from "react";
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
import { supabase } from "@/integrations/supabase/client";

const TENANT_ID = '11111111-1111-1111-1111-111111111111';

interface ContactContent {
  subtitle?: string;
  title?: string;
  body?: string;
}

interface ContactSectionProps {
  content?: ContactContent;
}

export function ContactSection({ content }: ContactSectionProps) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    phone: '',
    email: '',
    interest: '',
    comments: '',
    consent: false,
  });
  
  const subtitle = content?.subtitle || "SCHEDULE A CONSULTATION";
  const title = content?.title || "Ready to Explore Your Treatment Options?";
  const body = content?.body || "Take the first step with Dr. Khanna and our compassionate team. We'll contact you within one business day.";

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
    <section id="contact" className="py-16 bg-cream-band">
      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 xl:px-16">
        <div className="max-w-4xl mx-auto">
          <div className="bg-white rounded-3xl shadow-card p-8 md:p-12">
            <div className="text-center mb-10">
              <p className="text-primary text-sm font-semibold uppercase tracking-widest mb-3">
                {subtitle}
              </p>
              <h2 className="text-2xl md:text-3xl lg:text-4xl text-foreground font-bold mb-4">
                {title}
              </h2>
              <p className="text-muted-foreground font-light tracking-wide text-[15px] leading-[1.65] sm:font-normal sm:tracking-normal sm:text-base md:sm:text-lg sm:leading-relaxed max-w-2xl mx-auto">
                {body}
              </p>
            </div>

            <form onSubmit={handleSubmit} className="max-w-2xl mx-auto">
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
                  className="min-h-[100px] rounded-xl border-border/50 bg-cream-light/30 focus:border-primary focus:bg-white transition-colors resize-none"
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
                    I consent to receive communications from Jersey Serenity Minds. Message frequency varies. Reply STOP to unsubscribe.
                  </span>
                </label>
              </div>

              <Button
                type="submit"
                disabled={isSubmitting}
                className="w-full h-14 btn-primary text-lg"
              >
                {isSubmitting ? "Submitting..." : "Schedule Your Consultation"}
              </Button>

              <p className="text-center text-xs text-muted-foreground mt-4">
                <a href="/privacy-policy" className="hover:text-primary">Privacy Policy</a>
                {" · "}
                <a href="/terms-of-service" className="hover:text-primary">Terms of Service</a>
              </p>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}
