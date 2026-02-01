import { Module } from "@nestjs/common";
import { NestJsPaginateAdapter } from "@/modules/@shared/infrastructure/persistence/typeorm";
import { CAMPUS_REPOSITORY_PORT, CampusService } from "@/modules/campus";
import {
  CampusAuthzRegistrySetup,
  CampusTypeOrmRepositoryAdapter,
} from "@/modules/campus/infrastructure";
import { EnderecoModule } from "@/server/nest/modules/endereco";
import { CampusGraphqlResolver } from "./graphql/campus.graphql.resolver";
import { CampusRestController } from "./rest/campus.rest.controller";

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
