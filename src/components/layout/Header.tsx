import { useState } from "react";
import { Link } from "react-router-dom";
import { Menu, X, Phone, ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import relaxolLogo from "@/assets/relaxol-logo.png";

const conditionItems = [
  { label: "Depression", href: "/conditions/depression" },
  { label: "Anxiety", href: "/conditions/anxiety" },
  { label: "PTSD", href: "/conditions/ptsd" },
  { label: "OCD", href: "/conditions/ocd" },
];

const navItems = [
  { label: "About", href: "#about", isExternal: false },
  { label: "Treatments", href: "#treatments", hasDropdown: true, isExternal: false },
  { label: "SPRAVATO®", href: "/spravato-Englewood", isExternal: false },
  { label: "Financing", href: "#financing", isExternal: false },
  { label: "FAQ", href: "/faq", isExternal: false },
];

export function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isConditionsOpen, setIsConditionsOpen] = useState(false);
  const [mobileConditionsOpen, setMobileConditionsOpen] = useState(false);

  const renderNavLink = (item: { label: string; href: string; hasDropdown?: boolean; isExternal?: boolean }) => {
    const isHashLink = item.href.startsWith("#");
    
    if (isHashLink) {
      return (
        <a
          href={item.href}
          className="px-4 py-2 text-background hover:text-primary transition-colors font-medium"
        >
          {item.label}
        </a>
      );
    }
    
    return (
      <Link
        to={item.href}
        className="px-4 py-2 text-background hover:text-primary transition-colors font-medium"
      >
        {item.label}
      </Link>
    );
  };

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
          <Link to="/" className="flex items-center">
            <img src={relaxolLogo} alt="Relaxol Clinic" className="h-16 md:h-[72px] w-auto max-w-[260px] md:max-w-[360px] object-contain" />
          </Link>

          {/* Desktop Nav */}
          <div className="hidden lg:flex items-center gap-1">
            {navItems.map((item) => (
              item.hasDropdown ? (
                <div
                  key={item.label}
                  className="relative"
                  onMouseEnter={() => setIsConditionsOpen(true)}
                  onMouseLeave={() => setIsConditionsOpen(false)}
                >
                  <a
                    href={item.href}
                    className="px-4 py-2 text-background hover:text-primary transition-colors font-medium inline-flex items-center gap-1"
                  >
                    {item.label}
                    <ChevronDown className={`w-4 h-4 transition-transform ${isConditionsOpen ? 'rotate-180' : ''}`} />
                  </a>
                  {isConditionsOpen && (
                    <div className="absolute top-full left-0 mt-1 bg-card rounded-lg shadow-xl border border-border py-2 min-w-[200px] animate-fade-in z-50">
                      {conditionItems.map((condition) => (
                        <Link
                          key={condition.label}
                          to={condition.href}
                          className="block px-4 py-2 text-foreground hover:bg-cream-dark hover:text-primary transition-colors"
                        >
                          {condition.label}
                        </Link>
                      ))}
                    </div>
                  )}
                </div>
              ) : (
                <span key={item.label}>
                  {renderNavLink(item)}
                </span>
              )
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
                item.hasDropdown ? (
                  <div key={item.label}>
                    <button
                      onClick={() => setMobileConditionsOpen(!mobileConditionsOpen)}
                      className="w-full px-4 py-3 text-background hover:bg-background/10 rounded-lg transition-colors flex items-center justify-between"
                    >
                      {item.label}
                      <ChevronDown className={`w-4 h-4 transition-transform ${mobileConditionsOpen ? 'rotate-180' : ''}`} />
                    </button>
                    {mobileConditionsOpen && (
                      <div className="pl-4 mt-1 space-y-1">
                        {conditionItems.map((condition) => (
                          <Link
                            key={condition.label}
                            to={condition.href}
                            className="block px-4 py-2 text-background/80 hover:text-primary transition-colors"
                            onClick={() => setIsMenuOpen(false)}
                          >
                            {condition.label}
                          </Link>
                        ))}
                      </div>
                    )}
                  </div>
                ) : (
                  item.href.startsWith("#") ? (
                    <a
                      key={item.label}
                      href={item.href}
                      className="px-4 py-3 text-background hover:bg-background/10 rounded-lg transition-colors"
                      onClick={() => setIsMenuOpen(false)}
                    >
                      {item.label}
                    </a>
                  ) : (
                    <Link
                      key={item.label}
                      to={item.href}
                      className="px-4 py-3 text-background hover:bg-background/10 rounded-lg transition-colors"
                      onClick={() => setIsMenuOpen(false)}
                    >
                      {item.label}
                    </Link>
                  )
                )
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
