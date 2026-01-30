import { Module } from "@nestjs/common";
import { PERFIL_REPOSITORY_PORT, PerfilService } from "@/core/perfil";
import { CampusModule } from "@/server/nest/modules/campus";
import { UsuarioModule } from "@/server/nest/modules/usuario";
import { NestJsPaginateAdapter } from "@/v2/adapters/out/persistence/pagination";
import { PerfilTypeOrmRepositoryAdapter } from "@/v2/adapters/out/persistence/typeorm/adapters";
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
