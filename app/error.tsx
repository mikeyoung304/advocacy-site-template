'use client';

export default function Error({
  error: _error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  // Error logged but not displayed to users for security
  void _error;
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-background px-4">
      <div className="mx-auto max-w-md text-center">
        <h2 className="text-2xl font-bold text-foreground">Something went wrong</h2>
        <p className="mt-2 text-foreground-muted">
          We apologize for the inconvenience. Please try again.
        </p>
        <button
          onClick={reset}
          className="mt-6 inline-flex min-h-[44px] items-center justify-center rounded-lg bg-primary px-6 py-2 font-medium text-white transition-colors hover:bg-primary-dark focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2"
        >
          Try again
        </button>
      </div>
    </div>
  );
}
