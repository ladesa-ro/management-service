import { Impl } from "@/domain/dependency-injection";
import type { IConnectionHealthRegistry } from "./connection-health-registry.interface";

export enum ConnectionStatus {
  HEALTHY = "healthy",
  DEGRADED = "degraded",
  UNAVAILABLE = "unavailable",
}

export interface IConnectionHealthEntry {
  name: string;
  status: ConnectionStatus;
  lastCheckedAt: string;
  lastError?: string;
}

@Impl()
export class ConnectionHealthRegistry implements IConnectionHealthRegistry {
  readonly #entries = new Map<
    string,
    { status: ConnectionStatus; lastCheckedAt: Date; lastError?: string }
  >();

  register(name: string): void {
    if (!this.#entries.has(name)) {
      this.#entries.set(name, {
        status: ConnectionStatus.UNAVAILABLE,
        lastCheckedAt: new Date(),
      });
    }
  }

  markHealthy(name: string): void {
    this.#ensureRegistered(name);
    this.#entries.set(name, {
      status: ConnectionStatus.HEALTHY,
      lastCheckedAt: new Date(),
      lastError: undefined,
    });
  }

  markUnavailable(name: string, error?: string): void {
    this.#ensureRegistered(name);
    this.#entries.set(name, {
      status: ConnectionStatus.UNAVAILABLE,
      lastCheckedAt: new Date(),
      lastError: error,
    });
  }

  getStatus(name: string): ConnectionStatus {
    return this.#entries.get(name)?.status ?? ConnectionStatus.UNAVAILABLE;
  }

  getAllEntries(): IConnectionHealthEntry[] {
    return Array.from(this.#entries.entries()).map(([name, entry]) => ({
      name,
      status: entry.status,
      lastCheckedAt: entry.lastCheckedAt.toISOString(),
      lastError: entry.lastError,
    }));
  }

  isAvailable(name: string): boolean {
    return this.getStatus(name) === ConnectionStatus.HEALTHY;
  }

  #ensureRegistered(name: string): void {
    if (!this.#entries.has(name)) {
      this.register(name);
    }
  }
}
