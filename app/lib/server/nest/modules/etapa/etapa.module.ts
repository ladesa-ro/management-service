import { Module } from "@nestjs/common";
import { ETAPA_REPOSITORY_PORT, EtapaService } from "@/core/etapa";
import { CalendarioLetivoModule } from "@/server/nest/modules/calendario-letivo";
import { NestJsPaginateAdapter } from "@/v2/adapters/out/persistence/pagination";
import { EtapaTypeOrmRepositoryAdapter } from "@/v2/adapters/out/persistence/typeorm/adapters";
import { EtapaRestController } from "./rest/etapa.rest.controller";

@Module({
  imports: [CalendarioLetivoModule],
  controllers: [EtapaRestController],
  providers: [
    NestJsPaginateAdapter,
    EtapaService,
    {
      provide: ETAPA_REPOSITORY_PORT,
      useClass: EtapaTypeOrmRepositoryAdapter,
    },
  ],
  exports: [EtapaService],
})
export class EtapaModule {}
