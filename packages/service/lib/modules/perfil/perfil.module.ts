import { Module } from "@nestjs/common";
import { CampusModule } from "@/modules/campus/campus.module";
import { UsuarioModule } from "@/modules/usuario/usuario.module";
import { PerfilController } from "./api/perfil.controller";
import { PerfilService } from "./domain/perfil.service";

@Module({
  imports: [UsuarioModule, CampusModule],
  controllers: [PerfilController],
  providers: [PerfilService],
  exports: [PerfilService],
})
export class PerfilModule {}
