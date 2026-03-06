# Infrastructure Advocacy Site Template

A reusable Next.js template for infrastructure project advocacy websites. Built with Next.js 16, Tailwind CSS v4, Framer Motion, and Radix UI.

Fork this repo, edit 3 config files, replace images, and deploy a fully customized advocacy site.

## Quick Start

```bash
# 1. Fork and clone this repo
# 2. Install dependencies
npm install

# 3. Copy environment variables
cp .env.example .env.local

# 4. Edit the 3 config files:
#    - lib/content.ts  — all user-facing text, stats, FAQ, metadata
#    - lib/config.ts   — domain, contact email, analytics, email forwarding
#    - lib/theme.ts    — color palette and glass transparency values

# 5. Replace images in public/images/ (keep same filenames)

# 6. Find all edit points
grep -r "TODO(fork)" --include="*.ts" --include="*.tsx" --include="*.css" --include="*.json" --include="*.xml" --include="*.txt" --include="*.svg"

# 7. Start development server
npm run dev

# 8. Deploy to Vercel
```

## Customization

See [CUSTOMIZATION.md](./CUSTOMIZATION.md) for the complete guide covering:

- Content, theme, and config editing
- Image manifest with dimensions
- Section toggling
- Email forwarding setup
- Font configuration
- Adding new sections
- One-pager page
- Deployment

## Project Structure

```
lib/
  content.ts    — ALL user-facing text, stats, FAQ, comparison data, metadata
  config.ts     — Domain, contact email, analytics, email forwarding settings
  theme.ts      — Color palette, glass values (injected as CSS custom properties)
  animations.ts — Shared animation variants (already reusable)
  cn.ts         — Tailwind class merge utility

app/
  layout.tsx    — Metadata from content.ts, theme injection, analytics conditional
  page.tsx      — Section composition with enabledSections toggling
  globals.css   — @theme defaults (overridden by theme.ts at runtime)
  one-pager/    — Optional printable one-pager (delete if not needed)

components/
  sections/     — One component per homepage section
  navbar.tsx    — Responsive nav with scroll-spy, uses getVisibleNavLinks()
  footer.tsx    — Contact info from config.ts, Quick Links from getVisibleNavLinks()
```

## Tech Stack

- **Next.js 16** with App Router
- **Tailwind CSS v4** with @theme design tokens
- **Framer Motion** for animations
- **Radix UI** for accessible accordion
- **Postmark** for email forwarding
- **Plausible** for privacy-friendly analytics (optional)

## Environment Variables

See [.env.example](./.env.example) for all required variables.

## Testing

```bash
npm test           # Run unit tests (vitest)
npm run build      # Verify clean build
```

## License

MIT
