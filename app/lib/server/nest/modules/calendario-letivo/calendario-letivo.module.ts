import { Module } from "@nestjs/common";
import { NestJsPaginateAdapter } from "@/modules/@shared/infrastructure/persistence/typeorm";
import {
  CALENDARIO_LETIVO_REPOSITORY_PORT,
  CalendarioLetivoService,
} from "@/modules/sisgha/calendario-letivo";
import { CalendarioLetivoAuthzRegistrySetup } from "@/modules/sisgha/calendario-letivo/infrastructure";
import { CalendarioLetivoTypeOrmRepositoryAdapter } from "@/modules/sisgha/calendario-letivo/infrastructure/persistence/typeorm";
import { CalendarioLetivoGraphqlResolver } from "@/modules/sisgha/calendario-letivo/presentation/graphql/calendario-letivo.graphql.resolver";
import { CalendarioLetivoRestController } from "@/modules/sisgha/calendario-letivo/presentation/rest/calendario-letivo.rest.controller";
import { CampusModule } from "@/server/nest/modules/campus";
import { OfertaFormacaoModule } from "@/server/nest/modules/oferta-formacao";

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
