import { Module } from "@nestjs/common";
import { AmbienteModule } from "@/features/ambiente/ambiente.module";
import { CalendarioLetivoModule } from "@/features/calendario-letivo/calendario-letivo.module";
import { DisciplinaModule } from "@/features/disciplina/disciplina.module";
import { TurmaModule } from "@/features/turma/turma.module";
import { DiarioController } from "./api/diario.controller";
import { DiarioService } from "./domain/diario.service";

@Module({
  imports: [CalendarioLetivoModule, TurmaModule, AmbienteModule, DisciplinaModule],
  controllers: [DiarioController],
  providers: [DiarioService],
  exports: [DiarioService],
})
export class DiarioModule {}
