import { Module } from "@nestjs/common";
import { CampusModule } from "@/v2/core/campus/campus.module";
import { OfertaFormacaoModule } from "@/v2/core/oferta-formacao/oferta-formacao.module";
import {
  GradeHorarioOfertaFormacaoController
} from "@/v2/adapters/in/http/grade-horario-oferta-formacao/grade-horario-oferta-formacao.controller";
import {
  GradeHorarioOfertaFormacaoService
} from "@/v2/core/grade-horario-oferta-formacao/application/use-cases/grade-horario-oferta-formacao.service";

@Module({
  imports: [OfertaFormacaoModule, CampusModule],
  controllers: [GradeHorarioOfertaFormacaoController],
  providers: [GradeHorarioOfertaFormacaoService],
  exports: [GradeHorarioOfertaFormacaoService],
})
export class GradeHorarioOfertaFormacaoModule {}
