import type { LeadPayload } from "../types";
import { WEBHOOK_URL } from "../constants";

export type LeadInput = {
  fullName: string;
  phone: string;
  email: string;
  service: string;
  preferredTime: string;
  message: string;
};

/**
 * Builds the JSON payload that will be POSTed to the automation webhook.
 *
 * Keep this shape stable — downstream automations (n8n / Make.com / Zapier)
 * will rely on these field names to:
 *   - append rows to Google Sheets
 *   - create deals in a CRM (HubSpot, Pipedrive, GoHighLevel, Zoho, etc.)
 *   - send transactional email confirmations
 *   - trigger SMS / WhatsApp follow-up (Twilio, WhatsApp Business API)
 *   - route to a Slack / Telegram / Discord channel for the front desk
 */
export function buildLeadPayload(input: LeadInput): LeadPayload {
  return {
    source: "brightsmile-website",
    submittedAt: new Date().toISOString(),
    lead: {
      fullName: input.fullName.trim(),
      phone: input.phone.trim(),
      email: input.email.trim().toLowerCase(),
      service: input.service,
      preferredTime: input.preferredTime.trim(),
      message: input.message.trim(),
    },
    meta: {
      userAgent: typeof navigator !== "undefined" ? navigator.userAgent : "",
      pageUrl: typeof window !== "undefined" ? window.location.href : "",
      referrer: typeof document !== "undefined" ? document.referrer : "",
    },
  };
}

export type SubmitResult =
  | { ok: true; mode: "live" | "demo" }
  | { ok: false; error: string };

/**
 * Sends the lead payload to the configured webhook.
 *
 * Demo mode: when WEBHOOK_URL is empty, this short-circuits and returns
 * success without making a network call — so the inline success message
 * still shows during local development and on the live portfolio demo.
 *
 * To go live:
 *   1. Set WEBHOOK_URL in src/constants.ts to your webhook (n8n / Make / Zapier).
 *   2. In the receiving scenario, parse JSON body and fan out to:
 *        - Google Sheets (append row)         → "lead" fields map 1:1
 *        - CRM (create contact / deal)        → use email as dedupe key
 *        - Email notification (Gmail/Postmark)→ to the clinic front desk
 *        - SMS / WhatsApp (Twilio)            → to the configured staff number
 *   3. Optional: add reCAPTCHA / Turnstile in front of this call to deter bots.
 */
export async function submitLead(input: LeadInput): Promise<SubmitResult> {
  const payload = buildLeadPayload(input);

  // ── Demo mode ─────────────────────────────────────────────────────────────
  if (!WEBHOOK_URL) {
    // eslint-disable-next-line no-console
    console.info("[demo mode] lead payload (not sent):", payload);
    // Tiny artificial delay so the success state doesn't feel instantaneous.
    await new Promise((r) => setTimeout(r, 600));
    return { ok: true, mode: "demo" };
  }

  // ── Live mode ─────────────────────────────────────────────────────────────
  try {
    const res = await fetch(WEBHOOK_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });
    if (!res.ok) {
      return { ok: false, error: `Webhook responded with ${res.status}` };
    }
    return { ok: true, mode: "live" };
  } catch (err) {
    const message = err instanceof Error ? err.message : "Network error";
    return { ok: false, error: message };
  }
}
