import { Module } from "@nestjs/common";
import { GradeHorarioOfertaFormacaoService } from "@/v2/core/grade-horario-oferta-formacao/application/use-cases/grade-horario-oferta-formacao.service";
import { CampusModule } from "@/v2/server/modules/campus";
import { OfertaFormacaoModule } from "@/v2/server/modules/oferta-formacao";
import { GradeHorarioOfertaFormacaoController } from "./http";

@Module({
  imports: [OfertaFormacaoModule, CampusModule],
  controllers: [GradeHorarioOfertaFormacaoController],
  providers: [GradeHorarioOfertaFormacaoService],
  exports: [GradeHorarioOfertaFormacaoService],
})
export class GradeHorarioOfertaFormacaoModule {}
