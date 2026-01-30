import { Module } from "@nestjs/common";
import {
  CALENDARIO_LETIVO_REPOSITORY_PORT,
  CalendarioLetivoService,
} from "@/core/calendario-letivo";
import { CampusModule } from "@/server/nest/modules/campus";
import { OfertaFormacaoModule } from "@/server/nest/modules/oferta-formacao";
import { NestJsPaginateAdapter } from "@/v2/adapters/out/persistence/pagination";
import { CalendarioLetivoTypeOrmRepositoryAdapter } from "@/v2/adapters/out/persistence/typeorm/adapters";
import { CalendarioLetivoRestController } from "./rest/calendario-letivo.rest.controller";

@Module({
  imports: [CampusModule, OfertaFormacaoModule],
  controllers: [CalendarioLetivoRestController],
  providers: [
    NestJsPaginateAdapter,
    CalendarioLetivoService,
    {
      provide: CALENDARIO_LETIVO_REPOSITORY_PORT,
      useClass: CalendarioLetivoTypeOrmRepositoryAdapter,
    },
  ],
  exports: [CalendarioLetivoService],
})
export class CalendarioLetivoModule {}
