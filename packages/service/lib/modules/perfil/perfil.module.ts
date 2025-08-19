import { Module } from "@nestjs/common";
import { CampusModule } from "@/modules/campus/campus.module";
import { UsuarioModule } from "@/modules/usuario/usuario.module";
import { PerfilController } from "./api/perfil.controller";
import { PerfilResolver } from "./perfil.resolver";
import { PerfilService } from "./domain/perfil.service";

@Module({
  imports: [UsuarioModule, CampusModule],
  controllers: [PerfilController],
  providers: [PerfilService, PerfilResolver],
  exports: [PerfilService],
})
export class PerfilModule {
}
