import { Module } from "@nestjs/common";
import { CALENDARIO_LETIVO_REPOSITORY_PORT, CalendarioLetivoService } from "@/core/calendario-letivo";
import { NestJsPaginateAdapter } from "@/v2/adapters/out/persistence/pagination";
import { CalendarioLetivoTypeOrmRepositoryAdapter } from "@/v2/adapters/out/persistence/typeorm/adapters";
import { CampusModule } from "@/server/nest/modules/campus";
import { OfertaFormacaoModule } from "@/v2/server/modules/oferta-formacao";
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
