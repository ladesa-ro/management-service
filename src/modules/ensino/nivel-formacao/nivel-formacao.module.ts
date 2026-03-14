import { Module } from "@nestjs/common";
import { NestJsPaginateAdapter } from "@/modules/@shared/infrastructure/persistence/typeorm";
import {
  NivelFormacaoCreateCommandHandlerImpl,
  NivelFormacaoDeleteCommandHandlerImpl,
  NivelFormacaoUpdateCommandHandlerImpl,
} from "@/modules/ensino/nivel-formacao/application/commands";
import {
  NivelFormacaoFindOneQueryHandlerImpl,
  NivelFormacaoListQueryHandlerImpl,
} from "@/modules/ensino/nivel-formacao/application/queries";
import {
  INivelFormacaoCreateCommandHandler,
  INivelFormacaoDeleteCommandHandler,
  INivelFormacaoUpdateCommandHandler,
} from "@/modules/ensino/nivel-formacao/domain/commands";
import {
  INivelFormacaoFindOneQueryHandler,
  INivelFormacaoListQueryHandler,
} from "@/modules/ensino/nivel-formacao/domain/queries";
import { INivelFormacaoRepository } from "@/modules/ensino/nivel-formacao/domain/repositories";
import { NivelFormacaoAuthzRegistrySetup } from "@/modules/ensino/nivel-formacao/infrastructure";
import { NivelFormacaoTypeOrmRepositoryAdapter } from "@/modules/ensino/nivel-formacao/infrastructure/persistence/typeorm";
import { NivelFormacaoGraphqlResolver } from "@/modules/ensino/nivel-formacao/presentation/graphql/nivel-formacao.graphql.resolver";
import { NivelFormacaoRestController } from "@/modules/ensino/nivel-formacao/presentation/rest/nivel-formacao.rest.controller";

@Module({
  imports: [],
  controllers: [NivelFormacaoRestController],
  providers: [
    NestJsPaginateAdapter,
    NivelFormacaoAuthzRegistrySetup,
    NivelFormacaoGraphqlResolver,
    {
      provide: INivelFormacaoRepository,
      useClass: NivelFormacaoTypeOrmRepositoryAdapter,
    },

    // Commands
    {
      provide: INivelFormacaoCreateCommandHandler,
      useClass: NivelFormacaoCreateCommandHandlerImpl,
    },
    {
      provide: INivelFormacaoUpdateCommandHandler,
      useClass: NivelFormacaoUpdateCommandHandlerImpl,
    },
    {
      provide: INivelFormacaoDeleteCommandHandler,
      useClass: NivelFormacaoDeleteCommandHandlerImpl,
    },
    // Queries
    { provide: INivelFormacaoListQueryHandler, useClass: NivelFormacaoListQueryHandlerImpl },
    { provide: INivelFormacaoFindOneQueryHandler, useClass: NivelFormacaoFindOneQueryHandlerImpl },
  ],
  exports: [INivelFormacaoFindOneQueryHandler],
})
export class NivelFormacaoModule {}
