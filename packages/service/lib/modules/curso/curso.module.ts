import { Module } from "@nestjs/common";
import { CampusModule } from "@/modules/campus/campus.module";
import { OfertaFormacaoModule } from "@/modules/oferta-formacao/oferta-formacao.module";
import { CursoController } from "./api/curso.controller";
import { CursoService } from "./domain/curso.service";

@Module({
  imports: [CampusModule, OfertaFormacaoModule],
  controllers: [CursoController],
  providers: [CursoService],
  exports: [CursoService],
})
export class CursoModule {}
