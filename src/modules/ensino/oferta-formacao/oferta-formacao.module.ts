import { Module } from "@nestjs/common";
import { NestJsPaginateAdapter } from "@/modules/@shared/infrastructure/persistence/typeorm";
import { ModalidadeModule } from "@/modules/ensino/modalidade/modalidade.module";
import { IOfertaFormacaoRepository } from "@/modules/ensino/oferta-formacao";
import { OfertaFormacaoPermissionCheckerImpl } from "@/modules/ensino/oferta-formacao/application/authorization";
import {
  OfertaFormacaoCreateCommandHandlerImpl,
  OfertaFormacaoDeleteCommandHandlerImpl,
  OfertaFormacaoUpdateCommandHandlerImpl,
} from "@/modules/ensino/oferta-formacao/application/commands";
import {
  OfertaFormacaoFindOneQueryHandlerImpl,
  OfertaFormacaoListQueryHandlerImpl,
} from "@/modules/ensino/oferta-formacao/application/queries";
import { IOfertaFormacaoPermissionChecker } from "@/modules/ensino/oferta-formacao/domain/authorization";
import {
  IOfertaFormacaoCreateCommandHandler,
  IOfertaFormacaoDeleteCommandHandler,
  IOfertaFormacaoUpdateCommandHandler,
} from "@/modules/ensino/oferta-formacao/domain/commands";
import {
  IOfertaFormacaoFindOneQueryHandler,
  IOfertaFormacaoListQueryHandler,
} from "@/modules/ensino/oferta-formacao/domain/queries";
import { OfertaFormacaoTypeOrmRepositoryAdapter } from "@/modules/ensino/oferta-formacao/infrastructure.database";
import { OfertaFormacaoGraphqlResolver } from "@/modules/ensino/oferta-formacao/presentation/graphql/oferta-formacao.graphql.resolver";
import { OfertaFormacaoRestController } from "@/modules/ensino/oferta-formacao/presentation/rest/oferta-formacao.rest.controller";

@Module({
  imports: [ModalidadeModule],
  controllers: [OfertaFormacaoRestController],
  providers: [
    NestJsPaginateAdapter,
    { provide: IOfertaFormacaoPermissionChecker, useClass: OfertaFormacaoPermissionCheckerImpl },
    OfertaFormacaoGraphqlResolver,
    {
      provide: IOfertaFormacaoRepository,
      useClass: OfertaFormacaoTypeOrmRepositoryAdapter,
    },

    // Commands
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
    // Queries
    { provide: IOfertaFormacaoListQueryHandler, useClass: OfertaFormacaoListQueryHandlerImpl },
    {
      provide: IOfertaFormacaoFindOneQueryHandler,
      useClass: OfertaFormacaoFindOneQueryHandlerImpl,
    },
  ],
  exports: [IOfertaFormacaoFindOneQueryHandler],
})
export class OfertaFormacaoModule {}
