import { Module } from "@nestjs/common";
import { NestJsPaginateAdapter } from "@/modules/@shared/infrastructure/persistence/typeorm";
import { CAMPUS_REPOSITORY_PORT, CampusService } from "@/modules/sisgea/campus";
import {
  CampusAuthzRegistrySetup,
  CampusTypeOrmRepositoryAdapter,
} from "@/modules/sisgea/campus/infrastructure";
import { CampusGraphqlResolver } from "@/modules/sisgea/campus/presentation/graphql/campus.graphql.resolver";
import { CampusRestController } from "@/modules/sisgea/campus/presentation/rest/campus.rest.controller";
import { EnderecoModule } from "@/server/nest/modules/endereco";

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
