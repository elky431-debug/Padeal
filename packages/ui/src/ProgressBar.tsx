interface ProgressBarProps {
  current: number;
  total: number;
}

export function ProgressBar({ current, total }: ProgressBarProps) {
  const pct = Math.min(100, Math.round((current / total) * 100));

  return (
    <div className="h-1 w-full rounded-full bg-green-light overflow-hidden">
      <div
        className="h-full rounded-full bg-green-dark transition-all duration-300"
        style={{ width: `${pct}%` }}
      />
    </div>
  );
}
