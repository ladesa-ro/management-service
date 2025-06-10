import { Module } from "@nestjs/common";
import { CampusModule } from "../../ambientes/campus/campus.module";
import { UsuarioModule } from "../../autenticacao/usuario/usuario.module";
import { PerfilController } from "./perfil.controller";
import { PerfilResolver } from "./perfil.resolver";
import { PerfilService } from "./perfil.service";

@Module({
  imports: [UsuarioModule, CampusModule],
  controllers: [PerfilController],
  providers: [PerfilService, PerfilResolver],
  exports: [PerfilService],
})
export class PerfilModule {}
