import { Module } from "@nestjs/common";
import { KeycloakModule } from "@/Ladesa.Management.Application/@seguranca/provedor-identidade";
import { USUARIO_REPOSITORY_PORT } from "@/Ladesa.Management.Application/acesso/usuario/application/ports";
import { UsuarioService } from "@/Ladesa.Management.Application/acesso/usuario/application/use-cases/usuario.service";
import {
  UsuarioAuthzRegistrySetup,
  UsuarioTypeOrmRepositoryAdapter,
} from "@/Ladesa.Management.Application/acesso/usuario/infrastructure";
import { ArquivoModule } from "@/Ladesa.Management.Application/armazenamento/arquivo/arquivo.module";
import { ImagemModule } from "@/Ladesa.Management.Application/armazenamento/imagem/imagem.module";
import { NestJsPaginateAdapter } from "@/Ladesa.Management.Infrastructure.Database/typeorm";
import { UsuarioGraphqlResolver } from "@/Ladesa.Management.Server.Api/Apis/GraphQl/Resolvers/UsuarioGraphqlResolver";
import { UsuarioRestController } from "@/Ladesa.Management.Server.Api/Apis/Rest/Controllers/UsuarioRestController";

@Module({
  imports: [KeycloakModule, ImagemModule, ArquivoModule],
  controllers: [UsuarioRestController],
  providers: [
    NestJsPaginateAdapter,
    UsuarioService,
    UsuarioGraphqlResolver,
    UsuarioAuthzRegistrySetup,
    {
      provide: USUARIO_REPOSITORY_PORT,
      useClass: UsuarioTypeOrmRepositoryAdapter,
    },
  ],
  exports: [UsuarioService],
})
export class UsuarioModule {}
