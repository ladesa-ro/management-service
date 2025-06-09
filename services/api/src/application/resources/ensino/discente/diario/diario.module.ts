import { TurmaModule } from "@/application/resources/ensino/discente/turma/turma.module";
import { Module } from "@nestjs/common";
import { AmbienteModule } from "../../../ambientes/ambiente";
import { CalendarioLetivoModule } from "../../../calendario/calendario-letivo/calendario-letivo.module";
import { DisciplinaModule } from "../../institucional/disciplina/disciplina.module";
import { DiarioController } from "./diario.controller";
import { DiarioResolver } from "./diario.resolver";
import { DiarioService } from "./diario.service";

@Module({
  imports: [CalendarioLetivoModule, TurmaModule, AmbienteModule, DisciplinaModule],
  controllers: [DiarioController],
  providers: [DiarioService, DiarioResolver],
  exports: [DiarioService],
})
export class DiarioModule {}
