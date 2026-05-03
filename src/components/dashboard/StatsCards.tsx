import { Activity, AlertTriangle, ShieldCheck } from "lucide-react"
import type { DashboardStats } from "../../types/stats"
import HealthGauge from "./HealthGauge"

interface Props {
  stats?: DashboardStats
}

export function StatsCards({ stats }: Props) {

  const uptimeValue = stats?.uptime
    ? `${Number(stats.uptime).toFixed(2)}%`
    : "0.00%"

  const cards = [
    {
      title: "Total Signals",
      value: stats?.total_signals ?? 0,
      icon: Activity,
      color: "text-blue-400"
    },
    {
      title: "Critical",
      value: stats?.critical ?? 0,
      icon: AlertTriangle,
      color: "text-red-400"
    },
    {
      title: "Warning",
      value: stats?.warning ?? 0,
      icon: AlertTriangle,
      color: "text-yellow-400"
    },
    {
      title: "Uptime %",
      value: uptimeValue,
      icon: ShieldCheck,
      color: "text-emerald-400"
    }
  ]

  return (

    <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">

      {cards.map((card) => {

        const Icon = card.icon

        return (

          <div
            key={card.title}
            className="bg-[#0a0a0a] border border-gray-800 rounded-2xl p-6 shadow-xl hover:border-blue-500/40 transition"
          >

            <div className="flex items-center justify-between">

              <p className="text-xs text-gray-500 uppercase tracking-widest font-mono">
                {card.title}
              </p>

              <Icon className={card.color} size={20} />

            </div>

            <div className="mt-4 text-3xl font-bold text-white font-mono">
              {card.value}
            </div>

          </div>

        )

      })}

    </div>

  )

}


/* ===============================
   ServerCard component
================================ */

interface Server {
  id: number
  name: string
  health_score?: number
  last_seen_at?: string | null
}

interface ServerCardProps {
  server: Server
}

export function ServerCard({ server }: ServerCardProps) {

  const score = server.health_score ?? 0

  const lastSeen = server.last_seen_at
    ? new Date(server.last_seen_at).toLocaleString()
    : "Never"

  return (

    <div className="bg-zinc-900 rounded-xl p-6 shadow-lg">

      <h3 className="text-lg font-semibold text-white">
        {server.name}
      </h3>

      <div className="mt-4 flex justify-center">
        <HealthGauge score={score} />
      </div>

      <div className="text-sm text-gray-400 mt-3 text-center">
        Last seen: {lastSeen}
      </div>

    </div>

  )

}