import { Module } from "@nestjs/common";
import { AmbienteModule } from "@/v2/core/ambiente/ambiente.module";
import { CursoModule } from "@/v2/core/curso/curso.module";
import { TurmaController } from "./api/turma.controller";
import { TurmaService } from "./domain/turma.service";

@Module({
  imports: [AmbienteModule, CursoModule],
  controllers: [TurmaController],
  providers: [TurmaService],
  exports: [TurmaService],
})
export class TurmaModule {}
