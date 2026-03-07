import { Module } from "@nestjs/common";
import {
  CAMPUS_REPOSITORY_PORT,
  CampusService,
} from "@/Ladesa.Management.Application/ambientes/campus";
import {
  CampusAuthzRegistrySetup,
  CampusTypeOrmRepositoryAdapter,
} from "@/Ladesa.Management.Application/ambientes/campus/infrastructure";
import { EnderecoModule } from "@/Ladesa.Management.Application/localidades/endereco/endereco.module";
import { NestJsPaginateAdapter } from "@/Ladesa.Management.Infrastructure.Database/typeorm";
import { CampusGraphqlResolver } from "@/Ladesa.Management.Server.Api/Apis/GraphQl/Resolvers/CampusGraphqlResolver";
import { CampusRestController } from "@/Ladesa.Management.Server.Api/Apis/Rest/Controllers/CampusRestController";

@Module({
  imports: [EnderecoModule],
  controllers: [CampusRestController],
  providers: [
    NestJsPaginateAdapter,
    CampusService,
    CampusGraphqlResolver,
    CampusAuthzRegistrySetup,
    {
      provide: CAMPUS_REPOSITORY_PORT,
      useClass: CampusTypeOrmRepositoryAdapter,
    },
  ],
  exports: [CampusService],
})
export class CampusModule {}
