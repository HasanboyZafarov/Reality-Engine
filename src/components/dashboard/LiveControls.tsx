import { useMemo } from "react";

interface Props {
  isLive: boolean;
  lastUpdated: number | null;
  onToggle: () => void;
}

export function LiveControls({ isLive, lastUpdated, onToggle }: Props) {
  const timeLabel = useMemo(() => {
    if (!lastUpdated) return "—";
    return new Date(lastUpdated).toLocaleTimeString();
  }, [lastUpdated]);

  return (
    <div className="flex items-center justify-between mb-4">
      <div className="flex items-center gap-3">
        <span
          className={`inline-flex items-center gap-2 text-sm font-medium ${
            isLive ? "text-green-600" : "text-gray-400"
          }`}
        >
          <span
            className={`inline-block w-2 h-2 rounded-full ${
              isLive ? "bg-green-500 animate-pulse" : "bg-gray-400"
            }`}
          />
          {isLive ? "Live" : "Paused"}
        </span>

        <span className="text-xs text-gray-500">
          Last update: {timeLabel}
        </span>
      </div>

      <button
        onClick={onToggle}
        className={`px-3 py-1.5 text-xs font-medium rounded border transition ${
          isLive
            ? "border-gray-300 text-gray-700 hover:bg-gray-50"
            : "border-green-500 text-green-600 hover:bg-green-50"
        }`}
      >
        {isLive ? "Pause" : "Resume"}
      </button>
    </div>
  );
}