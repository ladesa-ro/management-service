import { Module } from "@nestjs/common";
import { DIARIO_REPOSITORY_PORT } from "@/core/diario/application/ports";
import { DiarioService } from "@/core/diario/application/use-cases/diario.service";
import { AmbienteModule } from "@/server/nest/modules/ambiente";
import { CalendarioLetivoModule } from "@/server/nest/modules/calendario-letivo";
import { DisciplinaModule } from "@/server/nest/modules/disciplina";
import { TurmaModule } from "@/server/nest/modules/turma";
import { NestJsPaginateAdapter } from "@/v2/adapters/out/persistence/pagination";
import { DiarioTypeOrmRepositoryAdapter } from "@/v2/adapters/out/persistence/typeorm/adapters";
import { DiarioRestController } from "./rest/diario.rest.controller";

/**
 * Modulo NestJS para Diario
 */
@Module({
  imports: [CalendarioLetivoModule, TurmaModule, AmbienteModule, DisciplinaModule],
  controllers: [DiarioRestController],
  providers: [
    NestJsPaginateAdapter,
    DiarioService,
    {
      provide: DIARIO_REPOSITORY_PORT,
      useClass: DiarioTypeOrmRepositoryAdapter,
    },
  ],
  exports: [DiarioService],
})
export class DiarioModule {}
