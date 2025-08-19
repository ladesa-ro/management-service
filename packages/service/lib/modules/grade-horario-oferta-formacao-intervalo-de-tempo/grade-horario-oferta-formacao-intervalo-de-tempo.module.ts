import { Module } from "@nestjs/common";
import {
  GradeHorarioOfertaFormacaoModule
} from "@/legacy/application/resources/calendario/grade-horario-oferta-formacao/grade-horario-oferta-formacao.module";
import {
  GradeHorarioOfertaFormacaoIntervaloDeTempoController
} from "./api/grade-horario-oferta-formacao-intervalo-de-tempo.controller";
import {
  GradeHorarioOfertaFormacaoIntervaloDeTempoResolver
} from "./grade-horario-oferta-formacao-intervalo-de-tempo.resolver";
import {
  GradeHorarioOfertaFormacaoIntervaloDeTempoService
} from "./domain/grade-horario-oferta-formacao-intervalo-de-tempo.service";

@Module({
  imports: [GradeHorarioOfertaFormacaoModule],
  controllers: [GradeHorarioOfertaFormacaoIntervaloDeTempoController],
  providers: [GradeHorarioOfertaFormacaoIntervaloDeTempoService, GradeHorarioOfertaFormacaoIntervaloDeTempoResolver],
  exports: [GradeHorarioOfertaFormacaoIntervaloDeTempoService],
})
export class GradeHorarioOfertaFormacaoIntervaloDeTempoModule {
}
