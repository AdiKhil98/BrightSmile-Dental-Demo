import { type ReactNode } from "react";
import Reveal from "./Reveal";

type Props = {
  id?: string;
  eyebrow?: string;
  title?: string;
  subtitle?: string;
  tone?: "white" | "slate";
  children: ReactNode;
  className?: string;
};

export default function Section({
  id,
  eyebrow,
  title,
  subtitle,
  tone = "white",
  children,
  className = "",
}: Props) {
  const bg = tone === "slate" ? "bg-slate-50" : "bg-white";
  return (
    <section id={id} className={`${bg} ${className}`}>
      <div className="mx-auto max-w-6xl px-6 py-20 md:py-28">
        {(eyebrow || title || subtitle) && (
          <Reveal className="mx-auto mb-12 max-w-2xl text-center">
            {eyebrow && (
              <p className="mb-3 text-sm font-semibold uppercase tracking-[0.18em] text-brand-600">
                {eyebrow}
              </p>
            )}
            {title && (
              <h2 className="text-3xl font-bold tracking-tight text-navy-900 md:text-4xl">
                {title}
              </h2>
            )}
            {subtitle && (
              <p className="mt-4 text-lg text-navy-500">{subtitle}</p>
            )}
          </Reveal>
        )}
        <Reveal delay={0.05}>{children}</Reveal>
      </div>
    </section>
  );
}
