import { Module } from "@nestjs/common";
import { NestJsPaginateAdapter } from "@/modules/@shared/infrastructure/persistence/typeorm";
import { NivelFormacaoPermissionCheckerImpl } from "@/modules/ensino/nivel-formacao/application/authorization";
import {
  NivelFormacaoCreateCommandHandlerImpl,
  NivelFormacaoDeleteCommandHandlerImpl,
  NivelFormacaoUpdateCommandHandlerImpl,
} from "@/modules/ensino/nivel-formacao/application/commands";
import {
  NivelFormacaoFindOneQueryHandlerImpl,
  NivelFormacaoListQueryHandlerImpl,
} from "@/modules/ensino/nivel-formacao/application/queries";
import { INivelFormacaoPermissionChecker } from "@/modules/ensino/nivel-formacao/domain/authorization";
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
import { NivelFormacaoTypeOrmRepositoryAdapter } from "@/modules/ensino/nivel-formacao/infrastructure.database";
import { NivelFormacaoGraphqlResolver } from "@/modules/ensino/nivel-formacao/presentation/graphql/nivel-formacao.graphql.resolver";
import { NivelFormacaoRestController } from "@/modules/ensino/nivel-formacao/presentation/rest/nivel-formacao.rest.controller";

@Module({
  imports: [],
  controllers: [NivelFormacaoRestController],
  providers: [
    NestJsPaginateAdapter,
    { provide: INivelFormacaoPermissionChecker, useClass: NivelFormacaoPermissionCheckerImpl },
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
