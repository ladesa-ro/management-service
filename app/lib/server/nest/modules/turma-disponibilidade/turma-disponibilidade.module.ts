import { Module } from "@nestjs/common";
import { TurmaDisponibilidadeService } from "@/core/turma-disponibilidade";
import { DisponibilidadeModule } from "@/server/nest/modules/disponibilidade";
import { TurmaModule } from "@/server/nest/modules/turma";
import { TurmaDisponibilidadeRestController } from "./rest";

@Module({
  imports: [TurmaModule, DisponibilidadeModule],
  controllers: [TurmaDisponibilidadeRestController],
  providers: [TurmaDisponibilidadeService],
  exports: [TurmaDisponibilidadeService],
})
export class TurmaDisponibilidadeModule {}
