import { SiteLayout } from "@/components/SiteLayout";
import { SEO } from "@/components/SEO";
import { CTA } from "@/components/CTA";

const ContactPage = () => (
  <SiteLayout>
    <SEO
      title="Contact Flow Theory AI"
      description="Talk to the Flow Theory AI team about services, partnerships or careers. We reply within 24 hours."
      canonicalUrl="https://www.flowtheoryai.com/contact"
    />
    <div className="pt-10">
      <CTA />
    </div>
  </SiteLayout>
);

export default ContactPage;
