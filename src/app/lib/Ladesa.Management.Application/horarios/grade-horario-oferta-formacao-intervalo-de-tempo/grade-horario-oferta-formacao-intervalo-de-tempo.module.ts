import { Module } from "@nestjs/common";
import { GradeHorarioOfertaFormacaoModule } from "@/Ladesa.Management.Application/horarios/grade-horario-oferta-formacao/grade-horario-oferta-formacao.module";
import {
  GRADE_HORARIO_OFERTA_FORMACAO_INTERVALO_DE_TEMPO_REPOSITORY_PORT,
  GradeHorarioOfertaFormacaoIntervaloDeTempoService,
} from "@/Ladesa.Management.Application/horarios/grade-horario-oferta-formacao-intervalo-de-tempo";
import { GradeHorarioOfertaFormacaoIntervaloDeTempoAuthzRegistrySetup } from "@/Ladesa.Management.Application/horarios/grade-horario-oferta-formacao-intervalo-de-tempo/infrastructure";
import { GradeHorarioOfertaFormacaoIntervaloDeTempoTypeOrmRepositoryAdapter } from "@/Ladesa.Management.Application/horarios/grade-horario-oferta-formacao-intervalo-de-tempo/infrastructure/persistence/typeorm";
import { GradeHorarioOfertaFormacaoIntervaloDeTempoGraphqlResolver } from "@/Ladesa.Management.Application/horarios/grade-horario-oferta-formacao-intervalo-de-tempo/presentation/graphql/grade-horario-oferta-formacao-intervalo-de-tempo.graphql.resolver";
import { GradeHorarioOfertaFormacaoIntervaloDeTempoRestController } from "@/Ladesa.Management.Application/horarios/grade-horario-oferta-formacao-intervalo-de-tempo/presentation/rest/grade-horario-oferta-formacao-intervalo-de-tempo.rest.controller";
import { IntervaloDeTempoModule } from "@/Ladesa.Management.Application/horarios/intervalo-de-tempo/intervalo-de-tempo.module";
import { NestJsPaginateAdapter } from "@/Ladesa.Management.Infrastructure.Database/typeorm";

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
