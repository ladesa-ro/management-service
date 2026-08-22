import { Global, Module } from "@nestjs/common";
import { ConfigModule as NestConfigModule } from "@nestjs/config";
import { ConfigServiceProvider } from "./config-service/config-service.provider";
import { AuthOptionsProvider } from "./options/auth/auth-options.provider";
import { DatabaseOptionsProvider } from "./options/database/database-options.provider";
import { QueueOptionsProvider } from "./options/queue/queue-options.provider";
import { RuntimeOptionsProvider } from "./options/runtime/runtime-options.provider";

/**
 * Módulo global de configuração
 */
@Global()
@Module({
  imports: [NestConfigModule],
  providers: [
    ConfigServiceProvider,
    DatabaseOptionsProvider,
    RuntimeOptionsProvider,
    AuthOptionsProvider,
    QueueOptionsProvider,
  ],
  exports: [
    ConfigServiceProvider,
    DatabaseOptionsProvider,
    RuntimeOptionsProvider,
    AuthOptionsProvider,
    QueueOptionsProvider,
  ],
})
export class AppConfigModule {}
