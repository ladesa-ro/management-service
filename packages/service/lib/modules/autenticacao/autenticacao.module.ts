import { Module } from "@nestjs/common";
import { PerfilModule } from "@/modules/perfil/perfil.module";
import { UsuarioModule } from "@/modules/usuario/usuario.module";
import { KeycloakModule, OpenidConnectModule } from "@/shared/infrastructure/integrations/identity-provider";
import { AutenticacaoController } from "./api/autenticacao.controller";
import { AutenticacaoService } from "./domain/autenticacao.service";

@Module({
  imports: [UsuarioModule, PerfilModule, OpenidConnectModule, KeycloakModule],
  controllers: [AutenticacaoController],
  providers: [AutenticacaoService],
  exports: [],
})
export class AutenticacaoModule {}
