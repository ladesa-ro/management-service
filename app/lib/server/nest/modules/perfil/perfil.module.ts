import { Module } from "@nestjs/common";
import { NestJsPaginateAdapter } from "@/modules/@shared/infrastructure/persistence/typeorm";
import { PERFIL_REPOSITORY_PORT, PerfilService } from "@/modules/perfil";
import {
  PerfilAuthzRegistrySetup,
  PerfilTypeOrmRepositoryAdapter,
} from "@/modules/perfil/infrastructure";
import { CampusModule } from "@/server/nest/modules/campus";
import { UsuarioModule } from "@/server/nest/modules/usuario";
import { PerfilGraphqlResolver } from "./graphql/perfil.graphql.resolver";
import { PerfilRestController } from "./rest/perfil.rest.controller";

@Module({
  imports: [UsuarioModule, CampusModule],
  controllers: [PerfilRestController],
  providers: [
    NestJsPaginateAdapter,
    PerfilService,
    PerfilGraphqlResolver,
    PerfilAuthzRegistrySetup,
    {
      provide: PERFIL_REPOSITORY_PORT,
      useClass: PerfilTypeOrmRepositoryAdapter,
    },
  ],
  exports: [PerfilService],
})
export class PerfilModule {}
