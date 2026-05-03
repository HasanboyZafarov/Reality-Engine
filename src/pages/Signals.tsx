import React, { useState, useEffect } from "react";
import {
  AlertCircle,
  AlertTriangle,
  Info,
  Search,
  Eye,
  Check,
  Trash2,
  Activity,
  Server,
} from "lucide-react";
import type { Signal, SignalType, SignalStatus } from "../types/signal";
import { mockSignals } from "../data/mockData";

const Signals: React.FC = () => {
  const [signals, setSignals] = useState<Signal[]>(mockSignals);
  const [filteredSignals, setFilteredSignals] = useState<Signal[]>(mockSignals);
  const [selectedFilter, setSelectedFilter] = useState<
    "All" | "Critical" | "Warning" | "Info"
  >("All");
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedSignal, setSelectedSignal] = useState<Signal | null>(null);
  const [showModal, setShowModal] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [isLive, setIsLive] = useState(true);

  const signalsPerPage = 10;

  // Calculate statistics
  const stats = {
    total: signals.length,
    critical: signals.filter((s: Signal) => s.type === "Critical").length,
    warning: signals.filter((s: Signal) => s.type === "Warning").length,
    info: signals.filter((s: Signal) => s.type === "Info").length,
  };

  // Filter signals
  useEffect(() => {
    let filtered = signals;

    if (selectedFilter !== "All") {
      filtered = filtered.filter((signal) => signal.type === selectedFilter);
    }

    if (searchQuery) {
      filtered = filtered.filter(
        (signal: Signal) =>
          signal.message.toLowerCase().includes(searchQuery.toLowerCase()) ||
          signal.server.toLowerCase().includes(searchQuery.toLowerCase()) ||
          signal.id.toLowerCase().includes(searchQuery.toLowerCase()),
      );
    }

    setFilteredSignals(filtered);
    setCurrentPage(1);
  }, [signals, selectedFilter, searchQuery]);

  // Simulate real-time updates
  useEffect(() => {
    if (!isLive) return;

    const interval = setInterval(() => {
      const newSignal: Signal = {
        id: `SIG-${Date.now()}`,
        timestamp: new Date().toISOString(),
        server: `server-${Math.floor(Math.random() * 5) + 1}`,
        type: ["Critical", "Warning", "Info"][
          Math.floor(Math.random() * 3)
        ] as SignalType,
        message: `New system alert ${Math.floor(Math.random() * 1000)}`,
        status: "Critical",
        details: "Real-time generated signal",
      };

      setSignals((prev: Signal[]) => [newSignal, ...prev].slice(0, 50));
    }, 10000);

    return () => clearInterval(interval);
  }, [isLive]);

  const handleResolve = (signalId: string) => {
    setSignals((prev: Signal[]) =>
      prev.map((signal: Signal) =>
        signal.id === signalId
          ? { ...signal, status: "Resolved" as SignalStatus }
          : signal,
      ),
    );
  };

  const handleDelete = (signalId: string) => {
    setSignals((prev: Signal[]) =>
      prev.filter((signal: Signal) => signal.id !== signalId),
    );
  };

  const handleView = (signal: Signal) => {
    setSelectedSignal(signal);
    setShowModal(true);
  };

  const getStatusColor = (status: SignalStatus) => {
    switch (status) {
      case "Critical":
        return "bg-red-500 text-white";
      case "Warning":
        return "bg-yellow-500 text-black";
      case "Info":
        return "bg-blue-500 text-white";
      case "Resolved":
        return "bg-green-500 text-white";
      default:
        return "bg-gray-500 text-white";
    }
  };

  const getTypeIcon = (type: SignalType) => {
    switch (type) {
      case "Critical":
        return <AlertCircle className="w-4 h-4" />;
      case "Warning":
        return <AlertTriangle className="w-4 h-4" />;
      case "Info":
        return <Info className="w-4 h-4" />;
      default:
        return <Info className="w-4 h-4" />;
    }
  };

  const formatTime = (timestamp: string) => {
    return new Date(timestamp).toLocaleTimeString();
  };

  // Pagination
  const indexOfLastSignal = currentPage * signalsPerPage;
  const indexOfFirstSignal = indexOfLastSignal - signalsPerPage;
  const currentSignals = filteredSignals.slice(
    indexOfFirstSignal,
    indexOfLastSignal,
  );
  const totalPages = Math.ceil(filteredSignals.length / signalsPerPage);

  return (
    <div className="min-h-screen bg-[#0b0f19] text-white p-6">
      {/* Header */}
      <div className="mb-8">
        <div className="flex justify-between items-center mb-6">
          <div>
            <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent">
              Signals Monitoring
            </h1>
            <p className="text-gray-400 mt-2">
              Real-time system alerts and events
            </p>
          </div>
          <div className="flex items-center gap-2">
            <div className="flex items-center gap-2">
              <div
                className={`w-3 h-3 rounded-full ${isLive ? "bg-green-500 animate-pulse" : "bg-gray-500"}`}
              ></div>
              <span className="text-sm text-gray-400">
                {isLive ? "Live" : "Paused"}
              </span>
            </div>
            <button
              onClick={() => setIsLive(!isLive)}
              className="px-3 py-1 bg-gray-800 rounded-lg hover:bg-gray-700 transition-colors text-sm"
            >
              {isLive ? "Pause" : "Resume"}
            </button>
          </div>
        </div>

        {/* Filter and Search */}
        <div className="flex flex-col sm:flex-row gap-4 justify-between items-center">
          <div className="flex gap-2">
            {(["All", "Critical", "Warning", "Info"] as const).map((filter) => (
              <button
                key={filter}
                onClick={() =>
                  setSelectedFilter(
                    filter as "All" | "Critical" | "Warning" | "Info",
                  )
                }
                className={`px-4 py-2 rounded-lg transition-all ${
                  selectedFilter === filter
                    ? "bg-blue-600 text-white shadow-lg shadow-blue-600/30"
                    : "bg-gray-800 text-gray-400 hover:bg-gray-700"
                }`}
              >
                {filter}
              </button>
            ))}
          </div>
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
            <input
              type="text"
              placeholder="Search signals..."
              value={searchQuery}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                setSearchQuery(e.target.value)
              }
              className="pl-10 pr-4 py-2 bg-gray-800 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 w-64"
            />
          </div>
        </div>
      </div>

      {/* Statistics Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <div className="bg-gradient-to-br from-gray-800/50 to-gray-900/50 backdrop-blur-lg rounded-xl p-6 border border-gray-700/50 hover:border-blue-500/50 transition-all">
          <div className="flex items-center justify-between mb-4">
            <Activity className="w-8 h-8 text-blue-400" />
            <div className="w-2 h-2 bg-blue-400 rounded-full animate-pulse"></div>
          </div>
          <div className="text-3xl font-bold text-white mb-2">
            {stats.total}
          </div>
          <div className="text-gray-400 text-sm">Total Signals</div>
        </div>

        <div className="bg-gradient-to-br from-red-900/20 to-red-800/20 backdrop-blur-lg rounded-xl p-6 border border-red-700/50 hover:border-red-500/50 transition-all">
          <div className="flex items-center justify-between mb-4">
            <AlertCircle className="w-8 h-8 text-red-400" />
            <div className="w-2 h-2 bg-red-400 rounded-full animate-pulse"></div>
          </div>
          <div className="text-3xl font-bold text-red-400 mb-2">
            {stats.critical}
          </div>
          <div className="text-gray-400 text-sm">Critical Alerts</div>
        </div>

        <div className="bg-gradient-to-br from-yellow-900/20 to-yellow-800/20 backdrop-blur-lg rounded-xl p-6 border border-yellow-700/50 hover:border-yellow-500/50 transition-all">
          <div className="flex items-center justify-between mb-4">
            <AlertTriangle className="w-8 h-8 text-yellow-400" />
            <div className="w-2 h-2 bg-yellow-400 rounded-full animate-pulse"></div>
          </div>
          <div className="text-3xl font-bold text-yellow-400 mb-2">
            {stats.warning}
          </div>
          <div className="text-gray-400 text-sm">Warning Alerts</div>
        </div>

        <div className="bg-gradient-to-br from-blue-900/20 to-blue-800/20 backdrop-blur-lg rounded-xl p-6 border border-blue-700/50 hover:border-blue-500/50 transition-all">
          <div className="flex items-center justify-between mb-4">
            <Info className="w-8 h-8 text-blue-400" />
            <div className="w-2 h-2 bg-blue-400 rounded-full animate-pulse"></div>
          </div>
          <div className="text-3xl font-bold text-blue-400 mb-2">
            {stats.info}
          </div>
          <div className="text-gray-400 text-sm">Info Logs</div>
        </div>
      </div>

      {/* Signals Table */}
      <div className="bg-gradient-to-br from-gray-800/30 to-gray-900/30 backdrop-blur-lg rounded-xl border border-gray-700/50 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-gray-700/50">
                <th className="px-6 py-4 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                  Time
                </th>
                <th className="px-6 py-4 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                  Signal ID
                </th>
                <th className="px-6 py-4 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                  Server
                </th>
                <th className="px-6 py-4 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                  Type
                </th>
                <th className="px-6 py-4 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                  Message
                </th>
                <th className="px-6 py-4 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                  Status
                </th>
                <th className="px-6 py-4 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-700/50">
              {currentSignals.map((signal) => (
                <tr
                  key={signal.id}
                  className="hover:bg-gray-800/30 transition-colors"
                >
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300">
                    {formatTime(signal.timestamp)}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-mono text-blue-400">
                    {signal.id}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300">
                    <div className="flex items-center gap-2">
                      <Server className="w-4 h-4 text-gray-400" />
                      {signal.server}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center gap-2">
                      {getTypeIcon(signal.type)}
                      <span className="text-sm text-gray-300">
                        {signal.type}
                      </span>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-300 max-w-xs truncate">
                    {signal.message}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span
                      className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(signal.status)}`}
                    >
                      {signal.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm">
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => handleView(signal)}
                        className="p-1 hover:bg-gray-700 rounded transition-colors"
                        title="View"
                      >
                        <Eye className="w-4 h-4 text-gray-400" />
                      </button>
                      {signal.status !== "Resolved" && (
                        <button
                          onClick={() => handleResolve(signal.id)}
                          className="p-1 hover:bg-gray-700 rounded transition-colors"
                          title="Resolve"
                        >
                          <Check className="w-4 h-4 text-green-400" />
                        </button>
                      )}
                      <button
                        onClick={() => handleDelete(signal.id)}
                        className="p-1 hover:bg-gray-700 rounded transition-colors"
                        title="Delete"
                      >
                        <Trash2 className="w-4 h-4 text-red-400" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="px-6 py-4 border-t border-gray-700/50 flex items-center justify-between">
            <div className="text-sm text-gray-400">
              Showing {indexOfFirstSignal + 1} to{" "}
              {Math.min(indexOfLastSignal, filteredSignals.length)} of{" "}
              {filteredSignals.length} signals
            </div>
            <div className="flex gap-2">
              <button
                onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
                disabled={currentPage === 1}
                className="px-3 py-1 bg-gray-800 rounded hover:bg-gray-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
              >
                Previous
              </button>
              <span className="px-3 py-1 text-gray-400">
                {currentPage} / {totalPages}
              </span>
              <button
                onClick={() =>
                  setCurrentPage((prev) => Math.min(prev + 1, totalPages))
                }
                disabled={currentPage === totalPages}
                className="px-3 py-1 bg-gray-800 rounded hover:bg-gray-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
              >
                Next
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Signal Details Modal */}
      {showModal && selectedSignal && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4 z-50">
          <div className="bg-gradient-to-br from-gray-800 to-gray-900 rounded-xl border border-gray-700 max-w-2xl w-full max-h-[80vh] overflow-y-auto">
            <div className="p-6">
              <div className="flex justify-between items-start mb-6">
                <h2 className="text-2xl font-bold text-white">
                  Signal Details
                </h2>
                <button
                  onClick={() => setShowModal(false)}
                  className="text-gray-400 hover:text-white transition-colors"
                >
                  ×
                </button>
              </div>

              <div className="space-y-4">
                <div>
                  <label className="text-sm text-gray-400 block mb-1">
                    Signal ID
                  </label>
                  <div className="text-white font-mono">
                    {selectedSignal.id}
                  </div>
                </div>

                <div>
                  <label className="text-sm text-gray-400 block mb-1">
                    Server
                  </label>
                  <div className="text-white">{selectedSignal.server}</div>
                </div>

                <div>
                  <label className="text-sm text-gray-400 block mb-1">
                    Type
                  </label>
                  <div className="flex items-center gap-2">
                    {getTypeIcon(selectedSignal.type)}
                    <span className="text-white">{selectedSignal.type}</span>
                  </div>
                </div>

                <div>
                  <label className="text-sm text-gray-400 block mb-1">
                    Status
                  </label>
                  <span
                    className={`inline-block px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(selectedSignal.status)}`}
                  >
                    {selectedSignal.status}
                  </span>
                </div>

                <div>
                  <label className="text-sm text-gray-400 block mb-1">
                    Timestamp
                  </label>
                  <div className="text-white">
                    {new Date(selectedSignal.timestamp).toLocaleString()}
                  </div>
                </div>

                <div>
                  <label className="text-sm text-gray-400 block mb-1">
                    Message
                  </label>
                  <div className="text-white bg-gray-800/50 p-3 rounded">
                    {selectedSignal.message}
                  </div>
                </div>

                {selectedSignal.details && (
                  <div>
                    <label className="text-sm text-gray-400 block mb-1">
                      Details
                    </label>
                    <div className="text-white bg-gray-800/50 p-3 rounded">
                      {selectedSignal.details}
                    </div>
                  </div>
                )}

                {selectedSignal.stackTrace && (
                  <div>
                    <label className="text-sm text-gray-400 block mb-1">
                      Stack Trace
                    </label>
                    <div className="text-white bg-gray-800/50 p-3 rounded font-mono text-sm">
                      {selectedSignal.stackTrace}
                    </div>
                  </div>
                )}
              </div>

              <div className="flex gap-3 mt-6">
                {selectedSignal.status !== "Resolved" && (
                  <button
                    onClick={() => {
                      handleResolve(selectedSignal.id);
                      setShowModal(false);
                    }}
                    className="flex-1 bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg transition-colors"
                  >
                    Resolve Signal
                  </button>
                )}
                <button
                  onClick={() => setShowModal(false)}
                  className="flex-1 bg-gray-700 hover:bg-gray-600 text-white px-4 py-2 rounded-lg transition-colors"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Signals;
