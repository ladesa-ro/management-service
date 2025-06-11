import { GradeHorarioOfertaFormacaoModule } from "@/domain/resources/calendario/grade-horario-oferta-formacao/grade-horario-oferta-formacao.module";
import { Module } from "@nestjs/common";
import { GradeHorarioOfertaFormacaoIntervaloDeTempoController } from "./grade-horario-oferta-formacao-intervalo-de-tempo.controller";
import { GradeHorarioOfertaFormacaoIntervaloDeTempoService } from "./grade-horario-oferta-formacao-intervalo-de-tempo.service";

@Module({
  imports: [GradeHorarioOfertaFormacaoModule],
  controllers: [GradeHorarioOfertaFormacaoIntervaloDeTempoController],
  providers: [GradeHorarioOfertaFormacaoIntervaloDeTempoService],
  exports: [GradeHorarioOfertaFormacaoIntervaloDeTempoService],
})
export class GradeHorarioOfertaFormacaoIntervaloDeTempoModule {}
