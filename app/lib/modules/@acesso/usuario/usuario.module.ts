import { Module } from "@nestjs/common";
import { USUARIO_REPOSITORY_PORT } from "@/modules/@acesso/usuario/application/ports";
import { UsuarioService } from "@/modules/@acesso/usuario/application/use-cases/usuario.service";
import {
  UsuarioAuthzRegistrySetup,
  UsuarioTypeOrmRepositoryAdapter,
} from "@/modules/@acesso/usuario/infrastructure";
import { UsuarioGraphqlResolver } from "@/modules/@acesso/usuario/presentation/graphql/usuario.graphql.resolver";
import { UsuarioRestController } from "@/modules/@acesso/usuario/presentation/rest/usuario.rest.controller";
import { ArquivoModule } from "@/modules/@base/armazenamento/arquivo/arquivo.module";
import { ImagemModule } from "@/modules/@base/armazenamento/imagem/imagem.module";
import { KeycloakModule } from "@/modules/@core/provedor-identidade";
import { NestJsPaginateAdapter } from "@/modules/@shared/infrastructure/persistence/typeorm";

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
