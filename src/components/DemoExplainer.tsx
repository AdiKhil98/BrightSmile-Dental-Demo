import { Info } from "lucide-react";

export default function DemoExplainer() {
  return (
    <section aria-label="About this demo" className="bg-white">
      <div className="mx-auto max-w-6xl px-6 pt-10 md:pt-14">
        <div className="flex items-start gap-4 rounded-2xl border border-brand-100 bg-brand-50/60 p-5 md:p-6">
          <span className="grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-brand-500 text-white shadow-soft">
            <Info size={18} />
          </span>
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.18em] text-brand-700">
              About this demo
            </p>
            <p className="mt-2 text-sm leading-relaxed text-navy-700 md:text-base">
              This demo shows how a local service business can capture
              inquiries, qualify leads, and prepare follow-up automatically
              using a website, chatbot, and automation workflow. The same
              system adapts to clinics, salons, law firms, repair services,
              and any business that lives on inbound appointments.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
