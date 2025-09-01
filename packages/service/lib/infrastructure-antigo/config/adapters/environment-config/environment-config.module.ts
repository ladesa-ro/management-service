import { Module } from "@nestjs/common";
import { ConfigModule as NestConfigModule } from "@nestjs/config";
import { EnvironmentConfigService } from "./environment-config.service";

@Module({
  imports: [
    // ...
    NestConfigModule,
  ],
  providers: [
    // ...
    EnvironmentConfigService,
  ],
  exports: [
    // ...
    EnvironmentConfigService,
  ],
})
export class EnvironmentConfigModule {}
