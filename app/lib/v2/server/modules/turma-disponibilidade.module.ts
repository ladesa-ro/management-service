import { Module } from "@nestjs/common";
import { TurmaDisponibilidadeController } from "@/v2/adapters/in/http/turma-disponibilidade/turma-disponibilidade.controller";
import { TurmaDisponibilidadeService } from "@/v2/core/turma-disponibilidade/application/use-cases/turma-disponibilidade.service";
import { DisponibilidadeModule } from "@/v2/server/modules/disponibilidade.module";
import { TurmaModule } from "@/v2/server/modules/turma.module";

@Module({
  imports: [TurmaModule, DisponibilidadeModule],
  controllers: [TurmaDisponibilidadeController],
  providers: [TurmaDisponibilidadeService],
  exports: [TurmaDisponibilidadeService],
})
export class TurmaDisponibilidadeModule {}
