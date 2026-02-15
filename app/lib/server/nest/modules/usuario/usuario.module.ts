import { Module } from "@nestjs/common";
import { KeycloakModule } from "@/modules/@core/identity-provider";
import { NestJsPaginateAdapter } from "@/modules/@shared/infrastructure/persistence/typeorm";
import { USUARIO_REPOSITORY_PORT } from "@/modules/acesso/usuario/application/ports";
import { UsuarioService } from "@/modules/acesso/usuario/application/use-cases/usuario.service";
import {
  UsuarioAuthzRegistrySetup,
  UsuarioTypeOrmRepositoryAdapter,
} from "@/modules/acesso/usuario/infrastructure";
import { ArquivoModule } from "@/server/nest/modules/arquivo";
import { ImagemModule } from "@/server/nest/modules/imagem";
import { UsuarioGraphqlResolver } from "./graphql/usuario.graphql.resolver";
import { UsuarioRestController } from "./rest/usuario.rest.controller";

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
