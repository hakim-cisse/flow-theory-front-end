import { Linkedin, Twitter, Instagram } from "lucide-react";
import logo from "@/assets/flow-theory-logo.png";

const social = [
  { name: "LinkedIn", icon: Linkedin, href: "https://www.linkedin.com/company/107525980" },
  { name: "Twitter", icon: Twitter, href: "https://x.com/flowtheoryai" },
  { name: "Instagram", icon: Instagram, href: "https://www.instagram.com/flowtheoryai/" },
];

interface FooterProps {
  onContactClick: () => void;
}

export const Footer = ({ onContactClick }: FooterProps) => {
  return (
    <footer className="relative border-t border-primary/10 section-9">
      <div className="absolute top-0 left-0 right-0 section-divider" />

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="max-w-6xl mx-auto">
          <div className="flex justify-center mb-8">
            <img src={logo} alt="Flow Theory AI" className="h-12 w-auto opacity-80" />
          </div>

          <nav className="flex flex-wrap justify-center gap-8 mb-8">
            <a href="#about" className="text-muted-foreground hover:text-primary transition-colors duration-300 font-medium">
              About
            </a>
            <a href="#services" className="text-muted-foreground hover:text-primary transition-colors duration-300 font-medium">
              Services
            </a>
            <button onClick={onContactClick} className="text-muted-foreground hover:text-primary transition-colors duration-300 font-medium">
              Contact
            </button>
          </nav>

          <div className="flex justify-center gap-6 mb-8">
            {social.map((item) => (
              <a
                key={item.name}
                href={item.href}
                target="_blank"
                rel="noopener noreferrer"
                className="p-3 rounded-full border border-border/30 hover:border-primary/30 hover:bg-primary/5 text-muted-foreground hover:text-primary transition-all duration-300"
                aria-label={item.name}
              >
                <item.icon className="h-5 w-5" strokeWidth={1.5} />
              </a>
            ))}
          </div>

          <div className="text-center space-y-2">
            <p className="text-sm text-muted-foreground">
              © 2026 Flow Theory AI
            </p>
            <p className="text-sm text-muted-foreground/60 italic">
              Built with precision and purpose.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};
