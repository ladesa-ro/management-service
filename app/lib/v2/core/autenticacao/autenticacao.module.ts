import { Module } from "@nestjs/common";
import {
  KeycloakModule,
  OpenidConnectModule,
} from "@/infrastructure/integrations/identity-provider";
import { AutenticacaoController } from "@/v2/adapters/in/http/autenticacao/autenticacao.controller";
import { AutenticacaoService } from "@/v2/core/autenticacao/application/use-cases/autenticacao.service";
import { PerfilModule } from "@/v2/core/perfil/perfil.module";
import { UsuarioModule } from "@/v2/core/usuario/usuario.module";

@Module({
  imports: [UsuarioModule, PerfilModule, OpenidConnectModule, KeycloakModule],
  controllers: [AutenticacaoController],
  providers: [AutenticacaoService],
  exports: [],
})
export class AutenticacaoModule {}
