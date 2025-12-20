import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";

const TermsOfService = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      {/* Hero Section */}
      <section className="relative pt-32 pb-16 bg-gradient-to-br from-[#5C4A3A] via-[#4A3C32] to-[#6B5A4A]">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
              Terms of Service
            </h1>
            <p className="text-white/80 text-lg">
              Please read these terms carefully before using our services
            </p>
          </div>
        </div>
      </section>

      {/* Content Section */}
      <section className="py-16 md:py-24">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto prose prose-lg">
            
            <div className="mb-12">
              <h2 className="text-2xl font-semibold text-foreground mb-4">Acceptance of Terms</h2>
              <p className="text-muted-foreground leading-relaxed">
                By accessing and using the Relaxol Clinic website and services, you accept and agree to be bound by these Terms of Service. If you do not agree to these terms, please do not use our website or services.
              </p>
            </div>

            <div className="mb-12">
              <h2 className="text-2xl font-semibold text-foreground mb-4">Description of Services</h2>
              <p className="text-muted-foreground leading-relaxed">
                Relaxol Clinic provides ketamine therapy, SPRAVATO® treatment, vitamin infusions, and related mental health services. Our website offers information about our services, appointment scheduling, and patient resources. All medical services are provided under the supervision of licensed healthcare professionals.
              </p>
            </div>

            <div className="mb-12">
              <h2 className="text-2xl font-semibold text-foreground mb-4">Medical Disclaimer</h2>
              <p className="text-muted-foreground leading-relaxed mb-4">
                The information provided on this website is for general informational purposes only and should not be considered medical advice. It is not intended to replace professional medical consultation, diagnosis, or treatment.
              </p>
              <p className="text-muted-foreground leading-relaxed">
                Always seek the advice of your physician or other qualified health provider with any questions you may have regarding a medical condition. Never disregard professional medical advice or delay in seeking it because of something you have read on this website.
              </p>
            </div>

            <div className="mb-12">
              <h2 className="text-2xl font-semibold text-foreground mb-4">Appointment and Cancellation Policy</h2>
              <p className="text-muted-foreground leading-relaxed mb-4">
                When you schedule an appointment with Relaxol Clinic, you agree to:
              </p>
              <ul className="list-disc pl-6 text-muted-foreground space-y-2">
                <li>Arrive on time for your scheduled appointment</li>
                <li>Provide at least 24 hours notice for cancellations or rescheduling</li>
                <li>Understand that late cancellations or no-shows may result in a cancellation fee</li>
                <li>Provide accurate and complete health information</li>
              </ul>
            </div>

            <div className="mb-12">
              <h2 className="text-2xl font-semibold text-foreground mb-4">Patient Responsibilities</h2>
              <p className="text-muted-foreground leading-relaxed mb-4">
                As a patient of Relaxol Clinic, you agree to:
              </p>
              <ul className="list-disc pl-6 text-muted-foreground space-y-2">
                <li>Provide accurate personal and health information</li>
                <li>Disclose all medications, supplements, and substances you are taking</li>
                <li>Follow pre-treatment and post-treatment instructions</li>
                <li>Arrange for safe transportation after treatment sessions</li>
                <li>Report any adverse reactions or concerns promptly</li>
                <li>Maintain open communication with your treatment team</li>
              </ul>
            </div>

            <div className="mb-12">
              <h2 className="text-2xl font-semibold text-foreground mb-4">Payment and Insurance</h2>
              <p className="text-muted-foreground leading-relaxed mb-4">
                Payment for services is due at the time of treatment unless other arrangements have been made. We accept various forms of payment and work with select insurance providers for covered services.
              </p>
              <p className="text-muted-foreground leading-relaxed">
                It is your responsibility to verify your insurance coverage before treatment. Relaxol Clinic is not responsible for denied claims or out-of-pocket expenses resulting from insurance coverage limitations.
              </p>
            </div>

            <div className="mb-12">
              <h2 className="text-2xl font-semibold text-foreground mb-4">Intellectual Property</h2>
              <p className="text-muted-foreground leading-relaxed">
                All content on this website, including text, graphics, logos, images, and software, is the property of Relaxol Clinic and is protected by copyright and trademark laws. You may not reproduce, distribute, or create derivative works from any content without our express written permission.
              </p>
            </div>

            <div className="mb-12">
              <h2 className="text-2xl font-semibold text-foreground mb-4">Limitation of Liability</h2>
              <p className="text-muted-foreground leading-relaxed">
                To the fullest extent permitted by law, Relaxol Clinic shall not be liable for any indirect, incidental, special, consequential, or punitive damages arising from your use of our website or services. Our total liability shall not exceed the amount you paid for the specific service giving rise to the claim.
              </p>
            </div>

            <div className="mb-12">
              <h2 className="text-2xl font-semibold text-foreground mb-4">Indemnification</h2>
              <p className="text-muted-foreground leading-relaxed">
                You agree to indemnify and hold harmless Relaxol Clinic, its officers, directors, employees, and agents from any claims, damages, losses, or expenses arising from your violation of these terms or your use of our services.
              </p>
            </div>

            <div className="mb-12">
              <h2 className="text-2xl font-semibold text-foreground mb-4">Governing Law</h2>
              <p className="text-muted-foreground leading-relaxed">
                These Terms of Service shall be governed by and construed in accordance with the laws of the State of New Jersey, without regard to its conflict of law provisions. Any disputes arising from these terms shall be resolved in the courts of New Jersey.
              </p>
            </div>

            <div className="mb-12">
              <h2 className="text-2xl font-semibold text-foreground mb-4">Changes to Terms</h2>
              <p className="text-muted-foreground leading-relaxed">
                Relaxol Clinic reserves the right to modify these Terms of Service at any time. Changes will be effective immediately upon posting to this website. Your continued use of our services after any changes constitutes acceptance of the modified terms.
              </p>
            </div>

            <div className="mb-12">
              <h2 className="text-2xl font-semibold text-foreground mb-4">Contact Information</h2>
              <p className="text-muted-foreground leading-relaxed mb-4">
                If you have any questions about these Terms of Service, please contact us:
              </p>
              <div className="text-muted-foreground">
                <p><strong>Email:</strong> <a href="mailto:info@relaxolclinic.com" className="text-[#D09B3C] hover:underline">info@relaxolclinic.com</a></p>
                <p><strong>Phone:</strong> <a href="tel:201-781-2101" className="text-[#D09B3C] hover:underline">201-781-2101</a></p>
                <p><strong>Address:</strong> 560 Sylvan Avenue, Suite 2115, Englewood Cliffs, NJ 07632</p>
              </div>
            </div>

            <div className="text-sm text-muted-foreground border-t pt-8">
              <p>Last Updated: December 2024</p>
            </div>

          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default TermsOfService;
