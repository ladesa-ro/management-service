import { Global, Module } from "@nestjs/common";
import { ConfigModule as NestConfigModule } from "@nestjs/config";
import { EnvironmentConfigModule } from "@/v2/adapters/out/config";
import { ProviderAppConfigService } from "./providers";

@Global()
@Module({
  imports: [NestConfigModule, EnvironmentConfigModule],
  controllers: [],
  exports: [ProviderAppConfigService],
  providers: [ProviderAppConfigService],
})
export class AppConfigModule {}
