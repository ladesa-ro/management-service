import { Module } from "@nestjs/common";
import { CampusModule } from "@/Ladesa.Management.Application/ambientes/campus/campus.module";
import { OfertaFormacaoModule } from "@/Ladesa.Management.Application/ensino/oferta-formacao/oferta-formacao.module";
import {
  CALENDARIO_LETIVO_REPOSITORY_PORT,
  CalendarioLetivoService,
} from "@/Ladesa.Management.Application/horarios/calendario-letivo";
import { CalendarioLetivoAuthzRegistrySetup } from "@/Ladesa.Management.Application/horarios/calendario-letivo/infrastructure";
import { CalendarioLetivoTypeOrmRepositoryAdapter } from "@/Ladesa.Management.Application/horarios/calendario-letivo/infrastructure/persistence/typeorm";
import { CalendarioLetivoGraphqlResolver } from "@/Ladesa.Management.Application/horarios/calendario-letivo/presentation/graphql/calendario-letivo.graphql.resolver";
import { CalendarioLetivoRestController } from "@/Ladesa.Management.Application/horarios/calendario-letivo/presentation/rest/calendario-letivo.rest.controller";
import { NestJsPaginateAdapter } from "@/Ladesa.Management.Infrastructure.Database/typeorm";

@Module({
  imports: [CampusModule, OfertaFormacaoModule],
  controllers: [CalendarioLetivoRestController],
  providers: [
    NestJsPaginateAdapter,
    CalendarioLetivoService,
    CalendarioLetivoGraphqlResolver,
    CalendarioLetivoAuthzRegistrySetup,
    {
      provide: CALENDARIO_LETIVO_REPOSITORY_PORT,
      useClass: CalendarioLetivoTypeOrmRepositoryAdapter,
    },
  ],
  exports: [CalendarioLetivoService],
})
export class CalendarioLetivoModule {}
