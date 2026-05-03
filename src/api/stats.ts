import type { DashboardStats } from "../types/stats";
import { mockStats } from "../data/mockData";

export const fetchDashboardStats = async (): Promise<DashboardStats> => {
  // Simulate API delay
  await new Promise((resolve) => setTimeout(resolve, 300));

  return mockStats;
};
