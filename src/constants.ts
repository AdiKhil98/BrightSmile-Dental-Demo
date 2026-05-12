import type { FAQItem, Service, Testimonial } from "./types";

export const CLINIC = {
  name: "BrightSmile Dental",
  tagline: "Modern dentistry with a personal touch.",
  phone: "+1 (555) 010-2040",
  email: "hello@brightsmile.demo",
  address: "221B Wellness Ave, Suite 4, Portland, OR",
};

/**
 * Replace this empty string with your webhook URL (n8n, Make.com, Zapier, etc.)
 * to activate live lead delivery. When empty, the form falls back to demo mode
 * and only shows the inline success message.
 */
export const WEBHOOK_URL = "";

export const SERVICES: Service[] = [
  {
    id: "general",
    name: "General Dentistry",
    description: "Routine cleanings, exams, and preventive care that keep smiles healthy year-round.",
    icon: "Stethoscope",
  },
  {
    id: "whitening",
    name: "Teeth Whitening",
    description: "Professional-grade whitening in a single visit — safe, fast, and visibly brighter.",
    icon: "Sparkles",
  },
  {
    id: "implants",
    name: "Dental Implants",
    description: "Permanent tooth replacement that looks, feels, and functions like natural teeth.",
    icon: "Anchor",
  },
  {
    id: "emergency",
    name: "Emergency Appointments",
    description: "Same-day relief for dental pain, broken teeth, and urgent post-op concerns.",
    icon: "Siren",
  },
  {
    id: "cosmetic",
    name: "Cosmetic Dentistry",
    description: "Veneers, bonding, and smile design tailored to your face and personal style.",
    icon: "Smile",
  },
];

export const SERVICE_OPTIONS = SERVICES.map((s) => s.name);

export const TESTIMONIALS: Testimonial[] = [
  {
    name: "Amelia R.",
    role: "Patient · Demo",
    quote:
      "The booking process was effortless. I filled out the form in the morning and had a confirmation by lunch — the clinic followed up exactly when they said they would.",
    avatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=facearea&w=160&h=160&q=80&facepad=2",
  },
  {
    name: "Daniel K.",
    role: "Patient · Demo",
    quote:
      "I used the chatbot at midnight to ask about emergency care. By 9 a.m. the next day I had a same-day appointment booked. Honestly, this is how every clinic should work.",
    avatar: "https://images.unsplash.com/photo-1607746882042-944635dfe10e?auto=format&fit=facearea&w=160&h=160&q=80&facepad=2",
  },
  {
    name: "Priya S.",
    role: "Patient · Demo",
    quote:
      "Loved the whitening consult — clear pricing, no pressure, and they texted me a reminder the day before. The whole experience felt modern and unrushed.",
    avatar: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=facearea&w=160&h=160&q=80&facepad=2",
  },
];

export const FAQS: FAQItem[] = [
  {
    question: "Can this connect to my CRM?",
    answer:
      "Yes. The lead capture form sends a clean JSON payload that maps directly to most CRMs — HubSpot, Pipedrive, Zoho, GoHighLevel, Salesforce, and others — through n8n, Make.com, or a direct webhook.",
  },
  {
    question: "Can it send leads to Google Sheets?",
    answer:
      "Absolutely. A single n8n or Make.com scenario can append each submission as a new row, with timestamp, source page, and full contact info — no code required.",
  },
  {
    question: "Can it send email or WhatsApp notifications?",
    answer:
      "Yes. The same automation can fan out to email (Gmail, Outlook, transactional providers like Postmark/SendGrid) and to WhatsApp via Twilio or the official WhatsApp Business API.",
  },
  {
    question: "Can the chatbot qualify patients?",
    answer:
      "The current widget is a front-end demo, but it's wired so you can plug in Voiceflow, an OpenAI/Anthropic model, or a custom flow that asks qualifying questions and forwards qualified leads to the same automation pipeline.",
  },
];

export const HERO_IMAGE =
  "https://images.unsplash.com/photo-1588776814546-1ffcf47267a5?auto=format&fit=crop&w=1400&q=80";

export const ABOUT_IMAGE =
  "https://images.unsplash.com/photo-1629909613654-28e377c37b09?auto=format&fit=crop&w=1200&q=80";
