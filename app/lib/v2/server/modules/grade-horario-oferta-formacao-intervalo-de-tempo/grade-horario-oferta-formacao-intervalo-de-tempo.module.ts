import { Module } from "@nestjs/common";
import { GradeHorarioOfertaFormacaoIntervaloDeTempoService } from "@/v2/core/grade-horario-oferta-formacao-intervalo-de-tempo/application/use-cases/grade-horario-oferta-formacao-intervalo-de-tempo.service";
import { GradeHorarioOfertaFormacaoModule } from "@/v2/server/modules/grade-horario-oferta-formacao";
import { GradeHorarioOfertaFormacaoIntervaloDeTempoController } from "./controllers";

@Module({
  imports: [GradeHorarioOfertaFormacaoModule],
  controllers: [GradeHorarioOfertaFormacaoIntervaloDeTempoController],
  providers: [GradeHorarioOfertaFormacaoIntervaloDeTempoService],
  exports: [GradeHorarioOfertaFormacaoIntervaloDeTempoService],
})
export class GradeHorarioOfertaFormacaoIntervaloDeTempoModule {}
