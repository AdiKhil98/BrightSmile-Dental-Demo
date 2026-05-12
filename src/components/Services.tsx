import {
  Stethoscope,
  Sparkles,
  Anchor,
  Siren,
  Smile,
  type LucideIcon,
} from "lucide-react";
import Section from "./ui/Section";
import Card from "./ui/Card";
import { SERVICES } from "../constants";

const ICONS: Record<string, LucideIcon> = {
  Stethoscope,
  Sparkles,
  Anchor,
  Siren,
  Smile,
};

export default function Services() {
  return (
    <Section
      id="services"
      tone="slate"
      eyebrow="Services"
      title="Comprehensive dental care, modern delivery"
      subtitle="Each service has its own intent — and its own automation path for intake, follow-up, and re-engagement."
    >
      <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
        {SERVICES.map((service) => {
          const Icon = ICONS[service.icon] ?? Smile;
          return (
            <Card
              key={service.id}
              className="hover:-translate-y-0.5 hover:shadow-lg"
            >
              <span className="grid h-11 w-11 place-items-center rounded-xl bg-brand-50 text-brand-600">
                <Icon size={20} />
              </span>
              <h3 className="mt-4 text-base font-semibold text-navy-900">
                {service.name}
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-navy-500">
                {service.description}
              </p>
            </Card>
          );
        })}
      </div>
    </Section>
  );
}
