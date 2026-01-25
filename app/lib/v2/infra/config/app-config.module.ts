import { Global, Module } from "@nestjs/common";
import { ConfigModule as NestConfigModule } from "@nestjs/config";
import { ProviderAppConfigService } from "./providers";
import { EnvironmentConfigModule } from "@/v2/adapters/out/config";

@Global()
@Module({
  imports: [NestConfigModule, EnvironmentConfigModule],
  controllers: [],
  exports: [ProviderAppConfigService],
  providers: [ProviderAppConfigService],
})
export class AppConfigModule {}
