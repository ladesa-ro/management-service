import { Module } from "@nestjs/common";
import { CalendarioLetivoController } from "@/v2/adapters/in/http/calendario-letivo/calendario-letivo.controller";
import { NestJsPaginateAdapter } from "@/v2/adapters/out/persistence/pagination";
import { CalendarioLetivoTypeOrmRepositoryAdapter } from "@/v2/adapters/out/persistence/typeorm/adapters";
import { CalendarioLetivoService } from "@/v2/core/calendario-letivo/application/use-cases/calendario-letivo.service";
import { CampusModule } from "@/v2/core/campus/campus.module";
import { OfertaFormacaoModule } from "@/v2/core/oferta-formacao/oferta-formacao.module";

/**
 * Módulo CalendarioLetivo configurado com Arquitetura Hexagonal
 * - CalendarioLetivoService: Implementa casos de uso (porta de entrada)
 * - CalendarioLetivoTypeOrmRepositoryAdapter: Implementa ICalendarioLetivoRepositoryPort (porta de saída)
 * - NestJsPaginateAdapter: Adapter de paginação com nestjs-paginate
 */
@Module({
  imports: [CampusModule, OfertaFormacaoModule],
  providers: [
    NestJsPaginateAdapter,
    {
      provide: "ICalendarioLetivoRepositoryPort",
      useClass: CalendarioLetivoTypeOrmRepositoryAdapter,
    },
    CalendarioLetivoService,
  ],
  exports: [CalendarioLetivoService],
  controllers: [CalendarioLetivoController],
})
export class CalendarioLetivoModule {}
