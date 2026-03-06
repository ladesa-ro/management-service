import { Module } from "@nestjs/common";
import { ConfigModule as NestConfigModule } from "@nestjs/config";
import { EnvironmentConfigAdapter } from "./environment-config.adapter";

@Module({
  imports: [NestConfigModule],
  providers: [EnvironmentConfigAdapter],
  exports: [EnvironmentConfigAdapter],
})
export class EnvironmentConfigModule {}
