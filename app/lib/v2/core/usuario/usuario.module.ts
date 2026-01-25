import { Module } from "@nestjs/common";
import { KeycloakModule } from "@/infrastructure/integrations/identity-provider";
import { UsuarioController } from "@/v2/adapters/in/http/usuario/usuario.controller";
import { UsuarioService } from "@/v2/core/usuario/application/use-cases/usuario.service";

@Module({
  imports: [KeycloakModule],
  controllers: [UsuarioController],
  providers: [UsuarioService],
  exports: [UsuarioService],
})
export class UsuarioModule {}
