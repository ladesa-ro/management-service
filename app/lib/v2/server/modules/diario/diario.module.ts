import { Module } from "@nestjs/common";
import { NestJsPaginateAdapter } from "@/v2/adapters/out/persistence/pagination";
import { DiarioTypeOrmRepositoryAdapter } from "@/v2/adapters/out/persistence/typeorm/adapters";
import { DiarioService } from "@/v2/core/diario/application/use-cases/diario.service";
import { AmbienteModule } from "@/server/nest/modules/ambiente";
import { CalendarioLetivoModule } from "@/server/nest/modules/calendario-letivo";
import { DisciplinaModule } from "@/v2/server/modules/disciplina";
import { TurmaModule } from "@/v2/server/modules/turma";
import { DiarioController } from "./http";

/**
 * Módulo NestJS para Diario
 */
@Module({
  imports: [CalendarioLetivoModule, TurmaModule, AmbienteModule, DisciplinaModule],
  controllers: [DiarioController],
  providers: [
    NestJsPaginateAdapter,
    DiarioService,
    {
      provide: "IDiarioRepositoryPort",
      useClass: DiarioTypeOrmRepositoryAdapter,
    },
  ],
  exports: [DiarioService],
})
export class DiarioModule {}
