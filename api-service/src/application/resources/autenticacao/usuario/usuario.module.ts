import { KeycloakModule } from "@/infrastructure/integrations/identity-provider";
import { Module, forwardRef } from "@nestjs/common";
import { UsuarioController } from "./usuario.controller";
import { UsuarioResolver } from "./usuario.resolver";
import { UsuarioService } from "./usuario.service";
import { PerfilModule } from "../../autorizacao/perfil/perfil.module";

@Module({
  imports: [
    forwardRef(() => PerfilModule),
    KeycloakModule, 
  ],
    controllers: [UsuarioController],
  providers: [UsuarioService, UsuarioResolver],
  exports: [UsuarioService],
})
export class UsuarioModule {}
