import { Module } from "@nestjs/common";
import { NestJsPaginateAdapter } from "@/infrastructure.database/pagination/adapters/nestjs-paginate.adapter";
import { ArquivoModule } from "@/modules/armazenamento/arquivo/arquivo.module";
import { ImagemModule } from "@/modules/armazenamento/imagem/imagem.module";
import { ModalidadePermissionCheckerImpl } from "@/modules/ensino/modalidade/application/authorization";
import {
  ModalidadeCreateCommandHandlerImpl,
  ModalidadeDeleteCommandHandlerImpl,
  ModalidadeUpdateCommandHandlerImpl,
  ModalidadeUpdateImagemCapaCommandHandlerImpl,
} from "@/modules/ensino/modalidade/application/commands";
import {
  ModalidadeFindOneQueryHandlerImpl,
  ModalidadeGetImagemCapaQueryHandlerImpl,
  ModalidadeListQueryHandlerImpl,
} from "@/modules/ensino/modalidade/application/queries";
import { IModalidadePermissionChecker } from "@/modules/ensino/modalidade/domain/authorization";
import {
  IModalidadeCreateCommandHandler,
  IModalidadeDeleteCommandHandler,
  IModalidadeUpdateCommandHandler,
  IModalidadeUpdateImagemCapaCommandHandler,
} from "@/modules/ensino/modalidade/domain/commands";
import {
  IModalidadeFindOneQueryHandler,
  IModalidadeGetImagemCapaQueryHandler,
  IModalidadeListQueryHandler,
} from "@/modules/ensino/modalidade/domain/queries";
import { IModalidadeRepository } from "@/modules/ensino/modalidade/domain/repositories";
import { ModalidadeTypeOrmRepositoryAdapter } from "@/modules/ensino/modalidade/infrastructure.database";
import { ModalidadeGraphqlResolver } from "@/modules/ensino/modalidade/presentation.graphql/modalidade.graphql.resolver";
import { ModalidadeRestController } from "@/modules/ensino/modalidade/presentation.rest/modalidade.rest.controller";

@Module({
  imports: [ImagemModule, ArquivoModule],
  controllers: [ModalidadeRestController],
  providers: [
    NestJsPaginateAdapter,
    ModalidadeGraphqlResolver,
    {
      provide: IModalidadeRepository,
      useClass: ModalidadeTypeOrmRepositoryAdapter,
    },
    { provide: IModalidadePermissionChecker, useClass: ModalidadePermissionCheckerImpl },

    // Commands
    { provide: IModalidadeCreateCommandHandler, useClass: ModalidadeCreateCommandHandlerImpl },
    { provide: IModalidadeUpdateCommandHandler, useClass: ModalidadeUpdateCommandHandlerImpl },
    { provide: IModalidadeDeleteCommandHandler, useClass: ModalidadeDeleteCommandHandlerImpl },
    {
      provide: IModalidadeUpdateImagemCapaCommandHandler,
      useClass: ModalidadeUpdateImagemCapaCommandHandlerImpl,
    },
    // Queries
    { provide: IModalidadeListQueryHandler, useClass: ModalidadeListQueryHandlerImpl },
    { provide: IModalidadeFindOneQueryHandler, useClass: ModalidadeFindOneQueryHandlerImpl },
    {
      provide: IModalidadeGetImagemCapaQueryHandler,
      useClass: ModalidadeGetImagemCapaQueryHandlerImpl,
    },
  ],
  exports: [IModalidadeFindOneQueryHandler],
})
export class ModalidadeModule {}
