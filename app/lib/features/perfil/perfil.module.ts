import { Module } from "@nestjs/common";
import { CampusModule } from "@/features/campus/campus.module";
import { UsuarioModule } from "@/features/usuario/usuario.module";
import { PerfilController } from "./api/perfil.controller";
import { PerfilService } from "./domain/perfil.service";

@Module({
  imports: [UsuarioModule, CampusModule],
  controllers: [PerfilController],
  providers: [PerfilService],
  exports: [PerfilService],
})
export class PerfilModule {}
