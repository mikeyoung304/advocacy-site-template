# Customization Guide

Complete guide for forking and customizing this advocacy site template.

## 7-Step Setup

1. **Fork & clone** this repo
2. **Edit `lib/content.ts`** — all text, stats, FAQ, metadata, section data
3. **Edit `lib/config.ts`** — domain, contact email, analytics, email forwarding
4. **Edit `lib/theme.ts`** — color palette and glass transparency values
5. **Replace images** in `public/images/` (keep same filenames — see Image Manifest below)
6. **Edit per-fork files** — run `grep -r "TODO(fork)"` to find all edit points
7. **Deploy to Vercel** — set env vars from `.env.example`

## Config Files

### `lib/content.ts`
All user-facing text lives here:
- `siteConfig` — project name, location, state, key stats
- `heroContent` — headline, subheadline, trust strip, estimation disclosure
- `heroStats` — stat cards shown in hero (value + label pairs)
- `projectOverviewContent` — title, description, facts, info sections
- `benefitsContent` — benefit cards (title, description, icon)
- `environmentalContent` — cooling, recycled water, community benefits
- `whyThisMattersContent` — opportunity and national priority cards
- `siteDesignContent` — features, landscape buffer, local representation
- `faqContent` — FAQ items, noise table caption/footer
- `noiseComparisonData` — noise comparison table rows
- `landUseComparisonContent` — land use comparison table
- `footerContent` — project name, disclaimer, CTA text
- `notFoundContent` — 404 page text
- `siteMetadata` — page title, description, OG/Twitter metadata
- `navLinks` — navigation link labels and anchors
- `enabledSections` — which sections render on the homepage

**Note:** `economicContent` is exported but not rendered by default. It's available for economic-focused sites that add a dedicated component.

### `lib/config.ts`
Operational settings:
- `siteUrl` — canonical URL (also set via `NEXT_PUBLIC_SITE_URL` env var)
- `contactEmail` — used in navbar CTA and footer
- `contactLocation` — displayed in footer
- `externalLinks` — footer external links (e.g., city government)
- `emailForwarding` — Postmark forwarding addresses
- `analytics` — set to `null` to disable analytics script entirely

### `lib/theme.ts`
Visual branding:
- `colors` — primary, accent, ink, surface, border, chart colors
- `glass` — navbar glass transparency values

**Theme scope:** `theme.ts` controls colors and glass values only. Shadows (`--shadow-card`, etc.), animations (`--ease-spring`, etc.), and fonts remain in `globals.css`. Edit those directly if needed.

## Section Toggling

The `enabledSections` array in `content.ts` controls which sections render:

```typescript
export const enabledSections: SectionKey[] = [
  'project',          // Project Overview
  'why-this-matters', // Why This Matters (no nav link)
  'benefits',         // Community Benefits
  'environmental',    // Environmental Stewardship
  'site-design',      // Community Integration + Land Use Comparison
  'faq',              // FAQ
];
```

- **Hero always renders** regardless of `enabledSections`
- Removing a section from the array also hides its nav link
- `why-this-matters` has no nav link (renders between Overview and Benefits)
- Disabling `site-design` also hides the embedded Land Use Comparison
- Empty `enabledSections` = only Hero renders with zero nav links

## Image Manifest

Replace these files in `public/images/` keeping the same filenames:

| Filename | Used By | Dimensions / Aspect |
|----------|---------|-------------------|
| `hero-data-campus.webp` | Hero background | Full viewport, any aspect |
| `playground.webp` | Benefits background | 16:9 recommended |
| `american-flag-sky.webp` | Why This Matters background | 21:9 recommended |
| `prairie-landscape.webp` | Environmental background | 16:9 / 21:9 |
| `site-plan-full.png` | Project Overview | 4:3 |
| `buffer-planting-study.webp` | Landscape Buffer elevation | 16:5 |
| `landscape-buffer-overhead.png` | Landscape Buffer overhead | 16:4 |

**Local Representation logos** (only needed if `localRepresentation` is non-null in content.ts):
| Filename | Used By | Dimensions |
|----------|---------|------------|
| `box-law-logo.png` | Local Representation | ~256x64 |
| `johnson-associates-logo.png` | Local Representation | ~192x64 |

