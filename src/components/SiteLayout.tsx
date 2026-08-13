import { ReactNode, useState } from "react";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { ContactDialog } from "@/components/ContactDialog";
import { AmbientBackground } from "@/components/AmbientBackground";
import { ScrollProgress } from "@/components/ScrollProgress";
import { CTABanner } from "@/components/CTABanner";

interface SiteLayoutProps {
  children: ReactNode;
  hideCTA?: boolean;
}

export const SiteLayout = ({ children, hideCTA }: SiteLayoutProps) => {
  const [contactOpen, setContactOpen] = useState(false);

  return (
    <div className="min-h-screen pt-16 relative">
      <AmbientBackground />
      <ScrollProgress />
      <div className="relative z-10">
        <Header onContactClick={() => setContactOpen(true)} />
        <main>{children}</main>
        {!hideCTA && <CTABanner />}
        <Footer onContactClick={() => setContactOpen(true)} />
      </div>
      <ContactDialog open={contactOpen} onOpenChange={setContactOpen} />
    </div>
  );
};

export default SiteLayout;
