import { Module } from "@nestjs/common";
import { KeycloakModule, OpenidConnectModule } from "@/modules/@seguranca/provedor-identidade";
import { AutenticacaoService } from "@/modules/acesso/autenticacao";
import { AutenticacaoRestController } from "@/modules/acesso/autenticacao/presentation/rest";
import { PerfilModule } from "@/modules/acesso/perfil/perfil.module";
import { UsuarioModule } from "@/modules/acesso/usuario/usuario.module";

/**
 * Módulo NestJS para Autenticacao
 *
 * Responsável por:
 * - Configurar injeção de dependência
 * - Fazer o binding entre ports e adapters
 * - Registrar controller e service
 */
@Module({
  imports: [UsuarioModule, PerfilModule, OpenidConnectModule, KeycloakModule],
  controllers: [AutenticacaoRestController],
  providers: [AutenticacaoService],
  exports: [],
})
export class AutenticacaoModule {}
