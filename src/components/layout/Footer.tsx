import { Facebook, Instagram, Linkedin, Phone, Mail, MapPin } from "lucide-react";
import relaxolLogo from "@/assets/relaxol-logo-footer.png";
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
      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 xl:px-16 py-6">
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-6 items-start">
          {/* Logo */}
          <div className="col-span-2 md:col-span-1 lg:col-span-1">
            <img src={relaxolLogo} alt="Relaxol Clinic" className="max-w-[180px] h-auto mb-2" />
            <a 
              href="https://ketaminedirectory.com" 
              target="_blank" 
              rel="noopener noreferrer"
              className="inline-block"
            >
              <img 
                src={ketamineDirectoryBadge} 
                alt="Verified Provider" 
                className="h-8 w-auto opacity-80 hover:opacity-100 transition-opacity"
              />
            </a>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-sm font-semibold mb-2">QUICK LINKS</h3>
            <ul className="space-y-0.5 text-xs">
              {navLinks.map((link) => (
                <li key={link.label}>
                  <a href={link.href} className="text-background/70 hover:text-primary transition-colors">
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Hours */}
          <div>
            <h3 className="text-sm font-semibold mb-2">HOURS</h3>
            <ul className="space-y-0.5 text-xs">
              {hours.map((item) => (
                <li key={item.day} className="text-background/70">
                  {item.day}: <span className="text-background/90">{item.time}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-sm font-semibold mb-2">CONTACT</h3>
            <ul className="space-y-1 text-xs">
              <li>
                <a href="tel:201-781-2101" className="flex items-center gap-2 text-background/70 hover:text-primary transition-colors">
                  <Phone className="w-3 h-3" />
                  <span>201-781-2101</span>
                </a>
              </li>
              <li>
                <a href="mailto:info@relaxolclinic.com" className="flex items-center gap-2 text-background/70 hover:text-primary transition-colors">
                  <Mail className="w-3 h-3" />
                  <span>info@relaxolclinic.com</span>
                </a>
              </li>
              <li>
                <a
                  href="https://maps.google.com/?q=560+Sylvan+Avenue+Suite+2115+Englewood+Cliffs+NJ+07632"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-start gap-2 text-background/70 hover:text-primary transition-colors"
                >
                  <MapPin className="w-3 h-3 mt-0.5 flex-shrink-0" />
                  <span>560 Sylvan Ave, Suite 2115, Englewood Cliffs, NJ</span>
                </a>
              </li>
            </ul>
          </div>

          {/* Social */}
          <div className="flex gap-2 md:justify-end items-start">
            {socialLinks.map((social) => (
              <a
                key={social.label}
                href={social.href}
                aria-label={social.label}
                className="w-8 h-8 rounded-full bg-background/10 flex items-center justify-center text-background hover:bg-primary hover:text-primary-foreground transition-colors"
              >
                <social.icon className="w-4 h-4" />
              </a>
            ))}
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-background/10">
        <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 xl:px-16 py-3">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-2 text-xs text-background/60">
            <p>© 2025 Relaxol Clinic. All rights reserved.</p>
            <div className="flex items-center gap-4">
              <a href="/privacy-policy" className="hover:text-primary transition-colors">Privacy Policy</a>
              <a href="/terms-of-service" className="hover:text-primary transition-colors">Terms of Service</a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
