import { Module } from "@nestjs/common";
import { NestJsPaginateAdapter } from "@/modules/@shared/infrastructure/persistence/typeorm";
import {
  GRADE_HORARIO_OFERTA_FORMACAO_REPOSITORY_PORT,
  GradeHorarioOfertaFormacaoService,
} from "@/modules/grade-horario-oferta-formacao";
import { GradeHorarioOfertaFormacaoTypeOrmRepositoryAdapter } from "@/modules/grade-horario-oferta-formacao/infrastructure/persistence/typeorm";
import { GradeHorarioOfertaFormacaoGraphqlResolver } from "./graphql/grade-horario-oferta-formacao.graphql.resolver";
import { GradeHorarioOfertaFormacaoRestController } from "./rest/grade-horario-oferta-formacao.rest.controller";

@Module({
  imports: [],
  controllers: [GradeHorarioOfertaFormacaoRestController],
  providers: [
    NestJsPaginateAdapter,
    GradeHorarioOfertaFormacaoService,
    GradeHorarioOfertaFormacaoGraphqlResolver,
    {
      provide: GRADE_HORARIO_OFERTA_FORMACAO_REPOSITORY_PORT,
      useClass: GradeHorarioOfertaFormacaoTypeOrmRepositoryAdapter,
    },
  ],
  exports: [GradeHorarioOfertaFormacaoService],
})
export class GradeHorarioOfertaFormacaoModule {}
