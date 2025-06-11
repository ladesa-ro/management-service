import { OfertaFormacaoModule } from "@/domain/resources/ensino/institucional/oferta-formacao/oferta-formacao.module";
import { Module } from "@nestjs/common";
import { CampusModule } from "../../../ambientes/campus/campus.module";
import { CursoController } from "./curso.controller";
import { CursoService } from "./curso.service";

@Module({
  imports: [CampusModule, OfertaFormacaoModule],
  controllers: [CursoController],
  providers: [CursoService],
  exports: [CursoService],
})
export class CursoModule {}
