import { PhoneOff, Hourglass, FileX, UserMinus } from "lucide-react";
import Section from "./ui/Section";
import Card from "./ui/Card";

const PROBLEMS = [
  {
    icon: PhoneOff,
    title: "Visitors leave without calling",
    body: "Most people researching dental services don't pick up the phone on the first visit. Without an easy alternative, they bounce to a competitor.",
  },
  {
    icon: Hourglass,
    title: "Slow forms kill momentum",
    body: "Long, clunky intake forms are abandoned within seconds. Speed and clarity are the difference between a lead and a lost visitor.",
  },
  {
    icon: FileX,
    title: "Manual follow-up gets dropped",
    body: "Inquiries get buried in inboxes. Without automation, qualified patients fall through the cracks during busy clinic hours.",
  },
  {
    icon: UserMinus,
    title: "No after-hours capture",
    body: "Patients search at night and on weekends. A static brochure site can't qualify them or hold their interest until Monday morning.",
  },
];

export default function Problem() {
  return (
    <Section
      id="problem"
      tone="slate"
      eyebrow="The problem"
      title="Most clinics quietly lose half their inbound leads"
      subtitle="Modern patients expect instant, mobile, no-friction interaction. Traditional websites weren't designed for it."
    >
      <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-4">
        {PROBLEMS.map(({ icon: Icon, title, body }) => (
          <Card key={title} className="hover:-translate-y-0.5 hover:shadow-lg">
            <span className="grid h-11 w-11 place-items-center rounded-xl bg-red-50 text-red-500">
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
