import { Inject, Injectable } from "@nestjs/common";
import { CONFIG_PORT, type IConfigPort } from "@/modules/@shared/application/ports/out/config";

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
    @Inject(CONFIG_PORT)
    private readonly configService: IConfigPort,
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
