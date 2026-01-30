import { Module } from "@nestjs/common";
import { TurmaDisponibilidadeService } from "@/v2/core/turma-disponibilidade/application/use-cases/turma-disponibilidade.service";
import { DisponibilidadeModule } from "@/server/nest/modules/disponibilidade";
import { TurmaModule } from "@/v2/server/modules/turma";
import { TurmaDisponibilidadeController } from "./http";

@Module({
  imports: [TurmaModule, DisponibilidadeModule],
  controllers: [TurmaDisponibilidadeController],
  providers: [TurmaDisponibilidadeService],
  exports: [TurmaDisponibilidadeService],
})
export class TurmaDisponibilidadeModule {}
