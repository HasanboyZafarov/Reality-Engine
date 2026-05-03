export interface User {
  id: string;
  name: string;
  email: string;
  role: "Admin" | "Operator" | "Viewer";
  status: "Active" | "Inactive";
  lastLogin: string;
}

export interface GeneralSettings {
  systemName: string;
  timezone: string;
  language: "EN" | "RU" | "UZ";
}

export interface NotificationSettings {
  emailAlerts: boolean;
  criticalEmails: boolean;
  warningEmails: boolean;
  telegramEnabled: boolean;
  telegramBotToken: string;
  webhookUrl: string;
}

export interface MonitoringSettings {
  cpuThreshold: number;
  ramThreshold: number;
  diskThreshold: number;
  warningThreshold: number;
  criticalThreshold: number;
  monitoringInterval: string;
}

export interface SecuritySettings {
  twoFactorEnabled: boolean;
  sessionTimeout: number;
  loginHistoryEnabled: boolean;
}

export interface UIPreferences {
  darkMode: boolean;
  dashboardLayout: "grid" | "list";
  widgetsEnabled: boolean;
}

export interface APIKey {
  id: string;
  name: string;
  key: string;
  permissions: string[];
  createdAt: string;
  lastUsed: string;
}

export const mockUsers: User[] = [
  {
    id: "1",
    name: "Admin User",
    email: "admin@realityengine.com",
    role: "Admin",
    status: "Active",
    lastLogin: new Date(Date.now() - 1000 * 60 * 30).toISOString(),
  },
  {
    id: "2",
    name: "John Operator",
    email: "john@realityengine.com",
    role: "Operator",
    status: "Active",
    lastLogin: new Date(Date.now() - 1000 * 60 * 60 * 2).toISOString(),
  },
  {
    id: "3",
    name: "Jane Viewer",
    email: "jane@realityengine.com",
    role: "Viewer",
    status: "Active",
    lastLogin: new Date(Date.now() - 1000 * 60 * 60 * 24).toISOString(),
  },
];

export const generalSettings: GeneralSettings = {
  systemName: "Reality Engine",
  timezone: "UTC",
  language: "EN",
};

export const notificationSettings: NotificationSettings = {
  emailAlerts: true,
  criticalEmails: true,
  warningEmails: false,
  telegramEnabled: false,
  telegramBotToken: "",
  webhookUrl: "",
};

export const monitoringSettings: MonitoringSettings = {
  cpuThreshold: 80,
  ramThreshold: 85,
  diskThreshold: 90,
  warningThreshold: 70,
  criticalThreshold: 90,
  monitoringInterval: "5s",
};

export const securitySettings: SecuritySettings = {
  twoFactorEnabled: false,
  sessionTimeout: 30,
  loginHistoryEnabled: true,
};

export const uiPreferences: UIPreferences = {
  darkMode: true,
  dashboardLayout: "grid",
  widgetsEnabled: true,
};

export const apiKeys: APIKey[] = [
  {
    id: "1",
    name: "Production API Key",
    key: "sk_live_51H1...8f2d",
    permissions: ["read", "write"],
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 24 * 7).toISOString(),
    lastUsed: new Date(Date.now() - 1000 * 60 * 60 * 2).toISOString(),
  },
  {
    id: "2",
    name: "Development API Key",
    key: "sk_test_51H1...3a1b",
    permissions: ["read"],
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 24 * 30).toISOString(),
    lastUsed: new Date(Date.now() - 1000 * 60 * 60 * 8).toISOString(),
  },
];

export const timezones = [
  "UTC",
  "America/New_York",
  "Europe/London",
  "Asia/Tashkent",
  "Asia/Dubai",
];

export const languages = [
  { code: "EN", name: "English" },
  { code: "RU", name: "Russian" },
  { code: "UZ", name: "Uzbek" },
];

export const monitoringIntervals = [
  { label: "5 seconds", value: "5s" },
  { label: "10 seconds", value: "10s" },
  { label: "1 minute", value: "1min" },
  { label: "5 minutes", value: "5min" },
];

export const loginHistory = [
  {
    id: "1",
    timestamp: new Date(Date.now() - 1000 * 60 * 30).toISOString(),
    ip: "192.168.1.100",
    location: "Tashkent, Uzbekistan",
    status: "Success",
  },
  {
    id: "2",
    timestamp: new Date(Date.now() - 1000 * 60 * 60 * 2).toISOString(),
    ip: "192.168.1.101",
    location: "Tashkent, Uzbekistan",
    status: "Success",
  },
  {
    id: "3",
    timestamp: new Date(Date.now() - 1000 * 60 * 60 * 24).toISOString(),
    ip: "10.0.0.50",
    location: "Unknown",
    status: "Failed",
  },
];
