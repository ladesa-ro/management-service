import { Module } from "@nestjs/common";
import {
  OfertaFormacaoModule
} from "@/legacy/application/resources/ensino/institucional/oferta-formacao/oferta-formacao.module";
import { CampusModule } from "@/modules/campus/campus.module";
import { CursoController } from "./api/curso.controller";
import { CursoResolver } from "./curso.resolver";
import { CursoService } from "./domain/curso.service";

@Module({
  imports: [CampusModule, OfertaFormacaoModule],
  controllers: [CursoController],
  providers: [CursoService, CursoResolver],
  exports: [CursoService],
})
export class CursoModule {
}
