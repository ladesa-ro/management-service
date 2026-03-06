import { Module } from "@nestjs/common";
import { APP_FILTER } from "@nestjs/core";
import { AuthorizationCoreModule } from "@/Ladesa.Management.Application/@seguranca/autorizacao";
import { InfrastructureModule } from "@/Ladesa.Management.Application/@shared/infrastructure";
import { TransactionModule } from "@/Ladesa.Management.Infrastructure.Database/typeorm";
import { AppController } from "@/Ladesa.Management.Server.Api/nest/app.controller";
import { AppService } from "@/Ladesa.Management.Server.Api/nest/app.service";
import {
  ApplicationErrorFilter,
  GlobalExceptionFilter,
  ValidationExceptionFilter,
} from "@/Ladesa.Management.Server.Api/nest/filters";
import { ModulesModule } from "@/Ladesa.Management.Server.Api/nest/modules/modules.module";

@Module({
  imports: [ModulesModule, InfrastructureModule, AuthorizationCoreModule, TransactionModule],
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
