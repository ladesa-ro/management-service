import { Global, Module } from "@nestjs/common";
import { ConfigModule as NestConfigModule } from "@nestjs/config";
import { ConfigServiceProvider } from "./providers/config-service.provider";
import { DatabaseOptionsProvider } from "./providers/database-options.provider";
import { RuntimeOptionsProvider } from "./providers/runtime-options.provider";
import { AuthOptionsProvider } from "./providers/auth-options.provider";
import { MessageBrokerOptionsProvider } from "./providers/message-broker-options.provider";

/**
 * Módulo global de configuração
 */
@Global()
@Module({
  imports: [NestConfigModule],
  providers: [ConfigServiceProvider, DatabaseOptionsProvider, RuntimeOptionsProvider, AuthOptionsProvider, MessageBrokerOptionsProvider],
  exports: [ConfigServiceProvider, DatabaseOptionsProvider, RuntimeOptionsProvider, AuthOptionsProvider, MessageBrokerOptionsProvider],
})
export class AppConfigModule {}
