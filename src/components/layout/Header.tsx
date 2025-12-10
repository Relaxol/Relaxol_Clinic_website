import { useState } from "react";
import { Menu, X, Phone, MapPin, ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/button";

const navItems = [
  { label: "About", href: "#about", hasDropdown: true },
  { label: "Treatments", href: "#treatments", hasDropdown: true },
  { label: "Financing", href: "#financing", hasDropdown: true },
  { label: "Learn", href: "#learn", hasDropdown: true },
  { label: "Locations", href: "#locations", hasDropdown: true },
  { label: "Provider Referral", href: "#referral", hasDropdown: true },
];

export function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <header className="w-full">
      {/* Top Bar */}
      <div className="bg-foreground text-background py-2 px-4">
        <div className="container mx-auto flex flex-wrap items-center justify-between gap-2 text-sm">
          <span className="font-medium">Innovative Treatment Protocol Starting at $299</span>
          <div className="flex items-center gap-4">
            <a href="tel:555-123-4567" className="flex items-center gap-1.5 hover:text-primary transition-colors">
              <Phone className="w-4 h-4" />
              <span>Location 1: 555-123-4567</span>
            </a>
            <a href="tel:555-987-6543" className="hidden md:flex items-center gap-1.5 hover:text-primary transition-colors">
              <MapPin className="w-4 h-4" />
              <span>Location 2: 555-987-6543</span>
            </a>
          </div>
        </div>
      </div>

      {/* Secondary Bar */}
      <div className="bg-foreground/95 border-t border-muted-foreground/20 py-2 px-4">
        <div className="container mx-auto flex items-center justify-between">
          <div className="hidden md:flex items-center gap-4 text-background text-sm">
            <a href="tel:555-123-4567" className="flex items-center gap-1.5 hover:text-primary transition-colors">
              <Phone className="w-4 h-4" />
              <span>Location A: 555-123-4567</span>
            </a>
            <a href="#locations" className="flex items-center gap-1.5 hover:text-primary transition-colors">
              <MapPin className="w-4 h-4" />
              <span>Location B: 555-987-6543</span>
            </a>
          </div>
          <div className="flex items-center gap-3 ml-auto">
            <Button variant="outline" className="btn-nav bg-transparent border-primary text-primary hover:bg-primary hover:text-primary-foreground">
              Schedule Free Consultation
            </Button>
            <Button className="btn-nav bg-primary text-primary-foreground hover:bg-accent hidden sm:inline-flex">
              Book Your Treatment Online
            </Button>
          </div>
        </div>
      </div>

      {/* Main Navigation */}
      <nav className="bg-foreground py-4 px-4">
        <div className="container mx-auto flex items-center justify-between">
          {/* Logo */}
          <a href="/" className="flex items-center">
            <div className="w-48 h-16 bg-gradient-to-r from-primary/20 to-primary/10 rounded-lg flex items-center justify-center">
              <span className="text-primary font-serif text-xl font-bold">CLINIC LOGO</span>
            </div>
          </a>

          {/* Desktop Nav */}
          <div className="hidden lg:flex items-center gap-1">
            {navItems.map((item) => (
              <a
                key={item.label}
                href={item.href}
                className="flex items-center gap-1 px-4 py-2 text-background hover:text-primary transition-colors font-medium"
              >
                {item.label}
                {item.hasDropdown && <ChevronDown className="w-4 h-4" />}
              </a>
            ))}
          </div>

          {/* CTA Buttons */}
          <div className="hidden lg:flex items-center gap-3">
            <Button variant="outline" className="btn-nav bg-transparent border-background/30 text-background hover:bg-background/10">
              Existing Patients
            </Button>
            <Button variant="outline" className="btn-nav bg-transparent border-background/30 text-background hover:bg-background/10">
              Contact
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
          <div className="lg:hidden bg-foreground border-t border-muted-foreground/20 mt-4 py-4 px-4 animate-fade-in">
            <div className="flex flex-col gap-2">
              {navItems.map((item) => (
                <a
                  key={item.label}
                  href={item.href}
                  className="flex items-center justify-between px-4 py-3 text-background hover:bg-muted-foreground/10 rounded-lg transition-colors"
                >
                  {item.label}
                  {item.hasDropdown && <ChevronDown className="w-4 h-4" />}
                </a>
              ))}
              <div className="flex flex-col gap-2 mt-4 pt-4 border-t border-muted-foreground/20">
                <Button variant="outline" className="w-full bg-transparent border-background/30 text-background">
                  Existing Patients
                </Button>
                <Button className="w-full bg-primary text-primary-foreground hover:bg-accent">
                  Contact
                </Button>
              </div>
            </div>
          </div>
        )}
      </nav>
    </header>
  );
}
