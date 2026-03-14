import { Module } from "@nestjs/common";
import { NestJsPaginateAdapter } from "@/modules/@shared/infrastructure/persistence/typeorm";
import { NivelFormacaoModule } from "@/modules/ensino/nivel-formacao/nivel-formacao.module";
import { OfertaFormacaoModule } from "@/modules/ensino/oferta-formacao/oferta-formacao.module";
import {
  OFERTA_FORMACAO_NIVEL_FORMACAO_REPOSITORY_PORT,
  OfertaFormacaoNivelFormacaoService,
} from "@/modules/ensino/oferta-formacao-nivel-formacao";
import {
  OfertaFormacaoNivelFormacaoCreateCommandHandlerImpl,
  OfertaFormacaoNivelFormacaoDeleteCommandHandlerImpl,
  OfertaFormacaoNivelFormacaoUpdateCommandHandlerImpl,
} from "@/modules/ensino/oferta-formacao-nivel-formacao/application/use-cases/commands";
import {
  OfertaFormacaoNivelFormacaoFindOneQueryHandlerImpl,
  OfertaFormacaoNivelFormacaoListQueryHandlerImpl,
} from "@/modules/ensino/oferta-formacao-nivel-formacao/application/use-cases/queries";
import {
  IOfertaFormacaoNivelFormacaoCreateCommandHandler,
  IOfertaFormacaoNivelFormacaoDeleteCommandHandler,
  IOfertaFormacaoNivelFormacaoUpdateCommandHandler,
} from "@/modules/ensino/oferta-formacao-nivel-formacao/domain/commands";
import {
  IOfertaFormacaoNivelFormacaoFindOneQueryHandler,
  IOfertaFormacaoNivelFormacaoListQueryHandler,
} from "@/modules/ensino/oferta-formacao-nivel-formacao/domain/queries";
import { OfertaFormacaoNivelFormacaoAuthzRegistrySetup } from "@/modules/ensino/oferta-formacao-nivel-formacao/infrastructure";
import { OfertaFormacaoNivelFormacaoTypeOrmRepositoryAdapter } from "@/modules/ensino/oferta-formacao-nivel-formacao/infrastructure/persistence/typeorm";
import { OfertaFormacaoNivelFormacaoGraphqlResolver } from "@/modules/ensino/oferta-formacao-nivel-formacao/presentation/graphql/oferta-formacao-nivel-formacao.graphql.resolver";
import { OfertaFormacaoNivelFormacaoRestController } from "@/modules/ensino/oferta-formacao-nivel-formacao/presentation/rest/oferta-formacao-nivel-formacao.rest.controller";

@Module({
  imports: [OfertaFormacaoModule, NivelFormacaoModule],
  controllers: [OfertaFormacaoNivelFormacaoRestController],
  providers: [
    NestJsPaginateAdapter,
    OfertaFormacaoNivelFormacaoService,
    OfertaFormacaoNivelFormacaoAuthzRegistrySetup,
    OfertaFormacaoNivelFormacaoGraphqlResolver,
    {
      provide: OFERTA_FORMACAO_NIVEL_FORMACAO_REPOSITORY_PORT,
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
  exports: [OfertaFormacaoNivelFormacaoService],
})
export class OfertaFormacaoNivelFormacaoModule {}
