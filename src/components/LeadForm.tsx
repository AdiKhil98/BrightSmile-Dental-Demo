import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { AnimatePresence, motion } from "framer-motion";
import { CheckCircle2, Send, Loader2, AlertCircle } from "lucide-react";
import Section from "./ui/Section";
import { SERVICE_OPTIONS } from "../constants";
import { submitLead } from "../lib/submitLead";

// Loose phone validation: any 7+ digits, ignoring formatting characters.
const phoneSchema = z
  .string()
  .min(1, "Phone number is required")
  .refine(
    (v) => (v.replace(/\D/g, "").length >= 7),
    "Please enter a valid phone number (at least 7 digits)"
  );

const schema = z.object({
  fullName: z.string().trim().min(2, "Please enter your full name"),
  phone: phoneSchema,
  email: z.string().trim().email("Please enter a valid email address"),
  service: z.string().min(1, "Please choose a service"),
  preferredTime: z.string().trim().min(2, "Tell us when works for you"),
  message: z
    .string()
    .trim()
    .max(800, "Please keep messages under 800 characters")
    .optional()
    .or(z.literal("")),
});

type FormValues = z.infer<typeof schema>;

export default function LeadForm() {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<FormValues>({
    resolver: zodResolver(schema),
    defaultValues: {
      fullName: "",
      phone: "",
      email: "",
      service: "",
      preferredTime: "",
      message: "",
    },
  });

  const [submitState, setSubmitState] = useState<
    | { status: "idle" }
    | { status: "success"; mode: "live" | "demo" }
    | { status: "error"; error: string }
  >({ status: "idle" });

  const onSubmit = async (values: FormValues) => {
    setSubmitState({ status: "idle" });
    const result = await submitLead({
      fullName: values.fullName,
      phone: values.phone,
      email: values.email,
      service: values.service,
      preferredTime: values.preferredTime,
      message: values.message ?? "",
    });

    if (result.ok) {
      setSubmitState({ status: "success", mode: result.mode });
      reset();
    } else {
      setSubmitState({ status: "error", error: result.error });
    }
  };

  return (
    <Section
      id="contact"
      eyebrow="Book a visit"
      title="Request your free consultation"
      subtitle="Tell us a little about what you're looking for and we'll reach out within one business day."
    >
      <div className="grid gap-10 md:grid-cols-5">
        <div className="md:col-span-2">
          <div className="rounded-2xl bg-navy-900 p-8 text-white shadow-soft">
            <h3 className="text-xl font-bold">Why patients book online</h3>
            <ul className="mt-6 space-y-4 text-sm text-navy-100">
              <li className="flex items-start gap-3">
                <CheckCircle2 className="mt-0.5 shrink-0 text-brand-400" size={18} />
                <span>Confirmation within one business day, every time.</span>
              </li>
              <li className="flex items-start gap-3">
                <CheckCircle2 className="mt-0.5 shrink-0 text-brand-400" size={18} />
                <span>Reminders via email or WhatsApp — your choice.</span>
              </li>
              <li className="flex items-start gap-3">
                <CheckCircle2 className="mt-0.5 shrink-0 text-brand-400" size={18} />
                <span>Transparent, no-pressure consultation calls.</span>
              </li>
              <li className="flex items-start gap-3">
                <CheckCircle2 className="mt-0.5 shrink-0 text-brand-400" size={18} />
                <span>Same-day slots reserved for emergency requests.</span>
              </li>
            </ul>
            <p className="mt-8 text-xs text-navy-100/70">
              This is a demo project. Submissions are not stored unless a webhook
              URL is configured.
            </p>
          </div>
        </div>

        <div className="md:col-span-3">
          <AnimatePresence mode="wait" initial={false}>
            {submitState.status === "success" ? (
              <motion.div
                key="success"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.3 }}
                className="rounded-2xl bg-white p-8 shadow-soft ring-1 ring-navy-100"
              >
                <div className="flex items-start gap-4">
                  <span className="grid h-12 w-12 shrink-0 place-items-center rounded-full bg-brand-50 text-brand-600">
                    <CheckCircle2 size={26} />
                  </span>
                  <div className="flex-1">
                    <h3 className="text-xl font-bold text-navy-900">
                      Thank you! Your request has been received.
                    </h3>
                    <p className="mt-2 text-sm leading-relaxed text-navy-500">
                      In a live setup, this lead would now be sent to Google
                      Sheets, your CRM, an email notification, and the
                      follow-up automation sequence — all triggered from a
                      single submission.
                    </p>

                    <div className="mt-4 grid gap-2 sm:grid-cols-2">
                      {[
                        "Google Sheets row",
                        "CRM contact + deal",
                        "Email / WhatsApp alert",
                        "Follow-up sequence",
                      ].map((label) => (
                        <div
                          key={label}
                          className="flex items-center gap-2 rounded-lg bg-slate-50 px-3 py-2 text-xs text-navy-700 ring-1 ring-navy-100"
                        >
                          <CheckCircle2 size={14} className="text-brand-500" />
                          <span>{label}</span>
                        </div>
                      ))}
                    </div>

                    {submitState.mode === "demo" && (
                      <p className="mt-4 rounded-lg bg-slate-50 px-3 py-2 text-xs text-navy-500 ring-1 ring-navy-100">
                        <strong className="text-navy-900">Demo mode:</strong>{" "}
                        no webhook is configured, so the JSON payload was
                        logged to the browser console instead of being
                        delivered to the automation pipeline.
                      </p>
                    )}
                    <button
                      type="button"
                      onClick={() => setSubmitState({ status: "idle" })}
                      className="mt-5 inline-flex items-center gap-2 rounded-full bg-brand-500 px-5 py-2.5 text-sm font-semibold text-white shadow-soft transition-all hover:bg-brand-600"
                    >
                      Send another request
                    </button>
                  </div>
                </div>
              </motion.div>
            ) : (
              <motion.form
                key="form"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.2 }}
                noValidate
                onSubmit={handleSubmit(onSubmit)}
                className="rounded-2xl bg-white p-8 shadow-soft ring-1 ring-navy-100"
              >
                <div className="grid gap-4 md:grid-cols-2">
                  <Field
                    label="Full name"
                    error={errors.fullName?.message}
                  >
                    <input
                      type="text"
                      placeholder="Jane Doe"
                      autoComplete="name"
                      className="form-input"
                      {...register("fullName")}
                    />
                  </Field>
                  <Field label="Phone number" error={errors.phone?.message}>
                    <input
                      type="tel"
                      placeholder="(555) 010-2040"
                      autoComplete="tel"
                      className="form-input"
                      {...register("phone")}
                    />
                  </Field>
                  <Field label="Email" error={errors.email?.message}>
                    <input
                      type="email"
                      placeholder="you@email.com"
                      autoComplete="email"
                      className="form-input"
                      {...register("email")}
                    />
                  </Field>
                  <Field
                    label="Service interested in"
                    error={errors.service?.message}
                  >
                    <select
                      className="form-input"
                      defaultValue=""
                      {...register("service")}
                    >
                      <option value="" disabled>
                        Choose a service
                      </option>
                      {SERVICE_OPTIONS.map((s) => (
                        <option key={s} value={s}>
                          {s}
                        </option>
                      ))}
                    </select>
                  </Field>
                  <Field
                    label="Preferred appointment time"
                    error={errors.preferredTime?.message}
                    className="md:col-span-2"
                  >
                    <input
                      type="text"
                      placeholder="e.g. Weekday mornings, or 2026-05-20 14:00"
                      className="form-input"
                      {...register("preferredTime")}
                    />
                  </Field>
                  <Field
                    label="Message (optional)"
                    error={errors.message?.message}
                    className="md:col-span-2"
                  >
                    <textarea
                      rows={4}
                      placeholder="Anything we should know ahead of your visit?"
                      className="form-input resize-none"
                      {...register("message")}
                    />
                  </Field>
                </div>

                {submitState.status === "error" && (
                  <div className="mt-5 flex items-start gap-3 rounded-xl bg-red-50 px-4 py-3 text-sm text-red-700 ring-1 ring-red-100">
                    <AlertCircle size={18} className="mt-0.5 shrink-0" />
                    <span>
                      Something went wrong: {submitState.error}. Please try
                      again, or call us directly.
                    </span>
                  </div>
                )}

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="mt-6 inline-flex items-center justify-center gap-2 rounded-full bg-brand-500 px-7 py-3.5 text-base font-semibold text-white shadow-soft transition-all hover:bg-brand-600 active:scale-[0.98] disabled:cursor-not-allowed disabled:opacity-70"
                >
                  {isSubmitting ? (
                    <>
                      <Loader2 size={18} className="animate-spin" /> Sending…
                    </>
                  ) : (
                    <>
                      <Send size={18} /> Request consultation
                    </>
                  )}
                </button>

                <p className="mt-3 text-xs text-navy-500">
                  By submitting you agree to be contacted about your
                  appointment request. Demo project — no marketing emails.
                </p>
              </motion.form>
            )}
          </AnimatePresence>
        </div>
      </div>

      <style>{`
        .form-input {
          width: 100%;
          border-radius: 0.75rem;
          border: 1px solid rgb(226 232 240);
          background-color: white;
          padding: 0.75rem 0.9rem;
          font-size: 0.9rem;
          color: rgb(15 23 42);
          outline: none;
          transition: box-shadow 0.15s, border-color 0.15s;
        }
        .form-input::placeholder { color: rgb(148 163 184); }
        .form-input:focus {
          border-color: rgb(20 184 166);
          box-shadow: 0 0 0 4px rgba(20,184,166,0.15);
        }
        .form-input[aria-invalid="true"] {
          border-color: rgb(248 113 113);
          box-shadow: 0 0 0 4px rgba(248,113,113,0.12);
        }
      `}</style>
    </Section>
  );
}

function Field({
  label,
  error,
  children,
  className = "",
}: {
  label: string;
  error?: string;
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <label className={`block ${className}`}>
      <span className="mb-1.5 block text-xs font-semibold uppercase tracking-wider text-navy-700">
        {label}
      </span>
      {children}
      {error && (
        <span className="mt-1.5 block text-xs font-medium text-red-600">
          {error}
        </span>
      )}
    </label>
  );
}
