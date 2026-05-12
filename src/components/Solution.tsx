import {
  LayoutTemplate,
  ClipboardCheck,
  Bot,
  Workflow,
  MailCheck,
} from "lucide-react";
import Section from "./ui/Section";
import Card from "./ui/Card";

const PILLARS = [
  {
    icon: LayoutTemplate,
    title: "High-converting landing page",
    body: "Fast, mobile-first, and built around a single goal: turn visitors into booked appointments.",
  },
  {
    icon: ClipboardCheck,
    title: "Smart lead capture form",
    body: "Short fields, validated input, instant feedback. Payload is normalized and ready for any backend.",
  },
  {
    icon: Bot,
    title: "AI chatbot placeholder",
    body: "Front-end chat widget ready to wire to Voiceflow, OpenAI, Anthropic, or a custom intent flow.",
  },
  {
    icon: Workflow,
    title: "Automated lead tracking",
    body: "Every submission can be logged to Google Sheets, Notion, Airtable, or a CRM — automatically.",
  },
  {
    icon: MailCheck,
    title: "Email / SMS follow-up ready",
    body: "Plug into n8n or Make.com to trigger reminders, confirmations, and re-engagement sequences.",
  },
];

export default function Solution() {
  return (
    <Section
      id="solution"
      eyebrow="The solution"
      title="A website that works like a front-desk receptionist"
      subtitle="One clean front-end. Five integrated capture and follow-up surfaces. Designed to plug straight into your automation stack."
    >
      <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
        {PILLARS.map(({ icon: Icon, title, body }) => (
          <Card key={title} className="hover:-translate-y-0.5 hover:shadow-lg">
            <span className="grid h-11 w-11 place-items-center rounded-xl bg-brand-50 text-brand-600">
              <Icon size={20} />
            </span>
            <h3 className="mt-4 text-base font-semibold text-navy-900">{title}</h3>
            <p className="mt-2 text-sm leading-relaxed text-navy-500">{body}</p>
          </Card>
        ))}
      </div>
    </Section>
  );
}
