import { useState } from "react";
import { ContactSectionData } from "@/lib/sections/registry";
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

interface Props {
  data: ContactSectionData;
}

export function DynamicContact({ data }: Props) {
  const [isSubmitting, setIsSubmitting] = useState(false);

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
    <section 
      id="contact" 
      className="py-16 bg-cream-band"
      data-section-id={data.sectionId}
      data-section-type={data.type}
    >
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          <div className="bg-card rounded-3xl shadow-card p-8 md:p-12">
            <div className="text-center mb-10">
              {data.subtitle && (
                <p className="text-primary text-sm font-semibold uppercase tracking-widest mb-3">
                  {data.subtitle}
                </p>
              )}
              <h2 className="text-2xl md:text-3xl lg:text-4xl text-foreground font-bold mb-4">
                {data.title}
              </h2>
              {data.body && (
                <p className="text-muted-foreground text-base md:text-lg max-w-2xl mx-auto">
                  {data.body}
                </p>
              )}
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
                    className="h-12 rounded-xl border-border/50 bg-cream-light/30 focus:border-primary focus:bg-card transition-colors"
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
                    className="h-12 rounded-xl border-border/50 bg-cream-light/30 focus:border-primary focus:bg-card transition-colors"
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
                    className="h-12 rounded-xl border-border/50 bg-cream-light/30 focus:border-primary focus:bg-card transition-colors"
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
                    className="h-12 rounded-xl border-border/50 bg-cream-light/30 focus:border-primary focus:bg-card transition-colors"
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
                  className="min-h-[100px] rounded-xl border-border/50 bg-cream-light/30 focus:border-primary focus:bg-card transition-colors resize-none"
                  placeholder="Share anything you'd like us to know..."
                />
              </div>

              <Button
                type="submit"
                disabled={isSubmitting}
                className="w-full h-14 btn-primary text-lg"
              >
                {isSubmitting ? "Submitting..." : "Schedule Your Consultation"}
              </Button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}
