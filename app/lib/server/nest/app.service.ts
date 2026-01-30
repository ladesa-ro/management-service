import { Inject, Injectable } from "@nestjs/common";
import { AppConfigService } from "@/v2/infra/config";

export interface ServiceInfo {
  status: string;
  service: string;
  prefix: string;
  version: string;
  buildTime: Date;
  gitCommitHash: string | null;
}

@Injectable()
export class AppService {
  constructor(
    @Inject(AppConfigService)
    private readonly configService: AppConfigService,
  ) {}

  getServiceInfo(): ServiceInfo {
    return {
      status: "up",
      service: "@ladesa-ro/management.service",
      prefix: this.configService.getRuntimePrefix(),
      version: this.configService.getRuntimeVersion(),
      buildTime: this.configService.getRuntimeBuildTime(),
      gitCommitHash: this.configService.getRuntimeGitCommitHash(),
    };
  }

  healthCheck(): { status: string } {
    return { status: "ok" };
  }
}
