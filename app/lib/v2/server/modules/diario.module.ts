import { Module } from "@nestjs/common";
import { DiarioController } from "@/v2/adapters/in/http/diario/diario.controller";
import { NestJsPaginateAdapter } from "@/v2/adapters/out/persistence/pagination";
import { DiarioTypeOrmRepositoryAdapter } from "@/v2/adapters/out/persistence/typeorm/adapters";
import { DiarioService } from "@/v2/core/diario/application/use-cases/diario.service";
import { AmbienteModule } from "@/v2/server/modules/ambiente.module";
import { CalendarioLetivoModule } from "@/v2/server/modules/calendario-letivo.module";
import { DisciplinaModule } from "@/v2/server/modules/disciplina.module";
import { TurmaModule } from "@/v2/server/modules/turma.module";

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
