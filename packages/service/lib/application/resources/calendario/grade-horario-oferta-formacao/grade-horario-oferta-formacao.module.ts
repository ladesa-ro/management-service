import { Module } from "@nestjs/common";
import { CampusModule } from "@/application/resources/ambientes/campus/campus.module";
import { OfertaFormacaoModule } from "@/application/resources/ensino/institucional/oferta-formacao/oferta-formacao.module";
import { GradeHorarioOfertaFormacaoController } from "./grade-horario-oferta-formacao.controller";
import { GradeHorarioOfertaFormacaoResolver } from "./grade-horario-oferta-formacao.resolver";
import { GradeHorarioOfertaFormacaoService } from "./grade-horario-oferta-formacao.service";

@Module({
  imports: [OfertaFormacaoModule, CampusModule],
  controllers: [GradeHorarioOfertaFormacaoController],
  providers: [GradeHorarioOfertaFormacaoService, GradeHorarioOfertaFormacaoResolver],
  exports: [GradeHorarioOfertaFormacaoService],
})
export class GradeHorarioOfertaFormacaoModule {}
