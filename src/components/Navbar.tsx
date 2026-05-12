import { useEffect, useState } from "react";
import { Menu, X, Sparkles } from "lucide-react";
import { CLINIC } from "../constants";
import Button from "./ui/Button";

const NAV_LINKS = [
  { href: "#services", label: "Services" },
  { href: "#how-it-works", label: "How it works" },
  { href: "#faq", label: "FAQ" },
  { href: "#contact", label: "Contact" },
];

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-40 transition-all ${
        scrolled
          ? "bg-white/85 backdrop-blur border-b border-navy-100"
          : "bg-transparent"
      }`}
    >
      <nav className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
        <a href="#top" className="flex items-center gap-2">
          <span className="grid h-9 w-9 place-items-center rounded-xl bg-brand-500 text-white shadow-soft">
            <Sparkles size={18} />
          </span>
          <span className="text-lg font-bold text-navy-900">{CLINIC.name}</span>
        </a>

        <ul className="hidden items-center gap-8 md:flex">
          {NAV_LINKS.map((l) => (
            <li key={l.href}>
              <a
                href={l.href}
                className="text-sm font-medium text-navy-700 transition-colors hover:text-brand-600"
              >
                {l.label}
              </a>
            </li>
          ))}
        </ul>

        <div className="hidden md:block">
          <Button as="a" href="#contact" size="md">
            Book a Consultation
          </Button>
        </div>

        <button
          aria-label="Open menu"
          className="rounded-lg p-2 text-navy-900 ring-1 ring-navy-100 md:hidden"
          onClick={() => setOpen((v) => !v)}
        >
          {open ? <X size={18} /> : <Menu size={18} />}
        </button>
      </nav>

      {open && (
        <div className="border-t border-navy-100 bg-white md:hidden">
          <ul className="mx-auto flex max-w-6xl flex-col gap-2 px-6 py-4">
            {NAV_LINKS.map((l) => (
              <li key={l.href}>
                <a
                  href={l.href}
                  onClick={() => setOpen(false)}
                  className="block rounded-lg px-3 py-2 text-sm font-medium text-navy-700 hover:bg-slate-100"
                >
                  {l.label}
                </a>
              </li>
            ))}
            <li className="pt-2">
              <Button as="a" href="#contact" size="md" className="w-full">
                Book a Consultation
              </Button>
            </li>
          </ul>
        </div>
      )}
    </header>
  );
}
