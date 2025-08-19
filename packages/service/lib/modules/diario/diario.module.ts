import { Module } from "@nestjs/common";
import { TurmaModule } from "@/legacy/application/resources/ensino/discente/turma/turma.module";
import { CalendarioLetivoModule } from "@/modules/calendario-letivo/calendario-letivo.module";
import { DisciplinaModule } from "@/modules/disciplina/disciplina.module";
import { AmbienteModule } from "../ambiente";
import { DiarioController } from "./api/diario.controller";
import { DiarioResolver } from "./diario.resolver";
import { DiarioService } from "./domain/diario.service";

@Module({
  imports: [CalendarioLetivoModule, TurmaModule, AmbienteModule, DisciplinaModule],
  controllers: [DiarioController],
  providers: [DiarioService, DiarioResolver],
  exports: [DiarioService],
})
export class DiarioModule {
}
