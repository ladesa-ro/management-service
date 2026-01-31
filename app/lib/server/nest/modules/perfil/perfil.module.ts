import { Module } from "@nestjs/common";
import { NestJsPaginateAdapter } from "@/modules/@shared/infrastructure/persistence/typeorm";
import { PERFIL_REPOSITORY_PORT, PerfilService } from "@/modules/perfil";
import { PerfilTypeOrmRepositoryAdapter } from "@/modules/perfil/infrastructure/persistence/typeorm";
import { CampusModule } from "@/server/nest/modules/campus";
import { UsuarioModule } from "@/server/nest/modules/usuario";
import { PerfilRestController } from "./rest/perfil.rest.controller";

@Module({
  imports: [UsuarioModule, CampusModule],
  controllers: [PerfilRestController],
  providers: [
    NestJsPaginateAdapter,
    PerfilService,
    {
      provide: PERFIL_REPOSITORY_PORT,
      useClass: PerfilTypeOrmRepositoryAdapter,
    },
  ],
  exports: [PerfilService],
})
export class PerfilModule {}
