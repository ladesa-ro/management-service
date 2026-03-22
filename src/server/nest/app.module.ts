import { Module } from "@nestjs/common";
import { APP_FILTER, APP_INTERCEPTOR } from "@nestjs/core";
import { ContainerModule } from "@/infrastructure.dependency-injection";
import { LoggingModule, RequestLoggingInterceptor } from "@/infrastructure.logging";
import { InfrastructureModule } from "@/infrastructure.module";
import { AccessContextCoreModule } from "@/server/access-context";
import { AppController } from "@/server/nest/app.controller";
import { AppService } from "@/server/nest/app.service";
import {
  ApplicationErrorFilter,
  GlobalExceptionFilter,
  ValidationExceptionFilter,
} from "@/server/nest/filters";
import { TransactionInterceptor } from "@/server/nest/interceptors/transaction.interceptor";
import { ModulesModule } from "@/server/nest/modules/modules.module";

@Module({
  imports: [
    LoggingModule,
    ModulesModule,
    InfrastructureModule,
    AccessContextCoreModule,
    ContainerModule,
  ],
  controllers: [AppController],
  providers: [
    AppService,
    {
      provide: APP_INTERCEPTOR,
      useClass: RequestLoggingInterceptor,
    },
    {
      provide: APP_INTERCEPTOR,
      useClass: TransactionInterceptor,
    },
    // Filtros em ordem: do mais genérico ao mais específico
    // (NestJS processa do último para o primeiro)
    {
      provide: APP_FILTER,
      useClass: GlobalExceptionFilter,
    },
    {
      provide: APP_FILTER,
      useClass: ApplicationErrorFilter,
    },
    {
      provide: APP_FILTER,
      useClass: ValidationExceptionFilter,
    },
  ],
})
export class AppModule {}
