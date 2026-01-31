import { Module } from "@nestjs/common";
import {
  GRADE_HORARIO_OFERTA_FORMACAO_INTERVALO_DE_TEMPO_REPOSITORY_PORT,
  GradeHorarioOfertaFormacaoIntervaloDeTempoService,
} from "@/core/grade-horario-oferta-formacao-intervalo-de-tempo";
import { GradeHorarioOfertaFormacaoModule } from "@/server/nest/modules/grade-horario-oferta-formacao";
import { IntervaloDeTempoModule } from "@/server/nest/modules/intervalo-de-tempo";
import { NestJsPaginateAdapter } from "@/v2/adapters/out/persistence/pagination";
import { GradeHorarioOfertaFormacaoIntervaloDeTempoTypeOrmRepositoryAdapter } from "@/v2/adapters/out/persistence/typeorm/adapters";
import { GradeHorarioOfertaFormacaoIntervaloDeTempoRestController } from "./rest/grade-horario-oferta-formacao-intervalo-de-tempo.rest.controller";

@Module({
  imports: [GradeHorarioOfertaFormacaoModule, IntervaloDeTempoModule],
  controllers: [GradeHorarioOfertaFormacaoIntervaloDeTempoRestController],
  providers: [
    NestJsPaginateAdapter,
    GradeHorarioOfertaFormacaoIntervaloDeTempoService,
    {
      provide: GRADE_HORARIO_OFERTA_FORMACAO_INTERVALO_DE_TEMPO_REPOSITORY_PORT,
      useClass: GradeHorarioOfertaFormacaoIntervaloDeTempoTypeOrmRepositoryAdapter,
    },
  ],
  exports: [GradeHorarioOfertaFormacaoIntervaloDeTempoService],
})
export class GradeHorarioOfertaFormacaoIntervaloDeTempoModule {}
