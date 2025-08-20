import { Module } from "@nestjs/common";
import { AmbienteModule } from "@/modules/ambiente/ambiente.module";
import { CalendarioLetivoModule } from "@/modules/calendario-letivo/calendario-letivo.module";
import { DisciplinaModule } from "@/modules/disciplina/disciplina.module";
import { TurmaModule } from "@/modules/turma/turma.module";
import { DiarioController } from "./api/diario.controller";
import { DiarioService } from "./domain/diario.service";

@Module({
  imports: [CalendarioLetivoModule, TurmaModule, AmbienteModule, DisciplinaModule],
  controllers: [DiarioController],
  providers: [DiarioService],
  exports: [DiarioService],
})
export class DiarioModule {}
