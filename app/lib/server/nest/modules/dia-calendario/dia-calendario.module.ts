import { Module } from "@nestjs/common";
import { NestJsPaginateAdapter } from "@/modules/@shared/infrastructure/persistence/typeorm";
import { DIA_CALENDARIO_REPOSITORY_PORT } from "@/modules/dia-calendario/application/ports";
import { DiaCalendarioService } from "@/modules/dia-calendario/application/use-cases/dia-calendario.service";
import { DiaCalendarioAuthzRegistrySetup } from "@/modules/dia-calendario/infrastructure";
import { DiaCalendarioTypeOrmRepositoryAdapter } from "@/modules/dia-calendario/infrastructure/persistence/typeorm";
import { CalendarioLetivoModule } from "@/server/nest/modules/calendario-letivo";
import { DiaCalendarioGraphqlResolver } from "./graphql/dia-calendario.graphql.resolver";
import { DiaCalendarioRestController } from "./rest/dia-calendario.rest.controller";

@Module({
  imports: [CalendarioLetivoModule],
  providers: [
    NestJsPaginateAdapter,
    {
      provide: DIA_CALENDARIO_REPOSITORY_PORT,
      useClass: DiaCalendarioTypeOrmRepositoryAdapter,
    },
    DiaCalendarioService,
    DiaCalendarioGraphqlResolver,
    DiaCalendarioAuthzRegistrySetup,
  ],
  controllers: [DiaCalendarioRestController],
  exports: [DiaCalendarioService],
})
export class DiaCalendarioModule {}
