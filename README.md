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

## What's real vs. what's a placeholder

- **Citation lookups (DOI via Crossref, ISBN via Open Library)** are live network calls — no mock data, no demo label. They need an internet connection to resolve; if a lookup fails, the tool shows an inline error message rather than silently falling back to fake data.
- **Per-device storage** (profile, theme, country, teaser dismissal, citation reference list, onboarding completion) uses real `localStorage`, wrapped in a small `usePersistentState` hook (`src/hooks/usePersistentState.js`) with try/catch so the app still works if storage is unavailable (e.g. private browsing).
- **Flags** for the 5 supported countries are bundled locally in `public/flags/` (sourced from the MIT-licensed `flag-icons` project) — no CDN fetch, so they render correctly offline.
- **Opportunities list** is still static sample data (as in the mockup) — wiring it to a real backend/CMS is a natural next step once you're ready.
- **Report Builder** still only gives a guided outline, not a downloadable formatted document — flagged in the UI as planned for a later version, same as before.

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
