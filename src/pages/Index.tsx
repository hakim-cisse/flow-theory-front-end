import { useState } from "react";
import { Hero } from "@/components/Hero";
import { LogoCatalog } from "@/components/LogoCatalog";
import { About } from "@/components/About";
import { HowItWorks } from "@/components/HowItWorks";
import { Founders } from "@/components/Founders";
import { Services } from "@/components/Services";
import { CaseStudy } from "@/components/CaseStudy";
import { Testimonials } from "@/components/Testimonials";
import { CTA } from "@/components/CTA";
import { Footer } from "@/components/Footer";
import { ThemeToggle } from "@/components/ThemeToggle";
import { Header } from "@/components/Header";
import { ContactDialog } from "@/components/ContactDialog";
import { SEO } from "@/components/SEO";
import { OrganizationSchema, WebsiteSchema } from "@/components/StructuredData";

const Index = () => {
  const [contactOpen, setContactOpen] = useState(false);

  return (
    <div className="min-h-screen pt-16">
      <SEO
        title="AI Transformation Built on Strategy and ROI"
        description="Flow Theory AI helps businesses cut through the noise, build a clear AI roadmap, and execute only what delivers measurable business value. AI automation, consulting & custom SaaS."
        canonicalUrl="https://www.flowtheoryai.com/"
        ogTitle="Flow Theory AI - AI Transformation Built on Strategy and ROI"
        ogDescription="Flow Theory AI helps businesses cut through the noise, build a clear AI roadmap, and execute only what delivers measurable business value."
      />
      <OrganizationSchema />
      <WebsiteSchema />
      <Header onContactClick={() => setContactOpen(true)} />
      <ThemeToggle />
      <Hero />
      <LogoCatalog />
      <About />
      <HowItWorks />
      <Services />
      <CaseStudy />
      <Testimonials />
      <Founders />
      <CTA />
      <Footer onContactClick={() => setContactOpen(true)} />
      <ContactDialog open={contactOpen} onOpenChange={setContactOpen} />
    </div>
  );
};

export default Index;
