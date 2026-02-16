import { Module } from "@nestjs/common";
import { CIDADE_REPOSITORY_PORT } from "@/modules/@base/localidades/cidade/application/ports";
import { CidadeService } from "@/modules/@base/localidades/cidade/application/use-cases/cidade.service";
import {
  CidadeAuthzRegistrySetup,
  CidadeTypeOrmRepositoryAdapter,
} from "@/modules/@base/localidades/cidade/infrastructure";
import { CidadeGraphqlResolver } from "@/modules/@base/localidades/cidade/presentation/graphql/cidade.graphql.resolver";
import { CidadeRestController } from "@/modules/@base/localidades/cidade/presentation/rest/cidade.rest.controller";
import { NestJsPaginateAdapter } from "@/modules/@shared/infrastructure/persistence/typeorm";

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
