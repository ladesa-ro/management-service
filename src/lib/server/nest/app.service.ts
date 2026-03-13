import { Inject, Injectable } from "@nestjs/common";
import { IRuntimeOptions, IRuntimeOptions as IRuntimeOptionsToken } from "@/infrastructure.config/options/runtime-options.interface";

export interface ServiceInfo {
  status: string;
  service: string;
  prefix: string;
  version: string;
  buildTime: Date | null;
  gitCommitHash: string | null;
}

@Injectable()
export class AppService {
  constructor(
    @Inject(IRuntimeOptionsToken)
    private readonly runtimeOptions: IRuntimeOptions,
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

  healthCheck(): { status: string } {
    return { status: "ok" };
  }
}
