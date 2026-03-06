import type { Metadata } from 'next';
import { Geist } from 'next/font/google';
import Script from 'next/script';
import { MotionConfig } from 'framer-motion';
import { siteUrl, analytics } from '@/lib/config';
import { siteMetadata } from '@/lib/content';
import { theme } from '@/lib/theme';
import './globals.css';

// Generate CSS custom properties from theme.ts to override @theme defaults
function getThemeStyleTag(): string {
  const { colors, glass } = theme;
  return `:root {
    --color-primary: ${colors.primary};
    --color-primary-hover: ${colors.primaryHover};
    --color-primary-light: ${colors.primaryLight};
    --color-primary-dark: ${colors.primaryDark};
    --color-accent: ${colors.accent};
    --color-accent-hover: ${colors.accentHover};
    --color-accent-light: ${colors.accentLight};
    --color-ink: ${colors.ink};
    --color-ink-muted: ${colors.inkMuted};
    --color-ink-subtle: ${colors.inkSubtle};
    --color-surface: ${colors.surface};
    --color-surface-muted: ${colors.surfaceMuted};
    --color-surface-elevated: ${colors.surfaceElevated};
    --color-border: ${colors.border};
    --color-border-muted: ${colors.borderMuted};
    --color-chart-1: ${colors.chart1};
    --color-chart-2: ${colors.chart2};
    --color-chart-3: ${colors.chart3};
    --color-chart-4: ${colors.chart4};
    --color-chart-accent: ${colors.chartAccent};
    --glass-bg: ${glass.bg};
    --glass-bg-scrolled: ${glass.bgScrolled};
  }`;
}

// TODO(fork): Change font by updating this import and --font-sans in globals.css
const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
  display: 'swap',
});

export const metadata: Metadata = {
  title: siteMetadata.title,
  description: siteMetadata.description,
  keywords: siteMetadata.keywords,
  authors: siteMetadata.authors,
  creator: siteMetadata.creator,
  metadataBase: new URL(siteUrl),
  openGraph: {
    title: siteMetadata.ogTitle,
    description: siteMetadata.ogDescription,
    type: 'website',
    locale: 'en_US',
    url: siteUrl,
    siteName: siteMetadata.ogTitle,
    images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 630,
        alt: siteMetadata.ogImageAlt,
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: siteMetadata.twitterTitle,
    description: siteMetadata.twitterDescription,
    images: ['/og-image.png'],
  },
  icons: {
    icon: '/favicon.svg',
    apple: '/favicon.svg',
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        {/* Theme overrides from lib/theme.ts — server-rendered, no flash */}
        <style dangerouslySetInnerHTML={{ __html: getThemeStyleTag() }} />
        {/* Analytics - only rendered when configured */}
        {analytics && analytics.type === 'plausible' && (
          <Script
            defer
            data-domain={analytics.domain}
            src="https://plausible.io/js/script.js"
            strategy="afterInteractive"
          />
        )}
      </head>
      <body className={`${geistSans.variable} antialiased`}>
        {/* Skip navigation link for keyboard/screen reader users - WCAG 2.1 Level A */}
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:fixed focus:z-[100] focus:top-4 focus:left-4 focus:bg-primary focus:text-white focus:px-4 focus:py-2 focus:rounded-lg focus:ring-2 focus:ring-primary-dark focus:outline-none focus:shadow-elevated"
        >
          Skip to main content
        </a>
        <MotionConfig reducedMotion="user">
          {children}
        </MotionConfig>
      </body>
    </html>
  );
}
