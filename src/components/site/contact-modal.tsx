"use client";

import { useEffect, useState } from "react";
import { ArrowRight, CheckCircle2, Loader2 } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { BRAND, CONTACT_INFO } from "@/lib/content";
import { useContactModal } from "@/lib/store";

type FormState = {
  name: string;
  email: string;
  company: string;
  interest: string;
  message: string;
};

const EMPTY_FORM: FormState = {
  name: "",
  email: "",
  company: "",
  interest: "",
  message: "",
};

/**
 * ContactModal — the global "Let's Talk / Book a consultation" dialog.
 * Submits the lead to POST /api/contact (validated + persisted via Prisma).
 */
export default function ContactModal() {
  const { isOpen, close } = useContactModal();
  const { toast } = useToast();
  const [form, setForm] = useState<FormState>(EMPTY_FORM);
  const [submitting, setSubmitting] = useState(false);
  const [succeeded, setSucceeded] = useState(false);

  // Reset the form shortly after the dialog closes.
  useEffect(() => {
    if (isOpen) return;
    const id = setTimeout(() => {
      setForm(EMPTY_FORM);
      setSucceeded(false);
    }, 350);
    return () => clearTimeout(id);
  }, [isOpen]);

  const setField = (field: keyof FormState, value: string) =>
    setForm((prev) => ({ ...prev, [field]: value }));

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (submitting) return;

    setSubmitting(true);
    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: form.name,
          email: form.email,
          company: form.company || null,
          interest: form.interest || null,
          message: form.message || null,
          source: "contact-modal",
        }),
      });
      const data = (await response.json()) as { ok?: boolean; error?: string };

      if (!response.ok || !data.ok) {
        throw new Error(data.error || "Request failed");
      }

      setSucceeded(true);
      toast({
        title: "Request received",
        description: `${BRAND.name} replies within 24 hours — watch your inbox.`,
      });
      setTimeout(() => close(), 1800);
    } catch (error) {
      toast({
        title: "Something went wrong",
        description:
          error instanceof Error && error.message === "Invalid input"
            ? "Please check your name and email, then try again."
            : `Please try again, or email us directly at ${CONTACT_INFO.email}.`,
        variant: "destructive",
      });
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={(open) => (open ? null : close())}>
      <DialogContent className="max-h-[92vh] overflow-y-auto custom-scrollbar border-slate-200 bg-white p-0 sm:max-w-lg">
        <div className="max-h-[92vh] overflow-y-auto custom-scrollbar">
          <DialogHeader className="border-b border-slate-100 px-6 pb-6 pt-7 sm:px-8">
            <DialogTitle className="text-2xl font-semibold tracking-tight text-slate-900">
              Let&apos;s talk
            </DialogTitle>
            <DialogDescription className="mt-2 text-sm leading-relaxed text-slate-500">
              Free 30-minute strategy call. Bring a problem, a product idea, or a
              hiring gap — we&apos;ll map a path. We reply within 24 hours.
            </DialogDescription>
          </DialogHeader>

          {succeeded ? (
            <div className="flex flex-col items-center justify-center gap-4 px-8 py-16 text-center">
              <span className="flex h-14 w-14 items-center justify-center rounded-full bg-blue-50">
                <CheckCircle2 className="h-7 w-7 text-blue-600" aria-hidden />
              </span>
              <p className="text-lg font-semibold text-slate-900">
                Request received
              </p>
              <p className="max-w-sm text-sm text-slate-500">
                Thanks, {form.name.split(" ")[0] || "there"} — a senior engineer
                (not a sales rep) will reach out within 24 hours.
              </p>
            </div>
          ) : (
            <form
              onSubmit={handleSubmit}
              className="space-y-5 px-6 py-6 sm:px-8"
              noValidate={false}
            >
              <div className="grid gap-5 sm:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="contact-name" className="text-slate-700">
                    Name <span className="text-blue-600">*</span>
                  </Label>
                  <Input
                    id="contact-name"
                    name="name"
                    autoComplete="name"
                    required
                    minLength={2}
                    maxLength={120}
                    placeholder="Ada Lovelace"
                    value={form.name}
                    onChange={(e) => setField("name", e.target.value)}
                    className="border-slate-200 bg-white"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="contact-email" className="text-slate-700">
                    Work email <span className="text-blue-600">*</span>
                  </Label>
                  <Input
                    id="contact-email"
                    name="email"
                    type="email"
                    autoComplete="email"
                    required
                    maxLength={200}
                    placeholder="ada@company.com"
                    value={form.email}
                    onChange={(e) => setField("email", e.target.value)}
                    className="border-slate-200 bg-white"
                  />
                </div>
              </div>

              <div className="grid gap-5 sm:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="contact-company" className="text-slate-700">
                    Company
                  </Label>
                  <Input
                    id="contact-company"
                    name="company"
                    autoComplete="organization"
                    maxLength={160}
                    placeholder="Acme Inc."
                    value={form.company}
                    onChange={(e) => setField("company", e.target.value)}
                    className="border-slate-200 bg-white"
                  />
                </div>
                <div className="space-y-2">
                  <Label className="text-slate-700">I&apos;m interested in</Label>
                  <Select
                    value={form.interest}
                    onValueChange={(value) => setField("interest", value)}
                  >
                    <SelectTrigger
                      id="contact-interest"
                      className="w-full border-slate-200 bg-white text-slate-900"
                      aria-label="Area of interest"
                    >
                      <SelectValue placeholder="Select a focus area" />
                    </SelectTrigger>
                    <SelectContent className="border-slate-200">
                      {CONTACT_INFO.interests.map((interest) => (
                        <SelectItem key={interest} value={interest}>
                          {interest}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="contact-message" className="text-slate-700">
                  What are you building?
                </Label>
                <Textarea
                  id="contact-message"
                  name="message"
                  rows={4}
                  maxLength={4000}
                  placeholder="A sentence or two about your project, timeline, or team gap…"
                  value={form.message}
                  onChange={(e) => setField("message", e.target.value)}
                  className="resize-none border-slate-200 bg-white"
                />
              </div>

              <Button
                type="submit"
                size="lg"
                disabled={submitting}
                className="w-full bg-primary hover:bg-primary/90"
              >
                {submitting ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" aria-hidden />
                    Sending…
                  </>
                ) : (
                  <>
                    Book a consultation
                    <ArrowRight className="ml-2 h-4 w-4" aria-hidden />
                  </>
                )}
              </Button>

              <p className="text-center text-xs text-slate-400">
                Prefer email?{" "}
                <a
                  href={`mailto:${CONTACT_INFO.email}`}
                  className="font-medium text-blue-600 hover:underline"
                >
                  {CONTACT_INFO.email}
                </a>
              </p>
            </form>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}
