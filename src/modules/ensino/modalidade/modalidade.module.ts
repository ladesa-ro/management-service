import { Module } from "@nestjs/common";
import { NestJsPaginateAdapter } from "@/modules/@shared/infrastructure/persistence/typeorm";
import {
  ModalidadeCreateCommandHandlerImpl,
  ModalidadeDeleteCommandHandlerImpl,
  ModalidadeUpdateCommandHandlerImpl,
} from "@/modules/ensino/modalidade/application/use-cases/commands";
import {
  ModalidadeFindOneQueryHandlerImpl,
  ModalidadeListQueryHandlerImpl,
} from "@/modules/ensino/modalidade/application/use-cases/queries";
import {
  IModalidadeCreateCommandHandler,
  IModalidadeDeleteCommandHandler,
  IModalidadeUpdateCommandHandler,
} from "@/modules/ensino/modalidade/domain/commands";
import {
  IModalidadeFindOneQueryHandler,
  IModalidadeListQueryHandler,
} from "@/modules/ensino/modalidade/domain/queries";
import { MODALIDADE_REPOSITORY_PORT } from "@/modules/ensino/modalidade/domain/repositories";
import {
  ModalidadeAuthzRegistrySetup,
  ModalidadeTypeOrmRepositoryAdapter,
} from "@/modules/ensino/modalidade/infrastructure";
import { ModalidadeGraphqlResolver } from "@/modules/ensino/modalidade/presentation/graphql/modalidade.graphql.resolver";
import { ModalidadeRestController } from "@/modules/ensino/modalidade/presentation/rest/modalidade.rest.controller";

@Module({
  imports: [],
  controllers: [ModalidadeRestController],
  providers: [
    NestJsPaginateAdapter,
    ModalidadeGraphqlResolver,
    ModalidadeAuthzRegistrySetup,
    {
      provide: MODALIDADE_REPOSITORY_PORT,
      useClass: ModalidadeTypeOrmRepositoryAdapter,
    },

    // Commands
    { provide: IModalidadeCreateCommandHandler, useClass: ModalidadeCreateCommandHandlerImpl },
    { provide: IModalidadeUpdateCommandHandler, useClass: ModalidadeUpdateCommandHandlerImpl },
    { provide: IModalidadeDeleteCommandHandler, useClass: ModalidadeDeleteCommandHandlerImpl },
    // Queries
    { provide: IModalidadeListQueryHandler, useClass: ModalidadeListQueryHandlerImpl },
    { provide: IModalidadeFindOneQueryHandler, useClass: ModalidadeFindOneQueryHandlerImpl },
  ],
  exports: [IModalidadeFindOneQueryHandler],
})
export class ModalidadeModule {}
