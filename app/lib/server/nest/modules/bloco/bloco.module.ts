import { Module } from "@nestjs/common";
import { NestJsPaginateAdapter } from "@/modules/@shared/infrastructure/persistence/typeorm";
import { BLOCO_REPOSITORY_PORT } from "@/modules/sisgea/bloco/application/ports";
import { BlocoService } from "@/modules/sisgea/bloco/application/use-cases/bloco.service";
import {
  BlocoAuthzRegistrySetup,
  BlocoTypeOrmRepositoryAdapter,
} from "@/modules/sisgea/bloco/infrastructure";
import { ArquivoModule } from "@/server/nest/modules/arquivo";
import { CampusModule } from "@/server/nest/modules/campus";
import { ImagemModule } from "@/server/nest/modules/imagem";
import { BlocoGraphqlResolver } from "./graphql/bloco.graphql.resolver";
import { BlocoRestController } from "./rest/bloco.rest.controller";

@Module({
  imports: [CampusModule, ImagemModule, ArquivoModule],
  controllers: [BlocoRestController],
  providers: [
    NestJsPaginateAdapter,
    BlocoService,
    BlocoGraphqlResolver,
    BlocoAuthzRegistrySetup,
    {
      provide: BLOCO_REPOSITORY_PORT,
      useClass: BlocoTypeOrmRepositoryAdapter,
    },
  ],
  exports: [BlocoService],
})
export class BlocoModule {}
