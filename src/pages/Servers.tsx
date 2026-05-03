import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import DashboardLayout from "../layout/DashboardLayout";
import { mockServers } from "../data/mockData";

type Server = {
  id: number;
  name: string;
  company: string;
  status: "healthy" | "warning" | "critical";
  last_seen_at: string | null;
};

export default function Servers() {
  const [servers, setServers] = useState<Server[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    // Simulate loading delay
    setTimeout(() => {
      setServers(mockServers);
      setLoading(false);
    }, 500);
  }, []);

  const statusColor = (status: Server["status"]) => {
    if (status === "healthy") return "text-emerald-400";
    if (status === "warning") return "text-yellow-400";

    return "text-red-400";
  };

  const formatTime = (value: string | null) => {
    if (!value) return "never";

    return new Date(value).toLocaleString();
  };

  if (loading) {
    return (
      <DashboardLayout>
        <div className="min-h-screen bg-gradient-to-br from-gray-950 via-black to-gray-950 flex items-center justify-center">
          <div className="text-center">
            <div className="w-16 h-16 border-4 border-blue-500/50 border-t-blue-500 rounded-full animate-spin mx-auto mb-4"></div>
            <p className="text-blue-400 font-mono animate-pulse">
              LOADING SERVERS...
            </p>
          </div>
        </div>
      </DashboardLayout>
    );
  }

  if (error) {
    return (
      <DashboardLayout>
        <div className="flex items-center justify-center h-[60vh] text-red-500">
          {error}
        </div>
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout>
      <div className="min-h-screen bg-gradient-to-br from-gray-950 via-black to-gray-950">
        {/* ANIMATED BACKGROUND EFFECTS */}
        <div className="fixed inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-0 left-0 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute bottom-0 right-0 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl animate-pulse delay-1000"></div>
        </div>

        <div className="max-w-7xl mx-auto px-4 md:px-8 py-8 text-white relative z-10">
          {/* HEADER */}

          <div className="mb-8">
            <div className="flex items-center gap-4 mb-4">
              <div className="w-3 h-3 bg-emerald-500 rounded-full animate-pulse"></div>
              <h1 className="text-4xl font-black tracking-tighter bg-gradient-to-r from-blue-400 via-cyan-400 to-purple-400 bg-clip-text text-transparent">
                Infrastructure Servers
              </h1>
            </div>
            <p className="text-gray-400 text-sm font-mono flex items-center gap-2">
              <span className="text-emerald-400">
                {servers.length} SERVERS ONLINE
              </span>
              <span className="text-gray-600">|</span>
              <span className="text-blue-400">MONITORING ACTIVE</span>
            </p>
          </div>

          {/* SERVERS GRID */}

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {servers.map((server) => (
              <Link
                key={server.id}
                to={`/servers/${server.id}`}
                className="block transform hover:scale-105 transition-all duration-300"
              >
                <div className="bg-gradient-to-r from-gray-900/50 to-gray-800/50 backdrop-blur-xl border border-gray-700/50 rounded-2xl p-6 hover:border-blue-500/50 transition-all duration-300 shadow-xl hover:shadow-2xl relative overflow-hidden group">
                  <div className="absolute inset-0 bg-gradient-to-r from-blue-500/5 to-purple-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>

                  <div className="relative z-10">
                    <div className="flex justify-between items-start mb-4">
                      <div>
                        <h3 className="text-xl font-bold text-white mb-1">
                          {server.name}
                        </h3>
                        <p className="text-sm text-gray-400 font-mono">
                          {server.company}
                        </p>
                      </div>

                      <div className="flex items-center gap-2">
                        <div
                          className={`w-2 h-2 rounded-full ${
                            server.status === "healthy"
                              ? "bg-emerald-500 animate-pulse"
                              : server.status === "warning"
                                ? "bg-yellow-500 animate-pulse"
                                : "bg-red-500 animate-pulse"
                          }`}
                        ></div>
                        <span
                          className={`text-sm font-bold ${statusColor(server.status)}`}
                        >
                          {server.status === "healthy" && "HEALTHY"}
                          {server.status === "warning" && "WARNING"}
                          {server.status === "critical" && "CRITICAL"}
                        </span>
                      </div>
                    </div>

                    <div className="flex items-center justify-between">
                      <div className="text-xs text-gray-500 font-mono">
                        <span className="text-gray-600">LAST SEEN:</span>
                        <span className="text-gray-400 ml-1">
                          {formatTime(server.last_seen_at)}
                        </span>
                      </div>

                      <div className="text-blue-400 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                        <svg
                          className="w-4 h-4"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M9 5l7 7-7 7"
                          />
                        </svg>
                      </div>
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}
