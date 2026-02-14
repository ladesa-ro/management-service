import { Module } from "@nestjs/common";
import { NestJsPaginateAdapter } from "@/modules/@shared/infrastructure/persistence/typeorm";
import { AMBIENTE_REPOSITORY_PORT } from "@/modules/sisgea/ambiente/application/ports";
import { AmbienteService } from "@/modules/sisgea/ambiente/application/use-cases/ambiente.service";
import {
  AmbienteAuthzRegistrySetup,
  AmbienteTypeOrmRepositoryAdapter,
} from "@/modules/sisgea/ambiente/infrastructure";
import { ArquivoModule } from "@/server/nest/modules/arquivo";
import { BlocoModule } from "@/server/nest/modules/bloco";
import { ImagemModule } from "@/server/nest/modules/imagem";
import { AmbienteGraphqlResolver } from "./graphql/ambiente.graphql.resolver";
import { AmbienteRestController } from "./rest/ambiente.rest.controller";

@Module({
  imports: [BlocoModule, ImagemModule, ArquivoModule],
  controllers: [AmbienteRestController],
  providers: [
    NestJsPaginateAdapter,
    AmbienteService,
    AmbienteGraphqlResolver,
    AmbienteAuthzRegistrySetup,
    {
      provide: AMBIENTE_REPOSITORY_PORT,
      useClass: AmbienteTypeOrmRepositoryAdapter,
    },
  ],
  exports: [AmbienteService],
})
export class AmbienteModule {}
