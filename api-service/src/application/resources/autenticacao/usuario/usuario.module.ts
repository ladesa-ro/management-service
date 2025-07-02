import { KeycloakModule } from "@/infrastructure/integrations/identity-provider";
import { Module } from "@nestjs/common";
import { UsuarioController } from "./usuario.controller";
import { UsuarioResolver } from "./usuario.resolver";
import { UsuarioService } from "./usuario.service";

@Module({
  imports: [KeycloakModule],
  controllers: [UsuarioController],
  providers: [UsuarioService, UsuarioResolver],
  exports: [UsuarioService],
})
export class UsuarioModule {}
