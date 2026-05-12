import { motion } from "framer-motion";
import {
  Globe2,
  ClipboardList,
  Database,
  BellRing,
  CalendarCheck2,
  ArrowRight,
  ArrowDown,
  type LucideIcon,
} from "lucide-react";
import Section from "./ui/Section";

type Step = {
  icon: LucideIcon;
  title: string;
  body: string;
  tools: string[];
};

const STEPS: Step[] = [
  {
    icon: Globe2,
    title: "Website visitor",
    body: "A prospect lands on the page from search, social, or paid ads.",
    tools: ["Landing page"],
  },
  {
    icon: ClipboardList,
    title: "Lead form or chatbot",
    body: "Visitor submits the form or chats with the assistant. Data is validated and normalized.",
    tools: ["Form", "Chatbot"],
  },
  {
    icon: Database,
    title: "Google Sheets or CRM",
    body: "Lead is instantly logged to a spreadsheet and synced into the clinic's CRM of choice.",
    tools: ["Google Sheets", "HubSpot", "Pipedrive"],
  },
  {
    icon: BellRing,
    title: "Email or WhatsApp alert",
    body: "Front desk and on-call staff get notified through their preferred channel — within seconds.",
    tools: ["Email", "WhatsApp", "SMS"],
  },
  {
    icon: CalendarCheck2,
    title: "Automated follow-up",
    body: "Confirmation, reminders, and re-engagement sequences fire automatically until the appointment is booked.",
    tools: ["n8n", "Make.com", "Zapier"],
  },
];

export default function AutomationFlow() {
  return (
    <Section
      id="automation"
      eyebrow="The automation system"
      title="From visitor to booked appointment — automatically"
      subtitle="The real value isn't the website. It's what happens in the seconds after a visitor hits 'submit' — the full pipeline runs without a single manual step."
    >
      {/* Desktop ≥ lg: 5-column row with horizontal arrows between cards. */}
      <div className="hidden lg:flex lg:items-stretch lg:gap-2">
        {STEPS.map((step, i) => (
          <div key={step.title} className="flex flex-1 items-stretch">
            <div className="flex-1">
              <FlowCard step={step} index={i} />
            </div>
            {i < STEPS.length - 1 && (
              <div className="flex shrink-0 items-center px-1 text-brand-400">
                <ArrowRight size={22} />
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Tablet md-lg: 2-column grid (no arrows; visual flow is implicit). */}
      <div className="hidden md:grid md:grid-cols-2 md:gap-4 lg:hidden">
        {STEPS.map((step, i) => (
          <FlowCard key={step.title} step={step} index={i} />
        ))}
      </div>

      {/* Mobile: vertical column with down arrows. */}
      <div className="flex flex-col gap-2 md:hidden">
        {STEPS.map((step, i) => (
          <div key={step.title}>
            <FlowCard step={step} index={i} />
            {i < STEPS.length - 1 && (
              <div className="my-1.5 flex justify-center text-brand-400">
                <ArrowDown size={20} />
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Concrete payload snippet — anchors the abstract flow above. */}
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-60px" }}
        transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
        className="mt-14 grid items-stretch gap-6 md:grid-cols-2"
      >
        <div className="flex flex-col justify-center">
          <p className="text-sm font-semibold uppercase tracking-[0.18em] text-brand-600">
            What gets sent
          </p>
          <h3 className="mt-2 text-2xl font-bold tracking-tight text-navy-900">
            A clean JSON payload — ready for any tool
          </h3>
          <p className="mt-3 text-sm leading-relaxed text-navy-500">
            Every lead is normalized into a single, predictable shape. n8n,
            Make.com, Zapier — or a custom backend — only need to map fields,
            never parse formats. The same payload powers Google Sheets, your
            CRM, the notification channel, and the follow-up sequence.
          </p>
        </div>
        <pre className="overflow-x-auto rounded-2xl bg-navy-900 p-5 text-xs leading-relaxed text-slate-100 shadow-soft ring-1 ring-navy-700">
{`{
  "source": "brightsmile-website",
  "submittedAt": "2026-05-12T10:42:18Z",
  "lead": {
    "fullName": "Jane Doe",
    "phone": "+1 (555) 010-2040",
    "email": "jane@example.com",
    "service": "Teeth Whitening",
    "preferredTime": "Weekday mornings",
    "message": "Before a wedding next month."
  },
  "meta": { "userAgent": "…", "pageUrl": "…" }
}`}
        </pre>
      </motion.div>
    </Section>
  );
}

function FlowCard({ step, index }: { step: Step; index: number }) {
  const { icon: Icon } = step;
  return (
    <div className="relative flex h-full flex-col rounded-2xl bg-white p-5 shadow-soft ring-1 ring-navy-100">
      <span className="absolute -top-3 left-5 inline-flex items-center gap-1 rounded-full bg-brand-500 px-3 py-1 text-[11px] font-bold uppercase tracking-wider text-white shadow-soft">
        Step {index + 1}
      </span>
      <span className="mt-2 grid h-11 w-11 place-items-center rounded-xl bg-brand-50 text-brand-600">
        <Icon size={20} />
      </span>
      <h3 className="mt-3 text-base font-semibold text-navy-900">{step.title}</h3>
      <p className="mt-1.5 text-sm leading-relaxed text-navy-500">{step.body}</p>
      <div className="mt-4 flex flex-wrap gap-1.5">
        {step.tools.map((t) => (
          <span
            key={t}
            className="inline-flex items-center rounded-full bg-slate-100 px-2.5 py-1 text-[11px] font-medium text-navy-700 ring-1 ring-navy-100"
          >
            {t}
          </span>
        ))}
      </div>
    </div>
  );
}
