import { Module } from "@nestjs/common";
import { NestJsPaginateAdapter } from "@/@shared/infrastructure/persistence/typeorm";
import {
  GRADE_HORARIO_OFERTA_FORMACAO_REPOSITORY_PORT,
  GradeHorarioOfertaFormacaoService,
} from "@/modules/grade-horario-oferta-formacao";
import { GradeHorarioOfertaFormacaoTypeOrmRepositoryAdapter } from "@/modules/grade-horario-oferta-formacao/infrastructure/persistence/typeorm";
import { GradeHorarioOfertaFormacaoRestController } from "./rest/grade-horario-oferta-formacao.rest.controller";

@Module({
  imports: [],
  controllers: [GradeHorarioOfertaFormacaoRestController],
  providers: [
    NestJsPaginateAdapter,
    GradeHorarioOfertaFormacaoService,
    {
      provide: GRADE_HORARIO_OFERTA_FORMACAO_REPOSITORY_PORT,
      useClass: GradeHorarioOfertaFormacaoTypeOrmRepositoryAdapter,
    },
  ],
  exports: [GradeHorarioOfertaFormacaoService],
})
export class GradeHorarioOfertaFormacaoModule {}
