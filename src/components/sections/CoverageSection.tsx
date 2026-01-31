import { Link } from "react-router-dom";
import { Shield, CheckCircle, Phone, FileText } from "lucide-react";
import { Button } from "@/components/ui/button";

export function CoverageSection() {
  const coveragePoints = [
    "SPRAVATO® is FDA-approved and covered by most major insurance plans",
    "Medicare and Medicaid coverage available in many states",
    "We handle all prior authorizations for you",
    "Transparent cost information before your first visit",
  ];

  return (
    <section id="coverage" className="py-24 md:py-32 bg-gradient-to-b from-cream to-white">
      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 xl:px-16">
        {/* Header */}
        <div className="text-center mb-16 max-w-3xl mx-auto">
          <p className="text-primary text-sm font-semibold uppercase tracking-widest mb-3">
            INSURANCE & PAYMENT
          </p>
          <h2 className="text-3xl md:text-4xl lg:text-5xl text-foreground font-bold mb-5">
            Understanding Your Coverage
          </h2>
          <p className="text-muted-foreground font-light tracking-wide text-[15px] leading-[1.65] sm:font-normal sm:tracking-normal sm:text-lg sm:leading-relaxed">
            We believe cost shouldn't be a barrier to mental health care. Our team is here to help you navigate your insurance options.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left - Info Card */}
          <div className="bg-card rounded-3xl p-8 lg:p-10 shadow-[var(--shadow-card)] hover:shadow-[var(--shadow-hero)] transition-all duration-300">
            <div className="icon-container mb-6">
              <Shield className="w-7 h-7" />
            </div>
            <h3 className="text-2xl font-bold text-foreground mb-6">
              Insurance Coverage for SPRAVATO® & Ketamine
            </h3>
            
            <ul className="space-y-4 mb-8">
              {coveragePoints.map((point, index) => (
                <li key={index} className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                  <span className="text-muted-foreground">{point}</span>
                </li>
              ))}
            </ul>

            <p className="text-muted-foreground font-light tracking-wide text-[15px] leading-[1.65] sm:font-normal sm:tracking-normal sm:text-base sm:leading-relaxed mb-6">
              Our dedicated team will verify your benefits and explain your out-of-pocket costs before you begin treatment.
            </p>

            <div className="flex flex-col sm:flex-row gap-4">
              <Link to="/verify-coverage">
                <Button className="bg-primary text-white hover:bg-accent w-full sm:w-auto">
                  <FileText className="w-4 h-4 mr-2" />
                  Verify Your Coverage
                </Button>
              </Link>
              <a href="tel:201-781-2101">
                <Button variant="outline" className="border-primary text-primary hover:bg-primary/10 w-full sm:w-auto">
                  <Phone className="w-4 h-4 mr-2" />
                  Call (201) 781-2101
                </Button>
              </a>
            </div>
          </div>

          {/* Right - Quick Facts */}
          <div className="space-y-6">
            <div className="bg-white rounded-2xl p-6 shadow-md border border-border/50">
              <h4 className="text-lg font-semibold text-foreground mb-2">Major Insurance Accepted</h4>
              <p className="text-muted-foreground text-sm">
                We work with Aetna, Blue Cross Blue Shield, Cigna, United Healthcare, Medicare, Medicaid, and many other providers.
              </p>
            </div>
            
            <div className="bg-white rounded-2xl p-6 shadow-md border border-border/50">
              <h4 className="text-lg font-semibold text-foreground mb-2">Prior Authorization Support</h4>
              <p className="text-muted-foreground text-sm">
                Our team handles all the paperwork and prior authorizations required by your insurance company.
              </p>
            </div>
            
            <div className="bg-primary/10 rounded-2xl p-6 border border-primary/20">
              <h4 className="text-lg font-semibold text-primary mb-2">Free Benefits Verification</h4>
              <p className="text-foreground text-sm">
                Not sure if you're covered? We'll check your benefits at no cost and explain your options.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
