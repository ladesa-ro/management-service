import { Module } from "@nestjs/common";
import {
  OfertaFormacaoModule
} from "@/legacy/application/resources/ensino/institucional/oferta-formacao/oferta-formacao.module";
import { CampusModule } from "@/modules/campus/campus.module";
import { GradeHorarioOfertaFormacaoController } from "./api/grade-horario-oferta-formacao.controller";
import { GradeHorarioOfertaFormacaoResolver } from "./grade-horario-oferta-formacao.resolver";
import { GradeHorarioOfertaFormacaoService } from "./domain/grade-horario-oferta-formacao.service";

@Module({
  imports: [OfertaFormacaoModule, CampusModule],
  controllers: [GradeHorarioOfertaFormacaoController],
  providers: [GradeHorarioOfertaFormacaoService, GradeHorarioOfertaFormacaoResolver],
  exports: [GradeHorarioOfertaFormacaoService],
})
export class GradeHorarioOfertaFormacaoModule {
}
