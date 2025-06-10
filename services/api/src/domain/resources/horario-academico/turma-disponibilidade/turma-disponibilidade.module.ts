import { TurmaModule } from "@/domain/resources/ensino/discente/turma/turma.module";
import { DisponibilidadeModule } from "@/domain/resources/horario-academico/disponibilidade/disponibilidade.module";
import { Module } from "@nestjs/common";
import { TurmaDisponibilidadeController } from "./turma-disponibilidade.controller";
import { TurmaDisponibilidadeResolver } from "./turma-disponibilidade.resolver";
import { TurmaDisponibilidadeService } from "./turma-disponibilidade.service";

@Module({
  imports: [TurmaModule, DisponibilidadeModule],
  controllers: [TurmaDisponibilidadeController],
  providers: [TurmaDisponibilidadeService, TurmaDisponibilidadeResolver],
  exports: [TurmaDisponibilidadeService],
})
export class TurmaDisponibilidadeModule {}
