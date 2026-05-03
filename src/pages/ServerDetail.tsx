import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import DashboardLayout from "../layout/DashboardLayout";

import { Server, Cpu } from "lucide-react";

import MetricsChart from "../components/dashboard/MetricsChart";
import { SignalsTable } from "../components/dashboard/SignalsTable";

import { mockServers, mockSignals } from "../data/mockData";

type ServerType = {
  id: number;
  name: string;
  company: string;
  status: "healthy" | "warning" | "critical";
  last_seen_at: string | null;
};

export default function ServerDetail() {
  const { id } = useParams();

  const [server, setServer] = useState<ServerType | null>(null);
  const [signals, setSignals] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  // ==========================================================
  // INITIAL LOAD
  // ==========================================================

  useEffect(() => {
    // Simulate loading delay
    setTimeout(() => {
      const serverId = Number(id);
      const foundServer = mockServers.find((s) => s.id === serverId);
      const serverSignals = mockSignals.filter(
        (s) => s.company?.id === serverId,
      );

      setServer(foundServer || null);
      setSignals(serverSignals);
      setLoading(false);
    }, 500);
  }, [id]);

  // ==========================================================
  // HELPERS
  // ==========================================================

  const statusColor = (status: string) => {
    if (status === "healthy") return "text-emerald-400";
    if (status === "warning") return "text-yellow-400";

    return "text-red-400";
  };

  const formatTime = (value: string | null) => {
    if (!value) return "never";

    return new Date(value).toLocaleString();
  };

  // ==========================================================
  // LOADING
  // ==========================================================

  if (loading) {
    return (
      <DashboardLayout>
        <div className="min-h-screen bg-gradient-to-br from-gray-950 via-black to-gray-950 flex items-center justify-center">
          <div className="text-center">
            <div className="w-16 h-16 border-4 border-blue-500/50 border-t-blue-500 rounded-full animate-spin mx-auto mb-4"></div>
            <p className="text-blue-400 font-mono animate-pulse">
              LOADING SERVER DETAILS...
            </p>
          </div>
        </div>
      </DashboardLayout>
    );
  }

  if (!server) {
    return (
      <DashboardLayout>
        <div className="flex items-center justify-center h-[60vh] text-red-500">
          Server not found
        </div>
      </DashboardLayout>
    );
  }

  // ==========================================================
  // PAGE
  // ==========================================================

  return (
    <DashboardLayout>
      <div className="min-h-screen bg-gradient-to-br from-gray-950 via-black to-gray-950">
        {/* ANIMATED BACKGROUND EFFECTS */}
        <div className="fixed inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-0 left-0 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute bottom-0 right-0 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl animate-pulse delay-1000"></div>
        </div>

        <div className="max-w-7xl mx-auto px-4 md:px-8 py-8 space-y-8 text-white relative z-10">
          {/* SERVER HEADER */}

          <div className="bg-gradient-to-r from-gray-900/50 to-gray-800/50 backdrop-blur-xl rounded-3xl p-8 border border-gray-700/50 shadow-2xl relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-r from-blue-500/5 to-purple-500/5"></div>

            <div className="relative z-10">
              <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6">
                <div>
                  <div className="flex items-center gap-4 mb-3">
                    <div className="w-3 h-3 bg-emerald-500 rounded-full animate-pulse"></div>
                    <div className="flex items-center gap-3">
                      <Server className="text-blue-400" size={24} />
                      <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent">
                        {server.name}
                      </h1>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <p className="text-gray-400 text-sm font-mono">
                      {server.company}
                    </p>
                    <div className="flex items-center gap-2 text-xs text-gray-500 font-mono">
                      <span className="text-gray-600">LAST SEEN:</span>
                      <span className="text-gray-400">
                        {formatTime(server.last_seen_at)}
                      </span>
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <div
                    className={`w-3 h-3 rounded-full ${
                      server.status === "healthy"
                        ? "bg-emerald-500 animate-pulse shadow-lg shadow-emerald-500/50"
                        : server.status === "warning"
                          ? "bg-yellow-500 animate-pulse shadow-lg shadow-yellow-500/50"
                          : "bg-red-500 animate-pulse shadow-lg shadow-red-500/50"
                    }`}
                  ></div>
                  <span
                    className={`font-bold text-lg px-4 py-2 rounded-full border ${
                      server.status === "healthy"
                        ? "text-emerald-400 border-emerald-500/30 bg-emerald-500/10"
                        : server.status === "warning"
                          ? "text-yellow-400 border-yellow-500/30 bg-yellow-500/10"
                          : "text-red-400 border-red-500/30 bg-red-500/10"
                    }`}
                  >
                    {server.status === "healthy" && "HEALTHY"}
                    {server.status === "warning" && "WARNING"}
                    {server.status === "critical" && "CRITICAL"}
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* METRICS */}

          <div className="bg-gradient-to-r from-gray-900/50 to-gray-800/50 backdrop-blur-xl rounded-3xl p-8 border border-gray-700/50 shadow-2xl">
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-3">
                <div className="w-3 h-3 bg-blue-500 rounded-full animate-pulse"></div>
                <Cpu className="text-blue-400" size={20} />
                <h2 className="text-2xl font-bold text-white">
                  System Metrics
                </h2>
              </div>
              <span className="text-xs text-gray-500 font-mono bg-gray-800/50 px-3 py-1 rounded-full">
                REAL-TIME MONITORING
              </span>
            </div>

            <MetricsChart agentId={Number(id)} />
          </div>

          {/* SIGNALS */}

          <div className="bg-gradient-to-r from-gray-900/50 to-gray-800/50 backdrop-blur-xl rounded-3xl overflow-hidden shadow-2xl border border-gray-700/50">
            <div className="px-8 py-6 border-b border-gray-700/50 flex justify-between items-center bg-gradient-to-r from-gray-800/50 to-gray-700/50">
              <div className="flex items-center gap-4">
                <div className="flex items-center gap-3">
                  <div className="w-3 h-3 bg-orange-500 rounded-full animate-pulse"></div>
                  <h2 className="text-2xl font-bold text-white">
                    Active Signals
                  </h2>
                </div>
                <span className="text-xs text-gray-500 font-mono bg-gray-800/50 px-3 py-1 rounded-full">
                  {signals.length} ACTIVE
                </span>
              </div>
            </div>

            {signals.length > 0 ? (
              <div className="p-6">
                <SignalsTable signals={signals} />
              </div>
            ) : (
              <div className="py-16 text-center">
                <div className="flex flex-col items-center gap-4">
                  <div className="w-16 h-16 border-4 border-gray-700/50 border-t-orange-500 rounded-full animate-spin"></div>
                  <h3 className="text-gray-400 text-xl font-medium">
                    No Active Signals
                  </h3>
                  <p className="text-gray-600 text-sm">
                    Server is operating normally
                  </p>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}
