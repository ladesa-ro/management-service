import { Module } from "@nestjs/common";
import { KeycloakModule } from "@/Ladesa.Management.Application/@seguranca/provedor-identidade";
import { USUARIO_REPOSITORY_PORT } from "@/Ladesa.Management.Application/acesso/usuario/application/ports";
import { UsuarioService } from "@/Ladesa.Management.Application/acesso/usuario/application/use-cases/usuario.service";
import {
  UsuarioAuthzRegistrySetup,
  UsuarioTypeOrmRepositoryAdapter,
} from "@/Ladesa.Management.Application/acesso/usuario/infrastructure";
import { UsuarioGraphqlResolver } from "@/Ladesa.Management.Application/acesso/usuario/presentation/graphql/usuario.graphql.resolver";
import { UsuarioRestController } from "@/Ladesa.Management.Application/acesso/usuario/presentation/rest/usuario.rest.controller";
import { ArquivoModule } from "@/Ladesa.Management.Application/armazenamento/arquivo/arquivo.module";
import { ImagemModule } from "@/Ladesa.Management.Application/armazenamento/imagem/imagem.module";
import { NestJsPaginateAdapter } from "@/Ladesa.Management.Infrastructure.Database/typeorm";

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
