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

export function ContactSection() {
  const [isSubmitting, setIsSubmitting] = useState(false);

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
    <section id="contact" className="py-20 bg-cream-dark">
      <div className="container mx-auto px-4">
        <div className="max-w-2xl mx-auto">
          {/* Header */}
          <div className="text-center mb-10">
            <h2 className="font-serif text-3xl md:text-4xl lg:text-5xl text-foreground font-bold mb-4">
              SCHEDULE A FREE CONSULTATION
            </h2>
            <p className="text-muted-foreground text-lg">
              Please submit your request below for more information about our innovative treatment options and a member from our staff will contact you during regular business hours.
            </p>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="bg-white rounded-3xl shadow-card p-8 md:p-10">
            <div className="grid sm:grid-cols-2 gap-6 mb-6">
              <div>
                <label htmlFor="firstName" className="block text-sm font-medium text-foreground mb-2">
                  First Name *
                </label>
                <Input
                  id="firstName"
                  type="text"
                  required
                  className="h-12 rounded-xl border-border focus:border-primary"
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
                  className="h-12 rounded-xl border-border focus:border-primary"
                  placeholder="Enter last name"
                />
              </div>
            </div>

            <div className="grid sm:grid-cols-2 gap-6 mb-6">
              <div>
                <label htmlFor="phone" className="block text-sm font-medium text-foreground mb-2">
                  Phone *
                </label>
                <Input
                  id="phone"
                  type="tel"
                  required
                  className="h-12 rounded-xl border-border focus:border-primary"
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
                  className="h-12 rounded-xl border-border focus:border-primary"
                  placeholder="email@example.com"
                />
              </div>
            </div>

            <div className="mb-6">
              <label htmlFor="location" className="block text-sm font-medium text-foreground mb-2">
                Location *
              </label>
              <Select>
                <SelectTrigger className="h-12 rounded-xl border-border">
                  <SelectValue placeholder="Select a location" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="location-a">Location A</SelectItem>
                  <SelectItem value="location-b">Location B</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="mb-6">
              <label htmlFor="comments" className="block text-sm font-medium text-foreground mb-2">
                Comments
              </label>
              <Textarea
                id="comments"
                className="min-h-[120px] rounded-xl border-border focus:border-primary resize-none"
                placeholder="Tell us about your situation..."
              />
            </div>

            <div className="mb-8">
              <label className="flex items-start gap-3 cursor-pointer">
                <input
                  type="checkbox"
                  className="w-5 h-5 rounded border-border text-primary mt-0.5"
                />
                <span className="text-sm text-muted-foreground">
                  I consent to receive notifications and alerts. Message frequency varies. Message & data rates may apply. You can reply STOP to unsubscribe at any time.
                </span>
              </label>
            </div>

            <Button
              type="submit"
              disabled={isSubmitting}
              className="w-full h-14 btn-primary text-lg"
            >
              {isSubmitting ? "Submitting..." : "Request More Information"}
            </Button>

            <p className="text-center text-sm text-muted-foreground mt-6">
              <a href="#" className="hover:text-primary">Privacy Policy</a>
              {" | "}
              <a href="#" className="hover:text-primary">Terms of Service</a>
            </p>
          </form>
        </div>
      </div>
    </section>
  );
}
