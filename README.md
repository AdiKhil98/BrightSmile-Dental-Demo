# BrightSmile Dental — Website + Automation Lead Generation Demo

A portfolio demo showing how a local service business (in this case, a dental
clinic) can capture leads from a modern website and feed them into an
automation pipeline for instant notification, CRM logging, and follow-up.

> **This is a demo project.** Submissions are not stored or delivered to a real
> clinic unless a webhook URL is configured. Testimonials and clinic details
> are illustrative.

---

## What this project demonstrates

This isn't just a marketing page — it's a complete front-end for a lead
generation system designed to plug into automation tools like **n8n**,
**Make.com**, **Zapier**, or a custom backend.

The codebase shows:

1. A high-conversion landing page tailored to a local service business.
2. A validated, accessible lead capture form with a clean payload contract.
3. A front-end chatbot scaffold ready to be wired to Voiceflow / OpenAI /
   Anthropic / Rasa.
4. A clear integration point (`WEBHOOK_URL` + `submitLead.ts`) so the same
   front-end can be activated in production with a single line of config.
5. Production-ready deployment to Netlify with sensible headers and SPA
   routing.

---

## Features

- **Hero** with dual CTAs ("Book a Free Consultation" / "See How It Works")
  and live-feeling stat chips.
- **Problem / Solution** sections that frame the pain and the fix in
  client-friendly language.
- **Services** grid (general dentistry, whitening, implants, emergency,
  cosmetic) driven from a single `constants.ts` source.
- **How it works** — four-step funnel from visit to follow-up.
- **Testimonials** with a visible "demo testimonials" disclaimer.
- **Lead form** — React Hook Form + Zod validation, loading state, inline
  success card, error banner, payload logged in demo mode.
- **FAQ** — accordion built with Framer Motion (`height: auto` + chevron
  rotation).
- **Floating chatbot widget** — opens a modal with a greeting message, four
  quick replies, and canned bot responses. Front-end only.
- **Footer** with clinic contact info and a clear "demo project" disclaimer.
- Subtle Framer Motion entrance + scroll-reveal animations, respecting
  `prefers-reduced-motion`.
- Fully responsive (mobile drawer nav, stacked grids).

---

## Tech stack

| Layer        | Choice                                 |
| ------------ | -------------------------------------- |
| Build tool   | Vite 5                                 |
| Framework    | React 18 + TypeScript                  |
| Styling      | Tailwind CSS 3                         |
| Icons        | lucide-react                           |
| Animation    | Framer Motion                          |
| Forms        | React Hook Form + Zod                  |
| Deployment   | Netlify (`netlify.toml` included)      |

---

## Automation architecture

```
   ┌─────────────────────┐
   │   Website visitor   │
   └──────────┬──────────┘
              │
   ┌──────────┴──────────┐
   │  React landing page │
   │  (this repository)  │
   └──────────┬──────────┘
              │ JSON POST
              ▼
   ┌─────────────────────┐
   │   WEBHOOK_URL       │   ← n8n / Make.com / Zapier / custom endpoint
   └──────────┬──────────┘
              │ fan-out
   ┌──────────┼──────────────────────────┐
   ▼          ▼          ▼               ▼
┌──────┐ ┌─────────┐ ┌──────────┐ ┌────────────────┐
│ CRM  │ │ Google  │ │ Email /  │ │ SMS / WhatsApp │
│      │ │ Sheets  │ │ Postmark │ │ via Twilio     │
└──────┘ └─────────┘ └──────────┘ └────────────────┘
```

All lead submissions are normalized to a single JSON shape so each downstream
node only needs to map fields, not parse formats.

---

## Webhook payload

When the form is submitted, the front-end sends this JSON shape to
`WEBHOOK_URL` (see [`src/lib/submitLead.ts`](src/lib/submitLead.ts)):

```json
{
  "source": "brightsmile-website",
  "submittedAt": "2026-05-12T10:42:18.214Z",
  "lead": {
    "fullName": "Jane Doe",
    "phone": "+1 (555) 010-2040",
    "email": "jane@example.com",
    "service": "Teeth Whitening",
    "preferredTime": "Weekday mornings",
    "message": "Looking to brighten my smile before a wedding next month."
  },
  "meta": {
    "userAgent": "Mozilla/5.0 …",
    "pageUrl": "https://brightsmile.demo/#contact",
    "referrer": "https://google.com/"
  }
}
```

### Suggested n8n / Make.com flow

