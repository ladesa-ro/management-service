import { KeycloakModule } from "@/infrastructure/integrations/identity-provider";
import { Module } from "@nestjs/common";
import { UsuarioController } from "./usuario.controller";
import { UsuarioResolver } from "./usuario.resolver";
import { UsuarioService } from "./usuario.service";
import { PerfilModule } from "../../autorizacao/perfil/perfil.module";

@Module({
  imports: [KeycloakModule, PerfilModule],
  controllers: [UsuarioController],
  providers: [UsuarioService, UsuarioResolver],
  exports: [UsuarioService],
})
export class UsuarioModule {}
