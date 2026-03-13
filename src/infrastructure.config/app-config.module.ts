import { Global, Module } from "@nestjs/common";
import { ConfigModule as NestConfigModule } from "@nestjs/config";
import { ConfigServiceProvider } from "./config-service/config-service.provider";
import { DatabaseOptionsProvider } from "./options/database/database-options.provider";
import { RuntimeOptionsProvider } from "./options/runtime/runtime-options.provider";
import { AuthOptionsProvider } from "./options/auth/auth-options.provider";
import { MessageBrokerOptionsProvider } from "./options/message-broker/message-broker-options.provider";

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
