import { Global, Module } from "@nestjs/common";
import { ConfigModule as NestConfigModule } from "@nestjs/config";
import { AppConfigProvider } from "./app-config.provider";
import { EnvironmentConfigModule } from "./environment-config.module";

/**
 * Módulo global de configuração
 * Exporta CONFIG_PORT para injeção em toda a aplicação
 */
@Global()
@Module({
  imports: [NestConfigModule, EnvironmentConfigModule],
  providers: [AppConfigProvider],
  exports: [AppConfigProvider],
})
export class AppConfigModule {}
