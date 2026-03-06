# Changelog

All notable changes to this template will be documented in this file.

## [1.0.0] - 2026-03-06

### Initial Release

- Fork-per-project template system with 3 config files (`lib/content.ts`, `lib/config.ts`, `lib/theme.ts`)
- Section toggling via `enabledSections` array
- Theme injection via CSS custom properties (server-rendered, no flash)
- Responsive glass-morphism navbar with scroll-spy
- Accessible FAQ accordion (Radix UI)
- Framer Motion animations with reduced-motion support
- Email forwarding via Postmark API route
- Optional Plausible analytics (conditional rendering)
- Optional one-pager printable page
- Land use comparison table
- Noise comparison data
- WCAG 2.1 Level A accessibility (skip navigation, focus styles, ARIA)
- CSP headers via vercel.json
- Unit tests (vitest) and Playwright test scaffolding
- Comprehensive CUSTOMIZATION.md documentation
