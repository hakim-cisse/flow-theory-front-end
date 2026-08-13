import { SiteLayout } from "@/components/SiteLayout";
import { SEO } from "@/components/SEO";
import { CTA } from "@/components/CTA";

const ContactPage = () => (
  <SiteLayout hideCTA>
    <SEO
      title="Contact Flow Theory AI"
      description="Talk to the Flow Theory AI team about services, partnerships or careers. We help ambitious companies figure out where AI creates real leverage — then build it."
      canonicalUrl="https://www.flowtheoryai.com/contact"
    />
    <div className="pt-10">
      <CTA />
    </div>
  </SiteLayout>
);

export default ContactPage;
