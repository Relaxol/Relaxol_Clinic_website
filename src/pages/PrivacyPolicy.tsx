import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";

const PrivacyPolicy = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      {/* Hero Section */}
      <section className="pt-32 pb-16 bg-[hsl(30,20%,35%)]">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
            Privacy Policy
          </h1>
        </div>
      </section>

      {/* Content Section */}
      <section className="py-16 bg-background">
        <div className="container mx-auto px-4 max-w-4xl">
          <div className="prose prose-lg max-w-none space-y-8">
            
            <p className="text-foreground/80 leading-relaxed">
              At Relaxol Clinic, we are committed to safeguarding your privacy and protecting your personal and health information. This Privacy Policy outlines how we collect, use, store, and disclose your information through our website and digital communication services.
            </p>
            
            <p className="text-foreground/80 leading-relaxed">
              By using our website, you agree to the terms and practices described below.
            </p>

            <div>
              <h2 className="text-2xl font-semibold text-foreground mb-4">Information We Collect</h2>
              <p className="text-foreground/80 leading-relaxed mb-4">
                When you visit our website or fill out any form, we may collect the following information:
              </p>
              <ul className="list-disc list-inside text-foreground/80 space-y-2 ml-4">
                <li>Full name, phone number, and email address</li>
                <li>Address or ZIP code</li>
                <li>Health and mental health history</li>
                <li>Insurance and payment information</li>
              </ul>
              <p className="text-foreground/80 leading-relaxed mt-4">
                This information is collected solely to support your care and communicate with you effectively.
              </p>
            </div>

            <div>
              <h2 className="text-2xl font-semibold text-foreground mb-4">How We Use Your Information</h2>
              <p className="text-foreground/80 leading-relaxed mb-4">
                The personal information we collect may be used to:
              </p>
              <ul className="list-disc list-inside text-foreground/80 space-y-2 ml-4">
                <li>Respond to inquiries and provide requested services</li>
                <li>Coordinate and follow up on treatment programs</li>
                <li>Maintain accurate patient records</li>
                <li>Improve the quality of our website and services</li>
                <li>Comply with federal and state regulations</li>
              </ul>
              <p className="text-foreground/80 leading-relaxed mt-4">
                We never sell or share your personal information with outside companies for marketing purposes.
              </p>
            </div>

            <div>
              <h2 className="text-2xl font-semibold text-foreground mb-4">SMS Communications</h2>
              <p className="text-foreground/80 leading-relaxed mb-4">
                If you consent to receive SMS/text messages, you may receive reminders, check-ins, or important service updates.
              </p>
              <h3 className="text-xl font-medium text-foreground mb-3">Terms of SMS Communications:</h3>
              <ul className="list-disc list-inside text-foreground/80 space-y-2 ml-4">
                <li><strong>Opt-Out:</strong> Reply "STOP" at any time to unsubscribe. Reply "START" to opt back in.</li>
                <li><strong>Standard Messaging Rates:</strong> Your mobile carrier's messaging and data rates may apply.</li>
                <li><strong>No Third-Party Sharing:</strong> Your phone number and SMS consent are never shared, sold, or used for affiliate marketing.</li>
              </ul>
            </div>

            <div>
              <h2 className="text-2xl font-semibold text-foreground mb-4">Cookies and Website Analytics</h2>
              <p className="text-foreground/80 leading-relaxed mb-4">
                We use cookies and analytics tools to:
              </p>
              <ul className="list-disc list-inside text-foreground/80 space-y-2 ml-4">
                <li>Understand how visitors navigate our website</li>
                <li>Improve functionality and performance</li>
                <li>Monitor engagement and traffic trends</li>
              </ul>
              <p className="text-foreground/80 leading-relaxed mt-4">
                You can control or disable cookies through your browser settings. Doing so may affect some website features.
              </p>
            </div>

            <div>
              <h2 className="text-2xl font-semibold text-foreground mb-4">Links to External Sites</h2>
              <p className="text-foreground/80 leading-relaxed">
                Our website may include links to third-party websites. These sites are not controlled by Relaxol Clinic, and we are not responsible for their privacy practices. We recommend reviewing their privacy policies before sharing any personal information.
              </p>
            </div>

            <div>
              <h2 className="text-2xl font-semibold text-foreground mb-4">Children's Privacy</h2>
              <p className="text-foreground/80 leading-relaxed">
                Our website and services are intended for individuals 18 years or older. We do not knowingly collect or store information from minors. If you suspect that we have collected information from a minor, please contact us so we can promptly remove it.
              </p>
            </div>

            <div>
              <h2 className="text-2xl font-semibold text-foreground mb-4">HIPAA Compliance</h2>
              <p className="text-foreground/80 leading-relaxed mb-4">
                Relaxol Clinic complies fully with the Health Insurance Portability and Accountability Act (HIPAA). This means your Protected Health Information (PHI) is handled with the highest level of confidentiality and care.
              </p>
              <p className="text-foreground/80 leading-relaxed mb-4">
                We follow HIPAA's rules regarding:
              </p>
              <ul className="list-disc list-inside text-foreground/80 space-y-2 ml-4">
                <li>Access to your medical records</li>
                <li>Requesting corrections or updates</li>
                <li>Limiting use or disclosure of your information</li>
                <li>Obtaining written consent for non-standard disclosures</li>
                <li>Providing you with a summary of how and when your data is used</li>
              </ul>
              <p className="text-foreground/80 leading-relaxed mt-4">
                For a full list of your rights under HIPAA, visit:{" "}
                <a 
                  href="https://www.hhs.gov/hipaa/for-individuals/index.html" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-[#D09B3C] hover:underline"
                >
                  https://www.hhs.gov/hipaa/for-individuals/index.html
                </a>
              </p>
            </div>

            <div>
              <h2 className="text-2xl font-semibold text-foreground mb-4">Mental Health Information & Coordination of Care</h2>
              <p className="text-foreground/80 leading-relaxed mb-4">
                Under HIPAA, we may share certain treatment-related health information with other licensed professionals involved in your care. This includes:
              </p>
              <ul className="list-disc list-inside text-foreground/80 space-y-2 ml-4">
                <li>Medication prescriptions</li>
                <li>Therapy session dates and types</li>
                <li>Clinical summaries and diagnoses</li>
                <li>Progress reports and test results</li>
              </ul>
              <p className="text-foreground/80 leading-relaxed mt-4">
                Psychotherapy notes maintained separately are only disclosed with your explicit written permission, as required by law.
              </p>
            </div>

            <div>
              <h2 className="text-2xl font-semibold text-foreground mb-4">How We Protect Your Information</h2>
              <p className="text-foreground/80 leading-relaxed mb-4">
                We use technical, administrative, and physical safeguards to protect your data. These include:
              </p>
              <ul className="list-disc list-inside text-foreground/80 space-y-2 ml-4">
                <li>Secure internal systems</li>
                <li>Staff training on HIPAA and privacy protection</li>
                <li>Access control and encryption tools</li>
                <li>Strict data-sharing protocols with any third-party partners</li>
              </ul>
            </div>

            <div>
              <h2 className="text-2xl font-semibold text-foreground mb-4">Contact Us</h2>
              <p className="text-foreground/80 leading-relaxed">
                If you have any questions, need to access your records, or want to file a privacy complaint, please contact us:{" "}
                <a 
                  href="mailto:info@relaxolclinic.com" 
                  className="text-[#D09B3C] hover:underline"
                >
                  info@relaxolclinic.com
                </a>
              </p>
            </div>

            <div>
              <h2 className="text-2xl font-semibold text-foreground mb-4">Updates to This Policy</h2>
              <p className="text-foreground/80 leading-relaxed">
                We may update this Privacy Policy from time to time. Any changes will be posted here with an updated effective date. Please check this page periodically to stay informed.
              </p>
            </div>

          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default PrivacyPolicy;
