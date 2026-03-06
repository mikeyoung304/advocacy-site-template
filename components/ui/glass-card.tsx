import * as React from 'react';
import { cn } from '@/lib/cn';

interface GlassCardProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  padding?: 'sm' | 'md' | 'lg';
}

const GlassCard = React.forwardRef<HTMLDivElement, GlassCardProps>(
  ({ children, className, padding = 'md', ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn(
          'rounded-xl bg-white/45 shadow-lg backdrop-blur-[8px] border border-white/40',
          padding === 'sm' && 'p-3 sm:p-4',
          padding === 'md' && 'p-3 sm:p-4 md:p-6',
          padding === 'lg' && 'p-4 sm:p-6 md:p-8 lg:p-8',
          className
        )}
        {...props}
      >
        {children}
      </div>
    );
  }
);
GlassCard.displayName = 'GlassCard';

export { GlassCard };
export type { GlassCardProps };
