import { Module } from "@nestjs/common";
import { BLOCO_REPOSITORY_PORT } from "@/Ladesa.Management.Application/ambientes/bloco/application/ports";
import { BlocoService } from "@/Ladesa.Management.Application/ambientes/bloco/application/use-cases/bloco.service";
import {
  BlocoAuthzRegistrySetup,
  BlocoTypeOrmRepositoryAdapter,
} from "@/Ladesa.Management.Application/ambientes/bloco/infrastructure";
import { BlocoGraphqlResolver } from "@/Ladesa.Management.Application/ambientes/bloco/presentation/graphql/bloco.graphql.resolver";
import { BlocoRestController } from "@/Ladesa.Management.Application/ambientes/bloco/presentation/rest/bloco.rest.controller";
import { CampusModule } from "@/Ladesa.Management.Application/ambientes/campus/campus.module";
import { ArquivoModule } from "@/Ladesa.Management.Application/armazenamento/arquivo/arquivo.module";
import { ImagemModule } from "@/Ladesa.Management.Application/armazenamento/imagem/imagem.module";
import { NestJsPaginateAdapter } from "@/Ladesa.Management.Infrastructure.Database/typeorm";

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
