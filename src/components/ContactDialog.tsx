import { useState } from "react";
import { z } from "zod";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { Send, Loader2 } from "lucide-react";
import { useTranslation } from "react-i18next";

const contactSchema = z.object({
  name: z.string().trim().min(1, "Name is required").max(100, "Name must be less than 100 characters"),
  email: z.string().trim().email("Invalid email address").max(255, "Email must be less than 255 characters"),
  company: z.string().trim().min(1, "Company name is required").max(100, "Company name must be less than 100 characters"),
  website: z.string().trim().url("Invalid website URL").max(255, "Website must be less than 255 characters").optional().or(z.literal("")),
  message: z.string().trim().min(1, "Message is required").max(1000, "Message must be less than 1000 characters"),
});

type ContactFormData = z.infer<typeof contactSchema>;

interface ContactDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export const ContactDialog = ({ open, onOpenChange }: ContactDialogProps) => {
  const { toast } = useToast();
  const { t } = useTranslation();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState<ContactFormData>({
    name: "",
    email: "",
    company: "",
    website: "",
    message: "",
  });
  const [errors, setErrors] = useState<Partial<Record<keyof ContactFormData, string>>>({});

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    // Clear error when user types
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
        if (err.path[0]) {
          fieldErrors[err.path[0] as keyof ContactFormData] = err.message;
        }
      });
      setErrors(fieldErrors);
      return;
    }

    setIsSubmitting(true);

    try {
      const response = await fetch("https://hook.us2.make.com/xa6o1t5aeqt7r28k3v12k8bk7ksuor54", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        mode: "no-cors",
        body: JSON.stringify({
          ...result.data,
          timestamp: new Date().toISOString(),
        }),
      });

      toast({
        title: t("contactDialog.toastSuccessTitle"),
        description: t("contactDialog.toastSuccessDesc"),
      });
    } catch (error) {
      console.error("Error sending message:", error);
      toast({
        title: t("contactDialog.toastErrorTitle"),
        description: t("contactDialog.toastErrorDesc"),
        variant: "destructive",
      });
      setIsSubmitting(false);
      return;
    }

    setFormData({ name: "", email: "", company: "", website: "", message: "" });
    setIsSubmitting(false);
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="text-2xl">{t("contactDialog.title")}</DialogTitle>
          <DialogDescription>
            {t("contactDialog.description")}
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4 mt-4">
          <div className="space-y-2">
            <Label htmlFor="name">{t("contactDialog.name")} *</Label>
            <Input
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder={t("contactDialog.placeholders.name")}
              className={errors.name ? "border-destructive" : ""}
            />
            {errors.name && <p className="text-sm text-destructive">{errors.name}</p>}
          </div>

          <div className="space-y-2">
            <Label htmlFor="email">{t("contactDialog.email")} *</Label>
            <Input
              id="email"
              name="email"
              type="email"
              value={formData.email}
              onChange={handleChange}
              placeholder={t("contactDialog.placeholders.email")}
              className={errors.email ? "border-destructive" : ""}
            />
            {errors.email && <p className="text-sm text-destructive">{errors.email}</p>}
          </div>

          <div className="space-y-2">
            <Label htmlFor="company">{t("contactDialog.company")} *</Label>
            <Input
              id="company"
              name="company"
              value={formData.company}
              onChange={handleChange}
              placeholder={t("contactDialog.placeholders.company")}
              className={errors.company ? "border-destructive" : ""}
            />
            {errors.company && <p className="text-sm text-destructive">{errors.company}</p>}
          </div>

          <div className="space-y-2">
            <Label htmlFor="website">{t("contactDialog.website")}</Label>
            <Input
              id="website"
              name="website"
              value={formData.website}
              onChange={handleChange}
              placeholder={t("contactDialog.placeholders.website")}
              className={errors.website ? "border-destructive" : ""}
            />
            {errors.website && <p className="text-sm text-destructive">{errors.website}</p>}
          </div>

          <div className="space-y-2">
            <Label htmlFor="message">{t("contactDialog.message")} *</Label>
            <Textarea
              id="message"
              name="message"
              value={formData.message}
              onChange={handleChange}
              placeholder={t("contactDialog.placeholders.message")}
              rows={4}
              className={errors.message ? "border-destructive" : ""}
            />
            {errors.message && <p className="text-sm text-destructive">{errors.message}</p>}
          </div>

          <Button type="submit" className="w-full gap-2" disabled={isSubmitting}>
            {isSubmitting ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin" />
                {t("contactDialog.sending")}
              </>
            ) : (
              <>
                <Send className="w-4 h-4" />
                {t("contactDialog.submit")}
              </>
            )}
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
};
