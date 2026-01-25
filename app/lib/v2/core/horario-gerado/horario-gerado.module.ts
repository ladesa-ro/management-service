import { Module } from "@nestjs/common";
import { HorarioGeradoController } from "@/v2/adapters/in/http/horario-gerado/horario-gerado.controller";
import { NestJsPaginateAdapter } from "@/v2/adapters/out/persistence/pagination";
import { HorarioGeradoTypeOrmRepositoryAdapter } from "@/v2/adapters/out/persistence/typeorm/adapters";
import { CalendarioLetivoModule } from "@/v2/core/calendario-letivo/calendario-letivo.module";
import { HorarioGeradoService } from "@/v2/core/horario-gerado/application/use-cases/horario-gerado.service";

/**
 * Módulo HorarioGerado configurado com Arquitetura Hexagonal
 * - HorarioGeradoService: Implementa casos de uso (porta de entrada)
 * - HorarioGeradoTypeOrmRepositoryAdapter: Implementa IHorarioGeradoRepositoryPort (porta de saída)
 * - NestJsPaginateAdapter: Adapter de paginação com nestjs-paginate
 */
@Module({
  imports: [CalendarioLetivoModule],
  providers: [
    NestJsPaginateAdapter,
    {
      provide: "IHorarioGeradoRepositoryPort",
      useClass: HorarioGeradoTypeOrmRepositoryAdapter,
    },
    HorarioGeradoService,
  ],
  controllers: [HorarioGeradoController],
  exports: [HorarioGeradoService],
})
export class HorarioGeradoModule {}
