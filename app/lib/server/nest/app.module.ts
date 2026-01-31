import { Module } from "@nestjs/common";
import { APP_FILTER } from "@nestjs/core";
import { InfrastructureModule } from "@/modules/@shared/infrastructure";
import {
  SearchModule,
  TransactionModule,
} from "@/modules/@shared/infrastructure/persistence/typeorm";
import { AppController } from "@/server/nest/app.controller";
import { AppService } from "@/server/nest/app.service";
import {
  ApplicationErrorFilter,
  GlobalExceptionFilter,
  ValidationExceptionFilter,
} from "@/server/nest/filters";
import { ModulesModule } from "@/server/nest/modules/modules.module";
import { AuthorizationModule } from "@/v2/adapters/out/authorization";

@Module({
  imports: [
    SearchModule,
    ModulesModule,
    InfrastructureModule,
    AuthorizationModule,
    TransactionModule,
  ],
  controllers: [AppController],
  providers: [
    AppService,
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
