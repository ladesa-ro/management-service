import { Module } from "@nestjs/common";
import {
  CAMPUS_REPOSITORY_PORT,
  CampusService,
} from "@/Ladesa.Management.Application/ambientes/campus";
import {
  CampusAuthzRegistrySetup,
  CampusTypeOrmRepositoryAdapter,
} from "@/Ladesa.Management.Application/ambientes/campus/infrastructure";
import { CampusGraphqlResolver } from "@/Ladesa.Management.Application/ambientes/campus/presentation/graphql/campus.graphql.resolver";
import { CampusRestController } from "@/Ladesa.Management.Application/ambientes/campus/presentation/rest/campus.rest.controller";
import { EnderecoModule } from "@/Ladesa.Management.Application/localidades/endereco/endereco.module";
import { NestJsPaginateAdapter } from "@/Ladesa.Management.Infrastructure.Database/typeorm";

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
