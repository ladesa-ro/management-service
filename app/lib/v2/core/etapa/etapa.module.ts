import { Module } from "@nestjs/common";
import { CalendarioLetivoModule } from "../calendario-letivo/calendario-letivo.module";
import { EtapaController } from "@/v2/adapters/in/http/etapa/etapa.controller";
import { EtapaService } from "@/v2/core/etapa/application/use-cases/etapa.service";
import { EtapaTypeOrmRepositoryAdapter } from "@/v2/adapters/out/persistence/typeorm/adapters";
import { NestJsPaginateAdapter } from "@/v2/adapters/out/persistence/pagination";

/**
 * Módulo Etapa configurado com Arquitetura Hexagonal
 * - EtapaService: Implementa casos de uso (porta de entrada)
 * - EtapaTypeOrmRepositoryAdapter: Implementa IEtapaRepositoryPort (porta de saída)
 * - NestJsPaginateAdapter: Adapter de paginação com nestjs-paginate
 */
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
