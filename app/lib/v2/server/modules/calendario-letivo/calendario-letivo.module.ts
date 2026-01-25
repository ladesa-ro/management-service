import { Module } from "@nestjs/common";
import { NestJsPaginateAdapter } from "@/v2/adapters/out/persistence/pagination";
import { CalendarioLetivoTypeOrmRepositoryAdapter } from "@/v2/adapters/out/persistence/typeorm/adapters";
import { CalendarioLetivoService } from "@/v2/core/calendario-letivo/application/use-cases/calendario-letivo.service";
import { CampusModule } from "@/v2/server/modules/campus";
import { OfertaFormacaoModule } from "@/v2/server/modules/oferta-formacao";
import { CalendarioLetivoController } from "./controllers";

/**
 * Módulo NestJS para CalendarioLetivo
 *
 * Responsável por:
 * - Configurar injeção de dependência
 * - Fazer o binding entre ports e adapters
 * - Registrar controller, service e repository
 */
@Module({
  imports: [CampusModule, OfertaFormacaoModule],
  controllers: [CalendarioLetivoController],
  providers: [
    NestJsPaginateAdapter,
    CalendarioLetivoService,
    {
      provide: "ICalendarioLetivoRepositoryPort",
      useClass: CalendarioLetivoTypeOrmRepositoryAdapter,
    },
  ],
  exports: [CalendarioLetivoService],
})
export class CalendarioLetivoModule {}
