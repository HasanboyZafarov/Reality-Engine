import { useState } from "react"
import { Link, useLocation } from "react-router-dom"
import {
  Menu,
  X,
  LayoutDashboard,
  Server,
  AlertTriangle,
  Settings,
  Activity,
} from "lucide-react"

type Props = {
  children: React.ReactNode
}

const navItems = [
  { name: "Dashboard", icon: LayoutDashboard, path: "/dashboard" },
  { name: "Servers", icon: Server, path: "/servers" },
  { name: "Signals", icon: AlertTriangle, path: "/signals" },
  { name: "Metrics", icon: Activity, path: "/metrics" },
  { name: "Settings", icon: Settings, path: "/settings" },
]

export default function DashboardLayout({ children }: Props) {
  const [open, setOpen] = useState(false)
  const location = useLocation()

  return (
    <div className="flex h-screen bg-[#0b0f14] text-gray-200">

      {/* MOBILE OVERLAY */}
      {open && (
        <div
          className="fixed inset-0 bg-black/60 z-40 lg:hidden"
          onClick={() => setOpen(false)}
        />
      )}

      {/* SIDEBAR */}
      <aside
        className={`
        fixed z-50 lg:static
        top-0 left-0 h-full w-64
        bg-[#0f141b] border-r border-gray-800
        transform transition-transform duration-300
        ${open ? "translate-x-0" : "-translate-x-full"}
        lg:translate-x-0
      `}
      >
        {/* LOGO */}
        <div className="h-16 flex items-center px-6 border-b border-gray-800">
          <span className="font-bold text-lg tracking-wide text-blue-400">
            Reality Engine
          </span>
        </div>

        {/* NAV */}
        <nav className="p-4 space-y-2">
          {navItems.map((item) => {
            const Icon = item.icon
            const active = location.pathname.startsWith(item.path)

            return (
              <Link
                key={item.name}
                to={item.path}
                className={`
                flex items-center gap-3 px-4 py-3 rounded-lg
                transition-all duration-200
                ${
                  active
                    ? "bg-blue-600 text-white"
                    : "hover:bg-gray-800 text-gray-300"
                }
              `}
              >
                <Icon size={18} />
                {item.name}
              </Link>
            )
          })}
        </nav>
      </aside>

      {/* MAIN AREA */}
      <div className="flex flex-col flex-1 overflow-hidden">

        {/* HEADER */}
        <header className="h-16 border-b border-gray-800 flex items-center justify-between px-6 bg-[#0b0f14]">

          {/* MOBILE MENU */}
          <button
            onClick={() => setOpen(!open)}
            className="lg:hidden text-gray-300"
          >
            {open ? <X size={22} /> : <Menu size={22} />}
          </button>

          {/* PAGE TITLE */}
          <h1 className="font-semibold text-lg text-gray-100">
            Monitoring Dashboard
          </h1>

          {/* STATUS */}
          <div className="flex items-center gap-2 text-green-400 text-sm">
            <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
            Live
          </div>
        </header>

        {/* CONTENT */}
        <main className="flex-1 overflow-y-auto p-6">
          {children}
        </main>

      </div>
    </div>
  )
}