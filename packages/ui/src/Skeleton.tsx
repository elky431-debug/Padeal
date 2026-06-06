interface SkeletonProps {
  className?: string;
}

export function Skeleton({ className = '' }: SkeletonProps) {
  return (
    <div
      className={[
        'animate-pulse rounded-input bg-green-light/60',
        className,
      ].join(' ')}
    />
  );
}
