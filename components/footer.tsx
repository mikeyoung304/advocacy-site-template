import { Mail, MapPin, ExternalLink, ChevronRight, ArrowUp } from 'lucide-react';
import { footerContent, siteConfig, getVisibleNavLinks } from '@/lib/content';
import { contactEmail, contactLocation, externalLinks } from '@/lib/config';

export function Footer() {
  const visibleNavLinks = getVisibleNavLinks();

  return (
    <footer className="border-t border-foreground-muted/20 bg-background-secondary">
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8 lg:py-16">
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
          {/* About */}
          <div className="lg:col-span-1">
            <h2 className="text-lg font-semibold tracking-tight text-foreground">
              {footerContent.projectName}
            </h2>
            <p className="mt-4 text-sm leading-relaxed text-foreground-muted">
              {footerContent.disclaimer}
            </p>
          </div>

          {/* Contact Info */}
          <div>
            <h2 className="text-lg font-semibold tracking-tight text-foreground">Contact</h2>
            <ul className="mt-4 space-y-1">
              <li>
                <a
                  href={`mailto:${contactEmail}`}
                  className="inline-flex min-h-[44px] items-center gap-3 rounded text-sm text-foreground-muted transition-colors hover:text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2"
                >
                  <Mail className="h-4 w-4 shrink-0 text-primary" aria-hidden="true" />
                  {contactEmail}
                </a>
              </li>
              <li className="flex min-h-[44px] items-center gap-3">
                <MapPin className="h-4 w-4 shrink-0 text-primary" aria-hidden="true" />
                <span className="text-sm text-foreground-muted">
                  {contactLocation}
                </span>
              </li>
              {externalLinks.map((link) => (
                <li key={link.url}>
                  <a
                    href={link.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex min-h-[44px] items-center gap-3 rounded text-sm text-foreground-muted transition-colors hover:text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2"
                  >
                    <ExternalLink className="h-4 w-4 shrink-0 text-primary" aria-hidden="true" />
                    {link.label}
                    <span className="sr-only"> (opens in new tab)</span>
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Quick Links */}
          <div>
            <h2 className="text-lg font-semibold tracking-tight text-foreground">Quick Links</h2>
            <ul className="mt-4 space-y-1">
              {visibleNavLinks.map((link) => (
                <li key={link.href}>
                  <a
                    href={link.href}
                    className="group inline-flex min-h-[44px] items-center gap-1 rounded px-1 text-sm text-foreground-muted transition-colors hover:text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2"
                  >
                    <ChevronRight className="h-3 w-3 opacity-0 -ml-4 transition-all group-hover:opacity-100 group-hover:ml-0" aria-hidden="true" />
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Get In Touch */}
          <div>
            <h2 className="text-lg font-semibold tracking-tight text-foreground">Get In Touch</h2>
            <p className="mt-4 text-sm text-foreground-muted">
              {footerContent.ctaParagraph}
            </p>
            <a
              href={`mailto:${contactEmail}`}
              className="mt-4 inline-flex min-h-[44px] items-center gap-2 rounded-lg bg-primary px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-primary-hover focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2"
            >
              <Mail className="h-4 w-4" aria-hidden="true" />
              Contact Us
            </a>
          </div>
        </div>

        {/* Bottom section */}
        <div className="mt-12 border-t border-foreground-muted/20 pt-8">
          <div className="flex flex-col items-center justify-between gap-4 sm:flex-row">
            <p className="text-sm text-foreground-muted">
              &copy; {new Date().getFullYear()} {siteConfig.projectName}. All rights reserved.
            </p>
            <a
              href="#top"
              className="group inline-flex items-center gap-2 text-sm text-foreground-muted transition-colors hover:text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 rounded"
            >
              Back to top
              <ArrowUp className="h-4 w-4 transition-transform group-hover:-translate-y-0.5" aria-hidden="true" />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
