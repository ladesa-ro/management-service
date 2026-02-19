import { Module } from "@nestjs/common";
import { ArquivoModule } from "@/modules/armazenamento/arquivo/arquivo.module";
import { ImagemModule } from "@/modules/armazenamento/imagem/imagem.module";
import { NestJsPaginateAdapter } from "@/modules/@shared/infrastructure/persistence/typeorm";
import { AMBIENTE_REPOSITORY_PORT } from "@/modules/ambientes/ambiente/application/ports";
import { AmbienteService } from "@/modules/ambientes/ambiente/application/use-cases/ambiente.service";
import {
  AmbienteAuthzRegistrySetup,
  AmbienteTypeOrmRepositoryAdapter,
} from "@/modules/ambientes/ambiente/infrastructure";
import { AmbienteGraphqlResolver } from "@/modules/ambientes/ambiente/presentation/graphql/ambiente.graphql.resolver";
import { AmbienteRestController } from "@/modules/ambientes/ambiente/presentation/rest/ambiente.rest.controller";
import { BlocoModule } from "@/modules/ambientes/bloco/bloco.module";

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
