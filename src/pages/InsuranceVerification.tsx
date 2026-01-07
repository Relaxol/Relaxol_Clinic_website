import { useState } from "react";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import { toast } from "@/hooks/use-toast";
import { Shield, CheckCircle, Clock, Phone } from "lucide-react";

const benefits = [
  {
    icon: Shield,
    title: "Free Verification",
    description: "No cost to check your insurance coverage for our treatments.",
  },
  {
    icon: CheckCircle,
    title: "SPRAVATO® Coverage",
    description: "Most major insurance plans cover FDA-approved SPRAVATO® treatment.",
  },
  {
    icon: Clock,
    title: "Quick Response",
    description: "Our team will verify your benefits within 1-2 business days.",
  },
  {
    icon: Phone,
    title: "Personal Support",
    description: "We'll explain your coverage and answer any questions.",
  },
];

const InsuranceVerification = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [consentChecked, setConsentChecked] = useState(false);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    
    if (!consentChecked) {
      toast({
        title: "Consent Required",
        description: "Please check the consent box to continue.",
        variant: "destructive",
      });
      return;
    }
    
    setIsSubmitting(true);
    
    // Simulate form submission
    setTimeout(() => {
      setIsSubmitting(false);
      toast({
        title: "Request Submitted",
        description: "We'll verify your coverage and contact you within 1-2 business days.",
      });
      // Reset form
      (e.target as HTMLFormElement).reset();
      setConsentChecked(false);
    }, 1000);
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main>
        {/* Hero Section */}
        <section className="py-16 bg-cream-band">
          <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 xl:px-16 text-center">
            <p className="text-primary text-sm font-semibold uppercase tracking-widest mb-3">
              INSURANCE VERIFICATION
            </p>
            <h1 className="text-4xl md:text-5xl lg:text-6xl text-foreground font-bold mb-6">
              Verify Your Coverage
            </h1>
            <p className="text-muted-foreground text-lg md:text-xl max-w-2xl mx-auto">
              Find out if your insurance covers SPRAVATO® and ketamine treatments. Our team will handle the verification for you.
            </p>
          </div>
        </section>

        {/* Benefits Section */}
        <section className="py-16 bg-background">
          <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 xl:px-16">
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {benefits.map((benefit, index) => (
                <div
                  key={index}
                  className="bg-white rounded-2xl p-6 shadow-soft text-center"
                >
                  <div className="icon-container mx-auto mb-4">
                    <benefit.icon className="w-6 h-6" />
                  </div>
                  <h3 className="text-lg font-semibold text-foreground mb-2">
                    {benefit.title}
                  </h3>
                  <p className="text-muted-foreground text-sm">
                    {benefit.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Form Section */}
        <section className="py-16 bg-cream-dark">
          <div className="max-w-4xl mx-auto px-6 sm:px-8 lg:px-12 xl:px-16">
            <div className="bg-white rounded-3xl shadow-card p-8 md:p-12">
              <h2 className="text-2xl md:text-3xl font-bold text-foreground text-center mb-8">
                Complete the form for a free insurance check.
              </h2>

              <form onSubmit={handleSubmit} className="space-y-5">
                {/* Row 1: First Name, Last Name */}
                <div className="grid sm:grid-cols-2 gap-4">
                  <div>
                    <Input
                      type="text"
                      placeholder="First Name *"
                      required
                      maxLength={100}
                      className="h-12 rounded-lg border-border bg-cream-dark/30 focus:border-primary focus:bg-white transition-colors"
                    />
                  </div>
                  <div>
                    <Input
                      type="text"
                      placeholder="Last Name *"
                      required
                      maxLength={100}
                      className="h-12 rounded-lg border-border bg-cream-dark/30 focus:border-primary focus:bg-white transition-colors"
                    />
                  </div>
                </div>

                {/* Row 2: Phone, Email, Date of Birth */}
                <div className="grid sm:grid-cols-3 gap-4">
                  <div>
                    <Input
                      type="tel"
                      placeholder="Phone Number"
                      maxLength={20}
                      className="h-12 rounded-lg border-border bg-cream-dark/30 focus:border-primary focus:bg-white transition-colors"
                    />
                  </div>
                  <div>
                    <Input
                      type="email"
                      placeholder="Email Address *"
                      required
                      maxLength={255}
                      className="h-12 rounded-lg border-border bg-cream-dark/30 focus:border-primary focus:bg-white transition-colors"
                    />
                  </div>
                  <div>
                    <Input
                      type="text"
                      placeholder="Date of Birth"
                      onFocus={(e) => (e.target.type = "date")}
                      onBlur={(e) => {
                        if (!e.target.value) e.target.type = "text";
                      }}
                      className="h-12 rounded-lg border-border bg-cream-dark/30 focus:border-primary focus:bg-white transition-colors"
                    />
                  </div>
                </div>

                {/* Row 3: Insurance Provider, Member ID, Group ID */}
                <div className="grid sm:grid-cols-3 gap-4">
                  <div>
                    <Input
                      type="text"
                      placeholder="Insurance Provider *"
                      required
                      maxLength={100}
                      className="h-12 rounded-lg border-border bg-cream-dark/30 focus:border-primary focus:bg-white transition-colors"
                    />
                  </div>
                  <div>
                    <Input
                      type="text"
                      placeholder="Member ID Number *"
                      required
                      maxLength={50}
                      className="h-12 rounded-lg border-border bg-cream-dark/30 focus:border-primary focus:bg-white transition-colors"
                    />
                  </div>
                  <div>
                    <Input
                      type="text"
                      placeholder="Group ID Number"
                      maxLength={50}
                      className="h-12 rounded-lg border-border bg-cream-dark/30 focus:border-primary focus:bg-white transition-colors"
                    />
                  </div>
                </div>

                {/* Message */}
                <div>
                  <Textarea
                    placeholder="Message"
                    maxLength={1000}
                    className="min-h-[120px] rounded-lg border-border bg-cream-dark/30 focus:border-primary focus:bg-white transition-colors resize-none"
                  />
                </div>

                {/* Consent Checkbox */}
                <div className="flex items-start gap-3">
                  <Checkbox
                    id="consent"
                    checked={consentChecked}
                    onCheckedChange={(checked) => setConsentChecked(checked as boolean)}
                    className="mt-1"
                  />
                  <label htmlFor="consent" className="text-sm text-muted-foreground leading-relaxed cursor-pointer">
                    By checking this box, you agree to receive text messages for conversational purposes from Relaxol Clinic. Message and Data Rates may apply. Messaging frequency varies. You can STOP messaging by sending STOP and get more help by sending HELP.{" "}
                    <a href="/privacy-policy" className="text-primary hover:underline">
                      View our Privacy Policy
                    </a>
                  </label>
                </div>

                {/* Submit Button */}
                <Button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full h-14 bg-foreground hover:bg-foreground/90 text-background font-semibold text-lg rounded-lg"
                >
                  {isSubmitting ? "Submitting..." : "Submit"}
                </Button>
              </form>
            </div>
          </div>
        </section>

        {/* Additional Info Section */}
        <section className="py-16 bg-background">
          <div className="max-w-4xl mx-auto px-6 sm:px-8 lg:px-12 xl:px-16 text-center">
            <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-6">
              Insurance Coverage for Mental Health
            </h2>
            <p className="text-muted-foreground text-lg leading-relaxed mb-6">
              SPRAVATO® (esketamine) is FDA-approved and covered by many insurance plans, including Medicare and Medicaid in most states. Our dedicated team handles all prior authorizations and works directly with your insurance company to maximize your benefits.
            </p>
            <p className="text-muted-foreground text-lg leading-relaxed">
              Ketamine infusion therapy is typically an out-of-pocket expense, but we offer flexible payment options and can provide documentation for potential HSA/FSA reimbursement.
            </p>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default InsuranceVerification;
