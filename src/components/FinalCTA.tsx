import { ArrowRight } from "lucide-react";
import Button from "./ui/Button";

export default function FinalCTA() {
  return (
    <section className="bg-white">
      <div className="mx-auto max-w-6xl px-6 pb-24">
        <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-navy-900 via-navy-900 to-brand-700 p-10 text-center shadow-soft md:p-16">
          <div className="absolute -right-12 -top-12 h-48 w-48 rounded-full bg-brand-500/30 blur-3xl" />
          <div className="absolute -bottom-16 -left-12 h-56 w-56 rounded-full bg-brand-400/20 blur-3xl" />
          <div className="relative">
            <h2 className="text-3xl font-bold tracking-tight text-white md:text-4xl">
              Ready to automate your patient inquiries?
            </h2>
            <p className="mx-auto mt-4 max-w-xl text-base text-navy-100">
              Get a tailored walkthrough of the system, the automation stack, and
              what it would look like wired up to your clinic.
            </p>
            <div className="mt-8 flex justify-center">
              <Button as="a" href="#contact" size="lg">
                Request a Demo <ArrowRight size={18} />
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
