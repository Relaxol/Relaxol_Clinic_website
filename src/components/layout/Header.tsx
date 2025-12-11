import { useState } from "react";
import { Menu, X, Phone, ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import relaxolLogo from "@/assets/relaxol-logo.png";

const navItems = [
  { label: "About", href: "#about" },
  { label: "Treatments", href: "#treatments" },
  { label: "Conditions", href: "#conditions" },
  { label: "Financing", href: "#financing" },
  { label: "FAQ", href: "#faq" },
];

export function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <header className="w-full">
      {/* Top Bar */}
      <div className="bg-foreground text-background py-2 px-4">
        <div className="container mx-auto flex flex-wrap items-center justify-between gap-2 text-sm">
          <span className="font-medium">New Jersey's Premier Ketamine & SPRAVATO® Clinic</span>
          <div className="flex items-center gap-4">
            <a href="tel:201-781-2101" className="flex items-center gap-1.5 hover:text-primary transition-colors">
              <Phone className="w-4 h-4" />
              <span className="hidden sm:inline">Call: 201-781-2101</span>
            </a>
          </div>
        </div>
      </div>

      {/* Main Navigation */}
      <nav className="bg-foreground/95 border-t border-background/10 py-2 px-4">
        <div className="container mx-auto flex items-center justify-between">
          {/* Logo */}
          <a href="/" className="flex items-center">
            <img src={relaxolLogo} alt="Relaxol Clinic" className="h-14 md:h-16 w-auto" />
          </a>

          {/* Desktop Nav */}
          <div className="hidden lg:flex items-center gap-1">
            {navItems.map((item) => (
              <a
                key={item.label}
                href={item.href}
                className="px-4 py-2 text-background hover:text-primary transition-colors font-medium"
              >
                {item.label}
              </a>
            ))}
          </div>

          {/* CTA Buttons */}
          <div className="hidden lg:flex items-center gap-3">
            <Button variant="outline" className="btn-nav bg-transparent border-primary text-primary hover:bg-primary hover:text-primary-foreground">
              Existing Patients
            </Button>
            <Button className="btn-nav bg-primary text-primary-foreground hover:bg-accent">
              Schedule Consultation
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="lg:hidden text-background p-2"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="lg:hidden bg-foreground border-t border-background/10 mt-4 py-4 px-4 animate-fade-in">
            <div className="flex flex-col gap-2">
              {navItems.map((item) => (
                <a
                  key={item.label}
                  href={item.href}
                  className="px-4 py-3 text-background hover:bg-background/10 rounded-lg transition-colors"
                  onClick={() => setIsMenuOpen(false)}
                >
                  {item.label}
                </a>
              ))}
              <div className="flex flex-col gap-2 mt-4 pt-4 border-t border-background/10">
                <Button variant="outline" className="w-full bg-transparent border-primary text-primary">
                  Existing Patients
                </Button>
                <Button className="w-full bg-primary text-primary-foreground hover:bg-accent">
                  Schedule Consultation
                </Button>
              </div>
            </div>
          </div>
        )}
      </nav>
    </header>
  );
}
