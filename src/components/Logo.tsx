import { cn } from '@/lib/utils';
import { Home } from 'lucide-react';

interface LogoProps {
  size?: 'sm' | 'md' | 'lg';
  showText?: boolean;
  className?: string;
}

export function Logo({ size = 'md', showText = true, className }: LogoProps) {
  const sizes = {
    sm: 'h-6 w-6',
    md: 'h-8 w-8',
    lg: 'h-12 w-12',
  };

  const textSizes = {
    sm: 'text-lg',
    md: 'text-xl',
    lg: 'text-3xl',
  };

  return (
    <div className={cn('flex items-center gap-2', className)}>
      <div className="relative">
        <div className="absolute inset-0 bg-primary/20 blur-xl rounded-full" />
        <div className={cn(
          'relative flex items-center justify-center rounded-xl bg-gradient-to-br from-primary to-primary/70',
          sizes[size]
        )}>
          <Home className={cn('text-primary-foreground', size === 'lg' ? 'h-7 w-7' : size === 'md' ? 'h-5 w-5' : 'h-4 w-4')} />
        </div>
      </div>
      {showText && (
        <span className={cn('font-bold tracking-tight gradient-text', textSizes[size])}>
          Rentr
        </span>
      )}
    </div>
  );
}