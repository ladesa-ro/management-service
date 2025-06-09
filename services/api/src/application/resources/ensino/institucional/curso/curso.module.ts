import { OfertaFormacaoModule } from "@/application/resources/ensino/institucional/oferta-formacao/oferta-formacao.module";
import { Module } from "@nestjs/common";
import { CampusModule } from "../../../ambientes/campus/campus.module";
import { CursoController } from "./curso.controller";
import { CursoResolver } from "./curso.resolver";
import { CursoService } from "./curso.service";

@Module({
  imports: [CampusModule, OfertaFormacaoModule],
  controllers: [CursoController],
  providers: [CursoService, CursoResolver],
  exports: [CursoService],
})
export class CursoModule {}
