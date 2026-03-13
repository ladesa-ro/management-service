import { Module } from "@nestjs/common";
import { NestJsPaginateAdapter } from "@/modules/@shared/infrastructure/persistence/typeorm";
import { CalendarioLetivoModule } from "@/modules/horarios/calendario-letivo/calendario-letivo.module";
import { DIA_CALENDARIO_REPOSITORY_PORT } from "@/modules/horarios/dia-calendario/application/ports";
import { DiaCalendarioService } from "@/modules/horarios/dia-calendario/application/use-cases/dia-calendario.service";
import { DiaCalendarioAuthzRegistrySetup } from "@/modules/horarios/dia-calendario/infrastructure";
import { DiaCalendarioTypeOrmRepositoryAdapter } from "@/modules/horarios/dia-calendario/infrastructure/persistence/typeorm";
import { DiaCalendarioGraphqlResolver } from "@/modules/horarios/dia-calendario/presentation/graphql/dia-calendario.graphql.resolver";
import { DiaCalendarioRestController } from "@/modules/horarios/dia-calendario/presentation/rest/dia-calendario.rest.controller";

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
