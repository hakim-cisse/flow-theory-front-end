import { SiteLayout } from "@/components/SiteLayout";
import { SEO } from "@/components/SEO";
import { Services } from "@/components/Services";
import { WhatWeDo } from "@/components/WhatWeDo";
import { Stratum } from "@/components/Stratum";
import { CTABanner } from "@/components/CTABanner";

const ServicesPage = () => (
  <SiteLayout>
    <SEO
      title="Services and AI Transformation Methodology"
      description="AI automation, exploratory milestones, custom SaaS and the STRATUM methodology. See how Flow Theory AI turns strategy into shipped systems."
      canonicalUrl="https://www.flowtheoryai.com/services"
    />
    <div className="pt-10">
      <Services />
      <WhatWeDo />
      <Stratum />
      <CTABanner />
    </div>
  </SiteLayout>
);

export default ServicesPage;