1. **Trigger**: Webhook node, listening for `POST` JSON.
2. **Branch A — Sheets**: append a row using `lead.*` fields.
3. **Branch B — CRM**: upsert contact by `lead.email`; create a deal tagged
   with `lead.service`.
4. **Branch C — Notify clinic**: email (or Slack / WhatsApp / SMS) the front
   desk with the contact details and preferred time.
5. **Branch D — Confirm patient**: send a transactional email/SMS
   confirmation back to `lead.email` or `lead.phone`.

The flat payload shape keeps each branch one or two nodes long.

---

## Run locally

Requires **Node 20+** and npm.

```bash
git clone <this-repo-url>
cd "demo site"
npm install
npm run dev
```

Open `http://localhost:5173`. The form will work in **demo mode** out of the
box: submissions show the success message and log the payload to the browser
console.

### Activate live webhook delivery

Open [`src/constants.ts`](src/constants.ts) and set:

```ts
export const WEBHOOK_URL = "https://your-n8n.example.com/webhook/leads";
```

Restart the dev server. Submissions will now POST to that endpoint.

> **Note for security**: if you ever embed real credentials, do it via a
> serverless function or environment variables — never commit secrets to the
> client bundle.

---

## Build and preview

```bash
npm run build      # type-check + Vite production build → dist/
npm run preview    # serve dist/ locally for a quick smoke test
```

---

## Deploy to Netlify

This repo includes a [`netlify.toml`](netlify.toml) with the build command,
publish directory, SPA redirects, and basic security headers, so deploys work
without any dashboard configuration.

### Option A — CLI

```bash
npm install -g netlify-cli
netlify login
netlify init       # link to a new or existing site
netlify deploy --prod
```

### Option B — Git-based

1. Push this repository to GitHub / GitLab / Bitbucket.
2. In the Netlify dashboard → **Add new site → Import from Git**.
3. Select the repo. Netlify will read `netlify.toml`:
   - Build command: `npm run build`
   - Publish directory: `dist`
   - Node version: 20
4. Click **Deploy site**.

### Option C — Manual drag-and-drop

1. Run `npm run build`.
2. Drag the `dist/` folder onto <https://app.netlify.com/drop>.

---

## Future integrations

The system is designed to grow without rewriting the front-end. Common next
steps:

- **n8n / Make.com / Zapier** — turn `WEBHOOK_URL` on and start fanning out
  the JSON payload.
- **Google Sheets** — append every lead as a new row for a zero-effort
  back-of-house log.
- **CRM** (HubSpot, Pipedrive, GoHighLevel, Zoho, Salesforce) — upsert by
  email; tag the deal with `lead.service`.
- **Email** (Gmail, Outlook, Postmark, SendGrid) — confirmation to patient +
  notification to front desk.
- **SMS / WhatsApp** (Twilio, WhatsApp Business API) — reminders and
  re-engagement sequences.
- **Voiceflow / OpenAI / Anthropic** — replace the chatbot's canned replies
  with a real intent-aware assistant that can pre-qualify patients.
- **Supabase / Postgres** — log every submission for analytics and reporting.
- **reCAPTCHA / Cloudflare Turnstile** — add a bot check in front of the form
  for production traffic.

---

## Project structure

```
.
├── index.html
├── netlify.toml
├── package.json
├── tailwind.config.js
├── postcss.config.js
├── tsconfig*.json
├── vite.config.ts
└── src/
    ├── App.tsx
    ├── main.tsx
    ├── index.css
    ├── constants.ts       ← WEBHOOK_URL, services, FAQ, testimonials, images
    ├── types.ts           ← shared TS types incl. LeadPayload
    ├── lib/
    │   └── submitLead.ts  ← payload builder + webhook POST (demo-safe)
    └── components/
        ├── Navbar.tsx
        ├── Hero.tsx
        ├── Problem.tsx
        ├── Solution.tsx
        ├── Services.tsx
        ├── HowItWorks.tsx
        ├── Testimonials.tsx
        ├── LeadForm.tsx
        ├── FAQ.tsx
        ├── FinalCTA.tsx
        ├── Footer.tsx
        ├── ChatbotWidget.tsx
        └── ui/
            ├── Button.tsx
            ├── Card.tsx
            ├── Reveal.tsx
            └── Section.tsx
```

---

## License

Released under the MIT License. Built as a portfolio demonstration — feel
free to fork it and adapt for your own client work.
