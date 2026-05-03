import { useState } from "react";
import DashboardLayout from "../layout/DashboardLayout";
import {
  mockUsers,
  generalSettings,
  notificationSettings,
  monitoringSettings,
  securitySettings,
  uiPreferences,
  apiKeys,
  timezones,
  languages,
  monitoringIntervals,
  loginHistory,
} from "../data/settingsData";
import type {
  User,
  GeneralSettings,
  NotificationSettings,
  MonitoringSettings,
  SecuritySettings,
  UIPreferences,
} from "../data/settingsData";

export default function Settings() {
  const [activeTab, setActiveTab] = useState("general");
  const [users, setUsers] = useState<User[]>(mockUsers);
  const [general, setGeneral] = useState<GeneralSettings>(generalSettings);
  const [notifications, setNotifications] =
    useState<NotificationSettings>(notificationSettings);
  const [monitoring, setMonitoring] =
    useState<MonitoringSettings>(monitoringSettings);
  const [security, setSecurity] = useState<SecuritySettings>(securitySettings);
  const [ui, setUI] = useState<UIPreferences>(uiPreferences);
  const [showNewApiKey, setShowNewApiKey] = useState(false);
  const [saveMessage, setSaveMessage] = useState("");

  const tabs = [
    { id: "general", label: "General", icon: "settings" },
    { id: "users", label: "User Management", icon: "users" },
    { id: "notifications", label: "Notifications", icon: "bell" },
    { id: "monitoring", label: "Monitoring", icon: "chart" },
    { id: "api", label: "API & Integrations", icon: "key" },
    { id: "security", label: "Security", icon: "shield" },
    { id: "ui", label: "UI Preferences", icon: "palette" },
  ];

  const handleSave = () => {
    setSaveMessage("Settings saved successfully!");
    setTimeout(() => setSaveMessage(""), 3000);
  };

  const handleAddUser = () => {
    const newUser: User = {
      id: String(users.length + 1),
      name: "New User",
      email: "newuser@realityengine.com",
      role: "Viewer",
      status: "Active",
      lastLogin: new Date().toISOString(),
    };
    setUsers([...users, newUser]);
  };

  const handleDeleteUser = (id: string) => {
    setUsers(users.filter((user) => user.id !== id));
  };

  const handleGenerateApiKey = () => {
    setShowNewApiKey(true);
    setTimeout(() => setShowNewApiKey(false), 5000);
  };

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
            <div className="flex items-center gap-4 mb-4">
              <div className="w-3 h-3 bg-emerald-500 rounded-full animate-pulse"></div>
              <h1 className="text-4xl font-black tracking-tighter bg-gradient-to-r from-blue-400 via-cyan-400 to-purple-400 bg-clip-text text-transparent">
                System Settings
              </h1>
            </div>
            <p className="text-gray-400 text-sm font-mono flex items-center gap-2">
              <span className="text-emerald-400">CONFIGURATION PANEL</span>
              <span className="text-gray-600">|</span>
              <span className="text-blue-400">MANAGE YOUR SYSTEM</span>
            </p>
          </div>

          {/* TABS */}
          <div className="flex flex-wrap gap-2 mb-8 border-b border-gray-700/50">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`px-6 py-3 rounded-t-lg font-medium transition-all duration-300 ${
                  activeTab === tab.id
                    ? "bg-gradient-to-r from-blue-500/20 to-purple-500/20 border-b-2 border-blue-500 text-white"
                    : "text-gray-400 hover:text-white hover:bg-gray-800/50"
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>

          {/* SAVE MESSAGE */}
          {saveMessage && (
            <div className="fixed top-4 right-4 bg-emerald-500/20 border border-emerald-500/50 text-emerald-400 px-4 py-2 rounded-lg backdrop-blur-md text-sm animate-slide-in">
              {saveMessage}
            </div>
          )}

          {/* GENERAL SETTINGS */}
          {activeTab === "general" && (
            <div className="bg-gradient-to-r from-gray-900/50 to-gray-800/50 backdrop-blur-xl rounded-3xl p-8 border border-gray-700/50 shadow-2xl">
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-3">
                  <div className="w-3 h-3 bg-blue-500 rounded-full animate-pulse"></div>
                  <h2 className="text-2xl font-bold text-white">
                    General Settings
                  </h2>
                </div>
              </div>

              <div className="space-y-6">
                <div>
                  <label className="block text-gray-300 mb-2">
                    System Name
                  </label>
                  <input
                    type="text"
                    value={general.systemName}
                    onChange={(e) =>
                      setGeneral({ ...general, systemName: e.target.value })
                    }
                    className="w-full bg-gray-800/50 border border-gray-700/50 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-blue-500/50"
                  />
                </div>

                <div>
                  <label className="block text-gray-300 mb-2">Timezone</label>
                  <select
                    value={general.timezone}
                    onChange={(e) =>
                      setGeneral({ ...general, timezone: e.target.value })
                    }
                    className="w-full bg-gray-800/50 border border-gray-700/50 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-blue-500/50"
                  >
                    {timezones.map((tz) => (
                      <option key={tz} value={tz}>
                        {tz}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-gray-300 mb-2">Language</label>
                  <select
                    value={general.language}
                    onChange={(e) =>
                      setGeneral({
                        ...general,
                        language: e.target.value as "EN" | "RU" | "UZ",
                      })
                    }
                    className="w-full bg-gray-800/50 border border-gray-700/50 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-blue-500/50"
                  >
                    {languages.map((lang) => (
                      <option key={lang.code} value={lang.code}>
                        {lang.name}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
            </div>
          )}

          {/* USER MANAGEMENT */}
          {activeTab === "users" && (
            <div className="bg-gradient-to-r from-gray-900/50 to-gray-800/50 backdrop-blur-xl rounded-3xl p-8 border border-gray-700/50 shadow-2xl">
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-3">
                  <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
                  <h2 className="text-2xl font-bold text-white">
                    User Management
                  </h2>
                </div>
                <button
                  onClick={handleAddUser}
                  className="bg-blue-500/20 border border-blue-500/50 text-blue-400 px-4 py-2 rounded-lg hover:bg-blue-500/30 transition-all duration-300"
                >
                  Add User
                </button>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full text-left">
                  <thead>
                    <tr className="border-b border-gray-700/50">
                      <th className="pb-3 text-gray-400">Name</th>
                      <th className="pb-3 text-gray-400">Email</th>
                      <th className="pb-3 text-gray-400">Role</th>
                      <th className="pb-3 text-gray-400">Status</th>
                      <th className="pb-3 text-gray-400">Last Login</th>
                      <th className="pb-3 text-gray-400">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {users.map((user) => (
                      <tr
                        key={user.id}
                        className="border-b border-gray-700/30 hover:bg-gray-800/30 transition-colors"
                      >
                        <td className="py-3 text-white">{user.name}</td>
                        <td className="py-3 text-gray-400">{user.email}</td>
                        <td className="py-3">
                          <span
                            className={`px-2 py-1 rounded-full text-xs ${
                              user.role === "Admin"
                                ? "bg-red-500/20 text-red-400"
                                : user.role === "Operator"
                                  ? "bg-yellow-500/20 text-yellow-400"
                                  : "bg-blue-500/20 text-blue-400"
                            }`}
                          >
                            {user.role}
                          </span>
                        </td>
                        <td className="py-3">
                          <span
                            className={`px-2 py-1 rounded-full text-xs ${
                              user.status === "Active"
                                ? "bg-emerald-500/20 text-emerald-400"
                                : "bg-gray-500/20 text-gray-400"
                            }`}
                          >
                            {user.status}
                          </span>
                        </td>
                        <td className="py-3 text-gray-400 text-sm">
                          {new Date(user.lastLogin).toLocaleString()}
                        </td>
                        <td className="py-3">
                          <button
                            onClick={() => handleDeleteUser(user.id)}
                            className="text-red-400 hover:text-red-300 transition-colors"
                          >
                            Delete
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* NOTIFICATIONS */}
          {activeTab === "notifications" && (
            <div className="bg-gradient-to-r from-gray-900/50 to-gray-800/50 backdrop-blur-xl rounded-3xl p-8 border border-gray-700/50 shadow-2xl">
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-3">
                  <div className="w-3 h-3 bg-purple-500 rounded-full animate-pulse"></div>
                  <h2 className="text-2xl font-bold text-white">
                    Notifications
                  </h2>
                </div>
              </div>

              <div className="space-y-6">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="text-white font-medium">Email Alerts</h3>
                    <p className="text-gray-400 text-sm">
                      Enable email notifications
                    </p>
                  </div>
                  <button
                    onClick={() =>
                      setNotifications({
                        ...notifications,
                        emailAlerts: !notifications.emailAlerts,
                      })
                    }
                    className={`w-12 h-6 rounded-full transition-colors ${
                      notifications.emailAlerts ? "bg-blue-500" : "bg-gray-600"
                    }`}
                  >
                    <div
                      className={`w-5 h-5 bg-white rounded-full transition-transform ${
                        notifications.emailAlerts
                          ? "translate-x-6"
                          : "translate-x-0.5"
                      }`}
                    />
                  </button>
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="text-white font-medium">Critical Alerts</h3>
                    <p className="text-gray-400 text-sm">
                      Send emails for critical events
                    </p>
                  </div>
                  <button
                    onClick={() =>
                      setNotifications({
                        ...notifications,
                        criticalEmails: !notifications.criticalEmails,
                      })
                    }
                    className={`w-12 h-6 rounded-full transition-colors ${
                      notifications.criticalEmails
                        ? "bg-red-500"
                        : "bg-gray-600"
                    }`}
                  >
                    <div
                      className={`w-5 h-5 bg-white rounded-full transition-transform ${
                        notifications.criticalEmails
                          ? "translate-x-6"
                          : "translate-x-0.5"
                      }`}
                    />
                  </button>
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="text-white font-medium">Warning Alerts</h3>
                    <p className="text-gray-400 text-sm">
                      Send emails for warning events
                    </p>
                  </div>
                  <button
                    onClick={() =>
                      setNotifications({
                        ...notifications,
                        warningEmails: !notifications.warningEmails,
                      })
                    }
                    className={`w-12 h-6 rounded-full transition-colors ${
                      notifications.warningEmails
                        ? "bg-yellow-500"
                        : "bg-gray-600"
                    }`}
                  >
                    <div
                      className={`w-5 h-5 bg-white rounded-full transition-transform ${
                        notifications.warningEmails
                          ? "translate-x-6"
                          : "translate-x-0.5"
                      }`}
                    />
                  </button>
                </div>

                <div>
                  <label className="block text-gray-300 mb-2">
                    Telegram Bot Token
                  </label>
                  <input
                    type="text"
                    value={notifications.telegramBotToken}
                    onChange={(e) =>
                      setNotifications({
                        ...notifications,
                        telegramBotToken: e.target.value,
                      })
                    }
                    placeholder="Enter Telegram bot token"
                    className="w-full bg-gray-800/50 border border-gray-700/50 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-blue-500/50"
                  />
                </div>

                <div>
                  <label className="block text-gray-300 mb-2">
                    Webhook URL
                  </label>
                  <input
                    type="text"
                    value={notifications.webhookUrl}
                    onChange={(e) =>
                      setNotifications({
                        ...notifications,
                        webhookUrl: e.target.value,
                      })
                    }
                    placeholder="Enter webhook URL"
                    className="w-full bg-gray-800/50 border border-gray-700/50 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-blue-500/50"
                  />
                </div>
              </div>
            </div>
          )}

          {/* MONITORING CONFIGURATION */}
          {activeTab === "monitoring" && (
            <div className="bg-gradient-to-r from-gray-900/50 to-gray-800/50 backdrop-blur-xl rounded-3xl p-8 border border-gray-700/50 shadow-2xl">
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-3">
                  <div className="w-3 h-3 bg-cyan-500 rounded-full animate-pulse"></div>
                  <h2 className="text-2xl font-bold text-white">
                    Monitoring Configuration
                  </h2>
                </div>
              </div>

              <div className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-gray-300 mb-2">
                      CPU Threshold (%)
                    </label>
                    <input
                      type="number"
                      value={monitoring.cpuThreshold}
                      onChange={(e) =>
                        setMonitoring({
                          ...monitoring,
                          cpuThreshold: Number(e.target.value),
                        })
                      }
                      className="w-full bg-gray-800/50 border border-gray-700/50 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-blue-500/50"
                    />
                  </div>

                  <div>
                    <label className="block text-gray-300 mb-2">
                      RAM Threshold (%)
                    </label>
                    <input
                      type="number"
                      value={monitoring.ramThreshold}
                      onChange={(e) =>
                        setMonitoring({
                          ...monitoring,
                          ramThreshold: Number(e.target.value),
                        })
                      }
                      className="w-full bg-gray-800/50 border border-gray-700/50 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-blue-500/50"
                    />
                  </div>

                  <div>
                    <label className="block text-gray-300 mb-2">
                      Disk Threshold (%)
                    </label>
                    <input
                      type="number"
                      value={monitoring.diskThreshold}
                      onChange={(e) =>
                        setMonitoring({
                          ...monitoring,
                          diskThreshold: Number(e.target.value),
                        })
                      }
                      className="w-full bg-gray-800/50 border border-gray-700/50 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-blue-500/50"
                    />
                  </div>

                  <div>
                    <label className="block text-gray-300 mb-2">
                      Warning Threshold (%)
                    </label>
                    <input
                      type="number"
                      value={monitoring.warningThreshold}
                      onChange={(e) =>
                        setMonitoring({
                          ...monitoring,
                          warningThreshold: Number(e.target.value),
                        })
                      }
                      className="w-full bg-gray-800/50 border border-gray-700/50 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-blue-500/50"
                    />
                  </div>

                  <div>
                    <label className="block text-gray-300 mb-2">
                      Critical Threshold (%)
                    </label>
                    <input
                      type="number"
                      value={monitoring.criticalThreshold}
                      onChange={(e) =>
                        setMonitoring({
                          ...monitoring,
                          criticalThreshold: Number(e.target.value),
                        })
                      }
                      className="w-full bg-gray-800/50 border border-gray-700/50 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-blue-500/50"
                    />
                  </div>

                  <div>
                    <label className="block text-gray-300 mb-2">
                      Monitoring Interval
                    </label>
                    <select
                      value={monitoring.monitoringInterval}
                      onChange={(e) =>
                        setMonitoring({
                          ...monitoring,
                          monitoringInterval: e.target.value,
                        })
                      }
                      className="w-full bg-gray-800/50 border border-gray-700/50 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-blue-500/50"
                    >
                      {monitoringIntervals.map((interval) => (
                        <option key={interval.value} value={interval.value}>
                          {interval.label}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* API & INTEGRATIONS */}
          {activeTab === "api" && (
            <div className="bg-gradient-to-r from-gray-900/50 to-gray-800/50 backdrop-blur-xl rounded-3xl p-8 border border-gray-700/50 shadow-2xl">
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-3">
                  <div className="w-3 h-3 bg-orange-500 rounded-full animate-pulse"></div>
                  <h2 className="text-2xl font-bold text-white">
                    API & Integrations
                  </h2>
                </div>
                <button
                  onClick={handleGenerateApiKey}
                  className="bg-blue-500/20 border border-blue-500/50 text-blue-400 px-4 py-2 rounded-lg hover:bg-blue-500/30 transition-all duration-300"
                >
                  Generate API Key
                </button>
              </div>

              {showNewApiKey && (
                <div className="mb-6 p-4 bg-emerald-500/20 border border-emerald-500/50 rounded-lg">
                  <p className="text-emerald-400 text-sm mb-2">
                    New API Key Generated:
                  </p>
                  <code className="text-emerald-300">
                    sk_live_51H1{Math.random().toString(36).substr(2, 9)}...8f2d
                  </code>
                </div>
              )}

              <div className="space-y-4">
                {apiKeys.map((key) => (
                  <div
                    key={key.id}
                    className="border border-gray-700/50 rounded-lg p-4 hover:bg-gray-800/30 transition-colors"
                  >
                    <div className="flex justify-between items-start">
                      <div>
                        <h3 className="text-white font-medium">{key.name}</h3>
                        <p className="text-gray-400 text-sm font-mono">
                          {key.key}
                        </p>
                        <p className="text-gray-500 text-xs mt-1">
                          Created:{" "}
                          {new Date(key.createdAt).toLocaleDateString()} | Last
                          used: {new Date(key.lastUsed).toLocaleDateString()}
                        </p>
                      </div>
                      <div className="flex gap-2">
                        <span className="px-2 py-1 bg-blue-500/20 text-blue-400 rounded text-xs">
                          {key.permissions.join(", ")}
                        </span>
                        <button className="text-red-400 hover:text-red-300 text-sm">
                          Revoke
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* SECURITY */}
          {activeTab === "security" && (
            <div className="bg-gradient-to-r from-gray-900/50 to-gray-800/50 backdrop-blur-xl rounded-3xl p-8 border border-gray-700/50 shadow-2xl">
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-3">
                  <div className="w-3 h-3 bg-red-500 rounded-full animate-pulse"></div>
                  <h2 className="text-2xl font-bold text-white">Security</h2>
                </div>
              </div>

              <div className="space-y-6">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="text-white font-medium">
                      Two-Factor Authentication
                    </h3>
                    <p className="text-gray-400 text-sm">
                      Enable 2FA for enhanced security
                    </p>
                  </div>
                  <button
                    onClick={() =>
                      setSecurity({
                        ...security,
                        twoFactorEnabled: !security.twoFactorEnabled,
                      })
                    }
                    className={`w-12 h-6 rounded-full transition-colors ${
                      security.twoFactorEnabled ? "bg-blue-500" : "bg-gray-600"
                    }`}
                  >
                    <div
                      className={`w-5 h-5 bg-white rounded-full transition-transform ${
                        security.twoFactorEnabled
                          ? "translate-x-6"
                          : "translate-x-0.5"
                      }`}
                    />
                  </button>
                </div>

                <div>
                  <label className="block text-gray-300 mb-2">
                    Session Timeout (minutes)
                  </label>
                  <input
                    type="number"
                    value={security.sessionTimeout}
                    onChange={(e) =>
                      setSecurity({
                        ...security,
                        sessionTimeout: Number(e.target.value),
                      })
                    }
                    className="w-full bg-gray-800/50 border border-gray-700/50 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-blue-500/50"
                  />
                </div>

                <div className="border-t border-gray-700/50 pt-6">
                  <h3 className="text-white font-medium mb-4">Login History</h3>
                  <div className="space-y-3">
                    {loginHistory.map((login) => (
                      <div
                        key={login.id}
                        className="flex justify-between items-center text-sm"
                      >
                        <div>
                          <span className="text-gray-400">
                            {new Date(login.timestamp).toLocaleString()}
                          </span>
                          <span className="text-gray-600 mx-2">|</span>
                          <span className="text-gray-300">{login.ip}</span>
                          <span className="text-gray-600 mx-2">|</span>
                          <span className="text-gray-300">
                            {login.location}
                          </span>
                        </div>
                        <span
                          className={`px-2 py-1 rounded text-xs ${
                            login.status === "Success"
                              ? "bg-emerald-500/20 text-emerald-400"
                              : "bg-red-500/20 text-red-400"
                          }`}
                        >
                          {login.status}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* UI PREFERENCES */}
          {activeTab === "ui" && (
            <div className="bg-gradient-to-r from-gray-900/50 to-gray-800/50 backdrop-blur-xl rounded-3xl p-8 border border-gray-700/50 shadow-2xl">
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-3">
                  <div className="w-3 h-3 bg-pink-500 rounded-full animate-pulse"></div>
                  <h2 className="text-2xl font-bold text-white">
                    UI Preferences
                  </h2>
                </div>
              </div>

              <div className="space-y-6">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="text-white font-medium">Dark Mode</h3>
                    <p className="text-gray-400 text-sm">Enable dark theme</p>
                  </div>
                  <button
                    onClick={() => setUI({ ...ui, darkMode: !ui.darkMode })}
                    className={`w-12 h-6 rounded-full transition-colors ${
                      ui.darkMode ? "bg-blue-500" : "bg-gray-600"
                    }`}
                  >
                    <div
                      className={`w-5 h-5 bg-white rounded-full transition-transform ${
                        ui.darkMode ? "translate-x-6" : "translate-x-0.5"
                      }`}
                    />
                  </button>
                </div>

                <div>
                  <label className="block text-gray-300 mb-2">
                    Dashboard Layout
                  </label>
                  <select
                    value={ui.dashboardLayout}
                    onChange={(e) =>
                      setUI({
                        ...ui,
                        dashboardLayout: e.target.value as "grid" | "list",
                      })
                    }
                    className="w-full bg-gray-800/50 border border-gray-700/50 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-blue-500/50"
                  >
                    <option value="grid">Grid</option>
                    <option value="list">List</option>
                  </select>
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="text-white font-medium">Enable Widgets</h3>
                    <p className="text-gray-400 text-sm">
                      Show dashboard widgets
                    </p>
                  </div>
                  <button
                    onClick={() =>
                      setUI({ ...ui, widgetsEnabled: !ui.widgetsEnabled })
                    }
                    className={`w-12 h-6 rounded-full transition-colors ${
                      ui.widgetsEnabled ? "bg-blue-500" : "bg-gray-600"
                    }`}
                  >
                    <div
                      className={`w-5 h-5 bg-white rounded-full transition-transform ${
                        ui.widgetsEnabled ? "translate-x-6" : "translate-x-0.5"
                      }`}
                    />
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* SAVE BUTTON */}
          <div className="mt-8 flex justify-end">
            <button
              onClick={handleSave}
              className="bg-gradient-to-r from-blue-500 to-purple-500 text-white px-8 py-3 rounded-lg font-medium hover:from-blue-600 hover:to-purple-600 transition-all duration-300 shadow-lg hover:shadow-xl"
            >
              Save Settings
            </button>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}
