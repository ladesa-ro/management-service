import { CampusModule } from "@/domain/resources/ambientes/campus/campus.module";
import { OfertaFormacaoModule } from "@/domain/resources/ensino/institucional/oferta-formacao/oferta-formacao.module";
import { Module } from "@nestjs/common";
import { GradeHorarioOfertaFormacaoController } from "./grade-horario-oferta-formacao.controller";
import { GradeHorarioOfertaFormacaoService } from "./grade-horario-oferta-formacao.service";

@Module({
  imports: [OfertaFormacaoModule, CampusModule],
  controllers: [GradeHorarioOfertaFormacaoController],
  providers: [GradeHorarioOfertaFormacaoService],
  exports: [GradeHorarioOfertaFormacaoService],
})
export class GradeHorarioOfertaFormacaoModule {}
