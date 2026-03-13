import { Module } from "@nestjs/common";
import { NestJsPaginateAdapter } from "@/modules/@shared/infrastructure/persistence/typeorm";
import { CIDADE_REPOSITORY_PORT } from "@/modules/localidades/cidade/application/ports";
import { CidadeService } from "@/modules/localidades/cidade/application/use-cases/cidade.service";
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
    CidadeService,
    CidadeGraphqlResolver,
    CidadeAuthzRegistrySetup,
    {
      provide: CIDADE_REPOSITORY_PORT,
      useClass: CidadeTypeOrmRepositoryAdapter,
    },
  ],
  exports: [CidadeService],
})
export class CidadeModule {}
