import { Sparkles, Mail, Phone, MapPin } from "lucide-react";
import { CLINIC } from "../constants";

export default function Footer() {
  return (
    <footer className="border-t border-navy-100 bg-slate-50">
      <div className="mx-auto grid max-w-6xl gap-10 px-6 py-14 md:grid-cols-4">
        <div className="md:col-span-2">
          <div className="flex items-center gap-2">
            <span className="grid h-9 w-9 place-items-center rounded-xl bg-brand-500 text-white shadow-soft">
              <Sparkles size={18} />
            </span>
            <span className="text-lg font-bold text-navy-900">{CLINIC.name}</span>
          </div>
          <p className="mt-4 max-w-md text-sm leading-relaxed text-navy-500">
            {CLINIC.tagline} This is a portfolio demo built to showcase a
            website + automation lead-generation system for local service
            businesses.
          </p>
        </div>

        <div>
          <h4 className="text-sm font-semibold text-navy-900">Navigate</h4>
          <ul className="mt-4 space-y-2 text-sm text-navy-500">
            <li><a className="hover:text-brand-600" href="#services">Services</a></li>
            <li><a className="hover:text-brand-600" href="#how-it-works">How it works</a></li>
            <li><a className="hover:text-brand-600" href="#faq">FAQ</a></li>
            <li><a className="hover:text-brand-600" href="#contact">Contact</a></li>
          </ul>
        </div>

        <div>
          <h4 className="text-sm font-semibold text-navy-900">Contact</h4>
          <ul className="mt-4 space-y-2 text-sm text-navy-500">
            <li className="flex items-center gap-2"><Phone size={14} /> {CLINIC.phone}</li>
            <li className="flex items-center gap-2"><Mail size={14} /> {CLINIC.email}</li>
            <li className="flex items-start gap-2"><MapPin size={14} className="mt-0.5" /> {CLINIC.address}</li>
          </ul>
        </div>
      </div>

      <div className="border-t border-navy-100">
        <div className="mx-auto flex max-w-6xl flex-col items-start justify-between gap-3 px-6 py-6 text-xs text-navy-500 md:flex-row md:items-center">
          <p>
            Demo project built to showcase a website + automation lead
            generation system.
          </p>
          <p>© {new Date().getFullYear()} {CLINIC.name} · All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
