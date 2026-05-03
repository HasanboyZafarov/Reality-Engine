import type { Severity } from "../../types/signal";

interface Props {
  level: Severity;
}

const COLORS: Record<Severity, string> = {
  Low: "bg-emerald-500",
  Medium: "bg-amber-500",
  High: "bg-orange-600",
  Critical: "bg-rose-600",
};

export function SeverityBadge({ level }: Props) {
  return (
    <span className={`inline-block px-2 py-1 rounded text-white text-[10px] font-bold uppercase ${COLORS[level] || 'bg-gray-500'}`}>
      {level}
    </span>
  );
}