import { US, ES } from 'country-flag-icons/react/3x2';

interface FlagProps {
  className?: string;
}

export function USFlag({ className = "w-5 h-5" }: FlagProps) {
  return (
    <div className={`rounded-sm overflow-hidden shadow-sm ${className}`}>
      <US className="w-full h-full" />
    </div>
  );
}

export function ESFlag({ className = "w-5 h-5" }: FlagProps) {
  return (
    <div className={`rounded-sm overflow-hidden shadow-sm ${className}`}>
      <ES className="w-full h-full" />
    </div>
  );
}

