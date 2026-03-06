import { Module } from "@nestjs/common";
import { CIDADE_REPOSITORY_PORT } from "@/Ladesa.Management.Application/localidades/cidade/application/ports";
import { CidadeService } from "@/Ladesa.Management.Application/localidades/cidade/application/use-cases/cidade.service";
import {
  CidadeAuthzRegistrySetup,
  CidadeTypeOrmRepositoryAdapter,
} from "@/Ladesa.Management.Application/localidades/cidade/infrastructure";
import { CidadeGraphqlResolver } from "@/Ladesa.Management.Application/localidades/cidade/presentation/graphql/cidade.graphql.resolver";
import { CidadeRestController } from "@/Ladesa.Management.Application/localidades/cidade/presentation/rest/cidade.rest.controller";
import { NestJsPaginateAdapter } from "@/Ladesa.Management.Infrastructure.Database/typeorm";

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
