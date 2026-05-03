export type SignalType = "Critical" | "Warning" | "Info";
export type SignalStatus = "Critical" | "Warning" | "Info" | "Resolved";

export interface Signal {
  id: string;
  timestamp: string;
  server: string;
  type: SignalType;
  message: string;
  status: SignalStatus;
  stackTrace?: string;
  details?: string;
}
