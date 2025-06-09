import { PerfilModule } from "@/application/resources/autorizacao/perfil/perfil.module";
import { KeycloakModule, OpenidConnectModule } from "@/infrastructure/integrations/identity-provider";
import { Module } from "@nestjs/common";
import { AutenticacaoController } from "./autenticacao.controller";
import { AutenticacaoResolver } from "./autenticacao.resolver";
import { AutenticacaoService } from "./autenticacao.service";
import { UsuarioModule } from "./usuario/usuario.module";

@Module({
  imports: [UsuarioModule, PerfilModule, OpenidConnectModule, KeycloakModule],
  controllers: [AutenticacaoController],
  providers: [AutenticacaoService, AutenticacaoResolver],
  exports: [],
})
export class AutenticacaoModule {}
