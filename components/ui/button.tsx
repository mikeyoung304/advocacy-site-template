import * as React from 'react';
import { cn } from '@/lib/cn';

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'default' | 'outline' | 'ghost' | 'secondary';
  size?: 'default' | 'sm' | 'lg';
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = 'default', size = 'default', ...props }, ref) => {
    return (
      <button
        className={cn(
          'inline-flex items-center justify-center whitespace-nowrap rounded-lg font-semibold transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 active:scale-[0.98]',
          {
            'bg-primary text-white shadow-md hover:bg-primary-hover hover:shadow-lg hover:scale-[1.02]': variant === 'default',
            'bg-secondary text-white shadow-md hover:bg-secondary-hover hover:shadow-lg hover:scale-[1.02]': variant === 'secondary',
            'border-2 border-foreground-muted/20 bg-transparent hover:border-foreground-muted/40 hover:bg-background-secondary hover:scale-[1.02]': variant === 'outline',
            'hover:bg-background-secondary hover:scale-[1.02]': variant === 'ghost',
          },
          {
            'h-10 min-w-[44px] px-4 py-2 text-sm': size === 'default',
            'h-9 min-w-[44px] px-3 text-xs': size === 'sm',
            'h-12 min-w-[44px] px-8 text-base': size === 'lg',
          },
          className
        )}
        ref={ref}
        {...props}
      />
    );
  }
);
Button.displayName = 'Button';

export { Button };
