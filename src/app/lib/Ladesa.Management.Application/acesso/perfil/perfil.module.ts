import { Module } from "@nestjs/common";
import { IPerfilRepository, PerfilService } from "@/Ladesa.Management.Application/acesso/perfil";
import {
  PerfilAuthzRegistrySetup,
  PerfilTypeOrmRepositoryAdapter,
} from "@/Ladesa.Management.Application/acesso/perfil/infrastructure";
import { UsuarioModule } from "@/Ladesa.Management.Application/acesso/usuario/usuario.module";
import { CampusModule } from "@/Ladesa.Management.Application/ambientes/campus/campus.module";
import { NestJsPaginateAdapter } from "@/Ladesa.Management.Infrastructure.Database/typeorm";
import { PerfilGraphqlResolver } from "@/Ladesa.Management.Server.Api/Apis/GraphQl/Resolvers/PerfilGraphqlResolver";
import { PerfilRestController } from "@/Ladesa.Management.Server.Api/Apis/Rest/Controllers/PerfilRestController";

@Module({
  imports: [UsuarioModule, CampusModule],
  controllers: [PerfilRestController],
  providers: [
    NestJsPaginateAdapter,
    PerfilService,
    PerfilGraphqlResolver,
    PerfilAuthzRegistrySetup,
    {
      provide: IPerfilRepository,
      useClass: PerfilTypeOrmRepositoryAdapter,
    },
  ],
  exports: [PerfilService],
})
export class PerfilModule {}
