import { Facebook, Twitter, Instagram, Linkedin, ArrowUp, Phone, Mail, MapPin } from "lucide-react";

const navLinks = [
  { label: "Home", href: "/" },
  { label: "About", href: "#about" },
  { label: "Treatments", href: "#treatments" },
  { label: "Contact", href: "#contact" },
];

const hours = [
  { day: "Monday", time: "9 AM – 5 PM" },
  { day: "Tuesday", time: "9 AM – 8 PM" },
  { day: "Wednesday", time: "Closed" },
  { day: "Thursday", time: "9 AM – 8 PM" },
  { day: "Friday", time: "9 AM – 5 PM" },
];

const socialLinks = [
  { icon: Facebook, href: "#", label: "Facebook" },
  { icon: Twitter, href: "#", label: "Twitter" },
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
            <div className="w-48 h-16 bg-gradient-to-r from-primary/20 to-primary/10 rounded-lg flex items-center justify-center mb-6">
              <span className="text-primary font-serif text-xl font-bold">CLINIC LOGO</span>
            </div>
            <p className="text-background/70 text-sm leading-relaxed">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation.
            </p>
          </div>

          {/* Navigation */}
          <div>
            <h3 className="text-lg font-semibold mb-6">NAVIGATION</h3>
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
            <h3 className="text-lg font-semibold mb-6">HOURS</h3>
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
            <h3 className="text-lg font-semibold mb-6">VISIT US</h3>
            <ul className="space-y-4">
              <li>
                <a
                  href="tel:555-123-4567"
                  className="flex items-center gap-3 text-background/70 hover:text-primary transition-colors"
                >
                  <Phone className="w-5 h-5" />
                  <span>555-123-4567</span>
                </a>
              </li>
              <li>
                <a
                  href="mailto:info@placeholder.com"
                  className="flex items-center gap-3 text-background/70 hover:text-primary transition-colors"
                >
                  <Mail className="w-5 h-5" />
                  <span>555-987-6543</span>
                </a>
              </li>
              <li>
                <a
                  href="#locations"
                  className="flex items-start gap-3 text-background/70 hover:text-primary transition-colors"
                >
                  <MapPin className="w-5 h-5 mt-0.5" />
                  <span>123 Placeholder Street<br />City, State 12345</span>
                </a>
              </li>
            </ul>

            {/* Badge Placeholders */}
            <div className="flex items-center gap-3 mt-6">
              <div className="w-16 h-16 bg-background/10 rounded-lg flex items-center justify-center">
                <span className="text-xs text-background/50">Badge</span>
              </div>
              <div className="w-16 h-16 bg-background/10 rounded-lg flex items-center justify-center">
                <span className="text-xs text-background/50">Badge</span>
              </div>
              <div className="w-16 h-16 bg-background/10 rounded-lg flex items-center justify-center">
                <span className="text-xs text-background/50">Badge</span>
              </div>
            </div>
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
            <p>© 2025 Placeholder Clinic. All rights reserved.</p>
            <div className="flex items-center gap-6">
              <a href="#" className="hover:text-primary transition-colors">Privacy Policy</a>
              <a href="#" className="hover:text-primary transition-colors">Terms of Service</a>
              <a href="#" className="hover:text-primary transition-colors">Acceptable Use Policy</a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
