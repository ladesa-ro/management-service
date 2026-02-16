import { Module } from "@nestjs/common";
import { AutenticacaoService } from "@/modules/@acesso/autenticacao";
import { AutenticacaoRestController } from "@/modules/@acesso/autenticacao/presentation/rest";
import { PerfilModule } from "@/modules/@acesso/perfil";
import { UsuarioModule } from "@/modules/@acesso/usuario";
import { KeycloakModule, OpenidConnectModule } from "@/modules/@core/identity-provider";

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
