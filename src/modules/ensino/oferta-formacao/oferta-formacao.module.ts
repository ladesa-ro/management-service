import { Module } from "@nestjs/common";
import { NestJsPaginateAdapter } from "@/infrastructure.database/pagination/adapters/nestjs-paginate.adapter";
import { CampusModule } from "@/modules/ambientes/campus/campus.module";
import { ImagemModule } from "@/modules/armazenamento/imagem/imagem.module";
import { ModalidadeModule } from "@/modules/ensino/modalidade/modalidade.module";
import { NivelFormacaoModule } from "@/modules/ensino/nivel-formacao/nivel-formacao.module";
import { IOfertaFormacaoRepository } from "@/modules/ensino/oferta-formacao";
import { OfertaFormacaoPermissionCheckerImpl } from "@/modules/ensino/oferta-formacao/application/authorization";
import {
  OfertaFormacaoCreateCommandHandlerImpl,
  OfertaFormacaoDeleteCommandHandlerImpl,
  OfertaFormacaoUpdateCommandHandlerImpl,
  OfertaFormacaoUpdateImagemCapaCommandHandlerImpl,
} from "@/modules/ensino/oferta-formacao/application/commands";
import {
  OfertaFormacaoFindOneQueryHandlerImpl,
  OfertaFormacaoGetImagemCapaQueryHandlerImpl,
  OfertaFormacaoListQueryHandlerImpl,
} from "@/modules/ensino/oferta-formacao/application/queries";
import { IOfertaFormacaoPermissionChecker } from "@/modules/ensino/oferta-formacao/domain/authorization";
import {
  IOfertaFormacaoCreateCommandHandler,
  IOfertaFormacaoDeleteCommandHandler,
  IOfertaFormacaoUpdateCommandHandler,
  IOfertaFormacaoUpdateImagemCapaCommandHandler,
} from "@/modules/ensino/oferta-formacao/domain/commands";
import {
  IOfertaFormacaoFindOneQueryHandler,
  IOfertaFormacaoGetImagemCapaQueryHandler,
  IOfertaFormacaoListQueryHandler,
} from "@/modules/ensino/oferta-formacao/domain/queries";
import { OfertaFormacaoTypeOrmRepositoryAdapter } from "@/modules/ensino/oferta-formacao/infrastructure.database";
import { OfertaFormacaoGraphqlResolver } from "@/modules/ensino/oferta-formacao/presentation.graphql/oferta-formacao.graphql.resolver";
import { OfertaFormacaoRestController } from "@/modules/ensino/oferta-formacao/presentation.rest/oferta-formacao.rest.controller";

@Module({
  imports: [CampusModule, ImagemModule, ModalidadeModule, NivelFormacaoModule],
  controllers: [OfertaFormacaoRestController],
  providers: [
    NestJsPaginateAdapter,
    { provide: IOfertaFormacaoPermissionChecker, useClass: OfertaFormacaoPermissionCheckerImpl },
    OfertaFormacaoGraphqlResolver,
    {
      provide: IOfertaFormacaoRepository,
      useClass: OfertaFormacaoTypeOrmRepositoryAdapter,
    },

    // OfertaFormacao Commands
    {
      provide: IOfertaFormacaoCreateCommandHandler,
      useClass: OfertaFormacaoCreateCommandHandlerImpl,
    },
    {
      provide: IOfertaFormacaoUpdateCommandHandler,
      useClass: OfertaFormacaoUpdateCommandHandlerImpl,
    },
    {
      provide: IOfertaFormacaoDeleteCommandHandler,
      useClass: OfertaFormacaoDeleteCommandHandlerImpl,
    },
    {
      provide: IOfertaFormacaoUpdateImagemCapaCommandHandler,
      useClass: OfertaFormacaoUpdateImagemCapaCommandHandlerImpl,
    },
    // OfertaFormacao Queries
    { provide: IOfertaFormacaoListQueryHandler, useClass: OfertaFormacaoListQueryHandlerImpl },
    {
      provide: IOfertaFormacaoFindOneQueryHandler,
      useClass: OfertaFormacaoFindOneQueryHandlerImpl,
    },
    {
      provide: IOfertaFormacaoGetImagemCapaQueryHandler,
      useClass: OfertaFormacaoGetImagemCapaQueryHandlerImpl,
    },
  ],
  exports: [IOfertaFormacaoFindOneQueryHandler, IOfertaFormacaoListQueryHandler],
})
export class OfertaFormacaoModule {}
