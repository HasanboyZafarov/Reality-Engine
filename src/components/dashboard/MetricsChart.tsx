import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  Legend,
  ResponsiveContainer,
} from "recharts";

import { useEffect, useState } from "react";
import { mockMetrics } from "../../data/mockData";

type Metric = {
  metric: "cpu" | "ram" | "disk";
  value: number;
  created_at: string;
};

type ChartRow = {
  time: string;
  cpu?: number;
  ram?: number;
  disk?: number;
};

export default function MetricsChart({ agentId }: { agentId: number }) {
  const [data, setData] = useState<ChartRow[]>([]);
  const [loading, setLoading] = useState(true);

  // ==========================================================
  // INITIAL LOAD
  // ==========================================================

  useEffect(() => {
    // Simulate loading delay and use mock data
    setTimeout(() => {
      setData(mockMetrics);
      setLoading(false);
    }, 500);
  }, []);

  // ==========================================================
  // LOADING
  // ==========================================================

  if (loading) {
    return (
      <div className="h-[350px] flex items-center justify-center text-gray-500">
        Loading metrics...
      </div>
    );
  }

  if (!data.length) {
    return (
      <div className="h-[350px] flex items-center justify-center text-gray-500">
        No metrics data yet
      </div>
    );
  }

  // ==========================================================
  // CHART
  // ==========================================================

  return (
    <div className="bg-gradient-to-br from-gray-900/50 to-gray-800/50 backdrop-blur-xl border border-gray-700/50 rounded-2xl p-6 shadow-2xl hover-scale">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-bold text-white flex items-center gap-3">
          <div className="w-2 h-2 bg-blue-500 rounded-full animate-pulse"></div>
          Performance Metrics
        </h2>
        <div className="flex items-center gap-2">
          <div className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse"></div>
          <span className="text-xs text-gray-500 font-mono">LIVE</span>
        </div>
      </div>

      <ResponsiveContainer width="100%" height={350}>
        <LineChart data={data}>
          <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" />

          <XAxis
            dataKey="time"
            stroke="#9ca3af"
            tick={{ fill: "#9ca3af", fontSize: 12 }}
          />

          <YAxis
            domain={[0, 100]}
            stroke="#9ca3af"
            tick={{ fill: "#9ca3af", fontSize: 12 }}
          />

          <Tooltip
            contentStyle={{
              backgroundColor: "rgba(0, 0, 0, 0.8)",
              border: "1px solid rgba(59, 130, 246, 0.3)",
              borderRadius: "8px",
              backdropFilter: "blur(8px)",
            }}
            labelStyle={{ color: "#fff" }}
          />

          <Legend wrapperStyle={{ color: "#fff" }} iconType="line" />

          <Line
            type="monotone"
            dataKey="cpu"
            stroke="#00e5ff"
            strokeWidth={3}
            dot={{ fill: "#00e5ff", r: 4 }}
            activeDot={{ r: 6 }}
            isAnimationActive={true}
            animationDuration={1500}
          />

          <Line
            type="monotone"
            dataKey="ram"
            stroke="#ff006e"
            strokeWidth={3}
            dot={{ fill: "#ff006e", r: 4 }}
            activeDot={{ r: 6 }}
            isAnimationActive={true}
            animationDuration={1500}
            animationBegin={300}
          />

          <Line
            type="monotone"
            dataKey="disk"
            stroke="#ffaa00"
            strokeWidth={3}
            dot={{ fill: "#ffaa00", r: 4 }}
            activeDot={{ r: 6 }}
            isAnimationActive={true}
            animationDuration={1500}
            animationBegin={600}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}
