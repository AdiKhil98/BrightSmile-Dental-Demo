import { motion } from "framer-motion";
import { ArrowRight, PlayCircle, ShieldCheck, Clock, MessageSquare } from "lucide-react";
import Button from "./ui/Button";
import { HERO_IMAGE } from "../constants";

const easeOut = [0.22, 1, 0.36, 1] as const;

export default function Hero() {
  return (
    <section id="top" className="bg-hero-gradient pt-28 md:pt-32">
      <div className="mx-auto grid max-w-6xl items-center gap-12 px-6 pb-20 md:grid-cols-2 md:pb-28">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.55, ease: easeOut }}
        >
          <span className="inline-flex items-center gap-2 rounded-full bg-brand-50 px-3 py-1 text-xs font-semibold uppercase tracking-wider text-brand-700 ring-1 ring-brand-100">
            <ShieldCheck size={14} /> Lead Generation · Automation Ready
          </span>
          <h1 className="mt-5 text-4xl font-extrabold leading-[1.08] tracking-tight text-navy-900 md:text-5xl">
            Turn Website Visitors Into{" "}
            <span className="bg-gradient-to-r from-brand-500 to-brand-700 bg-clip-text text-transparent">
              Booked Dental Appointments
            </span>
          </h1>
          <p className="mt-5 max-w-xl text-lg text-navy-500">
            A modern lead-generation website with automation-ready forms and AI
            chatbot support — built so every inquiry reaches the front desk
            instantly and follows up automatically.
          </p>

          <div className="mt-8 flex flex-wrap items-center gap-3">
            <Button as="a" href="#contact" size="lg">
              Book a Free Consultation <ArrowRight size={18} />
            </Button>
            <Button as="a" href="#how-it-works" size="lg" variant="secondary">
              <PlayCircle size={18} /> See How It Works
            </Button>
          </div>

          <div className="mt-10 grid grid-cols-3 gap-4 text-sm">
            <Stat icon={<Clock size={16} />} label="< 1 min" sub="response time" />
            <Stat icon={<MessageSquare size={16} />} label="24/7" sub="chatbot intake" />
            <Stat icon={<ShieldCheck size={16} />} label="HIPAA-aware" sub="payload design" />
          </div>
        </motion.div>

        <motion.div
          className="relative"
          initial={{ opacity: 0, y: 20, scale: 0.98 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 0.6, delay: 0.1, ease: easeOut }}
        >
          <div className="aspect-[4/5] overflow-hidden rounded-3xl shadow-soft ring-1 ring-navy-100">
            <img
              src={HERO_IMAGE}
              alt="Modern dental clinic reception"
              className="h-full w-full object-cover"
              loading="eager"
            />
          </div>
          <motion.div
            className="absolute -bottom-6 -left-6 hidden w-64 rounded-2xl bg-white p-4 shadow-soft ring-1 ring-navy-100 md:block"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.5, ease: easeOut }}
          >
            <div className="flex items-center gap-3">
              <span className="grid h-9 w-9 place-items-center rounded-full bg-brand-50 text-brand-600">
                <MessageSquare size={16} />
              </span>
              <div>
                <p className="text-sm font-semibold text-navy-900">New lead captured</p>
                <p className="text-xs text-navy-500">Routed to clinic + CRM</p>
              </div>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}

function Stat({
  icon,
  label,
  sub,
}: {
  icon: React.ReactNode;
  label: string;
  sub: string;
}) {
  return (
    <div className="rounded-xl bg-white/70 p-3 ring-1 ring-navy-100">
      <div className="flex items-center gap-2 text-brand-600">{icon}</div>
      <p className="mt-1 text-lg font-bold text-navy-900">{label}</p>
      <p className="text-xs text-navy-500">{sub}</p>
    </div>
  );
}
