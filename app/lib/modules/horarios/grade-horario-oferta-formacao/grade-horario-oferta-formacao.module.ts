import { Module } from "@nestjs/common";
import { NestJsPaginateAdapter } from "@/modules/@shared/infrastructure/persistence/typeorm";
import {
  GRADE_HORARIO_OFERTA_FORMACAO_REPOSITORY_PORT,
  GradeHorarioOfertaFormacaoService,
} from "@/modules/horarios/grade-horario-oferta-formacao";
import { GradeHorarioOfertaFormacaoAuthzRegistrySetup } from "@/modules/horarios/grade-horario-oferta-formacao/infrastructure";
import { GradeHorarioOfertaFormacaoTypeOrmRepositoryAdapter } from "@/modules/horarios/grade-horario-oferta-formacao/infrastructure/persistence/typeorm";
import { GradeHorarioOfertaFormacaoGraphqlResolver } from "@/modules/horarios/grade-horario-oferta-formacao/presentation/graphql/grade-horario-oferta-formacao.graphql.resolver";
import { GradeHorarioOfertaFormacaoRestController } from "@/modules/horarios/grade-horario-oferta-formacao/presentation/rest/grade-horario-oferta-formacao.rest.controller";

@Module({
  imports: [],
  controllers: [GradeHorarioOfertaFormacaoRestController],
  providers: [
    NestJsPaginateAdapter,
    GradeHorarioOfertaFormacaoService,
    GradeHorarioOfertaFormacaoGraphqlResolver,
    GradeHorarioOfertaFormacaoAuthzRegistrySetup,
    {
      provide: GRADE_HORARIO_OFERTA_FORMACAO_REPOSITORY_PORT,
      useClass: GradeHorarioOfertaFormacaoTypeOrmRepositoryAdapter,
    },
  ],
  exports: [GradeHorarioOfertaFormacaoService],
})
export class GradeHorarioOfertaFormacaoModule {}
