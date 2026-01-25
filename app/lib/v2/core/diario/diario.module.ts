import { Module } from "@nestjs/common";
import { AmbienteModule } from "@/v2/core/ambiente/ambiente.module";
import { CalendarioLetivoModule } from "@/v2/core/calendario-letivo/calendario-letivo.module";
import { DisciplinaModule } from "@/v2/core/disciplina/disciplina.module";
import { TurmaModule } from "@/v2/core/turma/turma.module";
import { DiarioController } from "@/v2/adapters/in/http/diario/diario.controller";
import { DiarioService } from "@/v2/core/diario/application/use-cases/diario.service";

@Module({
  imports: [CalendarioLetivoModule, TurmaModule, AmbienteModule, DisciplinaModule],
  controllers: [DiarioController],
  providers: [DiarioService],
  exports: [DiarioService],
})
export class DiarioModule {}
