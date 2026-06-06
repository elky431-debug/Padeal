import type { ButtonHTMLAttributes, ReactNode } from 'react';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'danger';
  size?: 'md' | 'lg' | 'xl';
  children: ReactNode;
  fullWidth?: boolean;
}

const variantStyles = {
  primary:
    'bg-green-dark text-white hover:bg-green-deep border-transparent',
  secondary:
    'bg-white text-green-dark border-green-dark hover:bg-green-light',
  danger: 'bg-danger text-white hover:opacity-90 border-transparent',
};

const sizeStyles = {
  md: 'px-7 py-3.5 text-base',
  lg: 'px-8 py-4 text-base',
  xl: 'px-10 py-5 text-lg',
};

export function Button({
  variant = 'primary',
  size = 'md',
  fullWidth = false,
  className = '',
  children,
  ...props
}: ButtonProps) {
  return (
    <button
      className={[
        'inline-flex items-center justify-center gap-2',
        'rounded-pill font-sans font-semibold',
        'border-2 transition-colors duration-200',
        'min-h-[44px] disabled:opacity-50 disabled:cursor-not-allowed',
        variantStyles[variant],
        sizeStyles[size],
        fullWidth ? 'w-full' : '',
        className,
      ]
        .filter(Boolean)
        .join(' ')}
      {...props}
    >
      {children}
    </button>
  );
}
