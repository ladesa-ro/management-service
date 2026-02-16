import { Module } from "@nestjs/common";
import { PERFIL_REPOSITORY_PORT, PerfilService } from "@/modules/@acesso/perfil";
import {
  PerfilAuthzRegistrySetup,
  PerfilTypeOrmRepositoryAdapter,
} from "@/modules/@acesso/perfil/infrastructure";
import { PerfilGraphqlResolver } from "@/modules/@acesso/perfil/presentation/graphql/perfil.graphql.resolver";
import { PerfilRestController } from "@/modules/@acesso/perfil/presentation/rest/perfil.rest.controller";
import { UsuarioModule } from "@/modules/@acesso/usuario";
import { NestJsPaginateAdapter } from "@/modules/@shared/infrastructure/persistence/typeorm";
import { CampusModule } from "@/modules/ambientes/campus";

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
