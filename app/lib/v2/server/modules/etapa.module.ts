import { Module } from "@nestjs/common";
import { EtapaController } from "@/v2/adapters/in/http/etapa/etapa.controller";
import { NestJsPaginateAdapter } from "@/v2/adapters/out/persistence/pagination";
import { EtapaTypeOrmRepositoryAdapter } from "@/v2/adapters/out/persistence/typeorm/adapters";
import { EtapaService } from "@/v2/core/etapa/application/use-cases/etapa.service";
import { CalendarioLetivoModule } from "@/v2/server/modules/calendario-letivo.module";

@Module({
  imports: [CalendarioLetivoModule],
  providers: [
    NestJsPaginateAdapter,
    {
      provide: "IEtapaRepositoryPort",
      useClass: EtapaTypeOrmRepositoryAdapter,
    },
    EtapaService,
  ],
  controllers: [EtapaController],
  exports: [EtapaService],
})
export class EtapaModule {}
