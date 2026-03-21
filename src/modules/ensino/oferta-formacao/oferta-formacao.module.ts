import { Module } from "@nestjs/common";
import { NestJsPaginateAdapter } from "@/infrastructure.database/pagination/adapters/nestjs-paginate.adapter";
import { ModalidadeModule } from "@/modules/ensino/modalidade/modalidade.module";
import { NivelFormacaoModule } from "@/modules/ensino/nivel-formacao/nivel-formacao.module";
import { IOfertaFormacaoRepository } from "@/modules/ensino/oferta-formacao";
import { OfertaFormacaoPermissionCheckerImpl } from "@/modules/ensino/oferta-formacao/application/authorization";
import {
  OfertaFormacaoCreateCommandHandlerImpl,
  OfertaFormacaoDeleteCommandHandlerImpl,
  OfertaFormacaoNivelFormacaoBulkReplaceCommandHandlerImpl,
  OfertaFormacaoUpdateCommandHandlerImpl,
} from "@/modules/ensino/oferta-formacao/application/commands";
import {
  OfertaFormacaoFindOneQueryHandlerImpl,
  OfertaFormacaoListQueryHandlerImpl,
  OfertaFormacaoNivelFormacaoFindOneQueryHandlerImpl,
  OfertaFormacaoNivelFormacaoListQueryHandlerImpl,
} from "@/modules/ensino/oferta-formacao/application/queries";
import { IOfertaFormacaoPermissionChecker } from "@/modules/ensino/oferta-formacao/domain/authorization";
import {
  IOfertaFormacaoCreateCommandHandler,
  IOfertaFormacaoDeleteCommandHandler,
  IOfertaFormacaoNivelFormacaoBulkReplaceCommandHandler,
  IOfertaFormacaoUpdateCommandHandler,
} from "@/modules/ensino/oferta-formacao/domain/commands";
import {
  IOfertaFormacaoFindOneQueryHandler,
  IOfertaFormacaoListQueryHandler,
  IOfertaFormacaoNivelFormacaoFindOneQueryHandler,
  IOfertaFormacaoNivelFormacaoListQueryHandler,
} from "@/modules/ensino/oferta-formacao/domain/queries";
import { IOfertaFormacaoNivelFormacaoRepository } from "@/modules/ensino/oferta-formacao/domain/repositories";
import {
  OfertaFormacaoNivelFormacaoTypeOrmRepositoryAdapter,
  OfertaFormacaoTypeOrmRepositoryAdapter,
} from "@/modules/ensino/oferta-formacao/infrastructure.database";
import { OfertaFormacaoGraphqlResolver } from "@/modules/ensino/oferta-formacao/presentation.graphql/oferta-formacao.graphql.resolver";
import { OfertaFormacaoRestController } from "@/modules/ensino/oferta-formacao/presentation.rest/oferta-formacao.rest.controller";
import { OfertaFormacaoNivelFormacaoRestController } from "@/modules/ensino/oferta-formacao/presentation.rest/oferta-formacao-nivel-formacao.rest.controller";
import { OfertaFormacaoPeriodoRestController } from "@/modules/ensino/oferta-formacao/presentation.rest/oferta-formacao-periodo.rest.controller";
import { IOfertaFormacaoPeriodoRepository } from "@/modules/ensino/oferta-formacao-periodo/domain/repositories";
import { OfertaFormacaoPeriodoTypeOrmRepositoryAdapter } from "@/modules/ensino/oferta-formacao-periodo/infrastructure.database";
import { IOfertaFormacaoPeriodoEtapaRepository } from "@/modules/ensino/oferta-formacao-periodo-etapa/domain/repositories";
import { OfertaFormacaoPeriodoEtapaTypeOrmRepositoryAdapter } from "@/modules/ensino/oferta-formacao-periodo-etapa/infrastructure.database";

@Module({
  imports: [ModalidadeModule, NivelFormacaoModule],
  controllers: [
    OfertaFormacaoRestController,
    OfertaFormacaoNivelFormacaoRestController,
    OfertaFormacaoPeriodoRestController,
  ],
  providers: [
    NestJsPaginateAdapter,
    { provide: IOfertaFormacaoPermissionChecker, useClass: OfertaFormacaoPermissionCheckerImpl },
    OfertaFormacaoGraphqlResolver,
    {
      provide: IOfertaFormacaoRepository,
      useClass: OfertaFormacaoTypeOrmRepositoryAdapter,
    },
    {
      provide: IOfertaFormacaoNivelFormacaoRepository,
      useClass: OfertaFormacaoNivelFormacaoTypeOrmRepositoryAdapter,
    },
    {
      provide: IOfertaFormacaoPeriodoRepository,
      useClass: OfertaFormacaoPeriodoTypeOrmRepositoryAdapter,
    },
    {
      provide: IOfertaFormacaoPeriodoEtapaRepository,
      useClass: OfertaFormacaoPeriodoEtapaTypeOrmRepositoryAdapter,
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
    // OfertaFormacao Queries
    { provide: IOfertaFormacaoListQueryHandler, useClass: OfertaFormacaoListQueryHandlerImpl },
    {
      provide: IOfertaFormacaoFindOneQueryHandler,
      useClass: OfertaFormacaoFindOneQueryHandlerImpl,
    },

    // OfertaFormacaoNivelFormacao Commands
    {
      provide: IOfertaFormacaoNivelFormacaoBulkReplaceCommandHandler,
      useClass: OfertaFormacaoNivelFormacaoBulkReplaceCommandHandlerImpl,
    },
    // OfertaFormacaoNivelFormacao Queries
    {
      provide: IOfertaFormacaoNivelFormacaoListQueryHandler,
      useClass: OfertaFormacaoNivelFormacaoListQueryHandlerImpl,
    },
    {
      provide: IOfertaFormacaoNivelFormacaoFindOneQueryHandler,
      useClass: OfertaFormacaoNivelFormacaoFindOneQueryHandlerImpl,
    },
  ],
  exports: [IOfertaFormacaoFindOneQueryHandler],
})
export class OfertaFormacaoModule {}
