import { Module } from "@nestjs/common";
import { CampusModule } from "@/v2/core/campus/campus.module";
import { UsuarioModule } from "@/v2/core/usuario/usuario.module";
import { PerfilController } from "@/v2/adapters/in/http/perfil/perfil.controller";
import { PerfilService } from "@/v2/core/perfil/application/use-cases/perfil.service";

@Module({
  imports: [UsuarioModule, CampusModule],
  controllers: [PerfilController],
  providers: [PerfilService],
  exports: [PerfilService],
})
export class PerfilModule {}
