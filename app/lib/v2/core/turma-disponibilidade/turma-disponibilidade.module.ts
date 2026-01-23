import { Module } from "@nestjs/common";
import { DisponibilidadeModule } from "@/v2/core/disponibilidade/disponibilidade.module";
import { TurmaModule } from "@/v2/core/turma/turma.module";
import { TurmaDisponibilidadeController } from "./api/turma-disponibilidade.controller";
import { TurmaDisponibilidadeService } from "./domain/turma-disponibilidade.service";

@Module({
  imports: [TurmaModule, DisponibilidadeModule],
  controllers: [TurmaDisponibilidadeController],
  providers: [TurmaDisponibilidadeService],
  exports: [TurmaDisponibilidadeService],
})
export class TurmaDisponibilidadeModule {}
