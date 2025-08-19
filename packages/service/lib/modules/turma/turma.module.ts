import { Module } from "@nestjs/common";
import { CursoModule } from "@/legacy/application/resources/ensino/institucional/curso/curso.module";
import { AmbienteModule } from "@/modules/ambiente/ambiente.module";
import { TurmaController } from "./api/turma.controller";
import { TurmaResolver } from "./turma.resolver";
import { TurmaService } from "./domain/turma.service";

@Module({
  imports: [AmbienteModule, CursoModule],
  controllers: [TurmaController],
  providers: [TurmaService, TurmaResolver],
  exports: [TurmaService],
})
export class TurmaModule {
}
