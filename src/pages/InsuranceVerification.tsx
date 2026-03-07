import { useState } from "react";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
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
  const [consentChecked, setConsentChecked] = useState(false);
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    phone: '',
    email: '',
    dob: '',
    insuranceProvider: '',
    memberId: '',
    groupId: '',
    message: '',
  });

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
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
    
    try {
      const { error } = await supabase.from('form_submissions' as any).insert({
        tenant_id: TENANT_ID,
        form_type: 'insurance_verification',
        data: {
          first_name: formData.firstName,
          last_name: formData.lastName,
          phone: formData.phone,
          email: formData.email,
          date_of_birth: formData.dob,
          insurance_provider: formData.insuranceProvider,
          member_id: formData.memberId,
          group_id: formData.groupId,
          message: formData.message,
        },
      });

      if (error) throw error;

      toast({
        title: "Request Submitted",
        description: "We'll verify your coverage and contact you within 1-2 business days.",
      });
      setFormData({ firstName: '', lastName: '', phone: '', email: '', dob: '', insuranceProvider: '', memberId: '', groupId: '', message: '' });
      setConsentChecked(false);
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

              <form onSubmit={handleSubmit} className="space-y-5">
                <div className="grid sm:grid-cols-2 gap-4">
                  <Input
                    type="text"
                    placeholder="First Name *"
                    required
                    maxLength={100}
                    value={formData.firstName}
                    onChange={(e) => setFormData(prev => ({ ...prev, firstName: e.target.value }))}
                    className="h-12 rounded-lg border-border bg-cream-dark/30 focus:border-primary focus:bg-white transition-colors"
                  />
                  <Input
                    type="text"
                    placeholder="Last Name *"
                    required
                    maxLength={100}
                    value={formData.lastName}
                    onChange={(e) => setFormData(prev => ({ ...prev, lastName: e.target.value }))}
                    className="h-12 rounded-lg border-border bg-cream-dark/30 focus:border-primary focus:bg-white transition-colors"
                  />
                </div>

                <div className="grid sm:grid-cols-3 gap-4">
                  <Input
                    type="tel"
                    placeholder="Phone Number"
                    maxLength={20}
                    value={formData.phone}
                    onChange={(e) => setFormData(prev => ({ ...prev, phone: e.target.value }))}
                    className="h-12 rounded-lg border-border bg-cream-dark/30 focus:border-primary focus:bg-white transition-colors"
                  />
                  <Input
                    type="email"
                    placeholder="Email Address *"
                    required
                    maxLength={255}
                    value={formData.email}
                    onChange={(e) => setFormData(prev => ({ ...prev, email: e.target.value }))}
                    className="h-12 rounded-lg border-border bg-cream-dark/30 focus:border-primary focus:bg-white transition-colors"
                  />
                  <Input
                    type="text"
                    placeholder="Date of Birth"
                    value={formData.dob}
                    onChange={(e) => setFormData(prev => ({ ...prev, dob: e.target.value }))}
                    onFocus={(e) => (e.target.type = "date")}
                    onBlur={(e) => {
                      if (!e.target.value) e.target.type = "text";
                    }}
                    className="h-12 rounded-lg border-border bg-cream-dark/30 focus:border-primary focus:bg-white transition-colors"
                  />
                </div>

                <div className="grid sm:grid-cols-3 gap-4">
                  <Input
                    type="text"
                    placeholder="Insurance Provider *"
                    required
                    maxLength={100}
                    value={formData.insuranceProvider}
                    onChange={(e) => setFormData(prev => ({ ...prev, insuranceProvider: e.target.value }))}
                    className="h-12 rounded-lg border-border bg-cream-dark/30 focus:border-primary focus:bg-white transition-colors"
                  />
                  <Input
                    type="text"
                    placeholder="Member ID Number *"
                    required
                    maxLength={50}
                    value={formData.memberId}
                    onChange={(e) => setFormData(prev => ({ ...prev, memberId: e.target.value }))}
                    className="h-12 rounded-lg border-border bg-cream-dark/30 focus:border-primary focus:bg-white transition-colors"
                  />
                  <Input
                    type="text"
                    placeholder="Group ID Number"
                    maxLength={50}
                    value={formData.groupId}
                    onChange={(e) => setFormData(prev => ({ ...prev, groupId: e.target.value }))}
                    className="h-12 rounded-lg border-border bg-cream-dark/30 focus:border-primary focus:bg-white transition-colors"
                  />
                </div>

                <Textarea
                  placeholder="Message"
                  maxLength={1000}
                  value={formData.message}
                  onChange={(e) => setFormData(prev => ({ ...prev, message: e.target.value }))}
                  className="min-h-[120px] rounded-lg border-border bg-cream-dark/30 focus:border-primary focus:bg-white transition-colors resize-none"
                />

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

                <Button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full h-14 bg-foreground hover:bg-foreground/90 text-background font-semibold text-lg rounded-lg"
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
