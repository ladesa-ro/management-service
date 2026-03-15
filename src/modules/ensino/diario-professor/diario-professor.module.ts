import { Module } from "@nestjs/common";
import { NestJsPaginateAdapter } from "@/modules/@shared/infrastructure/persistence/typeorm";
import { PerfilModule } from "@/modules/acesso/perfil/perfil.module";
import { DiarioModule } from "@/modules/ensino/diario/diario.module";
import { DiarioProfessorPermissionCheckerImpl } from "@/modules/ensino/diario-professor/application/authorization";
import {
  DiarioProfessorCreateCommandHandlerImpl,
  DiarioProfessorDeleteCommandHandlerImpl,
  DiarioProfessorUpdateCommandHandlerImpl,
} from "@/modules/ensino/diario-professor/application/commands";
import {
  DiarioProfessorFindOneQueryHandlerImpl,
  DiarioProfessorListQueryHandlerImpl,
} from "@/modules/ensino/diario-professor/application/queries";
import { IDiarioProfessorPermissionChecker } from "@/modules/ensino/diario-professor/domain/authorization";
import {
  IDiarioProfessorCreateCommandHandler,
  IDiarioProfessorDeleteCommandHandler,
  IDiarioProfessorUpdateCommandHandler,
} from "@/modules/ensino/diario-professor/domain/commands";
import {
  IDiarioProfessorFindOneQueryHandler,
  IDiarioProfessorListQueryHandler,
} from "@/modules/ensino/diario-professor/domain/queries";
import { IDiarioProfessorRepository } from "@/modules/ensino/diario-professor/domain/repositories";
import { DiarioProfessorTypeOrmRepositoryAdapter } from "@/modules/ensino/diario-professor/infrastructure.database";
import { DiarioProfessorGraphqlResolver } from "@/modules/ensino/diario-professor/presentation.graphql/diario-professor.graphql.resolver";
import { DiarioProfessorController } from "@/modules/ensino/diario-professor/presentation.rest";

@Module({
  imports: [DiarioModule, PerfilModule],
  controllers: [DiarioProfessorController],
  providers: [
    NestJsPaginateAdapter,
    {
      provide: IDiarioProfessorRepository,
      useClass: DiarioProfessorTypeOrmRepositoryAdapter,
    },
    DiarioProfessorGraphqlResolver,
    { provide: IDiarioProfessorPermissionChecker, useClass: DiarioProfessorPermissionCheckerImpl },

    // Commands
    {
      provide: IDiarioProfessorCreateCommandHandler,
      useClass: DiarioProfessorCreateCommandHandlerImpl,
    },
    {
      provide: IDiarioProfessorUpdateCommandHandler,
      useClass: DiarioProfessorUpdateCommandHandlerImpl,
    },
    {
      provide: IDiarioProfessorDeleteCommandHandler,
      useClass: DiarioProfessorDeleteCommandHandlerImpl,
    },
    // Queries
    { provide: IDiarioProfessorListQueryHandler, useClass: DiarioProfessorListQueryHandlerImpl },
    {
      provide: IDiarioProfessorFindOneQueryHandler,
      useClass: DiarioProfessorFindOneQueryHandlerImpl,
    },
  ],
  exports: [],
})
export class DiarioProfessorModule {}
