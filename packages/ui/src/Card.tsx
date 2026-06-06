import type { HTMLAttributes, ReactNode } from 'react';

interface CardProps extends HTMLAttributes<HTMLDivElement> {
  children: ReactNode;
  accent?: boolean;
}

export function Card({
  children,
  accent = false,
  className = '',
  ...props
}: CardProps) {
  return (
    <div
      className={[
        'rounded-card bg-white border border-border p-5',
        accent ? 'border-l-[3px] border-l-green-dark' : '',
        className,
      ]
        .filter(Boolean)
        .join(' ')}
      {...props}
    >
      {children}
    </div>
  );
}
