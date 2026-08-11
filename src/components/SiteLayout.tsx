import { ReactNode, useState } from "react";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { ContactDialog } from "@/components/ContactDialog";
import { AmbientBackground } from "@/components/AmbientBackground";
import { ScrollProgress } from "@/components/ScrollProgress";

interface SiteLayoutProps {
  children: ReactNode;
}

export const SiteLayout = ({ children }: SiteLayoutProps) => {
  const [contactOpen, setContactOpen] = useState(false);

  return (
    <div className="min-h-screen pt-16 relative">
      <AmbientBackground />
      <ScrollProgress />
      <div className="relative z-10">
        <Header onContactClick={() => setContactOpen(true)} />
        <main>{children}</main>
        <Footer onContactClick={() => setContactOpen(true)} />
      </div>
      <ContactDialog open={contactOpen} onOpenChange={setContactOpen} />
    </div>
  );
};

export default SiteLayout;
