import type { Signal } from "../types/signal";
import type { DashboardStats } from "../types/stats";

export const mockSignals: Signal[] = [
  {
    id: "SIG-001",
    timestamp: new Date(Date.now() - 1000 * 60 * 2).toISOString(),
    server: "prod-web-server-01",
    type: "Critical",
    message: "Database connection timeout detected",
    status: "Critical",
    stackTrace: "Error: Connection timeout at Database.connect (db.js:45:12)",
    details:
      "Failed to establish connection to primary database after 30 seconds",
  },
  {
    id: "SIG-002",
    timestamp: new Date(Date.now() - 1000 * 60 * 5).toISOString(),
    server: "api-gateway-02",
    type: "Warning",
    message: "High memory usage detected",
    status: "Warning",
    stackTrace: "Memory usage: 85% of allocated limit",
    details: "Memory usage approaching threshold, consider scaling",
  },
  {
    id: "SIG-003",
    timestamp: new Date(Date.now() - 1000 * 60 * 10).toISOString(),
    server: "cache-server-01",
    type: "Info",
    message: "Cache cleared successfully",
    status: "Resolved",
    details: "Scheduled cache maintenance completed",
  },
  {
    id: "SIG-004",
    timestamp: new Date(Date.now() - 1000 * 60 * 15).toISOString(),
    server: "load-balancer-01",
    type: "Critical",
    message: "SSL certificate expiring soon",
    status: "Critical",
    details: "SSL certificate will expire in 7 days",
  },
  {
    id: "SIG-005",
    timestamp: new Date(Date.now() - 1000 * 60 * 20).toISOString(),
    server: "auth-service-03",
    type: "Warning",
    message: "Increased authentication failures",
    status: "Warning",
    details: "Authentication failure rate increased by 15% in the last hour",
  },
  {
    id: "SIG-006",
    timestamp: new Date(Date.now() - 1000 * 60 * 25).toISOString(),
    server: "worker-node-02",
    type: "Info",
    message: "Background job completed",
    status: "Resolved",
    details: "Data processing job completed successfully",
  },
  {
    id: "SIG-007",
    timestamp: new Date(Date.now() - 1000 * 60 * 30).toISOString(),
    server: "monitoring-server-01",
    type: "Critical",
    message: "Disk space critically low",
    status: "Critical",
    stackTrace: "Filesystem /var/log at 95% capacity",
    details: "Immediate cleanup required to prevent system failure",
  },
  {
    id: "SIG-008",
    timestamp: new Date(Date.now() - 1000 * 60 * 35).toISOString(),
    server: "backup-server-01",
    type: "Info",
    message: "Backup completed successfully",
    status: "Resolved",
    details: "Daily backup completed: 2.3GB transferred",
  },
];

export const mockStats: DashboardStats = {
  total_signals: 127,
  critical: 8,
  warning: 23,
  uptime: 99.92,
};

export const mockServers = [
  {
    id: 1,
    name: "local-dev-agent",
    company: "Tech Corp",
    status: "healthy" as const,
    last_seen_at: new Date().toISOString(),
  },
  {
    id: 2,
    name: "prod-web-server",
    company: "Data Systems",
    status: "warning" as const,
    last_seen_at: new Date(Date.now() - 1000 * 60 * 2).toISOString(),
  },
  {
    id: 3,
    name: "backup-db-node",
    company: "Cloud Services",
    status: "critical" as const,
    last_seen_at: new Date(Date.now() - 1000 * 60 * 10).toISOString(),
  },
];

export const mockMetrics = [
  { time: "10:00:00", cpu: 45, ram: 62, disk: 78 },
  { time: "10:01:00", cpu: 52, ram: 65, disk: 78 },
  { time: "10:02:00", cpu: 48, ram: 63, disk: 79 },
  { time: "10:03:00", cpu: 58, ram: 68, disk: 79 },
  { time: "10:04:00", cpu: 42, ram: 60, disk: 78 },
  { time: "10:05:00", cpu: 55, ram: 70, disk: 80 },
  { time: "10:06:00", cpu: 50, ram: 66, disk: 80 },
  { time: "10:07:00", cpu: 47, ram: 64, disk: 79 },
  { time: "10:08:00", cpu: 53, ram: 67, disk: 81 },
  { time: "10:09:00", cpu: 49, ram: 65, disk: 81 },
];

export const mockIncidents = [
  {
    incident_id: 1,
    status: "resolved",
    created_at: new Date(Date.now() - 1000 * 60 * 60 * 2).toISOString(),
  },
  {
    incident_id: 2,
    status: "investigating",
    created_at: new Date(Date.now() - 1000 * 60 * 30).toISOString(),
  },
  {
    incident_id: 3,
    status: "resolved",
    created_at: new Date(Date.now() - 1000 * 60 * 60 * 5).toISOString(),
  },
];
