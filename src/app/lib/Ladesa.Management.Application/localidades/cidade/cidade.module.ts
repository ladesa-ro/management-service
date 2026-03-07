import { Module } from "@nestjs/common";
import { ICidadeRepository } from "@/Ladesa.Management.Application/localidades/cidade/application/ports";
import { CidadeService } from "@/Ladesa.Management.Application/localidades/cidade/application/use-cases/cidade.service";
import {
  CidadeAuthzRegistrySetup,
  CidadeTypeOrmRepositoryAdapter,
} from "@/Ladesa.Management.Application/localidades/cidade/infrastructure";
import { NestJsPaginateAdapter } from "@/Ladesa.Management.Infrastructure.Database/typeorm";
import { CidadeGraphqlResolver } from "@/Ladesa.Management.Server.Api/Apis/GraphQl/Resolvers/CidadeGraphqlResolver";
import { CidadeRestController } from "@/Ladesa.Management.Server.Api/Apis/Rest/Controllers/CidadeRestController";

@Module({
  imports: [],
  controllers: [CidadeRestController],
  providers: [
    NestJsPaginateAdapter,
    CidadeService,
    CidadeGraphqlResolver,
    CidadeAuthzRegistrySetup,
    {
      provide: ICidadeRepository,
      useClass: CidadeTypeOrmRepositoryAdapter,
    },
  ],
  exports: [CidadeService],
})
export class CidadeModule {}
