import { Module } from "@nestjs/common";
import { ArquivoModule } from "@/modules/@base/armazenamento/arquivo";
import { ImagemModule } from "@/modules/@base/armazenamento/imagem";
import { NestJsPaginateAdapter } from "@/modules/@shared/infrastructure/persistence/typeorm";
import { BLOCO_REPOSITORY_PORT } from "@/modules/ambientes/bloco/application/ports";
import { BlocoService } from "@/modules/ambientes/bloco/application/use-cases/bloco.service";
import {
  BlocoAuthzRegistrySetup,
  BlocoTypeOrmRepositoryAdapter,
} from "@/modules/ambientes/bloco/infrastructure";
import { BlocoGraphqlResolver } from "@/modules/ambientes/bloco/presentation/graphql/bloco.graphql.resolver";
import { BlocoRestController } from "@/modules/ambientes/bloco/presentation/rest/bloco.rest.controller";
import { CampusModule } from "@/modules/ambientes/campus";

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
