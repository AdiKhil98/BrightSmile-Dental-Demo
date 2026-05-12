import { MousePointerClick, ClipboardEdit, Workflow, BellRing } from "lucide-react";
import Section from "./ui/Section";

const STEPS = [
  {
    icon: MousePointerClick,
    title: "Visitor lands on the website",
    body: "Mobile-first hero, instant load, single primary action. The page is built to convert traffic, not just describe services.",
  },
  {
    icon: ClipboardEdit,
    title: "Visitor fills the form or opens the chatbot",
    body: "Two parallel capture surfaces. Whichever the visitor prefers, the lead enters the same automation pipeline.",
  },
  {
    icon: Workflow,
    title: "Lead is saved and sent to automation",
    body: "A clean JSON payload is delivered to your webhook — n8n, Make.com, or Zapier — and fanned out to Sheets, CRM, and notifiers.",
  },
  {
    icon: BellRing,
    title: "Clinic gets notified and follows up",
    body: "Front desk sees the lead in their preferred channel — email, Slack, WhatsApp, SMS — and follows up within minutes.",
  },
];

export default function HowItWorks() {
  return (
    <Section
      id="how-it-works"
      eyebrow="How it works"
      title="From click to confirmed appointment in 4 steps"
      subtitle="Designed for clinics that want a real funnel, not just a brochure."
    >
      <ol className="grid gap-5 md:grid-cols-2 lg:grid-cols-4">
        {STEPS.map(({ icon: Icon, title, body }, i) => (
          <li
            key={title}
            className="relative rounded-2xl bg-white p-6 shadow-soft ring-1 ring-navy-100"
          >
            <span className="absolute -top-3 left-6 inline-flex items-center gap-1 rounded-full bg-navy-900 px-3 py-1 text-xs font-bold uppercase tracking-wider text-white">
              Step {i + 1}
            </span>
            <span className="mt-2 grid h-11 w-11 place-items-center rounded-xl bg-brand-50 text-brand-600">
              <Icon size={20} />
            </span>
            <h3 className="mt-4 text-base font-semibold text-navy-900">{title}</h3>
            <p className="mt-2 text-sm leading-relaxed text-navy-500">{body}</p>
          </li>
        ))}
      </ol>
    </Section>
  );
}
