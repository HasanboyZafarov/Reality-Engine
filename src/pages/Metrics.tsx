import { useState, useEffect } from "react";
import DashboardLayout from "../layout/DashboardLayout";
import {
  LineChart,
  Line,
  AreaChart,
  Area,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import {
  overallStats,
  errorReports,
  trafficData,
  serverComparison,
  timeRanges,
  aggregatedMetrics,
} from "../data/metricsData";

export default function Metrics() {
  const [selectedTimeRange, setSelectedTimeRange] = useState("24h");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setTimeout(() => setLoading(false), 500);
  }, []);

  if (loading) {
    return (
      <DashboardLayout>
        <div className="min-h-screen bg-gradient-to-br from-gray-950 via-black to-gray-950 flex items-center justify-center">
          <div className="text-center">
            <div className="w-16 h-16 border-4 border-blue-500/50 border-t-blue-500 rounded-full animate-spin mx-auto mb-4"></div>
            <p className="text-blue-400 font-mono animate-pulse">
              LOADING SYSTEM METRICS...
            </p>
          </div>
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

        <div className="max-w-7xl mx-auto px-4 md:px-8 py-8 relative z-10">
          {/* HEADER */}
          <div className="mb-8">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
              <div>
                <div className="flex items-center gap-4 mb-4">
                  <div className="w-3 h-3 bg-emerald-500 rounded-full animate-pulse"></div>
                  <h1 className="text-4xl font-black tracking-tighter bg-gradient-to-r from-blue-400 via-cyan-400 to-purple-400 bg-clip-text text-transparent">
                    System Metrics
                  </h1>
                </div>
                <p className="text-gray-400 text-sm font-mono flex items-center gap-2">
                  <span className="text-emerald-400">SYSTEM HEARTBEAT</span>
                  <span className="text-gray-600">|</span>
                  <span className="text-blue-400">{overallStats.totalServers} SERVERS MONITORED</span>
                </p>
              </div>

              <div className="flex items-center gap-3">
                <label className="text-gray-400 text-sm font-mono">Time Range:</label>
                <select
                  value={selectedTimeRange}
                  onChange={(e) => setSelectedTimeRange(e.target.value)}
                  className="bg-gray-800/50 border border-gray-700/50 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-blue-500/50"
                >
                  {timeRanges.map((range) => (
                    <option key={range.value} value={range.value}>
                      {range.label}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </div>

          {/* OVERALL STATISTICS */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            <div className="bg-gradient-to-r from-gray-900/50 to-gray-800/50 backdrop-blur-xl rounded-2xl p-6 border border-gray-700/50 shadow-xl hover-scale">
              <div className="flex items-center justify-between mb-4">
                <div className="w-3 h-3 bg-blue-500 rounded-full animate-pulse"></div>
                <span className="text-xs text-gray-500 font-mono">CPU</span>
              </div>
              <div className="text-3xl font-bold text-white mb-2">{overallStats.avgCpu}%</div>
              <div className="text-sm text-gray-400">Average Usage</div>
            </div>

            <div className="bg-gradient-to-r from-gray-900/50 to-gray-800/50 backdrop-blur-xl rounded-2xl p-6 border border-gray-700/50 shadow-xl hover-scale">
              <div className="flex items-center justify-between mb-4">
                <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
                <span className="text-xs text-gray-500 font-mono">RAM</span>
              </div>
              <div className="text-3xl font-bold text-white mb-2">{overallStats.avgRam}%</div>
              <div className="text-sm text-gray-400">Average Usage</div>
            </div>

            <div className="bg-gradient-to-r from-gray-900/50 to-gray-800/50 backdrop-blur-xl rounded-2xl p-6 border border-gray-700/50 shadow-xl hover-scale">
              <div className="flex items-center justify-between mb-4">
                <div className="w-3 h-3 bg-yellow-500 rounded-full animate-pulse"></div>
                <span className="text-xs text-gray-500 font-mono">DISK</span>
              </div>
              <div className="text-3xl font-bold text-white mb-2">{overallStats.avgDisk}%</div>
              <div className="text-sm text-gray-400">Average Usage</div>
            </div>

            <div className="bg-gradient-to-r from-gray-900/50 to-gray-800/50 backdrop-blur-xl rounded-2xl p-6 border border-gray-700/50 shadow-xl hover-scale">
              <div className="flex items-center justify-between mb-4">
                <div className="w-3 h-3 bg-purple-500 rounded-full animate-pulse"></div>
                <span className="text-xs text-gray-500 font-mono">REQUESTS</span>
              </div>
              <div className="text-3xl font-bold text-white mb-2">{overallStats.totalRequests.toLocaleString()}</div>
              <div className="text-sm text-gray-400">Total Today</div>
            </div>
          </div>

          {/* AGGREGATED METRICS CHART */}
          <div className="bg-gradient-to-r from-gray-900/50 to-gray-800/50 backdrop-blur-xl rounded-3xl p-8 border border-gray-700/50 shadow-2xl mb-8">
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-3">
                <div className="w-3 h-3 bg-blue-500 rounded-full animate-pulse"></div>
                <h2 className="text-2xl font-bold text-white">Overall System Performance</h2>
              </div>
              <span className="text-xs text-gray-500 font-mono bg-gray-800/50 px-3 py-1 rounded-full">
                AGGREGATED VIEW
              </span>
            </div>

            <ResponsiveContainer width="100%" height={350}>
              <AreaChart data={aggregatedMetrics}>
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" />
                <XAxis dataKey="time" stroke="#9ca3af" tick={{ fill: '#9ca3af', fontSize: 12 }} />
                <YAxis stroke="#9ca3af" tick={{ fill: '#9ca3af', fontSize: 12 }} />
                <Tooltip
                  contentStyle={{
                    backgroundColor: 'rgba(0, 0, 0, 0.8)',
                    border: '1px solid rgba(59, 130, 246, 0.3)',
                    borderRadius: '8px',
                    backdropFilter: 'blur(8px)'
                  }}
                  labelStyle={{ color: '#fff' }}
                />
                <Legend wrapperStyle={{ color: '#fff' }} />
                <Area
                  type="monotone"
                  dataKey="cpu"
                  stackId="1"
                  stroke="#3b82f6"
                  fill="#3b82f6"
                  fillOpacity={0.6}
                  animationDuration={1500}
                />
                <Area
                  type="monotone"
                  dataKey="ram"
                  stackId="1"
                  stroke="#10b981"
                  fill="#10b981"
                  fillOpacity={0.6}
                  animationDuration={1500}
                  animationBegin={300}
                />
                <Area
                  type="monotone"
                  dataKey="disk"
                  stackId="1"
                  stroke="#f59e0b"
                  fill="#f59e0b"
                  fillOpacity={0.6}
                  animationDuration={1500}
                  animationBegin={600}
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
            {/* ERROR REPORT */}
            <div className="bg-gradient-to-r from-gray-900/50 to-gray-800/50 backdrop-blur-xl rounded-3xl p-8 border border-gray-700/50 shadow-2xl">
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-3">
                  <div className="w-3 h-3 bg-red-500 rounded-full animate-pulse"></div>
                  <h2 className="text-2xl font-bold text-white">Error Report</h2>
                </div>
                <span className="text-xs text-gray-500 font-mono bg-gray-800/50 px-3 py-1 rounded-full">
                  {selectedTimeRange.toUpperCase()}
                </span>
              </div>

              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={errorReports}>
                  <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" />
                  <XAxis dataKey="serverName" stroke="#9ca3af" tick={{ fill: '#9ca3af', fontSize: 12 }} />
                  <YAxis stroke="#9ca3af" tick={{ fill: '#9ca3af', fontSize: 12 }} />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: 'rgba(0, 0, 0, 0.8)',
                      border: '1px solid rgba(59, 130, 246, 0.3)',
                      borderRadius: '8px',
                      backdropFilter: 'blur(8px)'
                    }}
                    labelStyle={{ color: '#fff' }}
                  />
                  <Legend wrapperStyle={{ color: '#fff' }} />
                  <Bar dataKey="warning" stackId="a" fill="#f59e0b" animationDuration={1500} />
                  <Bar dataKey="critical" stackId="a" fill="#ef4444" animationDuration={1500} animationBegin={300} />
                </BarChart>
              </ResponsiveContainer>
            </div>

            {/* TRAFFIC METRICS */}
            <div className="bg-gradient-to-r from-gray-900/50 to-gray-800/50 backdrop-blur-xl rounded-3xl p-8 border border-gray-700/50 shadow-2xl">
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-3">
                  <div className="w-3 h-3 bg-purple-500 rounded-full animate-pulse"></div>
                  <h2 className="text-2xl font-bold text-white">Traffic Metrics</h2>
                </div>
                <span className="text-xs text-gray-500 font-mono bg-gray-800/50 px-3 py-1 rounded-full">
                  NETWORK ANALYTICS
                </span>
              </div>

              <ResponsiveContainer width="100%" height={300}>
                <LineChart data={trafficData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" />
                  <XAxis dataKey="timestamp" stroke="#9ca3af" tick={{ fill: '#9ca3af', fontSize: 12 }} />
                  <YAxis stroke="#9ca3af" tick={{ fill: '#9ca3af', fontSize: 12 }} />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: 'rgba(0, 0, 0, 0.8)',
                      border: '1px solid rgba(59, 130, 246, 0.3)',
                      borderRadius: '8px',
                      backdropFilter: 'blur(8px)'
                    }}
                    labelStyle={{ color: '#fff' }}
                  />
                  <Legend wrapperStyle={{ color: '#fff' }} />
                  <Line
                    type="monotone"
                    dataKey="requests"
                    stroke="#8b5cf6"
                    strokeWidth={3}
                    dot={{ fill: '#8b5cf6', r: 4 }}
                    activeDot={{ r: 6 }}
                    isAnimationActive={true}
                    animationDuration={1500}
                  />
                  <Line
                    type="monotone"
                    dataKey="throughput"
                    stroke="#06b6d4"
                    strokeWidth={3}
                    dot={{ fill: '#06b6d4', r: 4 }}
                    activeDot={{ r: 6 }}
                    isAnimationActive={true}
                    animationDuration={1500}
                    animationBegin={300}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* SERVER COMPARISON */}
          <div className="bg-gradient-to-r from-gray-900/50 to-gray-800/50 backdrop-blur-xl rounded-3xl p-8 border border-gray-700/50 shadow-2xl">
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-3">
                <div className="w-3 h-3 bg-cyan-500 rounded-full animate-pulse"></div>
                <h2 className="text-2xl font-bold text-white">Server Resource Comparison</h2>
              </div>
              <span className="text-xs text-gray-500 font-mono bg-gray-800/50 px-3 py-1 rounded-full">
                PERFORMANCE ANALYSIS
              </span>
            </div>

            <ResponsiveContainer width="100%" height={350}>
              <BarChart data={serverComparison}>
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" />
                <XAxis dataKey="serverName" stroke="#9ca3af" tick={{ fill: '#9ca3af', fontSize: 12 }} />
                <YAxis stroke="#9ca3af" tick={{ fill: '#9ca3af', fontSize: 12 }} />
                <Tooltip
                  contentStyle={{
                    backgroundColor: 'rgba(0, 0, 0, 0.8)',
                    border: '1px solid rgba(59, 130, 246, 0.3)',
                    borderRadius: '8px',
                    backdropFilter: 'blur(8px)'
                  }}
                  labelStyle={{ color: '#fff' }}
                />
                <Legend wrapperStyle={{ color: '#fff' }} />
                <Bar dataKey="cpu" fill="#3b82f6" animationDuration={1500} />
                <Bar dataKey="ram" fill="#10b981" animationDuration={1500} animationBegin={300} />
                <Bar dataKey="disk" fill="#f59e0b" animationDuration={1500} animationBegin={600} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}
