import DashboardLayout from "../layout/DashboardLayout"

export default function DashboardPage() {
  return (
    <DashboardLayout>

      <h2 className="text-2xl font-bold mb-6">
        System Overview
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">

        <div className="bg-gray-900 p-5 rounded-xl border border-gray-800">
          Servers
        </div>

        <div className="bg-gray-900 p-5 rounded-xl border border-gray-800">
          Alerts
        </div>

        <div className="bg-gray-900 p-5 rounded-xl border border-gray-800">
          CPU
        </div>

        <div className="bg-gray-900 p-5 rounded-xl border border-gray-800">
          RAM
        </div>

      </div>

    </DashboardLayout>
  )
}