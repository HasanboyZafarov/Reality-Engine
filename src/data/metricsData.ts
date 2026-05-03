// Overall System Metrics Data

export interface OverallStats {
  avgCpu: number;
  avgRam: number;
  avgDisk: number;
  totalServers: number;
  uptime: number;
  totalRequests: number;
}

export interface ErrorReport {
  serverName: string;
  warning: number;
  critical: number;
  total: number;
}

export interface TrafficData {
  timestamp: string;
  requests: number;
  throughput: number;
}

export interface ServerComparison {
  serverName: string;
  cpu: number;
  ram: number;
  disk: number;
  requests: number;
}

export interface TimeRange {
  label: string;
  value: string;
}

export const overallStats: OverallStats = {
  avgCpu: 45.7,
  avgRam: 62.3,
  avgDisk: 78.1,
  totalServers: 3,
  uptime: 99.92,
  totalRequests: 125847,
};

export const errorReports: ErrorReport[] = [
  { serverName: "local-dev-agent", warning: 3, critical: 0, total: 3 },
  { serverName: "prod-web-server", warning: 8, critical: 2, total: 10 },
  { serverName: "backup-db-node", warning: 12, critical: 5, total: 17 },
];

export const trafficData: TrafficData[] = [
  { timestamp: "00:00", requests: 1200, throughput: 450 },
  { timestamp: "04:00", requests: 800, throughput: 320 },
  { timestamp: "08:00", requests: 2100, throughput: 890 },
  { timestamp: "12:00", requests: 3500, throughput: 1450 },
  { timestamp: "16:00", requests: 2800, throughput: 1120 },
  { timestamp: "20:00", requests: 1800, throughput: 720 },
  { timestamp: "23:59", requests: 950, throughput: 380 },
];

export const serverComparison: ServerComparison[] = [
  { serverName: "local-dev-agent", cpu: 35, ram: 45, disk: 65, requests: 15420 },
  { serverName: "prod-web-server", cpu: 68, ram: 72, disk: 82, requests: 68920 },
  { serverName: "backup-db-node", cpu: 42, ram: 58, disk: 91, requests: 41507 },
];

export const timeRanges: TimeRange[] = [
  { label: "Last 6 Hours", value: "6h" },
  { label: "Last 24 Hours", value: "24h" },
  { label: "Last 7 Days", value: "7d" },
  { label: "Last 30 Days", value: "30d" },
];

export const aggregatedMetrics = [
  { time: "00:00", cpu: 35, ram: 58, disk: 75 },
  { time: "04:00", cpu: 28, ram: 52, disk: 74 },
  { time: "08:00", cpu: 52, ram: 68, disk: 78 },
  { time: "12:00", cpu: 68, ram: 75, disk: 80 },
  { time: "16:00", cpu: 58, ram: 70, disk: 79 },
  { time: "20:00", cpu: 42, ram: 62, disk: 77 },
  { time: "23:59", cpu: 38, ram: 55, disk: 76 },
];