Replace these with your own firm logos (any filename) and update the `logoPath` in content.ts.

**Additional files requiring manual editing (not just file swaps):**
- `public/og-image.svg` — contains hardcoded project name and text
- `public/og-image.png` — generated from the SVG above (regenerate after editing SVG)
- `public/favicon.svg` — contains hardcoded brand colors in SVG `fill` attributes

## Font Configuration

Fonts require TWO edits (cannot be driven from config — `next/font` requires static strings):

1. **`app/layout.tsx`** — change the `next/font/google` import:
   ```typescript
   // Before (Geist)
   import { Geist } from 'next/font/google';
   const geistSans = Geist({ variable: '--font-geist-sans', subsets: ['latin'], display: 'swap' });

   // After (e.g., Inter)
   import { Inter } from 'next/font/google';
   const inter = Inter({ variable: '--font-inter', subsets: ['latin'], display: 'swap' });
   // Also update the className in <body>: `${inter.variable} antialiased`
   ```

2. **`app/globals.css`** — update the `--font-sans` variable:
   ```css
   --font-sans: var(--font-inter);  /* was var(--font-geist-sans) */
   ```

## Email Forwarding Setup

1. Create a [Postmark](https://postmarkapp.com) account
2. Verify your sender address (the `emailForwarding.senderAddress` in config.ts)
3. Set up an inbound webhook pointing to `https://yoursite.com/api/inbound?secret=YOUR_SECRET`
4. Set these environment variables:
   - `POSTMARK_SERVER_TOKEN` — your Postmark server token
   - `INBOUND_WEBHOOK_SECRET` — the same secret from the webhook URL

**Tip:** Vercel env vars may have trailing whitespace that causes 401 errors. The API route applies `.trim()` automatically.

## Adding a New Section

1. Create `components/sections/your-section.tsx`
2. Add content type and data to `lib/content.ts`
3. Add section key to the `SectionKey` type union
4. Add the key to `enabledSections` array
5. Import and add the component to `app/page.tsx`
6. If it needs a nav link, add an entry to `navLinks` array

## One-Pager Page

The template includes an optional `/one-pager` route (`app/one-pager/page.tsx`) — a printable single-page project summary.

**To customize:** Edit the page directly with your project's content, stats, and branding.

**To remove:** Delete `app/one-pager/page.tsx`.

## Components That May Need Editing

- **`land-use-comparison.tsx`** — structurally data-center-specific (comparison columns, highlighted column). Non-DC projects will likely need component-level editing.
- **`benefits.tsx`** — `BenefitIcon` type and `iconMap` support 4 icons: `DollarSign`, `Users`, `Wrench`, `Building2`. Add more Lucide icons to the map if needed.
- **`hero.tsx`** — `statIcons` array is positional and must match `heroStats` order. Update icons if you change the stat order.

## Deployment (Vercel)

1. Create a new Vercel project connected to your forked repo
2. Set all environment variables from `.env.example`
3. Deploy — the site builds as static pages with one dynamic API route (`/api/inbound`)
4. Configure your custom domain in Vercel project settings
5. Update `vercel.json` CSP headers if using a different analytics provider

## `vercel.json` CSP Headers

The CSP `script-src` includes `plausible.io`. If using a different analytics provider, update the CSP in `vercel.json` accordingly.

## `TODO(fork)` Markers

Run `grep -r "TODO(fork)"` to find all files needing per-fork edits beyond the 3 config files:
- `lib/content.ts` — all user-facing text and metadata
- `lib/config.ts` — all operational values
- `lib/theme.ts` — brand colors
- `public/sitemap.xml` — domain URL
- `public/robots.txt` — domain URL
- `vercel.json` — CSP script-src (analytics provider)
- `package.json` — name field
- `app/layout.tsx` — font import
- `app/globals.css` — --font-sans variable
- `app/one-pager/page.tsx` — all content (or delete if not needed)
- `public/og-image.svg` — project name and text
- `public/favicon.svg` — brand colors
