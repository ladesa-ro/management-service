import { Module } from "@nestjs/common";
import { TurmaModule } from "@/legacy/application/resources/ensino/discente/turma/turma.module";
import {
  DisponibilidadeModule
} from "@/legacy/application/resources/horario-academico/disponibilidade/disponibilidade.module";
import { TurmaDisponibilidadeController } from "./api/turma-disponibilidade.controller";
import { TurmaDisponibilidadeResolver } from "./turma-disponibilidade.resolver";
import { TurmaDisponibilidadeService } from "./domain/turma-disponibilidade.service";

@Module({
  imports: [TurmaModule, DisponibilidadeModule],
  controllers: [TurmaDisponibilidadeController],
  providers: [TurmaDisponibilidadeService, TurmaDisponibilidadeResolver],
  exports: [TurmaDisponibilidadeService],
})
export class TurmaDisponibilidadeModule {
}
