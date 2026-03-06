import { Module } from "@nestjs/common";
import {
  PERFIL_REPOSITORY_PORT,
  PerfilService,
} from "@/Ladesa.Management.Application/acesso/perfil";
import {
  PerfilAuthzRegistrySetup,
  PerfilTypeOrmRepositoryAdapter,
} from "@/Ladesa.Management.Application/acesso/perfil/infrastructure";
import { PerfilGraphqlResolver } from "@/Ladesa.Management.Application/acesso/perfil/presentation/graphql/perfil.graphql.resolver";
import { PerfilRestController } from "@/Ladesa.Management.Application/acesso/perfil/presentation/rest/perfil.rest.controller";
import { UsuarioModule } from "@/Ladesa.Management.Application/acesso/usuario/usuario.module";
import { CampusModule } from "@/Ladesa.Management.Application/ambientes/campus/campus.module";
import { NestJsPaginateAdapter } from "@/Ladesa.Management.Infrastructure.Database/typeorm";

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
