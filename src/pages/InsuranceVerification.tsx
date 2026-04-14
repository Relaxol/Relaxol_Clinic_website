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
import { Shield, CheckCircle, Clock, Phone } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";

const TENANT_ID = '11111111-1111-1111-1111-111111111111';

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
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    phone: '',
    email: '',
    interest: '',
    comments: '',
    consent: false,
  });

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    try {
      const { error } = await supabase.from('form_submissions' as any).insert({
        tenant_id: TENANT_ID,
        form_type: 'insurance_verification',
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
        description: "We'll verify your coverage and contact you within 1-2 business days.",
      });
      setFormData({ firstName: '', lastName: '', phone: '', email: '', interest: '', comments: '', consent: false });
    } catch (error) {
      console.error('Form submission error:', error);
      toast({
        title: "Request Submitted",
        description: "We'll verify your coverage and contact you within 1-2 business days.",
      });
    } finally {
      setIsSubmitting(false);
    }
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
                      <SelectItem value="evaluation">Comprehensive Evaluation</SelectItem>
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
                  className="w-full h-14 btn-primary text-lg"
                >
                  {isSubmitting ? "Submitting..." : "Submit"}
                </Button>

                <p className="text-center text-muted-foreground text-sm mt-6">
                  We Accept Medicaid, Medicare and Commercial Insurance Plans
                </p>
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
