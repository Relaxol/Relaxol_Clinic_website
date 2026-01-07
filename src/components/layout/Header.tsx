import { useState, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Menu, X, Phone, ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import relaxolLogo from "@/assets/relaxol-logo-transparent.png";

const ketamineItems = [
  { label: "What Is Ketamine?", href: "/ketamine" },
  { label: "Depression Treatment", href: "/ketamine#depression" },
  { label: "Anxiety Treatment", href: "/ketamine#anxiety" },
  { label: "PTSD Treatment", href: "/ketamine#ptsd" },
  { label: "OCD Treatment", href: "/ketamine#ocd" },
  { label: "Pain Management", href: "/ketamine#chronic-pain" },
];

const navItems = [
  { label: "Ketamine", href: "/ketamine", hasDropdown: true, isExternal: false },
  { label: "SPRAVATO®", href: "/spravato-Englewood", isExternal: false },
  { label: "Vitamin Infusions", href: "/vitamin-infusion-englewood", isExternal: false },
  { label: "Our Team", href: "/our-team", isExternal: false },
  { label: "Blog", href: "/blog", isExternal: false },
  { label: "FAQ", href: "/faq", isExternal: false },
  { label: "Contact", href: "/contact", isExternal: false },
];

export function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isConditionsOpen, setIsConditionsOpen] = useState(false);
  const [mobileConditionsOpen, setMobileConditionsOpen] = useState(false);
  const closeTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const navigate = useNavigate();

  const handleHashNavigation = (href: string) => {
    const [path, hash] = href.split('#');
    
    if (hash) {
      navigate(path || '/ketamine');
      // Wait for navigation then scroll to element
      setTimeout(() => {
        const element = document.getElementById(hash);
        if (element) {
          element.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
      }, 100);
    } else {
      navigate(href);
    }
    
    setIsConditionsOpen(false);
    setIsMenuOpen(false);
  };

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
          className="px-3 py-2 text-white/90 hover:text-[#D09B3C] transition-colors font-medium whitespace-nowrap text-sm"
        >
          {item.label}
        </a>
      );
    }
    
    return (
      <Link
        to={item.href}
        className="px-3 py-2 text-white/90 hover:text-[#D09B3C] transition-colors font-medium whitespace-nowrap text-sm"
      >
        {item.label}
      </Link>
    );
  };

  return (
    <header className="w-full sticky top-0 z-50">
      {/* Combined Navigation Bar */}
      <nav className="bg-[#1a1815] py-4 px-4 shadow-lg">
        <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 xl:px-16">
          <div className="flex items-center justify-between">
            {/* Logo - Left */}
            <Link to="/" className="flex items-center flex-shrink-0">
              <img src={relaxolLogo} alt="Relaxol Clinic" className="h-[85px] w-auto object-contain" />
            </Link>

            {/* Right side container */}
            <div className="hidden lg:flex flex-col items-end gap-3">
              {/* Top row - Phone and Address */}
              <div className="flex items-center gap-4 text-sm">
                <a href="tel:201-781-2101" className="flex items-center gap-1.5 text-[#D09B3C] hover:text-[#e5b056] transition-colors">
                  <Phone className="w-4 h-4" />
                  <span>(201) 781-2101</span>
                </a>
                <span className="text-white/60">|</span>
                <span className="text-white/80">560 Sylvan Avenue, Suite 2115, Englewood Cliffs, NJ 07632</span>
              </div>
              
              {/* Bottom row - Nav links and CTA */}
              <div className="flex items-center gap-1">
                {/* Desktop Nav */}
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
                        className="px-3 py-2 text-white/90 hover:text-[#D09B3C] transition-colors font-medium inline-flex items-center gap-1 whitespace-nowrap text-sm"
                      >
                        {item.label}
                        <ChevronDown className={`w-4 h-4 transition-transform ${isConditionsOpen ? 'rotate-180' : ''}`} />
                      </a>
                      {isConditionsOpen && (
                        <div className="absolute top-full left-0 pt-1 z-50">
                          <div className="bg-card rounded-lg shadow-xl border border-border py-2 min-w-[200px]">
                            {ketamineItems.map((dropdownItem) => (
                              <button
                                key={dropdownItem.label}
                                onClick={() => handleHashNavigation(dropdownItem.href)}
                                className="block w-full text-left px-4 py-2 text-foreground hover:bg-cream-dark hover:text-primary transition-colors"
                              >
                                {dropdownItem.label}
                              </button>
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
                
                {/* CTA Button */}
                <Link to="/verify-coverage" className="ml-4">
                  <Button className="bg-[#D09B3C] text-white hover:bg-[#C48A25] whitespace-nowrap px-5 py-2 text-sm font-semibold">
                    Insurance Coverage
                  </Button>
                </Link>
              </div>
            </div>

            {/* Mobile Menu Button */}
            <button
              className="lg:hidden text-white p-2"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="lg:hidden bg-[#1a1815] border-t border-[#2a2520] mt-4 py-4 px-4 animate-fade-in">
            <div className="flex flex-col gap-2">
              {navItems.map((item) => (
                item.hasDropdown ? (
                  <div key={item.label}>
                    <button
                      onClick={() => setMobileConditionsOpen(!mobileConditionsOpen)}
                      className="w-full px-4 py-3 text-white/90 hover:bg-[#2a2520] rounded-lg transition-colors flex items-center justify-between"
                    >
                      {item.label}
                      <ChevronDown className={`w-4 h-4 transition-transform ${mobileConditionsOpen ? 'rotate-180' : ''}`} />
                    </button>
                    {mobileConditionsOpen && (
                      <div className="pl-4 mt-1 space-y-1">
                        {ketamineItems.map((dropdownItem) => (
                          <button
                            key={dropdownItem.label}
                            onClick={() => handleHashNavigation(dropdownItem.href)}
                            className="block w-full text-left px-4 py-2 text-white/70 hover:text-[#D09B3C] transition-colors"
                          >
                            {dropdownItem.label}
                          </button>
                        ))}
                      </div>
                    )}
                  </div>
                ) : (
                  item.href.startsWith("#") ? (
                    <a
                      key={item.label}
                      href={item.href}
                      className="px-4 py-3 text-white/90 hover:bg-[#2a2520] rounded-lg transition-colors"
                      onClick={() => setIsMenuOpen(false)}
                    >
                      {item.label}
                    </a>
                  ) : (
                    <Link
                      key={item.label}
                      to={item.href}
                      className="px-4 py-3 text-white/90 hover:bg-[#2a2520] rounded-lg transition-colors"
                      onClick={() => setIsMenuOpen(false)}
                    >
                      {item.label}
                    </Link>
                  )
                )
              ))}
              <div className="flex flex-col gap-2 mt-4 pt-4 border-t border-[#2a2520]">
                <Link to="/verify-coverage" onClick={() => setIsMenuOpen(false)}>
                  <Button className="w-full bg-[#D09B3C] text-white hover:bg-[#C48A25]">
                    Verify Coverage
                  </Button>
                </Link>
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
