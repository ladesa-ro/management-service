import { Module } from "@nestjs/common";
import { NestJsPaginateAdapter } from "@/modules/@shared/infrastructure/persistence/typeorm";
import { CAMPUS_REPOSITORY_PORT, CampusService } from "@/modules/campus";
import { CampusTypeOrmRepositoryAdapter } from "@/modules/campus/infrastructure/persistence/typeorm";
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
    {
      provide: CAMPUS_REPOSITORY_PORT,
      useClass: CampusTypeOrmRepositoryAdapter,
    },
  ],
  exports: [CampusService],
})
export class CampusModule {}
