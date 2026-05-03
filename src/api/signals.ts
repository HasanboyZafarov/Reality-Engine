import type { Signal } from "../types/signal";
import { mockSignals } from "../data/mockData";

export const fetchSignals = async (): Promise<Signal[]> => {
  // Simulate API delay
  await new Promise((resolve) => setTimeout(resolve, 500));

  return mockSignals;
};
