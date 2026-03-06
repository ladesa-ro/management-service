import { Module } from "@nestjs/common";
import {
  GRADE_HORARIO_OFERTA_FORMACAO_REPOSITORY_PORT,
  GradeHorarioOfertaFormacaoService,
} from "@/Ladesa.Management.Application/horarios/grade-horario-oferta-formacao";
import { GradeHorarioOfertaFormacaoAuthzRegistrySetup } from "@/Ladesa.Management.Application/horarios/grade-horario-oferta-formacao/infrastructure";
import { GradeHorarioOfertaFormacaoTypeOrmRepositoryAdapter } from "@/Ladesa.Management.Application/horarios/grade-horario-oferta-formacao/infrastructure/persistence/typeorm";
import { GradeHorarioOfertaFormacaoGraphqlResolver } from "@/Ladesa.Management.Application/horarios/grade-horario-oferta-formacao/presentation/graphql/grade-horario-oferta-formacao.graphql.resolver";
import { GradeHorarioOfertaFormacaoRestController } from "@/Ladesa.Management.Application/horarios/grade-horario-oferta-formacao/presentation/rest/grade-horario-oferta-formacao.rest.controller";
import { NestJsPaginateAdapter } from "@/Ladesa.Management.Infrastructure.Database/typeorm";

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
