interface HeroTitleProps {
  lines: string[];
  highlightLine?: number;
  highlightWords?: string[];
  size?: 'hero' | 'h1' | 'h2';
  className?: string;
}

const sizeClasses = {
  hero: 'text-[clamp(48px,8vw,80px)] leading-[0.92] tracking-[-1px]',
  h1: 'text-[clamp(34px,5vw,48px)] leading-[0.98] tracking-[-0.5px]',
  h2: 'text-[clamp(26px,4vw,34px)] leading-[1.02] tracking-[-0.3px]',
};

export function HeroTitle({
  lines,
  highlightLine = 1,
  highlightWords = [],
  size = 'hero',
  className = '',
}: HeroTitleProps) {
  return (
    <h1
      className={[
        'font-boldonse font-extrabold text-black',
        sizeClasses[size],
        className,
      ].join(' ')}
    >
      {lines.map((line, i) => (
        <span key={i} className="block">
          {highlightLine === i
            ? line.split(' ').map((word, wi) => (
                <span
                  key={wi}
                  className={
                    highlightWords.some((hw) =>
                      word.toUpperCase().includes(hw.toUpperCase())
                    )
                      ? 'text-green-dark'
                      : ''
                  }
                >
                  {word}
                  {wi < line.split(' ').length - 1 ? ' ' : ''}
                </span>
              ))
            : line}
        </span>
      ))}
    </h1>
  );
}
