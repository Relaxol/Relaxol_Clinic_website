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
  
  const subtitle = content?.subtitle || "SCHEDULE A CONSULTATION";
  const title = content?.title || "Ready to Explore Your Treatment Options?";
  const body = content?.body || "Take the first step with Dr. Khanna and our compassionate team. We'll contact you within one business day.";

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate form submission
    setTimeout(() => {
      setIsSubmitting(false);
      toast({
        title: "Request Submitted",
        description: "We'll contact you during business hours.",
      });
    }, 1000);
  };

  return (
    <section id="contact" className="py-16 bg-cream-band">
      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 xl:px-16">
        <div className="max-w-4xl mx-auto">
          {/* Integrated card design matching doctor section */}
          <div className="bg-white rounded-3xl shadow-card p-8 md:p-12">
            {/* Header inside card */}
            <div className="text-center mb-10">
              <p className="text-primary text-sm font-semibold uppercase tracking-widest mb-3">
                {subtitle}
              </p>
              <h2 className="text-2xl md:text-3xl lg:text-4xl text-foreground font-bold mb-4">
                {title}
              </h2>
              <p className="text-muted-foreground text-base md:text-lg max-w-2xl mx-auto">
                {body}
              </p>
            </div>

            {/* Form */}
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
                  className="min-h-[100px] rounded-xl border-border/50 bg-cream-light/30 focus:border-primary focus:bg-white transition-colors resize-none"
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
