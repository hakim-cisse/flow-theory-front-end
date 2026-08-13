import { Hero } from "@/components/Hero";
import { About } from "@/components/About";
import { WhatWeDo } from "@/components/WhatWeDo";
import { Services } from "@/components/Services";
import { Stratum } from "@/components/Stratum";
import { Founders } from "@/components/Founders";
import { CaseStudy } from "@/components/CaseStudy";
import { Testimonials } from "@/components/Testimonials";
import { SEO } from "@/components/SEO";
import { OrganizationSchema, WebsiteSchema } from "@/components/StructuredData";
import { BlogPreview } from "@/components/BlogPreview";
import { SiteLayout } from "@/components/SiteLayout";

const Index = () => (
  <SiteLayout>
    <SEO
      title="Built by Founders to Make AI Your Operating Advantage"
      description="We help ambitious companies figure out where AI creates real leverage, then build and embed the systems that make it operational. Strategy, engineering, and adoption — end to end."
      canonicalUrl="https://www.flowtheoryai.com/"
    />
    <OrganizationSchema />
    <WebsiteSchema />
    <Hero />
    <About />
    <Services />
    <Founders />
    <WhatWeDo />
    <Stratum />
    <CaseStudy />
    <Testimonials />
    <BlogPreview />
  </SiteLayout>
);

export default Index;
