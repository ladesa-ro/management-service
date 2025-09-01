import { Module } from "@nestjs/common";
import { KeycloakModule } from "@/infrastructure-antigo/integrations/identity-provider";
import { UsuarioController } from "./api/usuario.controller";
import { UsuarioService } from "./domain/usuario.service";

@Module({
  imports: [KeycloakModule],
  controllers: [UsuarioController],
  providers: [UsuarioService],
  exports: [UsuarioService],
})
export class UsuarioModule {}
