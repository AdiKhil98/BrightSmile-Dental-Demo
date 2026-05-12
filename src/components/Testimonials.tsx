import { Quote } from "lucide-react";
import Section from "./ui/Section";
import Card from "./ui/Card";
import { TESTIMONIALS } from "../constants";

export default function Testimonials() {
  return (
    <Section
      id="testimonials"
      tone="slate"
      eyebrow="Testimonials"
      title="What patients are (hypothetically) saying"
      subtitle="These quotes are illustrative — written to show the tone and outcomes a fully wired-up system can deliver."
    >
      <div className="grid gap-5 md:grid-cols-3">
        {TESTIMONIALS.map((t) => (
          <Card key={t.name} className="flex h-full flex-col">
            <Quote className="text-brand-400" size={28} />
            <p className="mt-3 text-sm leading-relaxed text-navy-700">
              “{t.quote}”
            </p>
            <div className="mt-6 flex items-center gap-3">
              <img
                src={t.avatar}
                alt={t.name}
                className="h-10 w-10 rounded-full object-cover ring-2 ring-white"
                loading="lazy"
              />
              <div>
                <p className="text-sm font-semibold text-navy-900">{t.name}</p>
                <p className="text-xs text-navy-500">{t.role}</p>
              </div>
            </div>
          </Card>
        ))}
      </div>
      <p className="mt-8 text-center text-xs text-navy-500">
        Demo testimonials. Provided for portfolio illustration only.
      </p>
    </Section>
  );
}
