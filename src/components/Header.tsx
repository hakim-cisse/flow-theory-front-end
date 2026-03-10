import { Button } from "@/components/ui/button";
import { ArrowRight, Menu, X } from "lucide-react";
import { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import logo from "@/assets/flow-theory-logo.png";

const navLinks = [
  { label: "About", href: "#about" },
  { label: "Team", href: "#founders" },
  { label: "Services", href: "#services" },
  { label: "Case Studies", href: "#case-studies" },
  { label: "Blog", href: "/blog", isRoute: true },
];

interface HeaderProps {
  onContactClick: () => void;
}

export const Header = ({ onContactClick }: HeaderProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleNavClick = (link: { href: string; isRoute?: boolean }) => {
    if (link.isRoute) {
      navigate(link.href);
    } else {
      if (location.pathname !== "/") {
        navigate("/");
        setTimeout(() => {
          const element = document.querySelector(link.href);
          if (element) element.scrollIntoView({ behavior: "smooth" });
        }, 100);
      } else {
        const element = document.querySelector(link.href);
        if (element) element.scrollIntoView({ behavior: "smooth" });
      }
    }
    setIsOpen(false);
  };

  const handleLogoClick = () => {
    if (location.pathname !== "/") {
      navigate("/");
    } else {
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50">
      <div className={`border-b transition-all duration-300 ${
        scrolled 
          ? 'bg-background/90 backdrop-blur-xl border-border/30' 
          : 'bg-transparent border-transparent'
      }`}>
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-6xl">
          <div className="flex items-center justify-between h-16">
            <img
              src={logo}
              alt="Flow Theory AI"
              className="h-8 md:h-10 w-auto cursor-pointer"
              onClick={handleLogoClick}
            />

            <nav className="hidden md:flex items-center gap-1">
              {navLinks.map((link) => (
                <button
                  key={link.href}
                  onClick={() => handleNavClick(link)}
                  className="px-3 py-2 text-sm text-muted-foreground hover:text-foreground transition-colors"
                >
                  {link.label}
                </button>
              ))}
              <button
                onClick={onContactClick}
                className="px-3 py-2 text-sm text-muted-foreground hover:text-foreground transition-colors"
              >
                Contact
              </button>
            </nav>

            <div className="flex items-center gap-3">
              <Button
                onClick={() => handleNavClick({ href: "#cta" })}
                className="gap-2 text-xs md:text-sm px-4"
                size="sm"
              >
                Book an intro
                <ArrowRight className="w-3 h-3 md:w-4 md:h-4" />
              </Button>

              <button
                onClick={() => setIsOpen(!isOpen)}
                className="md:hidden p-2 text-foreground"
                aria-label="Toggle menu"
              >
                {isOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
              </button>
            </div>
          </div>
        </div>
      </div>

      {isOpen && (
        <div className="md:hidden bg-background/95 backdrop-blur-xl border-b border-border/30">
          <nav className="container mx-auto px-4 py-4 flex flex-col gap-1">
            {navLinks.map((link) => (
              <button
                key={link.href}
                onClick={() => handleNavClick(link)}
                className="px-4 py-3 text-sm text-muted-foreground hover:text-foreground transition-colors text-left"
              >
                {link.label}
              </button>
            ))}
            <button
              onClick={() => { onContactClick(); setIsOpen(false); }}
              className="px-4 py-3 text-sm text-muted-foreground hover:text-foreground transition-colors text-left"
            >
              Contact
            </button>
          </nav>
        </div>
      )}
    </header>
  );
};
