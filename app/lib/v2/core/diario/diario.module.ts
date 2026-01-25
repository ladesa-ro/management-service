import { Module } from "@nestjs/common";
import { AmbienteModule } from "@/v2/core/ambiente/ambiente.module";
import { CalendarioLetivoModule } from "@/v2/core/calendario-letivo/calendario-letivo.module";
import { DisciplinaModule } from "@/v2/core/disciplina/disciplina.module";
import { TurmaModule } from "@/v2/core/turma/turma.module";
import { DiarioController } from "@/v2/adapters/in/http/diario/diario.controller";
import { DiarioService } from "@/v2/core/diario/application/use-cases/diario.service";
import { DiarioTypeOrmRepositoryAdapter } from "@/v2/adapters/out/persistence/typeorm/adapters";
import { NestJsPaginateAdapter } from "@/v2/adapters/out/persistence/pagination";

/**
 * Módulo Diario configurado com Arquitetura Hexagonal
 * - DiarioService: Implementa casos de uso (porta de entrada)
 * - DiarioTypeOrmRepositoryAdapter: Implementa IDiarioRepositoryPort (porta de saída)
 * - NestJsPaginateAdapter: Adapter de paginação com nestjs-paginate
 */
@Module({
  imports: [CalendarioLetivoModule, TurmaModule, AmbienteModule, DisciplinaModule],
  controllers: [DiarioController],
  providers: [
    NestJsPaginateAdapter,
    {
      provide: "IDiarioRepositoryPort",
      useClass: DiarioTypeOrmRepositoryAdapter,
    },
    DiarioService,
  ],
  exports: [DiarioService],
})
export class DiarioModule {}
