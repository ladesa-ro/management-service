import { Module } from "@nestjs/common";
import { GradeHorarioOfertaFormacaoIntervaloDeTempoService } from "@/core/grade-horario-oferta-formacao-intervalo-de-tempo";
import { GradeHorarioOfertaFormacaoModule } from "@/server/nest/modules/grade-horario-oferta-formacao";
import { IntervaloDeTempoModule } from "@/server/nest/modules/intervalo-de-tempo";
import { GradeHorarioOfertaFormacaoIntervaloDeTempoRestController } from "./rest/grade-horario-oferta-formacao-intervalo-de-tempo.rest.controller";

@Module({
  imports: [GradeHorarioOfertaFormacaoModule, IntervaloDeTempoModule],
  controllers: [GradeHorarioOfertaFormacaoIntervaloDeTempoRestController],
  providers: [GradeHorarioOfertaFormacaoIntervaloDeTempoService],
  exports: [GradeHorarioOfertaFormacaoIntervaloDeTempoService],
})
export class GradeHorarioOfertaFormacaoIntervaloDeTempoModule {}
