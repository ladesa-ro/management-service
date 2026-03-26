import { DeclareDependency, DeclareImplementation } from "@/domain/dependency-injection";
import {
  IRuntimeOptions,
  IRuntimeOptions as IRuntimeOptionsToken,
} from "@/infrastructure.config/options/runtime/runtime-options.interface";
import type { IConnectionHealthEntry } from "@/shared/resilience/connection-health-registry";
import { IConnectionHealthRegistry } from "@/shared/resilience/connection-health-registry.interface";

export interface ServiceInfo {
  status: string;
  service: string;
  prefix: string;
  version: string;
  buildTime: Date | null;
  gitCommitHash: string | null;
}

export interface HealthCheckResponse {
  status: "healthy" | "degraded" | "unavailable";
  dependencies: Record<
    string,
    Pick<IConnectionHealthEntry, "status" | "lastCheckedAt" | "lastError">
  >;
}

@DeclareImplementation()
export class AppService {
  constructor(
    @DeclareDependency(IRuntimeOptionsToken)
    private readonly runtimeOptions: IRuntimeOptions,
    @DeclareDependency(IConnectionHealthRegistry)
    private readonly healthRegistry: IConnectionHealthRegistry,
  ) {}

  getServiceInfo(): ServiceInfo {
    return {
      status: "up",
      service: "@ladesa-ro/management.service",
      prefix: this.runtimeOptions.prefix,
      version: this.runtimeOptions.version,
      buildTime: this.runtimeOptions.buildTime,
      gitCommitHash: this.runtimeOptions.gitCommitHash,
    };
  }

  healthCheck(): HealthCheckResponse {
    const entries = this.healthRegistry.getAllEntries();

    const overallStatus: HealthCheckResponse["status"] = entries.every(
      (e) => e.status === "healthy",
    )
      ? "healthy"
      : entries.some((e) => e.status === "unavailable")
        ? "unavailable"
        : "degraded";

    const dependencies: HealthCheckResponse["dependencies"] = {};

    for (const entry of entries) {
      dependencies[entry.name] = {
        status: entry.status,
        lastCheckedAt: entry.lastCheckedAt,
        ...(entry.lastError ? { lastError: entry.lastError } : {}),
      };
    }

    return { status: overallStatus, dependencies };
  }
}
