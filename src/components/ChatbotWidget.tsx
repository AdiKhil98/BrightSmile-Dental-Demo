import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { MessageCircle, X, Bot, ArrowDown } from "lucide-react";

type Msg = { role: "bot" | "user"; text: string };

const INITIAL_GREETING: Msg = {
  role: "bot",
  text: "Hi! I can help you choose the right dental service and request an appointment.",
};

const QUICK_REPLIES: { label: string; reply: string }[] = [
  {
    label: "Book appointment",
    reply:
      "Happy to help you book. I just need a few quick details — your name, phone number, and a preferred time. Scroll down to the booking form and the front desk will confirm your slot within one business day.",
  },
  {
    label: "Ask about pricing",
    reply:
      "Pricing depends on the specific treatment and what the dentist recommends after a quick consultation. If you share your contact details through the form, the clinic will follow up with a personalized quote.",
  },
  {
    label: "Emergency visit",
    reply:
      "Urgent cases are always prioritized — same-day slots are reserved for pain, swelling, or trauma. Please submit your details through the booking form (mention 'Emergency' in the message) and the front desk will reach out immediately.",
  },
  {
    label: "Teeth whitening",
    reply:
      "Our in-office whitening usually takes about an hour and most patients see a visible improvement after a single session. Want me to send you to the booking form to request a consultation?",
  },
];

export default function ChatbotWidget() {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState<Msg[]>([INITIAL_GREETING]);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) return;
    const el = scrollRef.current;
    if (el) el.scrollTo({ top: el.scrollHeight, behavior: "smooth" });
  }, [messages, open]);

  const sendQuickReply = (qr: (typeof QUICK_REPLIES)[number]) => {
    setMessages((prev) => [
      ...prev,
      { role: "user", text: qr.label },
    ]);
    // Small delay so the bot reply feels conversational, not instant.
    window.setTimeout(() => {
      setMessages((prev) => [...prev, { role: "bot", text: qr.reply }]);
    }, 450);
  };

  return (
    <>
      <motion.button
        type="button"
        aria-label={open ? "Close chat" : "Open chat"}
        onClick={() => setOpen((v) => !v)}
        whileHover={{ scale: 1.03 }}
        whileTap={{ scale: 0.96 }}
        className="fixed bottom-5 right-5 z-50 inline-flex items-center gap-2 rounded-full bg-brand-500 px-5 py-3 text-sm font-semibold text-white shadow-soft transition-colors hover:bg-brand-600 hover:shadow-lg md:bottom-6 md:right-6"
      >
        {open ? <X size={18} /> : <MessageCircle size={18} />}
        <span>{open ? "Close" : "Need help?"}</span>
      </motion.button>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: 16, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 8, scale: 0.98 }}
            transition={{ duration: 0.18, ease: "easeOut" }}
            className="fixed bottom-24 right-5 z-50 flex max-h-[70vh] w-[22rem] max-w-[calc(100vw-2.5rem)] flex-col overflow-hidden rounded-2xl bg-white shadow-2xl ring-1 ring-navy-100 md:right-6"
          >
            <div className="flex items-center gap-3 bg-navy-900 px-4 py-3 text-white">
              <span className="grid h-9 w-9 place-items-center rounded-full bg-brand-500">
                <Bot size={18} />
              </span>
              <div className="flex-1">
                <p className="text-sm font-semibold">BrightSmile Assistant</p>
                <p className="text-xs text-navy-100/80">Demo · No real AI yet</p>
              </div>
              <button
                onClick={() => setOpen(false)}
                aria-label="Close chat"
                className="rounded-full p-1 text-navy-100 transition-colors hover:bg-white/10 hover:text-white"
              >
                <X size={16} />
              </button>
            </div>

            <div
              ref={scrollRef}
              className="flex-1 space-y-3 overflow-y-auto bg-slate-50 p-4"
            >
              <AnimatePresence initial={false}>
                {messages.map((m, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, y: 6 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.18 }}
                    className={
                      m.role === "bot"
                        ? "max-w-[85%] rounded-2xl rounded-tl-sm bg-white px-4 py-3 text-sm text-navy-700 shadow-sm ring-1 ring-navy-100"
                        : "ml-auto max-w-[85%] rounded-2xl rounded-tr-sm bg-brand-500 px-4 py-3 text-sm text-white shadow-sm"
                    }
                  >
                    {m.text}
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>

            <div className="border-t border-navy-100 bg-white p-3">
              <p className="flex items-center gap-1.5 px-1 pb-2 text-[11px] font-semibold uppercase tracking-wider text-navy-500">
                <ArrowDown size={11} /> Quick replies
              </p>
              <div className="flex flex-wrap gap-2">
                {QUICK_REPLIES.map((qr) => (
                  <button
                    key={qr.label}
                    type="button"
                    onClick={() => sendQuickReply(qr)}
                    className="rounded-full bg-brand-50 px-3 py-1.5 text-xs font-semibold text-brand-700 ring-1 ring-brand-100 transition-all hover:bg-brand-100 active:scale-95"
                  >
                    {qr.label}
                  </button>
                ))}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
