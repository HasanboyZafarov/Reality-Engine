import DashboardLayout from "../layout/DashboardLayout";

import { useEffect, useState, useCallback } from "react";

import { fetchSignals } from "../api/signals";
import { fetchDashboardStats } from "../api/stats";

import type { Signal } from "../types/signal";
import type { DashboardStats } from "../types/stats";

import { SignalsTable } from "../components/dashboard/SignalsTable";
import { StatsCards } from "../components/dashboard/StatsCards";
import { LiveControls } from "../components/dashboard/LiveControls";

import MetricsChart from "../components/dashboard/MetricsChart";
import IncidentTimeline from "../components/dashboard/IncidentTimeline";

import { ServerCard } from "../components/dashboard/StatsCards";

export default function Dashboard() {
  // ---------------- STATE ----------------

  const [signals, setSignals] = useState<Signal[]>([]);
  const [stats, setStats] = useState<DashboardStats | null>(null);

  // Servers health (HealthGauge uchun)
  const [servers] = useState([
    {
      id: 1,
      name: "local-dev-agent",
      health_score: 82,
      last_seen_at: new Date().toISOString(),
    },
  ]);

  const [loading, setLoading] = useState(true);
  const [isLive, setIsLive] = useState(true);

  const [lastUpdated, setLastUpdated] = useState<number | null>(null);
  const [error, setError] = useState<string | null>(null);

  // ---------------- DATA FETCH ----------------

  const loadDashboardData = useCallback(async () => {
    try {
      const response: any = await fetchSignals();

      const signalsData = response?.results
        ? response.results
        : Array.isArray(response)
          ? response
          : [];

      setSignals(signalsData);

      try {
        const statsData = await fetchDashboardStats();
        setStats(statsData);
      } catch (statsErr) {
        console.warn("Stats yuklanmadi:", statsErr);
      }

      setLastUpdated(Date.now());
      setError(null);
    } catch (err) {
      console.error("Dashboard yuklash xatosi:", err);
      setError("Ma'lumotlarni yangilab bo'lmadi");
    } finally {
      setLoading(false);
    }
  }, []);

  // ---------------- POLLING ----------------

  useEffect(() => {
    loadDashboardData();

    let interval: number | undefined;

    if (isLive) {
      interval = window.setInterval(loadDashboardData, 5000);
    }

    return () => {
      if (interval) clearInterval(interval);
    };
  }, [isLive, loadDashboardData]);

  // ---------------- UI HANDLERS ----------------

  const handleToggleLive = () => setIsLive(!isLive);

  // ---------------- INITIAL LOADING ----------------

  if (loading && signals.length === 0) {
    return (
      <div className="min-h-screen bg-black flex flex-col items-center justify-center space-y-4">
        <div className="w-12 h-12 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>

        <p className="text-blue-500 font-mono animate-pulse">
          CONNECTING TO REALITY ENGINE...
        </p>
      </div>
    );
  }

  return (
    <DashboardLayout>
      <div className="min-h-screen bg-gradient-to-br from-gray-950 via-black to-gray-950 text-white p-4 md:p-8">
        {/* ANIMATED BACKGROUND EFFECTS */}
        <div className="fixed inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-0 left-0 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute bottom-0 right-0 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl animate-pulse delay-1000"></div>
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-cyan-500/5 rounded-full blur-3xl animate-pulse delay-2000"></div>
        </div>

        {/* HEADER */}

        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-start md:items-center gap-6 bg-gradient-to-r from-gray-900/50 to-gray-800/50 backdrop-blur-xl p-8 rounded-3xl border border-gray-700/50 shadow-2xl relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-r from-blue-500/5 to-purple-500/5"></div>
          <div className="relative z-10">
            <div className="flex items-center gap-3 mb-2">
              <div className="w-3 h-3 bg-emerald-500 rounded-full animate-pulse"></div>
              <h1 className="text-4xl font-black tracking-tighter bg-gradient-to-r from-blue-400 via-cyan-400 to-purple-400 bg-clip-text text-transparent animate-gradient">
                REALITY ENGINE
              </h1>
            </div>
            <p className="text-gray-400 text-sm font-mono mt-2 flex items-center gap-2">
              <span className="text-emerald-400">SYSTEM ONLINE</span>
              <span className="text-gray-600">|</span>
              {lastUpdated
                ? `LAST UPDATE: ${new Date(lastUpdated).toLocaleTimeString()}`
                : "INITIALIZING..."}
            </p>
          </div>

          <div className="relative z-10">
            <LiveControls
              isLive={isLive}
              lastUpdated={lastUpdated}
              onToggle={handleToggleLive}
            />
          </div>
        </div>

        <div className="max-w-7xl mx-auto space-y-8 relative z-10">
          {/* STATS */}

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {stats ? (
              <div className="transform hover:scale-105 transition-all duration-300">
                <StatsCards stats={stats} />
              </div>
            ) : (
              <div className="col-span-full h-32 border border-dashed border-gray-700/50 rounded-2xl flex items-center justify-center text-gray-500 bg-gradient-to-r from-gray-900/50 to-gray-800/50 backdrop-blur-sm">
                <div className="flex items-center gap-3">
                  <div className="w-2 h-2 bg-blue-500 rounded-full animate-pulse"></div>
                  Statistika yuklanmoqda...
                </div>
              </div>
            )}
          </div>

          {/* SERVERS HEALTH */}

          <div className="bg-gradient-to-r from-gray-900/50 to-gray-800/50 backdrop-blur-xl rounded-3xl p-8 border border-gray-700/50 shadow-2xl">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold text-white flex items-center gap-3">
                <div className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse"></div>
                Server Health
              </h2>
              <span className="text-xs text-gray-500 font-mono bg-gray-800/50 px-3 py-1 rounded-full">
                LIVE MONITORING
              </span>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {servers.map((s) => (
                <div
                  key={s.id}
                  className="transform hover:scale-105 transition-all duration-300"
                >
                  <ServerCard server={s} />
                </div>
              ))}
            </div>
          </div>

          {/* METRICS CHART */}

          <div className="bg-gradient-to-r from-gray-900/50 to-gray-800/50 backdrop-blur-xl rounded-3xl p-8 border border-gray-700/50 shadow-2xl">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold text-white flex items-center gap-3">
                <div className="w-2 h-2 bg-blue-500 rounded-full animate-pulse"></div>
                System Metrics
              </h2>
              <span className="text-xs text-gray-500 font-mono bg-gray-800/50 px-3 py-1 rounded-full">
                REAL-TIME ANALYTICS
              </span>
            </div>
            <MetricsChart agentId={1} />
          </div>

          {/* INCIDENT TIMELINE */}

          <div className="transform hover:scale-[1.02] transition-all duration-300">
            <IncidentTimeline agentId={1} />
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

              <div className="flex items-center gap-3">
                <div
                  className={`w-3 h-3 rounded-full ${
                    isLive
                      ? "bg-emerald-500 animate-pulse shadow-lg shadow-emerald-500/50"
                      : "bg-gray-600"
                  }`}
                ></div>

                <span className="text-xs font-mono text-gray-400 uppercase tracking-wider bg-gray-800/50 px-3 py-1 rounded-full border border-gray-700/50">
                  {isLive ? "LIVE FEED" : "PAUSED"}
                </span>
              </div>
            </div>

            {signals.length > 0 ? (
              <div className="p-6">
                <div className="overflow-x-auto">
                  <SignalsTable signals={signals} />
                </div>
              </div>
            ) : (
              <div className="py-24 text-center">
                <div className="flex flex-col items-center gap-4">
                  <div className="w-16 h-16 border-4 border-gray-700/50 border-t-orange-500 rounded-full animate-spin"></div>
                  <h3 className="text-gray-400 text-xl font-medium">
                    No Active Signals
                  </h3>
                  <p className="text-gray-600 text-sm">
                    System is operating normally
                  </p>
                </div>
              </div>
            )}
          </div>
        </div>

        {error && (
          <div className="fixed bottom-8 right-8 bg-red-500/10 border border-red-500/50 text-red-500 px-4 py-2 rounded-lg backdrop-blur-md text-sm animate-bounce">
            ⚠️ {error}
          </div>
        )}
      </div>
    </DashboardLayout>
  );
}
