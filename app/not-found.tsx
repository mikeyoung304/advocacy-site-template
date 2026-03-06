import Link from 'next/link';
import { Home } from 'lucide-react';
import { notFoundContent } from '@/lib/content';

export default function NotFound() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-gradient-to-b from-background to-primary-light/30 px-4">
      <div className="text-center">
        <h1 className="text-8xl font-black text-primary">404</h1>
        <h2 className="mt-4 text-2xl font-bold text-foreground sm:text-3xl">
          {notFoundContent.heading}
        </h2>
        <p className="mt-4 max-w-md text-foreground-muted">
          {notFoundContent.message}
        </p>
        <Link
          href="/"
          className="mt-8 inline-flex items-center gap-2 rounded-lg bg-primary-accessible px-6 py-3 font-semibold text-white transition-colors hover:bg-primary-accessible-dark"
        >
          <Home className="h-5 w-5" />
          {notFoundContent.linkText}
        </Link>
      </div>
    </div>
  );
}
