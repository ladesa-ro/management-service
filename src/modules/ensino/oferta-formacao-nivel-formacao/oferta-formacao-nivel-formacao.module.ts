import { Module } from "@nestjs/common";
import { NestJsPaginateAdapter } from "@/modules/@shared/infrastructure/persistence/typeorm";
import { NivelFormacaoModule } from "@/modules/ensino/nivel-formacao/nivel-formacao.module";
import { OfertaFormacaoModule } from "@/modules/ensino/oferta-formacao/oferta-formacao.module";
import { IOfertaFormacaoNivelFormacaoRepository } from "@/modules/ensino/oferta-formacao-nivel-formacao";
import { OfertaFormacaoNivelFormacaoPermissionCheckerImpl } from "@/modules/ensino/oferta-formacao-nivel-formacao/application/authorization";
import {
  OfertaFormacaoNivelFormacaoCreateCommandHandlerImpl,
  OfertaFormacaoNivelFormacaoDeleteCommandHandlerImpl,
  OfertaFormacaoNivelFormacaoUpdateCommandHandlerImpl,
} from "@/modules/ensino/oferta-formacao-nivel-formacao/application/commands";
import {
  OfertaFormacaoNivelFormacaoFindOneQueryHandlerImpl,
  OfertaFormacaoNivelFormacaoListQueryHandlerImpl,
} from "@/modules/ensino/oferta-formacao-nivel-formacao/application/queries";
import { IOfertaFormacaoNivelFormacaoPermissionChecker } from "@/modules/ensino/oferta-formacao-nivel-formacao/domain/authorization";
import {
  IOfertaFormacaoNivelFormacaoCreateCommandHandler,
  IOfertaFormacaoNivelFormacaoDeleteCommandHandler,
  IOfertaFormacaoNivelFormacaoUpdateCommandHandler,
} from "@/modules/ensino/oferta-formacao-nivel-formacao/domain/commands";
import {
  IOfertaFormacaoNivelFormacaoFindOneQueryHandler,
  IOfertaFormacaoNivelFormacaoListQueryHandler,
} from "@/modules/ensino/oferta-formacao-nivel-formacao/domain/queries";
import { OfertaFormacaoNivelFormacaoTypeOrmRepositoryAdapter } from "@/modules/ensino/oferta-formacao-nivel-formacao/infrastructure.database";
import { OfertaFormacaoNivelFormacaoGraphqlResolver } from "@/modules/ensino/oferta-formacao-nivel-formacao/presentation.graphql/oferta-formacao-nivel-formacao.graphql.resolver";
import { OfertaFormacaoNivelFormacaoRestController } from "@/modules/ensino/oferta-formacao-nivel-formacao/presentation.rest/oferta-formacao-nivel-formacao.rest.controller";

@Module({
  imports: [OfertaFormacaoModule, NivelFormacaoModule],
  controllers: [OfertaFormacaoNivelFormacaoRestController],
  providers: [
    NestJsPaginateAdapter,
    {
      provide: IOfertaFormacaoNivelFormacaoPermissionChecker,
      useClass: OfertaFormacaoNivelFormacaoPermissionCheckerImpl,
    },
    OfertaFormacaoNivelFormacaoGraphqlResolver,
    {
      provide: IOfertaFormacaoNivelFormacaoRepository,
      useClass: OfertaFormacaoNivelFormacaoTypeOrmRepositoryAdapter,
    },

    // Commands
    {
      provide: IOfertaFormacaoNivelFormacaoCreateCommandHandler,
      useClass: OfertaFormacaoNivelFormacaoCreateCommandHandlerImpl,
    },
    {
      provide: IOfertaFormacaoNivelFormacaoUpdateCommandHandler,
      useClass: OfertaFormacaoNivelFormacaoUpdateCommandHandlerImpl,
    },
    {
      provide: IOfertaFormacaoNivelFormacaoDeleteCommandHandler,
      useClass: OfertaFormacaoNivelFormacaoDeleteCommandHandlerImpl,
    },
    // Queries
    {
      provide: IOfertaFormacaoNivelFormacaoListQueryHandler,
      useClass: OfertaFormacaoNivelFormacaoListQueryHandlerImpl,
    },
    {
      provide: IOfertaFormacaoNivelFormacaoFindOneQueryHandler,
      useClass: OfertaFormacaoNivelFormacaoFindOneQueryHandlerImpl,
    },
  ],
  exports: [],
})
export class OfertaFormacaoNivelFormacaoModule {}
