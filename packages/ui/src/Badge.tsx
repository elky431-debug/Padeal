import type { ReactNode } from 'react';

interface BadgeProps {
  children: ReactNode;
  variant?: 'default' | 'level' | 'premium';
}

export function Badge({ children, variant = 'default' }: BadgeProps) {
  const styles = {
    default: 'bg-green-light text-green-deep border-border',
    level: 'bg-green-light text-green-deep border-border font-mono',
    premium: 'bg-gold/20 text-green-deep border-gold',
  };

  return (
    <span
      className={[
        'inline-flex items-center rounded-pill px-3 py-1',
        'font-sans text-xs font-medium border',
        styles[variant],
      ].join(' ')}
    >
      {children}
    </span>
  );
}
