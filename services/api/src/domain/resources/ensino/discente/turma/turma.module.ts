import { CursoModule } from "@/domain/resources/ensino/institucional/curso/curso.module";
import { Module } from "@nestjs/common";
import { AmbienteModule } from "../../../ambientes/ambiente/ambiente.module";
import { TurmaController } from "./turma.controller";
import { TurmaService } from "./turma.service";

@Module({
  imports: [AmbienteModule, CursoModule],
  controllers: [TurmaController],
  providers: [TurmaService],
  exports: [TurmaService],
})
export class TurmaModule {}
