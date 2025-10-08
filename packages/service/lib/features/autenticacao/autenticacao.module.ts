import { Module } from "@nestjs/common";
import { PerfilModule } from "@/features/perfil/perfil.module";
import { UsuarioModule } from "@/features/usuario/usuario.module";
import { KeycloakModule, OpenidConnectModule } from "@/infrastructure/integrations/identity-provider";
import { AutenticacaoController } from "./api/autenticacao.controller";
import { AutenticacaoService } from "./domain/autenticacao.service";

@Module({
  imports: [UsuarioModule, PerfilModule, OpenidConnectModule, KeycloakModule],
  controllers: [AutenticacaoController],
  providers: [AutenticacaoService],
  exports: [],
})
export class AutenticacaoModule {}
