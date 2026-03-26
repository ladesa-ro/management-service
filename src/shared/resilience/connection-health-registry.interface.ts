import type { ConnectionStatus, IConnectionHealthEntry } from "./connection-health-registry";

export const IConnectionHealthRegistry = Symbol("IConnectionHealthRegistry");

export interface IConnectionHealthRegistry {
  register(name: string): void;
  markHealthy(name: string): void;
  markUnavailable(name: string, error?: string): void;
  getStatus(name: string): ConnectionStatus;
  getAllEntries(): IConnectionHealthEntry[];
  isAvailable(name: string): boolean;
}
