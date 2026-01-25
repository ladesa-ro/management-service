import { Module } from "@nestjs/common";
import { CampusModule } from "@/v2/core/campus/campus.module";
import { OfertaFormacaoModule } from "@/v2/core/oferta-formacao/oferta-formacao.module";
import { CursoController } from "@/v2/adapters/in/http/curso/curso.controller";
import { CursoService } from "@/v2/core/curso/application/use-cases/curso.service";

@Module({
  imports: [CampusModule, OfertaFormacaoModule],
  controllers: [CursoController],
  providers: [CursoService],
  exports: [CursoService],
})
export class CursoModule {}
