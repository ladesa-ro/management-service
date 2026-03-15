import { Module } from "@nestjs/common";
import { NestJsPaginateAdapter } from "@/modules/@shared/infrastructure/persistence/typeorm";
import { AmbienteModule } from "@/modules/ambientes/ambiente/ambiente.module";
import { DiarioPermissionCheckerImpl } from "@/modules/ensino/diario/application/authorization";
import {
  DiarioCreateCommandHandlerImpl,
  DiarioDeleteCommandHandlerImpl,
  DiarioUpdateCommandHandlerImpl,
} from "@/modules/ensino/diario/application/commands";
import {
  DiarioFindOneQueryHandlerImpl,
  DiarioListQueryHandlerImpl,
} from "@/modules/ensino/diario/application/queries";
import { IDiarioPermissionChecker } from "@/modules/ensino/diario/domain/authorization";
import {
  IDiarioCreateCommandHandler,
  IDiarioDeleteCommandHandler,
  IDiarioUpdateCommandHandler,
} from "@/modules/ensino/diario/domain/commands";
import {
  IDiarioFindOneQueryHandler,
  IDiarioListQueryHandler,
} from "@/modules/ensino/diario/domain/queries";
import { IDiarioRepository } from "@/modules/ensino/diario/domain/repositories";
import { DiarioTypeOrmRepositoryAdapter } from "@/modules/ensino/diario/infrastructure.database";
import { DiarioGraphqlResolver } from "@/modules/ensino/diario/presentation/graphql/diario.graphql.resolver";
import { DiarioRestController } from "@/modules/ensino/diario/presentation/rest/diario.rest.controller";
import { DisciplinaModule } from "@/modules/ensino/disciplina/disciplina.module";
import { TurmaModule } from "@/modules/ensino/turma/turma.module";
import { CalendarioLetivoModule } from "@/modules/horarios/calendario-letivo/calendario-letivo.module";

/**
 * Modulo NestJS para Diario
 */
@Module({
  imports: [CalendarioLetivoModule, TurmaModule, AmbienteModule, DisciplinaModule],
  controllers: [DiarioRestController],
  providers: [
    NestJsPaginateAdapter,
    DiarioGraphqlResolver,
    { provide: IDiarioPermissionChecker, useClass: DiarioPermissionCheckerImpl },
    {
      provide: IDiarioRepository,
      useClass: DiarioTypeOrmRepositoryAdapter,
    },

    // Commands
    { provide: IDiarioCreateCommandHandler, useClass: DiarioCreateCommandHandlerImpl },
    { provide: IDiarioUpdateCommandHandler, useClass: DiarioUpdateCommandHandlerImpl },
    { provide: IDiarioDeleteCommandHandler, useClass: DiarioDeleteCommandHandlerImpl },
    // Queries
    { provide: IDiarioListQueryHandler, useClass: DiarioListQueryHandlerImpl },
    { provide: IDiarioFindOneQueryHandler, useClass: DiarioFindOneQueryHandlerImpl },
  ],
  exports: [IDiarioFindOneQueryHandler],
})
export class DiarioModule {}
