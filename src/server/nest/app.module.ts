import { Module } from "@nestjs/common";
import { APP_FILTER, APP_GUARD, APP_INTERCEPTOR } from "@nestjs/core";
import { ThrottlerModule } from "@nestjs/throttler";
import { ConfigTokens, IConfigService } from "@/infrastructure.config";
import { ContainerModule } from "@/infrastructure.dependency-injection";
import { LoggingModule, RequestLoggingInterceptor } from "@/infrastructure.logging";
import { InfrastructureModule } from "@/infrastructure.module";
import { AccessContextCoreModule } from "@/server/nest/access-context";
import { AppController } from "@/server/nest/app.controller";
import { AppService } from "@/server/nest/app.service";
import {
  ApplicationErrorFilter,
  GlobalExceptionFilter,
  ValidationExceptionFilter,
} from "@/server/nest/filters";
import { TransactionInterceptor } from "@/server/nest/interceptors/transaction.interceptor";
import { ModulesModule } from "@/server/nest/modules/modules.module";
import { AppThrottlerGuard } from "@/server/nest/throttler/app-throttler.guard";
import { IdempotencyModule } from "@/shared/idempotency";
import { ResilienceModule } from "@/shared/resilience";

@Module({
  imports: [
    ThrottlerModule.forRootAsync({
      inject: [IConfigService],
      useFactory: (configService: IConfigService) => {
        const rawTtl = configService.get<number | string>(ConfigTokens.RateLimitOptions.Ttl);
        const rawLimit = configService.get<number | string>(ConfigTokens.RateLimitOptions.Limit);
        const ttl = rawTtl ? Number(rawTtl) || 60000 : 60000;
        const limit = rawLimit ? Number(rawLimit) || 200 : 200;

        return [
          {
            ttl,
            limit,
          },
        ];
      },
    }),
    ResilienceModule,
    IdempotencyModule,
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
      provide: APP_GUARD,
      useClass: AppThrottlerGuard,
    },
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
