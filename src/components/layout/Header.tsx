import { useState, useRef } from "react";
import { Link } from "react-router-dom";
import { Menu, X, Phone, ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import relaxolLogo from "@/assets/relaxol-logo-new.png";

const conditionItems = [
  { label: "Depression", href: "/conditions/depression" },
  { label: "Anxiety", href: "/conditions/anxiety" },
  { label: "PTSD", href: "/conditions/ptsd" },
  { label: "OCD", href: "/conditions/ocd" },
  { label: "Pain Management", href: "/conditions/pain-management" },
];

const navItems = [
  { label: "Home", href: "/", isExternal: false },
  { label: "Treatments", href: "#treatments", hasDropdown: true, isExternal: false },
  { label: "Ketamine", href: "/ketamine", isExternal: false },
  { label: "SPRAVATO®", href: "/spravato-Englewood", isExternal: false },
  { label: "Vitamin Infusions", href: "/vitamin-infusion-englewood", isExternal: false },
  { label: "Blog", href: "/blog", isExternal: false },
  { label: "FAQ", href: "/faq", isExternal: false },
  { label: "Contact", href: "/contact", isExternal: false },
];

export function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isConditionsOpen, setIsConditionsOpen] = useState(false);
  const [mobileConditionsOpen, setMobileConditionsOpen] = useState(false);
  const closeTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  const handleMouseEnter = () => {
    if (closeTimeoutRef.current) {
      clearTimeout(closeTimeoutRef.current);
      closeTimeoutRef.current = null;
    }
    setIsConditionsOpen(true);
  };

  const handleMouseLeave = () => {
    closeTimeoutRef.current = setTimeout(() => {
      setIsConditionsOpen(false);
    }, 150);
  };

  const renderNavLink = (item: { label: string; href: string; hasDropdown?: boolean; isExternal?: boolean }) => {
    const isHashLink = item.href.startsWith("#");
    
    if (isHashLink) {
      return (
        <a
          href={item.href}
          className="px-4 py-2 text-foreground hover:text-primary transition-colors font-medium"
        >
          {item.label}
        </a>
      );
    }
    
    return (
      <Link
        to={item.href}
        className="px-4 py-2 text-foreground hover:text-primary transition-colors font-medium"
      >
        {item.label}
      </Link>
    );
  };

  return (
    <header className="w-full sticky top-0 z-50">
      {/* Top Bar */}
      <div className="bg-[#D09B3C] text-white py-2 px-4">
        <div className="container mx-auto flex flex-wrap items-center justify-between gap-2 text-sm">
          <span className="font-medium">New Jersey's Premier Ketamine & SPRAVATO® Clinic</span>
          <div className="flex items-center gap-4">
            <a href="tel:201-781-2101" className="flex items-center gap-1.5 hover:opacity-80 transition-opacity">
              <Phone className="w-4 h-4" />
              <span className="hidden sm:inline">Call: 201-781-2101</span>
            </a>
          </div>
        </div>
      </div>

      {/* Main Navigation */}
      <nav className="bg-white border-t border-border py-2 px-4 shadow-sm">
        <div className="container mx-auto flex items-center justify-between">
          {/* Logo */}
          <Link to="/" className="flex items-center">
            <img src={relaxolLogo} alt="Relaxol Clinic" className="h-20 md:h-24 w-auto object-contain" />
          </Link>

          {/* Desktop Nav */}
          <div className="hidden lg:flex items-center gap-1">
            {navItems.map((item) => (
              item.hasDropdown ? (
                <div
                  key={item.label}
                  className="relative"
                  onMouseEnter={handleMouseEnter}
                  onMouseLeave={handleMouseLeave}
                >
                  <a
                    href={item.href}
                    className="px-4 py-4 text-foreground hover:text-primary transition-colors font-medium inline-flex items-center gap-1"
                  >
                    {item.label}
                    <ChevronDown className={`w-4 h-4 transition-transform ${isConditionsOpen ? 'rotate-180' : ''}`} />
                  </a>
                  {isConditionsOpen && (
                    <div className="absolute top-full left-0 pt-1 z-50">
                      <div className="bg-card rounded-lg shadow-xl border border-border py-2 min-w-[200px]">
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
            <Link to="/contact">
              <Button className="btn-nav bg-[#D09B3C] text-white hover:bg-[#C48A25]">
                Schedule Consultation
              </Button>
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="lg:hidden text-foreground p-2"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="lg:hidden bg-white border-t border-border mt-4 py-4 px-4 animate-fade-in">
            <div className="flex flex-col gap-2">
              {navItems.map((item) => (
                item.hasDropdown ? (
                  <div key={item.label}>
                    <button
                      onClick={() => setMobileConditionsOpen(!mobileConditionsOpen)}
                      className="w-full px-4 py-3 text-foreground hover:bg-muted rounded-lg transition-colors flex items-center justify-between"
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
                            className="block px-4 py-2 text-foreground/80 hover:text-primary transition-colors"
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
                      className="px-4 py-3 text-foreground hover:bg-muted rounded-lg transition-colors"
                      onClick={() => setIsMenuOpen(false)}
                    >
                      {item.label}
                    </a>
                  ) : (
                    <Link
                      key={item.label}
                      to={item.href}
                      className="px-4 py-3 text-foreground hover:bg-muted rounded-lg transition-colors"
                      onClick={() => setIsMenuOpen(false)}
                    >
                      {item.label}
                    </Link>
                  )
                )
              ))}
              <div className="flex flex-col gap-2 mt-4 pt-4 border-t border-border">
                <Link to="/contact" onClick={() => setIsMenuOpen(false)}>
                  <Button className="w-full bg-[#D09B3C] text-white hover:bg-[#C48A25]">
                    Schedule Consultation
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        )}
      </nav>
    </header>
  );
}
