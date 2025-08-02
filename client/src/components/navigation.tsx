import { useState, useEffect } from "react";
import { Link, useLocation } from "wouter";
import { Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useIsMobile } from "@/hooks/use-mobile";

export default function Navigation() {
  const [location] = useLocation();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const isMobile = useIsMobile();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { href: "/", label: "Home" },
    { href: "/music", label: "Music" },
    { href: "/about", label: "About" },
    { href: "/contact", label: "Contact" },
  ];

  return (
    <nav className={`luxury-nav transition-all duration-300 ${isScrolled ? 'py-2' : 'py-4'}`}>
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link href="/">
            <div className="text-2xl font-bold text-gradient hover:gold-glow transition-all duration-300 cursor-pointer">
              RIKIVAULT COLLECTIVE
            </div>
          </Link>

          {/* Desktop Navigation */}
          {!isMobile && (
            <div className="flex items-center space-x-8">
              {navLinks.map((link) => (
                <Link key={link.href} href={link.href}>
                  <span
                    className={`text-sm font-medium transition-all duration-300 hover:text-primary cursor-pointer ${
                      location === link.href ? "text-primary" : "text-muted-foreground"
                    }`}
                  >
                    {link.label}
                  </span>
                </Link>
              ))}
              <Button className="luxury-button">
                Contact
              </Button>
            </div>
          )}

          {/* Mobile Menu Button */}
          {isMobile && (
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="text-primary"
            >
              {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </Button>
          )}
        </div>

        {/* Mobile Navigation */}
        {isMobile && isMenuOpen && (
          <div className="absolute top-full left-0 right-0 glass-effect border-t border-border">
            <div className="container mx-auto px-4 py-4">
              <div className="flex flex-col space-y-4">
                {navLinks.map((link) => (
                  <Link key={link.href} href={link.href}>
                    <span
                      className={`block text-sm font-medium transition-all duration-300 hover:text-primary cursor-pointer ${
                        location === link.href ? "text-primary" : "text-muted-foreground"
                      }`}
                      onClick={() => setIsMenuOpen(false)}
                    >
                      {link.label}
                    </span>
                  </Link>
                ))}
                <Button className="luxury-button w-full mt-4">
                  Contact
                </Button>
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}
