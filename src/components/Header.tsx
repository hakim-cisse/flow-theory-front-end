import { Button } from "@/components/ui/button";
import { ArrowRight, Menu, X, Sun, Moon } from "lucide-react";
import { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { useTheme } from "./ThemeProvider";
import logoSrc from "@/assets/flow-theory-logo.png";

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
  const { theme, toggle } = useTheme();

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
      <div className={`transition-all duration-300 ${
        scrolled
          ? 'bg-background/85 backdrop-blur-xl border-b border-foreground/15'
          : 'bg-transparent border-b border-transparent'
      }`}>
        <div className="container mx-auto px-6 md:px-20 lg:px-28 max-w-[1600px]">
          <div className="flex items-center justify-between h-16">
            <button
              onClick={handleLogoClick}
              className="flex items-center gap-2 text-mono text-foreground hover:text-primary transition-colors"
              aria-label="Flow Theory AI — home"
            >
              <img
                src={logoSrc}
                alt=""
                className="h-7 w-auto object-contain"
              />
              <span>FLOW THEORY <span className="text-primary">AI</span></span>
            </button>

            <nav className="hidden md:flex items-center gap-8">
              {navLinks.map((link) => (
                <button
                  key={link.href}
                  onClick={() => handleNavClick(link)}
                  className="text-mono text-foreground/65 hover:text-foreground transition-colors story-link"
                >
                  {link.label}
                </button>
              ))}
              <button
                onClick={onContactClick}
                className="text-mono text-foreground/65 hover:text-foreground transition-colors story-link"
              >
                Contact
              </button>
            </nav>

            <div className="flex items-center gap-2 md:gap-3">
              <button
                onClick={toggle}
                className="p-2 text-foreground/70 hover:text-foreground transition-colors"
                aria-label={`Switch to ${theme === "dark" ? "light" : "dark"} mode`}
                title={`Switch to ${theme === "dark" ? "light" : "dark"} mode`}
              >
                {theme === "dark" ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
              </button>

              <Button
                onClick={() => handleNavClick({ href: "#cta" })}
                className="hidden md:inline-flex gap-2 text-mono rounded-none px-5"
                size="sm"
              >
                Book intro
                <ArrowRight className="w-3 h-3" />
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
