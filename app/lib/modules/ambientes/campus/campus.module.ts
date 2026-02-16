import { Module } from "@nestjs/common";
import { EnderecoModule } from "@/modules/@base/localidades/endereco/endereco.module";
import { NestJsPaginateAdapter } from "@/modules/@shared/infrastructure/persistence/typeorm";
import { CAMPUS_REPOSITORY_PORT, CampusService } from "@/modules/ambientes/campus";
import {
  CampusAuthzRegistrySetup,
  CampusTypeOrmRepositoryAdapter,
} from "@/modules/ambientes/campus/infrastructure";
import { CampusGraphqlResolver } from "@/modules/ambientes/campus/presentation/graphql/campus.graphql.resolver";
import { CampusRestController } from "@/modules/ambientes/campus/presentation/rest/campus.rest.controller";

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
