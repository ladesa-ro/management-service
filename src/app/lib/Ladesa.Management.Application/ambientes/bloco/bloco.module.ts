import { Module } from "@nestjs/common";
import { IBlocoRepository } from "@/Ladesa.Management.Application/ambientes/bloco/application/ports";
import { BlocoService } from "@/Ladesa.Management.Application/ambientes/bloco/application/use-cases/bloco.service";
import {
  BlocoAuthzRegistrySetup,
  BlocoTypeOrmRepositoryAdapter,
} from "@/Ladesa.Management.Application/ambientes/bloco/infrastructure";
import { CampusModule } from "@/Ladesa.Management.Application/ambientes/campus/campus.module";
import { ArquivoModule } from "@/Ladesa.Management.Application/armazenamento/arquivo/arquivo.module";
import { ImagemModule } from "@/Ladesa.Management.Application/armazenamento/imagem/imagem.module";
import { NestJsPaginateAdapter } from "@/Ladesa.Management.Infrastructure.Database/typeorm";
import { BlocoGraphqlResolver } from "@/Ladesa.Management.Server.Api/Apis/GraphQl/Resolvers/BlocoGraphqlResolver";
import { BlocoRestController } from "@/Ladesa.Management.Server.Api/Apis/Rest/Controllers/BlocoRestController";

@Module({
  imports: [CampusModule, ImagemModule, ArquivoModule],
  controllers: [BlocoRestController],
  providers: [
    NestJsPaginateAdapter,
    BlocoService,
    BlocoGraphqlResolver,
    BlocoAuthzRegistrySetup,
    {
      provide: IBlocoRepository,
      useClass: BlocoTypeOrmRepositoryAdapter,
    },
  ],
  exports: [BlocoService],
})
export class BlocoModule {}
