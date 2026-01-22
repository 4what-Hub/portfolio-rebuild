'use client';

import { forwardRef } from 'react';
import { Slot } from '@radix-ui/react-slot';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '@/lib/utils/helpers';

const buttonVariants = cva(
  // Base styles
  'inline-flex items-center justify-center font-medium transition-all duration-200 ease-[cubic-bezier(0.165,0.84,0.44,1)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50',
  {
    variants: {
      variant: {
        primary:
          'bg-[var(--accent-primary)] text-white hover:bg-[var(--accent-primary-hover)] focus-visible:ring-[var(--accent-primary)]',
        secondary:
          'bg-transparent text-[var(--accent-tertiary)] border border-[var(--border-secondary)] hover:border-[rgba(255,255,255,0.4)]',
        outline:
          'bg-transparent text-[var(--text-primary)] border border-[var(--border-primary)] hover:border-[var(--border-secondary)] hover:bg-[rgba(255,255,255,0.05)]',
        ghost:
          'bg-transparent text-[var(--text-primary)] hover:bg-[rgba(255,255,255,0.05)]',
        link:
          'bg-transparent text-[var(--accent-link)] underline-offset-4 hover:underline hover:text-[var(--accent-link-hover)] p-0',
        inverse:
          'bg-[var(--neutral-inverse)] text-[var(--text-inverse-primary)] hover:bg-[rgba(232,220,211,0.9)]',
      },
      size: {
        sm: 'text-sm px-3 py-2 rounded-[var(--radius-sm)]',
        md: 'text-base px-6 py-3 rounded-[var(--radius-md)]',
        lg: 'text-lg px-8 py-4 rounded-[var(--radius-md)]',
        icon: 'h-10 w-10 rounded-[var(--radius-md)]',
      },
      fullWidth: {
        true: 'w-full',
      },
    },
    defaultVariants: {
      variant: 'primary',
      size: 'md',
      fullWidth: false,
    },
  }
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
  loading?: boolean;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
}

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      className,
      variant,
      size,
      fullWidth,
      asChild = false,
      loading,
      leftIcon,
      rightIcon,
      disabled,
      children,
      ...props
    },
    ref
  ) => {
    const Comp = asChild ? Slot : 'button';

    return (
      <Comp
        className={cn(buttonVariants({ variant, size, fullWidth }), className)}
        ref={ref}
        disabled={disabled || loading}
        {...props}
      >
        {loading ? (
          <>
            <svg
              className="animate-spin -ml-1 mr-2 h-4 w-4"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
            >
              <circle
                className="opacity-25"
                cx="12"
                cy="12"
                r="10"
                stroke="currentColor"
                strokeWidth="4"
              />
              <path
                className="opacity-75"
                fill="currentColor"
                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
              />
            </svg>
            {children}
          </>
        ) : (
          <>
            {leftIcon && <span className="mr-2">{leftIcon}</span>}
            {children}
            {rightIcon && <span className="ml-2">{rightIcon}</span>}
          </>
        )}
      </Comp>
    );
  }
);

Button.displayName = 'Button';

export { Button, buttonVariants };
