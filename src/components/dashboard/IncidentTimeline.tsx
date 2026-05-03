import { useEffect, useState } from "react";
import { mockIncidents } from "../../data/mockData";

type Incident = {
  incident_id: number;
  status: string;
  created_at: string;
};

export default function IncidentTimeline({ agentId: _agentId }: { agentId: number }) {
  const [incidents, setIncidents] = useState<Incident[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate loading delay and use mock data
    setTimeout(() => {
      setIncidents(mockIncidents);
      setLoading(false);
    }, 400);
  }, []);

  if (loading) {
    return (
      <div className="bg-black border border-gray-800 rounded-xl p-6 mt-6 text-gray-400">
        Loading incidents...
      </div>
    );
  }

  if (!incidents.length) {
    return (
      <div className="bg-black border border-gray-800 rounded-xl p-6 mt-6 text-gray-400">
        No incidents in last 24h
      </div>
    );
  }

  return (
    <div className="bg-gradient-to-br from-gray-900/50 to-gray-800/50 backdrop-blur-xl border border-gray-700/50 rounded-2xl p-8 mt-6 shadow-2xl hover-scale">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <div className="w-3 h-3 bg-red-500 rounded-full animate-pulse"></div>
          <h2 className="text-2xl font-bold text-white">Incident Timeline</h2>
        </div>
        <span className="text-xs text-gray-500 font-mono bg-gray-800/50 px-3 py-1 rounded-full">
          {incidents.length} INCIDENTS
        </span>
      </div>

      <div className="space-y-4">
        {incidents.map((i, index) => (
          <div
            key={i.incident_id}
            className="relative border-l-4 border-red-500/50 pl-6 py-4 hover:bg-red-500/5 transition-all duration-300 rounded-r-lg animate-slide-in"
            style={{ animationDelay: `${index * 100}ms` }}
          >
            <div className="absolute left-0 top-6 w-3 h-3 bg-red-500 rounded-full -translate-x-1/2 animate-pulse"></div>

            <div className="flex items-start justify-between">
              <div>
                <div className="flex items-center gap-3 mb-2">
                  <h3 className="text-white font-bold text-lg">
                    Incident #{i.incident_id}
                  </h3>
                  <span
                    className={`px-2 py-1 rounded-full text-xs font-bold ${
                      i.status === "resolved"
                        ? "bg-emerald-500/20 text-emerald-400 border border-emerald-500/30"
                        : "bg-yellow-500/20 text-yellow-400 border border-yellow-500/30"
                    }`}
                  >
                    {i.status.toUpperCase()}
                  </span>
                </div>

                <p className="text-gray-400 text-sm font-mono">
                  {new Date(i.created_at).toLocaleString()}
                </p>
              </div>

              <div className="text-red-400 opacity-0 hover:opacity-100 transition-opacity duration-300">
                <svg
                  className="w-5 h-5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 5v.01M12 12v.01M12 19v.01M12 6a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2z"
                  />
                </svg>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
