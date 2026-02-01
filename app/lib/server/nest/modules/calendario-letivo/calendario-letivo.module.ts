import { Module } from "@nestjs/common";
import { NestJsPaginateAdapter } from "@/modules/@shared/infrastructure/persistence/typeorm";
import {
  CALENDARIO_LETIVO_REPOSITORY_PORT,
  CalendarioLetivoService,
} from "@/modules/calendario-letivo";
import { CalendarioLetivoAuthzRegistrySetup } from "@/modules/calendario-letivo/infrastructure";
import { CalendarioLetivoTypeOrmRepositoryAdapter } from "@/modules/calendario-letivo/infrastructure/persistence/typeorm";
import { CampusModule } from "@/server/nest/modules/campus";
import { OfertaFormacaoModule } from "@/server/nest/modules/oferta-formacao";
import { CalendarioLetivoGraphqlResolver } from "./graphql/calendario-letivo.graphql.resolver";
import { CalendarioLetivoRestController } from "./rest/calendario-letivo.rest.controller";

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
