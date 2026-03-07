import { Module } from "@nestjs/common";
import {
  GradeHorarioOfertaFormacaoService,
  IGradeHorarioOfertaFormacaoRepository,
} from "@/Ladesa.Management.Application/horarios/grade-horario-oferta-formacao";
import { GradeHorarioOfertaFormacaoAuthzRegistrySetup } from "@/Ladesa.Management.Application/horarios/grade-horario-oferta-formacao/infrastructure";
import { GradeHorarioOfertaFormacaoTypeOrmRepositoryAdapter } from "@/Ladesa.Management.Infrastructure.Database/Repositories/GradeHorarioOfertaFormacaoRepositoryAdapter";
import { NestJsPaginateAdapter } from "@/Ladesa.Management.Infrastructure.Database/typeorm";
import { GradeHorarioOfertaFormacaoGraphqlResolver } from "@/Ladesa.Management.Server.Api/Apis/GraphQl/Resolvers/GradeHorarioOfertaFormacaoGraphqlResolver";
import { GradeHorarioOfertaFormacaoRestController } from "@/Ladesa.Management.Server.Api/Apis/Rest/Controllers/GradeHorarioOfertaFormacaoRestController";

@Module({
  imports: [],
  controllers: [GradeHorarioOfertaFormacaoRestController],
  providers: [
    NestJsPaginateAdapter,
    GradeHorarioOfertaFormacaoService,
    GradeHorarioOfertaFormacaoGraphqlResolver,
    GradeHorarioOfertaFormacaoAuthzRegistrySetup,
    {
      provide: IGradeHorarioOfertaFormacaoRepository,
      useClass: GradeHorarioOfertaFormacaoTypeOrmRepositoryAdapter,
    },
  ],
  exports: [GradeHorarioOfertaFormacaoService],
})
export class GradeHorarioOfertaFormacaoModule {}
