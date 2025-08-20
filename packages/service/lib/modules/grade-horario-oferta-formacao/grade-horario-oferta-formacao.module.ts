import { Module } from "@nestjs/common";
import { CampusModule } from "@/modules/campus/campus.module";
import { OfertaFormacaoModule } from "@/modules/oferta-formacao/oferta-formacao.module";
import { GradeHorarioOfertaFormacaoController } from "./api/grade-horario-oferta-formacao.controller";
import { GradeHorarioOfertaFormacaoService } from "./domain/grade-horario-oferta-formacao.service";

@Module({
  imports: [OfertaFormacaoModule, CampusModule],
  controllers: [GradeHorarioOfertaFormacaoController],
  providers: [GradeHorarioOfertaFormacaoService],
  exports: [GradeHorarioOfertaFormacaoService],
})
export class GradeHorarioOfertaFormacaoModule {}
