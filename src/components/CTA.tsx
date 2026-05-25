import { useState } from "react";
import { z } from "zod";
import { Loader2, ArrowRight } from "lucide-react";
import { useScrollReveal, staggerStyle } from "@/hooks/useScrollReveal";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";

const REASONS = [
  { value: "services", label: "Interest in services" },
  { value: "careers", label: "Career opportunities" },
  { value: "partnership", label: "Partnering with us" },
  { value: "other", label: "Something else" },
] as const;

const contactSchema = z.object({
  firstName: z.string().trim().min(1, "First name is required").max(50),
  lastName: z.string().trim().min(1, "Last name is required").max(50),
  email: z.string().trim().email("Invalid email address").max(255),
  company: z.string().trim().max(100).optional().or(z.literal("")),
  website: z.string().trim().url("Invalid URL").max(255).optional().or(z.literal("")),
  reason: z.enum(["services", "careers", "partnership", "other"], {
    errorMap: () => ({ message: "Please select a reason" }),
  }),
  message: z.string().trim().min(1, "Message is required").max(1000),
});

type ContactFormData = z.infer<typeof contactSchema>;

export const CTA = () => {
  const { ref, isVisible } = useScrollReveal();
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState<ContactFormData>({
    firstName: "",
    lastName: "",
    email: "",
    company: "",
    website: "",
    reason: "" as ContactFormData["reason"],
    message: "",
  });
  const [errors, setErrors] = useState<Partial<Record<keyof ContactFormData, string>>>({});

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>,
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name as keyof ContactFormData]) {
      setErrors((prev) => ({ ...prev, [name]: undefined }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrors({});

    const result = contactSchema.safeParse(formData);
    if (!result.success) {
      const fieldErrors: Partial<Record<keyof ContactFormData, string>> = {};
      result.error.errors.forEach((err) => {
        if (err.path[0]) fieldErrors[err.path[0] as keyof ContactFormData] = err.message;
      });
      setErrors(fieldErrors);
      return;
    }

    setIsSubmitting(true);
    try {
      await fetch("https://hook.us2.make.com/xa6o1t5aeqt7r28k3v12k8bk7ksuor54", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        mode: "no-cors",
        body: JSON.stringify({ ...result.data, timestamp: new Date().toISOString() }),
      });
      toast({ title: "Message sent.", description: "We'll be in touch within 24 hours." });
      setFormData({ name: "", email: "", company: "", website: "", message: "" });
    } catch (error) {
      console.error(error);
      toast({ title: "Error", description: "Failed to send. Please try again.", variant: "destructive" });
    } finally {
      setIsSubmitting(false);
    }
  };

  const inputClass =
    "w-full bg-transparent border-0 border-b border-foreground/20 rounded-none px-0 py-4 text-lg md:text-xl text-foreground placeholder:text-foreground/30 focus:outline-none focus:border-primary transition-colors";

  return (
    <section id="cta" className="py-24 sm:py-32 relative overflow-hidden section-9">
      <div ref={ref} className="container mx-auto px-6 md:px-20 lg:px-28 max-w-[1600px]">
        <div className="grid grid-cols-12 gap-6 md:gap-10">
          {/* Left column — editorial intro */}
          <div className="col-span-12 lg:col-span-5 lg:sticky lg:top-32 lg:self-start">
            <span className="text-mono text-primary/70 block mb-6" style={staggerStyle(0, isVisible)}>
              Let's talk
            </span>
            <h2 className="text-heading" style={staggerStyle(1, isVisible)}>
              Ready to stop guessing<br />
              <span className="text-gradient italic font-light">and start building?</span>
            </h2>
            <div className="accent-bar mt-6" style={staggerStyle(2, isVisible)} />
            <p
              className="text-subheading text-muted-foreground max-w-md mt-8"
              style={staggerStyle(3, isVisible)}
            >
              Tell us about your business. We'll identify where AI creates real leverage and reply within 24 hours. No pitch, just clarity.
            </p>

            <div
              className="hidden lg:block mt-12 pt-8 border-t border-foreground/15 text-mono text-foreground/50"
              style={staggerStyle(4, isVisible)}
            >
              <p>Reply within 24 hours</p>
              <p className="mt-2">No obligation · No sales pressure</p>
            </div>
          </div>

          {/* Right column — form */}
          <form
            onSubmit={handleSubmit}
            className="col-span-12 lg:col-span-7 lg:pl-10 xl:pl-20"
            style={staggerStyle(4, isVisible, { distance: 24 })}
          >
            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8">
              <div className="md:col-span-1">
                <label htmlFor="name" className="text-mono text-foreground/50 block">
                  01 / Name
                </label>
                <input
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="Your full name"
                  className={`${inputClass} ${errors.name ? "border-destructive" : ""}`}
                />
                {errors.name && <p className="text-xs text-destructive mt-2">{errors.name}</p>}
              </div>

              <div className="md:col-span-1 mt-8 md:mt-0">
                <label htmlFor="email" className="text-mono text-foreground/50 block">
                  02 / Email
                </label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="you@company.com"
                  className={`${inputClass} ${errors.email ? "border-destructive" : ""}`}
                />
                {errors.email && <p className="text-xs text-destructive mt-2">{errors.email}</p>}
              </div>

              <div className="md:col-span-1 mt-8">
                <label htmlFor="company" className="text-mono text-foreground/50 block">
                  03 / Company
                </label>
                <input
                  id="company"
                  name="company"
                  value={formData.company}
                  onChange={handleChange}
                  placeholder="Your company"
                  className={`${inputClass} ${errors.company ? "border-destructive" : ""}`}
                />
                {errors.company && <p className="text-xs text-destructive mt-2">{errors.company}</p>}
              </div>

              <div className="md:col-span-1 mt-8">
                <label htmlFor="website" className="text-mono text-foreground/50 block">
                  04 / Website <span className="text-foreground/30">(optional)</span>
                </label>
                <input
                  id="website"
                  name="website"
                  value={formData.website}
                  onChange={handleChange}
                  placeholder="https://"
                  className={`${inputClass} ${errors.website ? "border-destructive" : ""}`}
                />
                {errors.website && <p className="text-xs text-destructive mt-2">{errors.website}</p>}
              </div>

              <div className="md:col-span-2 mt-8">
                <label htmlFor="message" className="text-mono text-foreground/50 block">
                  05 / What are you trying to solve?
                </label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  placeholder="Briefly describe your business and the operational friction you're feeling..."
                  rows={5}
                  className={`${inputClass} resize-none ${errors.message ? "border-destructive" : ""}`}
                />
                {errors.message && <p className="text-xs text-destructive mt-2">{errors.message}</p>}
              </div>
            </div>

            <div className="mt-12 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-6">
              <p className="text-mono text-foreground/50">
                By submitting you'll hear back from a founder, not a bot.
              </p>
              <Button
                type="submit"
                size="lg"
                disabled={isSubmitting}
                className="group rounded-none font-medium tracking-wide px-8 py-6 text-sm uppercase"
              >
                {isSubmitting ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" />
                    Sending
                  </>
                ) : (
                  <>
                    Send message
                    <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </>
                )}
              </Button>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
};
