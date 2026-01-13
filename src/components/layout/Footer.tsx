import { Facebook, Instagram, Linkedin, Phone, Mail, MapPin } from "lucide-react";
import relaxolLogo from "@/assets/relaxol-logo-new.png";
import ketamineDirectoryBadge from "@/assets/ketamine-directory-badge.png";

const navLinks = [
  { label: "Home", href: "/" },
  { label: "Ketamine", href: "/ketamine" },
  { label: "SPRAVATO®", href: "/spravato-Englewood" },
  { label: "Vitamin Infusions", href: "/vitamin-infusion-englewood" },
  { label: "FAQ", href: "/faq" },
  { label: "Contact", href: "/contact" },
];

const hours = [
  { day: "Monday - Friday", time: "9 AM – 6 PM" },
  { day: "Saturday", time: "By Appointment" },
  { day: "Sunday", time: "Closed" },
];

const socialLinks = [
  { icon: Facebook, href: "https://facebook.com", label: "Facebook" },
  { icon: Instagram, href: "https://instagram.com", label: "Instagram" },
  { icon: Linkedin, href: "https://linkedin.com", label: "LinkedIn" },
];

export function Footer() {
  return (
    <footer className="bg-[#2a241e] text-background">
      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 xl:px-16 py-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Logo & Description */}
          <div className="lg:col-span-1">
            <div className="mb-4">
              <img src={relaxolLogo} alt="Relaxol Clinic" className="w-full max-w-[240px] h-auto" />
            </div>
            <p className="text-background/70 text-sm leading-relaxed mb-4">
              New Jersey's premier destination for ketamine and SPRAVATO® therapy.
            </p>
            <a 
              href="https://ketaminedirectory.com" 
              target="_blank" 
              rel="noopener noreferrer"
              className="inline-block"
            >
              <img 
                src={ketamineDirectoryBadge} 
                alt="Verified Provider - KetamineDirectory.com" 
                className="h-12 w-auto opacity-90 hover:opacity-100 transition-opacity"
              />
            </a>
          </div>

          {/* Navigation */}
          <div>
            <h3 className="text-base font-semibold mb-4">QUICK LINKS</h3>
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
            <h3 className="text-base font-semibold mb-4">OFFICE HOURS</h3>
            <ul className="space-y-1">
              {hours.map((item) => (
                <li key={item.day} className="text-background/70 text-sm">
                  {item.day}: <span className="text-background/90">{item.time}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-base font-semibold mb-4">CONTACT US</h3>
            <ul className="space-y-3">
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
        <div className="flex items-center justify-center gap-4 mt-8 pt-6 border-t border-background/10">
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
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-background/10">
        <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 xl:px-16 py-4">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4 text-sm text-background/60">
            <p>© 2025 Relaxol Clinic. All rights reserved.</p>
            <div className="flex items-center gap-6">
              <a href="/privacy-policy" className="hover:text-primary transition-colors">Privacy Policy</a>
              <a href="/terms-of-service" className="hover:text-primary transition-colors">Terms of Service</a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
