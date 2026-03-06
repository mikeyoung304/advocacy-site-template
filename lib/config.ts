// ============================================================================
// Site Configuration — operational settings for this deployment
// TODO(fork): Update all values below for your project
// ============================================================================

export const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://example.com';

export const contactEmail = 'info@example.com';

export const contactLocation = 'Your City, ST';

export const externalLinks: { label: string; url: string }[] = [
  // TODO(fork): Add external links (e.g., city government website)
  // { label: 'City of Example', url: 'https://www.example.gov' },
];

export const emailForwarding = {
  forwardTo: 'your-team@example.com',
  senderAddress: 'info@example.com',
};

// TODO(fork): Enable analytics by setting type and domain:
export const analytics: { type: 'plausible'; domain: string } | null = null;
