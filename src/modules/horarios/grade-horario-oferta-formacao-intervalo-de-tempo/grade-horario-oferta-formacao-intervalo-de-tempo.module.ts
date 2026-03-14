import { Module } from "@nestjs/common";
import { NestJsPaginateAdapter } from "@/modules/@shared/infrastructure/persistence/typeorm";
import { GradeHorarioOfertaFormacaoModule } from "@/modules/horarios/grade-horario-oferta-formacao/grade-horario-oferta-formacao.module";
import {
  GRADE_HORARIO_OFERTA_FORMACAO_INTERVALO_DE_TEMPO_REPOSITORY_PORT,
  GradeHorarioOfertaFormacaoIntervaloDeTempoService,
} from "@/modules/horarios/grade-horario-oferta-formacao-intervalo-de-tempo";
import {
  GradeHorarioOfertaFormacaoIntervaloDeTempoCreateCommandHandlerImpl,
  GradeHorarioOfertaFormacaoIntervaloDeTempoDeleteCommandHandlerImpl,
  GradeHorarioOfertaFormacaoIntervaloDeTempoUpdateCommandHandlerImpl,
} from "@/modules/horarios/grade-horario-oferta-formacao-intervalo-de-tempo/application/use-cases/commands";
import {
  GradeHorarioOfertaFormacaoIntervaloDeTempoFindOneQueryHandlerImpl,
  GradeHorarioOfertaFormacaoIntervaloDeTempoListQueryHandlerImpl,
} from "@/modules/horarios/grade-horario-oferta-formacao-intervalo-de-tempo/application/use-cases/queries";
import {
  IGradeHorarioOfertaFormacaoIntervaloDeTempoCreateCommandHandler,
  IGradeHorarioOfertaFormacaoIntervaloDeTempoDeleteCommandHandler,
  IGradeHorarioOfertaFormacaoIntervaloDeTempoUpdateCommandHandler,
} from "@/modules/horarios/grade-horario-oferta-formacao-intervalo-de-tempo/domain/commands";
import {
  IGradeHorarioOfertaFormacaoIntervaloDeTempoFindOneQueryHandler,
  IGradeHorarioOfertaFormacaoIntervaloDeTempoListQueryHandler,
} from "@/modules/horarios/grade-horario-oferta-formacao-intervalo-de-tempo/domain/queries";
import { GradeHorarioOfertaFormacaoIntervaloDeTempoAuthzRegistrySetup } from "@/modules/horarios/grade-horario-oferta-formacao-intervalo-de-tempo/infrastructure";
import { GradeHorarioOfertaFormacaoIntervaloDeTempoTypeOrmRepositoryAdapter } from "@/modules/horarios/grade-horario-oferta-formacao-intervalo-de-tempo/infrastructure/persistence/typeorm";
import { GradeHorarioOfertaFormacaoIntervaloDeTempoGraphqlResolver } from "@/modules/horarios/grade-horario-oferta-formacao-intervalo-de-tempo/presentation/graphql/grade-horario-oferta-formacao-intervalo-de-tempo.graphql.resolver";
import { GradeHorarioOfertaFormacaoIntervaloDeTempoRestController } from "@/modules/horarios/grade-horario-oferta-formacao-intervalo-de-tempo/presentation/rest/grade-horario-oferta-formacao-intervalo-de-tempo.rest.controller";
import { IntervaloDeTempoModule } from "@/modules/horarios/intervalo-de-tempo/intervalo-de-tempo.module";

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

    // Commands
    {
      provide: IGradeHorarioOfertaFormacaoIntervaloDeTempoCreateCommandHandler,
      useClass: GradeHorarioOfertaFormacaoIntervaloDeTempoCreateCommandHandlerImpl,
    },
    {
      provide: IGradeHorarioOfertaFormacaoIntervaloDeTempoUpdateCommandHandler,
      useClass: GradeHorarioOfertaFormacaoIntervaloDeTempoUpdateCommandHandlerImpl,
    },
    {
      provide: IGradeHorarioOfertaFormacaoIntervaloDeTempoDeleteCommandHandler,
      useClass: GradeHorarioOfertaFormacaoIntervaloDeTempoDeleteCommandHandlerImpl,
    },
    // Queries
    {
      provide: IGradeHorarioOfertaFormacaoIntervaloDeTempoListQueryHandler,
      useClass: GradeHorarioOfertaFormacaoIntervaloDeTempoListQueryHandlerImpl,
    },
    {
      provide: IGradeHorarioOfertaFormacaoIntervaloDeTempoFindOneQueryHandler,
      useClass: GradeHorarioOfertaFormacaoIntervaloDeTempoFindOneQueryHandlerImpl,
    },
  ],
  exports: [GradeHorarioOfertaFormacaoIntervaloDeTempoService],
})
export class GradeHorarioOfertaFormacaoIntervaloDeTempoModule {}
