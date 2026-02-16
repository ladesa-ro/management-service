import { Module } from "@nestjs/common";
import { NestJsPaginateAdapter } from "@/modules/@shared/infrastructure/persistence/typeorm";
import {
  GRADE_HORARIO_OFERTA_FORMACAO_INTERVALO_DE_TEMPO_REPOSITORY_PORT,
  GradeHorarioOfertaFormacaoIntervaloDeTempoService,
} from "@/modules/horarios/grade-horario-oferta-formacao-intervalo-de-tempo";
import { GradeHorarioOfertaFormacaoIntervaloDeTempoAuthzRegistrySetup } from "@/modules/horarios/grade-horario-oferta-formacao-intervalo-de-tempo/infrastructure";
import { GradeHorarioOfertaFormacaoIntervaloDeTempoTypeOrmRepositoryAdapter } from "@/modules/horarios/grade-horario-oferta-formacao-intervalo-de-tempo/infrastructure/persistence/typeorm";
import { GradeHorarioOfertaFormacaoIntervaloDeTempoGraphqlResolver } from "@/modules/horarios/grade-horario-oferta-formacao-intervalo-de-tempo/presentation/graphql/grade-horario-oferta-formacao-intervalo-de-tempo.graphql.resolver";
import { GradeHorarioOfertaFormacaoIntervaloDeTempoRestController } from "@/modules/horarios/grade-horario-oferta-formacao-intervalo-de-tempo/presentation/rest/grade-horario-oferta-formacao-intervalo-de-tempo.rest.controller";
import { GradeHorarioOfertaFormacaoModule } from "@/server/nest/modules/grade-horario-oferta-formacao";
import { IntervaloDeTempoModule } from "@/server/nest/modules/intervalo-de-tempo";

@Module({
  imports: [GradeHorarioOfertaFormacaoModule, IntervaloDeTempoModule],
  controllers: [GradeHorarioOfertaFormacaoIntervaloDeTempoRestController],
  providers: [
    NestJsPaginateAdapter,
    GradeHorarioOfertaFormacaoIntervaloDeTempoService,
    GradeHorarioOfertaFormacaoIntervaloDeTempoGraphqlResolver,
    GradeHorarioOfertaFormacaoIntervaloDeTempoAuthzRegistrySetup,
    {
      provide: GRADE_HORARIO_OFERTA_FORMACAO_INTERVALO_DE_TEMPO_REPOSITORY_PORT,
      useClass: GradeHorarioOfertaFormacaoIntervaloDeTempoTypeOrmRepositoryAdapter,
    },
  ],
  exports: [GradeHorarioOfertaFormacaoIntervaloDeTempoService],
})
export class GradeHorarioOfertaFormacaoIntervaloDeTempoModule {}
