import { Module } from "@nestjs/common";
import { NestJsPaginateAdapter } from "@/modules/@shared/infrastructure/persistence/typeorm";
import {
  ModalidadeCreateCommandHandlerImpl,
  ModalidadeDeleteCommandHandlerImpl,
  ModalidadeUpdateCommandHandlerImpl,
} from "@/modules/ensino/modalidade/application/commands";
import {
  ModalidadeFindOneQueryHandlerImpl,
  ModalidadeListQueryHandlerImpl,
} from "@/modules/ensino/modalidade/application/queries";
import {
  IModalidadeCreateCommandHandler,
  IModalidadeDeleteCommandHandler,
  IModalidadeUpdateCommandHandler,
} from "@/modules/ensino/modalidade/domain/commands";
import {
  IModalidadeFindOneQueryHandler,
  IModalidadeListQueryHandler,
} from "@/modules/ensino/modalidade/domain/queries";
import { IModalidadeRepository } from "@/modules/ensino/modalidade/domain/repositories";
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
      provide: IModalidadeRepository,
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
