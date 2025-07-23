import { Inject, Injectable } from "@nestjs/common";
import { AppConfigService } from "@/infrastructure/config";

@Injectable()
export class AppService {
  constructor(
    //
    @Inject(AppConfigService)
    readonly configService: AppConfigService,
  ) {}

  getHello() {
    return {
      status: "up",
      service: "@ladesa-ro/api.service",
      prefix: this.configService.getRuntimePrefix(),
      version: this.configService.getRuntimeVersion(),
      buildTime: this.configService.getRuntimeBuildTime(),
      gitCommitHash: this.configService.getRuntimeGitCommitHash(),
    };
  }
}
