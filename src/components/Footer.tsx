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
    <footer className="relative border-t border-border/20 section-9">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-12">
            <div>
              <img src={logo} alt="Flow Theory AI" className="h-10 w-auto mb-4 opacity-70" />
              <p className="text-sm text-muted-foreground leading-relaxed">
                AI transformation built on strategy, discovery, and measurable results. By founders, for founders.
              </p>
            </div>

            <div>
              <h4 className="text-mono text-foreground mb-4">Navigate</h4>
              <nav className="flex flex-col gap-2">
                <a href="#about" className="text-sm text-muted-foreground hover:text-primary transition-colors">About</a>
                <a href="#services" className="text-sm text-muted-foreground hover:text-primary transition-colors">Services</a>
                <a href="#case-studies" className="text-sm text-muted-foreground hover:text-primary transition-colors">Case Studies</a>
                <button onClick={onContactClick} className="text-sm text-muted-foreground hover:text-primary transition-colors text-left">Contact</button>
              </nav>
            </div>

            <div>
              <h4 className="text-mono text-foreground mb-4">Connect</h4>
              <div className="flex gap-4">
                {social.map((item) => (
                  <a
                    key={item.name}
                    href={item.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-2 border border-border/30 hover:border-primary/30 text-muted-foreground hover:text-primary transition-all duration-300"
                    aria-label={item.name}
                  >
                    <item.icon className="h-4 w-4" strokeWidth={1.5} />
                  </a>
                ))}
              </div>
            </div>
          </div>

          <div className="border-t border-border/20 pt-8 flex flex-col sm:flex-row items-center justify-between gap-4">
            <p className="text-xs text-muted-foreground">© 2026 Flow Theory AI</p>
            <p className="text-xs text-muted-foreground/50 italic">Built with precision and purpose.</p>
          </div>
        </div>
      </div>
    </footer>
  );
};
