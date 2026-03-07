import { Module } from "@nestjs/common";
import { AMBIENTE_REPOSITORY_PORT } from "@/Ladesa.Management.Application/ambientes/ambiente/application/ports";
import { AmbienteService } from "@/Ladesa.Management.Application/ambientes/ambiente/application/use-cases/ambiente.service";
import {
  AmbienteAuthzRegistrySetup,
  AmbienteTypeOrmRepositoryAdapter,
} from "@/Ladesa.Management.Application/ambientes/ambiente/infrastructure";
import { BlocoModule } from "@/Ladesa.Management.Application/ambientes/bloco/bloco.module";
import { ArquivoModule } from "@/Ladesa.Management.Application/armazenamento/arquivo/arquivo.module";
import { ImagemModule } from "@/Ladesa.Management.Application/armazenamento/imagem/imagem.module";
import { NestJsPaginateAdapter } from "@/Ladesa.Management.Infrastructure.Database/typeorm";
import { AmbienteGraphqlResolver } from "@/Ladesa.Management.Server.Api/Apis/GraphQl/Resolvers/AmbienteGraphqlResolver";
import { AmbienteRestController } from "@/Ladesa.Management.Server.Api/Apis/Rest/Controllers/AmbienteRestController";

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
