'use client';

import { forwardRef } from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '@/lib/utils/helpers';

const cardVariants = cva(
  // Base styles
  'rounded-[var(--radius-lg)] border transition-all duration-200 ease-[cubic-bezier(0.165,0.84,0.44,1)]',
  {
    variants: {
      variant: {
        default:
          'bg-[var(--bg-secondary)] border-[var(--border-secondary)] text-[var(--text-primary)]',
        primary:
          'bg-[var(--bg-primary)] border-[var(--border-primary)] text-[var(--text-primary)]',
        inverse:
          'bg-[var(--bg-inverse)] border-transparent text-[var(--text-inverse-primary)]',
        'accent-primary':
          'bg-[var(--accent-primary)] border-transparent text-white',
        'accent-secondary':
          'bg-[var(--accent-secondary)] border-transparent text-white',
        'accent-tertiary':
          'bg-[var(--accent-tertiary)] border-transparent text-white',
        ghost:
          'bg-transparent border-[var(--border-primary)]',
      },
      padding: {
        none: 'p-0',
        sm: 'p-4',
        md: 'p-6',
        lg: 'p-8',
        xl: 'p-12',
      },
      hoverable: {
        true: 'hover:border-[var(--border-accent)] hover:shadow-md cursor-pointer',
      },
    },
    defaultVariants: {
      variant: 'default',
      padding: 'lg',
      hoverable: false,
    },
  }
);

export interface CardProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof cardVariants> {}

const Card = forwardRef<HTMLDivElement, CardProps>(
  ({ className, variant, padding, hoverable, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn(cardVariants({ variant, padding, hoverable }), className)}
        {...props}
      />
    );
  }
);

Card.displayName = 'Card';

// Card Header
const CardHeader = forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => (
    <div
      ref={ref}
      className={cn('flex flex-col space-y-1.5', className)}
      {...props}
    />
  )
);
CardHeader.displayName = 'CardHeader';

// Card Title
const CardTitle = forwardRef<HTMLHeadingElement, React.HTMLAttributes<HTMLHeadingElement>>(
  ({ className, ...props }, ref) => (
    <h3
      ref={ref}
      className={cn('font-heading text-2xl leading-tight tracking-tight', className)}
      {...props}
    />
  )
);
CardTitle.displayName = 'CardTitle';

// Card Description
const CardDescription = forwardRef<HTMLParagraphElement, React.HTMLAttributes<HTMLParagraphElement>>(
  ({ className, ...props }, ref) => (
    <p
      ref={ref}
      className={cn('text-[var(--text-secondary)]', className)}
      {...props}
    />
  )
);
CardDescription.displayName = 'CardDescription';

// Card Content
const CardContent = forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => (
    <div ref={ref} className={cn('', className)} {...props} />
  )
);
CardContent.displayName = 'CardContent';

// Card Footer
const CardFooter = forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => (
    <div
      ref={ref}
      className={cn('flex items-center pt-4', className)}
      {...props}
    />
  )
);
CardFooter.displayName = 'CardFooter';

// Card Image (for project cards, gallery items, etc.)
interface CardImageProps extends React.ImgHTMLAttributes<HTMLImageElement> {
  aspectRatio?: 'square' | 'video' | 'portrait' | 'wide';
}

const CardImage = forwardRef<HTMLDivElement, CardImageProps>(
  ({ className, aspectRatio = 'video', src, alt, ...props }, ref) => {
    const aspectClasses = {
      square: 'aspect-square',
      video: 'aspect-video',
      portrait: 'aspect-[3/4]',
      wide: 'aspect-[21/9]',
    };

    return (
      <div
        ref={ref}
        className={cn(
          'relative overflow-hidden rounded-[var(--radius-md)]',
          aspectClasses[aspectRatio],
          className
        )}
      >
        {src && (
          <img
            src={src}
            alt={alt || ''}
            className="absolute inset-0 h-full w-full object-cover transition-transform duration-300 ease-out hover:scale-105"
            {...props}
          />
        )}
      </div>
    );
  }
);
CardImage.displayName = 'CardImage';

export {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
  CardImage,
  cardVariants,
};
