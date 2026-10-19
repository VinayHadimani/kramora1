import { cn } from "@/lib/utils";

export function KramoraMark({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 64 64" className={cn("h-8 w-8", className)} aria-hidden="true">
      <defs>
        <linearGradient id="kmark-bg" x1="0" y1="0" x2="64" y2="64" gradientUnits="userSpaceOnUse">
          <stop offset="0" stopColor="#3B82F6" />
          <stop offset="1" stopColor="#2563EB" />
        </linearGradient>
      </defs>
      <rect width="64" height="64" rx="16" fill="url(#kmark-bg)" />
      <path d="M20 17v30" stroke="#FFFFFF" strokeWidth="6" strokeLinecap="round" />
      <path
        d="M44 17 27 32l17 15"
        stroke="#FFFFFF"
        strokeWidth="6"
        strokeLinecap="round"
        strokeLinejoin="round"
        fill="none"
      />
      <circle cx="45" cy="19" r="3.5" fill="#BFDBFE" />
    </svg>
  );
}

export function KramoraLogo({
  className,
  markClassName,
}: {
  className?: string;
  markClassName?: string;
}) {
  return (
    <span className={cn("inline-flex items-center gap-2.5", className)}>
      <KramoraMark className={cn("h-8 w-8", markClassName)} />
      <span className="flex items-baseline gap-1">
        <span className="text-lg font-semibold tracking-tight text-slate-900">Kramora</span>
        <span className="text-lg font-semibold tracking-tight text-blue-600">AI</span>
      </span>
    </span>
  );
}
