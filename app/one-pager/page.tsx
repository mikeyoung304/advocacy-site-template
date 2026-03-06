import type { Metadata } from 'next';

// TODO(fork): Update metadata for your project's one-pager
export const metadata: Metadata = {
  title: 'Your Project Name - One Pager',
  description: 'Project summary one-pager for print or digital distribution',
};

/**
 * Optional one-pager page — a printable single-page summary of the project.
 *
 * This is an example template. Replace all content with your project's information.
 * If you don't need a one-pager, delete this file.
 * See CUSTOMIZATION.md "Removing the One-Pager" section.
 */
export default function OnePager() {
  return (
    <div className="one-pager-page">
      <style>{`
        .one-pager-page {
          --primary: #1E3A8A;
          --accent: #166534;
          --ink: #1F2937;
          --ink-muted: #6B7280;
          --surface: #FFFFFF;
          --surface-muted: #F9FAFB;

          font-family: 'Inter', -apple-system, sans-serif;
          background: var(--surface);
          color: var(--ink);
          line-height: 1.5;
          -webkit-print-color-adjust: exact !important;
          print-color-adjust: exact !important;
        }

        @page {
          size: letter;
          margin: 0;
        }

        .page {
          width: 8.5in;
          height: 11in;
          margin: 0 auto;
          padding: 0.6in;
          display: flex;
          flex-direction: column;
          background: var(--surface);
        }

        .header {
          text-align: center;
          margin-bottom: 0.35in;
        }

        .header h1 {
          font-size: 30pt;
          font-weight: 800;
          color: var(--primary);
          letter-spacing: -0.5px;
          margin-bottom: 6px;
        }

        .header .location {
          font-size: 14pt;
          color: var(--ink-muted);
          font-weight: 500;
        }

        .hero {
          background: linear-gradient(135deg, var(--primary) 0%, #2563EB 100%);
          color: white;
          text-align: center;
          padding: 0.4in 0.5in;
          border-radius: 16px;
          margin-bottom: 0.35in;
          box-shadow: 0 4px 20px rgba(30, 58, 138, 0.15);
        }

        .hero-stat {
          font-size: 48pt;
          font-weight: 800;
          line-height: 1;
          margin-bottom: 8px;
        }

        .hero-label {
          font-size: 14pt;
          font-weight: 500;
          opacity: 0.95;
        }

        .pillars {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 0.25in;
          flex: 1;
        }

        .pillar {
          background: white;
          border-radius: 12px;
          padding: 0.35in 0.3in 0.3in;
          display: flex;
          flex-direction: column;
          border: 1px solid #E5E7EB;
          box-shadow: 0 2px 8px rgba(0, 0, 0, 0.04);
        }

        .pillar-icon {
          width: 44px;
          height: 44px;
          background: var(--primary);
          color: white;
          border-radius: 10px;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 20pt;
          font-weight: 700;
          margin-bottom: 0.15in;
        }

        .pillar.green .pillar-icon {
          background: var(--accent);
        }

        .pillar-title {
          font-size: 13pt;
          font-weight: 700;
          color: var(--primary);
          margin-bottom: 0.2in;
        }

        .pillar.green .pillar-title {
          color: var(--accent);
        }

        .pillar-highlight {
          font-size: 24pt;
          font-weight: 800;
          color: var(--primary);
          line-height: 1.1;
          margin-bottom: 0.08in;
        }

        .pillar.green .pillar-highlight {
          color: var(--accent);
        }

        .pillar-subtext {
          font-size: 10pt;
          color: var(--ink-muted);
          margin-bottom: 0.2in;
        }

        .pillar-details {
          list-style: none;
          margin-top: auto;
          padding: 0;
        }

        .pillar-details li {
          font-size: 10pt;
          color: var(--ink);
          padding: 0.06in 0;
          padding-left: 18px;
          position: relative;
        }

        .pillar-details li::before {
          content: "→";
          position: absolute;
          left: 0;
          color: var(--primary);
          font-weight: 600;
        }

        .pillar.green .pillar-details li::before {
          color: var(--accent);
        }

        .cta {
          margin-top: auto;
          padding-top: 0.3in;
        }

        .cta-inner {
          background: var(--surface-muted);
          border-radius: 10px;
          padding: 0.25in 0.4in;
          text-align: center;
          border: 1px solid #E5E7EB;
        }

        .cta-url {
          font-size: 20pt;
          font-weight: 700;
          color: var(--primary);
          letter-spacing: -0.3px;
        }

        .cta-tagline {
          font-size: 10pt;
          color: var(--ink-muted);
          margin-top: 6px;
        }

        @media print {
          body { -webkit-print-color-adjust: exact !important; print-color-adjust: exact !important; }
          .page { page-break-after: avoid; page-break-inside: avoid; }
        }
      `}</style>

      {/* TODO(fork): Replace all content below with your project's information */}
      <div className="page">
        <header className="header">
          <h1>Your Project Name</h1>
          <div className="location">Your City, Your State</div>
        </header>

        <div className="hero">
          <div className="hero-stat">$X Billion</div>
          <div className="hero-label">Private Investment in Our Community</div>
        </div>

        <div className="pillars">
          <div className="pillar">
            <div className="pillar-icon">$</div>
            <div className="pillar-title">Jobs & Economy</div>
            <div className="pillar-highlight">X,000+</div>
            <div className="pillar-subtext">construction jobs</div>
            <ul className="pillar-details">
              <li>X+ permanent high-paying jobs</li>
              <li>$XM+ annual local payroll</li>
              <li>$XM+ infrastructure investment</li>
            </ul>
          </div>

          <div className="pillar green">
            <div className="pillar-icon">★</div>
            <div className="pillar-title">Community Revenue</div>
            <div className="pillar-highlight">$XM+</div>
            <div className="pillar-subtext">annual tax revenue</div>
            <ul className="pillar-details">
              <li>Property taxes fund local schools</li>
              <li>Supports career tech programs</li>
              <li>Stable tax base for decades</li>
            </ul>
          </div>

          <div className="pillar">
            <div className="pillar-icon">◆</div>
            <div className="pillar-title">Quiet Neighbor</div>
            <div className="pillar-highlight">&lt;60 dBA</div>
            <div className="pillar-subtext">quieter than nearby traffic</div>
            <ul className="pillar-details">
              <li>Zero retail or truck traffic</li>
              <li>Efficient cooling technology</li>
              <li>Campus-style landscaping</li>
            </ul>
          </div>
        </div>

        <div className="cta">
          <div className="cta-inner">
            <div className="cta-url">example.com</div>
            <div className="cta-tagline">Learn more about the project, FAQs, and community resources</div>
          </div>
        </div>
      </div>
    </div>
  );
}
