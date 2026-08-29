# StudentKitCo.

Scholarships, internships, events and everyday student admin, filtered down to what's actually relevant to you.

Built with React + Vite, installable as a PWA, works fully offline once loaded.

## Local development

```bash
npm install
npm run dev
```

Open the URL Vite prints (usually http://localhost:5173).

## Build for production

```bash
npm run build
npm run preview   # optional, serves the dist/ build locally to sanity-check it
```

## Deploying via GitHub + Vercel

1. **Push to GitHub**
   ```bash
   git init
   git add .
   git commit -m "Initial commit — StudentKitCo."
   git branch -M main
   git remote add origin https://github.com/<your-username>/studentkitco.git
   git push -u origin main
   ```

2. **Import into Vercel**
   - Go to vercel.com → New Project → import the `studentkitco` GitHub repo.
   - Framework preset: Vercel should auto-detect **Vite**. If not, set it manually.
   - Build command: `npm run build`
   - Output directory: `dist`
   - Deploy.

3. **PWA install**
   Once live on your Vercel domain (e.g. `studentkitco.vercel.app`), the app is installable on Android/desktop Chrome via the install prompt, and on iOS Safari via Share → "Add to Home Screen." It will also work offline after the first visit, since the service worker precaches the app shell.

## Before you consider this fully "live"

A few things are wired up but need your real values swapped in — all in `src/data/constants.js`:

- `WHATSAPP_CHANNEL_URL` — placeholder until you create the actual WhatsApp Channel and paste its invite link in.
- `CONTACT_FORM_URL`, `REPORT_PROBLEM_FORM_URL`, `SUGGEST_FEATURE_FORM_URL`, `RATE_FORM_URL` — placeholders until you create the corresponding Google Forms.

Each is marked `REPLACE_WITH_...` so they're easy to find — just search the file for `REPLACE_WITH` and swap in the real links, then redeploy (push to GitHub, Vercel auto-deploys).

## What's real vs. what's a placeholder

- **Automatic updates, no manual cache-clearing needed** — the app checks for a new deployed version every 30 seconds while it's open, and silently activates it (no prompt, no user action). Previously, an already-installed instance could sit on an old version until the next full close/reopen; this closes that gap so testers never need to clear cache or reinstall after you push an update.

- **Citation lookups (DOI via Crossref, ISBN via Open Library)** are live network calls — no mock data, no demo label. They need an internet connection to resolve; if a lookup fails, the tool shows an inline error message rather than silently falling back to fake data.
- **Per-device storage** (profile, theme, country, teaser dismissal, citation reference list, onboarding completion) uses real `localStorage`, wrapped in a small `usePersistentState` hook (`src/hooks/usePersistentState.js`) with try/catch so the app still works if storage is unavailable (e.g. private browsing).
- **Flags** for the 5 supported countries are bundled locally in `public/flags/` (sourced from the MIT-licensed `flag-icons` project) — no CDN fetch, so they render correctly offline.
- **Opportunities list** is still static sample data (as in the mockup) — the "why this matches you" text is now dynamic based on your actual profile, but the 3 listings themselves are illustrative placeholders, not a real live feed. Wiring it to a real backend/CMS is a natural next step once you're ready.
- **Botswana is now fully unlocked** — 7 institutions (University of Botswana, Ba Isago, Botho, BIUST, Limkokwing Botswana, BAC, ISBS) with real official site links, Botswana-specific sample opportunities referencing DTEF and local institutions, and a "Tertiary Funding" card on the Profile screen linking to the Department of Tertiary Education Financing (tef.gov.bw).
- **South Africa is now open too** — University of Cape Town added, with real NSFAS funding info and SA-specific sample opportunities (Eskom, SARB, NHLS, etc.). Lesotho and Zambia remain locked/"Coming soon".
- **"My University" resource hub (Profile screen)** — for University of Botswana, University of Eswatini, Eswatini Medical Christian University, and University of Cape Town, Profile now shows a verified hub of direct links: Library, E-Resources/Databases, Past Exam Papers (where publicly available), Student Portal, Academic Calendar, and Contacts — plus an access note explaining login requirements specific to that institution. Every link was individually fetched and confirmed live before shipping. Institutions without this research yet fall back to the simpler single handbook-link card rather than showing guessed or broken links.
- **Report Builder** now generates a real, downloadable `.docx` — cover page, table of contents, a heading per section with a placeholder line to fill in, and a references page that auto-pulls in whatever's saved in the Citation tool. Generated entirely client-side (the `docx` library is lazy-loaded only when you hit download, so it doesn't bloat the app's initial load).

## Project structure

```
src/
  App.jsx                 — app shell, navigation, top-level state
  main.jsx                — entry point
  styles.css              — design tokens (light/dark themes) + Tailwind
  data/constants.js        — programme→interest map, report structures, founder story text
  hooks/usePersistentState.js
  lib/citationLookup.js    — Crossref + Open Library fetch logic
  components/shared.jsx    — Pill, Flag, StatBox, MatchMeter, OpportunityCard, Field, Row, FeedbackRow
  screens/
    Onboarding.jsx
    Home.jsx
    Opportunities.jsx
    ToolsScreen.jsx
    tools/
      GradeCalculator.jsx
      GpaCalculator.jsx
      BudgetCalculator.jsx
      CitationGenerator.jsx
      ReportBuilder.jsx
    Profile.jsx
public/
  flags/                  — bundled country flag SVGs
  icons/                  — PWA app icons
  favicon.svg
  apple-touch-icon.png
```

## Signature

Every instance of the founder signature reads **"— Mlibatisi Dlamini (2026) ©"**, in the onboarding closing screen, the Home teaser card, and the Profile "About" card.

---
Built by a student, for students.
