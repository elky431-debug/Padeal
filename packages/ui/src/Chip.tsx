import type { ButtonHTMLAttributes, ReactNode } from 'react';

interface ChipProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  selected?: boolean;
  children: ReactNode;
}

export function Chip({
  selected = false,
  children,
  className = '',
  ...props
}: ChipProps) {
  return (
    <button
      type="button"
      className={[
        'inline-flex items-center justify-center min-h-[44px]',
        'rounded-pill px-4 py-2',
        'font-sans font-medium text-sm',
        'border transition-colors duration-200',
        selected
          ? 'bg-green-dark text-white border-green-dark'
          : 'bg-green-light text-green-deep border-border hover:border-green-dark',
        className,
      ].join(' ')}
      {...props}
    >
      {children}
    </button>
  );
}
