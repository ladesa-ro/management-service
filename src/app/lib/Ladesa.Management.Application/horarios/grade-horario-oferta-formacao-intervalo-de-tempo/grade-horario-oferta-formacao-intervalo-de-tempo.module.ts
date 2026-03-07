import { Module } from "@nestjs/common";
import { GradeHorarioOfertaFormacaoModule } from "@/Ladesa.Management.Application/horarios/grade-horario-oferta-formacao/grade-horario-oferta-formacao.module";
import {
  GradeHorarioOfertaFormacaoIntervaloDeTempoService,
  IGradeHorarioOfertaFormacaoIntervaloDeTempoRepository,
} from "@/Ladesa.Management.Application/horarios/grade-horario-oferta-formacao-intervalo-de-tempo";
import { GradeHorarioOfertaFormacaoIntervaloDeTempoAuthzRegistrySetup } from "@/Ladesa.Management.Application/horarios/grade-horario-oferta-formacao-intervalo-de-tempo/infrastructure";
import { IntervaloDeTempoModule } from "@/Ladesa.Management.Application/horarios/intervalo-de-tempo/intervalo-de-tempo.module";
import { GradeHorarioOfertaFormacaoIntervaloDeTempoTypeOrmRepositoryAdapter } from "@/Ladesa.Management.Infrastructure.Database/Repositories/GradeHorarioOfertaFormacaoIntervaloDeTempoRepositoryAdapter";
import { NestJsPaginateAdapter } from "@/Ladesa.Management.Infrastructure.Database/typeorm";
import { GradeHorarioOfertaFormacaoIntervaloDeTempoGraphqlResolver } from "@/Ladesa.Management.Server.Api/Apis/GraphQl/Resolvers/GradeHorarioOfertaFormacaoIntervaloDeTempoGraphqlResolver";
import { GradeHorarioOfertaFormacaoIntervaloDeTempoRestController } from "@/Ladesa.Management.Server.Api/Apis/Rest/Controllers/GradeHorarioOfertaFormacaoIntervaloDeTempoRestController";

@Module({
  imports: [GradeHorarioOfertaFormacaoModule, IntervaloDeTempoModule],
  controllers: [GradeHorarioOfertaFormacaoIntervaloDeTempoRestController],
  providers: [
    NestJsPaginateAdapter,
    GradeHorarioOfertaFormacaoIntervaloDeTempoService,
    GradeHorarioOfertaFormacaoIntervaloDeTempoGraphqlResolver,
    GradeHorarioOfertaFormacaoIntervaloDeTempoAuthzRegistrySetup,
    {
      provide: IGradeHorarioOfertaFormacaoIntervaloDeTempoRepository,
      useClass: GradeHorarioOfertaFormacaoIntervaloDeTempoTypeOrmRepositoryAdapter,
    },
  ],
  exports: [GradeHorarioOfertaFormacaoIntervaloDeTempoService],
})
export class GradeHorarioOfertaFormacaoIntervaloDeTempoModule {}
