import { Module } from "@nestjs/common";
import { PERFIL_REPOSITORY_PORT, PerfilService } from "@/core/perfil";
import { NestJsPaginateAdapter } from "@/v2/adapters/out/persistence/pagination";
import { PerfilTypeOrmRepositoryAdapter } from "@/v2/adapters/out/persistence/typeorm/adapters";
import { CampusModule } from "@/server/nest/modules/campus";
import { UsuarioModule } from "@/v2/server/modules/usuario";
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
