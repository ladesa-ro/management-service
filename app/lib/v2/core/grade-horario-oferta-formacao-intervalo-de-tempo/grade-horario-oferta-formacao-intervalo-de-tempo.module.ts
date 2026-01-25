import { Module } from "@nestjs/common";
import { GradeHorarioOfertaFormacaoIntervaloDeTempoController } from "@/v2/adapters/in/http/grade-horario-oferta-formacao-intervalo-de-tempo/grade-horario-oferta-formacao-intervalo-de-tempo.controller";
import { GradeHorarioOfertaFormacaoModule } from "@/v2/core/grade-horario-oferta-formacao/grade-horario-oferta-formacao.module";
import { GradeHorarioOfertaFormacaoIntervaloDeTempoService } from "@/v2/core/grade-horario-oferta-formacao-intervalo-de-tempo/application/use-cases/grade-horario-oferta-formacao-intervalo-de-tempo.service";

@Module({
  imports: [GradeHorarioOfertaFormacaoModule],
  controllers: [GradeHorarioOfertaFormacaoIntervaloDeTempoController],
  providers: [GradeHorarioOfertaFormacaoIntervaloDeTempoService],
  exports: [GradeHorarioOfertaFormacaoIntervaloDeTempoService],
})
export class GradeHorarioOfertaFormacaoIntervaloDeTempoModule {}
