import type { InputHTMLAttributes } from 'react';

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
}

export function Input({ label, error, className = '', id, ...props }: InputProps) {
  const inputId = id ?? label?.toLowerCase().replace(/\s/g, '-');

  return (
    <div className="flex flex-col gap-1.5">
      {label && (
        <label
          htmlFor={inputId}
          className="font-sans font-medium text-sm text-gray"
        >
          {label}
        </label>
      )}
      <input
        id={inputId}
        className={[
          'h-[52px] w-full rounded-input border-[1.5px] border-border',
          'bg-white px-4 font-sans text-base text-black',
          'placeholder:text-gray/60',
          'focus:border-green-dark focus:outline-none focus:ring-0',
          'transition-colors',
          error ? 'border-danger' : '',
          className,
        ]
          .filter(Boolean)
          .join(' ')}
        {...props}
      />
      {error && (
        <span className="font-sans text-sm text-danger">{error}</span>
      )}
    </div>
  );
}
