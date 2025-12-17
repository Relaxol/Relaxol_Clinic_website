import { Facebook, Instagram, Linkedin, ArrowUp, Phone, Mail, MapPin } from "lucide-react";
import relaxolLogo from "@/assets/relaxol-logo.png";

const navLinks = [
  { label: "Home", href: "/" },
  { label: "About", href: "#about" },
  { label: "Treatments", href: "#treatments" },
  { label: "Conditions", href: "#conditions" },
  { label: "FAQ", href: "#faq" },
  { label: "Contact", href: "/contact" },
];

const hours = [
  { day: "Monday - Friday", time: "9 AM – 6 PM" },
  { day: "Saturday", time: "By Appointment" },
  { day: "Sunday", time: "Closed" },
];

const socialLinks = [
  { icon: Facebook, href: "#", label: "Facebook" },
  { icon: Instagram, href: "#", label: "Instagram" },
  { icon: Linkedin, href: "#", label: "LinkedIn" },
];

export function Footer() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer className="bg-foreground text-background">
      <div className="container mx-auto px-4 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          {/* Logo & Description */}
          <div className="lg:col-span-1">
            <div className="mb-6">
              <img src={relaxolLogo} alt="Relaxol Clinic" className="h-16 w-auto" />
            </div>
            <p className="text-background/70 text-sm leading-relaxed">
              New Jersey's premier destination for ketamine and SPRAVATO® therapy. We provide compassionate, clinician-led care for patients seeking relief from depression, anxiety, PTSD, and OCD.
            </p>
          </div>

          {/* Navigation */}
          <div>
            <h3 className="text-lg font-semibold mb-6">QUICK LINKS</h3>
            <ul className="space-y-3">
              {navLinks.map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    className="text-background/70 hover:text-primary transition-colors"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Hours */}
          <div>
            <h3 className="text-lg font-semibold mb-6">OFFICE HOURS</h3>
            <ul className="space-y-2">
              {hours.map((item) => (
                <li key={item.day} className="text-background/70 text-sm">
                  {item.day}: <span className="text-background/90">{item.time}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-lg font-semibold mb-6">CONTACT US</h3>
            <ul className="space-y-4">
              <li>
                <a
                  href="tel:201-781-2101"
                  className="flex items-center gap-3 text-background/70 hover:text-primary transition-colors"
                >
                  <Phone className="w-5 h-5" />
                  <span>201-781-2101</span>
                </a>
              </li>
              <li>
                <a
                  href="mailto:info@relaxolclinic.com"
                  className="flex items-center gap-3 text-background/70 hover:text-primary transition-colors"
                >
                  <Mail className="w-5 h-5" />
                  <span>info@relaxolclinic.com</span>
                </a>
              </li>
              <li>
                <a
                  href="https://maps.google.com/?q=560+Sylvan+Avenue+Suite+2115+Englewood+Cliffs+NJ+07632"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-start gap-3 text-background/70 hover:text-primary transition-colors"
                >
                  <MapPin className="w-5 h-5 mt-0.5 flex-shrink-0" />
                  <span>560 Sylvan Avenue, Suite 2115<br />Englewood Cliffs, NJ 07632</span>
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Social Links */}
        <div className="flex items-center justify-center gap-4 mt-12 pt-8 border-t border-background/10">
          {socialLinks.map((social) => (
            <a
              key={social.label}
              href={social.href}
              aria-label={social.label}
              className="w-10 h-10 rounded-full bg-background/10 flex items-center justify-center text-background hover:bg-primary hover:text-primary-foreground transition-colors"
            >
              <social.icon className="w-5 h-5" />
            </a>
          ))}
          <button
            onClick={scrollToTop}
            className="ml-4 w-10 h-10 rounded-full bg-primary flex items-center justify-center text-primary-foreground hover:bg-accent transition-colors"
            aria-label="Scroll to top"
          >
            <ArrowUp className="w-5 h-5" />
          </button>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-background/10">
        <div className="container mx-auto px-4 py-6">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4 text-sm text-background/60">
            <p>© 2025 Relaxol Clinic. All rights reserved.</p>
            <div className="flex items-center gap-6">
              <a href="#" className="hover:text-primary transition-colors">Privacy Policy</a>
              <a href="#" className="hover:text-primary transition-colors">Terms of Service</a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
