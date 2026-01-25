import { Module } from "@nestjs/common";
import { DiarioProfessorModule } from "@/v2/core/diario-professor/diario-professor.module";
import { IntervaloDeTempoModule } from "@/v2/core/intervalo-de-tempo/intervalo-de-tempo.module";
import { HorarioGeradoModule } from "../horario-gerado/horario-gerado.module";
import { HorarioGeradoAulaController } from "@/v2/adapters/in/http/horario-gerado-aula/horario-gerado-aula.controller";
import { HorarioGeradoAulaService } from "@/v2/core/horario-gerado-aula/application/use-cases/horario-gerado-aula.service";
import { HorarioGeradoAulaTypeOrmRepositoryAdapter } from "@/v2/adapters/out/persistence/typeorm/adapters";
import { NestJsPaginateAdapter } from "@/v2/adapters/out/persistence/pagination";

/**
 * Módulo HorarioGeradoAula configurado com Arquitetura Hexagonal
 * - HorarioGeradoAulaService: Implementa casos de uso (porta de entrada)
 * - HorarioGeradoAulaTypeOrmRepositoryAdapter: Implementa IHorarioGeradoAulaRepositoryPort (porta de saída)
 * - NestJsPaginateAdapter: Adapter de paginação com nestjs-paginate
 */
@Module({
  imports: [DiarioProfessorModule, HorarioGeradoModule, IntervaloDeTempoModule],
  providers: [
    NestJsPaginateAdapter,
    {
      provide: "IHorarioGeradoAulaRepositoryPort",
      useClass: HorarioGeradoAulaTypeOrmRepositoryAdapter,
    },
    HorarioGeradoAulaService,
  ],
  controllers: [HorarioGeradoAulaController],
  exports: [HorarioGeradoAulaService],
})
export class HorarioGeradoAulaModule {}
