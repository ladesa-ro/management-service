import { Module } from "@nestjs/common";
import { NestJsPaginateAdapter } from "@/infrastructure.database/pagination/adapters/nestjs-paginate.adapter";
import { PerfilModule } from "@/modules/acesso/perfil/perfil.module";
import { AmbienteModule } from "@/modules/ambientes/ambiente/ambiente.module";
import { DiarioPermissionCheckerImpl } from "@/modules/ensino/diario/application/authorization";
import {
  DiarioCreateCommandHandlerImpl,
  DiarioDeleteCommandHandlerImpl,
  DiarioPreferenciaAgrupamentoBulkReplaceCommandHandlerImpl,
  DiarioProfessorBulkReplaceCommandHandlerImpl,
  DiarioUpdateCommandHandlerImpl,
} from "@/modules/ensino/diario/application/commands";
import {
  DiarioFindOneQueryHandlerImpl,
  DiarioListQueryHandlerImpl,
  DiarioPreferenciaAgrupamentoFindOneQueryHandlerImpl,
  DiarioPreferenciaAgrupamentoListQueryHandlerImpl,
  DiarioProfessorFindOneQueryHandlerImpl,
  DiarioProfessorListQueryHandlerImpl,
} from "@/modules/ensino/diario/application/queries";
import { IDiarioPermissionChecker } from "@/modules/ensino/diario/domain/authorization";
import {
  IDiarioCreateCommandHandler,
  IDiarioDeleteCommandHandler,
  IDiarioPreferenciaAgrupamentoBulkReplaceCommandHandler,
  IDiarioProfessorBulkReplaceCommandHandler,
  IDiarioUpdateCommandHandler,
} from "@/modules/ensino/diario/domain/commands";
import {
  IDiarioFindOneQueryHandler,
  IDiarioListQueryHandler,
  IDiarioPreferenciaAgrupamentoFindOneQueryHandler,
  IDiarioPreferenciaAgrupamentoListQueryHandler,
  IDiarioProfessorFindOneQueryHandler,
  IDiarioProfessorListQueryHandler,
} from "@/modules/ensino/diario/domain/queries";
import {
  IDiarioPreferenciaAgrupamentoRepository,
  IDiarioProfessorRepository,
  IDiarioRepository,
} from "@/modules/ensino/diario/domain/repositories";
import {
  DiarioPreferenciaAgrupamentoTypeOrmRepositoryAdapter,
  DiarioProfessorTypeOrmRepositoryAdapter,
  DiarioTypeOrmRepositoryAdapter,
} from "@/modules/ensino/diario/infrastructure.database";
import { DiarioGraphqlResolver } from "@/modules/ensino/diario/presentation.graphql/diario.graphql.resolver";
import { DiarioRestController } from "@/modules/ensino/diario/presentation.rest/diario.rest.controller";
import { DiarioPreferenciaAgrupamentoRestController } from "@/modules/ensino/diario/presentation.rest/diario-preferencia-agrupamento.rest.controller";
import { DiarioProfessorRestController } from "@/modules/ensino/diario/presentation.rest/diario-professor.rest.controller";
import { DisciplinaModule } from "@/modules/ensino/disciplina/disciplina.module";
import { TurmaModule } from "@/modules/ensino/turma/turma.module";
import { CalendarioLetivoModule } from "@/modules/horarios/calendario-letivo/calendario-letivo.module";

/**
 * Modulo NestJS para Diario
 */
@Module({
  imports: [CalendarioLetivoModule, TurmaModule, AmbienteModule, DisciplinaModule, PerfilModule],
  controllers: [
    DiarioRestController,
    DiarioProfessorRestController,
    DiarioPreferenciaAgrupamentoRestController,
  ],
  providers: [
    NestJsPaginateAdapter,
    DiarioGraphqlResolver,
    { provide: IDiarioPermissionChecker, useClass: DiarioPermissionCheckerImpl },
    {
      provide: IDiarioRepository,
      useClass: DiarioTypeOrmRepositoryAdapter,
    },
    {
      provide: IDiarioProfessorRepository,
      useClass: DiarioProfessorTypeOrmRepositoryAdapter,
    },
    {
      provide: IDiarioPreferenciaAgrupamentoRepository,
      useClass: DiarioPreferenciaAgrupamentoTypeOrmRepositoryAdapter,
    },

    // Diario Commands
    { provide: IDiarioCreateCommandHandler, useClass: DiarioCreateCommandHandlerImpl },
    { provide: IDiarioUpdateCommandHandler, useClass: DiarioUpdateCommandHandlerImpl },
    { provide: IDiarioDeleteCommandHandler, useClass: DiarioDeleteCommandHandlerImpl },
    // Diario Queries
    { provide: IDiarioListQueryHandler, useClass: DiarioListQueryHandlerImpl },
    { provide: IDiarioFindOneQueryHandler, useClass: DiarioFindOneQueryHandlerImpl },

    // DiarioProfessor Commands
    {
      provide: IDiarioProfessorBulkReplaceCommandHandler,
      useClass: DiarioProfessorBulkReplaceCommandHandlerImpl,
    },
    // DiarioProfessor Queries
    { provide: IDiarioProfessorListQueryHandler, useClass: DiarioProfessorListQueryHandlerImpl },
    {
      provide: IDiarioProfessorFindOneQueryHandler,
      useClass: DiarioProfessorFindOneQueryHandlerImpl,
    },

    // DiarioPreferenciaAgrupamento Commands
    {
      provide: IDiarioPreferenciaAgrupamentoBulkReplaceCommandHandler,
      useClass: DiarioPreferenciaAgrupamentoBulkReplaceCommandHandlerImpl,
    },
    // DiarioPreferenciaAgrupamento Queries
    {
      provide: IDiarioPreferenciaAgrupamentoListQueryHandler,
      useClass: DiarioPreferenciaAgrupamentoListQueryHandlerImpl,
    },
    {
      provide: IDiarioPreferenciaAgrupamentoFindOneQueryHandler,
      useClass: DiarioPreferenciaAgrupamentoFindOneQueryHandlerImpl,
    },
  ],
  exports: [IDiarioFindOneQueryHandler],
})
export class DiarioModule {}
