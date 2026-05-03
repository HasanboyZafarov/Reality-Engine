import { SeverityBadge } from "./SeverityBadge";

export function SignalsTable({ signals }: { signals: any[] }) {
  if (!signals || signals.length === 0)
    return <div className="p-4 text-white">Signallar yo'q...</div>;

  return (
    <div className="bg-[#0a0a0a] border border-gray-800 rounded-xl overflow-hidden">
      <table className="w-full text-sm text-left font-mono">
        <thead className="bg-[#0d0d0d] text-blue-400 uppercase text-[10px]">
          <tr>
            <th className="p-4">Signal</th>
            <th className="p-4">Response</th>
            <th className="p-4">Error</th>
            <th className="p-4">Severity</th>
          </tr>
        </thead>

        <tbody className="divide-y divide-gray-900 text-gray-300">
          {signals.map((s: any) => (
            <tr key={s.id} className="hover:bg-white/5">
              <td className="p-4 font-bold">
                ID: {s.id}
              </td>

              <td className="p-4 text-cyan-400">
                {s.response_time_ms ?? "-"} ms
              </td>

              <td className="p-4 text-rose-500">
                {s.error_rate_percent ?? 0}%
              </td>

              <td className="p-4">
                <SeverityBadge level={s.severity} />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}