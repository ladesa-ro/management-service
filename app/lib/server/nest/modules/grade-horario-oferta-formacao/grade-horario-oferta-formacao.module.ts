import { Module } from "@nestjs/common";
import {
  GRADE_HORARIO_OFERTA_FORMACAO_REPOSITORY_PORT,
  GradeHorarioOfertaFormacaoService,
} from "@/core/grade-horario-oferta-formacao";
import { NestJsPaginateAdapter } from "@/v2/adapters/out/persistence/pagination";
import { GradeHorarioOfertaFormacaoTypeOrmRepositoryAdapter } from "@/v2/adapters/out/persistence/typeorm/adapters";
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
