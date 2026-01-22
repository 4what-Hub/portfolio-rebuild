import { cn } from '@/lib/utils/helpers';

interface ContainerProps extends React.HTMLAttributes<HTMLDivElement> {
  size?: 'sm' | 'md' | 'lg' | 'full';
  as?: 'div' | 'section' | 'article' | 'main';
}

export function Container({
  children,
  className,
  size = 'md',
  as: Component = 'div',
  ...props
}: ContainerProps) {
  const sizeClasses = {
    sm: 'max-w-[1000px]',
    md: 'max-w-[1280px]',
    lg: 'max-w-[1440px]',
    full: 'max-w-full',
  };

  return (
    <Component
      className={cn(
        'w-full mx-auto px-4 md:px-6 lg:px-8',
        sizeClasses[size],
        className
      )}
      {...props}
    >
      {children}
    </Component>
  );
}
