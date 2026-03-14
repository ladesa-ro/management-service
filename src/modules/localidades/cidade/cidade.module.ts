import { Module } from "@nestjs/common";
import { NestJsPaginateAdapter } from "@/modules/@shared/infrastructure/persistence/typeorm";
import {
  CidadeFindOneQueryHandlerImpl,
  CidadeListQueryHandlerImpl,
} from "@/modules/localidades/cidade/application/queries";
import {
  ICidadeFindOneQueryHandler,
  ICidadeListQueryHandler,
} from "@/modules/localidades/cidade/domain/queries";
import { ICidadeRepository } from "@/modules/localidades/cidade/domain/repositories";
import {
  CidadeAuthzRegistrySetup,
  CidadeTypeOrmRepositoryAdapter,
} from "@/modules/localidades/cidade/infrastructure";
import { CidadeGraphqlResolver } from "@/modules/localidades/cidade/presentation/graphql/cidade.graphql.resolver";
import { CidadeRestController } from "@/modules/localidades/cidade/presentation/rest/cidade.rest.controller";

@Module({
  imports: [],
  controllers: [CidadeRestController],
  providers: [
    NestJsPaginateAdapter,
    CidadeGraphqlResolver,
    CidadeAuthzRegistrySetup,
    {
      provide: ICidadeRepository,
      useClass: CidadeTypeOrmRepositoryAdapter,
    },
    // Queries
    { provide: ICidadeListQueryHandler, useClass: CidadeListQueryHandlerImpl },
    { provide: ICidadeFindOneQueryHandler, useClass: CidadeFindOneQueryHandlerImpl },
  ],
  exports: [],
})
export class CidadeModule {}
